/*
  # Create referral_codes table

  ## Summary
  Tracks every referral code generated for a waitlist user.

  ## Tables
  - `referral_codes`
    - `id` (uuid, PK)
    - `user_email` (text, FK → waitlist.email) — the sharer
    - `referral_code` (text, unique, indexed) — 8-character alphanumeric code
    - `discount_percent` (integer) — snapshot from referral_programs at generation time
    - `status` (text) — 'active' | 'used' | 'expired'
    - `is_active` (boolean)
    - `created_at` (timestamptz)
    - `expires_at` (timestamptz, nullable) — null = never expires

  ## Security
  - RLS enabled; only the service role can read/write
  - Unique constraint on referral_code
  - FK to waitlist enforces referral codes are only created for registered emails
*/

CREATE TABLE IF NOT EXISTS referral_codes (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email       text        NOT NULL REFERENCES waitlist(email) ON DELETE CASCADE,
  referral_code    text        UNIQUE NOT NULL,
  discount_percent integer     NOT NULL DEFAULT 20,
  status           text        NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
  is_active        boolean     NOT NULL DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),
  expires_at       timestamptz
);

ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;

-- Fast lookups by code and by email
CREATE INDEX IF NOT EXISTS idx_referral_codes_code       ON referral_codes (referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_email ON referral_codes (user_email);
