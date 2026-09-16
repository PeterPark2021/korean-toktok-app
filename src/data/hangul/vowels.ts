import { VowelData } from './types';

export const BASIC_VOWELS: VowelData[] = [
  {
    char: 'ㅏ',
    name: '아',
    romanization: 'a',
    type: 'basic',
    strokes: ['① 위에서 아래로 세로획 (ㅣ)', '② 가운데에서 오른쪽으로 가로획 (ㅏ)'],
    pronunciationTip: "입을 편안하게 크게 벌리고 '아' 소리를 냅니다. 영어의 'father'의 'a'와 유사합니다.",
    mouthShape: '입을 세로로 크게 벌림',
    exampleWords: [
      { word: '아이', meaning: 'child / kid', romanization: 'a-i' },
      { word: '아우', meaning: 'younger brother/sister', romanization: 'a-u' },
      { word: '아빠', meaning: 'dad', romanization: 'a-ppa' }
    ]
  },
  {
    char: 'ㅑ',
    name: '야',
    romanization: 'ya',
    type: 'basic',
    strokes: ['① 위에서 아래로 긴 세로획', '② 첫 번째 오른쪽 짧은 가로획', '③ 두 번째 오른쪽 짧은 가로획'],
    pronunciationTip: "'이' 소리에서 '아' 소리로 빠르게 이어 발음합니다. 영어의 'yard'의 'ya'와 유사합니다.",
    mouthShape: "입을 양옆으로 당겼다가('이') 크게 벌림('아')",
    exampleWords: [
      { word: '야구', meaning: 'baseball', romanization: 'ya-gu' },
      { word: '야채', meaning: 'vegetable', romanization: 'ya-chae' },
      { word: '이야기', meaning: 'story', romanization: 'i-ya-gi' }
    ]
  },
  {
    char: 'ㅓ',
    name: '어',
    romanization: 'eo',
    type: 'basic',
    strokes: ['① 왼쪽에서 오른쪽으로 짧은 가로획', '② 위에서 아래로 세로획 (ㅓ)'],
    pronunciationTip: "입을 '아'보다 작게 벌리고 혀를 뒤로 당겨 소리를 냅니다. 영어의 'cup'의 'u'와 유사합니다.",
    mouthShape: "입을 둥글리지 않고 '아'보다 조금 좁게 벌림",
    exampleWords: [
      { word: '어머니', meaning: 'mother', romanization: 'eo-meo-ni' },
      { word: '어디', meaning: 'where', romanization: 'eo-di' },
      { word: '어깨', meaning: 'shoulder', romanization: 'eo-kkae' }
    ]
  },
  {
    char: 'ㅕ',
    name: '여',
    romanization: 'yeo',
    type: 'basic',
    strokes: ['① 첫 번째 짧은 가로획', '② 두 번째 짧은 가로획', '③ 위에서 아래로 긴 세로획'],
    pronunciationTip: "'이' 소리에서 '어' 소리로 부드럽고 빠르게 넘어가며 냅니다. 영어의 'young'의 'yo'와 유사합니다.",
    mouthShape: "'이'에서 '어'로 전환",
    exampleWords: [
      { word: '여우', meaning: 'fox', romanization: 'yeo-u' },
      { word: '여자', meaning: 'woman', romanization: 'yeo-ja' },
      { word: '여행', meaning: 'travel', romanization: 'yeo-haeng' }
    ]
  },
  {
    char: 'ㅗ',
    name: '오',
    romanization: 'o',
    type: 'basic',
    strokes: ['① 위에서 아래로 짧은 세로획', '② 왼쪽에서 오른쪽으로 긴 가로획 (ㅗ)'],
    pronunciationTip: "입술을 둥글게 모아 앞으로 내밀며 '오' 소리를 냅니다. 영어의 'home'의 'o'와 유사합니다.",
    mouthShape: '입술을 동그랗게 모으고 좁힘',
    exampleWords: [
      { word: '오이', meaning: 'cucumber', romanization: 'o-i' },
      { word: '오리', meaning: 'duck', romanization: 'o-ri' },
      { word: '오늘', meaning: 'today', romanization: 'o-neul' }
    ]
  },
  {
    char: 'ㅛ',
    name: '요',
    romanization: 'yo',
    type: 'basic',
    strokes: ['① 왼쪽 짧은 세로획', '② 오른쪽 짧은 세로획', '③ 왼쪽에서 오른쪽으로 긴 가로획'],
    pronunciationTip: "'이' 소리에서 '오' 소리로 입술을 둥글게 모으며 발음합니다. 영어의 'yoga'의 'yo'와 유사합니다.",
    mouthShape: "입을 편 상태에서 입술을 둥글게 모음",
    exampleWords: [
      { word: '요요', meaning: 'yo-yo', romanization: 'yo-yo' },
      { word: '요리', meaning: 'cooking', romanization: 'yo-ri' },
      { word: '요일', meaning: 'day of the week', romanization: 'yo-il' }
    ]
  },
  {
    char: 'ㅜ',
    name: '우',
    romanization: 'u',
    type: 'basic',
    strokes: ['① 왼쪽에서 오른쪽으로 긴 가로획', '② 가운데에서 아래로 짧은 세로획 (ㅜ)'],
    pronunciationTip: "입술을 '오'보다 더 좁게 둥글려 앞으로 내밀며 '우' 소리를 냅니다. 영어의 'moon'의 'oo'와 유사합니다.",
    mouthShape: '입술을 가장 작게 동그랗게 모아 앞으로 내밂',
    exampleWords: [
      { word: '우유', meaning: 'milk', romanization: 'u-yu' },
      { word: '우산', meaning: 'umbrella', romanization: 'u-san' },
      { word: '우리', meaning: 'we / us', romanization: 'u-ri' }
    ]
  },
  {
    char: 'ㅠ',
    name: '유',
    romanization: 'yu',
    type: 'basic',
    strokes: ['① 왼쪽에서 오른쪽으로 긴 가로획', '② 첫 번째 아래 세로획', '③ 두 번째 아래 세로획'],
    pronunciationTip: "'이' 소리에서 '우' 소리로 부드럽게 연결하여 냅니다. 영어의 'you'와 유사합니다.",
    mouthShape: "'이'에서 시작하여 입술을 좁게 오므림",
    exampleWords: [
      { word: '유리', meaning: 'glass', romanization: 'yu-ri' },
      { word: '유명', meaning: 'famous', romanization: 'yu-myeong' },
      { word: '휴지', meaning: 'tissue', romanization: 'hyu-ji' }
    ]
  },
  {
    char: 'ㅡ',
    name: '으',
    romanization: 'eu',
    type: 'basic',
    strokes: ['① 왼쪽에서 오른쪽으로 수평 가로획 (ㅡ)'],
    pronunciationTip: "입술을 옆으로 평평하게 펴고 혀를 뒤쪽에 둔 채 '으' 소리를 냅니다. 입술을 둥글리지 않습니다.",
    mouthShape: '입술을 양옆으로 평평하게 벌림',
    exampleWords: [
      { word: '으뜸', meaning: 'the best / first', romanization: 'eu-tteum' },
      { word: '음악', meaning: 'music', romanization: 'eum-ak' },
      { word: '은행', meaning: 'bank', romanization: 'eun-haeng' }
    ]
  },
  {
    char: 'ㅣ',
    name: '이',
    romanization: 'i',
    type: 'basic',
    strokes: ['① 위에서 아래로 수직 세로획 (ㅣ)'],
    pronunciationTip: "입술을 양옆으로 활짝 당기며 미소 짓는 모양으로 '이' 소리를 냅니다. 영어의 'see'의 'ee'와 유사합니다.",
    mouthShape: '미소 짓듯이 입을 양옆으로 넓게 당김',
    exampleWords: [
      { word: '이', meaning: 'teeth / two', romanization: 'i' },
      { word: '이름', meaning: 'name', romanization: 'i-reum' },
      { word: '이야기', meaning: 'story', romanization: 'i-ya-gi' }
    ]
  }
];

