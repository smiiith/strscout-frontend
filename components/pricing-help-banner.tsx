"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CompsDialog from "@/components/comps-dialog";
import { MockMarketSpyComps } from "@/components/ratings-example/market-spy-mock";
import { FileText, Video, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PricingHelpBanner() {
  return (
    <div className="mb-6 py-2 px-4 border border-border rounded-lg bg-primary/10">
      <div className="text-center mb-3">
        <div className="text-md font-semibold text-muted-foreground">
          Need help deciding?{" "}
          <span className="text-sm font-medium">
            See what you'll get or talk to us before choosing a plan
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {/* Sample Report Button */}
        <CompsDialog
          comps={MockMarketSpyComps}
          buttonText={
            <span className="flex items-center gap-2 text-xs">
              <FileText className="w-3 h-3" />
              View Sample Report
            </span>
          }
          dialogTitle="Sample Market Analysis Report"
          filterOut100Percent={true}
          mock={true}
          buttonVariant="ghost"
          buttonClassName="flex-1 sm:flex-initial text-xs h-8"
        />

        {/* Demo Video & Contact Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex-1 sm:flex-initial text-xs h-8"
            >
              <MessageCircle className="w-3 h-3 mr-2" />
              Talk to Us / See Demo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Watch Demo or Contact Us</DialogTitle>
              <DialogDescription>
                See STR Sage in action or get in touch with our team
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Video Section */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Watch Demo Video
                </h4>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dOBdLm3_Z1s"
                    title="STR Sage Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Contact Section */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Still have questions?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We're here to help! Reach out to discuss your specific needs.
                </p>
                <Button asChild className="w-full sm:w-auto">
                  <a href="/contact-us">Contact Us</a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
