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
    accessToken?: string;
}

const UserSessionContext = createContext<{
    session: UserSession | null
    loading: boolean
    refreshSession: () => Promise<void>
    getAccessToken: () => Promise<string | null>
}>({
    session: null,
    loading: true,
    refreshSession: async () => { },
    getAccessToken: async () => null,
})

export function UserSessionProvider({ children, initialSession }: { children: ReactNode; initialSession: UserSession | null }) {
    const [session, setSession] = useState<UserSession | null>(initialSession);
    const [loading, setLoading] = useState(!initialSession);
    // Initialize token from initialSession if available
    const [cachedToken, setCachedToken] = useState<string | null>(initialSession?.accessToken || null);
    const [tokenInitialized, setTokenInitialized] = useState(!!initialSession?.accessToken);
    const supabase = createClient();

    // Get access token - wait for initialization if needed
    const getAccessToken = async (): Promise<string | null> => {
        // If token is already initialized and cached, return it immediately
        if (tokenInitialized && cachedToken) {
            return cachedToken;
        }

        // If not initialized yet, wait a bit for initialization to complete
        if (!tokenInitialized) {
            // Wait up to 1 second for initialization
            for (let i = 0; i < 10; i++) {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (tokenInitialized) {
                    return cachedToken;
                }
            }
        }

        // Fallback: fetch it directly
        try {
            const { data: { session: authSession } } = await supabase.auth.getSession();
            const token = authSession?.access_token || null;
            if (token) {
                setCachedToken(token);
                setTokenInitialized(true);
            }
            return token;
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    };

    const refreshSession = async (silentRefresh: boolean = false) => {
        // Only show loading state if this is not a silent background refresh
        // Silent refreshes happen when tokens refresh automatically
        const shouldShowLoading = !silentRefresh;

        if (shouldShowLoading) {
            setLoading(true);
        }

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

                // Also cache the access token
                const { data: { session: authSession } } = await supabase.auth.getSession();
                if (authSession?.access_token) {
                    setCachedToken(authSession.access_token);
                    setTokenInitialized(true);
                }
            } else {
                setSession(null);
                setCachedToken(null);
            }
        } catch (error) {
            console.error('Error refreshing session:', error);
            setSession(null);
            setCachedToken(null);
        } finally {
            if (shouldShowLoading) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        // Initialize token cache if not already initialized from initialSession
        const initializeToken = async () => {
            if (!tokenInitialized) {
                try {
                    const { data: { session: authSession } } = await supabase.auth.getSession();
                    if (authSession?.access_token) {
                        setCachedToken(authSession.access_token);
                        setTokenInitialized(true);
                    } else {
                        setTokenInitialized(true);
                    }
                } catch (error) {
                    console.error('Error initializing token:', error);
                    setTokenInitialized(true);
                }
            }
        };

        initializeToken();

        // If no initial session was provided, fetch it on mount
        if (!initialSession) {
            refreshSession();
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, authSession) => {
                if (event === 'SIGNED_IN') {
                    // Only show loading if we don't already have a session
                    const silentRefresh = !!session;
                    await refreshSession(silentRefresh);
                } else if (event === 'TOKEN_REFRESHED') {
                    await refreshSession(true);
                } else if (event === 'SIGNED_OUT') {
                    setSession(null);
                    setLoading(false);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <UserSessionContext.Provider value={{ session, loading, refreshSession, getAccessToken }}>
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