# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on port 3005)
- **Build**: `npm run build`
- **Production start**: `npm start`
- **Linting**: `npm run lint`
- **Database migrations**:
  - Pull schema changes: `supabase db pull`
  - Push to production: `supabase db push --project-ref YOUR_PROD_PROJECT_REF`
  - Link project: `supabase link --project-ref YOUR_PROJECT_REF`

## Environment Setup

### Development (.env.local)

Create `.env.local` with:

```
# Supabase Configuration (Development)
NEXT_PUBLIC_SUPABASE_URL=https://ynxbtvsbjzkcnkilnuts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SECRET_KEY=sbp_...  # Required for webhooks to bypass RLS
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DB_PASSWORD=your_db_password

# App URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3005
NEXT_PUBLIC_APP_DOMAIN=http://localhost:3005

# Email Provider
RESEND_API_KEY=re_...

# Exit Survey Notifications
EXIT_SURVEY_RECIPIENTS=info@strsage.com,smiiith@gmail.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs for New Pricing Model
NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID=price_1Rq5lNRQojxLKgwUdNomfEUC
NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID=price_1RqGQARQojxLKgwUlKeil3NQ
NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID=price_1RqGQARQojxLKgwUmHOA51R3
NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID=price_1RqGQARQojxLKgwUVUjzae1C
NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID=price_1RqGQARQojxLKgwUwOZ2fKhC
NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID=price_1RqGQARQojxLKgwUHyiGFih1
NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID=price_1RqGQARQojxLKgwUE2n9Xe1I
NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID=price_1RqGQARQojxLKgwUxEyOBrCj
NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID=price_1RqGQARQojxLKgwUCGtNjgnS
NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID=price_1RqGQARQojxLKgwUR4Uru39D
NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID=price_1RqGQARQojxLKgwU8JFMz2yr
```

### Production (Vercel Environment Variables)

**Critical Production Variables:**

```
# Supabase Configuration (Production Project)
NEXT_PUBLIC_SUPABASE_URL=https://eklefalzcpfrnsmzrlbn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_SECRET_KEY=...  # Required for webhooks

# App URLs (MUST match production domain)
NEXT_PUBLIC_SITE_URL=https://www.strsage.com
NEXT_PUBLIC_APP_DOMAIN=https://www.strsage.com

# Email Provider
RESEND_API_KEY=re_...  # Production API key

# Exit Survey Notifications
EXIT_SURVEY_RECIPIENTS=info@strsage.com,smiiith@gmail.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Stripe Configuration (Production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...  # From production webhook endpoint
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**Important Notes:**
- Development uses Supabase project `ynxbtvsbjzkcnkilnuts`
- Production uses Supabase project `eklefalzcpfrnsmzrlbn`
- Ensure `NEXT_PUBLIC_SITE_URL` matches your actual domain in each environment
- Resend SMTP is also configured in Supabase Dashboard → Authentication → SMTP Settings
- **Supabase Redirect URLs**: Must configure allowed redirect URLs in Supabase Dashboard → Authentication → URL Configuration:
  - Development: `http://localhost:3005/**`
  - Production: `https://www.strsage.com/**`
  - Vercel previews: `https://*.vercel.app/**` (if needed)

## Promotional Pricing (Sales/Discounts)

**Status**: Currently disabled (removed January 2026)

The application has infrastructure for running promotional sales (e.g., Black Friday, Holiday sales) with percentage discounts. The promo assets are preserved for future use.

### How to Re-enable Promotional Pricing

**1. Environment Variables**

The following variables are already in `.env.local` but not actively used:

```bash
NEXT_PUBLIC_PROMO_ACTIVE=true          # Set to "true" to activate promo
NEXT_PUBLIC_PROMO_CODE=HOLIDAY2025     # Promo code shown to users
STRIPE_PROMOTIONAL_COUPON_ID=L82oXlBp  # Stripe coupon ID (if using Stripe coupons)
```

For production, add these to Vercel environment variables.

**2. Update Pricing Logic** (`lib/pricing.ts`)

