import Image from "next/image";

const Footer = ({ authenticated }: { authenticated: any }) => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-0 max-w-7xl bg-primary px-4 py-4 text-white relative">
          <footer>
            <div className="flex flex-col lg:block">
              <div>
                <ul className="space-y-2">
                  {authenticated && (
                    <li>
                      <a
                        href="/properties/assess-property/single"
                        className="hover:text-slate-300"
                      >
                        Get Your Free Listing Feedback Now
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="/about-us" className="hover:text-slate-300">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="hover:text-slate-300">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="hover:text-slate-300">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="hover:text-slate-300">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us" className="hover:text-slate-300">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/privacy-policy" className="hover:text-slate-300">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:text-slate-300">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>Guidance by strsage.com</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center lg:hidden">
                <Image
                  src="/images/str-sage-logo-white.png"
                  alt="STR Sage"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="hidden lg:block absolute bottom-8 right-8">
              <Image
                src="/images/str-sage-logo-white.png"
                alt="STR Sage"
                width={500}
                height={500}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
