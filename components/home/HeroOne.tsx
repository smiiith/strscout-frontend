import { Button } from "../ui/button";
import Image from 'next/image';

const HeroOne = () => {

    return (
        <div className="h-full grid grid-cols-1 place-items-center">

            <div className="text-center">
                <Image
                    src="/home/logo.png"
                    alt="SyncNanny Logo"
                    width={500}
                    height={300}
                // layout="responsive"
                />

                <h1 className="text-4xl mb-6 mt-2 text-secondary">24/7 Calendar Monitoring</h1>
            </div>
        </div>
    )
}
export default HeroOne;