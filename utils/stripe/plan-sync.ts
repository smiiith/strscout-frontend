import { createClient } from '@/utils/supabase/server';
import { PLANS } from '@/app/types/plans';

// Map Stripe price IDs to plan keys
export const STRIPE_PRICE_TO_PLAN: Record<string, string> = {
  // Legacy Market Spy (one-time purchase) -> Pro plan (upgraded from Standard)
  'price_1Rf3qeRQojxLKgwUSlmUkEbH': PLANS.PRO,
  
  // Pro Plan (monthly subscription with graduated pricing) -> Pro plan
  'price_1RmiWnRQojxLKgwUZq8xx0lc': PLANS.PRO,
  
  // Current subscription price (volume tiered pricing)
  [process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID || '']: PLANS.PRO,
  
  // One-time payment prices (all map to PRO plan with different usage limits)
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID || '']: PLANS.PRO,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID || '']: PLANS.PRO,
};

// Map subscription statuses to determine plan behavior
export const SUBSCRIPTION_STATUS_TO_PLAN_BEHAVIOR = {
  'active': 'keep_plan',
  'trialing': 'keep_plan', 
  'past_due': 'keep_plan',     // Grace period
  'canceled': 'downgrade_to_freemium',
  'unpaid': 'downgrade_to_freemium',
  'incomplete': 'keep_current',
  'incomplete_expired': 'downgrade_to_freemium',
  'paused': 'keep_plan',
} as const;

// Default plan IDs (match your database)
export const DEFAULT_PLAN_IDS = {
  freemium: '5cb61d3c-306e-4518-8ec1-fa59585ce27c',
  pro: '32ae3031-aa06-4455-b5db-5b8ff11d85a0',
} as const;

/**
 * Sync user's plan based on their Stripe subscription
 * @param userId - User ID to update
 * @param priceId - Stripe price ID
 * @param subscriptionStatus - Subscription status (null for one-time payments)
 * @param quantity - Number of listings purchased
 * @param supabaseClient - Optional Supabase client (use service role client from webhooks to bypass RLS)
 */
export async function syncUserPlan(
  userId: string,
  priceId: string,
  subscriptionStatus: string | null,
  quantity: number = 1,
  supabaseClient?: any
) {
  const supabase = supabaseClient || await createClient();

  try {
    // Get plan key from price ID, default to freemium if not found
    const planKey = STRIPE_PRICE_TO_PLAN[priceId] || PLANS.FREEMIUM;
    
    // Get plan ID from database
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('id')
      .eq('key', planKey)
      .single();

    if (planError || !plan) {
      console.error(`Plan not found for key: ${planKey}`, planError);
      return false;
    }

    // Determine final plan based on subscription status
    const finalPlanId = shouldDowngradeToFreemium(subscriptionStatus) 
      ? DEFAULT_PLAN_IDS.freemium
      : plan.id;

    // Calculate Market Spy listings based on plan and quantity
    const marketSpyLimit = calculateMarketSpyLimit(planKey, quantity, subscriptionStatus);

    // Determine billing type based on price ID
    const billingType = isOneTimePriceId(priceId) ? 'one_time' : 'subscription';

    // Calculate tier based on quantity/listing count
    const currentTier = calculateTier(quantity);

    // Update user's plan and subscription details
    const updateData: any = { 
      plan_id: finalPlanId,
      subscription_quantity: quantity,
      market_spy_listings_limit: marketSpyLimit,
      current_tier: currentTier,
      updated_at: new Date().toISOString()
    };

    // Only set subscription_status for actual subscriptions
    if (billingType === 'subscription') {
      updateData.subscription_status = subscriptionStatus;
    } else {
      // For one-time payments, explicitly set to null
      updateData.subscription_status = null;
    }

    // Only update billing_type if not already set correctly by webhook
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('billing_type')
      .eq('id', userId)
      .single();

    if (!currentProfile?.billing_type || currentProfile.billing_type !== billingType) {
      updateData.billing_type = billingType;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user plan:', updateError);
      return false;
    }

    console.log(`✅ Updated user ${userId} to plan: ${planKey} (status: ${subscriptionStatus}, billing: ${billingType})`);
    return true;

  } catch (error) {
    console.error('Error in syncUserPlan:', error);
    return false;
  }
}

/**
 * Get user's current plan information
 */
