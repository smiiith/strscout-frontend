# Local Landing Pages

Goal: Make local-specific versions of the three main landing pages in an effort to create some longtail SEO content that will show up in localized searches on search engines.
Example: "Is Miami a good place to invest in short term rental properties" or "Is Kissimmee a good market for airbnb"

These three pages exist. The goal is to add local versions of each.

- /market-scout
- /market-spy
- /feedback-genius

We will support these localities initially:

- Kissimmee, FL
- Orlando, FL
- Miami, FL
- Austin, TX
- Las Vegas, NV
- Phoenix, AZ
- Nashville, TN
- San Diego, CA
- New Orleans, LA
- Charleston, SC
- Honolulu, HI
- Fort Lauderdale, FL
- Daytona Beach, FL
- Bend, OR
- Chicago, IL

The URLs for these new pages for each of the three landing page types noted above should be like:

- /market-scout/orlando
- /market-spy/las-vegas

Create a json file with the supported localities.
Index each supported url in the sitemap.
If a user goes to a page that does not exist, like /market-spy/temecula, redirect them to just /market-spy

SEO is the goal. So use the current three pages, but find places in the text to sprinkle the location in a way that makes sense. That will be dynamic based on whether the location exists in the URL or the list we have.

Add new keywords for each locality.

The meta description should include the locality.

The title should include the locality.

Support AI chat optimization too, so that app like chatgpt can find them.

These pages must be indexable by Google and Bing.

---

## Implementation

**Status:** Complete. Merged to `development` branch.

### Files Added

| File | Purpose |
|------|---------|
| `lib/localities.ts` | Single source of truth for all 15 cities (slug, display name, state, STR market insight blurb) |
| `app/(no-auth)/market-spy/[location]/page.tsx` | Dynamic location page for Market Spy |
| `app/(no-auth)/market-scout/[location]/page.tsx` | Dynamic location page for Market Scout |
| `app/(no-auth)/feedback-genius/[location]/page.tsx` | Dynamic location page for Feedback Genius |
| `app/(no-auth)/feedback-genius/[location]/feedback-genius-landing-local.tsx` | Client wrapper component (required because the base FG page is `"use client"`) |

### Files Modified

| File | Change |
|------|--------|
| `app/(no-auth)/market-spy/market-spy-landing.tsx` | Accepts optional `location` prop, threads to sections |
| `app/(no-auth)/market-spy/sections/market-spy-hero.tsx` | Location-aware h1, subtitle, description |
| `app/(no-auth)/market-spy/sections/market-spy-faq.tsx` | Prepends location-specific FAQ item when location present |
| `app/(no-auth)/market-spy/sections/market-spy-final-cta.tsx` | Location name in body copy |
| `app/(no-auth)/market-scout/market-scout-landing.tsx` | Accepts optional `location` prop, threads to sections |
| `app/(no-auth)/market-scout/sections/market-scout-hero.tsx` | Location-aware h1, description |
| `app/(no-auth)/market-scout/sections/market-scout-faq.tsx` | Prepends location-specific FAQ item when location present |
| `app/(no-auth)/market-scout/sections/market-scout-final-cta.tsx` | Location name in h2, body copy |
| `app/(no-auth)/feedback-genius/sections/hero-section.tsx` | City name in description paragraph |
| `app/(no-auth)/feedback-genius/sections/final-cta.tsx` | City name in h2 and body copy |
| `app/sitemap.ts` | Adds all 45 locality URLs (generated from `LOCALITIES`) |
| `app/api/indexnow/submit/route.ts` | Includes all 45 locality URLs in IndexNow submissions |

### How Location Text Is Injected

All `location` props are optional — existing base pages (`/market-spy`, `/market-scout`, `/feedback-genius`) are completely unchanged.

| Section | Market Spy | Market Scout | Feedback Genius |
|---------|-----------|--------------|-----------------|
| **h1** | "Miami hosts, you need more bookings." | "Scout Orlando. Invest Confidently." | Unchanged (brand tagline) |
| **Subtitle/body** | City in description & info box | City in 3 body paragraphs | "your Miami Airbnb listing" |
| **FAQ** | "Is Miami a good STR market?" prepended | "Is Orlando good for STR investment?" prepended | — |
| **Final CTA** | "outperform other Miami listings" | "for Orlando…before you buy" | "Miami Airbnb hosts who've…" |

### SEO Per Page

Each location page generates:
- Unique `<title>` including city and state
- Unique `<meta description>` including city
- 9-keyword `keywords` array with city-specific terms
- `canonical` URL pointing to the location-specific URL
- `openGraph` tags with city-specific title and description
- **JSON-LD** (`WebPage` + `Service` schema with `areaServed: City`) for AI/ChatGPT crawler discovery

### Rendering

All 45 location pages use `generateStaticParams` and pre-render as **static HTML at build time** (`●` SSG in Next.js build output). This is optimal for SEO — no server-side rendering on request.

Unknown slugs (e.g. `/market-spy/temecula`) trigger a `redirect()` to the parent page (`/market-spy`).

### Adding New Localities

1. Add an entry to `lib/localities.ts` — the sitemap, IndexNow route, and all pages update automatically
2. Redeploy
3. Submit new URLs to IndexNow from the browser console (logged in as admin):
   ```javascript
   await fetch('/api/indexnow/submit', { method: 'POST' }).then(r => r.json())
   ```
