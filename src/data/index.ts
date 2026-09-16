import { UnitItem, DialogueItem, VocabItem, GrammarItem, QuizItem, EditionType, BookCode, BookMeta } from '../types';

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
// Unit 01
import dKbs01 from './kbs/dialogues/unit01.json';
import vKbs01 from './kbs/vocab/unit01.json';
import gKbs01 from './kbs/grammar/unit01.json';
import qKbs01 from './kbs/quiz/unit01.json';
import dWiz01 from './wiz/dialogues/unit01.json';
import vWiz01 from './wiz/vocab/unit01.json';
import gWiz01 from './wiz/grammar/unit01.json';
import qWiz01 from './wiz/quiz/unit01.json';

// Unit 02
import dKbs02 from './kbs/dialogues/unit02.json';
import vKbs02 from './kbs/vocab/unit02.json';
import gKbs02 from './kbs/grammar/unit02.json';
import qKbs02 from './kbs/quiz/unit02.json';
import dWiz02 from './wiz/dialogues/unit02.json';
import vWiz02 from './wiz/vocab/unit02.json';
import gWiz02 from './wiz/grammar/unit02.json';
import qWiz02 from './wiz/quiz/unit02.json';

// Unit 03
import dKbs03 from './kbs/dialogues/unit03.json';
import vKbs03 from './kbs/vocab/unit03.json';
import gKbs03 from './kbs/grammar/unit03.json';
import qKbs03 from './kbs/quiz/unit03.json';
import dWiz03 from './wiz/dialogues/unit03.json';
import vWiz03 from './wiz/vocab/unit03.json';
import gWiz03 from './wiz/grammar/unit03.json';
import qWiz03 from './wiz/quiz/unit03.json';

// Unit 04
import dKbs04 from './kbs/dialogues/unit04.json';
import vKbs04 from './kbs/vocab/unit04.json';
import gKbs04 from './kbs/grammar/unit04.json';
import qKbs04 from './kbs/quiz/unit04.json';
import dWiz04 from './wiz/dialogues/unit04.json';
import vWiz04 from './wiz/vocab/unit04.json';
import gWiz04 from './wiz/grammar/unit04.json';
import qWiz04 from './wiz/quiz/unit04.json';

// Unit 05
import dKbs05 from './kbs/dialogues/unit05.json';
import vKbs05 from './kbs/vocab/unit05.json';
import gKbs05 from './kbs/grammar/unit05.json';
import qKbs05 from './kbs/quiz/unit05.json';
import dWiz05 from './wiz/dialogues/unit05.json';
import vWiz05 from './wiz/vocab/unit05.json';
import gWiz05 from './wiz/grammar/unit05.json';
import qWiz05 from './wiz/quiz/unit05.json';

// Unit 06
import dKbs06 from './kbs/dialogues/unit06.json';
import vKbs06 from './kbs/vocab/unit06.json';
import gKbs06 from './kbs/grammar/unit06.json';
import qKbs06 from './kbs/quiz/unit06.json';
import dWiz06 from './wiz/dialogues/unit06.json';
import vWiz06 from './wiz/vocab/unit06.json';
import gWiz06 from './wiz/grammar/unit06.json';
import qWiz06 from './wiz/quiz/unit06.json';

// Unit 07
import dKbs07 from './kbs/dialogues/unit07.json';
import vKbs07 from './kbs/vocab/unit07.json';
import gKbs07 from './kbs/grammar/unit07.json';
import qKbs07 from './kbs/quiz/unit07.json';
import dWiz07 from './wiz/dialogues/unit07.json';
import vWiz07 from './wiz/vocab/unit07.json';
import gWiz07 from './wiz/grammar/unit07.json';
import qWiz07 from './wiz/quiz/unit07.json';

// Unit 08
import dKbs08 from './kbs/dialogues/unit08.json';
import vKbs08 from './kbs/vocab/unit08.json';
import gKbs08 from './kbs/grammar/unit08.json';
import qKbs08 from './kbs/quiz/unit08.json';
import dWiz08 from './wiz/dialogues/unit08.json';
import vWiz08 from './wiz/vocab/unit08.json';
import gWiz08 from './wiz/grammar/unit08.json';
import qWiz08 from './wiz/quiz/unit08.json';

// Unit 09
import dKbs09 from './kbs/dialogues/unit09.json';
import vKbs09 from './kbs/vocab/unit09.json';
import gKbs09 from './kbs/grammar/unit09.json';
import qKbs09 from './kbs/quiz/unit09.json';
import dWiz09 from './wiz/dialogues/unit09.json';
import vWiz09 from './wiz/vocab/unit09.json';
import gWiz09 from './wiz/grammar/unit09.json';
import qWiz09 from './wiz/quiz/unit09.json';

// Unit 10
import dKbs10 from './kbs/dialogues/unit10.json';
import vKbs10 from './kbs/vocab/unit10.json';
import gKbs10 from './kbs/grammar/unit10.json';
import qKbs10 from './kbs/quiz/unit10.json';
import dWiz10 from './wiz/dialogues/unit10.json';
import vWiz10 from './wiz/vocab/unit10.json';
import gWiz10 from './wiz/grammar/unit10.json';
import qWiz10 from './wiz/quiz/unit10.json';

