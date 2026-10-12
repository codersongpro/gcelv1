"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHAPTERS } from "@/content/chapters";
import { useStore } from "@/lib/store";

export default function Header() {
  const path = usePathname();
  const { state, update } = useStore();
  const links = [
    { href: "/", label: "홈" },
    ...CHAPTERS.map((c) => ({ href: `/ch/${c.id}`, label: c.no, title: `${c.no}. ${c.title} (${c.subtitle})` })),
    { href: "/exam", label: "모의고사" },
    { href: "/review", label: "오답 노트" },
    { href: "/finish", label: "시험 응시" },
  ] as { href: string; label: string; title?: string }[];

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="brand" aria-label="홈으로">
          <span className="dots" aria-hidden><i /><i /><i /><i /></span>
          L1 부트캠프
        </Link>
        <nav className="nav" aria-label="코스 메뉴">
          {links.map((l) => (
            <Link key={l.href} href={l.href} title={l.title} className={path === l.href ? "on" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="topbar-actions">
          <button
            type="button"
            className="toggle"
            aria-pressed={state.instructor}
            onClick={() => update((s) => ({ ...s, instructor: !s.instructor }))}
            title="진행 메모와 권장 시간을 보여 줍니다"
          >
            강사 모드 {state.instructor ? "켬" : "끔"}
          </button>
          <button type="button" className="toggle" onClick={logout}>나가기</button>
        </div>
      </div>
    </header>
  );
}