Add the discount function and apply it to price calculations:

```typescript
// Add after PricingTier interface
/**
 * Check if promotional pricing is active
 */
function isPromoActive(): boolean {
  return process.env.NEXT_PUBLIC_PROMO_ACTIVE === "true";
}

// In calculatePrice() function, change the return statement:
// FROM:
return basePrice;

// TO:
return isPromoActive() ? basePrice * 0.5 : basePrice;  // 0.5 = 50% off

// In getPerListingRate() function, change the return statement:
// FROM:
return baseRate;

// TO:
return isPromoActive() ? baseRate * 0.5 : baseRate;  // 0.5 = 50% off
```

**3. Add Promo Badge to Pricing Page** (`components/pricing-page-new.tsx`)

Add after imports:
```typescript
const isPromoActive = process.env.NEXT_PUBLIC_PROMO_ACTIVE === "true";
```

Add badge image inside Pro Plan Card (after "Recommended" badge):
```typescript
{/* Sale Badge */}
{isPromoActive && (
  <div className="absolute -top-4 -right-4 z-10 text-center">
    <Image
      src="/images/50-percent-off-holiday-special.svg"
      alt="50% Off Holiday Special"
      width={100}
      height={100}
      quality={100}
      className="w-[80px] md:w-[100px] h-auto"
    />
  </div>
)}
```

Add promo code banner (after price summary, before CTA button):
```typescript
{/* Promo Code Banner */}
{process.env.NEXT_PUBLIC_PROMO_CODE && (
  <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
    <p className="text-sm font-semibold text-success mb-1">
      50% Off Sale!
    </p>
    <p className="text-xs text-muted-foreground mb-2">
      Use code at checkout:
    </p>
    <div className="bg-background border-2 border-dashed border-success/40 rounded px-3 py-2 font-mono font-bold text-base text-success">
      {process.env.NEXT_PUBLIC_PROMO_CODE}
    </div>
  </div>
)}
```

**4. Add Promo Badge to Pro Plan Selector** (`components/pro-plan-selector.tsx`)

Add after state declarations:
```typescript
const isPromoActive = process.env.NEXT_PUBLIC_PROMO_ACTIVE === "true";
```

Add mobile badge (after Card opening tag):
```typescript
{/* Sale Badge - Mobile */}
{isPromoActive && (
  <div className="absolute -top-4 -right-4 z-10 md:hidden text-center">
    <Image
      src="/images/50-percept-off-black-friday.png"
      alt="50% Off Sale"
      width={120}
      height={120}
      quality={100}
      className="w-[120px] h-auto"
    />
    <p className="text-[10px] text-muted-foreground mt-1 bg-background/80 px-1 rounded">
      Discounted prices shown
    </p>
  </div>
)}
```

Add desktop badge (inside features section):
```typescript
<div className="flex gap-4 items-start">
  <div className="flex-1">
    {/* Features list */}
  </div>

  {/* Sale Badge - Desktop */}
  {isPromoActive && (
    <div className="hidden md:block flex-shrink-0 text-center">
      <Image
        src="/images/50-percept-off-black-friday.png"
        alt="50% Off Sale"
        width={150}
        height={150}
        quality={100}
        className="w-[150px] h-auto"
      />
      <p className="text-xs text-muted-foreground mt-2">
        Discounted prices shown
      </p>
    </div>
  )}
</div>
```

**5. Available Badge Images**

- `/public/images/50-percent-off-holiday-special.svg` - SVG badge for general sales
- `/public/images/50-percept-off-black-friday.png` - PNG badge for Black Friday

**6. Important Notes**

- The discount percentage is hardcoded in `lib/pricing.ts` (currently 50% = `* 0.5`)
- To change discount amount, modify the multiplier in both `calculatePrice()` and `getPerListingRate()`
- Badge images reference "50% off" - create new images if using different discount
- **Stripe Integration**: If using Stripe coupons, configure `STRIPE_PROMOTIONAL_COUPON_ID` and apply in checkout
- Test in development first before deploying to production
- Remember to update badge alt text and promo code text to match your actual sale

