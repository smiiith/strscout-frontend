-- Delete Users and Associated Data Script
-- Usage: Replace the user IDs in the VALUES clause below with the actual user IDs you want to delete
-- 
-- Example:
-- WITH users_to_delete AS (
--   VALUES 
--     ('user-id-1'::uuid),
--     ('user-id-2'::uuid),
--     ('user-id-3'::uuid)
-- )

-- WARNING: This will permanently delete users and ALL their associated data
-- Make sure to backup your database before running this script


DO $$
DECLARE
    deleted_count INTEGER := 0;
    target_user_id UUID;
    rec RECORD;
    comp_property_ids UUID[];
BEGIN
    -- Define users to delete here
    FOR target_user_id IN
        WITH users_to_delete AS (
            VALUES
('d2bbecea-e946-4c47-8871-7bf19e1736f1'::uuid),
('1e0fcd25-9a78-45a8-bab3-c17898af27b4'::uuid),
('053237f8-9535-4c6d-b0c7-290a17b00c5f'::uuid),
('460e67c7-09c7-4b9f-93ca-b4a257e491fc'::uuid),
('9506b3e4-e836-476b-9c4e-96ddb0b7ecc2'::uuid),
('990c186f-ea35-4c4d-a4c0-48948d8832c7'::uuid),
('ae92eead-3e8e-4ef9-8117-da52c5c2b98d'::uuid),
('099e3c4f-ca47-4a5c-b4ea-9e1a93762c33'::uuid),
('cd7a4b12-6477-4a58-8875-2ab3018e66fa'::uuid),
('76e44862-f5f3-4619-b8fc-c4ade4434467'::uuid),
('9ed068cf-4745-4482-a276-828a7fdd60ca'::uuid),
('7f3b4a40-16af-41a5-be06-db4075a493c4'::uuid),
('8fd76758-0577-4492-a270-7e8b9774429f'::uuid),
('22f48190-763b-4644-8d40-4e31aae429e5'::uuid),
('07ab484c-b3e1-42b3-ab39-4d2422bf2526'::uuid),
('a823b11d-436e-4d70-9219-50d9ac6589a9'::uuid),
('f4307620-db5f-4d50-b661-119082122ce0'::uuid)
                -- Add more user IDs as needed (comma-separated)
        )
        SELECT column1 FROM users_to_delete
    LOOP
        RAISE NOTICE 'Deleting user and associated data for user_id: %', target_user_id;

        -- Collect IDs of comp properties associated with this user BEFORE clearing references
        SELECT ARRAY_AGG(DISTINCT comp_id) INTO comp_property_ids
        FROM str_properties
        WHERE comp_id IN (
            SELECT id FROM comps WHERE profile_id = target_user_id
        );
        
        -- Delete from tables with foreign key references to profiles
        -- Order matters due to foreign key constraints
        
        -- Delete LLM usage records (no FK constraint but user-related)
        -- Cast scan_id to text since run_id is text type
        DELETE FROM llm_usage WHERE run_id IN (
            SELECT scan_id::text FROM comp_basis WHERE profile_id = target_user_id
        );

        -- Delete LLM usage for user's market spy runs
        -- Cast id to text since run_id is text type
        DELETE FROM llm_usage WHERE run_id IN (
            SELECT id::text FROM market_spy_runs WHERE profile_id = target_user_id
        );

        -- Note: stripe_events doesn't have profile_id column, stores data in JSON

        -- Delete market spy runs
        DELETE FROM market_spy_runs WHERE profile_id = target_user_id;
        
        -- Delete listing feedback usage (by profile_id and property_id)
        DELETE FROM listing_feedback_usage WHERE profile_id = target_user_id;
        DELETE FROM listing_feedback_usage WHERE property_id IN (
            SELECT id FROM str_properties WHERE user_id = target_user_id
        );
        
        -- Clear comp_id references in str_properties first (to avoid FK constraint violations)
        UPDATE str_properties SET comp_id = NULL WHERE comp_id IN (
            SELECT id FROM comps WHERE profile_id = target_user_id
        );
        
        -- Delete comparisons analysis
        DELETE FROM comps_analysis WHERE profile_id = target_user_id;
        
        -- Debug: Check what comps records exist for this user
        RAISE NOTICE 'Comps records for user %:', target_user_id;
        FOR rec IN SELECT id, profile_id, scan_id FROM comps WHERE profile_id = target_user_id LOOP
            RAISE NOTICE '  Comp ID: %, Profile ID: %, Scan ID: %', rec.id, rec.profile_id, rec.scan_id;
        END LOOP;
        
        -- Delete comparable properties data comprehensively
        DELETE FROM comps WHERE profile_id = target_user_id;
        
        -- Also delete any comps that reference scan_ids from this user's comp_basis
        DELETE FROM comps WHERE scan_id IN (
            SELECT scan_id FROM comp_basis WHERE profile_id = target_user_id
        );
        
        -- Delete comparison basis records
        DELETE FROM comp_basis WHERE profile_id = target_user_id;
        
        -- Delete property ratings for user's properties AND their comp properties
        DELETE FROM property_ratings WHERE property_id IN (
            SELECT id FROM str_properties WHERE user_id = target_user_id
        );

        -- Delete property ratings for comp properties (those with NULL or different user_id)
        IF comp_property_ids IS NOT NULL THEN
            DELETE FROM property_ratings WHERE property_id = ANY(comp_property_ids);
        END IF;

        -- Delete STR property ratings for user's properties
        DELETE FROM str_property_ratings WHERE property_id IN (
            SELECT id FROM str_properties WHERE user_id = target_user_id
        );

        -- Delete STR property ratings for comp properties
        IF comp_property_ids IS NOT NULL THEN
            DELETE FROM str_property_ratings WHERE property_id = ANY(comp_property_ids);
        END IF;

        -- Delete listing feedback usage for comp properties
        IF comp_property_ids IS NOT NULL THEN
            DELETE FROM listing_feedback_usage WHERE property_id = ANY(comp_property_ids);
        END IF;

        -- Delete STR properties owned by user
        DELETE FROM str_properties WHERE user_id = target_user_id;

        -- Delete comp properties (those scraped for this user's market spy analysis)
        IF comp_property_ids IS NOT NULL THEN
            DELETE FROM str_properties WHERE id = ANY(comp_property_ids);
        END IF;
        
        -- Delete scan mismatches for user's properties
        DELETE FROM scan_mismatches WHERE profile_id = target_user_id;
        
        -- Delete scans for user's properties
        DELETE FROM scans WHERE profile_id = target_user_id;
        
        -- Delete listings for user's properties
        DELETE FROM listings WHERE profile_id = target_user_id;
        
        -- Delete user's properties
        DELETE FROM properties WHERE profile_id = target_user_id;
        
        -- Finally, delete the user profile
        DELETE FROM profiles WHERE id = target_user_id;
        
        -- Delete from auth.users (Supabase auth table)
        DELETE FROM auth.users WHERE id = target_user_id;
        
        -- Check if user was actually deleted
        IF FOUND THEN
            deleted_count := deleted_count + 1;
            RAISE NOTICE 'Successfully deleted user: %', target_user_id;
        ELSE
            RAISE NOTICE 'User not found: %', target_user_id;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Deletion complete. Total users deleted: %', deleted_count;
END $$;


-- Verify deletion (optional - uncomment to run)
-- SELECT 'Remaining profiles count:' as info, count(*) as count FROM profiles;