// Unit 11
import dKbs11 from './kbs/dialogues/unit11.json';
import vKbs11 from './kbs/vocab/unit11.json';
import gKbs11 from './kbs/grammar/unit11.json';
import qKbs11 from './kbs/quiz/unit11.json';
import dWiz11 from './wiz/dialogues/unit11.json';
import vWiz11 from './wiz/vocab/unit11.json';
import gWiz11 from './wiz/grammar/unit11.json';
import qWiz11 from './wiz/quiz/unit11.json';

// Unit 12
import dKbs12 from './kbs/dialogues/unit12.json';
import vKbs12 from './kbs/vocab/unit12.json';
import gKbs12 from './kbs/grammar/unit12.json';
import qKbs12 from './kbs/quiz/unit12.json';
import dWiz12 from './wiz/dialogues/unit12.json';
import vWiz12 from './wiz/vocab/unit12.json';
import gWiz12 from './wiz/grammar/unit12.json';
import qWiz12 from './wiz/quiz/unit12.json';

// Unit 13
import dKbs13 from './kbs/dialogues/unit13.json';
import vKbs13 from './kbs/vocab/unit13.json';
import gKbs13 from './kbs/grammar/unit13.json';
import qKbs13 from './kbs/quiz/unit13.json';
import dWiz13 from './wiz/dialogues/unit13.json';
import vWiz13 from './wiz/vocab/unit13.json';
import gWiz13 from './wiz/grammar/unit13.json';
import qWiz13 from './wiz/quiz/unit13.json';

// Unit 14
import dKbs14 from './kbs/dialogues/unit14.json';
import vKbs14 from './kbs/vocab/unit14.json';
import gKbs14 from './kbs/grammar/unit14.json';
import qKbs14 from './kbs/quiz/unit14.json';
import dWiz14 from './wiz/dialogues/unit14.json';
import vWiz14 from './wiz/vocab/unit14.json';
import gWiz14 from './wiz/grammar/unit14.json';
import qWiz14 from './wiz/quiz/unit14.json';

// Unit 15
import dKbs15 from './kbs/dialogues/unit15.json';
import vKbs15 from './kbs/vocab/unit15.json';
import gKbs15 from './kbs/grammar/unit15.json';
import qKbs15 from './kbs/quiz/unit15.json';
import dWiz15 from './wiz/dialogues/unit15.json';
import vWiz15 from './wiz/vocab/unit15.json';
import gWiz15 from './wiz/grammar/unit15.json';
import qWiz15 from './wiz/quiz/unit15.json';

// Unit 16
import dKbs16 from './kbs/dialogues/unit16.json';
import vKbs16 from './kbs/vocab/unit16.json';
import gKbs16 from './kbs/grammar/unit16.json';
import qKbs16 from './kbs/quiz/unit16.json';
import dWiz16 from './wiz/dialogues/unit16.json';
import vWiz16 from './wiz/vocab/unit16.json';
import gWiz16 from './wiz/grammar/unit16.json';
import qWiz16 from './wiz/quiz/unit16.json';

// Unit 17
import dKbs17 from './kbs/dialogues/unit17.json';
import vKbs17 from './kbs/vocab/unit17.json';
import gKbs17 from './kbs/grammar/unit17.json';
import qKbs17 from './kbs/quiz/unit17.json';
import dWiz17 from './wiz/dialogues/unit17.json';
import vWiz17 from './wiz/vocab/unit17.json';
import gWiz17 from './wiz/grammar/unit17.json';
import qWiz17 from './wiz/quiz/unit17.json';

// Unit 18
import dKbs18 from './kbs/dialogues/unit18.json';
import vKbs18 from './kbs/vocab/unit18.json';
import gKbs18 from './kbs/grammar/unit18.json';
import qKbs18 from './kbs/quiz/unit18.json';
import dWiz18 from './wiz/dialogues/unit18.json';
import vWiz18 from './wiz/vocab/unit18.json';
import gWiz18 from './wiz/grammar/unit18.json';
import qWiz18 from './wiz/quiz/unit18.json';

// Unit 19
import dKbs19 from './kbs/dialogues/unit19.json';
import vKbs19 from './kbs/vocab/unit19.json';
import gKbs19 from './kbs/grammar/unit19.json';
import qKbs19 from './kbs/quiz/unit19.json';
import dWiz19 from './wiz/dialogues/unit19.json';
import vWiz19 from './wiz/vocab/unit19.json';
import gWiz19 from './wiz/grammar/unit19.json';
import qWiz19 from './wiz/quiz/unit19.json';

// Unit 20
import dKbs20 from './kbs/dialogues/unit20.json';
import vKbs20 from './kbs/vocab/unit20.json';
import gKbs20 from './kbs/grammar/unit20.json';
import qKbs20 from './kbs/quiz/unit20.json';
import dWiz20 from './wiz/dialogues/unit20.json';
import vWiz20 from './wiz/vocab/unit20.json';
import gWiz20 from './wiz/grammar/unit20.json';
import qWiz20 from './wiz/quiz/unit20.json';

