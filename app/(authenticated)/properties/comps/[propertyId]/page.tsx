"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PropertyRatings from "@/components/PropertyRatings";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";


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
        case 'Excellent':
            return 'text-green-600 dark:text-green-400';
        case 'Good':
            return 'text-blue-600 dark:text-blue-400';
        case 'Satisfactory':
            return 'text-yellow-600 dark:text-yellow-400';
        case 'Needs Work':
            return 'text-orange-600 dark:text-orange-400';
        case 'Fail':
            return 'text-red-600 dark:text-red-400';
        default:
            return 'text-gray-600 dark:text-gray-400';
    }
};

const PropertyCompsPage = () => {
    const router = useRouter();
    const params = useParams();
    const propertyId = params.propertyId;
    const [loading, setLoading] = useState(false);
    const [ratings, setRatings] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formattedRatings, setFormattedRatings] = useState<any>([]);
    const [regionRank, setRegionRank] = useState<any>(0);

    const getRank = (rating: number) => {
        let overallRating = rating;
        let rank = (overallRating * 2) / 10;
        rank = Math.round(rank);
        rank = 24 - rank;
        return rank;
    }

    useEffect(() => {
        if (propertyId && !ratings) {
            const loadRatings = async () => {
                setLoading(true);
                const propertyRatings = await fetchPropertyRatings(propertyId);
                const rank = getRank(propertyRatings.ratings.overall_ratings.rating_number);
                setRegionRank(rank);

                if (propertyRatings) {
                    const categorized = {
                        heroImage: {
                            name: "Hero Image",
                            score: propertyRatings.ratings?.hero_image?.rating_number,
                            category: propertyRatings.ratings?.hero_image?.rating_category,
                            feedback: {
                                summary: propertyRatings.ratings?.hero_image?.feedback?.summary,
                                items: propertyRatings.ratings?.hero_image?.feedback?.items,
                            },
                            // feedback: propertyRatings.ratings?.hero_image?.feedback,
                            suggestions: propertyRatings.ratings?.hero_image?.suggestions,
                            displayOrder: 0,
                        },
                        title: {
                            name: "Title",
                            score: propertyRatings.ratings.title.rating_number,
                            category: propertyRatings.ratings.title.rating_category,
                            feedback: {
                                summary: propertyRatings.ratings.title.feedback.summary,
                                items: propertyRatings.ratings.title.feedback.items,
                            },
                            title_rewrites: propertyRatings.ratings.title.title_rewrites,
                            suggestions: propertyRatings.ratings.title.suggestions,
                            displayOrder: 1,
                        },
                        description: {
                            name: "Description",
                            score: propertyRatings.ratings.description.rating_number,
                            category: propertyRatings.ratings.description.rating_category,
                            feedback: {
                                summary: propertyRatings.ratings.description.feedback.summary,
                                items: propertyRatings.ratings.description.feedback.items,
                            },
                            suggestions: propertyRatings.ratings.description.suggestions,
                            description_rewrite: propertyRatings.ratings.description.description_rewrite,
                            displayOrder: 2,
                        },
                        amenities: {
                            name: "Amenities",
                            score: propertyRatings.ratings?.amenities?.rating_number,
                            category: propertyRatings.ratings?.amenities?.rating_category,
                            feedback: {
                                summary: propertyRatings.ratings?.amenities?.feedback?.summary,
                                items: propertyRatings.ratings?.amenities?.feedback?.items,
                            },
                            // feedback: propertyRatings.ratings?.amenities?.feedback,
                            suggestions: propertyRatings.ratings?.amenities?.suggestions,
                            displayOrder: 3,
                        },
                        otherImages: {
                            name: "Your photos",
                            score: propertyRatings.ratings?.other_images?.rating_number,
                            category: propertyRatings.ratings?.other_images?.rating_category,
                            feedback: {
                                summary: propertyRatings.ratings?.other_images?.feedback?.summary,
                                items: propertyRatings.ratings?.other_images?.feedback?.items,
                            },
                            suggestions: propertyRatings.ratings?.other_images?.suggestions,
                            displayOrder: 4,
                        },
                        interiorDesign: {
                            name: "Interior Design",
                            score: propertyRatings.ratings?.interior_design?.rating_number,
                            category: propertyRatings.ratings?.interior_design?.rating_category,
                            feedback: {
                                summary: propertyRatings.ratings?.interior_design?.feedback?.summary,
                                items: propertyRatings.ratings?.interior_design?.feedback?.items,
                            },
                            // feedback: propertyRatings.ratings?.interior_design?.feedback,
                            suggestions: propertyRatings.ratings?.interior_design?.suggestions,
                            displayOrder: 5,
                        },
                        feedback: {
                            summary: propertyRatings.ratings.overall_ratings.feedback.summary,
                            items: propertyRatings.ratings.overall_ratings.feedback.items,
                        },
                        suggestions: propertyRatings.ratings.overall_ratings.suggestions,
                        overall_rating_number: propertyRatings.ratings.overall_ratings.rating_number,
                        overall_rating_category: propertyRatings.ratings.overall_ratings.rating_category,
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
            <>
                {/* mobile */}
                <div className="mobile-only w-full my-2">
                    <div className="flex items-center gap-4 p-4 rounded-lg border w-full">
                        <div className="flex-shrink-0">
                            <div className="flex h-[80px] w-[80px] rounded-md object-cover">{icon}</div>
                            {/* <Image
                                src={imageUrl || "/placeholder.svg"}
                                width={80}
                                height={80}
                                alt={imageAlt}
                                className="rounded-md object-cover"
                            /> */}
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-medium text-xl">{label}</h3>
                            <p className={`${getColorClass(status)} text-lg`}>{score} {status}</p>
                        </div>
                    </div>
                </div>

                {/* desktop */}
                <div className="desktop-only">
                    <h3 className="mb-4 text-center text-lg font-semibold w-32 h-12">{label}</h3>
                    <div className="flex flex-col h-24">
                        <div className="flex h-48 w-32 items-center justify-center rounded-lg">{icon}</div>
                        <div className={`${getColorClass(status)} text-center`}>
                            <p className="text-xl font-bold">{score}/100</p>
                            <p className={`font-semibold`}>{status}</p>
                        </div>
                    </div>
                </div>
            </>
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

                <div className="mobile-only w-full">

                    <div className="text-2xl mb-8">
                        Your Regional Rank: <span className="font-bold">{regionRank}</span>
                    </div>

                    <div className="flex flex-col w-full items-center">
                        {scores.map((score, index) => (
                            <div key={`score-${index}`}
                                className="w-full"
                            >
                                <ScoreCard {...score} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="desktop-only">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        <div className="desktop-only">

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
                                            <p onClick={() => {
                                                posthog.capture('feedback_clicked_help_link', {
                                                    page: window.location.pathname,
                                                });

                                                router.push("/str-market-spy");
                                            }}>
                                                Your ranking among similar properties in your region based on key metrics. Click to see why you rank here — and how to climb higher.

                                            </p>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>

                                <div className="text-8xl font-bold">{regionRank}</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between w-[1000px]">
                            {scores.map((score, index) => (
                                <div key={`score-${index}`}>
                                    <ScoreCard {...score} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
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
                        {/* <Button
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                        >
                            View Individual Ratings
                        </Button> */}
                        {ratings && (
                            <Table>
                                <TableBody>
                                    {/* <MockRow columnCount={6} rowOrder={1} /> */}

                                    {ratings &&
                                        (
                                            <TableRow
                                                key={ratings.id}
                                                // onClick={() => {
                                                //     setIsOpen(true);
                                                // }}
                                                className="cursor-pointer py-0"
                                            >
                                                <TableCell className="p-0" colSpan={7}>

                                                    <div className="desktop-only">
                                                        <div className="flex items-center bg-primary hover:bg-primary">

                                                            <Image
                                                                src="/images/arrow-white.png"
                                                                alt="Your overall score"
                                                                width="100"
                                                                height="72"
                                                                className="w-auto h-28 my-6 mx-4"
                                                            />

                                                            <div className="text-5xl text-primary-foreground font-bold">
                                                                Your Overall Score is {ratings.ratings.overall_ratings.rating_number}/100 ({ratings.ratings.overall_ratings.rating_category})
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="mobile-only">
                                                        <div className="flex items-center bg-primary p-2">
                                                            <div className="text-3xl text-primary-foreground font-bold">
                                                                Your Overall Score is {ratings.ratings.overall_ratings.rating_number}/100 ({ratings.ratings.overall_ratings.rating_category})
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center bg-primary-foreground">
                                                        <YourRankSection ratings={ratings.ratings} />
                                                    </div>

                                                    <div className="flex items-center bg-primary hover:bg-primary py-6 px-4">
                                                        <div className="flex text-3xl md:text-5xl text-primary-foreground font-bold">
                                                            You Rank {regionRank} in Your Region
                                                        </div>
                                                        {/* <Button
                                                            onClick={() => {
                                                                setIsOpen(true);
                                                            }}
                                                            variant="secondary"
                                                            size="sm"
                                                            className="mx-4 mb-[-7px] flex"
                                                        >
                                                            Get Feedback Now
                                                        </Button> */}
                                                    </div>

                                                    <PropertyRatings ratings={formattedRatings} />


                                                </TableCell>
                                            </TableRow>

                                        )}
                                    {/* <MockRow columnCount={6} rowOrder={10} /> */}

                                </TableBody>
                            </Table>
                        )}

                        <div className="flex items-center bg-primary">

                            <Image
                                src="/images/arrow-white.png"
                                alt="Your overall score"
                                width="100"
                                height="72"
                                className="w-auto h-28 my-6 mx-4"
                            />

                            <div className="text-primary-foreground">
                                <div className="flex flex-row mt-4 text-xl items-center">
                                    <div className="">
                                        <p className="font-bold text-3xl">See What Top-Performing Listings Are Doing Differently.</p>
                                        STR Market Spy analyzes nearby listings that get more
                                        bookings than yours, revealing patterns and strategies that
                                        set them apart.
                                    </div>

                                    <Button
                                        onClick={() => {
                                            posthog.capture('feedback_clicked_get_str_market_spy', {
                                                page: window.location.pathname,
                                            });
                                            router.push(`/str-market-spy`);
                                        }}
                                        variant="secondary"
                                        size="sm"
                                        className="mx-4 "
                                    >
                                        Get STR Market Spy Now
                                    </Button>

                                </div>
                            </div>
                        </div>


                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Property Ratings</DialogTitle>
                                </DialogHeader>

                                {formattedRatings &&
                                    <PropertyRatings ratings={formattedRatings} />
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