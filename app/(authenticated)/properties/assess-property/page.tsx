"use client"

import React, { use, useEffect, useState } from 'react'
// import { createClient } from '../../../../utils/supabase/server'
import { createClient } from '@/utils/supabase/client'
import { useForm, SubmitHandler, Controller, FormProvider, set } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import styles from './page.module.css';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert02Icon, CheckmarkCircle02Icon } from '@/components/Icons'
// import { formatDate } from 'date-fns'
import { formatDate, formatDateNoTime } from "@/lib/utils";
import mockDescriptionRatings from './mock'


// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const formSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
});
type Inputs = {
  address: string
  propertyId: string
}

const GetComparables = () => {
  const browserClient = createClient()
  const [profile, setProfile] = useState<any>(null);
  const searchParams = useSearchParams()
  // const propertyId = searchParams.get('property');
  const router = useRouter();
  const [comps, setComps] = useState<any>([]);
  const [ratings, setRatings] = useState<any>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();
      setProfile(user);
    }

    getUser();
  }, [])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   nickname: "",
    //   address: "",
    //   // airbnbId: "",
    //   // primaryEmail: "",
    //   // secondaryEmail: "",
    //   // primaryPhone: "",
    //   // secondaryPhone: "",
    //   // notificationPreference: undefined,
    // },
  })

  const onSubmit = async (data: any) => {

    let config = {
      // data: {
      address: data.address,
      propertyId: data.propertyId,
      // },
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/comps`, config);
      // console.log("response: ", response.data.comparables);
      // setComps(response.data.comparables);

      // get the comparables from the DB now
      const results = await fetchComps(data.propertyId);
      const comps = results?.data?.comparables;
      console.log("comps", comps);
      // fetchComps("41356680");

      // now make a call to LLM backend to get ratings
      fetchRatings(comps);

      // router.push('/properties');
    } catch (error) {
      console.error('Error assessing property:', error);
    }
  }

  const fetchComps = async (externalId: any) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comps/${externalId}`;

    try {
      const response = await axios.get(endpoint);
      setComps(response.data.comparables);
      return response;
    } catch (error) {
      console.error('Error fetching comparables:', error);
    }
  }

  const fetchRatings = async (properties: any) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/properties/`;

    let config = {
      properties,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const ratings: any = await axios.post(endpoint, config);
      setRatings(ratings.results);

      // mock
      // console.log("mock ratings", mockDescriptionRatings());
      // setRatings(mockDescriptionRatings().results)

    } catch (error) {
      console.error('Error fetching descriptions:', error);
    }

  }

  return (
    <>
      <h1 className="text-3xl mb-6">Assess Properties</h1>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">

          <Label htmlFor="propertyId" className="mt-5">Airbnb ID</Label>
          <Input
            id="propertyId"
            className="mt-2 mb-5"
            defaultValue="41356680"
            {...register('propertyId', {
              required: 'Enter the Airbnb ID for this property',
            })}
          />
          {errors.propertyId && <div className="text-destructive mb-5 mt-2">{errors.propertyId.message}</div>}

          <Label htmlFor="address" className="mt-5">Address</Label>
          <Input
            id="address"
            className="mt-2 mb-5"
            defaultValue="3516 Rowena Ct, Santa Clara, CA 95054"
            {...register('address', {
              required: 'Enter the address for this property',
            })}
          />
          {errors.address && <div className="text-destructive mb-5 mt-2">{errors.address.message}</div>}

          <div className="flex justify-end">
            <Button className="mx-2" variant="outline" onClick={() => router.push('/properties')}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </FormProvider>

      {/* "property_name": "Cozy Mountain Cabin",
            "description_rating": "satisfactory",
            "description_rating_number": 65,
            "descsription_feedback": "The listing provides a decent overview of the property and its amenities, but lacks detail about the location and nearby attractions. It also could use more engaging language to draw potential guests in.",
            "descsription_suggestions": "Consider including specific details about the nearby attractions, activities, and the unique aspects of the cabin. Using more descriptive and inviting language could enhance the overall appeal.",
            "id": "listing123"
  */}
      {ratings && ratings.length > 0 && (
        <Table>
          <TableCaption>Your recent scans</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Suggestions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratings.map((rating: any, index: number) => (
              <TableRow key={`comp-${index}`} className="hover:muted-foreground">
                <TableCell className="font-medium">
                  {rating.property_name}
                </TableCell>
                <TableCell>
                  {rating.description_rating}
                </TableCell>
                <TableCell>
                  {rating.description_rating_number}
                </TableCell>
                <TableCell>
                  {rating.descsription_feedback}
                </TableCell>
                <TableCell>
                  {/* {rating.descsription_suggestions} */}
                  <div className="flex flex-col">
                    <div className="text-sm">
                      {rating.descsription_suggestions}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </>
  )

}

export default GetComparables;