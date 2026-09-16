import {
  UnitItem,
  DialogueItem,
  VocabItem,
  GrammarItem,
  EditionType,
  BookCode,
  BookFilter,
  SearchCategory,
  SearchResultItem,
  BookMeta
} from '../types';
import {
  getAllUnits,
  getUnitDialogues,
  getUnitVocab,
  getUnitGrammar,
  getBookForUnit,
  BOOKS_METADATA,
  ALL_BOOKS
} from '../data';
import { matchHangul } from '../utils/hangulSearch';

export class SearchService {
  /**
   * Search across all curriculum content for given query, edition, book filter, and category
   */
  static search(
    query: string,
    edition: EditionType = 'kbs',
    bookFilter: BookFilter = 'all',
    category: SearchCategory = 'all'
  ): SearchResultItem[] {
    const q = query.trim();
    if (!q) return [];

    const results: SearchResultItem[] = [];
    const units = getAllUnits(edition);

    // Group units by unit_number (since units.json can have subparts 1-1, 1-2 with the same unit_number)
    const uniqueUnitNumbers = Array.from(new Set(units.map((u) => u.unit_number))).sort(
      (a, b) => a - b
    );

    for (const unitNum of uniqueUnitNumbers) {
      const bookCode = getBookForUnit(unitNum);
      if (bookFilter !== 'all' && bookCode !== bookFilter) {
        continue;
      }

      const matchingUnits = units.filter((u) => u.unit_number === unitNum);
      const mainUnit = matchingUnits[0];
      const bookMeta = BOOKS_METADATA[bookCode];

      // 1. Search in Unit Topics / Titles / Situations
      if (category === 'all' || category === 'unit') {
        for (const u of matchingUnits) {
          if (
            matchHangul(u.title, q) ||
            matchHangul(u.topic, q) ||
            matchHangul(u.situation, q)
          ) {
            results.push({
              id: `unit-${u.unit_number}-${u.title}`,
              type: 'unit',
              title: `${u.unit_number}과: ${u.title}`,
              subtitle: `주제: ${u.topic}`,
              snippet: u.situation,
              unitNumber: u.unit_number,
              book: bookCode,
              level: u.level,
              badge: `${bookMeta.title.replace('한국어 톡톡 ', '')} · 단원`,
              tabTarget: 'dialogue'
            });
          }
        }
      }

      // 2. Search in Grammar
      if (category === 'all' || category === 'grammar') {
        const grammarItems = getUnitGrammar(unitNum, edition);
        for (const g of grammarItems) {
          const pointMatch = matchHangul(g.grammar_point, q);
          const expMatch = matchHangul(g.explanation, q);
          const exSnippet = g.example_sentences.find((ex) => matchHangul(ex, q));

          if (pointMatch || expMatch || exSnippet) {
            results.push({
              id: `grammar-${unitNum}-${g.grammar_point}`,
              type: 'grammar',
              title: g.grammar_point,
              subtitle: `${unitNum}과 [${mainUnit.topic}] 문법 포인트`,
              snippet: exSnippet ? `예문: "${exSnippet}"` : g.explanation,
              unitNumber: unitNum,
              book: bookCode,
              level: mainUnit.level,
              badge: `${bookMeta.title.replace('한국어 톡톡 ', '')} · 문법`,
              tabTarget: 'grammar'
            });
          }
        }
      }

      // 3. Search in Vocabulary
      if (category === 'all' || category === 'vocab') {
        const vocabItems = getUnitVocab(unitNum, edition);
        for (const v of vocabItems) {
          const wordMatch = matchHangul(v.word, q);
          const meaningMatch = matchHangul(v.meaning, q);
          const exMatch = matchHangul(v.example_sentence, q);

          if (wordMatch || meaningMatch || exMatch) {
            results.push({
              id: `vocab-${unitNum}-${v.word}`,
              type: 'vocab',
              title: `${v.word} (${v.part_of_speech})`,
              subtitle: `${v.meaning}`,
              snippet: `예문: ${v.example_sentence}`,
              unitNumber: unitNum,
              book: bookCode,
              level: v.level,
              badge: `${bookMeta.title.replace('한국어 톡톡 ', '')} · 어휘`,
              tabTarget: 'vocab'
            });
          }
        }
      }

      // 4. Search in Dialogues
      if (category === 'all' || category === 'dialogue') {
        const dialogues = getUnitDialogues(unitNum, edition);
        for (const d of dialogues) {
          const korMatch = matchHangul(d.korean_text, q);
          const transMatch = matchHangul(d.translation, q);
          const speakerMatch = matchHangul(d.speaker, q);

          if (korMatch || transMatch || speakerMatch) {
            results.push({
              id: `dialogue-${unitNum}-${d.dialogue_id}`,
              type: 'dialogue',
              title: `[${d.speaker}] "${d.korean_text}"`,
              subtitle: d.translation,
              snippet: `${unitNum}과 [${mainUnit.topic}] 대화문`,
              unitNumber: unitNum,
              book: bookCode,
              level: mainUnit.level,
              badge: `${bookMeta.title.replace('한국어 톡톡 ', '')} · 회화`,
              tabTarget: 'dialogue'
            });
          }
        }
      }
    }

    // Limit results for UX performance
    return results.slice(0, 50);
  }

  /**
   * Get units belonging to a specific book
   */
  static getBookUnits(bookCode: BookCode, edition: EditionType = 'kbs'): UnitItem[] {
    const units = getAllUnits(edition);
    const meta = BOOKS_METADATA[bookCode];
    const [start, end] = meta.unitRange;
    return units.filter((u) => u.unit_number >= start && u.unit_number <= end);
  }

  /**
   * Get curriculum summary statistics for TOC view
   */
  static getCurriculumOverview(edition: EditionType = 'kbs') {
    return ALL_BOOKS.map((book) => {
      const units = this.getBookUnits(book.code, edition);
      const uniqueUnitNums = Array.from(new Set(units.map((u) => u.unit_number)));
      
      let totalVocab = 0;
      let totalGrammar = 0;
      let totalDialogues = 0;

      for (const num of uniqueUnitNums) {
        totalVocab += getUnitVocab(num, edition).length;
        totalGrammar += getUnitGrammar(num, edition).length;
        totalDialogues += getUnitDialogues(num, edition).length;
      }

      return {
        book,
        unitsCount: uniqueUnitNums.length,
        totalVocab,
        totalGrammar,
        totalDialogues,
        lessons: uniqueUnitNums.map((num) => {
          const subUnits = units.filter((u) => u.unit_number === num);
          const grammar = getUnitGrammar(num, edition);
          const vocab = getUnitVocab(num, edition);
          return {
            unitNumber: num,
            mainTitle: subUnits.map((s) => s.title).join(' / '),
            topics: subUnits.map((s) => s.topic).join(', '),
            situations: subUnits.map((s) => s.situation).join(' '),
            grammarPoints: grammar.map((g) => g.grammar_point),
            vocabCount: vocab.length
          };
        })
      };
    });
  }
}
