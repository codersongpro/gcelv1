"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { useStore } from "@/lib/store";

function NameDialog({ dialogRef, welcome }: { dialogRef: React.RefObject<HTMLDialogElement | null>; welcome?: boolean }) {
  const { state, update } = useStore();
  const [draft, setDraft] = useState("");

  useEffect(() => setDraft(state.teacherName ?? ""), [state.teacherName]);

  function save(value: string | null) {
    update((s) => ({ ...s, teacherName: value?.trim() || null, onboarded: true }));
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="name-dialog"
      onCancel={(e) => { if (welcome) { e.preventDefault(); save(draft); } }}
      onClick={(e) => !welcome && e.target === dialogRef.current && dialogRef.current?.close()}
    >
      <form onSubmit={(e) => { e.preventDefault(); save(draft); }}>
        {welcome && <span className="pill check">시작하기</span>}
        <h3 style={{ marginTop: welcome ? 12 : 0 }}>{welcome ? "이야기 주인공의 이름을 정해 주세요" : "이야기 주인공 이름"}</h3>
        <p className="small muted" style={{ marginTop: 6 }}>
          이 연수는 한 선생님의 새 학기 첫 주를 따라갑니다. 내 이름을 넣으면 내 이야기처럼 읽힙니다.
          비워 두면 기본 이름({SITE.teacherName})으로 진행합니다. 이름은 이 브라우저에만 저장됩니다.
        </p>
        <div className="field">
          <label htmlFor="name-input" className="small" style={{ fontWeight: 700 }}>이름</label>
          <input id="name-input" value={draft} maxLength={12} placeholder={SITE.teacherName}
            onChange={(e) => setDraft(e.target.value)} autoFocus />
        </div>
        <p className="small" style={{ marginTop: 8 }}>미리 보기: <strong>{draft.trim() || SITE.teacherName} 선생님</strong>의 새 학기 첫 주</p>
        <div className="q-actions" style={{ justifyContent: "flex-end" }}>
          {!welcome && <button className="btn ghost" type="button" onClick={() => save(null)}>기본값으로</button>}
          {!welcome && <button className="btn ghost" type="button" onClick={() => dialogRef.current?.close()}>취소</button>}
          <button className="btn" type="submit">{welcome ? "이 이름으로 시작하기" : "저장"}</button>
        </div>
      </form>
    </dialog>
  );
}

// 처음 접속했을 때 한 번 이름을 묻는다.
export function WelcomeName() {
  const { state, ready } = useStore();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (ready && !state.onboarded && !ref.current?.open) ref.current?.showModal();
  }, [ready, state.onboarded]);
  return <NameDialog dialogRef={ref} welcome />;
}

// 홈 화면에서 이름을 다시 바꾸는 버튼
export default function NameEditor() {
  const { name } = useStore();
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="toggle name-btn" onClick={() => ref.current?.showModal()}>✎ {name} 선생님</button>
      <NameDialog dialogRef={ref} />
    </>
  );
}