**7. To Disable Promo Again**

Simply set `NEXT_PUBLIC_PROMO_ACTIVE=false` in environment variables (no code changes needed if you keep the conditional logic).

## Architecture Overview

This is a Next.js 14 application built as an STR (Short-Term Rental) property analysis tool called "STR Feedback Genius". The application provides property assessment, competitive analysis, and ratings for Airbnb/rental properties.

### Key Technologies

- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system using Radix UI components
- **Backend**: Supabase (Auth, Database, Storage)
- **Node Backend**: Express API for Market Spy/Scout scraping
- **Analytics**: PostHog
- **Email**: Resend with React Email components

### Application Structure

**Route Groups:**

- `(authenticated)/` - Protected routes requiring login (properties, account, market-spy)
- `(login)/` - Authentication flows (login, register, password reset)
- `(no-auth)/` - Public pages (home, about, pricing, terms)

**Core Features:**

- **Feedback Genius**: Property analysis and assessment with competitive comparisons
  - **Free plan usage limits**: 6 properties max (lifetime), 3 assessments per property per month
  - Usage verification happens server-side via FastAPI `/verify` endpoint
  - Frontend displays remaining usage proactively in UI
  - Monthly limits reset on calendar month boundaries (Pacific Time)
- **Market Spy**: Market research tool with user-selectable room type (Room or Entire Home)
- **Market Scout**: Streamlined market research for entire home properties only
- User subscription management with different plans
- Property scanning and ratings system via backend scraping
- Address lookup with Geoapify integration
- Automated calendar synchronization monitoring (Airbnb ↔ VRBO)
- Email notifications for scan results and mismatches

### Product URL Structure

All three products follow a consistent URL pattern with public landing pages and protected tool pages:

| Feature | Feedback Genius | Market Spy | Market Scout |
|---------|-----------------|-----------|--------------|
| **Landing Page** | `/feedback-genius` (public) | `/market-spy` (public) | `/market-scout` (public) |
| **Tool Page** | `/feedback-genius/analyze` (auth) | `/market-spy/analyze` (pro) | `/market-scout/analyze` (pro) |
| **Quiz/Funnel** | `/feedback-genius/quiz` (planned) | N/A | N/A |
| **Legacy URLs** | `/str-feedback-genius` → `/feedback-genius`<br>`/properties/assess-property/single` → `/feedback-genius/analyze` | `/market-spy-home` → `/market-spy` | N/A |

### Conversion Funnel Strategy

**Status:** Planning / Not implemented
**Documentation:** See `CONVERSION_FUNNEL_STRATEGY.md` for full details

**Problem:** Facebook ad traffic to `/feedback-genius` has zero conversions because it asks for full signup immediately (too much friction for cold traffic).

**Solution:** Implement middle-of-funnel quiz page at `/feedback-genius/quiz`:
- **Self-assessment quiz**: 5-6 diagnostic questions about their current listing
- **Progressive commitment**: Quiz (free) → Email capture (for score) → Full signup (for AI analysis)
- **No property evaluation needed**: Pure JavaScript scoring based on user answers
- **Builds trust**: Each step provides value before asking for more commitment
- **Qualification**: Filters serious users and collects pain point data

**Planned Flow:**
```
Facebook Ad → /feedback-genius/quiz
  → Answer 5-6 questions
  → Enter email for score
  → See partial results (58/100, areas needing work)
  → "Get AI analysis of actual listing" CTA
  → /register (with quiz context)
  → /feedback-genius/analyze
```

**Why Quiz Approach:**
- Lowest technical lift (frontend only, no backend changes)
- Psychological investment (users more likely to complete after starting)
- Creates curiosity gap (partial score creates desire for full analysis)
- Works for everyone (even users planning a listing, not just existing hosts)

**Implementation Notes:**
- Pure frontend (no scraping/AI at quiz stage)
- JavaScript-based scoring algorithm
- Integrates with existing auth flow
- Store quiz results in localStorage/session
- Pass context to registration via URL params

