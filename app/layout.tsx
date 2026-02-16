import "./globals.css";
import { ThemeProvider } from "./providers";
import { createClient } from "@/utils/supabase/server";
import { PostHogTracker } from "./PostHogTracker";
import Footer from "@/components/footer";
import SiteAccess from "@/components/site-access";
import { getNonce } from "@/lib/nonce";
import { Analytics } from "@vercel/analytics/next";
import { FloatingChatButton } from "@/components/floating-chat-button";
import Script from "next/script";

export const metadata = {
  title: "STR Sage - Airbnb Listing Analysis & Market Intelligence",
  description:
    "We dive deep into your listing to provide analysis and actionable insights, ensuring you have the clarity you need to attract more guests and maximize your success.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  // Only use nonce in production to avoid hydration issues in dev
  const nonce = process.env.NODE_ENV === "production" ? getNonce() : undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-10990796933"
        strategy="afterInteractive"
        {...(nonce ? { nonce } : {})}
      />
      <Script id="google-analytics" strategy="afterInteractive" {...(nonce ? { nonce } : {})}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-10990796933');
        `}
      </Script>
      <body className="px-0 md:px-5 bg-muted">
        <PostHogTracker>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            {...(nonce ? { nonce } : {})}
          >
            <SiteAccess>
              <div className="min-h-screen">
                {children}
                <Footer authenticated={data.user} />
                <Analytics />
              </div>
              <FloatingChatButton />
            </SiteAccess>
          </ThemeProvider>
        </PostHogTracker>
      </body>
    </html>
  );
}
