import React from "react";
import "./home.css";
import HeaderNav from "@/components/header";
import ParallaxContent from "./parallax-content";
import { createClient } from '@/utils/supabase/server';
import { getUserWithPlan } from './(authenticated)/utils';


export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
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

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Home />, rootElement);

const Login01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 14.5C12.9943 14.0085 11 12.7002 11 12M13.5 9.5C12.9943 9.99153 11 11.2998 11 12M11 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);