// 시나리오: "{T} 선생님의 새 학기 첫 주"
// {T}는 주인공 이름으로 바뀐다(site.config.json의 teacherName 또는 홈 화면 입력값).

import type { ToolId } from "./cards";

export type Chapter = {
  id: string;
  no: string;
  day: string;
  title: string;
  subtitle: string;
  tools: ToolId[];
  minutes: number;
  story: string[];
  missions: string[];
  cards: string[];
  questions: number[];
  facilitator: string[];
};

export const CHAPTERS: Chapter[] = [
  {
    id: "1", no: "01", day: "월요일 아침 8:10", title: "메일함과 한 주 일정 정리", subtitle: "Gmail · Calendar",
    tools: ["gmail", "calendar"], minutes: 50,
    story: [
      "새 학기 첫 월요일, {T} 선생님이 교무실에 들어서자 받은편지함에 읽지 않은 메일 47통이 쌓여 있습니다.",
      "연구부장님은 같은 주제로 벌써 메일을 다섯 번 보냈고, 학부모 총회 안내는 금요일까지 답해야 합니다. 이번 주에는 동료 연수, 학부모 상담, 프로젝트 마감까지 일정이 빽빽합니다.",
      "오늘 아침 목표는 메일함을 정리하고, 한 주 일정을 캘린더에 모두 넣는 것입니다.",
    ],
    missions: [
      "연구부장님(가상의 동료 주소)이 보낸 메일만 from: 연산자로 검색해 보세요.",
      "금요일까지 답해야 하는 메일 하나에 다시 알림을 금요일 오전 8시로 설정하세요.",
      "대화형식 보기를 켜고, 같은 제목의 메일이 묶여 보이는지 확인하세요.",
      "특정 보낸사람의 메일에 '연구부' 라벨이 자동으로 붙는 필터를 만드세요.",
      "'교과협의회' 일정을 만들고 Meet 링크, 회의 문서 첨부, 10분 전 알림, 게스트 초대 허용을 모두 넣으세요.",
      "'학교 행사(학부모용)' 새 캘린더를 만들고, 개인 캘린더와 구분해 보세요.",
      "학부모 상담용 약속 일정과 '과학 프로젝트 마감' 일정을 만드세요.",
    ],
    cards: ["gmail-search", "gmail-snooze", "gmail-conversation", "gmail-filter", "gmail-priority", "gmail-compose",
      "cal-attach", "cal-meet", "cal-reminder", "cal-guests", "cal-new", "cal-due", "cal-appointment", "cal-tasks"],
    questions: [6, 14, 30, 7, 12, 16, 25, 28],
    facilitator: [
      "시작 전에 연수생끼리 짝을 지어 서로에게 메일 2~3통을 보내게 하면 검색·필터 실습이 살아납니다.",
      "16번(공개 캘린더)은 '구독'과 헷갈리기 쉽습니다. '내 것을 새로 만든다 vs 남의 것을 가져온다'로 구분해 주세요.",
      "권장 시간: 실습 30분, 문제 풀이와 해설 20분.",
    ],
  },
  {
    id: "2", no: "02", day: "월요일 오후 3:30", title: "자료실 대청소", subtitle: "Drive · Sheets",
    tools: ["drive", "sheets"], minutes: 40,
    story: [
      "수업이 끝나자 {T} 선생님은 USB와 바탕화면에 흩어진 작년 자료를 Drive로 옮기기로 합니다.",
      "한글 파일, 워드 문서, PPT, 사진이 뒤섞여 있고, 수학 시험 정답지는 어디 있는지 매번 찾느라 시간이 걸립니다.",
      "동학년 선생님들과는 교과 진도표를 함께 써야 하고, 월말에는 예산 파일도 제출해야 합니다.",
    ],
    missions: [
      "'2026 새 학기' 폴더를 만들고 그 안에 '평가', '워크시트', '수업자료' 폴더를 만드세요.",
      "'평가' 폴더를 빨간색으로 바꿔 한눈에 구분되게 하세요.",
      "Drive 설정에서 업로드 변환을 켜고 .docx나 .pptx 파일 하나를 올려 Google 형식으로 바뀌는지 확인하세요.",
      "파일 하나를 끌어서 다른 폴더로 옮기세요.",
      "'동학년 공유' 폴더를 만들어 짝에게 편집자로 공유하고, 파일을 넣어 권한이 이어지는지 확인하세요.",
      "Sheets로 진도표를 만들어 짝과 동시에 입력해 보세요.",
    ],
    cards: ["drive-folder-color", "drive-convert", "drive-drag", "drive-shared-folder", "sheets-collab", "sheets-owner"],
    questions: [5, 8, 18, 29, 32, 31, 26],
    facilitator: [
      "업로드 변환은 이미 올린 파일에는 적용되지 않는다는 점을 짚어 주세요.",
      "26번은 '수정 못 하게'라는 조건에서 뷰어가 정답입니다. 댓글 작성자와 비교해 주세요.",
    ],
  },
  {
    id: "3", no: "03", day: "화요일 1교시 공강", title: "가정통신문 만들기", subtitle: "Docs",
    tools: ["docs"], minutes: 55,
    story: [
      "화요일 공강 시간, {T} 선생님은 학급 첫 가정통신문을 씁니다. 첫날 찍은 학급 단체 사진도 넣고 싶습니다.",
      "우리 반에는 베트남어와 중국어를 쓰는 보호자가 있어서 번역본이 필요합니다.",
      "초안은 학년부장님께 의견을 받고, 일부 문단은 동료 선생님이 다시 써 주기로 했습니다. 그런데 공동 문서에서 누군가 작업한 내용이 사라졌다는 연락이 옵니다.",
    ],
    missions: [
      "새 문서 '3월 가정통신문'을 만들고 웹캠으로 사진을 찍어 넣으세요.",
      "짝을 댓글 작성자로 초대하고, 짝은 제안 모드로 문장 하나를 고쳐 보세요.",
      "다른 짝을 편집자로 초대해 문단 하나를 다시 쓰게 하세요.",
      "문서 번역으로 베트남어 사본을 만드세요.",
      "버전 기록에서 지워진 문장을 찾아 복사해 현재 문서에 붙여 넣으세요.",
      "공유 설정에서 편집자가 권한을 바꾸지 못하게, 뷰어가 다운로드하지 못하게 바꾸세요.",
      "URL 끝을 /copy로 바꾼 사본 만들기 링크를 만들고, 스크린 리더 지원을 켜 보세요.",
    ],
    cards: ["docs-new", "docs-camera", "docs-share", "docs-suggest", "docs-comment", "docs-translate", "docs-version",
      "docs-secure", "docs-force-copy", "docs-template", "docs-owner", "docs-screenreader"],
    questions: [1, 2, 3, 35, 36, 10],
    facilitator: [
      "3번(의견·제안 → 댓글 작성자)과 36번(직접 다시 쓰기 → 편집자)을 나란히 비교하면 오답이 크게 줄어듭니다.",
      "35번은 '다른 데이터를 건드리지 않고'라는 조건이 핵심입니다. 복원 대신 복사·붙여넣기를 직접 해 보게 하세요.",
      "웹캠이 없는 기기에서는 카메라 메뉴 위치만 확인하게 합니다.",
    ],
  },
  {
    id: "4", no: "04", day: "수요일 방과 후", title: "수업 발표 자료와 학급 홈페이지", subtitle: "Slides · Sites",
    tools: ["slides", "sites"], minutes: 45,
    story: [
      "수요일에는 교내 수업 나눔에서 {T} 선생님이 발표를 맡았습니다. 청중 가운데 청각 장애가 있는 동료가 있어 자막이 필요합니다.",
      "발표가 끝나면 학부모에게 안내할 학급 홈페이지도 열어야 합니다. 교육청 누리집으로 바로 가는 메뉴와, 추천 학습 사이트 썸네일도 넣고 싶습니다.",
    ],
    missions: [
      "슬라이드에 이미지와 YouTube 동영상을 넣으세요.",
      "테마 수정에서 모든 슬라이드에 학교 로고(아무 이미지)를 고정하세요.",
      "슬라이드쇼에서 자막을 켜고 말해 보세요.",
      "짝의 슬라이드에 @멘션 댓글로 피드백을 남기세요.",
      "새 사이트 '우리 반 이야기'를 만들고, 메뉴에 교육청 누리집으로 가는 새 링크를 추가하세요.",
      "테마 탭에서 사이트 전체 글꼴을 바꾸고, 외부 웹페이지를 삽입하거나 썸네일 링크를 거세요.",
      "짝을 사이트 편집자로 공유하세요.",
    ],
    cards: ["slides-media", "slides-theme", "slides-captions", "slides-comment",
      "sites-new", "sites-pages", "sites-content", "sites-font", "sites-thumb", "sites-share"],
    questions: [23, 11, 20, 34, 37],
    facilitator: [
      "34번(썸네일 → 삽입)과 37번(메뉴에서 외부로 이동 → 새 링크)을 구별하게 해 주세요.",
      "자막은 마이크 권한이 필요합니다. 연수장 소음이 크면 한 명씩 시연합니다.",
    ],
  },
  {
    id: "5", no: "05", day: "목요일 오전", title: "클래스룸 개설과 평가", subtitle: "Classroom · Forms",
    tools: ["classroom", "forms"], minutes: 55,
    story: [
      "목요일, {T} 선생님은 드디어 학급 클래스룸을 엽니다. 첫 과제는 '우리 동네 생태 지도' 프로젝트입니다.",
      "학생마다 같은 활동지를 각자 사본으로 받아야 하고, 참고 영상과 기준표도 붙여야 합니다.",
      "학생들의 관심 분야(식물·곤충·물) 그룹마다 다른 자료를 주고 싶고, 단원 시작 전에는 자동 채점 진단 퀴즈도 내려고 합니다.",
    ],
    missions: [
      "수업을 만들고 스트림에 환영 공지를 예약으로 올리세요.",
      "기한·주제·점수가 있는 과제를 만들고, 활동지를 '학생별로 사본 제공'으로 첨부하세요.",
      "YouTube 영상 링크를 첨부하고 기준표를 만드세요.",
      "관심 분야 그룹별 과제 2개를 만들어 각각 다른 학생에게 배정하세요.",
      "Forms로 자동 채점 퀴즈를 만드세요: 객관식·단답형·드롭다운·장문형 질문, 인증된 이메일 수집, 제출 후 바로 성적 공개.",
      "퀴즈 응답을 Sheets에 연결하고, 동학년 선생님을 공동작업자로 추가하세요.",
    ],
    cards: ["classroom-create", "classroom-stream", "classroom-assignment", "classroom-copy", "classroom-link",
      "classroom-rubric", "classroom-grade-rubric", "classroom-differentiate",
      "forms-new", "forms-questions", "forms-quiz", "forms-collab", "forms-sheets"],
    questions: [4, 27],
    facilitator: [
      "학생 계정이 없으면 연수생끼리 학생 역할로 서로의 수업에 참여하게 하세요.",
      "Forms는 퀴즈 A 문항에는 없지만 실기 과제에 자주 나옵니다. 실습 시간을 충분히 주세요.",
    ],
  },
  {
    id: "6", no: "06", day: "목요일 저녁 7:00", title: "원격 수업과 연수", subtitle: "Meet",
    tools: ["meet"], minutes: 35,
    story: [
      "목요일 저녁, {T} 선생님은 맞벌이 보호자를 위해 온라인 학부모 설명회를 엽니다. 다음 주에는 다른 학교 선생님들과 원격 연수, 학생 보충 수업도 있습니다.",
      "설명회 중에 여러 자료 탭을 오가야 하지만, 개인 메일이나 메신저 알림이 보이면 안 됩니다.",
    ],
    missions: [
      "캘린더 일정에서 게스트(짝)를 초대해 Meet을 여세요.",
      "Chrome 탭 공유로 자료 탭 하나만 보여 주세요.",
      "참가자 역할의 짝은 손들기를 하고, 질문에 대한 답을 채팅에 쓰세요.",
      "회의를 1분 녹화하고, Drive의 Meet Recordings 폴더에서 녹화 파일과 채팅 기록을 찾으세요.",
    ],
    cards: ["meet-invite", "meet-tab", "meet-hand", "meet-record", "meet-recordings"],
    questions: [13, 21, 22, 24, 33],
    facilitator: [
      "녹화는 계정 유형(Education 버전)에 따라 쓸 수 없을 수 있습니다. 메뉴 위치만 확인해도 됩니다.",
      "13번은 탭 공유와 창 공유의 차이를 직접 보여 주면 바로 이해합니다.",
    ],
  },
  {
    id: "7", no: "07", day: "금요일 아침 조회 전", title: "교무실 실시간 소통", subtitle: "Chat",
    tools: ["chat"], minutes: 20,
    story: [
      "금요일 아침, 수업 중에는 교내 메신저 알림이 수업을 끊는다는 불만이 나옵니다. {T} 선생님은 학년 소통 방식을 바꿔 보기로 합니다.",
      "공지는 한곳에서 빠르게 확인하고, 급한 질문과 자료는 실시간으로 나누는 공간이 필요합니다.",
    ],
    missions: [
      "짝에게 1:1 채팅을 보내세요.",
      "'3학년 교사' 스페이스를 만들고 구성원을 추가하세요.",
      "스페이스에서 @멘션으로 질문하고, Drive 파일을 첨부해 공유하세요.",
    ],
    cards: ["chat-new", "chat-space", "chat-send"],
    questions: [9, 15, 17],
    facilitator: ["Chat 문항은 대부분 '실시간 메시지와 자료 공유 = Chat'이라는 한 가지 원리로 풀립니다."],
  },
  {
    id: "8", no: "08", day: "금요일 오후", title: "모두를 위한 교실", subtitle: "접근성 · Chromebook",
    tools: ["chromebook", "docs", "slides"], minutes: 20,
    story: [
      "한 주를 마무리하며 {T} 선생님은 다음 주에 전학 오는 학생을 맞을 준비를 합니다. 저시력 학생이고, 보호자는 한국어가 서툽니다.",
      "이번 주에 배운 번역·자막·스크린 리더 기능을 모아 누구도 소외되지 않는 수업 자료를 만들어 봅니다.",
    ],
    missions: [
      "Chromebook이 있다면 Ctrl + Alt + Z로 ChromeVox를 켜고 문서를 읽혀 보세요.",
      "설정 > 접근성에서 전체 화면 돋보기를 켜 보세요.",
      "3장의 가정통신문에 스크린 리더 지원을 켜고, 보호자 언어로 번역본을 만드세요.",
    ],
    cards: ["cb-chromevox", "cb-magnifier", "docs-screenreader", "docs-translate", "slides-captions"],
    questions: [19],
    facilitator: [
      "19번은 다답형입니다. '시각장애 → 스크린 리더, 다른 언어 → 번역'처럼 학생 유형과 기능을 짝짓게 하세요.",
      "Chromebook이 없으면 Chrome 웹 스토어의 화면 읽기 확장 프로그램이나 영상으로 대신합니다.",
    ],
  },
];

export const chapterById = (id: string) => CHAPTERS.find((c) => c.id === id);
