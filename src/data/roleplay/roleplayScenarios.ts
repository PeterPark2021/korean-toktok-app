import { RoleplayScenario } from '../../types';

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'rp-restaurant-refill',
    title: '식당에서 반찬 & 앞접시 추가 요청하기',
    category: 'restaurant',
    categoryName: '식당 / 맛집',
    level: '초급',
    situation: '식당에서 친구와 찌개를 먹고 있는데 김치와 물이 부족하고 앞접시가 필요합니다.',
    aiPersona: {
      name: '이모님',
      role: '식당 직원',
      avatarId: 'clerk',
      avatarEmoji: '🍲',
      tone: '정감 있고 친절하며 활기찬 어조 (~드릴게요, 맛있게 드세요)'
    },
    userRole: '김민호 (손님)',
    initialMessage: '어서오세요 민호 씨! 맛있게 드시고 계신가요? 필요한 거 있으시면 편하게 말씀해 주세요~',
    initialTranslation: 'Welcome, Minho! Are you enjoying your meal? Please let me know if you need anything~',
    missions: [
      {
        id: 'm-kimchi',
        text: '김치(반찬) 조금 더 달라고 요청하기',
        description: "'김치 좀 더 주세요' 또는 '반찬 리필 부탁드려요' 표현 사용",
        completed: false
      },
      {
        id: 'm-plate',
        text: '앞접시 또는 물 가져다 달라고 부탁하기',
        description: "'앞접시 하나만 더 주실 수 있나요?' 또는 '물 좀 주세요' 표현 사용",
        completed: false
      },
      {
        id: 'm-thanks',
        text: '가져다주신 음식/반찬에 감사 인사하기',
        description: "'감사합니다' 또는 '잘 먹겠습니다' 인사",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '저기요, 여기 김치 조금만 더 주실 수 있나요?', meaning: 'Excuse me, could we get a little more kimchi here?' },
      { korean: '앞접시 두 개만 부탁드릴게요.', meaning: 'Could I please get two extra small plates?' },
      { korean: '물 한 병만 더 가져다주세요.', meaning: 'Please bring us one more bottle of water.' },
      { korean: '정말 맛있어요! 감사합니다.', meaning: 'It is so delicious! Thank you.' }
    ],
    culturalNote: "한국 식당에서는 직원을 부를 때 벨을 누르거나 '저기요~', '사장님~', '이모님~' 하고 부르는 것이 정중하고 자연스럽습니다.",
    bgGradient: 'from-orange-500/10 via-amber-500/10 to-rose-500/10'
  },
  {
    id: 'rp-hospital-cold',
    title: '병원에서 감기 증상 설명하기',
    category: 'hospital',
    categoryName: '병원 / 약국',
    level: '초급',
    situation: '어제부터 목이 따갑고 열이 나며 기침이 나서 내과 의사 선생님과 진료를 봅니다.',
    aiPersona: {
      name: '김 원장',
      role: '내과 의사',
      avatarId: 'teacher',
      avatarEmoji: '🩺',
      tone: '자상하고 차분하며 전문적인 어조 (~어떠신가요, 푹 쉬셔야 합니다)'
    },
    userRole: '리홍 (환자)',
    initialMessage: '안녕하세요, 리홍 씨. 어디가 불편해서 오셨나요? 언제부터 증상이 시작되었는지 말씀해 주세요.',
    initialTranslation: 'Hello, Li Hong. What brings you in today? Please tell me when your symptoms started.',
    missions: [
      {
        id: 'm-symptoms',
        text: '목 통증, 열, 기침 등 구체적인 증상 설명하기',
        description: "'목이 아파요', '열이 나요', '기침을 해요' 등 증상 표현",
        completed: false
      },
      {
        id: 'm-duration',
        text: '증상이 시작된 시기(어제, 며칠 전) 말하기',
        description: "'어제부터', '이틀 전부터' 등 시점 표현",
        completed: false
      },
      {
        id: 'm-medicine',
        text: '약 복용법이나 주의사항 질문하기',
        description: "'하루에 몇 번 먹나요?' 또는 '식후에 먹나요?' 질문",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '어제부터 목이 많이 따갑고 열이 나요.', meaning: 'Since yesterday, my throat has been very sore and I have a fever.' },
      { korean: '밤에 기침이 심해서 잠을 잘 못 잤어요.', meaning: 'I had severe coughing at night and could not sleep well.' },
      { korean: '약은 밥 먹고 바로 먹어야 하나요?', meaning: 'Should I take the medicine right after meals?' },
      { korean: '주사도 맞아야 하나요?', meaning: 'Do I need to get an injection too?' }
    ],
    culturalNote: "한국 병원에서는 증상뿐만 아니라 기존에 먹고 있는 약이나 알레르기가 있다면 의사에게 미리 말씀하시는 것이 좋습니다.",
    bgGradient: 'from-blue-500/10 via-cyan-500/10 to-emerald-500/10'
  },
  {
    id: 'rp-cafe-custom',
    title: '카페에서 맞춤 음료 주문하기',
    category: 'cafe',
    categoryName: '카페 / 베이커리',
    level: '초급',
    situation: '카페에서 아이스 아메리카노 디카페인에 샷을 연하게 하고 텀블러 할인을 요청합니다.',
    aiPersona: {
      name: '민지',
      role: '바리스타',
      avatarId: 'suyeon',
      avatarEmoji: '☕',
      tone: '밝고 상냥하며 빠른 톤 (~주문 도와드릴게요, 영수증 필요하세요?)'
    },
    userRole: '도안닝 (손님)',
    initialMessage: '안녕하세요, 도안닝 씨! 톡톡 커피입니다. 오늘 어떤 음료로 주문 도와드릴까요?',
    initialTranslation: 'Hello, Doan! Welcome to TokTok Coffee. What beverage can I get started for you today?',
    missions: [
      {
        id: 'm-order',
        text: '원하는 음료 종류와 온도(아이스/따뜻한 것) 말하기',
        description: "'아이스 아메리카노 한 잔 주세요' 등 기본 주문",
        completed: false
      },
      {
        id: 'm-option',
        text: '옵션(디카페인 변경, 시럽 빼기, 샷 연하게 등) 요청하기',
        description: "'디카페인으로 바꿔주세요' 또는 '샷 연하게 해주세요' 요청",
        completed: false
      },
      {
        id: 'm-takeout',
        text: '매장 이용 여부(테이크아웃 / 마시고 가기) 말하기',
        description: "'가져갈게요' 또는 '먹고 갈게요' 표현",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '아이스 아메리카노 디카페인으로 한 잔 부탁드려요.', meaning: 'One iced decaf Americano, please.' },
      { korean: '샷은 조금 연하게 해주실 수 있나요?', meaning: 'Could you please make the shot a bit weaker?' },
      { korean: '텀블러에 담아주세요. 테이크아웃 할게요.', meaning: 'Please put it in my tumbler. I will take it to go.' },
      { korean: '카드로 결제할게요.', meaning: 'I will pay by credit card.' }
    ],
    culturalNote: "한국 카페에서는 매장 내 일회용 플라스틱 컵 사용이 제한되므로 '마시고 갈게요'와 '테이크아웃(가져갈게요)'을 명확히 구분합니다.",
    bgGradient: 'from-amber-500/10 via-orange-500/10 to-yellow-500/10'
  },
  {
    id: 'rp-realestate-room',
    title: '부동산에서 원룸 구하기',
    category: 'real_estate',
    categoryName: '생활 / 부동산',
    level: '중급',
    situation: '지하철역 근처에 보증금 500만 원, 월세 50만 원 내외의 조용하고 채광 좋은 원룸을 알아봅니다.',
    aiPersona: {
      name: '박 소장',
      role: '공인중개사',
      avatarId: 'manager',
      avatarEmoji: '🏠',
      tone: '신뢰감 있고 친절하며 상세히 안내하는 어조 (~좋은 방 있습니다, 언제 입주하세요?)'
    },
    userRole: '이수연 (자취 준비생)',
    initialMessage: '안녕하세요, 수연 씨! 좋은 방 많이 있습니다. 찾으시는 지역이나 희망하시는 보증금, 월세 조건이 어떻게 되시나요?',
    initialTranslation: 'Hello, Suyeon! We have lots of great rooms. What area and budget are you looking for?',
    missions: [
      {
        id: 'm-budget',
        text: '희망하는 보증금과 월세 예산 말하기',
        description: "'보증금 500에 월세 50 정도 생각하고 있어요' 등 예산 제시",
        completed: false
      },
      {
        id: 'm-condition',
        text: '원하는 방 조건(역세권, 풀옵션, 채광, 관리비 등) 질문하기',
        description: "'역에서 가까운가요?', '관리비는 얼마인가요?' 등 조건 확인",
        completed: false
      },
      {
        id: 'm-visit',
        text: '실제 방을 보러 가고 싶다고 요청하기',
        description: "'지금 바로 방을 보러 갈 수 있나요?' 등 방문 약속",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '역에서 도보 5분 거리 원룸을 찾고 있어요.', meaning: 'I am looking for a studio within 5 minutes walk from the station.' },
      { korean: '보증금 500만 원에 월세 50만 원 이하로 있을까요?', meaning: 'Do you have anything under 5 million won deposit and 500k monthly rent?' },
      { korean: '관리비에는 인터넷이랑 수도세가 포함되어 있나요?', meaning: 'Does the maintenance fee include internet and water bill?' },
      { korean: '풀옵션(세탁기, 냉장고, 에어컨)인가요?', meaning: 'Is it fully furnished with washer, fridge, and AC?' }
    ],
    culturalNote: "한국의 월세는 '보증금/월세' 형태로 부르며(예: 500/50), 관리비에 어떤 공과금이 포함되는지 계약 전 꼭 확인해야 합니다.",
    bgGradient: 'from-emerald-500/10 via-teal-500/10 to-sky-500/10'
  },
  {
    id: 'rp-market-bargain',
    title: '전통시장에서 과일 가격 흥정하기',
    category: 'market',
    categoryName: '쇼핑 / 전통시장',
    level: '초급',
    situation: '전통시장에서 싱싱한 딸기와 사과를 고르며 가격을 물어보고 덤(서비스)을 요청합니다.',
    aiPersona: {
      name: '순이네 과일',
      role: '시장 상인',
      avatarId: 'clerk',
      avatarEmoji: '🍓',
      tone: '우렁차고 인심 좋은 정감 넘치는 시장 억양 (~골라골라, 덤 팍팍 줄게!)'
    },
    userRole: '리홍 (손님)',
    initialMessage: '어서와요 리홍 씨! 오늘 아침에 갓 따온 산청 딸기랑 나주 배가 기가 막히게 달아~ 한번 맛보고 가!',
    initialTranslation: 'Come on in, Li Hong! Freshly picked strawberries and pears arrived this morning and they are super sweet~ try a piece!',
    missions: [
      {
        id: 'm-price',
        text: '과일 가격 물어보기',
        description: "'이 딸기 한 바구니에 얼마예요?' 질문",
        completed: false
      },
      {
        id: 'm-discount',
        text: '조금 깎아달라거나 덤(서비스) 요청하기',
        description: "'조금만 깎아주세요' 또는 '덤 좀 더 주세요' 표현",
        completed: false
      },
      {
        id: 'm-buy',
        text: '구매 결정 및 포장 요청하기',
        description: "'이걸로 주세요', '담아주세요' 표현",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '사장님, 이 딸기 한 바구니에 얼마예요?', meaning: 'Boss, how much is this basket of strawberries?' },
      { korean: '사과 세 개랑 같이 살 테니 조금만 깎아주세요~', meaning: 'I will buy 3 apples too, so please give me a small discount~' },
      { korean: '사장님 인심 좋으시니까 덤 하나만 더 얹어주세요!', meaning: 'Boss, you are so generous, please add one more as a bonus!' },
      { korean: '계좌이체로 보내드려도 될까요?', meaning: 'Can I send the payment via bank transfer?' }
    ],
    culturalNote: "한국의 전통시장에서는 '깎아주세요', '덤 주세요'라고 웃으며 애교 있게 말하면 과일이나 채소를 하나 더 얹어주는 정(情) 문화가 있습니다.",
    bgGradient: 'from-rose-500/10 via-pink-500/10 to-orange-500/10'
  },
  {
    id: 'rp-office-vacation',
    title: '직장에서 팀장님께 연차 신청하기',
    category: 'office',
    categoryName: '직장 / 비즈니스',
    level: '고급',
    situation: '다음 주 금요일에 개인적인 사정으로 연차(휴가)를 사용하고자 팀장님께 정중하게 보고합니다.',
    aiPersona: {
      name: '정 팀장',
      role: '부서 팀장',
      avatarId: 'manager',
      avatarEmoji: '💼',
      tone: '격식 있고 배려심 있는 직장 상사 어조 (~사유가 어떻게 되나요, 업무 공유 부탁해요)'
    },
    userRole: '김민호 (팀원 / 사원)',
    initialMessage: '네, 민호 씨. 지금 잠깐 이야기 나눌 수 있어요. 무슨 일 있으신가요?',
    initialTranslation: 'Yes, Minho. I have a moment to talk. What is on your mind?',
    missions: [
      {
        id: 'm-request',
        text: '휴가 일정(다음 주 금요일)과 사유 정중히 말씀드리기',
        description: "'다음 주 금요일에 연차를 사용하고자 합니다' 등 격식 있는 표현",
        completed: false
      },
      {
        id: 'm-handoff',
        text: '업무 인수인계 및 긴급 연락 대책 언급하기',
        description: "'진행 중인 업무는 미리 마무리해 두겠습니다' 등 책임감 있는 표현",
        completed: false
      },
      {
        id: 'm-closing',
        text: '팀장님의 승인에 감사 인사하기',
        description: "'배려해 주셔서 감사합니다' 인사",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '팀장님, 다음 주 금요일에 개인 사정으로 연차를 사용해도 괜찮을까요?', meaning: 'Manager, would it be okay if I take annual leave next Friday for personal matters?' },
      { korean: '진행 중인 프로젝트는 목요일까지 차질 없이 마무리해 놓겠습니다.', meaning: 'I will finish the ongoing project by Thursday without any disruption.' },
      { korean: '급한 연락이 있으시면 언제든지 모바일로 연락 주셔도 됩니다.', meaning: 'Please feel free to reach me by mobile if anything urgent comes up.' },
      { korean: '일정 배려해 주셔서 진심으로 감사드립니다.', meaning: 'Thank you very much for accommodating my schedule.' }
    ],
    culturalNote: "한국 직장에서는 연차 사용 시 최소 3~5일 전 미리 상사에게 구두로 말씀드린 후 결재 시스템에 상신하는 것이 에티켓입니다.",
    bgGradient: 'from-slate-500/10 via-indigo-500/10 to-blue-500/10'
  },
  {
    id: 'rp-taxi-direction',
    title: '택시 타고 길 안내 & 영수증 요청하기',
    category: 'transport',
    categoryName: '교통 / 이동',
    level: '초급',
    situation: '서울역으로 가는 택시를 타고 기사님께 빠른 길로 가달라고 부탁한 후 영수증을 받습니다.',
    aiPersona: {
      name: '기사님',
      role: '개인택시 기사',
      avatarId: 'minho',
      avatarEmoji: '🚕',
      tone: '구수하고 친근한 어조 (~손님 어디로 모실까요, 안전하게 모시겠습니다)'
    },
    userRole: '도안닝 (승객)',
    initialMessage: '어서 타세요 도안닝 손님! 날씨가 참 덥죠? 어디로 모셔다 드릴까요?',
    initialTranslation: "Hop in, Doan! Quite hot today, isn't it? Where can I take you today?",
    missions: [
      {
        id: 'm-dest',
        text: '목적지(서울역 또는 시청) 명확히 말하기',
        description: "'서울역 1번 출구로 가주세요' 표현",
        completed: false
      },
      {
        id: 'm-urgent',
        text: '기차 시간이 얼마 안 남아 조금 서둘러 달라고 부탁하기',
        description: "'기차 시간이 촉박해서 조금만 빨리 가주실 수 있나요?' 표현",
        completed: false
      },
      {
        id: 'm-receipt',
        text: '카드 결제 후 영수증 요청하기',
        description: "'카드로 계산하고 영수증도 한 장 주세요' 표현",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '서울역 KTX 타는 곳으로 가주세요.', meaning: 'Please take me to the Seoul Station KTX departure area.' },
      { korean: '기차 시간이 30분밖에 안 남아서 조금만 서둘러 주실 수 있나요?', meaning: 'I have only 30 minutes left before my train, could we hurry a little?' },
      { korean: '여기 신호등 앞에서 내려주시면 됩니다.', meaning: 'You can drop me off here in front of the traffic light.' },
      { korean: '카드로 결제할게요. 영수증도 한 장 출력해 주세요.', meaning: 'I will pay by card. Please print a receipt as well.' }
    ],
    culturalNote: "한국 택시에서는 뒷좌석 안전벨트 착용이 의무화되어 있으며, 카드 결제 시 기사님께 영수증을 요청하면 즉시 출력해 줍니다.",
    bgGradient: 'from-yellow-500/10 via-amber-500/10 to-orange-500/10'
  },
  {
    id: 'rp-public-certificate',
    title: '주민센터에서 서류 발급 신청하기',
    category: 'public',
    categoryName: '공공기관 / 행정',
    level: '중급',
    situation: '주민센터(행정복지센터) 민원 창구에서 외국인등록 사실증명서 2부를 발급 신청합니다.',
    aiPersona: {
      name: '이 주무관',
      role: '주민센터 민원 담당 공무원',
      avatarId: 'teacher',
      avatarEmoji: '🏛️',
      tone: '단정하고 정중하며 공손한 어조 (~신분증 보여주시겠어요, 서명 부탁드립니다)'
    },
    userRole: '이수연 (민원인)',
    initialMessage: '띵동~ 23번 손님, 이쪽 3번 창구로 오세요. 수연 님, 어떤 서류 발급 도와드릴까요?',
    initialTranslation: 'Ding-dong~ Customer 23, please come to counter 3. Suyeon, what documents do you need today?',
    missions: [
      {
        id: 'm-doc',
        text: '필요한 서류명(외국인등록 사실증명서 또는 등본)과 부수(2부) 말하기',
        description: "'외국인등록 사실증명서 2부 발급받으러 왔어요' 표현",
        completed: false
      },
      {
        id: 'm-idcard',
        text: '외국인등록증(신분증) 제출하기',
        description: "'여기 신분증 있습니다' 표현",
        completed: false
      },
      {
        id: 'm-fee',
        text: '발급 수수료 금액 문의 및 결제하기',
        description: "'수수료는 얼마인가요?' 질문",
        completed: false
      }
    ],
    suggestedExpressions: [
      { korean: '외국인등록 사실증명서 2부 발급받으려고 하는데요.', meaning: 'I am here to get two copies of the Certificate of Alien Registration Fact.' },
      { korean: '여기 제 외국인등록증입니다.', meaning: 'Here is my Alien Registration Card.' },
      { korean: '발급 수수료는 얼마인가요? 카드로도 되나요?', meaning: 'How much is the issuance fee? Can I pay by card?' },
      { korean: '네, 여기에 서명하면 되나요?', meaning: 'Yes, should I sign right here?' }
    ],
    culturalNote: "한국 공공기관에서는 번호표를 뽑고 대기하며, 서류 발급 시 본인 확인을 위한 신분증(외국인등록증 또는 여권)이 반드시 필요합니다.",
    bgGradient: 'from-cyan-500/10 via-blue-500/10 to-indigo-500/10'
  }
];
