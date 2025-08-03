-- Fix listing counts for existing one-time payment users
-- This script corrects users who have incorrect listing counts due to using Stripe quantity instead of price ID mapping

-- Note: You'll need to replace the price IDs with your actual Stripe price IDs from environment variables

-- Update users based on their actual purchase price ID
-- This is a template - you'll need to run queries to find users with specific price IDs and update them

-- Example updates (replace with your actual price IDs):
-- UPDATE profiles 
-- SET 
--   listings_purchased = 5,
--   market_spy_listings_limit = 5,
--   subscription_quantity = 5,
--   updated_at = NOW()
-- WHERE 
--   billing_type = 'one_time'
--   AND listings_purchased = 1
--   AND market_spy_listings_limit = 1
--   -- AND stripe_customer_id IN (SELECT customer FROM stripe payments with 5-listing price ID);

-- For now, let's identify users who might need fixing:
SELECT 
  id,
  billing_type,
  listings_purchased,
  market_spy_listings_limit,
  subscription_quantity,
  stripe_customer_id,
  purchase_date
FROM profiles 
WHERE 
  billing_type = 'one_time'
  AND (
    listings_purchased = 1 
    OR market_spy_listings_limit = 1
    OR subscription_quantity = 1
  )
ORDER BY purchase_date DESC;

-- To properly fix these users, you would need to:
-- 1. Check their Stripe payment history to get the actual price ID they paid
-- 2. Map that price ID to the correct listing count
-- 3. Update their profile accordingly

-- Manual fix example for a user who purchased 5 listings:
-- UPDATE profiles 
-- SET 
--   listings_purchased = 5,
--   market_spy_listings_limit = 5,
--   subscription_quantity = 5,
--   updated_at = NOW()
-- WHERE id = 'user-id-here';