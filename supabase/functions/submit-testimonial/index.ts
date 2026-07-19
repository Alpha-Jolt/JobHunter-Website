import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { isRateLimited } from "../_shared/rateLimit.ts";
import { trackEvent } from "../_shared/posthog.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    // 3 submissions per IP per hour
    if (await isRateLimited(supabase, "submit-testimonial", ip, 3, 60 * 60 * 1000)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name: rawName, quote: rawQuote, source: rawSource } = await req.json();

    if (!rawName || !rawQuote || !rawSource) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic sanitization
    const name = rawName.trim().replace(/[<>]/g, "");
    const quote = rawQuote.trim().replace(/[<>]/g, "");
    const source = rawSource.trim().toLowerCase();

    if (name.length < 1 || name.length > 80) {
      return new Response(
        JSON.stringify({ error: "Name must be between 1 and 80 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (quote.length < 10 || quote.length > 500) {
      return new Response(
        JSON.stringify({ error: "Quote must be between 10 and 500 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const allowedSources = ['ph', 'li', 'ig', 'dm', 'yt', 'article', 'x', 'reddit'];
    if (!allowedSources.includes(source)) {
      return new Response(
        JSON.stringify({ error: "Invalid source." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: dbError } = await supabase
      .from("testimonials")
      .insert({ name, quote, source, approved: false });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to submit testimonial. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Track testimonial submission in PostHog
    await trackEvent("anonymous", "testimonial_submitted", {
      name,
      source,
    });

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
