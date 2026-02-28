"use client";

import { HeroSection } from "../sections/hero-section";
import { SocialProof } from "../sections/social-proof";
import { ReportPreview } from "../sections/report-preview";
import { HowItWorks } from "../sections/how-it-works";
import { FeaturesSection } from "../sections/features-section";
import { FinalCTA } from "../sections/final-cta";
import type { Locality } from "@/lib/localities";

export function FeedbackGeniusLandingLocal({ location }: { location: Locality }) {
  return (
    <main>
      <HeroSection location={location} />
      <SocialProof />
      <ReportPreview />
      <HowItWorks />
      <FeaturesSection />
      <FinalCTA location={location} />
    </main>
  );
}
