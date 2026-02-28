-- Function to clean up old anonymous users and their data
CREATE OR REPLACE FUNCTION cleanup_old_anonymous_users(days_old INTEGER DEFAULT 7)
RETURNS TABLE(
  deleted_users INTEGER,
  deleted_listings INTEGER,
  deleted_usage_records INTEGER
) AS $$
DECLARE
  deleted_user_count INTEGER;
  deleted_listing_count INTEGER;
  deleted_usage_count INTEGER;
  cutoff_date TIMESTAMPTZ;
BEGIN
  -- Calculate cutoff date
  cutoff_date := now() - (days_old || ' days')::INTERVAL;

  -- Find anonymous users older than cutoff who haven't converted
  -- (not in pending_conversions or already converted)
  CREATE TEMP TABLE old_anonymous_users AS
  SELECT u.id
  FROM auth.users u
  WHERE u.is_anonymous = true
    AND u.created_at < cutoff_date
    AND NOT EXISTS (
      SELECT 1
      FROM pending_conversions pc
      WHERE pc.anonymous_user_id = u.id
        AND pc.converted_at IS NULL
    );

  -- Delete associated listings first (to avoid foreign key issues)
  DELETE FROM listings
  WHERE user_id IN (SELECT id FROM old_anonymous_users);
  GET DIAGNOSTICS deleted_listing_count = ROW_COUNT;

  -- Delete anonymous usage records
  DELETE FROM anonymous_usage
  WHERE user_id IN (SELECT id FROM old_anonymous_users);
  GET DIAGNOSTICS deleted_usage_count = ROW_COUNT;

  -- Delete the anonymous users from auth.users
  -- Note: This requires admin privileges, might need to be done via Supabase admin API
  -- For now, just mark them for deletion
  CREATE TEMP TABLE IF NOT EXISTS users_to_delete (
    user_id UUID,
    created_at TIMESTAMPTZ,
    marked_for_deletion TIMESTAMPTZ DEFAULT now()
  );

  INSERT INTO users_to_delete (user_id, created_at)
  SELECT id, created_at FROM old_anonymous_users;

  GET DIAGNOSTICS deleted_user_count = ROW_COUNT;

  -- Clean up temp table
  DROP TABLE old_anonymous_users;

  -- Return counts
  RETURN QUERY SELECT
    deleted_user_count,
    deleted_listing_count,
    deleted_usage_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a table to track users that should be deleted
-- (since we can't directly delete from auth.users in a function)
CREATE TABLE IF NOT EXISTS users_to_delete (
  user_id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL,
  marked_for_deletion TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_users_to_delete_marked
ON users_to_delete(marked_for_deletion);

-- Add comments
COMMENT ON FUNCTION cleanup_old_anonymous_users(INTEGER) IS 'Marks old anonymous users for deletion and removes their associated data. Default: 7 days old.';
COMMENT ON TABLE users_to_delete IS 'Tracks anonymous users that should be deleted from auth.users. Processed by admin script.';

-- Example usage:
-- SELECT * FROM cleanup_old_anonymous_users(7);  -- Clean up users older than 7 days
-- SELECT * FROM cleanup_old_anonymous_users(30); -- Clean up users older than 30 days
