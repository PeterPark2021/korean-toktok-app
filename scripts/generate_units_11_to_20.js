import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const unitsB = [
  // Unit 11 (초급b 1과: 안부, 근황, 약속 지연)
  {
    unit: 11,
    dialogues: [
      { unit: 11, dialogue_id: "d11-1", speaker: "지훈", korean_text: "민수 씨, 오랜만이에요! 그동안 잘 지냈어요?", translation: "Minsu, long time no see! How have you been doing?", audio_hint: "반가운 표정과 밝고 활기찬 어조" },
      { unit: 11, dialogue_id: "d11-2", speaker: "민수", korean_text: "네, 지훈 씨. 잘 지내는데 요즘 회사 일 때문에 좀 바빠요.", translation: "Yes, Jihun. I'm doing well, but I'm a bit busy these days because of company work.", audio_hint: "차분하고 담담하게 근황을 설명하는 톤" },
      { unit: 11, dialogue_id: "d11-3", speaker: "지훈", korean_text: "그렇군요. 그런데 오늘 약속에 왜 늦었어요?", translation: "I see. By the way, why were you late for our appointment today?", audio_hint: "가볍게 궁금해하는 억양" },
      { unit: 11, dialogue_id: "d11-4", speaker: "민수", korean_text: "집에서 나오다가 비가 와서 우산을 가지러 다시 들어갔어요.", translation: "As I was leaving home, it rained, so I went back in to get an umbrella.", audio_hint: "약간 미안한 표정으로 설명하는 어조" },
      { unit: 11, dialogue_id: "d11-5", speaker: "민수", korean_text: "게다가 출근 시간에 버스를 놓치는 바람에 좀 늦었어요. 정말 미안해요.", translation: "Besides, I missed the bus during rush hour, so I ended up being late. I'm really sorry.", audio_hint: "진심으로 사과하는 정중한 톤" },
      { unit: 11, dialogue_id: "d11-6", speaker: "지훈", korean_text: "괜찮아요. 많이 기다리지 않았어요. 얼른 들어가서 차 마셔요.", translation: "It's okay. I haven't waited long. Let's go in quickly and have some tea.", audio_hint: "상대방을 안심시키는 따뜻한 목소리" }
    ],
    vocab: [
      { word: "근황", meaning: "최근의 사정이나 형편 (Recent situation / update)", part_of_speech: "명사", example_sentence: "친구에게 편지로 근황을 전했어요.", level: "초급" },
      { word: "오랜만", meaning: "오래간만, 지나간 시간 (After a long time)", part_of_speech: "명사", example_sentence: "오랜만에 친구를 만나서 즐거웠어요.", level: "초급" },
      { word: "바쁘다", meaning: "일이 많아 쉴 틈이 없다 (To be busy)", part_of_speech: "형용사", example_sentence: "이번 주에는 시험 준비로 정말 바빠요.", level: "초급" },
      { word: "놓치다", meaning: "탈것이나 기회를 잃다 (To miss - transport/opportunity)", part_of_speech: "동사", example_sentence: "늦잠을 자서 기차를 놓쳤어요.", level: "초급" },
      { word: "지연", meaning: "시간이 늦어짐 (Delay)", part_of_speech: "명사", example_sentence: "눈 때문에 비행기 출발이 지연되었습니다.", level: "초급" },
      { word: "우산", meaning: "비를 막는 도구 (Umbrella)", part_of_speech: "명사", example_sentence: "비가 오니까 우산을 챙기세요.", level: "초급" },
      { word: "출근", meaning: "일터로 나감 (Going to work)", part_of_speech: "명사", example_sentence: "아침 8시에 출근해요.", level: "초급" },
      { word: "사과하다", meaning: "잘못에 대해 용서를 구하다 (To apologize)", part_of_speech: "동사", example_sentence: "지각해서 선생님께 사과했어요.", level: "초급" },
      { word: "소식", meaning: "새로운 정보나 안부 (News / word)", part_of_speech: "명사", example_sentence: "고향 친구에게서 좋은 소식을 들었어요.", level: "초급" },
      { word: "괜찮다", meaning: "문제나 탈이 없다 (To be all right / okay)", part_of_speech: "형용사", example_sentence: "조금 늦어도 괜찮으니 천천히 오세요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-는데 / -(으)ㄴ데",
        explanation: "동사 어간에는 '-는데', 형용사 어간에는 '-(으)ㄴ데'가 붙어 뒤에 이어질 내용에 대한 배경 상황, 전제, 대조를 나타냅니다.",
        example_sentences: ["잘 지내는데 요즘 좀 바빠요.", "비가 오는데 우산이 없어요."],
        related_vocab: ["지내다", "바쁘다", "오다", "없다"]
      },
      {
        grammar_point: "-는 바람에",
        explanation: "주로 동사 뒤에 붙어, 예상치 못한 원인이나 부정적인 결과의 핑계·이유를 나타낼 때 씁니다. 뒤 문장에는 주로 부정적이거나 원치 않던 결과가 옵니다.",
        example_sentences: ["버스를 놓치는 바람에 약속에 늦었어요.", "비가 많이 오는 바람에 축구가 취소됐어요."],
        related_vocab: ["놓치다", "늦다", "취소되다"]
      },
      {
        grammar_point: "-다가",
        explanation: "어떤 동작이나 상태가 진행되던 도중에 다른 동작이나 상태로 전환됨을 나타내는 연결어미입니다.",
        example_sentences: ["집에서 나오다가 우산을 가지러 들어갔어요.", "길을 걷다가 친구를 만났어요."],
        related_vocab: ["나오다", "들어가다", "걷다"]
      }
    ],
    quiz: [
      { quiz_id: "q11-1", type: "multiple_choice", question: "다음 빈칸에 알맞은 것은? '버스를 놓치는 ___ 늦었어요.'", options: ["바람에", "덕분에", "위해서", "길에"], answer: "바람에", explanation: "예상치 못한 부정적 결과나 이유를 나타낼 때는 '-는 바람에'를 사용합니다.", source_unit: 11 },
      { quiz_id: "q11-2", type: "multiple_choice", question: "다음 중 배경 상황을 나타내는 연결어미가 올바르게 결합한 것은?", options: ["바쁜데", "바쁘는데", "바쁘은데", "바쁩는데"], answer: "바쁜데", explanation: "형용사 '바쁘다'는 받침이 없으므로 '-(으)ㄴ데'가 결합하여 '바쁜데'가 됩니다.", source_unit: 11 },
      { quiz_id: "q11-3", type: "multiple_choice", question: "다음 대화의 빈칸에 알맞은 것은? '그동안 어떻게 지냈어요?' - '잘 지내___ 좀 바빴어요.'", options: ["는데", "려고", "니까", "도록"], answer: "는데", explanation: "동사 '지내다' 뒤에 배경 상황을 제시하는 어미 '-는데'가 결합하여 '지내는데'가 됩니다.", source_unit: 11 },
      { quiz_id: "q11-4", type: "multiple_choice", question: "단어 '근황'의 의미로 가장 알맞은 것은?", options: ["최근의 사정이나 상태", "과거의 유명한 역사", "미래에 대한 상상", "학교에서의 시험 점수"], answer: "최근의 사정이나 상태", explanation: "'근황(近況)'은 최근의 일상 형편이나 사정을 뜻합니다.", source_unit: 11 },
      { quiz_id: "q11-5", type: "multiple_choice", question: "동작의 중단과 전환을 나타내는 문장으로 알맞은 것은?", options: ["학교에 가다가 친구를 만났어요.", "학교에 가려고 일어났어요.", "학교에 가니까 문이 닫혔어요.", "학교에 가도록 노력해요."], answer: "학교에 가다가 친구를 만났어요.", explanation: "이동 중에 다른 동작으로 전환됨을 표현할 때는 '-다가'를 사용합니다.", source_unit: 11 },
      { quiz_id: "q11-6", type: "fill_in_the_blank", question: "사고가 나는 ___ 도로가 많이 막혔어요. (바람에)", answer: "바람에", explanation: "예상치 못한 부정적 원인을 설명할 때 명사 '바람에'를 결합합니다.", source_unit: 11 },
      { quiz_id: "q11-7", type: "fill_in_the_blank", question: "텔레비전을 보___ 잠이 들었어요. (-다가)", answer: "보다가", explanation: "'보다'에 중단을 나타내는 어미 '-다가'가 붙어 '보다가'가 됩니다.", source_unit: 11 },
      { quiz_id: "q11-8", type: "fill_in_the_blank", question: "지금 시간이 없___ 나중에 이야기해요. (형용사 '없다' + -는데/-(으)ㄴ데)", answer: "없는데", explanation: "'있다/없다' 뒤에는 '-는데'가 붙어 '없는데'가 됩니다.", source_unit: 11 },
      { quiz_id: "q11-9", type: "fill_in_the_blank", question: "오랜만에 친구에게 안부 ___을 전했습니다. (정보나 안부를 뜻하는 명사)", answer: "소식", explanation: "새로운 정보나 안부를 가리키는 명사는 '소식'입니다.", source_unit: 11 },
      { quiz_id: "q11-10", type: "fill_in_the_blank", question: "약속 시간에 늦어서 진심으로 ___했어요. (사과하다 과거형)", answer: "사과", explanation: "'사과했습니다' 또는 '사과'가 자연스럽습니다.", source_unit: 11 },
      { quiz_id: "q11-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [바람에 / 늦었습니다 / 놓치는 / 버스를]", answer: "버스를 놓치는 바람에 늦었습니다", explanation: "목적어(버스를) + 원인(-는 바람에) + 결과 서술어(늦었습니다) 순으로 배열합니다.", source_unit: 11 },
      { quiz_id: "q11-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [바빠요 / 잘 / 요즘 / 지내는데]", answer: "잘 지내는데 요즘 바빠요", explanation: "배경 서술(잘 지내는데) + 부사(요즘) + 서술어(바빠요) 어순입니다.", source_unit: 11 },
      { quiz_id: "q11-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [친구를 / 학교에 / 가다가 / 만났어요]", answer: "학교에 가다가 친구를 만났어요", explanation: "장소이동(-다가) + 목적어(친구를) + 서술어(만났어요) 순으로 구성됩니다.", source_unit: 11 }
    ]
  },

  // Unit 12 (초급b 2과: 존칭 표현, 장보기)
  {
    unit: 12,
    dialogues: [
      { unit: 12, dialogue_id: "d12-1", speaker: "수진", korean_text: "민우 씨, 지금 댁에 계세요?", translation: "Minwoo, are you at home right now?", audio_hint: "정중하고 공손한 높임 어조" },
      { unit: 12, dialogue_id: "d12-2", speaker: "민우", korean_text: "아니요, 마트에서 장 보고 있는데 뭐 사 갈까요?", translation: "No, I am grocery shopping at the mart. Shall I buy anything and bring it?", audio_hint: "친절하고 다정한 목소리" },
      { unit: 12, dialogue_id: "d12-3", speaker: "수진", korean_text: "할머니께서 드실 과일하고 우유 좀 사다 주세요.", translation: "Please buy some fruit and milk for grandmother to eat.", audio_hint: "공손하고 부탁하는 톤" },
      { unit: 12, dialogue_id: "d12-4", speaker: "민우", korean_text: "네, 알겠어요. 아버지께서는 지금 진지 잡수셨어요?", translation: "Yes, I will. Has father had his meal yet?", audio_hint: "가족에 대한 존칭을 담은 질문 톤" },
      { unit: 12, dialogue_id: "d12-5", speaker: "수진", korean_text: "네, 아버지께서는 진지 드시고 지금 방에서 주무세요.", translation: "Yes, father had dinner and is sleeping in his room now.", audio_hint: "차분하고 정중한 대답 톤" },
      { unit: 12, dialogue_id: "d12-6", speaker: "민우", korean_text: "그렇군요. 제가 얼른 장 봐서 집으로 갈게요.", translation: "I see. I will finish shopping quickly and come home.", audio_hint: "신속하고 활기찬 마무리 톤" }
    ],
    vocab: [
      { word: "진지", meaning: "밥의 높임말 (Meal / rice - honorific)", part_of_speech: "명사", example_sentence: "할아버지, 진지 잡수세요.", level: "초급" },
      { word: "주무시다", meaning: "자다의 높임말 (To sleep - honorific)", part_of_speech: "동사", example_sentence: "어머니께서 편안하게 주무십니다.", level: "초급" },
      { word: "잡수시다", meaning: "먹다의 높임말 (To eat - honorific)", part_of_speech: "동사", example_sentence: "선생님께서 점심을 잡수셨어요.", level: "초급" },
      { word: "댁", meaning: "집의 높임말 (House / home - honorific)", part_of_speech: "명사", example_sentence: "교수님 댁에 방문했습니다.", level: "초급" },
      { word: "계시다", meaning: "있다의 높임말 (To stay / be - honorific)", part_of_speech: "동사", example_sentence: "부모님께서는 고향에 계세요.", level: "초급" },
      { word: "장보기", meaning: "시장에서 물건을 사는 일 (Grocery shopping)", part_of_speech: "명사", example_sentence: "주말에는 마트에서 장보기를 해요.", level: "초급" },
      { word: "과일", meaning: "사과, 배 등 열매 음식 (Fruit)", part_of_speech: "명사", example_sentence: "신선한 과일을 매일 먹어요.", level: "초급" },
      { word: "사다 주다", meaning: "물건을 사서 남에게 주다 (To buy and give)", part_of_speech: "동사", example_sentence: "동생에게 책을 사다 주었어요.", level: "초급" },
      { word: "말씀하시다", meaning: "말하다의 높임말 (To speak - honorific)", part_of_speech: "동사", example_sentence: "선생님께서 좋은 조언을 말씀하셨어요.", level: "초급" },
      { word: "편찮으시다", meaning: "아프다의 높임말 (To be sick - honorific)", part_of_speech: "형용사", example_sentence: "할머니께서 몸이 좀 편찮으세요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)시- (주체 높임 선어말어미)",
        explanation: "문장의 주어(웃어른, 존경의 대상)를 높일 때 동사나 형용사 어간 뒤에 결합합니다. 받침이 있으면 '-으시-', 없으면 '-시-'가 붙습니다.",
        example_sentences: ["선생님께서 책을 읽으십니다.", "어머니께서 요리하십니다."],
        related_vocab: ["읽다", "가다", "오시다"]
      },
      {
        grammar_point: "특수 높임 어휘 (진지, 주무시다, 계시다, 댁)",
        explanation: "기본 단어 대신 주어나 대상을 공손하게 높이기 위해 정해진 고유한 높임 명사 및 동사를 사용합니다. (밥→진지, 집→댁, 자다→주무시다, 있다→계시다, 먹다→드시다/잡수시다)",
        example_sentences: ["할아버지께서 댁에 계십니다.", "아버지께서 진지를 잡수십니다."],
        related_vocab: ["진지", "주무시다", "계시다", "댁"]
      },
      {
        grammar_point: "-는 중에 / -는 길에",
        explanation: "어떤 동작이 진행되고 있는 과정이나 목적지로 이동하는 도중임을 나타냅니다.",
        example_sentences: ["장 보고 있는 중에 전화가 왔어요.", "퇴근하는 길에 빵을 샀어요."],
        related_vocab: ["보다", "퇴근하다", "가다"]
      }
    ],
    quiz: [
      { quiz_id: "q12-1", type: "multiple_choice", question: "'밥'의 알맞은 높임말은 무엇인가요?", options: ["진지", "댁", "말씀", "성함"], answer: "진지", explanation: "'밥'을 웃어른에게 높여 부를 때는 '진지'를 씁니다.", source_unit: 12 },
      { quiz_id: "q12-2", type: "multiple_choice", question: "'자다'의 주체 높임 동사로 알맞은 것은?", options: ["주무시다", "계시다", "잡수시다", "편찮으시다"], answer: "주무시다", explanation: "'자다'의 높임 표현은 '주무시다'입니다.", source_unit: 12 },
      { quiz_id: "q12-3", type: "multiple_choice", question: "다음 중 문법적으로 올바른 높임 표현 문장은?", options: ["할머니께서 집에 계십니다.", "할머니께서 댁에 있으십니다.", "할머니께서 밥을 먹으십니다.", "할머니가 자십니다."], answer: "할머니께서 집에 계십니다.", explanation: "주체 '할머니'를 높일 때 '께서'와 높임 동사 '계십니다'를 씁니다. ('댁에 계십니다'도 가능)", source_unit: 12 },
      { quiz_id: "q12-4", type: "multiple_choice", question: "'아프다'를 어르신께 높여 표현한 것은?", options: ["편찮으시다", "잡수시다", "주무시다", "말씀하시다"], answer: "편찮으시다", explanation: "웃어른이 편치 못하거나 아프실 때는 '편찮으시다'를 씁니다.", source_unit: 12 },
      { quiz_id: "q12-5", type: "multiple_choice", question: "이동 중에 일어난 일을 표현할 때 알맞은 것은?", options: ["집에 가는 길에 친구를 만났어요.", "집에 가는 바람에 친구를 만났어요.", "집에 가는 탓에 친구를 만났어요.", "집에 가기 위해 친구를 만났어요."], answer: "집에 가는 길에 친구를 만났어요.", explanation: "이동하는 도중을 나타내는 표현은 '-는 길에'입니다.", source_unit: 12 },
      { quiz_id: "q12-6", type: "fill_in_the_blank", question: "선생님께서 교실에서 책을 ___십니다. (읽다 + -으시-)", answer: "읽으", explanation: "'읽다'는 받침이 있으므로 '-으시-'가 붙어 '읽으십니다'가 됩니다.", source_unit: 12 },
      { quiz_id: "q12-7", type: "fill_in_the_blank", question: "부모님은 지금 고향 ___에 계십니다. (집의 높임말)", answer: "댁", explanation: "'집'의 높임 어휘는 '댁'입니다.", source_unit: 12 },
      { quiz_id: "q12-8", type: "fill_in_the_blank", question: "할아버지, 어서 ___ 잡수세요. (밥의 높임말)", answer: "진지", explanation: "'밥'의 높임 표현은 '진지'입니다.", source_unit: 12 },
      { quiz_id: "q12-9", type: "fill_in_the_blank", question: "퇴근하___ 길에 마트에 들렀어요. (-는)", answer: "는", explanation: "'퇴근하다'의 어간 뒤에 '-는 길에'가 결합합니다.", source_unit: 12 },
      { quiz_id: "q12-10", type: "fill_in_the_blank", question: "어머니께서 지금 방에서 ___ 계십니다. (주무시다의 활용)", answer: "주무시고", explanation: "'주무시다'에 연결어미 '-고'가 붙어 '주무시고 계십니다'가 됩니다.", source_unit: 12 },
      { quiz_id: "q12-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [방에서 / 아버지께서 / 주무십니다 / 지금]", answer: "아버지께서 지금 방에서 주무십니다", explanation: "주어(아버지께서) + 부사(지금) + 장소(방에서) + 서술어(주무십니다) 순서입니다.", source_unit: 12 },
      { quiz_id: "q12-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [장 / 마트에서 / 보고 / 있어요]", answer: "마트에서 장 보고 있어요", explanation: "장소(마트에서) + 목적어(장) + 진행동사(보고 있어요) 순으로 배열합니다.", source_unit: 12 },
      { quiz_id: "q12-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [진지를 / 할아버지께서 / 잡수십니다 / 맛있게]", answer: "할아버지께서 진지를 맛있게 잡수십니다", explanation: "주어(할아버지께서) + 목적어(진지를) + 부사(맛있게) + 서술어(잡수십니다) 순서입니다.", source_unit: 12 }
    ]
  }
];

