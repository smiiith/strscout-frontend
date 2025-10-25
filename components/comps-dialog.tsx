import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import CompsTable, { CompAnalysisData } from "./comps-table";

interface CompsDialogProps {
  comps: CompAnalysisData[];
  textLink?: boolean;
  buttonText?: string;
  dialogTitle?: string;
  filterOut100Percent?: boolean;
  mock?: boolean;
}

const CompsDialog = ({
  comps,
  textLink = false,
  buttonText = "View Market Analysis",
  dialogTitle = "Market Analysis - Comparable Listings",
  filterOut100Percent = true,
  mock = false,
}: CompsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {textLink ? (
        <span
          className="text-blue-500 cursor-pointer hover:text-blue-700 underline"
          onClick={() => setIsOpen(true)}
        >
          {buttonText}
        </span>
      ) : (
        <Button onClick={() => setIsOpen(true)} variant="default">
          {buttonText}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[95vw] sm:h-[95vh] sm:max-h-[95vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <CompsTable
              comps={comps}
              filterOut100Percent={filterOut100Percent}
              mock={mock}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompsDialog;
