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
  airbnbId: string
}

const AddProperty = () => {
  const browserClient = createClient()
  const [profile, setProfile] = useState<any>(null);
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('property');
  const router = useRouter();
  const [comps, setComps] = useState<any>([]);

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
      // },
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (!propertyId) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/comps`, config);
        console.log("response: ", response);
        setComps(response.data.comparables);
        // router.push('/properties');
      } catch (error) {
        console.error('Error assessing property:', error);
      }
    }

  }

  return (
    <>
      <h1 className="text-3xl mb-6">Assess Properties</h1>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">

          {/* <Label htmlFor="airbnbId" className="mt-5">Airbnb ID</Label>
          <Input
            id="airbnbId"
            className="mt-2 mb-5"
            {...register('airbnbId', {
              required: 'Enter the Airbnb ID for this property',
            })}
          />
          {errors.airbnbId && <div className="text-destructive mb-5 mt-2">{errors.airbnbId.message}</div>} */}

          <Label htmlFor="address" className="mt-5">Address</Label>
          <Input
            id="address"
            className="mt-2 mb-5"
            defaultValue="27850 Tamrack way, murrieta, ca"
            {...register('address', {
              required: 'Enter the address for this property',
            })}
          />
          {errors.airbnbId && <div className="text-destructive mb-5 mt-2">{errors.airbnbId.message}</div>}

          <div className="flex justify-end">
            <Button className="mx-2" variant="outline" onClick={() => router.push('/properties')}>Cancel</Button>
            <Button type="submit" >Save</Button>
          </div>
        </form>
      </FormProvider>

      {comps && comps.length > 0 && (
        <Table>
          <TableCaption>Your recent scans</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comps.map((comp: any, index: number) => (
              <TableRow key={comp.id} className="hover:muted-foreground">
                <TableCell className="font-medium">
                  {comp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </>
  )

}

export default AddProperty;