// Unit 21
import dKbs21 from './kbs/dialogues/unit21.json';
import vKbs21 from './kbs/vocab/unit21.json';
import gKbs21 from './kbs/grammar/unit21.json';
import qKbs21 from './kbs/quiz/unit21.json';
import dWiz21 from './wiz/dialogues/unit21.json';
import vWiz21 from './wiz/vocab/unit21.json';
import gWiz21 from './wiz/grammar/unit21.json';
import qWiz21 from './wiz/quiz/unit21.json';

// Unit 22
import dKbs22 from './kbs/dialogues/unit22.json';
import vKbs22 from './kbs/vocab/unit22.json';
import gKbs22 from './kbs/grammar/unit22.json';
import qKbs22 from './kbs/quiz/unit22.json';
import dWiz22 from './wiz/dialogues/unit22.json';
import vWiz22 from './wiz/vocab/unit22.json';
import gWiz22 from './wiz/grammar/unit22.json';
import qWiz22 from './wiz/quiz/unit22.json';

// Unit 23
import dKbs23 from './kbs/dialogues/unit23.json';
import vKbs23 from './kbs/vocab/unit23.json';
import gKbs23 from './kbs/grammar/unit23.json';
import qKbs23 from './kbs/quiz/unit23.json';
import dWiz23 from './wiz/dialogues/unit23.json';
import vWiz23 from './wiz/vocab/unit23.json';
import gWiz23 from './wiz/grammar/unit23.json';
import qWiz23 from './wiz/quiz/unit23.json';

// Unit 24
import dKbs24 from './kbs/dialogues/unit24.json';
import vKbs24 from './kbs/vocab/unit24.json';
import gKbs24 from './kbs/grammar/unit24.json';
import qKbs24 from './kbs/quiz/unit24.json';
import dWiz24 from './wiz/dialogues/unit24.json';
import vWiz24 from './wiz/vocab/unit24.json';
import gWiz24 from './wiz/grammar/unit24.json';
import qWiz24 from './wiz/quiz/unit24.json';

// Unit 25
import dKbs25 from './kbs/dialogues/unit25.json';
import vKbs25 from './kbs/vocab/unit25.json';
import gKbs25 from './kbs/grammar/unit25.json';
import qKbs25 from './kbs/quiz/unit25.json';
import dWiz25 from './wiz/dialogues/unit25.json';
import vWiz25 from './wiz/vocab/unit25.json';
import gWiz25 from './wiz/grammar/unit25.json';
import qWiz25 from './wiz/quiz/unit25.json';

// Unit 26
import dKbs26 from './kbs/dialogues/unit26.json';
import vKbs26 from './kbs/vocab/unit26.json';
import gKbs26 from './kbs/grammar/unit26.json';
import qKbs26 from './kbs/quiz/unit26.json';
import dWiz26 from './wiz/dialogues/unit26.json';
import vWiz26 from './wiz/vocab/unit26.json';
import gWiz26 from './wiz/grammar/unit26.json';
import qWiz26 from './wiz/quiz/unit26.json';

// Unit 27
import dKbs27 from './kbs/dialogues/unit27.json';
import vKbs27 from './kbs/vocab/unit27.json';
import gKbs27 from './kbs/grammar/unit27.json';
import qKbs27 from './kbs/quiz/unit27.json';
import dWiz27 from './wiz/dialogues/unit27.json';
import vWiz27 from './wiz/vocab/unit27.json';
import gWiz27 from './wiz/grammar/unit27.json';
import qWiz27 from './wiz/quiz/unit27.json';

// Unit 28
import dKbs28 from './kbs/dialogues/unit28.json';
import vKbs28 from './kbs/vocab/unit28.json';
import gKbs28 from './kbs/grammar/unit28.json';
import qKbs28 from './kbs/quiz/unit28.json';
import dWiz28 from './wiz/dialogues/unit28.json';
import vWiz28 from './wiz/vocab/unit28.json';
import gWiz28 from './wiz/grammar/unit28.json';
import qWiz28 from './wiz/quiz/unit28.json';

// Unit 29
import dKbs29 from './kbs/dialogues/unit29.json';
import vKbs29 from './kbs/vocab/unit29.json';
import gKbs29 from './kbs/grammar/unit29.json';
import qKbs29 from './kbs/quiz/unit29.json';
import dWiz29 from './wiz/dialogues/unit29.json';
import vWiz29 from './wiz/vocab/unit29.json';
import gWiz29 from './wiz/grammar/unit29.json';
import qWiz29 from './wiz/quiz/unit29.json';

