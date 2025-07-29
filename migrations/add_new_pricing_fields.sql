-- Migration: Add new pricing model fields to profiles table
-- Run this script to add support for subscription vs one-time billing

BEGIN;

-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS billing_type text DEFAULT 'subscription',
ADD COLUMN IF NOT EXISTS current_tier text DEFAULT 'starter',
ADD COLUMN IF NOT EXISTS listings_purchased int4 DEFAULT 0,
ADD COLUMN IF NOT EXISTS purchase_date timestamptz,
ADD COLUMN IF NOT EXISTS current_period_start timestamptz,
ADD COLUMN IF NOT EXISTS current_period_end timestamptz;

-- Add comments for documentation
COMMENT ON COLUMN public.profiles.billing_type IS 'Type of billing: subscription or one_time';
COMMENT ON COLUMN public.profiles.current_tier IS 'Current pricing tier: starter, growth, pro, portfolio';
COMMENT ON COLUMN public.profiles.listings_purchased IS 'Total listings purchased (for one-time payments)';
COMMENT ON COLUMN public.profiles.purchase_date IS 'Date of last purchase (for one-time payments)';
COMMENT ON COLUMN public.profiles.current_period_start IS 'Start of current billing period';
COMMENT ON COLUMN public.profiles.current_period_end IS 'End of current billing period';

-- Add check constraints for data integrity
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_billing_type_check 
CHECK (billing_type IN ('subscription', 'one_time'));

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_current_tier_check 
CHECK (current_tier IN ('starter', 'growth', 'pro', 'portfolio'));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_billing_type ON public.profiles(billing_type);
CREATE INDEX IF NOT EXISTS idx_profiles_current_tier ON public.profiles(current_tier);
CREATE INDEX IF NOT EXISTS idx_profiles_purchase_date ON public.profiles(purchase_date);

-- Optional: Create table to track Stripe price mappings for better maintenance
CREATE TABLE IF NOT EXISTS public.stripe_price_mappings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  stripe_price_id text UNIQUE NOT NULL,
  billing_type text NOT NULL CHECK (billing_type IN ('subscription', 'one_time')),
  listing_count int4 NOT NULL CHECK (listing_count > 0),
  tier text NOT NULL CHECK (tier IN ('starter', 'growth', 'pro', 'portfolio')),
  amount_cents int4 NOT NULL,
  active bool DEFAULT true NOT NULL
);

COMMENT ON TABLE public.stripe_price_mappings IS 'Maps Stripe price IDs to internal pricing structure';

-- Insert your Stripe price mappings (update with actual price IDs from your Stripe dashboard)
INSERT INTO public.stripe_price_mappings (stripe_price_id, billing_type, listing_count, tier, amount_cents, active) VALUES
-- Subscription prices (replace with your actual subscription price ID)
('price_1Rq5lNRQojxLKgwUdNomfEUC', 'subscription', 1, 'starter', 3000, true),

-- One-time prices (replace with your actual one-time price IDs)
('price_1RqGQARQojxLKgwUlKeil3NQ', 'one_time', 1, 'starter', 3500, true),
('price_1RqGQARQojxLKgwUmHOA51R3', 'one_time', 2, 'growth', 4500, true),
('price_1RqGQARQojxLKgwUVUjzae1C', 'one_time', 3, 'growth', 5500, true),
('price_1RqGQARQojxLKgwUwOZ2fKhC', 'one_time', 4, 'pro', 6500, true),
('price_1RqGQARQojxLKgwUHyiGFih1', 'one_time', 5, 'pro', 7500, true),
('price_1RqGQARQojxLKgwUE2n9Xe1I', 'one_time', 6, 'portfolio', 8800, true),
('price_1RqGQARQojxLKgwUxEyOBrCj', 'one_time', 7, 'portfolio', 10100, true),
('price_1RqGQARQojxLKgwUCGtNjgnS', 'one_time', 8, 'portfolio', 11400, true),
('price_1RqGQARQojxLKgwUR4Uru39D', 'one_time', 9, 'portfolio', 12700, true),
('price_1RqGQARQojxLKgwU8JFMz2yr', 'one_time', 10, 'portfolio', 14000, true)

ON CONFLICT (stripe_price_id) DO NOTHING;

COMMIT;

-- Verification queries (run these after the migration to verify)
-- SELECT billing_type, current_tier, COUNT(*) FROM public.profiles GROUP BY billing_type, current_tier;
-- SELECT * FROM public.stripe_price_mappings ORDER BY listing_count;