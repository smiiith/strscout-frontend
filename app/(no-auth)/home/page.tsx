import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-6 px-4 md:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            STR
            <br />
            Feedback
            <br />
            Genius
          </div>
          <div className="space-x-4">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/pricing" className="hover:underline">
              Pricing
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            You Need Clarity.
            <br />
            We Get It.
          </h1>
          <p className="max-w-2xl mx-auto mb-8">
            Navigating the world of short-term rentals can be overwhelming, especially when it comes to creating a
            standout listing. Whether you're a first-time host or a seasoned pro, understanding what works -- and what
            doesn't -- can feel like a guessing game. STR Feedback Genius takes the uncertainty out of the equation. We
            dive deep into your listing to provide analysis and actionable insights, ensuring you have the clarity you
            need to attract more guests and maximize your success.
          </p>
          <Button size="lg">Get Your Free Feedback</Button>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">Take The Guesswork Out of Your Listing</h2>
          <p className="max-w-2xl mx-auto text-center mb-8">
            For many short-term rental hosts, knowing whether a listing truly stands out is a challenge. Does your
            headline attract attention? Are your photos compelling? Are your amenities competitive? Without clear
            feedback, it's easy to feel stuck or unsure.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
          <h3 className="text-2xl font-semibold mb-4 text-center">Expert Insights Bring Your Listing into Focus</h3>
          <p className="max-w-2xl mx-auto text-center mb-8">
            STR Feedback Genius analyzes every detail of your Airbnb listing -- your photos, your headlines, your
            description, your amenities, even your interior design -- and provides clear, actionable feedback. We'll
            rate each element, highlight what's working, and guide you on where to improve. It's like having a listing
            coach by your side. Best of all, it's free. Seriously, no credit card, no BS, it's free.
          </p>
          <div className="text-center">
            <Button size="lg">Get Your Free Feedback</Button>
          </div>
        </section>

        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Ratings</CardTitle>
              <CardDescription>Clear scores for every part of your listing.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                It's easy - simply show us your listing, We'll analyze, rate, and provide actionable feedback on:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>your hero photo</li>
                <li>your headline</li>
                <li>your listing description</li>
                <li>your listing photos</li>
                <li>your amenities</li>
                <li>your interior design</li>
              </ul>
              <p className="font-semibold">Best of all, it's free. Seriously, no credit card, no BS, it's free.</p>
              <div className="mt-4">
                <Button size="lg">Get Your Free Feedback</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">Got Questions? We've Got Answers.</h2>
          <div className="space-y-4">
            {[
              {
                question: "How does the feedback process work?",
                answer: "Simply share your listing link, and we'll analyze it and provide a detailed report.",
              },
              {
                question: "Is STR Feedback Genius only for AirBnB hosts?",
                answer: "At this time we specialize in AirBnB listings.",
              },
              {
                question: "How much time does it take?",
                answer:
                  "Most feedback reports are ready in minutes and are displayed here on the STR Feedback Genius site. However, you don't need to wait as our feedback reports are also sent to your email free of charge.",
              },
              {
                question: "Do I need to give my personal information?",
                answer: "No. We only need your email address and the link to your listing.",
              },
              {
                question: "Is it really free? What's the catch?",
                answer:
                  "Yes, it's really free. Seriously, no credit card, no BS, it's free. While we offer other paid services, this one is on us, no catch.",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <Button size="lg">Get Your Free Listing Feedback Now</Button>
        </section>
      </main>

      <footer className="bg-muted py-6 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 STR Feedback Genius. All rights reserved.</p>
            </div>
            <div className="space-x-4">
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p>Guidance by HostPower.tools</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

