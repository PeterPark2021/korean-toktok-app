# Korean TokTok Data Schemas Rule

이 문서는 Korean TokTok App의 모든 데이터(단원 목차, 회화문, 어휘, 문법, 퀴즈) 생성 및 파싱 시 준수해야 하는 표준 데이터 스키마 규칙입니다. 모든 데이터 파일은 아래의 표준 JSON 스키마를 엄격히 따라야 합니다.

---

## 1. 단원 목록 스키마 (`data/units.json`)

- **경로**: `data/units.json`
- **구조**: 단원 객체의 JSON 배열 `Array<UnitItem>`

```json
{
  "unit_number": 1,
  "title": "안녕하세요",
  "topic": "인사",
  "situation": "첫 만남",
  "level": "초급"
}
```

### 필드 정의
| 필드명 | 타입 | 필수 여부 | 설명 |
|:---|:---:|:---:|:---|
| `unit_number` | `number` | 필수 | 단원 번호 (1, 2, 3, ...) |
| `title` | `string` | 필수 | 단원 제목 (예: "안녕하세요", "1-1. 한글") |
| `topic` | `string` | 필수 | 핵심 주제 (예: "인사", "가족 소개") |
| `situation` | `string` | 필수 | 대화 상황 및 배경 설명 |
| `level` | `string` | 필수 | 학습 단계 (`"초급"` \| `"중급"` \| `"고급"`) |
| `book` | `string` | 선택 | 교재 세부 구분 (`"초급a"`, `"초급b"`, `"중급a"`, `"중급b"`, `"고급a"`) |

---

## 2. 회화문 스키마 (`data/dialogues/unitXX.json`)

- **경로**: `data/dialogues/unit{unit_number.padStart(2, '0')}.json` (예: `unit01.json`)
- **구조**: 회화 문장 객체의 JSON 배열 `Array<DialogueItem>`

```json
{
  "unit": 1,
  "dialogue_id": "d1-1",
  "speaker": "A",
  "korean_text": "안녕하세요.",
  "translation": "Hello.",
  "audio_hint": "정중한 인사, 하강 억양"
}
```

### 필드 정의
| 필드명 | 타입 | 필수 여부 | 설명 |
|:---|:---:|:---:|:---|
| `unit` | `number` | 필수 | 소속 단원 번호 |
| `dialogue_id` | `string` | 필수 | 고유 대화 ID (예: `"d1-1"`, `"unit01_d01_01"`) |
| `speaker` | `string` | 필수 | 화자 이름 또는 역할 (예: `"김민호"`, `"리홍"`, `"A"`, `"B"`) |
| `korean_text` | `string` | 필수 | 한국어 발화 본문 문장 |
| `translation` | `string` | 필수 | 발화 번역문 (영어/외국어 번역) |
| `audio_hint` | `string` | 필수 | 발음, 억양, 상황 감정 가이드 (TTS/오디오 힌트) |

---

## 3. 핵심 어휘 스키마 (`data/vocab/unitXX.json`)

- **경로**: `data/vocab/unit{unit_number.padStart(2, '0')}.json` (예: `unit01.json`)
- **구조**: 어휘 객체의 JSON 배열 `Array<VocabItem>`

```json
{
  "word": "안녕하세요",
  "meaning": "Hello (formal)",
  "part_of_speech": "감탄사",
  "example_sentence": "선생님, 안녕하세요.",
  "level": "초급"
}
```

### 필드 정의
| 필드명 | 타입 | 필수 여부 | 설명 |
|:---|:---:|:---:|:---|
| `word` | `string` | 필수 | 표제어 (어휘) |
| `meaning` | `string` | 필수 | 단어 의미 (뜻풀이 및 영문/한국어 설명) |
| `part_of_speech` | `string` | 필수 | 품사 (`"명사"`, `"동사"`, `"형용사"`, `"감탄사"`, `"부사"`, `"수사"` 등) |
| `example_sentence` | `string` | 필수 | 해당 어휘가 사용된 대표 예문 |
| `level` | `string` | 필수 | 난이도 (`"초급"` \| `"중급"` \| `"고급"`) |

---

## 4. 문법 해설 스키마 (`data/grammar/unitXX.json`)

- **경로**: `data/grammar/unit{unit_number.padStart(2, '0')}.json` (예: `unit01.json`)
- **구조**: 문법 항목 객체의 JSON 배열 `Array<GrammarItem>`

```json
{
  "grammar_point": "-습니다/-ㅂ니다",
  "explanation": "격식체 종결어미",
  "example_sentences": [
    "갑니다.",
    "먹습니다."
  ],
  "related_vocab": [
    "가다",
    "먹다"
  ]
}
```

### 필드 정의
| 필드명 | 타입 | 필수 여부 | 설명 |
|:---|:---:|:---:|:---|
| `grammar_point` | `string` | 필수 | 문법 명칭/패턴 (예: `"N이에요/예요"`, `"-습니다/-ㅂ니다"`) |
| `explanation` | `string` | 필수 | 문법 기능, 받침 결합 규칙, 상황 뉘앙스 해설 |
| `example_sentences` | `Array<string>` | 필수 | 해당 문법이 적용된 예문 배열 (2개 이상 권장) |
| `related_vocab` | `Array<string>` | 필수 | 연관 또는 결합 빈도가 높은 핵심 어휘 목록 |

---

## 5. 퀴즈/평가 스키마 (`data/quiz/unitXX.json`)

- **경로**: `data/quiz/unit{unit_number.padStart(2, '0')}.json` (예: `unit01.json`)
- **구조**: 퀴즈 문항 객체의 JSON 배열 `Array<QuizItem>`

```json
{
  "quiz_id": "q1-1",
  "type": "multiple_choice",
  "question": "빈칸에 알맞은 것은? 저는 학생___.",
  "options": [
    "이에요",
    "예요",
    "습니다",
    "이다"
  ],
  "answer": "이에요",
  "explanation": "받침 있는 명사 뒤에는 '이에요'를 씁니다.",
  "source_unit": 1
}
```

### 필드 정의
| 필드명 | 타입 | 필수 여부 | 설명 |
|:---|:---:|:---:|:---|
| `quiz_id` | `string` | 필수 | 퀴즈 문항 고유 ID (예: `"q1-1"`, `"unit01_q01"`) |
| `type` | `string` | 필수 | 퀴즈 유형 (`"multiple_choice"`, `"fill_in_the_blank"`, `"sentence_reordering"`) |
| `question` | `string` | 필수 | 문제 지문 및 문항 텍스트 |
| `options` | `Array<string>` | 조건부 필수 | 객관식(`multiple_choice`) 유형일 때 필수 4지선다 보기 배열 |
| `answer` | `string` | 필수 | 정답 텍스트 또는 완성 문장 |
| `explanation` | `string` | 필수 | 문법적/어휘적 정답 근거 해설 |
| `source_unit` | `number` | 필수 | 출제 기준 단원 번호 |
