import Image from "next/image";
import Link from "next/link";

const Footer = ({ authenticated }: { authenticated: any }) => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-primary px-4 py-4 text-white relative">
          <footer>
            <div className="flex flex-col lg:block">
              <div>
                <ul className="space-y-2">
                  <li>Guidance by strsage.com</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center lg:hidden">
                <Link href="/guides">
                  <Image
                    src="/images/str-sage-logo-white.png"
                    alt="STR Sage"
                    width={150}
                    height={150}
                  />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block absolute bottom-8 right-8">
              <Link href="/guides">
                <Image
                  src="/images/str-sage-logo-white.png"
                  alt="STR Sage"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
