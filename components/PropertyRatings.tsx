'use client'

import { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    amenities: RatingCategory
    heroImage: RatingCategory
    feedback: string
    suggestions: string
  }
}

export default function PropertyRatings({ ratings }: PropertyRatingsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const categories: RatingCategory[] = [
    { ...ratings.description, icon: <Home className="w-5 h-5" /> },
    { ...ratings.amenities, icon: <Sparkles className="w-5 h-5" /> },
    // { ...ratings.heroImage, icon: <Image className="w-5 h-5" /> },
  ]

  const getColorClass = (score: number) => {
    if (score >= 75) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getBarColorClass = (score: number) => {
    if (score >= 75) return "bg-green-600"
    if (score >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  const toggleCategory = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name)
  }

  return (
    // <Card className="w-full max-w-2xl mx-auto">
    // <CardHeader>
    // <CardTitle className="text-2xl font-bold">Property Ratings</CardTitle>
    // </CardHeader>
    // <CardContent className="space-y-6">
    <div>

      {categories.map((category) => (
        <div key={category.name} className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {category.icon}
              <span className="font-medium">{category.name} ({category.category})</span>
            </div>
            <span className={`font-bold ${getColorClass(category.score)}`}>
              {category.score}%
            </span>
          </div>
          <Progress value={category.score} className="h-2" barClassName={`${getBarColorClass(category.score)}`} />
          {/* <Button
            variant="ghost"
            className="w-full justify-between mt-2"
            onClick={() => toggleCategory(category.name)}
          >
            {expandedCategory === category.name ? 'Hide Details' : 'Show Details'}
            {expandedCategory === category.name ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button> */}
          {/* {expandedCategory === category.name && (
            <div className="mt-2 space-y-2 p-4 bg-muted rounded-md">
              <div>
                <h4 className="font-semibold">Feedback:</h4>
                <p>{category.feedback}</p>
              </div>
              <div>
                <h4 className="font-semibold">Suggestions:</h4>
                <p>{category.suggestions}</p>
              </div>
            </div>
          )} */}
        </div>
      ))}

      <div className="mt-12 space-y-6 p-4 bg-card rounded-md border border-border">
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

