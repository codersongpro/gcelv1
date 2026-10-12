// Google Certified Educator Level 1 Task Cards(2025-08-07) 기반 실습 카드.
// image는 scripts/extract_screenshots.py가 원본 PDF 쪽(page)에서 잘라 낸 스크린샷이다.

export type ToolId =
  | "classroom" | "drive" | "docs" | "slides" | "sheets" | "chat"
  | "meet" | "calendar" | "sites" | "gmail" | "forms" | "chromebook";

export type Card = {
  id: string;
  tool: ToolId;
  page: number;
  title: string;
  en: string;
  steps: string[];
  note?: string;
};

export const TOOLS: Record<ToolId, { name: string; color: string; tint: string }> = {
  classroom: { name: "Google 클래스룸", color: "#1E8E3E", tint: "#E6F4EA" },
  drive: { name: "Google Drive", color: "#1967D2", tint: "#E8F0FE" },
  docs: { name: "Google Docs", color: "#1967D2", tint: "#E8F0FE" },
  slides: { name: "Google Slides", color: "#B06000", tint: "#FEF7E0" },
  sheets: { name: "Google Sheets", color: "#188038", tint: "#E6F4EA" },
  chat: { name: "Google Chat", color: "#137333", tint: "#E6F4EA" },
  meet: { name: "Google Meet", color: "#00796B", tint: "#E0F2F1" },
  calendar: { name: "Google Calendar", color: "#1967D2", tint: "#E8F0FE" },
  sites: { name: "Google Sites", color: "#5B3BB5", tint: "#F3E8FD" },
  gmail: { name: "Gmail", color: "#C5221F", tint: "#FCE8E6" },
  forms: { name: "Google Forms", color: "#673AB7", tint: "#F3E8FD" },
  chromebook: { name: "Chromebook", color: "#3C4043", tint: "#F1F3F4" },
};

export const imageOf = (c: Card) => `/images/cards/p${String(c.page).padStart(3, "0")}.webp`;

