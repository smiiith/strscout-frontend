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

export default function Properties() {
  const browserClient = createClient()
  const [properties, setProperties] = useState<any[]>([])

  const getProperties = async (user: any) => {
    try {
      if (!user?.id) {
        console.log("No user ID available");
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}properties`, {
        // body: { profileId: user.id },
        profileId: user.id,
        headers: {
          // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
        }
      });

      console.log("response", response);

      if (response.data) {
        setProperties(response.data);
      }
    } catch (error) {
      console.error('Error loading user properties:', error);
    }
  }

  useEffect(() => {

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();

      getProperties(user);
      return user;
    }

    getUser();
  }, [])

  return (
    <>
      <h1 className="text-3xl mb-6"><House className="h-8 w-8 inline-block mb-2 mr-2" /> My Properties</h1>

      <div className="flex flex-wrap gap-6 w-full">

        {properties.map((property: any) => (
          <Card className="min-w-[500px] max-w-[500px]">
            <CardHeader className="p-4 pb-0">
              <CardTitle>{property.name}</CardTitle>
              <CardDescription>
                Listed on: VRBO and AirBnB
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
        ))}


        {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property: any) => (
            <TableRow key={property.id}>
              <TableCell>{property.name}</TableCell>
              <TableCell>{property.description}</TableCell>
              <TableCell>{property.created_at}</TableCell>
              <TableCell>
                <ListingsDialog propertyId={property.id} propertyName={property.name} className="w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      </div>
    </>

  )
}


const ListingsDialog = (props: any) => {
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    setPropertyId(props.propertyId);
    console.log("props", props.propertyId);
  })

  const handleOpenChange = (open: boolean) => {
    console.log("open", propertyId);

    getListings(propertyId);
  }

  const getListings = async (propertyId: any) => {
    try {
      if (!propertyId) {
        console.log("No property ID available");
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}listings`, {
        // body: { profileId: user.id },
        propertyId: propertyId,
        headers: {
          // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
        }
      });

      if (response.data) {
        setListings(response.data);
      }
    } catch (error) {
      console.error('Error loading user properties:', error);
    }
  }


  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div title="View Listings" className="cursor-pointer">
          <PencilEdit02Icon className="h-6 w-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[90%] bg-secondary">
        <DialogHeader>
          <DialogTitle className="">Listings for    {props.propertyName}</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">

          {listings.map((listing: any) => (
            <div key={listing.id} className="w-full">
              <Listing listing={listing} />
            </div>))}

        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
