// src/utils/vocabVisuals.ts
// Intelligent visual association, mnemonic tips, and category styling for Korean vocabulary

export interface VocabVisual {
  category: string;
  emoji: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
  border: string;
  mnemonicHint: string;
}

const CATEGORY_MAP: Record<string, {
  category: string;
  emoji: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
  border: string;
}> = {
  greeting: {
    category: '인사 · 예절',
    emoji: '🙇',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    gradient: 'from-amber-500/10 via-orange-500/5 to-rose-500/10',
    border: 'border-amber-200'
  },
  food: {
    category: '음식 · 식사',
    emoji: '🍲',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800',
    gradient: 'from-orange-500/10 via-amber-500/5 to-red-500/10',
    border: 'border-orange-200'
  },
  shopping: {
    category: '쇼핑 · 가격',
    emoji: '🛍️',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-green-500/10',
    border: 'border-emerald-200'
  },
  transport: {
    category: '교통 · 이동',
    emoji: '🚇',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    gradient: 'from-blue-500/10 via-cyan-500/5 to-indigo-500/10',
    border: 'border-blue-200'
  },
  place: {
    category: '장소 · 위치',
    emoji: '📍',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-cyan-800',
    gradient: 'from-cyan-500/10 via-sky-500/5 to-blue-500/10',
    border: 'border-cyan-200'
  },
  people: {
    category: '사람 · 가족',
    emoji: '👨‍👩‍👦',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    gradient: 'from-purple-500/10 via-pink-500/5 to-rose-500/10',
    border: 'border-purple-200'
  },
  work: {
    category: '직업 · 학교',
    emoji: '🏢',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    gradient: 'from-indigo-500/10 via-blue-500/5 to-slate-500/10',
    border: 'border-indigo-200'
  },
  action: {
    category: '동작 · 일상',
    emoji: '🏃',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    gradient: 'from-rose-500/10 via-pink-500/5 to-orange-500/10',
    border: 'border-rose-200'
  },
  time: {
    category: '시간 · 날짜',
    emoji: '⏰',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-800',
    gradient: 'from-teal-500/10 via-emerald-500/5 to-cyan-500/10',
    border: 'border-teal-200'
  },
  emotion: {
    category: '감정 · 상태',
    emoji: '✨',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-800',
    gradient: 'from-pink-500/10 via-rose-500/5 to-purple-500/10',
    border: 'border-pink-200'
  },
  general: {
    category: '기본 어휘',
    emoji: '📖',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    gradient: 'from-slate-500/10 via-zinc-500/5 to-stone-500/10',
    border: 'border-slate-200'
  }
};

