"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SearchCompleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remainingRuns: number;
  subscriptionStatus: string | null;
  onRunAnother: () => void;
  reportsPageUrl: string;
  productName: string; // "Market Spy" or "Market Scout"
  oneTimeBalance?: number;
  subscriptionQuantity?: number;
}

export default function SearchCompleteDialog({
  open,
  onOpenChange,
  remainingRuns,
  subscriptionStatus,
  onRunAnother,
  reportsPageUrl,
  productName,
  oneTimeBalance = 0,
  subscriptionQuantity = 0,
}: SearchCompleteDialogProps) {
  const hasActiveSubscription = subscriptionStatus === "active";
  const hasPrepaidBalance = oneTimeBalance > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{productName} Search Started!</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            {/* Show breakdown if subscription user has prepaid balance */}
            {hasActiveSubscription && hasPrepaidBalance ? (
              <div className="space-y-3">
                <p className="font-medium text-foreground">
                  You have {oneTimeBalance + subscriptionQuantity} {productName}{" "}
                  {(oneTimeBalance + subscriptionQuantity) === 1 ? "run" : "runs"} remaining after this search:
                </p>
                <div className="bg-muted rounded p-3 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Prepaid reports:</span>
                    <span className="font-medium">{oneTimeBalance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscription reports:</span>
                    <span className="font-medium">{subscriptionQuantity}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Prepaid reports are used first and never expire.
                </p>
              </div>
            ) : (
              <p className="font-medium text-foreground">
                You have {remainingRuns || 0} {productName}{" "}
                {remainingRuns === 1 ? "run" : "runs"} left{" "}
                {hasActiveSubscription ? "for this month" : ""} after this search.
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              You can now check on the status of your current search on the{" "}
              {productName} Reports page.{" "}
              {remainingRuns > 0 &&
                `You can also run another ${productName} search if needed.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={reportsPageUrl}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {productName} Reports
              </Link>

              {remainingRuns > 0 && (
                <Button
                  onClick={onRunAnother}
                  variant="outline"
                  className="w-fit"
                >
                  Search Again
                </Button>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
