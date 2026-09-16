import { HangulQuizQuestion } from './types';

export const HANGUL_QUIZ_QUESTIONS: HangulQuizQuestion[] = [
  // KBS Preliminary p.12 듣고 맞는 글자/단어 고르기
  {
    id: 'hq-1',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '거',
    options: ['가', '거', '겨'],
    answer: '거',
    explanation: "모음 'ㅓ[eo]'가 포함된 '거'입니다."
  },
  {
    id: 'hq-2',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '대',
    options: ['다', '대', '더'],
    answer: '대',
    explanation: "복합 모음 'ㅐ[ae]'가 결합된 '대'입니다."
  },
  {
    id: 'hq-3',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '로',
    options: ['레', '루', '로'],
    answer: '로',
    explanation: "모음 'ㅗ[o]'가 결합된 '로'입니다."
  },
  {
    id: 'hq-4',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 단어를 고르세요.',
    audioPrompt: '오이',
    options: ['아우', '오이', '어이'],
    answer: '오이',
    explanation: "'오[o]'와 '이[i]'가 결합된 '오이(cucumber)'입니다."
  },
  {
    id: 'hq-5',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '와',
    options: ['왜', '와', '워'],
    answer: '와',
    explanation: "이중모음 'ㅘ[wa]'입니다."
  },
  {
    id: 'hq-6',
    type: 'sound_discrimination',
    question: '음성을 듣고 예사소리/거센소리/된소리 중 맞는 단어를 고르세요.',
    audioPrompt: '바지',
    options: ['바지', '파지', '빠지'],
    answer: '바지',
    explanation: "예사소리 'ㅂ'으로 시작하는 '바지(pants)'입니다."
  },
  {
    id: 'hq-7',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 단어를 고르세요.',
    audioPrompt: '또래',
    options: ['도래', '또래', '토래'],
    answer: '또래',
    explanation: "된소리 'ㄸ'으로 시작하는 '또래(peers)'입니다."
  },
  {
    id: 'hq-8',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '까',
    options: ['가', '까', '카'],
    answer: '까',
    explanation: "된소리 'ㄲ'이 포함된 '까'입니다."
  },

  // KBS Preliminary p.15 받침 소리 구별 퀴즈
  {
    id: 'hq-9',
    type: 'batchim_identification',
    question: "단어 '꽃'의 받침은 7대 대표음 중 어떤 소리로 발음될까요?",
    audioPrompt: '꽃',
    options: ['[ㄱ]', '[ㄷ]', '[ㅂ]', '[ㅅ]'],
    answer: '[ㄷ]',
    explanation: "'ㅊ' 받침은 단어 끝이나 자음 앞에서 7대 대표음 [ㄷ]으로 소리납니다. (꽃 -> [꼳])"
  },
  {
    id: 'hq-10',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 받침 글자를 고르세요.',
    audioPrompt: '강',
    options: ['간', '감', '강'],
    answer: '강',
    explanation: "종성 'ㅇ[ng]' 받침이 들어간 '강(river)'입니다."
  },
  {
    id: 'hq-11',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '딸',
    options: ['달', '딸', '탈'],
    answer: '딸',
    explanation: "된소리 'ㄸ'과 유음 'ㄹ' 받침이 결합된 '딸(daughter)'입니다."
  },
  {
    id: 'hq-12',
    type: 'sound_discrimination',
    question: '음성을 듣고 알맞은 글자를 고르세요.',
    audioPrompt: '낮',
    options: ['납', '낮', '난'],
    answer: '낮',
    explanation: "지읒 받침 '낮(daytime, 발음 [낟])'입니다."
  },

  // KBS Preliminary p.17 겹받침 발음 퀴즈
  {
    id: 'hq-13',
    type: 'batchim_identification',
    question: "단어 '책을 읽다'에서 '읽다'의 표준 발음은 무엇일까요?",
    audioPrompt: '읽다',
    options: ['[익따]', '[일따]', '[일다]', '[익다]'],
    answer: '[익따]',
    explanation: "겹받침 'ㄺ'은 'ㄱ' 앞에서를 제외하고는 원칙적으로 [ㄱ]으로 발음되며, 뒤의 'ㄷ'은 된소리 [따]가 됩니다. (읽다 -> [익따])"
  },
  {
    id: 'hq-14',
    type: 'batchim_identification',
    question: "단어 '여덟'의 겹받침 'ㄼ'은 어떤 소리로 발음될까요?",
    audioPrompt: '여덟',
    options: ['[여덜]', '[여덥]', '[여답]', '[여들]'],
    answer: '[여덜]',
    explanation: "겹받침 'ㄼ'은 원칙적으로 앞 자음 [ㄹ]로 발음됩니다. (여덟 -> [여덜])"
  },
  {
    id: 'hq-15',
    type: 'batchim_identification',
    question: "단어 '값'의 겹받침 'ㅄ'의 실제 발음은 무엇일까요?",
    audioPrompt: '값',
    options: ['[갑]', '[갓]', '[가]', '[갑스]'],
    answer: '[갑]',
    explanation: "겹받침 'ㅄ'은 앞 자음 'ㅂ'으로 소리나 [갑]으로 발음됩니다."
  }
];
