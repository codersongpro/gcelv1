"use client";

import Link from "next/link";
import { CHAPTERS } from "@/content/chapters";
import { QUESTIONS, questionByNo } from "@/content/questions";
import { SITE } from "@/lib/site";
import { useStore, type Attempt, type AttemptSource } from "@/lib/store";
import { MARKS, chapterOfQuestion } from "./QuestionCard";

const SRC: Record<AttemptSource, string> = { chapter: "장별 연습", review: "오답 노트", exam: "모의고사" };
const when = (iso: string) => new Date(iso).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
const pct = (ok: number, all: number) => (all ? Math.round((ok / all) * 100) : 0);
const marks = (sel: number[]) => (sel.length ? sel.map((i) => MARKS[i]).join(" ") : "무응답");

// 엑셀에서 한글이 깨지지 않도록 BOM을 붙인 CSV로 내려받는다. 파일은 이 기기에서만 만들어진다.
function downloadCsv(attempts: Attempt[], name: string) {
  const cell = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;
  const rows = [
    ["일시", "구분", "문항", "제목", "고른 답", "정답", "결과"],
    ...attempts.map((a) => {
      const q = questionByNo(a.no);
      return [new Date(a.at).toLocaleString("ko-KR"), SRC[a.src], a.no, q.title, marks(a.sel), marks(q.answer), a.ok ? "정답" : "오답"];
    }),
  ];
  const blob = new Blob(["﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `풀이기록_${name}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function HistoryView() {
  const { state, update, name, ready } = useStore();
  const { attempts, exams } = state;
  const okCount = attempts.filter((a) => a.ok).length;
  const days = new Set(attempts.map((a) => a.at.slice(0, 10))).size;

  const perQ = QUESTIONS.map((q) => {
    const list = attempts.filter((a) => a.no === q.no);
    return { q, list, ok: list.filter((a) => a.ok).length };
  });
  const perCh = CHAPTERS.map((c) => {
    const list = attempts.filter((a) => c.questions.includes(a.no));
    return { c, all: list.length, ok: list.filter((a) => a.ok).length };
  });
  const recent = [...attempts].reverse().slice(0, 50);

  if (!ready) return <section className="wrap section" />;

  return (
    <section className="wrap section">
      <div className="ch-panel" style={{ background: "#e8f0fe" }}>
        <span className="pill outline">HISTORY.</span>
        <h1>{name} 선생님의 풀이 기록</h1>
        <p style={{ marginTop: 12, maxWidth: 680 }}>
          장별 연습·오답 노트·모의고사에서 채점한 결과가 모두 시간순으로 남습니다. 오답 노트를 비워도 이 기록은 그대로입니다.
        </p>
        <div className="rail" aria-hidden><span /><span /><span /><span /></div>
        <div className="stat-row">
          <div><b>{attempts.length}</b><span>채점한 횟수</span></div>
          <div><b>{pct(okCount, attempts.length)}%</b><span>전체 정답률</span></div>
          <div><b>{exams.length}</b><span>모의고사 응시</span></div>
          <div><b>{days}</b><span>공부한 날</span></div>
        </div>
        <div className="q-actions">
          <button className="btn" type="button" disabled={!attempts.length} onClick={() => downloadCsv(attempts, name)}>엑셀(CSV)로 내려받기</button>
          <button className="btn ghost" type="button" disabled={!attempts.length && !exams.length} onClick={() => {
            if (window.confirm("풀이 기록과 모의고사 이력을 모두 지울까요? 되돌릴 수 없습니다. (오답 노트와 실습 진도는 그대로 남습니다)")) {
              update((s) => ({ ...s, attempts: [], exams: [] }));
            }
          }}>기록 지우기</button>
        </div>
        <p className="small muted" style={{ marginTop: 10 }}>기록은 이 브라우저에만 저장되며 서버로 보내지 않습니다. 다른 기기에서는 보이지 않으니 필요하면 CSV로 보관하세요.</p>
      </div>

      {attempts.length === 0 && exams.length === 0 ? (
        <p className="card" style={{ padding: 24, marginTop: 24 }}>
          아직 기록이 없습니다. 각 장의 STEP 4에서 문제를 풀거나 <Link href="/exam">모의고사</Link>를 보면 여기에 쌓입니다.
        </p>
      ) : (
        <>
          <div className="section-head" style={{ marginTop: 32 }}><h2>모의고사 이력</h2><span className="muted small">목표 {SITE.passPercent}%</span></div>
          {exams.length === 0 ? (
            <p className="card" style={{ padding: 20 }}>아직 모의고사를 보지 않았습니다. <Link href="/exam">모의고사 보러 가기 →</Link></p>
          ) : (
            <div className="card table-wrap">
              <table className="hist">
                <thead><tr><th>회차</th><th>일시</th><th>방식</th><th>점수</th><th style={{ width: "34%" }}>정답률</th></tr></thead>
                <tbody>
                  {[...exams].reverse().map((e, i) => {
                    const p = pct(e.score, e.total);
                    return (
                      <tr key={e.at + i}>
                        <td>{exams.length - i}회</td>
                        <td>{when(e.at)}</td>
                        <td>{e.mode === "exam" ? "실전" : "연습"}{e.total < QUESTIONS.length ? ` · ${e.total}문항` : ""}</td>
                        <td><b>{e.score}/{e.total}</b></td>
                        <td>
                          <div className="bar-row">
                            <div className="bar"><i style={{ width: `${p}%`, background: p >= SITE.passPercent ? "#34A853" : "#FBBC04" }} /></div>
                            <span>{p}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="section-head" style={{ marginTop: 32 }}><h2>장별 정답률</h2><span className="muted small">채점한 모든 시도 기준</span></div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {perCh.map(({ c, all, ok }) => (
              <Link key={c.id} href={`/ch/${c.id}`} className="card" style={{ padding: 16, color: "inherit" }}>
                <p style={{ fontWeight: 800 }}>{c.no}. {c.title}</p>
                <p className="small muted">{all ? `${ok}/${all}회 정답 · ${pct(ok, all)}%` : "아직 기록 없음"}</p>
                <div className="bar" style={{ marginTop: 8 }}><i style={{ width: `${pct(ok, all)}%` }} /></div>
              </Link>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: 32 }}><h2>문항별 기록</h2><span className="muted small">최근 5회: ○ 정답 · × 오답</span></div>
          <div className="card table-wrap">
            <table className="hist">
              <thead><tr><th>문항</th><th>제목</th><th>시도</th><th>정답률</th><th>최근 5회</th></tr></thead>
              <tbody>
                {perQ.map(({ q, list, ok }) => {
                  const ch = chapterOfQuestion(q.no);
                  return (
                    <tr key={q.no} className={list.length ? undefined : "dim"}>
                      <td>{q.no}</td>
                      <td>{ch ? <Link href={`/ch/${ch.id}#q-${q.no}`}>{q.title}</Link> : q.title}</td>
                      <td>{list.length}</td>
                      <td>{list.length ? `${pct(ok, list.length)}%` : "-"}</td>
                      <td className="ox">
                        {list.slice(-5).map((a, i) => <span key={i} className={a.ok ? "o" : "x"} title={when(a.at)}>{a.ok ? "○" : "×"}</span>)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {recent.length > 0 && (
            <>
              <div className="section-head" style={{ marginTop: 32 }}><h2>최근 풀이</h2><span className="muted small">최근 {recent.length}건 · 전체는 CSV로</span></div>
              <div className="card table-wrap">
                <table className="hist">
                  <thead><tr><th>일시</th><th>구분</th><th>문항</th><th>고른 답</th><th>결과</th></tr></thead>
                  <tbody>
                    {recent.map((a, i) => (
                      <tr key={a.at + a.no + i}>
                        <td>{when(a.at)}</td>
                        <td>{SRC[a.src]}</td>
                        <td>{a.no}. {questionByNo(a.no).title}</td>
                        <td>{marks(a.sel)}</td>
                        <td className="ox"><span className={a.ok ? "o" : "x"}>{a.ok ? "정답" : "오답"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