export const COMPOUND_VOWELS: VowelData[] = [
  {
    char: 'ㅐ',
    name: '애',
    romanization: 'ae',
    type: 'compound',
    strokes: ['① 짧은 가로획 (ㅏ의 곁가지)', '② 왼쪽 세로획', '③ 오른쪽 세로획'],
    pronunciationTip: "ㅏ와 ㅣ의 결합. 입을 적당히 벌리고 '애' 소리를 냅니다. 영어 'apple'의 'a'와 비슷합니다.",
    exampleWords: [
      { word: '애기', meaning: 'baby', romanization: 'ae-gi' },
      { word: '배', meaning: 'ship / pear / belly', romanization: 'bae' },
      { word: '개', meaning: 'dog', romanization: 'gae' }
    ]
  },
  {
    char: 'ㅒ',
    name: '얘',
    romanization: 'yae',
    type: 'compound',
    strokes: ['① 첫 번째 짧은 가로획', '② 두 번째 짧은 가로획', '③ 왼쪽 세로획', '④ 오른쪽 세로획'],
    pronunciationTip: "ㅑ와 ㅣ의 결합. '이'에서 '애'로 빠르게 발음합니다.",
    exampleWords: [
      { word: '얘기', meaning: 'talk / story', romanization: 'yae-gi' },
      { word: '걔', meaning: 'that kid', romanization: 'gyae' }
    ]
  },
  {
    char: 'ㅔ',
    name: '에',
    romanization: 'e',
    type: 'compound',
    strokes: ['① 왼쪽 세로획 (ㅓ의 세로)', '② 가운데 짧은 가로획', '③ 오른쪽 세로획'],
    pronunciationTip: "ㅓ와 ㅣ의 결합. 'ㅐ'보다 입을 약간 작게 벌리고 '에' 소리를 냅니다. 현대 한국어에서는 ㅐ와 매우 유사하게 들립니다.",
    exampleWords: [
      { word: '에너지', meaning: 'energy', romanization: 'e-neo-ji' },
      { word: '세계', meaning: 'world', romanization: 'se-gye' },
      { word: '메모', meaning: 'memo', romanization: 'me-mo' }
    ]
  },
  {
    char: 'ㅖ',
    name: '예',
    romanization: 'ye',
    type: 'compound',
    strokes: ['① 왼쪽 세로획', '② 위 가로획', '③ 아래 가로획', '④ 오른쪽 세로획'],
    pronunciationTip: "ㅕ와 ㅣ의 결합. '이'에서 '에'로 매끄럽게 발음합니다. 영어 'yes'의 'ye'와 유사합니다.",
    exampleWords: [
      { word: '예', meaning: 'yes (polite)', romanization: 'ye' },
      { word: '시계', meaning: 'clock / watch', romanization: 'si-gye' },
      { word: '예술', meaning: 'art', romanization: 'ye-sul' }
    ]
  },
  {
    char: 'ㅘ',
    name: '와',
    romanization: 'wa',
    type: 'compound',
    strokes: ['① ㅗ의 세로획', '② ㅗ의 가로획', '③ ㅏ의 세로획', '④ ㅏ의 가로획'],
    pronunciationTip: "ㅗ와 ㅏ의 결합. '오'에서 '아'로 빠르게 이어 '와'로 소리냅니다. 영어 'water'의 'wa'와 유사합니다.",
    exampleWords: [
      { word: '과제', meaning: 'assignment / task', romanization: 'gwa-je' },
      { word: '사과', meaning: 'apple', romanization: 'sa-gwa' },
      { word: '와인', meaning: 'wine', romanization: 'wa-in' }
    ]
  },
  {
    char: 'ㅙ',
    name: '왜',
    romanization: 'wae',
    type: 'compound',
    strokes: ['① ㅗ의 세로획', '② ㅗ의 가로획', '③ ㅐ의 가로획', '④ ㅐ의 좌세로획', '⑤ ㅐ의 우세로획'],
    pronunciationTip: "ㅗ와 ㅐ의 결합. '오'에서 '애'로 빠르게 이어 '왜'로 소리냅니다. 영어 'wait'의 'wai'와 유사합니다.",
    exampleWords: [
      { word: '왜', meaning: 'why', romanization: 'wae' },
      { word: '돼지', meaning: 'pig', romanization: 'dwae-ji' },
      { word: '외국', meaning: 'foreign country', romanization: 'oe-guk' }
    ]
  },
  {
    char: 'ㅚ',
    name: '외',
    romanization: 'oe',
    type: 'compound',
    strokes: ['① ㅗ의 짧은 세로획', '② ㅗ의 긴 가로획', '③ ㅣ의 긴 세로획'],
    pronunciationTip: "ㅗ와 ㅣ의 결합. 현대 한국어에서는 [we(웨)]와 거의 같게 발음됩니다.",
    exampleWords: [
      { word: '과외', meaning: 'tutoring', romanization: 'gwa-oe' },
      { word: '교회', meaning: 'church', romanization: 'gyo-hoe' },
      { word: '회사', meaning: 'company', romanization: 'hoe-sa' }
    ]
  },
  {
    char: 'ㅝ',
    name: '워',
    romanization: 'wo',
    type: 'compound',
    strokes: ['① ㅜ의 긴 가로획', '② ㅜ의 짧은 세로획', '③ ㅓ의 가로획', '④ ㅓ의 세로획'],
    pronunciationTip: "ㅜ와 ㅓ의 결합. '우'에서 '어'로 빠르게 이어 '워'로 소리냅니다. 영어 'wonder'의 'wo'와 유사합니다.",
    exampleWords: [
      { word: '원', meaning: 'won (currency)', romanization: 'won' },
      { word: '병원', meaning: 'hospital', romanization: 'byeong-won' },
      { word: '월요일', meaning: 'Monday', romanization: 'wor-yo-il' }
    ]
  },
  {
    char: 'ㅞ',
    name: '웨',
    romanization: 'we',
    type: 'compound',
    strokes: ['① ㅜ의 가로획', '② ㅜ의 세로획', '③ ㅔ의 좌세로획', '④ ㅔ의 가로획', '⑤ ㅔ의 우세로획'],
    pronunciationTip: "ㅜ와 ㅔ의 결합. '우'에서 '에'로 빠르게 이어 '웨'로 소리냅니다. 영어 'wedding'의 'we'와 유사합니다.",
    exampleWords: [
      { word: '웨딩', meaning: 'wedding', romanization: 'we-ding' },
      { word: '스웨터', meaning: 'sweater', romanization: 'seu-we-teo' },
      { word: '웹사이트', meaning: 'website', romanization: 'wep-sa-i-teu' }
    ]
  },
  {
    char: 'ㅟ',
    name: '위',
    romanization: 'wi',
    type: 'compound',
    strokes: ['① ㅜ의 긴 가로획', '② ㅜ의 짧은 세로획', '③ ㅣ의 긴 세로획'],
    pronunciationTip: "ㅜ와 ㅣ의 결합. '우'에서 '이'로 빠르게 이어 '위'로 소리냅니다. 영어 'we'와 유사합니다.",
    exampleWords: [
      { word: '위', meaning: 'up / stomach', romanization: 'wi' },
      { word: '귀', meaning: 'ear', romanization: 'gwi' },
      { word: '가위', meaning: 'scissors', romanization: 'ga-wi' }
    ]
  },
  {
    char: 'ㅢ',
    name: '의',
    romanization: 'ui',
    type: 'compound',
    strokes: ['① ㅡ의 가로획', '② ㅣ의 세로획'],
    pronunciationTip: "ㅡ와 ㅣ의 결합. '으'에서 '이'로 매끄럽게 발음합니다. 단어 첫머리에서는 [의], 조사일 때는 [에], 자음 뒤에서는 [이]로 발음되기도 합니다.",
    exampleWords: [
      { word: '의사', meaning: 'doctor', romanization: 'ui-sa' },
      { word: '의자', meaning: 'chair', romanization: 'ui-ja' },
      { word: '회의', meaning: 'meeting', romanization: 'hoe-ui' }
    ]
  }
];

export const ALL_VOWELS = [...BASIC_VOWELS, ...COMPOUND_VOWELS];
