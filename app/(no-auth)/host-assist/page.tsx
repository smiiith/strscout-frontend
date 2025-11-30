import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getUserWithPlan } from "@/app/(authenticated)/utils";
import HostAssistLanding from "./host-assist-landing";

export default async function HostAssistPage() {
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
          <HostAssistLanding />
        </div>
      </div>
    </div>
  );
}
