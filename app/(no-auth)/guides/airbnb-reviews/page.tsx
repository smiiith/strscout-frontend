import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ArrowLeft,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Camera,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Get More 5-Star Airbnb Reviews | STR Sage",
  description:
    "Practical strategies for earning more 5-star Airbnb reviews. Covers check-in experience, communication, review timing, handling bad reviews, and the surprise-and-delight approach.",
  keywords: [
    "how to get airbnb reviews",
    "airbnb 5 star reviews",
    "get more airbnb reviews",
    "airbnb review tips",
    "airbnb guest experience",
    "airbnb review strategy",
    "respond to airbnb reviews",
    "airbnb negative review",
    "short term rental reviews",
    "vacation rental guest experience",
  ],
  openGraph: {
    title: "How to Get More 5-Star Airbnb Reviews",
    description:
      "Practical strategies for earning more 5-star Airbnb reviews — from the check-in experience to following up after checkout.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-reviews",
  },
};

export default function AirbnbReviewsGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "How to Get More Airbnb Reviews" },
        ]}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Get More 5-Star Airbnb Reviews",
            description:
              "Practical strategies for earning more 5-star Airbnb reviews.",
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
              "@id": "https://www.strsage.com/guides/airbnb-reviews",
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
              { "@type": "ListItem", position: 3, name: "How to Get More Airbnb Reviews", item: "https://www.strsage.com/guides/airbnb-reviews" },
            ],
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          How to Get More 5-Star Airbnb Reviews
        </h1>
        <p className="text-xl text-muted-foreground">
          Reviews drive Airbnb's search ranking, conversion, and Superhost
          status. Here's a practical system for earning more of them — and
          protecting yourself when something goes wrong.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: 5/19/2026
        </p>
      </header>

      {/* Why Reviews Matter */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Why Reviews Are Everything</h2>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.8+</div>
                <p className="text-sm text-muted-foreground">
                  Overall rating required for Airbnb Superhost status
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  Search
                </div>
                <p className="text-sm text-muted-foreground">
                  Higher-rated listings rank better in Airbnb search results
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  Trust
                </div>
                <p className="text-sm text-muted-foreground">
                  Guests trust peer reviews more than any listing copy you write
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Every review is compounding — a Superhost badge attracts more
              guests, which creates more reviews, which maintains the badge. The
              flywheel starts with deliberate effort early on.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How the Review System Works */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          How Airbnb's Review System Works
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4 text-sm text-muted-foreground">
            <p>
              Airbnb uses a <strong>blind review system</strong>. Both host and
              guest have 14 days after checkout to leave a review. Reviews are
              only published once <em>both</em> parties have submitted, or the
              14-day window closes — whichever comes first.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">
                Key implication:
              </p>
              <p>
                If you leave a review for your guest first, it doesn't reveal
                yours — but it does prompt them with a notification that you've
                left a review, which increases the likelihood they'll write one
                back. <strong>Always review your guests first.</strong>
              </p>
            </div>
            <p>
              Airbnb also sends guests automatic reminders to leave a review.
              Your job is to make the experience so positive that writing a
              5-star review feels effortless.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* The Guest Experience System */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          The Guest Experience System
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                1. Nail the Check-In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The check-in experience sets the emotional tone for the entire
                stay. A smooth arrival creates a positive halo effect; a
                confusing one puts guests on edge before they've even unpacked.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Send check-in instructions 24–48 hours in advance</strong> — don't wait until day-of. Include door codes, parking, WiFi, and any quirks about the space.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Test everything before each guest arrives:</strong> door code, WiFi password, TV remote, hot water. One dead battery kills a review.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Send a welcome message</strong> when you see they've arrived. "Hope check-in was smooth! Let me know if you need anything." Short, warm, available.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                2. Communicate Proactively
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Poor communication is the most commonly cited complaint in
                negative reviews. Good communication means anticipating
                questions before they become frustrations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Respond within an hour</strong> to any message during a guest's stay. Airbnb's response rate metric affects your Superhost status.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Mid-stay check-in:</strong> On day 2 or 3 of a longer stay, send a brief "How's everything going?" message. Guests who have a small issue will often mention it here — giving you a chance to fix it before it becomes a review complaint.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Checkout message:</strong> The night before, send a friendly reminder of checkout time and how to leave. Keep it brief and warm.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                3. Surprise and Delight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Guests expect clean and functional. The extra touch creates a
                moment they actually want to write about. It doesn't need to be
                expensive — it needs to be thoughtful and unexpected.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Welcome snacks or drinks:</strong> A bottle of wine, local coffee, or fresh fruit costs $10–20 and is the most frequently mentioned positive in reviews.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>A handwritten welcome note</strong> — even three sentences — creates a personal connection that no Airbnb template can replicate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Local recommendations binder or card:</strong> Your favorite restaurants, hidden gems, and practical info (nearest grocery store, urgent care). Guests love insider knowledge.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>For special occasions:</strong> If a guest mentions it's their anniversary or birthday, a small acknowledgment (decorations, a card) creates an unforgettable stay.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" />
                4. The Post-Checkout Review Sequence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Most missed reviews happen because the guest simply forgot.
                Your post-checkout sequence catches them at the right moment.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="font-bold text-primary">Day 0</span>
                  <p>Send checkout message. Thank them for staying. Leave them a positive review immediately (triggers Airbnb's notification to them).</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="font-bold text-primary">Day 2</span>
                  <p>If no review yet, send a brief follow-up: <em>"So glad you enjoyed your stay! If you have a moment, a quick review would mean a lot — it helps other travelers find the space."</em></p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="font-bold text-primary">Day 13</span>
                  <p>Final reminder before the 14-day window closes — only if they haven't reviewed yet. Keep it light and low-pressure.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Handling Negative Reviews */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Handling Negative Reviews</h2>
        <div className="space-y-4">
          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Your Public Response Matters More Than the Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Prospective guests read negative reviews — but they also read
                your response. A calm, professional, solution-focused response
                can actually build trust with future guests more than no
                negative review at all.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-foreground mb-2">
                  Response formula:
                </p>
                <ol className="space-y-1">
                  <li>1. Thank them for staying</li>
                  <li>2. Acknowledge the specific issue (don't be defensive)</li>
                  <li>3. Explain what you've done to fix it</li>
                  <li>4. Invite future guests to reach out if they have any concerns</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                When to Request Review Removal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Airbnb will only remove reviews that violate their content policy:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Contains false factual claims (provably inaccurate statements)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Includes threats, harassment, or discriminatory language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Is clearly written about the wrong property</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>The guest was just unhappy — Airbnb won't remove these</span>
                </li>
              </ul>
              <p className="mt-3">
                Contact Airbnb support with specific evidence if you believe a
                review violates the policy. Otherwise, respond publicly and move
                on.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                The Best Defense: Fix It Before They Leave
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Guests who have a complaint resolved <em>during</em> their stay
                rarely leave negative reviews. Your mid-stay check-in message
                is the single most effective tool for catching and fixing issues
                before checkout. A guest who mentions the AC is loud and you
                send a fan within the hour is far more likely to leave 5 stars
                than one who suffered in silence and vented in a review.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Triggers Bad Reviews */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Most Common Causes of Bad Reviews
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">❌ Cleanliness</h3>
              <p className="text-sm text-muted-foreground">
                The #1 complaint. A single hair in the bathroom or crumbs on a
                counter can define the review. Create a cleaning checklist and
                inspect after every turnover.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">❌ Listing Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                When the reality doesn't match the listing — smaller than
                photos suggest, a missing amenity, an overstated view — guests
                feel misled. Keep your listing accurate and update it when
                things change.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2 text-red-600">❌ Slow or Poor Communication</h3>
              <p className="text-sm text-muted-foreground">
                Guests who can't get a timely response feel anxious and
                unsupported. Enable notifications, use saved messages for
                common questions, and set an auto-reply if you'll be
                unavailable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-red-600">❌ Broken or Missing Amenities</h3>
              <p className="text-sm text-muted-foreground">
                A broken coffee maker or missing hair dryer might seem minor to
                you but can define a guest's stay. Walk through your space
                regularly and test everything you've listed.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-reviews"
        faqs={[
          {
            question: "How do I get more Airbnb reviews?",
            answer:
              "Leave a review for your guest immediately after checkout — this triggers a notification that prompts them to write one back. Follow up with a brief message on day 2 if they haven't reviewed yet. Most importantly, make the stay exceptional: smooth check-in, proactive communication, and a small welcome touch go a long way.",
          },
          {
            question: "Can I ask guests to leave a review?",
            answer:
              "Yes, Airbnb allows hosts to remind guests to leave a review. Keep it natural and low-pressure: 'If you have a moment, a quick review would mean a lot — it helps other travelers find the space.' Don't offer anything in exchange for reviews, as this violates Airbnb's policies.",
          },
          {
            question: "What should I do if I get a negative Airbnb review?",
            answer:
              "Respond publicly within a few days. Thank the guest, acknowledge the specific issue without being defensive, explain what you've changed, and invite future guests to reach out with any concerns. Future guests read both the review and your response — a professional, empathetic response often builds more trust than a perfect review record.",
          },
          {
            question: "How long do guests have to leave an Airbnb review?",
            answer:
              "Both hosts and guests have 14 days after checkout to leave a review. Reviews are published once both have submitted, or when the 14-day window closes. This blind system prevents retaliation — you can leave an honest review without seeing theirs first.",
          },
          {
            question: "Should I leave a review for my guest first?",
            answer:
              "Yes. Leave your guest a positive review immediately after checkout. This sends them a notification that you've reviewed them, which is one of the most effective triggers for getting them to write one back. Since the system is blind, your review isn't visible to them until they submit theirs or 14 days pass.",
          },
          {
            question: "Can Airbnb remove a bad review?",
            answer:
              "Airbnb will only remove reviews that violate their content policy — false factual claims, harassment, threats, or clearly wrong property. They won't remove a negative review simply because you disagree with it. If you believe a review violates policy, contact Airbnb support with specific evidence. Otherwise, respond professionally and move on.",
          },
          {
            question: "What's the most important thing I can do to avoid bad reviews?",
            answer:
              "Do a mid-stay check-in message around day 2 or 3 of the stay: 'How's everything going? Let me know if you need anything.' Guests who have a small issue will often mention it here, giving you a chance to fix it before checkout. Guests whose problems get resolved during their stay rarely leave negative reviews.",
          },
          {
            question: "Do reviews affect Airbnb search ranking?",
            answer:
              "Yes. Airbnb's search algorithm factors in overall rating, number of reviews, and recency. A listing with a 4.9 rating and 50 reviews will generally rank higher than one with a 4.7 and 10 reviews. Consistently earning 5-star reviews is one of the most effective long-term SEO strategies for your listing.",
          },
        ]}
      />

      {/* CTA */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Start With a Better Listing
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              A listing that accurately sets expectations means happier guests
              and fewer complaints. Get AI-powered analysis of your title,
              photos, description, and amenities — free.
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
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Airbnb Superhost</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Turn reviews into Superhost status
                  </p>
                  <Link
                    href="/guides/airbnb-superhost"
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
                    Full listing optimization
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
                AI analysis of your listing — because a better listing sets
                accurate expectations and creates fewer surprises for guests.
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
                See how highly-reviewed competitors in your area present their
                listings — and what guests love about them.
              </p>
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
              href="https://www.airbnb.com/help/article/13"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Airbnb Help Center — Reviews for homes
            </a>
          </li>
          <li>
            <a
              href="https://www.airbnb.com/help/article/995"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Airbnb Help Center — How long you have to write a review
            </a>
          </li>
          <li>
            <a
              href="https://www.airbnb.com/resources/hosting-homes/a/why-reviews-matter-41"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              Airbnb Resource Center — Why reviews matter
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
