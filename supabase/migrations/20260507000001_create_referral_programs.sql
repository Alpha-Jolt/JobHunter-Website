/*
  # Create referral_programs table

  ## Summary
  Stores referral program configuration. A single active program drives all code generation.

  ## Tables
  - `referral_programs`
    - `id` (uuid, PK)
    - `discount_percent` (integer) — e.g. 20 for 20% off
    - `offer_description` (text) — human-readable description shown on the referral page
    - `validity_days` (integer) — how many days a generated code remains valid (0 = no expiry)
    - `max_uses_per_code` (integer) — max redemptions per code (0 = unlimited)
    - `is_active` (boolean) — only one program should be active at a time
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled; only the service role (used by Edge Functions) can read/write
*/

CREATE TABLE IF NOT EXISTS referral_programs (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  discount_percent  integer     NOT NULL DEFAULT 20 CHECK (discount_percent > 0 AND discount_percent <= 100),
  offer_description text        NOT NULL DEFAULT 'Get exclusive early-access discount when you join JobHunter via a referral.',
  validity_days     integer     NOT NULL DEFAULT 0 CHECK (validity_days >= 0),
  max_uses_per_code integer     NOT NULL DEFAULT 0 CHECK (max_uses_per_code >= 0),
  is_active         boolean     NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE referral_programs ENABLE ROW LEVEL SECURITY;

-- Seed the default program
INSERT INTO referral_programs (discount_percent, offer_description, validity_days, max_uses_per_code, is_active)
VALUES (20, 'Get 20% off your first subscription when you join JobHunter through a friend''s referral link.', 0, 0, true);
