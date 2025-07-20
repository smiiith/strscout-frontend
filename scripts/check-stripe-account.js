#!/usr/bin/env node

/**
 * Check which Stripe account you're connected to
 */

const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkAccount() {
  try {
    console.log('🔍 Checking Stripe account information...\n');
    
    // Get account information
    const account = await stripe.accounts.retrieve();
    
    console.log('📊 Account Details:');
    console.log(`   Account ID: ${account.id}`);
    console.log(`   Business Name: ${account.business_profile?.name || 'Not set'}`);
    console.log(`   Email: ${account.email || 'Not set'}`);
    console.log(`   Country: ${account.country}`);
    console.log(`   Currency: ${account.default_currency}`);
    console.log(`   Type: ${account.type}`);
    
    if (account.business_profile?.url) {
      console.log(`   Website: ${account.business_profile.url}`);
    }
    
    console.log(`\n🔑 API Key Mode: ${process.env.STRIPE_SECRET_KEY.startsWith('sk_live_') ? 'LIVE' : 'TEST'}`);
    
    console.log('\n✅ This is the account that will be used for product creation.');
    
  } catch (error) {
    console.error('❌ Error checking account:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      console.error('🔑 Please check your STRIPE_SECRET_KEY in .env.local');
    }
  }
}

checkAccount();