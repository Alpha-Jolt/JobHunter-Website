-- Rate limiting table shared across edge functions
CREATE TABLE IF NOT EXISTS rate_limits (
  key         text        NOT NULL,           -- e.g. "submit-waitlist:1.2.3.4"
  window_start timestamptz NOT NULL DEFAULT now(),
  count       integer     NOT NULL DEFAULT 1,
  PRIMARY KEY (key)
);

-- Auto-clean old windows (older than 1 hour) via a periodic function isn't needed;
-- we handle expiry inline. Index helps the lookup.
CREATE INDEX IF NOT EXISTS rate_limits_key_idx ON rate_limits (key);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
-- No client access — only service role from edge functions
