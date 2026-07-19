CREATE TABLE testimonials (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  quote       text        NOT NULL CHECK (char_length(quote) BETWEEN 10 AND 500),
  source      text        NOT NULL DEFAULT 'dm'
                          CHECK (source IN ('ph','li','ig','dm','yt','article', 'x', 'reddit')),
  approved    boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- RLS: public read of approved rows only
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved testimonials"
  ON testimonials FOR SELECT
  USING (approved = true);
