import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About STR Sage - AI-Powered Short-Term Rental Analysis Tools",
  description:
    "STR Sage helps Airbnb hosts and short-term rental investors make smarter, data-backed decisions with AI-powered listing analysis, competitor intelligence, and market research tools.",
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  alternates: {
    canonical: "https://www.strsage.com/about-us",
  },
  openGraph: {
    title: "About STR Sage - AI-Powered Short-Term Rental Analysis Tools",
    description:
      "STR Sage helps Airbnb hosts and STR investors make smarter decisions with AI-powered listing analysis, competitor intelligence, and market research.",
    url: "https://www.strsage.com/about-us",
    type: "website",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
