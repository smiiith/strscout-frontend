"use client";

// @ts-ignore
import Parallax, { Layer } from "react-parallax-scroll";
import HeroSection from "./(no-auth)/home/hero-section";
import GuessworkSection from "./(no-auth)/home/guesswork-section";
import HowItWorksSection from "./(no-auth)/home/how-it-works-section";
import RatingsSection from "./(no-auth)/home/ratings-section";
import AnswersSection from "./(no-auth)/home/answers-section";

const ParallaxContent = () => {
  return (
    <Parallax>
      <Layer className="" settings={{ speed: 0.3 }}>
        <div className="w-full">
          <div className="md:h-full">
            <HeroSection />
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
    </Parallax>
  );
};

export default ParallaxContent;