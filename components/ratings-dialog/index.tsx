import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import PropertyCompsComponent from "./ratings";


const RatingsDialog = ({ ratings }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log("RatingsDialog - ratings:", ratings);


    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
            >
                View Sample Report
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[90vw] sm:h-[100vh] sm:max-h-[90vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Sample Ratings Report</DialogTitle>
                    </DialogHeader>

                    {ratings &&
                        <PropertyCompsComponent propertyRatings={ratings} />
                    }

                </DialogContent>
            </Dialog>

        </div>
    );
}

export default RatingsDialog;