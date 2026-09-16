import fs from 'fs';
import path from 'path';

// Helper to write JSON files to both src/data/kbs and data/kbs
function writeData(subPath, data) {
  const p1 = path.join('src/data/kbs', subPath);
  const p2 = path.join('data/kbs', subPath);
  fs.mkdirSync(path.dirname(p1), { recursive: true });
  fs.mkdirSync(path.dirname(p2), { recursive: true });
  fs.writeFileSync(p1, JSON.stringify(data, null, 2), 'utf-8');
  fs.writeFileSync(p2, JSON.stringify(data, null, 2), 'utf-8');
}

// KBS units definition (45 units across 초급a, 초급b, 중급a, 중급b, 고급a)
const kbsUnits = [
  // 초급a (Units 1 - 10)
  { level: "초급", book: "초급a", unit_number: 1, title: "1-1. 한글 / 1-2. 수업에 앞서서", topic: "한글 자모 및 교실 표현", situation: "한글의 자음, 모음, 받침 구성 원리와 교실에서 사용하는 기초 표현을 배우는 상황." },
  { level: "초급", book: "초급a", unit_number: 2, title: "2-1. 안녕하세요? / 2-2. 몇 명이에요?", topic: "자기소개 및 가족", situation: "처음 만나서 인사를 나누고 국적, 직업, 가족 구성원에 대해 묻고 답하는 상황." },
  { level: "초급", book: "초급a", unit_number: 3, title: "3-1. 지금 뭐 해요? / 3-2. 주말에 뭐 해요?", topic: "일상생활 및 주말 활동", situation: "현재 하고 있는 일상적인 동작이나 주말에 하는 활동에 대해 이야기하는 상황." },
  { level: "초급", book: "초급a", unit_number: 4, title: "4-1. 어디에 있어요? / 4-2. 이거 얼마예요?", topic: "위치와 장소 / 물건 사기", situation: "장소와 물건의 위치를 묻고 상점에서 가격을 확인하며 물건을 구매하는 상황." },
  { level: "초급", book: "초급a", unit_number: 5, title: "5-1. 몇 시에 일어나요? / 5-2. 생일이 언제예요?", topic: "시간과 날짜 / 하루 일과", situation: "하루 일과 시간을 묻고 생일이나 특정 날짜의 일정을 묻고 답하는 상황." },
  { level: "초급", book: "초급a", unit_number: 6, title: "6-1. 내일 만날까요? / 6-2. 같이 영화 볼래요?", topic: "약속 및 제안", situation: "친구와 만날 시간과 장소를 약속하고 함께 할 활동을 제안하는 상황." },
  { level: "초급", book: "초급a", unit_number: 7, title: "7-1. 오늘 날씨가 어때요? / 7-2. 무슨 옷을 입을까요?", topic: "날씨와 계절 / 옷차림", situation: "사계절 날씨의 특징을 이야기하고 날씨에 알맞은 옷차림에 대해 대화하는 상황." },
  { level: "초급", book: "초급a", unit_number: 8, title: "8-1. 서점에 어떻게 가요? / 8-2. 버스를 타고 가요", topic: "길 찾기 및 교통수단", situation: "목적지까지 가는 방법과 이용할 교통수단, 소요 시간을 묻고 안내하는 상황." },
  { level: "초급", book: "초급a", unit_number: 9, title: "9-1. 비빔밥 하나 주세요 / 9-2. 맛이 어때요?", topic: "음식 주문 및 맛 표현", situation: "식당에서 원하는 음식을 주문하고 음식의 맛과 식사 소감을 나누는 상황." },
  { level: "초급", book: "초급a", unit_number: 10, title: "10-1. 취미가 뭐예요? / 10-2. 한국 여행을 가 봤어요", topic: "취미와 여가 / 경험", situation: "자신의 취미 생활을 소개하고 과거의 여행이나 특별한 경험을 이야기하는 상황." },

  // 초급b (Units 11 - 20)
  { level: "초급", book: "초급b", unit_number: 11, title: "1-1. 잘 지내는데 좀 바빠요 / 1-2. 버스를 놓치는 바람에 좀 늦었어요", topic: "안부 및 약속 지연", situation: "오랜만에 만난 친구와 안부를 나누고 약속에 늦은 이유를 사과하는 상황." },
  { level: "초급", book: "초급b", unit_number: 12, title: "2-1. 아버지께서 주무세요 / 2-2. 장 보고 있는데 뭐 사 갈까요?", topic: "높임말 및 집안일", situation: "가족에 대해 높임말로 설명하고 저녁 식사 준비를 위해 장을 보며 소통하는 상황." },
  { level: "초급", book: "초급b", unit_number: 13, title: "3-1. 쉴 때 뭐 해요? / 3-2. 영화 보러 갈래요?", topic: "여가 생활 및 영화 관람", situation: "휴식 시간에 하는 취미 활동을 묻고 주말에 함께 영화를 보러 가자고 제안하는 상황." },
  { level: "초급", book: "초급b", unit_number: 14, title: "4-1. 제주도에 가 본 적이 있어요 / 4-2. 비행기 표를 예매하려고 하는데요", topic: "여행 경험 및 예매", situation: "과거 여행 경험을 공유하고 휴가 때 갈 비행기 표와 숙소를 예약하는 상황." },
  { level: "초급", book: "초급b", unit_number: 15, title: "5-1. 머리가 아프고 열이 나요 / 5-2. 약을 드신 후에 푹 쉬세요", topic: "건강과 병원 / 약 복용", situation: "몸의 아픈 증상을 의사에게 설명하고 약국에서 올바른 약 복용법을 안내받는 상황." },
  { level: "초급", book: "초급b", unit_number: 16, title: "6-1. 원룸을 구하려고 하는데요 / 6-2. 청소를 하니까 깨끗해졌어요", topic: "주거와 방 구하기 / 청소", situation: "부동산 중개소에서 원룸 조건을 상담하고 방 청소 후 달라진 모습을 이야기하는 상황." },
  { level: "초급", book: "초급b", unit_number: 17, title: "7-1. 인상이 참 좋아요 / 7-2. 네 덕분에 나도 성격이 많이 밝아졌어", topic: "첫인상 및 성격 변화", situation: "친구의 첫인상과 실제 성격에 대해 이야기하고 긍정적인 성격 변화에 감사하는 상황." },
  { level: "초급", book: "초급b", unit_number: 18, title: "8-1. 내년 봄쯤에 결혼할까 해요 / 8-2. 엄마만큼은 못해도 집안일은 하면 할수록 잘할 거야", topic: "결혼 계획 및 가사 분담", situation: "결혼 일정과 계획을 의논하고 결혼 후 가사 분담과 집안일 요령에 대해 대화하는 상황." },
  { level: "초급", book: "초급b", unit_number: 19, title: "9-1. 어린이날뿐만 아니라 석가탄신일에도 쉬어요 / 9-2. 한국 사람이라고 해서 모두 차례를 지내는 것은 아니에요", topic: "한국의 공휴일 및 명절 문화", situation: "한국의 5월 공휴일과 설날, 추석 명절의 전통 차례 문화 및 현대적 변화를 나누는 상황." },
  { level: "초급", book: "초급b", unit_number: 20, title: "10-1. 베트남 사람도 알 정도로 유명해요 / 10-2. 영화를 불법으로 다운 받으려다가 벌금을 낼 뻔했어요", topic: "인터넷 활동 및 온라인 범죄 예방", situation: "인터넷 크리에이터의 인기와 저작권 침해, 불법 다운로드의 위험성에 대해 주의를 주는 상황." },

  // 중급a (Units 21 - 30)
  { level: "중급", book: "중급a", unit_number: 21, title: "1-1. 교실에서 김밥 먹어도 돼요? / 1-2. 밤에는 좀 조용히 합시다", topic: "공공예절 및 공동주거", situation: "공공장소에서의 예절 규칙을 확인하고 층간 소음 문제에 대해 정중히 양해를 구하는 상황." },
  { level: "중급", book: "중급a", unit_number: 22, title: "2-1. 이 약은 세수한 후에 바르세요 / 2-2. 수술하고 나서 입원하셔야 해요", topic: "병원 진료 및 치료 절차", situation: "피부과나 외과 진료 후 연고 바르는 순서와 수술 후 입원 절차를 상담하는 상황." },
  { level: "중급", book: "중급a", unit_number: 23, title: "3-1. 나도 이제 연애를 해야겠어 / 3-2. 결혼식에 초대받았어요", topic: "연애와 이성교제 / 축하 예절", situation: "연애에 대한 바람을 이야기하고 지인의 결혼식 청첩장을 받으며 축하 인사를 건네는 상황." },
  { level: "중급", book: "중급a", unit_number: 24, title: "4-1. 진로를 어떻게 정해야 할까요? / 4-2. 고민이 있을 때 누구와 상담해요?", topic: "진로 탐색 및 고민 상담", situation: "졸업 후 진로와 취업 방향에 대해 조언을 구하고 고민 해결 방법을 상담하는 상황." },
  { level: "중급", book: "중급a", unit_number: 25, title: "5-1. 현대 사회와 여가 생활 / 5-2. 동호회 활동에 참여해 보세요", topic: "여가 문화 및 동호회 활동", situation: "일과 삶의 균형(워라밸)을 위한 다양한 여가 생활과 동호회 활동 참여를 권유하는 상황." },
  { level: "중급", book: "중급a", unit_number: 26, title: "6-1. K-드라마와 한류 열풍 / 6-2. SNS로 세상과 소통해요", topic: "대중문화와 미디어 / 소통", situation: "세계적인 한류 드라마의 인기 요인을 분석하고 SNS를 활용한 현대인의 소통 문화를 토론하는 상황." },
  { level: "중급", book: "중급a", unit_number: 27, title: "7-1. 쓰레기 분리배출을 실천합시다 / 7-2. 지구를 지키는 친환경 생활", topic: "환경 보호 및 자원 절약", situation: "올바른 쓰레기 분리배출 요령을 익히고 일상에서 실천할 수 있는 친환경 습관을 나누는 상황." },
  { level: "중급", book: "중급a", unit_number: 28, title: "8-1. 스마트폰이 바꾼 일상생활 / 8-2. 인공지능 기술의 미래", topic: "과학기술과 디지털 혁신", situation: "모바일 스마트폰의 편리함과 부작용, 그리고 미래 인공지능 사회의 변화를 전망하는 상황." },
  { level: "중급", book: "중급a", unit_number: 29, title: "9-1. 한국의 전통 가옥과 한옥 / 9-2. 유네스코에 등재된 한국의 문화유산", topic: "전통문화와 세계문화유산", situation: "한옥의 과학적 구조와 온돌 문화, 세계문화유산에 등재된 한국의 전통 예술을 감상하는 상황." },
  { level: "중급", book: "중급a", unit_number: 30, title: "10-1. 발 없는 말이 천 리를 간다 / 10-2. 신조어와 세대 간의 소통", topic: "관용어와 속담 / 언어 변화", situation: "속담의 깊은 교훈을 일상에 적용하고 신조어 사용에 따른 세대 간 언어 소통 문제를 진단하는 상황." },

  // 중급b (Units 31 - 40)
  { level: "중급", book: "중급b", unit_number: 31, title: "1-1. 아이돌 가수를 보기 위해 한국에 왔어요 / 1-2. 한국의 드라마는 매우 재미있다", topic: "K-POP 및 한국 드라마", situation: "좋아하는 한국 아이돌의 공연을 직관하고 화제의 한국 드라마 감상 후기를 공유하는 상황." },
  { level: "중급", book: "중급b", unit_number: 32, title: "2-1. 네, 인사팀의 이수연입니다 / 2-2. 부장님께서 말씀하신 대로 진행하겠습니다", topic: "직장 비즈니스 전화 및 업무 보고", situation: "회사에서 격식 있는 전화 응대를 수행하고 상사의 업무 지시를 정확히 확인하여 보고하는 상황." },
  { level: "중급", book: "중급b", unit_number: 33, title: "3-1. 호치민 지사의 프로젝트 보고 / 3-2. 직원 단합 대회 아이디어 공모", topic: "해외 출장 보고 및 사내 행사 기획", situation: "해외 지사 출장 결과를 회의에서 보고하고 사내 게시판의 단합 대회 공고를 확인하는 상황." },
  { level: "중급", book: "중급b", unit_number: 34, title: "4-1. 헤어스타일을 좀 바꾸려고 하는데요 / 4-2. 건강한 다이어트 방법", topic: "이미지 변신 및 다이어트", situation: "미용실에서 어울리는 헤어스타일을 추천받고 효과적이고 건강한 체중 감량 비결을 나누는 상황." },
  { level: "중급", book: "중급b", unit_number: 35, title: "5-1. 태풍 피해 예방과 안전 수칙 / 5-2. 반려동물 천만 시대의 펫티켓", topic: "자연재해 대처 및 반려동물 양육", situation: "태풍 예보에 따른 대피 요령을 숙지하고 반려동물 산책 시 지켜야 할 펫티켓을 점검하는 상황." },
  { level: "중급", book: "중급b", unit_number: 36, title: "6-1. 토끼와 거북이의 교훈 / 6-2. 한국 전래동화의 상징과 의미", topic: "우화와 전래동화", situation: "유명한 우화와 한국 전래동화의 줄거리를 읽고 그 안에 담긴 교훈과 가치를 토론하는 상황." },
  { level: "중급", book: "중급b", unit_number: 37, title: "7-1. 면접에서 호감을 주는 첫인상 / 7-2. 성격의 장점을 살린 직무 선택", topic: "취업 면접과 첫인상 / 성격 분석", situation: "면접관에게 신뢰감을 주는 첫인상 연출법과 자신의 성격상 강점을 직무에 연결하는 상황." },
  { level: "중급", book: "중급b", unit_number: 38, title: "8-1. 너 내 친구 소개받을래? / 8-2. 성격 차이를 극복하는 연애", topic: "소개팅 주선 및 연애 갈등 해결", situation: "친한 친구에게 소개팅을 주선하고 서로 다른 성격을 존중하며 연애하는 지혜를 나누는 상황." },
  { level: "중급", book: "중급b", unit_number: 39, title: "9-1. 나 혼자 산다: 1인 가구 자취 생활 / 9-2. 반려견 산책과 이웃 예절", topic: "자취 독립 생활 및 이웃 소통", situation: "혼자 사는 1인 가구의 장단점을 이야기하고 반려견을 기르며 이웃과 원만하게 지내는 법을 나누는 상황." },
  { level: "중급", book: "중급b", unit_number: 40, title: "10-1. 설날 떡국과 세배 문화 / 10-2. 추석 송편과 달맞이 축제", topic: "전통 명절 풍습과 세시풍속", situation: "설날 떡국을 먹으며 새해 덕담을 나누고 추석 송편 빚기와 보름달 소원 빌기 풍습을 체험하는 상황." },

  // 고급a (Units 41 - 45)
  { level: "고급", book: "고급a", unit_number: 41, title: "1-1. 계절과 기후의 변화 / 1-2. 지구 온난화와 온실효과", topic: "사계절 기후와 지구 온난화", situation: "한국의 사계절 기후 특성을 분석하고 지구 온난화의 원인인 온실효과와 환경 대책을 심층 논의하는 상황." },
  { level: "고급", book: "고급a", unit_number: 42, title: "2-1. 스포츠 정신과 열정 / 2-2. 붉은 악마와 한국의 응원 문화", topic: "스포츠 정신 및 집단 응원 문화", situation: "스포츠 경기의 감동과 국민적 열기, 그리고 붉은 악마로 대표되는 한국 특유의 길거리 응원 문화를 탐구하는 상황." },
  { level: "고급", book: "고급a", unit_number: 43, title: "3-1. 세 살 버릇 여든까지 간다 / 3-2. 발이 넓다: 신체 관용어", topic: "한국의 속담과 신체 관용구", situation: "전통 속담의 함축적 의미를 일상에 적용하고 인맥이나 성격을 표현하는 다양한 신체 관용 표현을 숙달하는 상황." },
  { level: "고급", book: "고급a", unit_number: 44, title: "4-1. 인공지능과 과학 기술의 발전 / 4-2. 동물 실험과 생명 연장의 윤리", topic: "과학기술의 진보 및 생명 윤리", situation: "인공지능과 바이오 기술의 눈부신 발전을 평가하고 동물 실험 찬반 및 무의미한 연명 치료에 대한 윤리적 쟁점을 토론하는 상황." },
  { level: "고급", book: "고급a", unit_number: 45, title: "5-1. 딩크족과 1인 가구: 가족 제도의 변화 / 5-2. 현대 사회 문제와 대안", topic: "가족 제도의 다변화 및 사회 문제", situation: "저출산과 비혼, 딩크족 증가에 따른 새로운 가족 형태를 고찰하고 데이트 폭력 등 현대 사회 문제의 해결책을 모색하는 상황." }
];

console.log('Writing KBS units.json...');
writeData('units.json', kbsUnits);

console.log('Building KBS unit files from authentic textbook materials...');
// Import the generator helper
