# Exit Survey Testing Guide (Non-Technical)

## What is the Exit Survey?

When someone visits our pricing page but doesn't buy, a quick survey pops up asking "What's holding you back from trying STR Sage today?" This helps us understand why people aren't converting so we can fix the real issues.

## Where Does It Appear?

**Only on the pricing page**: https://www.strsage.com/pricing

## When Does It Appear?

The survey will show up after someone has been on the pricing page for at least **30 seconds** AND does one of these things:

- Moves their mouse like they're about to close the tab (desktop)
- Scrolls down the page, then scrolls back to the top
- Switches to a different tab
- Just sits there for 45 seconds total

**Important**: It only shows **once per person**. If they see it and dismiss it, they won't see it again.

---

# How to Test the Survey

## Before You Start

The survey only appears **once**, so you need to "reset" it each time you want to test again.

**To reset the survey:**
1. Right-click anywhere on the pricing page
2. Click **"Inspect"** (this opens Developer Tools)
3. Click the **"Console"** tab at the top
4. Copy and paste this exactly: `localStorage.removeItem('exit-survey-seen')`
5. Press **Enter**
6. Close the Developer Tools

Now you're ready to test!

---

## Test Method 1: Mouse Exit (Desktop Only - Easiest!)

**Best for**: Quick testing on desktop computer