### Market Spy vs Market Scout

Both products share the same underlying infrastructure but differ in UX:

| Feature | Market Spy | Market Scout |
|---------|-----------|--------------|
| **Room Type** | User selects (Room or Entire Home) | Always "Entire Home" (hidden) |
| **Form** | Shows room type dropdown | Hides room type field |
| **Reports Page** | `/my-comps` | `/market-scout-reports` |
| **Details Page** | `/comp-details` | `/market-scout-details` |
| **Find Your Edge** | Shows AI analysis card | Hidden (not shown) |
| **Logo** | `/market-spy-logo.png` | `/market-scout-logo.png` |
| **Backend Param** | `product_type: 'market-spy'` | `product_type: 'market-scout'` |
| **Database Table** | `market_spy_runs` | `market_scout_runs` |
| **Shared Components** | `MarketAnalysisPage`, `MarketAnalysisForm`, etc. | Same shared components |

### Authentication & Security

- Supabase Auth with Row Level Security (RLS)
- **OAuth Providers**: Google OAuth 2.0 + traditional email/password authentication
- **Server-side authorization**: Middleware checks both authentication AND subscription plans (`middleware.ts`)
- **Auth-only routes**: `/feedback-genius/analyze` requires authentication (free for all users)
- **Plan-protected routes**: `/market-spy/analyze`, `/market-scout/analyze`, `/my-comps` require "pro" plan (enforced server-side)
- Session management with `UserSessionProvider` context using SSR-compatible Supabase client
- Protected routes: `/account`, `/properties`, `/feedback-genius/analyze`, `/market-spy/analyze`, `/market-scout/analyze`, `/my-comps` (configured in middleware)
- PostHog analytics proxy with CORS handling (`/ingest/` routes)
- **Security**: Plan authorization happens server-side in middleware, not client-side (prevents bypassing)
- **Important**: Uses `utils/supabase/client.ts` (SSR-compatible) not `utils/supabase/js-client.ts` for authentication

#### Authentication Best Practices

- **Always use `useUserSession()` hook** in authenticated pages instead of manual `getSession()`/`getUser()` calls
- The `UserSessionProvider` in `(authenticated)/layout.tsx` handles SSR auth and provides session to child components
- Pattern: `const { session, loading } = useUserSession()` then check `session?.id` before API calls
- Avoid manual auth logic in components - let the provider handle it centrally
- Example working pattern seen in `/my-comps` and `/properties` pages

#### Email Confirmation Flow

- Email confirmations are handled via Resend SMTP integration configured in Supabase Dashboard
- Confirmation emails redirect to `/auth/callback` which then redirects to `/login`
- Users must log in after confirming their email address
- Auth callback route (`app/auth/callback/route.ts`) handles both OAuth/PKCE flows and email confirmations

#### User Registration & Profile Setup

- **Critical**: New users MUST have a `plan_id` set in their profile to log in successfully
- The `handle_new_user()` database trigger automatically creates a profile with default freemium plan
- Required trigger configuration in Supabase:
  ```sql
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, primary_email, plan_id)
    VALUES (
      new.id,
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url',
      new.email,
      '5cb61d3c-306e-4518-8ec1-fa59585ce27c'  -- Freemium plan ID
    );
    RETURN new;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  ```
- Without a valid `plan_id`, `getUserWithPlan()` returns null and login fails
- The authenticated layout (`app/(authenticated)/layout.tsx`) requires a valid profile with plan to initialize session

#### Google OAuth Setup

The application supports Google OAuth 2.0 for seamless authentication. Users can sign in or register using their Google account on both `/login` and `/register` pages.

**Implementation:**
- Server action: `signInWithGoogle()` in `app/(login)/login/actions.ts:48`
- Login page: `app/(login)/login/page.tsx` with Google button at top
- Register page: `app/(login)/register/page.tsx` with Google button at top
- Uses `react-icons/fc` for Google icon (`FcGoogle`)

**Configuration Requirements:**

