# Conversion Funnel Strategy - Facebook Ads to Feedback Genius

**Date:** January 7, 2026
**Status:** Planning / Not Implemented
**Problem:** Facebook ad traffic to `/feedback-genius` landing page has zero conversions to signup

---

## Current Funnel Analysis

### Existing Flow
```
Facebook Ad → /feedback-genius → "Get Free Analysis" CTA → /register (full signup) → Tool
```

### The Problem
- **Too much, too soon**: Asking cold traffic to create full account immediately
- **No trust building**: Users don't know the brand yet
- **High friction**: Full registration (email + password + profile) is a big commitment
- **No intermediate value**: All-or-nothing approach

---

## Recommended Middle-of-Funnel Solutions

### Option 1: Lead Magnet Page (PDF Download)

**New Page:** `/feedback-genius/free-guide`

**Offer:**
- Free downloadable PDF: "10 Listing Mistakes Costing You Bookings" or "Airbnb Optimization Checklist"
- Email capture only (no password required)
- Immediate download after email submission

**Flow:**
```
Facebook Ad → Lead Magnet Page → Email Only → Download PDF → Email Nurture Sequence → Full Signup
```

**Email Nurture Sequence:**
- Day 1: PDF delivery + welcome
- Day 3: Case study / testimonial
- Day 5: "Ready for personalized analysis?" (CTA to signup)
- Day 7: Urgency / scarcity angle

**Pros:**
- Lowest barrier to entry
- Builds email list for remarketing
- Provides immediate value
- Industry-standard approach

**Cons:**
- Requires email marketing setup
- Longer conversion timeline
- Need to create quality PDF content

---

### Option 2: Interactive Quiz/Scorecard (RECOMMENDED)

**New Page:** `/feedback-genius/quiz`

**Two Implementation Approaches:**

#### Approach A: Self-Assessment Quiz (Recommended)
No property evaluation needed - purely diagnostic questionnaire.

**Sample Questions:**
1. "How many bookings did you get last month?"
   - 0-5 / 6-10 / 11-15 / 16+

2. "Do you have professional photos?"
   - Yes / No / Not sure

3. "How many photos does your listing have?"
   - Less than 5 / 5-10 / 10-15 / 15+

4. "How would you rate your current title?"
   - Amazing / Good / Okay / Poor

5. "Do you have a detailed welcome guide?"
   - Yes / No

6. "What's your average review score?"
   - 4.0-4.5 / 4.6-4.8 / 4.9-5.0 / New listing

**Scoring Algorithm:**
- JavaScript-based scoring (no backend/AI needed)
- Each answer gets points (0-20 per question)
- Total score out of 100
- Example: "You scored 58/100 - Your listing has potential but needs optimization"

**Three-Step Flow:**

**Step 1: Quiz (No Email Required)**
```
Facebook Ad → Quiz Page → User answers 5-6 questions
```
- Zero commitment, just curiosity
- Takes 30-60 seconds

**Step 2: Email Capture for Preliminary Results**
```
"Enter your email to see your score"
```
- Shows partial/teaser results:
  - Overall score: 58/100
  - "Your title needs work 😬"
  - "Your photos look great! ✅"
  - "Want to see what's holding you back?"
- Builds curiosity gap

**Step 3: Full Signup for Complete Analysis**
```
"Create free account for full AI-powered analysis"
```
- Now they enter password and complete registration
- Get access to real 6-category AI analysis tool
- Already invested (quiz + email), more likely to complete

**Why This Works:**
1. **Progressive commitment** - each step provides value before asking for more
2. **Psychological investment** - they've already spent time answering questions
3. **Creates pain point** - score reveals their weaknesses
4. **Qualification** - filters out non-serious users
5. **Data collection** - learn about user pain points from answers

#### Approach B: Lightweight Property Preview
Asks for Airbnb URL and does basic scraping.

**What to Check:**
- Photo count (scrape listing page)
- Title character length
- Description word count
- Number of amenities listed
- Review count

**Scoring:**
- Quantitative metrics only:
  - 8 photos = 6/10 ("Could use more!")
  - Title 35 characters = 7/10 ("A bit short")
  - 500-word description = 8/10 ("Good length")
- Overall: 65/100

**Flow:**
```
Facebook Ad → Quiz Page → Enter URL → Basic scraping → Email for results → Full signup for AI analysis
```

**Pros:**
- More personalized (real data)
- Shows capability of tool

**Cons:**
- Technical complexity (scraping)
- Slower (API delays)
- Doesn't work for users without existing listing
- May have API costs

---

### Option 3: Hybrid A/B Testing Approach

**Implementation:**
- Create both lead magnet AND quiz pages
- Split Facebook traffic 50/50
- Track conversion rates at each step:
  - Ad click → Page visit
  - Page visit → Email capture
  - Email capture → Full signup
  - Full signup → Tool usage

**Test for 2-4 weeks, then double down on winner**

---

## Recommended Implementation Plan

### Phase 1: Build Self-Assessment Quiz (Option 2, Approach A)

**Why start here:**
1. **Fastest to build** - no scraping, no AI, just form + scoring logic
2. **Lowest technical risk** - pure frontend
3. **Immediate engagement** - users interact vs passive reading
4. **Qualification built-in** - quiz answers reveal user intent
5. **Works for everyone** - even users planning a listing

