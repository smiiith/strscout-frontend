import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Camera,
  DollarSign,
  Home,
  ListChecks,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb & Short-Term Rental Optimization Guides | STR Sage",
  description:
    "Free expert guides to optimize your Airbnb listing. Improve titles, photos, descriptions, amenities and more. AI-powered insights from thousands of listings.",
  keywords: [
    "airbnb optimization",
    "airbnb tips",
    "short term rental guide",
    "vacation rental tips",
    "str optimization",
    "airbnb host tips",
  ],
  openGraph: {
    title: "Airbnb & Short-Term Rental Optimization Guides",
    description:
      "Free expert guides to optimize your Airbnb listing and increase bookings.",
    type: "website",
    url: "https://www.strsage.com/guides",
    images: [
      {
        url: "https://www.strsage.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "STR Sage - Airbnb Optimization Guides",
      },
    ],
  },
};

const guides = [
  {
    title: "Understanding Airbnb Host Fees",
    description:
      "Complete breakdown of Airbnb's fee structures. Learn about Split Fee vs Single Fee and how to minimize your hosting costs.",
    href: "/guides/airbnb-fees",
    icon: DollarSign,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    available: true,
  },
  {
    title: "Airbnb Title Optimization",
    description:
      "Learn how to write compelling titles that get more clicks and bookings. Includes real examples and AI-powered recommendations.",
    href: "/guides/airbnb-title-optimization",
    icon: Sparkles,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    available: true,
  },
  {
    title: "Airbnb Photo Tips & Best Practices",
    description:
      "Master photography for your listing. Learn lighting, composition, and what images convert browsers into bookers.",
    href: "/guides/airbnb-photo-tips",
    icon: Camera,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    available: true,
  },
  {
    title: "Essential Airbnb Amenities Checklist",
    description:
      "Discover which amenities guests expect and which ones make your listing stand out from the competition.",
    href: "/guides/airbnb-amenities-checklist",
    icon: ListChecks,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    available: true,
  },
  {
    title: "Writing High-Converting Descriptions",
    description:
      "Craft descriptions that sell. Learn the proven formula for turning readers into guests.",
    href: "/guides/airbnb-description-writing",
    icon: BookOpen,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    available: true,
  },
  {
    title: "STR Interior Design Tips",
    description:
      "Create an Instagram-worthy space that commands premium prices and 5-star reviews.",
    href: "/guides/str-interior-design-tips",
    icon: Home,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    available: true,
  },
  {
    title: "How to Improve Your Overall Rating",
    description:
      "Strategic approach to boosting your listing's performance across all categories. Start here if you're new.",
    href: "/guides/improve-airbnb-rating",
    icon: TrendingUp,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    available: true,
  },
  {
    title: "Airbnb Pricing Strategy",
    description:
      "How to set nightly rates that maximize revenue — dynamic pricing tools, seasonality, discounts, and how to read your occupancy signal.",
    href: "/guides/airbnb-pricing-strategy",
    icon: TrendingUp,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    available: true,
  },
  {
    title: "How to Get More 5-Star Reviews",
    description:
      "A practical system for earning more reviews — check-in experience, communication, surprise-and-delight, and handling the occasional bad one.",
    href: "/guides/airbnb-reviews",
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    available: true,
  },
  {
    title: "Airbnb Superhost Guide",
    description:
      "The 4 requirements explained, what Superhost is actually worth, and a practical system for achieving and keeping the badge.",
    href: "/guides/airbnb-superhost",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    available: true,
  },
];

export default function GuidesHub() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Enhanced CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Airbnb & Short-Term Rental Optimization Guides",
            description:
              "Comprehensive collection of free, data-driven guides to optimize every aspect of your Airbnb and short-term rental listing for maximum bookings and revenue",
            url: "https://www.strsage.com/guides",
            publisher: {
              "@type": "Organization",
              name: "STR Sage",
              url: "https://www.strsage.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.strsage.com/logo.png",
                width: 600,
                height: 60,
              },
            },
            isPartOf: {
              "@type": "WebSite",
              name: "STR Sage",
              url: "https://www.strsage.com",
            },
            about: {
              "@type": "Thing",
              name: "Short-term rental optimization",
              description:
                "Comprehensive guides for optimizing vacation rental and Airbnb listings",
            },
            hasPart: guides
              .filter((g) => g.available)
              .map((guide) => ({
                "@type": "Article",
                headline: guide.title,
                description: guide.description,
                url: `https://www.strsage.com${guide.href}`,
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
                  },
                },
              })),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: guides
                .filter((g) => g.available)
                .map((guide, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "HowTo",
                    name: guide.title,
                    description: guide.description,
                    url: `https://www.strsage.com${guide.href}`,
                  },
                })),
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.strsage.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Guides",
                item: "https://www.strsage.com/guides",
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Airbnb Optimization Guides
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Free, expert guides to help you optimize every aspect of your
          short-term rental listing. Based on AI analysis of thousands of real
          properties.
        </p>
      </header>

      {/* Value Proposition */}
      <section className="mb-12">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  1000+
                </div>
                <p className="text-sm text-muted-foreground">
                  Listings Analyzed
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  AI-Powered
                </div>
                <p className="text-sm text-muted-foreground">
                  Data-Driven Insights
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">Free</div>
                <p className="text-sm text-muted-foreground">
                  No Sign-Up Required
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Guides Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse All Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <Card
                key={index}
                className={
                  guide.available
                    ? "hover:shadow-lg transition-shadow"
                    : "opacity-60"
                }
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg ${guide.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${guide.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {guide.title}
                      </CardTitle>
                      {!guide.available && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded">
                          Read Guide
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  {guide.available ? (
                    <Link
                      href={guide.href}
                      className="inline-flex items-center text-primary hover:underline font-semibold"
                    >
                      Read {guide.title} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Read Guide
                    </span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ / Why Trust Us */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Trust Our Guides?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Every recommendation is backed by machine learning analysis of
                real listing data, not just opinions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-sm text-muted-foreground">
                We analyze thousands of listings to identify patterns and best
                practices that actually work.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Actionable Tips</h3>
              <p className="text-sm text-muted-foreground">
                No fluff. Every guide provides specific, practical steps you can
                implement today.
              </p>
            </CardContent>
          </Card>
        </div>
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
