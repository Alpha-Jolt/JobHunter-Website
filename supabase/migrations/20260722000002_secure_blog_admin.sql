-- ============================================================
-- Blog Admin Security Enforcement
-- Replaces broad "any authenticated user" policies with
-- strict "must be in admin_users allowlist" policies.
-- No credentials stored here — add your user UUID via the
-- Supabase Dashboard or the SQL snippet in the Walkthrough.
-- ============================================================

-- 1. Create admin_users allowlist table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can query the allowlist (prevents enumeration)
CREATE POLICY "Admins can read admin list" ON admin_users
  FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- ============================================================
-- 3. Drop old insecure write policies
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can manage blog categories" ON blog_categories;
DROP POLICY IF EXISTS "Authenticated users can manage blog posts"       ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can upload blog images"      ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images"      ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images"      ON storage.objects;

-- ============================================================
-- 4. blog_posts — replace with admin-only write policies
--    Public SELECT (published only) is kept from previous migration.
-- ============================================================

-- Admins can see ALL posts (including drafts)
CREATE POLICY "Admins can read all blog posts" ON blog_posts
  FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Admins can insert
CREATE POLICY "Admins can insert blog posts" ON blog_posts
  FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Admins can update
CREATE POLICY "Admins can update blog posts" ON blog_posts
  FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Admins can delete
CREATE POLICY "Admins can delete blog posts" ON blog_posts
  FOR DELETE
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- ============================================================
-- 5. blog_categories — admin-only write
-- ============================================================
CREATE POLICY "Admins can manage blog categories" ON blog_categories
  FOR ALL
  USING     (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK(auth.uid() IN (SELECT user_id FROM admin_users));

-- ============================================================
-- 6. Storage: blog-images — admin-only write
-- ============================================================
CREATE POLICY "Admins can upload blog images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'blog-images'
              AND auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update blog images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'blog-images'
         AND auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete blog images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'blog-images'
         AND auth.uid() IN (SELECT user_id FROM admin_users));
