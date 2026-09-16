import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('books/korean-toktok-kbs/초급a한권/초급a.pdf');

pdf(dataBuffer).then(function(data) {
  console.log('Total pages:', data.numpages);
  console.log('Text length:', data.text.length);
  console.log('--- Sample Text (First 2000 chars) ---');
  console.log(data.text.slice(0, 2000));
}).catch(err => {
  console.error('Error parsing PDF:', err);
});
