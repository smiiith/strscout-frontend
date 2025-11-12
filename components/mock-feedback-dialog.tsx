"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import PropertyRatings from "./PropertyRatings";
import { MockMarketSpyDetails } from "./ratings-example/market-spy-mock-details";

// Mock feedback data based on market-spy-mock-details.ts
const MOCK_FEEDBACK_DATA = MockMarketSpyDetails.ratings || {
  id: "mock-sample-1",
  created_at: new Date().toISOString(),
  property_id: "mock-property-1",
  ratings: {
    title: {
      feedback: {
        items: [
          {
            title: "Title Clarity",
            feedback: "The title effectively communicates the property type and location."
          },
          {
            title: "Appeal",
            feedback: "The title is inviting and catches attention of potential guests."
          },
          {
            title: "Keywords",
            feedback: "Consider including more search-friendly keywords to improve discoverability."
          }
        ],
        summary: "Your listing title is clear and appealing, with room for improvement in search optimization."
      },
      revisions: null,
      suggestions: [
        "Add location-specific keywords to improve search rankings.",
        "Include unique property features in the title.",
        "Consider mentioning nearby attractions or amenities."
      ],
      property_name: "Sample Property",
      rating_number: 75,
      expert_ratings: Array(100).fill(75),
      title_rewrites: [
        "Cozy Downtown Retreat - Walk to Everything",
        "Modern Apartment Near Shopping & Dining",
        "Stylish City Getaway with Free Parking"
      ],
      rating_category: "Satisfactory"
    },
    amenities: {
      feedback: {
        items: [
          {
            title: "Comprehensive Kitchen Supplies",
            feedback: "Your kitchen amenities are well-stocked for guest meal preparation."
          },
          {
            title: "Comfortable Sleeping Arrangements",
            feedback: "Bedroom amenities ensure a restful stay for guests."
          },
          {
            title: "Safety Measures",
            feedback: "Safety features like smoke and CO alarms are properly highlighted."
          },
          {
            title: "Entertainment Options",
            feedback: "TV and streaming services enhance the guest experience."
          }
        ],
        summary: "The amenities provided are comprehensive and cater well to guest needs, showing commitment to comfort and safety."
      },
      revisions: null,
      suggestions: [
        "Consider adding board games or entertainment options.",
        "Enhance outdoor experience with patio furniture.",
        "Implement a welcome package with local information."
      ],
      property_name: "Sample Property",
      rating_number: 82,
      expert_ratings: Array(100).fill(82),
      rating_category: "Good"
    },
    hero_image: {
      feedback: {
        items: [
          {
            title: "Professional Quality",
            feedback: "The hero image is professionally shot with good lighting and composition."
          },
          {
            title: "Inviting Atmosphere",
            feedback: "The image creates a warm and welcoming first impression."
          },
          {
            title: "Room Showcase",
            feedback: "The photograph effectively highlights the space's best features."
          }
        ],
        summary: "The hero image gives an excellent first impression with professional quality and inviting composition."
      },
      revisions: null,
      suggestions: [
        "Add decorative elements for visual interest.",
        "Ensure bright, natural lighting showcases features.",
        "Include multiple angles of the main space."
      ],
      property_name: "Sample Property",
      rating_number: 88,
      expert_ratings: Array(100).fill(88),
      rating_category: "Good"
    },
    description: {
      feedback: {
        items: [
          {
            title: "Detailed Space Description",
            feedback: "The description provides good detail about the property layout and features."
          },
          {
            title: "Highlighting Amenities",
            feedback: "Amenities are well-integrated into the overall description."
          },
          {
            title: "Neighborhood Information",
            feedback: "Local attractions and area information enhance the listing appeal."
          }
        ],
        summary: "Your listing description is comprehensive and effectively communicates the property's value proposition."
      },
      revisions: [
        "Add more personal touches about the hosting experience.",
        "Include specific distances to key attractions.",
        "Highlight unique features that set your property apart."
      ],
      suggestions: [
        "Provide more details about local attractions and activities.",
        "Use bullet points for amenities to improve readability.",
        "Emphasize what makes this property unique in the area."
      ],
      property_name: "Sample Property",
      rating_number: 78,
      expert_ratings: Array(100).fill(78),
      rating_category: "Satisfactory",
      description_rewrite: {
        guest_access: "Guests enjoy complete access to the entire space for a true home-away-from-home experience.",
        your_property: "A beautifully appointed space featuring modern amenities and comfortable furnishings ideal for both leisure and business travelers.",
        listing_description: "Experience comfort and convenience in this well-located property. Perfect for exploring the area while enjoying all the comforts of home.",
        other_details_to_note: "Please note security cameras on the exterior for safety.",
        interaction_with_guests: "I'm available via message for any questions or local recommendations during your stay."
      }
    },
    other_images: {
      feedback: {
        items: [
          {
            title: "Lighting Quality",
            feedback: "Photos have good natural lighting that showcases the space well."
          },
          {
            title: "Clarity and Focus",
            feedback: "Images are sharp and well-focused on key details."
          },
          {
            title: "Comprehensive Coverage",
            feedback: "Photos effectively cover all major areas of the property."
          }
        ],
        summary: "The property photos effectively highlight the space with good clarity and composition."
      },
      revisions: null,
      suggestions: [
        "Use natural light during the day for brightness.",
        "Capture room corners to show full space.",
        "Experiment with angles for dynamic shots.",
        "Ensure all photos are crisp and in focus.",
        "Use wide-angle lens for sense of space."
      ],
      property_name: "Sample Property",
      rating_number: 85,
      expert_ratings: Array(100).fill(85),
      rating_category: "Good"
    },
    interior_design: {
      feedback: {
        items: [
          {
            title: "Modern Aesthetic",
            feedback: "The space features a contemporary design that appeals to many guests."
          },
          {
            title: "Functional Layout",
            feedback: "The layout is well-organized for comfort and ease of movement."
          },
          {
            title: "Color Coordination",
            feedback: "The color scheme is cohesive and creates a pleasant atmosphere."
          }
        ],
        summary: "The interior design is modern and functional, creating an inviting atmosphere for guests."
      },
      revisions: null,
      suggestions: [
        "Add artwork or wall decor for personality.",
        "Introduce colorful textiles for warmth.",
        "Enhance lighting with decorative fixtures.",
        "Consider plants for natural elements."
      ],
      property_name: "Sample Property",
      rating_number: 81,
      expert_ratings: Array(100).fill(81),
      rating_category: "Good"
    },
    overall_ratings: {
      feedback: {
        items: [],
        summary: "Based on analysis of all categories, this property scores 82/99. The rating considers hero image (20%), title (17.5%), other images (17.5%), description (15%), amenities (15%), and interior design (15%)."
      },
      revisions: null,
      suggestions: [
        "Focus on improving the lowest-rated categories for maximum impact",
        "Maintain strengths in your highest-performing areas",
        "Consider the weighted importance when prioritizing improvements"
      ],
      property_name: "Overall Property Rating",
      rating_number: 82,
      expert_ratings: Array(100).fill(82),
      rating_category: "Good"
    }
  },
  modified_at: new Date().toISOString()
};

