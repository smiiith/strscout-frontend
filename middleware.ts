import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'


const protectedRoutes = [
  "/account",
  "/properties",
  // "/contact"
];


export async function middleware(request: NextRequest) {

  // update user's auth session
  const isAuthenticated = await updateSession(request);


  // if the user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    // console.log("redirecting to login");
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
function withAuth(arg0: (req: any) => any, arg1: { callbacks: { authorized: ({ token }: { token: any; }) => boolean; }; pages: { signIn: string; }; }) {
  throw new Error('Function not implemented.');
}

