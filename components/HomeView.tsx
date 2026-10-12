"use client";

import Link from "next/link";
import { TOOLS, cardById } from "@/content/cards";
import { CHAPTERS } from "@/content/chapters";
import { DOMAINS, QUESTIONS, type Domain } from "@/content/questions";
import { SITE } from "@/lib/site";
import { useStore } from "@/lib/store";
import { HeroArt } from "./Deco";
import Maker from "./Maker";
import NameEditor from "./NameEditor";

const SCHEDULE = [
  ["09:00–09:20", "오리엔테이션: 시험 구조, 코스 사용법, 주인공 정하기"],
  ["09:20–10:10", "01. 메일함과 한 주 일정 정리 (Gmail · Calendar)"],
  ["10:20–11:00", "02. 자료실 대청소 (Drive · Sheets)"],
  ["11:00–12:00", "03. 가정통신문 만들기 (Docs)"],
  ["13:00–13:45", "04. 수업 발표 자료와 학급 홈페이지 (Slides · Sites)"],
  ["13:45–14:40", "05. 클래스룸 개설과 평가 (Classroom · Forms)"],
  ["14:50–15:30", "06. 원격 수업과 연수 (Meet) · 07. 교무실 실시간 소통 (Chat)"],
  ["15:30–15:50", "08. 모두를 위한 교실 (접근성)"],
  ["15:50–16:30", "최종 모의고사, 오답 리뷰, 실제 시험 응시 안내"],
];

export default function HomeView() {
  const { state, name } = useStore();

  const domainCount = (d: Domain) => QUESTIONS.filter((q) => q.domain === d).length;

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <p className="kicker">Google Certified Educator · Level 1</p>
            <h1>구글 인증 교육자 <span style={{ whiteSpace: "nowrap" }}>Level 1</span> 부트캠프</h1>
            <p className="lead">
              <strong>{name} 선생님의 새 학기 첫 주</strong>를 따라가며 Google 도구를 직접 실습하고,
              실습한 기능이 시험에서 어떻게 나오는지 바로 문제로 풀어 봅니다.
            </p>
            <div className="cta">
              <Link className="btn" href="/ch/1">01장부터 시작하기 →</Link>
              <Link className="btn ghost" href="/exam">모의고사 바로 보기</Link>
            </div>
            <div className="rail" aria-hidden style={{ maxWidth: 420 }}><span /><span /><span /><span /></div>
            <p className="small muted">8개 장 · 실습 카드 65장 · 시험 문항 37개 · 최종 모의고사</p>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><span className="step-no">READY</span><h2>시작하기 전에</h2></div>
        <div className="grid two">
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 19 }}>이야기 주인공 정하기</h3>
            <p className="muted small" style={{ marginTop: 6 }}>
              모든 장의 상황 이야기에 이 이름이 나옵니다. 내 이름을 넣으면 내 이야기처럼 읽힙니다.
              처음 접속할 때 정한 이름은 아래 버튼으로 언제든 다시 바꿀 수 있고, 이 브라우저에만 저장됩니다.
            </p>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span>지금 주인공:</span>
              <NameEditor />
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 19 }}>한 장은 이렇게 진행합니다</h3>
            <ol style={{ margin: "12px 0 0", paddingLeft: 20, display: "grid", gap: 8 }}>
              <li><strong>오늘의 상황</strong>: {name} 선생님이 겪는 학교 일상의 한 장면</li>
              <li><strong>실습 미션</strong>: 내 Google 계정에서 직접 해 볼 일들</li>
              <li><strong>실습 카드</strong>: 단계별 안내와 실제 화면으로 따라 하기</li>
              <li><strong>시험 문제</strong>: 방금 실습한 기능이 나오는 문항을 풀고 해설 확인</li>
            </ol>
            <p className="small muted" style={{ marginTop: 12 }}>진도와 답안은 이 브라우저에만 저장되며 서버로 전송되지 않습니다.</p>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><span className="step-no">EXAM</span><h2>Level 1 시험의 5개 영역</h2></div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {(Object.keys(DOMAINS) as Domain[]).map((k) => {
            const d = DOMAINS[k];
            return (
              <div key={k} className="card" style={{ padding: 18 }}>
                <p style={{ fontSize: 30, fontWeight: 800, color: "#dadce0", lineHeight: 1 }}>{d.no}</p>
                <h3 style={{ fontSize: 18, marginTop: 6, color: d.color }}>{d.name}</h3>
                <p className="small muted" style={{ marginTop: 4 }}>{d.desc}</p>
                <p className="small" style={{ marginTop: 8, fontWeight: 700 }}>퀴즈 문항 {domainCount(k)}개</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><span className="step-no">MAP</span><h2>{name} 선생님의 새 학기 첫 주</h2></div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {CHAPTERS.map((c) => {
            const total = c.missions.length + c.cards.length + c.questions.length;
            const done =
              c.missions.filter((_, i) => state.missions[`${c.id}-${i}`]).length +
              c.cards.filter((id) => state.cards[id]).length +
              c.questions.filter((n) => state.answers[n]).length;
            const pct = Math.round((done / total) * 100);
            return (
              <Link key={c.id} href={`/ch/${c.id}`} className="card ch-card" style={{ borderTop: `5px solid ${TOOLS[c.tools[0]].color}` }}>
                <div className="top">
                  <span className="num">{c.no}.</span>
                  <span className="small muted">{c.day}</span>
                </div>
                <h3>{c.title}</h3>
                <p className="small muted">{c.subtitle} · 실습 {c.cards.length} · 문항 {c.questions.length}</p>
                <p className="small" style={{ color: "#3c4043" }}>{c.cards.slice(0, 3).map((id) => cardById(id).title).join(", ")} …</p>
                <div className="bar" aria-label={`진도 ${pct}%`}><i style={{ width: `${pct}%` }} /></div>
              </Link>
            );
          })}
          <Link href="/exam" className="card ch-card" style={{ borderTop: "5px solid #EA4335" }}>
            <div className="top"><span className="num">FINAL</span><span className="small muted">금요일 퇴근 전</span></div>
            <h3>최종 모의고사</h3>
            <p className="small muted">37문항 · 연습 모드 / 실전 모드(제한 시간 {SITE.examMinutes}분)</p>
            <p className="small">{state.exam ? `최근 결과 ${state.exam.score}/${state.exam.total}` : "아직 응시 기록이 없습니다."}</p>
          </Link>
          <Link href="/finish" className="card ch-card" style={{ borderTop: "5px solid #34A853" }}>
            <div className="top"><span className="num">NEXT</span><span className="small muted">연수 이후</span></div>
            <h3>실제 시험 응시 안내</h3>
            <p className="small muted">공식 인증 사이트에서 Level 1 시험에 응시합니다.</p>
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><span className="step-no">SCHEDULE</span><h2>하루 집중 운영 시간표</h2></div>
        <div className="card table-wrap">
          <table className="table">
            <thead><tr><th style={{ width: 130 }}>시간</th><th>내용</th></tr></thead>
            <tbody>{SCHEDULE.map(([t, c]) => <tr key={t}><td style={{ whiteSpace: "nowrap", fontWeight: 700 }}>{t}</td><td>{c}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <Maker />
    </>
  );
}
