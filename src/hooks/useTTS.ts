import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseTTSReturn {
  speak: (text: string, rate?: number) => void;
  stop: () => void;
  speaking: boolean;
  currentSpeakingText: string | null;
  supported: boolean;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  playDialogueQueue: (texts: string[], onIndexChange?: (index: number) => void, onComplete?: () => void) => void;
  isQueuePlaying: boolean;
  queueIndex: number;
}

/**
 * Clean text for Korean TTS:
 * - Converts tildes (~, ～) and connecting symbols to natural punctuation pauses (e.g. ", ")
 * - Converts numeric ranges (e.g. 1~2, 9시~6시) to natural Korean reading ("에서")
 * - Strips emojis and parenthesized annotations
 * - Cleans up and normalizes punctuation marks so TTS speaks with authentic prosody and pauses
 */
export function cleanKoreanForTTS(text: string): string {
  if (!text) return '';

  return (
    text
      // 1. Remove parenthesized text e.g. (휴가), (부서 팀장), (웃음)
      .replace(/\(.*?\)/g, ' ')
      .replace(/\[.*?\]/g, ' ')
      .replace(/\{.*?\}/g, ' ')
      // 2. Remove emojis
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, ' ')
      // 3. Convert range tildes between numbers (e.g. 1~2, 9시~6시) to "에서" for natural reading
      .replace(/(\d+)\s*[~～]\s*(\d+)/g, '$1에서 $2')
      // 4. Convert tildes (~, ～) into commas with space (", ") so TTS takes a natural conversational pause/breath
      .replace(/[~～]+/g, ', ')
      // 5. Convert connecting symbols (/, |, ·, \) into pauses
      .replace(/[\/|·\\]/g, ', ')
      // 6. Remove remaining unpronounceable special symbols
      .replace(/[\^_*#@+=<>`$%"']/g, ' ')
      // 7. Normalize multiple punctuation marks
      .replace(/\.{2,}/g, '. ')
      .replace(/!{2,}/g, '! ')
      .replace(/\?{2,}/g, '? ')
      // 8. Clean up conflicting adjacent commas and punctuation
      .replace(/([.?!])\s*,+/g, '$1 ')
      .replace(/,+\s*([.?!])/g, '$1 ')
      .replace(/,+\s*,+/g, ', ')
      .replace(/\s*,\s*/g, ', ')
      // 9. Consolidate whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export const useTTS = (): UseTTSReturn => {
  const [speaking, setSpeaking] = useState(false);
  const [currentSpeakingText, setCurrentSpeakingText] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // 약간 편안한 학습 속도
  const [supported, setSupported] = useState(false);
  const [koreanVoice, setKoreanVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Queue state
  const [isQueuePlaying, setIsQueuePlaying] = useState(false);
  const [queueIndex, setQueueIndex] = useState(-1);
  const queueRef = useRef<{ texts: string[]; onIndex?: (i: number) => void; onDone?: () => void }>({ texts: [] });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // 한국어 음성 찾기
        const koVoice = voices.find(
          (v) => v.lang === 'ko-KR' || v.lang.startsWith('ko') || v.name.includes('Korean') || v.name.includes('한국')
        );
        if (koVoice) {
          setKoreanVoice(koVoice);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setCurrentSpeakingText(null);
      setIsQueuePlaying(false);
      setQueueIndex(-1);
    }
  }, []);

  const speak = useCallback(
    (text: string, customRate?: number) => {
      if (!supported || typeof window === 'undefined') return;

      // 이전 발화 정지
      window.speechSynthesis.cancel();

      // 특수문자(~, 물결표, 이모지, 괄호 등) 정리
      const cleanText = cleanKoreanForTTS(text);
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ko-KR';
      utterance.rate = customRate || speechRate;
      utterance.pitch = 1.0;

      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      utterance.onstart = () => {
        setSpeaking(true);
        setCurrentSpeakingText(text);
      };

      utterance.onend = () => {
        setSpeaking(false);
        setCurrentSpeakingText(null);
      };

      utterance.onerror = () => {
        setSpeaking(false);
        setCurrentSpeakingText(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [supported, speechRate, koreanVoice]
  );

  const playDialogueQueue = useCallback(
    (texts: string[], onIndexChange?: (index: number) => void, onComplete?: () => void) => {
      if (!supported || texts.length === 0) return;
      stop();

      setIsQueuePlaying(true);
      queueRef.current = { texts, onIndex: onIndexChange, onDone: onComplete };

      let currentIdx = 0;

      const playNext = () => {
        if (currentIdx >= texts.length) {
          setIsQueuePlaying(false);
          setQueueIndex(-1);
          setSpeaking(false);
          setCurrentSpeakingText(null);
          queueRef.current.onDone?.();
          return;
        }

        const rawText = texts[currentIdx];
        setQueueIndex(currentIdx);
        queueRef.current.onIndex?.(currentIdx);

        const cleanText = cleanKoreanForTTS(rawText);
        const utterance = new SpeechSynthesisUtterance(cleanText || rawText);
        utterance.lang = 'ko-KR';
        utterance.rate = speechRate;
        if (koreanVoice) utterance.voice = koreanVoice;

        utterance.onstart = () => {
          setSpeaking(true);
          setCurrentSpeakingText(rawText);
        };

        utterance.onend = () => {
          currentIdx++;
          // 문장 간 약간의 휴지기 (400ms)
          setTimeout(() => {
            playNext();
          }, 400);
        };

        utterance.onerror = () => {
          currentIdx++;
          playNext();
        };

        window.speechSynthesis.speak(utterance);
      };

      playNext();
    },
    [supported, speechRate, koreanVoice, stop]
  );

  return {
    speak,
    stop,
    speaking,
    currentSpeakingText,
    supported,
    speechRate,
    setSpeechRate,
    playDialogueQueue,
    isQueuePlaying,
    queueIndex
  };
};
