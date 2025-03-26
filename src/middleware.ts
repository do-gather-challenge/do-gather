import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getUserInfo } from './lib/api/user-Info.api';
import APP_URL from './constants/app-url.constant';

const protectedPaths = [APP_URL.CHALLENGES_POST, `${APP_URL.CHALLENGES_POST}/:path*`, APP_URL.MY_PAGE];
const publicPaths = [APP_URL.SIGN_IN, APP_URL.SIGN_UP];
export const middleware = async (request: NextRequest) => {
  const { isLogin } = await getUserInfo();

  // 로그인 상태인 경우
  if (isLogin && publicPaths.some((path) => request.nextUrl.pathname.includes(path))) {
    return NextResponse.redirect(new URL(APP_URL.HOME, request.url));
  }
  // 로그인 상태가 아닌경우
  if (!isLogin && protectedPaths.some((path) => request.nextUrl.pathname.includes(path))) {
    return NextResponse.redirect(new URL(APP_URL.SIGN_IN, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/challenges/post', '/challenges/post/:path*', '/my-page', '/sign-in', '/sign-up']
};

//
