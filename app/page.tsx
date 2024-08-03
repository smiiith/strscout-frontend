"use client"

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./home.css";
import HeroOne from "@/components/home/HeroOne";
import HeroTwo from "@/components/home/HeroTwo";
import { useRouter } from 'next/navigation';
// @ts-ignore
import Parallax, { Layer } from "react-parallax-scroll";


export default function Home() {
  const router = useRouter()


  return (
    <Parallax>
      {/* <div className="banner banner-1">
        <div className="box">No Parallax</div>
      </div> */}
      {/* <div className="separator" /> */}
      <Layer className="banner banner-1" settings={{ speed: 0.3 }}>

        <div className="right-4 top-4 absolute bg-opacity-50 bg-slate-900 rounded-xl p-2 text-white cursor-pointer"
          title="Log in"
          onClick={() => router.push('/account')}
        >
          <Login01Icon className="h-10 w-10" />

        </div>
        <div className="flex flex-row w-full">
          <div className="box box-1 w-2/5 h-full">
            <HeroOne />
          </div>
        </div>
      </Layer>
      {/* <div className="separator" /> */}
      <Layer className="banner" settings={{ speed: 0.3 }}>
        <div className="flex flex-row-reverse w-full">
          <div className="box w-2/5 h-full">
            <HeroTwo />
          </div>
        </div>
      </Layer>
      <Layer className="banner banner-2 justify-center items-center" settings={{ speed: 0.3 }}>
        <div className="w-full">
          <div className="box w-2/5 h-full">
            <HeroTwo />
          </div>
        </div>
      </Layer>
      {/* <div className="separator" /> */}
      <Layer className="banner banner-3" settings={{ speed: 0.3 }}>
        <div className="box">Slow Parallax</div>
      </Layer>
    </Parallax>
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