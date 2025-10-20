"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";

export default function SiteAccess(props: any) {
  const { register, handleSubmit, setValue } = useForm();
  const [siteAccess, setSiteAccess] = useState(true);

  useEffect(() => {
    const siteCookie = getCookie("access_pwd");

    // console.log('env', process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD)
    if (!process.env.NEXT_PUBLIC_BASIC_SITE_ACCESS_ENABLED) {
      setSiteAccess(true);
    } else if (
      siteCookie &&
      siteCookie === process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD
    ) {
      setSiteAccess(true);
    } else {
      setSiteAccess(false);
    }
  }, []);

  const handleSendClick = async (data: any) => {
    let config = {
      body: {
        access_pwd: data.access_pwd,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const endpoint = "/api/site-access";
    try {
      const { data: response } = await axios.post(endpoint, config);
      if (response === "success") setSiteAccess(true);
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      {!siteAccess ? (
        <div className="py-12">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Not so fast...</CardTitle>
              <CardDescription>
                We are working on some cool stuff. To see it, you gotta have the
                password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleSendClick)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="access_pwd"
                      type="pwd"
                      required
                      {...register("access_pwd")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Button type="submit" className="w-[100px]">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
