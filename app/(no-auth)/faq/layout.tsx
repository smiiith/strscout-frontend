import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Short-Term Rental Analysis Questions Answered | STR Sage",
  description:
    "Answers to common questions about STR Sage's Airbnb analysis tools, competitor data accuracy, how current booking data works, pricing, and getting started for free.",
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  alternates: {
    canonical: "https://www.strsage.com/faq",
  },
  openGraph: {
    title: "FAQ - Short-Term Rental Analysis Questions Answered | STR Sage",
    description:
      "Common questions about STR Sage's Airbnb listing analysis tools, data accuracy, pricing, and how to get started for free.",
    url: "https://www.strsage.com/faq",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What do you mean by nearby competitors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We find 10-20 listings that are both close in proximity and similar to yours (type of stay and number of bedrooms).",
      },
    },
    {
      "@type": "Question",
      name: "What data do you analyze?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Booking activity, listing details, photos, amenities, policies, and more.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The data is gathered in real time from real listings — it's up to the minute accurate.",
      },
    },
    {
      "@type": "Question",
      name: "Why do you use current bookings rather than historical booking data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Historical data should be considered for context, but its usefulness is limited. The idea that past results affect future performance is known as The Gambler's Fallacy. It's best to make informed decisions based on current data, not historical data.",
      },
    },
    {
      "@type": "Question",
      name: "Can I try it for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can run a free AI feedback report on your Airbnb listing at strsage.com/feedback-genius. The free feedback analyzes your title, photos, description, amenities, and interior design without requiring a paid plan.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can choose a one-time report and there are no further charges. We recommend a monthly plan so you can keep constant tabs on your competition. Our monthly plans are flexible and cancelable anytime.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
