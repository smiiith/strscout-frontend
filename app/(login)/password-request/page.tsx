import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/app/(login)/login/actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'


export default function PasswordReset() {

  return (
    <>
      <Image
        src="/STR-Feedback-Genius-Logo-single-line.png"
        alt="STR Feedback Genius"
        width="754"
        height="72"
        className="w-[754] h-auto my-6"
      />

      <h1 className="text-2xl mb-6">Password Reset Request</h1>

      <div className="text-xl mb-6">
        Enter your email below to request a password reset. You will receive an email with a link to reset your password.
      </div>

      <div className="">
        <form id="rester_pwd_form" className="pb-6">
          <div>
            <div className="grid gap-8">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required className="w-1/4" />
              </div>
              <Button type="submit" id="rester_pwd_btn" className="w-fit" formAction={resetPassword}>
                Send
              </Button>
            </div>
            <div className="mt-4 text-sm">
              <Link href="/login" className="underline" prefetch={false}>
                Log In
              </Link>
            </div>
          </div>
        </form>

        <script dangerouslySetInnerHTML={{
          __html: `
          document.getElementById('rester_pwd_form').addEventListener('submit', function(event) {
            const button = document.getElementById('rester_pwd_btn');
            button.disabled = true;
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

      </div>
    </>

  )
}
