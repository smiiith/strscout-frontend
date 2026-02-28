import { redirect } from "next/navigation";
import { LOCALITIES, getLocality } from "@/lib/localities";
import { FeedbackGeniusLandingLocal } from "./feedback-genius-landing-local";

export async function generateStaticParams() {
  return LOCALITIES.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { location: string };
}) {
  const locality = getLocality(params.location);
  if (!locality) return {};

  return {
    title: `Free Airbnb Listing Analysis for ${locality.name} Hosts - Feedback Genius | STR Sage`,
    description: `Get expert AI feedback on your ${locality.name}, ${locality.state} Airbnb listing. Improve your title, photos, description, and amenities to get more bookings. 100% free.`,
    keywords: [
      "Airbnb listing analysis",
      "STR feedback",
      "improve Airbnb listing",
      `${locality.name} Airbnb`,
      `${locality.name} Airbnb host`,
      `${locality.name} short term rental`,
      `improve Airbnb listing ${locality.name}`,
      `${locality.name} vacation rental tips`,
      `Airbnb optimization ${locality.name} ${locality.state}`,
    ],
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
    alternates: {
      canonical: `https://www.strsage.com/feedback-genius/${locality.slug}`,
    },
    openGraph: {
      title: `Free Airbnb Listing Analysis for ${locality.name} Hosts - Feedback Genius`,
      description: `Get expert AI feedback on your ${locality.name} Airbnb listing. 100% free, no credit card required.`,
      url: `https://www.strsage.com/feedback-genius/${locality.slug}`,
      type: "website",
    },
  };
}

export default async function FeedbackGeniusLocalPage({
  params,
}: {
  params: { location: string };
}) {
  const locality = getLocality(params.location);
  if (!locality) redirect("/feedback-genius");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Free Airbnb Listing Analysis for ${locality.name} Hosts`,
    description: `AI-powered Airbnb listing feedback for hosts in ${locality.name}, ${locality.stateName}. 100% free.`,
    url: `https://www.strsage.com/feedback-genius/${locality.slug}`,
    about: {
      "@type": "Service",
      name: "STR Feedback Genius",
      description:
        "Free AI-powered Airbnb listing analysis and optimization tool",
      areaServed: {
        "@type": "City",
        name: locality.name,
        containedInPlace: {
          "@type": "State",
          name: locality.stateName,
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeedbackGeniusLandingLocal location={locality} />
    </>
  );
}
