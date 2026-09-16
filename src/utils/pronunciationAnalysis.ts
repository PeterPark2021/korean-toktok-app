// src/utils/pronunciationAnalysis.ts
// Precision Korean phoneme (초성, 중성, 종성) and character-level pronunciation analysis & error highlighter

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;

const CHOSEONG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

const JUNGSEONG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

const JONGSEONG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

export interface SyllableParts {
  isHangul: boolean;
  cho?: string;
  jung?: string;
  jong?: string;
  char: string;
}

export function decomposeSyllable(char: string): SyllableParts {
  if (!char || char.length === 0) return { isHangul: false, char: '' };
  const code = char.charCodeAt(0);
  if (code >= HANGUL_START && code <= HANGUL_END) {
    const offset = code - HANGUL_START;
    const choIdx = Math.floor(offset / (21 * 28));
    const jungIdx = Math.floor((offset % (21 * 28)) / 28);
    const jongIdx = offset % 28;
    return {
      isHangul: true,
      char,
      cho: CHOSEONG[choIdx],
      jung: JUNGSEONG[jungIdx],
      jong: JONGSEONG[jongIdx] || ''
    };
  }
  return { isHangul: false, char };
}

export type PronunciationStatus = 'correct' | 'incorrect' | 'missing' | 'space' | 'punctuation';

export interface AlignedCharacter {
  index: number;
  expectedChar: string;
  spokenChar?: string;
  status: PronunciationStatus;
  phoneticTip?: string;
  jamoDiff?: {
    expected: string;
    spoken: string;
    part: '초성' | '중성(모음)' | '종성(받침)' | '음절 전체';
  };
}

export interface PronunciationAnalysisResult {
  score: number;
  tokens: AlignedCharacter[];
  correctCount: number;
  incorrectCount: number;
  missingCount: number;
  totalEvaluated: number;
  actionableTips: string[];
}

/**
 * Generate specific phonetic advice for Korean foreign learners
 */
