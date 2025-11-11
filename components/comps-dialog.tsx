import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import CompsTable, { CompAnalysisData } from "./comps-table";

interface CompsDialogProps {
  comps: CompAnalysisData[];
  textLink?: boolean;
  buttonText?: string | React.ReactNode;
  dialogTitle?: string;
  filterOut100Percent?: boolean;
  mock?: boolean;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonClassName?: string;
}

const CompsDialog = ({
  comps,
  textLink = false,
  buttonText = "View Market Analysis",
  dialogTitle = "Market Analysis - Comparable Listings",
  filterOut100Percent = true,
  mock = false,
  buttonVariant = "default",
  buttonClassName = "",
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
        <Button
          onClick={() => setIsOpen(true)}
          variant={buttonVariant}
          className={buttonClassName}
        >
          {buttonText}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[95vw] sm:h-[95vh] sm:max-h-[95vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <Card>
              <CardContent className="pt-6">
                <CompsTable
                  comps={comps}
                  filterOut100Percent={filterOut100Percent}
                  mock={mock}
                />
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompsDialog;
