"use client";

import RatingsDialog from "@/components/ratings-dialog";
import { MockRatingsSample } from "@/components/ratings-example/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

const AnswersSection = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 gap-8">
        <Card className="border-none bg-transparent">
          <CardContent className="px-2 py-4 space-y-4">
            <div className="p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  What do you mean by nearby competitors?
                </h3>
                <p className="text-gray-700">
                  We find 10-20 listings that are both close in proximity and
                  similar to yours (type of stay and number of bedrooms).
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  What data do you analyze?
                </h3>
                <p className="text-gray-700">
                  Booking activity, listing details, photos, amenities,
                  policies, and more.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  How accurate is the data?
                </h3>
                <p className="text-gray-700">
                  The data is gathered in real time from real listings -- it's
                  up to the minute accurate.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Why do you use current bookings rather than historical booking
                  data?
                </h3>
                <p className="text-gray-700">
                  Historical data should be considered for context, but it's
                  usefullness is limited. The idea that past results effect
                  future performance is known as The Gambler's Fallacy. It's
                  best to make informed decisions based on current data, not
                  historical data.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Can I try it for free?
                </h3>
                <p className="text-gray-700">
                  You can run a free feedback report on your listing -- find out{" "}
                  <span
                    onClick={() =>
                      router.push("/properties/assess-property/single")
                    }
                    className="text-blue-600 underline cursor-pointer"
                  >
                    more here
                  </span>
                  . The free feedback won't include bookings nor competition
                  analysis, but it will give you an idea of what we do. You can
                  also{" "}
                  <RatingsDialog ratings={MockRatingsSample} textLink={true} />.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-700">
                  Yes. You can choose a one time report and there are no further
                  charges. We recommend a monthly plan so you can keep constant
                  tabs on your competition. Our monthly plans are flexible and
                  cancelable anytime.
                </p>
              </div>
              <div className="mt-12">
                <Button
                  onClick={() => {
                    posthog.capture("faq_clicked_start_now", {
                      page: window.location.pathname,
                    });

                    router.push("/properties/assess-property/single");
                  }}
                  className="hover:opacity-80"
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

export default AnswersSection;
