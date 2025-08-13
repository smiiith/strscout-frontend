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
BEGIN
    -- Define users to delete here
    FOR target_user_id IN 
        WITH users_to_delete AS (
            VALUES 
                ('REPLACE-WITH-USER-ID-1'::uuid),
                ('REPLACE-WITH-USER-ID-2'::uuid)
                -- Add more user IDs as needed
                -- ('REPLACE-WITH-USER-ID-3'::uuid)
        )
        SELECT column1 FROM users_to_delete
    LOOP
        RAISE NOTICE 'Deleting user and associated data for user_id: %', target_user_id;
        
        -- Delete from tables with foreign key references to profiles
        -- Order matters due to foreign key constraints
        
        -- Delete LLM usage records (no FK constraint but user-related)
        DELETE FROM llm_usage WHERE run_id IN (
            SELECT scan_id FROM comp_basis WHERE profile_id = target_user_id
        );
        
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
        
        -- Delete property ratings for user's properties
        DELETE FROM property_ratings WHERE property_id IN (
            SELECT id FROM str_properties WHERE user_id = target_user_id
        );
        
        -- Delete STR property ratings for user's properties
        DELETE FROM str_property_ratings WHERE property_id IN (
            SELECT id FROM str_properties WHERE user_id = target_user_id
        );
        
        -- Delete STR properties owned by user
        DELETE FROM str_properties WHERE user_id = target_user_id;
        
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