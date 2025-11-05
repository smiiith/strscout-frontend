"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, createClient } from "@/utils/supabase/server";
// import posthog from 'posthog-js';

export async function login(formData: FormData) {
  const supabase = createClient();

  // Get the intended redirect destination
  const redirectTo = formData.get("redirect_to") as string || "";

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error);
    redirect("/login-issue");
  }

  console.log("Login successful for user:", user.user?.id);

  // posthog.identify(
  //   user.user.id,
  //   {
  //     email: data.email,
  //   }
  // );

  revalidatePath("/", "layout");
  revalidatePath("/properties");

  // Redirect to the intended destination or default to home
  if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
    redirect(redirectTo);
  } else {
    redirect("/");
  }
}

export async function signInWithGoogle(redirectTo?: string) {
  const supabase = createClient();
  const origin = process.env.NEXT_PUBLIC_APP_DOMAIN || process.env.NEXT_PUBLIC_SITE_URL;

  // Build the redirect URL with optional next parameter
  let redirectUrl = `${origin}/auth/callback`;
  if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
    redirectUrl += `?next=${encodeURIComponent(redirectTo)}`;
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("Google sign-in error:", error);
    redirect("/login-issue");
  }

  if (data.url) {
    redirect(data.url); // Redirect to Google OAuth consent screen
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const supabaseAdmin = createAdminClient();
  const rawWhitelist = process.env.NEXT_PUBLIC_REGISTRATION_WHITELIST || "";
  const registrationWhitelist = rawWhitelist
    .split(",")
    .map((item: string) => item.trim());

  // Get the intended post-confirmation redirect destination
  const redirectTo = formData.get("redirect_to") as string || "";

  // Get the origin (localhost or production) from the form data
  // Fall back to APP_DOMAIN if not provided
  const origin = (formData.get("origin") as string) || process.env.NEXT_PUBLIC_APP_DOMAIN;

  // Define the redirect URL for after confirmation
  let redirectUrl = `${origin}/auth/callback`;

  // Append the next parameter if redirect_to was provided
  if (redirectTo) {
    redirectUrl += `?next=${encodeURIComponent(redirectTo)}`;
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: redirectUrl,
    },
  };

  if (process.env.NEXT_PUBLIC_USE_WHITELIST == "true") {
    if (!registrationWhitelist.includes(data.email)) {
      console.log("Not taking new registrations at this time");
      redirect("/no-registration");
    }
  }

  const { data: user, error } = await supabase.auth.signUp(data);

  if (error) {
    console.log("registration error", error);
    redirect("/registration-issue");
  }

  // update user to add role/plan
  const { data: udpateData, error: updateError } =
    await supabaseAdmin.auth.admin.updateUserById(user.user.id, {
      app_metadata: { role: "freemium" },
    });

  if (updateError) {
    console.error("Error updating app_metadata:", updateError);
  } else {
    console.log("Updated app_metadata:", udpateData);
  }

  revalidatePath("/", "layout");
  redirect("/confirmation");
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/password-reset`,
  });

  if (error) {
    console.log("reset password error", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/confirmation");
}

// const \{ data, error \} = await supabase.auth.updateUser(\{
//   password: new_password
// \})

export async function updatePassword(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    password: formData.get("password") as string,
    // nonce: formData.get('code') as string,
  };

  const { error } = await supabase.auth.updateUser(data);

  if (error) {
    console.log("update password error", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/properties");
}

export async function verifyOtp(formData: FormData) {
  const supabase = createClient();

  // console.log("verify otp data", formData);
  // console.log("verify otp", formData.get('code'));

  if (!formData.get("code") || !formData.get("email")) {
    console.log("verify otp missing data");
    redirect("/error");
  }

  const { data, error } = await supabase.auth.verifyOtp({
    // email: formData.get('email') as string || '',
    token_hash: (formData.get("code") as string) || "",
    type: "recovery",
  });

  if (error) {
    console.log("verify otp error", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/properties");
}
