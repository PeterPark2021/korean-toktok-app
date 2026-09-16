# Korean TokTok (한국어 톡톡) - Developer Hand-off Document

> **문서 버전:** 1.0.0  
> **최종 갱신일:** 2026-09-16  
> **프로젝트 성격:** 다문화가정 및 외국인 학습자를 위한 실용 한국어 회화, 어휘, 문법, 문화, 퀴즈 통합 학습 웹 애플리케이션

---

## 1. 프로젝트 개요 (Project Overview)

**Korean TokTok (한국어 톡톡)**은 KBS 실용 한국어 교재 및 Wiz 한국어 교육 과정을 기반으로, 초급부터 고급까지 총 45개 단원의 실생활 한국어를 효과적으로 학습할 수 있는 인터랙티브 웹 애플리케이션입니다.

- **프론트엔드 스택:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **음성/AI 기능:** Web Speech API (TTS 음성 합성 & STT 발음 평가), Google Gemini AI (`@google/genai`) 문법 튜터
- **시각화 및 게이미피케이션:** 애니메이션 아바타, 단원별 상황 일러스트, 14종 메탈릭 성취 뱃지 시스템, 어휘 연상 비주얼 큐, 실사 한국 문화 카드

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

### 3.1 비주얼 회화 뷰어 (`src/components/study/DialogueViewer.tsx`)
- **캐릭터 아바타 시스템 (`src/utils/characterAvatar.ts`)**:
  - 민호, 리홍, 도안, 수연, 선생님, 점원 등 발화자별 전용 아바타 매핑
- **상황별 배너 일러스트 (`src/utils/unitSituation.ts`)**:
  - 단원별 첫 만남, 쇼핑, 식당, 길 찾기 등 고해상도 상황 삽화 렌더링
- **롤플레이 및 섀도잉 모드**:
  - 특정 화자 선택 후 사용자 음성(STT)으로 따라 말하기 및 발음 정확도 채점
  - Web Speech API 기반 한국어 TTS 자연 발음 재생

### 3.2 어휘 플래시카드 & 문화 톡톡 (`src/components/study/CultureViewer.tsx`, `VocabFlashcard.tsx`)
- **어휘 연상 비주얼 큐 (`src/utils/vocabVisuals.ts`)**:
  - 10개 시맨틱 카테고리(인사, 인물, 음식, 장소, 시간 등)에 따른 컬러 태그, 이모지 및 연상 기억 힌트 제공
- **문화 톡톡 4번째 탭 (`src/data/culture/cultureData.ts`)**:
  - 45개 전 단원에 대한 한국 문화 배경, 고화질 실사 사진, 에티켓 Do & Don't, 원어민 필수 표현 수록

### 3.3 멀티모달 퀴즈 엔진 (`src/components/quiz/QuizEngine.tsx`, `MultipleChoiceCard.tsx`)
- **그림/사진 기반 객관식 퀴즈 (`src/utils/visualQuizHelper.ts`)**:
  - 단원 주제와 어휘에 맞는 시각 자극(상황도, 문화 사진, 캐릭터 등)을 동적으로 퀴즈 카드에 포함
- **즉각적인 정답/오답 시각 피드백**:
  - 정답 선택 시 축하 애니메이션 및 상세 한국어 해설 표시

### 3.4 게이미피케이션 & 대시보드 (`src/components/dashboard/BadgeCollection.tsx`, `src/pages/ProgressPage.tsx`)
- **14종 메탈릭 성취 뱃지 (`src/data/badges/badgeData.ts`)**:
  - 브론즈/실버/골드/플래티넘/에메랄드/루비/다이아몬드 등 등급별 스타일링
  - 실시간 학습 진도(회화 완주, 어휘 암기, 문법 마스터, 퀴즈 100점, 연속 학습일 등) 자동 계산
  - 뱃지 클릭 시 획득 조건, 획득 일시, 진행도 바가 포함된 모달 팝업

### 3.5 초성 및 자모 분해 검색 엔진 (`src/utils/hangulSearch.ts`, `src/services/searchService.ts`)
- **입력 중 깜박임 완전 제거**:
  - 한글 조합 중(예: `존` -> `존ㅊ` -> `존칭`)에도 끊김 없이 매칭되는 자모 분해 알고리즘
  - React 19 `useDeferredValue` + 동기 검색 처리로 키 입력 지연 및 모달 리렌더링 제거
  - `isolation: isolate` 및 GPU 합성 최적화로 모달 타이핑 시 배경 깜빡임 현상 원천 차단

