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

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_DB_PASSWORD=your_db_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

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

## Architecture Overview

This is a Next.js 14 application built as an STR (Short-Term Rental) property analysis tool called "STR Feedback Genius". The application provides property assessment, competitive analysis, and ratings for Airbnb/rental properties.

### Key Technologies
- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system using Radix UI components
- **Backend**: Supabase (Auth, Database, Storage)
- **Analytics**: PostHog
- **Email**: Resend with React Email components

### Application Structure

**Route Groups:**
- `(authenticated)/` - Protected routes requiring login (properties, account, market-spy)
- `(login)/` - Authentication flows (login, register, password reset)
- `(no-auth)/` - Public pages (home, about, pricing, terms)

**Core Features:**
- Property analysis and assessment with competitive comparisons
- Market research and spy tools (MarketSpy)
- User subscription management with different plans
- Property scanning and ratings system via backend scraping
- Address lookup with Geoapify integration
- Automated calendar synchronization monitoring (Airbnb ↔ VRBO)
- Email notifications for scan results and mismatches

### Authentication & Security
- Supabase Auth with Row Level Security (RLS)
- **Server-side authorization**: Middleware checks both authentication AND subscription plans (`middleware.ts`)
- Plan-protected routes: `/market-spy`, `/my-comps` require "pro" plan (enforced server-side)
- Session management with `UserSessionProvider` context using SSR-compatible Supabase client
- Protected routes: `/account`, `/properties`, `/market-spy`, `/my-comps` (configured in middleware)
- PostHog analytics proxy with CORS handling (`/ingest/` routes)
- **Security**: Plan authorization happens server-side in middleware, not client-side (prevents bypassing)
- **Important**: Uses `utils/supabase/client.ts` (SSR-compatible) not `utils/supabase/js-client.ts` for authentication

#### Authentication Best Practices
- **Always use `useUserSession()` hook** in authenticated pages instead of manual `getSession()`/`getUser()` calls
- The `UserSessionProvider` in `(authenticated)/layout.tsx` handles SSR auth and provides session to child components
- Pattern: `const { session, loading } = useUserSession()` then check `session?.id` before API calls
- Avoid manual auth logic in components - let the provider handle it centrally
- Example working pattern seen in `/my-comps` and `/properties` pages

### Key Components Structure
- `components/ui/` - Radix UI-based design system components
  - `components/ui/message.tsx` - Reusable message component with variants (info, success, warning, error) using theme colors
- `components/` - Feature-specific components (PropertyCard, Ratings, etc.)
- `app/` - Next.js App Router pages and layouts
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
  - 3 listings: $16.67/listing ($50 total)
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
- Stripe checkout success redirects to `/market-spy` (not `/account`)

### Testing & Deployment
- Stripe testing guide available in `STRIPE_TESTING_GUIDE.md`
- Test files in `test/` directory  
- Backend test endpoint: `curl -X POST http://localhost:3002/api/marketspy/scrape`
- Supabase functions for cron jobs in `supabase/functions/`
- Database schema and migrations in `supabase/migrations/`
- Docker support for backend deployment