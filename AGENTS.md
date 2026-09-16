# Korean TokTok App Rules

## Data Schemas Rule
모든 단원 데이터(`units.json`, `dialogues/unitXX.json`, `vocab/unitXX.json`, `grammar/unitXX.json`, `quiz/unitXX.json`)는 [.agents/rules/data-schema.md](file:///.agents/rules/data-schema.md)에 정의된 표준 스키마를 엄격히 준수해야 합니다.

### 1. units.json
```json
{ "unit_number": 1, "title": "안녕하세요", "topic": "인사", "situation": "첫 만남", "level": "초급" }
```

### 2. dialogues/unitXX.json
```json
{ "unit": 1, "dialogue_id": "d1-1", "speaker": "A", "korean_text": "안녕하세요.", "translation": "Hello.", "audio_hint": "정중한 인사, 하강 억양" }
```

### 3. vocab/unitXX.json
```json
{ "word": "안녕하세요", "meaning": "Hello (formal)", "part_of_speech": "감탄사", "example_sentence": "선생님, 안녕하세요.", "level": "초급" }
```

### 4. grammar/unitXX.json
```json
{ "grammar_point": "-습니다/-ㅂ니다", "explanation": "격식체 종결어미", "example_sentences": ["갑니다.", "먹습니다."], "related_vocab": ["가다", "먹다"] }
```

### 5. quiz/unitXX.json
```json
{ "quiz_id": "q1-1", "type": "multiple_choice", "question": "빈칸에 알맞은 것은? 저는 학생___.", "options": ["이에요", "예요", "습니다", "이다"], "answer": "이에요", "explanation": "받침 있는 명사 뒤에는 '이에요'를 씁니다.", "source_unit": 1 }
```
*(퀴즈 type: `"multiple_choice"` (options 필수), `"fill_in_the_blank"`, `"sentence_reordering"`)*
