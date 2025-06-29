/**
 * Test script for Stripe-Plans integration
 * Run this script to validate your plan synchronization is working correctly
 */

import { createClient } from '@/utils/supabase/server';
import { syncUserPlan, syncUserPlanBySubscriptionId, getUserPlan } from '@/utils/stripe/plan-sync';

// Test configuration - UPDATE THESE VALUES FOR YOUR TESTS
const TEST_CONFIG = {
  // Replace with actual test user ID from your database
  testUserId: 'YOUR_TEST_USER_ID',
  
  // Replace with actual test subscription ID
  testSubscriptionId: 'sub_test123',
  
  // Stripe price IDs to test
  priceIds: {
    marketSpy: 'price_1Rf3qeRQojxLKgwUSlmUkEbH',
    // Add other price IDs when you create them
  }
};

async function validateDatabasePlans() {
  console.log('🔍 Validating database plans...');
  
  const supabase = await createClient();
  
  const { data: plans, error } = await supabase
    .from('plans')
    .select('*')
    .order('key');

  if (error) {
    console.error('❌ Error fetching plans:', error);
    return false;
  }

  console.log('📋 Available plans:');
  plans?.forEach(plan => {
    console.log(`  - ${plan.key}: ${plan.name} (ID: ${plan.id})`);
  });

  // Check for required plans
  const requiredPlans = ['freemium', 'standard', 'pro'];
  const existingPlans = plans?.map(p => p.key) || [];
  const missingPlans = requiredPlans.filter(p => !existingPlans.includes(p));

  if (missingPlans.length > 0) {
    console.error('❌ Missing required plans:', missingPlans);
    return false;
  }

  console.log('✅ All required plans exist in database');
  return true;
}

async function testPlanSync() {
  console.log('🧪 Testing plan synchronization...');
  
  if (!TEST_CONFIG.testUserId || TEST_CONFIG.testUserId === 'YOUR_TEST_USER_ID') {
    console.error('❌ Please update TEST_CONFIG.testUserId with a real user ID');
    return false;
  }

  // Test 1: Sync to Standard plan (Market Spy purchase)
  console.log('📝 Test 1: Syncing user to Standard plan...');
  const result1 = await syncUserPlan(
    TEST_CONFIG.testUserId, 
    TEST_CONFIG.priceIds.marketSpy, 
    'active'
  );

  if (!result1) {
    console.error('❌ Test 1 failed: Could not sync to Standard plan');
    return false;
  }

  // Verify the change
  const userPlan1 = await getUserPlan(TEST_CONFIG.testUserId);
  if (userPlan1?.plan?.key !== 'standard') {
    console.error('❌ Test 1 failed: User plan is not standard, got:', userPlan1?.plan?.key);
    return false;
  }
  console.log('✅ Test 1 passed: User successfully upgraded to Standard plan');

  // Test 2: Downgrade to Freemium (subscription canceled)
  console.log('📝 Test 2: Downgrading user to Freemium...');
  const result2 = await syncUserPlan(
    TEST_CONFIG.testUserId, 
    TEST_CONFIG.priceIds.marketSpy, 
    'canceled'
  );

  if (!result2) {
    console.error('❌ Test 2 failed: Could not downgrade to Freemium');
    return false;
  }

  // Verify the change
  const userPlan2 = await getUserPlan(TEST_CONFIG.testUserId);
  if (userPlan2?.plan?.key !== 'freemium') {
    console.error('❌ Test 2 failed: User plan is not freemium, got:', userPlan2?.plan?.key);
    return false;
  }
  console.log('✅ Test 2 passed: User successfully downgraded to Freemium plan');

  return true;
}

async function testSubscriptionIdSync() {
  console.log('🧪 Testing subscription ID based sync...');
  
  if (!TEST_CONFIG.testSubscriptionId || TEST_CONFIG.testSubscriptionId === 'sub_test123') {
    console.log('⚠️ Skipping subscription ID test - update TEST_CONFIG.testSubscriptionId with real subscription ID');
    return true;
  }

  const result = await syncUserPlanBySubscriptionId(
    TEST_CONFIG.testSubscriptionId,
    TEST_CONFIG.priceIds.marketSpy,
    'active'
  );

  if (!result) {
    console.error('❌ Subscription ID sync test failed');
    return false;
  }

  console.log('✅ Subscription ID sync test passed');
  return true;
}

async function validateWebhookEventLogging() {
  console.log('🔍 Checking webhook event logging...');
  
  const supabase = await createClient();
  
  const { data: events, error } = await supabase
    .from('stripe_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('❌ Error fetching webhook events:', error);
    return false;
  }

  console.log(`📊 Found ${events?.length || 0} recent webhook events`);
  events?.forEach(event => {
    console.log(`  - ${event.event_type} (${event.processed ? 'processed' : 'pending'})`);
  });

  return true;
}

async function runAllTests() {
  console.log('🚀 Starting Stripe-Plans integration tests...\n');

  const tests = [
    { name: 'Database Plans Validation', fn: validateDatabasePlans },
    { name: 'Plan Synchronization', fn: testPlanSync },
    { name: 'Subscription ID Sync', fn: testSubscriptionIdSync },
    { name: 'Webhook Event Logging', fn: validateWebhookEventLogging },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n🔄 Running: ${test.name}`);
    try {
      const result = await test.fn();
      if (result) {
        console.log(`✅ ${test.name} - PASSED`);
        passed++;
      } else {
        console.log(`❌ ${test.name} - FAILED`);
        failed++;
      }
    } catch (error) {
      console.error(`💥 ${test.name} - ERROR:`, error);
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your Stripe-Plans integration is ready.');
  } else {
    console.log('\n⚠️ Some tests failed. Please review the errors above.');
  }
}

// Uncomment to run the tests
// runAllTests().catch(console.error);

export {
  validateDatabasePlans,
  testPlanSync,
  testSubscriptionIdSync,
  validateWebhookEventLogging,
  runAllTests
};