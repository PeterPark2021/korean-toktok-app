// src/data/culture/cultureData.ts
// Authentic Korean Cultural Insights, Etiquette Tips, and Real-World Expressions

export interface CultureKeyExpression {
  korean: string;
  pronunciation?: string;
  meaning: string;
  situationTip: string;
}

export interface CulturePracticalTip {
  type: 'do' | 'dont' | 'tip';
  title: string;
  description: string;
}

export interface UnitCultureItem {
  unit: number;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  tagline: string;
  summary: string;
  story: string[];
  practicalTips: CulturePracticalTip[];
  keyExpressions: CultureKeyExpression[];
  funFact: {
    title: string;
    description: string;
  };
}

export const CULTURE_SPOTLIGHTS: Record<number, UnitCultureItem> = {
  1: {
    unit: 1,
    title: '한국의 인사 예절과 첫인상 문화',
    subtitle: 'Bowing Etiquette & First Impressions in Korea',
    category: '전통 예절 · 매너',
    imageUrl: '/images/culture/palace.jpg',
    imageAlt: '한국의 전통 예절과 궁궐 문화',
    tagline: '허리를 숙여 마음을 전하는 한국의 목례(目禮) 문화',
    summary: '한국에서는 눈인사뿐만 아니라 허리를 정중하게 숙이는 각도에 따라 상대방에 대한 존중과 격식을 표현합니다.',
    story: [
      '한국에서 인사는 단순한 말 한마디가 아니라 상대방의 연령, 사회적 관계, 상황에 대한 존경심을 담은 중요한 행동 양식입니다.',
      '보통 일상적인 인사에서는 허리를 15도에서 30도 정도 숙이며 "안녕하세요"라고 말하고, 교수님이나 직장 상사, 어르신께는 45도 정도 깊게 숙여 공손함을 표현합니다.',
      '악수를 할 때는 오른손을 내밀면서 왼손으로 오른팔이나 가슴 부근을 가볍게 받치는 것이 전통적인 공경의 매너입니다.'
    ],
    practicalTips: [
      {
        type: 'do',
        title: '두 손으로 물건 주고받기',
        description: '명함, 선물, 잔이나 물건을 건네거나 받을 때는 양손을 사용하는 것이 기본 예절입니다.'
      },
      {
        type: 'dont',
        title: '한 손으로만 인사하거나 건네기',
        description: '어른이나 처음 만난 분에게 주머니에 손을 넣거나 한 손으로 대충 인사하는 것은 결례입니다.'
      },
      {
        type: 'tip',
        title: '눈맞춤(Eye Contact) 조절',
        description: '인사를 나눌 때 눈을 마주친 뒤 고개를 숙이고, 지나치게 공격적으로 눈을 응시하지 않는 것이 부드럽습니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '처음 뵙겠습니다. 잘 부탁드립니다.',
        pronunciation: 'Cheo-eum boep-get-seumnida. Jal bu-tak-deu-rim-nida.',
        meaning: 'Nice to meet you for the first time. Please look favorably upon me.',
        situationTip: '새로운 모임이나 첫 만남에서 정중하게 자신을 소개할 때 써요.'
      },
      {
        korean: '말씀 많이 들었습니다.',
        pronunciation: 'Malsseum mani deureot-seumnida.',
        meaning: 'I have heard so much about you.',
        situationTip: '소개받은 상대방을 칭찬하고 존중할 때 자연스럽게 건네는 표현이에요.'
      }
    ],
    funFact: {
      title: '한국의 나이와 빠른 서열 정리?',
      description: '한국인들이 처음 만났을 때 나이를 묻는 것은 무례함이 아니라, 상대방에게 알맞은 높임말과 호칭을 쓰기 위한 배려의 시작입니다!'
    }
  },

  4: {
    unit: 4,
    title: '한국의 식당 문화와 밥상 나눔의 미학',
    subtitle: 'Korean Dining Culture & Unlimited Banchan',
    category: '식생활 · 외식',
    imageUrl: '/images/culture/dining.jpg',
    imageAlt: '다채로운 반찬과 지글지글 한국 바비큐',
    tagline: '물은 셀프! 벨을 누르고 풍성한 반찬을 리필하는 매력',
    summary: '한국 식당에서는 풍성한 밑반찬(Banchan)이 기본으로 제공되며, 대부분 무료로 리필(Refill)할 수 있는 정(情) 문화가 있습니다.',
    story: [
      '한국의 식탁에는 밥과 국 외에도 김치, 나물, 전 등 다채로운 밑반찬이 기본으로 차려집니다. "반찬 좀 더 주세요"라고 요청하면 무료로 리필해 주는 것이 한국 외식 문화의 큰 매력입니다.',
      '테이블마다 호출 벨(Calling Bell)이나 수저통이 서랍에 숨겨져 있는 경우가 많으며, 식당 입구나 정수기 근처에 "물은 셀프"라고 적혀 있으면 직접 물을 가져다 마십니다.',
      '어른과 함께 식사할 때는 어른이 먼저 수저를 든 후에 식사를 시작하고, 밥그릇을 손에 들고 먹지 않고 식탁에 둔 채 숟가락으로 떠먹는 것이 전통 예절입니다.'
    ],
    practicalTips: [
      {
        type: 'do',
        title: '테이블 옆 서랍 확인하기',
        description: '식탁 위에 수저와 휴지가 없다면 테이블 옆면 서랍을 열어보세요.'
      },
      {
        type: 'do',
        title: '술과 음료 두 손으로 따르고 받기',
        description: '상대방에게 음료나 술을 권할 때는 양손으로 따르고, 받을 때도 양손으로 잔을 잡습니다.'
      },
      {
        type: 'dont',
        title: '밥그릇에 숟가락/젓가락 꽂아두기',
        description: '밥에 숟가락이나 젓가락을 수직으로 꽂는 것은 제사 의식을 연상시키므로 피해야 합니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '여기 김치 조금만 더 리필해 주세요~',
        pronunciation: 'Yeogi kimchi jogeum-man deo ripil-hae juseyo~',
        meaning: 'Could you please refill a little more kimchi here?',
        situationTip: '식당에서 맛있는 반찬을 더 먹고 싶을 때 미소와 함께 요청해 보세요.'
      },
      {
        korean: '잘 먹겠습니다! / 잘 먹었습니다!',
        pronunciation: 'Jal meok-get-seumnida! / Jal meog-eot-seumnida!',
        meaning: 'I will enjoy the meal! / Thank you for the wonderful meal!',
        situationTip: '식사 시작 전과 식사를 마친 후 감사 인사를 표현할 때 필수적이에요.'
      }
    ],
    funFact: {
      title: '한국의 쇠젓가락 문화',
      description: '한국은 동아시아에서 유일하게 납작한 금속 쇠젓가락을 일상적으로 사용합니다. 옛 백제 왕실에서 음식의 독을 감별하던 은수저 전통에서 유래되었답니다!'
    }
  },

  5: {
    unit: 5,
    title: '서울 전통시장과 길거리 미식 투어',
    subtitle: 'Traditional Korean Markets & Street Food Vibes',
    category: '도시 탐방 · 길거리 음식',
    imageUrl: '/images/culture/market.jpg',
    imageAlt: '광장시장 길거리 음식과 활기찬 시장 분위기',
    tagline: '김이 모락모락 피어나는 떡볶이, 전, 그리고 사람 냄새 가득한 시장',
    summary: '광장시장, 남대문시장 등 한국의 전통시장은 저렴한 가격에 한국 서민의 삶과 소울푸드를 가장 생생하게 체험할 수 있는 곳입니다.',
    story: [
      '한국의 전통시장은 100년 넘는 역사를 지닌 곳이 많으며, 시장 골목마다 떡볶이, 순대, 마약김밥, 빈대떡, 칼국수 등 군침 도는 대표 길거리 음식들이 가득합니다.',
      '시장 상인들은 손님에게 "덤(Extra free portion)"을 얹어주는 훈훈한 인심을 자랑하며, 활기찬 흥정과 따뜻한 정을 느낄 수 있습니다.',
      '최근에는 온누리상품권뿐만 아니라 신용카드나 모바일 계좌이체도 잘 구비되어 있어 외국인 관광객도 손쉽게 쇼핑과 미식을 즐길 수 있습니다.'
    ],
    practicalTips: [
      {
        type: 'tip',
        title: '현금이나 계좌이체 준비',
        description: '카드 결제도 가능하지만, 소액 길거리 음식점에서는 현금이나 계좌이체가 빠르고 편리할 때가 있습니다.'
      },
      {
        type: 'do',
        title: '"이모님/사장님" 정겨운 호칭 쓰기',
        description: '시장 가게에서 상인을 부를 때 "사장님~" 또는 "이모님~"이라고 부르면 더욱 친절하게 맞아주십니다.'
      },
      {
        type: 'dont',
        title: '포장마차 통로 가로막기',
        description: '좁은 시장 골목에서는 좌석 뒤 통로를 비워두고 서서 먹는 손님을 배려해 주는 센스가 필요합니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '사장님, 떡볶이 1인분하고 튀김 섞어 주세요!',
        pronunciation: 'Sajangnim, tteokbokki il-inbun-hago twigim seokkeo juseyo!',
        meaning: 'Boss, please give me one serving of tteokbokki mixed with fried snacks!',
        situationTip: '분식집이나 시장 포장마차에서 세트 메뉴를 주문할 때 유용해요.'
      },
      {
        korean: '포장해 갈 수 있나요?',
        pronunciation: 'Pojang-hae gal su innayo?',
        meaning: 'Can I take this to-go / take out?',
        situationTip: '숙소나 야외에서 먹기 위해 테이크아웃을 원할 때 물어보세요.'
      }
    ],
    funFact: {
      title: '덤(Deom) 문화의 유래',
      description: '‘덤’은 정해진 양보다 값을 더 받지 않고 얹어주는 한국 고유의 상거래 풍습으로, 주는 사람과 받는 사람 모두 행복해지는 따뜻한 정(情)의 상징입니다.'
    }
  },

  8: {
    unit: 8,
    title: '한국의 초스피드 배달 문화와 야식의 세계',
    subtitle: 'Speedy K-Delivery & Night Snack Culture',
    category: '현대 생활 · 라이프스타일',
    imageUrl: '/images/culture/dining.jpg',
    imageAlt: '한국의 풍성한 외식 및 배달 음식',
    tagline: '한강 공원 잔디밭까지 정확하게 배달되는 세계 최고 배달 인프라',
    summary: '치킨, 피자뿐만 아니라 삼겹살, 커피, 아이스크림까지 24시간 언제 어디서든 스마트폰 앱으로 주문할 수 있는 한국의 대표 라이프스타일입니다.',
    story: [
      '한국은 세계에서 가장 발달된 배달 시스템을 보유하고 있습니다. 배달의민족, 요기요, 쿠팡이츠 등의 앱을 통해 문 앞은 물론 한강 공원 배달존까지 음식이 배달됩니다.',
      '특히 밤 10시 이후 출출할 때 먹는 ‘야식(Night Snack)’ 문화가 발달하여 치맥(치킨+맥주), 족발, 보쌈, 라면 등이 큰 사랑을 받습니다.',
      '배달 포장 기술 또한 보온팩, 밀봉 용기 등을 사용하여 갓 조리된 따끈따끈한 상태 그대로 집에서 즐길 수 있습니다.'
    ],
    practicalTips: [
      {
        type: 'tip',
        title: '한강 배달존(Delivery Zone) 활용',
        description: '여의도나 뚝섬 한강공원에서는 지정된 "배달존 번호"를 라이더에게 알려주면 정확히 만날 수 있습니다.'
      },
      {
        type: 'do',
        title: '배달 용기 깔끔하게 분리수거하기',
        description: '배달 음식을 맛있게 먹은 후 플라스틱 용기는 물로 가볍게 헹궈서 분리배출합니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '문 앞에 두고 벨 눌러주세요.',
        pronunciation: 'Mun ape dugo bel nulleo juseyo.',
        meaning: 'Please leave it at the door and ring the bell.',
        situationTip: '비대면 배달을 요청할 때 배달 요청사항에 적는 대표 문구예요.'
      },
      {
        korean: '오늘 밤에 치맥 한잔할래?',
        pronunciation: 'Oneul bame chimaek han-jan halrae?',
        meaning: 'Do you want to have chicken and beer together tonight?',
        situationTip: '친구와 밤에 가볍게 야식을 즐기자고 제안할 때 즐겨 써요.'
      }
    ],
    funFact: {
      title: '조선시대 최초의 배달 음식, 효종갱(曉鍾羹)',
      description: '놀랍게도 한국의 배달 역사는 조선시대로 거슬러 올라갑니다! 새벽 통행금지 해제 종이 울릴 때 양반들에게 배달되던 해장국 "효종갱"이 최초의 배달 기록이랍니다.'
    }
  },

  11: {
    unit: 11,
    title: '한국의 최대 명절: 설날과 세배 문화',
    subtitle: 'Seollal (Lunar New Year) & Sebae Greetings',
    category: '전통 명절 · 세시풍속',
    imageUrl: '/images/culture/seollal.jpg',
    imageAlt: '설날 아침 한복을 차려입고 떡국을 나누는 화목한 가족',
    tagline: '떡국 한 그릇으로 나이를 한 살 더 먹고 복을 나누는 날',
    summary: '설날은 온 가족이 모여 조상께 차례를 지내고, 어르신께 세배를 드리며 떡국을 나누어 먹는 한국의 가장 큰 명절입니다.',
    story: [
      '음력 1월 1일인 설날 아침, 가족들은 고운 한복(설빔)을 차려입고 윗어른께 큰절로 "세배"를 올립니다. 어른들은 건강과 복을 기원하는 덕담과 함께 "세뱃돈"을 건넵니다.',
      '설날의 대표 음식은 맑은 장국에 흰 떡을 얇게 썰어 넣은 ‘떡국’입니다. 흰 떡은 묵은 해를 털고 맑고 순수하게 새해를 시작하자는 의미이며, 긴 가래떡은 무병장수를 상징합니다.',
      '식사 후에는 윷놀이, 널뛰기, 연날리기 등 전통 민속놀이를 함께 즐기며 가족 간의 정을 돈독히 다집니다.'
    ],
    practicalTips: [
      {
        type: 'do',
        title: '올바른 세배 손 모양 (공수법)',
        description: '절을 할 때 남자는 왼손이 위로, 여자는 오른손이 위로 가도록 손을 모아 맞잡습니다.'
      },
      {
        type: 'do',
        title: '따뜻한 덕담 건네기',
        description: '새해를 맞이하여 상대방의 건강, 학업, 취업, 사업 번창을 진심으로 축복해 줍니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '새해 복 많이 받으세요!',
        pronunciation: 'Sae-hae bok mani bat-eu-se-yo!',
        meaning: 'Happy New Year! (May you receive abundant blessings in the new year!)',
        situationTip: '새해 첫날 모든 사람에게 전하는 가장 대표적인 축복 인사예요.'
      },
      {
        korean: '올 한 해도 건강하시고 소원 성취하세요.',
        pronunciation: 'Ol han haedo geon-gang-ha-sigo sowon seongchwi-haseyo.',
        meaning: 'Wishing you good health and the fulfillment of all your wishes this year.',
        situationTip: '어르신이나 선생님, 존경하는 분께 격식 있게 새해 덕담을 전할 때 써요.'
      }
    ],
    funFact: {
      title: '"떡국 몇 그릇 먹었어?"',
      description: '한국에서는 나이를 물어볼 때 친근하게 "떡국 몇 그릇 먹었어?"라고 농담을 건네기도 합니다. 떡국 한 그릇을 먹어야 진짜 한 살을 더 먹는다는 정겨운 풍습에서 나온 말입니다.'
    }
  },

  15: {
    unit: 15,
    title: '대한민국 카페 공화국과 ‘얼죽아’ 트렌드',
    subtitle: 'Korea’s Coffee Culture & Study Cafes',
    category: '트렌드 · 청년 문화',
    imageUrl: '/images/culture/campus.jpg',
    imageAlt: '아늑한 카페에서 공부하고 담소를 나누는 풍경',
    tagline: '영하의 추위에도 아이스 아메리카노! 카페는 또 하나의 생활 공간',
    summary: '한국은 전 세계에서 인구 대비 카페 수가 가장 많은 나라 중 하나로, 대화는 물론 공부(카공)와 휴식의 중심지입니다.',
    story: [
      '한국인에게 커피는 단순한 기호식품을 넘어 일상의 에너지 충전소입니다. 특히 한겨울 영하 10도의 강추위에도 차가운 아이스 아메리카노를 마시는 사람들을 가리켜 "얼죽아(얼어 죽어도 아이스 아메리카노)"라는 신조어가 있을 정도입니다.',
      '많은 대학생과 취업준비생들이 카페에서 노트북과 책을 펴놓고 공부하는 ‘카공족’ 문화를 형성하고 있으며, 이를 위해 콘센트와 초고속 Wi-Fi가 완벽하게 갖추어져 있습니다.',
      '최근에는 루프탑 카페, 한옥 카페, 베이커리 대형 카페 등 독특한 인테리어와 포토존을 갖춘 카페들이 젊은 층의 핫플레이스로 각광받고 있습니다.'
    ],
    practicalTips: [
      {
        type: 'do',
        title: '1인 1음료 주문 매너',
        description: '카페 좌석을 이용할 때는 인원수대로 음료나 디저트를 주문하는 것이 일반적인 에티켓입니다.'
      },
      {
        type: 'tip',
        title: '진동벨(Buzzer)과 픽업대 확인',
        description: '주문 후 진동벨이 울리면 영수증과 함께 픽업대(Pick-up counter)로 가서 음료를 받아옵니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '아이스 아메리카노 한 잔 테이크아웃해 주세요.',
        pronunciation: 'Aiseu Amerikano han jan teikeu-aut-hae juseyo.',
        meaning: 'One Iced Americano to-go, please.',
        situationTip: '한국 카페에서 가장 많이 쓰이는 주문 1순위 문장이에요.'
      },
      {
        korean: '여기 와이파이 비밀번호가 어떻게 되나요?',
        pronunciation: 'Yeogi waipai bimilbeonhoga eotteoke doenayo?',
        meaning: 'What is the Wi-Fi password here?',
        situationTip: '영수증 하단이나 카운터에 적힌 Wi-Fi를 찾기 어려울 때 문의해 보세요.'
      }
    ],
    funFact: {
      title: '‘얼죽아’ vs ‘뜨죽따’',
      description: '아이스를 고집하는 "얼죽아"에 맞서, 한여름 무더위에도 뜨거운 음료를 고집하는 사람들을 "뜨죽따(뜨거워 죽어도 따뜻한 음료)"라고 부르는 재미있는 한국어 유행어가 있습니다!'
    }
  }
};

