# Production Migration Guide

## Overview

This document outlines the process for migrating the database schema from development to production for the STR Scout application. The migration adds the new pricing model features and Market Spy functionality.

## Migration Files

- **`production-migration-safer.sql`** - The tested and ready migration script
- **`prod-schema.sql`** - Production database schema (before migration)
- **`dev-schema.sql`** - Development database schema (target state)
- **`database-migration.sql`** - Original migration script (obsolete - don't use)

## What the Migration Does

### New Tables Added (6 tables)
- `comp_basis` - Market spy basis properties for comparison analysis
- `comps` - Comparable properties data with occupancy metrics
- `comps_analysis` - Market spy analysis results and summaries
- `market_spy_runs` - Track market spy operation runs and performance
- `stripe_events` - Stripe webhook event tracking for audit trail
- `stripe_price_mappings` - Maps Stripe prices to internal pricing structure

### New Columns Added to `profiles` (18 columns)
- **Stripe Integration**: `stripe_customer_id`, `stripe_subscription_id`, `subscription_status`
- **Volume Pricing**: `subscription_quantity`, `billing_type`, `current_tier`, `listings_purchased`
- **Market Spy Limits**: `market_spy_listings_limit`, `market_spy_listings_used`
- **Billing Periods**: `current_period_start`, `current_period_end`, `purchase_date`
- **Contact Info**: `primary_email`, `secondary_email`, `primary_phone`, `secondary_phone`
- **Preferences**: `notification_preference`
- **Plan Reference**: `plan_id`

### New Columns Added to `str_properties` (10 columns)
- **Scraping Data**: `bedrooms`, `pets`, `instant_book`, `cancellation_policy`
- **Metrics**: `review_count`, `average_rating`, `policies`
- **Relationships**: `is_comp`, `comp_id`
- **Tracking**: `updated_at`

## Migration Testing Results

**Successfully tested on 2025-09-28:**
- ✅ **Before Migration**: 13 tables, 6 columns in profiles, 21 user records
- ✅ **After Migration**: 19 tables, 24 columns in profiles, 21 user records preserved
- ✅ **Data Integrity**: All existing data preserved
- ✅ **PostgreSQL 15 Compatible**: Uses safe syntax with existence checks

## Testing Migration Locally with Docker

### Prerequisites for Testing
1. Docker installed and running (or Colima for macOS)
2. Production database password
3. PostgreSQL client tools (`psql`, `pg_dump`)

### Step-by-Step Testing Process

#### 1. Start Test PostgreSQL Container
```bash
# Start a PostgreSQL 15 container for testing
docker run --name test-postgres -e POSTGRES_PASSWORD=test123 -p 5433:5432 -d postgres:15

# Wait for container to start
sleep 10

# Verify it's running
docker ps | grep postgres
```

#### 2. Create Test Database
```bash
# Create the test database inside the container
docker exec test-postgres createdb -U postgres test_migration_strsage

# Verify database was created
docker exec test-postgres psql -U postgres -l
```

#### 3. Import Production Data
```bash
# Dump production data to local file
pg_dump "postgres://postgres.eklefalzcpfrnsmzrlbn:PROD_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres?sslmode=require" > prod-full-backup.sql

# Load production data into test container (expect some Supabase-specific errors - this is normal)
docker exec -i test-postgres psql -U postgres -d test_migration_strsage < prod-full-backup.sql
```

#### 4. Verify Base Data Import
```bash
# Check what tables were imported
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"

# Check profiles data
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT COUNT(*) as profile_count FROM profiles;"

# Check current profiles columns
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles' AND table_schema = 'public' ORDER BY ordinal_position;"
```

#### 5. Test Migration Script
```bash
# Apply the migration to test database
docker exec -i test-postgres psql -U postgres -d test_migration_strsage < production-migration-safer.sql

# Check if migration succeeded (no errors should appear)
echo $?  # Should return 0 for success
```

#### 6. Verify Migration Results
```bash
# Check total tables (should be 19)
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = 'public';"

# Check profiles columns (should be 24)
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles' AND table_schema = 'public' ORDER BY ordinal_position;"

# Verify data integrity (same user count)
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT COUNT(*) as profile_count FROM profiles;"

# List all tables to verify new ones were created
docker exec test-postgres psql -U postgres -d test_migration_strsage -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
```

### Expected Results
- **Before Migration**: 13 tables, 6 columns in profiles
- **After Migration**: 19 tables, 24 columns in profiles
- **New Tables**: comp_basis, comps, comps_analysis, market_spy_runs, stripe_events, stripe_price_mappings
- **Data Preserved**: All existing user data should remain intact

### Cleanup Docker Test Environment
```bash
# Stop and remove the test container
docker stop test-postgres
docker rm test-postgres

# Remove the test backup file (optional)
rm prod-full-backup.sql

# Verify cleanup
docker ps -a | grep test-postgres  # Should return nothing
```

### Troubleshooting Docker Testing
- **Connection errors**: Make sure Docker/Colima is running
- **Permission errors**: Try with `sudo` if needed
- **Port conflicts**: Change `-p 5433:5432` to a different port if 5433 is in use
- **Supabase-specific errors during import**: These are expected (missing extensions/roles) and don't affect the core table structure

## How to Apply to Production

### Prerequisites
1. Have production database password ready
2. Create a backup before running (recommended)
3. Ensure you have access to production Supabase database
4. **Recommended**: Test with Docker first (see above section)

### Backup Production (Recommended)
```bash
# Create a backup before migration
pg_dump "postgres://postgres.eklefalzcpfrnsmzrlbn:PROD_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres?sslmode=require" > prod-backup-$(date +%Y%m%d-%H%M%S).sql
```

### Apply Migration
```bash
# Apply the migration to production
psql "postgres://postgres.eklefalzcpfrnsmzrlbn:PROD_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres?sslmode=require" < production-migration-safer.sql
```

### Verification Queries
After migration, run these to verify success:
```sql
-- Check total tables (should be 19)
SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = 'public';

-- Check profiles columns (should be 24)
SELECT COUNT(*) as profile_columns FROM information_schema.columns WHERE table_name = 'profiles' AND table_schema = 'public';

-- Verify data integrity
SELECT COUNT(*) as user_count FROM profiles;

-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
```

## Safety Features

The migration script includes several safety features:
- **Transactional**: Wrapped in `BEGIN/COMMIT` - rolls back on any error
- **Idempotent**: Uses `IF NOT EXISTS` checks - safe to run multiple times
- **Non-destructive**: Only adds new tables/columns, never removes data
- **Existence Checks**: Verifies columns exist before creating indexes/constraints
- **PostgreSQL 15 Compatible**: Uses `DO` blocks instead of unsupported `IF NOT EXISTS` for constraints

## Rollback Plan

If issues occur after migration, you can:
1. **Restore from backup**: Use the backup created before migration
2. **Manual rollback**: The migration only adds new tables/columns, so existing functionality should continue working even if new features have issues

## Post-Migration Steps

After successful migration:
1. Update your production environment variables if needed
2. Deploy the latest frontend/backend code that uses the new schema
3. Test key user flows (registration, billing, market spy)
4. Monitor for any issues in production logs

## Notes

- The original `database-migration.sql` file is obsolete and should not be used
- This migration brings production in sync with the development environment as of 2025-09-28
- The migration supports the new volume-based pricing model and Market Spy functionality
- All Stripe integration features will be available after migration

## Contact

If you encounter issues during migration, refer to:
- `CLAUDE.md` files in the project for development guidance
- Supabase dashboard for database monitoring
- Application logs for post-migration verification