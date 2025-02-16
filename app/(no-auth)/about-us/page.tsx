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

                <h1>About Us</h1>
            </div>
        </>
    )
}

