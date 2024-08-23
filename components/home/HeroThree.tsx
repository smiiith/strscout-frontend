import { Button } from "../ui/button";
import Image from 'next/image';

const HeroThree = () => {

    return (
        <div className="text-primary">

            <h1 className="text-4xl mb-6 font-bold">How It Works</h1>
            <h2 className="text-2xl mb-6 font-bold">
                SyncNanny is busy working for you 24/7
            </h2>
            <p className="my-6">
                SyncNanny works by directly viewing each of your calendars and comparing them across platforms, looking for discrepancies. When a problem is found, it then notifies you, your co-host, or your property manager via text or email. Start your FREE TRIAL today.
            </p>

            <Button className="my-6 bg-[#c2c2c2] bg-button-background text-button-foreground">Pricing Info</Button>

        </div >
    )
}
export default HeroThree;