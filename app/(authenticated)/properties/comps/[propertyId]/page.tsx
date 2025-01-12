"use client";

import { Analytics01Icon } from "@/components/Icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

    useEffect(() => {
        if (propertyId && !ratings) {
            const loadRatings = async () => {
                setLoading(true);
                const propertyRatings = await fetchPropertyRatings(propertyId);
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
                        <div>{ratings.description_rating_category}</div>
                        {/* <PropertyComps propertyId={propertyId} ratings={ratings} /> */}
                        {ratings && (
                            <Table>
                                <TableCaption>How your property compares to similar properties in the area.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">30 Day Occupancy</TableHead>
                                        <TableHead className="">60 Day Occupancy</TableHead>
                                        <TableHead className="">90 Day Occupancy</TableHead>
                                        <TableHead className="">Description Rating</TableHead>
                                        <TableHead className="">Amenities Rating</TableHead>
                                        <TableHead className="">Hero Image Rating</TableHead>
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
                                            <TableRow key={ratings.id}>
                                                {/* <TableCell className="font-medium"><pre>{JSON.stringify(comp, null, 2)}</pre></TableCell> */}
                                                <TableCell className="font-medium">(coming soon)</TableCell>
                                                <TableCell className="font-medium">(coming)</TableCell>
                                                <TableCell className="font-medium">(coming)</TableCell>
                                                <TableCell className={`${getColorClass(ratings.description_rating_category)}`}>{ratings.description_rating_number} ({ratings.description_rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.amenities_rating_category)}`}>{ratings.amenities_rating_number} ({ratings.amenities_rating_category})</TableCell>
                                                <TableCell className={`${getColorClass(ratings.hero_image_rating_category)}`}>{ratings.hero_image_rating_number} ({ratings.hero_image_rating_category})</TableCell>
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
                    </>
                )
            )}
        </>
    );
};

export default PropertyCompsPage;
