import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  console.log("next redirect", redirectTo.href);

  if (token_hash && type) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    console.log("data part", data);

    if (error || !data || !data.session) {
      console.log("error", error);
      return NextResponse.redirect(redirectTo)
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token: data.session?.access_token,
      refresh_token: data.session.refresh_token
    })

    if (sessionError) {
      console.log("session error", sessionError);
      return NextResponse.redirect(redirectTo)
    }

    console.log("redirecting to", redirectTo.href);
    return NextResponse.redirect(redirectTo.href)
  }


  // return the user to an error page with some instructions
  redirectTo.pathname = '/auth/auth-code-error'
  return NextResponse.redirect(redirectTo)
}