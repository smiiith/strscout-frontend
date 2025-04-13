'use client'

import { use, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Home, Sparkles, Image, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios'
import { get } from 'http';

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

export default function PropertyComps(props: any) {
    const propertyId = props.propertyId;
    const propRatings = props.ratings;
    const [ratings, setRatings] = useState<any[]>([]);

    const resetArray = () => {
        setRatings([]); // Set the array to an empty array
    };

    const fetchPropertyRatings = async (propertyId: string, rate: any) => {
        console.log("ratings", rate); // empty

        const mockComps = comps;
        mockComps.splice(4, 0, rate);
        setRatings(mockComps);
        console.log("ratings AFTER", rate);
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const propertyRatings = await fetchPropertyRatings(propertyId, propRatings);
    }


    return (
        <div>
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
                        {ratings && ratings.map((comp) => (
                            <>
                                {comp.visible === false ?
                                    <TableRow key={comp.id}>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                        <TableCell className="blur-md">sampledatasampledata</TableCell>
                                    </TableRow>
                                    :
                                    <TableRow key={comp.id}>
                                        {/* <TableCell className="font-medium"><pre>{JSON.stringify(comp, null, 2)}</pre></TableCell> */}
                                        <TableCell className="font-medium">(coming soon)</TableCell>
                                        <TableCell className="font-medium">(coming)</TableCell>
                                        <TableCell className="font-medium">(coming)</TableCell>
                                        <TableCell className={`${getColorClass(comp.description_rating_category)}`}>{comp.description_rating_number} ({comp.description_rating_category})</TableCell>
                                        <TableCell className={`${getColorClass(comp.amenities_rating_category)}`}>{comp.amenities_rating_number} ({comp.amenities_rating_category})</TableCell>
                                        <TableCell className={`${getColorClass(comp.hero_image_rating_category)}`}>{comp.hero_image_rating_number} ({comp.hero_image_rating_category})</TableCell>
                                    </TableRow>
                                }
                            </>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <button onClick={resetArray}>Reset Array</button>
                    </TableFooter>
                </Table>
            )}
        </div>

    )
}

const comps = [
    {
        "id": "84d6f7c9-da70-456d-8f67-0d1102770dcb",
        "created_at": "2025-01-05T23:17:11.776237+00:00",
        "property_id": "adfee96f-d7cd-4192-a26a-0a9d5cc9cb3c",
        "description_rating_number": "90",
        "amenities_rating": null,
        "hero_image_rating_number": "85",
        "overall_photo_rating": null,
        "interior_rating": null,
        "30_day_occupancy": null,
        "60_day_occupancy": null,
        "90_day_occupancy": null,
        "feedback": "You have done a fantastic job showcasing your charming cottage! The description is inviting, and it paints a clear picture of the cozy atmosphere your guests can expect. The hero image is beautiful and captures the essence of a peaceful lakeside getaway. However, while the amenities are decent, there could be more emphasis on unique or standout features.",
        "suggestions": "Consider elaborating on the amenities that set your cottage apart, such as special outdoor activities, lake access, or any local attractions nearby. Adding personal touches or guest testimonials can also make your listing feel more relatable and convincing. Keep up the great work on the visuals!",
        "description_rating_category": "excellent",
        "amenities_rating_category": "good",
        "amenities_rating_number": "75",
        "hero_image_rating_category": "excellent",
        "visible": false
    },
    {
        "id": "84d6f7c9-da70-456d-8f67-0d1102770dcb",
        "created_at": "2025-01-05T23:17:11.776237+00:00",
        "property_id": "adfee96f-d7cd-4192-a26a-0a9d5cc9cb3c",
        "description_rating_number": "90",
        "amenities_rating": null,
        "hero_image_rating_number": "85",
        "overall_photo_rating": null,
        "interior_rating": null,
        "30_day_occupancy": null,
        "60_day_occupancy": null,
        "90_day_occupancy": null,
        "feedback": "You have done a fantastic job showcasing your charming cottage! The description is inviting, and it paints a clear picture of the cozy atmosphere your guests can expect. The hero image is beautiful and captures the essence of a peaceful lakeside getaway. However, while the amenities are decent, there could be more emphasis on unique or standout features.",
        "suggestions": "Consider elaborating on the amenities that set your cottage apart, such as special outdoor activities, lake access, or any local attractions nearby. Adding personal touches or guest testimonials can also make your listing feel more relatable and convincing. Keep up the great work on the visuals!",
        "description_rating_category": "excellent",
        "amenities_rating_category": "good",
        "amenities_rating_number": "75",
        "hero_image_rating_category": "excellent",
        "visible": false
    },
    {
        "id": "84d6f7c9-da70-456d-8f67-0d1102770dcb",
        "created_at": "2025-01-05T23:17:11.776237+00:00",
        "property_id": "adfee96f-d7cd-4192-a26a-0a9d5cc9cb3c",
        "description_rating_number": "90",
        "amenities_rating": null,
        "hero_image_rating_number": "85",
        "overall_photo_rating": null,
        "interior_rating": null,
        "30_day_occupancy": null,
        "60_day_occupancy": null,
        "90_day_occupancy": null,
        "feedback": "You have done a fantastic job showcasing your charming cottage! The description is inviting, and it paints a clear picture of the cozy atmosphere your guests can expect. The hero image is beautiful and captures the essence of a peaceful lakeside getaway. However, while the amenities are decent, there could be more emphasis on unique or standout features.",
        "suggestions": "Consider elaborating on the amenities that set your cottage apart, such as special outdoor activities, lake access, or any local attractions nearby. Adding personal touches or guest testimonials can also make your listing feel more relatable and convincing. Keep up the great work on the visuals!",
        "description_rating_category": "excellent",
        "amenities_rating_category": "good",
        "amenities_rating_number": "75",
        "hero_image_rating_category": "excellent",
        "visible": false
    },
    {
        "id": "84d6f7c9-da70-456d-8f67-0d1102770dcb",
        "created_at": "2025-01-05T23:17:11.776237+00:00",
        "property_id": "adfee96f-d7cd-4192-a26a-0a9d5cc9cb3c",
        "description_rating_number": "90",
        "amenities_rating": null,
        "hero_image_rating_number": "85",
        "overall_photo_rating": null,
        "interior_rating": null,
        "30_day_occupancy": null,
        "60_day_occupancy": null,
        "90_day_occupancy": null,
        "feedback": "You have done a fantastic job showcasing your charming cottage! The description is inviting, and it paints a clear picture of the cozy atmosphere your guests can expect. The hero image is beautiful and captures the essence of a peaceful lakeside getaway. However, while the amenities are decent, there could be more emphasis on unique or standout features.",
        "suggestions": "Consider elaborating on the amenities that set your cottage apart, such as special outdoor activities, lake access, or any local attractions nearby. Adding personal touches or guest testimonials can also make your listing feel more relatable and convincing. Keep up the great work on the visuals!",
        "description_rating_category": "excellent",
        "amenities_rating_category": "good",
        "amenities_rating_number": "75",
        "hero_image_rating_category": "excellent",
        "visible": false
    },
    {
        "id": "84d6f7c9-da70-456d-8f67-0d1102770dcb",
        "created_at": "2025-01-05T23:17:11.776237+00:00",
        "property_id": "adfee96f-d7cd-4192-a26a-0a9d5cc9cb3c",
        "description_rating_number": "90",
        "amenities_rating": null,
        "hero_image_rating_number": "85",
        "overall_photo_rating": null,
        "interior_rating": null,
        "30_day_occupancy": null,
        "60_day_occupancy": null,
        "90_day_occupancy": null,
        "feedback": "You have done a fantastic job showcasing your charming cottage! The description is inviting, and it paints a clear picture of the cozy atmosphere your guests can expect. The hero image is beautiful and captures the essence of a peaceful lakeside getaway. However, while the amenities are decent, there could be more emphasis on unique or standout features.",
        "suggestions": "Consider elaborating on the amenities that set your cottage apart, such as special outdoor activities, lake access, or any local attractions nearby. Adding personal touches or guest testimonials can also make your listing feel more relatable and convincing. Keep up the great work on the visuals!",
        "description_rating_category": "excellent",
        "amenities_rating_category": "good",
        "amenities_rating_number": "75",
        "hero_image_rating_category": "excellent",
        "visible": false
    },
    {
        "id": "84d6f7c9-da70-456d-8f67-0d1102770dcb",
        "created_at": "2025-01-05T23:17:11.776237+00:00",
        "property_id": "adfee96f-d7cd-4192-a26a-0a9d5cc9cb3c",
        "description_rating_number": "90",
        "amenities_rating": null,
        "hero_image_rating_number": "85",
        "overall_photo_rating": null,
        "interior_rating": null,
        "30_day_occupancy": null,
        "60_day_occupancy": null,
        "90_day_occupancy": null,
        "feedback": "You have done a fantastic job showcasing your charming cottage! The description is inviting, and it paints a clear picture of the cozy atmosphere your guests can expect. The hero image is beautiful and captures the essence of a peaceful lakeside getaway. However, while the amenities are decent, there could be more emphasis on unique or standout features.",
        "suggestions": "Consider elaborating on the amenities that set your cottage apart, such as special outdoor activities, lake access, or any local attractions nearby. Adding personal touches or guest testimonials can also make your listing feel more relatable and convincing. Keep up the great work on the visuals!",
        "description_rating_category": "excellent",
        "amenities_rating_category": "good",
        "amenities_rating_number": "75",
        "hero_image_rating_category": "excellent",
        "visible": false
    },
]
