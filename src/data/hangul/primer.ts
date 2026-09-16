import { GrammarPrimerConcept, WordOrderComparison, ClassroomExpression } from './types';

// 1. 한국어 기초 품사 (Parts of Speech)
export const PARTS_OF_SPEECH: GrammarPrimerConcept[] = [
  {
    id: 'noun',
    title: '명사 (Noun, 名詞)',
    category: 'pos',
    summary: '사람, 사물, 장소의 이름을 나타내는 단어',
    explanation: '한국어 문장에서 주어, 목적어, 보어 등으로 쓰이며, 뒤에 조사가 붙어 문법적 역할을 나타냅니다.',
    examples: [
      { korean: '학교', translation: 'school', highlight: '장소 명사' },
      { korean: '바나나', translation: 'banana', highlight: '사물 명사' },
      { korean: '베트남', translation: 'Vietnam', highlight: '국가 명사' },
      { korean: '선생님', translation: 'teacher', highlight: '사람 명사' }
    ]
  },
  {
    id: 'verb',
    title: '동사 (Verb, 動詞)',
    category: 'pos',
    summary: '사람이나 사물의 동작이나 작용을 나타내는 단어',
    explanation: '한국어의 기본형은 모두 "-다"로 끝나며, 문장의 끝에서 서술어로 쓰입니다. 대화 상황에 따라 다양한 어미(-어요, -습니다)로 활용됩니다.',
    examples: [
      { korean: '먹다', translation: 'to eat', highlight: '기본형' },
      { korean: '춤추다', translation: 'to dance', highlight: '동작' },
      { korean: '만나다', translation: 'to meet', highlight: '동작' },
      { korean: '가다', translation: 'to go', highlight: '이동' }
    ]
  },
  {
    id: 'adjective',
    title: '형용사 (Adjective, 形容詞)',
    category: 'pos',
    summary: '사람이나 사물의 성질이나 상태를 나타내는 단어',
    explanation: '동사와 마찬가지로 기본형이 "-다"로 끝나며 서술어 자리에 쓰입니다. 영어와 달리 한국어 형용사는 be동사 없이 그 자체로 서술어가 될 수 있습니다.',
    examples: [
      { korean: '뚱뚱하다', translation: 'to be chubby / fat', highlight: '상태' },
      { korean: '춥다', translation: 'to be cold (weather)', highlight: '감각/날씨' },
      { korean: '길다', translation: 'to be long', highlight: '길이/성질' },
      { korean: '예쁘다', translation: 'to be pretty', highlight: '외모' }
    ]
  }
];

// 2. 3개 국어 문장 구조 비교 (SOV vs SVO Word Order)
export const WORD_ORDER_COMPARISONS: { title: string; sentences: WordOrderComparison[] }[] = [
  {
    title: '예문 1: "나는 빵을 먹는다" (목적어가 있는 문장)',
    sentences: [
      {
        language: 'korean',
        langName: '한국어 (Korean)',
        flag: '🇰🇷',
        pattern: 'SOV (주어 + 목적어 + 서술어)',
        elements: [
          { role: 'S', text: '나는', label: '주어 (Subject)' },
          { role: 'O', text: '빵을', label: '목적어 (Object)' },
          { role: 'V', text: '먹는다', label: '동사 (Verb)' }
        ],
        fullSentence: '나는 빵을 먹는다.'
      },
      {
        language: 'english',
        langName: '영어 (English)',
        flag: '🇺🇸',
        pattern: 'SVO (주어 + 동사 + 목적어)',
        elements: [
          { role: 'S', text: 'I', label: 'Subject' },
          { role: 'V', text: 'eat', label: 'Verb' },
          { role: 'O', text: 'bread', label: 'Object' }
        ],
        fullSentence: 'I eat bread.'
      },
      {
        language: 'vietnamese',
        langName: '베트남어 (Vietnamese)',
        flag: '🇻🇳',
        pattern: 'SVO (주어 + 동사 + 목적어)',
        elements: [
          { role: 'S', text: 'Tôi', label: 'Chủ ngữ' },
          { role: 'V', text: 'ăn', label: 'Động từ' },
          { role: 'O', text: 'bánh mì', label: 'Tân ngữ' }
        ],
        fullSentence: 'Tôi ăn bánh mì.'
      }
    ]
  },
  {
    title: '예문 2: "그녀는 예쁘다" (형용사 서술어 문장)',
    sentences: [
      {
        language: 'korean',
        langName: '한국어 (Korean)',
        flag: '🇰🇷',
        pattern: 'SV (주어 + 형용사 서술어)',
        elements: [
          { role: 'S', text: '그녀는', label: '주어 (Subject)' },
          { role: 'V', text: '예쁘다', label: '형용사 (Adjective)' }
        ],
        fullSentence: '그녀는 예쁘다.'
      },
      {
        language: 'english',
        langName: '영어 (English)',
        flag: '🇺🇸',
        pattern: 'SVC (주어 + be동사 + 보어)',
        elements: [
          { role: 'S', text: 'She', label: 'Subject' },
          { role: 'V', text: 'is', label: 'Verb (be)' },
          { role: 'O', text: 'pretty', label: 'Complement' }
        ],
        fullSentence: 'She is pretty.'
      },
      {
        language: 'vietnamese',
        langName: '베트남어 (Vietnamese)',
        flag: '🇻🇳',
        pattern: 'SV (주어 + 형용사)',
        elements: [
          { role: 'S', text: 'Cô ấy', label: 'Chủ ngữ' },
          { role: 'V', text: 'đẹp', label: 'Tính từ' }
        ],
        fullSentence: 'Cô ấy đẹp.'
      }
    ]
  }
];

