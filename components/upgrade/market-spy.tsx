import { PLANS } from "@/app/types/plans";
import ServerBusyDialog from "@/components/server-busy";
import Image from "next/image";
import StripeCheckoutButton from "../stripe-checkout-button";

const UpgradeMarketSpy = () => {
  return (
    <div className="min-h-[700px]">
      <div className="grid grid-cols-2 p-6">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-8">
            STR Market Spy requires a{" "}
            <span className="capitalize">{PLANS.PRO}</span> plan
          </h1>

          <Image
            src="/images/market-spy-logo.png"
            alt="Str Market Spy Landing Page"
            width={299}
            height={121}
            className="w-[280px] h-auto mb-8"
          />

          <div className="space-y-4 my-4">
            <p>
              Success in today's STR market depends on knowing what works. Are
              your amenities competitive? Are your photos compelling? What about
              your policies?
            </p>
            <p>That's where STR Market Spy comes in.</p>
            <p>
              Just like STR Feedback Genius, STR Market Spy digs deep — but this
              time, into the listings around you. It analyzes nearby competitors
              across occupancy, amenities, photos, descriptions, policies & more
              — uncovering the secret sauce behind their success.
            </p>
            <p>See the market clearly. Act with confidence.</p>

            <StripeCheckoutButton
              priceId="price_1Rf3qeRQojxLKgwUSlmUkEbH"
              buttonText="Only $19.95 - Upgrade Now"
              className="bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeMarketSpy;
