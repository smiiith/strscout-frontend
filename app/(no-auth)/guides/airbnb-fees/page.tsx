import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, Camera, Home, ArrowLeft, DollarSign, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Airbnb Host Fees Explained: Split Fee vs Single Fee | STR Sage",
  description:
    "Complete guide to Airbnb host fees. Learn about the 3% Split Fee vs 15% Single Fee structures, how to choose, and ways to minimize costs. Updated 2026.",
  keywords: [
    "airbnb fees",
    "airbnb host fees",
    "cleaning fee",
    "what percentage does airbnb take",
    "airbnb cleaning fee",
    "pricing airbnb",
    "airbnb hidden fees",
    "airbnb monthly rates",
    "airbnb service fee",
    "airbnb charges for hosts",
    "airbnb host costs",
    "airbnb fee structure",
    "airbnb split fee",
    "airbnb single fee",
  ],
  openGraph: {
    title: "Airbnb Host Fees Explained: Split Fee vs Single Fee Structure",
    description:
      "Understand Airbnb's fee structures and learn how to minimize your hosting costs. Complete breakdown of the 3% Split Fee and 15% Single Fee options.",
    type: "article",
    url: "https://www.strsage.com/guides/airbnb-fees",
  },
};

export default function AirbnbFeesGuide() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "Airbnb Host Fees" },
        ]}
      />

      {/* Enhanced Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Airbnb Host Fees - The Easy Explanation",
            description:
              "Complete guide to understanding Airbnb's Split Fee and Single Fee structures for hosts.",
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
              "@id": "https://www.strsage.com/guides/airbnb-fees",
            },
            about: {
              "@type": "Thing",
              name: "Airbnb hosting fees",
              description: "Understanding Airbnb's fee structures and how to choose between them",
            },
            mentions: [
              {
                "@type": "SoftwareApplication",
                name: "Airbnb",
                applicationCategory: "Vacation Rental Platform",
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
                name: "Airbnb Host Fees",
                item: "https://www.strsage.com/guides/airbnb-fees",
              },
            ],
          }),
        }}
      />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Airbnb Host Fees - The Easy Explanation
        </h1>
        <p className="text-xl text-muted-foreground">
          Recent changes to the Airbnb fee for hosts have confused a lot of people.
          Here's the simple breakdown of the charges for hosts — and what you can choose.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      {/* Overview */}
      <section className="mb-12">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Airbnb has two fee structures for hosts: <strong>Split Fee (3%)</strong> and <strong>Single Fee (15%)</strong>.
            </p>
            <p className="text-muted-foreground">
              Airbnb will always collect a fee for each booking. In the 15% Single Fee structure,
              the host pays all of the fee. In the 3% Split Fee structure, the host pays 3% and
              the guest pays the other 12%.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Fee Comparison */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Fee Structure Comparison
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Split Fee (3%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">3%</div>
                  <p className="text-sm text-muted-foreground">Host pays only 3% per booking</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Host pays 3% service fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Guest pays 12% service fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Lower cost for hosts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Available without PMS connection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <XCircle className="w-5 h-5 text-orange-500" />
                Single Fee (15%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">14-16%</div>
                  <p className="text-sm text-muted-foreground">Host pays all fees (typically 14-16%)</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>Host pays entire service fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>Guest pays no service fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>Required for PMS-connected accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>Higher cost for hosts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Can I Choose */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Can I Choose Which Fee?
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <p className="text-base mb-4">
                  The key is whether or not you are connected to Property Management Software (PMS)
                  such as Guesty, Hostaway, Hospitable, Lodgify, OwnerRez, etc.
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                      Connected to PMS
                    </h3>
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      If you are connected to a PMS, then you are <strong>forced into the 15% Single Fee structure</strong>.
                      If you want to opt back into the 3% Split Fee structure, then you'll need to disconnect from the PMS.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Not Connected to PMS
                    </h3>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      If you are not connected to a PMS, then you have the choice of opting into the 3% Split Fee structure
                      and paying less money to Airbnb; or voluntarily opting into the 15% Single Fee structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to Check Settings */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          How to Check and Change Your Fee Structure
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Check PMS Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">1.</span>
                  <span>Go to Account Settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">2.</span>
                  <span>Navigate to Privacy & Sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">3.</span>
                  <span>Click on Services / Connected Apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">4.</span>
                  <span>To disconnect: Click "Remove access" then "Done"</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Change Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">1.</span>
                  <span>Go to Account Settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">2.</span>
                  <span>Navigate to Payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">3.</span>
                  <span>Click on Service Fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-primary flex-shrink-0">4.</span>
                  <span>View your current setting and choose your preferred option (if eligible)</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other Costs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Beyond Service Fees: Other Hosting Costs
        </h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4 text-muted-foreground">
              Besides the service fee, hosts should budget for these additional costs:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Cleaning Costs</h3>
                    <p className="text-sm text-muted-foreground">
                      Professional cleaning between guests (can be passed to guests via cleaning fee)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Supplies & Amenities</h3>
                    <p className="text-sm text-muted-foreground">
                      Toiletries, linens, kitchen supplies, coffee, etc.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Maintenance & Repairs</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular upkeep and fixing items as they wear out
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Taxes</h3>
                    <p className="text-sm text-muted-foreground">
                      Local occupancy taxes, VAT, or income taxes on earnings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Insurance</h3>
                    <p className="text-sm text-muted-foreground">
                      STR-specific insurance beyond Airbnb's Host Protection
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Software & Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Optional tools for pricing, messaging, task management, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <GuideFAQ
        pageUrl="https://www.strsage.com/guides/airbnb-fees"
        faqs={[
          {
            question: "How much does Airbnb take from hosts?",
            answer:
              "Typically either about 3% (Split Fee) or about 14–16% (Single Fee), depending on your setup. The Split Fee structure charges hosts 3% while guests pay 12%. The Single Fee structure charges hosts the entire 14-16% service fee.",
          },
          {
            question: "What is the Airbnb fee for host bookings, exactly?",
            answer:
              "Your Airbnb host service fee depends on your fee structure: Split Fee is usually around 3%, and Single Fee is usually around 14–16%. Fees vary by country, cancellation policy, and other factors (example: Brazil differs; 'Super Strict' cancellation policy can add +2%; long stays may be less; VAT may apply).",
          },
          {
            question: "How do I check if I am PMS-connected, and disconnect if I want?",
            answer:
              "In Airbnb: Go to Account settings → Privacy & Sharing → Services / Connected Apps → (then → Remove access if you want to disconnect and click 'done'). Disconnecting from PMS allows you to switch back to the 3% Split Fee structure.",
          },
          {
            question: "How do I check which fee structure I am on and/or change it?",
            answer:
              "In Airbnb: Go to Account settings → Payments → Service fee. You will see your current setting and have the option to choose which you want (if you are eligible). Note that PMS-connected accounts are required to use the Single Fee structure.",
          },
          {
            question: "What are the typical Airbnb host costs beyond the service fee?",
            answer:
              "Besides the service fee, hosts may also see taxes (where applicable) and operational costs like cleaning fees, supplies, maintenance, insurance, and software tools you choose to use. Professional cleaning is often the largest variable cost per booking.",
          },
          {
            question: "Why do people use different phrases to describe the Airbnb fee for hosts?",
            answer:
              "Different people use different phrases. You might see 'Airbnb charges for hosts,' 'Airbnb host fee,' or 'Airbnb fees for host'—but they're usually all talking about the same thing: the service fee Airbnb takes from the booking.",
          },
          {
            question: "Can I pass my Airbnb fees to guests?",
            answer:
              "In the Split Fee structure, guests already pay their portion (12%) of the total fee. In the Single Fee structure, you could theoretically increase your nightly rate to cover the 14-16% fee, but this may make you less competitive. Many hosts find the 3% Split Fee structure more profitable if they're eligible.",
          },
          {
            question: "What is an Airbnb cleaning fee and how should I set it?",
            answer:
              "The cleaning fee is a one-time charge to guests to cover the cost of cleaning between stays. It's separate from Airbnb's service fees. Set your cleaning fee based on your actual cleaning costs (typically $50-200 depending on property size and location). The fee is displayed separately to guests when they book.",
          },
        ]}
      />

      {/* CTA */}
      <section className="mb-12">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Maximize Your Airbnb Revenue
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Understanding fees is just the start. Use our AI-powered tools to optimize
              your listing, analyze your market, and increase your nightly rates to offset
              any hosting costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/feedback-genius/analyze">
                  Optimize Your Listing Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/market-spy">Analyze Your Market</Link>
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
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Home className="w-5 h-5 text-pink-500" />
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
                Get AI-powered analysis of your entire Airbnb listing to increase
                bookings and justify higher nightly rates.
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
                Analyze your competition and discover the optimal pricing strategy
                for your market to maximize revenue.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
