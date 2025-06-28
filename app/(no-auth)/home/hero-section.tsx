import { ReactFitty } from "react-fitty";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="flex items-center w-full">
      <div className="container mx-auto px-0 grid grid-cols-12 gap-8">
        <div className="relative col-span-12 md:col-span-4 h-[300px] md:h-auto overflow-hidden">
          <Image
            src="/home/hero-2.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full md:h-auto md:h-auto mt-[-100px] md:mt-0"
          />
        </div>

        <div className="space-y-6 col-span-12 md:col-span-8 px-4 md:px-0 w-full pb-6 md:pb-0">
          <h1 className="text-6xl font-bold leading-tight">
            {/* <ReactFitty>Hosts:</ReactFitty> */}

            <div className="xl:text-7xl lg:text-7xl md:text-6xl text-4xl mt-2 md:mt-8">
              Know What Works in <br />
              Your Area - and Why
            </div>
          </h1>

          <p className="text-xl text-gray-700 w-full pr-24">
            Most hosts operate in the dark. They don't know how well their
            competitors are performing, what strategies they're using, or why
            their listings are getting booked more often.
          </p>

          <p className="text-xl text-gray-700 pr-24">
            STR Market Spy shows you which nearby listings are getting booked
            most often -- and exactly how you stack up against them.
          </p>

          <div className="flex">
            <Button
              onClick={() => router.push("/market-spy")}
              className="hover:opacity-80 h-auto mt-24!"
            >
              Run Your Market Spy Report Now
            </Button>

            <p className="w-48 ml-8">
              Takes a few minutes. <br />
              No set-up. Just insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
