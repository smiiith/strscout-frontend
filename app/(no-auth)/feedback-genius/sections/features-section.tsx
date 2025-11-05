import { Card } from "@/components/ui/card";
import { Camera, FileText, DollarSign, Home, Star, Target } from "lucide-react";

const stats = [
  { icon: "/images/icon-hero-image.png", label: "Hero photos" },
  { icon: "/images/icon-title.png", label: "Title" },
  { icon: "/images/icon-description.png", label: "Description" },
  { icon: "/images/icon-amenities.png", label: "Amenities" },
  { icon: "/images/icon-interior-design.png", label: "Interior design" },
];

export function FeaturesSection() {
  const features = [
    {
      icon: Camera,
      title: "Photo Analysis",
      description:
        "Professional critique of your hero image, secondary images, photo quality, and visual storytelling.",
    },
    {
      icon: FileText,
      title: "Copy Review",
      description:
        "Title and description optimization to highlight your unique selling points.",
    },
    // {
    //   icon: DollarSign,
    //   title: "Pricing Strategy",
    //   description:
    //     "Competitive pricing analysis and recommendations for your market.",
    // },
    {
      icon: Home,
      title: "Amenities Audit",
      description:
        "Identify missing amenities that guests in your area expect.",
    },
    {
      icon: Star,
      title: "Interior Design",
      description:
        "Evaluate your overall interior design appeal and suggest improvements.",
    },
    // {
    //   icon: Target,
    //   title: "Market Positioning",
    //   description:
    //     "Understand how you compare to top-performing listings nearby.",
    // },
  ];

  return (
    <section id="features" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            We Analyze Every Detail That Matters
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive review covers all the elements that influence
            booking decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow bg-background"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
