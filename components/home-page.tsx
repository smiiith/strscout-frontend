"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeaderNav from "@/components/header";
import { Badge } from "./ui/badge";

interface HomePageProps {
  user?: any;
}

const HomePage = ({ user }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-background">
          <HeaderNav user={user} />
          <div className="container mx-auto px-4 py-16 md:py-24">
            {/* SEO-optimized heading structure */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                Short-Term Rental Analysis Tools Powered by Real Market Data
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                Welcome! What would you like to do?
              </p>
              {/* Trust signal */}
              <p className="text-sm text-muted-foreground">
                Trusted by Airbnb hosts and vacation rental investors
              </p>
            </div>

            {/* Product cards */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {/* STR Feedback Genius */}
              <article className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-primary transition-colors">
                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/images/str-feedback-genius-logo-stacked.png"
                    alt="STR Feedback Genius"
                    width={200}
                    height={120}
                    className="object-contain"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-3 text-center">
                  STR Feedback Genius
                </h2>

                <p className="text-center text-muted-foreground mb-4 text-lg font-medium">
                  I want to improve my listing with personalized feedback.
                </p>

                {/* SEO-rich description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Get AI-powered analysis of your Airbnb or vacation rental
                  listing. We evaluate your photos, headline, description and
                  amenities to help you attract more guests and increase
                  bookings.
                </p>

                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Link href="/feedback-genius">Learn More</Link>
                  </Button>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/feedback-genius/analyze">
                      Get Free Listing Analysis
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Best for: Current Airbnb hosts looking to optimize
                </p>
              </article>

              {/* STR Market Spy */}
              <article className="bg-white rounded-lg border-2 border-primary p-8 relative shadow-lg">
                {/* Most Popular badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>

                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/images/market-spy-logo.png"
                    alt="STR Market Spy"
                    width={200}
                    height={120}
                    className="object-contain"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-3 text-center">
                  STR Market Spy
                </h2>

                <p className="text-center text-muted-foreground mb-4 text-lg font-medium">
                  I want insight on my competitors.
                </p>

                {/* SEO-rich description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Discover which nearby vacation rentals are getting booked most
                  often and why. Analyze competitor amenities, policies, photos
                  and descriptions to understand what drives bookings in your
                  area.
                </p>

                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Link href="/market-spy">Learn More</Link>
                  </Button>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/market-spy/analyze">
                      Analyze My Competition
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Best for: Hosts wanting to outperform local competitors
                </p>
              </article>

              {/* STR Market Scout */}
              <article className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-primary transition-colors relative">
                {/* Beta badge */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Beta
                </div>

                <div className="flex items-center justify-center mb-6">
                  <Image
                    src="/images/market-scout-logo.png"
                    alt="STR Market Scout"
                    width={200}
                    height={120}
                    className="object-contain"
                  />
                </div>

                <h2 className="text-2xl font-bold mb-3 text-center">
                  STR Market Scout
                </h2>

                <p className="text-center text-muted-foreground mb-4 text-lg font-medium">
                  I want to research a new STR opportunity.
                </p>

                {/* SEO-rich description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Evaluate investment properties before you buy. Get market
                  demand analysis, occupancy rates and competition assessment
                  for any address to make smarter short-term rental investment
                  decisions.
                </p>

                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Link href="/market-scout">Learn More</Link>
                  </Button>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/market-scout/analyze">
                      Evaluate Property Market
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Best for: Investors researching STR property purchases
                </p>

                {/* Beta explanation */}
                <p className="text-xs text-center text-muted-foreground mt-3 italic">
                  Beta: New features being tested with early access
                </p>
              </article>
            </div>

            {/* Decision helper */}
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-3">
                Not sure which tool is right for you?
              </h3>
              <div className="text-muted-foreground mb-6">
                We offer free analyses with no credit card required in addition
                to premium plans. <br />
                <Link href="/pricing" className="underline">
                  See pricing details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePageOld = ({ user }: HomePageProps) => {
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
                    <Link href="/feedback-genius/analyze">Start Now</Link>
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
                  <Badge className="h-6 mx-4" variant="default">
                    Beta
                  </Badge>
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  I want to research a new STR opportunity.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/market-scout">Learn More</Link>
                  </Button>
                  <Button asChild size="lg" className="w-4/5">
                    <Link href="/market-scout/analyze">Start Now</Link>
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
