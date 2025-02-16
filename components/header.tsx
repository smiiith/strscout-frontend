"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import ThemeSwitch from "./ThemeSwitch"
import Image from "next/image"
import { Login01Icon, Logout01Icon, MyAccountIcon } from "./Icons"
import { useState } from "react"


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

    const pageLinks = [
        {
            label: 'Get Your Free Listing Feedback Now',
            href: '/properties/assess-property/single',
            enabled: isAuthorized,
            icon: () => { return <MyAccountIcon className="text-purple-500 ml-6" /> },
        },
        {
            label: 'My Account',
            href: '/account',
            enabled: isAuthorized,
            icon: () => { return <MyAccountIcon className="text-purple-500 ml-6" /> },
        },
        {
            label: 'My Properties',
            href: '/properties',
            enabled: isAuthorized,
            icon: () => { return <House01Icon className="text-red-500 ml-6" /> },
        },
        {
            label: 'Pricing',
            href: '/pricing',
            enabled: true,
            icon: () => { return <PiggyBankIcon className="text-blue-500 ml-6" /> },
        },
        {
            label: 'Contact Us',
            href: '/contact-us',
            enabled: true,
            icon: () => { return <Mailbox01Icon className="text-green-500 ml-6" /> },
        },
        {
            label: 'About Us',
            href: '/about-us',
            enabled: true,
            icon: () => { return <MyAccountIcon className="text-purple-500 ml-6" /> },
        },
    ]

    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-primary text-white">
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <Sheet key="left" open={sheetOpen} onOpenChange={() => setSheetOpen(!sheetOpen)}>
                {/* <Sheet> */}
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid gap-2 py-6">
                        {pageLinks.map((link: any, index: number) => (
                            <div key={`pagelinks-${index}`}>
                                {link.enabled && (
                                    <Link key={`mobile-${index}`} href={link.href} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                        {link.label}
                                    </Link>
                                )}

                                {(link.label === "My Properties") ?
                                    (
                                        <div key={`prop-${index}`}>
                                            <div className="ml-5" onClick={() => setSheetOpen(false)}>
                                                <Link href="/properties" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                                    Properties
                                                </Link>
                                            </div>
                                            <div className="ml-5" onClick={() => setSheetOpen(false)}>
                                                <Link href="/properties/add" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                                    Add
                                                </Link>
                                            </div>
                                            <div className="ml-5" onClick={() => setSheetOpen(false)}>
                                                <Link href="/properties/scans" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                                    Scans
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (<></>)
                                }

                                {(link.label === "My Account") ?
                                    (
                                        <>
                                            <div key={`account-${index}`} className="ml-5" onClick={() => setSheetOpen(false)}>
                                                <Link href="/account" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                                    Profile
                                                </Link>
                                            </div>
                                        </>
                                    ) : (<></>)
                                }

                            </div>
                        ))}
                        <form action="/auth/signout" method="post">
                            <button className="button block" type="submit">
                                Sign out
                            </button>
                        </form>
                        <a href="/login">Log In</a>
                    </div >
                </SheetContent>
            </Sheet>

            <div className="relative w-[400px] h-[50px]">
                <Link href="/" className="mr-6 md:w-[200px] w-[200px] md:relative absolute right-0 top-0" prefetch={false}>
                    <Image
                        src="/home/str-feedback-genius-logo.png"
                        alt="STR Feedback Genius"
                        width={150}
                        height={150}
                    // layout="responsive"
                    />
                </Link>
            </div>

            {/* desktop */}
            <nav className="ml-auto hidden lg:flex gap-3">
                {pageLinks.map((link: any, index: number) => (
                    <div key={`desktop-${index}`}>
                        {link.enabled && (
                            <>
                                <Link
                                    href={link.href}
                                    className="hover:underline whitespace-nowrap"
                                    prefetch={false}
                                    key={`desktop-${index}`}
                                    title={link.label}
                                >
                                    {/* {link.icon && link.icon()} */}
                                    {link.label}
                                </Link>
                            </>
                        )}
                    </div>

                ))}

                {!isAuthorized &&
                    <div className="cursor-pointer mx-6 my-auto" title="Switch mode to dark or light">
                        {/* <a href="/login" title="Log In"><Login01Icon className="h-6 w-6" /></a> */}
                        <a href="/login" title="Log In">Log In</a>
                    </div>
                }

                {isAuthorized &&
                    <form action="/auth/signout" method="post">
                        <button className="button block whitespace-nowrap ml-4" type="submit" title="Log Out">
                            Log Out
                            {/* <Logout01Icon className="h-6 w-6" /> */}
                        </button>
                    </form>
                }

                <div className="cursor-pointer mx-6 my-auto" title="Switch mode to dark or light">
                    {/* <ThemeSwitch /> */}
                </div>
            </nav>
        </header>
    )
}

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
    )
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
    )
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
    )
}

