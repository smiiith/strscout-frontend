"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RegistrationIssuePage = () => {
    const router = useRouter();

    return (
        <div>
            <h1 className="text-3xl mb-6">We could not create your account</h1>

            <p className="w-[400px] py-4">Please make sure you have entered the correct email address and try again.</p>

            <p className="w-[400px] pb-6">If you think you have already created an account, click on Forgot Password on the registration page (after clicking the button below.).</p>

            <Button onClick={() => router.push('/register')}>Try Again</Button>

        </div >
    )
}

export default RegistrationIssuePage;