-- Create table for tracking anonymous user assessments (rate limiting)
CREATE TABLE IF NOT EXISTS anonymous_usage (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    ip_address text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Create index on IP address and created_at for efficient rate limit queries
CREATE INDEX IF NOT EXISTS idx_anonymous_usage_ip_created
ON anonymous_usage(ip_address, created_at DESC);

-- Create index on user_id for cleanup queries
CREATE INDEX IF NOT EXISTS idx_anonymous_usage_user_id
ON anonymous_usage(user_id);

-- Enable RLS
ALTER TABLE anonymous_usage ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own usage records
CREATE POLICY "Users can view own usage records"
ON anonymous_usage
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Service role can insert usage records
CREATE POLICY "Service role can insert usage records"
ON anonymous_usage
FOR INSERT
WITH CHECK (true);

-- Policy: Service role can delete old records (for cleanup)
CREATE POLICY "Service role can delete old records"
ON anonymous_usage
FOR DELETE
USING (true);

-- Add comment
COMMENT ON TABLE anonymous_usage IS 'Tracks anonymous user assessments for rate limiting purposes. Records are used to limit free trial assessments to 2 per IP per 24 hours.';
