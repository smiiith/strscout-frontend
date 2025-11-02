import {
  UserMultipleIcon,
  TrendingUp01Icon,
  Award02Icon,
  Target02Icon,
} from "@/components/Icons";

// In saturated markets, real advantage comes from insight—see what works nearby and outperform it

export function MarketSpySocialProof() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8 text-center items-center">
          <div className="flex flex-row items-center gap-3 px-12">
            <div className="rounded-full flex items-center justify-center">
              <Target02Icon className="w-24 h-24 text-primary/50" />
            </div>
            <div>
              <div className="text-2xl text-foreground/50">
                In saturated markets, real advantage comes from insight—see what
                works nearby and outperform it
              </div>
              {/* <div className="text-sm text-muted-foreground">
                Hosts Using Market Spy
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
