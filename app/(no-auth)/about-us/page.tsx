"use client";

import Image from 'next/image'


export default function AboutUsPage() {

    return (
        <>
            <div className="min-h-[700px]">
                <Image
                    src="/STR-Feedback-Genius-Logo-single-line.png"
                    alt="STR Feedback Genius"
                    width="754"
                    height="72"
                    className="w-[754] h-auto my-6"
                />

                <AboutContent />

            </div>
        </>
    )
}

const AboutContent = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-8">
                <section className="space-y-4">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="text-xl font-semibold text-muted-foreground">
                        SMARTER STR DECISIONS, POWERED BY REAL WORLD LISTINGS AND DATA
                    </p>

                    <div className="space-y-4 text-lg">
                        <p>
                            At STR Sage, we believe that clarity is the key to success in the short-term rental industry. Whether
                            you're an Airbnb host optimizing your listing, a property manager staying ahead of competitors, or an
                            investor evaluating new markets, making informed decisions can be the difference between average and
                            exceptional results.
                        </p>
                        <p>
                            That's why we built <span className="font-semibold">STR Sage</span> — a suite of expert-driven tools
                            designed to remove the guesswork and empower you with actionable insights.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">OUR MISSION</h2>
                    <p className="text-lg">
                        We help short-term rental hosts and investors make smarter, data-backed decisions with powerful, easy-to-use
                        tools.
                    </p>
                    <p className="text-lg">
                        By analyzing real listings, competitor performance, and listing optimization techniques — all in real time —
                        we provide insights that help you gain clarity.
                    </p>
                    <p className="text-lg">
                        At STR Sage, we bring industry expertise, cutting-edge AI, and clear data analysis to one place — so you
                        don't have to figure it all out alone.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">OUR SUITE OF TOOLS</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">• STR Feedback Genius</h3>
                            <p className="text-lg">
                                Get personalized feedback on your Airbnb listing, from your hero image to your amenities, with clear
                                ratings and improvement tips. (Free to use!)
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">• STR Market Spy</h3>
                            <p className="text-lg">
                                Discover what makes nearby similar listings get more bookings than yours. Analyze competitors' listings
                                to stay ahead.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">• STR Market Scout</h3>
                            <p className="text-lg">
                                Find high-demand STR markets with ease. Whether you're an investor or expanding your portfolio, we help
                                you spot profitable opportunities.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">WHY CHOOSE STR SAGE?</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">• Data-Driven Insights</h3>
                            <p className="text-lg">
                                We analyze real STR data in real time, not just opinions, not last year's data. All to help you make
                                informed decisions.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">• Built for Hosts & Investors</h3>
                            <p className="text-lg">
                                Whether you're managing one listing or building a portfolio, we provide tailored insights.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">• No Fluff, Just Actionable Advice</h3>
                            <p className="text-lg">We translate data into real, practical strategies.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">• Stay Ahead of the Market</h3>
                            <p className="text-lg">With continuous updates, we ensure you're always informed about new trends.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">THE STR SAGE PHILOSOPHY</h2>
                    <div className="space-y-4 text-lg">
                        <p>At STR Sage, we see ourselves as your guide — not just another tool.</p>
                        <p>
                            We don't believe in one-size-fits-all advice. Instead, we give customized feedback and market intelligence
                            so you can gain clarity and make the right decisions for your business.
                        </p>
                        <p>
                            Success in short-term rentals isn't about luck. It's about understanding the market, optimizing your
                            listing, and learning from top performers — and we're here to help you do just that.
                        </p>
                    </div>
                </section>

                <section className="space-y-4 text-lg">
                    <p>
                        Start optimizing today with free listing feedback or take a deeper dive into competitor and market trends
                        with STR Market Spy and STR Market Scout.
                    </p>
                    <p className="font-semibold">STR Sage — Let us show you the way.</p>
                </section>
            </div>
        </div>
    )
}



