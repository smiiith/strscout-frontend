-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles table to auto-update updated_at
DROP TRIGGER IF EXISTS set_updated_at ON profiles;

CREATE TRIGGER set_updated_at
    BEFORE INSERT OR UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Backfill existing records where updated_at is null
UPDATE profiles
SET updated_at = created_at
WHERE updated_at IS NULL;

-- Add comment
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically sets updated_at to current timestamp on INSERT or UPDATE';
