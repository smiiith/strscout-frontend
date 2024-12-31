'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import axios from 'axios'
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


interface AddressCardProps {
    title: string
    externalId: string
    propertyId: string
}

export default function AddressCard({ title, externalId, propertyId }: AddressCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [ratedProperties, setRatedProperties] = useState<any[]>([]);


    // on click, get the comps for this property and show them in a table
    const fetchComparables = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ratings/${propertyId}`, {
                // address: externalId,
                // propertyId: props.propertyId,
                // userId: props.userId,
                headers: {
                    // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
                }
            });

            console.log("ratings", response);

            let ratings = response.data.properties;
            ratings = ratings.sort((a: any, b: any) => b.description_rating_number - a.description_rating_number);

            setRatedProperties(ratings);

            if (response.data) {
                // setComparables(response.data.comparables);
            }
        } catch (error) {
            console.error('Error loading comparables:', error);
        }
    }

    return (
        <>
            <Card
                className="cursor-pointer hover:shadow-lg transition-shadow bg-secondary"
                onClick={() => {
                    setIsOpen(true);
                    fetchComparables();
                }}
            >
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>AirBnB ID: {externalId}</p>
                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[100vw] sm:h-[100vh] sm:max-h-[100vh]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Rating</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Feedback</TableHead>
                                <TableHead>Suggestions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ratedProperties.map((property) => (
                                <TableRow key={property.id} className={propertyId === property.id ? "bg-red-500" : ""}>
                                    <TableCell className="font-medium">{property.description_rating_number}</TableCell>
                                    <TableCell>{property.description_rating_category}</TableCell>
                                    <TableCell>{property.feedback}</TableCell>
                                    <TableCell>{property.suggestions}</TableCell>
                                    <TableCell>
                                        {property.id} and {propertyId}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        </>
    )
}

