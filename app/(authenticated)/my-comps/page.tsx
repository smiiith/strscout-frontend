"use client";

import { PLANS } from "@/app/types/plans";
import GeoapifyAddressAutocomplete from "@/components/address-lookup/indext";
import ProtectedPage from "@/components/ProtectedPage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { add } from "date-fns";
import AddressList from "@/components/address-list";
import { RefreshIcon } from "@/components/Icons";
import LoadingOverlay from "@/components/LoadingOverlay";

const MyCompsPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadingComps, setLoadingComps] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    formattedAddress: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const { session } = useUserSession();
  const [comps, setComps] = useState<any[]>([]);

  const fetchComps = async () => {
    // setLoading(true);

    if (session && session.id) {
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/comp-basis/${session.id}`;

        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setLoading(false);
        setLoadingComps(false);
        setComps(response.data || []);
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

  // state management
  useEffect(() => {
    fetchComps();
  }, [session]);

  return (
    <ProtectedPage requiredPlan={PLANS.STANDARD}>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <div className="min-h-[700px] py-6">
          <h1 className="text-3xl font-bold mt-6">My Comps</h1>

          <div className="space-y-6 w-full mt-6">
            <p className="w-1/2">
              Enter your listing info below. STR Market Spy will analyze local
              bookings, policies, amenities, and more — then show you exactly
              how you compare.
            </p>

            <div className="flex flex-wrap" title="Refresh list">
              <RefreshIcon
                className="h-6 w-6 text-primary cursor-pointer"
                onClick={() => {
                  setLoadingComps(true);
                  setTimeout(() => {
                    fetchComps();
                  }, 500);
                }}
              />

              {loadingComps && (
                <div className="mx-4 text-foreground/50">Refreshing comps</div>
              )}
            </div>

            {comps && <AddressList comps={comps} />}
          </div>
        </div>
      )}
    </ProtectedPage>
  );
};

export default MyCompsPage;
