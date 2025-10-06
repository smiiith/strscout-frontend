"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PropertyRatings from "@/components/PropertyRatings";
import PropertyComps from "@/components/PropertyComps";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Album02Icon,
  File02Icon,
  Image02Icon,
  PoolIcon,
  Sofa01Icon,
  SubtitleIcon,
} from "@/components/Icons";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { formatDate, formatDateNoTime } from "@/lib/utils";

interface AddressCardProps {
  title: string;
  externalId: string;
  propertyId: string;
  property: any;
  created?: string;
}

export default function AddressCard({
  title,
  externalId,
  propertyId,
  property,
  created,
}: AddressCardProps) {
  const router = useRouter();
  const { getAccessToken } = useUserSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComps, setIsOpenComps] = useState(false);
  const [ratedProperties, setRatedProperties] = useState<any[]>([]);
  const [formattedRatings, setFormattedRatings] = useState<any>([]);
  const [ratings, setRatings] = useState<any>(null);

  useEffect(() => {
    if (property) {
      const ratings = {
        description: {
          name: "Description",
          score: property.description_rating_number,
          category: property.description_rating_category,
        },
        title: {
          name: "Title",
          score: property.title_rating_number,
          category: property.title_rating_category,
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
        otherImages: {
          name: "Other Images",
          score: property.other_images_rating_number,
          category: property.other_images_rating_category,
        },
        feedback: property.feedback,
        suggestions: property.suggestions,
      };
      setFormattedRatings(ratings);
    }
  }, [property]);

  const fetchPropertyRatings = async (propertyId: string) => {
    try {
      if (!propertyId) {
        console.log("No property ID available");
        return;
      }
      const token = await getAccessToken();

      if (!token) {
        console.error("Failed to get access token");
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/feedback-genius/ratings/${propertyId}`,
        {
          headers: authHeaders,
        }
      );

      if (response.data) {
        const propertyRatings = response.data.ratings;
        // console.log("ratings from card", propertyRatings);

        propertyRatings["visible"] = true;
        setRatings(propertyRatings);
        // setIsOpenComps(true); // open the dialog
      }
    } catch (error) {
      console.error("Error loading user properties:", error);
    }
  };

  const getColorClass = (rating: string) => {
    switch (rating) {
      case "Excellent":
        return "text-green-600 dark:text-green-400";
      case "Good":
        return "text-blue-600 dark:text-blue-400";
      case "Satisfactory":
        return "text-yellow-600 dark:text-yellow-400";
      case "Needs Work":
        return "text-orange-600 dark:text-orange-400";
      case "Fail":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      <Card
        className="hover:shadow-lg transition-shadow border border-border bg-muted"
        // onClick={() => {
        //     setIsOpen(true);
        // }}
      >
        <CardHeader>
          <CardTitle>{property.property_id.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>AirBnB ID: {property.property_id.external_id}</div>
          <div className="text-sm text-foreground/60">
            Evaluated: {formatDate(created)}
          </div>

          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            <Button
              onClick={() => {
                router.push(`/properties/comps/${property.property_id.id}`);
                // fetchPropertyRatings(property.property_id.id);
              }}
            >
              View Assessment
            </Button>
            <div className="flex items-start gap-2 sm:gap-4 flex-wrap">
              <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-start gap-1 ${getColorClass(property.ratings?.description?.rating_category)}`}
                  >
                    <File02Icon className="w-5 h-5" />{" "}
                    {property.ratings.description.rating_number}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Description Rating</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-start gap-1 ${getColorClass(property.ratings?.title?.rating_category)}`}
                  >
                    <SubtitleIcon className="w-5 h-5" />{" "}
                    {property.ratings?.title?.rating_number}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Title Rating</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-start gap-1 ${getColorClass(property.ratings?.amenities?.rating_category)}`}
                  >
                    <PoolIcon className="w-5 h-5" />
                    {property.ratings?.amenities?.rating_number}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Amenities Rating</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-start gap-1 ${getColorClass(property.ratings?.hero_image?.rating_category)}`}
                  >
                    <Image02Icon className="w-5 h-5" />{" "}
                    {property.ratings?.hero_image?.rating_number}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hero Image Rating</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip key="other-images">
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-start gap-1 ${getColorClass(property.ratings?.other_images?.rating_category)}`}
                  >
                    <Album02Icon className="w-5 h-5" />{" "}
                    {property.ratings?.other_images?.rating_number}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Other Images Rating</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`flex items-start gap-1 ${getColorClass(property.ratings?.interior_design?.rating_category)}`}
                  >
                    <Sofa01Icon className="w-5 h-5" />{" "}
                    {property.ratings?.interior_design?.rating_number}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Interior Design Rating</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {formattedRatings && <PropertyRatings ratings={formattedRatings} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenComps} onOpenChange={setIsOpenComps}>
        <DialogContent
          className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh]"
          onCloseAutoFocus={() => console.log("closed")}
        >
          {/* <DialogContent onCloseAutoFocus={() => console.log('closed')}> */}
          <DialogHeader>
            <DialogTitle>View comps</DialogTitle>
          </DialogHeader>

          {isOpenComps && (
            <PropertyComps
              propertyId={property.property_id.id}
              ratings={ratings}
            />
          )}
          {/* <PropertyComps propertyId={property.property_id.id} /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
