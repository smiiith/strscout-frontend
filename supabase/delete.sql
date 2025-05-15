-- This script will delete all data from the specified tables in the public schema.
-- It respects foreign key constraints by deleting data in the correct order.
-- BE VERY CAREFUL WHEN RUNNING THIS SCRIPT ON A PRODUCTION DATABASE.

-- Delete data from tables with foreign key constraints first
DELETE FROM public.plans_features_map;
DELETE FROM public.listings;
DELETE FROM public.listing_feedback_usage;
DELETE FROM public.property_ratings;
DELETE FROM public.scans;
DELETE FROM public.scan_mismatches;
DELETE FROM public.str_properties;
DELETE FROM public.str_property_ratings;
DELETE FROM public.properties;
DELETE FROM public.profiles;

-- Then delete data from tables without foreign key constraints pointing to others in this list
DELETE FROM public.features;
DELETE FROM public.llm_usage;
DELETE FROM public."plans";

-- Optionally, you might want to reset sequences if you have any
-- ALTER SEQUENCE public.your_sequence_name RESTART WITH 1;

-- Consider using TRUNCATE TABLE for potentially faster deletion and automatic sequence reset
-- TRUNCATE TABLE public.plans_features_map CASCADE;
-- TRUNCATE TABLE public.listings CASCADE;
-- TRUNCATE TABLE public.listing_feedback_usage CASCADE;
-- TRUNCATE TABLE public.property_ratings CASCADE;
-- TRUNCATE TABLE public.scans CASCADE;
-- TRUNCATE TABLE public.scan_mismatches CASCADE;
-- TRUNCATE TABLE public.str_properties CASCADE;
-- TRUNCATE TABLE public.str_property_ratings CASCADE;
-- TRUNCATE TABLE public.properties CASCADE;
-- TRUNCATE TABLE public.profiles CASCADE;
-- TRUNCATE TABLE public.features CASCADE;
-- TRUNCATE TABLE public.llm_usage CASCADE;
-- TRUNCATE TABLE public."plans" CASCADE;