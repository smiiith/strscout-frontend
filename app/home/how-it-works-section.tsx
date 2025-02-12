import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const HowItWorksSection = () => {
    return (
        <div className="w-full">
            <div className="container mx-auto px-4 gap-8">
                <Card className="border-none bg-transparent">
                    <CardContent className="px-2 py-4 space-y-4">
                        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                            How It Works
                        </h1>

                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Expert Insights Bring Your Listing into Focus</h2>

                        <p className="text-lg text-gray-800 max-w-3xl">
                            <span className="font-bold">STR Feedback Genius</span> analyzes every detail of your Airbnb listing -- your photos, your headlines, your
                            description, your amenities, even your interior design -- and provides clear, actionable feedback. We'll rate
                            each element, highlight what's working, and guide you on where to improve. It's like having a listing coach by
                            your side. Best of all, it's free. Seriously, no credit card, no BS, it's free.
                        </p>

                        <Button className="hover:opacity-80 h-auto">
                            Get Your Free Feedback
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export default HowItWorksSection;
