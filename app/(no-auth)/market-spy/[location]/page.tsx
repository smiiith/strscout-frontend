import { redirect } from "next/navigation";
import { LOCALITIES, getLocality } from "@/lib/localities";
import MarketSpyLanding from "../market-spy-landing";

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
    title: `${locality.name} STR Market Analysis - Market Spy | STR Sage`,
    description: `Analyze the short-term rental market in ${locality.name}, ${locality.state}. See competitor bookings, amenities, and strategies to outperform other ${locality.name} listings.`,
    keywords: [
      "STR market analysis",
      "short term rental",
      "Airbnb competitive analysis",
      `${locality.name} STR`,
      `${locality.name} Airbnb`,
      `${locality.name} vacation rental`,
      `${locality.name} short term rental market`,
      `${locality.name} ${locality.state} STR investment`,
      `best Airbnb markets ${locality.state}`,
    ],
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
    alternates: {
      canonical: `https://www.strsage.com/market-spy/${locality.slug}`,
    },
    openGraph: {
      title: `${locality.name} STR Market Analysis - Market Spy`,
      description: `Analyze the ${locality.name} short-term rental market. Get data-driven insights on competitor bookings, pricing, and strategies.`,
      url: `https://www.strsage.com/market-spy/${locality.slug}`,
      type: "website",
      images: [
        {
          url: "https://www.strsage.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `STR Sage - Market Spy ${locality.name}`,
        },
      ],
    },
  };
}

export default async function MarketSpyLocalPage({
  params,
}: {
  params: { location: string };
}) {
  const locality = getLocality(params.location);
  if (!locality) redirect("/market-spy");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${locality.name} STR Market Analysis - Market Spy`,
    description: `Analyze the ${locality.name}, ${locality.stateName} short-term rental market with STR Sage Market Spy.`,
    url: `https://www.strsage.com/market-spy/${locality.slug}`,
    about: {
      "@type": "Service",
      name: "STR Market Spy",
      description:
        "Short-term rental competitive analysis tool for Airbnb hosts and investors",
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
            <MarketSpyLanding location={locality} />
          </div>
        </div>
      </div>
    </>
  );
}
