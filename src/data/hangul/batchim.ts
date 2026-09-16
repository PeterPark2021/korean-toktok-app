import { BatchimRule, CompoundBatchimRule, BatchimSentence } from './types';

// 7대 대표음 규칙 (7 Representative Final Consonant Sounds)
export const SEVEN_REPRESENTATIVE_BATCHIM: BatchimRule[] = [
  {
    representativeSound: '[ㄱ]',
    romanization: 'k',
    consonants: ['ㄱ', 'ㄲ', 'ㅋ', 'ㄳ', 'ㄺ'],
    description: '목구멍을 막고 혀뿌리를 여린입천장에 붙인 채 소리를 멈춥니다.',
    exampleWords: [
      { word: '책', actualPronunciation: '[책]', meaning: 'book' },
      { word: '밖', actualPronunciation: '[박]', meaning: 'outside' },
      { word: '부엌', actualPronunciation: '[부억]', meaning: 'kitchen' },
      { word: '몫', actualPronunciation: '[목]', meaning: 'share / portion' },
      { word: '닭', actualPronunciation: '[닥]', meaning: 'chicken' }
    ]
  },
  {
    representativeSound: '[ㄴ]',
    romanization: 'n',
    consonants: ['ㄴ', 'ㄵ', 'ㄶ'],
    description: '혀끝을 윗잇몸에 붙이고 코로 소리를 내며 멈춥니다.',
    exampleWords: [
      { word: '안', actualPronunciation: '[안]', meaning: 'inside' },
      { word: '눈', actualPronunciation: '[눈]', meaning: 'eye / snow' },
      { word: '문', actualPronunciation: '[문]', meaning: 'door' },
      { word: '앉다', actualPronunciation: '[안따]', meaning: 'to sit' },
      { word: '끈', actualPronunciation: '[끈]', meaning: 'string / strap' }
    ]
  },
  {
    representativeSound: '[ㄷ]',
    romanization: 't',
    consonants: ['ㄷ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ', 'ㅎ'],
    description: '혀끝을 윗잇몸에 대어 공기를 완전히 막아 닫습니다. 가장 많은 자음이 [ㄷ]으로 소리납니다.',
    exampleWords: [
      { word: '닫다', actualPronunciation: '[닫따]', meaning: 'to close' },
      { word: '못', actualPronunciation: '[몯]', meaning: 'nail / cannot' },
      { word: '갔다', actualPronunciation: '[갇따]', meaning: 'went' },
      { word: '찾다', actualPronunciation: '[찯따]', meaning: 'to find / search' },
      { word: '꽃', actualPronunciation: '[꼳]', meaning: 'flower' },
      { word: '밭', actualPronunciation: '[받]', meaning: 'field / farm' },
      { word: '히읗', actualPronunciation: '[히읃]', meaning: 'the letter ㅎ' }
    ]
  },
  {
    representativeSound: '[ㄹ]',
    romanization: 'l',
    consonants: ['ㄹ', 'ㄽ', 'ㄾ', 'ㅀ'],
    description: '혀끝을 윗잇몸에 댄 채 혀 양옆으로 숨을 흘려보냅니다.',
    exampleWords: [
      { word: '발', actualPronunciation: '[발]', meaning: 'foot' },
      { word: '살', actualPronunciation: '[살]', meaning: 'flesh / skin' },
      { word: '술', actualPronunciation: '[술]', meaning: 'alcohol' },
      { word: '외곬', actualPronunciation: '[외골]', meaning: 'single way' },
      { word: '핥다', actualPronunciation: '[할따]', meaning: 'to lick' }
    ]
  },
  {
    representativeSound: '[ㅁ]',
    romanization: 'm',
    consonants: ['ㅁ', 'ㄻ'],
    description: '두 입술을 다물어 공기를 막고 코로 울려 소리냅니다.',
    exampleWords: [
      { word: '곰', actualPronunciation: '[곰]', meaning: 'bear' },
      { word: '몸', actualPronunciation: '[몸]', meaning: 'body' },
      { word: '꿈', actualPronunciation: '[꿈]', meaning: 'dream' },
      { word: '삶', actualPronunciation: '[삼]', meaning: 'life' }
    ]
  },
  {
    representativeSound: '[ㅂ]',
    romanization: 'p',
    consonants: ['ㅂ', 'ㅍ', 'ㅄ', 'ㄿ'],
    description: '두 입술을 꼭 다물어 공기를 완전히 차단하며 멈춥니다.',
    exampleWords: [
      { word: '밥', actualPronunciation: '[밥]', meaning: 'rice / meal' },
      { word: '입', actualPronunciation: '[입]', meaning: 'mouth' },
      { word: '앞', actualPronunciation: '[압]', meaning: 'front' },
      { word: '잎', actualPronunciation: '[입]', meaning: 'leaf' },
      { word: '값', actualPronunciation: '[갑]', meaning: 'price / value' },
      { word: '읊다', actualPronunciation: '[읍따]', meaning: 'to recite' }
    ]
  },
  {
    representativeSound: '[ㅇ]',
    romanization: 'ng',
    consonants: ['ㅇ'],
    description: '혀뿌리를 여린입천장에 대고 콧소리로 울리며 냅니다. 영어 sing의 ng 소리입니다.',
    exampleWords: [
      { word: '양', actualPronunciation: '[양]', meaning: 'sheep / amount' },
      { word: '용', actualPronunciation: '[용]', meaning: 'dragon' },
      { word: '빵', actualPronunciation: '[빵]', meaning: 'bread' },
      { word: '강', actualPronunciation: '[강]', meaning: 'river' }
    ]
  }
];