export const CARDS: Card[] = [
  // 01. Google 클래스룸
  { id: "classroom-create", tool: "classroom", page: 11, title: "수업 만들고 이름 정하기", en: "Create and name a class", steps: [
    "classroom.google.com에 접속합니다.",
    "오른쪽 위 + 아이콘을 누르고 수업 만들기(Create class)를 선택합니다.",
    "수업 이름과, 필요하면 부제·과목·강의실 정보를 입력합니다.",
    "만들기(Create)를 누릅니다.",
  ] },
  { id: "classroom-stream", tool: "classroom", page: 12, title: "스트림에 공지 올리기", en: "Post a message in the Stream", steps: [
    "스트림(Stream) 탭에서 '수업에 공지할 내용 입력'(Announce something to your class)을 누릅니다.",
    "메시지를 입력합니다.",
    "바로 게시할지, 예약할지 고릅니다.",
    "게시(Post)를 누릅니다.",
  ] },
  { id: "classroom-assignment", tool: "classroom", page: 13, title: "기한이 있는 과제 만들기", en: "Create an Assignment with due date", steps: [
    "수업 과제(Classwork) > 만들기(Create) > 과제(Assignment)를 누릅니다.",
    "제목과 안내를 입력합니다.",
    "기한(Due date), 주제(Topic), 점수(Points)를 필요에 맞게 설정합니다.",
    "과제 만들기(Assign), 예약(Schedule), 임시저장(Save draft) 중 하나를 누릅니다.",
  ] },
  { id: "classroom-copy", tool: "classroom", page: 14, title: "학생별로 사본 제공하기", en: "Make a copy for each student", steps: [
    "과제 편집 화면의 추가(Attach)에서 Drive를 누릅니다.",
    "첨부할 문서를 선택합니다.",
    "드롭다운을 '학생이 파일을 볼 수 있음'(Students can view)에서 '학생별로 사본 제공'(Make a copy for each student)으로 바꿉니다.",
  ] },
  { id: "classroom-link", tool: "classroom", page: 15, title: "URL로 동영상 첨부하기", en: "Attach a video via URL", steps: [
    "과제 편집 화면의 추가(Attach)에서 링크(Link)를 누릅니다.",
    "동영상 URL(예: YouTube 주소)을 붙여 넣습니다.",
    "링크 추가(Add link)를 누릅니다.",
  ] },
  { id: "classroom-rubric", tool: "classroom", page: 16, title: "과제에 기준표 추가하기", en: "Add a rubric to an Assignment", steps: [
    "과제에서 기준표(Rubric) > 기준표 만들기(Create rubric)를 누릅니다.",
    "평가 기준, 수준별 설명, 점수를 입력합니다.",
    "저장(Save)을 누릅니다.",
  ], note: "기준표는 Sheets에서 가져오거나 이전에 만든 기준표를 다시 쓸 수도 있습니다." },
  { id: "classroom-grade-rubric", tool: "classroom", page: 17, title: "기준표로 피드백 주기", en: "Provide feedback with a rubric", steps: [
    "과제 보기(View assignment)를 누릅니다.",
    "학생 과제물 페이지 왼쪽에서 학생 이름을 누릅니다.",
    "오른쪽의 기준 펼치기(Expand criteria)·접기로 전체 기준을 열거나 닫고, 기준 옆 화살표로 하나씩 열어 수준을 선택합니다.",
  ], note: "비공개 댓글을 함께 남기고 반환하면 학생이 기준표 결과와 피드백을 확인합니다." },
  { id: "classroom-differentiate", tool: "classroom", page: 18, title: "학생별로 과제 다르게 배정하기", en: "Differentiate assignments by student", steps: [
    "과제를 만들거나 엽니다.",
    "모든 학생(All students) 드롭다운을 누릅니다.",
    "과제를 줄 학생만 체크합니다.",
    "평소처럼 과제를 할당합니다.",
  ], note: "관심 분야나 수준별로 과제를 여러 개 만들고 각각 대상 학생을 지정하면 맞춤형 학습 환경이 됩니다." },

  // 02. Google Drive
  { id: "drive-folder-color", tool: "drive", page: 21, title: "폴더 만들고 색상으로 구분하기", en: "Create and color code folders", steps: [
    "Drive를 열고 새로 만들기(New)를 누릅니다.",
    "새 폴더(New folder)를 선택하고 이름을 입력한 뒤 만들기를 누릅니다.",
    "폴더를 마우스 오른쪽 버튼으로 누르고 정리(Organize)에서 색상을 고릅니다.",
    "다른 폴더와 한눈에 구분되는 색을 지정합니다.",
  ] },
  { id: "drive-convert", tool: "drive", page: 22, title: "업로드 파일 자동 변환하기", en: "Upload and auto convert files", steps: [
    "Drive 오른쪽 위 톱니바퀴 > 설정(Settings)을 엽니다.",
    "업로드 변환(Convert uploads) 체크박스를 켭니다.",
    "새로 만들기 > 파일 업로드 또는 폴더 업로드를 누릅니다.",
    ".docx, .pptx 같은 파일을 올리면 Google 문서 형식으로 변환됩니다.",
  ] },
  { id: "drive-drag", tool: "drive", page: 23, title: "끌어서 놓기로 정리하기", en: "Organize files with drag and drop", steps: [
    "Drive를 그리드 보기나 목록 보기로 엽니다.",
    "파일이나 폴더를 누른 채로 있습니다.",
    "옮길 폴더 위치로 끌어갑니다.",
    "놓으면 정리됩니다.",
  ] },
  { id: "drive-shared-folder", tool: "drive", page: 24, title: "공유 폴더에 자료 추가하기", en: "Add resources to shared folders", steps: [
    "공유 아이콘이 표시된 공유 폴더를 엽니다.",
    "새로 만들기 > 파일 업로드나 폴더 업로드를 누르거나, 파일을 폴더 안으로 바로 끌어다 놓습니다.",
    "추가한 파일은 폴더의 공유 권한을 자동으로 이어받습니다.",
  ] },

  // 03. Google Docs
  { id: "docs-new", tool: "docs", page: 29, title: "새 문서 만들고 제목 붙이기", en: "Create a new Doc", steps: [
    "Drive로 이동합니다.",
    "새로 만들기 > Google 문서 > 빈 문서를 누릅니다.",
    "위쪽의 '제목 없는 문서'를 눌러 제목을 입력합니다.",
  ] },
  { id: "docs-camera", tool: "docs", page: 30, title: "웹캠으로 사진 넣기", en: "Insert image using a webcam", steps: [
    "문서에서 삽입(Insert) > 이미지(Image) > 카메라(Camera)를 누릅니다.",
    "웹캠 접근 권한을 묻는 창이 나오면 허용합니다.",
    "카메라로 사진을 찍습니다.",
    "삽입(Insert)을 눌러 문서에 넣습니다.",
  ] },
  { id: "docs-share", tool: "docs", page: 31, title: "공유 권한 지정하고 초대하기", en: "Assign sharing permissions & invite collaborators", steps: [
    "문서 오른쪽 위 공유(Share) 버튼을 누릅니다.",
    "공동작업자의 이메일 주소를 입력합니다.",
    "뷰어(Viewer), 댓글 작성자(Commenter), 편집자(Editor) 중 하나를 고릅니다.",
    "'사용자에게 알림'(Notify people)은 체크된 상태로 둡니다.",
    "보내기(Send)를 누릅니다.",
  ], note: "뷰어는 보기만, 댓글 작성자는 댓글과 제안, 편집자는 내용 수정까지 할 수 있습니다." },
  { id: "docs-owner", tool: "docs", page: 32, title: "문서 소유권 이전하기", en: "Transfer ownership of a document", steps: [
    "공유(Share)를 누릅니다.",
    "소유권을 넘길 사람의 이메일을 입력합니다.",
    "이름 옆 드롭다운에서 소유권 이전(Transfer ownership)을 고릅니다.",
    "변경사항을 저장하고 확인합니다.",
  ] },
  { id: "docs-translate", tool: "docs", page: 33, title: "문서 번역하기", en: "Translate a document", steps: [
    "도구(Tools) > 문서 번역(Translate document)을 누릅니다.",
    "번역할 언어를 고릅니다.",
    "새 사본의 이름을 정하고 번역(Translate)을 누릅니다.",
  ], note: "원본은 그대로 두고 번역된 사본이 새로 만들어집니다." },
  { id: "docs-version", tool: "docs", page: 34, title: "버전 기록으로 내용 되살리기", en: "Use Version history to recover content", steps: [
    "파일(File) > 버전 기록(Version history) > 버전 기록 보기를 누르거나, 오른쪽 위 시계 모양 아이콘을 누릅니다.",
    "버전을 눌러 변경 내역을 확인합니다.",
    "필요하면 이전 버전을 고르고 이 버전 복원(Restore this version)을 누릅니다.",
  ], note: "다른 사람의 최신 작업을 지우면 안 될 때는 전체 복원 대신, 이전 버전에서 빠진 부분만 복사해 현재 문서에 붙여 넣습니다." },
  { id: "docs-template", tool: "docs", page: 35, title: "템플릿 갤러리 찾기", en: "Find the Template gallery", steps: [
    "docs.google.com의 Docs 홈으로 갑니다.",
    "오른쪽 위 템플릿 갤러리(Template gallery)를 누릅니다.",
    "수업 계획서, 편지 같은 템플릿을 둘러봅니다.",
    "하나를 눌러 편집을 시작합니다.",
  ] },
  { id: "docs-suggest", tool: "docs", page: 36, title: "제안 모드로 바꾸기", en: "Change to Suggesting mode", steps: [
    "문서 오른쪽 위 연필 아이콘을 누릅니다.",
    "드롭다운에서 제안(Suggesting)을 고릅니다.",
    "이제 입력하는 수정 사항은 제안으로 표시됩니다.",
  ] },
  { id: "docs-force-copy", tool: "docs", page: 37, title: "사본 만들기 링크 공유하기", en: "Force a copy", steps: [
    "문서를 엽니다.",
    "공유 URL을 복사하고 끝의 /edit를 /copy로 바꿉니다.",
    "바꾼 링크를 공유하면 학생에게 사본 만들기 안내가 나옵니다.",
  ] },
  { id: "docs-comment", tool: "docs", page: 38, title: "댓글과 채팅 사용하기", en: "Use Chat & commenting", steps: [
    "댓글: 텍스트를 선택합니다.",
    "댓글 아이콘을 누르거나 삽입(Insert) > 댓글(Comment)을 누릅니다.",
    "내용을 입력하고 게시합니다.",
    "채팅: 여러 공동작업자가 동시에 문서를 보고 있으면 채팅 아이콘을 눌러 실시간 대화를 시작합니다.",
  ], note: "댓글은 문서에 남기 때문에 학생이 나중에 피드백을 다시 보며 복습할 수 있습니다." },
  { id: "docs-secure", tool: "docs", page: 39, title: "공유 권한 안전하게 설정하기", en: "Secure sharing permissions", steps: [
    "공유(Share)를 누릅니다.",
    "오른쪽 위 설정 톱니바퀴를 누릅니다.",
    "'편집자가 권한을 변경하고 공유할 수 있음'(Editors can change permissions) 체크를 해제합니다.",
    "'뷰어 및 댓글 작성자에게 다운로드, 인쇄, 복사 옵션 표시' 체크를 해제합니다.",
  ] },
  { id: "docs-screenreader", tool: "docs", page: 40, title: "스크린 리더 지원 켜기", en: "Enable screen reader support", steps: [
    "도구(Tools)를 누릅니다.",
    "접근성(Accessibility)을 고릅니다.",
    "스크린 리더 지원 사용(Turn on screen reader support)을 체크합니다.",
    "확인을 누릅니다.",
  ] },

  // 04. Google Slides
  { id: "slides-media", tool: "slides", page: 43, title: "사진과 동영상이 있는 슬라이드 만들기", en: "Create Slides with multimedia", steps: [
    "slides.google.com에서 빈 프레젠테이션이나 템플릿을 고릅니다.",
    "삽입(Insert) > 이미지(Image)로 기기, Drive, 웹의 사진을 넣습니다.",
    "삽입 > 동영상(Video)으로 YouTube나 Drive 동영상을 넣습니다. YouTube는 검색하거나 URL을 붙여 넣습니다.",
  ] },
  { id: "slides-captions", tool: "slides", page: 44, title: "발표 중 자막 켜기", en: "Enable captions while presenting", steps: [
    "슬라이드쇼(Slideshow)를 누릅니다.",
    "왼쪽 아래 점 세 개를 누릅니다.",
    "자막 환경설정(Captions preferences)에 마우스를 올립니다.",
    "자막 전환(Toggle captions)을 고릅니다.",
    "마이크로 들어오는 말이 실시간 자막으로 나옵니다.",
  ], note: "처음 사용할 때는 마이크 권한을 허용해야 할 수 있습니다." },
  { id: "slides-theme", tool: "slides", page: 45, title: "테마에 고정 요소 넣기", en: "Customize Themes with static elements", steps: [
    "슬라이드(Slide) > 테마 수정(Edit theme)을 누릅니다.",
    "레이아웃에 텍스트 상자, 로고, 도형, 이미지를 넣습니다.",
    "테마 편집기를 닫습니다.",
  ], note: "테마에 넣은 요소는 그 레이아웃을 쓰는 모든 슬라이드에 똑같이 나옵니다." },
  { id: "slides-comment", tool: "slides", page: 46, title: "댓글로 피드백 남기기", en: "Leave feedback using comments", steps: [
    "요소나 텍스트를 선택합니다.",
    "댓글 버튼, 삽입 > 댓글, 또는 마우스 오른쪽 버튼 > 댓글을 누릅니다.",
    "피드백을 입력하고 댓글을 게시합니다.",
  ], note: "@를 붙여 사람을 태그하면 그 사람에게 알림이 갑니다." },

  // 05. Google Sheets
  { id: "sheets-collab", tool: "sheets", page: 49, title: "Sheets에서 함께 작업하기", en: "Collaborate in Sheets", steps: [
    "연결된 시트를 엽니다.",
    "공유(Share)에서 공동작업자를 편집자 권한으로 추가합니다.",
    "공동작업자들이 동시에 메모를 남기고, 정렬하고, 수식을 씁니다.",
  ] },
  { id: "sheets-owner", tool: "sheets", page: 50, title: "시트 소유권 이전하기", en: "Transfer ownership of a Sheet", steps: [
    "공유 아이콘을 누르고 소유권을 넘길 사람의 이메일을 찾습니다.",
    "이름 옆 드롭다운에서 소유권 이전(Transfer ownership)을 고릅니다.",
    "이전을 확인합니다.",
  ] },

  // 06. Google Chat
  { id: "chat-new", tool: "chat", page: 53, title: "새 채팅 시작하기", en: "Start a new Chat", steps: [
    "chat.google.com에 가거나 Gmail에서 Chat을 엽니다.",
    "새 채팅(New chat)을 누릅니다.",
    "이름이나 이메일을 입력하고 Enter를 눌러 대화를 시작합니다.",
  ] },
  { id: "chat-space", tool: "chat", page: 54, title: "스페이스 만들기", en: "Create a Chat Space", steps: [
    "스페이스(Spaces) 옆 메뉴를 누릅니다.",
    "스페이스 만들기(Create space)를 고르고 이름을 정합니다.",
    "구성원을 추가하고 만들기를 누릅니다.",
  ] },
  { id: "chat-send", tool: "chat", page: 55, title: "스페이스에서 메시지와 자료 보내기", en: "Send messages and resources in a Space", steps: [
    "입력창에 메시지를 씁니다.",
    "@로 구성원을 태그합니다.",
    "클립 아이콘으로 파일이나 링크를 첨부합니다.",
  ] },

  // 07. Google Meet
  { id: "meet-invite", tool: "meet", page: 58, title: "Meet에 게스트 초대하기", en: "Invite a guest to a Meet", steps: [
    "캘린더 일정에서 게스트 추가(Add guests)를 누릅니다.",
    "게스트 이메일을 입력하고 저장합니다.",
    "초대 이메일을 보낼지 묻는 창에서 보내기를 고릅니다.",
    "Gmail에서는 Meet > 새 회의를 누르고, 초대를 보내거나 링크를 복사해 메일에 붙여 넣습니다.",
  ] },
  { id: "meet-tab", tool: "meet", page: 59, title: "Chrome 탭으로 화면 공유하기", en: "Share screen via Chrome tab", steps: [
    "Meet에서 화면 공유 아이콘을 누릅니다.",
    "Chrome 탭(A Chrome tab)을 고릅니다.",
    "공유할 탭을 선택하고 공유를 누릅니다.",
  ], note: "탭 공유는 선택한 탭만 보여 주므로 다른 창이나 알림이 학생에게 노출되지 않습니다." },
  { id: "meet-record", tool: "meet", page: 60, title: "회의 녹화하기", en: "Record a meeting", steps: [
    "Meet의 점 세 개 메뉴를 누릅니다.",
    "회의 녹화(Record meeting)를 고릅니다. 참가자에게 녹화 동의 안내가 나옵니다.",
    "끝나면 녹화 중지(Stop recording)를 누릅니다.",
  ] },
  { id: "meet-hand", tool: "meet", page: 61, title: "손들기", en: "Raise hand in a meeting", steps: [
    "meet.google.com이나 캘린더에서 회의에 참여합니다.",
    "아래 도구 막대의 손들기 아이콘을 누릅니다.",
    "발언 차례가 오면 다시 눌러 손을 내립니다.",
  ] },
  { id: "meet-recordings", tool: "meet", page: 62, title: "채팅 기록과 녹화 파일 찾기", en: "Access Chat history and recordings", steps: [
    "Drive에서 Meet Recordings 폴더를 엽니다.",
    "녹화 파일을 열거나 공유합니다.",
    "채팅 기록도 이 폴더에 저장되지만, 회의를 녹화한 경우에만 남습니다.",
  ] },

  // 08. Google Calendar
  { id: "cal-attach", tool: "calendar", page: 65, title: "문서가 첨부된 일정 만들기", en: "Create an event with attachment", steps: [
    "캘린더에서 만들기 > 일정을 누르거나 원하는 날짜·시간을 누릅니다. 전체 화면은 아래 옵션 더보기(More options)로 엽니다.",
    "제목과 날짜·시간을 입력합니다.",
    "빠른 보기에서는 '설명 또는 Google Drive 첨부파일 추가'에서 Drive 첨부파일을 누릅니다.",
    "전체 화면에서는 설명 상자의 Drive 아이콘을 누릅니다.",
    "파일을 고르고 삽입을 누릅니다.",
  ] },
  { id: "cal-reminder", tool: "calendar", page: 66, title: "일정 알림 설정하기", en: "Set event reminders", steps: [
    "전체 일정 편집 화면에서 알림(Notification) 항목으로 내려갑니다.",
    "빠른 보기에서는 캘린더 이름을 누르고 알림 추가를 누릅니다.",
    "이메일 또는 팝업을 고르고 시간을 정합니다(예: 10분 전).",
  ] },
  { id: "cal-meet", tool: "calendar", page: 67, title: "일정에 Meet 링크 넣기", en: "Add a Meet link to an event", steps: [
    "일정에서 Google Meet 화상 회의 추가(Add Google Meet video conferencing)를 누릅니다.",
    "참석자를 위한 Meet 링크가 자동으로 들어갑니다.",
  ], note: "관리자 설정에 따라 새 일정에 Meet 링크가 자동으로 붙어 있을 수도 있습니다." },
  { id: "cal-new", tool: "calendar", page: 68, title: "새 캘린더 따로 만들기", en: "Create a separate calendar", steps: [
    "왼쪽 패널의 '다른 캘린더'(Other calendars) 옆 +를 누릅니다.",
    "새 캘린더 만들기(Create new calendar)를 고르고 이름과 설정을 정합니다.",
  ], note: "보호자에게 학교 행사를 보여 주려면 새 캘린더를 만든 뒤 그 캘린더의 설정 > 액세스 권한에서 공개로 설정합니다. 개인 캘린더는 비공개로 남습니다." },
  { id: "cal-due", tool: "calendar", page: 69, title: "캘린더로 마감일 관리하기", en: "Using Calendar for due dates", steps: [
    "만들기 > 일정을 고릅니다.",
    "일정 제목(예: '수학 숙제 - 32쪽')을 쓰고, 캘린더(예: '숙제')를 고르고, 마감 날짜와 시간을 정합니다.",
    "필요하면 설명, 장소, 알림을 추가합니다.",
  ] },
  { id: "cal-appointment", tool: "calendar", page: 70, title: "약속 일정 만들기", en: "Set appointment slots", steps: [
    "원하는 시간 칸을 누르거나 만들기 > 약속 일정(Appointment schedule)을 고릅니다.",
    "시간 단위, 가능한 시간, 공동 호스트 같은 옵션을 고릅니다.",
    "다음을 누릅니다.",
    "나머지 옵션을 정합니다.",
    "저장을 누릅니다.",
  ], note: "학부모 상담 예약처럼 상대가 빈 시간을 골라 예약하게 할 때 씁니다." },
  { id: "cal-guests", tool: "calendar", page: 71, title: "게스트가 다른 사람을 초대하게 하기", en: "Enable guest invitations", steps: [
    "일정 화면에 게스트 이메일을 추가합니다.",
    "게스트 권한의 '다른 사용자 초대'(Invite others)를 체크합니다.",
  ] },
  { id: "cal-tasks", tool: "calendar", page: 72, title: "Tasks로 할 일과 기한 정하기", en: "Using Tasks and scheduling due dates", steps: [
    "오른쪽 패널이나 위쪽의 Tasks 버튼을 누릅니다.",
    "할 일 추가(Add a task)를 누릅니다.",
    "오늘·내일 같은 추천 버튼이나 아래 달력으로 기한을 정합니다.",
  ] },

  // 09. Google Sites
  { id: "sites-new", tool: "sites", page: 75, title: "새 사이트 만들기", en: "Create a new Google Site", steps: [
    "sites.google.com에 접속합니다.",
    "+ 버튼으로 새 사이트를 시작합니다.",
    "왼쪽 위에 사이트 제목을 입력합니다.",
  ] },
  { id: "sites-pages", tool: "sites", page: 76, title: "페이지나 외부 링크 추가하기", en: "Add pages or external links", steps: [
    "오른쪽 페이지(Pages) 탭을 누릅니다.",
    "+를 눌러 새 페이지(New page)나 새 링크(New link)를 추가합니다.",
    "외부 링크라면 주소를 입력합니다.",
    "끌어서 놓기로 페이지 이름과 순서를 정리합니다.",
  ], note: "탐색 메뉴에서 누르면 바로 다른 웹사이트로 가는 항목은 '새 링크'로 만듭니다." },
  { id: "sites-content", tool: "sites", page: 77, title: "콘텐츠 넣고 레이아웃 바꾸기", en: "Add content to a page & customize the layout", steps: [
    "편집할 페이지 영역을 누릅니다.",
    "삽입(Insert) 탭에서 텍스트 상자, 이미지, 삽입(Embed) 콘텐츠를 넣습니다.",
    "콘텐츠 블록을 끌어서 배치를 바꿉니다.",
  ], note: "삽입(Embed)은 URL이나 코드를 붙여 다른 웹페이지 콘텐츠를 사이트 안에 보여 줍니다." },
  { id: "sites-font", tool: "sites", page: 78, title: "사이트 전체 글꼴 바꾸기", en: "Update site-wide font settings", steps: [
    "오른쪽 테마(Themes) 탭을 누릅니다.",
    "테마를 고르고 원하는 글꼴 스타일을 선택합니다.",
    "모든 페이지의 글꼴이 한 번에 바뀝니다.",
  ] },
  { id: "sites-thumb", tool: "sites", page: 79, title: "다른 웹페이지로 가는 썸네일 걸기", en: "Link thumbnails from other webpages", steps: [
    "삽입 탭에서 이미지 > 업로드(Upload) 또는 선택(Select)을 누릅니다. 선택은 Drive, 링크, Google 이미지, 포토 중에서 고를 수 있습니다.",
    "이미지의 링크 아이콘을 누릅니다.",
    "연결할 주소를 입력하고 적용(Apply)을 누릅니다.",
  ] },
  { id: "sites-share", tool: "sites", page: 80, title: "공동작업자에게 편집 권한 주기", en: "Provide edit rights to collaborators", steps: [
    "다른 사용자와 공유 아이콘을 누릅니다.",
    "이메일을 입력하고 편집자 권한을 고릅니다. 게시된 사이트 뷰어는 게시본만 볼 수 있고, 편집자는 사이트를 수정할 수 있습니다.",
    "보내기를 누릅니다.",
  ] },

  // 10. Gmail
  { id: "gmail-snooze", tool: "gmail", page: 83, title: "메일 다시 알림 설정하기", en: "Snooze emails", steps: [
    "받은편지함의 메일 위에 마우스를 올립니다.",
    "다시 알림(Snooze, 시계 아이콘)을 누릅니다.",
    "메일이 다시 나타날 날짜와 시간을 고릅니다.",
  ] },
  { id: "gmail-conversation", tool: "gmail", page: 84, title: "대화형식으로 보기", en: "Use Conversation view", steps: [
    "톱니바퀴를 누르고 빠른 설정 아래쪽의 대화형식 보기를 고르거나, 모든 설정 보기를 누릅니다.",
    "기본설정(General) 탭에서 대화형식으로 보기 항목으로 내려갑니다.",
    "사용을 고르고 변경사항 저장을 누릅니다.",
  ], note: "같은 주제의 메일이 하나의 대화로 묶여 시간 순서대로 보입니다." },
  { id: "gmail-search", tool: "gmail", page: 85, title: "검색 연산자로 찾기", en: "Search using operators", steps: [
    "Gmail 검색창을 누릅니다.",
    "from:, subject:, has:attachment 같은 연산자를 입력합니다.",
    "Enter를 눌러 결과를 봅니다.",
  ], note: "from:주소 로 검색하면 그 사람이 보낸 메일과 공유한 Drive 파일 알림을 함께 찾을 수 있습니다." },
  { id: "gmail-compose", tool: "gmail", page: 86, title: "메일 쓰고 보내기", en: "Compose and Send an email", steps: [
    "왼쪽 위 편지쓰기(Compose)를 누릅니다.",
    "받는사람, 제목, 내용을 입력합니다.",
    "보내기를 누릅니다.",
  ] },
  { id: "gmail-filter", tool: "gmail", page: 87, title: "필터 만들어 라벨 자동 적용하기", en: "Create a filter and apply a label", steps: [
    "검색창의 검색 옵션 아이콘을 누릅니다.",
    "조건(예: 특정 보낸사람 주소)을 입력하고 필터 만들기를 누릅니다.",
    "적용할 동작을 고릅니다. 라벨을 붙이려면 '라벨 적용'을 체크하고 라벨을 선택합니다.",
    "필터 만들기를 누릅니다.",
  ] },
  { id: "gmail-priority", tool: "gmail", page: 88, title: "중요 편지함 사용하기", en: "Enable Priority Inbox", steps: [
    "톱니바퀴 > 모든 설정 보기를 누릅니다.",
    "받은편지함(Inbox) 탭의 받은편지함 유형에서 중요 편지함(Priority Inbox)을 고릅니다.",
    "섹션을 원하는 대로 바꾸고 변경사항 저장을 누릅니다.",
  ] },

  // 11. Google Forms
  { id: "forms-new", tool: "forms", page: 92, title: "설문지 만들기", en: "Create a Form", steps: [
    "forms.google.com에 접속합니다.",
    "빈 양식이나 템플릿을 고릅니다.",
    "제목과 필요하면 설명을 입력합니다.",
  ], note: "Drive에서 새로 만들기 > Google 설문지로도 만들 수 있습니다." },
  { id: "forms-questions", tool: "forms", page: 93, title: "여러 유형의 질문 넣기", en: "Add questions in multiple formats", steps: [
    "+ 버튼으로 질문을 추가합니다.",
    "드롭다운에서 질문 유형을 고릅니다: 객관식, 단답형, 드롭다운, 장문형.",
    "질문과 선택지를 입력합니다.",
  ] },
  { id: "forms-quiz", tool: "forms", page: 94, title: "자동 채점 퀴즈 만들기", en: "Set up a self-grading quiz", steps: [
    "설정(Settings)을 누릅니다.",
    "퀴즈로 만들기(Make this a quiz)를 켭니다.",
    "성적을 바로 공개하려면 '제출 후 바로'(Immediately after each submission)를 고릅니다.",
    "응답(Responses)에서 이메일 주소 수집을 '인증됨'(Verified)으로 고릅니다.",
    "질문 화면으로 돌아와 각 질문의 답안(Answer key)을 누릅니다.",
    "정답과 점수를 정합니다.",
  ] },
  { id: "forms-collab", tool: "forms", page: 95, title: "공동작업자 추가하기", en: "Add collaborators", steps: [
    "게시(Publish) 옆 공유 아이콘을 누릅니다.",
    "이메일을 입력하고 편집자 권한을 고릅니다. 편집자는 보고 댓글을 달고 수정할 수 있고, 응답자는 응답 화면만 봅니다.",
  ], note: "응답을 받을 사람에게 이메일로 설문지를 보낼 때도 이 화면을 씁니다." },
  { id: "forms-sheets", tool: "forms", page: 96, title: "응답을 Sheets에 연결하기", en: "Link Form Responses to Sheets", steps: [
    "설문지의 응답(Responses) 탭을 누릅니다.",
    "초록색 Sheets 아이콘 옆 Sheets에 연결(Link to Sheets)을 눌러 새 스프레드시트를 만들거나 기존 시트를 고릅니다.",
  ] },

  // 12. Chromebook
  { id: "cb-chromevox", tool: "chromebook", page: 99, title: "ChromeVox 켜기", en: "Activate ChromeVox", steps: [
    "Ctrl + Alt + Z를 눌러 ChromeVox를 켜고 끕니다.",
    "ChromeVox가 화면의 텍스트와 메뉴를 소리 내어 읽어 줍니다.",
  ], note: "ChromeVox는 ChromeOS에 들어 있는 스크린 리더입니다." },
  { id: "cb-magnifier", tool: "chromebook", page: 100, title: "전체 화면 돋보기 켜기", en: "Activate Full-screen magnifier", steps: [
    "설정 > 접근성으로 갑니다.",
    "전체 화면 돋보기(Full-screen magnifier)를 켭니다.",
    "Ctrl + Search + M으로 빠르게 켜고 끌 수 있습니다.",
  ] },
];

export const cardById = (id: string) => {
  const c = CARDS.find((x) => x.id === id);
  if (!c) throw new Error(`unknown card ${id}`);
  return c;
};
