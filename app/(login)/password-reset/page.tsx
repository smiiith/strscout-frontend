import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { login, signup } from '@/app/(login)/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function PasswordReset() {
  // input: new password
  // redirect to account page

  return (
    <Card className="mx-auto max-w-sm">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below to reset your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" formAction={login} variant={"outline"}>
              Reset Password
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline" prefetch={false}>
              Create one
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}