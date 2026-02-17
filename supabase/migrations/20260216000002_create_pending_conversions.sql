-- Create table for tracking pending anonymous user conversions
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

-- Create index for quick lookup by email
CREATE INDEX IF NOT EXISTS idx_pending_conversions_email
ON pending_conversions(email) WHERE converted_at IS NULL;

-- Create index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_pending_conversions_expires
ON pending_conversions(expires_at) WHERE converted_at IS NULL;

-- Enable RLS
ALTER TABLE pending_conversions ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything
CREATE POLICY "Service role has full access"
ON pending_conversions
FOR ALL
USING (true);

-- Add comment
COMMENT ON TABLE pending_conversions IS 'Tracks anonymous users who have captured their email but not yet completed registration. Used to transfer property ownership after registration completes.';
