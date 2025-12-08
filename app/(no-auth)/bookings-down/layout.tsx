import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb Bookings Down? Find Out Why | STR Sage",
  description:
    "Stop guessing why your Airbnb bookings are down. STR Market Spy reveals exactly how your competitors are performing and what they're doing differently to win more bookings.",
  keywords: [
    "airbnb bookings down",
    "airbnb not getting bookings",
    "low airbnb occupancy",
    "airbnb calendar empty",
    "str market analysis",
    "airbnb competitor analysis",
    "vacation rental market research",
    "airbnb occupancy rates",
    "str spy tool",
    "airbnb market insights",
  ],
  openGraph: {
    title: "Airbnb Bookings Down? Find Out Why | STR Sage",
    description:
      "Stop guessing why your Airbnb bookings are down. See exactly how your competitors are performing and what they're doing differently.",
    type: "website",
    url: "https://www.strsage.com/bookings-down",
    siteName: "STR Sage",
    images: [
      {
        url: "https://www.strsage.com/images/landing-page-image-bookings-down-01-min.png",
        width: 1200,
        height: 630,
        alt: "STR Market Spy - Competitor Occupancy Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Bookings Down? Find Out Why",
    description:
      "Stop guessing. See exactly how your competitors are performing and what they're doing differently.",
    images: ["https://www.strsage.com/images/landing-page-image-bookings-down-01-min.png"],
  },
  alternates: {
    canonical: "https://www.strsage.com/bookings-down",
  },
};

export default function BookingsDownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
