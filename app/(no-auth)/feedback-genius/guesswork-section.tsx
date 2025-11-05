import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const GuessworkSection = () => {
  const router = useRouter();

  return (
    <div className="bg-card w-full">
      <div className="container mx-auto px-4 gap-8">
        <Card className="border-none">
          <CardContent className="px-2 py-4 space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Take The Guesswork Out of Your Listing
            </h1>

            <p className="text-lg text-gray-800 max-w-3xl">
              For many short-term rental hosts, knowing whether a listing truly
              stands out is a challenge. Does your headline attract attention?
              Are your photos compelling? Are your amenities competitive?
              Without clear feedback, it's easy to feel stuck or unsure.
            </p>

            <Button
              className="hover:opacity-80 h-auto"
              onClick={() => router.push("/feedback-genius/analyze")}
            >
              Improve Your Listing Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuessworkSection;
