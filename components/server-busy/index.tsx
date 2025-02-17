"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';


const ServerBusyDialog = (props: any) => {
    const router = useRouter();
    const triggerStyles = props.triggerStyles || "";
    const buttonText = props.buttonText || 'Show Server Status';

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`${triggerStyles}`}>{buttonText}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                            <AlertCircle className="h-6 w-6" />
                            Our Servers Are Busy — We'll Take Care of It!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-center text-lg">
                            We're experiencing higher-than-usual demand, and unfortunately, we couldn't process your payment at this time. But don't worry — we've got your request!
                        </p>

                        <p className="text-center text-lg">
                            Our team will review your order and contact you as soon as processing is available.
                            You don't need to take any further action right now.
                        </p>

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-center">What Happens Next?</h2>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-lg">•</span>
                                    <span>We'll notify you by email when your payment can be processed.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-lg">•</span>
                                    <span>You won't be charged until we confirm your order.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-lg">•</span>
                                    <span>If you have any questions, feel free to contact us.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center space-y-1">
                            <p className="font-bold text-lg">Thank you for your patience,</p>
                            <p className="font-bold text-lg">we appreciate your business!</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

                            <DialogClose asChild>
                                <Button variant="secondary" className="px-8">
                                    Close
                                </Button>
                            </DialogClose>

                            <Button className="px-8" onClick={() => router.push("/contact-us")}>
                                Contact Us
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default ServerBusyDialog;