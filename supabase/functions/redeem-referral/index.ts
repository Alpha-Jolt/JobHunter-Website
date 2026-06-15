import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { trackEvent } from "../_shared/posthog.ts";

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
    const body = await req.json();
    const referred_email: string = (body.referred_email ?? "").trim().toLowerCase();
    const raw_code: string = body.referral_code ?? "";

    // --- Validate inputs ---
    if (!referred_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referred_email)) {
      return new Response(
        JSON.stringify({ error: "A valid referred email is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const code = sanitizeCode(raw_code);
    if (!code) {
      return new Response(
        JSON.stringify({ error: "Invalid referral code format." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- Fetch the code row ---
    const { data: codeRow, error: codeErr } = await supabase
      .from("referral_codes")
      .select("referral_code, status, is_active, discount_percent, expires_at, user_email")
      .eq("referral_code", code)
      .maybeSingle();

    if (codeErr || !codeRow) {
      return new Response(
        JSON.stringify({ error: "Referral code not found or invalid." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!codeRow.is_active || codeRow.status !== "active") {
      return new Response(
        JSON.stringify({ error: "This referral code is no longer active." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (codeRow.expires_at && new Date(codeRow.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "This referral code has expired." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Check max uses ---
    const { data: program } = await supabase
      .from("referral_programs")
      .select("max_uses_per_code")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const maxUses: number = program?.max_uses_per_code ?? 0;

    if (maxUses > 0) {
      const { count } = await supabase
        .from("referral_redemptions")
        .select("*", { count: "exact", head: true })
        .eq("referral_code", code);

      if ((count ?? 0) >= maxUses) {
        return new Response(
          JSON.stringify({ error: "This referral code has reached its maximum uses." }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // --- Prevent self-referral ---
    if (codeRow.user_email === referred_email) {
      return new Response(
        JSON.stringify({ error: "You cannot redeem your own referral code." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Prevent duplicate redemption by same email ---
    const { data: dupRedemption } = await supabase
      .from("referral_redemptions")
      .select("id")
      .eq("referral_code", code)
      .eq("referred_email", referred_email)
      .maybeSingle();

    if (dupRedemption) {
      // Idempotent — return success without re-inserting
      return new Response(
        JSON.stringify({ success: true, discount_percent: codeRow.discount_percent }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Record the redemption ---
    const { error: insertErr } = await supabase
      .from("referral_redemptions")
      .insert({
        referral_code: code,
        referred_email,
        discount_applied_percent: codeRow.discount_percent,
      });

    if (insertErr) {
      console.error("Redemption insert error:", insertErr);
      return new Response(
        JSON.stringify({ error: "Failed to record redemption. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Track referral redemption in PostHog
    await trackEvent(referred_email, "referral_redeemed", {
      referral_code: code,
      discount_percent: codeRow.discount_percent,
    });

    return new Response(
      JSON.stringify({ success: true, discount_percent: codeRow.discount_percent }),
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
