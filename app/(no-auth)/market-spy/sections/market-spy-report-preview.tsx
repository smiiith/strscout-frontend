import ImageSlider from "@/components/image-slider";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from "lucide-react";

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
                    <BarChart01Icon className="w-4 h-4" />
                  </div>
                  <p className="text-primary-foreground/90">
                    Breakdown of bookings in your area
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                  <p className="text-primary-foreground/90">
                    Policy and amenity analysis
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp01Icon className="w-4 h-4" />
                  </div>
                  <p className="text-primary-foreground/90">
                    Listing quality assessment
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <File02Icon className="w-4 h-4" />
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
              Analyze My Market
            </Button>
          </div>

          <div>
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
