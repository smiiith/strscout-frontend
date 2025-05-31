"use client"

import { PLANS } from "@/app/types/plans";
import ProtectedPage from "@/components/ProtectedPage";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

const MarketSpyPage = () => {
    const [loading, setLoading] = useState(true);

    function fireAndForget(event: any): void {
        console.log("Fire and Forget button clicked");
    }

    const mockData = {
        "geocode": "33.585850, -117.173878",
        "zoom_level": 50,
        "room_type": "Entire Home",
        "bedrooms": "4+",
        "length_of_stay": "1 night stay - tomorrow with 14 day window"
    }

    const fireMarketSpy = async () => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/scrape`;

        const response = await axios.post(
            endpoint,
            mockData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        if (response.data) {
            if (response.data.properties.length === 0) {
                // router.push("/properties/assess-property/single");
            }
        }

    }

    return (
        <>
            <ProtectedPage requiredPlan={PLANS.PRO}>
                {/* <ProtectedPage requiredPlan={PLANS.FREEMIUM}> */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Market Spy</h1>
                    <p className="text-gray-500">This is the Market Spy page.</p>

                    <Button
                        variant="default"
                        onClick={fireMarketSpy}
                        className="w-fit"
                    >
                        Fire and Forget
                    </Button>
                </div>
            </ProtectedPage >
        </>
    )
}

export default MarketSpyPage;