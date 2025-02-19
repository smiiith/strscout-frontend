"use client";

import Image from 'next/image'


const TermsAndConditions = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">STR Sage – Website, Data, Software and/or Services Terms & Conditions</h1>
            <p className="text-sm text-gray-600">Last updated on February 18, 2025</p>

            <ol className="list-decimal list-inside mt-4 space-y-4">
                <li>
                    <strong>STR Sage Registration</strong>
                    <p>STR Sage offers individuals and companies (“Customer” or “Customers”) who wish to access our short-term rental insights and analysis tools a free registration option. Upon review and approval by STR Sage personnel, access to our software is granted only to Customers who provide accurate and current contact information. Anonymous registrations, including those using temporary email addresses, are not permitted. Accounts that do not comply with these requirements may be suspended or terminated.</p>
                </li>

                <li>
                    <strong>Subscription and Data License Grant</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Subject to the Customer’s payment of applicable fees and compliance with the terms of this Agreement (and any applicable sales quote or quotation), STR Sage grants the Customer and/or its authorized users a limited, non-exclusive, non-transferable license to access and use our software and content via the Internet for the term specified in the relevant quotation or subscription plan.</li>
                        <li>Acceptance of any quotation or order form provided by STR Sage constitutes the Customer’s agreement to these Terms and Conditions.</li>
                    </ul>
                </li>

                <li>
                    <strong>Ownership</strong>
                    <p>All websites, software, content, methodologies, deliverables, documentation, and related services provided by STR Sage are licensed, not sold, to the Customer. STR Sage retains all right, title, and interest—including all intellectual property rights—in and to our software and associated products. The Customer and its users acquire only the limited rights granted under this Agreement, and any rights not expressly granted herein remain the sole property of STR Sage.</p>
                </li>

                <li>
                    <strong>Payment Terms</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>For standard subscriptions, fees are payable net thirty (30) days from the date the subscription becomes effective. Late payments may result in temporary suspension of service until the account is brought current.</li>
                        <li>For self-serve subscriptions, the Customer may cancel at any time via the online account portal or by contacting support, subject to the cancellation policy outlined below.</li>
                        <li>Cancellation requests for monthly subscriptions must be received before the monthly renewal date; for annual subscriptions, cancellation must be received before the annual renewal date. Upon cancellation, the Customer will continue to have access to the service until the end of the current subscription term. No prorated refunds will be provided for unused portions of the term.</li>
                    </ul>
                </li>

                <li>
                    <strong>Term and Renewal</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Subscriptions are offered on a monthly or annual basis and are pre-paid. Unless cancelled in writing as described herein, subscriptions automatically renew for the same term.</li>
                        <li>The renewal date is based on the Customer’s initial subscription activation date.</li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default TermsAndConditions;
