import { Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const AirbnbDirections = () => {
    return (
        <div className="w-full max-w-3xl">

            {/* desktop */}
            <div className="border-none hidden md:block">
                <CardContent className="pt-6 bg-background border-none">
                    <ol className="space-y-6">
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                1
                            </div>
                            <div className="pt-1">
                                <p>Go to Your Airbnb Listing and open your listing in a new tab</p>
                            </div>
                        </li>

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                2
                            </div>
                            <div className="pt-1">
                                <p>Click the Share Icon Button (usually found near the listing title or at the top of the page)</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={"/images/share.png"}
                                            alt="Share Icon"
                                            width="100"
                                            height="100"
                                            className="border border-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                3
                            </div>
                            <div className="pt-1">
                                <p>Choose "Copy Link"</p>
                            </div>
                        </li>

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                4
                            </div>
                            <div className="pt-1">
                                <p>Paste It Here</p>
                            </div>
                        </li>
                    </ol>
                </CardContent>
            </div>


            {/* mobile */}
            <div className="border-none block md:hidden">
                <CardContent className="pt-6 bg-background border-none">
                    <ol className="space-y-6">
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                1
                            </div>
                            <div className="pt-1">
                                <p>Open Your Listing in the App</p>
                            </div>
                        </li>

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                2
                            </div>
                            <div className="pt-1">
                                <p>Tap the Share Button</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    (Usually found under your listing's photos or in the upper right)
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={"/images/share-icon.png"}
                                            alt="Share Icon"
                                            width="40"
                                            height="40"
                                            className="border border-gray-300"
                                        />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Share Icon</span>
                                </div>
                            </div>
                        </li>

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                3
                            </div>
                            <div className="pt-1">
                                <p>Tap "Copy Link"</p>
                            </div>
                        </li>

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                4
                            </div>
                            <div className="pt-1">
                                <p>Come Back and Paste It Here</p>
                            </div>
                        </li>
                    </ol>
                </CardContent>
            </div>
        </div>
    )
}

export default AirbnbDirections;
