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

      {/* Host Assist Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">
          Can I Manage Hosting Tasks and Avoid the 15% Fee?
        </h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-base mb-4">
              You can manage hosting and avoid the 15% fee with tools such as Host Assist.
              Host Assist is an easy to use task manager made specifically for STR hosts.
              It helps you stay organized, assign tasks, communicate with cleaners, and get
              reminders — so nothing slips through the cracks. It does this without connecting
              as a PMS so you aren't forced into the 15% fee structure.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-center">Learn More in this quick video</h3>

              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
                <video
                  className="w-full h-full"
                  controls
                  preload="metadata"
                >
                  <source
                    src="https://eklefalzcpfrnsmzrlbn.supabase.co/storage/v1/object/public/video/host-assist.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="border-t border-primary/20 pt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Get Free Early Access</h3>
                <p className="text-muted-foreground mb-4">
                  We're opening a small early access group.
                  <br />
                  Join free and help shape what gets built first.
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link href="/host-assist">Join Early Access</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  No spam. Cancel anytime.
                </p>
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
            question: "How do I check if I am PMS-connected, and disconnect if I want?",
            answer:
              "In Airbnb: Account settings → Privacy & Sharing → Services / Connected Apps → (then → Remove access if you want to disconnect and click \"done\")",
          },
          {
            question: "How do I check which fee structure I am on and/or change?",
            answer:
              "In Airbnb: Account settings → Payments → Service fee. You will see your setting and have the option to choose which you want (if you are eligible)",
          },
          {
            question: "How much does Airbnb take from hosts?",
            answer:
              "Typically either about 3% (Split Fee) or about 14–16% (Single Fee), depending on your setup.",
          },
          {
            question: "What is the Airbnb fee for host bookings, exactly?",
            answer:
              "Your Airbnb host service fee depends on your fee structure: Split Fee is usually around 3%, and Single Fee is usually around 14–16%. Fees vary by country, cancellation policy, and other factors (example: Brazil differs; \"Super Strict\" cancellation policy can add +2%; long stays may be less; VAT may apply)",
          },
          {
            question: "What are the typical Airbnb host costs beyond the service fee?",
            answer:
              "Besides the service fee, hosts may also see taxes (where applicable) and optional costs like cleaning fee, supplies, maintenance, and software tools you choose to use.",
          },
          {
            question: "Why do people use different phrases to describe the Airbnb fee for hosts?",
            answer:
              "Different people use different phrases. You might see Airbnb charges for hosts, Airbnb host fee, or Airbnb fees for host—but they're usually all talking about the same thing: the service fee Airbnb takes from the booking.",
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
                  href="/host-assist"
                  className="hover:text-primary hover:underline"
                >
                  Host Assist →
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                Task manager for STR hosts that helps you avoid the 15% fee. Stay organized
                without connecting to a PMS.
              </p>
            </CardContent>
          </Card>
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
        </div>
      </section>
    </div>
  );
}
