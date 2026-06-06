import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { isRateLimited } from "../_shared/rateLimit.ts";
import { isDisposableEmail } from "../_shared/disposableDomains.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function sanitizeCode(raw: string): string | null {
  const trimmed = (raw ?? "").trim().toUpperCase();
  return /^[A-Z0-9]{6,10}$/.test(trimmed) ? trimmed : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 5 submissions per IP per 10 minutes
    if (await isRateLimited(supabase, "submit-waitlist", ip, 5, 10 * 60 * 1000)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, user_type, source, turnstile_token, referral_code: rawCode } = await req.json();

    if (!email || !turnstile_token) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isDisposableEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Disposable email addresses are not allowed. Please use a permanent email." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const referralCode: string | null = rawCode ? sanitizeCode(rawCode) : null;

    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (!turnstileSecret) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const verifyForm = new FormData();
    verifyForm.append("secret", turnstileSecret);
    verifyForm.append("response", turnstile_token);

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: verifyForm }
    );
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return new Response(
        JSON.stringify({ error: "Bot verification failed. Please try again." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const upsertPayload: Record<string, unknown> = {
      email,
      user_type: user_type ?? "job_seeker",
      source: source ?? "",
    };

    if (referralCode) upsertPayload.referral_code = referralCode;

    const { error: dbError } = await supabase
      .from("waitlist")
      .upsert(upsertPayload, { onConflict: "email", ignoreDuplicates: true });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save your email. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (referralCode) {
      fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/redeem-referral`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({ referral_code: referralCode, referred_email: email }),
      }).catch((e) => console.error("Redemption call failed:", e));
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
