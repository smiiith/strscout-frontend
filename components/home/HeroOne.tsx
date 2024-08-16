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

                <h1 className="text-3xl mb-6 mt-2 text-subheader">24/7 Calendar Monitoring</h1>
            </div>

            {/* <p className="my-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}

            {/* <Button className="my-6">Learn More</Button> */}
        </div>
    )
}
export default HeroOne;