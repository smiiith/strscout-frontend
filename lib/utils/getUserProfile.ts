import { createClient } from "@/utils/supabase/client";

export const getUserProfile = async (userId: string) => {
    if (!userId) {
        return null;
    }

    const supabase = createClient();
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*, plan:plans(id, name, description, active, key)')
        .eq('id', userId)
        .single();

    if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return null;
    }

    return profile;
}