interface MockFeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MockFeedbackDialog({ isOpen, onClose }: MockFeedbackDialogProps) {
  // Format mock data to match PropertyRatings component expectations
  // Note: icons are added dynamically in PropertyRatings component (lines 60-65)
  const formattedRatings = {
    heroImage: {
      name: "Hero Image",
      score: MOCK_FEEDBACK_DATA.ratings.hero_image.rating_number,
      category: MOCK_FEEDBACK_DATA.ratings.hero_image.rating_category,
      icon: null, // Added by PropertyRatings component
      feedback: {
        summary: MOCK_FEEDBACK_DATA.ratings.hero_image.feedback.summary,
        items: MOCK_FEEDBACK_DATA.ratings.hero_image.feedback.items,
      },
      suggestions: MOCK_FEEDBACK_DATA.ratings.hero_image.suggestions,
      displayOrder: 0,
    },
    title: {
      name: "Title",
      score: MOCK_FEEDBACK_DATA.ratings.title.rating_number,
      category: MOCK_FEEDBACK_DATA.ratings.title.rating_category,
      icon: null, // Added by PropertyRatings component
      feedback: {
        summary: MOCK_FEEDBACK_DATA.ratings.title.feedback.summary,
        items: MOCK_FEEDBACK_DATA.ratings.title.feedback.items,
      },
      title_rewrites: MOCK_FEEDBACK_DATA.ratings.title.title_rewrites,
      suggestions: MOCK_FEEDBACK_DATA.ratings.title.suggestions,
      displayOrder: 1,
    },
    description: {
      name: "Description",
      score: MOCK_FEEDBACK_DATA.ratings.description.rating_number,
      category: MOCK_FEEDBACK_DATA.ratings.description.rating_category,
      icon: null, // Added by PropertyRatings component
      feedback: {
        summary: MOCK_FEEDBACK_DATA.ratings.description.feedback.summary,
        items: MOCK_FEEDBACK_DATA.ratings.description.feedback.items,
      },
      suggestions: MOCK_FEEDBACK_DATA.ratings.description.suggestions,
      description_rewrite: MOCK_FEEDBACK_DATA.ratings.description.description_rewrite,
      displayOrder: 2,
    },
    amenities: {
      name: "Amenities",
      score: MOCK_FEEDBACK_DATA.ratings.amenities.rating_number,
      category: MOCK_FEEDBACK_DATA.ratings.amenities.rating_category,
      icon: null, // Added by PropertyRatings component
      feedback: {
        summary: MOCK_FEEDBACK_DATA.ratings.amenities.feedback.summary,
        items: MOCK_FEEDBACK_DATA.ratings.amenities.feedback.items,
      },
      suggestions: MOCK_FEEDBACK_DATA.ratings.amenities.suggestions,
      displayOrder: 3,
    },
    otherImages: {
      name: "Your photos",
      score: MOCK_FEEDBACK_DATA.ratings.other_images.rating_number,
      category: MOCK_FEEDBACK_DATA.ratings.other_images.rating_category,
      icon: null, // Added by PropertyRatings component
      feedback: {
        summary: MOCK_FEEDBACK_DATA.ratings.other_images.feedback.summary,
        items: MOCK_FEEDBACK_DATA.ratings.other_images.feedback.items,
      },
      suggestions: MOCK_FEEDBACK_DATA.ratings.other_images.suggestions,
      displayOrder: 4,
    },
    interiorDesign: {
      name: "Interior Design",
      score: MOCK_FEEDBACK_DATA.ratings.interior_design.rating_number,
      category: MOCK_FEEDBACK_DATA.ratings.interior_design.rating_category,
      icon: null, // Added by PropertyRatings component
      feedback: {
        summary: MOCK_FEEDBACK_DATA.ratings.interior_design.feedback.summary,
        items: MOCK_FEEDBACK_DATA.ratings.interior_design.feedback.items,
      },
      suggestions: MOCK_FEEDBACK_DATA.ratings.interior_design.suggestions,
      displayOrder: 5,
    },
    feedback: {
      summary: MOCK_FEEDBACK_DATA.ratings.overall_ratings.feedback.summary,
      items: MOCK_FEEDBACK_DATA.ratings.overall_ratings.feedback.items,
    },
    suggestions: MOCK_FEEDBACK_DATA.ratings.overall_ratings.suggestions,
    overall_rating_number: MOCK_FEEDBACK_DATA.ratings.overall_ratings.rating_number,
    overall_rating_category: MOCK_FEEDBACK_DATA.ratings.overall_ratings.rating_category,
  } as any; // Using 'as any' because PropertyRatings adds icons dynamically

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] sm:h-[95vh] sm:max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Sample Competitor Analysis Report</DialogTitle>
          <p className="text-sm text-muted-foreground">
            This is a sample of the detailed AI-powered feedback you'll receive for each comparable property in your real Market Spy report. Discover what makes top-performing listings stand out.
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <PropertyRatings ratings={formattedRatings} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
