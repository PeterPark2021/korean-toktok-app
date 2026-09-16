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

      // 특수문자나 괄호 정리
      const cleanText = text.replace(/\(.*?\)/g, '').trim();
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

        const text = texts[currentIdx];
        setQueueIndex(currentIdx);
        queueRef.current.onIndex?.(currentIdx);

        const cleanText = text.replace(/\(.*?\)/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ko-KR';
        utterance.rate = speechRate;
        if (koreanVoice) utterance.voice = koreanVoice;

        utterance.onstart = () => {
          setSpeaking(true);
          setCurrentSpeakingText(text);
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
