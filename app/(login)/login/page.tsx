'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to') || ''
  return (
    <div className="">
      <Card className="max-w-sm bg-background border-none">
        <form>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            {/* new login */}
            <div className="w-full max-w-md">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/password-request"
                      className="text-sm text-gray-900 underline hover:text-gray-700"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative">
                    <PasswordInput id="password" name="password" required />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    ></button>
                  </div>
                </div>

                {/* Hidden field to pass redirect destination */}
                <input type="hidden" name="redirect_to" value={redirectTo} />

                <Button
                  type="submit"
                  className="w-full px-8"
                  formAction={login}
                >
                  Log in
                </Button>

                {/* Divider with OR */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                {/* Prominent Create Account Section */}
                <div className="text-center space-y-3 pt-2">
                  <p className="text-sm text-gray-600">
                    New to STR Sage? Get started free
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-[#1e6bb8] text-[#1e6bb8] hover:bg-[#1e6bb8] hover:text-white font-semibold bg-transparent"
                    asChild
                  >
                    <Link href={redirectTo ? `/register?redirect_to=${encodeURIComponent(redirectTo)}` : "/register"}>Create Free Account</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* original */}
            {/* <div className="grid gap-8">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
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
                <PasswordInput id="password" name="password" required />
              </div>
              <Button type="submit" className="w-fit px-8" formAction={login}>
                Log in
              </Button>
            </div> */}
            {/* <div className="mt-4 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline" prefetch={false}>
                Create one
              </Link>
            </div> */}
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
