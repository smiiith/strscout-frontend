"use client";

import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">STR Sage – Website, Data, Software and/or Services Terms & Conditions</h1>
            <p className="text-sm text-gray-600 mb-8">Last updated on February 18, 2025</p>

            <div className="space-y-6">
                {sections.map((section, index) => (
                    <div key={index} className="space-y-2">
                        <h2 className="text-lg font-semibold">
                            {index + 1}. {section.title}
                        </h2>
                        {section.content.map((paragraph, pIndex) => (
                            <div key={pIndex}>
                                {Array.isArray(paragraph) ? (
                                    <ul className="list-disc list-inside ml-4 space-y-2">
                                        {paragraph.map((item, iIndex) => (
                                            <li key={iIndex} className="text-gray-700">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">{paragraph}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const sections = [
    {
        title: "STR Sage Registration",
        content: [
            "STR Sage offers individuals and companies (\"Custome\" or \"Customers\") who wish to access our short-term rental insights and analysis tools a free registration option. Upon review and approval by STR Sage personnel, access to our software is granted only to Customers who provide accurate and current contact information. Anonymous registrations, including those using temporary email addresses, are not permitted. Accounts that do not comply with these requirements may be suspended or terminated."
        ]
    },
    {
        title: "Subscription and Data License Grant",
        content: [[
            "Subject to the Customer's payment of applicable fees and compliance with the terms of this Agreement (and any applicable sales quote or quotation), STR Sage grants the Customer and/or its authorized users a limited, non-exclusive, non-transferable license to access and use our software and content via the Internet for the term specified in the relevant quotation or subscription plan.",
            "Acceptance of any quotation or order form provided by STR Sage constitutes the Customer's agreement to these Terms and Conditions."
        ]]
    },
    {
        title: "Ownership",
        content: [
            "All websites, software, content, methodologies, deliverables, documentation, and related services provided by STR Sage are licensed, not sold, to the Customer. STR Sage retains all right, title, and interest—including all intellectual property rights—in and to our software and associated products. The Customer and its users acquire only the limited rights granted under this Agreement, and any rights not expressly granted herein remain the sole property of STR Sage."
        ]
    },
    {
        title: "Payment Terms",
        content: [[
            "For standard subscriptions, fees are payable net thirty (30) days from the date the subscription becomes effective. Late payments may result in temporary suspension of service until the account is brought current.",
            "For self-serve subscriptions, the Customer may cancel at any time via the online account portal or by contacting support, subject to the cancellation policy outlined below.",
            "Cancellation requests for monthly subscriptions must be received before the monthly renewal date; for annual subscriptions, cancellation must be received before the annual renewal date. Upon cancellation, the Customer will continue to have access to the service until the end of the current subscription term. No prorated refunds will be provided for unused portions of the term."
        ]]
    },
    {
        title: "Term and Renewal",
        content: [[
            "Subscriptions are offered on a monthly or annual basis and are pre-paid. Unless cancelled in writing as described herein, subscriptions automatically renew for the same term.",
            "The renewal date is based on the Customer's initial subscription activation date."
        ]]
    },
    {
        title: "Termination",
        content: [
            "STR Sage reserves the right to terminate any subscription for cause, including but not limited to, inappropriate or unauthorized use of the software or failure to comply with these Terms and Conditions."
        ]
    },
    {
        title: "Customer Administrator",
        content: [
            "Each Customer account is associated with a designated Customer Administrator. The Customer Administrator is responsible for managing user access, purchasing upgrades, and ensuring compliance with these Terms and Conditions."
        ]
    },
    {
        title: "Named Users and Passwords",
        content: [
            "Each licensed user must have a unique login and password. The Customer is responsible for safeguarding login credentials and ensuring that passwords are not shared. Reassignment of a licensed password to a different user is permitted, but simultaneous use by multiple users is not."
        ]
    },
    {
        title: "Account Upgrading",
        content: [
            "Upgrades to a higher subscription tier require immediate payment. Upon successful payment, upgraded features become accessible. Any upgrade charges will be prorated until the next renewal date, and credit may be applied for the remaining time on the current plan, as detailed in the applicable order form."
        ]
    },
    {
        title: "Privacy",
        content: [
            "STR Sage respects your privacy. We collect and process data in accordance with our Privacy Policy [www.strsage.com/privacypolicy], which is incorporated herein by reference. We do not collect information that identifies specific search strings or proprietary research details."
        ]
    },
    {
        title: "Confidential Information",
        content: [[
            "\"Confidential Information\" means any non-public information disclosed by either party, including but not limited to software, content, methodologies, deliverables, documentation, and Customer data, which is identified as confidential or reasonably understood to be confidential.",
            "Each party agrees to protect the other party's Confidential Information with at least the same degree of care it uses for its own confidential information, but in no event less than reasonable care.",
            "Confidential Information may only be disclosed to employees, subcontractors, or agents who have a need to know and are bound by confidentiality obligations.",
            "These confidentiality obligations shall not apply to information that is publicly available, already known, rightfully received from a third party without obligation of confidentiality, or independently developed."
        ]]
    },
    // ... Continuing with remaining sections
    {
        title: "Software Information Collection",
        content: [
            "STR Sage collects data on system usage to improve our services. Such data collection is consistent with our Privacy Policy and does not include personally identifiable search strings or proprietary research details."
        ]
    },
    {
        title: "Disclaimer and Limitation of Liability",
        content: [[
            "THE SOFTWARE AND SERVICES ARE PROVIDED \"AS IS\" WITHOUT WARRANTY OF ANY KIND. STR SAGE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ACCURACY.",
            "STR SAGE SHALL NOT BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY DAMAGES RESULTING FROM LOSS OF USE, DATA, PROFITS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO THIS AGREEMENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
            "STR SAGE's cumulative liability for all claims shall not exceed the total amount paid by the Customer in the twelve (12) months immediately preceding the claim."
        ]]
    },
    {
        title: "Misuse and Abuse of Data",
        content: [[
            "Unauthorized access, copying, scraping, or redistribution of STR Sage's data or content is strictly prohibited. STR Sage reserves the right to take appropriate legal action and suspend or terminate accounts that violate these terms.",
            "Users are prohibited from using STR Sage content to train or develop third-party AI or machine learning tools without explicit written consent."
        ]]
    },
    {
        title: "Non-Solicitation",
        content: [
            "During the term of this Agreement and for six months thereafter, neither party shall solicit or hire employees or contractors of the other without prior written consent."
        ]
    },
    {
        title: "Notices",
        content: [
            "Any notice or communication under this Agreement must be in writing and delivered to the addresses specified in the Customer's account or as otherwise provided by STR Sage. Notices may be sent via certified mail, courier, or electronic communication where delivery is confirmed."
        ]
    },
    {
        title: "Governing Law and Dispute Resolution",
        content: [[
            "This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.",
            "Any disputes, claims, or controversies arising out of or relating to this Agreement that are under $10,000 shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in [San Diego, CA] (or another agreed-upon location in California). Any dispute exceeding $10,000 or not subject to arbitration under this section shall be brought exclusively in a state or federal court located in [San Diego, CA] (or another agreed-upon location in California), and both parties hereby consent to the jurisdiction of such courts.",
            "In any arbitration or litigation proceeding, the prevailing party shall be entitled to recover its reasonable costs and attorneys' fees from the other party."
        ]]
    },
    {
        title: "Venue",
        content: [
            "All legal proceedings arising out of or in connection with this Agreement shall be exclusively brought in the courts of California, subject to the terms outlined in Section 17."
        ]
    },
    {
        title: "Injunctive Relief",
        content: [
            "If either party breaches its confidentiality or other material obligations under this Agreement, the non-breaching party may seek injunctive relief in addition to any other remedies available at law or in equity."
        ]
    },
    {
        title: "Export Compliance",
        content: [
            "The Customer agrees to comply with all applicable export laws and regulations regarding the use and distribution of the STR Sage software and related content."
        ]
    },
    {
        title: "Official Language",
        content: [
            "This Agreement and all communications between the parties shall be in English."
        ]
    },
    {
        title: "Entire Agreement; Amendments",
        content: [
            "This Agreement, together with any applicable order forms or quotations, constitutes the entire understanding between the parties regarding the subject matter hereof and supersedes all prior communications, proposals, or agreements. Any amendments must be in writing and signed by both parties."
        ]
    },
    {
        title: "Waiver",
        content: [
            "No waiver of any breach of this Agreement shall be deemed a waiver of any subsequent breach. A waiver is only effective if made in writing and signed by the waiving party."
        ]
    },
    {
        title: "Severability",
        content: [
            "If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect, and the invalid provision shall be replaced by a valid provision that most closely reflects the parties' original intent."
        ]
    },
    {
        title: "Assignment",
        content: [
            "The rights and obligations under this Agreement are personal to the Customer and may not be assigned without the prior written consent of STR Sage, except in connection with a merger or sale of substantially all of the Customer's assets. STR Sage may assign its rights under this Agreement without consent, provided that the assignee agrees to be bound by the terms herein."
        ]
    }
];

export default TermsAndConditions;