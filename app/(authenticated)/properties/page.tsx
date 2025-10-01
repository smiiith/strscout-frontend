"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useUserSession } from "@/lib/context/UserSessionProvider";
import AddressCard from "./AddressCard";
import { useRouter } from "next/navigation";
import { getAuthHeaders } from "@/lib/utils/getAuthToken";

export default function Properties() {
  const router = useRouter();
  const { session, loading: sessionLoading, getAccessToken } = useUserSession();
  const [properties, setProperties] = useState<any[]>([]);

  const getProperties = async () => {
    try {
      console.log("getProperties called with session:", session);
      console.log("API_ENDPOINT:", process.env.NEXT_PUBLIC_API_ENDPOINT);

      if (!session?.id) {
        console.log("No user ID available");
        return;
      }

      console.log(
        "Making API request to:",
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/feedback-genius/strproperties`
      );

      const token = await getAccessToken();

      if (!token) {
        console.error("Failed to get access token");
        return;
      }

      const authHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/feedback-genius/strproperties`,
        {
          userId: session.id,
        },
        {
          headers: authHeaders,
        }
      );

      console.log("API response:", response.data);

      if (response.data) {
        if (response.data.properties.length === 0) {
          console.log("No properties found, redirecting...");
          router.push("/properties/assess-property/single");
        }
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.error("Error loading user properties:", error);
    }
  };

  useEffect(() => {
    if (session && session.id) {
      getProperties();
    }
  }, [session]);

  return (
    <>
      <div className="min-h-[700px] py-6">
        <h1 className="text-3xl font-bold">My Properties</h1>

        <div className="space-y-6 w-full mt-6">
          {properties.map((property: any, index: number) => (
            <div key={index}>
              <AddressCard
                title={property.title}
                externalId={property.external_id}
                propertyId={property.id}
                property={property}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
