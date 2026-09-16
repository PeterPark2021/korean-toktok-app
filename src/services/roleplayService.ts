import { RoleplayScenario, RoleplayMessage } from '../types';

export interface RoleplayRequestParams {
  scenario: RoleplayScenario;
  history: RoleplayMessage[];
  userMessage: string;
  userTurnCount: number; // 1 to 7
}

export interface RoleplayResponseResult {
  reply: string;
  coachingTip?: string | null;
  completedMissionIds: string[];
  isSessionFinished: boolean;
}

/**
 * Intelligent Fallback Roleplay Engine for local/offline/zero-key execution
 */
function generateLocalRoleplayResponse(params: RoleplayRequestParams): RoleplayResponseResult {
  const { scenario, userMessage, userTurnCount } = params;
  const msg = userMessage.trim().toLowerCase();
  const isFinalTurn = userTurnCount >= 7;
  const completedMissionIds: string[] = [];
  let coachingTip: string | null = null;

  // 1. Basic Politeness & Grammar Coaching Heuristics
  const informalEndings = ['야', '해', '줘', '가', '있어', '없어', '몰라'];
  const hasInformalEnding = informalEndings.some((end) => msg.endsWith(end));
  if (hasInformalEnding && scenario.level !== '고급') {
    coachingTip = "💡 자연스러운 표현 팁: 처음 만난 분이나 식당/병원에서는 반말 대신 '해요체(~요)'나 격식체(~습니다)를 쓰는 것이 좋습니다.";
  }

  // 2. Scenario-specific pattern matching & mission evaluation
  let reply = '';

  switch (scenario.id) {
    case 'rp-restaurant-refill':
      if (msg.includes('김치') || msg.includes('반찬') || msg.includes('더') || msg.includes('리필')) {
        completedMissionIds.push('m-kimchi');
        reply = '네, 손님! 맛있는 겉절이 김치 넉넉하게 바로 가져다드릴게요~';
      } else if (msg.includes('앞접시') || msg.includes('접시') || msg.includes('물') || msg.includes('컵')) {
        completedMissionIds.push('m-plate');
        reply = '네! 깨끗한 앞접시랑 시원한 보리차 한 병 더 가져다드렸습니다. 편하게 쓰세요~';
      } else if (msg.includes('감사') || msg.includes('고맙') || msg.includes('잘 먹') || msg.includes('맛있')) {
        completedMissionIds.push('m-thanks');
        reply = '맛있게 드셔주셔서 저희가 더 감사하죠! 더 필요한 건 없으신가요?';
      } else {
        reply = '네 손님! 말씀해 주신 대로 준비해 드릴게요. 국물이나 밥은 더 안 필요하세요?';
      }
      break;

    case 'rp-hospital-cold':
      if (msg.includes('목') || msg.includes('열') || msg.includes('기침') || msg.includes('따갑') || msg.includes('아파')) {
        completedMissionIds.push('m-symptoms');
        reply = '목 안쪽이 많이 부어있고 열도 조금 있으시네요. 목감기 초기 증상으로 보입니다.';
      } else if (msg.includes('어제') || msg.includes('이틀') || msg.includes('며칠') || msg.includes('부터') || msg.includes('밤')) {
        completedMissionIds.push('m-duration');
        reply = '아, 며칠 전부터 고생하셨군요. 무리하지 마시고 따뜻한 물을 자주 드셔야 합니다.';
      } else if (msg.includes('약') || msg.includes('식후') || msg.includes('밥') || msg.includes('주사') || msg.includes('먹어')) {
        completedMissionIds.push('m-medicine');
        reply = '처방해 드리는 약은 식사 후 30분에 하루 3번 챙겨 드시고, 졸릴 수 있으니 운전은 피하세요.';
      } else {
        reply = '네, 설명해 주신 증상 잘 들었습니다. 청진기로 숨소리 한번 확인해 볼게요.';
      }
      break;

    case 'rp-cafe-custom':
      if (msg.includes('아메리카노') || msg.includes('라떼') || msg.includes('커피') || msg.includes('음료') || msg.includes('잔')) {
        completedMissionIds.push('m-order');
        reply = '네! 시원하고 고소한 커피로 준비해 드릴게요. 원두나 옵션 변경 필요하신가요?';
      } else if (msg.includes('디카페인') || msg.includes('연하게') || msg.includes('시럽') || msg.includes('샷') || msg.includes('우유')) {
        completedMissionIds.push('m-option');
        reply = '네, 디카페인 원두로 부드럽게 샷 조절해 드릴게요! 텀블러 할인도 300원 적용해 드렸습니다.';
      } else if (msg.includes('가져') || msg.includes('테이크아웃') || msg.includes('먹고') || msg.includes('마시고') || msg.includes('매장')) {
        completedMissionIds.push('m-takeout');
        reply = '네, 포장해서 바로 들고 가실 수 있게 캐리어에 담아드릴게요! 진동벨로 알려드리겠습니다.';
      } else {
        reply = '네 손님, 말씀하신 대로 맛있게 제조해 드릴게요. 결제는 카드로 도와드릴까요?';
      }
      break;

    case 'rp-realestate-room':
      if (msg.includes('보증금') || msg.includes('월세') || msg.includes('500') || msg.includes('50') || msg.includes('예산')) {
        completedMissionIds.push('m-budget');
        reply = '네! 보증금 500에 월세 50만 원이면 역 근처에 아주 깔끔하고 채광 좋은 방이 두 군데 있습니다.';
      } else if (msg.includes('역') || msg.includes('옵션') || msg.includes('관리비') || msg.includes('에어컨') || msg.includes('세탁기')) {
        completedMissionIds.push('m-condition');
        reply = '역에서 도보 4분 거리이고 풀옵션(세탁기, 냉장고, 에어컨, 전자레인지)에 관리비는 5만 원(인터넷·수도 포함)입니다!';
      } else if (msg.includes('보러') || msg.includes('방') || msg.includes('언제') || msg.includes('지금') || msg.includes('가요')) {
        completedMissionIds.push('m-visit');
        reply = '지금 세입자분이 안 계셔서 바로 열쇠 챙겨서 방 보러 가실 수 있어요! 같이 나가보실까요?';
      } else {
        reply = '좋은 조건의 매물이 마침 나와 있어요. 언제쯤 입주를 희망하시나요?';
      }
      break;

    case 'rp-market-bargain':
      if (msg.includes('얼마') || msg.includes('가격') || msg.includes('딸기') || msg.includes('사과')) {
        completedMissionIds.push('m-price');
        reply = '이 딸기는 한 바구니에 만 원이고, 꿀사과는 세 개에 5천 원이야~ 당도가 정말 최고야!';
      } else if (msg.includes('깎아') || msg.includes('덤') || msg.includes('서비스') || msg.includes('조금만')) {
        completedMissionIds.push('m-discount');
        reply = '손님이 인상이 너무 좋으시네! 천 원 깎아주고 사과도 하나 더 덤으로 얹어줄게, 가져가!';
      } else if (msg.includes('주세요') || msg.includes('담아') || msg.includes('살게요') || msg.includes('계좌') || msg.includes('현금')) {
        completedMissionIds.push('m-buy');
        reply = '고마워요! 검은 봉지에 상하지 않게 튼튼하게 담아드렸어. 또 놀러 와요~';
      } else {
        reply = '아침에 산지에서 직접 싣고 온 거라 정말 싱싱해! 천천히 둘러보고 골라봐요.';
      }
      break;

    case 'rp-office-vacation':
      if (msg.includes('연차') || msg.includes('휴가') || msg.includes('금요일') || msg.includes('다음 주') || msg.includes('사정')) {
        completedMissionIds.push('m-request');
        reply = '네, 다음 주 금요일 연차 사용하는 것 확인했습니다. 개인 일정 잘 보고 오세요.';
      } else if (msg.includes('업무') || msg.includes('인수인계') || msg.includes('마무리') || msg.includes('연락') || msg.includes('차질')) {
        completedMissionIds.push('m-handoff');
        reply = '진행 중인 업무도 미리 꼼꼼히 정리해 주신다니 안심이 되네요. 긴급한 일 생기면 메신저 남길게요.';
      } else if (msg.includes('감사') || msg.includes('배려') || msg.includes('고맙')) {
        completedMissionIds.push('m-closing');
        reply = '별말씀을요! 푹 쉬고 재충전해서 다음 주 월요일에 활기차게 봅시다.';
      } else {
        reply = '네, 말씀하신 내용 이해했습니다. 결재 시스템에 휴가원만 등록해 주세요.';
      }
      break;

    case 'rp-taxi-direction':
      if (msg.includes('서울역') || msg.includes('시청') || msg.includes('가주') || msg.includes('출구') || msg.includes('어디')) {
        completedMissionIds.push('m-dest');
        reply = '네, 서울역 KTX 타는 곳으로 바로 모시겠습니다. 안전벨트 매주세요~';
      } else if (msg.includes('빨리') || msg.includes('서둘') || msg.includes('시간') || msg.includes('급') || msg.includes('촉박')) {
        completedMissionIds.push('m-urgent');
        reply = '기차 시간이 얼마 안 남으셨군요! 안 막히는 올림픽대로 쪽으로 빠르게 달려볼게요.';
      } else if (msg.includes('영수증') || msg.includes('카드') || msg.includes('계산') || msg.includes('내려')) {
        completedMissionIds.push('m-receipt');
        reply = '도착했습니다! 결제 완료되었고 영수증 여기 있습니다. 짐 잊지 말고 조심히 가세요!';
      } else {
        reply = '네 손님, 편안하게 모시겠습니다. 에어컨 온도는 괜찮으신가요?';
      }
      break;

    case 'rp-public-certificate':
      if (msg.includes('외국인등록') || msg.includes('증명서') || msg.includes('등본') || msg.includes('발급') || msg.includes('2부')) {
        completedMissionIds.push('m-doc');
        reply = '네, 외국인등록 사실증명서 2부 발급 신청 접수해 드리겠습니다. 신분증 확인 부탁드립니다.';
      } else if (msg.includes('신분증') || msg.includes('외국인등록증') || msg.includes('여기') || msg.includes('여권')) {
        completedMissionIds.push('m-idcard');
        reply = '본인 확인 완료되었습니다. 신청서 오른쪽 아래에 서명 한 번만 부탁드립니다.';
      } else if (msg.includes('수수료') || msg.includes('얼마') || msg.includes('비용') || msg.includes('카드')) {
        completedMissionIds.push('m-fee');
        reply = '수수료는 총 4,000원이며 카드 결제 가능합니다. 여기 영수증과 증명서 2부 나왔습니다!';
      } else {
        reply = '네, 처리해 드리고 있습니다. 잠시만 창구 앞에서 대기해 주세요.';
      }
      break;

    default:
      reply = '네, 말씀해 주신 내용 잘 알겠습니다! 편안하게 계속 말씀해 주세요.';
  }

  if (isFinalTurn) {
    reply += ' 오늘 대화 정말 유익하고 즐거웠습니다. 좋은 하루 보내세요! 🎉';
  }

  return {
    reply,
    coachingTip,
    completedMissionIds,
    isSessionFinished: isFinalTurn
  };
}

export const sendRoleplayMessage = async (params: RoleplayRequestParams): Promise<RoleplayResponseResult> => {
  const { scenario, history, userMessage, userTurnCount } = params;

  try {
    const response = await fetch('/api/roleplay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario: {
          id: scenario.id,
          title: scenario.title,
          level: scenario.level,
          situation: scenario.situation,
          aiPersona: scenario.aiPersona,
          userRole: scenario.userRole,
          missions: scenario.missions
        },
        history: history.map((h) => ({ sender: h.sender, text: h.text })),
        userMessage,
        userTurnCount
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.reply) {
        return {
          reply: data.reply,
          coachingTip: data.coaching || null,
          completedMissionIds: Array.isArray(data.completedMissionIds) ? data.completedMissionIds : [],
          isSessionFinished: data.isSessionFinished || userTurnCount >= 7
        };
      }
    }
  } catch (e) {
    console.warn('Remote roleplay API unavailable, activating local intelligent roleplay fallback:', e);
  }

  // Fallback with brief natural typing latency simulation (450ms)
  await new Promise((resolve) => setTimeout(resolve, 450));
  return generateLocalRoleplayResponse(params);
};
