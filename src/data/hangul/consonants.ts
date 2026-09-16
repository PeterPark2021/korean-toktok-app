import { ConsonantData } from './types';

export const BASIC_CONSONANTS: ConsonantData[] = [
  {
    char: 'ㄱ',
    name: '기역',
    romanization: 'g / k',
    type: 'basic',
    soundType: 'plain',
    contrastGroup: 'g_k',
    articulationPosition: '여린입천장소리 (연구개음)',
    strokes: ['① 가로로 가다가 꺾어 아래로 내림 (ㄱ)'],
    pronunciationTip: "단어 첫머리에서는 가벼운 'k'처럼 숨이 조금 나오며, 모음 사이에서는 부드러운 'g'로 소리납니다.",
    exampleWords: [
      { word: '가구', meaning: 'furniture', romanization: 'ga-gu' },
      { word: '고기', meaning: 'meat', romanization: 'go-gi' },
      { word: '구두', meaning: 'dress shoes', romanization: 'gu-du' }
    ]
  },
  {
    char: 'ㄴ',
    name: '니은',
    romanization: 'n',
    type: 'basic',
    soundType: 'plain',
    articulationPosition: '잇몸소리 (치조음)',
    strokes: ['① 위에서 아래로 내려오다가 오른쪽으로 꺾음 (ㄴ)'],
    pronunciationTip: "혀끝을 윗잇몸에 대고 코로 숨을 내쉬며 'n' 소리를 냅니다. 영어의 'n'과 유사합니다.",
    exampleWords: [
      { word: '나비', meaning: 'butterfly', romanization: 'na-bi' },
      { word: '나무', meaning: 'tree', romanization: 'na-mu' },
      { word: '누나', meaning: 'older sister (for males)', romanization: 'nu-na' }
    ]
  },
  {
    char: 'ㄷ',
    name: '디귿',
    romanization: 'd / t',
    type: 'basic',
    soundType: 'plain',
    contrastGroup: 'd_t',
    articulationPosition: '잇몸소리 (치조음)',
    strokes: ['① 위의 가로획 (ㅡ)', '② 아래 꺾임획 (ㄴ 모양)'],
    pronunciationTip: "혀끝을 윗잇몸에 댔다가 떼며 냅니다. 첫머리에선 부드러운 't', 모음 사이에서는 'd'로 소리납니다.",
    exampleWords: [
      { word: '도로', meaning: 'road', romanization: 'do-ro' },
      { word: '두부', meaning: 'tofu', romanization: 'du-bu' },
      { word: '다리', meaning: 'leg / bridge', romanization: 'da-ri' }
    ]
  },
  {
    char: 'ㄹ',
    name: '리을',
    romanization: 'r / l',
    type: 'basic',
    soundType: 'plain',
    articulationPosition: '잇몸소리 (유음)',
    strokes: ['① ㄱ 모양 획', '② 가로 획', '③ ㄴ 모양 획'],
    pronunciationTip: "모음 사이에서는 혀끝을 윗잇몸에 가볍게 튕기는 'r' 소리, 받침에서는 혀를 댄 채 머무는 'l' 소리가 납니다.",
    exampleWords: [
      { word: '라디오', meaning: 'radio', romanization: 'ra-di-o' },
      { word: '오리', meaning: 'duck', romanization: 'o-ri' },
      { word: '머리', meaning: 'head / hair', romanization: 'meo-ri' }
    ]
  },
  {
    char: 'ㅁ',
    name: '미음',
    romanization: 'm',
    type: 'basic',
    soundType: 'plain',
    articulationPosition: '입술소리 (양순음)',
    strokes: ['① 왼쪽 세로획', '② 꺾어 내리는 오른쪽 획', '③ 밑 가로 닫는 획'],
    pronunciationTip: "두 입술을 다물었다가 코로 소리를 내며 입술을 엽니다. 영어의 'm'과 유사합니다.",
    exampleWords: [
      { word: '모자', meaning: 'hat / cap', romanization: 'mo-ja' },
      { word: '마음', meaning: 'heart / mind', romanization: 'ma-eum' },
      { word: '미소', meaning: 'smile', romanization: 'mi-so' }
    ]
  },
  {
    char: 'ㅂ',
    name: '비읍',
    romanization: 'b / p',
    type: 'basic',
    soundType: 'plain',
    contrastGroup: 'b_p',
    articulationPosition: '입술소리 (양순음)',
    strokes: ['① 왼쪽 세로획', '② 오른쪽 세로획', '③ 가운데 가로획', '④ 아래 가로 닫는 획'],
    pronunciationTip: "두 입술을 다물어 공기를 막았다가 터뜨립니다. 첫머리에선 부드러운 'p', 모음 사이에서는 'b'로 소리납니다.",
    exampleWords: [
      { word: '부모', meaning: 'parents', romanization: 'bu-mo' },
      { word: '바지', meaning: 'pants', romanization: 'ba-ji' },
      { word: '버스', meaning: 'bus', romanization: 'beo-seu' }
    ]
  },
  {
    char: 'ㅅ',
    name: '시옷',
    romanization: 's',
    type: 'basic',
    soundType: 'plain',
    contrastGroup: 's',
    articulationPosition: '잇몸소리 (마찰음)',
    strokes: ['① 왼쪽 아래로 뻗는 빗금 획', '② 오른쪽 아래로 뻗는 빗금 획'],
    pronunciationTip: "혀끝을 윗잇몸 근처에 대고 틈 사이로 숨을 마찰시켜 's' 소리를 냅니다. 'ㅣ'나 'ㅑ, ㅕ, ㅛ, ㅠ' 앞에서는 'sh'처럼 발음됩니다.",
    exampleWords: [
      { word: '사자', meaning: 'lion', romanization: 'sa-ja' },
      { word: '시계', meaning: 'clock', romanization: 'si-gye' },
      { word: '수박', meaning: 'watermelon', romanization: 'su-bak' }
    ]
  },
  {
    char: 'ㅇ',
    name: '이응',
    romanization: 'silent (초성) / ng (종성)',
    type: 'basic',
    soundType: 'plain',
    articulationPosition: '목구멍소리 (후음) / 여린입천장소리 (비음)',
    strokes: ['① 위에서 시계 반대 방향으로 둥글게 원 그리기 (ㅇ)'],
    pronunciationTip: "글자의 첫소리(초성)로 쓰일 때는 음가가 없는 빈자리(모음 소리만 남)이며, 받침(종성)일 때는 영어 'sing'의 'ng' 소리가 납니다.",
    exampleWords: [
      { word: '오이', meaning: 'cucumber', romanization: 'o-i' },
      { word: '우유', meaning: 'milk', romanization: 'u-yu' },
      { word: '가방', meaning: 'bag (받침 ng)', romanization: 'ga-bang' }
    ]
  },
  {
    char: 'ㅈ',
    name: '지읒',
    romanization: 'j',
    type: 'basic',
    soundType: 'plain',
    contrastGroup: 'j_ch',
    articulationPosition: '센입천장소리 (경구개음)',
    strokes: ['① 위의 가로획', '② 왼쪽 아래 빗금', '③ 오른쪽 아래 빗금'],
    pronunciationTip: "혓바닥을 센입천장에 대어 공기를 막았다가 마찰시키며 냅니다. 영어의 'j'와 유사합니다.",
    exampleWords: [
      { word: '지도', meaning: 'map', romanization: 'ji-do' },
      { word: '자전거', meaning: 'bicycle', romanization: 'ja-jeon-geo' },
      { word: '주스', meaning: 'juice', romanization: 'ju-seu' }
    ]
  },
  {
    char: 'ㅊ',
    name: '치읓',
    romanization: 'ch',
    type: 'basic',
    soundType: 'aspirated',
    contrastGroup: 'j_ch',
    articulationPosition: '센입천장소리 (경구개 파찰음)',
    strokes: ['① 맨 위의 짧은 가로 점획', '② ㅈ의 가로획', '③ 왼쪽 빗금', '④ 오른쪽 빗금'],
    pronunciationTip: "'ㅈ'에 비해 숨(공기)을 강하게 밖으로 뿜어내며 소리를 냅니다. 영어의 'chair'의 'ch'와 유사합니다.",
    exampleWords: [
      { word: '차', meaning: 'tea / car', romanization: 'cha' },
      { word: '치마', meaning: 'skirt', romanization: 'chi-ma' },
      { word: '친구', meaning: 'friend', romanization: 'chin-gu' }
    ]
  },
  {
    char: 'ㅋ',
    name: '키읔',
    romanization: 'k',
    type: 'basic',
    soundType: 'aspirated',
    contrastGroup: 'g_k',
    articulationPosition: '여린입천장소리 (연구개음)',
    strokes: ['① ㄱ 모양 획', '② 가운데 가로획'],
    pronunciationTip: "'ㄱ'에 비해 강한 공기(기식)를 터뜨리며 'k' 소리를 냅니다. 손바닥을 입 앞에 대면 바람이 느껴집니다.",
    exampleWords: [
      { word: '커피', meaning: 'coffee', romanization: 'keo-pi' },
      { word: '카메라', meaning: 'camera', romanization: 'ka-me-ra' },
      { word: '코', meaning: 'nose', romanization: 'ko' }
    ]
  },
  {
    char: 'ㅌ',
    name: '티읕',
    romanization: 't',
    type: 'basic',
    soundType: 'aspirated',
    contrastGroup: 'd_t',
    articulationPosition: '잇몸소리 (치조음)',
    strokes: ['① 맨 위 가로획', '② 가운데 가로획', '③ ㄴ 모양 꺾임획'],
    pronunciationTip: "'ㄷ'에 비해 강한 숨을 세게 내뿜으며 't' 소리를 냅니다. 영어의 'table'의 't'와 유사합니다.",
    exampleWords: [
      { word: '토마토', meaning: 'tomato', romanization: 'to-ma-to' },
      { word: '타조', meaning: 'ostrich', romanization: 'ta-jo' },
      { word: '택시', meaning: 'taxi', romanization: 'taek-si' }
    ]
  },
  {
    char: 'ㅍ',
    name: '피읖',
    romanization: 'p',
    type: 'basic',
    soundType: 'aspirated',
    contrastGroup: 'b_p',
    articulationPosition: '입술소리 (양순음)',
    strokes: ['① 위 가로획', '② 왼쪽 세로획', '③ 오른쪽 세로획', '④ 아래 가로 닫는 획'],
    pronunciationTip: "두 입술을 다물었다가 숨을 강하게 '팍' 터뜨리며 냅니다. 영어의 'piano'의 'p'와 유사합니다.",
    exampleWords: [
      { word: '피아노', meaning: 'piano', romanization: 'pi-a-no' },
      { word: '포도', meaning: 'grapes', romanization: 'po-do' },
      { word: '파', meaning: 'green onion', romanization: 'pa' }
    ]
  },
  {
    char: 'ㅎ',
    name: '히읗',
    romanization: 'h',
    type: 'basic',
    soundType: 'plain',
    articulationPosition: '목구멍소리 (후음)',
    strokes: ['① 맨 위 짧은 점획', '② 가운데 가로획', '③ 아래 원 (ㅇ)'],
    pronunciationTip: "목구멍에서 한숨을 내쉬듯이 부드럽게 숨을 뿜어 'h' 소리를 냅니다. 영어의 'house'의 'h'와 유사합니다.",
    exampleWords: [
      { word: '하늘', meaning: 'sky', romanization: 'ha-neul' },
      { word: '학교', meaning: 'school', romanization: 'hak-gyo' },
      { word: '호랑이', meaning: 'tiger', romanization: 'ho-rang-i' }
    ]
  }
];

