# 구글 인증 교육자 Level 1 부트캠프

초·중·고 교사를 위한 웹 코스웨어입니다. "송프로 선생님의 새 학기 첫 주" 시나리오를 따라가며 Google 도구를 **직접 실습**하고, 실습한 기능이 나오는 **시험 문제를 바로 풀어 봅니다.**

- 8개 장 (Gmail·Calendar → Drive·Sheets → Docs → Slides·Sites → Classroom·Forms → Meet → Chat → 접근성)
- 장마다 진행 순서: 오늘의 상황 → 실습 미션 → 실습 카드(단계 안내와 실제 화면) → 시험 문제 풀기
- 실습 카드 65장: Google Level 1 Task Cards(2025-08-07)의 스크린샷 포함
- 퀴즈 A 37문항: 장별 연습, 최종 모의고사(연습/실전 모드, 타이머), 오답 노트
- 마지막 페이지에서 실제 시험 사이트(https://educertifications.google/)로 연결
- 강사 모드: 장별 진행 메모와 권장 시간 표시
- 진도와 답안은 브라우저(localStorage)에만 저장하며 서버로 보내지 않음

## 연수 전에 바꾸기 쉬운 값: `site.config.json`

```json
{
  "teacherName": "송프로",
  "courseTitle": "구글 인증 교육자 Level 1 부트캠프",
  "examMinutes": 45,
  "passPercent": 80,
  "certificationUrl": "https://educertifications.google/",
  "author": { "name": "송동석(Dustin)", "role": "Teacher / App developer / Data analyst", "contact": "dungst.me@gmail.com", "year": "2026" }
}
```

- `teacherName`: 이야기 주인공 기본 이름. 고쳐서 커밋하면 Vercel이 다시 배포합니다. 연수생은 처음 접속할 때 나오는 시작 화면에서 자기 이름을 넣을 수 있고(비워 두면 기본 이름), 홈의 "이야기 주인공 정하기"에서 다시 바꿀 수 있습니다. 이름은 각자 브라우저에만 저장됩니다.
- `examMinutes`: 모의고사 실전 모드 제한 시간(37문항 기준)
- `passPercent`: 모의고사 결과의 목표 점수(연습 기준)

## Vercel 배포 (연수 참여자 전용)

1. Vercel에서 **Add New → Project**로 이 GitHub 저장소를 가져옵니다. Framework는 Next.js로 자동 인식됩니다.
2. **Settings → Environment Variables**에 `SITE_PASSWORD`를 추가합니다(연수생에게 알려 줄 비밀번호).
3. 배포합니다. 접속하면 비밀번호 입력 화면이 나오고, 맞게 입력하면 30일간 유지됩니다.

- `SITE_PASSWORD`가 없으면 사이트가 열리지 않고 설정 안내만 표시됩니다(실수로 공개되지 않도록).
- 비밀번호를 바꾸고 다시 배포하면 기존 접속자도 다시 입력해야 합니다.
- 모든 페이지에 `noindex` 설정과 `robots.txt` 차단이 들어 있어 검색에 노출되지 않습니다.

## 로컬 실행

```bash
npm install
npm run dev          # http://localhost:3000 (개발 모드는 비밀번호 없이 열림)
SITE_PASSWORD=1234 npm run build && SITE_PASSWORD=1234 npm start   # 운영과 같은 조건
```

## 콘텐츠 고치기

| 파일 | 내용 |
|---|---|
| `content/chapters.ts` | 장별 상황 이야기(`{T}` = 주인공 이름), 실습 미션, 카드·문항 배치, 강사 메모 |
| `content/cards.ts` | 실습 카드 65장(한국어 단계, 원본 쪽수) |
| `content/questions.ts` | 37문항, 정답, 해설, 시험 영역, 관련 카드 |
| `public/images/cards/` | 카드 스크린샷 (`python3 scripts/extract_screenshots.py`로 원본 PDF에서 다시 추출) |
| `source/` | 원본 자료(퀴즈 A 마크다운, Task Cards PDF) |

## 출처와 이용

Developed by 송동석(Dustin) · Teacher / App developer / Data analyst · 문의 dungst.me@gmail.com

개인이 만들어 나누는 연수 자료이며 Google이 공식으로 배포하는 자료가 아닙니다. 실습 카드의 화면 이미지는 Google Certified Educator Level 1 Task Cards(2025-08-07)에서 가져왔고 권리는 Google에 있습니다. Google 및 관련 제품명은 Google LLC의 상표입니다.
