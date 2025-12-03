import Image from "next/image";
import Link from "next/link";

const FeaturedPartner = () => {
  return (
    <div className="container mx-auto p-0 max-w-7xl bg-white">
      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Left side - Logo */}
            <div className="flex-shrink-0">
              <Link
                href="https://www.inndirectly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/affiliates/inndirectly-logo-03-min.png"
                  alt="InnDirectly"
                  width={200}
                  height={67}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Right side - Partner info and code */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="text-center md:text-right">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Featured Partner
                </h3>
                <p className="text-sm text-gray-600">
                  Get $10 off with code:
                </p>
              </div>
              <div className="bg-background border-2 border-dashed border-blue-400/60 rounded px-4 py-2 font-mono font-bold text-lg text-blue-700">
                SPYINN20
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPartner;