**Technical Requirements:**
- New page: `/feedback-genius/quiz`
- 5-6 multiple choice questions
- JavaScript scoring algorithm
- Email capture form (integrate with existing auth)
- Store quiz results in session/localStorage
- Redirect to `/register` with quiz context
- After signup, show quiz results + CTA to analyze real listing

**No Backend Changes Needed:**
- Pure frontend implementation
- Uses existing registration flow
- No database schema changes
- No AI/scraping integration

---

## Implementation Details

### Page Structure

```
/feedback-genius/quiz
├── Hero: "How optimized is your Airbnb listing?"
├── Quiz Form: 5-6 questions (progressive disclosure)
├── Results Section: Score + breakdown (after email capture)
└── CTA: "Get AI analysis of your actual listing"
```

### User Journey Map

```
Cold Traffic → Quiz Landing
              ↓
          Answer Q1-6 (30-60 sec)
              ↓
          See partial score teaser
              ↓
          "Enter email for full breakdown"
              ↓
          Email captured ✓
              ↓
          See detailed score:
          - 58/100 overall
          - Title: 4/10 (needs work)
          - Photos: 7/10 (good)
          - Description: 5/10 (too short)
          - Etc.
              ↓
          "Want AI to analyze your ACTUAL listing?"
          [Create Free Account] button
              ↓
          /register (with quiz context)
              ↓
          After signup → Show quiz results + link to /feedback-genius/analyze
```

### Scoring Algorithm Example

```javascript
const calculateScore = (answers) => {
  let score = 0;

  // Q1: Bookings per month
  score += answers.bookings === '16+' ? 20 :
           answers.bookings === '11-15' ? 15 :
           answers.bookings === '6-10' ? 10 : 5;

  // Q2: Professional photos
  score += answers.professionalPhotos === 'yes' ? 20 :
           answers.professionalPhotos === 'not-sure' ? 10 : 0;

  // Q3: Photo count
  score += answers.photoCount === '15+' ? 20 :
           answers.photoCount === '10-15' ? 15 :
           answers.photoCount === '5-10' ? 10 : 5;

  // ... continue for all questions

  return score; // 0-100
};

const getScoreMessage = (score) => {
  if (score >= 80) return "Great job! Your listing is well-optimized.";
  if (score >= 60) return "Good foundation, but there's room to improve.";
  if (score >= 40) return "Your listing needs work to compete effectively.";
  return "Your listing is missing critical elements.";
};
```

### Email Capture Integration

Use existing Supabase auth or simple form submission:

```typescript
// Option 1: Store email in localStorage, complete signup later
localStorage.setItem('quiz_email', email);
localStorage.setItem('quiz_score', score);

// Option 2: Create "partial" user record (email only, no password yet)
// Then complete registration in second step

// Option 3: Just collect email, send to existing /register flow
router.push(`/register?email=${email}&source=quiz&score=${score}`);
```

---

## Success Metrics

### Track at Each Stage:

1. **Quiz Start Rate**
   - Facebook ad clicks → Quiz page loads

2. **Quiz Completion Rate**
   - Quiz started → All questions answered

3. **Email Capture Rate**
   - Quiz completed → Email submitted

4. **Signup Conversion Rate**
   - Email captured → Full account created

5. **Tool Usage Rate**
   - Account created → Analyzed a property

### Target Benchmarks:

- Quiz completion: 60-80% (should be high)
- Email capture: 40-60% (after quiz investment)
- Signup after email: 30-50% (warm lead)
- Overall conversion (ad → signup): 10-15%

Compare to current conversion rate (likely <1% based on "nobody is converting")

---

## Next Steps

### To Implement Quiz:

1. **Design quiz questions** - finalize 5-6 questions + answer options
2. **Build scoring algorithm** - map answers to point values
3. **Create `/feedback-genius/quiz` page** - form UI + progressive disclosure
4. **Add email capture step** - integrate with auth system
5. **Build results display** - show score + category breakdown
6. **Connect to registration flow** - preserve context through signup
7. **Update Facebook ads** - point to `/feedback-genius/quiz` instead of `/feedback-genius`
8. **Set up analytics** - track funnel dropoff at each step

### Alternative: Lead Magnet

1. **Create PDF guide** - "10 Listing Mistakes" or optimization checklist
2. **Build `/feedback-genius/free-guide` page** - landing page + email form
3. **Set up email automation** - nurture sequence (Day 1, 3, 5, 7)
4. **Configure Resend/email provider** - drip campaign
5. **Update Facebook ads** - point to guide page

---

## Questions to Resolve

1. **Which approach?** Quiz (recommended) or Lead Magnet?
2. **Email provider?** Already using Resend - can we set up automation?
3. **Facebook ad creative?** Update ad copy to match quiz angle?
4. **Analytics?** PostHog events for each funnel step?
5. **Timeline?** How quickly do we need this live?

---

## Resources

- Current landing page: `/app/(no-auth)/feedback-genius/page.tsx`
- Registration flow: `/app/(login)/register/page.tsx`
- Existing auth: Supabase with `UserSessionProvider`
- Email service: Resend (configured)
- Analytics: PostHog (integrated)
