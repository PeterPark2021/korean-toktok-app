import { useState, useCallback, useRef } from 'react';

// SpeechRecognition global type helper
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

// Levenshtein distance for string similarity (0 ~ 100%)
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.replace(/[\s.,?!~]/g, '').toLowerCase();
  const s2 = str2.replace(/[\s.,?!~]/g, '').toLowerCase();

  if (s1 === s2) return 100;
  if (!s1.length || !s2.length) return 0;

  const track = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(null));

  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = Math.max(0, Math.round((1 - distance / maxLen) * 100));
  return similarity;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  accuracy: number | null;
  supported: boolean;
  startListening: (targetText: string) => void;
  stopListening: () => void;
  resetRecognition: () => void;
  feedbackMessage: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const targetTextRef = useRef<string>('');

  const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
  const isSupported = !!(win?.SpeechRecognition || win?.webkitSpeechRecognition);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }
  }, []);

  const resetRecognition = useCallback(() => {
    stopListening();
    setTranscript('');
    setAccuracy(null);
    setFeedbackMessage(null);
  }, [stopListening]);

  const startListening = useCallback(
    (targetText: string) => {
      if (!isSupported || typeof window === 'undefined') {
        setFeedbackMessage('현재 브라우저에서는 음성 인식을 지원하지 않습니다. (Chrome 권장)');
        return;
      }

      resetRecognition();
      targetTextRef.current = targetText;

      const SpeechRecognitionClass = win?.SpeechRecognition || win?.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'ko-KR';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setFeedbackMessage('듣고 있습니다... 한국어로 따라 읽어주세요.');
      };

      recognition.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          const score = calculateSimilarity(targetTextRef.current, currentTranscript);
          setAccuracy(score);

          if (score >= 85) {
            setFeedbackMessage('🎉 훌륭합니다! 완벽한 발음이에요!');
          } else if (score >= 60) {
            setFeedbackMessage('👍 아주 좋아요! 조금만 더 또박또박 발음해 보세요.');
          } else {
            setFeedbackMessage('💪 다시 한 번 천천히 따라 읽어볼까요?');
          }
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setFeedbackMessage('마이크 권한이 차단되었습니다. 브라우저 설정에서 마이크를 허용해주세요.');
        } else if (event.error === 'no-speech') {
          setFeedbackMessage('음성이 감지되지 않았습니다. 다시 시도해 주세요.');
        } else {
          setFeedbackMessage(`오류 발생: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (e) {
        setFeedbackMessage('마이크를 시작할 수 없습니다.');
      }
    },
    [isSupported, resetRecognition, win]
  );

  return {
    isListening,
    transcript,
    accuracy,
    supported: isSupported,
    startListening,
    stopListening,
    resetRecognition,
    feedbackMessage
  };
};
