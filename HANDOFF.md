# Korean TokTok (한국어 톡톡) - Developer Hand-off Document

> **문서 버전:** 1.3.0  
> **최종 갱신일:** 2026-09-16  
> **프로젝트 성격:** 다문화가정 및 외국인 학습자를 위한 실용 한국어 회화, 어휘, 문법, 문화, 퀴즈, 게이미피케이션, 회원 인증, 음소 단위 발음 교정 통합 학습 플랫폼

---

## 1. 프로젝트 개요 (Project Overview)

**Korean TokTok (한국어 톡톡)**은 KBS 실용 한국어 교재 및 Wiz 한국어 교육 과정을 기반으로, 초급부터 고급까지 총 45개 단원의 실생활 한국어를 효과적으로 학습할 수 있는 반응형 웹 플랫폼입니다.

- **프론트엔드 스택:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **회원 인증 & 프로필:** `AuthContext` 기반 회원가입, 로그인, 게스트 모드, 소셜 로그인(Google/Kakao), 9개국어 모국어(한국어, 영어, 베트남어, 중국어, 일본어, 러시아어, 스페인어, 몽골어, 태국어) 및 아바타 커스텀
- **음성/AI 기능:** Web Speech API (TTS 음성 합성 & STT 발음 채점), 한글 초성/중성/종성 음소 단위 정밀 오발음 분석 & 글자별 하이라이트 교정 엔진 (`src/utils/pronunciationAnalysis.ts`), Google Gemini AI (`@google/genai`) 서버리스 프록시 문법 튜터 및 내장 비유 해설 엔진
- **시각화 및 게이미피케이션:** 애니메이션 캐릭터 아바타, 단원별 상황 일러스트, 14종 메탈릭 성취 뱃지 시스템, 어휘 연상 비주얼 큐, 실사 한국 문화 카드
- **배포 & 보안:** Vercel 서버리스 (`/api/explain.ts`), API 키 서버 격리, SPA 라우팅 (`vercel.json`)

---

## 2. 핵심 아키텍처 및 데이터 파이프라인

### 2.1 데이터 소스 구조 (Dual-Source Curriculum)
1. **KBS 실용 한국어 커리큘럼** (`src/data/kbs/`):
   - 초급 A (Unit 1~8), 초급 B (Unit 9~16), 중급 A (Unit 17~24), 중급 B (Unit 25~32), 고급 (Unit 33~45)
   - PDF 교재에서 추출한 실생활 회화 및 문법·어휘 데이터 통합
2. **Wiz 한국어 커리큘럼** (`src/data/wiz/`):
   - 초급·중급 표준 단원 데이터 매핑
3. **단일 통합 진입점** (`src/data/index.ts` & `src/data/units.json`):
   - 45개 전 단원의 메타데이터, 회화문, 어휘, 문법, 퀴즈, 문화 데이터를 동기화하여 제공

### 2.2 표준 데이터 스키마 준수 (`.agents/rules/data-schema.md`)
모든 단원 데이터 파일은 아래의 표준 JSON 스키마를 엄격히 준수합니다.

```typescript
// 1. 단원 메타데이터 (units.json)
interface Unit {
  unit_number: number;
  title: string;
  topic: string;
  situation: string;
  level: "초급" | "중급" | "고급";
}

// 2. 회화문 (dialogues/unitXX.json)
interface DialogueItem {
  unit: number;
  dialogue_id: string;
  speaker: string; // "민호", "리홍", "도안", "수연" 등
  korean_text: string;
  translation: string;
  audio_hint?: string;
}

// 3. 어휘 (vocab/unitXX.json)
interface VocabItem {
  word: string;
  meaning: string;
  part_of_speech: string;
  example_sentence: string;
  level: "초급" | "중급" | "고급";
}

// 4. 문법 (grammar/unitXX.json)
interface GrammarItem {
  grammar_point: string;
  explanation: string;
  example_sentences: string[];
  related_vocab: string[];
}

// 5. 퀴즈 (quiz/unitXX.json)
interface QuizItem {
  quiz_id: string;
  type: "multiple_choice" | "fill_in_the_blank" | "sentence_reordering";
  question: string;
  options?: string[]; // multiple_choice 필수
  answer: string;
  explanation: string;
  source_unit: number;
}
```

---

## 3. 주요 구현 기능 및 모듈 설명