### 3.6 Google Gemini AI 기반 문법 튜터 (`src/services/aiExplanation.ts`)
- Claude AI에서 최신 Google Gemini AI (`@google/genai`) 모델로 전면 교체
- 문법 질문에 대한 다문화 학습자 친화적 맞춤형 쉬운 한국어/외국어 설명 지원

---

## 4. 디렉터리 구조 (Directory Structure)

```text
korean-toktok-app/
├── .agents/                    # 에이전트 규칙 및 스키마 정의
│   └── rules/data-schema.md
├── books/                      # KBS 교재 원본 PDF 및 추출 텍스트
├── data/                       # 원본 및 빌드된 JSON 단원 데이터
├── public/
│   ├── images/
│   │   ├── characters/         # 8종 캐릭터 아바타 (minho.webp, lihong.webp 등)
│   │   ├── culture/            # 실사 문화 사진 (palace.jpg, market.jpg 등)
│   │   └── situations/         # 단원 상황 일러스트 (unit01.webp 등)
│   └── favicon.svg
├── scripts/                    # 데이터 추출, 변환 및 빌드 자동화 스크립트
│   ├── build_all_units.js
│   ├── extract_kbs_pdfs.js
│   ├── generate_dual_data_index.js
│   └── validate_kbs_wiz_system.js
├── src/
│   ├── components/
│   │   ├── common/             # GlobalSearchModal, Header, Navigation 등
│   │   ├── dashboard/          # BadgeCollection, ProgressStats 등
│   │   ├── quiz/               # QuizEngine, MultipleChoiceCard 등
│   │   └── study/              # DialogueViewer, CultureViewer, VocabFlashcard 등
│   ├── data/                   # 앱 내 런타임 데이터 모듈
│   │   ├── badges/             # 14종 뱃지 메타데이터 (badgeData.ts)
│   │   ├── culture/            # 45개 단원 문화 데이터 (cultureData.ts)
│   │   ├── dialogues/          # 45개 단원 회화 JSON
│   │   ├── grammar/            # 45개 단원 문법 JSON
│   │   ├── quiz/               # 45개 단원 퀴즈 JSON
│   │   ├── vocab/              # 45개 단원 어휘 JSON
│   │   ├── index.ts            # 통합 데이터 공급자
│   │   └── units.json          # 45개 단원 목차
│   ├── hooks/                  # useProgress, useTTS, useSpeechRecognition
│   ├── pages/                  # StudyPage, QuizPage, ProgressPage
│   ├── services/               # aiExplanation, searchService
│   ├── types/                  # 전역 TypeScript 타입 인터페이스
│   ├── utils/                  # hangulSearch, characterAvatar, vocabVisuals 등
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── AGENTS.md                   # 프로젝트 규칙 및 스키마 지침
├── HANDOFF.md                  # 본 인수인계 문서
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 5. 실행 및 빌드 가이드 (Getting Started)

### 5.1 로컬 개발 서버 실행
```bash
# 패키지 설치
npm install

# 개발 서버 시작 (기본 포트: http://localhost:5173/)
npm run dev
```

### 5.2 프로덕션 빌드 및 검증
```bash
# TypeScript 타입 검사 및 Vite 번들링
npm run build

# 빌드 산출물 미리보기
npm run preview
```

### 5.3 데이터 재생성 및 검증 스크립트 실행
```bash
# 45개 단원 데이터 유효성 검증
node scripts/validate_kbs_wiz_system.js

# 전체 단원 인덱스 재생성
node scripts/generate_dual_data_index.js
```

---

## 6. 다음 개발자를 위한 로드맵 & 권장 사항 (Next Steps)

1. **라우트 단위 코드 스플리팅 (`React.lazy`)**:
   - 현재 번들 크기가 약 1.39MB이므로, `StudyPage`, `QuizPage`, `ProgressPage`를 동적 `import()`로 분할하여 초기 로딩 속도 최적화.
2. **단원별 상황 삽화 확장**:
   - 현재 Unit 01, Unit 08에 적용된 고품질 WebP 상황 일러스트를 나머지 주요 단원(Unit 2~7, 9~45)으로 점진적 확대.
3. **학습 진도 클라우드 동기화 (선택 사항)**:
   - 현재 `localStorage` 기반의 `useProgress.ts`를 Firebase Firestore / Supabase와 연동하여 다중 기기 학습 이어하기 지원.
4. **음성 인식(STT) 점수 산출 알고리즘 고도화**:
   - Levenshtein 거리 알고리즘 기반 음소 단위 피드백(틀린 글자 하이라이트) 추가.
