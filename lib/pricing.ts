export type BillingType = "subscription" | "one_time";

export interface PricingTier {
  name: string;
  listingCount: number;
  subscriptionPrice: number;
  oneTimePrice: number;
}

/**
 * Calculate total price using volume-based pricing tiers
 * In volume pricing, the per-listing rate depends on the quantity tier
 * @param listings - Number of listings
 * @param billingType - 'subscription' or 'one_time'
 * @returns Total price for the given quantity
 */
export function calculatePrice(
  listings: number,
  billingType: BillingType
): number {
  let basePrice: number;

  // Volume pricing - different rate per listing based on quantity tier
  if (billingType === "subscription") {
    // Subscription volume pricing
    switch (listings) {
      case 1:
        basePrice = listings * 30.0;
        break;
      case 2:
        basePrice = listings * 20.0;
        break;
      case 3:
        basePrice = listings * 16.66;
        break;
      case 4:
        basePrice = listings * 15.0;
        break;
      case 5:
        basePrice = listings * 14.0;
        break;
      default:
        basePrice = listings * 12.0; // 6+ listings
    }
  } else {
    // One-time volume pricing
    switch (listings) {
      case 1:
        basePrice = listings * 35.0;
        break;
      case 2:
        basePrice = listings * 22.5;
        break;
      case 3:
        basePrice = listings * 18.33;
        break;
      case 4:
        basePrice = listings * 16.25;
        break;
      case 5:
        basePrice = listings * 15.0;
        break;
      default:
        basePrice = listings * 13.0; // 6+ listings
    }
  }

  return basePrice;
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

// Get subscription price ID (single volume-based price for all quantities)
export function getSubscriptionPriceId(): string {
  return process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID!;
}

// Predefined tiers for UI display
export const PRICING_TIERS: PricingTier[] = [
  { name: "Starter", listingCount: 1, subscriptionPrice: 30, oneTimePrice: 35 },
  { name: "Growth", listingCount: 2, subscriptionPrice: 40, oneTimePrice: 45 },
  { name: "Growth", listingCount: 3, subscriptionPrice: 50, oneTimePrice: 55 },
  { name: "Pro", listingCount: 4, subscriptionPrice: 60, oneTimePrice: 65 },
  { name: "Pro", listingCount: 5, subscriptionPrice: 70, oneTimePrice: 75 },
];

/**
 * Get the per-listing rate for a given quantity tier
 * @param listings - Number of listings
 * @param billingType - 'subscription' or 'one_time'
 * @returns Price per listing for this tier
 */
export function getPerListingRate(
  listings: number,
  billingType: BillingType
): number {
  let baseRate: number;

  // Return the exact rate used in volume pricing
  if (billingType === "subscription") {
    switch (listings) {
      case 1:
        baseRate = 30.0;
        break;
      case 2:
        baseRate = 20.0;
        break;
      case 3:
        baseRate = 16.66;
        break;
      case 4:
        baseRate = 15.0;
        break;
      case 5:
        baseRate = 14.0;
        break;
      default:
        baseRate = 12.0; // 6+ listings
    }
  } else {
    switch (listings) {
      case 1:
        baseRate = 35.0;
        break;
      case 2:
        baseRate = 22.5;
        break;
      case 3:
        baseRate = 18.33;
        break;
      case 4:
        baseRate = 16.25;
        break;
      case 5:
        baseRate = 15.0;
        break;
      default:
        baseRate = 13.0; // 6+ listings
    }
  }

  return baseRate;
}
