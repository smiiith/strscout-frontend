"use client";

import React from "react";
import "./feedback-genius.css";
import { useRouter } from "next/navigation";
// @ts-ignore
import { HeroSection } from "./sections/hero-section";
import { SocialProof } from "./sections/social-proof";
import { ReportPreview } from "./sections/report-preview";
import { HowItWorks } from "./sections/how-it-works";
import { FeaturesSection } from "./sections/features-section";
import { FinalCTA } from "./sections/final-cta";

export default function FeedbackGeniusLandingPage() {
  const router = useRouter();

  return (
    <main>
      <HeroSection />
      <SocialProof />
      <ReportPreview />
      <HowItWorks />
      <FeaturesSection />
      <FinalCTA />
    </main>
  );
}
