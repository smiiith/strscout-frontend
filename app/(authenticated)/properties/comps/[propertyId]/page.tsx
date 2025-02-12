"use client";

import { Analytics01Icon } from "@/components/Icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropertyRatings from "@/components/PropertyRatings";
import { title } from "process";
import { Button } from "@/components/ui/button";

const fetchPropertyRatings = async (propertyId: any) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ratings/${propertyId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data?.ratings ? { ...response.data.ratings, visible: true } : null;
    } catch (error) {
        console.error('Error loading property ratings:', error);
        return null;
    }
};

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

const PropertyCompsPage = () => {
    const params = useParams();
    const propertyId = params.propertyId;
    const [loading, setLoading] = useState(false);
    const [ratings, setRatings] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [categorizedRatings, setFormattedRatings] = useState<any>([]);

    useEffect(() => {
        if (propertyId && !ratings) {
            const loadRatings = async () => {
                setLoading(true);
                const propertyRatings = await fetchPropertyRatings(propertyId);

                // console.log("propertyRatings: ", propertyRatings);

                if (propertyRatings) {
                    const categorized = {
                        description: {
                            name: "Description",
                            score: propertyRatings.ratings.description.rating_number,
                            category: propertyRatings.ratings.description.rating_category,
                            feedback: propertyRatings.ratings.description.feedback,
                            suggestions: propertyRatings.ratings.description.suggestions,
                        },
                        amenities: {
                            name: "Amenities",
                            score: propertyRatings.ratings?.amenities?.rating_number,
                            category: propertyRatings.ratings?.amenities?.rating_category,
                            feedback: propertyRatings.ratings?.amenities?.feedback,
                            suggestions: propertyRatings.ratings?.amenities?.suggestions,
                        },
                        heroImage: {
                            name: "Hero Image",
                            score: propertyRatings.ratings?.hero_image?.rating_number,
                            category: propertyRatings.ratings?.hero_image?.rating_category,
                            feedback: propertyRatings.ratings?.hero_image?.feedback,
                            suggestions: propertyRatings.ratings?.hero_image?.suggestions,
                        },
                        otherImages: {
                            name: "Other Images",
                            score: propertyRatings.ratings?.other_images?.rating_number,
                            category: propertyRatings.ratings?.other_images?.rating_category,
                            feedback: propertyRatings.ratings?.other_images?.feedback,
                            suggestions: propertyRatings.ratings?.other_images?.suggestions,
                        },
                        interiorDesign: {
                            name: "Interior Design",
                            score: propertyRatings.ratings?.interior_design?.rating_number,
                            category: propertyRatings.ratings?.interior_design?.rating_category,
                            feedback: propertyRatings.ratings?.interior_design?.feedback,
                            suggestions: propertyRatings.ratings?.interior_design?.suggestions,
                        },
                        title: {
                            name: "Title",
                            score: propertyRatings.ratings.title.rating_number,
                            category: propertyRatings.ratings.title.rating_category,
                            feedback: propertyRatings.ratings.title.feedback,
                            suggestions: propertyRatings.ratings.title.suggestions,
                        },
                        feedback: propertyRatings.ratings.feedback,
                        suggestions: propertyRatings.ratings.suggestions,
                        overall_rating_number: propertyRatings.ratings.overall_rating_number,
                        overall_rating_category: propertyRatings.ratings.overall_rating_category,
                    }
                    setFormattedRatings(categorized);
                }

                setRatings(propertyRatings);
                setLoading(false);
            };
            loadRatings();
        }
    }, [propertyId]);

    return (
        <>
            {loading ? (
                <LoadingOverlay />
            ) : (
                propertyId && ratings && (
                    <>
                        <h1 className="text-3xl mb-6">
                            <Analytics01Icon className="h-8 w-8 inline-block mb-2 mr-2 text-secondary-foreground" />
                            Property Comparables
                        </h1>

                        <Button
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                        >
                            View Individual Ratings
                        </Button>
                        {ratings && (
                            <Table>
                                <TableCaption>How your property compares to similar properties in the area.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">Description</TableHead>
                                        <TableHead className="">Title</TableHead>
                                        <TableHead className="">Amenities</TableHead>
                                        <TableHead className="">Hero Image</TableHead>
                                        <TableHead className="">Other Images</TableHead>
                                        <TableHead className="">Interior Design</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>

                                    {ratings &&
                                        (
                                            <TableRow
                                                key={ratings.id}
                                                onClick={() => {
                                                    setIsOpen(true);
                                                }}
                                                className="cursor-pointer"
                                                title="View Detailed Ratings"
                                            >
                                                {/* <TableCell className="font-medium"><pre>{JSON.stringify(comp, null, 2)}</pre></TableCell> */}
                                                <TableCell className={`${getColorClass(ratings.ratings.description.rating_category)}`}>{ratings.ratings.description.rating_number} ({ratings.ratings.description.rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.ratings.title.rating_category)}`}>{ratings.ratings.title.rating_number} ({ratings.ratings.title.rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.ratings?.amenities?.rating_category)}`}>{ratings.ratings?.amenities?.rating_number} ({ratings.ratings?.amenities?.rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.ratings?.hero_image?.rating_category)}`}>{ratings.ratings?.hero_image?.rating_number} ({ratings.ratings?.hero_image?.rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.ratings?.other_images?.rating_category)}`}>{ratings.ratings?.other_images?.rating_number} ({ratings.ratings?.other_images?.rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.ratings?.interior_design?.rating_category)}`}>{ratings.ratings?.interior_design?.rating_number} ({ratings.ratings?.interior_design?.rating_category})</TableCell>
                                            </TableRow>
                                        )}
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )}

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Property Ratings</DialogTitle>
                                </DialogHeader>

                                {categorizedRatings &&
                                    <PropertyRatings ratings={categorizedRatings} />
                                }

                            </DialogContent>
                        </Dialog>


                    </>
                )
            )}
        </>
    );
};

export default PropertyCompsPage;