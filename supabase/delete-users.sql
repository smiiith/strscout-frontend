-- This script will delete all records associated with a provided list of profile IDs
-- from the specified tables in the public schema.
-- It respects foreign key constraints by deleting data in the correct order.
-- Replace the placeholder profile IDs with the actual IDs you want to delete.
-- BE VERY CAREFUL WHEN RUNNING THIS SCRIPT, especially in non-development environments.

-- Create a temporary table to hold the profile IDs
CREATE TEMP TABLE ProfileIDsToDelete (profile_id uuid);

-- Insert the profile IDs into the temporary table
INSERT INTO ProfileIDsToDelete (profile_id) VALUES
('xxxx-xxxx-xxxx-xxxx-xxxxxxxxxx'),
('xxxx-xxxx-xxxx-xxxx-xxxxxxxxxx'),
('xxxx-xxxx-xxxx-xxxx-xxxxxxxxxx');
-- Add more INSERT statements as needed

SELECT * FROM ProfileIDsToDelete; -- Review the IDs in the temporary table

-- Delete data from tables with foreign key constraints referencing profiles.id
DELETE FROM public.plans_features_map
WHERE plan_id IN (SELECT id FROM public."plans" WHERE id IN (SELECT plan_id FROM public.profiles WHERE id IN (SELECT profile_id FROM ProfileIDsToDelete)));

DELETE FROM public.listings
WHERE profile_id IN (SELECT profile_id FROM ProfileIDsToDelete);

DELETE FROM public.listing_feedback_usage
WHERE profile_id IN (SELECT profile_id FROM ProfileIDsToDelete);

DELETE FROM public.properties
WHERE profile_id IN (SELECT profile_id FROM ProfileIDsToDelete);

DELETE FROM public.property_ratings
WHERE property_id IN (SELECT id FROM public.str_properties WHERE user_id IN (SELECT profile_id FROM ProfileIDsToDelete));

DELETE FROM public.scans
WHERE profile_id IN (SELECT profile_id FROM ProfileIDsToDelete);

DELETE FROM public.scan_mismatches
WHERE profile_id IN (SELECT profile_id FROM ProfileIDsToDelete);

DELETE FROM public.str_properties
WHERE user_id IN (SELECT profile_id FROM ProfileIDsToDelete);

-- Delete the profiles themselves
DELETE FROM public.profiles
WHERE id IN (SELECT profile_id FROM ProfileIDsToDelete);

-- Delete the same users from the supabase auth.users table
DELETE FROM auth.users
WHERE id IN (SELECT profile_id FROM ProfileIDsToDelete);

-- Consider deleting from llm_usage and features if related
-- DELETE FROM public.llm_usage
-- WHERE ... some_column ... IN (SELECT profile_id FROM ProfileIDsToDelete);
--
-- DELETE FROM public.features
-- WHERE ... some_column ... IN (SELECT profile_id FROM ProfileIDsToDelete);

-- Drop the temporary table
DROP TABLE IF EXISTS ProfileIDsToDelete;