"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signup } from "@/app/(login)/login/actions"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useForm } from "react-hook-form";
import posthog from "posthog-js";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function ContactUsPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);


    const onSubmit = (data: any) => {

        posthog.capture("contact_us_form_submitted", {
            name: data.name,
            email: data.email,
            message: data.message
        });

        reset();
        setAlertOpen(true);
        setIsSubmitted(true);

    }

    return (
        <>
            <div>
                <Image
                    src="/STR-Feedback-Genius-Logo-single-line.png"
                    alt="STR Feedback Genius"
                    width="754"
                    height="72"
                    className="w-[754] h-auto my-6"
                />

                <Card className="max-w-sm bg-background border-none">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Contact us</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-8 mb-8">

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Your name</Label>
                                    <Input
                                        id="name"
                                        className="w-full md:w-[500px]"
                                        required
                                        {...register("name")}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="w-full md:w-[500px]"
                                        required
                                        {...register("email")}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message <span className="text-secondary-foreground/50">(500 characters max)</span></Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Enter your message..."
                                        rows={5}
                                        maxLength={500}
                                        required
                                        {...register("message")}
                                        className="w-full md:w-[500px]"
                                    />
                                </div>

                                <Button type="submit" className="w-fit">
                                    Submit
                                </Button>

                                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Thanks for reaching out</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                We will review your message and get back to you if appropriate.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Leave another message</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => router.push("/")}
                                            >Home</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </>
    )
}

