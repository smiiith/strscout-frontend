'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabaseClient } from '@/utils/supabase/js-client';

interface UserPlan {
    id: string
    name: string
    description: string
    active: boolean
    key: string
}

interface UserSession {
    id: string
    email: string
    plan: UserPlan
    // role: string
}

const UserSessionContext = createContext<{
    session: UserSession | null
    loading: boolean
    refreshSession: () => Promise<void>
}>({
    session: null,
    loading: true,
    refreshSession: async () => { },
})

export function UserSessionProvider({ children, initialSession }: { children: ReactNode; initialSession: UserSession | null }) {
    const [session, setSession] = useState<UserSession | null>(initialSession)
    const [loading, setLoading] = useState(false) // Initially not loading as we have initial data

    const refreshSession = async () => {
        console.log("refreshSession");
        setLoading(true);
        try {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user) {
                // Fetch additional user data on the client if needed
                const { data: profileData } = await supabaseClient
                    .from('profiles')
                    .select('*, plan:plans(id, name, description, active, key)')
                    .eq('id', user.id)
                    .single();

                if (profileData) {
                    setSession({
                        id: user.id,
                        email: user.email || '',
                        plan: profileData.plan,
                        // role: profileData.role,
                    });
                } else {
                    setSession({
                        id: user.id,
                        email: user.email || '',
                        plan: {
                            id: '',
                            name: '',
                            description: '',
                            active: true,
                            key: 'freemium',
                        },
                    });
                }
            } else {
                setSession(null);
            }
        } catch (error) {
            console.error('Error refreshing session:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("init session (client-side)");
        if (!initialSession) {
            refreshSession(); // Only fetch if no initial session was provided
        }

        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
            async (event, authSession) => {
                console.log("Auth state change:", event, authSession);
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    await refreshSession();
                } else if (event === 'SIGNED_OUT') {
                    setSession(null);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [initialSession]); // Depend on initialSession to avoid unnecessary initial fetches

    return (
        <UserSessionContext.Provider value={{ session, loading, refreshSession }}>
            {children}
        </UserSessionContext.Provider>
    );
}

export function useUserSession() {
    const context = useContext(UserSessionContext);
    if (context === undefined) {
        throw new Error('useUserSession must be used within a UserSessionProvider');
    }
    return context;
}

export { UserSessionContext };

const exports = { UserSessionProvider, useUserSession };