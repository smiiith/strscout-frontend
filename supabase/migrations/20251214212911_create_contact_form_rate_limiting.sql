-- Create table for contact form rate limiting
CREATE TABLE IF NOT EXISTS contact_form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for fast lookups by IP and timestamp
CREATE INDEX IF NOT EXISTS idx_contact_form_submissions_ip_time
  ON contact_form_submissions(ip_address, submitted_at DESC);

-- Add index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_contact_form_submissions_time
  ON contact_form_submissions(submitted_at DESC);

-- Enable Row Level Security (but allow service role full access)
ALTER TABLE contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can insert/select/delete
CREATE POLICY "Service role has full access to contact_form_submissions"
  ON contact_form_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to clean up old submissions (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_old_contact_submissions()
RETURNS void AS $$
BEGIN
  DELETE FROM contact_form_submissions
  WHERE submitted_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment on table
COMMENT ON TABLE contact_form_submissions IS 'Tracks contact form submissions for rate limiting purposes. Records are automatically cleaned up after 24 hours.';
