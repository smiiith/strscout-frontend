import ImageSlider from "@/components/image-slider";
import RatingsDialog from "@/components/ratings-dialog";
import { MockRatingsSample } from "@/components/ratings-example/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RatingsSection = () => {
  const router = useRouter();
  const [slideImages, setSlideImages] = useState<string[]>([]);

  useEffect(() => {
    setSlideImages([
      "/images/slide-ratings-1.png",
      "/images/slide-ratings-2.png",
      "/images/slide-ratings-3.png",
    ]);
  }, []);

  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto px-4 gap-8">
        <Card className="border-none bg-transparent">
          <CardContent className="px-2 py-4 space-y-4 text-white text-lg">
            <div className="flex justify-between">
              <div className="space-y-8">
                <div className="text-3xl md:text-4xl font-bold">
                  <p>Personalized Ratings.</p>
                  <p>Clear scores for every part of your listing.</p>
                </div>

                <p>
                  It's easy - simply show us your listing, We'll analyzie, rate,
                  and provide actionable feedback on:
                </p>

                <ul className="list-disc px-4">
                  <li>Your hero photo</li>
                  <li>Your headline</li>
                  <li>Your listing description</li>
                  <li>Your listing photos</li>
                  <li>Your amenities</li>
                  <li>Your interior design</li>
                </ul>

                <p className="text-xl font-bold mb-0">
                  Best of all, it's free.
                </p>
                <p className="text-lg font-bold !mt-0">
                  Seriously, no credit card, no BS, it's free.
                </p>

                <Button
                  onClick={() =>
                    router.push("/properties/assess-property/single")
                  }
                  className="hover:opacity-80 h-auto bg-white"
                  variant="secondary"
                >
                  Get Your Free Feedback
                </Button>
              </div>

              <div className="relative md:col-span-4 hidden md:block w-[600px] rounded-lg border border-border overflow-hidden p-4 bg-background">
                <ImageSlider images={slideImages} interval={4000} />

                <div className="absolute bottom-4 right-4">
                  <RatingsDialog ratings={MockRatingsSample} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RatingsSection;
