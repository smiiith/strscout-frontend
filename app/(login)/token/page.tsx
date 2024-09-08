import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { verifyOtp } from '@/app/(login)/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { verify } from 'crypto'

export default function PasswordReset() {
  // email address 
  // redirect to page with form to enter new password

  return (
    <Card className="mx-auto max-w-sm">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Enter verification code</CardTitle>
          <CardDescription>Enter the verification code we sent to your email below to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input id="code" name="code" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="text" name="email" id="email" />
            </div>
            <Button type="submit" className="w-full" formAction={verifyOtp} variant={"outline"}>
              Send
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline" prefetch={false}>
              Log In
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}