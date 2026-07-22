import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { isRateLimited } from "../_shared/rateLimit.ts";
import { trackEvent } from "../_shared/posthog.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_EMOJIS = new Set(['👍','❤️','🔥','🤯','🙌']);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { post_id, emoji, fingerprint } = await req.json();

    if (!post_id || !VALID_EMOJIS.has(emoji) || !fingerprint) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 30 reactions per IP per 10 minutes
    if (await isRateLimited(supabase, "blog-reactions", ip, 30, 10 * 60 * 1000)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Toggle reaction logic
    const { data: existing } = await supabase
      .from("blog_reactions")
      .select("id, emoji")
      .eq("post_id", post_id)
      .eq("fingerprint", fingerprint)
      .maybeSingle();

    if (existing) {
      if (existing.emoji === emoji) {
        // Already reacted with this emoji, remove it (toggle off)
        await supabase.from("blog_reactions").delete().eq("id", existing.id);
      } else {
        // Different emoji clicked, update to the new one
        await supabase.from("blog_reactions").update({ emoji }).eq("id", existing.id);
      }
    } else {
      // Add reaction
      await supabase.from("blog_reactions").insert({ post_id, fingerprint, emoji });
    }

    // Return the updated counts for this post
    const { data: countsData, error: countsError } = await supabase
      .from("blog_reactions")
      .select("emoji")
      .eq("post_id", post_id);

    if (countsError) {
      throw countsError;
    }

    // Aggregate counts
    const reactionCounts: Record<string, number> = {
      '👍': 0, '❤️': 0, '🔥': 0, '🤯': 0, '🙌': 0
    };
    for (const row of (countsData || [])) {
      if (reactionCounts[row.emoji] !== undefined) {
        reactionCounts[row.emoji]++;
      }
    }

    // Track in PostHog
    await trackEvent(fingerprint, "blog_reacted", {
      post_id,
      emoji,
      action: existing ? "removed" : "added"
    });

    return new Response(JSON.stringify({
      counts: reactionCounts,
      added: !existing
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
