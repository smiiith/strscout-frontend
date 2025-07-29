export type BillingType = 'subscription' | 'one_time';

export interface PricingTier {
  name: string;
  listingCount: number;
  subscriptionPrice: number;
  oneTimePrice: number;
}

// Graduated pricing calculation
export function calculateGraduatedPrice(listings: number, billingType: BillingType): number {
  const rates = billingType === 'subscription' 
    ? { first: 30, additional: 10, portfolio: 12 }
    : { first: 35, additional: 10, portfolio: 13 };
  
  if (listings === 1) {
    return rates.first;
  }
  
  if (listings <= 5) {
    return rates.first + ((listings - 1) * rates.additional);
  }
  
  // For 6+ listings: first 5 use lower rates, rest use portfolio rate
  const basePrice = rates.first + (4 * rates.additional); // First 5 listings
  const additionalListings = listings - 5;
  return basePrice + (additionalListings * rates.portfolio);
}

// Get the appropriate Stripe price ID for one-time payments
export function getOneTimePriceId(listings: number): string | null {
  const priceMap: Record<number, string> = {
    1: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID!,
    2: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID!,
    3: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID!,
    4: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID!,
    5: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID!,
    6: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID!,
    7: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID!,
    8: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID!,
    9: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID!,
    10: process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID!,
  };
  
  return priceMap[listings] || null;
}

// Get subscription price ID (single graduated price for all quantities)
export function getSubscriptionPriceId(): string {
  return process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID!;
}

// Predefined tiers for UI display
export const PRICING_TIERS: PricingTier[] = [
  { name: 'Starter', listingCount: 1, subscriptionPrice: 30, oneTimePrice: 35 },
  { name: 'Growth', listingCount: 2, subscriptionPrice: 40, oneTimePrice: 45 },
  { name: 'Growth', listingCount: 3, subscriptionPrice: 50, oneTimePrice: 55 },
  { name: 'Pro', listingCount: 4, subscriptionPrice: 60, oneTimePrice: 65 },
  { name: 'Pro', listingCount: 5, subscriptionPrice: 70, oneTimePrice: 75 },
];

// Calculate per-listing rate for display
export function getPerListingRate(listings: number, billingType: BillingType): number {
  const totalPrice = calculateGraduatedPrice(listings, billingType);
  return Math.round((totalPrice / listings) * 100) / 100; // Round to 2 decimal places
}