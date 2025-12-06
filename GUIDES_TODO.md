# SEO Guides - Remaining Work

## Overview
This document contains instructions for completing the remaining 3 SEO guide pages. The data aggregation utilities have already been created, and we just need to build the guide pages themselves.

## Completed So Far ✅

### Data Utilities Created:
- ✅ `lib/seo/aggregate-title-data.ts`
- ✅ `lib/seo/aggregate-photo-data.ts`
- ✅ `lib/seo/aggregate-amenities-data.ts`
- ✅ `lib/seo/aggregate-description-data.ts`
- ✅ `lib/seo/aggregate-interior-data.ts`
- ✅ `lib/seo/aggregate-overall-data.ts`

### Guide Pages Created:
- ✅ `/guides` (hub page)
- ✅ `/guides/airbnb-title-optimization`
- ✅ `/guides/airbnb-photo-tips`
- ✅ `/guides/airbnb-amenities-checklist`

### Other Files:
- ✅ `components/breadcrumbs.tsx` (reusable breadcrumb component)
- ✅ `public/images/50-percent-off-holiday-special.svg` (holiday promo badge)
- ✅ Footer updated with "Free Airbnb Guides" link
- ✅ Sitemap partially updated (has title, photo guides)

---

## Remaining Work ⏳

### 1. Create Description Writing Guide
**File:** `app/(no-auth)/guides/airbnb-description-writing/page.tsx`

**Data Source:** `lib/seo/aggregate-description-data.ts` (already created)

**Key Sections to Include:**
- Header with breadcrumbs
- Statistics (average rating: ~79/100 based on sample data)
- Common description issues from AI analysis
- The AIDA Formula (Attention, Interest, Desire, Action)
- "What to Include" checklist:
  - Property highlights
  - Location benefits
  - Unique selling points
  - House rules (presented positively)
  - Local attractions
- "What to Avoid" section:
  - Generic descriptions
  - All caps or excessive punctuation
  - False claims
  - Negative language
- Examples of good vs bad descriptions
- Top AI recommendations from database
- CTA section
- Related guides (Title, Photos, Amenities)
- Tools section

**SEO Metadata:**
```typescript
title: "How to Write Airbnb Descriptions That Get Bookings | STR Sage"
description: "Learn how to write compelling Airbnb listing descriptions. Based on AI analysis of thousands of listings with proven formulas and examples."
keywords: [
  "airbnb description",
  "vacation rental description",
  "how to write airbnb description",
  "str listing copy",
  "airbnb copywriting"
]
```

**Reference:** Look at `/guides/airbnb-photo-tips/page.tsx` for structure

---

### 2. Create Interior Design Tips Guide
**File:** `app/(no-auth)/guides/str-interior-design-tips/page.tsx`

**Data Source:** `lib/seo/aggregate-interior-data.ts` (already created)

**Key Sections to Include:**
- Header with breadcrumbs
- Statistics (average rating: ~74/100 based on sample data)
- Common interior design issues
- Color Palette Guidelines:
  - Neutral base colors
  - Accent colors for personality
  - Avoid busy patterns
- Furniture Selection:
  - Durability over style
  - Scale appropriate to room size
  - Multi-functional pieces
- Styling Tips by Room:
  - Bedroom: Cozy and restful
  - Living room: Inviting and comfortable
  - Kitchen: Clean and functional
  - Bathroom: Spa-like touches
- Budget-Friendly Design Hacks:
  - Fresh paint
  - New throw pillows
  - Artwork and wall decor
  - Plants and greenery
  - Proper lighting
- Top AI recommendations
- CTA section
- Related guides
- Tools section

**SEO Metadata:**
```typescript
title: "STR Interior Design Tips: Create Instagram-Worthy Spaces | STR Sage"
description: "Transform your rental with professional interior design tips. Learn color palettes, furniture selection, and styling that increases bookings."
keywords: [
  "airbnb interior design",
  "str interior design",
  "vacation rental decor",
  "airbnb decorating tips",
  "short term rental design"
]
```

**Reference:** Look at `/guides/airbnb-amenities-checklist/page.tsx` for checklist structure

---

### 3. Create Overall Rating Improvement Guide
**File:** `app/(no-auth)/guides/improve-airbnb-rating/page.tsx`

**Data Source:** `lib/seo/aggregate-overall-data.ts` (already created)

**Key Sections to Include:**
- Header with breadcrumbs
- Statistics showing overall average (82/100) and category breakdown:
  - Title: 79/100
  - Description: 79/100
  - Amenities: 83/100
  - Hero Image: 85/100
  - Other Images: 85/100
  - Interior Design: 74/100
- "Start Here: Identify Your Weak Spots" section
- Category-by-Category Improvement Plan with links to specific guides:
  - Title (link to title guide)
  - Photos (link to photo guide)
  - Description (link to description guide)
  - Amenities (link to amenities guide)
  - Interior Design (link to interior guide)
- Quick Wins (Low-effort, high-impact improvements):
  - Update your hero image
  - Refresh your title
  - Add missing basic amenities
  - Update listing description
- The 80/20 Rule for Airbnb Optimization
- Top overall suggestions from AI
- CTA section
- All related guides linked
- Tools section