// 11개 겹받침 발음 규칙 (11 Compound Batchim Rules)
export const COMPOUND_BATCHIM_RULES: CompoundBatchimRule[] = [
  // 1. 앞 자음으로 발음하는 경우 (First Consonant Sound)
  {
    batchim: 'ㄳ',
    pronouncedAs: '[ㄱ]',
    category: 'first_sound',
    ruleDescription: "두 자음 중 앞의 'ㄱ'으로 소리납니다.",
    exampleWords: [
      { word: '삯', actualPronunciation: '[삭]', meaning: 'wage / fare' },
      { word: '넋', actualPronunciation: '[넉]', meaning: 'soul / spirit' }
    ]
  },
  {
    batchim: 'ㄵ',
    pronouncedAs: '[ㄴ]',
    category: 'first_sound',
    ruleDescription: "두 자음 중 앞의 'ㄴ'으로 소리나며 뒤 자음은 된소리가 됩니다.",
    exampleWords: [
      { word: '앉다', actualPronunciation: '[안따]', meaning: 'to sit' }
    ]
  },
  {
    batchim: 'ㄶ',
    pronouncedAs: '[ㄴ]',
    category: 'first_sound',
    ruleDescription: "앞의 'ㄴ'으로 소리나며, 뒤에 모음이 오면 ㅎ이 탈락하거나 자음과 만나 거센소리가 됩니다.",
    exampleWords: [
      { word: '끊다', actualPronunciation: '[끈타]', meaning: 'to cut off' },
      { word: '많다', actualPronunciation: '[만타]', meaning: 'many / much' }
    ]
  },
  {
    batchim: 'ㄽ',
    pronouncedAs: '[ㄹ]',
    category: 'first_sound',
    ruleDescription: "두 자음 중 앞의 'ㄹ'로 소리납니다.",
    exampleWords: [
      { word: '외곬', actualPronunciation: '[외골]', meaning: 'single track / way' }
    ]
  },
  {
    batchim: 'ㄾ',
    pronouncedAs: '[ㄹ]',
    category: 'first_sound',
    ruleDescription: "앞의 'ㄹ'로 소리나며 뒤 자음이 된소리가 됩니다.",
    exampleWords: [
      { word: '핥다', actualPronunciation: '[할따]', meaning: 'to lick' }
    ]
  },
  {
    batchim: 'ㅀ',
    pronouncedAs: '[ㄹ]',
    category: 'first_sound',
    ruleDescription: "앞의 'ㄹ'로 소리나며 뒤에 오는 자음을 거센소리로 바꿉니다.",
    exampleWords: [
      { word: '잃습니다', actualPronunciation: '[일씀니다]', meaning: 'to lose' },
      { word: '싫다', actualPronunciation: '[실타]', meaning: 'to dislike' }
    ]
  },
  {
    batchim: 'ㅄ',
    pronouncedAs: '[ㅂ]',
    category: 'first_sound',
    ruleDescription: "두 자음 중 앞의 'ㅂ'으로 소리납니다.",
    exampleWords: [
      { word: '값', actualPronunciation: '[갑]', meaning: 'price' },
      { word: '없다', actualPronunciation: '[업따]', meaning: 'to not exist' }
    ]
  },

  // 2. 뒷 자음으로 발음하는 경우 (Second Consonant Sound)
  {
    batchim: 'ㄻ',
    pronouncedAs: '[ㅁ]',
    category: 'second_sound',
    ruleDescription: "두 자음 중 뒤의 'ㅁ'으로 소리납니다.",
    exampleWords: [
      { word: '삶다', actualPronunciation: '[삼따]', meaning: 'to boil' },
      { word: '젊다', actualPronunciation: '[점따]', meaning: 'to be young' }
    ]
  },
  {
    batchim: 'ㄿ',
    pronouncedAs: '[ㅂ]',
    category: 'second_sound',
    ruleDescription: "뒤의 'ㅍ'이 대표음 [ㅂ]으로 소리납니다.",
    exampleWords: [
      { word: '읊다', actualPronunciation: '[읍따]', meaning: 'to recite (poetry)' }
    ]
  },

  // 3. 조건부 / 불규칙 (Conditional / Irregular: ㄺ, ㄼ)
  {
    batchim: 'ㄺ',
    pronouncedAs: '[ㄱ] (원칙) / [ㄹ] (ㄱ 앞)',
    category: 'conditional',
    ruleDescription: "원칙적으로 [ㄱ]으로 발음하지만, 용언 어간 뒤에 'ㄱ'으로 시작하는 어미가 올 때는 [ㄹ]로 발음합니다.",
    exampleWords: [
      { word: '읽다', actualPronunciation: '[익따]', meaning: 'to read' },
      { word: '흙', actualPronunciation: '[흑]', meaning: 'soil / dirt' },
      { word: '맑지', actualPronunciation: '[막찌]', meaning: 'clear (is not it)' },
      { word: '읽고 (ㄱ앞)', actualPronunciation: '[일꼬]', meaning: 'read and...' },
      { word: '맑고 (ㄱ앞)', actualPronunciation: '[말꼬]', meaning: 'clear and...' }
    ]
  },
  {
    batchim: 'ㄼ',
    pronouncedAs: '[ㄹ] (원칙) / [ㅂ] (밟다, 넓죽)',
    category: 'conditional',
    ruleDescription: "원칙적으로 [ㄹ]로 발음하지만, '밟다'와 '넓-' 일부 파생어에서는 [ㅂ]으로 발음합니다.",
    exampleWords: [
      { word: '여덟', actualPronunciation: '[여덜]', meaning: 'eight' },
      { word: '넓다', actualPronunciation: '[널따]', meaning: 'wide / spacious' },
      { word: '밟다 (예외)', actualPronunciation: '[밥따]', meaning: 'to step on' },
      { word: '넓죽하다 (예외)', actualPronunciation: '[넙쭈카다]', meaning: 'broad / flat' }
    ]
  }
];

