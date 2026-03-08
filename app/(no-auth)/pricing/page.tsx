import { Metadata } from "next";
import PricingPageNew from "@/components/pricing-page-new";

export const metadata: Metadata = {
  title: "Pricing - STR Analysis Plans for Hosts & Investors | STR Sage",
  description:
    "Flexible plans for Airbnb hosts and STR investors. Start free with Feedback Genius AI listing analysis, or unlock competitive market intelligence with Market Spy and Market Scout.",
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  alternates: {
    canonical: "https://www.strsage.com/pricing",
  },
  openGraph: {
    title: "Pricing - STR Analysis Plans for Hosts & Investors | STR Sage",
    description:
      "Flexible plans for Airbnb hosts and STR investors. Start free with Feedback Genius, or unlock competitive market intelligence.",
    url: "https://www.strsage.com/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return <PricingPageNew />;
}
