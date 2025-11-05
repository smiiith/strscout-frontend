"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import {
  Login01Icon,
  Logout01Icon,
  MailEdit02Icon,
  MyAccountIcon,
} from "./Icons";
import React, { useState } from "react";
import { PLANS } from "@/app/types/plans";

const HeaderNav = (props: any) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  let isAuthorized = false;

  if (props && props.user) {
    isAuthorized = true;
  }

  // if (isAuthorized) {
  //     console.log("user in header", props.user);
  // } else {
  //     console.log("no user");
  // }

  // Authenticated users see all available links based on their permissions
  const authenticatedLinks = [
    {
      label: "Feedback Genius",
      href: "/feedback-genius/analyze",
      enabled: true,
      icon: () => {
        return <MyAccountIcon className="text-purple-500 ml-6" />;
      },
    },
    {
      label: "Market Spy",
      href: "/market-spy/analyze",
      enabled:
        props.user &&
        props.user.plan &&
        (props.user.plan.key === PLANS.STANDARD ||
          props.user.plan.key === PLANS.PRO),
      icon: () => {
        return <House01Icon className="text-red-500 ml-6" />;
      },
    },
    {
      label: "Market Scout 🧪",
      href: "/market-scout/analyze",
      enabled:
        props.user && props.user.plan && props.user.plan.key === PLANS.PRO,
      icon: () => {
        return <House01Icon className="text-red-500 ml-6" />;
      },
    },
    {
      label: "Pricing",
      href: "/pricing",
      enabled: true,
      icon: () => {
        return <PiggyBankIcon className="text-blue-500 ml-6" />;
      },
    },
    {
      label: "About Us",
      href: "/about-us",
      enabled: true,
      icon: () => {
        return <MyAccountIcon className="text-purple-500 ml-6" />;
      },
    },
    {
      label: "My Account",
      href: "/account",
      enabled: true,
      icon: () => {
        return <MyAccountIcon className="text-primary-foreground mx-1" />;
      },
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      enabled: true,
      icon: () => {
        return <MailEdit02Icon className="text-primary-foreground mx-1" />;
      },
    },
  ];

  // My Reports submenu items
  const myReportsLinks = [
    {
      label: "Feedback Genius Reports",
      href: "/properties",
      enabled: true,
      icon: () => {
        return <House01Icon className="text-red-500 ml-6" />;
      },
    },
    {
      label: "Market Spy Reports",
      href: "/my-comps",
      enabled:
        props.user && props.user.plan && props.user.plan.key === PLANS.PRO,
      icon: () => {
        return <House01Icon className="text-red-500 ml-6" />;
      },
    },
    {
      label: "Market Scout Reports 🧪",
      href: "/market-scout-reports",
      enabled:
        props.user && props.user.plan && props.user.plan.key === PLANS.PRO,
      icon: () => {
        return <House01Icon className="text-red-500 ml-6" />;
      },
    },
  ];

  // Products submenu items for unauthenticated users
  const productsLinks = [
    {
      label: "STR Feedback Genius",
      href: "/feedback-genius",
      enabled: true,
      icon: () => {
        return (
          <Image
            src="/images/icons/str-feedback-genius-icon.png"
            alt="STR Feedback Genius"
            width={24}
            height={24}
          />
        );
      },
    },
    {
      label: "STR Market Spy",
      href: "/market-spy",
      enabled: true,
      icon: () => {
        return (
          <Image
            src="/images/icons/market-spy-icon.png"
            alt="STR Market Spy"
            width={24}
            height={24}
          />
        );
      },
    },
    {
      label: "STR Market Scout 🧪",
      href: "/market-scout",
      enabled: true,
      icon: () => {
        return (
          <Image
            src="/images/icons/market-scout-icon.png"
            alt="STR Market Scout"
            width={24}
            height={24}
          />
        );
      },
    },
  ];

  // Check if any My Reports links are enabled
  const hasMyReportsAccess = myReportsLinks.some((link) => link.enabled);

  // Unauthenticated users see limited links
  const unauthenticatedLinks = [
    {
      label: "Pricing",
      href: "/pricing",
      enabled: true,
      icon: () => {
        return <PiggyBankIcon className="text-blue-500 ml-6" />;
      },
    },
    {
      label: "About Us",
      href: "/about-us",
      enabled: true,
      icon: () => {
        return <MyAccountIcon className="text-purple-500 ml-6" />;
      },
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      enabled: true,
      icon: () => {
        return <MailEdit02Icon className="text-primary-foreground mx-1" />;
      },
    },
  ];

  const pageLinks = isAuthorized ? authenticatedLinks : unauthenticatedLinks;
  const mobileLinks = isAuthorized
    ? [...authenticatedLinks, ...myReportsLinks]
    : [...unauthenticatedLinks, ...productsLinks];

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-primary text-white">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <Sheet
        key="left"
        open={sheetOpen}
        onOpenChange={() => setSheetOpen(!sheetOpen)}
      >
        {/* <Sheet> */}
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            {pageLinks.map((link: any, index: number) => (
              <div key={`pagelinks-${index}`}>
                {link.enabled && (
                  <Link
                    key={`mobile-${index}`}
                    href={link.href}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                    onClick={() => setSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            {isAuthorized && hasMyReportsAccess && (
              <div className="py-2">
                <div className="text-lg font-semibold mb-2 text-gray-600">
                  My Reports
                </div>
                {myReportsLinks.map((link: any, index: number) => (
                  <div key={`my-reports-${index}`} className="ml-4">
                    {link.enabled && (
                      <Link
                        href={link.href}
                        className="flex w-full items-center py-2 text-base font-medium"
                        prefetch={false}
                        onClick={() => setSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
            {!isAuthorized && (
              <div className="py-2">
                <div className="text-lg font-semibold mb-2 text-gray-600">
                  Products
                </div>
                {productsLinks.map((link: any, index: number) => (
                  <div key={`products-mobile-${index}`} className="ml-4">
                    {link.enabled && (
                      <Link
                        href={link.href}
                        className="flex w-full items-center py-2 text-base font-medium"
                        prefetch={false}
                        onClick={() => setSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
            {isAuthorized && (
              <form action="/auth/signout" method="post" className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="w-full justify-start"
                  onClick={() => setSheetOpen(false)}
                >
                  <Logout01Icon className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </form>
            )}
            {!isAuthorized && (
              <Link
                href="/login"
                className="mt-4 block"
                onClick={() => setSheetOpen(false)}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Login01Icon className="h-4 w-4 mr-2" />
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <div className="relative w-[400px] h-[50px] flex items-center">
        <Link
          href="/"
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

      {/* desktop */}
      <nav className="ml-auto hidden lg:flex gap-3 items-center">
        {/* Products Dropdown for unauthenticated users */}
        {!isAuthorized && (
          <div className="mx-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-white hover:text-white p-0 h-auto text-base font-normal hover:underline focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[active]:bg-transparent">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[250px]">
                      {productsLinks.map((link: any, index: number) => (
                        <li key={`products-dropdown-${index}`}>
                          {link.enabled && (
                            <NavigationMenuLink asChild>
                              <Link
                                href={link.href}
                                className="flex block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="mr-2">
                                  {link.icon && link.icon()}
                                </div>
                                <div className="text-sm font-medium leading-none">
                                  {link.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
        {pageLinks.map((link: any, index: number) => {
          // Check if Market Spy or Market Scout is enabled in pageLinks
          const marketSpyEnabled = pageLinks.some(
            (l: any) => l.href === "/market-spy/analyze" && l.enabled
          );
          const marketScoutEnabled = pageLinks.some(
            (l: any) => l.href === "/market-scout/analyze" && l.enabled
          );
          // Determine if we should show My Reports after this link
          // Show after Market Scout if enabled, otherwise after Market Spy if enabled, otherwise after Feedback Genius
          const showMyReportsAfter =
            (link.href === "/market-scout/analyze" && link.enabled) ||
            (link.href === "/market-spy/analyze" &&
              link.enabled &&
              !marketScoutEnabled) ||
            (link.href === "/feedback-genius/analyze" &&
              !marketSpyEnabled &&
              !marketScoutEnabled);

          return (
            <React.Fragment key={`desktop-${index}`}>
              <div className="flex items-center">
                {link.enabled && (
                  <Link
                    href={link.href}
                    className="hover:underline whitespace-nowrap flex items-center"
                    prefetch={false}
                    title={link.label}
                  >
                    {link.href === "/contact-us" ? (
                      <>{link.icon && link.icon()}</>
                    ) : link.href === "/account" && isAuthorized ? (
                      <>{link.icon && link.icon()}</>
                    ) : (
                      <div className="mr-4">{link.label}</div>
                    )}
                  </Link>
                )}
              </div>

              {/* My Reports Dropdown - shown after Market Spy or STR Genius */}
              {showMyReportsAfter && isAuthorized && hasMyReportsAccess && (
                <div className="mx-4">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-white hover:text-white p-0 h-auto text-base font-normal hover:underline focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[active]:bg-transparent">
                          My Reports
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 w-[250px]">
                            {myReportsLinks.map((link: any, idx: number) => (
                              <li key={`dropdown-${idx}`}>
                                {link.enabled && (
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={link.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                      <div className="text-sm font-medium leading-none">
                                        {link.label}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                )}
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {!isAuthorized && (
          <Link href="/login" className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Login01Icon className="h-4 w-4 mr-2" />
              Sign in
            </Button>
          </Link>
        )}

        {isAuthorized && (
          <form
            action="/auth/signout"
            method="post"
            className="flex items-center"
          >
            <Button
              variant="outline"
              size="sm"
              type="submit"
              className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Logout01Icon className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </form>
        )}

        {/* <div className="cursor-pointer mx-6 my-auto" title="Switch mode to dark or light"> */}
        {/* <ThemeSwitch /> */}
        {/* </div> */}
      </nav>
    </header>
  );
};

export default HeaderNav;

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const House01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill={"none"}
    {...props}
  >
    <path
      d="M13 2L2 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3V22H7C5.11438 22 4.17157 22 3.58579 21.4142C3 20.8284 3 19.8856 3 18V7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7L22 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 21.9997H17C18.8856 21.9997 19.8284 21.9997 20.4142 21.4139C21 20.8281 21 19.8853 21 17.9997V11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 10L18 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 11H8M7 15H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 14H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 22V18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PiggyBankIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M13 5C17.9706 5 22 8.35786 22 12.5C22 14.5586 21.0047 16.4235 19.3933 17.7787C19.1517 17.9819 19 18.2762 19 18.5919V21H17L16.2062 19.8674C16.083 19.6916 15.8616 19.6153 15.6537 19.6687C13.9248 20.1132 12.0752 20.1132 10.3463 19.6687C10.1384 19.6153 9.91703 19.6916 9.79384 19.8674L9 21H7V18.6154C7 18.2866 6.83835 17.9788 6.56764 17.7922C5.49285 17.0511 2 15.6014 2 14.0582V12.5C2 11.9083 2.44771 11.4286 3 11.4286C3.60665 11.4286 4.10188 11.1929 4.30205 10.5661C5.32552 7.36121 8.83187 5 13 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 8C13.868 7.67502 13.1963 7.5 12.5 7.5C11.8037 7.5 11.132 7.67502 10.5 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.49981 11H7.50879"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 8.5C21.5 8 22 7.06296 22 5.83053C22 4.26727 20.6569 3 19 3C18.6494 3 18.3128 3.05676 18 3.16106"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Mailbox01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M6.5 9H8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 8V4C17.5 2.89543 18.3954 2 19.5 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 18L12.5 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M17.5 5.15889C16.5351 5 15.2591 5 13.375 5H10.625C7.70671 5 6.24757 5 5.14302 5.59039C4.27088 6.05656 3.55656 6.77088 3.09039 7.64302C2.5 8.74757 2.5 10.2067 2.5 13.125C2.5 14.876 2.5 15.7515 2.85424 16.4142C3.13394 16.9375 3.56253 17.3661 4.08581 17.6458C4.74854 18 5.62403 18 7.375 18H16.625C18.376 18 19.2515 18 19.9142 17.6458C20.4375 17.3661 20.8661 16.9375 21.1458 16.4142C21.5 15.7515 21.5 14.876 21.5 13.125C21.5 10.2067 21.5 8.74757 20.9096 7.64302C20.7356 7.31755 20.5271 7.01406 20.2887 6.73725"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.5006 18V11C12.5006 10.071 12.5006 9.60649 12.439 9.21782C12.1002 7.07836 10.4222 5.40041 8.28276 5.06155C8.2009 5.04859 8.11566 5.03835 8.02344 5.03027"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Beach02Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M21 21C18.8012 19.7735 15.5841 19 12 19C8.41592 19 5.19883 19.7735 3 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 6.45068C7.83333 6.11465 5 6.45068 3.5 9.48348M9.5 6.45068C10.5 6.95471 11.5 8.47764 11.5 12M9.5 6.45068C12 5.94657 15 7.47125 15 11.4968M9.5 6.45068C8.5 4.43502 6.5 2.94235 3 4.95391"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 6.5C8.5 8.33333 6.5 13.5 6.5 19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
