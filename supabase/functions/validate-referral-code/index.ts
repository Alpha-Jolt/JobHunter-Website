import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/** Strict alphanumeric whitelist — reject anything else. */
function sanitizeCode(raw: string): string | null {
  const trimmed = raw.trim().toUpperCase();
  if (/^[A-Z0-9]{6,10}$/.test(trimmed)) return trimmed;
  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const raw: string = body.referral_code ?? "";

    const code = sanitizeCode(raw);
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

    // --- Look up the code ---
    const { data: codeRow, error: codeErr } = await supabase
      .from("referral_codes")
      .select("referral_code, status, is_active, discount_percent, expires_at, user_email")
      .eq("referral_code", code)
      .maybeSingle();

    if (codeErr) {
      console.error("Code lookup error:", codeErr);
      return new Response(
        JSON.stringify({ error: "Failed to validate code. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!codeRow) {
      return new Response(
        JSON.stringify({ valid: false, error: "Referral code not found." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!codeRow.is_active || codeRow.status !== "active") {
      return new Response(
        JSON.stringify({ valid: false, error: "This referral code is no longer active." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check expiry
    if (codeRow.expires_at && new Date(codeRow.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ valid: false, error: "This referral code has expired." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check max uses (fetch active program)
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
          JSON.stringify({ valid: false, error: "This referral code has reached its maximum uses." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        valid: true,
        referral_code: code,
        discount_percent: codeRow.discount_percent,
      }),
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
