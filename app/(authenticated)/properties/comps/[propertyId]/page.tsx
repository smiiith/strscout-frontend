"use client";

import { Analytics01Icon } from "@/components/Icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropertyRatings from "@/components/PropertyRatings";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { HelpCircle, ImageIcon, Megaphone, FileEdit, Wifi, Images, Sofa } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge";


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

    const BlurryCell = () => {
        return (
            <TableCell className="blur-sm">sampledatasampledata</TableCell>
        )
    }

    const MockRow = (props: any) => {
        const columnCount: any = props.columnCount;
        const rowOrder: any = props.rowOrder;

        return (
            <TableRow>
                <TableCell>{rowOrder}</TableCell>
                {
                    [...Array(columnCount)].map((_, i) => <BlurryCell key={i} />)
                }
            </TableRow>
        )
    }

    function ScoreCard({ score, label, status, icon }: any) {
        return (
            <div className="flex flex-col h-24">
                <div className="flex h-48 w-32 items-center justify-center rounded-lg">{icon}</div>
                <div className={`${getColorClass(status)} text-center`}>
                    <p className="text-xl font-bold">{score}/100</p>
                    <p className={`font-semibold`}>{status}</p>
                </div>
            </div>
        )
    }

    const YourRankSection = (props: any) => {
        const ratings = props.ratings;

        const scores = [
            {
                label: "Your Hero Image",
                score: ratings.hero_image.rating_number,
                status: ratings.hero_image.rating_category,
                icon: <Image src="/images/icon-hero-image.png" width={100} height={100} alt="" />,
            },
            {
                label: <div>Your  <div>Title</div></div>,
                score: ratings.title.rating_number,
                status: ratings.title.rating_category,
                icon: <Image src="/images/icon-title.png" width={100} height={100} alt="" />,
            },
            {
                label: "Your Description",
                score: ratings.description.rating_number,
                status: ratings.description.rating_category,
                icon: <Image src="/images/icon-description.png" width={100} height={100} alt="" />,
            },
            {
                label: <div>Your  <div>Amenities</div></div>,
                score: ratings.amenities.rating_number,
                status: ratings.amenities.rating_category,
                icon: <Image src="/images/icon-amenities.png" width={100} height={100} alt="" />,
            },
            {
                label: <div>Your  <div>Photos</div></div>,
                score: ratings.other_images.rating_number,
                status: ratings.other_images.rating_category,
                icon: <Image src="/images/icon-photos.png" width={100} height={100} alt="" />,
            },
            {
                label: "Your Interior Design",
                score: ratings.interior_design.rating_number,
                status: ratings.interior_design.rating_category,
                icon: <Image src="/images/icon-interior-design.png" width={100} height={100} alt="" />,
            },
        ]

        return (
            <div className="w-full bg-gray-50 p-6">

                <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">

                    <div className="mb-8 grid grid-cols-2 gap-2 items-end">
                        <h2 className="text-center text-2xl font-bold col-span-1">Your Regional Rank</h2>

                        <div className="mx-auto">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div>
                                        <Badge className="bg-primary h-6 w-6 justify-center">?</Badge>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <p>Your ranking among similar properties in your region based on these key metrics.</p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>

                        <div className="text-8xl font-bold">7</div>
                    </div>

                    <div className="flex justify-between w-[1000px]">
                        {scores.map((score, index) => (
                            <div key={`score-${index}`}>
                                <h3 className="mb-4 text-center text-lg font-semibold w-32 h-12">{score.label}</h3>
                                <ScoreCard {...score} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )

    }

    return (
        <div className="pb-6">
            <Image
                src="/STR-Feedback-Genius-Logo-single-line.png"
                alt="STR Feedback Genius"
                width="754"
                height="72"
                className="w-[754] h-auto my-6"
            />

            {/* <h1 className="text-4xl mb-6">Getting Your Free STR Listing Feedback is Easy</h1> */}
            {loading ? (
                <LoadingOverlay />
            ) : (
                propertyId && ratings && (
                    <>
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
                                {/* <TableHeader>
                                    <TableRow>
                                        <TableHead className="">Description</TableHead>
                                        <TableHead className="">Title</TableHead>
                                        <TableHead className="">Amenities</TableHead>
                                        <TableHead className="">Hero Image</TableHead>
                                        <TableHead className="">Other Images</TableHead>
                                        <TableHead className="">Interior Design</TableHead>
                                    </TableRow>
                                </TableHeader> */}
                                <TableBody>
                                    <MockRow columnCount={6} rowOrder={1} />
                                    <MockRow columnCount={6} rowOrder={2} />
                                    <MockRow columnCount={6} rowOrder={3} />
                                    <MockRow columnCount={6} rowOrder={4} />
                                    <MockRow columnCount={6} rowOrder={5} />
                                    <MockRow columnCount={6} rowOrder={6} />

                                    {ratings &&
                                        (
                                            <TableRow
                                                key={ratings.id}
                                                // onClick={() => {
                                                //     setIsOpen(true);
                                                // }}
                                                className="cursor-pointer py-0"
                                            >
                                                <TableCell className="bg-red-500 p-0" colSpan={7}>

                                                    <div className="flex items-center bg-primary hover:bg-primary">

                                                        <Image
                                                            src="/images/arrow-white.png"
                                                            alt="Your overall score"
                                                            width="100"
                                                            height="72"
                                                            className="w-auto h-28 my-6 mx-4"
                                                        />

                                                        <div className="text-5xl text-primary-foreground font-bold">
                                                            Your Overall Score is {ratings.ratings.description.rating_number}/100 ({ratings.ratings.description.rating_category})
                                                            <div className="mt-4 text-3xl relative">
                                                                <span className="">
                                                                    click here for full feedback & suggestions
                                                                </span>

                                                                <Button
                                                                    onClick={() => {
                                                                        setIsOpen(true);
                                                                    }}
                                                                    variant="secondary"
                                                                    size="sm"
                                                                    className="mx-4 absolute"
                                                                >
                                                                    Get Feedback Now
                                                                </Button>

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="flex items-center bg-primary-foreground">
                                                        <YourRankSection ratings={ratings.ratings} />
                                                    </div>

                                                    <div className="flex items-center bg-primary hover:bg-primary py-6 px-4">
                                                        <div className="flex text-5xl text-primary-foreground font-bold">
                                                            You Rank #7 in Your Region


                                                        </div>
                                                        <Button
                                                            onClick={() => {
                                                                setIsOpen(true);
                                                            }}
                                                            variant="secondary"
                                                            size="sm"
                                                            className="mx-4 mb-[-7px] flex"
                                                        >
                                                            Get Feedback Now
                                                        </Button>
                                                    </div>

                                                </TableCell>
                                            </TableRow>

                                            // <TableRow>
                                            //     {/* <TableCell className="font-medium"><pre>{JSON.stringify(comp, null, 2)}</pre></TableCell> */}
                                            //     <TableCell className={`${getColorClass(ratings.ratings.description.rating_category)}`}>{ratings.ratings.description.rating_number} ({ratings.ratings.description.rating_category})</TableCell>
                                            //     <TableCell className={`${getColorClass(ratings.ratings.title.rating_category)}`}>{ratings.ratings.title.rating_number} ({ratings.ratings.title.rating_category})</TableCell>
                                            //     <TableCell className={`${getColorClass(ratings.ratings?.amenities?.rating_category)}`}>{ratings.ratings?.amenities?.rating_number} ({ratings.ratings?.amenities?.rating_category})</TableCell>
                                            //     <TableCell className={`${getColorClass(ratings.ratings?.hero_image?.rating_category)}`}>{ratings.ratings?.hero_image?.rating_number} ({ratings.ratings?.hero_image?.rating_category})</TableCell>
                                            //     <TableCell className={`${getColorClass(ratings.ratings?.other_images?.rating_category)}`}>{ratings.ratings?.other_images?.rating_number} ({ratings.ratings?.other_images?.rating_category})</TableCell>
                                            //     <TableCell className={`${getColorClass(ratings.ratings?.interior_design?.rating_category)}`}>{ratings.ratings?.interior_design?.rating_number} ({ratings.ratings?.interior_design?.rating_category})</TableCell>
                                            // </TableRow>
                                        )}
                                    <MockRow columnCount={6} rowOrder={8} />
                                    <MockRow columnCount={6} rowOrder={9} />
                                    <MockRow columnCount={6} rowOrder={10} />

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
        </div>
    );
};

export default PropertyCompsPage;