import { aggregateOverallRatingData } from "@/lib/seo/aggregate-overall-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, Camera, BookOpen, ListChecks, Paintbrush, ArrowLeft, TrendingUp, Target, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Improve Your Airbnb Listing Rating: Complete Guide | STR Sage",
  description:
    "Step-by-step guide to improving your Airbnb listing across all categories. Based on AI analysis showing what actually increases bookings.",
  keywords: [
    "improve airbnb listing",
    "optimize airbnb",
    "increase airbnb bookings",
    "airbnb optimization guide",
    "str optimization",
    "airbnb rating improvement",
  ],
  openGraph: {
    title: "How to Improve Your Airbnb Listing Rating: Complete Guide",
    description:
      "Systematic approach to optimizing every aspect of your Airbnb listing for maximum bookings.",
    type: "article",
    url: "https://www.strsage.com/guides/improve-airbnb-rating",
  },
};

export default async function ImproveAirbnbRatingGuide() {
  const stats = await aggregateOverallRatingData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Improve Your Airbnb Rating" },
        ]}
      />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Improve Your Airbnb Listing Rating: Complete Guide",
            description:
              "Comprehensive guide to optimizing every aspect of your Airbnb listing based on AI analysis.",
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
          How to Improve Your Airbnb Listing Rating
        </h1>
        <p className="text-xl text-muted-foreground">
          A complete, systematic guide to optimizing every aspect of your listing.
          Based on AI analysis of {stats.totalProperties.toLocaleString()}+ real
          Airbnb properties.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Overall Statistics */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-4xl font-bold text-primary">
                  {stats.overallAverageRating}/100
                </div>
                <p className="text-muted-foreground">Average Overall Rating</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-4">Category-by-Category Ratings:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Hero Image</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold text-primary">
                      {stats.categoryAverages.heroImage}/100
                    </div>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-green-500/10">
                      Strongest
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Other Images</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {stats.categoryAverages.otherImages}/100
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <ListChecks className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Amenities</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {stats.categoryAverages.amenities}/100
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Title</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {stats.categoryAverages.title}/100
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Description</span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {stats.categoryAverages.description}/100
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Paintbrush className="w-5 h-5 text-pink-500" />
                    <span className="font-medium">Interior Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold text-primary">
                      {stats.categoryAverages.interiorDesign}/100
                    </div>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-orange-500/10">
                      Biggest Opportunity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Start Here Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Start Here: Identify Your Weak Spots
        </h2>
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Before You Optimize Everything...
                </h3>
                <p className="text-muted-foreground mb-4">
                  The most effective approach is to focus on your lowest-scoring
                  categories first. A listing with one 50/100 category and five
                  90/100 categories will perform worse than a listing with all
                  75/100 scores.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-semibold mb-2">📊 Use our free tool to find out:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Which categories are dragging down your listing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Specific improvements AI recommends for each category</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    Comparison to top-performing listings in your area
                  </span>
                </li>
              </ul>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/feedback-genius/analyze">
                    Get Your Free Analysis →
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Category-by-Category Plan */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Category-by-Category Improvement Plan
        </h2>
        <p className="text-muted-foreground mb-6">
          Follow our comprehensive guides to optimize each aspect of your listing.
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div>Title Optimization</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Average rating: {stats.categoryAverages.title}/100
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your title is the first thing guests see in search results. A
                compelling, specific title can increase click-through rates by 40%.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/guides/airbnb-title-optimization"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read the Complete Title Guide →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Camera className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div>Photography & Images</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Average: Hero {stats.categoryAverages.heroImage}/100 | Other{" "}
                    {stats.categoryAverages.otherImages}/100
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Photos determine whether guests click on your listing. Professional
                or well-executed DIY photography is one of the highest-ROI
                investments.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/guides/airbnb-photo-tips"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read the Complete Photo Guide →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div>Description Writing</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Average rating: {stats.categoryAverages.description}/100
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your description converts browsers into bookers. Learn the AIDA
                formula and proven copywriting techniques for STR listings.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/guides/airbnb-description-writing"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read the Complete Description Guide →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <ListChecks className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div>Amenities</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Average rating: {stats.categoryAverages.amenities}/100
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Missing basic amenities hurts bookings. Learn what guests expect,
                what makes you stand out, and how to present amenities effectively.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/guides/airbnb-amenities-checklist"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read the Complete Amenities Guide →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Paintbrush className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <div>Interior Design</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Average rating: {stats.categoryAverages.interiorDesign}/100
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Good design creates Instagram moments and justifies higher rates.
                Learn budget-friendly design hacks that transform spaces.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/guides/str-interior-design-tips"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read the Complete Interior Design Guide →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Quick Wins (Low-Effort, High-Impact)
        </h2>
        <p className="text-muted-foreground mb-6">
          Start with these simple improvements that can be done in a day or less.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                1. Update Your Hero Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Time:</strong> 30 minutes
                <br />
                <strong>Impact:</strong> Massive increase in click-through rate
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Make sure it's your most impressive, well-lit shot
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Show the full space, not just a detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Natural light, no harsh shadows</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                2. Refresh Your Title
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Time:</strong> 15 minutes
                <br />
                <strong>Impact:</strong> Better search visibility
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Lead with your strongest feature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Include location benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Be specific, not generic</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                3. Add Missing Basic Amenities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Time:</strong> 1-2 hours
                <br />
                <strong>Impact:</strong> Prevent guests from filtering you out
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Check WiFi speed is actually fast</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Add coffee maker if missing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Ensure hair dryer is listed and working</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                4. Update Listing Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Time:</strong> 30-60 minutes
                <br />
                <strong>Impact:</strong> Better conversion from views to bookings
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use the AIDA formula (see description guide)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Add specific details, not generic phrases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mention local attractions with distances</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The 80/20 Rule */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          The 80/20 Rule for Airbnb Optimization
        </h2>
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-2">
                  80% of your results come from 20% of your efforts
                </p>
                <p className="text-muted-foreground mb-4">
                  Our analysis shows that focusing on these three areas delivers
                  the biggest impact on bookings:
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h3 className="font-semibold mb-1">
                    Photos (Especially the Hero Image)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your hero image has the single biggest impact on click-through
                    rate. If you can only improve one thing, make it your photos.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h3 className="font-semibold mb-1">
                    Title (First Impression in Search)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A specific, benefit-focused title gets more clicks than generic
                    ones. This takes 15 minutes to fix and costs nothing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h3 className="font-semibold mb-1">
                    Basic Amenities (Don't Get Filtered Out)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Missing WiFi, coffee maker, or other basics means guests will
                    never see your listing in their search results.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-background rounded-lg border">
              <p className="text-sm">
                <strong>Strategy:</strong> Perfect these three first, then move on
                to description and interior design improvements.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Top Overall Suggestions */}
      {stats.topSuggestions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Top Overall Recommendations from Our AI
          </h2>
          <div className="grid gap-4">
            {stats.topSuggestions.slice(0, 8).map((suggestion, index) => (
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

      {/* CTA Section */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Get Your Personalized Improvement Plan
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI analyzes your entire listing across all 6 categories and
              provides specific, actionable recommendations. Find out exactly what
              to fix first for maximum impact on bookings.
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
          <h2 className="text-2xl font-bold">All Our Guides</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/guides">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Guides Hub
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Title Optimization</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Write compelling titles
                  </p>
                  <Link
                    href="/guides/airbnb-title-optimization"
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
                    Master listing photography
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
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Description Writing</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Craft compelling copy
                  </p>
                  <Link
                    href="/guides/airbnb-description-writing"
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
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <ListChecks className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Amenities Checklist</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Essential amenities guide
                  </p>
                  <Link
                    href="/guides/airbnb-amenities-checklist"
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
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Paintbrush className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Interior Design</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Create Instagram-worthy spaces
                  </p>
                  <Link
                    href="/guides/str-interior-design-tips"
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
                Get AI-powered analysis of your entire Airbnb listing with ratings
                and recommendations across all 6 categories.
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
                Research your competition and see what top-performing listings in
                your area are doing right.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