// Word-specific mnemonic clues
const WORD_HINTS: Record<string, { key: string; hint: string; emoji?: string }> = {
  '안녕하세요': { key: 'greeting', hint: '두 손을 모으고 고개 숙여 정중하게 인사해요', emoji: '🙇' },
  '안녕히 가세요': { key: 'greeting', hint: '떠나는 상대방에게 "평안히 가세요"라고 배웅해요', emoji: '👋' },
  '안녕히 계세요': { key: 'greeting', hint: '남아있는 상대방에게 "평안히 계세요"라고 인사해요', emoji: '🏢' },
  '감사합니다': { key: 'greeting', hint: '마음 깊이 고마운 마음을 전할 때 정중히 써요', emoji: '💖' },
  '고맙습니다': { key: 'greeting', hint: '감사한 마음을 부드럽게 표현하는 순우리말 인사예요', emoji: '🌸' },
  '죄송합니다': { key: 'greeting', hint: '실수를 사과하거나 양해를 구할 때 정중하게 말해요', emoji: '🙏' },
  '미안합니다': { key: 'greeting', hint: '미안한 마음을 진솔하게 전하는 격식 있는 사과예요', emoji: '🥺' },
  '처음 뵙겠습니다': { key: 'greeting', hint: '처음 만난 상대방에게 첫인사를 건넬 때 써요', emoji: '🤝' },
  '반갑습니다': { key: 'greeting', hint: '만나서 반갑고 기쁜 마음을 활짝 표현해요', emoji: '😊' },
  '한국': { key: 'place', hint: '한반도와 사계절의 아름다움을 품은 대한민국 🇰🇷', emoji: '🇰🇷' },
  '한국어': { key: 'work', hint: '세종대왕이 창제한 과학적인 문자 한글과 한국의 언어 💬', emoji: '🇰🇷' },
  '선생님': { key: 'work', hint: '지식과 지혜를 가르쳐 주시는 존경받는 분 👨‍🏫', emoji: '👨‍🏫' },
  '학생': { key: 'work', hint: '꿈을 향해 열심히 배우고 탐구하는 학생 🎒', emoji: '🧑‍🎓' },
  '회사원': { key: 'work', hint: '회사에서 맡은 업무를 프로답게 해내는 직장인 💼', emoji: '💼' },
  '의사': { key: 'work', hint: '아픈 사람을 정성껏 치료해 주는 흰 가운의 의사 🩺', emoji: '🩺' },
  '간호사': { key: 'work', hint: '환자를 따뜻하게 돌보고 치료를 돕는 간호사 💉', emoji: '👩‍⚕️' },
  '경찰관': { key: 'work', hint: '시민의 안전과 질서를 지키는 든든한 경찰관 👮', emoji: '👮' },
  '친구': { key: 'people', hint: '마음을 터놓고 기쁨과 슬픔을 함께 나누는 벗 🧑‍🤝‍🧑', emoji: '🧑‍🤝‍🧑' },
  '가족': { key: 'people', hint: '언제나 든든한 내 편이 되어주는 소중한 가족 👨‍👩‍👧‍👦', emoji: '👨‍👩‍👧‍👦' },
  '아버지': { key: 'people', hint: '나를 든든하게 지켜주시는 자랑스러운 아버지 👨', emoji: '👨' },
  '어머니': { key: 'people', hint: '따뜻한 사랑으로 품어주시는 다정한 어머니 👩', emoji: '👩' },
  '물': { key: 'food', hint: '갈증을 시원하게 풀어주는 맑고 깨끗한 생수 💧', emoji: '💧' },
  '밥': { key: 'food', hint: '한국인의 힘의 원천! 따끈따끈 갓 지은 쌀밥 🍚', emoji: '🍚' },
  '김치': { key: 'food', hint: '유산균 풍부한 한국의 대표적인 발효 반찬 🥬', emoji: '🥬' },
  '불고기': { key: 'food', hint: '달콤 짭조름한 양념에 맛있게 볶아낸 한국 전통 고기 요리 🥩', emoji: '🥩' },
  '비빔밥': { key: 'food', hint: '신선한 나물과 고추장을 쓱쓱 비벼 먹는 다채로운 맛 🍲', emoji: '🍲' },
  '떡볶이': { key: 'food', hint: '매콤달콤 쫄깃쫄깃 한국 길거리 음식의 최고봉 🍢', emoji: '🌶️' },
  '사과': { key: 'food', hint: '아삭아삭 달콤하고 상큼한 빨간 사과 🍎', emoji: '🍎' },
  '커피': { key: 'food', hint: '하루를 활기차게 열어주는 은은한 향의 커피 ☕', emoji: '☕' },
  '식당': { key: 'place', hint: '맛있는 식사를 주문해서 먹을 수 있는 음식점 🍽️', emoji: '🍽️' },
  '카페': { key: 'place', hint: '달콤한 디저트와 향긋한 음료를 마시며 쉬어가는 곳 ☕', emoji: '☕' },
  '병원': { key: 'place', hint: '건강을 회복하고 진료를 받는 의료 기관 🏥', emoji: '🏥' },
  '약국': { key: 'place', hint: '처방전 약과 상비약을 구입할 수 있는 곳 💊', emoji: '💊' },
  '지하철': { key: 'transport', hint: '서울 시내를 빠르고 편리하게 이어주는 메트로 🚇', emoji: '🚇' },
  '버스': { key: 'transport', hint: '동네 구석구석을 연결해 주는 친근한 시내버스 🚌', emoji: '🚌' },
  '택시': { key: 'transport', hint: '목적지까지 편안하고 신속하게 이동하는 택시 🚕', emoji: '🚕' },
  '비행기': { key: 'transport', hint: '하늘을 날아 세계 곳곳으로 여행을 떠나는 비행기 ✈️', emoji: '✈️' },
  '얼마예요': { key: 'shopping', hint: '물건의 가격을 물어볼 때 가장 자주 쓰는 핵심 표현 🏷️', emoji: '🏷️' },
  '주세요': { key: 'shopping', hint: '식당 주문이나 물건을 구매할 때 공손하게 요청해요 🤲', emoji: '🤲' },
  '가다': { key: 'action', hint: '발걸음을 옮겨 다른 장소로 이동해요 🚶', emoji: '🚶' },
  '오다': { key: 'action', hint: '다른 곳에서 이쪽으로 다가와요 🏃', emoji: '🏃' },
  '먹다': { key: 'action', hint: '음식을 씹어서 맛있게 섭취해요 🍴', emoji: '🍴' },
  '마시다': { key: 'action', hint: '물, 주스, 차 같은 음료를 꿀꺽 마셔요 🥤', emoji: '🥤' },
  '자다': { key: 'action', hint: '포근한 침대에서 편안하게 꿈나라로 가요 😴', emoji: '😴' },
  '일어나다': { key: 'action', hint: '아침 햇살과 함께 상쾌하게 잠자리에서 일어나요 ⏰', emoji: '🌅' },
  '공부하다': { key: 'action', hint: '새로운 지식과 한국어를 집중해서 학습해요 📚', emoji: '📚' },
  '일하다': { key: 'action', hint: '맡은 바 직무와 업무를 성실하게 수행해요 💻', emoji: '💻' },
  '운동하다': { key: 'action', hint: '몸을 건강하고 활기차게 단련해요 🏋️', emoji: '🏋️' },
  '만나다': { key: 'action', hint: '약속한 장소에서 반가운 사람과 마주해요 🤝', emoji: '🤝' },
  '보다': { key: 'action', hint: '눈으로 대상을 유심히 관찰하거나 영화를 감상해요 👁️', emoji: '👁️' },
  '듣다': { key: 'action', hint: '귀를 기울여 음악이나 한국어 대화를 경청해요 👂', emoji: '🎧' },
  '말하다': { key: 'action', hint: '생각과 감정을 또박또박 목소리로 전달해요 🗣️', emoji: '🗣️' },
  '읽다': { key: 'action', hint: '책이나 글자의 의미를 마음속으로 새겨요 📖', emoji: '📖' },
  '쓰다': { key: 'action', hint: '펜으로 글씨를 적거나 모자를 착용해요 ✍️', emoji: '✍️' },
  '사다': { key: 'shopping', hint: '돈을 지불하고 필요한 물건을 구매해요 💳', emoji: '💳' },
  '좋다': { key: 'emotion', hint: '기분이 아주 상쾌하고 마음에 쏙 들어요 👍', emoji: '👍' },
  '나쁘다': { key: 'emotion', hint: '상태가 좋지 않거나 불만족스러워요 👎', emoji: '👎' },
  '크다': { key: 'emotion', hint: '부피나 키가 큼직하고 웅장해요 🐘', emoji: '🐘' },
  '작다': { key: 'emotion', hint: '아담하고 앙증맞은 크기예요 🐥', emoji: '🐥' },
  '많다': { key: 'emotion', hint: '수량이나 개수가 넉넉하게 가득해요 📦', emoji: '📦' },
  '적다': { key: 'emotion', hint: '양이 적거나 글씨를 기록해요 🤏', emoji: '🤏' },
  '맛있다': { key: 'food', hint: '입안 가득 행복이 퍼지는 최고의 맛! 😋', emoji: '😋' },
  '재미있다': { key: 'emotion', hint: '시간 가는 줄 모를 만큼 즐겁고 신나요 🥳', emoji: '🥳' },
  '예쁘다': { key: 'emotion', hint: '눈이 부실 만큼 아름답고 고와요 💐', emoji: '💐' },
  '덥다': { key: 'time', hint: '햇볕이 쨍쨍 내리쬐어 땀이 송골송골 나요 ☀️', emoji: '☀️' },
  '춥다': { key: 'time', hint: '찬 바람이 쌩쌩 불어 몸이 으슬으슬 떨려요 ❄️', emoji: '❄️' },
  '어제': { key: 'time', hint: '오늘보다 하루 앞선 지나간 날 📅', emoji: '⏮️' },
  '오늘': { key: 'time', hint: '지금 우리가 살아가고 있는 소중한 하루 🌟', emoji: '⭐' },
  '내일': { key: 'time', hint: '오늘이 지나고 새롭게 맞이할 다음 날 🚀', emoji: '⏭️' },
  '지금': { key: 'time', hint: '과거도 미래도 아닌 바로 이 순간 ⏱️', emoji: '⏱️' },
  '언제': { key: 'time', hint: '시간이나 시기를 물어보는 의문 표현 🗓️', emoji: '🗓️' },
  '어디': { key: 'place', hint: '장소나 위치를 궁금해할 때 묻는 표현 🗺️', emoji: '🗺️' },
  '누구': { key: 'people', hint: '상대방의 신원이나 정체를 묻는 표현 👤', emoji: '👤' },
  '무엇': { key: 'general', hint: '사물이나 대상의 정체를 물어볼 때 ❓', emoji: '❓' },
  '왜': { key: 'general', hint: '이유와 원인을 깊이 있게 탐구할 때 💡', emoji: '💡' },
  '어떻게': { key: 'general', hint: '방법과 과정을 차근차근 물어볼 때 🛠️', emoji: '🛠️' }
};

