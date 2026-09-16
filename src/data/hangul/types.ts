export interface VowelData {
  char: string;
  name: string;
  romanization: string;
  type: 'basic' | 'compound';
  strokes: string[]; // e.g., ["위에서 아래로 (ㅣ)", "오른쪽으로 짧게 (-)"]
  pronunciationTip: string;
  mouthShape?: string;
  exampleWords: { word: string; meaning: string; romanization: string }[];
}

export interface ConsonantData {
  char: string;
  name: string;
  romanization: string;
  type: 'basic' | 'tense';
  soundType: 'plain' | 'tense' | 'aspirated'; // 예사소리, 된소리, 거센소리
  strokes: string[];
  articulationPosition: string; // 입술소리, 잇몸소리, 센입천장소리, 여린입천장소리, 목청소리
  pronunciationTip: string;
  contrastGroup?: string; // e.g. "g_group" for ㄱ-ㄲ-ㅋ
  exampleWords: { word: string; meaning: string; romanization: string }[];
}

export interface BatchimRule {
  representativeSound: string; // e.g. "[ㄱ]"
  romanization: string;
  consonants: string[]; // ["ㄱ", "ㄲ", "ㅋ", "ㄳ", "ㄺ"]
  description: string;
  exampleWords: { word: string; actualPronunciation: string; meaning: string }[];
}

export interface CompoundBatchimRule {
  batchim: string; // e.g. "ㄳ"
  pronouncedAs: string; // e.g. "[ㄱ]"
  category: 'first_sound' | 'second_sound' | 'conditional';
  ruleDescription: string;
  exampleWords: { word: string; actualPronunciation: string; meaning: string }[];
}

export interface BatchimSentence {
  id: number;
  korean: string;
  pronunciation: string;
  translation: string;
  targetBatchim: string;
}

export interface WordOrderComparison {
  language: 'korean' | 'english' | 'vietnamese';
  langName: string;
  flag: string;
  pattern: string; // SOV or SVO
  elements: { role: 'S' | 'O' | 'V'; text: string; label: string }[];
  fullSentence: string;
}

export interface GrammarPrimerConcept {
  id: string;
  title: string;
  category: 'pos' | 'word_order' | 'particles';
  summary: string;
  explanation: string;
  examples: { korean: string; translation: string; highlight?: string }[];
}

export interface ClassroomExpression {
  id: number;
  korean: string;
  romanization: string;
  translation: string;
  situation: string;
  audioText: string;
}

export interface HangulQuizQuestion {
  id: string;
  type: 'sound_discrimination' | 'batchim_identification' | 'word_match';
  question: string;
  audioPrompt: string; // Text spoken by TTS
  options: string[];
  answer: string;
  explanation: string;
}
