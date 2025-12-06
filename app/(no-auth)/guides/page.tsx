import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Camera, Home, ListChecks, Sparkles, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb & Short-Term Rental Optimization Guides | STR Sage",
  description:
    "Free expert guides to optimize your Airbnb listing. Learn how to improve your title, photos, description, amenities, and more. Based on AI analysis of thousands of listings.",
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
  },
};

const guides = [
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
];

export default function GuidesHub() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Airbnb & Short-Term Rental Optimization Guides",
            description:
              "Comprehensive guides to optimize every aspect of your Airbnb listing",
            publisher: {
              "@type": "Organization",
              name: "STR Sage",
              url: "https://www.strsage.com",
            },
            hasPart: guides
              .filter((g) => g.available)
              .map((guide) => ({
                "@type": "Article",
                headline: guide.title,
                description: guide.description,
                url: `https://www.strsage.com${guide.href}`,
              })),
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
          short-term rental listing. Based on AI analysis of thousands of
          real properties.
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
                          Coming Soon
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
                      Coming Soon
                    </span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want Personalized Feedback on Your Listing?
            </h2>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Our AI analyzes your entire Airbnb listing and provides custom
              recommendations across 6 key categories. Get started for free in
              under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link href="/feedback-genius/analyze">
                  Get Free Analysis
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/pricing">View All Tools</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
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
    </div>
  );
}
