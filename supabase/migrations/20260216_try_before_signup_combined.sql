-- =============================================================================
-- Try Before Signup - Combined Migration
-- Applies all changes needed for the anonymous user try flow.
-- Run this in the Supabase SQL Editor for any environment that needs it.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Create anonymous_usage table (rate limiting: 2 assessments per IP/24hrs)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS anonymous_usage (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    ip_address text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_anonymous_usage_ip_created
ON anonymous_usage(ip_address, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_anonymous_usage_user_id
ON anonymous_usage(user_id);

ALTER TABLE anonymous_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage records"
ON anonymous_usage FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert usage records"
ON anonymous_usage FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can delete old records"
ON anonymous_usage FOR DELETE
USING (true);

COMMENT ON TABLE anonymous_usage IS 'Tracks anonymous user assessments for rate limiting. Limit: 2 per IP per 24 hours.';


-- -----------------------------------------------------------------------------
-- 2. Auto-update updated_at on profiles
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON profiles;

CREATE TRIGGER set_updated_at
    BEFORE INSERT OR UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically sets updated_at to current timestamp on INSERT or UPDATE';


-- -----------------------------------------------------------------------------
-- 3. Create pending_conversions table
--    Tracks anonymous users who captured their email but haven't registered yet.
--    Used to transfer property ownership after email confirmation.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pending_conversions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    anonymous_user_id uuid NOT NULL,
    email text NOT NULL,
    property_id uuid NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
    converted_at timestamptz,
    new_user_id uuid
);

CREATE INDEX IF NOT EXISTS idx_pending_conversions_email
ON pending_conversions(email) WHERE converted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_pending_conversions_expires
ON pending_conversions(expires_at) WHERE converted_at IS NULL;

ALTER TABLE pending_conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access"
ON pending_conversions FOR ALL
USING (true);

COMMENT ON TABLE pending_conversions IS 'Tracks anonymous users who captured their email but not yet completed registration. Used to transfer property ownership after registration completes.';


-- -----------------------------------------------------------------------------
-- 4. Add created_at to profiles
-- -----------------------------------------------------------------------------
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

UPDATE profiles
SET created_at = COALESCE(updated_at, now())
WHERE created_at IS NULL;

ALTER TABLE profiles
ALTER COLUMN created_at SET NOT NULL;

COMMENT ON COLUMN profiles.created_at IS 'Timestamp when the profile was created';


-- -----------------------------------------------------------------------------
-- 5. Cleanup function for old anonymous users
--    Called by admin endpoint: POST /api/admin/cleanup-anonymous-users
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users_to_delete (
  user_id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL,
  marked_for_deletion TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_to_delete_marked
ON users_to_delete(marked_for_deletion);

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
  cutoff_date := now() - (days_old || ' days')::INTERVAL;

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

  DELETE FROM listings
  WHERE user_id IN (SELECT id FROM old_anonymous_users);
  GET DIAGNOSTICS deleted_listing_count = ROW_COUNT;

  DELETE FROM anonymous_usage
  WHERE user_id IN (SELECT id FROM old_anonymous_users);
  GET DIAGNOSTICS deleted_usage_count = ROW_COUNT;

  INSERT INTO users_to_delete (user_id, created_at)
  SELECT id, created_at FROM old_anonymous_users;
  GET DIAGNOSTICS deleted_user_count = ROW_COUNT;

  DROP TABLE old_anonymous_users;

  RETURN QUERY SELECT
    deleted_user_count,
    deleted_listing_count,
    deleted_usage_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_old_anonymous_users(INTEGER) IS 'Marks old anonymous users for deletion and removes their associated data. Default: 7 days old.';
COMMENT ON TABLE users_to_delete IS 'Tracks anonymous users that should be deleted from auth.users. Processed by admin API endpoint.';


-- -----------------------------------------------------------------------------
-- 6. Update handle_new_user trigger to create profiles for anonymous users
--    Required because str_properties has a foreign key to profiles.id
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, primary_email, plan_id)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Anonymous User'),
    new.raw_user_meta_data->>'avatar_url',
    new.email,  -- NULL for anonymous users until they convert
    '5cb61d3c-306e-4518-8ec1-fa59585ce27c'  -- Freemium plan ID
  )
  ON CONFLICT (id) DO UPDATE
  SET
    primary_email = EXCLUDED.primary_email,
    full_name = CASE
      WHEN EXCLUDED.full_name = 'Anonymous User' THEN profiles.full_name
      ELSE COALESCE(EXCLUDED.full_name, profiles.full_name)
    END,
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = now();

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger (in case it needs updating)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Creates profile for all users including anonymous. Anonymous users have NULL email until conversion.';

-- Backfill any existing anonymous users missing a profile
INSERT INTO public.profiles (id, full_name, primary_email, plan_id)
SELECT
  u.id,
  'Anonymous User',
  u.email,
  '5cb61d3c-306e-4518-8ec1-fa59585ce27c'
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
