import { aggregatePhotoFeedbackData } from "@/lib/seo/aggregate-photo-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { DataMethodology } from "@/components/guides/DataMethodology";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  BookOpen,
  ListChecks,
  ArrowLeft,
  Camera,
  Lightbulb,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb Photo Tips: Professional Photography Guide | STR Sage",
  description:
    "Master Airbnb photography with expert tips on lighting, composition, and staging. AI analysis shows what increases bookings and attracts guests.",
  keywords: [
    "airbnb photo tips",
    "vacation rental photography",
    "airbnb listing photos",
    "str photography tips",
    "airbnb photography guide",
    "how to photograph airbnb",
    "listing photo ideas",
  ],
  openGraph: {
    title: "Airbnb Photo Tips: Professional Photography Guide",
    description:
      "Learn how to take professional-quality photos that increase bookings. Expert tips backed by AI analysis.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-photo-tips",
    images: [
      {
        url: "https://www.strsage.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "STR Sage - Airbnb Photo Tips",
      },
    ],
  },
};

export default async function AirbnbPhotoTipsGuide() {
  const stats = await aggregatePhotoFeedbackData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Photo Tips" },
        ]}
      />

      {/* Schema.org JSON-LD - Enhanced Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Airbnb Photo Tips: Professional Photography Guide",
            description:
              "Comprehensive guide to taking professional-quality Airbnb listing photos based on AI analysis.",
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
              "@id": "https://www.strsage.com/guides/airbnb-photo-tips",
            },
            about: {
              "@type": "Thing",
              name: "Vacation rental photography",
              description:
                "Techniques and best practices for photographing short-term rental properties",
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
              description: `Analysis of ${stats.totalProperties} Airbnb listings with AI-powered photo ratings`,
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
                name: "Airbnb Photo Tips",
                item: "https://www.strsage.com/guides/airbnb-photo-tips",
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Airbnb Photo Tips Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Master listing photography with professional tips on lighting,
          composition, and staging. Based on AI analysis of real Airbnb
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
                <h3 className="font-semibold mb-3">Hero Image Performance</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stats.heroImageStats.averageRating}/100
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Average rating for main listing photos
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>⭐ Excellent (90-100):</span>
                    <span className="font-semibold">
                      {Math.round(
                        (stats.heroImageStats.ratingDistribution.excellent /
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
                        (stats.heroImageStats.ratingDistribution.good /
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
                        (stats.heroImageStats.ratingDistribution.satisfactory /
                          stats.totalProperties) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  Additional Photos Performance
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stats.otherImagesStats.averageRating}/100
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Average rating for supporting photos
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>⭐ Excellent (90-100):</span>
                    <span className="font-semibold">
                      {Math.round(
                        (stats.otherImagesStats.ratingDistribution.excellent /
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
                        (stats.otherImagesStats.ratingDistribution.good /
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
                        (stats.otherImagesStats.ratingDistribution
                          .satisfactory /
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
            Most Common Photo Issues We Find
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
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{theme.theme}</h3>
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          {theme.category === "hero_image"
                            ? "Hero Image"
                            : "Other Photos"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Found in {theme.percentage}% of listings analyzed
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Professional Photography Guide */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Should You Hire a Professional Photographer?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Hire a Professional If...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>
                    You're launching a new listing and want maximum impact
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>
                    Your property is high-end or in a competitive market
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Current photos aren't getting clicks or bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>
                    You want to stand out in search results immediately
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>You're not confident in your photography skills</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                DIY Photography If...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>You're on a tight budget or just starting out</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>
                    You have a decent smartphone camera (iPhone 12+, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>
                    You're willing to learn and practice photography basics
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>Your space is well-lit with natural light</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>You need to update photos frequently</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Pro Tip:</strong> Professional photography typically costs
              $150-$500 but can increase bookings by 20-40%. Many hosts recover
              this cost in their first few bookings. Consider it an investment,
              not an expense.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* DIY Photography Tips */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          DIY Photography Tips That Actually Work
        </h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                1. Maximize Natural Light
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Natural light is your secret weapon for professional-looking
                photos without expensive equipment.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Golden hour is key:</strong> Shoot 1-2 hours after
                    sunrise or before sunset for soft, warm lighting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Open all curtains and blinds:</strong> Let maximum
                    light flood the space
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Turn on all lights:</strong> Mix natural and
                    artificial light for brightness
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Avoid harsh shadows:</strong> Shoot on overcast days
                    or use sheer curtains to diffuse bright sunlight
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-500" />
                2. Use Wide-Angle Shots
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Make rooms look spacious and inviting by capturing the full
                space.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Shoot from corners:</strong> Position yourself in a
                    corner to capture the most area
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Use portrait mode sparingly:</strong> Stick to
                    landscape orientation for rooms
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Keep camera level:</strong> Avoid tilting which
                    makes rooms look distorted
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Enable wide-angle mode:</strong> Most smartphones
                    have 0.5x or ultra-wide settings
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                3. Stage and Declutter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Clean, simple spaces photograph better and help guests visualize
                themselves there.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Remove personal items:</strong> Hide family photos,
                    toiletries, and clutter
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Add pops of color:</strong> Fresh flowers, colorful
                    throw pillows, or fruit bowls
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Make beds perfectly:</strong> Crisp linens and
                    arranged pillows signal cleanliness
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Style surfaces minimally:</strong> A book and coffee
                    cup on a table, not magazines and remotes
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Essential Photo Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Make sure you capture these shots for a complete listing:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold">Must-Have Shots:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Hero shot (most impressive view)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Each bedroom from doorway
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Living area/common spaces
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Kitchen (if applicable)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Bathrooms
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Nice-to-Have Shots:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      Outdoor spaces/views
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      Unique amenities (hot tub, etc.)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      Dining area
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      Workspace (if you have one)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      Detail shots (cozy corners)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Suggestions from AI */}
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
                    <div className="flex-1">
                      <p className="text-base mb-1">{suggestion.suggestion}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {suggestion.category === "hero_image"
                            ? "Hero Image"
                            : "Other Photos"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Common Photography Mistakes to Avoid
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Dark, Poorly Lit Photos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Dim photos make spaces look uninviting and smaller. Always
                  maximize light or reshoot during better lighting conditions.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Cluttered or Messy Rooms
                </h3>
                <p className="text-sm text-muted-foreground">
                  Personal items, dishes, or clutter distract from your space.
                  Spend 30 minutes staging before shooting.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Using Only 5-10 Photos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Airbnb allows up to 50+ photos. Use 20-30 high-quality images
                  to showcase every angle and detail.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Skipping the Hero Image
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your first photo determines if guests click. Make it your most
                  impressive, well-lit shot.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-600">
                  ❌ Inconsistent Quality
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mixing professional shots with low-quality smartphone pics
                  looks unprofessional. Keep quality consistent throughout.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Data Methodology */}
      <DataMethodology
        totalProperties={stats.totalProperties}
        category="photos"
        analysisDetails="Our analysis uses GPT-4o to evaluate listing photography across hero images and supporting photos, assessing lighting, composition, staging, and overall visual appeal. Each photo set receives a rating out of 100 and specific improvement suggestions."
      />

      {/* FAQ Section */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-photo-tips"
        faqs={[
          {
            question: "Should I hire a professional photographer for my Airbnb?",
            answer: `Professional photography typically costs $150-$500 but can increase bookings by 20-40%. Based on our analysis of ${stats.totalProperties.toLocaleString()} listings, professional photos correlate with higher ratings. Hire a pro if you're in a competitive market, launching a new listing, or current photos aren't getting clicks. DIY is viable with a good smartphone camera and proper technique.`,
          },
          {
            question: "What should my Airbnb hero image show?",
            answer:
              "Your hero image should be your most impressive, well-lit shot that captures the essence of your space. This is typically a wide-angle view of your best room (living room, bedroom with view, or outdoor space). Avoid detail shots or bathrooms as your first photo. The hero image determines whether guests click, so make it count.",
          },
          {
            question: "How many photos should I upload to my Airbnb listing?",
            answer:
              "Upload 20-30 high-quality photos to give guests a complete picture of your space. Airbnb allows up to 50+ photos, but quality matters more than quantity. Include every room, unique amenities, outdoor spaces, and detail shots. Listings with comprehensive photo galleries typically get more bookings.",
          },
          {
            question: "What's the best time of day to photograph my Airbnb?",
            answer:
              "The golden hour (1-2 hours after sunrise or before sunset) provides the best natural lighting for interior photography. Alternatively, shoot on overcast days for soft, even lighting without harsh shadows. Open all curtains, turn on all lights, and maximize brightness regardless of when you shoot.",
          },
          {
            question: "Can I use my smartphone to take Airbnb photos?",
            answer:
              "Yes! Modern smartphones (iPhone 12+, recent Samsung/Google phones) can produce professional-quality photos with proper technique. Use wide-angle mode, maximize natural lighting, keep the camera level, and stage your space carefully. The key is lighting and composition, not expensive equipment.",
          },
          {
            question: "Should I edit my Airbnb photos?",
            answer:
              "Light editing is recommended to adjust brightness, contrast, and color balance to accurately represent your space. Avoid heavy filters, over-saturation, or misleading edits that make your property look different in person. Guests should recognize your space from the photos when they arrive.",
          },
          {
            question: "What makes a good Airbnb photo?",
            answer:
              "Good Airbnb photos are well-lit, decluttered, and show the full space rather than just details. They feature natural lighting, wide-angle views, proper staging with minimal personal items, and consistent quality throughout the gallery. The best photos help guests visualize staying in your space.",
          },
          {
            question: "How do I photograph small spaces to make them look bigger?",
            answer:
              "Shoot from corners using wide-angle mode to capture maximum area. Remove excess furniture and clutter. Use mirrors strategically. Maximize natural light by opening curtains. Keep the camera level (tilting distorts proportions). Shoot horizontally, not vertically. These techniques help small spaces feel more open and inviting.",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want AI-Powered Analysis of Your Photos?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get personalized feedback on your hero image and supporting
              photos, plus ratings on your title, description, amenities, and
              interior design. Our AI provides specific recommendations to
              improve your listing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/feedback-genius/analyze">
                  Analyze My Photos Free
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
                  <h3 className="font-semibold mb-1">Amenities Checklist</h3>
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
                Get AI-powered analysis of your entire Airbnb listing, including
                photos, title, and description.
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
                See what photos top-performing listings in your area are using
                to get more bookings.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
