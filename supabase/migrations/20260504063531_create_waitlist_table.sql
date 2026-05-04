/*
  # Create waitlist table

  ## Summary
  Stores email sign-ups from all EmailCapture forms across the site.

  ## Tables
  - `waitlist`
    - `id` (uuid, PK) — unique row identifier
    - `email` (text, unique) — user's email address; unique so duplicate sign-ups are ignored
    - `user_type` (text) — either 'job_seeker' or 'mentor'; defaults to 'job_seeker'
    - `source` (text) — which form/page the sign-up came from (e.g. 'hero', 'mentor', 'features-cta')
    - `created_at` (timestamptz) — timestamp of sign-up

  ## Security
  - RLS enabled; only the service role (used by Edge Functions) can insert or read rows
  - No authenticated-user policies — all submissions go through a server-side Edge Function
    that validates the Turnstile token before inserting, so the anon key is never given
    direct write access to this table
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text        UNIQUE NOT NULL,
  user_type   text        NOT NULL DEFAULT 'job_seeker' CHECK (user_type IN ('job_seeker', 'mentor')),
  source      text        NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Service-role key (used by the Edge Function) bypasses RLS automatically.
-- We intentionally add NO anon/authenticated policies so direct client access
-- is fully blocked — all writes must go through the verified Edge Function.
