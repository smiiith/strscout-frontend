-- Add timing fields to comps_analysis table for market spy performance tracking
ALTER TABLE comps_analysis 
ADD COLUMN started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN execution_time_ms INTEGER,
ADD COLUMN phase1_time_ms INTEGER,
ADD COLUMN phase2_time_ms INTEGER;

-- Create index for performance queries
CREATE INDEX idx_comps_analysis_timing ON comps_analysis(started_at, execution_time_ms);

-- Add comments for documentation
COMMENT ON COLUMN comps_analysis.execution_time_ms IS 'Total execution time in milliseconds for market spy analysis';
COMMENT ON COLUMN comps_analysis.phase1_time_ms IS 'Time in milliseconds for analyzing top 3 comparable properties';
COMMENT ON COLUMN comps_analysis.phase2_time_ms IS 'Time in milliseconds for generating competitive advice';