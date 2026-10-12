"use client";

import { CARDS } from "@/content/cards";
import { CHAPTERS } from "@/content/chapters";
import { QUESTIONS } from "@/content/questions";
import { SITE } from "@/lib/site";
import { useStore } from "@/lib/store";
import Maker from "./Maker";

const BEFORE = [
  "오답 노트의 문항을 모두 다시 맞혔나요?",
  "모의고사 실전 모드에서 목표 점수를 넘었나요?",
  "각 장의 실습 미션을 내 계정에서 직접 해 보았나요? 실제 시험에는 화면에서 직접 수행하는 과제도 나옵니다.",
  "시험 시간 동안 방해받지 않는 장소와 안정적인 인터넷, 웹캠이 있는 컴퓨터를 준비했나요?",
  "응시 비용, 시험 시간, 언어, 합격 기준 같은 최신 정보는 공식 사이트에서 확인했나요?",
];

export default function FinishView() {
  const { state, name } = useStore();
  const cardsDone = CARDS.filter((c) => state.cards[c.id]).length;
  const missionsTotal = CHAPTERS.reduce((n, c) => n + c.missions.length, 0);
  const missionsDone = Object.values(state.missions).filter(Boolean).length;
  const correct = QUESTIONS.filter((q) => state.answers[q.no]?.ok).length;

  return (
    <>
    <section className="wrap section">
      <div className="card finish-hero">
        <span className="pill check">수고하셨습니다</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, marginTop: 16 }}>{name} 선생님의 새 학기 첫 주, 완주!</h1>
        <p className="muted" style={{ marginTop: 10 }}>이제 실제 구글 인증 교육자 Level 1 시험에 도전할 차례입니다.</p>
        <div className="grid three" style={{ marginTop: 26, textAlign: "left" }}>
          <div className="card" style={{ padding: 16 }}><p className="small muted">실습 미션</p><p className="score">{missionsDone}<span style={{ fontSize: 20 }}>/{missionsTotal}</span></p></div>
          <div className="card" style={{ padding: 16 }}><p className="small muted">실습 카드</p><p className="score">{cardsDone}<span style={{ fontSize: 20 }}>/{CARDS.length}</span></p></div>
          <div className="card" style={{ padding: 16 }}><p className="small muted">맞힌 문항</p><p className="score">{correct}<span style={{ fontSize: 20 }}>/{QUESTIONS.length}</span></p></div>
        </div>
        <a className="big-link" href={SITE.certificationUrl} target="_blank" rel="noreferrer">
          구글 인증 교육자 시험 응시하러 가기 →
          <small>{SITE.certificationUrl}</small>
        </a>
      </div>

      <div className="section-head" style={{ marginTop: 32 }}><h2>응시 전 마지막 점검</h2></div>
      <div className="checklist">
        <span className="pill check">Before the exam</span>
        <ol style={{ paddingLeft: 4 }}>
          {BEFORE.map((b, i) => <li key={i} className="check-row" style={{ cursor: "default" }}><span aria-hidden>☐</span><span>{b}</span></li>)}
        </ol>
      </div>
    </section>
    <Maker />
    </>
  );
}
