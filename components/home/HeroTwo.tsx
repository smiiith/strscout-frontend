import { Button } from "../ui/button";

const HeroTwo = () => {

    return (
        <div className="text-secondary">
            <h1 className="text-4xl mb-6 font-bold">Stop Stressing over Double Bookings</h1>
            <h2 className="text-2xl mb-6 font-bold">
                SyncNanny is here, 24/7, to Watch Over Your Calendars
            </h2>
            <p className="my-6">
                Despite software to link them, it&apos;s a fact that calendars across the major booking platforms lose their sync. This results in costly double bookings, poor customer experiences, lower ratings, lost bookings, and host status reduction. Sync Nanny is here, working 24/7 to watch over your calendars and help you successfully manage your listings. Start your FREE TRIAL today.
            </p>

            <Button className="my-6 bg-secondary">Pricing Info</Button>
        </div>
    )
}
export default HeroTwo;