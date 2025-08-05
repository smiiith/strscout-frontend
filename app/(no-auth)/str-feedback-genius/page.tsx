"use client";

import React, { useEffect, useState } from "react";
import "./feedback-genius.css";
import { useRouter } from "next/navigation";
// @ts-ignore
import Parallax, { Layer } from "react-parallax-scroll";
import HeaderNav from "@/components/header";
import FeedbackGeniusHero from "./hero";
import GuessworkSection from "./guesswork-section";
import HowItWorksSection from "./how-it-works-section";
import RatingsSection from "./ratings-section";
import AnswersSection from "./answers-section";

export default function FeedbackGeniusLandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-background">
          <>
            <Parallax>
              <Layer className="" settings={{ speed: 0.3 }}>
                <div className="w-full">
                  <div className="md:h-full">
                    <FeedbackGeniusHero />
                    {/* <HeroOne /> */}
                  </div>
                </div>
              </Layer>

              <Layer className="!h-auto" settings={{ speed: 0.3 }}>
                <div className="w-full pt-0">
                  <div className="">
                    <GuessworkSection />
                  </div>
                </div>
              </Layer>

              <Layer className="!h-auto" settings={{ speed: 0.3 }}>
                <div className="w-full pt-0">
                  <div className="">
                    <HowItWorksSection />
                  </div>
                </div>
              </Layer>

              <Layer className="!h-auto" settings={{ speed: 0.3 }}>
                <div className="w-full pt-0">
                  <div className="">
                    <RatingsSection />
                  </div>
                </div>
              </Layer>

              <Layer className="!h-auto" settings={{ speed: 0.3 }}>
                <div className="w-full pt-0">
                  <div className="">
                    <AnswersSection />
                  </div>
                </div>
              </Layer>

              {/* <Layer className="banner banner-2 !bg-[auto_80%] !bg-right md:pt-0 pt-[380px]" settings={{ speed: 0.3 }}>
                <div className="flex flex-row w-full md:pt-5">
                  <div className="box md:w-3/5 h-full">
                    <HeroThree />
                  </div>
                </div>
              </Layer> */}

              {/* <Layer className="banner banner-3" settings={{ speed: 0.3 }}>
          <div className="">
            <HeroFour />
          </div>
        </Layer> */}
            </Parallax>
          </>
        </div>
      </div>
    </div>
  );
}
