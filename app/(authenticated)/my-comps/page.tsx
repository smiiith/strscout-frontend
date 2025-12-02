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
import { useUserSession } from "@/lib/context/UserSessionProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { add } from "date-fns";
import AddressList from "@/components/address-list";
import { RefreshIcon } from "@/components/Icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import { getAuthHeaders } from "@/lib/utils/getAuthToken";

const MyCompsPage = () => {
  return <MyCompsContent />;
};

const MyCompsContent = () => {
  const [loading, setLoading] = useState(true);
  const [loadingComps, setLoadingComps] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    formattedAddress: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const { session, loading: sessionLoading, getAccessToken } = useUserSession();

  const [comps, setComps] = useState<any[]>([]);
  const fetchingRef = useRef(false);

  const fetchComps = async () => {
    // Prevent duplicate calls
    if (fetchingRef.current) {
      return;
    }

    if (session && session.id) {
      fetchingRef.current = true;
      try {
        const token = await getAccessToken();

        if (!token) {
          console.error("Failed to get access token");
          setLoading(false);
          fetchingRef.current = false;
          return;
        }

        const authHeaders = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };

        const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/comp-basis/${session.id}`;

        let response;
        try {
          response = await axios.get(endpoint, {
            headers: authHeaders,
          });
        } catch (error) {
          // If 401 error (expired token), refresh token and retry once
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Force refresh to get a fresh token (not cached)
            const freshToken = await getAccessToken(true);

            if (freshToken) {
              const retryHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${freshToken}`,
              };

              // Retry the request with fresh token
              response = await axios.get(endpoint, {
                headers: retryHeaders,
              });
            } else {
              throw error; // Re-throw if we couldn't get a fresh token
            }
          } else {
            throw error; // Re-throw non-401 errors
          }
        }

        setLoading(false);
        setLoadingComps(false);
        setComps(response.data || []);
      } catch (error) {
        console.error("Error fetching comps:", error);
        setLoading(false);
      } finally {
        fetchingRef.current = false;
      }
    }
  };

  // state management
  useEffect(() => {
    // Wait for session to load before fetching comps
    if (!sessionLoading && session) {
      fetchComps();
    } else if (!sessionLoading && !session) {
      // Session loaded but user not authenticated
      setLoading(false);
    }
  }, [session, sessionLoading]);

  return (
    <div>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <div className="min-h-[700px] py-6">
          <h1 className="text-3xl font-bold mt-6">Market Spy Reports</h1>

          <div className="space-y-6 w-full mt-6">
            <p className="w-2/3">
              View your Market Spy reports here. If one is in progress, use the
              refresh icon below to reload the list. You can also use the search
              input to find a specific listing.
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
    </div>
  );
};

export default MyCompsPage;
