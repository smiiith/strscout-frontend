import { Card } from "@/components/ui/card"
import { Upload, Search, Zap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Submit Your Listing",
      description: "Just paste your Airbnb listing URL. Takes 30 seconds.",
      step: "01",
    },
    {
      icon: Search,
      title: "We Analyze Everything",
      description: "Our experts review your photos, copy, pricing, and amenities against top performers.",
      step: "02",
    },
    {
      icon: Zap,
      title: "Get Your Report",
      description: "Receive detailed scores and specific improvements within 24 hours.",
      step: "03",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From listing to insights in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="relative p-8 text-center hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="mt-8 mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
