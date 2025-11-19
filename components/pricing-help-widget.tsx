"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CompsDialog from "@/components/comps-dialog";
import { MockMarketSpyComps } from "@/components/ratings-example/market-spy-mock";
import { HelpCircle, FileText, Video, MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PricingHelpWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2">
      {/* Expanded Menu */}
      {isMenuOpen && (
        <Card className="p-3 shadow-2xl w-64 animate-in slide-in-from-bottom-2 border-2 border-primary bg-card">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-primary/20">
            <span className="font-semibold text-sm">How can we help?</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {/* Sample Report */}
            <CompsDialog
              comps={MockMarketSpyComps}
              buttonText={
                <span className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  View Sample Report
                </span>
              }
              dialogTitle="Sample Market Analysis Report"
              filterOut100Percent={true}
              mock={true}
              buttonVariant="ghost"
              buttonClassName="w-full justify-start h-auto py-2"
            />

            {/* Demo Video & Contact */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
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
        </Card>
      )}

      {/* Main Help Button */}
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg p-0 flex items-center justify-center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close help menu" : "Open help menu"}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <HelpCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
