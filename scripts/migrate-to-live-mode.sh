#!/bin/bash

# Stripe Live Mode Migration Script
# This script creates Live Mode products and prices matching your test mode configuration

set -e  # Exit on any error
set -x  # Enable verbose mode - show each command as it runs

echo "🚀 STR Scout - Stripe Live Mode Migration Script"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    print_error "Stripe CLI is not installed. Please install it first:"
    echo "https://stripe.com/docs/stripe-cli"
    exit 1
fi

# Check if jq is installed (for JSON parsing)
if ! command -v jq &> /dev/null; then
    print_error "jq is not installed. Please install it first:"
    echo "macOS: brew install jq"
    echo "Ubuntu/Debian: sudo apt-get install jq"
    exit 1
fi

# Verify account
print_status "Verifying Stripe account..."
ACCOUNT_INFO=$(stripe get account 2>/dev/null)
if [ $? -ne 0 ]; then
    print_error "Not logged into Stripe CLI. Please run: stripe login"
    exit 1
fi

echo "Current account details:"
echo "$ACCOUNT_INFO" | head -10
echo ""

# Confirm this is the right account
read -p "Is this the correct Stripe account? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    print_error "Please login to the correct Stripe account with: stripe login"
    exit 1
fi

# Switch to Live Mode
print_status "Switching to Live Mode..."
stripe config --set live_mode true

# Confirm Live Mode
print_warning "⚠️  You are now in LIVE MODE ⚠️"
print_warning "This will create real products and prices that can charge customers."
read -p "Continue with Live Mode migration? (y/N): " confirm_live
if [[ $confirm_live != [yY] ]]; then
    print_error "Migration cancelled."
    stripe config --set live_mode false
    exit 1
fi

# Create main product
print_status "Creating STR Scout Pro Plan product..."
echo "Running: stripe products create..."
PRODUCT_RESPONSE=$(stripe products create \
    --name "STR Scout Pro Plan" \
    --description "Market Spy and competitive analysis features for STR properties" \
    --type service \
    --url "https://strsage.com")

echo "Product creation response received, parsing ID..."
PRODUCT_ID=$(echo "$PRODUCT_RESPONSE" | jq -r '.id')

print_success "Created product: $PRODUCT_ID"

# Create subscription price (simple per-unit pricing - volume handled in app)
print_status "Creating subscription price..."
echo "Running: stripe prices create for subscription with product ID: $PRODUCT_ID"
echo "Note: Using per-unit pricing ($12/unit) - volume discounts handled in checkout quantity"
SUBSCRIPTION_PRICE_RESPONSE=$(stripe prices create \
    --product "$PRODUCT_ID" \
    --currency usd \
    --unit-amount 1200 \
    --recurring.interval month \
    --recurring.usage-type licensed)

echo "Subscription price creation response received, parsing ID..."
SUBSCRIPTION_PRICE_ID=$(echo "$SUBSCRIPTION_PRICE_RESPONSE" | jq -r '.id')

print_success "Created subscription price: $SUBSCRIPTION_PRICE_ID"

# Create one-time payment prices
print_status "Creating one-time payment prices..."

declare -a AMOUNTS=(3500 4500 5500 6500 7500 8800 10100 11400 12700 14000)
declare -a ONE_TIME_PRICES=()

for i in {1..10}; do
    amount=${AMOUNTS[$((i-1))]}

    print_status "Creating one-time price for $i listing(s) - \$$(printf "%.2f" $((amount))e-2)..."
    echo "Running: stripe prices create for $i listings with amount $amount cents"

    price_response=$(stripe prices create \
        --product "$PRODUCT_ID" \
        --currency usd \
        --unit-amount "$amount")

    echo "One-time price creation response received for $i listings, parsing ID..."
    price_id=$(echo "$price_response" | jq -r '.id')

    ONE_TIME_PRICES+=("$price_id")
    print_success "Created price for $i listing(s): $price_id"
done

# Create output file with environment variables
print_status "Generating environment variables..."

ENV_FILE="live-mode-env-vars.txt"
cat > "$ENV_FILE" << EOF
# STR Scout Live Mode Environment Variables
# Generated on $(date)
# Product ID: $PRODUCT_ID

