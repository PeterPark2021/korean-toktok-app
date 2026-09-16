// Vercel Serverless Function (Node.js runtime)
// Endpoint: /api/roleplay
// Gemini 1.5 Flash multi-turn Korean Free-talking roleplay & real-time coaching

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RoleplayRequestBody {
  scenario: {
    id: string;
    title: string;
    level: string;
    situation: string;
    aiPersona: {
      name: string;
      role: string;
      tone: string;
    };
    userRole: string;
    missions: { id: string; text: string; completed: boolean }[];
  };
  history: { sender: 'user' | 'ai'; text: string }[];
  userMessage: string;
  userTurnCount: number; // 1 to 7
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

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
    res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'AI roleplay tutor not configured on server' });
    return;
  }

  const body = req.body as RoleplayRequestBody;
  if (!body?.scenario || !body?.userMessage) {
    res.status(400).json({ error: 'Invalid request payload' });
    return;
  }

  const { scenario, history, userMessage, userTurnCount } = body;
  const isFinalTurn = userTurnCount >= 7;

  const missionsListText = scenario.missions
    .map((m) => `- ID: "${m.id}", 내용: "${m.text}", 현재 완료여부: ${m.completed ? '완료' : '미완료'}`)
    .join('\n');

  const historyText = (history || [])
    .slice(-10)
    .map((h) => `${h.sender === 'user' ? '학습자(' + scenario.userRole + ')' : scenario.aiPersona.name + '(' + scenario.aiPersona.role + ')'}: ${h.text}`)
    .join('\n');

  const systemInstruction = `당신은 한국어 교육 전문 AI 롤플레이 튜터입니다.
현재 상황: ${scenario.situation}
당신의 역할: ${scenario.aiPersona.name} (${scenario.aiPersona.role})
학습자 역할 및 캐릭터: ${scenario.userRole}
학습자 레벨: ${scenario.level}
당신의 말투와 태도: ${scenario.aiPersona.tone}

현재 학습자의 발화 턴: ${userTurnCount} / 7 턴 (최대 7턴 제한)
${isFinalTurn ? '★ [중요] 이번 턴이 7번째 마지막 턴입니다. 대화를 자연스럽고 따뜻하게 마무리 짓는 멘트를 해주세요.' : '대화의 흐름을 자연스럽게 이어가며 1~2문장 내외로 실감나게 대답하세요.'}

[미션 목록]
${missionsListText}

[지침]
1. 상대방을 부를 때는 반드시 학습자의 캐릭터 이름(${scenario.userRole.split(' ')[0]} 씨 또는 손님/환자 등 직책)으로 친근하고 자연스럽게 부르세요. 'OO 씨' 같은 임의의 미완성 기호나 플레이스홀더를 절대 사용하지 마세요.
2. 상대방(학습자)의 레벨(${scenario.level})에 적합한 자연스럽고 실용적인 한국어 구어체로 답변하세요.
3. 답변 길이는 1~2문장으로 너무 길지 않게 유지하세요.
4. 학습자의 이번 발화("${userMessage}")가 아직 완료되지 않은 미션을 충족했는지 엄격히 판단하여 달성된 미션 ID 목록(completedMissionIds)에 포함하세요.
5. 학습자의 이번 발화에 어색한 표현, 조사 오류, 높임말 어색함 등이 있다면 실시간 코칭 팁(coaching)을 1문장으로 친절하게 제공하세요. 오류 없이 매우 자연스럽다면 null 또는 빈 문자열을 반환하세요.

반드시 다음 JSON 형식으로만 응답하세요(Markdown 코드블록 없이 순수 JSON):
{
  "reply": "AI 캐릭터의 한국어 답변",
  "coaching": "학습자를 위한 1줄 자연스러운 표현 교정 팁 (없으면 null)",
  "completedMissionIds": ["달성된 미션 ID들..."]
}`;

  const prompt = `[이전 대화 기록]
${historyText || '(첫 대화)'}

[학습자의 최근 발화]
${userMessage}

위 지침에 따라 순수 JSON으로만 응답하세요:`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      res.status(502).json({ error: 'Upstream Gemini provider error' });
      return;
    }

    const result = await response.json();
    const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      res.status(502).json({ error: 'No response generated' });
      return;
    }

    let parsed: any;
    try {
      parsed = JSON.parse(rawText.trim());
    } catch {
      // Clean markdown fences if any
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    res.status(200).json({
      reply: parsed.reply || '네, 잘 알겠습니다. 말씀해 주셔서 감사합니다!',
      coaching: parsed.coaching || null,
      completedMissionIds: Array.isArray(parsed.completedMissionIds) ? parsed.completedMissionIds : [],
      isSessionFinished: isFinalTurn
    });
  } catch (e) {
    console.error('Roleplay API failed:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
