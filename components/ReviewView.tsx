"use client";

import Link from "next/link";
import { QUESTIONS } from "@/content/questions";
import { useStore } from "@/lib/store";
import QuestionCard, { chapterOfQuestion } from "./QuestionCard";

export default function ReviewView() {
  const { state, update } = useStore();
  const tried = QUESTIONS.filter((q) => state.answers[q.no]);
  const wrong = tried.filter((q) => !state.answers[q.no].ok);
  const untried = QUESTIONS.filter((q) => !state.answers[q.no]);

  return (
    <section className="wrap section">
      <div className="ch-panel" style={{ background: "#fef7e0" }}>
        <span className="pill outline">REVIEW.</span>
        <h1>오답 노트</h1>
        <p style={{ marginTop: 12 }}>
          푼 문항 {tried.length}/{QUESTIONS.length} · 정답 {tried.length - wrong.length} · 오답 {wrong.length}
        </p>
        <div className="rail" aria-hidden><span /><span /><span /><span /></div>
        <div className="q-actions">
          <Link className="btn" href="/exam">오답만 모의고사로 풀기</Link>
          <button className="btn ghost" type="button" onClick={() => {
            if (window.confirm("문항 풀이 기록을 모두 지울까요? 실습 진도는 그대로 남습니다.")) update((s) => ({ ...s, answers: {}, exam: null }));
          }}>풀이 기록 지우기</button>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 32 }}><h2>다시 풀어 볼 문항</h2></div>
      {wrong.length === 0 ? (
        <p className="card" style={{ padding: 24 }}>{tried.length ? "틀린 문항이 없습니다. 멋져요!" : "아직 푼 문항이 없습니다. 각 장의 STEP 4에서 문제를 풀어 보세요."}</p>
      ) : (
        <div className="grid">
          {wrong.map((q) => {
            const ch = chapterOfQuestion(q.no);
            return (
              <div key={q.no}>
                {ch && <p className="small muted" style={{ margin: "0 0 6px 4px" }}>{ch.no}. {ch.title}</p>}
                <QuestionCard q={q} />
              </div>
            );
          })}
        </div>
      )}

      {untried.length > 0 && (
        <>
          <div className="section-head" style={{ marginTop: 32 }}><h2>아직 풀지 않은 문항</h2></div>
          <div className="card" style={{ padding: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {untried.map((q) => {
              const ch = chapterOfQuestion(q.no);
              return ch ? (
                <Link key={q.no} className="chip" style={{ background: "#e8f0fe", color: "#1967d2" }} href={`/ch/${ch.id}#q-${q.no}`}>
                  {q.no}. {q.title}
                </Link>
              ) : null;
            })}
          </div>
        </>
      )}
    </section>
  );
}
