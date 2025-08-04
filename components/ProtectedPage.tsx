'use client';

import { useUserSession } from '@/lib/context/UserSessionProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import UpgradeMarketSpy from './upgrade/market-spy';

interface Props {
    requiredPlan: string | string[];
    children: ReactNode; // Explicitly define the children prop
}

export default function ProtectedPage({ requiredPlan, children }: Props) {
    const { session, loading, refreshSession } = useUserSession();
    const [userHasPerms, setUserHasPerms] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const router = useRouter();
    
    // Fallback: If session is null and not loading, try to refresh
    useEffect(() => {
        if (!session && !loading && !isRefreshing) {
            setIsRefreshing(true);
            refreshSession().finally(() => {
                setIsRefreshing(false);
            });
        }
    }, [session, loading, refreshSession, isRefreshing]);

    useEffect(() => {
        if (!loading && session) {
            // Check if plan data is available
            if (!session.plan || !session.plan.key) {
                return; // Don't set permissions yet, wait for plan data
            }
            
            const hasRequiredPlan = Array.isArray(requiredPlan)
                ? requiredPlan.includes(session.plan.key)
                : session.plan.key === requiredPlan;

            setUserHasPerms(hasRequiredPlan);
        } else if (!loading && !session) {
            setUserHasPerms(false);
        }
    }, [session, loading, requiredPlan]);

    
    if (loading || isRefreshing) {
        return <div>Loading user data...</div>;
    }

    if (!session) {
        return <div>Not authenticated. Please log in.</div>;
    }

    // Show loading if session exists but plan data isn't loaded yet
    if (session && (!session.plan || !session.plan.key)) {
        return <div>Loading plan data...</div>;
    }

    return (
        <div>
            {userHasPerms ? (
                <div>
                    {children}
                </div>
            ) : (
                <UpgradeMarketSpy />
            )}
        </div>
    );
}