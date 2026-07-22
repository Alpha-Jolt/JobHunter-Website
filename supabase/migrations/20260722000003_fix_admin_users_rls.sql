-- Drop the old recursive policy
DROP POLICY IF EXISTS "Admins can read admin list" ON admin_users;

-- Create the new correct policy (users can only read their own row)
CREATE POLICY "Admins can read admin list" ON admin_users
  FOR SELECT
  USING (auth.uid() = user_id);
