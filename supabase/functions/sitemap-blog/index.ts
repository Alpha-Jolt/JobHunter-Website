import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, published_at, blog_categories(slug)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    return new Response("Internal Server Error", { status: 500 });
  }

  const siteUrl = Deno.env.get("SITE_URL") || "https://myjobhunter.in";
  let urls = (posts || []).map((post: Record<string, unknown>) => {
    const catSlug = (post.blog_categories as Record<string, string> | null)?.slug;
    const loc = catSlug
      ? `${siteUrl}/blog/${catSlug}/${post.slug}`
      : `${siteUrl}/blog/${post.slug}`;
    const lastmod = post.published_at
      ? String(post.published_at).slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("\n");

  if (!urls) {
    urls = `  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