export function getVocabVisual(word: string, partOfSpeech: string): VocabVisual {
  const cleanWord = word.trim();

  // 1. Direct match
  if (WORD_HINTS[cleanWord]) {
    const item = WORD_HINTS[cleanWord];
    const cat = CATEGORY_MAP[item.key] || CATEGORY_MAP.general;
    return {
      category: cat.category,
      emoji: item.emoji || cat.emoji,
      badgeBg: cat.badgeBg,
      badgeText: cat.badgeText,
      gradient: cat.gradient,
      border: cat.border,
      mnemonicHint: item.hint
    };
  }

  // 2. Keyword heuristic mapping
  let matchedKey = 'general';
  let defaultHint = '문맥 속에서 예문과 함께 자연스럽게 익혀보세요';

  if (partOfSpeech === '감탄사' || /안녕|감사|고맙|죄송|미안|실례|부탁/.test(cleanWord)) {
    matchedKey = 'greeting';
    defaultHint = '한국인의 따뜻한 마음과 예절이 담긴 인사말이에요';
  } else if (/식|밥|국|찌개|고기|김치|과일|물|커피|음료|먹|마시|맛|차|떡|빵|면/.test(cleanWord)) {
    matchedKey = 'food';
    defaultHint = '한국의 풍성한 음식 문화와 식사 예절과 관련된 단어예요';
  } else if (/원|값|가격|얼마|사다|팔다|가게|시장|마트|쇼핑|돈|카드|영수증/.test(cleanWord)) {
    matchedKey = 'shopping';
    defaultHint = '물건을 고르고 계산할 때 자주 활용하는 표현이에요';
  } else if (/차|버스|지하철|택시|비행기|기차|역|타다|내리다|길|도로|환승/.test(cleanWord)) {
    matchedKey = 'transport';
    defaultHint = '목적지까지 빠르고 안전하게 이동할 때 꼭 필요한 단어예요';
  } else if (/곳|장소|어디|여기|저기|방|집|학교|공항|병원|약국|도서관|식당|카페|공원/.test(cleanWord)) {
    matchedKey = 'place';
    defaultHint = '주변 위치와 장소를 파악하고 설명할 때 쓰이는 어휘예요';
  } else if (/씨|님|사람|친구|가족|선생|학생|아버지|어머니|형|누나|오빠|언니|동생|남편|아내/.test(cleanWord)) {
    matchedKey = 'people';
    defaultHint = '다정한 인간관계와 소중한 인연을 나타내는 표현이에요';
  } else if (/일|회사|직업|공부|학교|교실|수업|시험|대학|선생|사무실|병원/.test(cleanWord)) {
    matchedKey = 'work';
    defaultHint = '학업이나 직장에서 전문적인 역할을 나타낼 때 써요';
  } else if (/시간|날|달|해|년|시|분|초|어제|오늘|내일|지금|언제|아침|점심|저녁|주말/.test(cleanWord)) {
    matchedKey = 'time';
    defaultHint = '일정과 시간을 약속하고 계획을 세울 때 필수적인 어휘예요';
  } else if (partOfSpeech === '동사' || /하다|가다|오다|보다|듣다|쓰다|읽다|만나다|살다|걷다|달리다/.test(cleanWord)) {
    matchedKey = 'action';
    defaultHint = '일상에서 일어나는 다양한 움직임과 행동을 나타내요';
  } else if (partOfSpeech === '형용사' || /좋다|크다|작다|예쁘다|기쁘다|슬프다|덥다|춥다|맑다/.test(cleanWord)) {
    matchedKey = 'emotion';
    defaultHint = '사물의 모습과 사람의 기분 상태를 생생하게 묘사해요';
  }

  const cat = CATEGORY_MAP[matchedKey] || CATEGORY_MAP.general;

  return {
    category: cat.category,
    emoji: cat.emoji,
    badgeBg: cat.badgeBg,
    badgeText: cat.badgeText,
    gradient: cat.gradient,
    border: cat.border,
    mnemonicHint: defaultHint
  };
}
