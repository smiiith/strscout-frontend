"use client";

import { CompetitorInsights } from "./sections/competitor-insights";
import { MarketSpyFAQ } from "./sections/market-spy-faq";
import { MarketSpyFeatures } from "./sections/market-spy-features";
import { MarketSpyFinalCTA } from "./sections/market-spy-final-cta";
import { MarketSpyHero } from "./sections/market-spy-hero";
import { MarketSpyReportPreview } from "./sections/market-spy-report-preview";
import { MarketSpySocialProof } from "./sections/market-spy-social-proof";
import type { Locality } from "@/lib/localities";

const MarketSpyLanding = ({ location }: { location?: Locality }) => {
  return (
    <main>
      <MarketSpyHero location={location} />
      <MarketSpySocialProof />
      <MarketSpyReportPreview />
      <CompetitorInsights />
      {/* <TestimonialsSection /> */}
      <MarketSpyFeatures />
      <MarketSpyFAQ location={location} />
      <MarketSpyFinalCTA location={location} />
    </main>
  );
};

export default MarketSpyLanding;
