
const ConfirmationPage = () => {
    return (
        <div className="p-8 min-h-auot md:min-h-[500px]">
            <h1 className="text-2xl mb-6 font-bold">Account Verification</h1>

            <ul className="list-disc ml-6 mb-6">
                <li>Check your email for a verification link.</li>
                <li>Click the link to verify your account.</li>
                <li>Then you can log into STR Sage.</li>
                <li>If you don&apos;t see the email in your inbox, check your spam folder.</li>
                <li>If you still can&apos;t find it, check your junk folder.</li>
            </ul>
        </div>
    )
}

export default ConfirmationPage;