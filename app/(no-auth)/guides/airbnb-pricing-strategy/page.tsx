import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  TrendingUp,
  DollarSign,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  BarChart2,
  Zap,
  Calendar,
  Camera,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb Pricing Strategy: How to Price Your Listing | STR Sage",
  description:
    "Learn how to price your Airbnb listing to maximize revenue. Covers dynamic pricing, seasonality, cleaning fees, discounts, and the best tools for STR hosts.",
  keywords: [
    "airbnb pricing strategy",
    "how to price airbnb",
    "airbnb dynamic pricing",
    "pricelabs airbnb",
    "airbnb pricing tips",
    "short term rental pricing",
    "airbnb smart pricing",
    "vacation rental pricing",
    "airbnb rates",
    "how much to charge airbnb",
  ],
  openGraph: {
    title: "Airbnb Pricing Strategy: How to Price Your Listing",
    description:
      "A complete guide to pricing your Airbnb listing for maximum revenue — dynamic tools, seasonality, discounts, and common mistakes.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-pricing-strategy",
  },
};

export default function AirbnbPricingStrategyGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Pricing Strategy" },
        ]}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Airbnb Pricing Strategy: How to Price Your Listing",
            description:
              "Complete guide to pricing your short-term rental for maximum revenue.",
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
              "@id": "https://www.strsage.com/guides/airbnb-pricing-strategy",
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
              { "@type": "ListItem", position: 3, name: "Airbnb Pricing Strategy", item: "https://www.strsage.com/guides/airbnb-pricing-strategy" },
            ],
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Airbnb Pricing Strategy Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          How to set rates that maximize revenue — not just occupancy. Covers
          dynamic pricing, seasonality, discounts, and the tools that do the
          heavy lifting.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: 5/19/2026
        </p>
      </header>

      {/* The Core Trade-Off */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Occupancy vs. Rate: The Core Trade-Off
        </h2>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              The goal is <strong>maximum revenue</strong>, not maximum
              occupancy. A calendar that's 70% booked at $200/night outperforms
              one that's 90% booked at $130/night.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-background rounded-lg p-4 border">
                <p className="font-semibold mb-1">Scenario A</p>
                <p className="text-sm text-muted-foreground">
                  70% occupancy × $200 × 30 days ={" "}
                  <strong className="text-primary">$4,200/mo</strong>
                </p>
              </div>
              <div className="bg-background rounded-lg p-4 border">
                <p className="font-semibold mb-1">Scenario B</p>
                <p className="text-sm text-muted-foreground">
                  90% occupancy × $130 × 30 days ={" "}
                  <strong className="text-muted-foreground">$3,510/mo</strong>
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Chasing 100% occupancy is a sign of under-pricing. If you're
              consistently fully booked weeks in advance, raise your rates.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Setting Your Base Price */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Setting Your Base Price</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" />
                1. Research Comparable Listings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Search Airbnb for properties similar to yours (same
                neighborhood, bedroom count, room type) and note the nightly
                rates for the next 30–60 days. Focus on listings with reviews
                (meaning they actually book) rather than aspirational prices
                from empty calendars.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-sm">
                <p className="font-semibold mb-1">Shortcut:</p>
                <p className="text-muted-foreground">
                  Use{" "}
                  <Link
                    href="/market-spy/analyze"
                    className="text-primary hover:underline"
                  >
                    Market Spy
                  </Link>{" "}
                  to pull comp pricing data automatically — it shows what
                  similar listings in your area are actually charging and their
                  occupancy rates.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                2. Use Occupancy as Your Signal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Treat your occupancy rate as a real-time pricing thermometer.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200">Booked out 3+ weeks in advance?</p>
                    <p className="text-muted-foreground">Raise your rates by 10–15%. You're leaving money on the table.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-800 dark:text-amber-200">Under 60% booked for the next 2 weeks?</p>
                    <p className="text-muted-foreground">Lower rates by 10–20% or add a last-minute discount to fill gaps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Steady 70–80% with healthy lead time?</p>
                    <p className="text-muted-foreground">You're in the sweet spot. Fine-tune seasonally.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dynamic Pricing Tools */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Dynamic Pricing Tools</h2>
        <p className="text-muted-foreground mb-6">
          Manual pricing can't keep up with real-time demand signals — local
          events, competitor availability, booking pace. These tools automate
          the heavy lifting.
        </p>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PriceLabs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                The most popular tool among serious STR hosts. Highly
                customizable with granular controls for minimum prices,
                seasonality, day-of-week adjustments, and last-minute
                discounts. Syncs directly with Airbnb.
              </p>
              <p>
                <strong>Cost:</strong> $19.99/listing/month (US, UK, Canada,
                Europe, Australia); drops to $9.99 for listings 2–9, $8.99
                for 10–19. Also available at 1% of revenue.
              </p>
              <p>
                <strong>Best for:</strong> Hosts who want control and are
                willing to invest time in setup
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Wheelhouse</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                Strong market data and a clean interface. Good for hosts who
                want intelligent defaults without deep configuration. Offers a
                portfolio view for multi-property hosts.
              </p>
              <p>
                <strong>Cost:</strong> Free plan available. Pro Flex: 1% of
                revenue ($2.99/month minimum). Pro Flat: $19.99/listing/month
                ($16.99 for 10–49 listings).
              </p>
              <p>
                <strong>Best for:</strong> Hosts who want a simpler setup with
                solid data — the free plan is a good starting point
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Beyond</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                Originally focused on dynamic pricing, Beyond has expanded into
                a full revenue management platform. Well-suited for hosts using
                a PMS alongside Airbnb.
              </p>
              <p>
                <strong>Cost:</strong> 1–1.25% of booking revenue (no flat-fee
                option)
              </p>
              <p>
                <strong>Best for:</strong> Hosts with multiple properties or
                PMS integrations
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Airbnb Smart Pricing — Use With Caution
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="text-muted-foreground">
                Airbnb's built-in Smart Pricing optimizes for{" "}
                <strong>booking volume</strong> (good for Airbnb's revenue),
                not necessarily your revenue. Most experienced hosts use it
                only to set a minimum price floor, relying on a third-party
                tool for the actual rates.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Discounts & Special Rates */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Discounts and Special Rates
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
                Weekly and Monthly Discounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Longer stays reduce turnover costs (cleaning, communication,
                re-listing) and smooth out income. Offering a discount is often
                worth it.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Weekly discount (7+ nights):</strong> 10–20% is
                    typical. Calculate based on your cleaning fee — a $150
                    cleaning fee spread over 7 nights is $21/night, so the
                    discount pays for itself in reduced turns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Monthly discount (28+ nights):</strong> 30–40% is
                    common. Monthly guests are low-maintenance and consistent —
                    the discount is usually worth the stability.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                Last-Minute Discounts
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                An empty night earns $0. A discounted night earns something.
                Set a last-minute discount of 10–20% for bookings within 3–7
                days to fill gaps without permanently lowering your rate.
              </p>
              <p>
                Most dynamic pricing tools handle this automatically. If doing
                it manually in Airbnb, go to{" "}
                <strong>
                  Calendar → Pricing → Last-minute pricing discount
                </strong>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
                Cleaning Fee Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                A high cleaning fee hurts conversion on short stays and makes
                your listing look expensive at first glance. A few approaches:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Keep the cleaning fee close to your actual cost. Padding it
                    as a profit center turns off price-sensitive guests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Set a higher minimum night stay if your cleaning fee is
                    high — a 2-night minimum makes a $100 fee feel reasonable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Check competitor cleaning fees in your market. Being
                    significantly higher than comps will hurt you in total price
                    comparisons.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Seasonality */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Pricing for Seasonality</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground">
              Every market has demand patterns. Understanding yours lets you
              charge peak rates when guests are willing to pay and stay
              competitive in slow periods.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">When to Raise Rates</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Peak travel season for your market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Local events (festivals, conferences, sports)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Holidays and long weekends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Weekends vs. weekdays in most markets</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">When to Lower Rates</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Off-season or shoulder season</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Midweek gaps that need filling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Last-minute availability windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>When competitors drop prices</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              <p className="font-semibold mb-1">Tip:</p>
              <p className="text-muted-foreground">
                Look up the events calendar for your city and manually block
                higher prices for those dates 6–12 months out. Dynamic tools
                often lag on hyper-local events.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Common Pricing Mistakes</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ Setting One Price and Forgetting It
              </h3>
              <p className="text-sm text-muted-foreground">
                A static price ignores seasonality, local events, and
                competitor changes. Even without a tool, review your pricing
                monthly.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ Trusting Smart Pricing as Your Only Strategy
              </h3>
              <p className="text-sm text-muted-foreground">
                Airbnb's Smart Pricing prioritizes bookings over your revenue.
                Set a meaningful minimum price and consider a third-party tool.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ Pricing Without Knowing Your Comps
              </h3>
              <p className="text-sm text-muted-foreground">
                Your price only exists in relation to alternatives guests can
                see. Know what similar listings in your area charge before
                setting rates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-red-600">
                ❌ Ignoring Your Cost Floor
              </h3>
              <p className="text-sm text-muted-foreground">
                Know your break-even rate (mortgage/rent + utilities + cleaning
                + Airbnb fees). Never price below this, even for last-minute
                discounts.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-pricing-strategy"
        faqs={[
          {
            question: "How much should I charge for my Airbnb?",
            answer:
              "Start by researching comparable listings in your area — similar bedroom count, room type, and neighborhood — and note their rates for the next 30 days. Set your base price at the midpoint of the range and adjust based on your occupancy. If you're filling up fast, raise rates. If you have open nights, lower them. Use a tool like PriceLabs to automate this over time.",
          },
          {
            question: "Should I use Airbnb's Smart Pricing?",
            answer:
              "Use it only to set a minimum price floor. Smart Pricing optimizes for booking volume (Airbnb's interest), not your revenue. Most experienced hosts set a minimum rate they'll accept and use a third-party tool like PriceLabs or Wheelhouse for the actual dynamic pricing.",
          },
          {
            question: "What is a good occupancy rate for Airbnb?",
            answer:
              "A healthy occupancy rate is typically 65–80%. Above 80% consistently means you're likely under-priced — try raising rates. Below 60% over an extended period suggests pricing is too high, listing quality is an issue, or the market is soft. Use occupancy as a signal to adjust, not a target to maximize.",
          },
          {
            question: "How much should I charge for a cleaning fee?",
            answer:
              "Set your cleaning fee close to your actual cleaning cost. Padding it as a profit center increases total booking price and hurts your conversion rate, especially on short stays. If your cleaning costs are high, consider raising your nightly rate and lowering the cleaning fee, or setting a 2-night minimum stay.",
          },
          {
            question: "Should I offer weekly and monthly discounts?",
            answer:
              "Yes, in most cases. Longer stays reduce your cost per night (fewer turns, less communication overhead). A weekly discount of 10–20% and monthly discount of 30–40% is standard. Calculate whether the discount is worth it by factoring in your cleaning fee savings from fewer turnovers.",
          },
          {
            question: "What's the best dynamic pricing tool for Airbnb?",
            answer:
              "PriceLabs is the most popular choice for hosts who want detailed control. Wheelhouse has an easier setup. Beyond works well for hosts using a PMS. Start with one and give it 60–90 days before evaluating — pricing tools need time to calibrate to your specific market.",
          },
          {
            question: "How do I price for local events?",
            answer:
              "Research your city's event calendar 6–12 months out. Major events (conferences, festivals, sporting events) can push demand 3–5x normal. Manually set higher rates for those dates in your calendar before your dynamic pricing tool catches up. Most tools lag on hyper-local event data.",
          },
          {
            question: "How do I know if my Airbnb is priced too high?",
            answer:
              "Signs of over-pricing: low views on your listing, few inquiries, large chunks of open calendar 2–4 weeks out, and occupancy consistently below 60%. Compare your price to actively booked competitors. If they're cheaper with similar listings, you're likely priced out of range.",
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
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Airbnb Host Fees</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Understand your cost structure
                  </p>
                  <Link
                    href="/guides/airbnb-fees"
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
                    Justify premium pricing
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
                    Optimize your full listing
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
              href="https://hello.pricelabs.co/plans/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              PriceLabs — Pricing Plans
            </a>
          </li>
          <li>
            <a
              href="https://www.usewheelhouse.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Wheelhouse — Plans &amp; Pricing
            </a>
          </li>
          <li>
            <a
              href="https://beyondpricing.com/plans"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Beyond — Pricing Plans
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
