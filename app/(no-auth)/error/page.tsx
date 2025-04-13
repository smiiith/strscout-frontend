import Image from 'next/image'

export default function ErrorPage() {
    return (
        <div className="min-h-[700px]">
            <Image
                src="/STR-Feedback-Genius-Logo-single-line.png"
                alt="STR Feedback Genius"
                width="754"
                height="72"
                className="w-[754] h-auto my-6"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-8">
                    <section className="space-y-4">
                        <h1 className="text-4xl font-bold">Something went wrong...</h1>

                        <div className="space-y-4 text-lg">
                            <p>
                                There was an error. Please reach out to us using the <a href="/contact-us" className="text-blue-500 underline">contact page</a>.
                            </p>
                        </div>
                    </section>

                </div>
            </div>

        </div>

    )
}