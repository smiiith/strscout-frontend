import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Trusted by 5,000+ Airbnb hosts
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Stop Guessing. Start Booking.
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Get expert analysis of your Airbnb listing in 24 hours. We rate every detail and tell you exactly what to
              fix to attract more guests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg shadow-primary/25"
              >
                Get Your Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                See Example Report
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">Results in 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">100% free</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/airbnb-listing-on-laptop-screen-with-magnifying-gl.jpg"
                alt="Airbnb listing analysis"
                width={800}
                height={600}
                className="w-full"
              />
            </div>
            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-accent">+47%</div>
              <div className="text-sm text-muted-foreground">Avg. booking increase</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
