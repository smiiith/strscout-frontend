-- Partner tokens for giving partners/promoters free access to Market Spy & Market Scout
-- Each token grants 1 run, creates an invisible anonymous session on redemption

CREATE TABLE IF NOT EXISTS partner_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  partner_name text NOT NULL,
  notes text,
  runs_granted int NOT NULL DEFAULT 1,
  redeemed_at timestamptz,
  redeemed_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_partner_tokens_token ON partner_tokens(token);
CREATE INDEX IF NOT EXISTS idx_partner_tokens_redeemed ON partner_tokens(redeemed_at) WHERE redeemed_at IS NULL;

ALTER TABLE partner_tokens ENABLE ROW LEVEL SECURITY;

-- Only service role can access (admin API routes use SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "Service role full access to partner_tokens"
  ON partner_tokens FOR ALL
  USING (true);

-- Add partner user flag to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_partner_user boolean NOT NULL DEFAULT false;
