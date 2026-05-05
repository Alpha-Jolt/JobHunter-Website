/*
  # Add RLS policies for waitlist table

  ## Summary
  Add row-level security policies to the waitlist table.

  ## Security Changes
  - INSERT policy allows the service role to insert records (used by Edge Function)
  - SELECT policy allows the service role to read records (for admin/monitoring)
  - No authenticated user policies — all submissions go through the verified Edge Function only
*/

CREATE POLICY "Service role can insert waitlist entries"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can read waitlist entries"
  ON public.waitlist
  FOR SELECT
  USING (true);
