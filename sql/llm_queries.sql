  SELECT
    SUM(cost::numeric) as total_cost_dollars,
    TO_CHAR(SUM(cost::numeric), 'FM$999,999,990.00') as formatted_cost
  FROM
    public.llm_usage
  WHERE
    created_at >= '2025-01-01'  -- start date
    AND created_at < '2025-02-01';  -- end date

--   More Useful Queries:

--   1. Total Cost by LLM Model
  SELECT
    llm_name,
    COUNT(*) as request_count,
    SUM(cost::numeric) as total_cost,
    AVG(cost::numeric) as avg_cost_per_request,
    SUM(total_tokens) as total_tokens
  FROM
    public.llm_usage
  WHERE
    created_at >= NOW() - INTERVAL '30 days'
  GROUP BY
    llm_name
  ORDER BY
    total_cost DESC;

--   2. Daily Cost Breakdown
  SELECT
    DATE(created_at) as date,
    COUNT(*) as requests,
    SUM(cost::numeric) as daily_cost,
    TO_CHAR(SUM(cost::numeric), 'FM$999,990.00') as formatted_cost
  FROM
    public.llm_usage
  WHERE
    created_at >= NOW() - INTERVAL '30 days'
  GROUP BY
    DATE(created_at)
  ORDER BY
    date DESC;

--   3. Cost by Run ID (for tracking specific operations)
  SELECT
    run_id,
    name,
    COUNT(*) as llm_calls,
    SUM(cost::numeric) as run_cost,
    SUM(total_tokens) as total_tokens,
    MIN(created_at) as started_at,
    MAX(created_at) as completed_at
  FROM
    public.llm_usage
  WHERE
    created_at >= NOW() - INTERVAL '7 days'
    AND run_id IS NOT NULL
  GROUP BY
    run_id, name
  ORDER BY
    run_cost DESC
  LIMIT 20;

--   4. Month-to-Date Summary

  SELECT
    TO_CHAR(SUM(cost::numeric), 'FM$999,990.00') as mtd_cost,
    COUNT(*) as total_requests,
    SUM(total_tokens) as total_tokens,
    AVG(cost::numeric) as avg_cost_per_request
  FROM
    public.llm_usage
  WHERE
    created_at >= DATE_TRUNC('month', NOW());

--   Performance Tips:

--   Add an Index on created_at

--   CREATE INDEX idx_llm_usage_created_at ON public.llm_usage(created_at);

--   Consider Changing cost Column Type

--   Since you're doing numeric operations, consider converting to numeric:

  -- First, verify all costs can be converted
  SELECT cost
  FROM public.llm_usage
  WHERE cost IS NOT NULL
    AND cost !~ '^[0-9]*\.?[0-9]+$'
  LIMIT 10;

  -- If clean, alter the column type
  ALTER TABLE public.llm_usage
  ALTER COLUMN cost TYPE numeric USING cost::numeric;

-- total cost per run
SELECT
    run_id,
    COUNT(*) as llm_calls,
    SUM(cost::numeric) as run_total_cost,
    TO_CHAR(SUM(cost::numeric), 'FM$990.0000') as formatted_cost,
    SUM(total_tokens) as total_tokens_used,
    SUM(prompt_tokens) as total_prompt_tokens,
    SUM(completion_tokens) as total_completion_tokens,
    MIN(created_at) as run_started_at,
    MAX(created_at) as run_completed_at,
    MAX(created_at) - MIN(created_at) as run_duration,
    STRING_AGG(DISTINCT name, ', ' ORDER BY name) as analysis_types
FROM
    public.llm_usage
WHERE
    created_at >= NOW() - INTERVAL '30 days'
    AND run_id IS NOT NULL
GROUP BY
    run_id
ORDER BY
    run_total_cost DESC;


--   If You Want to See the Breakdown Per Analysis Type Too:
SELECT
    run_id,
    COUNT(*) as total_llm_calls,
    TO_CHAR(SUM(cost::numeric), 'FM$990.0000') as total_cost,
    -- Show cost per analysis type
    TO_CHAR(SUM(CASE WHEN name = 'tier' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as tier_cost,
    TO_CHAR(SUM(CASE WHEN name = 'hero image' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as hero_image_cost,
    TO_CHAR(SUM(CASE WHEN name = 'title' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as title_cost,
    TO_CHAR(SUM(CASE WHEN name = 'description' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as description_cost,
    TO_CHAR(SUM(CASE WHEN name = 'amenities' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as amenities_cost,
    TO_CHAR(SUM(CASE WHEN name = 'other images' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as other_images_cost,
    TO_CHAR(SUM(CASE WHEN name = 'interior design' THEN cost::numeric ELSE 0 END), 'FM$990.0000') as interior_design_cost,
    MIN(created_at) as run_started_at
FROM
    public.llm_usage
WHERE
    created_at >= NOW() - INTERVAL '30 days'
    AND run_id IS NOT NULL
GROUP BY
    run_id
ORDER BY
    SUM(cost::numeric) DESC;
