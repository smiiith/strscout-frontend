'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient, createClient } from '@/utils/supabase/server'


export async function login(formData: FormData) {

  const supabase = createClient();

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
  redirect('/properties/assess-property/single')
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const supabaseAdmin = createAdminClient();
  const rawWhitelist = process.env.NEXT_PUBLIC_REGISTRATION_WHITELIST || ''
  const registrationWhitelist = rawWhitelist.split(',').map((item: string) => item.trim())

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (process.env.NEXT_PUBLIC_USE_WHITELIST == "true") {
    if (!registrationWhitelist.includes(data.email)) {
      console.log("Not taking new registrations at this time");
      redirect('/no-registration')
    }
  }

  const { data: user, error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("registration error", error);
    redirect('/registration-issue')
  }

  // update user to add role/plan
  const { data: udpateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.user.id, {
    app_metadata: { role: 'freemium' },
  });

  if (updateError) {
    console.error('Error updating app_metadata:', updateError);
  } else {
    console.log('Updated app_metadata:', udpateData);
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

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    password: formData.get('password') as string,
    // nonce: formData.get('code') as string,
  }

  const { error } = await supabase.auth.updateUser(data)

  if (error) {
    console.log("update password error", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/properties')
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
  redirect('/properties')
}