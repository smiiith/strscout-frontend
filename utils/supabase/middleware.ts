import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const { data, error } = await supabase.auth.getUser();

  return data?.user;
}

export async function checkUserPlan(request: NextRequest, requiredPlan: string) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // Read-only for plan check
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { hasAccess: false, reason: 'not_authenticated' };
  }

  try {
    // Get user's plan with a timeout to prevent hanging
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('plan:plans(key)')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Plan check error:', error);
      return { hasAccess: false, reason: 'plan_check_failed' };
    }

    // Handle both single object and array responses from Supabase join
    const planData = Array.isArray(profile?.plan) ? profile.plan[0] : profile?.plan;
    const userPlanKey = planData?.key;
    const hasAccess = userPlanKey === requiredPlan;

    return {
      hasAccess,
      reason: hasAccess ? 'authorized' : 'insufficient_plan',
      userPlan: userPlanKey
    };
  } catch (error) {
    console.error('Plan check exception:', error);
    return { hasAccess: false, reason: 'plan_check_error' };
  }
}

export async function checkAdminStatus(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // Read-only for admin check
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { isAdmin: false, reason: 'not_authenticated' };
  }

  try {
    // Check if user has admin flag
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Admin check error:', error);
      return { isAdmin: false, reason: 'admin_check_failed' };
    }

    const isAdmin = profile?.is_admin === true;

    return {
      isAdmin,
      reason: isAdmin ? 'authorized' : 'not_admin'
    };
  } catch (error) {
    console.error('Admin check exception:', error);
    return { isAdmin: false, reason: 'admin_check_error' };
  }
}