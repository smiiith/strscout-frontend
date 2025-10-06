#!/usr/bin/env node

/**
 * Stripe Live Mode Migration Script (API-based)
 * Creates Live Mode products and prices using Stripe SDK
 */

const readline = require('readline');
const fs = require('fs');

// Colors for console output
const colors = {
  red: '\033[0;31m',
  green: '\033[0;32m',
  yellow: '\033[1;33m',
  blue: '\033[0;34m',
  reset: '\033[0m'
};

function log(level, message) {
  const timestamp = new Date().toISOString();
  const prefix = `[${level.toUpperCase()}]`;
  console.log(`${colors[level] || ''}${prefix}${colors.reset} ${message}`);
}

async function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log('🚀 STR Scout - Stripe Live Mode Migration Script (API-based)');
  console.log('================================================================');

  // Get Live Mode secret key
  const secretKey = await askQuestion('\nEnter your Live Mode secret key (sk_live_...): ');

  if (!secretKey.startsWith('sk_live_')) {
    log('red', 'Error: Please provide a valid Live Mode secret key starting with sk_live_');
    process.exit(1);
  }

  // Initialize Stripe with Live Mode key
  const stripe = require('stripe')(secretKey);

  try {
    // Verify Live Mode connection
    log('blue', 'Verifying Live Mode connection...');
    const balance = await stripe.balance.retrieve();

    if (!balance.livemode) {
      log('red', 'Error: The provided key is not connecting to Live Mode');
      process.exit(1);
    }

    log('green', 'Successfully connected to Live Mode');

    // Get account info for confirmation
    const account = await stripe.accounts.retrieve();
    console.log(`\nAccount: ${account.display_name || account.email}`);
    console.log(`Country: ${account.country}`);
    console.log(`Business Type: ${account.business_type}`);

    const confirm = await askQuestion('\nIs this the correct account? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      log('red', 'Migration cancelled');
      process.exit(1);
    }

    log('yellow', '⚠️  You are about to create products and prices in LIVE MODE');
    log('yellow', 'This will create real products that can charge customers.');

    const confirmLive = await askQuestion('Continue with Live Mode migration? (y/N): ');
    if (confirmLive.toLowerCase() !== 'y') {
      log('red', 'Migration cancelled');
      process.exit(1);
    }

    // Create main product
    log('blue', 'Creating STR Scout Pro Plan product...');
    const product = await stripe.products.create({
      name: 'STR Scout Pro Plan',
      description: 'Market Spy and competitive analysis features for STR properties',
      type: 'service',
      url: 'https://strsage.com',
      metadata: {
        created_by: 'migration_script',
        version: '1.0'
      }
    });

    log('green', `Created product: ${product.id}`);

    // Create subscription price
    log('blue', 'Creating subscription price...');
    const subscriptionPrice = await stripe.prices.create({
      product: product.id,
      currency: 'usd',
      unit_amount: 1200, // $12.00 base rate
      recurring: {
        interval: 'month',
        usage_type: 'licensed'
      },
      metadata: {
        billing_type: 'subscription',
        base_rate: 'true'
      }
    });

    log('green', `Created subscription price: ${subscriptionPrice.id}`);

    // Create one-time payment prices
    log('blue', 'Creating one-time payment prices...');
    const amounts = [3500, 4500, 5500, 6500, 7500, 8800, 10100, 11400, 12700, 14000];
    const tiers = ['starter', 'growth', 'growth', 'pro', 'pro', 'portfolio', 'portfolio', 'portfolio', 'portfolio', 'portfolio'];
    const oneTimePrices = [];

    for (let i = 0; i < amounts.length; i++) {
      const listingCount = i + 1;
      const amount = amounts[i];
      const tier = tiers[i];

      log('blue', `Creating one-time price for ${listingCount} listing(s) - $${(amount / 100).toFixed(2)}...`);

      const price = await stripe.prices.create({
        product: product.id,
        currency: 'usd',
        unit_amount: amount,
        metadata: {
          listing_count: listingCount.toString(),
          billing_type: 'one_time',
          tier: tier
        }
      });

      oneTimePrices.push(price.id);
      log('green', `Created price for ${listingCount} listing(s): ${price.id}`);
    }

    // Generate environment variables file
    log('blue', 'Generating environment variables...');

    const envContent = `# STR Scout Live Mode Environment Variables
# Generated on ${new Date().toISOString()}
# Product ID: ${product.id}

# Stripe Live Mode Keys (replace YOUR_* placeholders with actual values)
STRIPE_SECRET_KEY=${secretKey}
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Live Mode Price IDs
NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID=${subscriptionPrice.id}
NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID=${oneTimePrices[0]}
NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID=${oneTimePrices[1]}
NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID=${oneTimePrices[2]}
NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID=${oneTimePrices[3]}
NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID=${oneTimePrices[4]}
NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID=${oneTimePrices[5]}
NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID=${oneTimePrices[6]}
NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID=${oneTimePrices[7]}
NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID=${oneTimePrices[8]}
NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID=${oneTimePrices[9]}
`;

    fs.writeFileSync('live-mode-env-vars.txt', envContent);

    // Generate JSON summary
    const jsonSummary = {
      product_id: product.id,
      subscription_price_id: subscriptionPrice.id,
      one_time_prices: {
        '1_listing': oneTimePrices[0],
        '2_listings': oneTimePrices[1],
        '3_listings': oneTimePrices[2],
        '4_listings': oneTimePrices[3],
        '5_listings': oneTimePrices[4],
        '6_listings': oneTimePrices[5],
        '7_listings': oneTimePrices[6],
        '8_listings': oneTimePrices[7],
        '9_listings': oneTimePrices[8],
        '10_listings': oneTimePrices[9]
      },
      pricing_structure: {
        subscription_base_rate: '$12.00/month per listing',
        one_time_prices: [
          { listings: 1, price: '$35.00' },
          { listings: 2, price: '$45.00' },
          { listings: 3, price: '$55.00' },
          { listings: 4, price: '$65.00' },
          { listings: 5, price: '$75.00' },
          { listings: 6, price: '$88.00' },
          { listings: 7, price: '$101.00' },
          { listings: 8, price: '$114.00' },
          { listings: 9, price: '$127.00' },
          { listings: 10, price: '$140.00' }
        ]
      },
      created_at: new Date().toISOString(),
      migration_notes: 'Subscription uses $12 base rate with volume discounts calculated in app'
    };

    fs.writeFileSync('live-mode-products.json', JSON.stringify(jsonSummary, null, 2));

    log('green', '✅ Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`  - Product created: ${product.id}`);
    console.log(`  - Subscription price: ${subscriptionPrice.id}`);
    console.log(`  - One-time prices: ${oneTimePrices.length} created`);
    console.log('\n📄 Files created:');
    console.log('  - live-mode-env-vars.txt (environment variables)');
    console.log('  - live-mode-products.json (JSON summary)');

    log('yellow', '\nNext steps:');
    console.log('1. Get your Live Mode publishable key from Stripe Dashboard');
    console.log('2. Set up your Live Mode webhook endpoint');
    console.log('3. Update live-mode-env-vars.txt with your publishable key and webhook secret');
    console.log('4. Update your production environment with these variables');
    console.log('5. Deploy to production');

  } catch (error) {
    log('red', `Error: ${error.message}`);
    if (error.type === 'StripeAuthenticationError') {
      log('red', 'Please check your API key and try again');
    }
    process.exit(1);
  }
}

// Check if stripe module is available
try {
  require('stripe');
} catch (error) {
  console.log('Installing stripe package...');
  require('child_process').execSync('npm install stripe', { stdio: 'inherit' });
}

main().catch(console.error);