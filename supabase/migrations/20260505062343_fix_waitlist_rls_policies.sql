/*
  # Fix RLS policies for waitlist table

  ## Summary
  Remove overly-permissive RLS policies that allow unrestricted access.
  The service role (used by Edge Functions) automatically bypasses RLS,
  so explicit `WITH CHECK (true)` policies are unnecessary and a security risk.

  ## Security Changes
  - Drop the overly-permissive INSERT and SELECT policies
  - RLS remains enabled; the service role bypasses it automatically
  - Authenticated users and anon keys have no direct table access
*/

DROP POLICY IF EXISTS "Service role can insert waitlist entries" ON public.waitlist;
DROP POLICY IF EXISTS "Service role can read waitlist entries" ON public.waitlist;
