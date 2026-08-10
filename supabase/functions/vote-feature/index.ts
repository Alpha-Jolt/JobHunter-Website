import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { isRateLimited } from "../_shared/rateLimit.ts";
import { trackEvent } from "../_shared/posthog.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_FEATURES = new Set([
  "multi-source-scraper", "ai-resume-tailoring", "automated-mail-sender",
  "approval-queue", "application-tracker", "stealth-mode", "scam-detection",
  "skill-developer", "mentorship-program", "subscriptions-payments",
]);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { feature_id, vote, fingerprint } = await req.json();

    if (!feature_id || !VALID_FEATURES.has(feature_id) || !fingerprint || !["up", "down"].includes(vote)) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 30 votes per IP per 10 minutes
    if (await isRateLimited(supabase, "vote-feature", ip, 30, 10 * 60 * 1000)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Ensure aggregate row exists
    await supabase.from("feature_votes").upsert(
      { feature_id, up_count: 0, down_count: 0 },
      { onConflict: "feature_id", ignoreDuplicates: true }
    );

    // Check existing vote for this fingerprint
    const { data: existing } = await supabase
      .from("feature_vote_log")
      .select("vote")
      .eq("feature_id", feature_id)
      .eq("fingerprint", fingerprint)
      .maybeSingle();

    if (existing) {
      if (existing.vote === vote) {
        // Same vote again — undo it (toggle off)
        await supabase.from("feature_vote_log").delete()
          .eq("feature_id", feature_id).eq("fingerprint", fingerprint);
        await supabase.rpc("decrement_vote", { p_feature_id: feature_id, p_col: vote === "up" ? "up_count" : "down_count" });
      } else {
        // Switch vote
        await supabase.from("feature_vote_log")
          .update({ vote })
          .eq("feature_id", feature_id).eq("fingerprint", fingerprint);
        await supabase.rpc("switch_vote", {
          p_feature_id: feature_id,
          p_old: existing.vote === "up" ? "up_count" : "down_count",
          p_new: vote === "up" ? "up_count" : "down_count",
        });
      }
    } else {
      // New vote
      await supabase.from("feature_vote_log").insert({ feature_id, fingerprint, vote });
      await supabase.rpc("increment_vote", { p_feature_id: feature_id, p_col: vote === "up" ? "up_count" : "down_count" });
    }

    const { data: counts } = await supabase
      .from("feature_votes")
      .select("up_count, down_count")
      .eq("feature_id", feature_id)
      .single();

    // Determine current vote state
    const { data: current } = await supabase
      .from("feature_vote_log")
      .select("vote")
      .eq("feature_id", feature_id)
      .eq("fingerprint", fingerprint)
      .maybeSingle();

    // Track feature voting in PostHog
    await trackEvent(fingerprint, "feature_voted", {
      feature_id,
      vote: current?.vote ?? "none",
    });

    return new Response(JSON.stringify({
      up_count: counts?.up_count ?? 0,
      down_count: counts?.down_count ?? 0,
      user_vote: current?.vote ?? null,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
