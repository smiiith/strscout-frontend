import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/app/(login)/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function PasswordReset() {

  return (
    <Card className="mx-auto max-w-sm">
      <form id="rester_pwd_form">
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
            <Button type="submit" id="rester_pwd_btn" className="w-full" formAction={resetPassword} variant={"outline"}>
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

      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('rester_pwd_form').addEventListener('submit', function(event) {
            const button = document.getElementById('rester_pwd_btn');
            if (button instanceof HTMLButtonElement) {
              if (button.getAttribute('data-submitting') === 'true') {
                event.preventDefault();
              } else {
                button.setAttribute('data-submitting', 'true');
                button.disabled = true;
              }
            }
          });
        `
      }} />

    </Card>
  )
}
