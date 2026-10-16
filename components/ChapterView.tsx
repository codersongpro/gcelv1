"use client";

import Link from "next/link";
import { TOOLS, cardById } from "@/content/cards";
import { CHAPTERS, type Chapter } from "@/content/chapters";
import { questionByNo } from "@/content/questions";
import { fill, useStore } from "@/lib/store";
import QuestionCard from "./QuestionCard";
import TaskCard from "./TaskCard";
import { NodeDeco } from "./Deco";

export default function ChapterView({ ch }: { ch: Chapter }) {
  const { state, update, name } = useStore();
  const tool = TOOLS[ch.tools[0]];
  const idx = CHAPTERS.findIndex((c) => c.id === ch.id);
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];
  const cards = ch.cards.map(cardById);
  const missionsDone = ch.missions.filter((_, i) => state.missions[`${ch.id}-${i}`]).length;
  const cardsDone = cards.filter((c) => state.cards[c.id]).length;
  const correct = ch.questions.filter((n) => state.answers[n]?.ok).length;

  return (
    <>
      <section className="wrap ch-hero">
        <div className="ch-panel" style={{ background: tool.tint }}>
          <NodeDeco />
          <span className="pill outline">{ch.no}.</span>
          <h1>{ch.title}</h1>
          <div className="ch-meta">
            <span className="ch-day">🕘 {ch.day}</span>
            {ch.tools.map((t) => (
              <span key={t} className="chip" style={{ background: "#fff", color: TOOLS[t].color }}>{TOOLS[t].name}</span>
            ))}
            <span className="chip" style={{ background: "#fff", color: "#5f6368" }}>약 {ch.minutes}분</span>
          </div>
          <div className="rail" aria-hidden><span /><span /><span /><span /></div>
          <p className="small muted">
            미션 {missionsDone}/{ch.missions.length} · 실습 카드 {cardsDone}/{cards.length} · 문제 정답 {correct}/{ch.questions.length}
          </p>
          <div className="q-actions">
            <Link className="btn" href={`/ch/${ch.id}/present`}>▶ 발표 모드로 보기</Link>
            <span className="small muted">실습 과정과 문제를 화면 가득 크게 보여 줍니다.</span>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head"><span className="step-no">STEP 1</span><h2>오늘의 상황</h2></div>
        <div className="card story">
          {ch.story.map((p, i) => <p key={i}>{fill(p, name)}</p>)}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="step-no">STEP 2</span><h2>실습 미션</h2>
          <span className="muted small">아래 실습 카드를 보며 내 계정에서 직접 해 보세요.</span>
        </div>
        <div className="checklist">
          <span className="pill check">Skills checklist</span>
          <ol>
            {ch.missions.map((m, i) => {
              const key = `${ch.id}-${i}`;
              const done = !!state.missions[key];
              return (
                <li key={key}>
                  <label className={`check-row${done ? " done" : ""}`}>
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => update((s) => ({ ...s, missions: { ...s.missions, [key]: !done } }))}
                    />
                    <span>{fill(m, name)}</span>
                  </label>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="step-no">STEP 3</span><h2>실습 카드 따라 하기</h2>
          <span className="muted small">화면을 누르면 크게 볼 수 있습니다.</span>
          <Link className="present-link" href={`/ch/${ch.id}/present#card-${ch.cards[0]}`}>▶ 실습 과정 발표</Link>
        </div>
        <div className="grid two">
          {cards.map((c, i) => <TaskCard key={c.id} card={c} index={i + 1} />)}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="step-no">STEP 4</span><h2>시험 문제 풀어 보기</h2>
          <span className="muted small">실습한 내용이 실제 시험에서 이렇게 나옵니다.</span>
          <Link className="present-link" href={`/ch/${ch.id}/present#q-${ch.questions[0]}`}>▶ 문제 발표</Link>
        </div>
        <div className="grid">
          {ch.questions.map((n) => <QuestionCard key={n} q={questionByNo(n)} />)}
        </div>
      </section>

      <nav className="wrap ch-pager" aria-label="장 이동">
        {prev ? <Link className="btn ghost" href={`/ch/${prev.id}`}>← {prev.no}. {prev.title}</Link> : <Link className="btn ghost" href="/">← 홈</Link>}
        {next ? (
          <Link className="btn" href={`/ch/${next.id}`}>{next.no}. {next.title} →</Link>
        ) : (
          <Link className="btn" href="/exam">최종 모의고사 →</Link>
        )}
      </nav>
    </>
  );
}
