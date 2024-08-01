"use client"

import React from "react";
import ReactDOM from "react-dom";
import "./home.css";
import HeroOne from "@/components/home/HeroOne";
import HeroTwo from "@/components/home/HeroTwo";

// @ts-ignore
import Parallax, { Layer } from "react-parallax-scroll";

export default function Home() {
  return (
    <Parallax>
      {/* <div className="banner banner-1">
        <div className="box">No Parallax</div>
      </div> */}
      {/* <div className="separator" /> */}
      <Layer className="banner banner-1" settings={{ speed: 0.3 }}>
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
