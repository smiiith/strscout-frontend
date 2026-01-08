"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PostHogTracker({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
                api_host: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/ingest/`,
                ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
                session_recording: {
                    maskAllInputs: true, // Mask all input fields for privacy
                    maskTextSelector: '*', // Mask all text by default
                },
                loaded: (ph) => {
                    if (process.env.NODE_ENV === "development") ph.debug(false);
                },
                // Disable toolbar metrics in production to avoid CSP violations and ad blocker issues
                advanced_disable_toolbar_metrics: process.env.NODE_ENV === "production",
            });
            setIsInitialized(true); // Ensure we don't reinitialize PostHog
        }
    }, [isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            // Capture pageview with UTM and Google Ads parameters from URL
            const searchParams = new URLSearchParams(window.location.search);
            const trackingParams: Record<string, string> = {};

            // Extract UTM parameters (if present)
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
                const value = searchParams.get(param);
                if (value) trackingParams[param] = value;
            });

            // Extract Google Ads auto-tagging parameters (gclid, gad_*, etc.)
            const googleAdsParams = ['gclid', 'gad_source', 'gad_campaignid', 'gbraid', 'wbraid'];
            googleAdsParams.forEach(param => {
                const value = searchParams.get(param);
                if (value) trackingParams[param] = value;
            });

            // If we have gclid, automatically tag as Google Ads traffic
            if (trackingParams.gclid) {
                trackingParams.utm_source = trackingParams.utm_source || 'google';
                trackingParams.utm_medium = trackingParams.utm_medium || 'cpc';
                trackingParams.traffic_type = 'google_ads';
            }

            posthog.capture("$pageview", {
                $current_url: window.location.href,
                ...trackingParams
            });
        }
    }, [pathname, isInitialized]);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
