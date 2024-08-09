"use client"

import React, { use, useEffect, useState } from 'react'
// import { createClient } from '../../../../utils/supabase/server'
import { createClient } from '@/utils/supabase/client'
import { useForm, SubmitHandler, Controller, FormProvider, set } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import axios from 'axios';


// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

const formSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
  // vrboId: z.string().min(1, "VRBO ID is required"),
  // airbnbId: z.string().min(1, "Airbnb ID is required"),
  // primaryEmail: z.string().email("Invalid email address").min(1, "Primary email is required"),
  // secondaryEmail: z.string().email("Invalid email address").optional(),
  // primaryEmail: z.string().email("Invalid email address man").optional(),
  // secondaryEmail: z.string().optional(),
  // primaryPhone: z.string().optional(),
  // secondaryPhone: z.string().optional(),
  // notificationPreference: z.enum(["email", "phone", "both"], {
  //   required_error: "Please select a notification preference",
  // }),
});
type Inputs = {
  // id: string
  nickname: string
  vrboId: string
  airbnbId: string
  primaryContact: string
  secondaryContact: string
  primaryEmail: string
  secondaryEmail: string
  primaryPhone: string
  secondaryPhone: string
  notificationPreference: string
}

const AddProperty = () => {
  const browserClient = createClient()
  const [profile, setProfile] = useState<any>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();
      setProfile(user);
    }

    getUser();

    console.log("errors", errors);

  }, [])

  // useEffect(() => {
  //   console.log(watch("nickname"));
  // }, [watch("nickname")]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      // vrboId: "",
      // airbnbId: "",
      // primaryEmail: "",
      // secondaryEmail: "",
      // primaryPhone: "",
      // secondaryPhone: "",
      // notificationPreference: undefined,
    },
  })

  const onSubmit = async (data: any) => {
    console.log(data);

    let config = {
      data: {
        profileId: profile.id,
        nickname: data.nickname,
        vrboId: data.vrboId,
        airbnbId: data.airbnbId,
        primaryContact: data.primaryContact,
        secondaryContact: data.secondaryContact,
        primaryEmail: data.primaryEmail,
        secondaryEmail: data.secondaryEmail,
        primaryPhone: data.primaryPhone,
        secondaryPhone: data.secondaryPhone,
        notificationPreference: data.notificationPreference,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // xhr call to save data
    // post this data to /api/vi/properties
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}property`, config);
      console.log('Property added successfully:', response.data);
    } catch (error) {
      console.error('Error adding property:', error);
    }

  }

  return (
    <>
      <h1 className="text-3xl mb-6">Add a property</h1>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">

          <Label htmlFor="nickname">Property Nickname</Label>
          <Input
            id="nickname"
            className="mt-2 mb-5"
            {...register('nickname', { required: 'Hey, you forgot to enter your name!' })}
          />
          {errors.nickname && <div className="text-destructive mb-5 mt-2">{errors.nickname.message}</div>}

          <Label htmlFor="vrboId" className="mt-5">VRBO ID</Label>
          <Input
            id="vrboId"
            className="mt-2 mb-5"
            {...register('vrboId', { required: 'Enter the VRBO ID for this property' })}
          />
          {errors.vrboId && <div className="text-destructive mb-5 mt-2">{errors.vrboId.message}</div>}

          <Label htmlFor="airbnbId" className="mt-5">Airbnb ID</Label>
          <Input
            id="airbnbId"
            className="mt-2 mb-5"
            {...register('airbnbId', {
              required: 'Enter the Airbnb ID for this property',
            })}
          />
          {errors.airbnbId && <div className="text-destructive mb-5 mt-2">{errors.airbnbId.message}</div>}

          <Label htmlFor="primaryContact" className="mt-5">Primary Contact Name</Label>
          <Input
            id="primaryContact"
            className="mt-2 mb-5"
            {...register('primaryContact', {
              required: 'Enter the primary contact name for this property',
            })}
          />
          {errors.airbnbId && <div className="text-destructive mb-5 mt-2">{errors.airbnbId.message}</div>}

          <Label htmlFor="secondaryContact" className="mt-5">Secondary Contact Name</Label>
          <Input
            id="secondaryContact"
            className="mt-2 mb-5"
            {...register('secondaryContact',
              // {
              //   required: 'Enter the secondary contact name for this property',
              // }
            )}
          />
          {errors.airbnbId && <div className="text-destructive mb-5 mt-2">{errors.airbnbId.message}</div>}

          <Label htmlFor="primaryEmail" className="mt-5">Primary Email</Label>
          <Input
            id="primaryEmail"
            className="mt-2 mb-5"
            {...register('primaryEmail', {
              required: 'Dont keep us hanging, we need your email!',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Oops! Please enter a valid email address.',
              }
            })}
          />
          {errors.primaryEmail && <div className="text-destructive mb-5 mt-2">{errors.primaryEmail.message}</div>}

          <Label htmlFor="secondaryEmail" className="mt-5">Secondary Email</Label>
          <Input
            id="secondaryEmail"
            className="mt-2 mb-5"
            {...register('secondaryEmail', {
              // required: "Enter a secondary email for this property",
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Oops! Please enter a valid email address.',
              },
            })}
          />
          {errors.secondaryEmail && <div className="text-destructive mb-5 mt-2">{errors.secondaryEmail.message}</div>}

          <Label htmlFor="primaryPhone" className="mt-5">Primary Phone</Label>
          <Input
            id="primaryPhone"
            className="mt-2 mb-5"
            {...register('primaryPhone')}
          />

          <Label htmlFor="secondaryPhone" className="mt-5">Secondary Phone</Label>
          <Input
            id="secondaryPhone"
            className="mt-2 mb-5"
            {...register('secondaryPhone')}
          />

          <Label htmlFor="notificationPreference" className="mt-5">Notification Preference (default is email)</Label>
          <Controller
            name="notificationPreference"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                {...register("notificationPreference")}
                {...field}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select notification preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="bg-slate-600">Select One</SelectLabel>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">Text Message</SelectItem>
                    <SelectItem value="both">Email and Text Message</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </FormProvider >
    </>
  )

}

export default AddProperty;