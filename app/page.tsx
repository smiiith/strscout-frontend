import React from "react";
import HomePage from "@/components/home-page";
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

  return <HomePage user={userProfile} />;
}