### 3.1 회원가입, 로그인 & 프로필 관리 모듈 (`src/contexts/AuthContext.tsx`)
- **이메일/비밀번호 인증**: 유효성 검사, 중복 가입 방지, 안전한 로컬 세션 유지
- **게스트 체험 모드 (Guest Mode)**: 가입 없이 즉시 모든 기능을 체험하고, 이후 진도 유실 없이 정식 회원으로 전환 가능
- **소셜 로그인 (Google / Kakao)**: 1클릭 간편 로그인 지원
- **학습자 맞춤 설정**:
  - 9개국 모국어 선택 (한국어, 영어, 베트남어, 중국어, 일본어, 러시아어, 스페인어, 몽골어, 태국어)
  - 대표 캐릭터 아바타 선택 (민호, 리홍, 도안, 수연, 선생님, 친구)
  - 목표 레벨 설정 (초급, 중급, 고급)
- **UI 연동**: 데스크톱 사이드바([Sidebar.tsx](src/components/common/Sidebar.tsx)) 및 모바일 헤더([Layout.tsx](src/components/common/Layout.tsx)) 프로필 위젯

### 3.2 음소 및 글자 단위 정밀 발음 교정 & 섀도잉 (`src/utils/pronunciationAnalysis.ts`, `SpeechPracticeModal.tsx`)
- **Needleman-Wunsch 동적 정렬 알고리즘**: 목표 문장과 음성 인식 텍스트를 글자 단위로 매핑하여 누락/오발음/정확 음절을 정확히 판별
- **한글 자모(초성/중성/종성) 오발음 분해 분석**:
  - **초성 오류**: 예사소리/된소리/거센소리(ㄱ/ㄲ/ㅋ, ㅂ/ㅃ/ㅍ 등) 발음 강도 안내
  - **중성(모음) 오류**: ㅓ/ㅡ, ㅔ/ㅐ 등 외국인 취약 모음 조음 위치 가이드
  - **종성(받침) 오류**: 받침 누락 및 불필요한 받침 추가 감지
- **인터랙티브 발음 교정 UI**:
  - 글자별 색상 뱃지 (🟢 초록: 정확, 🔴 빨강: 오발음 및 인식 글자 표기, 🟡 노랑: 누락)
  - 오발음 글자 클릭 시 해당 음절만 원음 TTS 재생 및 맞춤 조음 팁 팝업

### 3.3 비주얼 회화 뷰어 (`src/components/study/DialogueViewer.tsx`)
- **캐릭터 아바타 시스템 (`src/utils/characterAvatar.ts`)**: 발화자별 8종 전용 아바타 매핑
- **상황별 배너 일러스트 (`src/utils/unitSituation.ts`)**: 단원별 첫 만남, 쇼핑, 식당, 길 찾기 등 고해상도 상황 삽화 렌더링
- **롤플레이 & 섀도잉**: Web Speech API 기반 음성 듣기(TTS) 및 마이크 발음 정확도(STT) 실시간 채점

### 3.4 어휘 플래시카드 & 문화 톡톡 (`src/components/study/CultureViewer.tsx`, `VocabFlashcard.tsx`)
- **어휘 연상 비주얼 큐 (`src/utils/vocabVisuals.ts`)**: 10개 시맨틱 카테고리에 따른 컬러 태그, 이모지 및 연상 기억 힌트
- **문화 톡톡 4번째 탭 (`src/data/culture/cultureData.ts`)**: 45개 전 단원 한국 문화 배경, 고화질 실사 사진, 에티켓 Do & Don't, 원어민 필수 표현 수록

### 3.5 멀티모달 퀴즈 엔진 (`src/components/quiz/QuizEngine.tsx`, `MultipleChoiceCard.tsx`)
- **그림/사진 기반 객관식 퀴즈 (`src/utils/visualQuizHelper.ts`)**: 시각 자극(상황도, 문화 사진, 캐릭터 등)을 동적으로 퀴즈 카드에 포함
- **즉각적인 정답/오답 피드백**: 정답 애니메이션 및 상세 한국어 해설 표시

### 3.6 게이미피케이션 & 대시보드 (`src/components/dashboard/BadgeCollection.tsx`, `src/pages/ProgressPage.tsx`)
- **14종 메탈릭 성취 뱃지 (`src/data/badges/badgeData.ts`)**: 브론즈부터 다이아몬드까지 실시간 조건 계산 및 모달 팝업
- **학습 진도 백업/복원 기능**: 진도 데이터를 JSON 파일로 원클릭 내보내기/불러오기 지원

