import { Button } from "@/components/ui/button";
import {
  Target03Icon,
  Clock01Icon,
  Zap01Icon,
  ArrowRight01Icon,
} from "@/components/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MarketSpyHero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-10 pb-20 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 ">
          <div className="relative lg:flex-1">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <Image
                src="/home/market-spy-graphic-004.png"
                alt="Market analysis concept"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 left-4 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Target03Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">STR</div>
                    <div className="text-sm font-medium">Market Spy</div>
                  </div>
                </div>
              </div>
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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              See the Winners. See Why.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              See live occupancy near you and what top competitors do
              differently — amenities, photos, headlines, descriptions, interior
              design, policies, and more.
            </p>

            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <p className="text-base leading-relaxed mb-4">
                <span className="font-semibold text-foreground">
                  STR Market Spy
                </span>{" "}
                shows who's getting booked now and how you stack up.
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
                Get My Report Now
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
