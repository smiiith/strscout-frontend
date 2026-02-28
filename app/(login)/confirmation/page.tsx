"use client";

import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
    const searchParams = useSearchParams();
    const source = searchParams.get("source");
    const isAnonymousConversion = source === "anonymous-conversion";

    return (
        <div className="p-8 min-h-auot md:min-h-[500px]">
            <h1 className="text-2xl mb-6 font-bold">
                {isAnonymousConversion ? "Almost Done! 🎉" : "Account Verification"}
            </h1>

            {isAnonymousConversion ? (
                <>
                    <p className="mb-4">
                        Your account has been created! Just one more step to view your complete Feedback Genius report.
                    </p>
                    <ul className="list-disc ml-6 mb-6">
                        <li>Check your email for a verification link</li>
                        <li>Click the link to verify your account</li>
                        <li>You'll be automatically redirected to your full report</li>
                        <li>If you don&apos;t see the email, check your spam/junk folder</li>
                    </ul>
                </>
            ) : (
                <ul className="list-disc ml-6 mb-6">
                    <li>Check your email for a verification link.</li>
                    <li>Click the link to verify your account.</li>
                    <li>Then you can log into STR Sage.</li>
                    <li>If you don&apos;t see the email in your inbox, check your spam folder.</li>
                    <li>If you still can&apos;t find it, check your junk folder.</li>
                </ul>
            )}
        </div>
    )
}

export default ConfirmationPage;