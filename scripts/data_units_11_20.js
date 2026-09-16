export const units11to20 = [
  // Unit 11: 초급b 1과 (안부 및 근황 / 약속 지연)
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
        explanation: "주로 동사 뒤에 붙어, 예상치 못한 원인이나 부정적인 결과의 핑계·이유를 나타낼 때 씁니다.",
        example_sentences: ["버스를 놓치는 바람에 약속에 늦었어요.", "비가 많이 오는 바람에 축구가 취소됐어요."],
        related_vocab: ["놓치다", "늦다", "취소되다"]
      },
      {
        grammar_point: "-다가",
        explanation: "어떤 동작이나 상태가 진행되던 도중에 다른 동작이나 상태로 전환됨을 나타냅니다.",
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

  // Unit 12: 초급b 2과 (가족 존칭 및 장보기)
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
        explanation: "문장의 주어(웃어른, 존경의 대상)를 높일 때 동사나 형용사 어간 뒤에 결합합니다.",
        example_sentences: ["선생님께서 책을 읽으십니다.", "어머니께서 요리하십니다."],
        related_vocab: ["읽다", "가다", "오시다"]
      },
      {
        grammar_point: "특수 높임 어휘 (진지, 주무시다, 계시다, 댁)",
        explanation: "기본 단어 대신 주어를 공손하게 높이기 위해 정해진 고유한 높임 명사 및 동사를 사용합니다.",
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
      { quiz_id: "q12-3", type: "multiple_choice", question: "다음 중 문법적으로 올바른 높임 표현 문장은?", options: ["할머니께서 집에 계십니다.", "할머니께서 댁에 있으십니다.", "할머니께서 밥을 먹으십니다.", "할머니가 자십니다."], answer: "할머니께서 집에 계십니다.", explanation: "주체 '할머니'를 높일 때 '께서'와 높임 동사 '계십니다'를 씁니다.", source_unit: 12 },
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
  },

  // Unit 13: 초급b 3과 (여가 활동 및 취미)
  {
    unit: 13,
    dialogues: [
      { unit: 13, dialogue_id: "d13-1", speaker: "유진", korean_text: "현우 씨는 주말에 쉴 때 보통 뭐 해요?", translation: "Hyunwoo, what do you usually do when you rest on weekends?", audio_hint: "호기심을 담은 가볍고 친근한 톤" },
      { unit: 13, dialogue_id: "d13-2", speaker: "현우", korean_text: "저는 음악 듣는 걸 좋아해서 피아노를 쳐요.", translation: "I like listening to music, so I play the piano.", audio_hint: "즐거운 취미를 소개하는 차분한 어조" },
      { unit: 13, dialogue_id: "d13-3", speaker: "유진", korean_text: "피아노를 칠 줄 아세요? 언제부터 치게 되었어요?", translation: "You know how to play piano? Since when did you start playing?", audio_hint: "놀라움과 칭찬의 억양" },
      { unit: 13, dialogue_id: "d13-4", speaker: "현우", korean_text: "작년에 친구 권유로 피아노 학원에 다니게 되었어요.", translation: "Last year, thanks to a friend's recommendation, I started going to a piano academy.", audio_hint: "계기를 설명하는 부드러운 톤" },
      { unit: 13, dialogue_id: "d13-5", speaker: "유진", korean_text: "저도 스트레스 받을 때 기타를 배우고 싶어요.", translation: "I also want to learn the guitar when I'm stressed.", audio_hint: "공감과 바람을 나타내는 톤" },
      { unit: 13, dialogue_id: "d13-6", speaker: "현우", korean_text: "악기를 연주하면 기분이 정말 좋아져요. 꼭 배워 보세요!", translation: "Playing an instrument really makes you feel good. Definitely try learning!", audio_hint: "열정적인 추천 어조" }
    ],
    vocab: [
      { word: "여가", meaning: "일이 없어 남는 자유 시간 (Leisure)", part_of_speech: "명사", example_sentence: "여가 시간에 영화를 봐요.", level: "초급" },
      { word: "취미", meaning: "즐기기 위해 하는 활동 (Hobby)", part_of_speech: "명사", example_sentence: "제 취미는 사진 찍기예요.", level: "초급" },
      { word: "악기", meaning: "음악을 연주하는 기구 (Musical instrument)", part_of_speech: "명사", example_sentence: "어떤 악기를 다룰 수 있나요?", level: "초급" },
      { word: "피아노", meaning: "건반을 눌러 소리를 내는 악기 (Piano)", part_of_speech: "명사", example_sentence: "어릴 때 피아노를 배웠어요.", level: "초급" },
      { word: "연주하다", meaning: "악기로 음악을 들려주다 (To perform / play an instrument)", part_of_speech: "동사", example_sentence: "무대에서 멋지게 연주했어요.", level: "초급" },
      { word: "기타", meaning: "줄을 튕겨 소리 내는 악기 (Guitar)", part_of_speech: "명사", example_sentence: "노래를 부르며 기타를 쳐요.", level: "초급" },
      { word: "스트레스", meaning: "정신적·육체적 피로와 긴장 (Stress)", part_of_speech: "명사", example_sentence: "운동으로 스트레스를 풀어요.", level: "초급" },
      { word: "권유", meaning: "어떤 일을 하도록 권함 (Recommendation / advice)", part_of_speech: "명사", example_sentence: "선생님의 권유로 대회에 나갔어요.", level: "초급" },
      { word: "배우다", meaning: "지식이나 기술을 익히다 (To learn)", part_of_speech: "동사", example_sentence: "한국 요리를 배우고 있어요.", level: "초급" },
      { word: "휴식", meaning: "하던 일을 멈추고 쉼 (Rest / break)", part_of_speech: "명사", example_sentence: "주말에는 충분한 휴식이 필요해요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)ㄹ 때",
        explanation: "동사나 형용사 어간 뒤에 붙어 어떤 일이나 상태가 일어나는 시점이나 시간적 배경을 나타냅니다.",
        example_sentences: ["쉴 때 음악을 들어요.", "비가 올 때 우산을 써요."],
        related_vocab: ["쉬다", "오다", "먹다"]
      },
      {
        grammar_point: "-는 것 (명사형 전성어미)",
        explanation: "동사 뒤에 결합하여 동사 구문을 명사처럼 만들어 문장의 주어나 목적어로 쓰이게 합니다. (-는 것을 / -는 걸)",
        example_sentences: ["피아노 치는 것을 좋아해요.", "한국어 공부하는 것이 재미있어요."],
        related_vocab: ["치다", "공부하다", "보다"]
      },
      {
        grammar_point: "-게 되다",
        explanation: "자신의 의지보다는 주변 상황, 환경, 다른 사람의 영향으로 어떤 상태나 행동에 이르게 되었음을 나타냅니다.",
        example_sentences: ["작년부터 피아노를 배우게 되었어요.", "한국에서 일하게 되었습니다."],
        related_vocab: ["배우다", "일하다", "만나다"]
      }
    ],
    quiz: [
      { quiz_id: "q13-1", type: "multiple_choice", question: "동작이 일어나는 때를 나타내는 알맞은 연결 형태는? '쉴 ___ 음악을 들어요.'", options: ["때", "길에", "바람에", "탓에"], answer: "때", explanation: "시간이나 시점을 가리킬 때는 '-(으)ㄹ 때'를 씁니다.", source_unit: 13 },
      { quiz_id: "q13-2", type: "multiple_choice", question: "동사 '치다'를 명사구로 만들어 목적어로 바르게 쓴 것은?", options: ["치는 것을", "치은 것을", "치을 것을", "칩는 것을"], answer: "치는 것을", explanation: "동사 어간 '치-' 뒤에 명사형 어미 '-는 것'이 붙어 '치는 것을(치는 걸)'이 됩니다.", source_unit: 13 },
      { quiz_id: "q13-3", type: "multiple_choice", question: "외부 상황으로 인해 새로운 상태로 변화함을 나타내는 문장은?", options: ["한국에 오게 되었어요.", "한국에 오려고 해요.", "한국에 오니까 좋아요.", "한국에 오면 좋겠어요."], answer: "한국에 오게 되었어요.", explanation: "환경이나 상황의 변화로 결과에 이르게 됨을 나타내는 표현은 '-게 되다'입니다.", source_unit: 13 },
      { quiz_id: "q13-4", type: "multiple_choice", question: "자유롭게 쉬며 즐기는 시간을 뜻하는 어휘는?", options: ["여가", "출근", "과제", "지각"], answer: "여가", explanation: "일이 없어 자유롭게 쓸 수 있는 남는 시간은 '여가(Leisure)'입니다.", source_unit: 13 },
      { quiz_id: "q13-5", type: "multiple_choice", question: "다음 중 어법상 가장 자연스러운 문장은?", options: ["영화를 보는 것을 즐겨요.", "영화를 본 것을 좋아할래요.", "영화를 볼 것이 싫어요.", "영화를 봅는 걸 좋아해요."], answer: "영화를 보는 것을 즐겨요.", explanation: "현재의 취미나 일반적 선호를 나타낼 때 '동사 + -는 것'을 결합합니다.", source_unit: 13 },
      { quiz_id: "q13-6", type: "fill_in_the_blank", question: "시간이 있___ 때 운동을 하세요. (있다 + -(으)ㄹ 때)", answer: "을", explanation: "'있다'에 받침이 있으므로 '-을 때'가 붙어 '있을 때'가 됩니다.", source_unit: 13 },
      { quiz_id: "q13-7", type: "fill_in_the_blank", question: "음악을 듣___ 것을 가장 좋아해요. (-는)", answer: "는", explanation: "'듣다'의 어간 뒤에 현재 명사형 어미 '-는'이 붙습니다.", source_unit: 13 },
      { quiz_id: "q13-8", type: "fill_in_the_blank", question: "회사 발령으로 서울에 살___ 되었습니다. (살다 + -게 되다)", answer: "게", explanation: "'살다'의 어간 '살-' 뒤에 '-게 되다'가 붙어 '살게 되었습니다'가 됩니다.", source_unit: 13 },
      { quiz_id: "q13-9", type: "fill_in_the_blank", question: "피아노나 기타 같은 악기를 다루는 것을 ___라고 합니다. (연주)", answer: "연주", explanation: "악기를 다루어 소리 내는 행위는 '연주'입니다.", source_unit: 13 },
      { quiz_id: "q13-10", type: "fill_in_the_blank", question: "친구의 권___로 동아리에 가입했어요. (권유의 '유')", answer: "유", explanation: "'권유(勸誘)'는 권하는 행위입니다.", source_unit: 13 },
      { quiz_id: "q13-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [좋아해요 / 피아노 / 치는 / 것을]", answer: "피아노 치는 것을 좋아해요", explanation: "목적어구(피아노 치는 것을) + 서술어(좋아해요) 어순입니다.", source_unit: 13 },
      { quiz_id: "q13-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [음악을 / 때 / 들어요 / 쉴]", answer: "쉴 때 음악을 들어요", explanation: "시간 부사절(쉴 때) + 목적어(음악을) + 서술어(들어요) 순서입니다.", source_unit: 13 },
      { quiz_id: "q13-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [되었어요 / 학원에 / 다니게 / 작년에]", answer: "작년에 학원에 다니게 되었어요", explanation: "시간 부사(작년에) + 부사어(학원에) + 결과 서술어(다니게 되었어요) 순서입니다.", source_unit: 13 }
    ]
  },

  // Unit 14: 초급b 4과 (여행 경험 및 여행지 추천)
  {
    unit: 14,
    dialogues: [
      { unit: 14, dialogue_id: "d14-1", speaker: "메이", korean_text: "준호 씨, 한국에서 제주도에 가 본 적이 있어요?", translation: "Junho, have you ever been to Jeju Island in Korea?", audio_hint: "경험을 묻는 정중하고 호기심 어린 톤" },
      { unit: 14, dialogue_id: "d14-2", speaker: "준호", korean_text: "네, 작년 여름 휴가 때 친구들과 다녀온 적이 있어요.", translation: "Yes, I have been there with friends during summer vacation last year.", audio_hint: "과거 기억을 떠올리며 밝게 대답하는 어조" },
      { unit: 14, dialogue_id: "d14-3", speaker: "메이", korean_text: "제주도 바다가 그렇게 아름답다면서요? 저도 꼭 가 보고 싶어요.", translation: "I heard Jeju's ocean is so beautiful. I really want to go too.", audio_hint: "기대감과 설렘이 담긴 목소리" },
      { unit: 14, dialogue_id: "d14-4", speaker: "준호", korean_text: "서울 근처라면 남산타워나 한강공원도 가 볼 만해요.", translation: "If it's near Seoul, Namsan Tower or Han River Park are also worth visiting.", audio_hint: "친절하게 명소를 추천하는 톤" },
      { unit: 14, dialogue_id: "d14-5", speaker: "메이", korean_text: "남산타워에서는 서울 야경을 볼 수 있나요?", translation: "Can you see the Seoul night view from Namsan Tower?", audio_hint: "기대하며 묻는 의문문 어조" },
      { unit: 14, dialogue_id: "d14-6", speaker: "준호", korean_text: "네, 밤에 가면 야경이 정말 멋지니까 꼭 가 보세요.", translation: "Yes, if you go at night, the night view is truly magnificent, so be sure to go.", audio_hint: "자신 있게 권유하는 마무리 톤" }
    ],
    vocab: [
      { word: "경험", meaning: "직접 겪거나 해 봄 (Experience)", part_of_speech: "명사", example_sentence: "여행은 인생에 소중한 경험이에요.", level: "초급" },
      { word: "추천", meaning: "어떤 대상이 좋다고 권함 (Recommendation)", part_of_speech: "명사", example_sentence: "친구에게 맛있는 식당을 추천받았어요.", level: "초급" },
      { word: "야경", meaning: "밤의 경치나 풍경 (Night view)", part_of_speech: "명사", example_sentence: "남산에서 바라본 서울의 야경이 예뻐요.", level: "초급" },
      { word: "명소", meaning: "경치가 좋거나 유명한 곳 (Famous attraction / sight)", part_of_speech: "명사", example_sentence: "한국의 유명한 관광 명소를 방문했어요.", level: "초급" },
      { word: "휴가", meaning: "직장이나 학교를 쉬는 기간 (Vacation / leave)", part_of_speech: "명사", example_sentence: "여름 휴가 때 바다로 여행을 떠나요.", level: "초급" },
      { word: "다녀오다", meaning: "갔다가 다시 돌아오다 (To go and come back / visit)", part_of_speech: "동사", example_sentence: "고향에 잘 다녀왔습니다.", level: "초급" },
      { word: "바다", meaning: "지구 표면의 넓고 짠 물 (Sea / ocean)", part_of_speech: "명사", example_sentence: "여름에는 시원한 바다에서 수영해요.", level: "초급" },
      { word: "풍경", meaning: "자연이나 도시의 경치 (Scenery / landscape)", part_of_speech: "명사", example_sentence: "가을 산의 단풍 풍경이 아름다워요.", level: "초급" },
      { word: "기억나다", meaning: "지나간 일이 머릿속에 떠오르다 (To remember / come to mind)", part_of_speech: "동사", example_sentence: "그 여행지의 이름이 잘 기억나요.", level: "초급" },
      { word: "아름답다", meaning: "모양이나 경치가 훌륭하고 곱다 (To be beautiful)", part_of_speech: "형용사", example_sentence: "일몰 풍경이 참 아름답습니다.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)ㄴ 적이 있다/없다 (과거 경험)",
        explanation: "동사 어간 뒤에 붙어 과거에 어떤 동작이나 일을 겪은 경험의 유무를 나타냅니다.",
        example_sentences: ["제주도에 가 본 적이 있어요.", "김치를 먹어 본 적이 없어요."],
        related_vocab: ["가다", "먹다", "보다"]
      },
      {
        grammar_point: "-(으)ㄹ 만하다 (추천 및 가치)",
        explanation: "동사 뒤에 결합하여 그 일을 할 만한 가치가 있거나 충분히 추천할 만함을 나타냅니다.",
        example_sentences: ["남산도 가 볼 만해요.", "이 책은 읽을 만합니다."],
        related_vocab: ["가다", "읽다", "보다"]
      },
      {
        grammar_point: "-아/어 보다 (시도 및 경험)",
        explanation: "동사 뒤에 붙어 어떤 행동을 시험 삼아 해 보거나 시도함을 나타냅니다.",
        example_sentences: ["한국 음식을 먹어 보세요.", "제주도에 꼭 가 보세요."],
        related_vocab: ["먹다", "가다", "입다"]
      }
    ],
    quiz: [
      { quiz_id: "q14-1", type: "multiple_choice", question: "과거에 해 본 경험이 있음을 나타내는 올바른 표현은?", options: ["가 본 적이 있어요", "가 본 적이 갈래요", "가 볼 때가 있어요", "가 바람에 있어요"], answer: "가 본 적이 있어요", explanation: "과거 경험 유무는 '-(으)ㄴ 적이 있다/없다'로 나타냅니다.", source_unit: 14 },
      { quiz_id: "q14-2", type: "multiple_choice", question: "방문할 가치가 있음을 나타내는 추천 표현은?", options: ["가 볼 만해요", "가 버렸어요", "가 보도록 해요", "가는 바람이에요"], answer: "가 볼 만해요", explanation: "가치나 추천의 의미를 지닌 어미는 '-(으)ㄹ 만하다'입니다.", source_unit: 14 },
      { quiz_id: "q14-3", type: "multiple_choice", question: "동사 '먹다'에 과거 경험 부정을 결합한 알맞은 형태는?", options: ["먹은 적이 없어요", "먹는 적이 없어요", "먹을 적이 없어요", "먹어 적이 없어요"], answer: "먹은 적이 없어요", explanation: "'먹다'에 받침이 있으므로 '-은 적이 없다'가 붙어 '먹은 적이 없어요'가 됩니다.", source_unit: 14 },
      { quiz_id: "q14-4", type: "multiple_choice", question: "밤에 보는 아름다운 도시나 자연의 경치를 뜻하는 단어는?", options: ["야경", "일몰", "명소", "휴가"], answer: "야경", explanation: "밤의 경치나 풍경을 '야경(夜景)'이라고 합니다.", source_unit: 14 },
      { quiz_id: "q14-5", type: "multiple_choice", question: "상대방에게 시도를 권유할 때 쓰는 표현은?", options: ["한번 먹어 보세요.", "한번 먹은 적이 없어요.", "한번 먹는 바람에 가요.", "한번 먹다가 와요."], answer: "한번 먹어 보세요.", explanation: "시도나 체험을 권유할 때는 '-아/어 보세요'를 씁니다.", source_unit: 14 },
      { quiz_id: "q14-6", type: "fill_in_the_blank", question: "한국 영화를 극장에서 ___ 적이 있나요? (보다 + -(으)ㄴ)", answer: "본", explanation: "'보다'에 받침이 없으므로 '본 적이'가 됩니다.", source_unit: 14 },
      { quiz_id: "q14-7", type: "fill_in_the_blank", question: "이 소설은 아주 재미있어서 읽을 ___합니다. (만)", answer: "만", explanation: "추천 가치를 나타내는 표현은 '읽을 만합니다'입니다.", source_unit: 14 },
      { quiz_id: "q14-8", type: "fill_in_the_blank", question: "한복을 입___ 보세요. 참 잘 어울려요. (-어 보다)", answer: "어", explanation: "'입다'에 어미 '-어'가 결합하여 '입어 보세요'가 됩니다.", source_unit: 14 },
      { quiz_id: "q14-9", type: "fill_in_the_blank", question: "제주도는 한국의 대표적인 관광 ___입니다. (유명한 장소)", answer: "명소", explanation: "유명한 곳을 '명소(名所)'라고 합니다.", source_unit: 14 },
      { quiz_id: "q14-10", type: "fill_in_the_blank", question: "직접 겪은 소중한 ___을 이야기했어요. (경험)", answer: "경험", explanation: "자신이 겪은 일을 '경험'이라고 합니다.", source_unit: 14 },
      { quiz_id: "q14-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [적이 / 가 / 제주도에 / 있어요 / 본]", answer: "제주도에 가 본 적이 있어요", explanation: "장소(제주도에) + 경험구(가 본 적이) + 서술어(있어요) 어순입니다.", source_unit: 14 },
      { quiz_id: "q14-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [만해요 / 남산도 / 볼 / 가]", answer: "남산도 가 볼 만해요", explanation: "주제(남산도) + 추천 서술어(가 볼 만해요) 어순입니다.", source_unit: 14 },
      { quiz_id: "q14-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [정말 / 야경이 / 가면 / 멋져요 / 밤에]", answer: "밤에 가면 야경이 정말 멋져요", explanation: "조건절(밤에 가면) + 주어(야경이) + 부사(정말) + 서술어(멋져요) 순입니다.", source_unit: 14 }
    ]
  },

  // Unit 15: 초급b 5과 (기념일 제안 및 선물 의도)
  {
    unit: 15,
    dialogues: [
      { unit: 15, dialogue_id: "d15-1", speaker: "소라", korean_text: "진우 씨, 이번 주말이 친구 생일인데 무슨 선물이 좋을까요?", translation: "Jinwoo, this weekend is my friend's birthday. What gift would be good?", audio_hint: "고민하며 조언을 구하는 톤" },
      { unit: 15, dialogue_id: "d15-2", speaker: "진우", korean_text: "정성스럽게 편지를 쓰거나 케이크를 만들어 주는 건 어때요?", translation: "How about writing a heartfelt letter or making a cake for them?", audio_hint: "다정하고 따뜻하게 아이디어를 제안하는 어조" },
      { unit: 15, dialogue_id: "d15-3", speaker: "소라", korean_text: "와, 좋은 생각이에요! 진우 씨는 기념일에 주로 뭘 선물해요?", translation: "Wow, that's a great idea! What do you usually give as gifts on anniversaries, Jinwoo?", audio_hint: "감탄하며 되묻는 활기찬 톤" },
      { unit: 15, dialogue_id: "d15-4", speaker: "진우", korean_text: "저는 이번 100일 기념일에 여자친구한테 따뜻한 목도리를 선물하려고요.", translation: "For our upcoming 100th-day anniversary, I intend to give my girlfriend a warm scarf.", audio_hint: "수줍지만 기분 좋은 기대감을 담은 목소리" },
      { unit: 15, dialogue_id: "d15-5", speaker: "소라", korean_text: "겨울이라 정말 실용적이고 좋은 선물이 될 것 같아요.", translation: "Since it's winter, it will likely be a very practical and nice gift.", audio_hint: "칭찬과 맞장구치는 어조" },
      { unit: 15, dialogue_id: "d15-6", speaker: "진우", korean_text: "고마워요. 소라 씨도 친구 생일 파티 잘 준비하세요!", translation: "Thanks. Sora, you prepare well for your friend's party too!", audio_hint: "격려하는 밝은 마무리 톤" }
    ],
    vocab: [
      { word: "기념일", meaning: "특별한 일을 기억하는 날 (Anniversary)", part_of_speech: "명사", example_sentence: "결혼기념일을 축하했어요.", level: "초급" },
      { word: "선물", meaning: "남에게 감사나 축하의 뜻으로 주는 물건 (Gift / present)", part_of_speech: "명사", example_sentence: "생일 선물을 포장했어요.", level: "초급" },
      { word: "정성", meaning: "마음을 다하는 성의 (Heartfelt sincerity)", part_of_speech: "명사", example_sentence: "정성을 담아 편지를 썼습니다.", level: "초급" },
      { word: "목도리", meaning: "목을 감싸 추위를 막는 옷감 (Scarf / muffler)", part_of_speech: "명사", example_sentence: "추운 겨울에는 따뜻한 목도리를 둘러요.", level: "초급" },
      { word: "실용적", meaning: "실제 생활에 쓰임새가 좋은 (Practical)", part_of_speech: "관형사/명사", example_sentence: "텀블러는 아주 실용적인 선물이에요.", level: "초급" },
      { word: "축하하다", meaning: "좋은 일에 기쁜 마음을 표하다 (To congratulate / celebrate)", part_of_speech: "동사", example_sentence: "친구의 승진을 축하했습니다.", level: "초급" },
      { word: "준비하다", meaning: "미리 마련하여 갖추다 (To prepare)", part_of_speech: "동사", example_sentence: "파티 음식을 준비하고 있어요.", level: "초급" },
      { word: "편지", meaning: "소식이나 사연을 적은 글 (Letter)", part_of_speech: "명사", example_sentence: "부모님께 감사 편지를 보냈어요.", level: "초급" },
      { word: "포장하다", meaning: "물건을 싸다 (To wrap / pack)", part_of_speech: "동사", example_sentence: "선물을 예쁜 상자에 포장했어요.", level: "초급" },
      { word: "의도", meaning: "무엇을 하고자 하는 생각이나 계획 (Intention / plan)", part_of_speech: "명사", example_sentence: "좋은 의도로 한 행동이었어요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-거나 (선택 연결어미)",
        explanation: "동사나 형용사 어간에 붙어 둘 이상의 행동이나 상태 중에서 하나를 선택함을 나타냅니다. (명사 뒤에는 '(이)나')",
        example_sentences: ["편지를 쓰거나 케이크를 만들어요.", "주말에 영화를 보거나 운동을 해요."],
        related_vocab: ["쓰다", "만들다", "보다", "운동하다"]
      },
      {
        grammar_point: "-(으)려고 하다 / -(으)려고요 (의도 및 계획)",
        explanation: "동사 어간 뒤에 붙어 주어의 의도나 앞으로의 실행 계획을 나타냅니다. 구어체 종결형으로 '-(으)려고요'를 씁니다.",
        example_sentences: ["목도리를 선물하려고요.", "한국어를 열심히 배우려고 합니다."],
        related_vocab: ["선물하다", "배우다", "사다"]
      },
      {
        grammar_point: "-는 건 어때요? (제안 및 권유)",
        explanation: "상대방에게 어떤 행동을 부드럽게 제안하거나 의견을 물어볼 때 사용합니다.",
        example_sentences: ["함께 산책하는 건 어때요?", "꽃을 선물하는 건 어때요?"],
        related_vocab: ["산책하다", "선물하다", "만나다"]
      }
    ],
    quiz: [
      { quiz_id: "q15-1", type: "multiple_choice", question: "두 행동 중 하나를 선택하여 나열할 때 알맞은 연결어미는?", options: ["-거나", "-지만", "-는데", "-느라고"], answer: "-거나", explanation: "동작의 선택을 나타내는 어미는 '-거나'입니다.", source_unit: 15 },
      { quiz_id: "q15-2", type: "multiple_choice", question: "자신의 계획이나 의도를 나타내는 문장은?", options: ["친구에게 목도리를 선물하려고요.", "친구에게 목도리를 선물하는 바람에 늦었어요.", "친구에게 목도리를 선물하니까 좋아요.", "친구에게 목도리를 선물한 적이 없어요."], answer: "친구에게 목도리를 선물하려고요.", explanation: "의도와 계획을 나타내는 종결 표현은 '-(으)려고요'입니다.", source_unit: 15 },
      { quiz_id: "q15-3", type: "multiple_choice", question: "상대방에게 부드럽게 행동을 제안하는 문장으로 알맞은 것은?", options: ["케이크를 만들어 주는 건 어때요?", "케이크를 만들어 주는 바람에 그래요.", "케이크를 만들어 주어야만 해요.", "케이크를 만들어 주자마자 갔어요."], answer: "케이크를 만들어 주는 건 어때요?", explanation: "제안과 권유를 부드럽게 나타낼 때는 '-는 건 어때요?'를 사용합니다.", source_unit: 15 },
      { quiz_id: "q15-4", type: "multiple_choice", question: "특별히 기억하고 축하할 만한 날을 가리키는 단어는?", options: ["기념일", "일과", "출근일", "방학식"], answer: "기념일", explanation: "특별한 일을 기억하고 기념하는 날은 '기념일'입니다.", source_unit: 15 },
      { quiz_id: "q15-5", type: "multiple_choice", question: "'받침 없는 동사' 뒤에 결합하는 의도 표현 형태는?", options: ["-려고 하다", "-으려고 하다", "-느라고 하다", "-고자 하다만"], answer: "-려고 하다", explanation: "받침이 없거나 'ㄹ' 받침인 동사 뒤에는 '-려고 하다'가 결합합니다.", source_unit: 15 },
      { quiz_id: "q15-6", type: "fill_in_the_blank", question: "주말에는 책을 읽___ 영화를 봐요. (선택 -거나)", answer: "거나", explanation: "'읽다' 뒤에 선택 어미 '-거나'가 붙어 '읽거나'가 됩니다.", source_unit: 15 },
      { quiz_id: "q15-7", type: "fill_in_the_blank", question: "친구를 위해 케이크를 사___고 해요. (사다 + 의도)", answer: "려고", explanation: "'사다'는 받침이 없으므로 '-려고'가 결합하여 '사려고'가 됩니다.", source_unit: 15 },
      { quiz_id: "q15-8", type: "fill_in_the_blank", question: "마음을 다한 정___을 담아 선물을 준비했어요. (정성의 '성')", answer: "성", explanation: "'정성(精誠)'은 정성스러운 마음입니다.", source_unit: 15 },
      { quiz_id: "q15-9", type: "fill_in_the_blank", question: "오늘 저녁에 같이 외식하는 건 ___때요? (어)", answer: "어", explanation: "'어때요'의 첫 글자 '어'입니다.", source_unit: 15 },
      { quiz_id: "q15-10", type: "fill_in_the_blank", question: "겨울철 목을 따뜻하게 감싸는 방한용품은 ___도리입니다. (목)", answer: "목", explanation: "목에 두르는 직물은 '목도리'입니다.", source_unit: 15 },
      { quiz_id: "q15-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [선물하려고요 / 목도리를 / 친구한테 / 따뜻한]", answer: "친구한테 따뜻한 목도리를 선물하려고요", explanation: "수여 대상(친구한테) + 수식 관형어(따뜻한) + 목적어(목도리를) + 서술어(선물하려고요) 순서입니다.", source_unit: 15 },
      { quiz_id: "q15-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [편지를 / 어때요 / 쓰는 / 건]", answer: "편지를 쓰는 건 어때요", explanation: "목적어(편지를) + 제안 표현(쓰는 건 어때요) 어순입니다.", source_unit: 15 },
      { quiz_id: "q15-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [만들거나 / 음식을 / 사 먹어요]", answer: "음식을 만들거나 사 먹어요", explanation: "목적어(음식을) + 선택 동사(만들거나) + 서술어(사 먹어요) 순서입니다.", source_unit: 15 }
    ]
  },

  // Unit 16: 초급b 6과 (외모 묘사 및 옷차림)
  {
    unit: 16,
    dialogues: [
      { unit: 16, dialogue_id: "d16-1", speaker: "나래", korean_text: "저기 키가 크고 안경을 쓴 사람이 지민 씨 동생이에요?", translation: "Is that tall person wearing glasses your younger brother, Jimin?", audio_hint: "대상을 손으로 가리키며 묻는 자연스러운 톤" },
      { unit: 16, dialogue_id: "d16-2", speaker: "지민", korean_text: "아니요, 제 동생은 머리가 길고 빨간색 모자를 쓰고 있어요.", translation: "No, my younger sister has long hair and is wearing a red hat.", audio_hint: "차분하게 외모 특징을 정정해 주는 어조" },
      { unit: 16, dialogue_id: "d16-3", speaker: "나래", korean_text: "아, 청바지를 입고 흰 운동화를 신은 분이군요!", translation: "Ah, the person wearing blue jeans and white sneakers!", audio_hint: "알아차리고 반가워하는 억양" },
      { unit: 16, dialogue_id: "d16-4", speaker: "지민", korean_text: "맞아요. 제 동생은 항상 밝은 옷을 입는 걸 좋아해요.", translation: "That's right. My sister always likes wearing bright clothes.", audio_hint: "동생을 자랑스러워하는 다정한 어조" },
      { unit: 16, dialogue_id: "d16-5", speaker: "나래", korean_text: "스타일이 참 멋있고 세련되었네요.", translation: "Her style is really cool and stylish.", audio_hint: "진심 어린 칭찬 톤" },
      { unit: 16, dialogue_id: "d16-6", speaker: "지민", korean_text: "고마워요. 얼른 가서 인사 나눠요.", translation: "Thank you. Let's go over quickly and say hello.", audio_hint: "이동을 재촉하는 밝은 목소리" }
    ],
    vocab: [
      { word: "외모", meaning: "겉으로 드러난 사람의 얼굴이나 몸 모습 (Appearance)", part_of_speech: "명사", example_sentence: "외모보다 따뜻한 마음이 더 중요해요.", level: "초급" },
      { word: "옷차림", meaning: "옷을 입은 맵시나 모양 (Outfit / attire)", part_of_speech: "명사", example_sentence: "단정한 옷차림으로 면접을 보았습니다.", level: "초급" },
      { word: "안경", meaning: "시력을 보정하거나 눈을 보호하는 도구 (Glasses)", part_of_speech: "명사", example_sentence: "안경을 쓰면 글씨가 잘 보여요.", level: "초급" },
      { word: "모자", meaning: "머리에 쓰는 물건 (Hat / cap)", part_of_speech: "명사", example_sentence: "햇빛이 강해서 모자를 썼어요.", level: "초급" },
      { word: "청바지", meaning: "푸른색 데님 바지 (Blue jeans)", part_of_speech: "명사", example_sentence: "청바지에 흰 티셔츠를 입었어요.", level: "초급" },
      { word: "운동화", meaning: "운동할 때 신는 편한 신발 (Sneakers / sports shoes)", part_of_speech: "명사", example_sentence: "새 운동화를 신고 산책했어요.", level: "초급" },
      { word: "쓰다", meaning: "모자나 안경을 착용하다 (To wear - hat/glasses)", part_of_speech: "동사", example_sentence: "선글라스를 쓰고 외출했어요.", level: "초급" },
      { word: "신다", meaning: "신발이나 양말을 발에 걸치다 (To wear - shoes/socks)", part_of_speech: "동사", example_sentence: "양말을 먼저 신으세요.", level: "초급" },
      { word: "끼다", meaning: "반지나 장갑을 손에 끼우다 (To wear - gloves/ring)", part_of_speech: "동사", example_sentence: "추워서 따뜻한 장갑을 꼈어요.", level: "초급" },
      { word: "세련되다", meaning: "모습이나 태도가 세련되고 멋지다 (To be stylish / refined)", part_of_speech: "형용사", example_sentence: "옷차림이 아주 세련되었네요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "관형사형 어미 (-(으)ㄴ/는 N)",
        explanation: "동사나 형용사 뒤에 붙어 뒤에 오는 명사를 수식합니다. (형용사 현재: -(으)ㄴ, 동사 현재: -는, 동사 과거: -(으)ㄴ)",
        example_sentences: ["키가 큰 사람", "모자를 쓴 사람", "길을 걷는 친구"],
        related_vocab: ["크다", "쓰다", "걷다"]
      },
      {
        grammar_point: "착용 동사의 -고 있다 (상태 지속)",
        explanation: "옷, 모자, 신발 등을 착용하여 그 착용 상태가 현재 그대로 유지되고 있음을 나타냅니다.",
        example_sentences: ["모자를 쓰고 있어요.", "청바지를 입고 있어요.", "운동화를 신고 있어요."],
        related_vocab: ["입다", "쓰다", "신다", "끼다"]
      },
      {
        grammar_point: "착용 어휘별 동사 구분 (입다/쓰다/신다/끼다/차다/매다)",
        explanation: "한국어에서는 신체 부위 및 착용물에 따라 각기 다른 착용 동사를 씁니다. (옷→입다, 모자/안경→쓰다, 신발/양말→신다, 장갑/반지→끼다, 시계→차다, 넥타이/가방→매다)",
        example_sentences: ["장갑을 껴요.", "시계를 차요.", "가방을 매요."],
        related_vocab: ["장갑", "시계", "가방", "넥타이"]
      }
    ],
    quiz: [
      { quiz_id: "q16-1", type: "multiple_choice", question: "'안경'을 착용할 때 쓰는 알맞은 동사는?", options: ["쓰다", "입다", "신다", "끼다"], answer: "쓰다", explanation: "안경이나 모자를 머리나 얼굴에 걸칠 때는 '쓰다'를 씁니다.", source_unit: 16 },
      { quiz_id: "q16-2", type: "multiple_choice", question: "'양말'이나 '신발'을 착용할 때 쓰는 동사는?", options: ["신다", "입다", "쓰다", "매다"], answer: "신다", explanation: "발에 착용하는 신발, 양말 등에는 '신다'를 씁니다.", source_unit: 16 },
      { quiz_id: "q16-3", type: "multiple_choice", question: "형용사 '크다'가 명사 '사람'을 수식할 때 올바른 형태는?", options: ["키가 큰 사람", "키가 크는 사람", "키가 클 사람", "키가 큽 사람"], answer: "키가 큰 사람", explanation: "형용사 '크다'는 받침이 없으므로 '-(으)ㄴ'이 결합하여 '큰'이 됩니다.", source_unit: 16 },
      { quiz_id: "q16-4", type: "multiple_choice", question: "착용 상태의 지속을 나타내는 문장으로 알맞은 것은?", options: ["빨간 모자를 쓰고 있어요.", "빨간 모자를 쓰려고 해요.", "빨간 모자를 쓰니까 좋아요.", "빨간 모자를 쓰는 바람에 늦었어요."], answer: "빨간 모자를 쓰고 있어요.", explanation: "착용물이 몸에 유지된 상태를 나타낼 때는 '착용동사 + -고 있다'를 씁니다.", source_unit: 16 },
      { quiz_id: "q16-5", type: "multiple_choice", question: "'손가락에 반지'를 착용할 때 올바른 동사는?", options: ["끼다", "입다", "신다", "쓰다"], answer: "끼다", explanation: "반지나 장갑 등 틈 사이에 끼우는 착용물에는 '끼다'를 사용합니다.", source_unit: 16 },
      { quiz_id: "q16-6", type: "fill_in_the_blank", question: "추운 날씨에는 손에 따뜻한 장갑을 ___세요. (끼다)", answer: "끼", explanation: "'끼다'의 어간 '끼-'에 '-세요'가 붙어 '끼세요'가 됩니다.", source_unit: 16 },
      { quiz_id: "q16-7", type: "fill_in_the_blank", question: "저기 흰색 운동화를 ___고 있는 사람이 민호예요. (신다)", answer: "신", explanation: "'신다'의 어간 '신-' 뒤에 '-고 있다'가 붙어 '신고'가 됩니다.", source_unit: 16 },
      { quiz_id: "q16-8", type: "fill_in_the_blank", question: "머리가 ___은 사람이 제 친구예요. (형용사 '길다'의 관형사형)", answer: "길", explanation: "'길다'의 'ㄹ'이 탈락하고 'ㄴ'이 붙어 '긴'이 됩니다. (머리가 긴 사람)", source_unit: 16 },
      { quiz_id: "q16-9", type: "fill_in_the_blank", question: "정장에 어울리는 넥타이를 ___었어요. (매다)", answer: "맸", explanation: "목에 둘러 묶는 넥타이나 가방은 '매다'(과거형 '맸어요')를 씁니다.", source_unit: 16 },
      { quiz_id: "q16-10", type: "fill_in_the_blank", question: "사람의 겉모습이나 얼굴 생김새를 ___모라고 합니다. (외)", answer: "외", explanation: "겉모습을 뜻하는 한자어는 '외모(外貌)'입니다.", source_unit: 16 },
      { quiz_id: "q16-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [모자를 / 쓰고 / 빨간색 / 있어요]", answer: "빨간색 모자를 쓰고 있어요", explanation: "목적어(빨간색 모자를) + 착용 지속 서술어(쓰고 있어요) 순서입니다.", source_unit: 16 },
      { quiz_id: "q16-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [사람이 / 동생이에요 / 안경을 / 쓴]", answer: "안경을 쓴 사람이 동생이에요", explanation: "수식 명사구(안경을 쓴 사람이) + 서술어(동생이에요) 어순입니다.", source_unit: 16 },
      { quiz_id: "q16-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [입고 / 청바지를 / 신었어요 / 운동화를]", answer: "청바지를 입고 운동화를 신었어요", explanation: "의복 착용(청바지를 입고) + 신발 착용(운동화를 신었어요) 순서입니다.", source_unit: 16 }
    ]
  },

  // Unit 17: 초급b 7과 (날씨 소감 및 야외 활동 주의)
  {
    unit: 17,
    dialogues: [
      { unit: 17, dialogue_id: "d17-1", speaker: "태민", korean_text: "오늘 등산 가기로 했는데 날씨가 참 춥네요.", translation: "We decided to go hiking today, but the weather is really cold.", audio_hint: "몸을 웅크리며 날씨를 체감하는 어조" },
      { unit: 17, dialogue_id: "d17-2", speaker: "은지", korean_text: "날씨가 춥기는 한데 공기가 맑아서 기분은 좋아요.", translation: "It is cold indeed, but the air is clear, so I feel good.", audio_hint: "추위를 인정하면서도 상쾌함을 표현하는 톤" },
      { unit: 17, dialogue_id: "d17-3", speaker: "태민", korean_text: "그래도 정상에 가면 바람이 세니까 너무 무리하지 마세요.", translation: "Still, since the wind is strong at the summit, please don't overexert yourself.", audio_hint: "상대방을 걱정하며 조언하는 따뜻한 어조" },
      { unit: 17, dialogue_id: "d17-4", speaker: "은지", korean_text: "네, 따뜻한 차도 챙겨 왔으니 천천히 올라가요.", translation: "Yes, I brought warm tea as well, so let's go up slowly.", audio_hint: "안심시키며 힘을 북돋우는 톤" },
      { unit: 17, dialogue_id: "d17-5", speaker: "태민", korean_text: "길이 미끄러우니까 조심해서 걸으세요.", translation: "Because the path is slippery, please walk carefully.", audio_hint: "주의를 당부하는 차분한 목소리" },
      { unit: 17, dialogue_id: "d17-6", speaker: "은지", korean_text: "네, 고마워요. 태민 씨도 조심하세요!", translation: "Yes, thank you. Taemin, you be careful too!", audio_hint: "밝게 화답하는 마무리 어조" }
    ],
    vocab: [
      { word: "등산", meaning: "산을 오르는 운동이나 활동 (Hiking / mountain climbing)", part_of_speech: "명사", example_sentence: "가을에 단풍 구경 겸 등산을 갔어요.", level: "초급" },
      { word: "정상", meaning: "산의 가장 높은 꼭대기 (Summit / peak)", part_of_speech: "명사", example_sentence: "산 정상에서 멋진 사진을 찍었습니다.", level: "초급" },
      { word: "공기", meaning: "지구를 둘러싼 대기 (Air)", part_of_speech: "명사", example_sentence: "숲속에 오니 공기가 아주 상쾌해요.", level: "초급" },
      { word: "바람", meaning: "공기의 움직임 (Wind)", part_of_speech: "명사", example_sentence: "시원한 바람이 솔솔 불어요.", level: "초급" },
      { word: "미끄럽다", meaning: "표면이 미끄러워 넘어지기 쉽다 (To be slippery)", part_of_speech: "형용사", example_sentence: "눈 온 뒤에는 길이 미끄러우니 조심하세요.", level: "초급" },
      { word: "조심하다", meaning: "탈이 나지 않도록 마음을 쓰다 (To be careful)", part_of_speech: "동사", example_sentence: "차를 조심해서 운전하세요.", level: "초급" },
      { word: "무리하다", meaning: "힘에 벅찬 일을 억지로 하다 (To overdo / overexert)", part_of_speech: "동사/형용사", example_sentence: "아플 때는 무리하지 말고 쉬어야 해요.", level: "초급" },
      { word: "올라가다", meaning: "낮은 곳에서 높은 곳으로 가다 (To go up / climb)", part_of_speech: "동사", example_sentence: "계단을 천천히 올라갔어요.", level: "초급" },
      { word: "상쾌하다", meaning: "기분이나 느낌이 맑고 시원하다 (To be refreshing)", part_of_speech: "형용사", example_sentence: "아침 산책을 하니 기분이 상쾌해요.", level: "초급" },
      { word: "챙기다", meaning: "필요한 물건을 챙겨 가지다 (To pack / take care of)", part_of_speech: "동사", example_sentence: "외출할 때 지갑과 우산을 챙기세요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-기는 하다 (부분 인정 및 대조)",
        explanation: "앞 절의 사실을 일단 인정하면서도 뒤 절에서 다른 생각이나 반대되는 측면을 덧붙일 때 씁니다.",
        example_sentences: ["춥기는 한데 공기가 맑아요.", "비싸기는 한데 품질이 좋아요."],
        related_vocab: ["춥다", "비싸다", "좋다"]
      },
      {
        grammar_point: "-(으)니까 (이유 및 근거)",
        explanation: "앞 절이 뒤 절의 이유나 판단의 근거가 됨을 나타냅니다. 주로 명령문이나 청유문과 잘 결합합니다.",
        example_sentences: ["바람이 세니까 조심하세요.", "시간이 없으니까 서두릅시다."],
        related_vocab: ["세다", "없다", "조심하다"]
      },
      {
        grammar_point: "-지 마세요 (금지 명령)",
        explanation: "동사 어간 뒤에 붙어 상대방에게 어떤 행동을 하지 말도록 정중하게 요구하거나 금지합니다.",
        example_sentences: ["무리하지 마세요.", "길에서 뛰지 마세요."],
        related_vocab: ["무리하다", "뛰다", "포기하다"]
      }
    ],
    quiz: [
      { quiz_id: "q17-1", type: "multiple_choice", question: "앞의 사실을 인정하면서 다른 점을 말할 때 쓰는 연결 표현은?", options: ["춥기는 한데", "추운 바람에", "추우려고", "추운 탓인지"], answer: "춥기는 한데", explanation: "일부 사실을 인정하고 대조할 때는 '-기는 하다'를 씁니다.", source_unit: 17 },
      { quiz_id: "q17-2", type: "multiple_choice", question: "명령문에서 이유를 나타낼 때 결합하는 어미는?", options: ["-(으)니까", "-아서/어서", "-는데", "-느라고"], answer: "-(으)니까", explanation: "명령문(-으세요)이나 청유문(-ㅂ시다)의 이유에는 '-(으)니까'를 사용합니다.", source_unit: 17 },
      { quiz_id: "q17-3", type: "multiple_choice", question: "상대방에게 행동을 금지할 때 쓰는 정중한 표현은?", options: ["무리하지 마세요", "무리하게 하세요", "무리하지 않으세요", "무리할 수 없어요"], answer: "무리하지 마세요", explanation: "금지 명령형 어미는 '-지 마세요'입니다.", source_unit: 17 },
      { quiz_id: "q17-4", type: "multiple_choice", question: "형용사 '미끄럽다' 뒤에 '-(으)니까'가 결합한 올바른 형태는?", options: ["미끄러우니까", "미끄럽으니까", "미끄럽니까", "미끄러니까"], answer: "미끄러우니까", explanation: "'ㅂ' 불규칙 형용사 '미끄럽다'는 모음 앞에서 '우'로 바뀌어 '미끄러우니까'가 됩니다.", source_unit: 17 },
      { quiz_id: "q17-5", type: "multiple_choice", question: "산의 가장 높은 꼭대기를 가리키는 명사는?", options: ["정상", "등산로", "휴게소", "입구"], answer: "정상", explanation: "산의 가장 높은 곳을 '정상(頂上)'이라고 합니다.", source_unit: 17 },
      { quiz_id: "q17-6", type: "fill_in_the_blank", question: "비가 오___ 우산을 가지고 가세요. (이유 -(으)니까)", answer: "니까", explanation: "'오다'에 받침이 없으므로 '-니까'가 붙어 '오니까'가 됩니다.", source_unit: 17 },
      { quiz_id: "q17-7", type: "fill_in_the_blank", question: "몸이 아플 때는 절대 무리하___ 마세요. (-지)", answer: "지", explanation: "금지 표현 '-지 마세요'의 연결 형태는 '무리하지'입니다.", source_unit: 17 },
      { quiz_id: "q17-8", type: "fill_in_the_blank", question: "맛있___ 한데 가격이 좀 비싸요. (-기는)", answer: "기는", explanation: "'맛있다' 뒤에 부분 인정을 나타내는 '-기는 한데'가 붙습니다.", source_unit: 17 },
      { quiz_id: "q17-9", type: "fill_in_the_blank", question: "숲속의 맑은 공___를 마시며 걸었어요. (공기의 '기')", answer: "기", explanation: "'공기(空氣)'는 호흡하는 대기를 뜻합니다.", source_unit: 17 },
      { quiz_id: "q17-10", type: "fill_in_the_blank", question: "넘어지지 않도록 조___해서 걸으세요. (조심)", answer: "심", explanation: "'조심(操心)'은 주의하는 마음가짐입니다.", source_unit: 17 },
      { quiz_id: "q17-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [마세요 / 무리하지 / 너무 / 몸이 아프니까]", answer: "몸이 아프니까 너무 무리하지 마세요", explanation: "이유절(몸이 아프니까) + 부사(너무) + 금지 서술어(무리하지 마세요) 순서입니다.", source_unit: 17 },
      { quiz_id: "q17-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [춥기는 / 기분은 / 한데 / 날씨가 / 좋아요]", answer: "날씨가 춥기는 한데 기분은 좋아요", explanation: "주어(날씨가) + 부분인정(춥기는 한데) + 대조서술(기분은 좋아요) 어순입니다.", source_unit: 17 },
      { quiz_id: "q17-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [걸으세요 / 미끄러우니까 / 조심해서 / 길이]", answer: "길이 미끄러우니까 조심해서 걸으세요", explanation: "이유절(길이 미끄러우니까) + 부사(조심해서) + 명령서술(걸으세요) 순입니다.", source_unit: 17 }
    ]
  },

  // Unit 18: 초급b 8과 (도움 제공 및 부탁)
  {
    unit: 18,
    dialogues: [
      { unit: 18, dialogue_id: "d18-1", speaker: "동현", korean_text: "선배님, 짐이 정말 많으시네요. 제가 좀 들어 드릴게요.", translation: "Senior, you have so much luggage. I will carry it for you.", audio_hint: "적극적으로 도움을 자청하는 친절한 톤" },
      { unit: 18, dialogue_id: "d18-2", speaker: "유라", korean_text: "고마워요, 동현 씨! 혼자 들기 무거웠는데 정말 든든하네요.", translation: "Thank you, Donghyun! It was too heavy to carry alone, so this is really reassuring.", audio_hint: "고마움을 진심으로 전하는 밝은 어조" },
      { unit: 18, dialogue_id: "d18-3", speaker: "동현", korean_text: "제가 차까지 옮겨 드릴 테니까 선배님은 먼저 가서 문을 열어 주세요.", translation: "I will move it to the car for you, so please go ahead and open the door.", audio_hint: "자신 있게 제안하며 역할을 나누는 톤" },
      { unit: 18, dialogue_id: "d18-4", speaker: "유라", korean_text: "네, 알겠어요. 참, 다음 주에 출장 다녀오는 동안 제 화분에 물 좀 줄 수 있어요?", translation: "Yes, got it. By the way, while I'm away on a business trip next week, could you water my plant?", audio_hint: "조심스럽고 정중하게 부탁하는 목소리" },
      { unit: 18, dialogue_id: "d18-5", speaker: "동현", korean_text: "그럼요! 걱정하지 마시고 편하게 다녀오세요. 제가 잘 돌볼게요.", translation: "Of course! Don't worry and have a comfortable trip. I'll take good care of it.", audio_hint: "흔쾌히 승낙하는 든든한 톤" },
      { unit: 18, dialogue_id: "d18-6", speaker: "유라", korean_text: "항상 도와줘서 정말 고마워요. 출장 다녀와서 맛있는 밥 살게요!", translation: "Thank you so much for always helping. I'll buy you a delicious meal after my trip!", audio_hint: "감사와 보답을 약속하는 훈훈한 마무리" }
    ],
    vocab: [
      { word: "짐", meaning: "옮기기 위해 싼 물건 (Luggage / baggage)", part_of_speech: "명사", example_sentence: "무거운 짐을 차에 실었어요.", level: "초급" },
      { word: "부탁", meaning: "어떤 일을 해 달라고 청함 (Favor / request)", part_of_speech: "명사", example_sentence: "어려운 부탁을 흔쾌히 들어주셨어요.", level: "초급" },
      { word: "출장", meaning: "업무를 위해 다른 곳으로 감 (Business trip)", part_of_speech: "명사", example_sentence: "부산으로 2박 3일 출장을 가요.", level: "초급" },
      { word: "화분", meaning: "식물을 심어 가꾸는 그릇 (Flowerpot / potted plant)", part_of_speech: "명사", example_sentence: "베란다에 예쁜 화분을 놓았어요.", level: "초급" },
      { word: "돌보다", meaning: "보살피거나 가꾸다 (To take care of / look after)", part_of_speech: "동사", example_sentence: "이웃집 강아지를 하루 동안 돌보았어요.", level: "초급" },
      { word: "든든하다", meaning: "믿음직하여 마음이 놓이다 (To be reassuring / reliable)", part_of_speech: "형용사", example_sentence: "친구들이 곁에 있어서 정말 든든해요.", level: "초급" },
      { word: "옮기다", meaning: "위치를 다른 곳으로 바꾸다 (To move / transfer)", part_of_speech: "동사", example_sentence: "책상을 거실로 옮겼습니다.", level: "초급" },
      { word: "도움", meaning: "남에게 보탬이 되는 일 (Help / assistance)", part_of_speech: "명사", example_sentence: "많은 분의 도움으로 행사를 마쳤어요.", level: "초급" },
      { word: "승낙하다", meaning: "청이나 요구를 흔쾌히 받아들이다 (To accept / agree)", part_of_speech: "동사", example_sentence: "부탁을 기꺼이 승낙했습니다.", level: "초급" },
      { word: "무겁다", meaning: "무게가 많이 나가다 (To be heavy)", part_of_speech: "형용사", example_sentence: "가방이 너무 무거워서 어깨가 아파요.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-아/어 드릴게요 (공손한 도움 제공)",
        explanation: "말하는 사람이 웃어른이나 상대방을 위해 어떤 행동을 해 줄 의지를 공손하게 나타냅니다. ('-아/어 줄게요'의 높임 표현)",
        example_sentences: ["제가 짐을 들어 드릴게요.", "길을 안내해 드릴게요."],
        related_vocab: ["들다", "안내하다", "도와주다"]
      },
      {
        grammar_point: "-(으)ㄹ 테니까 (조건 및 의지 제시)",
        explanation: "앞 절에서 화자의 강한 의지나 추측을 전제로 제시하며 뒤 절에서 청자에게 행동을 요구하거나 제안합니다.",
        example_sentences: ["제가 옮겨 드릴 테니까 먼저 가세요.", "곧 도착할 테니까 기다려 주세요."],
        related_vocab: ["옮기다", "도착하다", "기다리다"]
      },
      {
        grammar_point: "-는 동안(에) (시간적 지속)",
        explanation: "어떤 행위나 상태가 계속 진행되는 기간이나 시간을 나타냅니다. 명사 뒤에는 '동안'이 결합합니다.",
        example_sentences: ["출장 다녀오는 동안 화분에 물을 주세요.", "방학 동안 여행을 했어요."],
        related_vocab: ["다녀오다", "방학", "수업"]
      }
    ],
    quiz: [
      { quiz_id: "q18-1", type: "multiple_choice", question: "상대방을 위해 공손하게 짐을 들어주겠다고 말할 때 알맞은 표현은?", options: ["제가 들어 드릴게요", "제가 드려 줄게요", "제가 들게 하세요", "제가 들기를 바래요"], answer: "제가 들어 드릴게요", explanation: "남을 위한 행동 제공의 공손한 종결 표현은 '-아/어 드릴게요'입니다.", source_unit: 18 },
      { quiz_id: "q18-2", type: "multiple_choice", question: "자신의 의지를 전제로 상대방에게 역할을 부탁할 때 쓰는 연결어미는?", options: ["-(으)ㄹ 테니까", "-(으)려고", "-는 바람에", "-기는 하지만"], answer: "-(으)ㄹ 테니까", explanation: "화자의 의지를 제시하고 청자에게 행동을 권유할 때는 '-(으)ㄹ 테니까'를 씁니다.", source_unit: 18 },
      { quiz_id: "q18-3", type: "multiple_choice", question: "기간이나 시간의 지속을 나타내는 표현은?", options: ["-는 동안", "-는 길에", "-는 탓에", "-는 법이다"], answer: "-는 동안", explanation: "행동이 지속되는 시간적 구간을 표현할 때는 '-는 동안(에)'을 씁니다.", source_unit: 18 },
      { quiz_id: "q18-4", type: "multiple_choice", question: "업무상 다른 지역이나 나라로 출장을 가는 것을 뜻하는 단어는?", options: ["출장", "퇴근", "등교", "외식"], answer: "출장", explanation: "회사의 일이나 공무로 다른 곳에 다녀오는 것을 '출장(出張)'이라고 합니다.", source_unit: 18 },
      { quiz_id: "q18-5", type: "multiple_choice", question: "다음 중 '돕다'의 공손한 도움 제공 형태는?", options: ["도와 드릴게요", "돕아 줄게요", "도와 줄게요", "도와 받으세요"], answer: "도와 드릴게요", explanation: "'돕다'는 'ㅂ' 불규칙 동사로 '도와 드릴게요'로 활용합니다.", source_unit: 18 },
      { quiz_id: "q18-6", type: "fill_in_the_blank", question: "제가 커피를 사 ___ 테니까 맛있게 드세요. (-(으)ㄹ 테니까)", answer: "올", explanation: "'사 오다'에 받침이 없으므로 '-ㄹ 테니까'가 붙어 '사 올 테니까'가 됩니다.", source_unit: 18 },
      { quiz_id: "q18-7", type: "fill_in_the_blank", question: "방학 하___ 동안 고향에 다녀올 계획이에요. (-는)", answer: "는", explanation: "'하다' 뒤에 기간을 나타내는 관형사형 어미 '-는'이 붙습니다.", source_unit: 18 },
      { quiz_id: "q18-8", type: "fill_in_the_blank", question: "어르신께 자리를 양보해 ___렸습니다. (드리다 과거형)", answer: "드", explanation: "'양보해 드렸습니다'의 '드'입니다.", source_unit: 18 },
      { quiz_id: "q18-9", type: "fill_in_the_blank", question: "남에게 어떤 일을 청하는 일을 ___탁이라고 합니다. (부)", answer: "부", explanation: "'부탁(付託)'은 남에게 청하는 일입니다.", source_unit: 18 },
      { quiz_id: "q18-10", type: "fill_in_the_blank", question: "식물을 심어 실내에 놓는 그릇은 ___분입니다. (화)", answer: "화", explanation: "꽃이나 화초를 심는 통을 '화분(花盆)'이라고 합니다.", source_unit: 18 },
      { quiz_id: "q18-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [제가 / 무거운 / 드릴게요 / 짐을 / 들어]", answer: "제가 무거운 짐을 들어 드릴게요", explanation: "주어(제가) + 목적어(무거운 짐을) + 서술어(들어 드릴게요) 순서입니다.", source_unit: 18 },
      { quiz_id: "q18-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [물을 / 화분에 / 다녀오는 / 동안 / 주세요]", answer: "다녀오는 동안 화분에 물을 주세요", explanation: "시간 부사절(다녀오는 동안) + 부사어(화분에) + 목적어(물을) + 서술어(주세요) 순입니다.", source_unit: 18 },
      { quiz_id: "q18-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [열어 / 문을 / 테니까 / 먼저 / 주세요 / 갈]", answer: "먼저 갈 테니까 문을 열어 주세요", explanation: "의지 제시(먼저 갈 테니까) + 요구(문을 열어 주세요) 순서입니다.", source_unit: 18 }
    ]
  },

  // Unit 19: 초급b 9과 (신체 증상 및 병원 안내)
  {
    unit: 19,
    dialogues: [
      { unit: 19, dialogue_id: "d19-1", speaker: "하은", korean_text: "민재 씨, 얼굴이 많이 안 좋아 보여요. 어디 아파요?", translation: "Minjae, you don't look well at all. Are you sick somewhere?", audio_hint: "걱정스러운 눈빛과 차분한 염려 톤" },
      { unit: 19, dialogue_id: "d19-2", speaker: "민재", korean_text: "아침부터 열이 나고 머리가 좀 아픈 것 같아요.", translation: "I've had a fever since morning, and I think I have a slight headache.", audio_hint: "기운 없고 힘없는 목소리" },
      { unit: 19, dialogue_id: "d19-3", speaker: "하은", korean_text: "감기에 걸린 모양이네요. 약은 먹었어요?", translation: "It looks like you caught a cold. Did you take medicine?", audio_hint: "상태를 살피며 묻는 어조" },
      { unit: 19, dialogue_id: "d19-4", speaker: "민재", korean_text: "아직 안 먹었어요. 병원에 가 봐야 할 것 같아요.", translation: "I haven't taken any yet. I think I need to go to the hospital.", audio_hint: "피곤하지만 판단을 내리는 톤" },
      { unit: 19, dialogue_id: "d19-5", speaker: "하은", korean_text: "회사 근처에 이비인후과가 있어요. 제가 진료 예약해 줄 테니까 거기에 가 보세요.", translation: "There is an ENT clinic near our company. I will book an appointment for you, so try going there.", audio_hint: "신속하게 도움을 주는 친절한 어조" },
      { unit: 19, dialogue_id: "d19-6", speaker: "민재", korean_text: "신경 써 줘서 정말 고마워요. 얼른 다녀올게요.", translation: "Thank you so much for taking care of me. I'll be back quickly.", audio_hint: "고마움을 표하는 감사 톤" }
    ],
    vocab: [
      { word: "증상", meaning: "병을 앓을 때 나타나는 신체적 변화 (Symptom)", part_of_speech: "명사", example_sentence: "초기 감기 증상으로 목이 따끔거려요.", level: "초급" },
      { word: "열", meaning: "몸에서 나는 높은 온도 (Fever / heat)", part_of_speech: "명사", example_sentence: "체온계로 열을 쟀더니 38도였어요.", level: "초급" },
      { word: "두통", meaning: "머리가 아픈 증세 (Headache)", part_of_speech: "명사", example_sentence: "심한 두통 때문에 잠을 못 잤어요.", level: "초급" },
      { word: "감기", meaning: "호흡기에 바이러스가 침투해 걸리는 병 (Cold / flu)", part_of_speech: "명사", example_sentence: "겨울철에 감기에 걸리지 않도록 조심하세요.", level: "초급" },
      { word: "이비인후과", meaning: "귀, 코, 목을 진료하는 병원 (ENT Clinic)", part_of_speech: "명사", example_sentence: "목이 아파서 이비인후과에 갔어요.", level: "초급" },
      { word: "내과", meaning: "수술 없이 약물로 치료하는 병원 (Internal medicine)", part_of_speech: "명사", example_sentence: "배가 아파서 내과에서 진료를 받았어요.", level: "초급" },
      { word: "처방전", meaning: "의사가 약국에 약 조제를 지시하는 서류 (Prescription)", part_of_speech: "명사", example_sentence: "처방전을 약국에 내고 약을 샀어요.", level: "초급" },
      { word: "진료", meaning: "의사가 환자를 진찰하고 치료함 (Medical consultation / treatment)", part_of_speech: "명사", example_sentence: "오전 9시부터 진료가 시작됩니다.", level: "초급" },
      { word: "예약", meaning: "미리 시간을 정해 약속함 (Appointment / reservation)", part_of_speech: "명사", example_sentence: "병원 진료 예약을 변경했어요.", level: "초급" },
      { word: "안정", meaning: "몸과 마음이 편안하게 가라앉음 (Stability / rest)", part_of_speech: "명사", example_sentence: "환자는 충분한 휴식과 안정이 필요합니다.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)ㄴ/는 것 같다 (조심스러운 추측 및 판단)",
        explanation: "자신의 생각이나 상황을 단정 짓지 않고 부드럽고 완곡하게 추측하여 말할 때 씁니다. (형용사/과거동사: -(으)ㄴ 것 같다, 동사 현재: -는 것 같다)",
        example_sentences: ["머리가 아픈 것 같아요.", "열이 나는 것 같아요."],
        related_vocab: ["아프다", "나다", "오다"]
      },
      {
        grammar_point: "-아/어 보다 (경험 권유 및 시도)",
        explanation: "어떤 일을 시도하거나 실천해 볼 것을 상대방에게 부드럽게 권유할 때 씁니다.",
        example_sentences: ["병원에 꼭 가 보세요.", "이 약을 먹어 보세요."],
        related_vocab: ["가다", "먹다", "쉬다"]
      },
      {
        grammar_point: "-아/어야 하다 (당위 및 필요성)",
        explanation: "어떤 일을 반드시 하거나 지켜야 할 의무나 필요성이 있음을 나타냅니다.",
        example_sentences: ["약을 식후에 먹어야 해요.", "일찍 자야 합니다."],
        related_vocab: ["먹다", "자다", "치료받다"]
      }
    ],
    quiz: [
      { quiz_id: "q19-1", type: "multiple_choice", question: "자신의 아픈 상태를 부드럽게 추측하여 말할 때 알맞은 형태는?", options: ["머리가 아픈 것 같아요", "머리가 아픈 바람이에요", "머리가 아플 테니까요", "머리가 아프자마자예요"], answer: "머리가 아픈 것 같아요", explanation: "형용사 '아프다'에 완곡한 추측 어미 '-(으)ㄴ 것 같다'가 붙어 '아픈 것 같아요'가 됩니다.", source_unit: 19 },
      { quiz_id: "q19-2", type: "multiple_choice", question: "귀, 코, 목의 질환을 치료하는 진료과는 어디인가요?", options: ["이비인후과", "안과", "치과", "정형외과"], answer: "이비인후과", explanation: "귀(이), 코(비), 목(인후)을 다루는 병원은 '이비인후과'입니다.", source_unit: 19 },
      { quiz_id: "q19-3", type: "multiple_choice", question: "반드시 병원에 방문해야 한다는 필요성을 나타내는 문장은?", options: ["병원에 가야 해요", "병원에 갈 것 같아요", "병원에 가는 편이에요", "병원에 가기는 해요"], answer: "병원에 가야 해요", explanation: "당위나 필요성을 나타내는 어미는 '-아/어야 하다'입니다.", source_unit: 19 },
      { quiz_id: "q19-4", type: "multiple_choice", question: "동사 '열이 나다'에 현재 추측 '-는 것 같다'가 결합한 올바른 표현은?", options: ["열이 나는 것 같아요", "열이 난 것 같아요", "열이 날 것 같아요", "열이 남 것 같아요"], answer: "열이 나는 것 같아요", explanation: "동사의 현재 시제 추측에는 '-는 것 같다'가 결합합니다.", source_unit: 19 },
      { quiz_id: "q19-5", type: "multiple_choice", question: "의사가 약을 짓도록 작성해 주는 서류는 무엇인가요?", options: ["처방전", "영수증", "진단표", "계약서"], answer: "처방전", explanation: "약국에 약 조제를 요청하는 의사의 문서는 '처방전(處方箋)'입니다.", source_unit: 19 },
      { quiz_id: "q19-6", type: "fill_in_the_blank", question: "감기에 걸린 것 같으니 따뜻한 차를 마셔 ___세요. (보다)", answer: "보", explanation: "권유 표현 '-아/어 보세요'의 어간 '보'입니다.", source_unit: 19 },
      { quiz_id: "q19-7", type: "fill_in_the_blank", question: "건강을 위해 규칙적으로 운동해___ 합니다. (의무 -야)", answer: "야", explanation: "당위와 의무를 나타내는 보조동사 결합은 '운동해야 합니다'입니다.", source_unit: 19 },
      { quiz_id: "q19-8", type: "fill_in_the_blank", question: "비가 오___ 것 같으니 우산을 챙기세요. (동사 현재 추측 -는)", answer: "는", explanation: "'오다'에 현재 추측 어미 '-는 것 같다'가 결합하여 '오는'이 됩니다.", source_unit: 19 },
      { quiz_id: "q19-9", type: "fill_in_the_blank", question: "머리가 지끈거리며 아픈 통증을 ___통이라고 합니다. (두)", answer: "두", explanation: "'두통(頭痛)'은 머리의 통증을 뜻합니다.", source_unit: 19 },
      { quiz_id: "q19-10", type: "fill_in_the_blank", question: "병원 진료 시간을 미리 잡는 것을 ___약이라고 합니다. (예)", answer: "예", explanation: "사전에 시간을 약속하는 행위는 '예약(豫約)'입니다.", source_unit: 19 },
      { quiz_id: "q19-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [것 / 아픈 / 머리가 / 같아요 / 좀]", answer: "머리가 좀 아픈 것 같아요", explanation: "주어(머리가) + 부사(좀) + 추측 서술어(아픈 것 같아요) 순서입니다.", source_unit: 19 },
      { quiz_id: "q19-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [병원에 / 꼭 / 가 / 보세요 / 오늘]", answer: "오늘 꼭 병원에 가 보세요", explanation: "시간 부사(오늘) + 양태 부사(꼭) + 처소(병원에) + 권유 서술어(가 보세요) 순입니다.", source_unit: 19 },
      { quiz_id: "q19-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [먹어야 / 약을 / 식후에 / 30분 / 해요]", answer: "약을 식후 30분에 먹어야 해요", explanation: "목적어(약을) + 시간 부사구(식후 30분에) + 당위 서술어(먹어야 해요) 순서입니다.", source_unit: 19 }
    ]
  },

  // Unit 20: 초급b 10과 (연락 부재 상태 및 정중한 통화 거절)
  {
    unit: 20,
    dialogues: [
      { unit: 20, dialogue_id: "d20-1", speaker: "서연", korean_text: "민수 씨, 아까 몇 번이나 전화했는데 왜 핸드폰이 꺼져 있었어요?", translation: "Minsu, I called you several times earlier, why was your phone turned off?", audio_hint: "답답함과 궁금함이 섞인 자연스러운 톤" },
      { unit: 20, dialogue_id: "d20-2", speaker: "민수", korean_text: "아, 배터리가 없어서 꺼져 있었어요. 중요한 회의 중이라 확인을 못 했어요.", translation: "Ah, it was off because I ran out of battery. I couldn't check since I was in an important meeting.", audio_hint: "차분하고 미안하게 해명하는 어조" },
      { unit: 20, dialogue_id: "d20-3", speaker: "서연", korean_text: "그랬군요. 급한 일인 줄 알고 걱정했어요.", translation: "I see. I was worried thinking it was something urgent.", audio_hint: "안도하는 따뜻한 목소리" },
      { unit: 20, dialogue_id: "d20-4", speaker: "민수", korean_text: "죄송해요. 지금은 이동 중이라 긴 통화는 하기 어렵습니다.", translation: "I'm sorry. I'm moving right now, so it is difficult to have a long call.", audio_hint: "정중하고 공손하게 사정을 알리는 톤" },
      { unit: 20, dialogue_id: "d20-5", speaker: "서연", korean_text: "네, 괜찮아요. 도착하시면 편하실 때 메시지 남겨 주세요.", translation: "Yes, it's fine. When you arrive and have time, please leave a message.", audio_hint: "배려심 넘치는 부드러운 대답 톤" },
      { unit: 20, dialogue_id: "d20-6", speaker: "민수", korean_text: "네, 도착하는 대로 바로 연락드리겠습니다.", translation: "Yes, I will contact you immediately as soon as I arrive.", audio_hint: "명확하고 신뢰감을 주는 마무리 톤" }
    ],
    vocab: [
      { word: "연락", meaning: "서로 소식이나 형편을 주고받음 (Contact / communication)", part_of_speech: "명사", example_sentence: "도착하면 바로 연락 주세요.", level: "초급" },
      { word: "배터리", meaning: "전기를 충전하여 쓰는 전지 (Battery)", part_of_speech: "명사", example_sentence: "핸드폰 배터리가 다 닳았어요.", level: "초급" },
      { word: "통화", meaning: "전화로 말을 주고받음 (Phone call / conversation)", part_of_speech: "명사", example_sentence: "지금은 통화 중이라 잠시 후 전화할게요.", level: "초급" },
      { word: "꺼지다", meaning: "불이나 전원이 나가다 (To turn off / go out)", part_of_speech: "동사", example_sentence: "갑자기 방 안의 불이 꺼졌어요.", level: "초급" },
      { word: "켜지다", meaning: "불이나 전원이 들어오다 (To turn on)", part_of_speech: "동사", example_sentence: "컴퓨터 화면이 켜졌습니다.", level: "초급" },
      { word: "부재중", meaning: "그 자리에 있지 아니한 동안 (Absence / away)", part_of_speech: "명사", example_sentence: "부재중 전화가 다섯 통이나 와 있었어요.", level: "초급" },
      { word: "메시지", meaning: "전하고 싶은 말이나 문자 (Message)", part_of_speech: "명사", example_sentence: "문자 메시지를 확인해 보세요.", level: "초급" },
      { word: "정중하다", meaning: "태도가 깍듯하고 공손하다 (To be polite / courteous)", part_of_speech: "형용사", example_sentence: "정중한 태도로 거절했습니다.", level: "초급" },
      { word: "어렵다", meaning: "하기 힘들거나 곤란하다 (To be difficult / hard)", part_of_speech: "형용사", example_sentence: "지금은 시간을 내기가 어렵습니다.", level: "초급" },
      { word: "안도하다", meaning: "걱정 없이 마음을 놓다 (To feel relieved)", part_of_speech: "동사", example_sentence: "무사하다는 소식을 듣고 안도했습니다.", level: "초급" }
    ],
    grammar: [
      {
        grammar_point: "-아/어 있다 (결과 상태의 지속)",
        explanation: "주로 자동사 뒤에 결합하여 어떤 동작이 완료된 후 그 결과 상태가 계속 유지되고 있음을 나타냅니다.",
        example_sentences: ["핸드폰이 꺼져 있었어요.", "문이 열려 있습니다."],
        related_vocab: ["꺼지다", "열리다", "닫히다", "앉다"]
      },
      {
        grammar_point: "-기 어렵다 / -기 힘들다 (곤란한 상황 표현)",
        explanation: "동사 어간 뒤에 붙어 어떤 행위를 하기에 상황상 곤란하거나 불가능함을 정중하게 나타냅니다.",
        example_sentences: ["지금은 통화하기가 어렵습니다.", "오늘 참석하기 힘들 것 같아요."],
        related_vocab: ["통화하다", "참석하다", "만나다"]
      },
      {
        grammar_point: "-는 대로 (직후 동작 연결)",
        explanation: "어떤 동작이 끝나자마자 바로 다음 동작이 이어짐을 나타냅니다.",
        example_sentences: ["도착하는 대로 연락드리겠습니다.", "수업이 끝나는 대로 갈게요."],
        related_vocab: ["도착하다", "끝나다", "오다"]
      }
    ],
    quiz: [
      { quiz_id: "q20-1", type: "multiple_choice", question: "어떤 동작이 완료된 결과 상태가 지속됨을 나타내는 표현은?", options: ["꺼져 있었어요", "꺼질 뻔했어요", "꺼지는 바람이에요", "꺼지도록 해요"], answer: "꺼져 있었어요", explanation: "완료된 결과 상태의 지속은 '-아/어 있다'로 나타냅니다.", source_unit: 20 },
      { quiz_id: "q20-2", type: "multiple_choice", question: "상대방에게 정중하게 통화가 곤란함을 알릴 때 알맞은 표현은?", options: ["지금은 통화하기 어렵습니다", "지금은 통화할 수밖에 없습니다", "지금은 통화하는 편입니다", "지금은 통화하도록 하겠습니다"], answer: "지금은 통화하기 어렵습니다", explanation: "정중한 거절이나 상황 설명에는 '-기 어렵습니다'를 씁니다.", source_unit: 20 },
      { quiz_id: "q20-3", type: "multiple_choice", question: "도착하자마자 즉시 연락하겠다는 의지를 나타내는 어미는?", options: ["-는 대로", "-는 바람에", "-는 동안에", "-는 탓에"], answer: "-는 대로", explanation: "동작 완료 직후의 행동을 나타내는 연결어미는 '-는 대로'입니다.", source_unit: 20 },
      { quiz_id: "q20-4", type: "multiple_choice", question: "자리에 없어서 전화를 받지 못한 상태를 뜻하는 단어는?", options: ["부재중", "출근", "상담", "연락망"], answer: "부재중", explanation: "자리에 없는 상태를 '부재중(不在中)'이라고 합니다.", source_unit: 20 },
      { quiz_id: "q20-5", type: "multiple_choice", question: "자동사 '열리다'의 결과 상태 지속 형태는?", options: ["창문이 열려 있어요", "창문이 열고 있어요", "창문이 열릴 뻔해요", "창문이 열리는 바람이에요"], answer: "창문이 열려 있어요", explanation: "'열리다'에 '-어 있다'가 결합하여 '열려 있다'가 됩니다.", source_unit: 20 },
      { quiz_id: "q20-6", type: "fill_in_the_blank", question: "회의 중이라 전화를 받___ 어렵습니다. (-기)", answer: "기", explanation: "명사형 어미 '-기' 뒤에 '어렵습니다'가 결합합니다.", source_unit: 20 },
      { quiz_id: "q20-7", type: "fill_in_the_blank", question: "집에 도착하___ 대로 연락할게요. (-는)", answer: "는", explanation: "'도착하다'의 어간 뒤에 즉시성을 나타내는 '-는 대로'가 결합합니다.", source_unit: 20 },
      { quiz_id: "q20-8", type: "fill_in_the_blank", question: "의자에 앉___ 있는 분이 부장님이세요. (앉다 + -아 있다)", answer: "아", explanation: "'앉다'에 결과 지속 어미 '-아 있다'가 결합하여 '앉아'가 됩니다.", source_unit: 20 },
      { quiz_id: "q20-9", type: "fill_in_the_blank", question: "전화로 음성을 주고받는 대화를 ___화라고 합니다. (통)", answer: "통", explanation: "전화 대화를 뜻하는 명사는 '통화(通話)'입니다.", source_unit: 20 },
      { quiz_id: "q20-10", type: "fill_in_the_blank", question: "전화기 배터리가 모두 닳아서 전원이 ___졌어요. (꺼)", answer: "꺼", explanation: "'꺼지다'의 과거형 '꺼졌어요'입니다.", source_unit: 20 },
      { quiz_id: "q20-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [핸드폰이 / 있었어요 / 아까 / 꺼져]", answer: "아까 핸드폰이 꺼져 있었어요", explanation: "시간 부사(아까) + 주어(핸드폰이) + 상태 지속 서술어(꺼져 있었어요) 어순입니다.", source_unit: 20 },
      { quiz_id: "q20-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [통화하기가 / 지금은 / 어렵습니다 / 길게]", answer: "지금은 길게 통화하기가 어렵습니다", explanation: "시간 부사(지금은) + 부사(길게) + 주어구(통화하기가) + 서술어(어렵습니다) 순서입니다.", source_unit: 20 },
      { quiz_id: "q20-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [연락드리겠습니다 / 바로 / 도착하는 / 대로]", answer: "도착하는 대로 바로 연락드리겠습니다", explanation: "직후 연결절(도착하는 대로) + 부사(바로) + 서술어(연락드리겠습니다) 순서입니다.", source_unit: 20 }
    ]
  }
];
