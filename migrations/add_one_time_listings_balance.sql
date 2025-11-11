-- Migration: Add one_time_listings_balance to profiles table
-- Purpose: Track unused one-time purchase listings that persist across billing type changes
-- Date: 2025-01-10

-- Add the new column
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS one_time_listings_balance INTEGER DEFAULT 0;

-- Set initial balance for existing one-time purchase users
-- Balance = listings_purchased - market_spy_listings_used
UPDATE profiles
SET one_time_listings_balance = GREATEST(0, COALESCE(listings_purchased, 0) - COALESCE(market_spy_listings_used, 0))
WHERE billing_type = 'one_time'
  AND listings_purchased IS NOT NULL
  AND listings_purchased > 0;

-- Add comment to explain the column
COMMENT ON COLUMN profiles.one_time_listings_balance IS
'Unused one-time purchase listings that carry over when switching to subscription. Never expires until used.';

-- Verify the migration
SELECT
  id,
  billing_type,
  listings_purchased,
  market_spy_listings_used,
  one_time_listings_balance,
  market_spy_listings_limit
FROM profiles
WHERE billing_type = 'one_time'
ORDER BY created_at DESC
LIMIT 10;
