import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/** Strict alphanumeric whitelist for referral codes. */
function sanitizeCode(raw: string): string | null {
  const trimmed = (raw ?? "").trim().toUpperCase();
  return /^[A-Z0-9]{6,10}$/.test(trimmed) ? trimmed : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, user_type, source, turnstile_token, referral_code: rawCode } = await req.json();

    if (!email || !turnstile_token) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize optional referral code
    const referralCode: string | null = rawCode ? sanitizeCode(rawCode) : null;

    // Verify Cloudflare Turnstile token
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

    // Insert into DB using service role key (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const upsertPayload: Record<string, unknown> = {
      email,
      user_type: user_type ?? "job_seeker",
      source: source ?? "",
    };

    // Only attach referral_code if it passes sanitization
    if (referralCode) {
      upsertPayload.referral_code = referralCode;
    }

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

    // Record referral redemption if a valid code was provided
    if (referralCode) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      // Fire-and-forget: don't fail the whole signup if redemption fails
      fetch(`${supabaseUrl}/functions/v1/redeem-referral`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
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
