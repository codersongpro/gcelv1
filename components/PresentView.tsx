"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TOOLS, cardById, imageOf, type Card } from "@/content/cards";
import { CHAPTERS, type Chapter } from "@/content/chapters";
import { DOMAINS, questionByNo, type Question } from "@/content/questions";
import { fill, useStore } from "@/lib/store";
import { MARKS, toggleSel } from "./QuestionCard";

// 발표 모드: 장 하나를 표지 → 상황 → 미션 → 실습 카드 → 문제 → 마무리 슬라이드로 크게 보여 준다.
// 조작: ←/→·스페이스·PageUp/Down 이동, Enter 정답 공개, F 전체 화면, Esc 나가기, 화면 밀기(스와이프).
// 발표 중 고른 보기는 연수생 풀이 기록에 남기지 않는다.

type Slide =
  | { kind: "cover"; id: string; label: string }
  | { kind: "story"; id: string; label: string }
  | { kind: "missions"; id: string; label: string }
  | { kind: "card"; id: string; label: string; card: Card; n: number }
  | { kind: "q"; id: string; label: string; q: Question; n: number }
  | { kind: "end"; id: string; label: string };

function buildSlides(ch: Chapter): Slide[] {
  return [
    { kind: "cover", id: "cover", label: "표지" },
    { kind: "story", id: "story", label: "오늘의 상황" },
    { kind: "missions", id: "missions", label: "실습 미션" },
    ...ch.cards.map((id, i) => ({ kind: "card" as const, id: `card-${id}`, label: `실습 ${i + 1}. ${cardById(id).title}`, card: cardById(id), n: i + 1 })),
    ...ch.questions.map((no, i) => ({ kind: "q" as const, id: `q-${no}`, label: `문제 ${i + 1}. ${questionByNo(no).title}`, q: questionByNo(no), n: i + 1 })),
    { kind: "end", id: "end", label: "마무리" },
  ];
}

