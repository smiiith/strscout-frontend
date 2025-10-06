-- Fix billing_type issue for existing users
-- This script corrects users who were incorrectly set as 'subscription' when they should be 'one_time'

-- Update users who have:
-- 1. subscription_status = 'active' 
-- 2. billing_type = 'subscription'
-- 3. BUT no stripe_subscription_id (indicating one-time payment)
UPDATE profiles 
SET 
  billing_type = 'one_time',
  subscription_status = NULL,  -- One-time payments shouldn't have subscription status
  updated_at = NOW()
WHERE 
  billing_type = 'subscription'
  AND subscription_status = 'active'
  AND (stripe_subscription_id IS NULL OR stripe_subscription_id = '');

-- Verify the fix
SELECT 
  billing_type,
  subscription_status,
  stripe_subscription_id IS NOT NULL as has_subscription_id,
  market_spy_listings_limit,
  subscription_quantity,
  COUNT(*) as user_count
FROM profiles 
WHERE plan_id IS NOT NULL  -- Only look at users with plans
GROUP BY 
  billing_type, 
  subscription_status, 
  has_subscription_id,
  market_spy_listings_limit,
  subscription_quantity
ORDER BY billing_type, subscription_status;