export async function getUserPlan(userId: string) {
  const supabase = await createClient();
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      id,
      plan_id,
      subscription_status,
      stripe_subscription_id,
      plan:plans(id, name, key, description)
    `)
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user plan:', error);
    return null;
  }

  return profile;
}

/**
 * Sync plan for user by subscription ID (when we don't have user ID directly)
 * @param subscriptionId - Stripe subscription ID
 * @param priceId - Stripe price ID
 * @param subscriptionStatus - Subscription status
 * @param quantity - Number of listings purchased
 * @param supabaseClient - Optional Supabase client (use service role client from webhooks to bypass RLS)
 */
export async function syncUserPlanBySubscriptionId(
  subscriptionId: string,
  priceId: string,
  subscriptionStatus: string,
  quantity: number = 1,
  supabaseClient?: any
) {
  const supabase = supabaseClient || await createClient();

  // Find user by subscription ID
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_subscription_id', subscriptionId)
    .single();

  if (error || !profile) {
    console.error('User not found for subscription ID:', subscriptionId, error);
    return false;
  }

  return await syncUserPlan(profile.id, priceId, subscriptionStatus, quantity, supabase);
}

/**
 * Calculate Market Spy listings limit based on plan and quantity
 * For subscriptions: quantity represents subscription quantity
 * For one-time: quantity represents actual listing count from price ID
 */
function calculateMarketSpyLimit(planKey: string, quantity: number, subscriptionStatus: string | null): number {
  // If subscription is inactive, no Market Spy access
  if (subscriptionStatus && shouldDowngradeToFreemium(subscriptionStatus)) {
    return 0;
  }

  // Calculate based on plan type
  switch (planKey) {
    case PLANS.PRO:
      // Quantity directly represents listings (works for both subscription and one-time)
      return quantity;
    case PLANS.FREEMIUM:
    default:
      return 0; // Freemium gets no Market Spy access
  }
}

/**
 * Determine if subscription status should result in downgrade to freemium
 */
function shouldDowngradeToFreemium(status: string): boolean {
  const behavior = SUBSCRIPTION_STATUS_TO_PLAN_BEHAVIOR[status as keyof typeof SUBSCRIPTION_STATUS_TO_PLAN_BEHAVIOR];
  return behavior === 'downgrade_to_freemium';
}

/**
 * Map one-time price IDs to their listing counts
 */
export const ONE_TIME_PRICE_TO_LISTINGS: Record<string, number> = {
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID || '']: 1,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID || '']: 2,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID || '']: 3,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID || '']: 4,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID || '']: 5,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID || '']: 6,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID || '']: 7,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID || '']: 8,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID || '']: 9,
  [process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID || '']: 10,
};

/**
 * Get the number of listings for a given price ID
 */
export function getListingCountFromPriceId(priceId: string): number {
  // Check one-time prices first
  if (ONE_TIME_PRICE_TO_LISTINGS[priceId]) {
    return ONE_TIME_PRICE_TO_LISTINGS[priceId];
  }
  
  // For subscription price, use the quantity parameter
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID) {
    return 1; // Default, will be overridden by actual quantity
  }
  
  // Legacy or unknown prices default to 1
  return 1;
}

/**
 * Determine if a price ID is for one-time payment
 */
function isOneTimePriceId(priceId: string): boolean {
  return priceId in ONE_TIME_PRICE_TO_LISTINGS;
}

/**
 * Calculate tier based on listing count
 * Based on volume pricing structure: starter (1), growth (2-3), pro (4-5), portfolio (6+)
 */
export function calculateTier(listingCount: number): string {
  if (listingCount <= 1) return 'starter';
  if (listingCount <= 3) return 'growth';
  if (listingCount <= 5) return 'pro';
  return 'portfolio';
}

/**
 * Get all available plans from database
 */
export async function getAllPlans() {
  const supabase = await createClient();

  const { data: plans, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('key');

  if (error) {
    console.error('Error fetching plans:', error);
    return [];
  }

  return plans || [];
}

/**
 * Get current listings purchased and limit for a user
 * Used to calculate cumulative totals for one-time purchases
 */
export async function getCurrentListingsData(
  userId: string,
  supabaseClient: any
) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('listings_purchased, market_spy_listings_limit')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching current listings data:', error);
    return { listings_purchased: 0, market_spy_listings_limit: 0 };
  }

  return {
    listings_purchased: data?.listings_purchased || 0,
    market_spy_listings_limit: data?.market_spy_listings_limit || 0,
  };
}