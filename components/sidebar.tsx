'use client'

import { usePathname } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export function Sidebar() {
    const [pageName, setPageName] = useState('proprties');
    const pathname = usePathname()

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
                    icon: <City01Icon />,
                },
                {
                    label: 'Add Property',
                    href: '/properties/add',
                },
            ]
        },
        {
            page: 'account',
            links: [
                {
                    label: 'My Info',
                    href: '/profile/info',
                    icon: <UserAccountIcon className="text-foreground w-[40px] h-[40px]" />,
                },
                {
                    label: 'Profile Pic',
                    href: '/profile/pic',
                    icon: <UserSquareIcon className="text-foreground w-[40px] h-[40px]" />,
                },
            ]
        }
    ];

    const setSidebar = () => {
        const path = pathname.split('/')[1];
        const page = sidebar.find((page) => page.page === path);
        if (page) {
            return page.links.map((link) => {
                return (
                    <div key={link.label} className="mx-auto my-1 mb-6">
                        <a href={link.href} title={link.label}>{link.icon}</a>
                        <div>{link.label}</div>
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

const City01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M14 8H10C7.518 8 7 8.518 7 11V22H17V11C17 8.518 16.482 8 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 12L13 12M11 15H13M11 18H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 22V8.18564C21 6.95735 21 6.3432 20.7013 5.84966C20.4026 5.35612 19.8647 5.08147 18.7889 4.53216L14.4472 2.31536C13.2868 1.72284 13 1.93166 13 3.22873V7.7035" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 22V13C3 12.1727 3.17267 12 4 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 22H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

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