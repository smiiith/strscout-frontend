import { Calendar03Icon, Settings02Icon, Image02Icon, File02Icon, LightBulb01Icon } from "@/components/Icons";

export function MarketScoutFeatures() {
  const features = [
    {
      icon: <Calendar03Icon className="w-6 h-6 text-primary" />,
      title: "See Who's Getting Booked (and Who Isn't)",
      description:
        "We analyze real-time calendar activity across the next 90 days to reveal which listings are dominating bookings.",
    },
    {
      icon: <Settings02Icon className="w-6 h-6 text-primary" />,
      title: "Analyze Amenities & Policies",
      description:
        "We look for Pet Policies, Self Check-in, Instant Book, and other conversion-critical settings.",
    },
    {
      icon: <Image02Icon className="w-6 h-6 text-primary" />,
      title: "Evaluate Photos & Interior Design",
      description:
        "Side-by-side rating of photo quality, layout, staging, and design cues.",
    },
    {
      icon: <File02Icon className="w-6 h-6 text-primary" />,
      title: "Review Headlines & Descriptions",
      description:
        "We break down how competitors are positioning themselves — and what guests see first.",
    },
    {
      icon: <LightBulb01Icon className="w-6 h-6 text-primary" />,
      title: "Get a Written Synopsis + Actionable Feedback",
      description:
        "Every report includes a clear breakdown with takeaways and suggestions for your own listing.",
    },
    // {
    //   icon: (
    //     <svg
    //       className="w-6 h-6 text-primary"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    //       />
    //     </svg>
    //   ),
    //   title: "Download the Full Report",
    //   description: "PDF versions available for your records or team use.",
    // },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Features and Benefits
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Everything Your Competitors Are Doing — In One Report
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