export const TENSE_CONSONANTS: ConsonantData[] = [
  {
    char: 'ㄲ',
    name: '쌍기역',
    romanization: 'kk',
    type: 'tense',
    soundType: 'tense',
    contrastGroup: 'g_k',
    articulationPosition: '여린입천장소리 (연구개음)',
    strokes: ['① 첫 번째 ㄱ', '② 두 번째 ㄱ'],
    pronunciationTip: "목구멍 근육을 팽팽하게 조인 상태에서 숨을 거의 내뱉지 않고 단단하고 강하게 'ㄲ' 소리를 냅니다.",
    exampleWords: [
      { word: '꼬리', meaning: 'tail', romanization: 'kko-ri' },
      { word: '코끼리', meaning: 'elephant', romanization: 'ko-kki-ri' },
      { word: '꿈', meaning: 'dream', romanization: 'kkum' }
    ]
  },
  {
    char: 'ㄸ',
    name: '쌍디귿',
    romanization: 'tt',
    type: 'tense',
    soundType: 'tense',
    contrastGroup: 'd_t',
    articulationPosition: '잇몸소리 (치조음)',
    strokes: ['① 첫 번째 ㄷ (2획)', '② 두 번째 ㄷ (2획)'],
    pronunciationTip: "혀끝을 윗잇몸에 강하게 밀착시키고 목에 힘을 주어 숨이 새어 나가지 않게 단단하게 'ㄸ' 소리를 냅니다.",
    exampleWords: [
      { word: '딸기', meaning: 'strawberry', romanization: 'ttal-gi' },
      { word: '또래', meaning: 'peer / age group', romanization: 'tto-rae' },
      { word: '떡', meaning: 'rice cake', romanization: 'tteok' }
    ]
  },
  {
    char: 'ㅃ',
    name: '쌍비읍',
    romanization: 'pp',
    type: 'tense',
    soundType: 'tense',
    contrastGroup: 'b_p',
    articulationPosition: '입술소리 (양순음)',
    strokes: ['① 첫 번째 ㅂ (4획)', '② 두 번째 ㅂ (4획)'],
    pronunciationTip: "두 입술을 힘있게 꽉 다물었다가 숨을 뿜지 않고 짱짱하게 터뜨리며 'ㅃ' 소리를 냅니다.",
    exampleWords: [
      { word: '빵', meaning: 'bread', romanization: 'ppang' },
      { word: '뽀뽀', meaning: 'kiss (cute)', romanization: 'ppo-ppo' },
      { word: '오빠', meaning: 'older brother (for females)', romanization: 'o-ppa' }
    ]
  },
  {
    char: 'ㅆ',
    name: '쌍시옷',
    romanization: 'ss',
    type: 'tense',
    soundType: 'tense',
    contrastGroup: 's',
    articulationPosition: '잇몸소리 (마찰음)',
    strokes: ['① 첫 번째 ㅅ (2획)', '② 두 번째 ㅅ (2획)'],
    pronunciationTip: "'ㅅ'보다 혀끝에 힘을 강하게 주고 날카롭게 마찰시켜 'ㅆ' 소리를 냅니다.",
    exampleWords: [
      { word: '싸움', meaning: 'fight', romanization: 'ssa-um' },
      { word: '씨앗', meaning: 'seed', romanization: 'ssi-at' },
      { word: '아저씨', meaning: 'middle-aged man', romanization: 'a-jeo-ssi' }
    ]
  },
  {
    char: 'ㅉ',
    name: '쌍지읒',
    romanization: 'jj',
    type: 'tense',
    soundType: 'tense',
    contrastGroup: 'j_ch',
    articulationPosition: '센입천장소리 (경구개음)',
    strokes: ['① 첫 번째 ㅈ (3획)', '② 두 번째 ㅈ (3획)'],
    pronunciationTip: "혓바닥을 센입천장에 단단히 밀착시키고 힘을 주어 짱짱하게 'ㅉ' 소리를 냅니다.",
    exampleWords: [
      { word: '찌개', meaning: 'stew', romanization: 'jji-gae' },
      { word: '짜장면', meaning: 'black bean noodles', romanization: 'jja-jang-myeon' },
      { word: '진짜', meaning: 'really / real', romanization: 'jin-jja' }
    ]
  }
];

