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
import Image from 'next/image';


// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const ERROR_FINDING_ID = "Could not find an Airbnb ID in the URL. Review the instructions below and try again.";

const formSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
});
type Inputs = {
  address: string
  propertyId: string
}

const AssessProperty = () => {
  const browserClient = createClient()
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  const [ratings, setRatings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedUsageLimit, setReachedUsageLimit] = useState(false);
  const [reachedPropertyLimit, setReachedPropertyLimit] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();
      setProfile(user);

      // fetchUserProperties(user);
    }

    getUser();
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: any) => {

    const verification = await verifyRequest(data.propertyId, profile.id);
    const isVerified = verification.data.verified || false;

    if (!isVerified) {
      if (verification.data.reached_property_limit) {
        setReachedPropertyLimit(true);
        setIsLoading(false);
        return;
      }

      if (verification.data.reached_usage_limit) {
        setReachedUsageLimit(true);
        setIsLoading(false);
        return;
      }
      return;
    }

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
      // console.log("response.data", response.data);

      const ratingResponse = await rateProperty(response.data.property);
      setIsLoading(true);

      // if (ratingResponse.data.usage && ratingResponse.data.usage == "limit") {
      //   setReachedUsageLimit(true);
      //   setIsLoading(false);
      //   return;
      // }

      router.push(`/properties/comps/${response.data?.property[0]?.id}`);
    } catch (error) {
      console.error('Error assessing property:', error);
      setIsLoading(true);
    }
  }

  const fetchUserProperties = async (user: any) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/user_properties/`;

    let config = {
      user_id: user.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const userProperties: any = await axios.post(endpoint, config);
      // setReachedPropertyLimit()

    } catch (error) {
      console.error('Error fetching user properties:', error);
    }

  }

  const verifyRequest = async (externalId: any, userId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/verify`;

    let config = {
      external_id: externalId,
      user_id: userId,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const verification: any = await axios.post(endpoint, config);
      return verification;

    } catch (error) {
      console.error('Error fetching descriptions:', error);
    }

  }

  const rateProperty = async (property: any) => {

    const endpoint = `${process.env.NEXT_PUBLIC_API_LLM_ENDPOINT}/properties/`;

    let config = {
      properties: property,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const ratings: any = await axios.post(endpoint, config);
      setRatings(ratings.results);
      return ratings;

    } catch (error) {
      console.error('Error fetching descriptions:', error);
    }

  }

  function extractAirbnbId(url: string): string | null {
    const roomsRegex = /\/rooms\/([^\/?]+)/;
    const editorRegex = /\/editor\/([^\/]+)/;

    const roomsMatch = url.match(roomsRegex);
    if (roomsMatch && roomsMatch[1]) {
      return roomsMatch[1];
    }

    const editorMatch = url.match(editorRegex);
    if (editorMatch && editorMatch[1]) {
      return editorMatch[1];
    }

    return null;
  }

  const ratePropertyByUrl = async (url: string) => {
    if (!url) {
      setError("address", {
        type: "custom",
        message: "Listing URL is required",
      });
    }

    const airbnbId = extractAirbnbId(url);

    if (!airbnbId) {
      return null;
    }

    await onSubmit({
      address: "",
      propertyId: airbnbId,

    })
    await rateProperty([airbnbId]);
  }

  // const INPUT_CSS = "mt-2 mb-5 w-2/3 lg:w-1/2 bg-pink-500 md:bg-green-500 lg:bg-blue-500";
  const INPUT_CSS = "mt-2 mb-5 w-2/3 lg:w-1/2";

  return (
    <div className="pb-6">
      <Image
        src="/STR-Feedback-Genius-Logo-single-line.png"
        alt="STR Feedback Genius"
        width="754"
        height="72"
        className="w-[754] h-auto my-6"
      />

      <h1 className="text-4xl mb-6">Getting Your Free STR Listing Feedback is Easy</h1>

      {reachedUsageLimit && (
        <div>
          <p className="text-destructive bg-destructive-foreground mb-6 p-6 border border-border rounded-lg">You have reached your usage limit for this property. Free accounts are limited to 3 assessments per property per calendar month. Feel free to <a href="/contact-us">contact us</a> if you need to run more assessments before the end of the month.</p>
        </div>
      )}

      {reachedPropertyLimit && (
        <div>
          <p className="text-destructive bg-destructive-foreground mb-6 p-6 border border-border rounded-lg">You have reached your limit of 6 properties for free accounts. Feel free to <a href="/contact-us">contact us</a> if you need to add more properties.</p>
        </div>
      )}

      {isLoading && <LoadingOverlay message="Analyzing now and preparing your feedback. This takes about a minute." />}

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} name="fullUrl">

          <Label htmlFor="address" className="mt-5">Copy and paste the listing URL address from your browser and paste it here</Label>
          <Input
            id="address"
            className={`${INPUT_CSS}`}
            {...register('address', {
              // required: 'Enter the address for this property',
            })}
          />
          {errors.address && <div className="text-destructive mb-5 mt-2">{errors.address.message}</div>}

          <div className={`${INPUT_CSS} flex justify-end`}>
            <Button className="mx-2" variant="outline" onClick={() => router.push('/properties')}>Cancel</Button>
            <Button
              onClick={() => {
                ratePropertyByUrl(watch('address'));
              }}
              type="button"
            >Run</Button>
          </div>

          <div className="directions mt-8 mb-12">
            <p className="font-bold">How to Copy and Paste Your Airbnb Listing URL</p>
            <ol className="ml-8 list-decimal">
              <li>Go to Your Airbnb Listing</li>
              <li>Open Airbnb.com and navigate to your listing.</li>
              <li>Copy the URL
                <ul className="list-disc ml-8">
                  <li>Click on the address bar at the top of your browser.</li>
                  <li>Right-click and select Copy, or press Ctrl + C (Windows) / Cmd + C (Mac).</li>
                </ul>

              </li>
              <li>Paste It Here</li>
              <li>Click inside the field above.</li>
              <li>Right-click and select Paste, or press Ctrl + V (Windows) / Cmd + V (Mac).</li>
            </ol>
          </div>
        </form>
      </FormProvider>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} name="idOnly">
          <Label htmlFor="propertyId" className="mt-5">OR - if you know your <span className="font-bold">Airbnb ID</span> number, you can enter it here</Label>
          <Input
            id="propertyId"
            className="mt-2 mb-5 w-64"
            {...register('propertyId', {
              required: 'Enter the Airbnb ID for this property',
            })}
          />
          {errors.propertyId && <div className="text-destructive mb-5 mt-2">{errors.propertyId.message}</div>}

          <div className="flex justify-end w-64">
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

    </div>
  )

}

export default AssessProperty;