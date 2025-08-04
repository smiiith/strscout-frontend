'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();
    const supabase = createClient(); // Create SSR-compatible client

    const refreshSession = async () => {
        setLoading(true);
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (user) {
                // Simple session without plan data since middleware handles authorization
                const newSession = {
                    id: user.id,
                    email: user.email || '',
                    plan: {
                        id: '',
                        name: '',
                        description: '',
                        active: true,
                        key: 'authenticated', // Generic authenticated user
                    },
                };
                setSession(newSession);
            } else {
                setSession(null);
            }
        } catch (error) {
            console.error('Error refreshing session:', error);
            setSession(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only refresh if we don't have session data yet
        if (!session && !initialSession) {
            refreshSession();
        } else if (!session && initialSession) {
            setSession(initialSession);
        }
    }, [pathname, initialSession]); // Trigger refresh on route changes

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, authSession) => {
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
    }, []); // Auth listener only needs to run once

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