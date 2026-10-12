"use client";

import Link from "next/link";
import { useState } from "react";
import { cardById } from "@/content/cards";
import { CHAPTERS } from "@/content/chapters";
import { DOMAINS, type Question } from "@/content/questions";
import { useStore } from "@/lib/store";

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

// 연습용 문항: 고르고 채점하면 바로 해설과 관련 실습 카드를 보여 준다. 결과는 오답 노트에 쓰인다.
export default function QuestionCard({ q }: { q: Question }) {
  const { state, update } = useStore();
  const saved = state.answers[q.no];
  const [sel, setSel] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const multi = q.answer.length > 1;
  const ok = sameSet(sel, q.answer);
  const d = DOMAINS[q.domain];

  function grade() {
    setChecked(true);
    update((s) => ({ ...s, answers: { ...s.answers, [q.no]: { sel, ok: sameSet(sel, q.answer) } } }));
  }

  return (
    <article className="card q" id={`q-${q.no}`}>
      <div className="q-top">
        <span className="q-no">문항 {q.no}</span>
        <span className="chip" style={{ background: "#f1f3f4", color: d.color }}>{d.no} {d.name}</span>
        {multi && <span className="chip" style={{ background: "#fef7e0", color: "#7a4f01" }}>{q.answer.length}개 선택</span>}
        {saved && !checked && (
          <span className="chip" style={{ background: saved.ok ? "#e6f4ea" : "#fce8e6", color: saved.ok ? "#188038" : "#c5221f" }}>
            지난 풀이 {saved.ok ? "정답" : "오답"}
          </span>
        )}
      </div>
      <p className="q-stem">{q.stem}</p>
      <Options q={q} sel={sel} onToggle={(i) => setSel(toggleSel(q, sel, i))} reveal={checked} />
      <div className="q-actions">
        {!checked ? (
          <button className="btn" type="button" disabled={multi ? sel.length !== q.answer.length : sel.length === 0} onClick={grade}>
            채점하기
          </button>
        ) : (
          <button className="btn ghost" type="button" onClick={() => { setSel([]); setChecked(false); }}>다시 풀기</button>
        )}
        {multi && !checked && <span className="small muted">{q.answer.length}개를 고르면 채점할 수 있습니다.</span>}
      </div>
      {checked && (
        <div className={`feedback ${ok ? "ok" : "no"}`} role="status">
          <strong>{ok ? "정답입니다!" : `오답입니다. 정답은 ${q.answer.map((i) => MARKS[i]).join(", ")}`}</strong>
          {q.explain}
          <Refs q={q} />
        </div>
      )}
    </article>
  );
}
