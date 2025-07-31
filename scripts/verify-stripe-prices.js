const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const priceIds = {
  'Subscription': process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID,
  'One-time 1': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID,
  'One-time 2': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID,
  'One-time 3': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID,
  'One-time 4': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID,
  'One-time 5': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID,
  'One-time 6': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID,
  'One-time 7': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID,
  'One-time 8': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID,
  'One-time 9': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID,
  'One-time 10': process.env.NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID,
  'Pro Plan': process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
};

async function verifyPrices() {
  console.log('🔍 Verifying Stripe Price IDs...\n');
  
  for (const [name, priceId] of Object.entries(priceIds)) {
    if (!priceId) {
      console.log(`❌ ${name}: No price ID configured`);
      continue;
    }
    
    try {
      const price = await stripe.prices.retrieve(priceId);
      const status = price.active ? '✅ ACTIVE' : '❌ INACTIVE';
      const amount = price.unit_amount ? `$${price.unit_amount / 100}` : 'N/A';
      
      console.log(`${status} ${name}: ${priceId}`);
      console.log(`   Amount: ${amount} | Product: ${price.product} | Type: ${price.type}`);
      
      if (!price.active) {
        console.log(`   ⚠️  This price is INACTIVE and will cause checkout errors!`);
      }
      
    } catch (error) {
      console.log(`❌ ${name}: ${priceId}`);
      console.log(`   ERROR: ${error.message}`);
    }
    
    console.log('');
  }
}

verifyPrices().catch(console.error);