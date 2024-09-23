import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signup } from "@/app/(login)/login/actions"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function CreateAccount() {
  return (
    <Card className="mx-auto max-w-sm">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" required />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/password-request" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" formAction={signup} variant={"outline"}>
              Create
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline" prefetch={false}>
              Log in
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}