// 교재 겹받침 연습 실전문장 10선 (KBS Preliminary Page 17 Sentences)
export const BATCHIM_PRACTICE_SENTENCES: BatchimSentence[] = [
  {
    id: 1,
    korean: '시간이 없어요.',
    pronunciation: '[시가니 업써요]',
    translation: 'I do not have time.',
    targetBatchim: 'ㅄ (없다)'
  },
  {
    id: 2,
    korean: '여덟 개 주세요.',
    pronunciation: '[여덜 개 주세요]',
    translation: 'Please give me eight pieces.',
    targetBatchim: 'ㄼ (여덟)'
  },
  {
    id: 3,
    korean: '방이 넓어요.',
    pronunciation: '[방이 너러요 -> 넓어요: 널버요]',
    translation: 'The room is spacious and wide.',
    targetBatchim: 'ㄼ (넓다)'
  },
  {
    id: 4,
    korean: '강아지가 핥았어요.',
    pronunciation: '[강아지가 할타써요]',
    translation: 'The puppy licked me.',
    targetBatchim: 'ㄾ (핥다)'
  },
  {
    id: 5,
    korean: '지갑을 잃어 버렸다.',
    pronunciation: '[지가블 이러 버려따]',
    translation: 'I lost my wallet.',
    targetBatchim: 'ㅀ (잃다)'
  },
  {
    id: 6,
    korean: '책을 읽어요.',
    pronunciation: '[채글 일거요]',
    translation: 'I read a book.',
    targetBatchim: 'ㄺ (읽다)'
  },
  {
    id: 7,
    korean: '계란을 삶았어요?',
    pronunciation: '[계라늘 살마써요?]',
    translation: 'Did you boil the egg?',
    targetBatchim: 'ㄻ (삶다)'
  },
  {
    id: 8,
    korean: '흙을 터세요.',
    pronunciation: '[흘글 터세요]',
    translation: 'Please dust off the dirt.',
    targetBatchim: 'ㄺ (흙)'
  },
  {
    id: 9,
    korean: '오늘 날씨가 맑네요!',
    pronunciation: '[오늘 날씨가 망네요]',
    translation: 'The weather is so clear today!',
    targetBatchim: 'ㄺ (맑다)'
  },
  {
    id: 10,
    korean: '값비싼 옷이다.',
    pronunciation: '[갑삐싼 오시다]',
    translation: 'This is expensive clothing.',
    targetBatchim: 'ㅄ (값)'
  }
];
