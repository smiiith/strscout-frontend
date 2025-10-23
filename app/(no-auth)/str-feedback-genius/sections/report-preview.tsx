import ImageSlider from "@/components/image-slider";
import RatingsDialog from "@/components/ratings-dialog";
import { Card } from "@/components/ui/card";
import { Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MockRatingsSample } from "@/components/ratings-example/mock";

export function ReportPreview() {
  const [slideImages, setSlideImages] = useState<string[]>([]);

  useEffect(() => {
    setSlideImages([
      "/images/slide-ratings-1.png",
      "/images/slide-ratings-2.png",
      "/images/slide-ratings-3.png",
    ]);
  }, []);

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            See Exactly What You'll Get
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your personalized report breaks down every element of your listing
            with clear scores and actionable improvements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Report Screenshot */}
          <div className="order-2 lg:order-1">
            <Card className="p-0 shadow-2xl">
              <div className="relative md:col-span-4 hidden md:block w-[600px] rounded-lg border border-border overflow-hidden p-4 bg-background">
                <ImageSlider images={slideImages} interval={4000} />

                <div className="absolute bottom-4 right-4">
                  <RatingsDialog ratings={MockRatingsSample} />
                </div>
              </div>

              {/* <Image
                src="/detailed-airbnb-listing-feedback-report-with-ratin.jpg"
                alt="Sample feedback report"
                width={700}
                height={600}
                className="w-full rounded-lg"
              /> */}
            </Card>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Individual Element Ratings
                </h3>
                <p className="text-muted-foreground">
                  Get specific scores for your photos, headline, description,
                  amenities, and interior design.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Actionable Recommendations
                </h3>
                <p className="text-muted-foreground">
                  No vague advice. We tell you exactly what to change and why it
                  matters for bookings.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Competitive Benchmarking
                </h3>
                <p className="text-muted-foreground">
                  See how you rank against other listings in your area and what
                  top performers do differently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
