import { Button } from "@/components/ui/button";
import {
  Target03Icon,
  Clock01Icon,
  Zap01Icon,
  ArrowRight01Icon,
} from "@/components/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/image-slider";
import CompsDialog from "@/components/comps-dialog";
import { MockMarketSpyComps } from "@/components/ratings-example/market-spy-mock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from "lucide-react";

export function MarketSpyHero() {
  const router = useRouter();
  const [slideImages, setSlideImages] = useState<string[]>([]);

  useEffect(() => {
    setSlideImages([
      "/images/slide-market-spy-1.png",
      "/images/slide-market-spy-2.png",
      "/images/slide-market-spy-3.png",
      // "/images/slide-market-spy-4.png",
    ]);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-10 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 ">
          <div className="relative lg:flex-1">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <Card className="bg-background text-foreground p-6 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="relative w-full md:w-[600px] rounded-lg border border-border overflow-hidden p-4 bg-background">
                      <ImageSlider images={slideImages} interval={4000} />

                      <div className="absolute bottom-4 right-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              className="flex-1 sm:flex-initial text-xs h-8"
                            >
                              View Demo
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>
                                {" "}
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Video className="w-4 h-4" />
                                  STR Market Spy Demo
                                </h4>
                              </DialogTitle>
                              <DialogDescription>
                                See STR Sage in action or get in touch with our
                                team
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              {/* Video Section */}
                              <div>
                                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/dOBdLm3_Z1s"
                                    title="STR Sage Demo"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* <CompsDialog
                          comps={MockMarketSpyComps}
                          buttonText="View Demo"
                          dialogTitle="Market Analysis Report Demo"
                          filterOut100Percent={true}
                          mock={true}
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              {/* <Image
                src="/home/market-spy-graphic-004.png"
                alt="Market analysis concept"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              /> */}
              {/* <div className="absolute -bottom-12 left-4 bg-slate-200 border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center text-3xl">
                    💫
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-success">Quick</div>
                    <div className="text-md font-medium">& Easy to Use</div>
                  </div>
                </div>
              </div> */}
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