export default function PresentView({ ch }: { ch: Chapter }) {
  const { name } = useStore();
  const slides = useMemo(() => buildSlides(ch), [ch]);
  const [cur, setCur] = useState(0);
  const [picked, setPicked] = useState<Record<number, number[]>>({});
  const [shown, setShown] = useState<Record<number, boolean>>({});
  const [zoom, setZoom] = useState(false);
  const [canFull, setCanFull] = useState(false);
  const touch = useRef<number | null>(null);
  const tool = TOOLS[ch.tools[0]];
  const next = CHAPTERS[CHAPTERS.findIndex((c) => c.id === ch.id) + 1];
  const s = slides[cur];

  // 주소의 #슬라이드 이름에서 시작한다(장 페이지의 "발표로 보기" 버튼이 사용).
  useEffect(() => {
    const jump = () => {
      const at = slides.findIndex((x) => x.id === decodeURIComponent(window.location.hash.slice(1)));
      if (at >= 0) setCur(at);
    };
    jump();
    setCanFull(!!document.documentElement.requestFullscreen);
    window.addEventListener("hashchange", jump);
    return () => window.removeEventListener("hashchange", jump);
  }, [slides]);

  useEffect(() => {
    window.history.replaceState(null, "", `#${s.id}`);
    setZoom(false);
  }, [s.id]);

  const go = useCallback((i: number) => setCur(Math.max(0, Math.min(slides.length - 1, i))), [slides.length]);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const reveal = useCallback(() => {
    if (s.kind === "q") setShown((m) => ({ ...m, [s.q.no]: !m[s.q.no] }));
  }, [s]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLSelectElement || e.altKey || e.ctrlKey || e.metaKey) return;
      const k = e.key;
      if (zoom && k === "Escape") { setZoom(false); return; }
      if (k === "ArrowRight" || k === "PageDown" || k === " ") go(cur + 1);
      else if (k === "ArrowLeft" || k === "PageUp") go(cur - 1);
      else if (k === "Home") go(0);
      else if (k === "End") go(slides.length - 1);
      else if (k === "Enter") reveal();
      else if (k === "f" || k === "F") toggleFull();
      else if (k === "Escape" && !document.fullscreenElement) window.location.href = `/ch/${ch.id}`;
      else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cur, go, reveal, toggleFull, zoom, slides.length, ch.id]);

  return (
    <div
      className="pv"
      style={{ ["--accent" as string]: tool.color, ["--tint" as string]: tool.tint }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 60) go(cur + (dx < 0 ? 1 : -1));
      }}
    >
      <header className="pv-top">
        <span className="pv-ch">{ch.no}. {ch.title}</span>
        <span className="pv-label">{s.label}</span>
      </header>

      <main className="pv-stage" key={s.id}>
        {s.kind === "cover" && (
          <div className="pv-cover">
            <span className="pill outline">{ch.no}.</span>
            <h1>{ch.title}</h1>
            <p className="pv-sub">🕘 {ch.day} · 약 {ch.minutes}분</p>
            <div className="pv-tools">
              {ch.tools.map((t) => <span key={t} className="chip" style={{ background: TOOLS[t].tint, color: TOOLS[t].color }}>{TOOLS[t].name}</span>)}
            </div>
            <p className="pv-sub">실습 카드 {ch.cards.length}장 · 시험 문제 {ch.questions.length}문항</p>
          </div>
        )}

        {s.kind === "story" && (
          <div className="pv-text">
            <p className="pv-kicker">STEP 1 · 오늘의 상황</p>
            {ch.story.map((p, i) => <p key={i} className="pv-para">{fill(p, name)}</p>)}
          </div>
        )}

        {s.kind === "missions" && (
          <div className="pv-text">
            <p className="pv-kicker">STEP 2 · 실습 미션</p>
            <ol className="pv-list">{ch.missions.map((m, i) => <li key={i}>{fill(m, name)}</li>)}</ol>
          </div>
        )}

        {s.kind === "card" && (
          <div className="pv-card">
            <button type="button" className="pv-shot" onClick={() => setZoom(true)} aria-label="화면 크게 보기">
              <img src={imageOf(s.card)} alt={`${s.card.title} 화면 예시`} />
            </button>
            <div className="pv-steps">
              <p className="pv-kicker">STEP 3 · 실습 {s.n}/{ch.cards.length} · {TOOLS[s.card.tool].name}</p>
              <h2>{s.card.title}</h2>
              <p className="pv-en">{s.card.en}</p>
              <ol className="pv-list">{s.card.steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
              {s.card.note && <p className="pv-note">💡 {s.card.note}</p>}
            </div>
          </div>
        )}

        {s.kind === "q" && (() => {
          const q = s.q;
          const sel = picked[q.no] ?? [];
          const open = !!shown[q.no];
          const ok = open && sel.length === q.answer.length && sel.every((x) => q.answer.includes(x));
          return (
            <div className="pv-q">
              <p className="pv-kicker">
                STEP 4 · 문제 {s.n}/{ch.questions.length} · 문항 {q.no} · {DOMAINS[q.domain].name}
                {q.answer.length > 1 && ` · ${q.answer.length}개 선택`}
              </p>
              <p className="pv-stem">{q.stem}</p>
              <div className="pv-opts">
                {q.options.map((text, i) => {
                  const cls = ["pv-opt", sel.includes(i) ? "on" : "", open && q.answer.includes(i) ? "right" : "", open && sel.includes(i) && !q.answer.includes(i) ? "wrong" : ""]
                    .filter(Boolean).join(" ");
                  return (
                    <button key={i} type="button" className={cls} disabled={open}
                      onClick={() => setPicked((m) => ({ ...m, [q.no]: toggleSel(q, sel, i) }))}>
                      <span className="mark">{MARKS[i]}</span><span>{text}</span>
                    </button>
                  );
                })}
              </div>
              <div className="pv-q-actions">
                <button type="button" className="btn" onClick={reveal}>{open ? "정답 가리기" : "정답 공개 (Enter)"}</button>
                {open && sel.length > 0 && <strong style={{ color: ok ? "#188038" : "#c5221f" }}>{ok ? "정답입니다!" : "다시 생각해 볼까요?"}</strong>}
              </div>
              {open && (
                <div className="pv-explain">
                  <strong>정답 {q.answer.map((i) => MARKS[i]).join(", ")}</strong> {q.explain}
                </div>
              )}
            </div>
          );
        })()}

        {s.kind === "end" && (
          <div className="pv-cover">
            <span className="pill outline">✓</span>
            <h1>{ch.no}장 마무리</h1>
            <p className="pv-sub">각자 장 페이지에서 문제를 다시 풀고 기록을 남겨 보세요.</p>
            <div className="pv-tools">
              <Link className="btn ghost" href={`/ch/${ch.id}`}>장 페이지로</Link>
              {next ? (
                <Link className="btn" href={`/ch/${next.id}/present`}>다음: {next.no}. {next.title} 발표 →</Link>
              ) : (
                <Link className="btn" href="/exam">최종 모의고사 →</Link>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="pv-bar">
        <Link className="pv-btn" href={`/ch/${ch.id}`} title="나가기 (Esc)">✕ <span className="hide-sm">나가기</span></Link>
        <button type="button" className="pv-btn" onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="이전 슬라이드">←</button>
        <select className="pv-jump" value={cur} onChange={(e) => go(Number(e.target.value))} aria-label="슬라이드 바로 가기">
          {slides.map((x, i) => <option key={x.id} value={i}>{i + 1}. {x.label}</option>)}
        </select>
        <span className="pv-count">{cur + 1} / {slides.length}</span>
        <button type="button" className="pv-btn" onClick={() => go(cur + 1)} disabled={cur === slides.length - 1} aria-label="다음 슬라이드">→</button>
        {canFull && <button type="button" className="pv-btn" onClick={toggleFull} title="전체 화면 (F)">⛶ <span className="hide-sm">전체 화면</span></button>}
        <div className="pv-progress" aria-hidden><i style={{ width: `${((cur + 1) / slides.length) * 100}%` }} /></div>
      </footer>

      {zoom && s.kind === "card" && (
        <div className="pv-zoom" onClick={() => setZoom(false)} role="dialog" aria-label="화면 확대">
          <img src={imageOf(s.card)} alt={`${s.card.title} 화면 예시 확대`} />
          <span>아무 곳이나 누르거나 Esc를 누르면 닫힙니다</span>
        </div>
      )}
    </div>
  );
}
