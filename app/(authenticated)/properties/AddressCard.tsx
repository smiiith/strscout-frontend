'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import PropertyRatings from '@/components/PropertyRatings'
import { Home, Sparkles, Image } from 'lucide-react'
import PropertyComps from '@/components/PropertyComps'
import { Button } from '@react-email/components'


interface AddressCardProps {
    title: string
    externalId: string
    propertyId: string
    property: any
}

export default function AddressCard({ title, externalId, propertyId, property }: AddressCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenComps, setIsOpenComps] = useState(false);
    const [ratedProperties, setRatedProperties] = useState<any[]>([]);
    const [formattedRatings, setFormattedRatings] = useState<any>([]);

    useEffect(() => {
        if (property) {
            const ratings = {
                description: {
                    name: "Description",
                    score: property.description_rating_number,
                    category: property.description_rating_category,
                },
                amenities: {
                    name: "Amenities",
                    score: property.amenities_rating_number,
                    category: property.amenities_rating_category,
                },
                heroImage: {
                    name: "Hero Image",
                    score: property.hero_image_rating_number,
                    category: property.hero_image_rating_category,
                },
                feedback: property.feedback,
                suggestions: property.suggestions,
            }
            setFormattedRatings(ratings);
        }
    }, [property]);

    const getColorClass = (rating: string) => {
        switch (rating) {
            case 'excellent':
                return 'text-green-600 dark:text-green-400';
            case 'good':
                return 'text-blue-600 dark:text-blue-400';
            case 'satisfactory':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'needs_work':
                return 'text-orange-600 dark:text-orange-400';
            case 'fail':
                return 'text-red-600 dark:text-red-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <>
            <Card
                className="cursor-pointer hover:shadow-lg transition-shadow border border-border"
            // onClick={() => {
            //     setIsOpen(true);
            // }}
            >
                <CardHeader>
                    <CardTitle>{property.property_id.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>AirBnB ID: {property.property_id.external_id}</p>

                    <Button
                        onClick={() => {
                            setIsOpen(true);
                        }}>
                        View Ratings
                    </Button>

                    <Button
                        onClick={() => {
                            setIsOpenComps(true);
                        }}>
                        View Comps
                    </Button>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <div className="flex items-start gap-4">

                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className={`flex items-start gap-1 ${getColorClass(property.description_rating_category)}`}>
                                        <Home className="w-5 h-5" /> {property.description_rating_number}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Description Rating</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className={`flex items-start gap-1 ${getColorClass(property.amenities_rating_category)}`}>
                                        <Sparkles className="w-5 h-5" />
                                        {property.amenities_rating_number}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Amenities Rating</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className={`flex items-start gap-1 ${getColorClass(property.hero_image_rating_category)}`}>
                                        <Image className="w-5 h-5" /> {property.hero_image_rating_number}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Hero Image Rating</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardFooter>
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

            <Dialog open={isOpenComps} onOpenChange={setIsOpenComps}>
                <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>View comps</DialogTitle>
                    </DialogHeader>

                    <PropertyComps propertyId={property.property_id.id} />

                </DialogContent>
            </Dialog>

        </>
    )
}

