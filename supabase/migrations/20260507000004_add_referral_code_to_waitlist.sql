/*
  # Add referral_code column to waitlist table

  ## Summary
  Links a waitlist signup to the referral code that was used during sign-up.
  NULL means the user joined organically (no referral).

  ## Changes
  - Adds `referral_code` column (text, nullable, FK → referral_codes.referral_code)
*/

ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS referral_code text REFERENCES referral_codes(referral_code) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist (referral_code);
