"use client";

import Link from "next/link";
import { useState } from "react";
import { cardById } from "@/content/cards";
import { CHAPTERS } from "@/content/chapters";
import { DOMAINS, type Question } from "@/content/questions";
import { recordAttempts, useStore, type AttemptSource } from "@/lib/store";

export const MARKS = ["①", "②", "③", "④", "⑤"];

export const sameSet = (a: number[], b: number[]) => a.length === b.length && a.every((x) => b.includes(x));

export function chapterOfCard(cardId: string) {
  return CHAPTERS.find((c) => c.cards.includes(cardId));
}

export function chapterOfQuestion(no: number) {
  return CHAPTERS.find((c) => c.questions.includes(no));
}

export function Refs({ q }: { q: Question }) {
  return (
    <div className="refs">
      {q.cards.map((id) => {
        const ch = chapterOfCard(id);
        return ch ? (
          <Link key={id} href={`/ch/${ch.id}#card-${id}`}>실습 카드: {cardById(id).title} →</Link>
        ) : null;
      })}
    </div>
  );
}

export function Options({ q, sel, onToggle, reveal, disabled }: {
  q: Question; sel: number[]; onToggle: (i: number) => void; reveal: boolean; disabled?: boolean;
}) {
  const multi = q.answer.length > 1;
  return (
    <div className="opts" role={multi ? "group" : "radiogroup"}>
      {q.options.map((text, i) => {
        const picked = sel.includes(i);
        const cls = ["opt", multi ? "multi" : "", reveal && q.answer.includes(i) ? "right" : "", reveal && picked && !q.answer.includes(i) ? "wrong" : ""]
          .filter(Boolean).join(" ");
        return (
          <button key={i} type="button" className={cls} aria-pressed={picked} disabled={disabled || reveal} onClick={() => onToggle(i)}>
            <span className="mark">{MARKS[i]}</span>
            <span>{text}</span>
          </button>
        );
      })}
    </div>
  );
}

export function toggleSel(q: Question, sel: number[], i: number) {
  if (q.answer.length > 1) return sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i];
  return [i];
}

const when = (iso: string) => new Date(iso).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });

// 연습용 문항: 고르고 채점하면 바로 해설과 관련 실습 카드를 보여 준다.
// 마지막으로 고른 보기는 다시 들어와도 그대로 보이고, 지난 시도(틀린 것 포함)는 문항 아래에 남는다.
export default function QuestionCard({ q, src = "chapter" }: { q: Question; src?: AttemptSource }) {
  const { state, update } = useStore();
  const saved = state.answers[q.no];
  const tries = state.attempts.filter((a) => a.no === q.no);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<number[]>([]);
  const checked = !!saved && !editing;
  const sel = checked ? saved.sel : draft;
  const multi = q.answer.length > 1;
  const ok = sameSet(sel, q.answer);
  const wrongTries = tries.filter((a) => !a.ok).length;
  const d = DOMAINS[q.domain];

  function grade() {
    update((s) => recordAttempts(s, [{ no: q.no, sel: draft, ok: sameSet(draft, q.answer) }], src));
    setEditing(false);
  }

  return (
    <article className="card q" id={`q-${q.no}`}>
      <div className="q-top">
        <span className="q-no">문항 {q.no}</span>
        <span className="chip" style={{ background: "#f1f3f4", color: d.color }}>{d.no} {d.name}</span>
        {multi && <span className="chip" style={{ background: "#fef7e0", color: "#7a4f01" }}>{q.answer.length}개 선택</span>}
        {wrongTries > 0 && (
          <span className="chip" style={{ background: "#fce8e6", color: "#c5221f" }}>틀린 적 {wrongTries}번</span>
        )}
      </div>
      <p className="q-stem">{q.stem}</p>
      <Options q={q} sel={sel} onToggle={(i) => setDraft(toggleSel(q, draft, i))} reveal={checked} />
      <div className="q-actions">
        {!checked ? (
          <>
            <button className="btn" type="button" disabled={multi ? draft.length !== q.answer.length : draft.length === 0} onClick={grade}>
              채점하기
            </button>
            {saved && <button className="btn ghost" type="button" onClick={() => setEditing(false)}>취소</button>}
          </>
        ) : (
          <button className="btn ghost" type="button" onClick={() => { setDraft([]); setEditing(true); }}>다시 풀기</button>
        )}
        {multi && !checked && <span className="small muted">{q.answer.length}개를 고르면 채점할 수 있습니다.</span>}
      </div>
      {checked && (
        <div className={`feedback ${ok ? "ok" : "no"}`} role="status">
          <strong>
            {ok ? "정답입니다!" : `오답입니다. 고른 답 ${sel.length ? sel.map((i) => MARKS[i]).join(", ") : "없음"} · 정답 ${q.answer.map((i) => MARKS[i]).join(", ")}`}
          </strong>
          {q.explain}
          <Refs q={q} />
        </div>
      )}
      {tries.length > 0 && (
        <details className="tries">
          <summary>내 풀이 기록 {tries.length}회 (정답 {tries.length - wrongTries} · 오답 {wrongTries})</summary>
          <ol>
            {[...tries].reverse().map((a, i) => (
              <li key={a.at + i} className={a.ok ? "o" : "x"}>
                <b>{a.ok ? "○ 정답" : "× 오답"}</b>
                <span>고른 답 {a.sel.length ? a.sel.map((n) => MARKS[n]).join(", ") : "없음"}</span>
                <span className="muted">{when(a.at)}</span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </article>
  );
}
