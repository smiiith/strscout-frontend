import {
  Calendar03Icon,
  Settings02Icon,
  Image02Icon,
  File02Icon,
  LightBulb01Icon,
} from "@/components/Icons";

export function MarketScoutFeatures() {
  const features = [
    {
      icon: <Calendar03Icon className="w-6 h-6 text-primary" />,
      title: "See Current Real Time Demand",
      description:
        "We analyze booking activity near your target address to reveal current real-time demand.",
    },
    {
      icon: <Settings02Icon className="w-6 h-6 text-primary" />,
      title: "How Hard is it to Compete?",
      description:
        "We generate a deep analysis on the strength of each comp including amenities, photos, design, & more -- so you know exactly how strong the competition is and what it takes to compete.",
    },
    {
      icon: <Image02Icon className="w-6 h-6 text-primary" />,
      title: "Evaluate Photos & Interior Design",
      description:
        "Side-by-side rating of photo quality, layout, staging, and design cues.",
    },
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
