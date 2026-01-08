import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback Genius - Free AI Listing Analysis | STR Sage",
  description: "Get expert AI-powered feedback on your Airbnb listing. Analyze your title, photos, description, amenities, and interior design. 100% free, no credit card required.",
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  alternates: {
    canonical: "https://www.strsage.com/feedback-genius",
  },
  openGraph: {
    title: "Feedback Genius - Free AI Listing Analysis",
    description: "Get expert AI-powered feedback on your Airbnb listing. 100% free, no credit card required.",
    url: "https://www.strsage.com/feedback-genius",
    type: "website",
  },
};

export default function FeedbackGeniusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
