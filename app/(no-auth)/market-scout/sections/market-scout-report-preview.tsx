import CompsDialog from "@/components/comps-dialog";
import ImageSlider from "@/components/image-slider";
import { MockMarketSpyComps } from "@/components/ratings-example/market-spy-mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart01Icon,
  CheckmarkCircle02Icon,
  TrendingUp01Icon,
  File02Icon,
} from "@/components/Icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function MarketScoutReportPreview() {
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
    <section className="py-16 md:py-24 px-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              See the Full Investment Picture Before You Buy
            </h2>

            <div className="mb-8">
              <h3 className=" mb-4">
                Our comprehensive market analysis gives you everything you need
                to make an informed investment decision.
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BarChart01Icon className="w-4 h-4" />
                  </div>
                  <p className="text-primary-foreground/90">
                    Occupancy rates up to 90 days out
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                  <p className="text-primary-foreground/90">
                    Competitive landscape analysis
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp01Icon className="w-4 h-4" />
                  </div>
                  <p className="text-primary-foreground/90">
                    Listing quality assessment
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => {
                router.push("/pricing");
              }}
            >
              Choose a plan
            </Button>
          </div>

          <div>
            <Card className="bg-background text-foreground p-6 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="relative md:col-span-4 hidden md:block w-[600px] rounded-lg border border-border overflow-hidden p-4 bg-background">
                    <ImageSlider images={slideImages} interval={4000} />

                    <div className="absolute bottom-4 right-4">
                      <CompsDialog
                        comps={MockMarketSpyComps}
                        buttonText="View Sample Report"
                        dialogTitle="Sample Market Analysis Report"
                        filterOut100Percent={true}
                        mock={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
