import { aggregateAmenitiesFeedbackData } from "@/lib/seo/aggregate-amenities-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { DataMethodology } from "@/components/guides/DataMethodology";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, Camera, BookOpen, ArrowLeft, CheckCircle2, Circle } from "lucide-react";

export const metadata: Metadata = {
  title: "Essential Airbnb Amenities Checklist: What Guests Expect | STR Sage",
  description:
    "Must-have and nice-to-have amenities for your Airbnb. AI analysis of thousands of properties shows what increases bookings and satisfaction.",
  keywords: [
    "airbnb amenities checklist",
    "airbnb amenities list",
    "vacation rental amenities",
    "str amenities",
    "what amenities to offer airbnb",
    "airbnb must have amenities",
  ],
  openGraph: {
    title: "Essential Airbnb Amenities Checklist: What Guests Expect",
    description:
      "Complete guide to amenities that increase bookings. Learn what guests expect and what makes your listing stand out.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-amenities-checklist",
    images: [
      {
        url: "https://www.strsage.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "STR Sage - Airbnb Amenities Checklist",
      },
    ],
  },
};

export default async function AirbnbAmenitiesChecklistGuide() {
  const stats = await aggregateAmenitiesFeedbackData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Amenities Checklist" },
        ]}
      />

      {/* Enhanced Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Essential Airbnb Amenities Checklist",
            description:
              "Comprehensive checklist of amenities for short-term rentals based on AI analysis.",
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
              "@id": "https://www.strsage.com/guides/airbnb-amenities-checklist",
            },
            about: {
              "@type": "Thing",
              name: "Vacation rental amenities",
              description: "Essential and recommended amenities for short-term rental properties",
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
              description: `Analysis of ${stats.totalProperties} Airbnb listings with AI-powered amenities ratings`,
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
                name: "Airbnb Amenities Checklist",
                item: "https://www.strsage.com/guides/airbnb-amenities-checklist",
              },
            ],
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Essential Airbnb Amenities Checklist
        </h1>
        <p className="text-xl text-muted-foreground">
          Complete guide to amenities that guests expect and features that make
          your listing stand out. Based on analysis of{" "}
          properties.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Statistics */}
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
                <p className="text-sm text-muted-foreground mb-4">
                  Average amenities rating across all properties
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
                        (stats.ratingDistribution.good / stats.totalProperties) *
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Must-Have Amenities */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Must-Have Amenities (The Basics)
        </h2>
        <p className="text-muted-foreground mb-6">
          These are essential amenities that guests expect in every listing.
          Missing any of these will hurt your bookings.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kitchen Essentials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Refrigerator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Microwave</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Stove/Oven (or cooking equipment)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Coffee maker</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Basic cookware and utensils</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Dishes and glassware</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bathroom Basics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Clean towels (1 per guest minimum)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Toilet paper (extra rolls)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Shampoo and conditioner</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Body wash or bar soap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Hair dryer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Shower/bathtub</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bedroom Essentials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Clean bed linens and pillowcases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Extra pillows and blankets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Hangers in closet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Blackout curtains or blinds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Bedside lamps/lighting</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Climate & Comfort</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Heating (essential in cold climates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Air conditioning or fans (warm climates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>WiFi (fast and reliable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>TV with streaming services</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nice-to-Have Amenities */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Nice-to-Have Amenities (Stand Out From Competition)
        </h2>
        <p className="text-muted-foreground mb-6">
          These amenities aren't required but significantly increase your
          appeal and allow you to charge higher rates.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Convenience Boosters</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>In-unit washer and dryer</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Dishwasher</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Iron and ironing board</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Luggage storage space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Self check-in with keypad/lockbox</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Work & Entertainment</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Dedicated workspace with desk</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Ergonomic office chair</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Smart TV with Netflix/streaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Board games or books</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Bluetooth speaker</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Outdoor & Parking</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Free parking on premises</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Patio or balcony</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Outdoor furniture</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Grill or BBQ</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Garden or yard access</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Family-Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Pack 'n play or crib</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>High chair</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Children's books and toys</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Baby gates or safety equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Children's dishware</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Premium Amenities */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Premium Amenities (Luxury Differentiators)
        </h2>
        <p className="text-muted-foreground mb-6">
          High-end amenities that justify premium pricing and attract discerning
          guests.
        </p>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Spa & Wellness</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Hot tub or jacuzzi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Sauna or steam room
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Pool (indoor or outdoor)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Massage chair
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Entertainment</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Home theater system
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Game room with pool table
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Gym or fitness equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Piano or musical instruments
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Exclusive Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Waterfront or beach access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Private entrance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    Concierge service
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✦</span>
                    EV charging station
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common Feedback */}
      {stats.commonFeedbackThemes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            What Our AI Analysis Found
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {stats.commonFeedbackThemes.slice(0, 6).map((theme, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{theme.theme}</h3>
                      <p className="text-sm text-muted-foreground">
                        Found in {theme.percentage}% of listings
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Top Suggestions */}
      {stats.topSuggestions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Top Recommendations to Improve Your Amenities
          </h2>
          <div className="grid gap-4">
            {stats.topSuggestions.slice(0, 6).map((suggestion, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div className="flex-1">
                      <p className="text-base mb-1">{suggestion.suggestion}</p>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Pro Tips */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Pro Tips for Amenities</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  1. Quality Over Quantity
                </h3>
                <p className="text-sm text-muted-foreground">
                  It's better to have 15 high-quality, well-maintained amenities
                  than 30 mediocre ones. Invest in quality basics before adding
                  extras.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  2. Know Your Target Guest
                </h3>
                <p className="text-sm text-muted-foreground">
                  Business travelers need workspace and fast WiFi. Families need
                  cribs and high chairs. Beach properties need outdoor showers.
                  Tailor amenities to your audience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  3. Check Your Competition
                </h3>
                <p className="text-sm text-muted-foreground">
                  Research what similar listings in your area offer. Match their
                  basics and find one unique amenity to differentiate yourself.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  4. Highlight Amenities in Your Listing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Don't just check boxes - mention key amenities in your title
                  and description. "Downtown Loft with Free Parking & Gym" beats
                  "Downtown Loft."
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  5. Maintain Everything Meticulously
                </h3>
                <p className="text-sm text-muted-foreground">
                  A broken coffee maker or weak WiFi will earn you bad reviews.
                  Test all amenities before every guest arrival.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Data Methodology */}
      <DataMethodology
        totalProperties={stats.totalProperties}
        category="amenities"
        analysisDetails="Our analysis uses GPT-4o to evaluate listing amenities against guest expectations, comparing offerings to top-performing properties in each market. Each listing receives a rating out of 100 based on completeness, quality, and competitive positioning."
      />

      {/* FAQ Section */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-amenities-checklist"
        faqs={[
          {
            question: "What are the most important amenities for an Airbnb?",
            answer: `Based on our analysis of ${stats.totalProperties.toLocaleString()} listings, the essential amenities are: WiFi, heating/AC, hot water, clean linens and towels, basic toiletries, coffee maker, and kitchen basics. Missing any of these significantly hurts bookings as guests filter by these amenities when searching.`,
          },
          {
            question: "Should I provide WiFi in my Airbnb?",
            answer:
              "Yes, WiFi is absolutely essential. Nearly 100% of guests expect reliable, fast internet. Many guests filter search results to only show properties with WiFi. Test your speed regularly and provide the password prominently in your listing and welcome materials.",
          },
          {
            question: "What kitchen amenities should I provide in my Airbnb?",
            answer:
              "At minimum: coffee maker, microwave, basic cookware and utensils, dishes and glasses, dish soap, and trash bags. Nice-to-haves include: toaster, blender, wine opener, cutting board, cooking oil and basic spices. A fully equipped kitchen justifies higher nightly rates.",
          },
          {
            question: "Do I need to provide toiletries at my Airbnb?",
            answer:
              "Yes, basic toiletries are expected: shampoo, conditioner, body wash, and hand soap for the first few days. Many hosts also provide extras like lotion, q-tips, and makeup remover wipes. These small touches improve reviews and justify premium pricing.",
          },
          {
            question: "What amenities increase Airbnb bookings the most?",
            answer:
              "High-impact amenities include: fast WiFi, washer/dryer, parking (especially in cities), air conditioning, dedicated workspace, and outdoor space. Unique amenities like hot tubs, fire pits, or game rooms can command 20-40% higher nightly rates in the right markets.",
          },
          {
            question: "Should I offer free parking at my Airbnb?",
            answer:
              "If you're in a city or area where parking is scarce, free parking is a huge differentiator. Many guests filter specifically for parking. Even in suburban areas, convenient, safe parking improves guest experience and reviews. Clearly state parking details in your listing.",
          },
          {
            question: "What cleaning supplies should I leave for Airbnb guests?",
            answer:
              "Provide: dish soap, sponges, trash bags, paper towels, and basic cleaning spray. Some hosts also leave laundry detergent (especially for longer stays) and extra toilet paper. Guests appreciate being able to maintain cleanliness during their stay.",
          },
          {
            question: "Do I need a washer and dryer for my Airbnb?",
            answer:
              "While not essential for short stays, washer/dryer access significantly increases bookings for stays over 4-5 nights. It's one of the most frequently filtered amenities. If you can't provide in-unit, mention nearby laundromat access in your listing.",
          },
        ]}
      />

      {/* CTA */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Get AI-Powered Analysis of Your Amenities
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI evaluates your amenities and compares them to
              top-performing listings. Get specific recommendations on what to
              add, remove, or improve.
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
                amenities, photos, and description.
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
                See what amenities top-performing listings in your area offer
                and how you compare.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
