"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SITE } from "@/lib/site";

// 진도·답안·설정은 이 브라우저(localStorage)에만 저장한다. 서버로 보내지 않는다.
const KEY = "gce-l1-bootcamp:v1";

export type Answer = { sel: number[]; ok: boolean };
export type ExamResult = { at: string; mode: "practice" | "exam"; score: number; total: number; wrong: number[] };

type State = {
  teacherName: string | null;
  onboarded: boolean;
  instructor: boolean;
  cards: Record<string, boolean>;
  missions: Record<string, boolean>;
  answers: Record<number, Answer>;
  exam: ExamResult | null;
};

const EMPTY: State = { teacherName: null, onboarded: false, instructor: false, cards: {}, missions: {}, answers: {}, exam: null };

function load(): State {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

type Ctx = {
  state: State;
  ready: boolean;
  name: string;
  update: (fn: (s: State) => State) => void;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  const update = useCallback((fn: (s: State) => State) => {
    setState((prev) => {
      const next = fn(prev);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* 저장할 수 없는 환경(사생활 보호 모드 등)에서는 화면 상태만 유지한다 */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ state, ready, update, name: state.teacherName?.trim() || SITE.teacherName }),
    [state, ready, update],
  );
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("StoreProvider가 필요합니다.");
  return ctx;
}

// 본문의 {T}를 주인공 이름으로 바꾼다. 본문은 항상 "{T} 선생님" 형태로 써서 조사가 이름 받침과 무관하게 맞는다.
export function fill(text: string, name: string) {
  return text.replaceAll("{T}", name);
}

export function Named({ text }: { text: string }) {
  const { name } = useStore();
  return <>{fill(text, name)}</>;
}
