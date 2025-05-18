"use client"

import { PLANS } from "@/app/types/plans";
import ProtectedPage from "@/components/ProtectedPage";
import { useState } from "react";

const MarketSpyPage = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* {loading ? <div>Loading...</div> : */}

            <ProtectedPage requiredPlan={PLANS.PRO}>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Market Spy</h1>
                    <p className="text-gray-500">This is the Market Spy page.</p>
                </div>
            </ProtectedPage >
            {/* } */}
        </>
    )
}

export default MarketSpyPage;