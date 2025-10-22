import { NextResponse, type NextRequest } from 'next/server'
import { updateSession, checkUserPlan } from '@/utils/supabase/middleware'

const protectedRoutes = [
  "/account",
  "/properties", 
  "/market-spy",
  "/my-comps",
  "/comp-details",
  "/comp-analysis",
  // "/contact"
];

const planProtectedRoutes = {
  "/market-spy": "pro",
  "/my-comps": "pro",
  "/comp-details": "pro",
  "/comp-analysis": "pro",
};

const ALLOWED_ORIGINS = ['https://strsage.com']; // Add other production domains if needed

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const origin = request.headers.get('origin');

  // Generate nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Handle PostHog requests first, before any auth logic
  if (url.pathname.startsWith('/ingest/')) {
    // Handle OPTIONS preflight requests
    if (request.method === 'OPTIONS') {
      if (origin && ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.next({
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type', // Add other headers if needed
            'Access-Control-Allow-Credentials': 'true', // If you need credentials
          },
        });
      } else {
        return new NextResponse(null, { status: 403, statusText: 'CORS Forbidden' });
      }
    }

    let posthogUrl: URL;

    if (url.pathname.startsWith('/ingest/e')) {
      posthogUrl = new URL('/e/' + url.search, 'https://us.i.posthog.com')
    } else if (url.pathname.startsWith('/ingest/decide')) {
      posthogUrl = new URL('/decide' + url.search, 'https://us.i.posthog.com')
      // } else if (url.pathname.startsWith('/ingest/array')) {
      //   posthogUrl = new URL('/array' + url.search, 'https://us.i.posthog.com')
    } else {
      posthogUrl = new URL(url.pathname.replace('/ingest', '') + url.search, 'https://us.i.posthog.com')
    }

    const response = NextResponse.rewrite(posthogUrl);

    // Set CORS headers for the actual response
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true'); // If needed
    }

    return response;
  }

  // update user's auth session
  const isAuthenticated = await updateSession(request);

  const currentPath = request.nextUrl.pathname;

  // if the user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && protectedRoutes.includes(currentPath)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // if authenticated and accessing a plan-protected route, check their plan
  if (isAuthenticated && planProtectedRoutes[currentPath as keyof typeof planProtectedRoutes]) {
    const requiredPlan = planProtectedRoutes[currentPath as keyof typeof planProtectedRoutes];
    const planCheck = await checkUserPlan(request, requiredPlan);

    if (!planCheck.hasAccess) {
      console.log(`Access denied to ${currentPath}: ${planCheck.reason}, user plan: ${planCheck.userPlan}`);

      // Redirect to upgrade page with context
      const upgradeURL = new URL("/pricing", request.nextUrl.origin);
      upgradeURL.searchParams.set("upgrade", "market-spy");
      upgradeURL.searchParams.set("reason", planCheck.reason);
      return NextResponse.redirect(upgradeURL.toString());
    }
  }

  // Build CSP policy with nonce
  const isDev = process.env.NODE_ENV === "development";

  // Create response with security headers
  const response = NextResponse.next();

  // Only set CSP and nonce in production to avoid hydration issues in dev
  if (!isDev) {
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3002/api";
    const backendUrl = apiEndpoint.replace("/api", "");
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "http://localhost:3005";
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ynxbtvsbjzkcnkilnuts.supabase.co";
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'sha256-X9GtzORyUShRgrb5vBVwF3p8WtKom3jBuMyocEhfL3Q=' https://js.stripe.com https://vercel.live;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://a0.muscache.com https://*.stripe.com;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      frame-src 'self' https://js.stripe.com https://checkout.stripe.com https://vercel.live;
      connect-src 'self' ${supabaseUrl} https://*.supabase.co wss://*.supabase.co ${backendUrl} https://syncnanny-ai-dev-production.up.railway.app https://syncnanny-ai-production.up.railway.app https://api.stripe.com https://api.geoapify.com ${posthogHost} https://internal-j.posthog.com ${appDomain}/ingest/;
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, " ").trim();

    response.headers.set("x-nonce", nonce);
    response.headers.set("Content-Security-Policy", cspHeader);
  }

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}