export const ALL_CONSONANTS = [...BASIC_CONSONANTS, ...TENSE_CONSONANTS];

// 3-Way Phonation Contrast Groups
export const CONTRAST_GROUPS = [
  {
    title: 'ㄱ 계열 (여린입천장소리)',
    plain: { char: 'ㄱ', name: '기역 (예사소리)', desc: '부드럽게 숨이 조금 나옴', word: '가구' },
    tense: { char: 'ㄲ', name: '쌍기역 (된소리)', desc: '목을 조이고 단단하게', word: '꼬리' },
    aspirated: { char: 'ㅋ', name: '키읔 (거센소리)', desc: '숨을 강하게 밖으로 뿜음', word: '커피' }
  },
  {
    title: 'ㄷ 계열 (잇몸소리)',
    plain: { char: 'ㄷ', name: '디귿 (예사소리)', desc: '부드러운 소리', word: '도로' },
    tense: { char: 'ㄸ', name: '쌍디귿 (된소리)', desc: '혀끝에 힘을 주어 단단하게', word: '딸기' },
    aspirated: { char: 'ㅌ', name: '티읕 (거센소리)', desc: '강한 바람을 뿜음', word: '토마토' }
  },
  {
    title: 'ㅂ 계열 (입술소리)',
    plain: { char: 'ㅂ', name: '비읍 (예사소리)', desc: '입술을 가볍게 열며', word: '바지' },
    tense: { char: 'ㅃ', name: '쌍비읍 (된소리)', desc: '입술을 꽉 다물었다 터뜨림', word: '빵' },
    aspirated: { char: 'ㅍ', name: '피읖 (거센소리)', desc: '입술에서 숨을 세게 뿜음', word: '피아노' }
  },
  {
    title: 'ㅅ 계열 (잇몸마찰음)',
    plain: { char: 'ㅅ', name: '시옷 (예사소리)', desc: '부드러운 마찰음', word: '사자' },
    tense: { char: 'ㅆ', name: '쌍시옷 (된소리)', desc: '혀에 힘을 준 날카로운 마찰음', word: '싸움' },
    aspirated: null
  },
  {
    title: 'ㅈ 계열 (센입천장소리)',
    plain: { char: 'ㅈ', name: '지읒 (예사소리)', desc: '부드러운 파찰음', word: '지도' },
    tense: { char: 'ㅉ', name: '쌍지읒 (된소리)', desc: '입천장을 조여 짱짱하게', word: '찌개' },
    aspirated: { char: 'ㅊ', name: '치읓 (거센소리)', desc: '숨을 강하게 터뜨림', word: '차' }
  }
];
