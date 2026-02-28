"use client";

import { CompetitorInsights } from "./sections/competitor-insights";
import { MarketScoutFAQ } from "./sections/market-scout-faq";
import { MarketScoutFeatures } from "./sections/market-scout-features";
import { MarketScoutFinalCTA } from "./sections/market-scout-final-cta";
import { MarketScoutHero } from "./sections/market-scout-hero";
import { MarketScoutReportPreview } from "./sections/market-scout-report-preview";
import { MarketScoutSocialProof } from "./sections/market-scout-social-proof";
import type { Locality } from "@/lib/localities";

const MarketScoutLanding = ({ location }: { location?: Locality }) => {
  return (
    <main>
      <MarketScoutHero location={location} />
      <MarketScoutSocialProof />
      <MarketScoutReportPreview />
      <CompetitorInsights />
      <MarketScoutFeatures />
      <MarketScoutFAQ location={location} />
      <MarketScoutFinalCTA location={location} />
    </main>
  );
};

export default MarketScoutLanding;
