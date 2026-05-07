/*
  # Create referral_redemptions table

  ## Summary
  Tracks every time a referral code is redeemed during waitlist sign-up.

  ## Tables
  - `referral_redemptions`
    - `id` (uuid, PK)
    - `referral_code` (text, FK → referral_codes.referral_code)
    - `referred_email` (text) — the new user who used the code
    - `discount_applied_percent` (integer) — the discount % that was applied
    - `redeemed_at` (timestamptz)

  ## Security
  - RLS enabled; only the service role can read/write
  - Index on referral_code for fast lookup of redemption counts
*/

CREATE TABLE IF NOT EXISTS referral_redemptions (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code           text        NOT NULL REFERENCES referral_codes(referral_code) ON DELETE CASCADE,
  referred_email          text        NOT NULL,
  discount_applied_percent integer    NOT NULL DEFAULT 0,
  redeemed_at             timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE referral_redemptions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_referral_redemptions_code ON referral_redemptions (referral_code);