// Generates dynamic contextual cultural card for any unit without hardcoded spotlight
export function getCultureForUnit(unitNumber: number, unitTopic: string = '', unitSituation: string = ''): UnitCultureItem {
  if (CULTURE_SPOTLIGHTS[unitNumber]) {
    return CULTURE_SPOTLIGHTS[unitNumber];
  }

  // Determine theme by unit number & topic
  const modulo = unitNumber % 5;
  let category = '일상생활 · 소통';
  let defaultImage = '/images/culture/campus.jpg';
  let imageAlt = '한국의 다채로운 일상과 문화 풍경';

  if (modulo === 0) {
    category = '식생활 · 미식 문화';
    defaultImage = '/images/culture/dining.jpg';
    imageAlt = '풍성한 한국 음식과 외식 문화';
  } else if (modulo === 1) {
    category = '전통 문화 · 서울 명소';
    defaultImage = '/images/culture/palace.jpg';
    imageAlt = '경복궁과 유서 깊은 한국의 역사 유적';
  } else if (modulo === 2) {
    category = '도시 탐방 · 시장 라이프';
    defaultImage = '/images/culture/market.jpg';
    imageAlt = '활기찬 한국의 골목길과 전통시장';
  } else if (modulo === 3) {
    category = '한국 명절 · 가족 문화';
    defaultImage = '/images/culture/seollal.jpg';
    imageAlt = '한국의 따뜻한 명절과 가족의 정';
  }

  return {
    unit: unitNumber,
    title: `Unit ${unitNumber} 문화 톡톡: ${unitTopic || '한국인의 일상과 소통'}`,
    subtitle: `Cultural Insight for Unit ${unitNumber}`,
    category,
    imageUrl: defaultImage,
    imageAlt,
    tagline: `${unitSituation || '한국에서의 자연스러운 생활 속 소통과 예절'}`,
    summary: `한국어 대화 속에는 상대방을 배려하고 상황에 맞춰 알맞은 표현을 구사하는 한국인 특유의 정(情)과 문화적 맥락이 녹아 있습니다.`,
    story: [
      `한국어를 유창하게 구사하기 위해서는 단어와 문법뿐만 아니라, 그 말이 사용되는 한국 사회의 문화적 배경을 이해하는 것이 매우 중요합니다.`,
      `상대방과의 친밀도, 연령 차이, 공적인 자리인지 사적인 모임인지에 따라 어휘와 종결어미의 뉘앙스가 섬세하게 변화합니다.`,
      `이번 단원에서 배운 표현들을 실제 한국인 친구나 동료와 대화할 때 활용해 보며 한국만의 따뜻한 소통 문화를 직접 체감해 보세요.`
    ],
    practicalTips: [
      {
        type: 'do',
        title: '상황에 맞는 존칭과 호칭 사용하기',
        description: '상대방의 직함이나 이름 뒤에 "~씨", "~님"을 붙여 존중하는 태도를 보여줍니다.'
      },
      {
        type: 'tip',
        title: '적극적인 리액션과 맞장구',
        description: '대화 중 "아, 그래요?", "정말요?", "맞아요!"와 같은 부드러운 맞장구는 대화를 한층 화기애애하게 만듭니다.'
      },
      {
        type: 'dont',
        title: '처음 만난 사람에게 지나친 반말 삼가기',
        description: '나이가 비슷해 보이더라도 서로 동의하기 전까지는 공손한 존댓말을 유지하는 것이 매너입니다.'
      }
    ],
    keyExpressions: [
      {
        korean: '실례지만, 한 번만 다시 말씀해 주시겠어요?',
        pronunciation: 'Sillyejiman, han beonman dasi malsseumhae jusigesseoyo?',
        meaning: 'Excuse me, could you please say that one more time?',
        situationTip: '상대방의 말이 빠르거나 잘 들리지 않았을 때 정중하게 다시 물어보세요.'
      },
      {
        korean: '덕분에 많은 도움이 되었습니다. 감사합니다!',
        pronunciation: 'Deokbune maneun doumi doeeotseumnida. Gamsahamnida!',
        meaning: 'Thanks to you, it was a great help. Thank you very much!',
        situationTip: '누군가 도움이나 정보를 주었을 때 진심 어린 감사를 전할 때 써요.'
      }
    ],
    funFact: {
      title: '한국인의 정(情)과 맞장구 문화',
      description: '한국인들은 대화할 때 고개를 끄덕이며 "네~", "아하~" 하고 호응해 주는 것을 매우 좋아합니다. 적극적인 리액션은 친밀감을 쌓는 최고의 마법입니다!'
    }
  };
}
