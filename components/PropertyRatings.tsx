'use client'

import { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Album02Icon, File02Icon, Image02Icon, PoolIcon, Sofa01Icon, SubtitleIcon } from './Icons'
import React from 'react'


interface RatingCategory {
  name: string
  score: number
  category: string
  icon: React.ReactNode
  feedback: string
  suggestions: string
  description_rewrite?: any
  title_rewrites?: string
}

interface PropertyRatingsProps {
  ratings: {
    description: RatingCategory
    title: RatingCategory
    amenities: RatingCategory
    heroImage: RatingCategory
    otherImages: RatingCategory
    interiorDesign: RatingCategory
    feedback: string
    suggestions: string
    description_rewrite?: any
    title_rewrites?: string
    // overall_ratings: {
    //   feedback: {
    //     summary: string
    //     items: {
    //       title: string
    //       feedback: string
    //     }[]
    //   }
    //   suggestions: string[]
    //   overall_rating_number: number
    //   overall_rating_category: string
    // }
    overall_rating_number: number
    overall_rating_category: string
  }
}

export default function PropertyRatings({ ratings }: PropertyRatingsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const categories: any[] = [
    { ...ratings.heroImage, icon: <Image02Icon className="w-5 h-5" /> },
    { ...ratings.title, icon: <SubtitleIcon className="w-5 h-5" /> },
    { ...ratings.description, icon: <File02Icon className="w-5 h-5" /> },
    { ...ratings.amenities, icon: <PoolIcon className="w-5 h-5" /> },
    { ...ratings.otherImages, icon: <Album02Icon className="w-5 h-5" /> },
    { ...ratings.interiorDesign, icon: <Sofa01Icon className="w-5 h-5" /> },
    // { ...ratings.overall_ratings, icon: <Sofa01Icon className="w-5 h-5" /> },
  ]

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

  const getBarColorClass = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return 'bg-green-600 dark:bg-green-400';
      case 'Good':
        return 'bg-blue-600 dark:bg-blue-400';
      case 'Satisfactory':
        return 'bg-yellow-600 dark:bg-yellow-400';
      case 'Needs Work':
        return 'bg-orange-600 dark:bg-orange-400';
      case 'Fail':
        return 'bg-red-600 dark:bg-red-400';
      default:
        return 'bg-gray-600 dark:bg-gray-400';
    }
  }

  function replaceNewlinesWithBreaks(text) {
    if (typeof text !== 'string') {
      return null;
    }

    return text.split('\n').map((line, index, array) => {
      if (index === array.length - 1) {
        return line;
      }
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    });
  }

  const toggleCategory = (name: string) => {

    if (openSections.includes(name)) {
      setOpenSections(
        openSections.filter(a =>
          a !== name
        )
      );

    } else {
      setOpenSections([
        ...openSections,
        name
      ]);

    }
  }

  return (
    <div>

      <div className="mt-6 space-y-6 p-4 rounded-md border border-border">
        <div>Listing Summary</div>
        <div>
          <h4 className="font-semibold">Rating: <span>{ratings.overall_rating_number} ({ratings.overall_rating_category})</span></h4>
          {/* {JSON.stringify(ratings)} */}

          <div className="my-3">
            {
              // @ts-ignore
              ratings.feedback.summary
            }
          </div>

          <div>
            {
              // @ts-ignore
              ratings.feedback?.items.map((item: any, index: number) => (
                <div key={index} className="my-3">
                  <h2 className="font-bold">{item.title}</h2>
                  <div>{item.feedback}</div>
                </div>
              ))}
          </div>

          <div><span className="font-bold">Suggestions</span>
            <ul className="list-disc px-8">
              {
                // @ts-ignore
                ratings?.suggestions.map((suggestion: any, index: number) => (
                  <li key={`suggestion-${index}`}>{suggestion}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold my-4 mx-2">Detailed Feedback and Suggestions</h2>

      {categories.map((category) => (
        <div key={category.name} className="space-y-2 mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="hover:bg-slate-200 dark:hover:bg-slate-800 hover:no-underline p-2 items-start"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 mr-6">
                    {category.icon}

                    <div className="font-medium text-nowrap text-left">
                      <div className="">
                        {category.name} ({category.category})
                      </div>
                      <div className="mt-4">{!openSections.includes(category.name) ? "Click for " : "Hide "} details +</div>
                    </div>

                  </div>
                  <span className={`font-bold ${getColorClass(category.category)}`}>
                    {category.score}
                  </span>
                </div>
                <Progress value={category.score} className="h-2 ml-2 mt-1.5" barClassName={`${getBarColorClass(category.category)}`} />

              </AccordionTrigger>
              <AccordionContent className="space-y-2 px-12 py-4">
                <div>
                  <div>
                    {category.feedback.summary}
                  </div>
                  <div className="">
                    {category.feedback.items.map((item: any, index: number) => (
                      <div key={index} className="my-3">
                        <h2 className="font-bold">{item.title}</h2>
                        <div>{item.feedback}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-bold">Suggestions</span>
                  <ul className="list-disc px-8">
                    {category.suggestions.map((suggestion: string, index: number) => (
                      <li key={`suggestion-${index}`} className="whitespace-pre-line">{suggestion}</li>
                    ))}
                  </ul>
                </div>

                {category.description_rewrite && (
                  <div>
                    <div className="font-bold">For your convenience, here's a refined version of your listing—feel free to use or adapt it.</div>
                    <div className="ml-8 my-2">
                      <div className="font-bold">
                        Listing description:
                      </div>
                      <div className="cursor-text italic">
                        {replaceNewlinesWithBreaks(category.description_rewrite.listing_description)}
                      </div>
                    </div>

                    <div className="ml-8 my-2">
                      <div className="font-bold">
                        Your property:
                      </div>
                      <div className="cursor-text italic">
                        {replaceNewlinesWithBreaks(category.description_rewrite.your_property)}
                      </div>
                    </div>

                    <div className="ml-8 my-2">
                      <div className="font-bold">
                        Guest access:
                      </div>
                      <div className="cursor-text italic">
                        {replaceNewlinesWithBreaks(category.description_rewrite.guest_access)}
                      </div>
                    </div>

                    <div className="ml-8 my-2">
                      <div className="font-bold">
                        Interactions with guests:
                      </div>
                      <div className="cursor-text italic">
                        {replaceNewlinesWithBreaks(category.description_rewrite.interaction_with_guests)}
                      </div>
                    </div>

                    <div className="ml-8 my-2">
                      <div className="font-bold">
                        Other details to note:
                      </div>
                      <div className="cursor-text italic">
                        {replaceNewlinesWithBreaks(category.description_rewrite.other_details_to_note)}
                      </div>
                    </div>

                    <div className="ml-8 mt-4">
                      * Interaction with guests portion is only used when your listing is a private room.
                    </div>
                  </div>
                )}

                {category.title_rewrites && (
                  <div className="font-bold">Suggested Titles</div>
                )}

                {category.title_rewrites && category.title_rewrites.map((title: string, index: number) => (
                  <div key={index}>
                    <li className="cursor-text mt-2 italic">
                      {title}
                    </li>
                  </div>
                ))
                }

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

    </div>

  )
}