function getPhoneticAdvice(expected: string, spoken: string): { tip: string; diff?: AlignedCharacter['jamoDiff'] } {
  const expDecomp = decomposeSyllable(expected);
  const spkDecomp = decomposeSyllable(spoken);

  if (!expDecomp.isHangul || !spkDecomp.isHangul) {
    return {
      tip: `'${expected}' 발음에 조금 더 주의해 보세요.`,
      diff: { expected, spoken, part: '음절 전체' }
    };
  }

  // 1. Initial Consonant (초성) Difference
  if (expDecomp.cho !== spkDecomp.cho) {
    const isTenseMismatch =
      (['ㄱ', 'ㄲ', 'ㅋ'].includes(expDecomp.cho!) && ['ㄱ', 'ㄲ', 'ㅋ'].includes(spkDecomp.cho!)) ||
      (['ㄷ', 'ㄸ', 'ㅌ'].includes(expDecomp.cho!) && ['ㄷ', 'ㄸ', 'ㅌ'].includes(spkDecomp.cho!)) ||
      (['ㅂ', 'ㅃ', 'ㅍ'].includes(expDecomp.cho!) && ['ㅂ', 'ㅃ', 'ㅍ'].includes(spkDecomp.cho!)) ||
      (['ㅅ', 'ㅆ'].includes(expDecomp.cho!) && ['ㅅ', 'ㅆ'].includes(spkDecomp.cho!)) ||
      (['ㅈ', 'ㅉ', 'ㅊ'].includes(expDecomp.cho!) && ['ㅈ', 'ㅉ', 'ㅊ'].includes(spkDecomp.cho!));

    if (isTenseMismatch) {
      return {
        tip: `초성 주의: 예사소리/된소리/거센소리 구분 ('${expDecomp.cho}' ↔ '${spkDecomp.cho}')`,
        diff: { expected: expDecomp.cho!, spoken: spkDecomp.cho!, part: '초성' }
      };
    }
    return {
      tip: `초성 발음: '${expDecomp.cho}' 소리를 조금 더 또렷하게 내보세요. (인식된 소리: '${spkDecomp.cho}')`,
      diff: { expected: expDecomp.cho!, spoken: spkDecomp.cho!, part: '초성' }
    };
  }

  // 2. Vowel (중성) Difference
  if (expDecomp.jung !== spkDecomp.jung) {
    const vowelTips: Record<string, string> = {
      'ㅓ': "입을 'ㅏ'보다 조금만 벌리고 턱을 편안히 내려 'ㅓ' 소리를 내보세요.",
      'ㅡ': "입술을 옆으로 평평하게 당기고 혀를 뒤쪽에 두어 'ㅡ' 소리를 내보세요.",
      'ㅔ': "입술을 자연스럽게 옆으로 벌려 'ㅔ' 소리를 내보세요.",
      'ㅐ': "'ㅔ'보다 입을 조금 더 크게 벌려 'ㅐ' 소리를 내보세요.",
      'ㅗ': "입술을 둥글게 모아 앞으로 살짝 내밀며 'ㅗ' 소리를 내보세요.",
      'ㅜ': "입술을 'ㅗ'보다 더 좁게 둥글게 모아 'ㅜ' 소리를 내보세요."
    };

    const specificVowel = vowelTips[expDecomp.jung!] || `모음 '${expDecomp.jung}' 발음에 신경 써보세요.`;
    return {
      tip: `모음 차이: '${expDecomp.jung}' 대신 '${spkDecomp.jung}'로 인식됨. ${specificVowel}`,
      diff: { expected: expDecomp.jung!, spoken: spkDecomp.jung!, part: '중성(모음)' }
    };
  }

  // 3. Final Consonant / Batchim (종성) Difference
  if (expDecomp.jong !== spkDecomp.jong) {
    if (!spkDecomp.jong && expDecomp.jong) {
      return {
        tip: `받침 누락: 받침 '${expDecomp.jong}'을 끝까지 소리 내어 닫아주세요.`,
        diff: { expected: expDecomp.jong, spoken: '(받침 없음)', part: '종성(받침)' }
      };
    }
    if (spkDecomp.jong && !expDecomp.jong) {
      return {
        tip: `받침 초과: '${expected}'는 받침이 없는 글자입니다. 가볍게 소리를 끝내보세요.`,
        diff: { expected: '(받침 없음)', spoken: spkDecomp.jong, part: '종성(받침)' }
      };
    }
    return {
      tip: `받침 오류: 받침 '${expDecomp.jong}' 대신 '${spkDecomp.jong}'로 발음되었습니다.`,
      diff: { expected: expDecomp.jong!, spoken: spkDecomp.jong!, part: '종성(받침)' }
    };
  }

  return {
    tip: `'${expected}' 글자의 억양과 발음을 조금 더 자연스럽게 연결해 보세요.`,
    diff: { expected, spoken, part: '음절 전체' }
  };
}

/**
 * Needleman-Wunsch sequence alignment for Korean pronunciation comparison
 */
