import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';

export default function Home() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const features = [
        "your hero photo",
        "your headline",
        "your listing description",
        "your listing photos",
        "your amenities",
        "your interior design"
    ];

    const faqs = [
        {
            question: "How does the feedback process work?",
            answer: "Simply share your listing link, and we'll analyze it and provide a detailed report."
        },
        {
            question: "Is STR Feedback Genius only for AirBnB hosts?",
            answer: "At this time we specialize in AirBnB listings."
        },
        {
            question: "How much time does it take?",
            answer: "Most feedback reports are ready in minutes and are displayed here on the STR Feedback Genius site. However, you don't need to wait as our feedback reports are also sent to your email free of charge."
        },
        {
            question: "Do I need to give my personal information?",
            answer: "No. We only need your email address and the link to your listing."
        },
        {
            question: "Is it really free? What's the catch?",
            answer: "Yes, it's really free. Seriously, no credit card, no BS, it's free. While we offer other paid services, this one is on us, no catch."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-5xl font-bold mb-4">You Need Clarity.</h1>
                <h2 className="text-4xl font-bold mb-8">We Get It.</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                    Navigating the world of short-term rentals can be overwhelming, especially
                    when it comes to creating a standout listing. Whether you're a first-time host
                    or a seasoned pro, understanding what works -- and what doesn't -- can
                    feel like a guessing game.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Your Free Feedback
                </Button>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
                    <Card className="max-w-3xl mx-auto">
                        <CardHeader>
                            <CardTitle>Expert Insights Bring Your Listing into Focus</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-6">
                                STR Feedback Genius analyzes every detail of your Airbnb listing -- your photos, your headlines, your
                                description, your amenities, even your interior design -- and provides clear, actionable feedback.
                            </p>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-xl">We'll analyze, rate, and provide actionable feedback on:</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    {features.map((feature, index) => (
                                        <li key={index} className="text-gray-700">{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="font-bold mb-4">Best of all, it's free.</p>
                                <p className="italic mb-6">Seriously, no credit card, no BS, it's free.</p>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Get Your Free Feedback
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center mb-16">Got Questions? We've Got Answers.</h2>
                <div className="max-w-2xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg">
                            <button
                                className="w-full px-4 py-3 text-left font-medium flex justify-between items-center"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                {faq.question}
                                <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            {openFaq === index && (
                                <div className="px-4 py-3 border-t">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">STR Feedback Genius</h3>
                            <p className="text-sm text-gray-400">Guidance by HostPower.tools</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                                <li><a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
