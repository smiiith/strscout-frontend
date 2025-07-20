# Stripe Integration Documentation

## Overview

This Next.js application features a comprehensive Stripe integration for subscription-based access control. The system implements a freemium model with paid upgrades, specifically designed around the "Market Spy" feature that requires a Standard plan subscription.

## Architecture

The Stripe integration follows a robust, production-ready pattern with clear separation of concerns:

- **API Routes**: Server-side handlers for checkout, customer portal, and webhooks
- **Components**: Reusable UI components for payments and subscription management
- **Utilities**: Plan synchronization and subscription status management
- **Protection**: Route-level access control based on user subscription plans

## API Routes

### Checkout Handler (`/app/api/stripe/checkout/route.ts`)

**Purpose**: Creates Stripe checkout sessions for new subscriptions

**Key Features**:
- Requires authenticated user via Supabase
- Uses customer email and user ID as client reference
- Configured for subscription mode with automatic tax calculation
- Handles success/cancel URL redirects
- Currently configured for Market Spy price: `price_1Rf3qeRQojxLKgwUSlmUkEbH` ($19.95)

**Usage**:
```typescript
// POST /api/stripe/checkout
// Body: { priceId: string, successUrl: string, cancelUrl: string }
```

### Customer Portal (`/app/api/stripe/customer-portal/route.ts`)

**Purpose**: Provides access to Stripe's hosted customer billing portal

**Key Features**:
- Finds existing Stripe customer by email
- Creates portal session for subscription management
- Allows users to cancel, update payment methods, view invoices
- Returns portal URL for client-side redirection

**Usage**:
```typescript
// POST /api/stripe/customer-portal
// Body: { returnUrl: string }
```

### Webhook Handler (`/app/api/stripe/webhook/route.ts`)

**Purpose**: Processes Stripe webhook events for real-time subscription lifecycle management

**Security**:
- Webhook signature verification using `STRIPE_WEBHOOK_SECRET`
- Fallback verification for development environments
- Request body validation and parsing

**Supported Events**:
- `checkout.session.completed`: Activates new subscription, updates user profile
- `customer.subscription.updated`: Syncs subscription status changes
- `customer.subscription.deleted`: Downgrades user to freemium plan
- `invoice.payment_failed`: Marks subscription as past_due

**Key Features**:
- Idempotency protection prevents duplicate event processing
- Comprehensive logging to `stripe_events` database table
- Automatic plan synchronization via `syncUserPlan()` utility
- Error handling with detailed logging

## Frontend Components

### StripeCheckoutButton (`/components/stripe-checkout-button.tsx`)

**Purpose**: Initiates Stripe checkout flow from the frontend

**Features**:
- Loading states during checkout session creation
- Error handling with user-friendly messages
- Automatic redirection to Stripe-hosted checkout
- Used on pricing pages and upgrade prompts

**Usage**:
```jsx
<StripeCheckoutButton 
  priceId="price_1Rf3qeRQojxLKgwUSlmUkEbH"
  successUrl="/dashboard?upgraded=true"
  cancelUrl="/pricing"
/>
```

### ManageSubscriptionButton (`/components/ManageSubscriptionButton.tsx`)

**Purpose**: Opens Stripe customer portal for subscription management

**Features**:
- One-click access to billing portal
- Handles portal session creation
- Displays only for users with active subscriptions
- Used on account/settings pages

### ProtectedPage (`/components/ProtectedPage.tsx`)

**Purpose**: Implements route-level access control based on user subscription plan

**Features**:
- Supports single plan or array of required plans
- Shows upgrade prompt for unauthorized users
- Integrates with UserSessionProvider for real-time plan data
- Graceful handling of loading states

**Usage**:
```jsx
<ProtectedPage requiredPlan={PLANS.STANDARD}>
  <MarketSpyFeature />
</ProtectedPage>

// Or with multiple plans
<ProtectedPage requiredPlan={[PLANS.STANDARD, PLANS.PRO]}>
  <PremiumFeature />
</ProtectedPage>
```

### UpgradeMarketSpy (`/components/upgrade/market-spy.tsx`)

**Purpose**: Dedicated upgrade page for Market Spy feature

