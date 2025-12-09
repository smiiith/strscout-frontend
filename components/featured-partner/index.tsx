import Image from "next/image";
import Link from "next/link";

interface Partner {
  name: string;
  description: string;
  offer: string;
  code?: string;
  link: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
}

const partners: Partner[] = [
  {
    name: "InnDirectly",
    description: "Direct booking platform for vacation rentals",
    offer: "Get $10 off with code:",
    code: "SPYINN20",
    link: "https://www.inndirectly.com/",
    logo: {
      src: "/images/affiliates/inndirectly-logo-03-min.png",
      width: 200,
      height: 67,
    },
  },
  {
    name: "Hostshare",
    description: "Hosts stay free",
    offer: "Get 50% off membership",
    link: "https://www.hostshare.co/host/join?referral=richardb3",
    logo: {
      src: "/images/affiliates/hostshare-logo.png",
      width: 200,
      height: 67,
    },
  },
];

const FeaturedPartner = () => {
  return (
    <div className="container mx-auto p-0 max-w-7xl bg-white">
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Featured Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all bg-white"
            >
              {/* Logo */}
              <div className="mb-4">
                <Image
                  src={partner.logo.src}
                  alt={partner.name}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  className="object-contain"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-3 min-h-[2.5rem]">
                {partner.description}
              </p>

              {/* Offer */}
              <div className="text-center">
                {partner.code ? (
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900">
                      {partner.offer}
                    </p>
                    <div className="bg-background border-2 border-dashed border-blue-400/60 rounded px-3 py-1 font-mono font-bold text-base text-blue-700">
                      {partner.code}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-gray-900">
                    {partner.offer}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPartner;
