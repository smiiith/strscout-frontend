import { Button } from "@/components/ui/button"
import { Lightbulb, TelescopeIcon, TelescopeIcon as Binoculars } from "lucide-react"
import Image from 'next/image'

export default function FeatureSections() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-300">
        {/* STR Feedback Genius Section */}

        <FeatureSection
          imageSrc="/market-spy-logo.png"
          alt="STR Feedback Genius"
          title="Personalized Feedback. Clear scores for every part of your listing."
          description={
            <>
              <p className="mb-2">Actionable feedback on:</p>
              <ul className="mb-6 space-y-2">
                <li>• your hero photo</li>
                <li>• your headline</li>
                <li>• your listing description</li>
                <li>• your listing photos</li>
                <li>• your amenities</li>
                <li>• your interior design</li>
              </ul>
            </>
          }
          price="Free"
          buttonText="Sign Up Free Now"
        />

        {/* <section className="flex-1 p-6 relative">
          <div className="mb-4 flex items-center gap-4">

            <Image
              src="/market-spy-logo.png"
              alt="STR Feedback Genius"
              width={100}
              height={100}
              className="w-auto h-24"
            />

          </div>
          <h3 className="mb-4 text-xl font-bold">
            Personalized Feedback. Clear scores for every part of your listing.
          </h3>
          <p className="mb-2">Actionable feedback on:</p>
          <ul className="mb-6 space-y-2">
            <li>• your hero photo</li>
            <li>• your headline</li>
            <li>• your listing description</li>
            <li>• your listing photos</li>
            <li>• your amenities</li>
            <li>• your interior design</li>
          </ul>
          <p className="mb-4 text-xl font-bold">Free</p>
          <Button className="bg-blue-600 text-lg hover:bg-blue-700 absolute bottom-0">
            Sign Up Free Now
          </Button>
        </section> */}

        {/* STR Market Spy Section */}
        <FeatureSection
          imageSrc="/market-spy-logo.png"
          alt="STR Market Spy"
          title="We find listings that are nearby and similar to yours."
          description={
            <ul className="mb-6 space-y-2">
              <li>• Take a deep dive into your competitors</li>
              <li>• Are they getting more bookings?</li>
              <li>• what makes them tick?</li>
              <li>• What is their secret sauce?</li>
              <li>• How can you improve to compete better?</li>
            </ul>
          }
          price="$19.95 ($15.95 subscription)"
          buttonText="Sign Up Now"
        />

        {/* <section className="flex-1 p-6 relative">
          <div className="mb-4 flex items-center gap-4">

            <Image
              src="/market-spy-logo.png"
              alt="STR Market Spy"
              width={100}
              height={100}
              className="w-auto h-24"
            />

          </div>
          <h3 className="mb-4 text-xl font-bold">We find listings that are nearby and similar to yours.</h3>
          <p className="mb-2">Take a deep dive into your competitors</p>
          <ul className="mb-6 space-y-2">
            <li>• Are they getting more bookings?</li>
            <li>• what makes them tick?</li>
            <li>• What is their secret sauce?</li>
            <li>• How can you improve to compete better?</li>
          </ul>
          <p className="mb-1 text-xl font-bold">
            $19.95 <span className="text-base font-normal">($15.95 subscription)</span>
          </p>
          <p className="mb-4 text-sm text-gray-600">cancel at any time</p>
          <Button className="bg-blue-600 text-lg hover:bg-blue-700 absolute bottom-0">
            Sign Up Now
          </Button>
        </section> */}

        {/* STR Market Scout Section */}
        <FeatureSection
          imageSrc="/market-scout-logo.png"
          alt="STR Market Scout"
          title="Know if you can compete"
          description={
            <ul className="mb-6 space-y-2">
              <li>• We find nearby similar properties</li>
              <li>• How are they performing today, this month, and the upcoming months</li>
              <li>• What features do they have?</li>
              <li>• What amenities do they have?</li>
              <li>• What is the quality of their listing?</li>
            </ul>
          }
          price=""
          buttonText="Apply for Beta Test"
        />

        {/* <section className="flex-1 p-6 relative">
          <div className="mb-4 flex items-center gap-4">

            <Image
              src="/market-scout-logo.png"
              alt="STR Market Scout"
              width={100}
              height={100}
              className="w-auto h-24"
            />

          </div>
          <h3 className="mb-4 text-xl font-bold">
            Give us an address that interests you for investing. We will help you know if you can compete:
          </h3>
          <ul className="mb-6 space-y-2">
            <li>• We find nearby similar properties</li>
            <li>• How are they performing today, this month, and the upcoming months</li>
            <li>• What features do they have?</li>
            <li>• What amenities do they have?</li>
            <li>• What is the quality of their listing?</li>
          </ul>
          <Button className="bg-blue-600 text-lg hover:bg-blue-700 absolute bottom-0">
            Apply for Beta Test
          </Button>
        </section> */}
      </div>
    </div>
  )
}

const FeatureSection = ({ imageSrc, alt, title, description, price, buttonText }) => {
  return (
    <section className="flex-1 p-6 relative">
      <div className="mb-4 flex items-center gap-4">

        <Image
          src={imageSrc}
          alt={alt}
          width={100}
          height={100}
          className="w-auto h-24"
        />

      </div>
      <h3 className="mb-4 text-xl font-bold">
        {title}
      </h3>
      <div className="mb-2 text-lg">{description}</div>

      <p className="mb-8 text-xl font-bold">{price}</p>
      <Button className="bg-primary text-lg absolute bottom-0">
        {buttonText}
      </Button>
    </section>
  )
}
