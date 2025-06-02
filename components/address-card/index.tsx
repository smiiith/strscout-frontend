import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"
import { MapPinIcon, Navigation03Icon } from "../Icons"

export interface AddressCardProps {
    address: string
    latitude: number
    longitude: number
}

export default function AddressCard({ address, latitude, longitude }: AddressCardProps) {
    return (
        <Card className="w-full h-fit bg-card border border-black/30">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPinIcon className="h-5 w-5 text-primary" color="red" />
                    Address
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
