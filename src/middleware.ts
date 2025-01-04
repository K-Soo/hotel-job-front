import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/employer/:path*', '/sign-in', '/sign-up', '/user/:path*'],
};

export function middleware(request: NextRequest) {
  const refreshTokenExists = request.cookies.has('refresh_token');

  // 로그인 페이지로 접근 시 리디렉션 처리
  if (['/sign-in', '/sign-up'].includes(request.nextUrl.pathname) && refreshTokenExists) {
    const referer = request.headers.get('referer');

    const previousPage = new URL('/', request.url).toString();
    return NextResponse.redirect(previousPage);
  }

  // 보호된 경로에서 인증되지 않은 경우 로그인 페이지로 리디렉션
  if (!refreshTokenExists && ['/employer', '/user'].some((path) => request.nextUrl.pathname.startsWith(path))) {
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
