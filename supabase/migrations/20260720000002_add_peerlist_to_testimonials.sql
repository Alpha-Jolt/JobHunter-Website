ALTER TABLE testimonials
  DROP CONSTRAINT IF EXISTS testimonials_source_check;

ALTER TABLE testimonials
  ADD CONSTRAINT testimonials_source_check
  CHECK (source IN ('ph','li','ig','dm','yt','article', 'x', 'reddit', 'peerlist'));