const House01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
        <path d="M13 2L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3V22H7C5.11438 22 4.17157 22 3.58579 21.4142C3 20.8284 3 19.8856 3 18V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21.9997H17C18.8856 21.9997 19.8284 21.9997 20.4142 21.4139C21 20.8281 21 19.8853 21 17.9997V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 10L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 11H8M7 15H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 22V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PiggyBankIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M13 5C17.9706 5 22 8.35786 22 12.5C22 14.5586 21.0047 16.4235 19.3933 17.7787C19.1517 17.9819 19 18.2762 19 18.5919V21H17L16.2062 19.8674C16.083 19.6916 15.8616 19.6153 15.6537 19.6687C13.9248 20.1132 12.0752 20.1132 10.3463 19.6687C10.1384 19.6153 9.91703 19.6916 9.79384 19.8674L9 21H7V18.6154C7 18.2866 6.83835 17.9788 6.56764 17.7922C5.49285 17.0511 2 15.6014 2 14.0582V12.5C2 11.9083 2.44771 11.4286 3 11.4286C3.60665 11.4286 4.10188 11.1929 4.30205 10.5661C5.32552 7.36121 8.83187 5 13 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14.5 8C13.868 7.67502 13.1963 7.5 12.5 7.5C11.8037 7.5 11.132 7.67502 10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.49981 11H7.50879" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 8.5C21.5 8 22 7.06296 22 5.83053C22 4.26727 20.6569 3 19 3C18.6494 3 18.3128 3.05676 18 3.16106" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const Mailbox01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M6.5 9H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 8V4C17.5 2.89543 18.3954 2 19.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 18L12.5 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.5 5.15889C16.5351 5 15.2591 5 13.375 5H10.625C7.70671 5 6.24757 5 5.14302 5.59039C4.27088 6.05656 3.55656 6.77088 3.09039 7.64302C2.5 8.74757 2.5 10.2067 2.5 13.125C2.5 14.876 2.5 15.7515 2.85424 16.4142C3.13394 16.9375 3.56253 17.3661 4.08581 17.6458C4.74854 18 5.62403 18 7.375 18H16.625C18.376 18 19.2515 18 19.9142 17.6458C20.4375 17.3661 20.8661 16.9375 21.1458 16.4142C21.5 15.7515 21.5 14.876 21.5 13.125C21.5 10.2067 21.5 8.74757 20.9096 7.64302C20.7356 7.31755 20.5271 7.01406 20.2887 6.73725" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.5006 18V11C12.5006 10.071 12.5006 9.60649 12.439 9.21782C12.1002 7.07836 10.4222 5.40041 8.28276 5.06155C8.2009 5.04859 8.11566 5.03835 8.02344 5.03027" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const Beach02Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M21 21C18.8012 19.7735 15.5841 19 12 19C8.41592 19 5.19883 19.7735 3 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 6.45068C7.83333 6.11465 5 6.45068 3.5 9.48348M9.5 6.45068C10.5 6.95471 11.5 8.47764 11.5 12M9.5 6.45068C12 5.94657 15 7.47125 15 11.4968M9.5 6.45068C8.5 4.43502 6.5 2.94235 3 4.95391" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 6.5C8.5 8.33333 6.5 13.5 6.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