// 3. 한국어 조사의 개념과 핵심 조사 (Particles)
export const KOREAN_PARTICLES_GUIDE: GrammarPrimerConcept[] = [
  {
    id: 'topic_subject',
    title: '은 / 는 (주제·대조의 조사)',
    category: 'particles',
    summary: '문장의 화제(주제)를 제시하거나 다른 것과 대조할 때 씁니다.',
    explanation: "받침이 있는 명사 뒤에는 '은', 받침이 없는 명사 뒤에는 '는'이 붙습니다.",
    examples: [
      { korean: '민호는 학생이에요.', translation: 'As for Minho, he is a student.', highlight: '받침X + 는' },
      { korean: '선생님은 한국인이에요.', translation: 'As for the teacher, she is Korean.', highlight: '받침O + 은' }
    ]
  },
  {
    id: 'subject',
    title: '이 / 가 (주어 표시 조사)',
    category: 'particles',
    summary: '문장에서 동작이나 상태의 주체를 직접 지정할 때 씁니다.',
    explanation: "받침이 있는 명사 뒤에는 '이', 받침이 없는 명사 뒤에는 '가'가 붙습니다.",
    examples: [
      { korean: '비가 옵니다.', translation: 'Rain is falling.', highlight: '받침X + 가' },
      { korean: '시간이 없어요.', translation: 'There is no time.', highlight: '받침O + 이' }
    ]
  },
  {
    id: 'object',
    title: '을 / 를 (목적어 표시 조사)',
    category: 'particles',
    summary: '동사의 행위가 미치는 대상(목적어) 뒤에 붙습니다.',
    explanation: "받침이 있는 명사 뒤에는 '을', 받침이 없는 명사 뒤에는 '를'이 붙습니다.",
    examples: [
      { korean: '빵을 먹는다.', translation: 'I eat bread.', highlight: '받침O + 을' },
      { korean: '사과를 좋아해요.', translation: 'I like apples.', highlight: '받침X + 를' }
    ]
  },
  {
    id: 'location_time',
    title: '에 (장소/시간 조사)',
    category: 'particles',
    summary: '도착 장소나 어떤 일이 일어나는 특정 시간을 나타냅니다.',
    explanation: "사람이나 사물이 '있는 곳' 또는 이동의 '목적지' 뒤에 붙습니다.",
    examples: [
      { korean: '민호는 학교에 간다.', translation: 'Minho goes to school.', highlight: '도착 장소' },
      { korean: '아침 9시에 만나요.', translation: 'Let us meet at 9 AM.', highlight: '시간' }
    ]
  },
  {
    id: 'range',
    title: '에서 ~ 까지 (출발점 ~ 도착점 조사)',
    category: 'particles',
    summary: '공간의 출발점과 도착점, 또는 시간의 시작과 끝을 나타냅니다.',
    explanation: "'에서'는 출발지/시작을, '까지'는 도착지/한계를 나타냅니다.",
    examples: [
      { korean: '집에서 학교까지 5시간이 걸린다.', translation: 'It takes 5 hours from home to school.', highlight: '공간 범위' },
      { korean: '월요일에서 금요일까지 일해요.', translation: 'I work from Monday to Friday.', highlight: '시간 범위' }
    ]
  }
];