### 3.7 초성 및 자모 분해 검색 엔진 (`src/utils/hangulSearch.ts`, `src/services/searchService.ts`)
- **입력 중 깜박임 완전 제거**: 한글 조합 중(예: `존` -> `존ㅊ` -> `존칭`)에도 끊김 없이 매칭되는 자모 분해 알고리즘
- `useDeferredValue` + 동기 검색 처리로 키 입력 지연 및 모달 리렌더링 제거

### 3.8 Google Gemini AI 문법 튜터 & 보안 프록시 (`api/explain.ts`, `src/services/aiExplanation.ts`)
- Vercel Node.js 서버리스 함수로 Gemini API 키를 서버 전용(`process.env.GEMINI_API_KEY`)으로 격리
- API 키가 없거나 네트워크 장애 시에도 앱 내 **지능형 내장 비유 해설 엔진**으로 즉시 자동 폴백

---

## 4. 디렉터리 구조 (Directory Structure)

```text
korean-toktok-app/
├── .agents/                    # 에이전트 규칙 및 스키마 정의
├── api/
│   └── explain.ts              # Gemini AI Vercel 서버리스 프록시
├── books/                      # KBS 교재 원본 PDF (Git 제외)
├── data/                       # 원본 데이터 (빌드 제외)
├── public/
│   ├── images/
│   │   ├── characters/         # 8종 캐릭터 아바타 (minho.webp 등)
│   │   ├── culture/            # 실사 문화 사진 (palace.jpg 등)
│   │   └── situations/         # 단원 상황 일러스트 (unit01.webp 등)
│   └── favicon.svg
├── scripts/                    # 데이터 추출 및 빌드 자동화 스크립트
├── src/
│   ├── components/
│   │   ├── auth/               # AuthModal, UserProfileModal
│   │   ├── common/             # Layout, Sidebar, BottomNav, GlobalSearchModal
│   │   ├── dashboard/          # BadgeCollection, ProgressStats
│   │   ├── quiz/               # QuizEngine, MultipleChoiceCard
│   │   └── study/              # DialogueViewer, CultureViewer, VocabFlashcard, SpeechPracticeModal
│   ├── contexts/
│   │   └── AuthContext.tsx     # 회원 인증 & 세션 상태 관리
│   ├── data/                   # 런타임 45개 단원 데이터 (badges, culture, dialogues 등)
│   ├── hooks/                  # useAuth, useProgress, useTTS, useSpeechRecognition
│   ├── pages/                  # StudyPage, QuizPage, ProgressPage (Code-split)
│   ├── services/               # aiExplanation, searchService
│   ├── types/                  # UserProfile, UnitItem, DialogueItem 등
│   ├── utils/                  # pronunciationAnalysis, hangulSearch, characterAvatar, vocabVisuals 등
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── AGENTS.md
├── HANDOFF.md                  # 본 인수인계 문서
├── vercel.json                 # Vercel SPA rewrite & serverless config
├── package.json
└── vite.config.ts
```

---

## 5. 실행 및 배포 가이드 (Getting Started & Deployment)

### 5.1 로컬 개발 실행
```bash
npm install
npm run dev
# 브라우저: http://localhost:5173/
```

### 5.2 프로덕션 빌드
```bash
npm run build
# React.lazy + Vite manualChunks로 초기 청크 크기 21KB 최적화 완료
```

### 5.3 Vercel 배포
1. [Vercel](https://vercel.com)에서 GitHub 저장소(`PeterPark2021/korean-toktok-app`) Import
2. Environment Variables에 `GEMINI_API_KEY` 등록 (서버 전용, 키 없어도 내장 튜터로 정상 작동)
3. Deploy 클릭 ➡️ 배포 완료!

---

## 6. 향후 추가 작업 및 권장 로드맵 (Roadmap)

1. **상황별 고해상도 AI 일러스트 전 단원 생성 (Unit 02~07, Unit 09~45)**:
   - 각 단원별 주제와 상황에 부합하는 일러스트 에셋 배치.
2. **클라우드 데이터베이스 / 백엔드 연동 (Supabase / Firebase)**:
   - 다중 디바이스 간 실시간 학습 진도 동기화 및 랭킹 시스템.
3. **결제 및 구독 수익화 연동 (PortOne / Toss Payments / Stripe)**:
   - 무료 체험 단원 및 프리미엄 단원/AI 튜터 무제한 질문 패키지.
4. **Google AdMob / 애드센스 광고 위젯 연동**:
   - 단원 완료 보상형 광고 및 학습 대시보드 하단 배너 광고 슬롯.
