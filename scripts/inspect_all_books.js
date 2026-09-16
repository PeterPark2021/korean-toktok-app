import fs from 'fs';

function checkBook(name, file) {
  const text = fs.readFileSync(`books/parsed_text/${file}.txt`, 'utf-8');
  console.log(`\n================== ${name} ==================`);
  
  // Look for lesson titles / dialogue headers / grammar points
  const dMatches = text.match(/(대화문|대화|본문)\s+([0-9]+-[0-9]+[^\n]*)/g) || [];
  console.log(`Dialogue headers found (${dMatches.length}):`);
  dMatches.forEach(d => console.log('  ', d.trim()));

  const gMatches = text.match(/(오늘의 표현|문법|핵심 문법)\s*\n([^\n]+)/g) || [];
  console.log(`Grammar headers sample (${gMatches.length}):`);
  gMatches.slice(0, 10).forEach(g => console.log('  ', g.trim().replace(/\n/g, ' -> ')));
}

checkBook('초급a', '초급a');
checkBook('초급b', '초급b');
checkBook('중급a', '중급a');
checkBook('중급b', '중급b');
checkBook('고급a 1,2', '고급a_1_2');
checkBook('고급a 3,4', '고급a_3_4');
checkBook('고급a 5', '고급a_5');
