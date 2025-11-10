import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Site Access
 *
 */
const SITE_ACCESS_COOKIE = "strsage-site-access";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const cookieStore = cookies();
  const siteCookie = cookieStore.get(SITE_ACCESS_COOKIE);

  // console.log('site cookies', siteCookie?.value)

  if (
    cookies().get(SITE_ACCESS_COOKIE) &&
    siteCookie?.value === process.env.BASIC_AUTH_PASSWORD
  ) {
    return NextResponse.json("success");
  }

  if (req.body.access_pwd) {
    if (req.body.access_pwd === process.env.BASIC_AUTH_PASSWORD) {
      // Set cookie with 1 year expiration for long-lasting access
      cookieStore?.set(SITE_ACCESS_COOKIE, req.body.access_pwd, {
        maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return NextResponse.json("success");
    }
  }
  return NextResponse.json("failed");
};
