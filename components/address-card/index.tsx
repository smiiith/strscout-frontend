"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Navigation, TrendingUp } from "lucide-react"
import { HourglassIcon, IncognitoIcon, MapPinIcon, Navigation03Icon, TaskDone01Icon } from "../Icons"
import { getScanStatus } from "@/app/types/scanStatus"
import { useRouter } from "next/navigation"

interface OccupancyData {
    id: string
    created_at: string
    profile_id: string
    scan_id: string
    listing_id: string
    thirty_day: number
    sixty_day: number
    ninety_day: number
    overall_occupancy: number
}

export interface AddressCardProps {
    address: string
    latitude: number
    longitude: number
    status: string
    occupancyData?: OccupancyData[]
    useNavigation?: boolean
    compBasisId?: string
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "pending":
            return <HourglassIcon className="h-6 w-6 text-gray-500" />
        case "in_progress":
            return <IncognitoIcon className="h-6 w-6 text-blue-500" />
        case "completed":
            return <TaskDone01Icon className="h-6 w-6 text-green-500" />
        default:
            return <HourglassIcon className="h-6 w-6 text-gray-500" />
    }
}

const ScanStatusWidget = ({ status }: { status: string }) => {
    return (
        <div className="flex items-center gap-2 absolute top-8 right-5" title={getScanStatus(status)}>
            Status: {getStatusIcon(status)}
        </div>
    )
}

export default function AddressCard({ address, latitude, longitude, status, occupancyData = [], useNavigation = false, compBasisId }: AddressCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter()

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getOccupancyColor = (percentage: number) => {
        // const value = Number.parseInt(percentage.replace("%", ""))
        if (percentage >= 90) return "text-green-600"
        if (percentage >= 70) return "text-yellow-600"
        if (percentage >= 50) return "text-orange-600"
        return "text-red-600"
    }

    const handleCardClick = () => {
        if (useNavigation && compBasisId) {
            const searchParams = new URLSearchParams({
                compBasisId: compBasisId
            });
            router.push(`/comp-details?${searchParams.toString()}`);
        } else {
            setIsDialogOpen(true);
        }
    }

    return (
        <>
            <Card
                className="w-full h-fit cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-card border border-black/30 relative"
                onClick={handleCardClick}
            >
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <MapPinIcon className="h-5 w-5 text-primary" color="red" />
                        Address
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <ScanStatusWidget status={status} />
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                        <p className="text-sm">{address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Latitude</p>
                            <div className="flex items-center gap-1">
                                <Navigation03Icon className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm font-mono">{latitude}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Longitude</p>
                            <div className="flex items-center gap-1">
                                <Navigation03Icon className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm font-mono">{longitude}</p>
                            </div>
                        </div>
                    </div>

                    {occupancyData.length > 0 && (
                        <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">Click to view {occupancyData.length} occupancy records</p>
                        </div>
                    )}
                </CardContent>
            </Card>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Occupancy Data for {address}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-auto">
                        {occupancyData.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Listing ID</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>30 Day</TableHead>
                                        <TableHead>60 Day</TableHead>
                                        <TableHead>90 Day</TableHead>
                                        <TableHead>Overall</TableHead>
                                        <TableHead>Scan ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {occupancyData.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-mono text-sm">{record.listing_id}</TableCell>
                                            <TableCell className="text-sm">{formatDate(record.created_at)}</TableCell>
                                            <TableCell className={`font-semibold ${getOccupancyColor(record.thirty_day)}`}>
                                                {record.thirty_day}
                                            </TableCell>
                                            <TableCell className={`font-semibold ${getOccupancyColor(record.sixty_day)}`}>
                                                {record.sixty_day}
                                            </TableCell>
                                            <TableCell className={`font-semibold ${getOccupancyColor(record.ninety_day)}`}>
                                                {record.ninety_day}
                                            </TableCell>
                                            <TableCell className={`font-semibold ${getOccupancyColor(record.overall_occupancy)}`}>
                                                {record.overall_occupancy}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{record.scan_id}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex items-center justify-center h-32">
                                <p className="text-muted-foreground">No occupancy data available</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
