import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import PropertyCompsComponent from "./ratings";

const RatingsDialog = ({
  ratings,
  textLink,
  buttonSize,
}: {
  ratings: any;
  textLink?: boolean;
  buttonSize?: "sm" | "lg" | "default" | "icon";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {textLink ? (
        <span
          className="text-blue-500 cursor-pointer display:inline"
          onClick={() => setIsOpen(true)}
        >
          View Sample Report
        </span>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size={buttonSize || "default"}
          className={buttonSize === "lg" ? "text-lg" : ""}
        >
          View Sample Report
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Sample Ratings Report</DialogTitle>
          </DialogHeader>

          {ratings && <PropertyCompsComponent propertyRatings={ratings} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RatingsDialog;
