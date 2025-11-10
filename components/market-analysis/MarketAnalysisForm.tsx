"use client";

import GeoapifyAddressAutocomplete from "@/components/address-lookup/indext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

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

interface MarketAnalysisFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  accountLoading: boolean;
  accountError: string | null;
  accountData: {
    remaining_runs: number;
  } | null;
  dialogOpen: boolean;
  showRoomTypeSelect?: boolean; // Controls whether room type is shown or hidden
  fixedRoomType?: string; // Fixed room type value if not showing select
  productName: string; // "Market Spy" or "Market Scout"
}

export default function MarketAnalysisForm({
  onSubmit,
  loading,
  accountLoading,
  accountError,
  accountData,
  dialogOpen,
  showRoomTypeSelect = true,
  fixedRoomType = "entire home",
  productName,
}: MarketAnalysisFormProps) {
  const [addressKey, setAddressKey] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<{
    formattedAddress: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        formattedAddress: "",
        latitude: 0,
        longitude: 0,
      },
      roomType: showRoomTypeSelect ? "" : fixedRoomType,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[500px]"
        style={{
          pointerEvents: dialogOpen ? "none" : "auto",
          opacity: dialogOpen ? 0.5 : 1,
        }}
      >
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
                    key={addressKey}
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

        {/* Room Type Field - shown or hidden based on prop */}
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem
              className={showRoomTypeSelect ? "max-w-[300px]" : "hidden"}
            >
              <FormLabel>Type of Stay</FormLabel>
              <FormControl>
                {showRoomTypeSelect ? (
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[300px]"
                  >
                    <option value="">Select</option>
                    <option value="room">Room</option>
                    <option value="entire home">Entire Home</option>
                  </select>
                ) : (
                  <input type="hidden" {...field} value={fixedRoomType} />
                )}
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
                  <option value="">Select</option>
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

        <div className="text-sm text-muted-foreground">
          Run your report now - it typically takes 12-15 minutes.
          <div>
            Head to the {productName} Reports page to check its progress on your
            reports page.
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={
            loading ||
            accountLoading ||
            !!accountError ||
            !accountData ||
            accountData.remaining_runs <= 0
          }
          className="w-fit"
        >
          {loading
            ? "Searching..."
            : accountLoading
              ? "Loading..."
              : accountError
                ? "Unable to load account"
                : !accountData
                  ? "No account data"
                  : accountData.remaining_runs <= 0
                    ? "No runs remaining"
                    : "Search Market"}
        </Button>
      </form>
    </Form>
  );
}
