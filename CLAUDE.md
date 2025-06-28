# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on port 3005)
- **Build**: `npm run build`
- **Production start**: `npm start`
- **Linting**: `npm run lint`

## Environment Setup

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
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
- Market research and spy tools
- User subscription management with different plans
- Property scanning and ratings system
- Address lookup with Geoapify integration

### Authentication & Security
- Supabase Auth with Row Level Security (RLS)
- Middleware-based route protection (`middleware.ts`)
- Session management with `UserSessionProvider`
- Protected routes defined in middleware: `/account`, `/properties`

### Key Components Structure
- `components/ui/` - Radix UI-based design system components
- `components/` - Feature-specific components (PropertyCard, Ratings, etc.)
- `app/` - Next.js App Router pages and layouts
- `utils/supabase/` - Supabase client configurations (client, server, middleware)

### Database Integration
- TypeScript types generated in `database.types.ts`
- Supabase client utilities for server/client-side operations
- Profile management with user metadata

### Styling Conventions
- Uses `cn()` utility from `lib/utils.ts` for conditional classes (clsx + tailwind-merge)
- Component variants with `class-variance-authority`
- Custom date formatting utilities with timezone support (Pacific time)

### Development Notes
- Dev server runs on port 3005 (not default 3000)
- Uses PostHog proxy routes (`/ingest/`) with CORS handling
- Theme support via `next-themes` with light/dark modes
- Email templates in `components/email/`