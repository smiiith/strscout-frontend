'use client'

import { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Home, Sparkles, Image, ChevronDown, ChevronUp } from 'lucide-react'

interface RatingCategory {
  name: string
  score: number
  category: string
  icon: React.ReactNode
  // feedback: string
  // suggestions: string
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
  }
}

export default function PropertyRatings({ ratings }: PropertyRatingsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: RatingCategory[] = [
    { ...ratings.description, icon: <Home className="w-5 h-5" /> },
    { ...ratings.title, icon: <ChevronDown className="w-5 h-5" /> },
    { ...ratings.amenities, icon: <Sparkles className="w-5 h-5" /> },
    { ...ratings.heroImage, icon: <Image className="w-5 h-5" /> },
    { ...ratings.otherImages, icon: <Image className="w-5 h-5" /> },
    { ...ratings.interiorDesign, icon: <Image className="w-5 h-5" /> },
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
    setExpandedCategory(expandedCategory === name ? null : name)
  }

  return (
    <div>

      {categories.map((category) => (
        <div key={category.name} className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {category.icon}
              <span className="font-medium">{category.name} ({category.category})</span>
            </div>
            <span className={`font-bold ${getColorClass(category.category)}`}>
              {category.score}%
            </span>
          </div>
          <Progress value={category.score} className="h-2" barClassName={`${getBarColorClass(category.category)}`} />
        </div>
      ))}

      <div className="mt-12 space-y-6 p-4 rounded-md border border-border">
        <div>
          <h4 className="font-semibold">Feedback:</h4>
          <p>{ratings.feedback}</p>
        </div>
        <div>
          <h4 className="font-bold">Suggestions:</h4>
          <p>{ratings.suggestions}</p>
        </div>
      </div>

    </div>

  )
}

