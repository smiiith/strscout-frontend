import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "@/components/Icons";
import { useRouter } from "next/navigation";

export function MarketSpyFinalCTA() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border-2 border-primary/20 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Stop Guessing. Start Winning.
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Get the competitive intelligence you need to outperform other
              listings in your area.
            </p>

            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg"
              onClick={() => {
                router.push("/pricing");
              }}
            >
              Choose a plan
              <ArrowRight01Icon className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-muted-foreground mt-6">
              Join other hosts who've discovered what's really working in their
              market
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
