import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const RatingsSection = () => {
    return (
        <div className="w-full bg-primary">
            <div className="container mx-auto px-4 gap-8">
                <Card className="border-none bg-transparent">
                    <CardContent className="px-2 py-4 space-y-4 text-white text-lg">
                        <div className="flex justify-between">

                            <div className="space-y-8">
                                <div className="text-4xl font-bold">
                                    <p>
                                        Personalized Ratings.
                                    </p>
                                    <p>
                                        Clear scores for every part
                                        of your listing.
                                    </p>
                                </div>

                                <p>
                                    It's easy - simply show us your listing, We'll analyzie, rate, and provide actionable feedback on:
                                </p>

                                <ul className="list-disc px-4">
                                    <li>your hero photo</li>
                                    <li>your headline</li>
                                    <li>your listing description</li>
                                    <li>your listing photos</li>
                                    <li>your amenities</li>
                                    <li>your interior design</li>
                                </ul>

                                <p className="text-xl font-bold mb-0">
                                    Best of all, it's free.
                                </p>
                                <p className="text-lg font-bold !mt-0">
                                    Seriously, no credit card, no BS, it's free.
                                </p>

                                <Button className="hover:opacity-80 h-auto bg-white" variant="secondary">
                                    Get Your Free Feedback
                                </Button>
                            </div>

                            <div className="relative col-span-4">
                                <img
                                    src="/home/feedback-genius-graphic-003.png"
                                    className=""
                                />
                            </div>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export default RatingsSection;
