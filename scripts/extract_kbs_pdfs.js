import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pdfFiles = [
  { book: '초급a', path: 'books/korean-toktok-kbs/초급a한권/초급a.pdf' },
  { book: '초급b', path: 'books/korean-toktok-kbs/초급b한권/초급b.pdf' },
  { book: '중급a', path: 'books/korean-toktok-kbs/중급a한권/중급a.pdf' },
  { book: '중급b', path: 'books/korean-toktok-kbs/중급b한권/중급b.pdf' },
  { book: '고급a_1_2', path: 'books/korean-toktok-kbs/고급a/고급a_1,2.pdf' },
  { book: '고급a_3_4', path: 'books/korean-toktok-kbs/고급a/고급a_3,4.pdf' },
  { book: '고급a_5', path: 'books/korean-toktok-kbs/고급a/고급a_5.pdf' }
];

const outDir = path.join(rootDir, 'books', 'parsed_text');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function extractAll() {
  for (const item of pdfFiles) {
    const filePath = path.join(rootDir, item.path);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
    console.log(`Extracting: ${item.book} (${item.path})...`);
    const buf = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buf });
    const res = await parser.getText();
    const outPath = path.join(outDir, `${item.book}.txt`);
    fs.writeFileSync(outPath, res.text, 'utf-8');
    console.log(`Saved ${item.book}.txt (${res.total} pages, ${res.text.length} chars)`);
  }
}

extractAll().then(() => console.log('All PDF extraction completed!'));
