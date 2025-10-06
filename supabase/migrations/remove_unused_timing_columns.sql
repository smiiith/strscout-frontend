-- Remove unused timing columns from comps_analysis table
-- These columns were added for market spy timing but are now tracked in market_spy_runs table

-- Drop the index first
DROP INDEX IF EXISTS idx_comps_analysis_timing;

-- Remove the timing columns
ALTER TABLE comps_analysis 
DROP COLUMN IF EXISTS started_at,
DROP COLUMN IF EXISTS completed_at,
DROP COLUMN IF EXISTS execution_time_ms,
DROP COLUMN IF EXISTS phase1_time_ms,
DROP COLUMN IF EXISTS phase2_time_ms;