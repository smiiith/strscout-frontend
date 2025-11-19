# PostHog Insights for Exit Survey

This directory contains JSON definitions for PostHog insights to track and analyze the exit survey feature.

## Available Insights

### 1. Exit Survey Funnel
**Type:** Funnel
**Purpose:** Track conversion from survey shown to submitted
**Key Metrics:**
- Overall conversion rate
- Drop-off between shown and submitted
- Time to convert

### 2. Exit Survey Dismissal Rate
**Type:** Trends
**Purpose:** Compare shown vs dismissed vs submitted counts over time
**Key Metrics:**
- Daily/weekly trends
- Dismissal rate percentage
- Completion rate percentage

### 3. Exit Survey Reasons Breakdown
**Type:** Trends (with breakdown)
**Purpose:** See which reasons users select most frequently
**Key Metrics:**
- Most common objections
- Distribution of selected options
- Trends in specific reasons over time

**Possible values:**
- `price-higher` - Price is higher than expected
- `no-right-plan` - Couldn't find the right plan
- `missing-data` - Report missing specific data
- `payment-trouble` - Trouble with payment
- `just-researching` - Just researching for now
- `other` - Other reasons

### 4. Exit Survey Triggers Performance
**Type:** Trends (with breakdown)
**Purpose:** Identify which triggers show the survey most often
**Key Metrics:**
- Distribution across trigger types
- Most effective trigger for showing survey

**Possible values:**
- `mouse_exit` - User moved mouse out of viewport
- `scroll_back` - User scrolled back to top after viewing pricing
- `time_threshold` - User spent 45+ seconds on page

### 5. Exit Survey Conversion by Trigger
**Type:** Funnel (with breakdown)
**Purpose:** Compare conversion rates across different trigger types
**Key Metrics:**
- Which trigger has highest conversion rate
- Optimize trigger strategy based on data

### 6. Exit Survey by Page
**Type:** Trends (with breakdown)
**Purpose:** See which pages drive most survey interactions
**Key Metrics:**
- Page-specific conversion rates
- Most problematic pages (high survey appearance)

### 7. Exit Survey Time on Page Distribution
**Type:** Trends
**Purpose:** Understand how long users spend before seeing survey
**Key Metrics:**
- Average time on page before survey
- Distribution of engagement levels

### 8. Exit Survey Completion Rate with Text Input
**Type:** Trends (with breakdown)
**Purpose:** Track how many users provide detailed text feedback
**Key Metrics:**
- Text input rate
- Quality of feedback (with vs without text)

### 9. Exit Survey Partial Completions
**Type:** Trends (with breakdown)
**Purpose:** Users who started but didn't submit
**Key Metrics:**
- Drop-off after selection
- Which options cause most abandonment

## How to Import into PostHog

### Method 1: Manual Creation (Recommended for Learning)
1. Go to PostHog → Insights → New Insight
2. Use the JSON definitions as a guide to configure each insight manually
3. Save each insight to a dashboard called "Exit Survey Analytics"

### Method 2: API Import (Advanced)
You can use PostHog's API to programmatically create these insights:

```bash
curl -X POST 'https://us.i.posthog.com/api/projects/YOUR_PROJECT_ID/insights/' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d @exit-survey-insights.json
```

### Method 3: Dashboard Template (if available)
PostHog may support importing dashboard templates - check their documentation for the latest import methods.

## Creating a Dashboard

After creating the insights, organize them into a dashboard:

1. **Dashboard Name:** Exit Survey Analytics
2. **Layout Recommendation:**
   - Row 1: Funnel + Dismissal Rate (side by side)
   - Row 2: Reasons Breakdown (full width)
   - Row 3: Triggers Performance + Conversion by Trigger (side by side)
   - Row 4: By Page + Time on Page Distribution (side by side)
   - Row 5: Completion with Text Input + Partial Completions (side by side)

## Key Questions These Insights Answer

1. **Is the survey effective?** → Exit Survey Funnel
2. **What are the main objections?** → Exit Survey Reasons Breakdown
3. **Which trigger works best?** → Exit Survey Conversion by Trigger
4. **Are users engaging with it?** → Exit Survey Dismissal Rate
5. **Where should we focus improvements?** → Exit Survey by Page
6. **Are we getting quality feedback?** → Completion Rate with Text Input
7. **What causes drop-offs?** → Partial Completions

## Recommended Actions Based on Data

- **High dismissal rate:** Survey may be appearing too frequently or at wrong time
- **Low conversion on specific trigger:** Adjust trigger timing/conditions
- **High "price-higher" selections:** Consider pricing adjustments or better value communication
- **High "missing-data" selections:** Improve feature transparency or add requested data
- **High partial completions:** Simplify form or reduce friction
- **Low text input rate:** Improve prompts or make text fields more prominent

## Events Reference

The exit survey emits three custom events:

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `exit_survey_shown` | Survey appears to user | `page`, `trigger`, `time_on_page` |
| `exit_survey_submitted` | User completes survey | `page`, `selected_option`, `has_other_text` |
| `exit_survey_dismissed` | User closes without submitting | `page`, `selected_option`, `had_text_input` |

## Tips for Analysis

1. **Set date range to 30 days minimum** for statistical significance
2. **Use cohorts** to compare behavior across user segments
3. **Set up alerts** for unusual spikes in dismissal rate
4. **Track weekly trends** to measure improvements over time
5. **Combine with other metrics** like conversion rate, bounce rate, session duration
