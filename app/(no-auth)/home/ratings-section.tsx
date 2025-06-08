import ImageSlider from "@/components/image-slider";
import RatingsDialog from "@/components/ratings-dialog";
import { getMockRatings, MockRatingsSample } from "@/components/ratings-example/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { set } from "date-fns";
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
                                    <p>
                                        See What's Really Going on
                                    </p>
                                    <p>
                                        in Your Market
                                    </p>
                                </div>

                                <p>
                                    Your report includes:
                                </p>

                                <ul className="list-disc px-4">
                                    <li>Breakdown of bookings in your area</li>
                                    <li>Policy and amenity analysis</li>
                                    <li>Listing quality assessment</li>
                                    <li>Clear summary of what's helping (or hurting) your positioning</li>
                                </ul>

                                <Button
                                    onClick={() => router.push('/market-spy')}
                                    className="hover:opacity-80 h-auto bg-white"
                                    variant="secondary">
                                    Generate My Report Now
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
}

export default RatingsSection;
