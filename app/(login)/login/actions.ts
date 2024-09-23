'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export async function login(formData: FormData) {

  // console.log("formData", formData);

  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: user, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login-issue')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  const rawWhitelist = process.env.NEXT_PUBLIC_REGISTRATION_WHITELIST || ''
  const registrationWhitelist = rawWhitelist.split(',').map((item: string) => item.trim())

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!registrationWhitelist.includes(data.email)) {
    console.log("Not taking new registrations at this time");
    redirect('/no-registration')
  }

  // const { error } = await supabase.auth.signUp(data)

  const { data: user, error } = await supabase.auth.signUp(data)

  console.log("user", user);
  console.log("error", error);

  if (error) {
    // console.log("registration error", error);
    redirect('/registration-issue')
  }

  revalidatePath('/', 'layout')
  redirect('/confirmation')
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/password-reset`,
  })

  if (error) {
    console.log("reset password error", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/confirmation')
}

// const \{ data, error \} = await supabase.auth.updateUser(\{
//   password: new_password
// \})

export async function updatePassword(formData: FormData) {
  const supabase = createClient()

  // console.log("update password");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    password: formData.get('password') as string,
    // nonce: formData.get('code') as string,
  }

  // console.log("update password data", data);

  const { error } = await supabase.auth.updateUser(data)

  if (error) {
    console.log("update password error", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function verifyOtp(formData: FormData) {
  const supabase = createClient()

  // console.log("verify otp data", formData);
  // console.log("verify otp", formData.get('code'));

  if (!formData.get('code') || !formData.get('email')) {
    console.log("verify otp missing data");
    redirect('/error')
  }

  const { data, error } = await supabase.auth.verifyOtp({
    // email: formData.get('email') as string || '',
    token_hash: formData.get('code') as string || '',
    type: 'recovery'
  })

  if (error) {
    console.log("verify otp error", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}