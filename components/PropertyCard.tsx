import { Alert02Icon, CheckmarkCircle02Icon, PencilEdit02Icon, RecordIcon, TrafficLightIcon } from "./Icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { useRouter } from 'next/navigation';


const PropertyCard = (props: any) => {
    const router = useRouter()
    const property = props.property;

    return (
        <Card className="min-w-[500px] max-w-[500px]">
            <CardHeader className="p-4 pb-0">
                <CardTitle className="flex gap-2">
                    <div className="flex-grow">
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
                            Listed on: {property.listings[0].listed_on.toUpperCase()} and {property.listings[1].listed_on.toUpperCase()}
                        </>
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 items-baseline gap-4 p-4 pt-2 text-gray-400">
                <div className=" items-baseline gap-1 tabular-nums leading-none col-span-2">
                    {property.lastscan && (
                        <>
                            <div className="flex flex-row">
                                <div className={`${property.lastscan.has_mismatch ? "text-red-500" : "text-green-500"} mr-1`}>
                                    {property.lastscan.has_mismatch ? <Alert02Icon /> : <CheckmarkCircle02Icon />}
                                </div>
                                <div className="mx-1 mt-1">
                                    Last scan: {property.lastscan.created_at}
                                    <div className="mt-2">
                                        {property.lastscan.has_mismatch ? "Issues Found" : "No Issues"}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="col-span-1">
                    Primary Contact: {property.primary_contact}
                </div>
                <div className="col-span-1 text-right">
                    {property.primary_phone}
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyCard;