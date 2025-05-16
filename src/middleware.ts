'use server';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'default_secret',
  });
  const isTokenOk = Boolean(token);
  const isAdminUser = token?.userType;
  console.log(isAdminUser, 'show me the name');
  console.log(token, 'show me the token');

  const isAdminSpecificRoute = pathname.startsWith('/dashboard');

  if (isAdminSpecificRoute && !token) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    console.log(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  // if (isAdminSpecificRoute && !token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/:path*'],
};