**Features**:
- Marketing copy explaining Market Spy benefits
- Feature comparison and pricing information
- Direct integration with StripeCheckoutButton
- Clear call-to-action for upgrades

## Plan Management System

### Plan Types (`/app/types/plans.ts`)

```typescript
export const PLANS = {
  FREEMIUM: "freemium",
  STANDARD: "standard", 
  PRO: "pro",
};
```

### Plan Synchronization (`/utils/stripe/plan-sync.ts`)

**Core Functionality**:
- Maps Stripe price IDs to internal plan keys
- Handles subscription status changes (active, past_due, canceled)
- Manages automatic downgrades and upgrades
- Provides grace periods for payment failures

**Price Mapping**:
```typescript
const PRICE_TO_PLAN_MAP = {
  'price_1Rf3qeRQojxLKgwUSlmUkEbH': 'standard', // Market Spy $19.95
  // Add additional price IDs here as needed
};
```

**Key Functions**:
- `syncUserPlan(userId)`: Updates user plan based on Stripe subscription
- `getPlanFromPriceId(priceId)`: Maps Stripe prices to internal plans
- `handleSubscriptionChange()`: Processes subscription updates

## Database Schema

### Key Tables

#### profiles
- `stripe_customer_id`: Links user to Stripe customer
- `stripe_subscription_id`: Current active subscription
- `subscription_status`: Current subscription state
- `plan_id`: References plans table

#### plans
- `key`: Plan identifier (freemium, standard, pro)
- `name`: Display name for UI
- `active`: Whether plan is available for purchase

#### stripe_events
- `stripe_event_id`: Unique Stripe event identifier
- `event_type`: Type of webhook event
- `processed`: Processing status
- `data`: Full event payload for debugging

## User Session Management

### UserSessionProvider (`/lib/context/UserSessionProvider.tsx`)

**Purpose**: Provides user authentication and plan data across the application

**Features**:
- Real-time session state management
- Plan data integration with subscription status
- Automatic session refresh on auth state changes
- Context-based data sharing

**Usage**:
```typescript
const { user, planData, refreshSession } = useUserSession();
const hasStandardPlan = planData?.key === PLANS.STANDARD;
```

## Payment Flow

### Purchase Flow

1. **User clicks upgrade button** → `StripeCheckoutButton` component
2. **Checkout session creation** → `POST /api/stripe/checkout`
3. **Redirect to Stripe** → User completes payment on Stripe-hosted page
4. **Webhook processing** → `checkout.session.completed` event
5. **Plan activation** → User profile updated with new plan
6. **Success redirect** → User returned to app with confirmation

### Subscription Management Flow

1. **User clicks "Manage Subscription"** → `ManageSubscriptionButton`
2. **Portal session creation** → `POST /api/stripe/customer-portal`
3. **Redirect to portal** → User manages subscription on Stripe portal
4. **Real-time sync** → Webhooks update subscription changes
5. **Return to app** → User sees updated subscription status

## Feature Protection Implementation

### Market Spy Protection

The Market Spy feature is protected using the `ProtectedPage` component:

```jsx
// In comp-details page
<ProtectedPage requiredPlan={PLANS.STANDARD}>
  <CompAnalysisContent />
</ProtectedPage>

// Shows upgrade prompt for freemium users
// Allows access for Standard+ subscribers
```

### Route-Level Protection

```jsx
// Protect entire pages
export default function MarketSpyPage() {
  return (
    <ProtectedPage requiredPlan={PLANS.STANDARD}>
      <MarketSpyDashboard />
    </ProtectedPage>
  );
}
```

## Environment Variables

Required environment variables for Stripe integration:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_... # Webhook endpoint secret

