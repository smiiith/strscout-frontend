import { aggregateTitleFeedbackData } from "@/lib/seo/aggregate-title-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { Metadata } from "next";
import { Camera, BookOpen, ListChecks, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb Title Optimization: Expert Tips & Examples | STR Sage",
  description:
    "Learn how to write compelling Airbnb titles that get more bookings. Based on AI analysis of thousands of listings, with real examples and actionable tips.",
  keywords: [
    "airbnb title optimization",
    "airbnb title tips",
    "short term rental title",
    "vacation rental title",
    "airbnb listing title examples",
    "how to write airbnb title",
  ],
  openGraph: {
    title: "Airbnb Title Optimization: Expert Tips & Examples",
    description:
      "Learn how to write compelling Airbnb titles that get more bookings. Based on AI analysis of thousands of listings.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-title-optimization",
  },
};

export default async function AirbnbTitleOptimizationGuide() {
  const stats = await aggregateTitleFeedbackData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Title Optimization" },
        ]}
      />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Airbnb Title Optimization: Expert Tips & Examples",
            description:
              "Comprehensive guide to writing high-converting Airbnb listing titles based on AI analysis.",
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
            datePublished: "2024-01-15",
            dateModified: new Date().toISOString().split("T")[0],
          }),
        }}
      />

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Airbnb Title Optimization: The Complete Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to write compelling titles that get more bookings. Based on
          AI analysis of {stats.totalProperties.toLocaleString()}+ real Airbnb
          listings.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Key Statistics */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>What Our Analysis Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stats.averageRating}/100
                </div>
                <p className="text-sm text-muted-foreground">
                  Average title rating across all properties analyzed
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Rating Distribution:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>⭐ Excellent (90-100):</span>
                    <span className="font-semibold">
                      {stats.ratingDistribution.excellent} listings (
                      {Math.round(
                        (stats.ratingDistribution.excellent /
                          stats.totalProperties) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>✅ Good (80-89):</span>
                    <span className="font-semibold">
                      {stats.ratingDistribution.good} listings (
                      {Math.round(
                        (stats.ratingDistribution.good / stats.totalProperties) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>👍 Satisfactory (70-79):</span>
                    <span className="font-semibold">
                      {stats.ratingDistribution.satisfactory} listings (
                      {Math.round(
                        (stats.ratingDistribution.satisfactory /
                          stats.totalProperties) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>⚠️ Needs Improvement (&lt;70):</span>
                    <span className="font-semibold">
                      {stats.ratingDistribution.needsImprovement} listings (
                      {Math.round(
                        (stats.ratingDistribution.needsImprovement /
                          stats.totalProperties) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common Issues */}
      {stats.commonFeedbackThemes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Most Common Title Issues We Find
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {stats.commonFeedbackThemes.map((theme, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {theme.theme}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Found in {theme.percentage}% of listings analyzed (
                        {theme.count.toLocaleString()} properties)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Top Recommendations */}
      {stats.topSuggestions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Top Recommendations from Our AI Analysis
          </h2>
          <div className="grid gap-4">
            {stats.topSuggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="text-base">{suggestion.suggestion}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended for {suggestion.count.toLocaleString()}{" "}
                        listings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Real Examples */}
      {stats.sampleTitleRewrites.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Real Examples: Before & After
          </h2>
          <p className="text-muted-foreground mb-6">
            See how our AI improved real Airbnb titles to make them more
            compelling and search-friendly.
          </p>
          <div className="space-y-6">
            {stats.sampleTitleRewrites.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Example {index + 1}
                    </CardTitle>
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Original Rating:{" "}
                      </span>
                      <span className="font-semibold">{example.rating}/100</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        ❌ Original Title:
                      </p>
                      <p className="text-base bg-muted/50 p-3 rounded">
                        {example.original}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-success mb-2">
                        ✅ AI-Improved Versions:
                      </p>
                      <div className="space-y-2">
                        {example.rewrites.map((rewrite, idx) => (
                          <p
                            key={idx}
                            className="text-base bg-success/5 border border-success/20 p-3 rounded"
                          >
                            {rewrite}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Best Practices for Airbnb Titles
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  1. Be Descriptive and Specific
                </h3>
                <p className="text-muted-foreground">
                  Instead of "Cozy Apartment," try "Cozy 2BR Downtown Loft with
                  City Views & Parking." Specific details help guests
                  understand what makes your place unique.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  2. Highlight Your Best Feature First
                </h3>
                <p className="text-muted-foreground">
                  Lead with your strongest selling point - whether that's
                  location, amenities, views, or unique character.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  3. Include Location Benefits
                </h3>
                <p className="text-muted-foreground">
                  Mention proximity to attractions, neighborhoods, or key
                  landmarks that guests are searching for.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  4. Target Your Ideal Guest
                </h3>
                <p className="text-muted-foreground">
                  Use words like "Family-Friendly," "Perfect for Business
                  Travelers," or "Romantic Getaway" to attract the right
                  audience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  5. Keep It Under 50 Characters
                </h3>
                <p className="text-muted-foreground">
                  Titles get cut off in search results. Make every word count
                  and front-load the most important information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want AI-Powered Analysis of Your Title?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized feedback on your Airbnb listing title, plus
              ratings on your photos, description, amenities, and interior
              design. Our AI analyzes every aspect of your listing and provides
              actionable recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/feedback-genius/analyze">
                  Analyze My Listing Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

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
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Camera className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">
                    Airbnb Photo Tips
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Master listing photography
                  </p>
                  <Link
                    href="/guides/airbnb-photo-tips"
                    className="text-xs text-primary hover:underline"
                  >
                    Coming Soon →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">
                    Description Writing
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Craft compelling copy
                  </p>
                  <Link
                    href="/guides/airbnb-description-writing"
                    className="text-xs text-primary hover:underline"
                  >
                    Coming Soon →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <ListChecks className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">
                    Amenities Checklist
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Essential amenities guide
                  </p>
                  <Link
                    href="/guides/airbnb-amenities-checklist"
                    className="text-xs text-primary hover:underline"
                  >
                    Coming Soon →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Tools</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">
                <Link
                  href="/feedback-genius"
                  className="hover:text-primary hover:underline"
                >
                  Feedback Genius →
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Get AI-powered analysis of your entire Airbnb listing,
                including title, photos, and description.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">
                <Link
                  href="/market-spy"
                  className="hover:text-primary hover:underline"
                >
                  Market Spy →
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Research your competition and see what top-performing listings
                in your area are doing right.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
