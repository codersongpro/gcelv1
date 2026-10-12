"use client";

import { useState } from "react";

export default function LoginForm({ next }: { next: string }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
    if (res.ok && data.ok) {
      window.location.href = next.startsWith("/") && !next.startsWith("//") ? next : "/";
      return;
    }
    setError(data.message ?? "로그인하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <div className="field">
        <label htmlFor="pw" style={{ fontWeight: 700 }}>연수 접속 비밀번호</label>
        <input id="pw" name="password" type="password" autoComplete="current-password" required autoFocus />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={busy} style={{ width: "100%", marginTop: 18 }}>
        {busy ? "확인 중…" : "입장하기"}
      </button>
    </form>
  );
}
