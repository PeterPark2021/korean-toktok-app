import fs from 'fs';
import path from 'path';

let content = `import { UnitItem, DialogueItem, VocabItem, GrammarItem, QuizItem, EditionType, BookCode, BookMeta } from '../types';

// Book Metadata
export const BOOKS_METADATA: Record<BookCode, BookMeta> = {
  '초급a': {
    code: '초급a',
    title: '한국어 톡톡 초급 A',
    level: '초급',
    unitRange: [1, 10],
    unitCount: 10,
    description: '한글 자모음 구성, 기초 인사, 가족 및 일상생활 기본 표현',
    color: 'emerald',
    accentBg: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400'
  },
  '초급b': {
    code: '초급b',
    title: '한국어 톡톡 초급 B',
    level: '초급',
    unitRange: [11, 20],
    unitCount: 10,
    description: '안부와 약속, 높임말, 여가, 여행, 주거 생활 및 명절 문화',
    color: 'blue',
    accentBg: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-400'
  },
  '중급a': {
    code: '중급a',
    title: '한국어 톡톡 중급 A',
    level: '중급',
    unitRange: [21, 30],
    unitCount: 10,
    description: '공공예절, 병원 및 건강, 진로 상담, 미디어, 환경과 과학기술',
    color: 'indigo',
    accentBg: 'from-indigo-500/10 to-blue-500/10 border-indigo-500/30 text-indigo-400'
  },
  '중급b': {
    code: '중급b',
    title: '한국어 톡톡 중급 B',
    level: '중급',
    unitRange: [31, 40],
    unitCount: 10,
    description: 'K-POP·드라마 감상, 비즈니스 직장 업무, 전래동화 및 라이프스타일',
    color: 'purple',
    accentBg: 'from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-400'
  },
  '고급a': {
    code: '고급a',
    title: '한국어 톡톡 고급 A',
    level: '고급',
    unitRange: [41, 45],
    unitCount: 5,
    description: '기후와 지구온난화, 스포츠 응원 문화, 속담과 관용구, 과학 윤리 및 가족 제도',
    color: 'rose',
    accentBg: 'from-rose-500/10 to-amber-500/10 border-rose-500/30 text-rose-400'
  }
};

export const ALL_BOOKS: BookMeta[] = Object.values(BOOKS_METADATA);

// 1. Units JSON Imports
import unitsKbs from './kbs/units.json';
import unitsWiz from './wiz/units.json';

// Helper to get book code for unit number
export function getBookForUnit(unitNumber: number): BookCode {
  if (unitNumber <= 10) return '초급a';
  if (unitNumber <= 20) return '초급b';
  if (unitNumber <= 30) return '중급a';
  if (unitNumber <= 40) return '중급b';
  return '고급a';
}

// 2. Dynamic unit file imports
`;

// Imports for 1..45 for dialogues, vocab, grammar, quiz for both kbs and wiz
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `// Unit ${pad}\n`;
  content += `import dKbs${pad} from './kbs/dialogues/unit${pad}.json';\n`;
  content += `import vKbs${pad} from './kbs/vocab/unit${pad}.json';\n`;
  content += `import gKbs${pad} from './kbs/grammar/unit${pad}.json';\n`;
  content += `import qKbs${pad} from './kbs/quiz/unit${pad}.json';\n`;

  content += `import dWiz${pad} from './wiz/dialogues/unit${pad}.json';\n`;
  content += `import vWiz${pad} from './wiz/vocab/unit${pad}.json';\n`;
  content += `import gWiz${pad} from './wiz/grammar/unit${pad}.json';\n`;
  content += `import qWiz${pad} from './wiz/quiz/unit${pad}.json';\n\n`;
}

content += `
// Map registries
const kbsDialoguesMap: Record<number, DialogueItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: dKbs${pad} as DialogueItem[],\n`;
}
content += `};

const wizDialoguesMap: Record<number, DialogueItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: dWiz${pad} as DialogueItem[],\n`;
}
content += `};

const kbsVocabMap: Record<number, VocabItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: vKbs${pad} as VocabItem[],\n`;
}
content += `};

const wizVocabMap: Record<number, VocabItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: vWiz${pad} as VocabItem[],\n`;
}
content += `};

const kbsGrammarMap: Record<number, GrammarItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: gKbs${pad} as GrammarItem[],\n`;
}
content += `};

const wizGrammarMap: Record<number, GrammarItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: gWiz${pad} as GrammarItem[],\n`;
}
content += `};

const kbsQuizMap: Record<number, QuizItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: qKbs${pad} as QuizItem[],\n`;
}
content += `};

const wizQuizMap: Record<number, QuizItem[]> = {
`;
for (let i = 1; i <= 45; i++) {
  const pad = String(i).padStart(2, '0');
  content += `  ${i}: qWiz${pad} as QuizItem[],\n`;
}
content += `};

// Default active edition in app
let activeEdition: EditionType = 'kbs';

export const getActiveEdition = (): EditionType => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('korean_toktok_edition') as EditionType;
    if (saved === 'kbs' || saved === 'wiz') return saved;
  }
  return activeEdition;
};

export const setActiveEdition = (edition: EditionType): void => {
  activeEdition = edition;
  if (typeof window !== 'undefined') {
    localStorage.setItem('korean_toktok_edition', edition);
    window.dispatchEvent(new CustomEvent('edition-changed', { detail: edition }));
  }
};

// Unified Getters
export const getAllUnits = (edition: EditionType = getActiveEdition()): UnitItem[] => {
  return (edition === 'kbs' ? unitsKbs : unitsWiz) as UnitItem[];
};

export const getUnitDetails = (unitNumber: number, edition: EditionType = getActiveEdition()): UnitItem => {
  const units = getAllUnits(edition);
  return units.find((u) => u.unit_number === unitNumber) || units[0];
};

export const getUnitDialogues = (unitNumber: number, edition: EditionType = getActiveEdition()): DialogueItem[] => {
  const map = edition === 'kbs' ? kbsDialoguesMap : wizDialoguesMap;
  return map[unitNumber] || map[1] || [];
};

export const getUnitVocab = (unitNumber: number, edition: EditionType = getActiveEdition()): VocabItem[] => {
  const map = edition === 'kbs' ? kbsVocabMap : wizVocabMap;
  return map[unitNumber] || map[1] || [];
};

export const getUnitGrammar = (unitNumber: number, edition: EditionType = getActiveEdition()): GrammarItem[] => {
  const map = edition === 'kbs' ? kbsGrammarMap : wizGrammarMap;
  return map[unitNumber] || map[1] || [];
};

export const getUnitQuiz = (unitNumber: number, edition: EditionType = getActiveEdition()): QuizItem[] => {
  const map = edition === 'kbs' ? kbsQuizMap : wizQuizMap;
  return map[unitNumber] || map[1] || [];
};

// Compatibility aliases
export const allUnits = unitsKbs as UnitItem[];
export const getDialoguesForUnit = getUnitDialogues;
export const getVocabForUnit = getUnitVocab;
export const getGrammarForUnit = getUnitGrammar;
export const getQuizForUnit = getUnitQuiz;
`;

fs.writeFileSync('src/data/index.ts', content, 'utf-8');
console.log('src/data/index.ts updated with full dual edition support!');
