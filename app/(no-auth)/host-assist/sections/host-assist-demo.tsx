import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EarlyAccessDialog } from "@/components/host-assist/early-access-dialog";

export function HostAssistDemo() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-muted/20 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Host Assist in Action
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12">
            See how it tracks every task and keeps you off Airbnb's fee list.
          </p>

          {/* Video Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12 bg-muted">
            <video
              controls
              className="w-full h-full"
              poster="/host-assist/host-assist-hero-graphic-min.jpg"
            >
              <source
                src="https://eklefalzcpfrnsmzrlbn.supabase.co/storage/v1/object/public/media/Host%20Assistan-1080p-230801.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setDialogOpen(true)}
            >
              Get Free Early Access
              <ArrowRight01Icon className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              We're pre-selecting hosts for early access — spots are limited.
            </p>
          </div>
        </div>
      </div>

      <EarlyAccessDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
