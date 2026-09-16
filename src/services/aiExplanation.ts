import { QuizItem } from '../types';

export interface AIExplanationParams {
  quiz: QuizItem;
  userAnswer?: string | string[];
}

// Built-in intelligent AI pedagogical explanations with easy metaphors (Fallback / Instant Tutor Engine)
const getTutorMetaphor = (quiz: QuizItem, userAnsStr: string): string => {
  const qText = quiz.question;
  const answer = quiz.answer;

  if (qText.includes('은/는') || qText.includes('저(') || answer === '는' || answer === '은') {
    return `💡 **AI 튜터의 쉬운 비유**:
조사 **'은/는'**은 마치 **'오늘의 주인공 이름표'**를 달아주는 것과 같아요!
받침이 없는 글자(예: '저', '나')는 뒤에 미끄러지듯 부드러운 **'-는'**이 붙어야 발음하기가 훨씬 편하답니다. 
반대로 받침이 있는 무거운 글자(예: '선생님', '동생')는 받침을 받쳐주는 **'-은'**과 짝꿍이에요!
👉 **기억 팁**: 받침이 없으면 가볍게 **'는'**, 받침이 있으면 든든하게 **'은'**!`;
  }

  if (qText.includes('이에요/예요') || answer.includes('이에요') || answer.includes('예요')) {
    return `💡 **AI 튜터의 쉬운 비유**:
**'-이에요'**와 **'-예요'**는 명사가 신는 **'신발'**과 같아요!
'학생'이나 '회사원'처럼 마지막 글자에 받침(발)이 있으면 푹신한 **'이'**가 든 **'-이에요'** 신발을 신고,
'의사'나 '교사'처럼 받침이 없으면 가벼운 **'-예요'** 신발을 쏙 신는답니다.
👉 **기억 팁**: 받침(O) ➡️ **이에요** (3글자) / 받침(X) ➡️ **예요** (2글자)`;
  }

  if (qText.includes('몇 명') || qText.includes('세 명') || qText.includes('네 명') || answer === '세 명' || answer === '네') {
    return `💡 **AI 튜터의 쉬운 비유**:
숫자 **'하나, 둘, 셋, 넷'**은 단위 친구('명', '개', '살')를 만나러 갈 때 **'외출복으로 갈아입고 변신'**해요!
셋 ➡️ **세 (명)**, 넷 ➡️ **네 (명)** 처럼 끝 받침을 살짝 벗어두고 홀가분하게 변신한답니다.
👉 **기억 팁**: '셋 명', '넷 명'은 무거워요! 쏙 줄여서 **'세 명, 네 명'**으로 불러주세요!`;
  }

  if (qText.includes('아니에요') || qText.includes('이/가 아니다')) {
    return `💡 **AI 튜터의 쉬운 비유**:
**'N이/가 아니에요'**는 "그건 제가 찾는 게 아니에요!" 하고 **'주인공을 콕 집어 거절하는 돋보기'**예요.
부정하고 싶은 단어에 먼저 주격 조사 **'-이/가'**를 꼭 달아준 뒤 '아니에요'를 붙여야 자연스러운 한국어가 됩니다.
👉 **기억 팁**: 단어 + **이/가** + **아니에요** 세트로 기억해보세요!`;
  }

  if (qText.includes('의') || answer === '의') {
    return `💡 **AI 튜터의 쉬운 비유**:
조사 **'-의'**는 물건에 붙이는 **'소유권 스티커'**예요!
"리홍 씨의 가방", "나의 책상"처럼 누구의 물건인지 끈으로 묶어주는 마법의 연결고리랍니다.`;
  }

  return `💡 **AI 튜터의 맞춤 해설**:
한국어 문장에서는 앞 글자의 **'받침 유무'**와 **'자연스러운 말의 리듬'**이 가장 중요해요!
선택하신 '${userAnsStr}' 대신 정답인 **'${answer}'**을 사용하면 입에 걸림 없이 부드럽게 소리 낼 수 있습니다.
👉 **기억 팁**: 문장을 입으로 2~3번 소리 내어 읽어보면 정답의 멜로디가 자연스럽게 귀에 익게 됩니다!`;
};

export const fetchAIExplanation = async (params: AIExplanationParams): Promise<string> => {
  const { quiz, userAnswer } = params;
  const userAnsStr = Array.isArray(userAnswer) ? userAnswer.join(' ') : userAnswer || '(선택 안 함)';

  const apiKey =
    (typeof window !== 'undefined' && localStorage.getItem('gemini_api_key')) ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    null;

  // If Gemini API Key is provided, call Google Gemini API (gemini-1.5-flash / gemini-2.0-flash)
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `당신은 친절하고 명쾌한 한국어 전문 AI 튜터(Gemini AI)입니다.
초급 한국어 외국인 학습자가 다음 퀴즈 문제를 풀다가 오답을 골랐습니다.
- 문제 지문: ${quiz.question}
- 정답: ${quiz.answer}
- 학생이 고른 오답: ${userAnsStr}
- 기본 문법 설명: ${quiz.explanation}

초급 한국어 학습자에게 이 문법을 쉬운 일상생활의 비유(예: 옷과 모자 맞추기, 신발 짝 맞추기, 주인공 이름표 달기 등)를 들어 친절하게 설명해주세요.
3~4문장 내외로 친근하고 격려하는 어조(해요체)로 알기 쉽게 작성해주세요.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      );

      if (response.ok) {
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to built-in tutor engine:', e);
    }
  }

  // Fallback / Instant Intelligent Tutor Response with 400ms simulate thinking
  await new Promise((resolve) => setTimeout(resolve, 450));
  return getTutorMetaphor(quiz, userAnsStr);
};
