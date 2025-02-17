
import ServerBusyDialog from "@/components/server-busy";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image";


const StrMarketSpyLandingPage = () => {

    return (
        <>
            <div className="min-h-[700px]">
                <div className="grid grid-cols-2 p-6">

                    <div className="col-span-1">

                        <Image
                            src="/images/market-spy-logo.png"
                            alt="Str Market Spy Landing Page"
                            width={299}
                            height={121}
                            className="w-[280px] h-auto mb-8"
                        />
                        <h1 className="text-3xl font-bold">We find listings that are nearby and similar to yours.</h1>

                        <div className="space-y-4 my-4">
                            <h2 className="text-2xl">Take a deep dive into your competitors</h2>
                            <ul className="space-y-4 text-xl my-4">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Are they getting more bookings?
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    What makes them tick?
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    What is their secret sauce?
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    How can you improve to compete better?
                                </li>
                            </ul>
                        </div>

                        <div className="text-xl font-bold my-8">
                            <p>
                                $19.95 ($15.95 subscription)
                            </p>
                            <p className="">Cancel at any time.</p>
                        </div>

                    </div>

                    <div className="col-span-1 p-16">
                        <div className="space-y-6 text-xl font-bold">
                            <RadioGroup defaultValue="one-time">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="one-time" id="one-time" />
                                        <Label htmlFor="one-time" className="text-xl font-semibold">
                                            $19.95 one use for one listing
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="subscription" id="subscription" />
                                        <Label htmlFor="subscription" className="text-xl font-semibold">
                                            $15.95 monthly subscription for one listing
                                        </Label>
                                    </div>
                                </div>
                            </RadioGroup>

                            <ServerBusyDialog buttonText="Pay Securely Now" />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default StrMarketSpyLandingPage;