export function analyzePronunciation(targetSentence: string, spokenTranscript: string): PronunciationAnalysisResult {
  if (!targetSentence) {
    return {
      score: 0,
      tokens: [],
      correctCount: 0,
      incorrectCount: 0,
      missingCount: 0,
      totalEvaluated: 0,
      actionableTips: []
    };
  }

  const cleanTarget = targetSentence.trim();
  const cleanSpoken = (spokenTranscript || '').trim();

  // Filter out punctuation for character alignment matching
  const targetChars = Array.from(cleanTarget);
  const spokenChars = Array.from(cleanSpoken.replace(/[\s.,?!~"']/g, ''));

  // If transcript is empty
  if (spokenChars.length === 0) {
    const tokens: AlignedCharacter[] = targetChars.map((ch, idx) => {
      if (ch === ' ') return { index: idx, expectedChar: ch, status: 'space' };
      if (/^[.,?!~"'\s]$/.test(ch)) return { index: idx, expectedChar: ch, status: 'punctuation' };
      return {
        index: idx,
        expectedChar: ch,
        status: 'missing',
        phoneticTip: `'${ch}' 발음이 감지되지 않았습니다.`
      };
    });

    return {
      score: 0,
      tokens,
      correctCount: 0,
      incorrectCount: 0,
      missingCount: tokens.filter((t) => t.status === 'missing').length,
      totalEvaluated: tokens.filter((t) => t.status === 'missing').length,
      actionableTips: ['마이크 버튼을 누르고 문장을 끝까지 또박또박 읽어보세요.']
    };
  }

  // Build Cost Matrix for alignment
  // Match = 2, Mismatch = -1, Gap = -1
  const tFiltered: { char: string; originalIndex: number }[] = [];
  targetChars.forEach((ch, idx) => {
    if (!/^[.,?!~"'\s]$/.test(ch)) {
      tFiltered.push({ char: ch, originalIndex: idx });
    }
  });

  const n = tFiltered.length;
  const m = spokenChars.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const MATCH_SCORE = 2;
  const MISMATCH_PENALTY = -1;
  const GAP_PENALTY = -1;

  for (let i = 0; i <= n; i++) dp[i][0] = i * GAP_PENALTY;
  for (let j = 0; j <= m; j++) dp[0][j] = j * GAP_PENALTY;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const isExact = tFiltered[i - 1].char === spokenChars[j - 1];
      const matchScore = isExact ? MATCH_SCORE : MISMATCH_PENALTY;
      dp[i][j] = Math.max(
        dp[i - 1][j - 1] + matchScore, // Diagonal (align)
        dp[i - 1][j] + GAP_PENALTY, // Deletion (missing in spoken)
        dp[i][j - 1] + GAP_PENALTY // Insertion (extra in spoken)
      );
    }
  }

  // Traceback to find optimal alignment
  let i = n;
  let j = m;
  const alignedPairs: { expIdx: number; spokenChar?: string; status: PronunciationStatus }[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + (tFiltered[i - 1].char === spokenChars[j - 1] ? MATCH_SCORE : MISMATCH_PENALTY)) {
      const isExact = tFiltered[i - 1].char === spokenChars[j - 1];
      alignedPairs.unshift({
        expIdx: tFiltered[i - 1].originalIndex,
        spokenChar: spokenChars[j - 1],
        status: isExact ? 'correct' : 'incorrect'
      });
      i--;
      j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + GAP_PENALTY) {
      alignedPairs.unshift({
        expIdx: tFiltered[i - 1].originalIndex,
        status: 'missing'
      });
      i--;
    } else {
      // Extra char in spoken, skip
      j--;
    }
  }

  // Map back to original full string including spaces and punctuations
  const alignedMap = new Map<number, { spokenChar?: string; status: PronunciationStatus }>();
  alignedPairs.forEach((pair) => {
    alignedMap.set(pair.expIdx, { spokenChar: pair.spokenChar, status: pair.status });
  });

  const tokens: AlignedCharacter[] = [];
  const tipsSet = new Set<string>();
  let correctCount = 0;
  let incorrectCount = 0;
  let missingCount = 0;

  targetChars.forEach((ch, idx) => {
    if (ch === ' ') {
      tokens.push({ index: idx, expectedChar: ch, status: 'space' });
      return;
    }
    if (/^[.,?!~"']$/.test(ch)) {
      tokens.push({ index: idx, expectedChar: ch, status: 'punctuation' });
      return;
    }

    const matchInfo = alignedMap.get(idx);
    if (!matchInfo || matchInfo.status === 'missing') {
      missingCount++;
      tokens.push({
        index: idx,
        expectedChar: ch,
        status: 'missing',
        phoneticTip: `'${ch}' 발음이 누락되었습니다.`
      });
      tipsSet.add(`'${ch}' 글자를 빠뜨리지 않고 끝까지 발음해 보세요.`);
    } else if (matchInfo.status === 'correct') {
      correctCount++;
      tokens.push({
        index: idx,
        expectedChar: ch,
        spokenChar: matchInfo.spokenChar,
        status: 'correct',
        phoneticTip: '정확한 발음입니다! 👍'
      });
    } else {
      incorrectCount++;
      const { tip, diff } = getPhoneticAdvice(ch, matchInfo.spokenChar || '');
      tokens.push({
        index: idx,
        expectedChar: ch,
        spokenChar: matchInfo.spokenChar,
        status: 'incorrect',
        phoneticTip: tip,
        jamoDiff: diff
      });
      tipsSet.add(`[${ch} ➡️ ${matchInfo.spokenChar}] ${tip}`);
    }
  });

  const totalEvaluated = correctCount + incorrectCount + missingCount;
  const score = totalEvaluated > 0 ? Math.round((correctCount / totalEvaluated) * 100) : 0;

  return {
    score,
    tokens,
    correctCount,
    incorrectCount,
    missingCount,
    totalEvaluated,
    actionableTips: Array.from(tipsSet).slice(0, 4)
  };
}
