"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Album02Icon,
  File02Icon,
  Image02Icon,
  PoolIcon,
  Sofa01Icon,
  SubtitleIcon,
} from "./Icons";
import React from "react";
import { Button } from "@/components/ui/button";

interface RatingCategory {
  name: string;
  score: number;
  category: string;
  icon: React.ReactNode;
  feedback: any;
  suggestions: string[];
  description_rewrite?: any;
  title_rewrites?: string[];
}

interface LimitedPropertyRatingsProps {
  ratings: {
    description: RatingCategory;
    title: RatingCategory;
    amenities: RatingCategory;
    heroImage: RatingCategory;
    otherImages: RatingCategory;
    interiorDesign: RatingCategory;
    feedback: any;
    suggestions: string[];
    description_rewrite?: any;
    title_rewrites?: string[];
    overall_rating_number: number;
    overall_rating_category: string;
  };
  onViewFullDetails: () => void;
}

export default function LimitedPropertyRatings({
  ratings,
  onViewFullDetails,
}: LimitedPropertyRatingsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const categories: any[] = [
    { ...ratings.heroImage, icon: <Image02Icon className="w-5 h-5" /> },
    { ...ratings.title, icon: <SubtitleIcon className="w-5 h-5" /> },
    { ...ratings.description, icon: <File02Icon className="w-5 h-5" /> },
    { ...ratings.amenities, icon: <PoolIcon className="w-5 h-5" /> },
    { ...ratings.otherImages, icon: <Album02Icon className="w-5 h-5" /> },
    { ...ratings.interiorDesign, icon: <Sofa01Icon className="w-5 h-5" /> },
  ];

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

  const getBarColorClass = (rating: string) => {
    switch (rating) {
      case "Excellent":
        return "bg-green-600 dark:bg-green-400";
      case "Good":
        return "bg-blue-600 dark:bg-blue-400";
      case "Satisfactory":
        return "bg-yellow-600 dark:bg-yellow-400";
      case "Needs Work":
        return "bg-orange-600 dark:bg-orange-400";
      case "Fail":
        return "bg-red-600 dark:bg-red-400";
      default:
        return "bg-gray-600 dark:bg-gray-400";
    }
  };

  const toggleCategory = (name: string) => {
    if (openSections.includes(name)) {
      setOpenSections(openSections.filter((a) => a !== name));
    } else {
      setOpenSections([...openSections, name]);
    }
  };

  // Show only the first suggestion, blur the rest
  const renderLimitedSuggestions = (suggestions: string[]) => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
      <div>
        <span className="font-bold">Suggestions</span>
        <ul className="list-disc px-8">
          {/* Show first suggestion */}
          <li key="suggestion-0" className="whitespace-pre-line">
            {suggestions[0]}
          </li>

          {/* Blur out remaining suggestions */}
          {suggestions.length > 1 && (
            <div className="relative my-2">
              <div className="blur-sm select-none pointer-events-none">
                {suggestions.slice(1, 3).map((suggestion, index) => (
                  <li
                    key={`suggestion-blur-${index}`}
                    className="whitespace-pre-line"
                  >
                    {suggestion}
                  </li>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={onViewFullDetails}
                  variant="default"
                  size="sm"
                  className="shadow-lg"
                >
                  View Full Details
                </Button>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="mt-6 space-y-6 p-4 rounded-md border border-border">
        <div>Listing Summary</div>
        <div>
          <h4 className="font-semibold">
            Rating:{" "}
            <span>
              {ratings.overall_rating_number} ({ratings.overall_rating_category}
              )
            </span>
          </h4>

          <div className="my-3">{ratings.feedback.summary}</div>

          {/* Show first feedback item, blur the rest */}
          <div>
            {ratings.feedback?.items.slice(0, 1).map((item: any, index: number) => (
              <div key={index} className="my-3">
                <h2 className="font-bold">{item.title}</h2>
                <div>{item.feedback}</div>
              </div>
            ))}

            {/* Blur additional feedback items */}
            {ratings.feedback?.items.length > 1 && (
              <div className="relative my-3">
                <div className="blur-sm select-none pointer-events-none">
                  {ratings.feedback?.items
                    .slice(1, 2)
                    .map((item: any, index: number) => (
                      <div key={index} className="my-3">
                        <h2 className="font-bold">{item.title}</h2>
                        <div>{item.feedback}</div>
                      </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={onViewFullDetails}
                    variant="default"
                    size="sm"
                    className="shadow-lg"
                  >
                    View Full Details
                  </Button>
                </div>
              </div>
            )}
          </div>

          {renderLimitedSuggestions(ratings.suggestions)}
        </div>
      </div>

      <h2 className="text-2xl font-bold my-4 mx-2">
        Detailed Feedback and Suggestions
      </h2>

      {categories.map((category) => (
        <div key={category.name} className="space-y-2 mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="hover:bg-slate-200 dark:hover:bg-slate-800 hover:no-underline p-2 items-start"
                onClick={(e) => {
                  e.preventDefault();
                  // Show CTA instead of expanding
                  onViewFullDetails();
                }}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start space-x-2 mr-6">
                    {category.icon}

                    <div className="font-medium text-nowrap text-left">
                      <div className="">
                        {category.name} ({category.category})
                      </div>
                      <div className="mt-4 text-primary">
                        Sign up to view details →
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${getColorClass(category.category)}`}
                  >
                    {category.score}/100
                  </span>
                </div>
                <Progress
                  value={category.score}
                  className="h-2 ml-2 mt-1.5"
                  barClassName={`${getBarColorClass(category.category)}`}
                />
              </AccordionTrigger>
              <AccordionContent className="space-y-2 px-12 py-4">
                {/* This won't be shown because we prevent expansion */}
                <div className="text-center py-4">
                  <Button onClick={onViewFullDetails}>View Full Details</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
