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
    getAccessToken: (forceRefresh?: boolean) => Promise<string | null>
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

    // Get access token - check expiration and refresh if needed
    const getAccessToken = async (forceRefresh: boolean = false): Promise<string | null> => {
        // If force refresh is requested, skip cache and fetch fresh token
        if (forceRefresh) {
            try {
                const { data: { session: authSession } } = await supabase.auth.getSession();
                const token = authSession?.access_token || null;
                if (token) {
                    setCachedToken(token);
                    setTokenInitialized(true);
                }
                return token;
            } catch (error) {
                console.error('Error force refreshing token:', error);
                return null;
            }
        }

        // If token is already initialized and cached, check if it's still valid
        if (tokenInitialized && cachedToken) {
            try {
                // Decode JWT to check expiration
                const payload = JSON.parse(atob(cachedToken.split('.')[1]));
                const expiresAt = payload.exp * 1000; // Convert to milliseconds
                const now = Date.now();
                const bufferTime = 5 * 60 * 1000; // 5 minutes buffer before expiry

                // If token expires in more than 5 minutes, return it
                if (expiresAt - now > bufferTime) {
                    return cachedToken;
                }

                // Token expired or expiring soon - just return it anyway
                // The backend will reject it with 401 and our retry logic will handle it
                return cachedToken;
            } catch (error) {
                // If we can't decode the token, just return it
                // Let the backend validate it
                console.error('Error checking token expiration:', error);
                return cachedToken;
            }
        }

        // If not initialized yet, wait a bit for initialization to complete
        if (!tokenInitialized) {
            // Wait up to 1 second for initialization
            for (let i = 0; i < 10; i++) {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (tokenInitialized && cachedToken) {
                    return cachedToken;
                }
            }
        }

        // No cached token - fetch from Supabase (first time only)
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
                    // Update cached token immediately when Supabase auto-refreshes
                    if (authSession?.access_token) {
                        setCachedToken(authSession.access_token);
                        setTokenInitialized(true);
                    }
                    await refreshSession(true);
                } else if (event === 'SIGNED_OUT') {
                    setSession(null);
                    setLoading(false);
                    // Redirect to login on sign out
                    window.location.href = '/login';
                } else if (event === 'USER_DELETED' || event === 'TOKEN_REFRESH_FAILED') {
                    // Session expired or refresh failed - redirect to login
                    setSession(null);
                    setCachedToken(null);
                    setLoading(false);
                    window.location.href = '/login';
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