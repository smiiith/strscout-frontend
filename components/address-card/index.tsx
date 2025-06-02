import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"
import { HourglassIcon, IncognitoIcon, MapPinIcon, Navigation03Icon, TaskDone01Icon } from "../Icons"
import { getScanStatus } from "@/app/types/scanStatus"

export interface AddressCardProps {
    address: string
    latitude: number
    longitude: number
    status: string
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


export default function AddressCard({ address, latitude, longitude, status }: AddressCardProps) {
    return (
        <Card className="w-full h-fit bg-card border border-black/30 relative">
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
            </CardContent>
        </Card>
    )
}
