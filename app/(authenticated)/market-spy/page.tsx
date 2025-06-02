"use client"

import { PLANS } from "@/app/types/plans";
import GeoapifyAddressAutocomplete from "@/components/address-lookup/indext";
import ProtectedPage from "@/components/ProtectedPage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { add } from "date-fns";


const formSchema = z.object({
    address: z.object({
        formattedAddress: z.string().min(1, "Please select an address"),
        latitude: z.number(),
        longitude: z.number(),
    }),
    roomType: z.string().min(1, "Please select a room type"),
    bedrooms: z.string().min(1, "Please select number of bedrooms"),
});

type FormData = z.infer<typeof formSchema>;

const MarketSpyPage = () => {
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<{
        formattedAddress: string;
        latitude: number;
        longitude: number;
    } | null>(null);
    const { session } = useUserSession();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: {
                formattedAddress: "",
                latitude: 0,
                longitude: 0,
            },
            roomType: "",
            bedrooms: "",
        },
    });

    const handleAddressSelect = (addressData: {
        formattedAddress: string;
        latitude: number;
        longitude: number;
    }) => {
        setSelectedAddress(addressData);
        form.setValue("address", addressData);
        form.clearErrors("address");
    };

    const onSubmit = async (data: FormData) => {
        setLoading(true);

        // console.log("session", session);

        if (session && session.id) {

            try {
                const requestData = {
                    geocode: `${data.address.latitude}, ${data.address.longitude}`,
                    address: data.address.formattedAddress,
                    zoom_level: 50,
                    room_type: data.roomType,
                    bedrooms: data.bedrooms,
                    length_of_stay: "1 night stay - tomorrow with 14 day window",
                    profile_id: session.id,
                };

                const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/scrape`;

                const response = await axios.post(
                    endpoint,
                    requestData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                if (response.data) {
                    if (response.data.properties.length === 0) {
                        // router.push("/properties/assess-property/single");
                    }
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setLoading(false);
            }
        } else {
            console.error("User session not found or invalid.");
            setLoading(false);
        }
    };

    return (
        <ProtectedPage requiredPlan={PLANS.FREEMIUM}>
            <div className="min-h-[700px] py-6">

                <Image
                    src="/market-spy-logo.png"
                    alt="STR Market Spy"
                    width={233}
                    height={80}
                />

                <h1 className="text-3xl font-bold mt-6">Competitive Insights for Your Listing</h1>

                <div className="space-y-6 w-full mt-6">

                    <p className="w-1/2">
                        Enter your listing info below. STR Market Spy will analyze local bookings, policies, amenities, and more — then show you exactly how you compare.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-[500px]">
                            {/* Address Field */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <div>
                                                <GeoapifyAddressAutocomplete
                                                    apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}
                                                    onAddressSelect={handleAddressSelect}
                                                />
                                                {selectedAddress && (
                                                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                                                        <p className="text-sm text-gray-600">
                                                            Selected: {selectedAddress.formattedAddress}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Room Type Field */}
                            <FormField
                                control={form.control}
                                name="roomType"
                                render={({ field }) => (
                                    <FormItem className="max-w-[300px]">
                                        <FormLabel>Type of Stay</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[300px]"
                                            >
                                                <option value="">Select room type</option>
                                                <option value="any type">Any Type</option>
                                                <option value="room">Room</option>
                                                <option value="entire home">Entire Home</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Bedrooms Field */}
                            <FormField
                                control={form.control}
                                name="bedrooms"
                                render={({ field }) => (
                                    <FormItem className="max-w-[300px]">
                                        <FormLabel>Number of Bedrooms</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[300px]"
                                            >
                                                <option value="">Select number of bedrooms</option>
                                                <option value="any">Any</option>
                                                <option value="1+">1+</option>
                                                <option value="2+">2+</option>
                                                <option value="3+">3+</option>
                                                <option value="4+">4+</option>
                                                <option value="5+">5+</option>
                                                <option value="6+">6+</option>
                                                <option value="7+">7+</option>
                                                <option value="8+">8+</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                variant="default"
                                disabled={loading}
                                className="w-fit"
                            >
                                {loading ? "Searching..." : "Search Market"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default MarketSpyPage;
