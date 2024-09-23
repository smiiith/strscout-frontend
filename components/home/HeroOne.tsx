import { Button } from "../ui/button";
import Image from 'next/image';

const HeroOne = () => {

    return (
        <div className="banner md:h-full md:flex md:flex-row flex-col w-[100%] ">

            <div className="text-center content-center bg-primary-background md:h-full md:flex-none md:w-[500px] md:px-10 px-4 py-10">
                <Image
                    src="/home/logo-black.png"
                    alt="SyncNanny Logo"
                    width={500}
                    height={300}
                // layout="responsive"
                />

                <h1 className="text-4xl mb-6 mt-2 text-gray-700">24/7 Calendar Monitoring</h1>
            </div>

            <div className="banner banner-1 bg-contain bg-center md:flex-auto">
            </div>
        </div>
    )
}
export default HeroOne;