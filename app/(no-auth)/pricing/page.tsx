"use client";

import ServerBusyDialog from "@/components/server-busy";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StripeCheckoutButton from "@/components/stripe-checkout-button";

export default function FeatureSections() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-300">
        {/* STR Feedback Genius Section */}
        <FeatureSection
          imageSrc="/images/str-feedback-genius-logo-stacked.png"
          alt="STR Feedback Genius"
          title="Personalized Feedback. Clear scores for every part of your listing."
          description={
            <>
              <p className="mb-2">Actionable feedback on:</p>
              <ul className="mb-6 space-y-2">
                <li>• Your hero photo</li>
                <li>• Your headline</li>
                <li>• Your listing description</li>
                <li>• Your listing photos</li>
                <li>• Your amenities</li>
                <li>• Your interior design</li>
              </ul>
            </>
          }
          price="Free"
        >
          <Button
            className="bg-primary text-lg absolute bottom-0"
            onClick={() => {
              router.push("/register");
            }}
          >
            Sign Up Free Now
          </Button>
        </FeatureSection>

        {/* STR Market Spy Section */}
        <FeatureSection
          imageSrc="/market-spy-logo.png"
          alt="STR Market Spy"
          title="We find listings that are nearby and similar to yours."
          description={
            <div className="space-y-4 my-4">
              <p>
                Success in today's STR market depends on knowing what works. Are
                your amenities competitive? Are your photos compelling? What
                about your policies?
              </p>
              <p>That's where STR Market Spy comes in.</p>
              <p>
                Just like STR Feedback Genius, STR Market Spy digs deep — but
                this time, into the listings around you. It analyzes nearby
                competitors across occupancy, amenities, photos, descriptions,
                policies & more — uncovering the secret sauce behind their
                success.
              </p>
              <p>See the market clearly. Act with confidence.</p>
            </div>
          }
          price=""
        >
          <StripeCheckoutButton
            priceId="price_1Rf3qeRQojxLKgwUSlmUkEbH"
            buttonText="Only $19.95 - View Competitors Now"
            className="bg-primary text-lg absolute bottom-0"
          />
        </FeatureSection>

        {/* STR Market Scout Section */}
        <FeatureSection
          imageSrc="/market-scout-logo.png"
          alt="STR Market Scout"
          title="Know if you can compete"
          description={
            <ul className="mb-6 space-y-2">
              <li>• We find nearby similar properties</li>
              <li>
                • How are they performing today, this month, and the upcoming
                months
              </li>
              <li>• What features do they have?</li>
              <li>• What amenities do they have?</li>
              <li>• What is the quality of their listing?</li>
            </ul>
          }
          price=""
        >
          <Button
            className="bg-primary text-lg absolute bottom-0"
            onClick={() => {
              router.push("/contact-us");
            }}
          >
            Apply for Beta Test
          </Button>
        </FeatureSection>
      </div>
    </div>
  );
}

const FeatureSection = ({
  imageSrc,
  alt,
  title,
  description,
  price,
  children,
}: {
  imageSrc: any;
  alt: string;
  title: string;
  description: React.ReactNode;
  price: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className="flex-1 py-6 px-0 md:p-6 relative mb-8 md:mb-0">
      <div className="mb-4 flex items-center gap-4">
        <Image
          src={imageSrc}
          alt={alt}
          width={233}
          height={80}
          quality={100}
          className="w-auto h-[80px] mb-4"
        />
      </div>
      <h3 className="mb-4 text-xl font-bold">{title}</h3>
      <div className="mb-2 text-lg">{description}</div>

      <p className="mb-8 text-xl font-bold">{price}</p>

      {children}
    </section>
  );
};
