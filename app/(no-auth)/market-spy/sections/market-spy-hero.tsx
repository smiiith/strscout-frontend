import { Button } from "@/components/ui/button";
import { Clock01Icon, Zap01Icon, ArrowRight01Icon } from "@/components/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MarketSpyHero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-10 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="relative lg:flex-1">
            <div className="relative aspect-square max-w-xs mx-auto sm:max-w-md lg:max-w-none">
              <Image
                src="/home/mobile-confused-host-2-min.png"
                alt="Hosts, you need more bookings"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl object-cover lg:hidden"
                priority
              />
              <Image
                src="/home/confused-host-2-min.png"
                alt="Hosts, you need more bookings"
                width={600}
                height={900}
                className="rounded-2xl shadow-2xl object-cover hidden lg:block"
                priority
              />
            </div>
          </div>

          <div className="lg:flex-1">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Several pricing options to choose from
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 text-balance">
              Hosts, you need more bookings. <br />
              And you're not sure how.
            </h1>

            <h3 className="text-2xl md:text-3xl lg:text-4xl tracking-tight mb-6 text-foreground/60">
              You need a plan, but how can you plan if you don't even know the
              playing field?
            </h3>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              The STR business is a battle for bookings and the first step
              toward competing is knowing the opposition. What are you up
              against? How many bookings do your competitors have right now?
              What are they doing different from you? What amenities do they
              offer? What cancellation or pet policies are in place? Do they
              have instant book turned on? Are their photos better than yours?
              Is their interior design better?
            </p>

            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <p className="text-base leading-relaxed mb-4">
                <span className="font-semibold text-foreground">
                  STR Market Spy
                </span>{" "}
                is the simple way to uncover what’s really driving your market.
                With one quick report, you’ll see your competitors’ bookings,
                amenities, and strengths — and get a clear plan to rise above
                them.{" "}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock01Icon className="w-5 h-5 text-success" />
                  Takes minutes
                </div>
                <div className="flex items-center gap-2">
                  <Zap01Icon className="w-5 h-5 text-success" />
                  No setup &mdash; just insights.
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                Analyze My Market
                <ArrowRight01Icon className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              <span className="font-semibold text-success">
                ⚡ Results in a few minutes
              </span>{" "}
              • Costs a fraction of one empty night
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
