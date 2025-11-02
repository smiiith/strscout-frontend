import { Card } from "@/components/ui/card"
import { Star01Icon } from "@/components/Icons";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Austin, TX",
      rating: 5,
      text: "This report showed me exactly why my competitor down the street was getting 40% more bookings. I made three simple changes and my occupancy jumped from 62% to 81% in just two months.",
      property: "3BR Downtown Condo",
    },
    {
      name: "James Chen",
      location: "Denver, CO",
      rating: 5,
      text: "I thought my listing was competitive until I saw this analysis. Turns out I was missing key amenities that every top performer in my area offered. Fixed it in a week and bookings doubled.",
      property: "Mountain View Cabin",
    },
    {
      name: "Maria Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "The occupancy data alone was worth it. I could see exactly which listings were crushing it and what they were doing differently. Game changer for my pricing strategy.",
      property: "Beachfront Studio",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Hosts Are Seeing Real Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of hosts who've used Market Spy to increase their bookings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-background">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star01Icon key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed">{testimonial.text}</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.property}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
            <Star01Icon className="w-5 h-5 fill-accent" />
            <span>4.9/5 average rating from 1,200+ hosts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
