// src/utils/hangulSearch.ts
// Robust Hangul decomposition, Choseong (초성) and incremental typing search matching

const HANGUL_START = 0xAC00;
const HANGUL_END = 0xD7A3;

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

/**
 * Decompose Hangul syllables into individual jamo characters.
 * Example: "존칭" -> "ㅈㅗㄴㅊㅣㅇ"
 * Example: "한국어" -> "ㅎㅏㄴㄱㅜㄱㅇㅓ"
 */
export function decomposeHangul(str: string): string {
  if (!str) return '';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= HANGUL_START && code <= HANGUL_END) {
      const offset = code - HANGUL_START;
      const cho = Math.floor(offset / (21 * 28));
      const jung = Math.floor((offset % (21 * 28)) / 28);
      const jong = offset % 28;
      result += CHOSEONG[cho] + JUNGSEONG[jung] + (jong > 0 ? JONGSEONG[jong] : '');
    } else {
      result += str[i].toLowerCase();
    }
  }
  return result;
}

/**
 * Extract choseong (initial consonants) from a string.
 * Example: "안녕하세요" -> "ㅇㄴㅎㅅㅇ"
 */
export function extractChoseong(str: string): string {
  if (!str) return '';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= HANGUL_START && code <= HANGUL_END) {
      const offset = code - HANGUL_START;
      const cho = Math.floor(offset / (21 * 28));
      result += CHOSEONG[cho];
    } else {
      result += str[i].toLowerCase();
    }
  }
  return result;
}

/**
 * Check if target text matches search query.
 * Supports:
 * 1. Standard substring match
 * 2. Incremental Hangul typing match (e.g. "존ㅊ" matches "존칭")
 * 3. Choseong (initial consonant) match (e.g. "ㅈㅊ" matches "존칭")
 */
export function matchHangul(target: string, query: string): boolean {
  if (!target || !query) return false;
  const cleanTarget = target.trim().toLowerCase();
  const cleanQuery = query.trim().toLowerCase();

  // 1. Exact or standard substring
  if (cleanTarget.includes(cleanQuery)) return true;

  // 2. Decomposed jamo stream match (handles incomplete syllable composition like "존ㅊ" -> "존칭")
  const targetDecomposed = decomposeHangul(cleanTarget);
  const queryDecomposed = decomposeHangul(cleanQuery);
  if (targetDecomposed.includes(queryDecomposed)) return true;

  // 3. Choseong search (if query consists only of choseong consonants)
  const isAllChoseong = /^[ㄱ-ㅎ]+$/.test(cleanQuery);
  if (isAllChoseong) {
    const targetChoseong = extractChoseong(cleanTarget);
    if (targetChoseong.includes(cleanQuery)) return true;
  }

  return false;
}
