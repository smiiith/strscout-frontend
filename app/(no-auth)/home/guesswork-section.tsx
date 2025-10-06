"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const GuessworkSection = () => {
  const router = useRouter();

  return (
    <div className="bg-ring w-full">
      <div className="container mx-auto px-4 gap-8">
        <Card className="border-none bg-transparent">
          <CardContent className="px-2 py-4 space-y-4">
            <div className="">
              <h2 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4">
                More Bookings. Same Area. What Gives?
              </h2>
              <p className="mb-4">
                Your competitors are winning reservations -- sometimes right
                next next door. But why?
              </p>
              <ul className="list-disc ml-6 mb-6">
                <li>Do they have better amenities?</li>
                <li>Are they using Instant Book?</li>
                <li>Do they allow pets?</li>
                <li>Is their design more appealing?</li>
                <li>Are they writing better descriptions?</li>
              </ul>
              <p>
                STR Market Spy digs in -- and shows you exactly what you're
                missing.
              </p>

              <div className="mt-12">
                <Button
                  onClick={() => router.push("/market-spy")}
                  className="hover:opacity-80 h-auto"
                >
                  Get Competitor Insights Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuessworkSection;
