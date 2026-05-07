import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/** Generates a cryptographically random uppercase alphanumeric code of the given length. */
function generateCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 to avoid confusion
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

/** Validates referral code format: 6-10 uppercase alphanumeric characters. */
function isValidCodeFormat(code: string): boolean {
  return /^[A-Z0-9]{6,10}$/.test(code);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const email: string = (body.email ?? "").trim().toLowerCase();

    // --- Input validation ---
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "A valid email address is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- Verify email is on the waitlist ---
    const { data: waitlistRow, error: waitlistErr } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (waitlistErr) {
      console.error("Waitlist lookup error:", waitlistErr);
      return new Response(
        JSON.stringify({ error: "Failed to verify email. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!waitlistRow) {
      return new Response(
        JSON.stringify({ error: "This email is not on the waitlist. Please join the waitlist first." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Rate limit: one code per email ---
    const { data: existing, error: existingErr } = await supabase
      .from("referral_codes")
      .select("referral_code, status")
      .eq("user_email", email)
      .maybeSingle();

    if (existingErr) {
      console.error("Existing code lookup error:", existingErr);
      return new Response(
        JSON.stringify({ error: "Failed to check existing code. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (existing) {
      // Return the existing code (idempotent)
      return new Response(
        JSON.stringify({ success: true, referral_code: existing.referral_code }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Fetch active program config ---
    const { data: program } = await supabase
      .from("referral_programs")
      .select("discount_percent")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const discountPercent = program?.discount_percent ?? 20;

    // --- Generate a unique code ---
    let code = "";
    let attempts = 0;
    while (attempts < 10) {
      const candidate = generateCode(8);
      if (isValidCodeFormat(candidate)) {
        const { data: collision } = await supabase
          .from("referral_codes")
          .select("id")
          .eq("referral_code", candidate)
          .maybeSingle();
        if (!collision) {
          code = candidate;
          break;
        }
      }
      attempts++;
    }

    if (!code) {
      return new Response(
        JSON.stringify({ error: "Failed to generate a unique code. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Persist the code ---
    const { error: insertErr } = await supabase
      .from("referral_codes")
      .insert({ user_email: email, referral_code: code, discount_percent: discountPercent, status: "active", is_active: true });

    if (insertErr) {
      console.error("Insert code error:", insertErr);
      return new Response(
        JSON.stringify({ error: "Failed to save referral code. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, referral_code: code }),
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
