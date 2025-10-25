import CompsDialog from "@/components/comps-dialog";
import ImageSlider from "@/components/image-slider";
import { MockMarketSpyComps } from "@/components/ratings-example/market-spy-mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function MarketSpyReportPreview() {
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
              See What's Really Going On in Your Market
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Your report includes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/90">
                    Breakdown of bookings in your area
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/90">
                    Policy and amenity analysis
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/90">
                    Listing quality assessment
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/90">
                    Clear summary of what's helping (or hurting) your
                    positioning
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
              Get My Report Now
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