1. **Google Cloud Console Setup:**
   - Create OAuth 2.0 Client ID at [Google Cloud Console](https://console.cloud.google.com/)
   - Application type: Web application
   - Authorized redirect URIs (add both dev and prod):
     ```
     https://ynxbtvsbjzkcnkilnuts.supabase.co/auth/v1/callback  (development)
     https://eklefalzcpfrnsmzrlbn.supabase.co/auth/v1/callback  (production)
     ```
   - OAuth consent screen: Add `strsage.com` as authorized domain
   - Scopes: `email`, `profile`, `openid` (default for OAuth)

2. **Supabase Configuration:**
   - Enable Google provider in both development and production projects
   - Navigate to: Authentication → Providers → Google
   - Add Client ID and Client Secret from Google Cloud Console
   - Same credentials work for both dev and prod (different redirect URIs configured in Google)

3. **Authentication Flow:**
   - User clicks "Continue with Google" button
   - Redirects to Google OAuth consent screen
   - After approval, redirects back to `/auth/callback`
   - Callback route handles OAuth exchange and redirects to destination
   - New users automatically get profile created via `handle_new_user()` trigger
   - Google provides `full_name` via `raw_user_meta_data`

**User Experience:**
- Google button displayed as primary option (at top of forms)
- Traditional email/password below "OR" divider
- Preserves redirect destinations (`redirect_to` parameter)
- Works seamlessly in both development and production

**Important Notes:**
- Same Google OAuth credentials used for both dev and prod environments
- Multiple redirect URIs configured in single Google OAuth client
- Email/password users can't automatically link to Google OAuth (separate accounts unless configured in Supabase)
- First-time Google users get freemium plan via database trigger

### Admin Email Campaigns

The application includes an admin-only email campaign tool for sending marketing emails using Resend templates.

**Access:**
- **URL**: `/admin/email-campaigns`
- **Auth**: Requires `is_admin = TRUE` in user's profile
- **Security**: Protected by middleware, non-admins redirected to home page
- **SEO**: Automatically noindexed (`X-Robots-Tag: noindex, nofollow`)

**Setup:**
```sql
-- Grant admin access to a user
UPDATE profiles SET is_admin = TRUE WHERE primary_email = 'admin@example.com';
```

**Features:**
1. **Template Selection**:
   - Auto-fetches templates from Resend API (`GET /templates`)
   - Dropdown with all available templates
   - Alternative: Custom HTML paste option

2. **Variable Replacement**:
   - Supports `{{{variable}}}`, `{{variable}}`, and `{variable}` formats
   - Case-insensitive matching (handles `firstname` vs `Firstname`)
   - CSV columns become template variables

3. **CSV Upload**:
   - Required columns: `email` + any template variables
   - Example: `email,firstname,discount_code`
   - Preview shows first 10 recipients before sending

4. **Rate Limiting**:
   - Respects Resend's 2 requests/second limit
   - Automatically delays 600ms between sends
   - Prevents rate limit errors

5. **Results Tracking**:
   - Shows successful sends
   - Shows failures with error messages
   - Real-time progress display

**API Routes:**
- `GET /api/admin/resend/templates` - Fetch available templates
- `POST /api/admin/send-campaign` - Send campaign emails

**Security Notes:**
- Double admin check: middleware + API route
- Server-side authorization only (client can't bypass)
- Admin routes automatically excluded from search engines

**Usage Example:**
```csv
email,firstname,discount_code
user@example.com,John,SAVE20
```

### Key Components Structure

- `components/ui/` - Radix UI-based design system components
  - `components/ui/message.tsx` - Reusable message component with variants (info, success, warning, error) using theme colors
- `components/market-analysis/` - Shared components for Market Spy and Market Scout
  - `MarketAnalysisPage.tsx` - Main page component with product type configuration
  - `MarketAnalysisForm.tsx` - Form with conditional room type field
  - `SearchCompleteDialog.tsx` - Success dialog after search
  - `useMarketAnalysisAccount.ts` - Shared account/usage logic hook
- `components/` - Feature-specific components (PropertyCard, Ratings, etc.)
- `app/` - Next.js App Router pages and layouts
  - `app/(no-auth)/feedback-genius/` - Feedback Genius landing page (public)
  - `app/(authenticated)/feedback-genius/analyze/` - Feedback Genius tool (auth-only, free)
  - `app/(no-auth)/market-spy/` - Market Spy landing page (public)
  - `app/(authenticated)/market-spy/analyze/` - Market Spy tool (pro plan required)
  - `app/(no-auth)/market-scout/` - Market Scout landing page (public)
  - `app/(authenticated)/market-scout/analyze/` - Market Scout tool (pro plan required)
- `utils/supabase/` - Supabase client configurations (client, server, middleware)

### Database Integration

- TypeScript types in `app/database.types.ts` (auto-generated from Supabase)
- Supabase client configurations: `utils/supabase/client.ts` (browser), `utils/supabase/server.ts` (SSR), `utils/supabase/middleware.ts` (auth)
- User profiles with subscription plan integration
- **Stripe Payment Integration** with dual pricing model:
  - Volume-based subscription pricing (single Stripe price ID with quantity tiers)
  - Individual one-time payment prices (10 separate price IDs for 1-10 listings)
  - Webhooks handle both subscription and one-time payment events (`app/api/stripe/webhook/route.ts`)
  - Plan sync utilities (`utils/stripe/plan-sync.ts`) manage user billing state
  - **Prepaid reports (one-time purchases)**:
    - Multiple one-time purchases are cumulative (e.g., buying 1 listing then 10 more = 11 total)
    - Tracked in `one_time_listings_balance` field - never expires
    - Carry over when switching from one-time to subscription
    - Used first before subscription allowance
    - Preserved across subscription billing cycles
  - `getCurrentListingsData()` helper in `plan-sync.ts` fetches current totals before adding new purchases
  - Usage tracking (`app/api/market-spy/increment-usage/route.ts`) decrements prepaid balance first
- Schema migrations managed via Supabase CLI
- **Backend Database Operations**:
  - Direct PostgreSQL queries via `pg` client in backend
  - Property data stored in `str_properties`, `properties`, `listings` tables
  - Scan results tracking with `scan_results` and `scan_mismatches`
  - Comparable properties analysis with ratings system

### Styling Conventions

- Uses `cn()` utility from `lib/utils.ts` for conditional classes (clsx + tailwind-merge)
- Component variants with `class-variance-authority`
- Custom date formatting utilities with timezone support (Pacific time)

### Development Notes

- Dev server runs on port 3005 (not default 3000)
- Uses PostHog proxy routes (`/ingest/`) with CORS handling for `strsage.com`
- Theme support via `next-themes` with light/dark modes
- Email templates in `components/email/` using React Email
- Property assessment flows with multi-step wizards
- Geoapify integration for address lookup and autocomplete

### Backend Integration

- **Backend Repository**: `../strscout-backend` (Node.js/Express API server)
- **Backend Port**: 3000 (default) or 3002 (development)
- **Key Backend Commands**:
  - Development: `npm run dev` or `npm run dev-watch` (with nodemon)
  - Build: `npm run build` (TypeScript compilation)
  - Production: `npm start`
- **Frontend API Routes** (Next.js):
  - `/api/account` - Fetch user account data and usage limits (GET)
  - `/api/market-spy/increment-usage` - Track Market Spy usage (POST)
  - `/api/stripe/checkout` - Create Stripe checkout session (POST)
  - `/api/stripe/webhook` - Handle Stripe webhook events (POST)
  - `/api/stripe/customer-portal` - Create customer portal session (POST)
  - `/api/send` - Send emails via Resend (POST)
- **Backend API Routes**:
  - `/api/feedback-genius/*` - Property assessment and ratings
  - `/api/marketspy/*` - Market research and scraping
  - Property CRUD: `/api/property`, `/api/properties`, `/api/listings`
  - Scanning: `/api/scan`, `/api/scan/all`, `/api/recentscans`
  - Comparables: `/api/comps/:externalId`, `/api/ratings-comps/:propertyId`
- **Backend Technologies**:
  - Puppeteer for web scraping (Airbnb, VRBO)
  - PostgreSQL direct queries via `pg` client
  - Cron jobs for automated scanning
  - Resend for email notifications
  - CORS enabled for frontend integration

### Volume-Based Pricing Model

**Pricing Structure (Volume-based tiers):**

- **Subscription**: Volume pricing with per-listing rates based on quantity tier
  - 1 listing: $30.00/listing ($30 total)
  - 2 listings: $20.00/listing ($40 total)
  - 3 listings: $16.66/listing ($50 total)
  - 4 listings: $15.00/listing ($60 total)
  - 5 listings: $14.00/listing ($70 total)
  - 6+ listings: $12.00/listing
- **One-time**: Volume pricing with per-listing rates based on quantity tier
  - 1 listing: $35.00/listing ($35 total)
  - 2 listings: $22.50/listing ($45 total)
  - 3 listings: $18.33/listing ($55 total)
  - 4 listings: $16.25/listing ($65 total)
  - 5 listings: $15.00/listing ($75 total)
  - 6+ listings: $13.00/listing
- **Tiers**: starter (1), growth (2-3), pro (4-5), portfolio (6+)

**Key Files:**

- `lib/pricing.ts` - Volume pricing calculation utilities with `calculatePrice()` function
- `components/pro-plan-selector.tsx` - Pricing UI with subscription/one-time toggle
- `app/(authenticated)/account/page.tsx` - Account page shows billing type and usage
- `migrations/add_new_pricing_fields.sql` - Database schema updates for pricing model
- `utils/stripe/plan-sync.ts` - Handles billing types and usage tracking

**Important Notes:**

- Uses **volume pricing** (not graduated) - price per listing depends on quantity tier
- Stripe subscription configured with volume pricing tiers (1-1, 2-2, 3-3, etc.)
- One-time payments use separate fixed price IDs for each quantity (1-10 listings)
- Custom pricing required for 11+ one-time listings

**Database Schema Changes:**

- Added `billing_type`, `current_tier`, `listings_purchased`, `purchase_date` fields to profiles
- Added `stripe_price_mappings` table for better price management
- Updated webhook handlers to process both subscription and one-time payments

**Frontend Components:**

- Pricing page (`/pricing`) supports both billing types
- Account page shows different UI for subscription vs one-time users
- Stripe customer portal only shown for subscription users
- One-time users get "Buy More Listings" functionality
- Stripe checkout success redirects to `/market-spy/analyze` (not `/account`)

### Stripe Webhook Configuration

**Required Webhook Events:**

The application listens to the following Stripe webhook events to manage subscriptions and payments:

1. `checkout.session.completed` - Upgrades users after purchase (subscription or one-time)
2. `customer.subscription.updated` - Updates subscription status and quantity changes
3. `customer.subscription.deleted` - Downgrades users when subscription is canceled
4. `invoice.payment_succeeded` - Resets Market Spy usage for new billing cycles
5. `invoice.payment_failed` - Marks subscription as past_due

**Setup Instructions:**

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter URL: `https://yourdomain.com/api/stripe/webhook`
4. Select the 5 events listed above
5. Copy the **Signing secret** and set as `STRIPE_WEBHOOK_SECRET` in environment variables

**Important Notes:**

- Webhooks use **service role client** (`SUPABASE_SECRET_KEY`) to bypass RLS policies
- The webhook handler creates a `stripe_events` table record for idempotency
- Plan upgrades happen via `syncUserPlan()` in `utils/stripe/plan-sync.ts`
- Logs are available in Vercel Functions → `/api/stripe/webhook` → Real-time logs

### Testing & Deployment

- Stripe testing guide available in `STRIPE_TESTING_GUIDE.md`
- Test files in `test/` directory
- Backend test endpoint: `curl -X POST http://localhost:3002/api/marketspy/scrape`
- Supabase functions for cron jobs in `supabase/functions/`
- Database schema and migrations in `supabase/migrations/`
- Docker support for backend deployment
