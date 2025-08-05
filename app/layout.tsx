import "./globals.css";
import { ThemeProvider } from "./providers";
import { createClient } from "@/utils/supabase/server";
import { PostHogTracker } from "./PostHogTracker";
import Footer from "@/components/footer";

export const metadata = {
  title: "STR Feeeback Genius",
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="px-0 md:px-5 bg-muted">
        <PostHogTracker>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              {children}
              <Footer authenticated={data.user} />
            </div>
          </ThemeProvider>
        </PostHogTracker>
      </body>
    </html>
  );
}
