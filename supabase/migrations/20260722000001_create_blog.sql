-- Categories / Tags
CREATE TABLE blog_categories (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL,
  slug  TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Posts
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  subtitle        TEXT,
  excerpt         TEXT NOT NULL,          -- used in cards + meta description
  content         TEXT NOT NULL,          -- Markdown/MDX body
  cover_image_url TEXT,
  author_name     TEXT NOT NULL,          -- Displayed author name
  category_id     UUID REFERENCES blog_categories(id),
  tags            TEXT[] DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  published_at    TIMESTAMPTZ,
  read_time_mins  INT GENERATED ALWAYS AS (GREATEST(1, ROUND(array_length(regexp_split_to_array(content, '\s+'), 1)::NUMERIC / 200))) STORED,
  -- SEO fields
  seo_title       TEXT,                   -- overrides title in <title> tag
  seo_description TEXT,                   -- overrides excerpt in <meta description>
  og_image_url    TEXT,                   -- overrides cover_image_url for OG
  -- Schema.org
  schema_type     TEXT DEFAULT 'Article', -- 'Article' | 'BlogPosting' | 'NewsArticle'
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Reactions (emoji lightweight engagement)
CREATE TABLE blog_reactions (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id  UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  emoji    TEXT NOT NULL CHECK (emoji IN ('👍','❤️','🔥','🤯','🙌')),
  fingerprint TEXT NOT NULL,              -- browser fingerprint, rate-limit per-device
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (post_id, fingerprint, emoji)    -- one per emoji per device per post
);

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- blog_categories
CREATE POLICY "Public can view blog categories" ON blog_categories
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage blog categories" ON blog_categories
  USING (auth.role() = 'authenticated');

-- blog_posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  USING (auth.role() = 'authenticated');

-- blog_reactions
CREATE POLICY "Public can view reactions" ON blog_reactions
  FOR SELECT USING (true);
CREATE POLICY "Public can insert reactions" ON blog_reactions
  FOR INSERT WITH CHECK (true); -- Rate limiting handled by edge function
CREATE POLICY "Authenticated users can manage reactions" ON blog_reactions
  USING (auth.role() = 'authenticated');

-- Storage Bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
