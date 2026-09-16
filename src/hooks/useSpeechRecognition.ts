import { useState, useCallback, useRef } from 'react';
import { analyzePronunciation, PronunciationAnalysisResult } from '../utils/pronunciationAnalysis';

// SpeechRecognition global type helper
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  accuracy: number | null;
  supported: boolean;
  analysis: PronunciationAnalysisResult | null;
  startListening: (targetText: string) => void;
  stopListening: () => void;
  resetRecognition: () => void;
  feedbackMessage: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<PronunciationAnalysisResult | null>(null);
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
    setAnalysis(null);
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

        // Run real-time phoneme & character precision analysis
        const detailed = analyzePronunciation(targetTextRef.current, currentTranscript);
        setAnalysis(detailed);
        setAccuracy(detailed.score);

        if (event.results[0].isFinal) {
          if (detailed.score >= 85) {
            setFeedbackMessage('🎉 훌륭합니다! 거의 완벽한 원어민 발음이에요!');
          } else if (detailed.score >= 60) {
            setFeedbackMessage('👍 아주 좋아요! 아래 붉은색 글자의 발음 팁을 확인해 보세요.');
          } else {
            setFeedbackMessage('💪 붉은색 글자의 팁을 참고하여 천천히 다시 읽어볼까요?');
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
    analysis,
    startListening,
    stopListening,
    resetRecognition,
    feedbackMessage
  };
};