// Unit 30
import dKbs30 from './kbs/dialogues/unit30.json';
import vKbs30 from './kbs/vocab/unit30.json';
import gKbs30 from './kbs/grammar/unit30.json';
import qKbs30 from './kbs/quiz/unit30.json';
import dWiz30 from './wiz/dialogues/unit30.json';
import vWiz30 from './wiz/vocab/unit30.json';
import gWiz30 from './wiz/grammar/unit30.json';
import qWiz30 from './wiz/quiz/unit30.json';

// Unit 31
import dKbs31 from './kbs/dialogues/unit31.json';
import vKbs31 from './kbs/vocab/unit31.json';
import gKbs31 from './kbs/grammar/unit31.json';
import qKbs31 from './kbs/quiz/unit31.json';
import dWiz31 from './wiz/dialogues/unit31.json';
import vWiz31 from './wiz/vocab/unit31.json';
import gWiz31 from './wiz/grammar/unit31.json';
import qWiz31 from './wiz/quiz/unit31.json';

// Unit 32
import dKbs32 from './kbs/dialogues/unit32.json';
import vKbs32 from './kbs/vocab/unit32.json';
import gKbs32 from './kbs/grammar/unit32.json';
import qKbs32 from './kbs/quiz/unit32.json';
import dWiz32 from './wiz/dialogues/unit32.json';
import vWiz32 from './wiz/vocab/unit32.json';
import gWiz32 from './wiz/grammar/unit32.json';
import qWiz32 from './wiz/quiz/unit32.json';

// Unit 33
import dKbs33 from './kbs/dialogues/unit33.json';
import vKbs33 from './kbs/vocab/unit33.json';
import gKbs33 from './kbs/grammar/unit33.json';
import qKbs33 from './kbs/quiz/unit33.json';
import dWiz33 from './wiz/dialogues/unit33.json';
import vWiz33 from './wiz/vocab/unit33.json';
import gWiz33 from './wiz/grammar/unit33.json';
import qWiz33 from './wiz/quiz/unit33.json';

// Unit 34
import dKbs34 from './kbs/dialogues/unit34.json';
import vKbs34 from './kbs/vocab/unit34.json';
import gKbs34 from './kbs/grammar/unit34.json';
import qKbs34 from './kbs/quiz/unit34.json';
import dWiz34 from './wiz/dialogues/unit34.json';
import vWiz34 from './wiz/vocab/unit34.json';
import gWiz34 from './wiz/grammar/unit34.json';
import qWiz34 from './wiz/quiz/unit34.json';

// Unit 35
import dKbs35 from './kbs/dialogues/unit35.json';
import vKbs35 from './kbs/vocab/unit35.json';
import gKbs35 from './kbs/grammar/unit35.json';
import qKbs35 from './kbs/quiz/unit35.json';
import dWiz35 from './wiz/dialogues/unit35.json';
import vWiz35 from './wiz/vocab/unit35.json';
import gWiz35 from './wiz/grammar/unit35.json';
import qWiz35 from './wiz/quiz/unit35.json';

// Unit 36
import dKbs36 from './kbs/dialogues/unit36.json';
import vKbs36 from './kbs/vocab/unit36.json';
import gKbs36 from './kbs/grammar/unit36.json';
import qKbs36 from './kbs/quiz/unit36.json';
import dWiz36 from './wiz/dialogues/unit36.json';
import vWiz36 from './wiz/vocab/unit36.json';
import gWiz36 from './wiz/grammar/unit36.json';
import qWiz36 from './wiz/quiz/unit36.json';

// Unit 37
import dKbs37 from './kbs/dialogues/unit37.json';
import vKbs37 from './kbs/vocab/unit37.json';
import gKbs37 from './kbs/grammar/unit37.json';
import qKbs37 from './kbs/quiz/unit37.json';
import dWiz37 from './wiz/dialogues/unit37.json';
import vWiz37 from './wiz/vocab/unit37.json';
import gWiz37 from './wiz/grammar/unit37.json';
import qWiz37 from './wiz/quiz/unit37.json';

// Unit 38
import dKbs38 from './kbs/dialogues/unit38.json';
import vKbs38 from './kbs/vocab/unit38.json';
import gKbs38 from './kbs/grammar/unit38.json';
import qKbs38 from './kbs/quiz/unit38.json';
import dWiz38 from './wiz/dialogues/unit38.json';
import vWiz38 from './wiz/vocab/unit38.json';
import gWiz38 from './wiz/grammar/unit38.json';
import qWiz38 from './wiz/quiz/unit38.json';

// Unit 39
import dKbs39 from './kbs/dialogues/unit39.json';
import vKbs39 from './kbs/vocab/unit39.json';
import gKbs39 from './kbs/grammar/unit39.json';
import qKbs39 from './kbs/quiz/unit39.json';
import dWiz39 from './wiz/dialogues/unit39.json';
import vWiz39 from './wiz/vocab/unit39.json';
import gWiz39 from './wiz/grammar/unit39.json';
import qWiz39 from './wiz/quiz/unit39.json';

