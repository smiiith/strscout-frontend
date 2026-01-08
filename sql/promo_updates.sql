  BEGIN;

  -- Step 1: Check current state of users
  SELECT
    primary_email,
    plan_id,
    billing_type,
    one_time_listings_balance,
    market_spy_listings_limit,
    market_spy_listings_used
  FROM profiles
  WHERE primary_email IN (
    -- 'user1@example.com',
    -- 'user2@example.com',
    'smiiith+6@gmail.com'
    -- Add all 40 emails
  )
  ORDER BY primary_email;

  -- Step 2: Upgrade users to Pro plan with one-time credits
  UPDATE profiles
  SET
    -- Upgrade to Pro plan (required for Market Spy access)
    plan_id = '32ae3031-aa06-4455-b5db-5b8ff11d85a0', -- Pro plan UUID from plan-sync.ts:43

    -- Set billing type to one-time
    billing_type = 'one_time',

    -- Add 5 credits to prepaid balance
    one_time_listings_balance = COALESCE(one_time_listings_balance, 0) + 5,

    -- Set total limit (will show as "5 remaining" in UI)
    market_spy_listings_limit = COALESCE(market_spy_listings_limit, 0) + 5,

    -- Set current tier based on promo amount
    current_tier = 'pro', -- or 'starter', 'growth', etc. based on amount

    -- Track when this was granted
    updated_at = NOW()

  WHERE primary_email IN (
    'smiiith+6@gmail.com'
    -- Add all 40 emails
  );

  -- Step 3: Verify the changes
  SELECT
    primary_email,
    plan_id,
    billing_type,
    one_time_listings_balance,
    market_spy_listings_limit,
    market_spy_listings_used,
    (market_spy_listings_limit - COALESCE(market_spy_listings_used, 0)) as remaining
  FROM profiles
  WHERE primary_email IN (
    'smiiith+6@gmail.com'
    -- Add all 40 emails
  )
  ORDER BY primary_email;

  -- If everything looks good:
  COMMIT;

  -- If something looks wrong:
  -- ROLLBACK;
