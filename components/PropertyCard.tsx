import { useEffect, useState } from "react";
import { Alert02Icon, CheckmarkCircle02Icon, LoadingSpinner, PencilEdit02Icon, RecordIcon, SearchingIcon, TrafficLightIcon } from "./Icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { useRouter } from 'next/navigation';
import { formatInTimeZone } from 'date-fns-tz'
import axios from "axios";
import { Badge } from "./ui/badge";

const PropertyCard = (props: any) => {
    const router = useRouter()
    const property = props.property;
    const [lastScan, setLastScan] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (date: Date) => {
        const dateObj = new Date(date);
        const timeZone = "America/Los_Angeles";
        const zonedDate = formatInTimeZone(dateObj, timeZone, "MM/dd/yyyy hh:mm aaaa zzz");
        return zonedDate;
    }

    const launchScan = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}scan`, {
                propertyId: property.id,
                headers: {
                    // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
                }
            });

            if (response.data) {
                console.log("scanresponse", response.data);
                setIsLoading(false);
                setLastScan(response.data);
            }
        } catch (error) {
            console.error('Error loading user properties:', error);
        }
    }

    return (
        <Card className="md:min-w-[500px] md:max-w-[500px] w-full border border-secondary-foreground">
            <CardHeader className="p-4 pb-0">
                <CardTitle className="flex gap-2">
                    <div className="flex-grow md:text-2xl text-xl">
                        {property.name}
                    </div>
                    <div
                        className="cursor-pointer"
                        title="Edit Property"
                        onClick={() => router.push(`/properties/add?property=${property.id}`)}
                    >
                        <PencilEdit02Icon />
                    </div>
                </CardTitle>
                <CardDescription>
                    {property.listings.length > 0 &&
                        <>
                            Listed on: {property.listings[0]?.listed_on.toUpperCase()} and {property.listings[1]?.listed_on.toUpperCase()}
                        </>
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 items-baseline gap-4 p-4 pt-2 text-gray-400">
                <div className=" items-baseline gap-1 tabular-nums leading-none col-span-2">
                    {property.lastscan && (
                        <>
                            {isLoading ? (
                                <div className="flex flex-row">
                                    <div className="mr-1 text-blue-500">
                                        <LoadingSpinner />
                                    </div>
                                    <div className="mx-1 mt-1">
                                        <span className="font-bold">Scanning...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-row">
                                    <div className={`${property.lastscan.has_mismatch ? "text-red-500" : "text-green-500"} mr-1`}>
                                        {property.lastscan.has_mismatch ? <Alert02Icon /> : <CheckmarkCircle02Icon />}
                                    </div>
                                    <div className="mx-1 mt-1">
                                        <span className="font-bold">Last scan:</span> {formatDate(property.lastscan.created_at)}
                                        <div className="mt-2">
                                            {property.lastscan.has_mismatch ? "Issues Found" : "No Issues"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="col-span-1">
                    Primary Contact: {property.primary_contact}
                </div>
                <div className="col-span-1 grid justify-items-end">
                    <div
                        onClick={launchScan}
                        className="bg-transparent hover:opacity-50 rounded-full border border-secondary-foreground text-secondary-foreground text-sm cursor-pointer px-2 py-0">
                        Scan
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyCard;