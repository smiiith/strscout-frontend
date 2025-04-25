"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginIssuePage = () => {
    const router = useRouter();

    return (
        <div className="pt-8 pb-[300px]">
            <h1 className="text-3xl mb-6">Hmm, we couldn&apos;t log you in</h1>

            <p className="w-[400px] py-4">We do not have an account that matches the credentials you supplied.</p>

            <p className="w-[400px] pb-6">Please double-check your email and password and try again.</p>

            <Button onClick={() => router.push('/login')}>Try Again</Button>

        </div >
    )
}

export default LoginIssuePage;