### Steps:
1. Go to https://www.strsage.com/pricing
2. **Wait 30 seconds** (count in your head or use a timer)
3. Move your mouse to the very top of the browser window (like you're going to close the tab)
4. **The survey should pop up!**

### What You Should See:
- A dark overlay covers the page
- A white box appears with the question "What's holding you back from trying STR Sage today?"
- 6 radio button options to choose from
- "Submit" and "No thanks" buttons

---

## Test Method 2: Wait 45 Seconds (Desktop & Mobile)

**Best for**: Testing on mobile phones or tablets

### Steps:
1. Go to https://www.strsage.com/pricing
2. **Wait 45 seconds without doing anything**
3. **The survey should automatically pop up!**

### What You Should See:
- Same as Test Method 1
- Survey appears automatically at exactly 45 seconds

---

## Test Method 3: Scroll Behavior (Desktop & Mobile)

**Best for**: Testing how real users might interact with the page

### Steps:
1. Go to https://www.strsage.com/pricing
2. **Wait 30 seconds**
3. **Scroll down** past the pricing cards (about halfway down the page)
4. **Scroll back up** to the very top of the page
5. **The survey should pop up!**

### What You Should See:
- Survey appears when you reach the top of the page
- Shows the same question and options

---

## Test Method 4: Switch Tabs (Desktop & Mobile)

**Best for**: Simulating distracted users

### Steps:
1. Go to https://www.strsage.com/pricing
2. **Wait 30 seconds**
3. **Click to a different browser tab** or app
4. **Come back to the pricing page**
5. **The survey might appear** (timing varies)

### What You Should See:
- Survey may appear when you switch tabs or when you return

---

# Testing on Mobile Phone

## Option 1: Test on Your Real Phone

1. On your phone, open the browser (Safari, Chrome, etc.)
2. Go to: https://www.strsage.com/pricing
3. Use **Test Method 2** (wait 45 seconds) or **Test Method 3** (scroll down and back up)

**To reset the survey on mobile:**
1. This is trickier on mobile - easiest way is to **clear your browser data**:
   - Safari: Settings → Safari → Clear History and Website Data
   - Chrome: Settings → Privacy → Clear Browsing Data → Cookies and site data
2. Or just wait 24 hours and test with a different device

## Option 2: Ask Someone Else to Test

Since the survey only shows once per person, ask a friend or family member to:
1. Visit https://www.strsage.com/pricing on their phone
2. Wait 45 seconds or scroll down then back up
3. Take a screenshot when the survey appears

---

# What to Test

## 1. Survey Appears Correctly
- ✅ Dark background overlay
- ✅ White survey box in the center
- ✅ Question: "What's holding you back from trying STR Sage today?"
- ✅ 6 radio button options
- ✅ X button in top-right corner
- ✅ "Submit" and "No thanks" buttons

## 2. Survey Options
Make sure all 6 options are shown:
1. Too expensive
2. Not sure it's worth it
3. Want to see more examples/proof
4. Need more time to decide
5. Just researching options
6. Other (please specify)

## 3. "Other" Option Works
1. Click the **"Other"** radio button
2. A text box should appear below it
3. Type something like "Just testing"
4. Click **"Submit"**
5. Should show "Thank you!" message

## 4. Submit Works
1. Select any option (try "Just researching options")
2. Click **"Submit"**
3. Should show "Thank you!" message for 2 seconds
4. Survey should disappear automatically

## 5. Dismiss Works
1. Click the **X button** in top-right corner OR click **"No thanks"**
2. Survey should disappear immediately
3. If you try to trigger it again (mouse exit), it should NOT reappear

## 6. Validation Works
1. **Don't** select any option
2. Click **"Submit"**
3. Button should be **disabled** (grayed out, can't click)
4. Select an option - button should become clickable

---

# Common Issues

## "The survey doesn't appear!"

**Possible reasons:**
1. ✅ **You haven't waited 30 seconds** - Timer starts when page loads
2. ✅ **You saw it before** - Reset using the console method above
3. ✅ **You're testing too fast** - Wait the full 30-45 seconds
4. ✅ **Wrong page** - Must be on https://www.strsage.com/pricing

## "The survey keeps popping up!"

**This shouldn't happen** - it should only show once. If it keeps appearing:
- Take a screenshot
- Note what you were doing when it appeared
- Report to the developer

## "I can't click Submit!"

**This is normal if:**
- You haven't selected an option yet
- You selected "Other" but didn't type anything

**To fix:** Select an option (and type text if you chose "Other")

## "The survey appeared but looks broken!"

- Take a screenshot
- Note what browser you're using (Chrome, Safari, Firefox, etc.)
- Note what device (iPhone, Android, Desktop)
- Report to the developer

---

# Quick Testing Checklist

Use this checklist to verify everything works:

- [ ] Survey appears after 30 seconds + mouse exit (desktop)
- [ ] Survey appears after 45 seconds automatically
- [ ] Survey appears after scroll down + scroll up
- [ ] All 6 options are visible and readable
- [ ] "Other" option shows text box when selected
- [ ] Can't submit without selecting an option
- [ ] Can't submit "Other" without typing text
- [ ] Submit button works and shows "Thank you!"
- [ ] Survey auto-closes after 2 seconds
- [ ] X button closes the survey
- [ ] "No thanks" button closes the survey
- [ ] Survey doesn't appear again after dismissing
- [ ] Survey works on mobile (phone/tablet)
- [ ] Survey looks good on mobile (not cut off or weird)

---

# Testing in Production vs. Development

## Development (Testing Server)
- URL: http://localhost:3005/pricing
- Used by developers for testing changes
- Data saves to development database
- Reset survey using console method

## Production (Live Website)
- URL: https://www.strsage.com/pricing
- Real users see this
- Data saves to production database
- **Be careful**: Your test responses will mix with real customer feedback

**Recommendation**: Test on development first, then do ONE final test on production to verify it works.

---

# Viewing Survey Results

**For non-technical people:**

Ask a developer to run this query and share the results:

```
"Can you pull the exit survey results for the past week?"
```

They'll give you a report showing:
- How many people responded
- What options they selected
- Any "Other" text responses
- When they responded

**What to look for:**
- If most people say "Too expensive" → Consider pricing changes
- If most say "Not sure it's worth it" → Need better social proof
- If most say "Want examples" → Make sample reports more visible
- If responses are mixed → Multiple issues to address

---

# Tips for Best Results

1. **Test on multiple devices**: Desktop, mobile phone, tablet
2. **Test on different browsers**: Chrome, Safari, Firefox, Edge
3. **Test at different times**: Survey should work consistently
4. **Don't test too much on production**: Your test data will pollute real results
5. **Actually fill out the survey**: Make sure the data saves correctly
6. **Try to break it**: Click buttons fast, select/unselect options, etc.

---

# Need Help?

If something doesn't work or looks broken:

1. **Take a screenshot** showing the problem
2. **Write down**:
   - What you were doing when it happened
   - What device/browser you're using
   - What time it happened
3. **Share with the developer** so they can fix it

---

**Remember**: The survey only shows **once per person**, so you'll need to reset it (using the console method) each time you want to test again!

---

**Last Updated**: 2025-11-11
**Questions?** Ask your developer for help!
