import React from "react";
import "./home.css";
import { createClient } from "@/utils/supabase/server";
import { getUserWithPlan } from "@/app/(authenticated)/utils";
import MarketScoutLanding from "./market-scout-landing";

export async function generateMetadata() {
  return {
    title: "Market Scout - Entire Home STR Analysis | STR Sage",
    description: "Streamlined competitive analysis for entire home short-term rentals. Discover market trends, comparable properties, and investment potential for whole-home STRs.",
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
    alternates: {
      canonical: "https://www.strsage.com/market-scout",
    },
    openGraph: {
      title: "Market Scout - Entire Home STR Analysis",
      description: "Streamlined competitive analysis for entire home short-term rentals.",
      url: "https://www.strsage.com/market-scout",
      type: "website",
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
            <MarketScoutLanding />
          </>
        </div>
      </div>
    </div>
  );
}
