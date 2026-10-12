export const AUTH_COOKIE = "gce_auth";

// 비밀번호 원문 대신 해시를 쿠키에 담는다. Edge(middleware)와 Node(route) 양쪽에서 동작한다.
export async function tokenFor(password: string) {
  const data = new TextEncoder().encode(`gce-l1:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
