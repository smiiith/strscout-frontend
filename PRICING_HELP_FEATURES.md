# Pricing Page Help Features

## Overview

Added two help components to reduce friction on the pricing page by proactively offering sample reports and demo access before purchase.

## Components

### 1. Help Banner (`PricingHelpBanner`)
**Location**: Above pricing cards on `/pricing` page

**Features**:
- Prominent card with "Need help deciding?" heading
- Two action buttons side-by-side:
  - **View Sample Report**: Opens Market Spy sample report in dialog
  - **Talk to Us / See Demo**: Opens dialog with video + contact link

**Purpose**: Catch users early before they scroll to pricing, address concerns upfront

---

### 2. Floating Help Widget (`PricingHelpWidget`)
**Location**: Bottom-right corner (fixed position, always visible)

**Features**:
- Circular help button with `?` icon
- Expands to show menu with same two options
- Stays with user as they scroll
- Dismissible but always accessible

**Purpose**: Provide help throughout the page journey, familiar pattern (like Intercom)

---

## Implementation Details

### Files Created/Modified

**New Components**:
- `/components/pricing-help-banner.tsx` - Help banner above pricing cards
- `/components/pricing-help-widget.tsx` - Floating help button (bottom-right)

**Modified Components**:
- `/components/comps-dialog.tsx` - Added `buttonVariant` and `buttonClassName` props for customization
- `/app/(no-auth)/pricing/page.tsx` - Integrated both help components

### Sample Report Integration

Both components reuse the existing `CompsDialog` component:
- **Data**: `MockMarketSpyComps` (same mock data used on Market Spy landing page)
- **Component**: `/components/comps-dialog.tsx`
- **Table**: `/components/comps-table.tsx`

No duplication - leverages existing sample report infrastructure.

### Demo Video

**YouTube URL**: https://youtu.be/dOBdLm3_Z1s

**Implementation**:
- Embedded as iframe in dialog
- Shows when user clicks "Talk to Us / See Demo"
- Also includes link to `/contact` page below video

---

## User Flow

### Scenario 1: User Lands on Pricing Page
1. Sees help banner immediately below header
2. Can click "View Sample Report" to see what they'll get
3. Or click "Talk to Us / See Demo" to watch video or contact

### Scenario 2: User Scrolls Through Page
1. Floating help button stays visible in bottom-right
2. Can click to expand menu at any time
3. Access same two options without scrolling back up

### Scenario 3: Sample Report
1. User clicks "View Sample Report" (either location)
2. Dialog opens with full Market Spy sample report
3. Can explore data, see quality, understand value prop
4. Closes dialog and returns to pricing decision

### Scenario 4: Demo Video
1. User clicks "Talk to Us / See Demo"
2. Dialog opens with embedded YouTube video
3. Can watch full demo walkthrough
4. Below video: link to contact page for follow-up questions
5. Closes dialog and returns to pricing

---

## Design Decisions

### Why Two Placements?

**Banner (Above Pricing)**:
- High visibility for new visitors
- Proactive friction reduction
- Catches hesitation early

**Widget (Floating)**:
- Always accessible throughout journey
- Familiar pattern (users know what `?` button does)
- Doesn't interrupt with banner blindness

### Why These Two CTAs?

**"View Sample Report"**:
- Addresses "What will I actually get?" objection
- Shows quality and depth of analysis
- Builds trust through transparency

**"Talk to Us / See Demo"**:
- Addresses "Is this right for me?" objection
- Video shows real use cases
- Contact option for specific questions
- Human touch for complex decisions

---

## Conversion Impact

### Problems This Solves

From exit survey insights, this addresses:
1. ❌ "Not sure it's worth it" → See sample report
2. ❌ "Want to see more examples/proof" → Watch demo video
3. ❌ "The report is missing specific data I need" → See exact data in sample
4. ❌ "Need more time to decide" → Watch demo, then contact us

### Expected Behavior

- **Reduced exit rate**: Users get help before leaving
- **Higher conversion**: Transparency builds trust
- **Better qualified leads**: Only convert users who understand value
- **Fewer refunds**: Users know what they're buying

---

## Testing

### Test the Help Banner

1. Visit `/pricing` page
2. See banner above pricing cards:
   - Heading: "Need help deciding?"
   - Subtitle: "See what you'll get or talk to us before choosing a plan"
   - Two buttons side-by-side
3. Click "View Sample Report" → Sample report dialog opens
4. Click "Talk to Us / See Demo" → Video + contact dialog opens

### Test the Floating Widget

