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
- Middleware-based route protection (`middleware.ts:4-8`)
- Session management with `UserSessionProvider` context
- Protected routes: `/account`, `/properties` (configured in middleware)
- PostHog analytics proxy with CORS handling (`/ingest/` routes)
- User subscription plans integrated with authentication state

### Key Components Structure
- `components/ui/` - Radix UI-based design system components
- `components/` - Feature-specific components (PropertyCard, Ratings, etc.)
- `app/` - Next.js App Router pages and layouts
- `utils/supabase/` - Supabase client configurations (client, server, middleware)

### Database Integration
- TypeScript types in `app/database.types.ts` (auto-generated from Supabase)
- Supabase client configurations: `utils/supabase/client.ts` (browser), `utils/supabase/server.ts` (SSR), `utils/supabase/middleware.ts` (auth)
- User profiles with subscription plan integration
- Stripe payment integration with webhooks (`app/api/stripe/`)
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

### Testing & Deployment
- Stripe testing guide available in `STRIPE_TESTING_GUIDE.md`
- Test files in `test/` directory  
- Backend test endpoint: `curl -X POST http://localhost:3002/api/marketspy/scrape`
- Supabase functions for cron jobs in `supabase/functions/`
- Database schema and migrations in `supabase/migrations/`
- Docker support for backend deployment