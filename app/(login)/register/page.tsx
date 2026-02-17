'use client'

import { signup, signInWithGoogle } from "@/app/(login)/login/actions"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'


export default function CreateAccount() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect_to') || ''
  const emailParam = searchParams.get('email') || ''
  const propertyIdParam = searchParams.get('propertyId') || ''

  // Get the current origin (localhost or production) to use in confirmation email
  // Use state to ensure it's set after component mounts on client
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    // Capture origin after component mounts to avoid hydration issues
    setOrigin(window.location.origin)
  }, [])

  // If propertyId is provided, set redirect_to to the property comps page
  const finalRedirectTo = propertyIdParam
    ? `/properties/comps/${propertyIdParam}`
    : redirectTo

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

      {propertyIdParam && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-2xl">
          <p className="text-sm text-green-800 font-semibold mb-1">
            Your property analysis is ready! 🎉
          </p>
          <p className="text-sm text-green-800">
            Complete your registration below to view your complete Feedback Genius report.
          </p>
        </div>
      )}

      <div className="max-w-sm bg-background border-none px-0">
        <form className="space-y-6 pb-6">
          <div className="text-xl">
            Get personalized feedback on your short-term rental listing in minutes.
            No credit card, no hassle — just clear, actionable insights to help you improve.
          </div>
          <div>
            <div className="space-y-4">

              {/* Google Sign-In Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => signInWithGoogle(finalRedirectTo)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
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

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue={emailParam}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" required />
              </div>

              {/* Hidden fields to pass redirect destination and origin */}
              <input type="hidden" name="redirect_to" value={finalRedirectTo} />
              <input type="hidden" name="origin" value={origin} />

              <Button type="submit" className="w-full px-8" formAction={signup}>
                Create Account
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