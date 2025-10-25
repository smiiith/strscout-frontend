import { UserMultipleIcon, TrendingUp01Icon, Award02Icon } from "@/components/Icons";

export function MarketSpySocialProof() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UserMultipleIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">5,000+</div>
              <div className="text-sm text-muted-foreground">Hosts Using Market Spy</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingUp01Icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">32%</div>
              <div className="text-sm text-muted-foreground">Average Booking Increase</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Award02Icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground">Host Satisfaction Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
