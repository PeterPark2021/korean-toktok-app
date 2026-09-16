// Vercel Serverless Function (Node.js runtime)
// 이 파일은 /api/explain 경로로 배포됩니다.
// GEMINI_API_KEY는 Vercel 프로젝트 설정(Environment Variables)에
// "서버 전용" 변수로 등록해야 합니다. VITE_ 접두사를 붙이면 절대 안 됩니다
// (VITE_ 접두사는 클라이언트 번들에 그대로 노출됩니다).

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface QuizPayload {
  question: string;
  answer: string;
  explanation: string;
}

interface ExplainRequestBody {
  quiz: QuizPayload;
  userAnswer?: string | string[];
}

// 아주 단순한 in-memory rate limit (서버리스 함수 인스턴스가 살아있는 동안만 유효).
// 프로덕션에서 더 엄격한 제한이 필요하면 Vercel KV / Upstash Redis 등으로 교체 권장.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1분
const RATE_LIMIT_MAX_REQUESTS = 20; // IP당 분당 20회

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Please try again in a moment.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // 키가 서버에 설정되어 있지 않으면, 프론트엔드가 자체 폴백(비유 설명)을 쓰도록
    // 명확한 신호를 돌려줍니다.
    res.status(503).json({ error: 'AI tutor not configured on server' });
    return;
  }

  const body = req.body as ExplainRequestBody;
  if (!body?.quiz?.question || !body?.quiz?.answer) {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  const { quiz, userAnswer } = body;
  const userAnsStr = Array.isArray(userAnswer) ? userAnswer.join(' ') : userAnswer || '(선택 안 함)';

  // 프롬프트 인젝션 방지를 위해 길이를 제한합니다.
  const safeQuestion = String(quiz.question).slice(0, 500);
  const safeAnswer = String(quiz.answer).slice(0, 200);
  const safeExplanation = String(quiz.explanation || '').slice(0, 500);
  const safeUserAnswer = String(userAnsStr).slice(0, 200);

  const prompt = `당신은 친절하고 명쾌한 한국어 전문 AI 튜터입니다.
초급 한국어 외국인 학습자가 다음 퀴즈 문제를 풀다가 오답을 골랐습니다.
- 문제 지문: ${safeQuestion}
- 정답: ${safeAnswer}
- 학생이 고른 오답: ${safeUserAnswer}
- 기본 문법 설명: ${safeExplanation}

초급 한국어 학습자에게 이 문법을 쉬운 일상생활의 비유(예: 옷과 모자 맞추기, 신발 짝 맞추기, 주인공 이름표 달기 등)를 들어 친절하게 설명해주세요.
3~4문장 내외로 친근하고 격려하는 어조(해요체)로 알기 쉽게 작성해주세요.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
        })
      }
    );

    if (!response.ok) {
      res.status(502).json({ error: 'Upstream AI provider error' });
      return;
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      res.status(502).json({ error: 'No explanation generated' });
      return;
    }

    res.status(200).json({ text });
  } catch (e) {
    console.error('Gemini API call failed:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