// Unit 40
import dKbs40 from './kbs/dialogues/unit40.json';
import vKbs40 from './kbs/vocab/unit40.json';
import gKbs40 from './kbs/grammar/unit40.json';
import qKbs40 from './kbs/quiz/unit40.json';
import dWiz40 from './wiz/dialogues/unit40.json';
import vWiz40 from './wiz/vocab/unit40.json';
import gWiz40 from './wiz/grammar/unit40.json';
import qWiz40 from './wiz/quiz/unit40.json';

// Unit 41
import dKbs41 from './kbs/dialogues/unit41.json';
import vKbs41 from './kbs/vocab/unit41.json';
import gKbs41 from './kbs/grammar/unit41.json';
import qKbs41 from './kbs/quiz/unit41.json';
import dWiz41 from './wiz/dialogues/unit41.json';
import vWiz41 from './wiz/vocab/unit41.json';
import gWiz41 from './wiz/grammar/unit41.json';
import qWiz41 from './wiz/quiz/unit41.json';

// Unit 42
import dKbs42 from './kbs/dialogues/unit42.json';
import vKbs42 from './kbs/vocab/unit42.json';
import gKbs42 from './kbs/grammar/unit42.json';
import qKbs42 from './kbs/quiz/unit42.json';
import dWiz42 from './wiz/dialogues/unit42.json';
import vWiz42 from './wiz/vocab/unit42.json';
import gWiz42 from './wiz/grammar/unit42.json';
import qWiz42 from './wiz/quiz/unit42.json';

// Unit 43
import dKbs43 from './kbs/dialogues/unit43.json';
import vKbs43 from './kbs/vocab/unit43.json';
import gKbs43 from './kbs/grammar/unit43.json';
import qKbs43 from './kbs/quiz/unit43.json';
import dWiz43 from './wiz/dialogues/unit43.json';
import vWiz43 from './wiz/vocab/unit43.json';
import gWiz43 from './wiz/grammar/unit43.json';
import qWiz43 from './wiz/quiz/unit43.json';

// Unit 44
import dKbs44 from './kbs/dialogues/unit44.json';
import vKbs44 from './kbs/vocab/unit44.json';
import gKbs44 from './kbs/grammar/unit44.json';
import qKbs44 from './kbs/quiz/unit44.json';
import dWiz44 from './wiz/dialogues/unit44.json';
import vWiz44 from './wiz/vocab/unit44.json';
import gWiz44 from './wiz/grammar/unit44.json';
import qWiz44 from './wiz/quiz/unit44.json';

// Unit 45
import dKbs45 from './kbs/dialogues/unit45.json';
import vKbs45 from './kbs/vocab/unit45.json';
import gKbs45 from './kbs/grammar/unit45.json';
import qKbs45 from './kbs/quiz/unit45.json';
import dWiz45 from './wiz/dialogues/unit45.json';
import vWiz45 from './wiz/vocab/unit45.json';
import gWiz45 from './wiz/grammar/unit45.json';
import qWiz45 from './wiz/quiz/unit45.json';


// Map registries
const kbsDialoguesMap: Record<number, DialogueItem[]> = {
  1: dKbs01 as DialogueItem[],
  2: dKbs02 as DialogueItem[],
  3: dKbs03 as DialogueItem[],
  4: dKbs04 as DialogueItem[],
  5: dKbs05 as DialogueItem[],
  6: dKbs06 as DialogueItem[],
  7: dKbs07 as DialogueItem[],
  8: dKbs08 as DialogueItem[],
  9: dKbs09 as DialogueItem[],
  10: dKbs10 as DialogueItem[],
  11: dKbs11 as DialogueItem[],
  12: dKbs12 as DialogueItem[],
  13: dKbs13 as DialogueItem[],
  14: dKbs14 as DialogueItem[],
  15: dKbs15 as DialogueItem[],
  16: dKbs16 as DialogueItem[],
  17: dKbs17 as DialogueItem[],
  18: dKbs18 as DialogueItem[],
  19: dKbs19 as DialogueItem[],
  20: dKbs20 as DialogueItem[],
  21: dKbs21 as DialogueItem[],
  22: dKbs22 as DialogueItem[],
  23: dKbs23 as DialogueItem[],
  24: dKbs24 as DialogueItem[],
  25: dKbs25 as DialogueItem[],
  26: dKbs26 as DialogueItem[],
  27: dKbs27 as DialogueItem[],
  28: dKbs28 as DialogueItem[],
  29: dKbs29 as DialogueItem[],
  30: dKbs30 as DialogueItem[],
  31: dKbs31 as DialogueItem[],
  32: dKbs32 as DialogueItem[],
  33: dKbs33 as DialogueItem[],
  34: dKbs34 as DialogueItem[],
  35: dKbs35 as DialogueItem[],
  36: dKbs36 as DialogueItem[],
  37: dKbs37 as DialogueItem[],
  38: dKbs38 as DialogueItem[],
  39: dKbs39 as DialogueItem[],
  40: dKbs40 as DialogueItem[],
  41: dKbs41 as DialogueItem[],
  42: dKbs42 as DialogueItem[],
  43: dKbs43 as DialogueItem[],
  44: dKbs44 as DialogueItem[],
  45: dKbs45 as DialogueItem[],
};

