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


interface RatingCategory {
  name: string
  score: number
  category: string
  icon: React.ReactNode
  feedback: string
  suggestions: string
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
    overall_rating_number: number
    overall_rating_category: string
  }
}

export default function PropertyRatings({ ratings }: PropertyRatingsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const categories: RatingCategory[] = [
    { ...ratings.description, icon: <File02Icon className="w-5 h-5" /> },
    { ...ratings.title, icon: <SubtitleIcon className="w-5 h-5" /> },
    { ...ratings.amenities, icon: <PoolIcon className="w-5 h-5" /> },
    { ...ratings.heroImage, icon: <Image02Icon className="w-5 h-5" /> },
    { ...ratings.otherImages, icon: <Album02Icon className="w-5 h-5" /> },
    { ...ratings.interiorDesign, icon: <Sofa01Icon className="w-5 h-5" /> },
  ]

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

  const getBarColorClass = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-green-600 dark:bg-green-400';
      case 'good':
        return 'bg-blue-600 dark:bg-blue-400';
      case 'satisfactory':
        return 'bg-yellow-600 dark:bg-yellow-400';
      case 'needs_work':
        return 'bg-orange-600 dark:bg-orange-400';
      case 'fail':
        return 'bg-red-600 dark:bg-red-400';
      default:
        return 'bg-gray-600 dark:bg-gray-400';
    }
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
          <h4 className="font-semibold">Rating:</h4>
          <p>{ratings.overall_rating_number} ({ratings.overall_rating_category})</p>
        </div>

        <div>
          <h4 className="font-semibold">Feedback:</h4>
          <p>{ratings.feedback}</p>
        </div>
        <div>
          <h4 className="font-bold">Suggestions:</h4>
          <p>{ratings.suggestions}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold my-4 mx-2">Detailed Feedback and Suggestions</h2>

      {categories.map((category) => (
        <div key={category.name} className="space-y-2 mb-6">

          {/* <div>
            open items: {openSections.join()}
          </div> */}

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
                    {category.score}%
                  </span>
                </div>
                <Progress value={category.score} className="h-2 ml-2 mt-1.5" barClassName={`${getBarColorClass(category.category)}`} />

              </AccordionTrigger>
              <AccordionContent className="space-y-2 px-12 py-4">
                <div><span className="font-bold">Feedback:</span> {category.feedback}</div>
                <div><span className="font-bold">Suggestions:</span> {category.suggestions}</div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

    </div>

  )
}

