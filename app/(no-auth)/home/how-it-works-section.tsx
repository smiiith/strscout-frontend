import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const HowItWorksSection = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 gap-8">
        <Card className="border-none bg-transparent">
          <CardContent className="px-2 py-4 space-y-4">
            <div className="p-6">
              <h2 className="text-3xl md:text-6xl font-bold mb-2">
                Features and Benefits
              </h2>
              <h3 className="text-xl md:text-4xl font-semibold mb-6">
                Everything Your Competitors Are Doing — In One Report
              </h3>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">
                  See Who's Getting Booked (and Who Isn't)
                </h4>
                <p className="text-gray-700">
                  We analyze real-time calendar activity across the next 90 days
                  to reveal which listings are dominating bookings.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">
                  Analyze Amenities & Policies
                </h4>
                <p className="text-gray-700">
                  We look for pet policies, self check-in, Instant Book, and
                  other conversion-critical settings.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">
                  Evaluate Photos & Interior Design
                </h4>
                <p className="text-gray-700">
                  Side-by-side rating of photo quality, layout, staging, and
                  design cues.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">
                  Review Headlines & Descriptions
                </h4>
                <p className="text-gray-700">
                  We break down how competitors are positioning themselves — and
                  what guests see first.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">
                  Get a Written Synopsis + Actionable Feedback
                </h4>
                <p className="text-gray-700">
                  Every report includes a clear breakdown with takeaways and
                  suggestions for your own listing.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-2">
                  Download the Full Report
                </h4>
                <p className="text-gray-700">
                  PDF versions available for your records or team use.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => router.push("/market-spy")}
                  className="hover:opacity-80 h-auto"
                >
                  Start Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorksSection;
