"use client";

import { useRef } from "react";
import { TOOLS, imageOf, type Card } from "@/content/cards";
import { useStore } from "@/lib/store";

export default function TaskCard({ card, index }: { card: Card; index: number }) {
  const { state, update } = useStore();
  const dialog = useRef<HTMLDialogElement>(null);
  const tool = TOOLS[card.tool];
  const done = !!state.cards[card.id];
  const src = imageOf(card);

  return (
    <article className="card task" id={`card-${card.id}`}>
      <div className="task-head" style={{ background: tool.tint }}>
        <span className="chip" style={{ background: "#fff", color: tool.color }}>{tool.name} · 실습 {index}</span>
        <h3 style={{ marginTop: 10 }}>{card.title}</h3>
        <p className="en">{card.en}</p>
      </div>
      <div className="task-body" style={{ paddingTop: 16 }}>
        <button type="button" className="shot" onClick={() => dialog.current?.showModal()} aria-label={`${card.title} 화면 크게 보기`}>
          <img src={src} alt={`${card.title} 화면 예시`} loading="lazy" />
          <span className="zoom">크게 보기</span>
        </button>
        <ol>{card.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        {card.note && <p className="task-note">💡 {card.note}</p>}
      </div>
      <div className="task-foot">
        <span className="small muted">원본 Task Cards {card.page}쪽</span>
        <button
          type="button"
          className="done-btn"
          aria-pressed={done}
          onClick={() => update((s) => ({ ...s, cards: { ...s.cards, [card.id]: !done } }))}
        >
          {done ? "✓ 실습 완료" : "실습 완료 표시"}
        </button>
      </div>
      <dialog ref={dialog} className="lightbox" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className="lightbox-inner">
          <img src={src} alt={`${card.title} 화면 예시 확대`} />
          <div className="lightbox-bar">
            <strong>{card.title}</strong>
            <button type="button" className="btn ghost" onClick={() => dialog.current?.close()}>닫기</button>
          </div>
        </div>
      </dialog>
    </article>
  );
}
