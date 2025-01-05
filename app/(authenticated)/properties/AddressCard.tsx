'use client'

import { use, useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PropertyRatings from '@/components/PropertyRatings'


interface AddressCardProps {
    title: string
    externalId: string
    propertyId: string
    property: any
}

export default function AddressCard({ title, externalId, propertyId, property }: AddressCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [ratedProperties, setRatedProperties] = useState<any[]>([]);
    const [formattedRatings, setFormattedRatings] = useState<any>([]);

    console.log("property", property);

    useEffect(() => {
        console.log("formatted ratings", property);

        if (property) {
            const ratings = {
                description: {
                    name: "Description",
                    score: property.description_rating_number,
                    category: property.description_rating_category,
                    // feedback: property.feedback,
                    // suggestions: property.suggestions,
                },
                amenities: {
                    name: "Amenities",
                    score: property.amenities_rating_number,
                    category: property.amenities_rating_category,
                    // feedback: property.feedback,
                    // suggestions: property.suggestions,
                },
                feedback: property.feedback,
                suggestions: property.suggestions,
                // heroImage: {
                //     name: "Hero Image",
                //     score: 95,
                //     feedback: "Your hero image is excellent! It showcases your property beautifully and is likely to catch the eye of potential guests.",
                //     suggestions: "Consider adding a few more high-quality images to give guests a comprehensive view of your property."
                // }
            }
            setFormattedRatings(ratings);
        }
    }, [property])

    return (
        <>
            <Card
                className="cursor-pointer hover:shadow-lg transition-shadow bg-secondary"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <CardHeader>
                    <CardTitle>{property.property_id.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>AirBnB ID: {property.property_id.external_id}</p>
                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    {formattedRatings &&
                        <PropertyRatings ratings={formattedRatings} />
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}

