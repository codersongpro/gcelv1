import { SITE } from "@/lib/site";

export default function Footer() {
  const { author } = SITE;
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          <span className="maker">{SITE.courseTitle}</span>
          {" · "}Developed by {author.name}{" · "}{author.role}
          {" · "}문의 <a href={`mailto:${author.contact}`}>{author.contact}</a>
          {" · "}© {author.year}
        </p>
        <p>
          연수 참여자 전용 비공식 학습 자료입니다. Google이 공식으로 배포하는 자료는 아닙니다. 실습 카드의 단계와 화면은
          Google Certified Educator Level 1 Task Cards(2025년 8월 7일판)를 바탕으로 재구성했고, 화면 이미지의 권리는 Google에 있습니다.
          Google 및 관련 제품명은 Google LLC의 상표입니다.
        </p>
        <p>
          실제 시험 응시:{" "}
          <a href={SITE.certificationUrl} target="_blank" rel="noreferrer">{SITE.certificationUrl}</a>
        </p>
      </div>
    </footer>
  );
}