const wizDialoguesMap: Record<number, DialogueItem[]> = {
  1: dWiz01 as DialogueItem[],
  2: dWiz02 as DialogueItem[],
  3: dWiz03 as DialogueItem[],
  4: dWiz04 as DialogueItem[],
  5: dWiz05 as DialogueItem[],
  6: dWiz06 as DialogueItem[],
  7: dWiz07 as DialogueItem[],
  8: dWiz08 as DialogueItem[],
  9: dWiz09 as DialogueItem[],
  10: dWiz10 as DialogueItem[],
  11: dWiz11 as DialogueItem[],
  12: dWiz12 as DialogueItem[],
  13: dWiz13 as DialogueItem[],
  14: dWiz14 as DialogueItem[],
  15: dWiz15 as DialogueItem[],
  16: dWiz16 as DialogueItem[],
  17: dWiz17 as DialogueItem[],
  18: dWiz18 as DialogueItem[],
  19: dWiz19 as DialogueItem[],
  20: dWiz20 as DialogueItem[],
  21: dWiz21 as DialogueItem[],
  22: dWiz22 as DialogueItem[],
  23: dWiz23 as DialogueItem[],
  24: dWiz24 as DialogueItem[],
  25: dWiz25 as DialogueItem[],
  26: dWiz26 as DialogueItem[],
  27: dWiz27 as DialogueItem[],
  28: dWiz28 as DialogueItem[],
  29: dWiz29 as DialogueItem[],
  30: dWiz30 as DialogueItem[],
  31: dWiz31 as DialogueItem[],
  32: dWiz32 as DialogueItem[],
  33: dWiz33 as DialogueItem[],
  34: dWiz34 as DialogueItem[],
  35: dWiz35 as DialogueItem[],
  36: dWiz36 as DialogueItem[],
  37: dWiz37 as DialogueItem[],
  38: dWiz38 as DialogueItem[],
  39: dWiz39 as DialogueItem[],
  40: dWiz40 as DialogueItem[],
  41: dWiz41 as DialogueItem[],
  42: dWiz42 as DialogueItem[],
  43: dWiz43 as DialogueItem[],
  44: dWiz44 as DialogueItem[],
  45: dWiz45 as DialogueItem[],
};

const kbsVocabMap: Record<number, VocabItem[]> = {
  1: vKbs01 as VocabItem[],
  2: vKbs02 as VocabItem[],
  3: vKbs03 as VocabItem[],
  4: vKbs04 as VocabItem[],
  5: vKbs05 as VocabItem[],
  6: vKbs06 as VocabItem[],
  7: vKbs07 as VocabItem[],
  8: vKbs08 as VocabItem[],
  9: vKbs09 as VocabItem[],
  10: vKbs10 as VocabItem[],
  11: vKbs11 as VocabItem[],
  12: vKbs12 as VocabItem[],
  13: vKbs13 as VocabItem[],
  14: vKbs14 as VocabItem[],
  15: vKbs15 as VocabItem[],
  16: vKbs16 as VocabItem[],
  17: vKbs17 as VocabItem[],
  18: vKbs18 as VocabItem[],
  19: vKbs19 as VocabItem[],
  20: vKbs20 as VocabItem[],
  21: vKbs21 as VocabItem[],
  22: vKbs22 as VocabItem[],
  23: vKbs23 as VocabItem[],
  24: vKbs24 as VocabItem[],
  25: vKbs25 as VocabItem[],
  26: vKbs26 as VocabItem[],
  27: vKbs27 as VocabItem[],
  28: vKbs28 as VocabItem[],
  29: vKbs29 as VocabItem[],
  30: vKbs30 as VocabItem[],
  31: vKbs31 as VocabItem[],
  32: vKbs32 as VocabItem[],
  33: vKbs33 as VocabItem[],
  34: vKbs34 as VocabItem[],
  35: vKbs35 as VocabItem[],
  36: vKbs36 as VocabItem[],
  37: vKbs37 as VocabItem[],
  38: vKbs38 as VocabItem[],
  39: vKbs39 as VocabItem[],
  40: vKbs40 as VocabItem[],
  41: vKbs41 as VocabItem[],
  42: vKbs42 as VocabItem[],
  43: vKbs43 as VocabItem[],
  44: vKbs44 as VocabItem[],
  45: vKbs45 as VocabItem[],
};

