import React from "react";
import "./home.css";
// import HeaderNav from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import { getUserWithPlan } from "@/app/(authenticated)/utils";
import MarketSpyLanding from "./market-spy-landing";

export async function generateMetadata() {
  return {
    title: "Market Spy - STR Competitive Analysis | STR Sage",
    description: "Analyze STR competition in any market. Get data-driven insights on comparable properties, pricing strategies, and investment viability.",
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
    alternates: {
      canonical: "https://www.strsage.com/market-spy",
    },
    openGraph: {
      title: "Market Spy - STR Competitive Analysis",
      description: "Analyze short-term rental competition in any market. Get data-driven insights for your STR investment.",
      url: "https://www.strsage.com/market-spy",
      type: "website",
      images: [
        {
          url: "https://www.strsage.com/market-spy-og.png",
          width: 1200,
          height: 630,
          alt: "Market Spy - STR Competitive Analysis",
        },
      ],
    },
  };
}

export default async function MarketSpyHome() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userProfile = null;
  if (user) {
    userProfile = await getUserWithPlan(user.id);
  }

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-background">
          <>
            <MarketSpyLanding />
          </>
        </div>
      </div>
    </div>
  );
}
