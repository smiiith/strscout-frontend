import { aggregateDescriptionFeedbackData } from "@/lib/seo/aggregate-description-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { DataMethodology } from "@/components/guides/DataMethodology";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  Camera,
  ListChecks,
  ArrowLeft,
  Paintbrush,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Write Airbnb Descriptions That Get Bookings | STR Sage",
  description:
    "Learn how to write compelling Airbnb listing descriptions. Based on AI analysis of thousands of listings with proven formulas and examples.",
  keywords: [
    "airbnb description",
    "vacation rental description",
    "how to write airbnb description",
    "str listing copy",
    "airbnb copywriting",
    "short term rental description",
  ],
  openGraph: {
    title: "How to Write Airbnb Descriptions That Get Bookings",
    description:
      "Master the art of writing compelling Airbnb descriptions with proven formulas and real examples.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-description-writing",
  },
};

export default async function AirbnbDescriptionWritingGuide() {
  const stats = await aggregateDescriptionFeedbackData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Description Writing" },
        ]}
      />

      {/* Enhanced Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Write Airbnb Descriptions That Get Bookings",
            description:
              "Comprehensive guide to writing high-converting Airbnb listing descriptions based on AI analysis.",
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
            datePublished: "2024-01-15T00:00:00Z",
            dateModified: new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.strsage.com/guides/airbnb-description-writing",
            },
            about: {
              "@type": "Thing",
              name: "Copywriting for vacation rentals",
              description: "Techniques for writing compelling short-term rental listing descriptions",
            },
            mentions: [
              {
                "@type": "SoftwareApplication",
                name: "Airbnb",
                applicationCategory: "Vacation Rental Platform",
              },
            ],
            isBasedOn: {
              "@type": "Dataset",
              name: "STR Sage Listing Analysis Database",
              description: `Analysis of ${stats.totalProperties} Airbnb listings with AI-powered description ratings`,
            },
            citation: [
              {
                "@type": "CreativeWork",
                name: "STR Sage Property Database",
                url: "https://www.strsage.com",
              },
            ],
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
              {
                "@type": "ListItem",
                position: 3,
                name: "Airbnb Description Writing",
                item: "https://www.strsage.com/guides/airbnb-description-writing",
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          How to Write Airbnb Descriptions That Get Bookings
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn the proven formulas and techniques for writing compelling
          listing descriptions. Based on AI analysis of real Airbnb listings.
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
                  Average description rating across all properties analyzed
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Rating Distribution:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>⭐ Excellent (90-100):</span>
                    <span className="font-semibold">
                      {Math.round(
                        (stats.ratingDistribution.excellent /
                          stats.totalProperties) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>✅ Good (80-89):</span>
                    <span className="font-semibold">
                      {Math.round(
                        (stats.ratingDistribution.good /
                          stats.totalProperties) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>👍 Satisfactory (70-79):</span>
                    <span className="font-semibold">
                      {Math.round(
                        (stats.ratingDistribution.satisfactory /
                          stats.totalProperties) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>⚠️ Needs Improvement (&lt;70):</span>
                    <span className="font-semibold">
                      {Math.round(
                        (stats.ratingDistribution.needsImprovement /
                          stats.totalProperties) *
                          100
                      )}
                      %
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
            Most Common Description Issues We Find
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {stats.commonFeedbackThemes.slice(0, 8).map((theme, index) => (
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
                        Found in {theme.percentage}% of listings analyzed ( )
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* The AIDA Formula */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          The AIDA Formula for High-Converting Descriptions
        </h2>
        <p className="text-muted-foreground mb-6">
          Professional copywriters use this proven framework to write
          descriptions that convert browsers into bookers.
        </p>

        <div className="space-y-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">👀</span>A - Attention (First 2-3
                Sentences)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Hook readers immediately with your strongest selling point.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p className="font-semibold">Example:</p>
                <p className="italic">
                  "Wake up to breathtaking ocean views from your private balcony
                  in this newly renovated beachfront condo. Located just steps
                  from the sand, this modern retreat offers the perfect blend of
                  luxury and coastal charm."
                </p>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Lead with your best feature (view, location, amenity)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Use vivid, sensory language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Paint a picture of the experience</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">✨</span>I - Interest (The Space
                Section)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Detail what makes your space special and how guests will use it.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Room-by-room walkthrough:</strong> Describe each
                    space and its purpose
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Highlight unique features:</strong> Mention special
                    amenities or design elements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Use specific details:</strong> "King-sized bed with
                    luxury linens" not just "comfortable bed"
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">❤️</span>D - Desire (The Location &
                Lifestyle Section)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Help guests imagine their perfect stay and create emotional
                appeal.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Location benefits:</strong> Walking distance to
                    restaurants, attractions, beach
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Ideal for scenarios:</strong> "Perfect for couples
                    seeking a romantic getaway"
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Local attractions:</strong> Highlight nearby points
                    of interest
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Lifestyle appeal:</strong> Describe the experience,
                    not just the features
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📅</span>A - Action (The Closing)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                End with a clear invitation to book and any important
                information.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
                <p className="font-semibold">Example:</p>
                <p className="italic">
                  "Book your coastal escape today! We're here to make your stay
                  unforgettable. Message us with any questions – we typically
                  respond within an hour."
                </p>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Friendly call to action</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mention your responsiveness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Include house rules positively ("We welcome well-behaved
                    pets")
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What to Include */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What to Include</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  1. Property Highlights
                </h3>
                <p className="text-sm text-muted-foreground">
                  Number of bedrooms and bathrooms, sleeping arrangements,
                  square footage, standout amenities (hot tub, pool, view),
                  recent renovations or upgrades.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  2. Location Benefits
                </h3>
                <p className="text-sm text-muted-foreground">
                  Distance to key attractions, walkability score, neighborhood
                  character, parking availability, public transportation access.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  3. Unique Selling Points
                </h3>
                <p className="text-sm text-muted-foreground">
                  What makes your place different? Historic building,
                  architectural features, themed decor, exclusive amenities,
                  special views.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  4. House Rules (Presented Positively)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Instead of "No smoking," try "We maintain a smoke-free
                  environment." Instead of "No parties," try "Perfect for
                  peaceful getaways and quiet relaxation."
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  5. Local Attractions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Restaurants, shopping, beaches, hiking trails, entertainment
                  venues. Include approximate distances and travel times.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* What to Avoid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What to Avoid</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Generic, Cookie-Cutter Descriptions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Avoid phrases like "cozy apartment" or "great location"
                  without specifics. These could describe any listing anywhere.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ ALL CAPS or Excessive Punctuation!!!
                </h3>
                <p className="text-sm text-muted-foreground">
                  It looks unprofessional and desperate. Use proper
                  capitalization and standard punctuation.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ False Claims or Exaggerations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Don't say "oceanfront" if you're a mile from the beach.
                  Honesty prevents bad reviews and maintains trust.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Negative Language
                </h3>
                <p className="text-sm text-muted-foreground">
                  Focus on what guests CAN do, not what they can't. Frame
                  restrictions positively.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Overly Short Descriptions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Aim for 500-1000 words. Short descriptions suggest you don't
                  care or are hiding something.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Good vs Bad Examples */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Good vs. Bad Examples</h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Example 1: Opening Paragraph</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-red-600 mb-2">
                  ❌ Bad (Generic and vague):
                </p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  "Welcome to our nice apartment in downtown. It's cozy and has
                  everything you need. Great location near everything."
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600 mb-2">
                  ✅ Good (Specific and compelling):
                </p>
                <div className="bg-success/5 border border-success/20 p-3 rounded text-sm">
                  "Welcome to The Metropolitan Loft – a sun-drenched 2BR
                  penthouse with floor-to-ceiling windows and sweeping city
                  views. Located in the heart of downtown's Arts District,
                  you're within a 5-minute walk of 20+ restaurants, the
                  Convention Center, and light rail access."
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example 2: Amenity Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-red-600 mb-2">
                  ❌ Bad (Boring list):
                </p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  "Has WiFi, kitchen, TV, parking."
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600 mb-2">
                  ✅ Good (Descriptive and benefit-focused):
                </p>
                <div className="bg-success/5 border border-success/20 p-3 rounded text-sm">
                  "Stay connected with high-speed fiber WiFi (perfect for remote
                  work). The fully-equipped gourmet kitchen features stainless
                  steel appliances, granite countertops, and everything you need
                  to cook like a chef. Unwind with a 65" Smart TV with Netflix,
                  Hulu, and Disney+. Free dedicated parking spot in secure
                  garage."
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Recommendations */}
      {stats.topSuggestions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Top Recommendations from Our AI Analysis
          </h2>
          <div className="grid gap-4">
            {stats.topSuggestions.slice(0, 6).map((suggestion, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="text-base">{suggestion.suggestion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Data Methodology */}
      <DataMethodology
        totalProperties={stats.totalProperties}
        category="descriptions"
        analysisDetails="Our analysis uses GPT-4o to evaluate listing descriptions using the AIDA framework (Attention, Interest, Desire, Action), assessing clarity, persuasiveness, and conversion potential. Each description receives a rating out of 100 and specific improvement suggestions."
      />

      {/* FAQ Section */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-description-writing"
        faqs={[
          {
            question: "How long should an Airbnb description be?",
            answer: `Based on our analysis of ${stats.totalProperties.toLocaleString()} listings, the ideal Airbnb description is 150-300 words - long enough to provide essential details but short enough to maintain guest attention. Front-load the most important information and use short paragraphs for readability.`,
          },
          {
            question: "What should I include in my Airbnb description?",
            answer:
              "Include: (1) What makes your space unique, (2) Key amenities and features, (3) The neighborhood and nearby attractions with distances, (4) Who the space is perfect for, (5) House rules and important details. Use the AIDA formula: grab Attention with a hook, build Interest with details, create Desire with benefits, and prompt Action with booking encouragement.",
          },
          {
            question: "What is the AIDA formula for Airbnb descriptions?",
            answer:
              "AIDA stands for Attention, Interest, Desire, Action. Start with a compelling hook (Attention), describe your space and amenities (Interest), explain how guests will benefit and feel (Desire), then encourage them to book (Action). This proven copywriting formula significantly improves conversion rates from views to bookings.",
          },
          {
            question: "Should I use bullet points in my Airbnb description?",
            answer:
              "Yes! Bullet points improve readability and help guests quickly scan for key information. Use them for amenities lists, nearby attractions, or house rules. However, start with 2-3 engaging paragraphs before switching to bullets - you want to tell a story first, then provide scannable details.",
          },
          {
            question: "How do I make my Airbnb description stand out?",
            answer:
              "Avoid generic phrases like 'cozy' or 'perfect getaway.' Instead, use specific, vivid details: rather than 'nice kitchen,' say 'chef's kitchen with commercial-grade gas range.' Mention unique experiences guests can only have at your property. Include exact walking distances to attractions (e.g., '5-minute walk to Pike Place Market' not 'close to downtown').",
          },
          {
            question: "Should I mention house rules in my Airbnb description?",
            answer:
              "Yes, but frame them positively and place them toward the end. Instead of 'No parties,' try 'This is a quiet residential building perfect for relaxing getaways.' Always mention critical rules (no smoking, no pets, stairs) upfront to avoid disappointed guests and bad reviews.",
          },
          {
            question: "How often should I update my Airbnb description?",
            answer:
              "Update your description whenever you add new amenities, make improvements, or notice booking rates declining. Also refresh seasonally - highlight AC in summer, fireplace in winter. Test different opening hooks every few months to see what increases your booking conversion rate.",
          },
          {
            question: "What words should I avoid in my Airbnb description?",
            answer:
              "Avoid overused, meaningless words like 'amazing,' 'beautiful,' 'perfect,' 'cozy,' or 'charming' without context. Don't use all caps or excessive exclamation points. Avoid vague claims - instead of 'great location,' specify 'walkable to 15+ restaurants and the Metro station.' Our data shows specific descriptions outperform generic ones significantly.",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want AI-Powered Analysis of Your Description?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized feedback on your Airbnb listing description, plus
              ratings on your title, photos, amenities, and interior design. Our
              AI analyzes every aspect of your listing and provides actionable
              recommendations.
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
                Get AI-powered analysis of your entire Airbnb listing, including
                description, title, photos, and amenities.
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
                Research your competition and see what descriptions
                top-performing listings in your area are using.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
