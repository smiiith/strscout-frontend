#!/usr/bin/env node

/**
 * Stripe Product and Pricing Setup Script
 * 
 * This script creates all necessary Stripe products, prices, and pricing tables
 * for the STR Scout application programmatically.
 * 
 * Usage:
 *   node scripts/setup-stripe-products.js
 * 
 * Environment variables required:
 *   STRIPE_SECRET_KEY - Your Stripe secret key
 */

const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configuration for your products and pricing
const PRODUCTS_CONFIG = {
  proPlan: {
    name: 'Pro Plan',
    description: 'STR Genius + Market Spy (2 listings per plan)',
    statement_descriptor: 'STR Pro Plan',
    pricing: {
      amount: 4900, // $49.00 in cents
      currency: 'usd',
      billing_period: 'month',
      min_quantity: 1,
      max_quantity: 10,
    }
  }
};

// Pricing table configuration
const PRICING_TABLE_CONFIG = {
  display_name: 'Pro Plan Pricing',
  livemode: process.env.NODE_ENV === 'production',
};

async function createProducts() {
  console.log('🚀 Setting up Stripe products and pricing...\n');

  try {
    // 1. Create Pro Plan Product
    console.log('📦 Creating Pro Plan product...');
    const proPlanProduct = await stripe.products.create({
      name: PRODUCTS_CONFIG.proPlan.name,
      description: PRODUCTS_CONFIG.proPlan.description,
      statement_descriptor: PRODUCTS_CONFIG.proPlan.statement_descriptor,
      expand: ['default_price'],
    });

    console.log(`✅ Pro Plan product created: ${proPlanProduct.id}`);

    // 2. Create Pro Plan Price
    console.log('💰 Creating Pro Plan pricing...');
    const proPlanPrice = await stripe.prices.create({
      product: proPlanProduct.id,
      unit_amount: PRODUCTS_CONFIG.proPlan.pricing.amount,
      currency: PRODUCTS_CONFIG.proPlan.pricing.currency,
      recurring: {
        interval: PRODUCTS_CONFIG.proPlan.pricing.billing_period,
      },
      metadata: {
        plan_key: 'pro',
        listings_per_plan: '2',
      },
    });

    console.log(`✅ Pro Plan price created: ${proPlanPrice.id}`);

    // 3. Create Pricing Table (Note: This may require manual setup in dashboard)
    console.log('📊 Note: Pricing table creation via API may require manual setup...');
    
    // For now, we'll skip automatic pricing table creation and provide manual instructions
    console.log('ℹ️  Please create pricing table manually in Stripe Dashboard:');
    console.log('   1. Go to Product catalog → Pricing tables');
    console.log('   2. Click "Create pricing table"');
    console.log(`   3. Add the Pro Plan price: ${proPlanPrice.id}`);
    console.log('   4. Enable quantity adjustments (min: 1, max: 10)');
    console.log('   5. Copy the pricing table ID for your app');
    
    // We'll use a placeholder for now
    const pricingTableId = 'MANUAL_SETUP_REQUIRED';

    // 4. Output configuration for your app
    console.log('\n🎉 Setup complete! Add these to your environment variables:\n');
    console.log(`NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=${proPlanPrice.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID=${pricingTableId}`);

    // 5. Output code snippets for your app
    console.log('\n📝 Add this to your plan sync configuration:\n');
    console.log(`// In utils/stripe/plan-sync.ts`);
    console.log(`const PRICE_TO_PLAN_MAP = {`);
    console.log(`  '${proPlanPrice.id}': 'pro',`);
    console.log(`  // Add other price IDs here`);
    console.log(`};`);

    console.log('\n📝 Add this to your database:\n');
    console.log(`-- SQL to add Pro Plan to your plans table`);
    console.log(`INSERT INTO plans (key, name, description, active) VALUES`);
    console.log(`('pro', 'Pro Plan', 'STR Genius + Market Spy (2 listings per plan)', true)`);
    console.log(`ON CONFLICT (key) DO UPDATE SET`);
    console.log(`  name = EXCLUDED.name,`);
    console.log(`  description = EXCLUDED.description,`);
    console.log(`  active = EXCLUDED.active;`);

    // 6. Save configuration to file
    const config = {
      products: {
        proPlan: {
          productId: proPlanProduct.id,
          priceId: proPlanPrice.id,
        }
      },
      pricingTable: {
        id: pricingTableId,
      },
      createdAt: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };

    const fs = require('fs');
    const path = require('path');
    
    fs.writeFileSync(
      path.join(__dirname, '..', 'stripe-config.json'),
      JSON.stringify(config, null, 2)
    );

    console.log('\n💾 Configuration saved to stripe-config.json');

  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      console.error('🔑 Please check your STRIPE_SECRET_KEY environment variable');
    }
    
    process.exit(1);
  }
}

async function listExistingProducts() {
  console.log('📋 Checking existing products...\n');
  
  try {
    const products = await stripe.products.list({ limit: 10 });
    const prices = await stripe.prices.list({ limit: 10 });

    console.log('Existing Products:');
    products.data.forEach(product => {
      console.log(`  - ${product.name} (${product.id})`);
    });

    console.log('\nExisting Prices:');
    prices.data.forEach(price => {
      console.log(`  - $${(price.unit_amount / 100).toFixed(2)}/${price.recurring?.interval || 'one-time'} (${price.id})`);
    });

    // Note: Pricing tables API might not be available in test mode
    console.log('\nNote: Pricing tables will be created during setup (API may not support listing in test mode)');
    console.log('\n');
  } catch (error) {
    console.error('Error listing existing products:', error.message);
  }
}

async function main() {
  // Check if we should list existing products
  if (process.argv.includes('--list')) {
    await listExistingProducts();
    return;
  }

  // Check for required environment variables
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY environment variable is required');
    console.error('   Add it to your .env file or run: export STRIPE_SECRET_KEY=sk_test_...');
    process.exit(1);
  }

  await createProducts();
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Usage: node scripts/setup-stripe-products.js [options]

Options:
  --list    List existing Stripe products, prices, and pricing tables
  --help    Show this help message

Environment Variables:
  STRIPE_SECRET_KEY    Your Stripe secret key (required)
  NODE_ENV            Set to 'production' for live mode pricing tables

Examples:
  node scripts/setup-stripe-products.js           # Create products and pricing
  node scripts/setup-stripe-products.js --list   # List existing products
  `);
  process.exit(0);
}

main().catch(console.error);