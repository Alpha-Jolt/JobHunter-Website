/*
  # Add restrictive RLS policies for waitlist table

  ## Summary
  Enable restrictive row-level security policies on the waitlist table.
  Authenticated users and anon keys have no direct access.
  The service role (used by Edge Functions) automatically bypasses RLS.

  ## Security Changes
  - RLS enabled on public.waitlist table
  - No policies for authenticated users (they cannot access the table)
  - No policies for anon key (cannot access the table)
  - Edge Function submits via service role, which bypasses RLS
  - This is the correct restrictive-by-default RLS configuration
*/

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
