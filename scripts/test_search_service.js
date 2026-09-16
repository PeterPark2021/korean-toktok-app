import { SearchService } from '../src/services/searchService.js';

console.log('Testing SearchService...');
const tests = ['인사', '-는데', '병원', '다이어트', '지구 온난화', '김민호'];

for (const q of tests) {
  const resKbs = SearchService.search(q, 'kbs');
  console.log(`[KBS] Query: "${q}" -> ${resKbs.length} results`);
  if (resKbs.length > 0) {
    console.log(`   Sample: [${resKbs[0].type}] Unit ${resKbs[0].unitNumber} - ${resKbs[0].title} (${resKbs[0].subtitle})`);
  }
}
