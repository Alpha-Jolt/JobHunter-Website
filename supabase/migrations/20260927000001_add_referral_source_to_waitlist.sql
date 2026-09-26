/*
  # Add referral source to waitlist

  ## Summary
  Adds `referral_source` and `referral_source_other` columns to `waitlist` table to track how users heard about the product.
*/

ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS referral_source text,
  ADD COLUMN IF NOT EXISTS referral_source_other text;

COMMENT ON COLUMN waitlist.referral_source IS
  'How the user heard about JobHunter. One of: Google Search, Someone told me, Peerlist, Instagram, ChatGPT or other AI, LinkedIn, X (Twitter), Product Hunt, Other.';

COMMENT ON COLUMN waitlist.referral_source_other IS
  'Free-text detail when referral_source = ''Other''. Max 100 chars.';
