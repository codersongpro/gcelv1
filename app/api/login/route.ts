import { NextResponse } from "next/server";
import { AUTH_COOKIE, tokenFor } from "@/lib/auth";

export async function POST(req: Request) {
  const password = process.env.SITE_PASSWORD;
  if (!password) {
    return NextResponse.json({ ok: false, message: "관리자가 아직 접속 비밀번호를 설정하지 않았습니다." }, { status: 503 });
  }
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (body.password !== password) {
    return NextResponse.json({ ok: false, message: "비밀번호가 맞지 않습니다. 연수 안내문을 확인해 주세요." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, await tokenFor(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
