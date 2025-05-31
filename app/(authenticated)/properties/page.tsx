"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/utils/supabase/client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PencilEdit02Icon } from "@/components/Icons"
import Listing from '@/components/Listing';
import { BarChart, House } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PropertyCard from '@/components/PropertyCard';
import AddressCard from './AddressCard';
import { useRouter } from 'next/navigation';


export default function Properties() {
  const router = useRouter();
  const browserClient = createClient()
  const [properties, setProperties] = useState<any[]>([])
  const [user, setUser] = useState<any>(null);

  const getProperties = async (user: any) => {
    try {
      if (!user?.id) {
        console.log("No user ID available");
        return;
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/feedback-genius/strproperties`, {
        // body: { profileId: user.id },
        userId: user.id,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
        }
      });

      if (response.data) {
        if (response.data.properties.length === 0) {
          router.push("/properties/assess-property/single");
        }
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.error('Error loading user properties:', error);
    }
  }

  useEffect(() => {

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();
      setUser(user);
      getProperties(user);
      return user;
    }

    getUser();
  }, [])

  return (
    <>
      <div className="min-h-[700px] py-6">

        <h1 className="text-3xl font-bold">My Properties</h1>

        <div className="space-y-6 w-full mt-6">

          {properties.map((property: any, index: number) => (
            <div key={index}>
              <AddressCard title={property.title} externalId={property.external_id} propertyId={property.id} property={property} />
            </div>
          ))}

        </div>
      </div>
    </>

  )
}
