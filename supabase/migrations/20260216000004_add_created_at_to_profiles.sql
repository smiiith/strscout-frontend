-- Add created_at column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Backfill existing records (use updated_at if it exists, otherwise use now())
UPDATE profiles
SET created_at = COALESCE(updated_at, now())
WHERE created_at IS NULL;

-- Make created_at NOT NULL after backfilling
ALTER TABLE profiles
ALTER COLUMN created_at SET NOT NULL;

-- Add comment
COMMENT ON COLUMN profiles.created_at IS 'Timestamp when the profile was created';
