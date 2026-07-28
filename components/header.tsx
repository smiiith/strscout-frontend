import Link from "next/link";
import Image from "next/image";

const HeaderNav = (props: any) => {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-primary text-white">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <div className="relative w-[400px] h-[50px] flex items-center">
        <Link
          href="/guides"
          className="mr-6 md:w-[200px] w-[200px] md:relative absolute right-0 top-0"
          prefetch={false}
        >
          <Image
            src="/images/str-sage-logo-white.png"
            alt="STR Sage"
            width={150}
            height={150}
          />
        </Link>
      </div>
    </header>
  );
};

export default HeaderNav;
