import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/app/(login)/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function PasswordReset() {
  // email address 
  // redirect to page with form to enter new password

  return (
    <Card className="mx-auto max-w-sm">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Password Reset Request</CardTitle>
          <CardDescription>Enter your email below to request a password reset. You will receive an email with a link to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <Button type="submit" className="w-full" formAction={resetPassword} variant={"outline"}>
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