1. Visit `/pricing` page
2. See circular `?` button in bottom-right corner
3. Click button → Menu expands with same two options
4. Click outside or X button → Menu closes
5. Scroll down page → Button stays visible (fixed position)
6. Click again → Menu still works

### Test Sample Report Dialog

1. Click "View Sample Report" from either location
2. Dialog opens showing Market Spy sample data:
   - Comparable properties table
   - Occupancy percentages
   - Ratings and scores
   - Policy analysis
3. Can scroll through full table
4. Click outside or X → Dialog closes

### Test Demo Video Dialog

1. Click "Talk to Us / See Demo" from either location
2. Dialog opens showing:
   - Heading: "Watch Demo or Contact Us"
   - YouTube video embed (https://youtu.be/dOBdLm3_Z1s)
   - Below video: "Still have questions?" section
   - "Contact Us" button linking to `/contact`
3. Can play video inline
4. Can click "Contact Us" → Navigates to contact page
5. Click outside or X → Dialog closes

---

## Mobile Considerations

### Banner
- Stacks buttons vertically on mobile
- Full-width buttons for easy tapping
- Maintains readability and spacing

### Widget
- Fixed position works on mobile
- Large touch target (56x56px)
- Menu slides up from button
- Covers only small portion of screen

### Dialogs
- Full-width on mobile (95vw)
- YouTube video maintains aspect ratio
- Scrollable if content overflows
- Easy to dismiss

---

## Future Enhancements

**Potential improvements**:

1. **Track which CTA converts better**:
   - Add PostHog events for each button click
   - See if sample report or demo drives more conversions

2. **A/B test placements**:
   - Banner vs. no banner
   - Widget vs. no widget
   - Both vs. widget-only

3. **Add more resources**:
   - Case studies
   - Testimonials
   - Feature comparison video

4. **Conditional offers**:
   - If user clicks sample report → Offer discount code
   - If user watches full demo → Unlock trial extension

5. **Live chat integration**:
   - Add "Chat with us" option to widget menu
   - Connect to Intercom/Drift/etc.

---

## Analytics to Track

### Key Metrics

1. **Help banner clicks**:
   - How many users engage with banner?
   - Which button more popular?

2. **Widget clicks**:
   - How many use floating widget vs. banner?
   - When in journey do they click?

3. **Dialog completion**:
   - Sample report: How long do users spend viewing?
   - Demo video: What % watch full video?

4. **Conversion correlation**:
   - Do users who view sample convert at higher rate?
   - Do users who watch demo convert better?

5. **Exit survey changes**:
   - Does "want examples" response rate drop?
   - Does "not sure worth it" decrease?

### Implementation

Add PostHog events:
```typescript
// Banner clicks
posthog.capture('pricing_help_banner_sample_click')
posthog.capture('pricing_help_banner_demo_click')

// Widget clicks
posthog.capture('pricing_help_widget_sample_click')
posthog.capture('pricing_help_widget_demo_click')

// Dialog interactions
posthog.capture('sample_report_viewed', { duration: 'seconds' })
posthog.capture('demo_video_started')
posthog.capture('demo_video_completed')
posthog.capture('contact_clicked_from_demo')
```

---

## Maintenance

### Updating Demo Video

To change the YouTube video:
1. Edit both component files:
   - `/components/pricing-help-banner.tsx`
   - `/components/pricing-help-widget.tsx`
2. Replace YouTube URL in iframe `src`:
   ```typescript
   src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
   ```
3. Update `title` attribute for accessibility

### Updating Sample Report

Sample report data comes from:
- **Data source**: `/components/ratings-example/market-spy-mock.ts`
- **Component**: `CompsDialog` using `MockMarketSpyComps`

To update sample data, edit the mock file.

### Removing/Disabling Features

**To disable help banner**:
```tsx
// In /app/(no-auth)/pricing/page.tsx
// Comment out or remove:
<PricingHelpBanner />
```

**To disable floating widget**:
```tsx
// In /app/(no-auth)/pricing/page.tsx
// Comment out or remove:
<PricingHelpWidget />
```

---

## Summary

Two complementary help features that proactively reduce friction on the pricing page:

✅ **Help Banner** - High-visibility CTA above pricing cards
✅ **Floating Widget** - Always-accessible help button
✅ **Sample Report** - Shows exactly what users will get
✅ **Demo Video** - Demonstrates value in action
✅ **Contact Link** - Human support for complex questions

**Goal**: Answer "Is this worth it?" and "What do I get?" before users leave the page.

---

**Last Updated**: 2025-11-11
**Version**: 1.0
