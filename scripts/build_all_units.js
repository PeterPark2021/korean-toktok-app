import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { units11to20 } from './data_units_11_20.js';
import { units21to30 } from './data_units_21_30.js';
import { units31to40 } from './data_units_31_40.js';
import { units41to45 } from './data_units_41_45.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const allNewUnits = [
  ...units11to20,
  ...units21to30,
  ...units31to40,
  ...units41to45
];

console.log(`Writing data for ${allNewUnits.length} new units (Units 11 to 45)...`);

// 1. Write dialogues, vocab, grammar, quiz for all units 11-45
for (const u of allNewUnits) {
  const numStr = String(u.unit).padStart(2, '0');
  
  const files = [
    { dir: 'dialogues', data: u.dialogues },
    { dir: 'vocab', data: u.vocab },
    { dir: 'grammar', data: u.grammar },
    { dir: 'quiz', data: u.quiz }
  ];

  for (const f of files) {
    const p1 = path.join(rootDir, 'src', 'data', f.dir, `unit${numStr}.json`);
    const p2 = path.join(rootDir, 'data', f.dir, `unit${numStr}.json`);
    
    // Ensure dir exists
    fs.mkdirSync(path.dirname(p1), { recursive: true });
    fs.mkdirSync(path.dirname(p2), { recursive: true });

    const jsonStr = JSON.stringify(f.data, null, 2);
    fs.writeFileSync(p1, jsonStr, 'utf-8');
    fs.writeFileSync(p2, jsonStr, 'utf-8');
  }
  console.log(`✓ Generated unit${numStr}.json for all categories`);
}

// 2. Update units.json with sequential unit_numbers (1 to 45)
const unitsJsonPathSrc = path.join(rootDir, 'src', 'data', 'units.json');
const unitsJsonPathData = path.join(rootDir, 'data', 'units.json');

const rawUnits = JSON.parse(fs.readFileSync(unitsJsonPathSrc, 'utf-8'));

// Re-map unit_numbers in units.json
let currentSeqUnit = 0;
let lastKey = '';

const updatedUnits = rawUnits.map((u) => {
  const key = `${u.book}_${u.title.split('.')[0].split('-')[0]}`;
  if (key !== lastKey) {
    currentSeqUnit++;
    lastKey = key;
  }
  return {
    ...u,
    unit_number: currentSeqUnit
  };
});

fs.writeFileSync(unitsJsonPathSrc, JSON.stringify(updatedUnits, null, 2), 'utf-8');
fs.writeFileSync(unitsJsonPathData, JSON.stringify(updatedUnits, null, 2), 'utf-8');
console.log(`✓ Updated units.json with sequential unit_number 1 to 45`);

// 3. Generate updated src/data/index.ts that imports and exports all 45 units
let importsDialogues = '';
let importsVocab = '';
let importsGrammar = '';
let importsQuiz = '';

let mapDialogues = '';
let mapVocab = '';
let mapGrammar = '';
let mapQuiz = '';

for (let i = 1; i <= 45; i++) {
  const numStr = String(i).padStart(2, '0');
  importsDialogues += `import dialoguesUnit${numStr} from './dialogues/unit${numStr}.json';\n`;
  importsVocab += `import vocabUnit${numStr} from './vocab/unit${numStr}.json';\n`;
  importsGrammar += `import grammarUnit${numStr} from './grammar/unit${numStr}.json';\n`;
  importsQuiz += `import quizUnit${numStr} from './quiz/unit${numStr}.json';\n`;

  mapDialogues += `  ${i}: dialoguesUnit${numStr} as DialogueItem[],\n`;
  mapVocab += `  ${i}: vocabUnit${numStr} as VocabItem[],\n`;
  mapGrammar += `  ${i}: grammarUnit${numStr} as GrammarItem[],\n`;
  mapQuiz += `  ${i}: quizUnit${numStr} as QuizItem[],\n`;
}

const indexContent = `import unitsData from './units.json';

// 1. Dialogues Imports (Units 01 ~ 45)
${importsDialogues}
// 2. Vocab Imports (Units 01 ~ 45)
${importsVocab}
// 3. Grammar Imports (Units 01 ~ 45)
${importsGrammar}
// 4. Quiz Imports (Units 01 ~ 45)
${importsQuiz}
import { UnitItem, DialogueItem, VocabItem, GrammarItem, QuizItem } from '../types';

export const allUnits: UnitItem[] = unitsData as UnitItem[];

// Map of available unit data
const dialoguesMap: Record<number, DialogueItem[]> = {
${mapDialogues}};

const vocabMap: Record<number, VocabItem[]> = {
${mapVocab}};

const grammarMap: Record<number, GrammarItem[]> = {
${mapGrammar}};

const quizMap: Record<number, QuizItem[]> = {
${mapQuiz}};

// Helper getters
export const getUnitDialogues = (unitNumber: number): DialogueItem[] => {
  return dialoguesMap[unitNumber] || dialoguesMap[1] || [];
};

export const getUnitVocab = (unitNumber: number): VocabItem[] => {
  return vocabMap[unitNumber] || vocabMap[1] || [];
};

export const getUnitGrammar = (unitNumber: number): GrammarItem[] => {
  return grammarMap[unitNumber] || grammarMap[1] || [];
};

export const getUnitQuiz = (unitNumber: number): QuizItem[] => {
  return quizMap[unitNumber] || quizMap[1] || [];
};
`;

fs.writeFileSync(path.join(rootDir, 'src', 'data', 'index.ts'), indexContent, 'utf-8');
console.log(`✓ Updated src/data/index.ts with all 45 units`);
