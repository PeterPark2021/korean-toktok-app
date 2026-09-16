import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\DBYoon\\.gemini\\antigravity-ide\\brain\\12d01a57-2bae-486b-b0be-d8e4a995231d';
const cultureDir = path.resolve('public/images/culture');
const vocabDir = path.resolve('public/images/vocab');

if (!fs.existsSync(cultureDir)) {
  fs.mkdirSync(cultureDir, { recursive: true });
}
if (!fs.existsSync(vocabDir)) {
  fs.mkdirSync(vocabDir, { recursive: true });
}

// Find generated images in brainDir
const files = fs.readdirSync(brainDir);

const cultureMap = [
  { prefix: 'culture_seollal', target: 'seollal.jpg' },
  { prefix: 'culture_market', target: 'market.jpg' },
  { prefix: 'culture_palace', target: 'palace.jpg' },
  { prefix: 'situation_unit01', target: 'campus.jpg' },
  { prefix: 'situation_unit08', target: 'dining.jpg' },
];

cultureMap.forEach(({ prefix, target }) => {
  const match = files.find(f => f.startsWith(prefix) && (f.endsWith('.jpg') || f.endsWith('.png')));
  if (match) {
    const srcPath = path.join(brainDir, match);
    const destPath = path.join(cultureDir, target);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${match} -> ${destPath}`);
  }
});

console.log('Culture assets setup complete.');