const wizVocabMap: Record<number, VocabItem[]> = {
  1: vWiz01 as VocabItem[],
  2: vWiz02 as VocabItem[],
  3: vWiz03 as VocabItem[],
  4: vWiz04 as VocabItem[],
  5: vWiz05 as VocabItem[],
  6: vWiz06 as VocabItem[],
  7: vWiz07 as VocabItem[],
  8: vWiz08 as VocabItem[],
  9: vWiz09 as VocabItem[],
  10: vWiz10 as VocabItem[],
  11: vWiz11 as VocabItem[],
  12: vWiz12 as VocabItem[],
  13: vWiz13 as VocabItem[],
  14: vWiz14 as VocabItem[],
  15: vWiz15 as VocabItem[],
  16: vWiz16 as VocabItem[],
  17: vWiz17 as VocabItem[],
  18: vWiz18 as VocabItem[],
  19: vWiz19 as VocabItem[],
  20: vWiz20 as VocabItem[],
  21: vWiz21 as VocabItem[],
  22: vWiz22 as VocabItem[],
  23: vWiz23 as VocabItem[],
  24: vWiz24 as VocabItem[],
  25: vWiz25 as VocabItem[],
  26: vWiz26 as VocabItem[],
  27: vWiz27 as VocabItem[],
  28: vWiz28 as VocabItem[],
  29: vWiz29 as VocabItem[],
  30: vWiz30 as VocabItem[],
  31: vWiz31 as VocabItem[],
  32: vWiz32 as VocabItem[],
  33: vWiz33 as VocabItem[],
  34: vWiz34 as VocabItem[],
  35: vWiz35 as VocabItem[],
  36: vWiz36 as VocabItem[],
  37: vWiz37 as VocabItem[],
  38: vWiz38 as VocabItem[],
  39: vWiz39 as VocabItem[],
  40: vWiz40 as VocabItem[],
  41: vWiz41 as VocabItem[],
  42: vWiz42 as VocabItem[],
  43: vWiz43 as VocabItem[],
  44: vWiz44 as VocabItem[],
  45: vWiz45 as VocabItem[],
};

const kbsGrammarMap: Record<number, GrammarItem[]> = {
  1: gKbs01 as GrammarItem[],
  2: gKbs02 as GrammarItem[],
  3: gKbs03 as GrammarItem[],
  4: gKbs04 as GrammarItem[],
  5: gKbs05 as GrammarItem[],
  6: gKbs06 as GrammarItem[],
  7: gKbs07 as GrammarItem[],
  8: gKbs08 as GrammarItem[],
  9: gKbs09 as GrammarItem[],
  10: gKbs10 as GrammarItem[],
  11: gKbs11 as GrammarItem[],
  12: gKbs12 as GrammarItem[],
  13: gKbs13 as GrammarItem[],
  14: gKbs14 as GrammarItem[],
  15: gKbs15 as GrammarItem[],
  16: gKbs16 as GrammarItem[],
  17: gKbs17 as GrammarItem[],
  18: gKbs18 as GrammarItem[],
  19: gKbs19 as GrammarItem[],
  20: gKbs20 as GrammarItem[],
  21: gKbs21 as GrammarItem[],
  22: gKbs22 as GrammarItem[],
  23: gKbs23 as GrammarItem[],
  24: gKbs24 as GrammarItem[],
  25: gKbs25 as GrammarItem[],
  26: gKbs26 as GrammarItem[],
  27: gKbs27 as GrammarItem[],
  28: gKbs28 as GrammarItem[],
  29: gKbs29 as GrammarItem[],
  30: gKbs30 as GrammarItem[],
  31: gKbs31 as GrammarItem[],
  32: gKbs32 as GrammarItem[],
  33: gKbs33 as GrammarItem[],
  34: gKbs34 as GrammarItem[],
  35: gKbs35 as GrammarItem[],
  36: gKbs36 as GrammarItem[],
  37: gKbs37 as GrammarItem[],
  38: gKbs38 as GrammarItem[],
  39: gKbs39 as GrammarItem[],
  40: gKbs40 as GrammarItem[],
  41: gKbs41 as GrammarItem[],
  42: gKbs42 as GrammarItem[],
  43: gKbs43 as GrammarItem[],
  44: gKbs44 as GrammarItem[],
  45: gKbs45 as GrammarItem[],
};

const wizGrammarMap: Record<number, GrammarItem[]> = {
  1: gWiz01 as GrammarItem[],
  2: gWiz02 as GrammarItem[],
  3: gWiz03 as GrammarItem[],
  4: gWiz04 as GrammarItem[],
  5: gWiz05 as GrammarItem[],
  6: gWiz06 as GrammarItem[],
  7: gWiz07 as GrammarItem[],
  8: gWiz08 as GrammarItem[],
  9: gWiz09 as GrammarItem[],
  10: gWiz10 as GrammarItem[],
  11: gWiz11 as GrammarItem[],
  12: gWiz12 as GrammarItem[],
  13: gWiz13 as GrammarItem[],
  14: gWiz14 as GrammarItem[],
  15: gWiz15 as GrammarItem[],
  16: gWiz16 as GrammarItem[],
  17: gWiz17 as GrammarItem[],
  18: gWiz18 as GrammarItem[],
  19: gWiz19 as GrammarItem[],
  20: gWiz20 as GrammarItem[],
  21: gWiz21 as GrammarItem[],
  22: gWiz22 as GrammarItem[],
  23: gWiz23 as GrammarItem[],
  24: gWiz24 as GrammarItem[],
  25: gWiz25 as GrammarItem[],
  26: gWiz26 as GrammarItem[],
  27: gWiz27 as GrammarItem[],
  28: gWiz28 as GrammarItem[],
  29: gWiz29 as GrammarItem[],
  30: gWiz30 as GrammarItem[],
  31: gWiz31 as GrammarItem[],
  32: gWiz32 as GrammarItem[],
  33: gWiz33 as GrammarItem[],
  34: gWiz34 as GrammarItem[],
  35: gWiz35 as GrammarItem[],
  36: gWiz36 as GrammarItem[],
  37: gWiz37 as GrammarItem[],
  38: gWiz38 as GrammarItem[],
  39: gWiz39 as GrammarItem[],
  40: gWiz40 as GrammarItem[],
  41: gWiz41 as GrammarItem[],
  42: gWiz42 as GrammarItem[],
  43: gWiz43 as GrammarItem[],
  44: gWiz44 as GrammarItem[],
  45: gWiz45 as GrammarItem[],
};

