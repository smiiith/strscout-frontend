"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utils.ts for cn

interface ImageSliderProps {
    images: string[]; // Array of image URLs
    interval?: number; // Time in milliseconds to display each image (default: 3000)
}

const ImageSlider: React.FC<ImageSliderProps> = ({
    images,
    interval = 3000,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false); // This state is less critical for simple CSS transitions

    useEffect(() => {
        if (images.length < 2) return; // No need to slide if less than 2 images

        const timer = setInterval(() => {
            setIsFading(true); // Initiate fade-out (visually handled by opacity-0 class)

            // Allow time for fade-out before changing image and fading in
            const fadeOutTimer = setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setIsFading(false); // New image immediately fades in (opacity-100)
            }, 500); // This delay should match your CSS transition duration

            return () => clearTimeout(fadeOutTimer);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) {
        return <div className="text-gray-500">No images to display.</div>;
    }

    return (
        <div className="relative w-full h-96 overflow-hidden">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    style={{ objectPosition: 'top left' }}
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                    )}
                />
            ))}
        </div>
    );
};

export default ImageSlider;