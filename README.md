# Korean TokTok (한국어 톡톡) 🇰🇷💬

> **실생활 중심 한국어 회화, 어휘, 문법, 문화, 퀴즈 통합 인터랙티브 학습 플랫폼**  
> KBS 실용 한국어 교재 및 Wiz 교육과정을 기반으로 초급부터 고급까지 45개 단원을 체계적으로 학습할 수 있습니다.

---

## ✨ 주요 기능 (Key Features)

- 🎙️ **실시간 롤플레이 & 섀도잉 (Shadowing)**: Web Speech API (TTS/STT)를 활용한 화자별 회화 듣기 및 실시간 발음 평가
- 🎭 **비주얼 캐릭터 & 상황 일러스트**: 화자별 캐릭터 아바타 및 단원별 상황 배너 일러스트 제공
- 🗂️ **어휘 플래시카드 & 문화 톡톡**: 시맨틱 카테고리별 비주얼 큐와 45개 단원 한국 문화 실사 사진 및 에티켓 가이드
- 🧩 **멀티모달 퀴즈 엔진**: 사진/일러스트 연계 객관식, 빈칸 채우기, 문장 배열 퀴즈 및 즉각 피드백
- 🏆 **14종 메탈릭 성취 뱃지 시스템**: 학습 진도, 연속 학습일, 완주율에 따른 실시간 게이미피케이션 보상
- ⚡ **자모 분해 초성 검색 엔진**: 한글 입력 중 깜빡임 없이 초성 및 부분 자모까지 즉시 검색
- 🤖 **Google Gemini AI 문법 튜터**: 문법 포인트에 대한 다문화 학습자 맞춤형 쉬운 설명 지원

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **AI & Audio**: Google Gemini API (`@google/genai`), Web Speech API (SpeechSynthesis, SpeechRecognition)
- **Data Architecture**: Dual-source (KBS + Wiz) 45 Units JSON Pipeline (`.agents/rules/data-schema.md` 준수)

---

## 🚀 시작하기 (Quick Start)

```bash
# 1. 저장소 클론 및 이동
git clone https://github.com/PeterPark2021/korean-toktok-app.git
cd korean-toktok-app

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173/` 접속

---

## 📖 문서 (Documentation)

자세한 시스템 구조 및 다음 개발을 위한 가이드는 [HANDOFF.md](HANDOFF.md)를 참고하세요.
