
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
                        <h1 className="text-3xl font-bold">Clarity is Power</h1>

                        <div className="space-y-4 my-4">
                            <p>
                                Success in today's STR market depends on knowing what works.
                                Are your amenities competitive? Are your photos compelling? What about your policies?
                            </p>
                            <p>
                                That's where STR Market Spy comes in.
                            </p>
                            <p>
                                Just like STR Feedback Genius, STR Market Spy digs deep — but this time, into the listings around you. It analyzes nearby competitors across occupancy, amenities, photos, descriptions, policies & more — uncovering the secret sauce behind their success.
                            </p>
                            <p>
                                See the market clearly. Act with confidence.
                            </p>
                            <p>
                                Only $19.95 - View Competitors Now (this price and phrase is clickable button)
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default StrMarketSpyLandingPage;