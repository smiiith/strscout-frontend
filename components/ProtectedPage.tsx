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
    const { session, loading } = useUserSession();
    const [userHasPerms, setUserHasPerms] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading && session) {
            const hasRequiredPlan = Array.isArray(requiredPlan)
                ? requiredPlan.includes(session.plan.key)
                : session.plan.key === requiredPlan;

            setUserHasPerms(hasRequiredPlan);
        } else if (!loading && !session) {
            setUserHasPerms(false);
        }
    }, [session, loading, requiredPlan]);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (!session) {
        return <div>Not authenticated. Please log in.</div>;
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