"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeaderNav from "@/components/header";

interface HomePageProps {
  user?: any;
}

const HomePage = ({ user }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-background">
          <HeaderNav user={user} />

          {/* Main Content */}
          <div className="px-4 py-12 min-h-screen">
            {/* Main heading */}
            <div className="text-left mb-16 ml-8">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Smarter STR Decisions powered by Real World Listings
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Welcome! What would you like to do?
              </h3>
            </div>

            {/* Three column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* STR Feedback Genius */}
              <div className="border-r-2 lg:border-r-primary pr-0 lg:pr-8 text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/str-feedback-genius-logo-stacked.png"
                    alt="STR Feedback Genius"
                    width={200}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  I want to improve my listing with personalized feedback.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/feedback-genius">Learn More</Link>
                  </Button>
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/feedback-genius/analyze">
                      Start Now
                    </Link>
                  </Button>
                </div>
              </div>

              {/* STR Market Spy */}
              <div className="border-r-2 lg:border-r-primary pr-0 lg:pr-8 text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/market-spy-logo.png"
                    alt="STR Market Spy"
                    width={200}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  I want insight on my competitors.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/market-spy">Learn More</Link>
                  </Button>
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/market-spy/analyze">Start Now</Link>
                  </Button>
                </div>
              </div>

              {/* STR Market Scout */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/market-scout-logo.png"
                    alt="STR Market Scout"
                    width={200}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  I want to research a new STR opportunity.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/contact-us">Apply for Beta Test</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
