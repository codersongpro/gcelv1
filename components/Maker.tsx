import { SITE } from "@/lib/site";

// 만든 사람 소개 (신통픽과 같은 형식)
export default function Maker() {
  const { author } = SITE;
  return (
    <section className="wrap section" id="developer">
      <div className="section-head"><span className="step-no">개발자</span><h2>만든 사람</h2></div>
      <div className="card maker-card">
        <div className="avatar" aria-hidden>{author.name.slice(0, 1)}</div>
        <div>
          <p className="dev-name">{author.name}</p>
          <p className="muted small">{author.role}</p>
          <dl className="dev-meta">
            <dt>문의</dt>
            <dd><a href={`mailto:${author.contact}`}>{author.contact}</a></dd>
            <dt>이용</dt>
            <dd>연수 참여자 전용 · 무료</dd>
          </dl>
          <p className="small muted" style={{ marginTop: 10 }}>
            개인이 만들어 나누는 연수 자료입니다. Google이 공식으로 배포하는 자료는 아닙니다.
            진도와 답안은 이 브라우저 안에서만 다루고 어디로도 보내지 않습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
