import { Img } from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

const baseUrl = process.env.VERCEL_URL || "";

export const ScanEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        {/* <div className="text-center content-center bg-[#b0fce3] md:h-full md:flex-none md:w-full md:px-10 px-4 py-10"> */}
        <div
            style={{
                backgroundColor: "#b0fce3",
                width: "100%",
                height: "300px",
            }}
        >
            <Img src={`${baseUrl}/home/logo-black.png`} alt="SyncNanny Logo" width="300" />


            {/* <h1 className="text-4xl mb-6 mt-2 text-gray-700">We just scanned your sites, {firstName}!</h1> */}
        </div>

        <h1>We just scanned your sites, {firstName}!</h1>
    </div>
);
