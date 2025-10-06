#!/usr/bin/env node

/**
 * Stripe Sandbox to Live Mode Migration Script
 * Reads products and prices from sandbox and recreates them in Live Mode
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

async function getProductsAndPrices(stripe, environment) {
  log('blue', `Reading products and prices from ${environment}...`);

  // Get all products
  const products = await stripe.products.list({ limit: 100, active: true });

  const productData = [];

  for (const product of products.data) {
    log('blue', `Found product: ${product.name} (${product.id})`);

    // Get all prices for this product
    const prices = await stripe.prices.list({
      product: product.id,
      limit: 100,
      active: true
    });

    log('blue', `  → Found ${prices.data.length} prices`);

    productData.push({
      product: product,
      prices: prices.data
    });
  }

  return productData;
}

async function createProductsInLive(liveStripe, productData) {
  log('blue', 'Creating products and prices in Live Mode...');

  const createdProducts = [];

  for (const item of productData) {
    const originalProduct = item.product;
    const originalPrices = item.prices;

    log('blue', `Creating product: ${originalProduct.name}`);

    // Create product in Live Mode
    const productData = {
      name: originalProduct.name,
      description: originalProduct.description,
      type: originalProduct.type,
      images: originalProduct.images,
      metadata: {
        ...originalProduct.metadata,
        migrated_from: originalProduct.id,
        migration_date: new Date().toISOString()
      }
    };

    // Only add URL if it's not empty
    if (originalProduct.url && originalProduct.url.trim() !== '') {
      productData.url = originalProduct.url;
    }

    const newProduct = await liveStripe.products.create(productData);

    log('green', `Created product: ${newProduct.id}`);

    const createdPrices = [];

    // Create all prices for this product
    for (const originalPrice of originalPrices) {
      let unitAmount = originalPrice.unit_amount;

      // Fix invalid unit_amount - if it's a Pro Plan subscription, use $30
      if (!originalPrice.unit_amount || originalPrice.unit_amount <= 0) {
        if (originalPrice.recurring && originalProduct.name.toLowerCase().includes('pro')) {
          unitAmount = 3000; // $30.00 for Pro Plan subscription
          log('yellow', `  Fixed invalid unit_amount for Pro Plan subscription: ${originalPrice.id} -> $30.00`);
        } else {
          log('yellow', `  Skipping price with invalid unit_amount: ${originalPrice.id}`);
          continue;
        }
      }

      log('blue', `  Creating price: $${(unitAmount / 100).toFixed(2)}${originalPrice.recurring ? '/' + originalPrice.recurring.interval : ''}`);

      const priceData = {
        product: newProduct.id,
        currency: originalPrice.currency,
        unit_amount: unitAmount,
        metadata: {
          ...originalPrice.metadata,
          migrated_from: originalPrice.id,
          migration_date: new Date().toISOString()
        }
      };

      // For Pro Plan subscriptions with invalid data, create a simple subscription
      if (!originalPrice.unit_amount && originalPrice.recurring && originalProduct.name.toLowerCase().includes('pro')) {
        priceData.recurring = {
          interval: 'month',
          usage_type: 'licensed'
        };
        // Skip copying the broken tiered/billing scheme for Pro Plan
      } else {
        // Add recurring data if it exists
        if (originalPrice.recurring) {
          priceData.recurring = {
            interval: originalPrice.recurring.interval,
            interval_count: originalPrice.recurring.interval_count,
            usage_type: originalPrice.recurring.usage_type
          };

          if (originalPrice.recurring.trial_period_days) {
            priceData.recurring.trial_period_days = originalPrice.recurring.trial_period_days;
          }
        }

        // Add tiered pricing if it exists and is valid
        if (originalPrice.billing_scheme === 'tiered' && originalPrice.tiers && originalPrice.tiers.length > 0) {
          priceData.billing_scheme = 'tiered';
          priceData.tiers_mode = originalPrice.tiers_mode;
          priceData.tiers = originalPrice.tiers;
        }
      }

      const newPrice = await liveStripe.prices.create(priceData);
      createdPrices.push(newPrice);

      log('green', `  Created price: ${newPrice.id}`);
    }

    createdProducts.push({
      originalProduct,
      newProduct,
      originalPrices,
      createdPrices
    });
  }

  return createdProducts;
}

function generateEnvironmentFile(createdProducts) {
  log('blue', 'Generating environment variables...');

  let envContent = `# STR Scout Live Mode Environment Variables
# Migrated from Host Innovations Sandbox on ${new Date().toISOString()}

# Stripe Live Mode Keys (replace YOUR_* placeholders with actual values)
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Products and Prices Map
`;

  const priceMap = {};
  let subscriptionPriceId = null;
  const oneTimePrices = [];

  for (const item of createdProducts) {
    envContent += `\n# ${item.newProduct.name} (${item.newProduct.id})\n`;

    for (const price of item.createdPrices) {
      const amount = price.unit_amount / 100;
      const description = price.recurring
        ? `$${amount}/${price.recurring.interval} subscription`
        : `$${amount} one-time`;

      envContent += `# ${description} - ${price.id}\n`;

      // Try to map to expected environment variable names
      if (price.recurring) {
        subscriptionPriceId = price.id;
      } else {
        // For one-time prices, try to determine which listing count this represents
        const metadata = price.metadata;
        if (metadata && metadata.listing_count) {
          oneTimePrices[parseInt(metadata.listing_count) - 1] = price.id;
        } else {
          // Guess based on amount
          const priceMapping = {
            3500: 1, 4500: 2, 5500: 3, 6500: 4, 7500: 5,
            8800: 6, 10100: 7, 11400: 8, 12700: 9, 14000: 10
          };
          const listingCount = priceMapping[price.unit_amount];
          if (listingCount) {
            oneTimePrices[listingCount - 1] = price.id;
          }
        }
      }
    }
  }

  // Add the expected environment variable format
  envContent += `\n# Environment Variables for STR Scout Application\n`;

  if (subscriptionPriceId) {
    envContent += `NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID=${subscriptionPriceId}\n`;
  }

  for (let i = 0; i < oneTimePrices.length; i++) {
    if (oneTimePrices[i]) {
      envContent += `NEXT_PUBLIC_STRIPE_ONE_TIME_${i + 1}_PRICE_ID=${oneTimePrices[i]}\n`;
    }
  }

  return envContent;
}

async function main() {
  console.log('🚀 STR Scout - Sandbox to Live Mode Migration Script');
  console.log('===================================================');

  try {
    // Check if stripe module is available
    let stripe;
    try {
      stripe = require('stripe');
    } catch (error) {
      log('blue', 'Installing stripe package...');
      require('child_process').execSync('npm install stripe', { stdio: 'inherit' });
      stripe = require('stripe');
    }

    // Get sandbox (source) key
    const sandboxKey = await askQuestion('\nEnter your Host Innovations SANDBOX key (sk_test_51R...YQglAj): ');

    if (!sandboxKey.startsWith('sk_test_')) {
      log('red', 'Error: Please provide a valid test/sandbox key starting with sk_test_');
      process.exit(1);
    }

    // Get Live Mode (destination) key
    const liveKey = await askQuestion('Enter your Live Mode secret key (sk_live_...): ');

    if (!liveKey.startsWith('sk_live_')) {
      log('red', 'Error: Please provide a valid Live Mode secret key starting with sk_live_');
      process.exit(1);
    }

    // Initialize Stripe clients
    const sandboxStripe = stripe(sandboxKey);
    const liveStripe = stripe(liveKey);

    // Verify connections
    log('blue', 'Verifying sandbox connection...');
    const sandboxAccount = await sandboxStripe.accounts.retrieve();
    log('green', `Connected to sandbox: ${sandboxAccount.display_name || sandboxAccount.email}`);

    log('blue', 'Verifying Live Mode connection...');
    const liveAccount = await liveStripe.accounts.retrieve();
    const liveBalance = await liveStripe.balance.retrieve();

    if (!liveBalance.livemode) {
      log('red', 'Error: The Live Mode key is not connecting to Live Mode');
      process.exit(1);
    }

    log('green', `Connected to Live Mode: ${liveAccount.display_name || liveAccount.email}`);

    // Check for existing products in Live Mode
    const existingProducts = await liveStripe.products.list({ limit: 100, active: true });

    if (existingProducts.data.length > 0) {
      log('yellow', `Found ${existingProducts.data.length} existing products in Live Mode:`);
      for (const product of existingProducts.data) {
        console.log(`  - ${product.name} (${product.id})`);
      }

      const cleanup = await askQuestion('\nArchive existing products before migration? (y/N): ');
      if (cleanup.toLowerCase() === 'y') {
        log('blue', 'Archiving existing products and prices...');

        for (const product of existingProducts.data) {
          log('blue', `Processing product: ${product.name} (${product.id})`);

          // First, get all prices for this product
          const prices = await liveStripe.prices.list({
            product: product.id,
            limit: 100
          });

          // Deactivate all prices first
          for (const price of prices.data) {
            if (price.active) {
              log('blue', `  Deactivating price: $${(price.unit_amount / 100).toFixed(2)} (${price.id})`);
              await liveStripe.prices.update(price.id, { active: false });
              log('green', `  Deactivated price: ${price.id}`);
            }
          }

          // Archive the product (Stripe doesn't allow deletion of products with prices)
          log('blue', `  Archiving product: ${product.name}`);
          await liveStripe.products.update(product.id, { active: false });
          log('green', `  Archived product: ${product.name}`);
        }

        log('green', 'Cleanup completed');
      }
    }

    // Show account info for confirmation
    console.log(`\nMigration Plan:`);
    console.log(`FROM: ${sandboxAccount.display_name || sandboxAccount.email} (Sandbox)`);
    console.log(`TO: ${liveAccount.display_name || liveAccount.email} (Live Mode)`);

    const confirm = await askQuestion('\nProceed with migration? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      log('red', 'Migration cancelled');
      process.exit(1);
    }

    // Read products and prices from sandbox
    const productData = await getProductsAndPrices(sandboxStripe, 'Host Innovations Sandbox');

    if (productData.length === 0) {
      log('red', 'No products found in sandbox environment');
      process.exit(1);
    }

    log('blue', `Found ${productData.length} products to migrate`);

    log('yellow', '⚠️  About to create products in LIVE MODE');
    const confirmLive = await askQuestion('Continue creating in Live Mode? (y/N): ');
    if (confirmLive.toLowerCase() !== 'y') {
      log('red', 'Migration cancelled');
      process.exit(1);
    }

    // Create products in Live Mode
    const createdProducts = await createProductsInLive(liveStripe, productData);

    // Generate environment file
    const envContent = generateEnvironmentFile(createdProducts);
    fs.writeFileSync('live-mode-env-vars.txt', envContent);

    // Generate JSON summary
    const jsonSummary = {
      migration_date: new Date().toISOString(),
      source: 'Host Innovations Sandbox',
      destination: 'Live Mode',
      products_migrated: createdProducts.map(item => ({
        original_product: {
          id: item.originalProduct.id,
          name: item.originalProduct.name
        },
        new_product: {
          id: item.newProduct.id,
          name: item.newProduct.name
        },
        prices_migrated: item.createdPrices.length
      }))
    };

    fs.writeFileSync('migration-summary.json', JSON.stringify(jsonSummary, null, 2));

    log('green', '✅ Migration completed successfully!');
    console.log('\n📋 Summary:');

    for (const item of createdProducts) {
      console.log(`  - ${item.newProduct.name}: ${item.createdPrices.length} prices`);
    }

    console.log('\n📄 Files created:');
    console.log('  - live-mode-env-vars.txt (environment variables)');
    console.log('  - migration-summary.json (migration details)');

    log('yellow', '\nNext steps:');
    console.log('1. Get your Live Mode publishable key from Stripe Dashboard');
    console.log('2. Set up your Live Mode webhook endpoint');
    console.log('3. Update live-mode-env-vars.txt with your publishable key and webhook secret');
    console.log('4. Update your production environment with these variables');

  } catch (error) {
    log('red', `Error: ${error.message}`);
    if (error.type === 'StripeAuthenticationError') {
      log('red', 'Please check your API keys and try again');
    }
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);