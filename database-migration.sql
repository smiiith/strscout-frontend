-- Database schema updates for Pro Plan with quantities
-- Run these SQL commands in your Supabase SQL editor

-- 1. Add new columns to profiles table for subscription management
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS subscription_quantity INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS market_spy_listings_limit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS market_spy_listings_used INTEGER DEFAULT 0;

-- 2. Add Pro Plan to plans table
INSERT INTO plans (key, name, description, active, created_at) 
VALUES ('pro', 'Pro Plan', 'STR Genius + Market Spy (2 listings per plan)', true, NOW())
ON CONFLICT (key) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  active = EXCLUDED.active;

-- 3. Update existing freemium plan description (optional)
UPDATE plans 
SET description = 'STR Genius access only'
WHERE key = 'freemium';

-- 4. Create indexes for better performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_profiles_plan_id ON profiles(plan_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_subscription_id ON profiles(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_profiles_market_spy_usage ON profiles(market_spy_listings_used, market_spy_listings_limit);

-- 5. Update existing users' Market Spy limits based on their current plans
-- This sets limits for users who already have subscriptions
UPDATE profiles 
SET market_spy_listings_limit = CASE 
  WHEN plan_id = (SELECT id FROM plans WHERE key = 'standard') THEN 2
  WHEN plan_id = (SELECT id FROM plans WHERE key = 'pro') THEN 2  -- Default to 2 for existing pro users
  ELSE 0
END
WHERE market_spy_listings_limit = 0;  -- Only update if not already set

-- 6. Verify the changes
SELECT 
  p.key as plan_key,
  p.name as plan_name,
  COUNT(*) as user_count
FROM profiles pr
JOIN plans p ON pr.plan_id = p.id
GROUP BY p.key, p.name
ORDER BY p.key;