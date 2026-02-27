-- ============================================================
-- DELETE ALL USERS AND USER DATA (Dev environment only)
-- Preserves: plans, features, plans_features_map,
--            stripe_price_mappings, stripe_events, llm_usage,
--            contact_form_submissions
-- ============================================================

-- 1. Leaf tables that reference str_properties and/or profiles
DELETE FROM public.str_property_ratings;
DELETE FROM public.property_ratings;
DELETE FROM public.listing_feedback_usage;
DELETE FROM public.comps_analysis;
DELETE FROM public.feedback_genius_runs;
DELETE FROM public.anonymous_feedback_reports;

-- 2. str_properties (has FK to comps via comp_id)
DELETE FROM public.str_properties;

-- 3. comps (has FK to comp_basis)
DELETE FROM public.comps;

-- 4. comp_basis
DELETE FROM public.comp_basis;

-- 5. Market run tables
DELETE FROM public.market_spy_runs;
DELETE FROM public.market_scout_runs;

-- 6. Legacy calendar sync tables (dependency order)
DELETE FROM public.scan_mismatches;
DELETE FROM public.scans;
DELETE FROM public.listings;
DELETE FROM public.properties;

-- 7. Anonymous / conversion tracking (no FK constraints)
DELETE FROM public.pending_conversions;
DELETE FROM public.anonymous_usage;

-- 8. Exit survey responses (FK to auth.users is ON DELETE SET NULL,
--    but delete explicitly since it's user data)
DELETE FROM public.exit_survey_responses;

-- 9. Profiles (FK to auth.users and plans)
DELETE FROM public.profiles;

-- 10. Auth users — deletes the Supabase auth accounts
DELETE FROM auth.users;