# Stripe Live Mode Keys (replace with your actual keys from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Live Mode Price IDs
NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID=$SUBSCRIPTION_PRICE_ID
NEXT_PUBLIC_STRIPE_ONE_TIME_1_PRICE_ID=${ONE_TIME_PRICES[0]}
NEXT_PUBLIC_STRIPE_ONE_TIME_2_PRICE_ID=${ONE_TIME_PRICES[1]}
NEXT_PUBLIC_STRIPE_ONE_TIME_3_PRICE_ID=${ONE_TIME_PRICES[2]}
NEXT_PUBLIC_STRIPE_ONE_TIME_4_PRICE_ID=${ONE_TIME_PRICES[3]}
NEXT_PUBLIC_STRIPE_ONE_TIME_5_PRICE_ID=${ONE_TIME_PRICES[4]}
NEXT_PUBLIC_STRIPE_ONE_TIME_6_PRICE_ID=${ONE_TIME_PRICES[5]}
NEXT_PUBLIC_STRIPE_ONE_TIME_7_PRICE_ID=${ONE_TIME_PRICES[6]}
NEXT_PUBLIC_STRIPE_ONE_TIME_8_PRICE_ID=${ONE_TIME_PRICES[7]}
NEXT_PUBLIC_STRIPE_ONE_TIME_9_PRICE_ID=${ONE_TIME_PRICES[8]}
NEXT_PUBLIC_STRIPE_ONE_TIME_10_PRICE_ID=${ONE_TIME_PRICES[9]}
EOF

# Create JSON summary for reference
JSON_FILE="live-mode-products.json"
cat > "$JSON_FILE" << EOF
{
  "product_id": "$PRODUCT_ID",
  "subscription_price_id": "$SUBSCRIPTION_PRICE_ID",
  "one_time_prices": {
    "1_listing": "${ONE_TIME_PRICES[0]}",
    "2_listings": "${ONE_TIME_PRICES[1]}",
    "3_listings": "${ONE_TIME_PRICES[2]}",
    "4_listings": "${ONE_TIME_PRICES[3]}",
    "5_listings": "${ONE_TIME_PRICES[4]}",
    "6_listings": "${ONE_TIME_PRICES[5]}",
    "7_listings": "${ONE_TIME_PRICES[6]}",
    "8_listings": "${ONE_TIME_PRICES[7]}",
    "9_listings": "${ONE_TIME_PRICES[8]}",
    "10_listings": "${ONE_TIME_PRICES[9]}"
  },
  "pricing_structure": {
    "subscription_tiers": [
      {"listings": 1, "price_per_month": "$30.00"},
      {"listings": 2, "price_per_month": "$20.00"},
      {"listings": 3, "price_per_month": "$16.67"},
      {"listings": 4, "price_per_month": "$15.00"},
      {"listings": 5, "price_per_month": "$14.00"},
      {"listings": "6+", "price_per_month": "$12.00"}
    ],
    "one_time_prices": [
      {"listings": 1, "price": "$35.00"},
      {"listings": 2, "price": "$45.00"},
      {"listings": 3, "price": "$55.00"},
      {"listings": 4, "price": "$65.00"},
      {"listings": 5, "price": "$75.00"},
      {"listings": 6, "price": "$88.00"},
      {"listings": 7, "price": "$101.00"},
      {"listings": 8, "price": "$114.00"},
      {"listings": 9, "price": "$127.00"},
      {"listings": 10, "price": "$140.00"}
    ]
  },
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

print_success "✅ Migration completed successfully!"
echo ""
echo "📋 Summary:"
echo "  - Product created: $PRODUCT_ID"
echo "  - Subscription price: $SUBSCRIPTION_PRICE_ID"
echo "  - One-time prices: ${#ONE_TIME_PRICES[@]} created"
echo ""
echo "📄 Files created:"
echo "  - $ENV_FILE (environment variables)"
echo "  - $JSON_FILE (JSON summary)"
echo ""
print_warning "Next steps:"
echo "1. Get your Live Mode API keys from Stripe Dashboard:"
echo "   → Go to: https://dashboard.stripe.com/apikeys"
echo "   → Copy: Publishable key (pk_live_...)"
echo "   → Copy: Secret key (sk_live_...)"
echo ""
echo "2. Set up Live Mode webhook:"
echo "   → Go to: https://dashboard.stripe.com/webhooks"
echo "   → Add endpoint: https://yourdomain.com/api/stripe/webhook"
echo "   → Select events: checkout.session.completed, customer.subscription.*, invoice.payment_*"
echo "   → Copy: Signing secret (whsec_...)"
echo ""
echo "3. Update $ENV_FILE with your actual keys"
echo "4. Update your production environment variables"
echo "5. Deploy to production"
echo ""
print_warning "⚠️  Don't forget to switch back to test mode for development:"
echo "   stripe config --set live_mode false"

# Switch back to test mode for safety
stripe config --set live_mode false
print_success "Switched back to test mode for safety"