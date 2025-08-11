"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Listing {
  id: string;
  title: string;
  thumbnail: string;
  property_id?: string;
}

const mockListings: Listing[] = [
  {
    id: "123456789012",
    title: "Modern Downtown Apartment with City Views",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "234567890123",
    title: "Cozy Suburban Home with Garden",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "345678901234",
    title: "Luxury Penthouse Suite",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "456789012345",
    title: "Charming Victorian House",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "567890123456",
    title: "Beachfront Condo with Ocean Views",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "678901234567",
    title: "Mountain Cabin Retreat",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "789012345678",
    title: "Urban Loft in Arts District",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "890123456789",
    title: "Family Home with Pool",
    thumbnail: "/placeholder.svg?height=60&width=60",
  },
];

interface CompareListingsDialogProps {
  label: string;
  listings?: Listing[];
  onSelectionConfirm?: (selectedListingIds: string[]) => void;
  compBasisId?: string;
  topListingIds?: string[];
  profileId?: string;
  onAnalysisStart?: () => void;
  onAnalysisComplete?: (analysisId: string) => void;
}

const CompareListingsDialog = ({
  listings = mockListings,
  label,
  onSelectionConfirm,
  compBasisId,
  topListingIds,
  profileId,
  onAnalysisStart,
  onAnalysisComplete,
}: CompareListingsDialogProps) => {
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (listingId: string, checked: boolean) => {
    if (checked) {
      setSelectedListings([listingId]); // Only allow one selection
    } else {
      setSelectedListings([]);
    }
  };

  const handleConfirm = async () => {
    if (selectedListings.length === 0) return;

    const selectedListingId = selectedListings[0];

    // Find the selected listing to get its property_id
    const selectedListing = listings.find(
      (listing) => listing.id === selectedListingId
    );
    const userPropertyId = selectedListing?.property_id;

    if (!userPropertyId) {
      alert("Error: Could not find property ID for selected listing");
      return;
    }

    if (compBasisId) {
      // Call the market spy analysis endpoint
      try {
        // Notify parent component that analysis is starting
        if (onAnalysisStart) {
          onAnalysisStart();
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/comps/market_spy_from_comp_basis/${compBasisId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_listing_id: userPropertyId,
              top_listing_ids: topListingIds || [],
              profile_id: profileId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch market spy analysis");
        }

        const data = await response.json();

        // Navigate to the analysis results page if we have a comp_analysis_id
        if (data.comp_analysis_id) {
          // Notify parent component that analysis is complete
          if (onAnalysisComplete) {
            onAnalysisComplete(data.comp_analysis_id);
          }
          router.push(`/comp-analysis?id=${data.comp_analysis_id}`);
        } else {
          // Fallback if no ID is returned
          alert("Market spy analysis complete! Check the console for results.");
        }
      } catch (error) {
        console.error("Error running market spy analysis:", error);
        alert("Failed to run market spy analysis. Please try again.");
        // Reset loading state on error
        if (onAnalysisComplete) {
          onAnalysisComplete("");
        }
      }
    }

    if (onSelectionConfirm) {
      onSelectionConfirm(selectedListings);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">{label}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Listings</DialogTitle>
          <DialogDescription>
            Choose the listings you want to include. You can select multiple
            items.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-96">
          <div className="space-y-2">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={listing.id}
                  checked={selectedListings.includes(listing.id)}
                  disabled={
                    selectedListings.length > 0 &&
                    !selectedListings.includes(listing.id)
                  }
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(listing.id, checked as boolean)
                  }
                />

                <Image
                  src={listing.thumbnail || "/placeholder.svg"}
                  alt={listing.title}
                  width={60}
                  height={60}
                  className="rounded-md object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {listing.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        ID:{" "}
                        <a
                          href={`https://www.airbnb.com/rooms/${listing.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline hover:text-primary"
                        >
                          {listing.id}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedListings.length === 0}
          >
            Confirm Selection ({selectedListings.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompareListingsDialog;
