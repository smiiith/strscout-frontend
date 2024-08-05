import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Listing = (props: any) => {
    const listing = props.listing;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{listing.listed_on} Listing</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{listing.listed_on} ID: {listing.external_listing_id}</p>
            </CardContent>
        </Card>
    )
}

export default Listing;