# Exit Survey Documentation

## Overview

The exit survey is an exit-intent popup that appears on the `/pricing` page to gather feedback from visitors who are considering purchasing but haven't committed yet. It helps identify conversion blockers by asking "What's holding you back from trying STR Sage today?"

## Location

- **Component**: `/components/exit-survey.tsx`
- **API Route**: `/app/api/exit-survey/route.ts`
- **Database Table**: `exit_survey_responses`
- **Active On**: `/pricing` page only (can be added to other pages)

## How It Works

### Trigger Logic

The survey appears when a visitor meets **all** of these conditions:

1. **Minimum time on page**: 30 seconds
2. **One of the following exit signals**:
   - Mouse exits top of viewport (desktop)
   - Scrolls down past 30% of page, then back to top
   - Switches tabs/apps
   - Stays on page for 45 seconds (auto-trigger)
3. **Has not seen survey before** (tracked via localStorage)

### Supported Triggers

| Trigger | Desktop | Mobile | Description |
|---------|---------|--------|-------------|
| **Mouse Exit-Intent** | ✅ | ❌ | Detects cursor moving to top of browser (like closing tab) |
| **Scroll Behavior** | ✅ | ✅ | User scrolls down 30%+ then back to top (shows hesitation) |
| **Tab Switch** | ✅ | ✅ | User switches to another tab/app |
| **45-Second Timer** | ✅ | ✅ | Automatic fallback if no other trigger fires |

**Important**: All triggers require a minimum of **30 seconds** on the page before the survey can appear.

## Testing the Exit Survey

### Prerequisites

1. Clear localStorage to reset the survey:
   ```javascript
   localStorage.removeItem('exit-survey-seen')
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Navigate to: `http://localhost:3005/pricing`

### Test Scenarios

