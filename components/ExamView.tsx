"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DOMAINS, QUESTIONS, type Domain, type Question } from "@/content/questions";
import { SITE } from "@/lib/site";
import { recordAttempts, recordExam, useStore } from "@/lib/store";
import { MARKS, Options, Refs, sameSet, toggleSel } from "./QuestionCard";

type Mode = "practice" | "exam";
type Phase = "setup" | "run" | "done";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const fmt = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

export default function ExamView() {
  const { state, update } = useStore();
  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("exam");
  const [mix, setMix] = useState(true);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [list, setList] = useState<Question[]>([]);
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<Record<number, number[]>>({});
  const [locked, setLocked] = useState<Record<number, boolean>>({});
  const [left, setLeft] = useState(0);

  const wrongNos = useMemo(
    () => QUESTIONS.filter((q) => state.answers[q.no] && !state.answers[q.no].ok).map((q) => q.no),
    [state.answers],
  );

  function start(nos?: number[]) {
    const pool = nos ? QUESTIONS.filter((q) => nos.includes(q.no)) : onlyWrong ? QUESTIONS.filter((q) => wrongNos.includes(q.no)) : QUESTIONS;
    setList(mix ? shuffle(pool) : pool);
    setSel({});
    setLocked({});
    setCur(0);
    setLeft(Math.round((SITE.examMinutes * 60 * pool.length) / QUESTIONS.length));
    setPhase("run");
    window.scrollTo({ top: 0 });
  }

  const finish = useCallback(() => {
    const results = list.map((q) => ({ q, ok: sameSet(sel[q.no] ?? [], q.answer) }));
    const score = results.filter((r) => r.ok).length;
    update((s) => recordExam(
      recordAttempts(s, results.map(({ q, ok }) => ({ no: q.no, sel: sel[q.no] ?? [], ok })), "exam"),
      { at: new Date().toISOString(), mode, score, total: list.length, wrong: results.filter((r) => !r.ok).map((r) => r.q.no) },
    ));
    setPhase("done");
    window.scrollTo({ top: 0 });
  }, [list, sel, mode, update]);

  useEffect(() => {
    if (phase !== "run" || mode !== "exam") return;
    if (left <= 0) { finish(); return; }
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, mode, left, finish]);

  if (phase === "setup") {
    return (
      <section className="wrap section">
        <div className="ch-panel" style={{ background: "#fce8e6" }}>
          <span className="pill outline">FINAL.</span>
          <h1>최종 모의고사</h1>
          <p style={{ marginTop: 12, maxWidth: 640 }}>
            퀴즈 A의 37문항을 실제 시험처럼 풀어 봅니다. 실기 과제는 각 장의 실습 미션으로 연습하고, 여기서는 객관식으로 최종 점검합니다.
          </p>
          <div className="rail" aria-hidden><span /><span /><span /><span /></div>
        </div>
        <div className="card" style={{ padding: 24, marginTop: 20, display: "grid", gap: 18 }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: 8 }}>풀이 방식</p>
            <div className="seg" role="group" aria-label="풀이 방식">
              <button type="button" aria-pressed={mode === "exam"} onClick={() => setMode("exam")}>실전 모드</button>
              <button type="button" aria-pressed={mode === "practice"} onClick={() => setMode("practice")}>연습 모드</button>
            </div>
            <p className="small muted" style={{ marginTop: 8 }}>
              {mode === "exam"
                ? `제한 시간 ${SITE.examMinutes}분(37문항 기준) 안에 모두 풀고 마지막에 한꺼번에 채점합니다. 시간이 끝나면 자동으로 제출됩니다.`
                : "문항마다 바로 채점하고 해설을 봅니다. 시간 제한은 없습니다."}
            </p>
          </div>
          <label className="check-row" style={{ padding: 0 }}>
            <input type="checkbox" checked={mix} onChange={() => setMix(!mix)} />
            <span>문항 순서 섞기</span>
          </label>
          <label className="check-row" style={{ padding: 0 }}>
            <input type="checkbox" checked={onlyWrong} disabled={wrongNos.length === 0} onChange={() => setOnlyWrong(!onlyWrong)} />
            <span>지난 오답만 풀기 {wrongNos.length ? `(${wrongNos.length}문항)` : "(오답 기록 없음)"}</span>
          </label>
          <div className="q-actions">
            <button className="btn" type="button" onClick={() => start()}>시작하기</button>
            {state.exam && (
              <span className="small muted">
                최근 결과: {state.exam.score}/{state.exam.total} ({new Date(state.exam.at).toLocaleString("ko-KR")}) · <Link href="/history">전체 기록 보기</Link>
              </span>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (phase === "done") {
    const results = list.map((q) => ({ q, picked: sel[q.no] ?? [], ok: sameSet(sel[q.no] ?? [], q.answer) }));
    const score = results.filter((r) => r.ok).length;
    const pct = Math.round((score / list.length) * 100);
    const pass = pct >= SITE.passPercent;
    const byDomain = (Object.keys(DOMAINS) as Domain[])
      .map((d) => ({ d, all: results.filter((r) => r.q.domain === d) }))
      .filter((x) => x.all.length);
    const wrong = results.filter((r) => !r.ok);
    return (
      <section className="wrap section">
        <div className="card finish-hero">
          <p className="muted" style={{ fontWeight: 700 }}>{mode === "exam" ? "실전 모드" : "연습 모드"} 결과</p>
          <p className="score" style={{ color: pass ? "#188038" : "#c5221f" }}>{score} / {list.length}</p>
          <p style={{ fontSize: 18, fontWeight: 700 }}>
            {pct}% · {pass ? "목표 점수를 넘었습니다. 실제 시험에 도전해 보세요!" : `목표 ${SITE.passPercent}%까지 오답을 한 번 더 복습해 보세요.`}
          </p>
          <p className="small muted" style={{ marginTop: 6 }}>목표 점수 {SITE.passPercent}%는 이 연수의 연습 기준입니다. 실제 합격 기준은 공식 사이트에서 확인하세요.</p>
          <div className="q-actions" style={{ justifyContent: "center" }}>
            {wrong.length > 0 && <button className="btn" type="button" onClick={() => start(wrong.map((r) => r.q.no))}>오답만 다시 풀기</button>}
            <button className="btn ghost" type="button" onClick={() => setPhase("setup")}>처음으로</button>
            <Link className="btn green" href="/finish">실제 시험 응시 안내 →</Link>
          </div>
        </div>

        <div className="section-head" style={{ marginTop: 32 }}><h2>영역별 결과</h2></div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {byDomain.map(({ d, all }) => {
            const ok = all.filter((r) => r.ok).length;
            return (
              <div key={d} className="card" style={{ padding: 16 }}>
                <p style={{ fontWeight: 800, color: DOMAINS[d].color }}>{DOMAINS[d].no} {DOMAINS[d].name}</p>
                <p style={{ fontSize: 24, fontWeight: 800 }}>{ok}/{all.length}</p>
                <div className="bar"><i style={{ width: `${(ok / all.length) * 100}%` }} /></div>
              </div>
            );
          })}
        </div>

        {wrong.length > 0 && (
          <>
            <div className="section-head" style={{ marginTop: 32 }}><h2>틀린 문항 해설</h2></div>
            <div className="grid">
              {wrong.map(({ q, picked }) => (
                <article key={q.no} className="card q">
                  <div className="q-top"><span className="q-no">문항 {q.no}</span><span className="muted small">{q.title}</span></div>
                  <p className="q-stem">{q.stem}</p>
                  <Options q={q} sel={picked} onToggle={() => {}} reveal />
                  <div className="feedback no">
                    <strong>정답 {q.answer.map((i) => MARKS[i]).join(", ")}</strong>
                    {q.explain}
                    <Refs q={q} />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    );
  }

  const q = list[cur];
  const picked = sel[q.no] ?? [];
  const isLocked = mode === "practice" && locked[q.no];
  const answered = list.filter((x) => (sel[x.no] ?? []).length > 0).length;

  return (
    <section className="wrap section">
      <div className="card" style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <strong>{mode === "exam" ? "실전 모드" : "연습 모드"} · {cur + 1}/{list.length}</strong>
        <span className="small muted">답한 문항 {answered}/{list.length}</span>
        {mode === "exam" && <span className={`timer${left < 300 ? " low" : ""}`} aria-live="off">⏱ {fmt(left)}</span>}
      </div>

      <article className="card q" style={{ marginTop: 16 }}>
        <div className="q-top">
          <span className="q-no">문항 {q.no}</span>
          {q.answer.length > 1 && <span className="chip" style={{ background: "#fef7e0", color: "#7a4f01" }}>{q.answer.length}개 선택</span>}
        </div>
        <p className="q-stem">{q.stem}</p>
        <Options q={q} sel={picked} reveal={!!isLocked} onToggle={(i) => setSel((s) => ({ ...s, [q.no]: toggleSel(q, picked, i) }))} />
        {mode === "practice" && !isLocked && (
          <div className="q-actions">
            <button className="btn" type="button" disabled={picked.length !== q.answer.length} onClick={() => setLocked((l) => ({ ...l, [q.no]: true }))}>채점하기</button>
          </div>
        )}
        {isLocked && (
          <div className={`feedback ${sameSet(picked, q.answer) ? "ok" : "no"}`}>
            <strong>{sameSet(picked, q.answer) ? "정답입니다!" : `오답입니다. 정답은 ${q.answer.map((i) => MARKS[i]).join(", ")}`}</strong>
            {q.explain}
            <Refs q={q} />
          </div>
        )}
        <div className="q-actions" style={{ justifyContent: "space-between", marginTop: 20 }}>
          <button className="btn ghost" type="button" disabled={cur === 0} onClick={() => setCur(cur - 1)}>← 이전</button>
          {cur < list.length - 1 ? (
            <button className="btn" type="button" onClick={() => setCur(cur + 1)}>다음 →</button>
          ) : (
            <button className="btn green" type="button" onClick={() => {
              if (answered < list.length && !window.confirm(`아직 ${list.length - answered}문항을 풀지 않았습니다. 제출할까요?`)) return;
              finish();
            }}>제출하고 채점하기</button>
          )}
        </div>
      </article>

      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <p className="small muted" style={{ marginBottom: 8 }}>문항 바로 가기</p>
        <div className="exam-nav">
          {list.map((x, i) => {
            const has = (sel[x.no] ?? []).length > 0;
            const cls = [
              i === cur ? "cur" : "",
              mode === "practice" && locked[x.no] ? (sameSet(sel[x.no] ?? [], x.answer) ? "r" : "w") : has ? "answered" : "",
            ].join(" ");
            return <button key={x.no} type="button" className={cls} onClick={() => setCur(i)} aria-label={`${i + 1}번째 문항`}>{i + 1}</button>;
          })}
        </div>
        <div className="q-actions"><button className="btn ghost" type="button" onClick={() => {
          if (!window.confirm("지금 제출하고 채점할까요?")) return;
          finish();
        }}>지금 제출</button></div>
      </div>
    </section>
  );
}
