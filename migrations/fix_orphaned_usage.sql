-- Migration: Fix users with orphaned usage from before one_time_listings_balance existed
-- Purpose: Identify and fix users who used Market Spy before the balance tracking was implemented
-- Date: 2025-01-22
--
-- IMPORTANT: Review the results of the SELECT query before running the UPDATE

BEGIN;

-- Step 1: Identify affected users
-- These are users where:
-- - They have usage (market_spy_listings_used > 0)
-- - Their balance/limit doesn't account for that usage
-- - They're over their limit (used > limit)
SELECT
  id,
  primary_email,
  billing_type,
  market_spy_listings_used as used,
  market_spy_listings_limit as limit,
  one_time_listings_balance as balance,
  listings_purchased as purchased,
  subscription_quantity,
  subscription_status,
  -- Calculate what the balance SHOULD be
  CASE
    WHEN billing_type = 'one_time' THEN
      -- For one-time: balance should account for usage
      GREATEST(0, COALESCE(market_spy_listings_used, 0))
    WHEN billing_type = 'subscription' THEN
      -- For subscription: might have prepaid balance from before
      COALESCE(one_time_listings_balance, 0)
    ELSE
      0
  END as suggested_balance_adjustment,
  -- Is this user affected?
  CASE
    WHEN market_spy_listings_used > market_spy_listings_limit THEN 'OVER_LIMIT'
    WHEN billing_type = 'one_time'
         AND market_spy_listings_used > 0
         AND one_time_listings_balance < market_spy_listings_used THEN 'MISSING_BALANCE'
    ELSE 'OK'
  END as status
FROM profiles
WHERE
  -- Users who are over their limit OR have suspicious data
  (market_spy_listings_used > market_spy_listings_limit)
  OR (
    billing_type = 'one_time'
    AND market_spy_listings_used > 0
    AND one_time_listings_balance < market_spy_listings_used
  )
ORDER BY market_spy_listings_used DESC;

-- Step 2: Fix affected users (COMMENTED OUT - uncomment after reviewing above results)
-- This will:
-- 1. Set one_time_listings_balance to match historical usage for one-time users
-- 2. Set market_spy_listings_limit to match the balance
-- 3. NOT reset usage (preserve history)

/*
UPDATE profiles
SET
  one_time_listings_balance = GREATEST(
    COALESCE(one_time_listings_balance, 0),
    COALESCE(market_spy_listings_used, 0)
  ),
  market_spy_listings_limit = GREATEST(
    COALESCE(market_spy_listings_limit, 0),
    COALESCE(market_spy_listings_used, 0)
  ),
  listings_purchased = GREATEST(
    COALESCE(listings_purchased, 0),
    COALESCE(market_spy_listings_used, 0)
  ),
  updated_at = NOW()
WHERE
  -- Only fix one-time users who are over limit
  billing_type = 'one_time'
  AND market_spy_listings_used > market_spy_listings_limit
RETURNING
  id,
  primary_email,
  market_spy_listings_used,
  market_spy_listings_limit,
  one_time_listings_balance,
  listings_purchased;
*/

COMMIT;

-- Step 3: Verify the fix (run after uncommenting and executing the UPDATE)
/*
SELECT
  id,
  primary_email,
  billing_type,
  market_spy_listings_used as used,
  market_spy_listings_limit as limit,
  one_time_listings_balance as balance,
  listings_purchased as purchased,
  CASE
    WHEN market_spy_listings_used > market_spy_listings_limit THEN 'STILL_OVER_LIMIT'
    ELSE 'FIXED'
  END as status
FROM profiles
WHERE billing_type = 'one_time'
  AND market_spy_listings_used > 0
ORDER BY market_spy_listings_used DESC;
*/
