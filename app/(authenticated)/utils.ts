import { supabaseClient } from "@/utils/supabase/js-client";


export const getUserWithPlan = async (userId: string) => {
    if (!userId) {
        return null; // Or handle unauthenticated user appropriately
    }

    const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('*, plan:plans(id, name, description, active, key)')
        .eq('id', userId)
        .single();

    if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return null; // Or throw the error
    }

    if (!profile?.plan_id) {
        return null; // User doesn't have a plan assigned in their profile
    }

    return profile;
}