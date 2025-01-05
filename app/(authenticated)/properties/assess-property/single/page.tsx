"use client"

import React, { use, useEffect, useState } from 'react'
// import { createClient } from '../../../../utils/supabase/server'
import { createClient } from '@/utils/supabase/client'
import { useForm, SubmitHandler, Controller, FormProvider, set } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LoadingOverlay from '@/components/LoadingOverlay'


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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    let config = {
      address: data.address,
      propertyId: data.propertyId,
      userId: profile.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // scrape the property
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/assess/single`, config);

      // now make a call to LLM backend to get ratings
      fetchRatings(response.data.property);
      setIsLoading(true);
      location.href = "/properties"; // using location.href to make sure the page is reloaded
    } catch (error) {
      console.error('Error assessing property:', error);
      setIsLoading(true);
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
      <h1 className="text-3xl mb-6">Assess a Property</h1>

      {isLoading && <LoadingOverlay message="Assessing property. Should just be a few seconds." />}

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">

          <Label htmlFor="propertyId" className="mt-5">Airbnb ID</Label>
          <Input
            id="propertyId"
            className="mt-2 mb-5"
            defaultValue="1324965150846314034"
            {...register('propertyId', {
              required: 'Enter the Airbnb ID for this property',
            })}
          />
          {errors.propertyId && <div className="text-destructive mb-5 mt-2">{errors.propertyId.message}</div>}

          <Label htmlFor="address" className="mt-5">Address</Label>
          <Input
            id="address"
            className="mt-2 mb-5"
            defaultValue="6104 Montoro Court, San Jose CA"
            {...register('address', {
              required: 'Enter the address for this property',
            })}
          />
          {errors.address && <div className="text-destructive mb-5 mt-2">{errors.address.message}</div>}

          <div className="flex justify-end">
            <Button className="mx-2" variant="outline" onClick={() => router.push('/properties')}>Cancel</Button>
            <Button type="submit">Run</Button>
          </div>
        </form>
      </FormProvider>

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