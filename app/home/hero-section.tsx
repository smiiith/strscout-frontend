import { ReactFitty } from "react-fitty";
import { Button } from "@/components/ui/button";


const HeroSection = () => {
    return (
        <div className="flex items-center w-full">
            <div className="container mx-auto px-0 grid grid-cols-12 gap-8">
                <div className="relative col-span-12 md:col-span-4 h-[300px] md:h-auto overflow-hidden">
                    <img
                        src="/home/feedback-genius-graphic-002.png"
                        className="w-full md:h-auto md:h-auto mt-[-100px] md:mt-0"
                    />
                </div>

                <div className="space-y-6 col-span-12 md:col-span-8 px-4 md:px-0 w-full pb-6 md:pb-0">
                    <h1 className="text-6xl font-bold leading-tight">

                        <div className="visible md:hidden text-5xl">
                            You Need Clarity.
                        </div>

                        <div className="invisible h-0 md:visible md:h-auto">
                            <ReactFitty>
                                You Need Clarity.
                            </ReactFitty>
                        </div>


                        <div className="xl:text-8xl lg:text-7xl md:text-7xl text-5xl">
                            We Get it.
                        </div>

                    </h1>

                    <p className="text-xl text-gray-700 w-full">
                        Navigating the world of short-term rentals can be overwhelming, especially
                        when it comes to creating a standout listing. Whether you're a first-time host
                        or a seasoned pro, understanding what works -- and what doesn't -- can
                        feel like a guessing game.
                    </p>

                    <p className="text-xl text-gray-700">
                        <span className="font-bold">STR Feedback Genius</span> takes the uncertainty
                        out of the equation. We dive deep into your listing to provide analysis and
                        actionable insights, ensuring you have the clarity you need to attract more
                        guests and maximize your success.
                    </p>

                    <Button
                        className="hover:opacity-80 h-auto"
                    >
                        Get Your Free Feedback
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
