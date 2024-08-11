import { PencilEdit02Icon } from "./Icons";
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
            <CardContent className="grid grid-cols-2 items-baseline gap-4 p-4 pt-0 text-gray-400">
                <div className=" items-baseline gap-1 tabular-nums leading-none col-span-2">
                    Last verification: 08/06/2024 8:45 p.m.
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