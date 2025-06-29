# Stripe-Plans Integration Testing Guide

## Quick Setup

### 1. Stripe CLI Setup
```bash
# Install and login to Stripe CLI
stripe login

# Forward webhooks to your local dev server
stripe listen --forward-to localhost:3005/api/stripe/webhook
```

### 2. Test User Setup
You'll need a test user ID from your database:

```sql
-- Find or create a test user
SELECT id, email, plan_id FROM profiles WHERE email = 'your-test-email@example.com';
```

## Testing Commands

### Test Successful Purchase (Market Spy)
```bash
stripe trigger checkout.session.completed \
  --add checkout_session:mode=subscription \
  --add checkout_session:client_reference_id=YOUR_TEST_USER_ID \
  --add checkout_session:customer=cus_test123 \
  --add checkout_session:subscription=sub_test123
```

**Expected Result:**
- User upgraded to Standard plan
- Can access Market Spy page

### Test Subscription Cancellation
```bash
stripe trigger customer.subscription.deleted \
  --add subscription:id=sub_test123
```

**Expected Result:**
- User downgraded to Freemium plan
- Loses access to Market Spy page

### Test Payment Failure
```bash
stripe trigger invoice.payment_failed \
  --add invoice:subscription=sub_test123
```

**Expected Result:**
- Subscription status = 'past_due'
- User keeps current plan (grace period)

## Validation Queries

### Check User's Current Plan
```sql
SELECT 
  p.id,
  p.email,
  p.subscription_status,
  p.stripe_subscription_id,
  pl.key as current_plan,
  pl.name as plan_name
FROM profiles p
JOIN plans pl ON p.plan_id = pl.id
WHERE p.id = 'YOUR_TEST_USER_ID';
```

### Check Webhook Events
```sql
SELECT 
  stripe_event_id,
  event_type,
  processed,
  error_message,
  created_at
FROM stripe_events
ORDER BY created_at DESC
LIMIT 10;
```

### Verify All Plans Exist
```sql
SELECT id, key, name, active FROM plans ORDER BY key;
```

## Manual Testing Checklist

### Before Testing
- [ ] Standard plan exists in database
- [ ] Dev server running (`npm run dev`)
- [ ] Stripe CLI forwarding webhooks
- [ ] Test user ID identified

### Test Scenarios
- [ ] New Market Spy purchase → Standard plan
- [ ] Subscription update → Plan changes accordingly  
- [ ] Subscription cancellation → Freemium plan
- [ ] Payment failure → Grace period (keeps plan)
- [ ] Duplicate webhook events → No double processing

### Frontend Validation
- [ ] Freemium user cannot access Market Spy
- [ ] Standard user can access Market Spy
- [ ] Plan changes reflected immediately after webhook
- [ ] ProtectedPage component works correctly

## Automated Testing

Run the test script:
```bash
cd /path/to/your/frontend
npx tsx test/stripe-plan-integration.test.ts
```

Update `TEST_CONFIG` in the test file with your actual user IDs before running.

## Common Issues

### Issue: "Plan not found for key: standard"
**Solution:** Ensure Standard plan exists in database

### Issue: "User not found for subscription ID"
**Solution:** Verify `stripe_subscription_id` is properly set in profiles table

### Issue: Webhook signature verification failed
**Solution:** Use Stripe CLI for local testing, or check webhook secret in production

### Issue: User still has old plan after webhook
**Solution:** Check webhook logs for errors, verify plan mapping in `STRIPE_PRICE_TO_PLAN`

## Price ID Management

Current price mappings in `utils/stripe/plan-sync.ts`:
- `price_1Rf3qeRQojxLKgwUSlmUkEbH` → Standard (Market Spy $19.95)

Add new price IDs to the mapping when you create additional products/subscriptions.

## Production Deployment

1. **Webhook Endpoint:** Configure in Stripe Dashboard to point to your production URL
2. **Environment Variables:** Ensure all Stripe keys are properly set
3. **Database:** Verify all plans exist in production database
4. **Monitoring:** Watch webhook delivery status in Stripe Dashboard