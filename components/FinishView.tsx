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
  "크롬 시크릿 창에서 시험용 계정으로 로그인하고, 계정 언어를 한국어로 바꿨나요?",
  "시험 시간 동안 방해받지 않는 장소와 안정적인 인터넷, 웹캠이 있는 컴퓨터를 준비했나요?",
  "응시 비용, 시험 시간, 언어, 합격 기준 같은 최신 정보는 공식 사이트에서 확인했나요?",
];

const TIPS = [
  {
    no: "TIP 1",
    title: "크롬 시크릿 창을 열고 시험용 가상 계정으로 로그인하기",
    keys: [["Ctrl", "Shift", "N"], ["⌘", "Shift", "N"]],
    keyNote: ["Windows·Chromebook", "Mac"],
    why: "평소 쓰는 개인·학교 계정이 이미 로그인되어 있으면 실기 과제를 다른 계정에서 하거나, 파일이 엉뚱한 Drive에 저장될 수 있습니다. 시크릿 창은 로그인 기록이 없는 깨끗한 창이라 시험 계정만 쓰게 됩니다.",
    steps: [
      "크롬에서 단축키를 눌러 시크릿 창을 엽니다. 메뉴로는 오른쪽 위 ⋮ > 새 시크릿 창입니다.",
      "시험 화면이 안내하는 가상(시험용) 계정의 아이디와 비밀번호로 로그인합니다.",
      "실기 과제는 모두 이 시크릿 창 안에서 진행하고, 다른 창의 계정으로 작업하지 않습니다.",
    ],
  },
  {
    no: "TIP 2",
    title: "구글 계정 언어(Language)를 한국어(Korean)로 바꾸기",
    why: "시험용 계정은 영어로 설정되어 있을 수 있습니다. 이 연수의 실습 카드와 문항은 한국어 메뉴 이름을 기준으로 하므로, 언어를 한국어로 맞추면 메뉴를 훨씬 빨리 찾을 수 있습니다.",
    steps: [
      "시크릿 창에서 시험 계정으로 로그인한 상태로 myaccount.google.com에 접속합니다.",
      "Personal info(개인 정보) > General preferences for the web > Language를 누릅니다.",
      "연필 아이콘을 눌러 한국어(Korean)를 찾아 고르고 Select(선택)를 누릅니다.",
      "이미 열어 둔 Gmail, Drive, Classroom 탭은 새로고침해야 한국어로 바뀝니다.",
    ],
  },
];

function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="keys">
      {keys.map((k, i) => (
        <span key={i}>{i > 0 && <span className="plus">+</span>}<kbd>{k}</kbd></span>
      ))}
    </span>
  );
}

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

      <div className="section-head" style={{ marginTop: 32 }}><span className="step-no">TIPS</span><h2>시험 볼 때 팁</h2></div>
      <div className="grid two">
        {TIPS.map((t) => (
          <article key={t.no} className="card tip">
            <span className="pill check">{t.no}</span>
            <h3>{t.title}</h3>
            {t.keys && (
              <div className="tip-keys">
                {t.keys.map((k, i) => (
                  <div key={i}><Keys keys={k} /><span className="small muted">{t.keyNote?.[i]}</span></div>
                ))}
              </div>
            )}
            <ol>{t.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
            <p className="task-note">💡 {t.why}</p>
          </article>
        ))}
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
