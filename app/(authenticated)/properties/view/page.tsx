"use client"

import React, { use, useEffect, useState } from 'react'
// import { createClient } from '../../../../utils/supabase/server'
import { createClient } from '@/utils/supabase/client'
import { useForm, SubmitHandler, Controller, FormProvider, set } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator'
import LoadingOverlay from '@/components/LoadingOverlay';


const ViewProperty = () => {
  const browserClient = createClient()
  const [profile, setProfile] = useState<any>(null);
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('property');
  const router = useRouter();
  const [propertyData, setPropertyData] = useState<any>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (propertyId) {
      getProperty(propertyId);
    }

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();
      setProfile(user);
    }

    getUser();
  }, [])

  const getProperty = async (propertyId: string) => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}property/${propertyId}`, {
        headers: {
          // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
        },
      });

      setPropertyData(response.data[0]);
      setLoading(false);

    } catch (error) {
      console.error('Error loading user properties:', error);
    }
  }

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <h1 className="text-3xl mb-6">{propertyId ? 'Edit' : 'Add'} property</h1>

          <Separator className="my-4" />
          <Label className="text-muted-foreground">Property Nickname</Label>
          <div>{propertyData.name}</div>
          <Separator className="my-4" />

          <Label className="text-muted-foreground">Primary Contact</Label>
          <div>{propertyData.primary_contact}</div>
          <div>{propertyData.primary_email}</div>
          <div>{propertyData.primary_phone}</div>
          <Separator className="my-4" />

          <Label className="text-muted-foreground">Secondary Contact</Label>
          <div>{propertyData.secondary_contact || 'None'}</div>
          <div>{propertyData.secondary_email}</div>
          <div>{propertyData.secondary_phone}</div>
          <Separator className="my-4" />

          <Label className="text-muted-foreground">Notification Preference</Label>
          <div>{propertyData.notification_preference || 'None'}</div>
          <Separator className="my-4" />

          <Label className="text-muted-foreground">Property Listings</Label>
          {propertyData.listings.map((listing: any) => (
            <div key={listing.id} className="w-full">
              <div>{listing.listed_on}: {listing.external_listing_id}</div>
            </div>))}
          <Separator className="my-4" />

          <Button onClick={() => router.push('/properties/add?property=' + propertyId)}>Edit Property</Button>

        </>
      )}
    </>
  )
}

export default ViewProperty;