# Application URLs
NEXT_PUBLIC_SITE_URL=https://yourdomain.com # For checkout redirects
```

## Testing

### Comprehensive Test Suite (`/test/stripe-plan-integration.test.ts`)

The integration includes automated tests for:
- Database plan configuration validation
- Plan synchronization logic
- Webhook event handling
- Integration flow testing

**Running Tests**:
```bash
npm test # Run all tests
npm test stripe # Run Stripe-specific tests
```

### Manual Testing Guide (`/STRIPE_TESTING_GUIDE.md`)

Detailed documentation for manual testing including:
- Stripe CLI webhook forwarding setup
- Test payment scenarios
- Subscription lifecycle testing
- Database validation queries

### Testing with Stripe CLI

```bash
# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
```

## Current Configuration

### Active Products

| Product | Price ID | Amount | Plan | Description |
|---------|----------|--------|------|-------------|
| Market Spy | `price_1Rf3qeRQojxLKgwUSlmUkEbH` | $19.95 | Standard | Access to competitive analysis features |

### Supported Plans

- **Freemium**: Basic app access, limited features
- **Standard**: Market Spy access, full feature set
- **Pro**: Reserved for future premium features

## Extending the Integration

### Adding New Products

1. **Create product in Stripe Dashboard**
2. **Add price ID to plan mapping**:
   ```typescript
   const PRICE_TO_PLAN_MAP = {
     'price_1Rf3qeRQojxLKgwUSlmUkEbH': 'standard',
     'price_NEW_PRODUCT_ID': 'pro', // New product
   };
   ```
3. **Update plan protection**:
   ```jsx
   <ProtectedPage requiredPlan={PLANS.PRO}>
     <NewFeature />
   </ProtectedPage>
   ```

### Adding Recurring Subscriptions

The current architecture supports recurring billing. Update checkout configuration:

```typescript
mode: 'subscription', // Already configured
billing_address_collection: 'auto',
subscription_data: {
  trial_period_days: 14, // Optional trial
},
```

### Implementing Usage-Based Billing

Stripe's metered billing can be implemented by:
1. Creating usage-based price in Stripe
2. Implementing usage tracking in the app
3. Reporting usage via Stripe API

## Security Considerations

### Implemented Security

✅ **Webhook signature verification**
✅ **Authentication required for all API routes**
✅ **Idempotent webhook processing**
✅ **Secure client-server communication**
✅ **Input validation and sanitization**

### Production Recommendations

- Remove development webhook verification fallback
- Implement rate limiting on checkout endpoints
- Add additional validation on price IDs
- Monitor webhook processing for failures
- Set up Stripe webhook monitoring alerts

## Troubleshooting

### Common Issues

**Webhook not receiving events**:
- Verify webhook URL in Stripe Dashboard
- Check webhook secret configuration
- Ensure endpoint returns 200 status

**Plan not updating after payment**:
- Check webhook event processing logs
- Verify customer email matches user email
- Review `stripe_events` table for processing status

**Checkout session creation fails**:
- Verify price ID exists in Stripe
- Check user authentication status
- Review API route error logs

### Debug Queries

```sql
-- Check user subscription status
SELECT email, plan_id, subscription_status, stripe_subscription_id 
FROM profiles 
WHERE email = 'user@example.com';

-- Review webhook processing
SELECT event_type, processed, created_at, data 
FROM stripe_events 
ORDER BY created_at DESC 
LIMIT 10;

-- Verify plan configuration
SELECT * FROM plans WHERE active = true;
```

## Monitoring and Analytics

### Key Metrics to Track

- Conversion rate from freemium to paid
- Subscription churn rate
- Failed payment recovery rate
- Feature usage by plan tier

### Recommended Monitoring

- Stripe Dashboard for payment analytics
- Database queries for subscription health
- Application logs for integration issues
- Webhook delivery monitoring

## Future Enhancements

### Potential Improvements

1. **Multiple Subscription Tiers**: Implement Standard and Pro plans with different feature sets
2. **Annual Billing Discounts**: Add yearly subscription options
3. **Usage-Based Features**: Implement per-use pricing for certain features
4. **Coupon Support**: Add promotional codes and discounts
5. **Team Subscriptions**: Multi-user account management
6. **Invoice Management**: Custom invoice generation and management

### Scalability Considerations

The current architecture is designed to scale and supports:
- Multiple products and pricing models
- Team/organization subscriptions
- Usage-based billing
- International markets with local currencies
- Complex feature flag management

---

*This documentation covers the complete Stripe integration as implemented. For questions or contributions, please refer to the main project README or contact the development team.*