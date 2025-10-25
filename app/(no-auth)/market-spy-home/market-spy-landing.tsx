"use client";

import { CompetitorInsights } from "./sections/competitor-insights";
import { MarketSpyFAQ } from "./sections/market-spy-faq";
import { MarketSpyFeatures } from "./sections/market-spy-features";
import { MarketSpyFinalCTA } from "./sections/market-spy-final-cta";
import { MarketSpyHero } from "./sections/market-spy-hero";
import { MarketSpyReportPreview } from "./sections/market-spy-report-preview";
import { MarketSpySocialProof } from "./sections/market-spy-social-proof";
import { TestimonialsSection } from "./sections/testimonials-section";

const MarketSpyLanding = () => {
  return (
    <main>
      <MarketSpyHero />
      <MarketSpySocialProof />
      <MarketSpyReportPreview />
      <CompetitorInsights />
      {/* <TestimonialsSection /> */}
      <MarketSpyFeatures />
      <MarketSpyFAQ />
      <MarketSpyFinalCTA />
    </main>
  );
};

export default MarketSpyLanding;
