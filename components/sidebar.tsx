'use client'

import { usePathname } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Analytics01Icon, City01Icon } from './Icons';
import { useRouter } from 'next/navigation';

export function Sidebar() {
    const [pageName, setPageName] = useState('proprties');
    const pathname = usePathname()
    const router = useRouter();

    useEffect(() => {
        const path = pathname.split('/')[1];
        setPageName(path);
    }, []);


    const sidebar = [
        {
            page: 'properties',
            links: [
                {
                    label: 'My Properties',
                    href: '/properties',
                    icon: <City01Icon className="text-secondary-foreground" />,
                },
                // {
                //     label: 'Add Property',
                //     href: '/properties/add',
                //     icon: <Add01Icon className="text-secondary-foreground" />,
                // },
                {
                    label: 'Assess Property',
                    href: '/properties/assess-property/single',
                    icon: <City01Icon className="text-secondary-foreground" />,
                },
            ]
        },
        {
            page: 'account',
            links: [
                {
                    label: 'My Profile',
                    href: '/account',
                    icon: <UserAccountIcon className="text-secondary-foreground" />,
                },
                // {
                //     label: 'My Subscription',
                //     href: '/account',
                //     icon: <UserSquareIcon className="text-secondary-foreground" />,
                // },
            ]
        },
    ];

    const setSidebar = () => {
        const path = pathname.split('/')[1];
        const page = sidebar.find((page) => page.page === path);
        if (page) {
            return page.links.map((link) => {
                return (
                    <div key={link.label} className="mx-auto my-1 mb-6 grid grid-cols-4 gap-0">
                        <div onClick={() => {
                            router.push(link.href);
                        }}
                            className="cursor-pointer col-span-1 md:mr-2 "
                            title={link.label}
                        >
                            {link.icon}
                        </div>

                        <div onClick={() => {
                            router.push(link.href);
                        }}
                            className="cursor-pointer md:col-span-3 md:visible whitespace-nowrap"
                            title={link.label}
                        >
                            {link.label}
                        </div>
                    </div>
                )
            })
        }
    }


    return (
        <div>
            {setSidebar()}
        </div>
    )
}

const UserAccountIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M14 8.99988H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 12.4999H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const UserSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const House04Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M7 9L11.7707 4.73514C13.0647 3.57838 13.7117 3 14.5 3C15.2883 3 15.9353 3.57838 17.2293 4.73514L22 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 8V20M20.5 20V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="3.5" cy="12" rx="1.5" ry="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.5 14V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 20H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 20V15.9997C12 15.0571 12 14.5858 12.2929 14.2929C12.5858 14 13.0572 14 14 14H15C15.9428 14 16.4142 14 16.7071 14.2929C17 14.5858 17 15.0572 17 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 11H15.5M13.5 8H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Add01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);