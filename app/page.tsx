"use client"

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./home.css";
import HeroOne from "@/components/home/HeroOne";
import HeroTwo from "@/components/home/HeroTwo";
import { useRouter } from 'next/navigation';
// @ts-ignore
import Parallax, { Layer } from "react-parallax-scroll";
import HeroThree from "@/components/home/HeroThree";
import HeroFour from "@/components/home/HeroFour";
import HeaderNav from "@/components/header";
import HeroSection from "./(no-auth)/home/hero-section";
import GuessworkSection from "./(no-auth)/home/guesswork-section";
import HowItWorksSection from "./(no-auth)/home/how-it-works-section";
import RatingsSection from "./(no-auth)/home/ratings-section";
import AnswersSection from "./(no-auth)/home/answers-section";


export default function Home() {
  const router = useRouter()


  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-background">

          <>
            <HeaderNav />

            <Parallax>
              <Layer className="" settings={{ speed: 0.3 }}>
                <div className="w-full">
                  <div className="md:h-full">
                    <HeroSection />
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

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Home />, rootElement);

const Login01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 14.5C12.9943 14.0085 11 12.7002 11 12M13.5 9.5C12.9943 9.99153 11 11.2998 11 12M11 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);