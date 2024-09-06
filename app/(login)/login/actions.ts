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

  // console.log("user", user);

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // console.log("signup data", data);

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("registration error", error);
    redirect('/error')
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

  // const { error } = await supabase.auth.resetPasswordForEmail(data.email)

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: '/password-reset',
  })

  if (error) {
    console.log("reset password error", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/password-reset')
}

// const \{ data, error \} = await supabase.auth.updateUser(\{
//   password: new_password
// \})

export async function updatePassword(formData: FormData) {
  const supabase = createClient()

  console.log("update password");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    password: formData.get('password') as string,
  }

  console.log("update password data", data);

  const { error } = await supabase.auth.updateUser(data)

  if (error) {
    console.log("update password error", error);
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}