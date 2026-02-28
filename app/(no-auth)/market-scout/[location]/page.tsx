import { redirect } from "next/navigation";
import { LOCALITIES, getLocality } from "@/lib/localities";
import MarketScoutLanding from "../market-scout-landing";

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
    title: `${locality.name} STR Investment Analysis - Market Scout | STR Sage`,
    description: `Is ${locality.name}, ${locality.state} a good short-term rental investment? Market Scout analyzes comparable properties so you can invest with confidence.`,
    keywords: [
      "STR investment analysis",
      "short term rental investment",
      "Airbnb investment",
      `${locality.name} STR investment`,
      `${locality.name} Airbnb investment`,
      `${locality.name} vacation rental investment`,
      `is ${locality.name} good for Airbnb`,
      `${locality.name} short term rental market`,
      `buy STR property ${locality.name} ${locality.state}`,
    ],
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
    alternates: {
      canonical: `https://www.strsage.com/market-scout/${locality.slug}`,
    },
    openGraph: {
      title: `${locality.name} STR Investment Analysis - Market Scout`,
      description: `Analyze ${locality.name} short-term rental investment potential. See comparable property performance before you buy.`,
      url: `https://www.strsage.com/market-scout/${locality.slug}`,
      type: "website",
      images: [
        {
          url: "https://www.strsage.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `STR Sage - Market Scout ${locality.name}`,
        },
      ],
    },
  };
}

export default async function MarketScoutLocalPage({
  params,
}: {
  params: { location: string };
}) {
  const locality = getLocality(params.location);
  if (!locality) redirect("/market-scout");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${locality.name} STR Investment Analysis - Market Scout`,
    description: `Analyze short-term rental investment potential in ${locality.name}, ${locality.stateName} with STR Sage Market Scout.`,
    url: `https://www.strsage.com/market-scout/${locality.slug}`,
    about: {
      "@type": "Service",
      name: "STR Market Scout",
      description:
        "Short-term rental investment analysis tool for entire home properties",
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
      <div className="flex flex-col">
        <div className="flex-grow">
          <div className="container mx-auto p-0 max-w-7xl bg-background">
            <MarketScoutLanding location={locality} />
          </div>
        </div>
      </div>
    </>
  );
}
