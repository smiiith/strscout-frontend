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
            posthog.capture("$pageview"); // Track page views when route changes
        }
    }, [pathname, isInitialized]);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
