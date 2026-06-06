/*
  # Create feature_votes table

  Stores aggregated upvote/downvote counts per roadmap feature,
  and individual votes keyed by a browser fingerprint to prevent double-voting.
*/

CREATE TABLE IF NOT EXISTS feature_votes (
  feature_id   text        PRIMARY KEY,
  up_count     integer     NOT NULL DEFAULT 0,
  down_count   integer     NOT NULL DEFAULT 0,
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feature_vote_log (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id    text        NOT NULL REFERENCES feature_votes(feature_id) ON DELETE CASCADE,
  fingerprint   text        NOT NULL,
  vote          text        NOT NULL CHECK (vote IN ('up', 'down')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (feature_id, fingerprint)
);

ALTER TABLE feature_votes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_vote_log ENABLE ROW LEVEL SECURITY;

-- Allow anon reads on aggregated counts (public roadmap)
CREATE POLICY "public read feature_votes"
  ON feature_votes FOR SELECT TO anon USING (true);

-- All writes go through the Edge Function (service role), no direct anon writes
