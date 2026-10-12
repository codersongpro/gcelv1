import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, tokenFor } from "@/lib/auth";

// 연수 참여자 전용: SITE_PASSWORD 환경변수로 사이트 전체를 잠근다.
// 운영 환경에서 비밀번호가 설정되지 않았으면 열지 않고 로그인 화면에서 안내한다.
export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  const login = new URL("/login", req.url);
  if (!password) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    login.searchParams.set("setup", "1");
    return NextResponse.redirect(login);
  }
  if (req.cookies.get(AUTH_COOKIE)?.value === (await tokenFor(password))) return NextResponse.next();
  login.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|login|api/login).*)"],
};
