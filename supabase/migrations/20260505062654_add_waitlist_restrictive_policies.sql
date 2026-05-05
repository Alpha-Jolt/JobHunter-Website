/*
  # Add restrictive RLS policies for waitlist table

  ## Summary
  Add explicit restrictive policies to the waitlist table.
  Prevents all unauthenticated and authenticated client access.
  The service role (used by Edge Functions) automatically bypasses RLS.

  ## Security Changes
  - Add SELECT policy denying all authenticated users
  - Add INSERT policy denying all authenticated users
  - Add UPDATE policy denying all authenticated users
  - Add DELETE policy denying all authenticated users
  - RLS remains enabled; service role automatically bypasses these policies
*/

CREATE POLICY "Deny all authenticated access"
  ON public.waitlist FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Deny all insert access"
  ON public.waitlist FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "Deny all update access"
  ON public.waitlist FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny all delete access"
  ON public.waitlist FOR DELETE
  TO authenticated
  USING (false);
