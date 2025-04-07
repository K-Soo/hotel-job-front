import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PROTECTED_ROUTES = ['/employer', '/user'];
const EXCEPTION_ROUTES = ['/employer/product/recruitment'];

export function middleware(request: NextRequest) {
  const refreshTokenExists = request.cookies.has('refresh_token');
  const { pathname } = request.nextUrl;

  const isAuthPage = PUBLIC_AUTH_ROUTES.includes(pathname);
  const isExceptionPath = EXCEPTION_ROUTES.includes(pathname);
  const isProtectedPath = !isExceptionPath && PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  // 로그인된 사용자가 로그인/회원가입 페이지 접근 시 홈으로 이동
  if (isAuthPage && refreshTokenExists) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 보호된 경로인데 토큰이 없고 예외 경로도 아닐 경우 로그인 페이지로 이동
  if (!refreshTokenExists && isProtectedPath) {
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
