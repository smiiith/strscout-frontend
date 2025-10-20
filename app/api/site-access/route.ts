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
      cookieStore?.set(SITE_ACCESS_COOKIE, req.body.access_pwd);
      return NextResponse.json("success");
    }
  }
  return NextResponse.json("failed");
};
