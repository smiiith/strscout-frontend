"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, PlayCircle } from "lucide-react";

export default function BookingsDownPage() {
  // Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Airbnb Bookings Down? Find Out Why | STR Sage",
    description:
      "Stop guessing why your Airbnb bookings are down. STR Market Spy reveals exactly how your competitors are performing and what they're doing differently to win more bookings.",
    url: "https://www.strsage.com/bookings-down",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "STR Market Spy",
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "30",
        highPrice: "420",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
      },
    },
  };
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center space-y-6">
              <Badge variant="outline" className="mb-4">
                For Airbnb Hosts
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Your Airbnb Bookings Are Down — Let's Find Out Why.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Stop guessing whether it's your pricing, visibility, or the
                market itself.{" "}
                <span className="font-semibold">STR Market Spy</span> reveals
                exactly how your competitors are performing — and what they're
                doing differently to win more bookings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href="/feedback-genius/analyze">
                    Run a Free Listing Checkup →
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/market-spy/analyze">Unlock Market Insights</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Start by analyzing your own listing with STR Feedback Genius
                (free).
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 - The Problem */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">
                When Your Calendar Goes Quiet, Panic Sets In
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              <p>You're refreshing your Airbnb dashboard and wondering:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>"Why are my neighbors booked and I'm not?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>"Did I set my prices wrong?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>"Did the algorithm change again?"</span>
                </li>
              </ul>
              <p className="pt-4">
                Every host hits this moment — but without visibility into your
                market, you can't tell whether it's you or demand itself.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <Button size="lg" asChild>
                <Link href="/feedback-genius/analyze">
                  Run a Free Listing Checkup →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">
                See STR Market Spy in Action
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick 2-minute walkthrough — see how hosts identify occupancy
                trends and competitor strengths in real time.
              </p>

              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div
                  className="relative aspect-video bg-muted flex items-center justify-center group"
                  onClick={() => setVideoOpen(true)}
                >
                  <Image
                    src="/images/slide-market-spy-1.png"
                    alt="STR Market Spy Demo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="bg-white rounded-full p-6 group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setVideoOpen(true)}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Video Dialog */}
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="w-[100vw] max-w-[100vw] left-0 right-0 translate-x-0 sm:max-w-3xl sm:left-[50%] sm:translate-x-[-50%] lg:max-w-4xl p-3 sm:p-6 gap-2 sm:gap-4 sm:rounded-lg rounded-none">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-base sm:text-lg pr-6">
                STR Market Spy Demo
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                See how STR Market Spy helps you understand your competition
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video overflow-hidden bg-muted">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dOBdLm3_Z1s"
                title="STR Market Spy Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>

        {/* Section 2 - Feedback Genius (Free) */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center space-y-6 mb-12">
              <Badge variant="secondary" className="mb-2">
                Step 1: Free
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">
                Start With a Free Checkup — STR Feedback Genius
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Before diving into your competitors, make sure your own listing
                isn't part of the problem. STR Feedback Genius instantly reviews
                your:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Hero photo and gallery sequencing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Headline and description quality</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Amenities and interior design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Overall listing strength score</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground text-center">
                You'll get a detailed report showing what's working — and what
                could be costing you bookings. It's fast, free, and built to
                give hosts clarity before they make big changes.
              </p>

              <div className="flex justify-center">
                <Button size="lg" asChild>
                  <Link href="/feedback-genius/analyze">
                    Run My Free Feedback Report
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center pt-4">
                Once you've seen how your own listing scores, you'll know
                whether the next step is optimizing — or analyzing the
                competition.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Market Spy (Paid) */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center space-y-6 mb-12">
              <Badge className="mb-2">Step 2: Paid</Badge>
              <h2 className="text-3xl md:text-5xl font-bold">
                See What's Really Driving Bookings in Your Area
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  Current Occupancy Rates
                </h3>
                <p className="text-muted-foreground ml-9">
                  Who's booked, who's empty, and who's winning
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  Top Performer Leaderboard
                </h3>
                <p className="text-muted-foreground ml-9">
                  Sorted by occupancy and quality
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  Competitive Strength Scores
                </h3>
                <p className="text-muted-foreground ml-9">
                  Photo quality, headline strength, amenities, design
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  Policy Insights
                </h3>
                <p className="text-muted-foreground ml-9">
                  Instant Book, Pets, Cancellation, Self Check-In
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground text-center">
                You'll finally see your real competition — not just who you
                think is competing with you — and understand exactly what
                separates you from the top performers.
              </p>

              <div className="flex justify-center">
                <Button size="lg" asChild>
                  <Link href="/market-spy/analyze">
                    Unlock My Market Report
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">
                From "Why Am I Not Getting Bookings?" to "Now I Get It."
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                STR Market Spy captures live Airbnb data to show you:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-primary">1</div>
                    <h3 className="font-semibold">
                      The occupancy rate of every local competitor
                    </h3>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-primary">2</div>
                    <h3 className="font-semibold">
                      The quality breakdown of each listing
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Photos, text, design, amenities
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-primary">3</div>
                    <h3 className="font-semibold">
                      A summary comparison report
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Highlighting what you're missing
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20 bg-primary/5 max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold">
                    No more guessing. No more "maybe it's the algorithm."
                  </p>
                  <p className="text-muted-foreground">
                    Just clear, actionable insight into your market — updated
                    with real data.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-8">
              <p className="text-muted-foreground mb-4">
                Curious what that looks like in action?
              </p>
              <Button variant="outline" onClick={() => setVideoOpen(true)}>
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch a Quick Demo of STR Market Spy (2 min 30 sec)
              </Button>
            </div>
          </div>
        </section>

        {/* Section 5 - Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Real Hosts, Real Results
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-lg italic">
                      "STR Feedback Genius showed me what to fix in my photos.
                      STR Market Spy showed me who was beating me. Together,
                      they gave me the full picture."
                    </p>
                    <p className="font-semibold">— Maria H., Austin</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-lg italic">
                      "I learned my top competitors were 90% booked with
                      pet-friendly listings. I made the switch, and my calendar
                      filled in two weeks."
                    </p>
                    <p className="font-semibold">— Evan D., Tampa</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 6 - Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">
                Clarity Beats Guesswork — Every Time
              </h2>
              <p className="text-xl text-muted-foreground">
                Stop wondering what's wrong. Start seeing what's real.
              </p>
              <p className="text-lg">
                Check your listing for free, then understand your market like a
                pro.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" asChild>
                  <Link href="/market-spy/analyze">
                    Unlock My Market Report
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/feedback-genius/analyze">
                    Start With Free Listing Feedback
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-12 relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/landing-page-image-bookings-down-01-min.png"
                alt="Market analysis showing competitor occupancy rates"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
