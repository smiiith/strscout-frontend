import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updatePassword } from '@/app/(login)/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

// export default function PasswordReset() {

export default function PasswordReset({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

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
              <Input id="code" name="code" type="hidden" value={searchParams?.code} />
            </div>
            <Button disabled={false} type="submit" className="w-full" formAction={updatePassword} variant={"outline"}>
              Reset Password
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character. The minimum length for your password is 10 characters.
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