**SEO Metadata:**
```typescript
title: "How to Improve Your Airbnb Listing Rating: Complete Guide | STR Sage"
description: "Step-by-step guide to improving your Airbnb listing across all categories. Based on AI analysis showing what actually increases bookings."
keywords: [
  "improve airbnb listing",
  "optimize airbnb",
  "increase airbnb bookings",
  "airbnb optimization guide",
  "str optimization"
]
```

**Note:** This is the "overview" guide that links to all other specific guides. It should be entry-level and direct traffic to specialized guides.

**Reference:** Look at `/guides/airbnb-title-optimization/page.tsx` for overall structure

---

## Final Steps After Creating Guides

### 4. Update Sitemap
**File:** `app/sitemap.ts`

Add these entries after the existing guide entries:

```typescript
{
  url: "https://www.strsage.com/guides/airbnb-description-writing",
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
{
  url: "https://www.strsage.com/guides/str-interior-design-tips",
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
{
  url: "https://www.strsage.com/guides/improve-airbnb-rating",
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
```

### 5. Update Guides Hub Page
**File:** `app/(no-auth)/guides/page.tsx`

Change `available: false` to `available: true` for these guides in the `guides` array:

```typescript
// Line ~53
{
  title: "Essential Airbnb Amenities Checklist",
  // ...
  available: true, // ← Change this
},
// Line ~61
{
  title: "Writing High-Converting Descriptions",
  // ...
  available: true, // ← Change this
},
// Line ~69
{
  title: "STR Interior Design Tips",
  // ...
  available: true, // ← Change this
},
// Line ~77
{
  title: "How to Improve Your Overall Rating",
  // ...
  available: true, // ← Change this
},
```

---

## Code Structure Pattern

All guide pages follow this pattern:

```tsx
import { aggregateXXXFeedbackData } from "@/lib/seo/aggregate-XXX-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { Metadata } from "next";
import { Icons... } from "lucide-react";

export const metadata: Metadata = { /* SEO metadata */ };

export default async function GuideName() {
  const stats = await aggregateXXXFeedbackData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[...]} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">...</script>

      {/* Header */}
      <header className="mb-12">...</header>

      {/* Statistics Section */}
      <section className="mb-12">...</section>

      {/* Main Content Sections */}
      <section className="mb-12">...</section>
      <section className="mb-12">...</section>

      {/* AI Recommendations (if data available) */}
      {stats.topSuggestions.length > 0 && (
        <section className="mb-12">...</section>
      )}

      {/* CTA Section */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">...</Card>
      </section>

      {/* Related Guides */}
      <section className="mb-8">...</section>

      {/* Tools */}
      <section>...</section>
    </div>
  );
}
```

---

## Testing After Completion

1. **Build test:**
   ```bash
   npm run build
   ```

2. **Check all pages load:**
   - http://localhost:3005/guides
   - http://localhost:3005/guides/airbnb-description-writing
   - http://localhost:3005/guides/str-interior-design-tips
   - http://localhost:3005/guides/improve-airbnb-rating

3. **Verify links:**
   - Footer → Guides hub
   - Guides hub → Individual guides (all 6)
   - Breadcrumbs work on all pages
   - Related guides section links properly
   - Tools section links to Feedback Genius and Market Spy

4. **Check sitemap:**
   - http://localhost:3005/sitemap.xml
   - Should include all 7 pages (hub + 6 guides)

---

## SEO Checklist

After all guides are complete, verify:

- [ ] All 6 guides have unique metadata (title, description, keywords)
- [ ] All guides have Schema.org Article markup
- [ ] All guides have breadcrumbs
- [ ] All guides link back to hub
- [ ] All guides link to related guides
- [ ] All guides link to conversion pages (Feedback Genius, Market Spy)
- [ ] Hub page lists all 6 guides with `available: true`
- [ ] Sitemap includes all 7 URLs
- [ ] Footer link to guides hub is present
- [ ] All pages use descriptive anchor text (not generic "Read More")

---

## Files Summary

### New Files to Create (3):
1. `app/(no-auth)/guides/airbnb-description-writing/page.tsx`
2. `app/(no-auth)/guides/str-interior-design-tips/page.tsx`
3. `app/(no-auth)/guides/improve-airbnb-rating/page.tsx`

### Files to Update (2):
1. `app/sitemap.ts` - Add 3 new URLs
2. `app/(no-auth)/guides/page.tsx` - Mark 4 guides as available

### Reference Files (Use These as Templates):
- Title guide: `app/(no-auth)/guides/airbnb-title-optimization/page.tsx`
- Photo guide: `app/(no-auth)/guides/airbnb-photo-tips/page.tsx`
- Amenities guide: `app/(no-auth)/guides/airbnb-amenities-checklist/page.tsx`

---

## Estimated Time

- Description Writing Guide: ~30-45 min
- Interior Design Guide: ~30-45 min
- Overall Rating Guide: ~30-45 min
- Update sitemap + hub: ~5 min

**Total: ~2-2.5 hours**

---

## Notes

- All data aggregation utilities are already created and working
- The pattern is established - just follow existing guide structure
- Focus on actionable content, not fluff
- Keep tone professional but friendly
- Include real stats from database where available
- Always end with CTA to Feedback Genius
