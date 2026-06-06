-- Atomic helpers for vote-feature edge function

CREATE OR REPLACE FUNCTION increment_vote(p_feature_id text, p_col text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF p_col = 'up_count' THEN
    UPDATE feature_votes SET up_count = up_count + 1, updated_at = now() WHERE feature_id = p_feature_id;
  ELSE
    UPDATE feature_votes SET down_count = down_count + 1, updated_at = now() WHERE feature_id = p_feature_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION decrement_vote(p_feature_id text, p_col text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF p_col = 'up_count' THEN
    UPDATE feature_votes SET up_count = GREATEST(0, up_count - 1), updated_at = now() WHERE feature_id = p_feature_id;
  ELSE
    UPDATE feature_votes SET down_count = GREATEST(0, down_count - 1), updated_at = now() WHERE feature_id = p_feature_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION switch_vote(p_feature_id text, p_old text, p_new text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE feature_votes SET
    up_count   = CASE WHEN p_old = 'up_count'   THEN GREATEST(0, up_count - 1)
                      WHEN p_new = 'up_count'   THEN up_count + 1
                      ELSE up_count END,
    down_count = CASE WHEN p_old = 'down_count' THEN GREATEST(0, down_count - 1)
                      WHEN p_new = 'down_count' THEN down_count + 1
                      ELSE down_count END,
    updated_at = now()
  WHERE feature_id = p_feature_id;
END;
$$;
