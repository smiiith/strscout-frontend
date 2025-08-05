import React from "react";
import "./home.css";
import HeaderNav from "@/components/header";
import ParallaxContent from "./parallax-content";
import { createClient } from "@/utils/supabase/server";
import { getUserWithPlan } from "./(authenticated)/utils";

export default async function Home() {
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
            <HeaderNav user={userProfile} />
            <ParallaxContent />
          </>
        </div>
      </div>
    </div>
  );
}