#### Option A: Mouse Exit-Intent (Desktop)
1. Visit `/pricing` page
2. Wait **30 seconds**
3. Move mouse cursor to the top of the browser window (like you're closing the tab)
4. ✅ Survey should appear immediately

#### Option B: Time-Based Auto-Trigger (Desktop & Mobile)
1. Visit `/pricing` page
2. Wait **45 seconds** without interacting
3. ✅ Survey should auto-appear at exactly 45 seconds

#### Option C: Scroll Behavior (Desktop & Mobile)
1. Visit `/pricing` page
2. Wait **30 seconds**
3. Scroll down past the pricing cards (30%+ of page)
4. Scroll back up to the very top of the page
5. ✅ Survey should appear

#### Option D: Tab Switch (Desktop & Mobile)
1. Visit `/pricing` page
2. Wait **30 seconds**
3. Switch to another browser tab
4. ✅ Survey should appear (may show when you return to tab)

### Mobile Testing

**Chrome DevTools Mobile Emulator:**
- ✅ Works: Time-based trigger (45 seconds)
- ✅ Works: Scroll behavior
- ✅ Works: Tab visibility
- ⚠️ Mouse exit still works (because you're using a mouse)

**Real Mobile Device:**
1. Find your local IP: `ifconfig | grep "inet "` (look for 192.168.x.x)
2. Start dev server: `npm run dev`
3. On phone, visit: `http://YOUR-IP:3005/pricing`
4. Test scroll behavior or 45-second timer

### Fast Testing (Development Only)

To test faster than waiting 45 seconds, temporarily modify the trigger in `components/exit-survey.tsx`:

```typescript
// Line 45 - Change from:
if (timeOnPage === 45) {

// To:
if (timeOnPage === 10) {  // Test with 10 seconds
```

This will trigger the survey after just 10 seconds instead of 45.

## Survey Questions

### Multiple Choice Options:
1. Too expensive
2. Not sure it's worth it
3. Want to see more examples/proof
4. Need more time to decide
5. Just researching options
6. Other (please specify) - shows textarea for free-form input

### Validation:
- Must select an option to submit
- If "Other" is selected, must provide text explanation
- Submit button disabled until valid selection

## Data Storage

### Database Schema

**Table**: `exit_survey_responses`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID (nullable) | User ID if logged in, null if anonymous |
| `page_path` | TEXT | Page where survey shown (e.g., "/pricing") |
| `selected_option` | TEXT | Option selected (e.g., "too-expensive") |
| `other_text` | TEXT (nullable) | Free-form text if "other" selected |
| `user_agent` | TEXT (nullable) | Browser user agent for analytics |
| `created_at` | TIMESTAMP | When response was submitted |

### Querying Responses

**View all responses:**
```sql
SELECT * FROM exit_survey_responses
ORDER BY created_at DESC;
```

**Count responses by option:**
```sql
SELECT selected_option, COUNT(*) as count
FROM exit_survey_responses
GROUP BY selected_option
ORDER BY count DESC;
```

**View "Other" responses:**
```sql
SELECT other_text, created_at
FROM exit_survey_responses
WHERE selected_option = 'other'
AND other_text IS NOT NULL
ORDER BY created_at DESC;
```

**Logged in vs anonymous:**
```sql
SELECT
  CASE WHEN user_id IS NULL THEN 'anonymous' ELSE 'logged_in' END as user_type,
  COUNT(*) as count
FROM exit_survey_responses
GROUP BY user_type;
```

## User Experience

### Survey Behavior:
- ✅ Shows once per visitor (tracked via localStorage)
- ✅ Modal overlay with dark background
- ✅ Dismissible with X button or "No thanks"
- ✅ Shows "Thank you!" message after submission
- ✅ Auto-closes 2 seconds after successful submission
- ✅ Non-blocking (user can dismiss and continue browsing)

### Reset Survey (for re-testing):
```javascript
// Browser console
localStorage.removeItem('exit-survey-seen')
```

## Common Issues & Solutions

### Survey doesn't appear?
- ✅ Check you waited at least 30 seconds
- ✅ Check browser console for errors
- ✅ Verify localStorage: `localStorage.getItem('exit-survey-seen')` should be null
- ✅ Try triggering with mouse exit (easiest to test)

### Survey keeps appearing?
- ✅ Should be fixed - localStorage is set on dismiss and submit
- ✅ Check that `exit-survey-seen` is set in localStorage after dismissing

### Can't submit survey?
- ✅ Ensure you selected an option
- ✅ If "Other" selected, ensure you typed text
- ✅ Check Network tab for API errors
- ✅ Verify database table exists and RLS policies are correct

### Database errors?
- ✅ Run migration: `supabase/migrations/20251111000000_create_exit_survey_responses.sql`
- ✅ Verify table exists: `SELECT * FROM exit_survey_responses LIMIT 1;`
- ✅ Check RLS policies allow INSERT for public
- ✅ Verify API route has correct Supabase credentials

## Adding to Other Pages

To add the exit survey to additional pages (e.g., Market Spy, Market Scout):

```tsx
// In your page component
import ExitSurvey from "@/components/exit-survey";

export default function YourPage() {
  return (
    <>
      <ExitSurvey pagePath="/your-page-path" />
      {/* Your page content */}
    </>
  );
}
```

The `pagePath` prop is stored in the database for analytics purposes.

## Analytics & Insights

### Key Metrics to Track:
1. **Response rate**: % of pricing page visitors who see and respond to survey
2. **Top blockers**: Which options are selected most frequently
3. **Logged in vs anonymous**: Do authenticated users have different concerns?
4. **Device type**: Do mobile users have different blockers? (check user_agent)

### Using the Data:
- **"Too expensive"** → Test pricing, add value justification, or offer discount
- **"Not sure it's worth it"** → Add social proof, testimonials, ROI examples
- **"Want examples/proof"** → Make sample reports more prominent, add case studies
- **"Need more time"** → Add email capture, nurture sequence
- **"Just researching"** → Normal, track conversion rate over time

## Configuration

### Enable/Disable Feature

Control the exit survey via environment variable:

```bash
# .env.local or Vercel environment variables
NEXT_PUBLIC_EXIT_SURVEY_ENABLED=true   # Survey enabled (default)
NEXT_PUBLIC_EXIT_SURVEY_ENABLED=false  # Survey disabled
```

**Use cases:**
- Disable during Black Friday sales (avoid survey interruption)
- Disable for A/B testing periods
- Disable if conversion rate drops significantly
- Enable/disable per environment (dev vs. production)

**Note**: If the variable is not set, the survey is **enabled by default**.

### Timing Settings (in `components/exit-survey.tsx`):

```typescript
// Minimum time before survey can appear
timeOnPage >= 30  // Line 83 - 30 seconds minimum

// Auto-trigger time
if (timeOnPage === 45)  // Line 45 - Show after 45 seconds

// Scroll threshold
if (scrollDepth > pageHeight * 0.3)  // Line 56 - 30% of page

// Scroll back to top threshold
if (window.scrollY < 100)  // Line 61 - Within 100px of top
```

Adjust these values based on your analytics and user behavior.

## Production Deployment

### Checklist:
1. ✅ Database migration applied to production
2. ✅ Environment variables configured (Supabase credentials)
3. ✅ Test survey on production domain
4. ✅ Verify data is being saved to production database
5. ✅ Set up monitoring/alerts for survey responses (optional)
6. ✅ Plan to review responses weekly and act on insights

### Monitoring:
- Check Supabase table for new responses
- Set up PostHog/analytics event tracking (optional enhancement)
- Create dashboard to visualize response trends

## Future Enhancements

Potential improvements to consider:

1. **A/B test different questions** to find most actionable insights
2. **Conditional follow-up questions** based on first answer
3. **Email capture** for "need more time" responses
4. **Immediate discount offer** for "too expensive" responses
5. **Show sample report** for "want examples" responses
6. **PostHog integration** for advanced analytics
7. **Admin dashboard** to view responses without SQL queries
8. **Slack/email notifications** when new responses submitted

## Support

For issues or questions:
- Check browser console for errors
- Review Supabase logs for API errors
- Test with localStorage cleared
- Verify database RLS policies

---

**Last Updated**: 2025-11-11
**Version**: 1.0
