"use client";

import Image from 'next/image'


export default function FAQPage() {

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

                <h1>FAQ page</h1>
            </div>
        </>
    )
}

