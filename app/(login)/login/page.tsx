import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import HeaderNav from "@/components/header";

export default function LoginPage() {
  return (
    // <div className="flex flex-col">
    //   <div className="flex-grow">
    //     <div className="container mx-auto p-0 max-w-7xl bg-background">

    //       <HeaderNav />

    //       <div className="px-6">
    <div className="">
      <Card className="max-w-sm bg-background border-none">
        <form>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                {/* <input id="email" name="email" type="email" required /> */}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/password-request"
                    className="ml-auto inline-block text-sm underline"
                    prefetch={false}
                  >
                    Forgot your password?
                  </Link>
                </div>
                {/* <input id="password" name="password" type="password" required /> */}
                <PasswordInput id="password" name="password" required />
              </div>
              <Button type="submit" className="w-fit px-8" formAction={login}>
                Log in
              </Button>
            </div>
            <div className="mt-4 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline" prefetch={false}>
                Create one
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