// 4. 필수 교실 한국어 15선 (15 Essential Classroom Expressions)
export const CLASSROOM_EXPRESSIONS: ClassroomExpression[] = [
  {
    id: 1,
    korean: '책을 펴세요.',
    romanization: 'Chaegeul pyeoseyo.',
    translation: 'Please open your book.',
    situation: '수업 시작 시 책을 펼 때',
    audioText: '책을 펴세요.'
  },
  {
    id: 2,
    korean: '책을 덮으세요.',
    romanization: 'Chaegeul deopeuseyo.',
    translation: 'Please close your book.',
    situation: '수업 종료나 시험 시작 시',
    audioText: '책을 덮으세요.'
  },
  {
    id: 3,
    korean: '잘 들으세요.',
    romanization: 'Jal deureuseyo.',
    translation: 'Please listen carefully.',
    situation: '선생님의 발음이나 듣기 음원을 들을 때',
    audioText: '잘 들으세요.'
  },
  {
    id: 4,
    korean: '따라 하세요.',
    romanization: 'Ttara haseyo.',
    translation: 'Please repeat after me.',
    situation: '선생님의 발음을 따라 읽을 때',
    audioText: '따라 하세요.'
  },
  {
    id: 5,
    korean: '읽어 보세요.',
    romanization: 'Ilgeo boseyo.',
    translation: 'Please try reading it.',
    situation: '본문이나 문장을 소리 내어 읽을 때',
    audioText: '읽어 보세요.'
  },
  {
    id: 6,
    korean: '써 보세요.',
    romanization: 'Sseo boseyo.',
    translation: 'Please try writing it.',
    situation: '공책이나 워크북에 글자를 적을 때',
    audioText: '써 보세요.'
  },
  {
    id: 7,
    korean: '이야기해 보세요.',
    romanization: 'Iyagihae boseyo.',
    translation: 'Please talk / discuss.',
    situation: '짝꿍과 회화 연습을 할 때',
    audioText: '이야기해 보세요.'
  },
  {
    id: 8,
    korean: '질문 있어요?',
    romanization: 'Jilmun isseoyo?',
    translation: 'Do you have any questions?',
    situation: '이해되지 않는 점을 물어볼 때',
    audioText: '질문 있어요?'
  },
  {
    id: 9,
    korean: '네, 질문이 있습니다.',
    romanization: 'Ne, jilmuni itseumnida.',
    translation: 'Yes, I have a question.',
    situation: '질문이 있을 때 학생의 답변',
    audioText: '네 질문이 있습니다.'
  },
  {
    id: 10,
    korean: '아니요, 질문 없어요.',
    romanization: 'Aniyo, jilmun eopseoyo.',
    translation: 'No, I have no questions.',
    situation: '모두 이해했을 때 학생의 답변',
    audioText: '아니요 질문 없어요.'
  },
  {
    id: 11,
    korean: '이해했어요?',
    romanization: 'Ihaehaesseoyo?',
    translation: 'Did you understand?',
    situation: '선생님이 이해 여부를 확인할 때',
    audioText: '이해했어요?'
  },
  {
    id: 12,
    korean: '네, 이해했습니다.',
    romanization: 'Ne, ihaehaetseumnida.',
    translation: 'Yes, I understood.',
    situation: '내용을 잘 이해했을 때',
    audioText: '네 이해했습니다.'
  },
  {
    id: 13,
    korean: '다시 한번 말씀해 주세요.',
    romanization: 'Dasi hanbeon malsseumhae juseyo.',
    translation: 'Please say it one more time.',
    situation: '선생님의 말씀을 잘 못 들었을 때',
    audioText: '다시 한번 말씀해 주세요.'
  },
  {
    id: 14,
    korean: '천천히 말씀해 주세요.',
    romanization: 'Cheoncheonhi malsseumhae juseyo.',
    translation: 'Please speak slowly.',
    situation: '말이 너무 빨라 알아듣기 힘들 때',
    audioText: '천천히 말씀해 주세요.'
  },
  {
    id: 15,
    korean: '한국어로 어떻게 말해요?',
    romanization: 'Hangugeoro eotteoke malhaeyo?',
    translation: 'How do you say this in Korean?',
    situation: '외국어 단어의 한국어 표현을 물을 때',
    audioText: '한국어로 어떻게 말해요?'
  }
];
