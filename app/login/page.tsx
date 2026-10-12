import LoginForm from "./LoginForm";
import { SITE } from "@/lib/site";

export const metadata = { title: "입장" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; setup?: string }> }) {
  const { next = "/", setup } = await searchParams;
  return (
    <main className="login">
      <div className="card">
        <span className="dots" aria-hidden><i /><i /><i /><i /></span>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 14 }}>{SITE.courseTitle}</h1>
        <p className="muted" style={{ marginTop: 8 }}>연수 참여자 전용 페이지입니다. 연수 안내문에 있는 비밀번호를 입력해 주세요.</p>
        {setup ? (
          <p className="error" style={{ marginTop: 18 }}>
            관리자 안내: Vercel 프로젝트 설정의 Environment Variables에 <code>SITE_PASSWORD</code>를 추가하고 다시 배포해야 사이트가 열립니다.
          </p>
        ) : (
          <LoginForm next={next} />
        )}
        <p className="small muted" style={{ marginTop: 20 }}>Developed by {SITE.author.name}</p>
      </div>
    </main>
  );
}
