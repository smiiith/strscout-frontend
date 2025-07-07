import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signup } from "@/app/(login)/login/actions"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import Image from 'next/image'


export default function CreateAccount() {
  return (
    <>
      <Image
        src="/STR-Feedback-Genius-Logo-single-line.png"
        alt="STR Feedback Genius"
        width="754"
        height="72"
        className="w-[754] h-auto my-6"
      />

      <h1 className="text-4xl mb-6">Unlock Expert Insights — Create Your Free Account</h1>

      <div className="max-w-xl bg-background border-none px-0">
        <form className="space-y-6 pb-6">
          <div className="text-xl">
            Get personalized feedback on your short-term rental listing in minutes.
            No credit card, no hassle — just clear, actionable insights to help you improve.
          </div>
          <div>
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
                </div>
                <PasswordInput id="password" name="password" required />
              </div>
              <Button type="submit" className="w-fit" formAction={signup}>
                Create
              </Button>
            </div>
            <div className="mt-4 text-sm">
              Your password must contain at least one uppercase letter, one lowercase letter, one number and one special character. The minimum length for your password is 10 characters.
            </div>
            <div className="mt-4 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline" prefetch={false}>
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}