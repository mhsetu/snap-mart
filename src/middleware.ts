import { getToken, JWT } from 'next-auth/jwt';

import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  // if (!token) {
  //   console.log('No token found - redirecting to login');
  //   const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
  //   return NextResponse.redirect(
  //     new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
  //   );
  // }

  // const isAdminRoute = req.nextUrl.pathname.startsWith('/dashboard');

  // if (isAdminRoute) {
  //   // 4. Verify user type
  //   if (token.userType !== 'seller') {
  //     console.log('Unauthorized access attempt to admin route');
  //     return NextResponse.redirect(new URL('/unauthorized', req.url));
  //   }
  // }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isTokenOk = Boolean(token);
  const isAdminUser = token?.userType;
  console.log(isAdminUser, 'show me the name');
  console.log(token, 'show me the token');

  const isAdminSpecificRoute = req.nextUrl.pathname.startsWith('/dashboard');
  if (isAdminSpecificRoute) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    console.log(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
};
