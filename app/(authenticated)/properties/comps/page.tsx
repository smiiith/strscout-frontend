"use client";

import { Analytics01Icon } from "@/components/Icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";


const PropertyCompsPage = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? (
                <LoadingOverlay />
            ) : (
                <>
                    <h1 className="text-3xl mb-6"><Analytics01Icon className="h-8 w-8 inline-block mb-2 mr-2 text-secondary-foreground" />Property Comparables</h1>

                    <div className="md:w-[900px]">
                        <Table>
                            <TableCaption>Your recent scans</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="">Property Name</TableHead>
                                    <TableHead>Scan Date</TableHead>
                                    <TableHead>View Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* {scans.map((scan: any, index: number) => ( */}
                                <TableRow className="hover:muted-foreground">
                                    <TableCell>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                                {/* ))} */}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </>
    )
}

export default PropertyCompsPage

const comps = [
    {

    }
]