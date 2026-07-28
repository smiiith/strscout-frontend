import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Star,
  Shield,
  Award,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  Camera,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb Superhost: How to Achieve and Keep It | STR Sage",
  description:
    "Everything you need to know about Airbnb Superhost status — the 4 requirements, how to hit each one, the real benefits, and how to avoid losing it.",
  keywords: [
    "airbnb superhost",
    "how to become airbnb superhost",
    "airbnb superhost requirements",
    "airbnb superhost benefits",
    "airbnb superhost status",
    "airbnb superhost tips",
    "maintain airbnb superhost",
    "how to get superhost on airbnb",
  ],
  openGraph: {
    title: "Airbnb Superhost: How to Achieve and Keep It",
    description:
      "A complete guide to Airbnb Superhost status — requirements, benefits, and a practical system for maintaining it.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-superhost",
  },
};

export default function AirbnbSuperhostGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Superhost Guide" },
        ]}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Airbnb Superhost: How to Achieve and Keep It",
            description:
              "Complete guide to achieving and maintaining Airbnb Superhost status.",
            author: {
              "@type": "Organization",
              name: "STR Sage",
              url: "https://www.strsage.com",
            },
            publisher: {
              "@type": "Organization",
              name: "STR Sage",
              logo: {
                "@type": "ImageObject",
                url: "https://www.strsage.com/logo.png",
                width: 600,
                height: 60,
              },
            },
            datePublished: "2026-05-19T00:00:00Z",
            dateModified: new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.strsage.com/guides/airbnb-superhost",
            },
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.strsage.com" },
              { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.strsage.com/guides" },
              { "@type": "ListItem", position: 3, name: "Airbnb Superhost Guide", item: "https://www.strsage.com/guides/airbnb-superhost" },
            ],
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Airbnb Superhost Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          What Superhost status actually requires, what it's worth, and a
          practical system for achieving and keeping it.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: 5/19/2026
        </p>
      </header>

      {/* What Is Superhost */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Is Airbnb Superhost?</h2>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Superhost is Airbnb's recognition program for hosts who
              consistently deliver exceptional guest experiences. It's assessed
              four times per year — on January 1, April 1, July 1, and October
              1 — based on your performance over the prior 12 months.
            </p>
            <p className="text-muted-foreground text-sm">
              Superhost status is not permanent. You earn it each quarter by
              meeting all four requirements, and lose it if you fall short in
              any one of them during the assessment period.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* The 4 Requirements */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          The 4 Superhost Requirements
        </h2>
        <div className="space-y-4">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                  1
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Overall Rating: 4.8 or Higher
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Your average overall guest rating across all stays in the
                assessment period must be 4.8 or above. This is often the
                hardest requirement to maintain, because a single 3-star review
                can drag down your average significantly if you don't have
                many reviews yet.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-foreground mb-2">
                  How to hit it:
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Nail cleanliness — the most-cited reason for 4-star reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep your listing accurate so guests aren't surprised</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Catch problems mid-stay with a check-in message</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                  2
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    Response Rate: 90% or Higher
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                You must respond to 90% of new messages within 24 hours.
                Airbnb measures this across all message threads from new
                inquiries and reservation requests.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-foreground mb-2">
                  How to hit it:
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Enable push notifications on the Airbnb app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Set up saved messages for common questions (check-in, parking, WiFi)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>If you'll be unavailable for 24+ hours, set an auto-reply or snooze notifications with a note</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Even a "Got your message, will respond shortly" counts as a response</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                  3
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Cancellation Rate: Under 1%
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                You must cancel fewer than 1% of confirmed reservations. In
                practice, for most hosts, this means zero cancellations. If you
                have 100 bookings per year, you can cancel 1 without losing
                Superhost. If you have 20 bookings per year, you effectively
                have zero tolerance.
              </p>
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                      Exceptions
                    </p>
                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                      Cancellations due to extenuating circumstances (natural
                      disasters, serious illness, etc.) and those initiated by
                      the guest don't count against you. Document extenuating
                      circumstances carefully.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-foreground mb-2">
                  How to hit it:
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep your calendar updated to prevent double-bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Sync your Airbnb calendar with other platforms if you list elsewhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Block dates proactively for known unavailability</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                  4
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    Completed Stays: 10+ Trips (or 3+ Reservations Totaling 100+ Nights)
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                You need either 10 completed stays, or 3 completed reservations
                totaling at least 100 nights, in the last 12 months. This
                threshold exists to ensure the rating and response metrics are
                statistically meaningful.
              </p>
              <p>
                For most hosts with regular bookings, this is the easiest
                requirement to meet. For new hosts or those with very long
                stays only, it may be the limiting factor.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          What Superhost Actually Gets You
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-2 bg-amber-500/10 rounded-lg flex-shrink-0">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Superhost Badge on Your Listing</h3>
                  <p className="text-sm text-muted-foreground">
                    Displayed prominently on your listing and profile. Guests
                    actively filter for Superhosts — and Airbnb shows you more
                    often in search results to Superhost-filtered searches.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Search Ranking Boost</h3>
                  <p className="text-sm text-muted-foreground">
                    Airbnb factors Superhost status into search ranking.
                    Combined with your rating and reviews, it consistently puts
                    you ahead of comparable non-Superhost listings.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-2 bg-green-500/10 rounded-lg flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Priority Support from Airbnb
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Superhosts get dedicated support with faster response times.
                    This matters most when something goes wrong — a dispute, a
                    damaged item, or a difficult guest situation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                  <Star className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Travel Coupon (Annual)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Airbnb provides Superhosts an annual $100 travel coupon as a
                    thank-you. A small perk, but a nice acknowledgment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-orange-500/10 rounded-lg flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Guest Trust and Higher Conversion
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Guests are more likely to book a Superhost, especially for
                    larger groups, longer stays, or first-time Airbnb
                    experiences where trust is the primary concern.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common Ways Hosts Lose It */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          How Hosts Lose Superhost Status
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ One Bad Review at Low Volume
              </h3>
              <p className="text-sm text-muted-foreground">
                A single 3-star review when you only have 15 total can push
                your average below 4.8. At low volumes, every rating counts
                more. This is why it's critical to address guest concerns
                proactively.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ Missing a Message During Travel or a Busy Week
              </h3>
              <p className="text-sm text-muted-foreground">
                Response rate is measured precisely. A few missed messages
                during vacation or a busy period can drop you below 90%. Set an
                auto-reply or temporarily pause availability if you'll be
                unreachable.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ A Last-Minute Cancellation
              </h3>
              <p className="text-sm text-muted-foreground">
                Life happens — but canceling a confirmed booking almost always
                counts against you unless Airbnb determines it qualifies as an
                extenuating circumstance. Block dates proactively rather than
                canceling reactively.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ Complacency After Achieving It
              </h3>
              <p className="text-sm text-muted-foreground">
                Superhost isn't a permanent award — it's reassessed every
                quarter. Hosts who relax on cleanliness or response time after
                achieving status can lose it at the next assessment.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Assessment Calendar */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">The Assessment Calendar</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm mb-4">
              Airbnb assesses Superhost status four times per year. Each
              assessment looks at your performance over the prior 12 months.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { date: "January 1", period: "Jan 1 – Dec 31 (prior year)" },
                { date: "April 1", period: "Apr 1 (prior year) – Mar 31" },
                { date: "July 1", period: "Jul 1 (prior year) – Jun 30" },
                { date: "October 1", period: "Oct 1 (prior year) – Sep 30" },
              ].map((item) => (
                <div
                  key={item.date}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{item.date}</p>
                    <p className="text-muted-foreground text-xs">
                      Looks back at: {item.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              You can track your current standing anytime in Airbnb under{" "}
              <strong>Profile → Superhost</strong>. Airbnb shows you exactly
              where you stand on each requirement before the next assessment.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-superhost"
        faqs={[
          {
            question: "How do I become an Airbnb Superhost?",
            answer:
              "Meet all four requirements over a 12-month period: (1) overall guest rating of 4.8 or higher, (2) response rate of 90% or higher, (3) cancellation rate under 1%, and (4) at least 10 completed stays (or 3 stays totaling 100+ nights). Airbnb assesses status four times per year on January 1, April 1, July 1, and October 1.",
          },
          {
            question: "How long does it take to become a Superhost?",
            answer:
              "You're eligible at the first quarterly assessment after you've completed at least 10 stays (or 3 stays totaling 100+ nights) with qualifying ratings, response rate, and cancellation rate. For most new hosts, this means 6–12 months of hosting before the first realistic Superhost assessment.",
          },
          {
            question: "Can I lose Superhost status?",
            answer:
              "Yes. Superhost is reassessed every quarter. If you fall below any of the four thresholds during the assessment period, you lose the status. Common causes: a bad review bringing your average below 4.8, missed messages lowering your response rate, or a cancellation.",
          },
          {
            question: "Does Superhost status affect Airbnb search ranking?",
            answer:
              "Yes. Airbnb's search algorithm factors in Superhost status, and guests can filter specifically for Superhosts. This means you appear more often in relevant searches and attract guests who specifically value demonstrated hosting quality.",
          },
          {
            question: "What happens if a guest cancels — does it affect my Superhost status?",
            answer:
              "Guest-initiated cancellations don't count against you. Only host-initiated cancellations affect your rate. If you need to cancel due to a genuine extenuating circumstance (serious illness, property damage, natural disaster), contact Airbnb to document it — qualifying circumstances are typically excluded from the calculation.",
          },
          {
            question: "My rating dropped below 4.8 — can I recover?",
            answer:
              "Yes. Because the assessment looks at the prior 12 months, new 5-star reviews will gradually pull your average back up. Focus on delivering exceptional stays consistently. If one bad review dragged you down and you're close to the threshold, a few excellent reviews can restore Superhost status at the next quarterly assessment.",
          },
          {
            question: "Is Superhost worth pursuing?",
            answer:
              "Yes, for most active hosts. The search ranking boost, guest trust, and priority support are meaningful practical benefits — not just a badge. Guests who filter for Superhosts are also often more serious and prepared travelers, which means fewer problematic stays.",
          },
          {
            question: "How do I check my current Superhost progress?",
            answer:
              "In the Airbnb app or website, go to Profile → Superhost. Airbnb shows you your current standing on all four metrics and how many days remain before the next assessment. Check this monthly to catch any metrics that are slipping before assessment day.",
          },
        ]}
      />

      {/* Related Guides */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Related Guides</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/guides">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Guides
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Get More Reviews</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Build the reviews that fuel Superhost
                  </p>
                  <Link
                    href="/guides/airbnb-reviews"
                    className="text-xs text-primary hover:underline"
                  >
                    Read Guide →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Camera className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Photo Tips</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Set accurate visual expectations
                  </p>
                  <Link
                    href="/guides/airbnb-photo-tips"
                    className="text-xs text-primary hover:underline"
                  >
                    Read Guide →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Improve Your Rating</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Full listing optimization guide
                  </p>
                  <Link
                    href="/guides/improve-airbnb-rating"
                    className="text-xs text-primary hover:underline"
                  >
                    Read Guide →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Citations */}
      <section className="mt-12 pt-8 border-t">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Sources
        </h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            <a
              href="https://www.airbnb.com/help/article/829"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Airbnb Help Center — What&apos;s required to be a Superhost
            </a>
          </li>
          <li>
            <a
              href="https://www.airbnb.com/help/article/828"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Airbnb Help Center — Understand the Superhost program
            </a>
          </li>
          <li>
            <a
              href="https://www.airbnb.com/help/article/832"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Airbnb Help Center — Maintain Superhost status
            </a>
          </li>
        </ul>
      </section>

      {/* External Resource */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <a
          href="https://shorttermrentalessentials.com/"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 hover:underline"
        >
          <Image
            src="/icons/shorttermrentalessentials-icon.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
          />
          Essential Tools for Short-Term Rental Success
        </a>
      </div>
    </div>
  );
}
