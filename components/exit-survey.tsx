"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExitSurveyProps {
  pagePath: string;
}

const SURVEY_OPTIONS = [
  { value: "too-expensive", label: "Too expensive" },
  { value: "not-sure-worth", label: "Not sure it's worth it" },
  { value: "want-examples", label: "Want to see more examples/proof" },
  { value: "need-time", label: "Need more time to decide" },
  { value: "just-researching", label: "Just researching options" },
  { value: "other", label: "Other (please specify)" },
];

export default function ExitSurvey({ pagePath }: ExitSurveyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Check if exit survey is enabled via environment variable
    const isEnabled = process.env.NEXT_PUBLIC_EXIT_SURVEY_ENABLED !== 'false';
    if (!isEnabled) return;

    // Check if user has already seen or dismissed the survey
    const hasSeenSurvey = localStorage.getItem("exit-survey-seen");
    if (hasSeenSurvey) return;

    let timeOnPage = 0;
    let hasScrolledToPricing = false;
    let isMouseExiting = false;

    // Track time on page and check survey trigger
    const timeInterval = setInterval(() => {
      timeOnPage += 1;

      // Auto-show survey after 45 seconds (mobile fallback)
      if (timeOnPage === 45) {
        checkAndShowSurvey();
      }
    }, 1000);

    // Track scroll to pricing section
    const handleScroll = () => {
      const scrollDepth = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Consider scrolled to pricing if past 30% of page
      if (scrollDepth > pageHeight * 0.3) {
        hasScrolledToPricing = true;
      }

      // Detect scroll back to top after seeing pricing
      if (hasScrolledToPricing && window.scrollY < 100) {
        checkAndShowSurvey();
      }
    };

    // Detect mouse leaving viewport (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        isMouseExiting = true;
        checkAndShowSurvey();
      }
    };

    // Detect tab visibility change (mobile-friendly)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        checkAndShowSurvey();
      }
    };

    const checkAndShowSurvey = () => {
      // Re-check localStorage each time (in case user dismissed/submitted)
      const currentStatus = localStorage.getItem("exit-survey-seen");

      const shouldShow =
        !currentStatus &&
        !hasSeenSurvey &&
        timeOnPage >= 30 && // At least 30 seconds on page
        (isMouseExiting || hasScrolledToPricing || timeOnPage >= 45); // Exit signal or 45+ seconds

      if (shouldShow) {
        setIsVisible(true);
        localStorage.setItem("exit-survey-seen", "true");
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("exit-survey-seen", "true");
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/exit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_path: pagePath,
          selected_option: selectedOption,
          other_text: selectedOption === "other" ? otherText : null,
        }),
      });

      if (response.ok) {
        setHasSubmitted(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="relative">
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <CardTitle className="text-xl">
            {hasSubmitted ? "Thank you!" : "Wait! Before you go..."}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasSubmitted ? (
            <p className="text-muted-foreground">
              Your feedback helps us improve. We appreciate your time!
            </p>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                What's holding you back from trying STR Sage today?
              </p>

              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                <div className="space-y-3">
                  {SURVEY_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-start space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="font-normal cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {selectedOption === "other" && (
                <Textarea
                  placeholder="Please tell us more..."
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedOption || isSubmitting || (selectedOption === "other" && !otherText.trim())}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <Button onClick={handleDismiss} variant="outline">
                  No thanks
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
