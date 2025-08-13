'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import { getUserProfile } from '../utils/getUserProfile';

interface UserProfile {
    id: string;
    market_spy_listings_limit: number;
    market_spy_listings_used: number;
    billing_type: string;
    subscription_status: string;
    plan: any; // You might want to define a proper type for plan
}

interface UserSession {
    id: string
    email: string
    profile: UserProfile | null;
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
    const [session, setSession] = useState<UserSession | null>(initialSession);
    const [loading, setLoading] = useState(!initialSession);
    const supabase = createClient();

    const refreshSession = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                const profile = await getUserProfile(user.id);
                const newSession = {
                    id: user.id,
                    email: user.email || '',
                    profile: profile,
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
    }, []);

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