const kbsQuizMap: Record<number, QuizItem[]> = {
  1: qKbs01 as QuizItem[],
  2: qKbs02 as QuizItem[],
  3: qKbs03 as QuizItem[],
  4: qKbs04 as QuizItem[],
  5: qKbs05 as QuizItem[],
  6: qKbs06 as QuizItem[],
  7: qKbs07 as QuizItem[],
  8: qKbs08 as QuizItem[],
  9: qKbs09 as QuizItem[],
  10: qKbs10 as QuizItem[],
  11: qKbs11 as QuizItem[],
  12: qKbs12 as QuizItem[],
  13: qKbs13 as QuizItem[],
  14: qKbs14 as QuizItem[],
  15: qKbs15 as QuizItem[],
  16: qKbs16 as QuizItem[],
  17: qKbs17 as QuizItem[],
  18: qKbs18 as QuizItem[],
  19: qKbs19 as QuizItem[],
  20: qKbs20 as QuizItem[],
  21: qKbs21 as QuizItem[],
  22: qKbs22 as QuizItem[],
  23: qKbs23 as QuizItem[],
  24: qKbs24 as QuizItem[],
  25: qKbs25 as QuizItem[],
  26: qKbs26 as QuizItem[],
  27: qKbs27 as QuizItem[],
  28: qKbs28 as QuizItem[],
  29: qKbs29 as QuizItem[],
  30: qKbs30 as QuizItem[],
  31: qKbs31 as QuizItem[],
  32: qKbs32 as QuizItem[],
  33: qKbs33 as QuizItem[],
  34: qKbs34 as QuizItem[],
  35: qKbs35 as QuizItem[],
  36: qKbs36 as QuizItem[],
  37: qKbs37 as QuizItem[],
  38: qKbs38 as QuizItem[],
  39: qKbs39 as QuizItem[],
  40: qKbs40 as QuizItem[],
  41: qKbs41 as QuizItem[],
  42: qKbs42 as QuizItem[],
  43: qKbs43 as QuizItem[],
  44: qKbs44 as QuizItem[],
  45: qKbs45 as QuizItem[],
};

const wizQuizMap: Record<number, QuizItem[]> = {
  1: qWiz01 as QuizItem[],
  2: qWiz02 as QuizItem[],
  3: qWiz03 as QuizItem[],
  4: qWiz04 as QuizItem[],
  5: qWiz05 as QuizItem[],
  6: qWiz06 as QuizItem[],
  7: qWiz07 as QuizItem[],
  8: qWiz08 as QuizItem[],
  9: qWiz09 as QuizItem[],
  10: qWiz10 as QuizItem[],
  11: qWiz11 as QuizItem[],
  12: qWiz12 as QuizItem[],
  13: qWiz13 as QuizItem[],
  14: qWiz14 as QuizItem[],
  15: qWiz15 as QuizItem[],
  16: qWiz16 as QuizItem[],
  17: qWiz17 as QuizItem[],
  18: qWiz18 as QuizItem[],
  19: qWiz19 as QuizItem[],
  20: qWiz20 as QuizItem[],
  21: qWiz21 as QuizItem[],
  22: qWiz22 as QuizItem[],
  23: qWiz23 as QuizItem[],
  24: qWiz24 as QuizItem[],
  25: qWiz25 as QuizItem[],
  26: qWiz26 as QuizItem[],
  27: qWiz27 as QuizItem[],
  28: qWiz28 as QuizItem[],
  29: qWiz29 as QuizItem[],
  30: qWiz30 as QuizItem[],
  31: qWiz31 as QuizItem[],
  32: qWiz32 as QuizItem[],
  33: qWiz33 as QuizItem[],
  34: qWiz34 as QuizItem[],
  35: qWiz35 as QuizItem[],
  36: qWiz36 as QuizItem[],
  37: qWiz37 as QuizItem[],
  38: qWiz38 as QuizItem[],
  39: qWiz39 as QuizItem[],
  40: qWiz40 as QuizItem[],
  41: qWiz41 as QuizItem[],
  42: qWiz42 as QuizItem[],
  43: qWiz43 as QuizItem[],
  44: qWiz44 as QuizItem[],
  45: qWiz45 as QuizItem[],
};

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
