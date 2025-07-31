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
 */
export async function syncUserPlan(
  userId: string, 
  priceId: string, 
  subscriptionStatus: string,
  quantity: number = 1
) {
  const supabase = await createClient();
  
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

    // Update user's plan and subscription details
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        plan_id: finalPlanId,
        subscription_status: subscriptionStatus,
        subscription_quantity: quantity,
        market_spy_listings_limit: marketSpyLimit,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user plan:', updateError);
      return false;
    }

    console.log(`✅ Updated user ${userId} to plan: ${planKey} (status: ${subscriptionStatus})`);
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
 */
export async function syncUserPlanBySubscriptionId(
  subscriptionId: string,
  priceId: string,
  subscriptionStatus: string,
  quantity: number = 1
) {
  const supabase = await createClient();
  
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

  return await syncUserPlan(profile.id, priceId, subscriptionStatus, quantity);
}

/**
 * Calculate Market Spy listings limit based on plan and quantity
 * For new pricing model, quantity directly represents the number of listings
 */
function calculateMarketSpyLimit(planKey: string, quantity: number, subscriptionStatus: string): number {
  // If subscription is inactive, no Market Spy access
  if (shouldDowngradeToFreemium(subscriptionStatus)) {
    return 0;
  }

  // Calculate based on plan type
  switch (planKey) {
    case PLANS.PRO:
      // New model: quantity directly represents listings purchased
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