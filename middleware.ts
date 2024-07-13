// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

// import NextAuth from 'next-auth';
// import authConfig from './auth.config';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   if (!req.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, '/');
//     return Response.redirect(url);
//   }
// });

// export const config = { matcher: ['/dashboard/:path*'] };

// import { isUserAuthenticated } from '@/session';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [''];
export default function middleware(req: NextRequest) {
  // const user = localStorage.getItem('user');

  // console.log(
  //   '\n\nmiddleware: ',
  //   req.nextUrl.pathname,
  //   '\n\n user: ',
  //   user,
  //   '\n\n'
  // );

  console.log('\n\nmiddleware: ', req.headers.get('authorization'), '\n\n');

  if (protectedRoutes.includes(req?.nextUrl?.pathname)) {
    console.log('redirecting to / from middleware, /dashboard');

    const absoluteUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
