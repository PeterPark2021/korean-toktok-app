import fs from 'fs';
import path from 'path';

console.log('==================================================');
console.log('🧪 Running Comprehensive Dual-Edition Verification');
console.log('==================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// 1. Check datasets for KBS and Wiz
['kbs', 'wiz'].forEach((edition) => {
  const unitsPath = `src/data/${edition}/units.json`;
  assert(fs.existsSync(unitsPath), `${edition.toUpperCase()}: units.json exists`);
  const units = JSON.parse(fs.readFileSync(unitsPath, 'utf-8'));
  assert(units.length >= 45, `${edition.toUpperCase()}: Has ${units.length} unit entries (min 45)`);

  let dCount = 0, vCount = 0, gCount = 0, qCount = 0;
  for (let i = 1; i <= 45; i++) {
    const pad = String(i).padStart(2, '0');
    const dPath = `src/data/${edition}/dialogues/unit${pad}.json`;
    const vPath = `src/data/${edition}/vocab/unit${pad}.json`;
    const gPath = `src/data/${edition}/grammar/unit${pad}.json`;
    const qPath = `src/data/${edition}/quiz/unit${pad}.json`;

    if (fs.existsSync(dPath)) dCount++;
    if (fs.existsSync(vPath)) vCount++;
    if (fs.existsSync(gPath)) gCount++;
    if (fs.existsSync(qPath)) qCount++;
  }

  assert(dCount === 45, `${edition.toUpperCase()}: 45/45 dialogues files exist`);
  assert(vCount === 45, `${edition.toUpperCase()}: 45/45 vocab files exist`);
  assert(gCount === 45, `${edition.toUpperCase()}: 45/45 grammar files exist`);
  assert(qCount === 45, `${edition.toUpperCase()}: 45/45 quiz files exist`);
});

// 2. Test Search Functionality Logic
const kbsUnits = JSON.parse(fs.readFileSync('src/data/kbs/units.json', 'utf-8'));
const u11Grammar = JSON.parse(fs.readFileSync('src/data/kbs/grammar/unit11.json', 'utf-8'));
const u11Vocab = JSON.parse(fs.readFileSync('src/data/kbs/vocab/unit11.json', 'utf-8'));
const u11Dialogues = JSON.parse(fs.readFileSync('src/data/kbs/dialogues/unit11.json', 'utf-8'));

assert(u11Dialogues.length >= 4, 'Unit 11 KBS has dialogues');
assert(u11Vocab.length >= 5, 'Unit 11 KBS has vocabularies');
assert(u11Grammar.length >= 2, 'Unit 11 KBS has grammar points');

console.log(`\nResults: ${passedTests} / ${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('🎉 All dual-edition validation checks passed successfully!');
} else {
  process.exit(1);
}
