import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";


const AnswersSection = () => {
    const router = useRouter();

    return (
        <div className="w-full">
            <div className="container mx-auto px-4 gap-8">
                <Card className="border-none bg-transparent">
                    <CardContent className="px-2 py-4 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                            Got Questions? We've Got Answers.
                        </h1>

                        <p className="text-xl font-bold !mb-0">How does the feedback process work?</p>
                        <p className="!mt-0">
                            Simply share your listing link, and we'll analyze it and provide a detailed report.
                        </p>

                        <p className="text-xl font-bold !mb-0">
                            Is STR Feedback Genius only for AirBnB hosts?
                        </p>
                        <p className="!mt-0">
                            At this time we specialize in AirBnB listings.
                        </p>

                        <p className="text-xl font-bold !mb-0">
                            How much time does it take?
                        </p>
                        <p className="!mt-0">
                            Most feedback reports are ready in minutes and are displayed here on the STR Feedback Genius site.
                        </p>
                        <p className="!mt-0">
                            However, you don't need to wait as our feedback reports are also sent to your email free of charge.
                        </p>

                        <p className="text-xl font-bold !mb-0">
                            Do I need to give my personal information?
                        </p>
                        <p className="!mt-0">
                            No. We only need your email address and the link to your listing.
                        </p>

                        <p className="text-xl font-bold !mb-0">
                            Is it really free? What's the catch?
                        </p>
                        <p className="!mt-0">
                            Yes, it's really free. Seriously, no credit card, no BS, it's free. While we offer other paid services, this one is on
                            us, no catch.
                        </p>

                        <Button
                            onClick={() => router.push('/properties/assess-property/single')}
                            className="hover:opacity-80 h-auto"
                        >
                            Start Now
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export default AnswersSection;
