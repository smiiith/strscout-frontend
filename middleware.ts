import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const protectedRoutes = [
  "/account",
  "/properties", 
  "/market-spy",
  "/my-comps",
  // "/contact"
];

const ALLOWED_ORIGINS = ['https://strsage.com']; // Add other production domains if needed

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const origin = request.headers.get('origin');

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

  // if the user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next(); // Ensure you have this for non-/ingest/ requests
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}