// Write out Unit 11 and 12 first, or build full batch
console.log('Batch ready. Writing units 11-12 to test...');
for (const u of unitsB) {
  const numStr = String(u.unit).padStart(2, '0');
  const dPath1 = path.join(rootDir, 'src', 'data', 'dialogues', `unit${numStr}.json`);
  const dPath2 = path.join(rootDir, 'data', 'dialogues', `unit${numStr}.json`);
  const vPath1 = path.join(rootDir, 'src', 'data', 'vocab', `unit${numStr}.json`);
  const vPath2 = path.join(rootDir, 'data', 'vocab', `unit${numStr}.json`);
  const gPath1 = path.join(rootDir, 'src', 'data', 'grammar', `unit${numStr}.json`);
  const gPath2 = path.join(rootDir, 'data', 'grammar', `unit${numStr}.json`);
  const qPath1 = path.join(rootDir, 'src', 'data', 'quiz', `unit${numStr}.json`);
  const qPath2 = path.join(rootDir, 'data', 'quiz', `unit${numStr}.json`);

  fs.writeFileSync(dPath1, JSON.stringify(u.dialogues, null, 2), 'utf-8');
  fs.writeFileSync(dPath2, JSON.stringify(u.dialogues, null, 2), 'utf-8');
  fs.writeFileSync(vPath1, JSON.stringify(u.vocab, null, 2), 'utf-8');
  fs.writeFileSync(vPath2, JSON.stringify(u.vocab, null, 2), 'utf-8');
  fs.writeFileSync(gPath1, JSON.stringify(u.grammar, null, 2), 'utf-8');
  fs.writeFileSync(gPath2, JSON.stringify(u.grammar, null, 2), 'utf-8');
  fs.writeFileSync(qPath1, JSON.stringify(u.quiz, null, 2), 'utf-8');
  fs.writeFileSync(qPath2, JSON.stringify(u.quiz, null, 2), 'utf-8');
  console.log(`Saved Unit ${numStr}`);
}
