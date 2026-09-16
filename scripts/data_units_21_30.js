export const units21to30 = [
  // Unit 21: 중급a 1과 (공공예절, 허락 및 금지, 타인 배려)
  {
    unit: 21,
    dialogues: [
      { unit: 21, dialogue_id: "d21-1", speaker: "스티븐", korean_text: "저기, 죄송한데 교실 안에서 김밥이나 간식을 먹어도 돼요?", translation: "Excuse me, am I allowed to eat kimbap or snacks inside the classroom?", audio_hint: "조심스럽고 정중하게 허락을 구하는 톤" },
      { unit: 21, dialogue_id: "d21-2", speaker: "조교", korean_text: "음료수는 괜찮지만 냄새가 나는 음식은 교실에서 드시면 안 돼요.", translation: "Beverages are fine, but you must not eat smelly food in the classroom.", audio_hint: "정중하지만 단호하게 규정을 안내하는 어조" },
      { unit: 21, dialogue_id: "d21-3", speaker: "스티븐", korean_text: "아, 그렇군요. 몰랐습니다. 휴게실에 가서 먹고 올게요.", translation: "Ah, I see. I didn't know. I'll go eat in the lounge and come back.", audio_hint: "즉시 수긍하고 예의를 갖추는 톤" },
      { unit: 21, dialogue_id: "d21-4", speaker: "조교", korean_text: "그리고 밤늦은 시간에는 기숙사 복도에서 통화할 때 조금 조용히 합시다.", translation: "Also, late at night, let's keep it quiet when making phone calls in the dorm hallway.", audio_hint: "배려를 당부하는 부드러운 청유 톤" },
      { unit: 21, dialogue_id: "d21-5", speaker: "스티븐", korean_text: "네, 다른 학생들에게 방해되지 않도록 주의하겠습니다.", translation: "Yes, I will be careful not to disturb other students.", audio_hint: "다짐과 존중의 어조" },
      { unit: 21, dialogue_id: "d21-6", speaker: "조교", korean_text: "서로 배려하며 생활하면 모두가 쾌적하게 지낼 수 있어요.", translation: "If we respect each other, everyone can live pleasantly.", audio_hint: "따뜻한 격려 톤" }
    ],
    vocab: [
      { word: "공공예절", meaning: "공공장소에서 지켜야 할 바른 태도 (Public etiquette)", part_of_speech: "명사", example_sentence: "지하철에서는 공공예절을 잘 지켜야 합니다.", level: "중급" },
      { word: "허락", meaning: "청하는 일을 들어줌 (Permission)", part_of_speech: "명사", example_sentence: "선생님의 허락을 받고 조퇴했어요.", level: "중급" },
      { word: "금지", meaning: "어떤 행동을 하지 못하게 막음 (Prohibition)", part_of_speech: "명사", example_sentence: "도서관 내 음식물 반입은 금지입니다.", level: "중급" },
      { word: "배려", meaning: "남을 도와주거나 보살펴 주려는 마음 (Consideration / caring)", part_of_speech: "명사", example_sentence: "타인을 배려하는 따뜻한 태도가 필요해요.", level: "중급" },
      { word: "방해", meaning: "남의 일을 가로막아 해를 끼침 (Disturbance / interference)", part_of_speech: "명사", example_sentence: "수업 시간에 소음을 내면 방해가 됩니다.", level: "중급" },
      { word: "휴게실", meaning: "잠깐 쉴 수 있도록 마련된 방 (Lounge / rest room)", part_of_speech: "명사", example_sentence: "휴게실에서 동료와 커피를 마셨어요.", level: "중급" },
      { word: "소음", meaning: "시끄러워 불쾌감을 주는 소리 (Noise)", part_of_speech: "명사", example_sentence: "층간 소음 문제를 해결하기 위해 대화했습니다.", level: "중급" },
      { word: "쾌적하다", meaning: "기분이 상쾌하고 알맞다 (To be pleasant / comfortable)", part_of_speech: "형용사", example_sentence: "환기를 시키니 실내 공기가 쾌적해요.", level: "중급" },
      { word: "주의하다", meaning: "조심하여 정신을 차리다 (To pay attention / be careful)", part_of_speech: "동사", example_sentence: "길이 미끄러우니 발밑을 주의하세요.", level: "중급" },
      { word: "복도", meaning: "건물 안에서 방과 방 사이를 연결하는 통로 (Hallway / corridor)", part_of_speech: "명사", example_sentence: "복도에서는 조용히 걸어 다닙시다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-아/어도 되다 (허락 및 양보)",
        explanation: "동사나 형용사 어간 뒤에 결합하여 어떤 행위나 상태를 허락하거나 용인함을 나타냅니다.",
        example_sentences: ["교실에서 물을 마셔도 돼요.", "사진을 찍어도 됩니다."],
        related_vocab: ["마시다", "찍다", "앉다"]
      },
      {
        grammar_point: "-(으)면 안 되다 (금지 및 규제)",
        explanation: "동사나 형용사 어간에 붙어 어떤 행위를 하거나 상태가 되는 것을 금지하거나 제한함을 나타냅니다.",
        example_sentences: ["교실에서 음식을 먹으면 안 돼요.", "담배를 피우면 안 됩니다."],
        related_vocab: ["먹다", "피우다", "떠들다"]
      },
      {
        grammar_point: "-(으)ㅂ시다 (공식적 청유)",
        explanation: "동사 어간 뒤에 결합하여 상대방에게 어떤 행동을 함께 하자고 공손하면서도 공식적으로 권유합니다.",
        example_sentences: ["조용히 합시다.", "서로 배려합시다."],
        related_vocab: ["하다", "지키다", "나누다"]
      }
    ],
    quiz: [
      { quiz_id: "q21-1", type: "multiple_choice", question: "상대방에게 행동의 허락을 구할 때 쓰는 표현은?", options: ["먹어도 돼요?", "먹으면 안 돼요?", "먹어야만 해요?", "먹을 리가 없어요?"], answer: "먹어도 돼요?", explanation: "허락을 요청할 때는 '-아/어도 되다'를 씁니다.", source_unit: 21 },
      { quiz_id: "q21-2", type: "multiple_choice", question: "공공장소에서 금지 규정을 안내할 때 알맞은 표현은?", options: ["사진을 찍으면 안 됩니다", "사진을 찍어도 됩니다", "사진을 찍는 편입니다", "사진을 찍자마자입니다"], answer: "사진을 찍으면 안 됩니다", explanation: "금지를 나타내는 어미는 '-(으)면 안 되다'입니다.", source_unit: 21 },
      { quiz_id: "q21-3", type: "multiple_choice", question: "상대방과 함께 조용히 할 것을 공식적으로 청유하는 문장은?", options: ["조용히 합시다", "조용히 하세요", "조용히 해야 돼요", "조용히 하려고요"], answer: "조용히 합시다", explanation: "공식적인 청유형 종결어미는 '-(으)ㅂ시다'입니다.", source_unit: 21 },
      { quiz_id: "q21-4", type: "multiple_choice", question: "남을 도와주거나 살펴주는 따뜻한 마음씨를 뜻하는 어휘는?", options: ["배려", "방해", "소음", "복도"], answer: "배려", explanation: "타인의 처지를 생각하고 돌봐주는 태도는 '배려(配慮)'입니다.", source_unit: 21 },
      { quiz_id: "q21-5", type: "multiple_choice", question: "받침 있는 동사 '찍다'에 금지 표현이 결합한 형태는?", options: ["찍으면 안 돼요", "찍면 안 돼요", "찍어도 돼요", "찍어야 돼요"], answer: "찍으면 안 돼요", explanation: "'찍다'는 받침이 있으므로 '-으면 안 돼요'가 결합합니다.", source_unit: 21 },
      { quiz_id: "q21-6", type: "fill_in_the_blank", question: "여기에 잠깐 앉___도 됩니까? (앉다 + 허락)", answer: "아", explanation: "'앉다'에 모음 '아'로 끝나는 어간이므로 '-아도'가 결합하여 '앉아도'가 됩니다.", source_unit: 21 },
      { quiz_id: "q21-7", type: "fill_in_the_blank", question: "도서관 안에서 크게 떠들___ 안 됩니다. (금지)", answer: "면", explanation: "'떠들다'의 'ㄹ' 받침 뒤에는 '-면 안 되다'가 결합하여 '떠들면'이 됩니다.", source_unit: 21 },
      { quiz_id: "q21-8", type: "fill_in_the_blank", question: "다 함께 환경을 깨끗이 지킵___다. (청유)", answer: "시", explanation: "'지키다'에 청유 어미 '-ㅂ시다'가 붙어 '지킵시다'가 됩니다.", source_unit: 21 },
      { quiz_id: "q21-9", type: "fill_in_the_blank", question: "공공장소에서 지켜야 하는 기본 규칙을 공공___절이라고 합니다. (예)", answer: "예", explanation: "'공공예절(公共禮節)'의 '예'입니다.", source_unit: 21 },
      { quiz_id: "q21-10", type: "fill_in_the_blank", question: "불쾌감을 유발하는 시끄러운 소리를 ___음이라고 합니다. (소)", answer: "소", explanation: "'소음(騷音)'은 시끄러운 소리입니다.", source_unit: 21 },
      { quiz_id: "q21-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [음식을 / 교실에서 / 먹으면 / 안 돼요]", answer: "교실에서 음식을 먹으면 안 돼요", explanation: "장소(교실에서) + 목적어(음식을) + 금지 서술어(먹으면 안 돼요) 순서입니다.", source_unit: 21 },
      { quiz_id: "q21-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [되나요 / 여기서 / 사진을 / 찍어도]", answer: "여기서 사진을 찍어도 되나요", explanation: "장소(여기서) + 목적어(사진을) + 허락 서술어(찍어도 되나요) 순서입니다.", source_unit: 21 },
      { quiz_id: "q21-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [조용히 / 복도에서는 / 합시다 / 조금]", answer: "복도에서는 조금 조용히 합시다", explanation: "장소 주제어(복도에서는) + 부사(조금) + 청유 서술어(조용히 합시다) 순서입니다.", source_unit: 21 }
    ]
  },

  // Unit 22: 중급a 2과 (일상 순서, 업무 지시 및 이행)
  {
    unit: 22,
    dialogues: [
      { unit: 22, dialogue_id: "d22-1", speaker: "김 대리", korean_text: "박 과장님, 이번 기획 보고서 작성 끝났습니다.", translation: "Manager Park, I have finished writing this project proposal report.", audio_hint: "공손하고 명확한 업무 보고 톤" },
      { unit: 22, dialogue_id: "d22-2", speaker: "박 과장", korean_text: "수고했어요. 그럼 회의 자료를 출력한 후에 부장님께 검토를 요청하세요.", translation: "Good job. Then after printing the meeting materials, please request a review from the general manager.", audio_hint: "지시 사항을 차분하고 조리 있게 전달하는 어조" },
      { unit: 22, dialogue_id: "d22-3", speaker: "김 대리", korean_text: "네, 부장님께서 말씀하신 대로 양식을 수정해서 진행하겠습니다.", translation: "Yes, I will proceed by modifying the template exactly as the general manager instructed.", audio_hint: "적극적이고 확실한 업무 이행 톤" },
      { unit: 22, dialogue_id: "d22-4", speaker: "박 과장", korean_text: "오후 회의 시작하기 전에 준비를 마치도록 하세요.", translation: "Make sure you finish the preparations before the afternoon meeting begins.", audio_hint: "마감 시한을 당부하는 톤" },
      { unit: 22, dialogue_id: "d22-5", speaker: "김 대리", korean_text: "알겠습니다. 필요한 서류를 꼼꼼히 챙기겠습니다.", translation: "Understood. I will prepare the necessary documents meticulously.", audio_hint: "신뢰감을 주는 답변" },
      { unit: 22, dialogue_id: "d22-6", speaker: "박 과장", korean_text: "좋아요. 다 끝나면 커피 한잔하시지요.", translation: "Great. When you're all done, let's have a cup of coffee.", audio_hint: "부하 직원을 격려하는 따뜻한 권유 톤" }
    ],
    vocab: [
      { word: "보고서", meaning: "업무나 조사 결과를 보고하는 글 (Report)", part_of_speech: "명사", example_sentence: "기획 보고서를 꼼꼼하게 작성했습니다.", level: "중급" },
      { word: "검토", meaning: "자세히 따져 살펴봄 (Review / examination)", part_of_speech: "명사", example_sentence: "서류에 오류가 없는지 최종 검토했어요.", level: "중급" },
      { word: "양식", meaning: "정해진 서식이나 틀 (Form / format / style)", part_of_speech: "명사", example_sentence: "회사 표준 양식에 맞추어 작성해 주세요.", level: "중급" },
      { word: "이행하다", meaning: "약속이나 지시를 그대로 실행하다 (To fulfill / implement)", part_of_speech: "동사", example_sentence: "계약 조건과 업무 지시를 충실히 이행했습니다.", level: "중급" },
      { word: "출력하다", meaning: "컴퓨터의 자료를 종이에 인쇄하다 (To print out)", part_of_speech: "동사", example_sentence: "회의 자료를 10부 출력했어요.", level: "중급" },
      { word: "지시", meaning: "명령하거나 가리켜 일러 줌 (Instruction / directive)", part_of_speech: "명사", example_sentence: "팀장님의 업무 지시를 정확히 따랐습니다.", level: "중급" },
      { word: "꼼꼼하다", meaning: "빈틈없이 세심하다 (To be meticulous / thorough)", part_of_speech: "형용사", example_sentence: "김 대리는 일 처리가 아주 꼼꼼해요.", level: "중급" },
      { word: "수정하다", meaning: "잘못된 부분을 바로잡다 (To revise / correct)", part_of_speech: "동사", example_sentence: "피드백을 반영하여 오타를 수정했습니다.", level: "중급" },
      { word: "진행하다", meaning: "일을 앞으로 나아가게 추진하다 (To proceed / carry on)", part_of_speech: "동사", example_sentence: "계획대로 프로젝트를 차질 없이 진행합니다.", level: "중급" },
      { word: "협조", meaning: "힘을 모아 서로 도움 (Cooperation)", part_of_speech: "명사", example_sentence: "동료들의 적극적인 협조에 감사드립니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)ㄴ 후에 / -고 나서 (시간적 순서)",
        explanation: "앞의 행위가 완전히 끝난 뒤에 다음 행위가 일어남을 나타내는 시간 순서 연결 표현입니다.",
        example_sentences: ["자료를 출력한 후에 보고하세요.", "식사를 하고 나서 차를 마셨어요."],
        related_vocab: ["출력하다", "보고하다", "먹다"]
      },
      {
        grammar_point: "-는 대로 / -(으)ㄴ 대로 (동일성 및 기준)",
        explanation: "어떤 대상이 나타난 상태나 지시 내용과 '똑같이', '그대로' 행함을 나타냅니다. (명사 뒤에는 '대로')",
        example_sentences: ["말씀하신 대로 진행하겠습니다.", "계획한 대로 추진합시다."],
        related_vocab: ["말씀하시다", "계획하다", "진행하다"]
      },
      {
        grammar_point: "-(으)시지요 (공손한 권유 및 제안)",
        explanation: "상대방에게 어떤 행동을 부드럽고 정중하게 권유할 때 사용되는 격식체 어미입니다.",
        example_sentences: ["커피 한잔하시지요.", "이쪽으로 앉으시지요."],
        related_vocab: ["하다", "앉다", "들어가다"]
      }
    ],
    quiz: [
      { quiz_id: "q22-1", type: "multiple_choice", question: "선행 동작이 끝난 뒤 다음 동작이 일어남을 나타내는 표현은?", options: ["출력한 후에", "출력하는 바람에", "출력할 텐데", "출력하느라고"], answer: "출력한 후에", explanation: "선후 관계를 명확히 나타내는 표현은 '-(으)ㄴ 후에'입니다.", source_unit: 22 },
      { quiz_id: "q22-2", type: "multiple_choice", question: "상대방의 말이나 지시와 똑같이 따르겠다는 의지를 나타내는 어미는?", options: ["-는 대로", "-는 바람에", "-는 동안", "-는 통에"], answer: "-는 대로", explanation: "지시나 사실과 동일하게 실행함을 나타낼 때는 '-는 대로'를 씁니다.", source_unit: 22 },
      { quiz_id: "q22-3", type: "multiple_choice", question: "상대방에게 정중하고 부드럽게 권유하는 종결어미는?", options: ["-(으)시지요", "-(으)ㄹ 뿐이다", "-(으)ㄴ 셈이다", "-고 말았다"], answer: "-(으)시지요", explanation: "공손하고 격식 있는 권유는 '-(으)시지요'입니다.", source_unit: 22 },
      { quiz_id: "q22-4", type: "multiple_choice", question: "세심하고 빈틈없이 일을 처리하는 태도를 나타내는 형용사는?", options: ["꼼꼼하다", "급하다", "지루하다", "느긋하다"], answer: "꼼꼼하다", explanation: "작은 부분까지 꼼꼼히 살피는 성격이나 태도는 '꼼꼼하다'입니다.", source_unit: 22 },
      { quiz_id: "q22-5", type: "multiple_choice", question: "컴퓨터 문서나 파일을 종이로 인쇄하는 행위는?", options: ["출력", "삭제", "입력", "보관"], answer: "출력", explanation: "프린터 등을 통해 종이에 뽑아내는 것을 '출력(出力)'이라고 합니다.", source_unit: 22 },
      { quiz_id: "q22-6", type: "fill_in_the_blank", question: "손을 씻___ 후에 식사를 하세요. (씻다 + -(으)ㄴ 후에)", answer: "은", explanation: "'씻다'에 받침이 있으므로 '-은 후에'가 결합하여 '씻은 후에'가 됩니다.", source_unit: 22 },
      { quiz_id: "q22-7", type: "fill_in_the_blank", question: "지시하___ 대로 정확하게 처리하겠습니다. (신)", answer: "신", explanation: "'지시하신 대로'의 형태입니다.", source_unit: 22 },
      { quiz_id: "q22-8", type: "fill_in_the_blank", question: "잠시 여기 앉아서 기다리___지요. (-시지요)", answer: "시", explanation: "'기다리다'에 권유 어미 '-(으)시지요'가 결합하여 '기다리시지요'가 됩니다.", source_unit: 22 },
      { quiz_id: "q22-9", type: "fill_in_the_blank", question: "문서의 잘못된 부분을 고치는 것을 ___정이라고 합니다. (수)", answer: "수", explanation: "'수정(修正)'은 잘못을 바로잡는 일입니다.", source_unit: 22 },
      { quiz_id: "q22-10", type: "fill_in_the_blank", question: "상사에게 결과를 알리는 문서를 ___고서라고 합니다. (보)", answer: "보", explanation: "'보고서(報告書)'의 '보'입니다.", source_unit: 22 },
      { quiz_id: "q22-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [후에 / 부장님께 / 자료를 / 출력한 / 보고하세요]", answer: "자료를 출력한 후에 부장님께 보고하세요", explanation: "목적어구(자료를 출력한 후에) + 부사어(부장님께) + 서술어(보고하세요) 순서입니다.", source_unit: 22 },
      { quiz_id: "q22-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [진행하겠습니다 / 대로 / 말씀하신 / 양식을 수정해서]", answer: "말씀하신 대로 양식을 수정해서 진행하겠습니다", explanation: "기준절(말씀하신 대로) + 방법(양식을 수정해서) + 서술어(진행하겠습니다) 순서입니다.", source_unit: 22 },
      { quiz_id: "q22-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [커피 / 한잔하시지요 / 끝나면 / 다]", answer: "다 끝나면 커피 한잔하시지요", explanation: "조건절(다 끝나면) + 목적어(커피) + 공손한 권유 서술어(한잔하시지요) 순서입니다.", source_unit: 22 }
    ]
  },

  // Unit 23: 중급a 3과 (수강 신청 절차 및 학업 고민)
  {
    unit: 23,
    dialogues: [
      { unit: 23, dialogue_id: "d23-1", speaker: "카리나", korean_text: "민우 선배, 이번 학기 수강 신청을 하려면 어떻게 해야 돼요?", translation: "Senior Minwoo, what do I need to do to register for courses this semester?", audio_hint: "도움을 청하며 궁금해하는 학업 상담 톤" },
      { unit: 23, dialogue_id: "d23-2", speaker: "민우", korean_text: "포털 사이트에 미리 로그인해서 희망 과목을 장바구니에 담아 두어야 해요.", translation: "You have to log into the portal in advance and put the desired courses into your cart.", audio_hint: "경험자로서 꼼꼼히 설명해 주는 친절한 어조" },
      { unit: 23, dialogue_id: "d23-3", speaker: "카리나", korean_text: "인기 있는 강의는 정원이 금방 찰까 봐 걱정돼요.", translation: "I'm worried that popular lectures might reach full capacity quickly.", audio_hint: "불안과 우려가 담긴 목소리" },
      { unit: 23, dialogue_id: "d23-4", speaker: "민우", korean_text: "정각 10시가 되자마자 신청 버튼을 누르면 성공할 수 있어요.", translation: "If you click the register button as soon as it hits exactly 10 o'clock, you can succeed.", audio_hint: "노하우를 전수하며 안심시키는 톤" },
      { unit: 23, dialogue_id: "d23-5", speaker: "카리나", korean_text: "전공 수업 과제가 너무 많을까 봐 강의 신청을 취소할까 고민도 돼요.", translation: "I'm also worried there might be too many major assignments, so I'm debating whether to cancel.", audio_hint: "학업 부담에 대한 솔직한 토로" },
      { unit: 23, dialogue_id: "d23-6", speaker: "민우", korean_text: "처음엔 누구나 부담스럽지만 계획을 잘 세우면 충분히 해낼 수 있어요!", translation: "Everyone feels burdened at first, but if you make a good plan, you can definitely do it!", audio_hint: "자신감을 북돋아 주는 격려의 마무리" }
    ],
    vocab: [
      { word: "수강", meaning: "강의나 수업을 들음 (Course registration / attending lecture)", part_of_speech: "명사", example_sentence: "다음 학기 수강 계획표를 작성했어요.", level: "중급" },
      { word: "신청", meaning: "어떤 일에 대해 정식으로 청함 (Application / registration)", part_of_speech: "명사", example_sentence: "장학금 지원 신청을 마쳤습니다.", level: "중급" },
      { word: "전공", meaning: "전문적으로 연구하고 공부하는 분야 (Major / specialty)", part_of_speech: "명사", example_sentence: "제 대학교 전공은 컴퓨터공학이에요.", level: "중급" },
      { word: "과제", meaning: "학생에게 주어지는 학업 숙제나 연구물 (Assignment / task)", part_of_speech: "명사", example_sentence: "팀 프로젝트 과제를 제출했습니다.", level: "중급" },
      { word: "정원", meaning: "규정상 정해진 인원수 (Fixed capacity / quota)", part_of_speech: "명사", example_sentence: "강의 정원이 다 차서 마감되었어요.", level: "중급" },
      { word: "로그인", meaning: "컴퓨터 시스템에 접속하기 위한 사용자 인증 (Log in)", part_of_speech: "명사", example_sentence: "비밀번호를 입력하고 홈페이지에 로그인했어요.", level: "중급" },
      { word: "학기", meaning: "한 학년 동안의 교육 기간 구분 (Semester / term)", part_of_speech: "명사", example_sentence: "새 학기가 시작되어 캠퍼스가 활기차요.", level: "중급" },
      { word: "우려", meaning: "걱정하거나 염려함 (Concern / apprehension)", part_of_speech: "명사", example_sentence: "시험 난이도에 대한 학생들의 우려가 컸어요.", level: "중급" },
      { word: "취소하다", meaning: "이미 정해진 계획이나 신청을 무효로 하다 (To cancel)", part_of_speech: "동사", example_sentence: "일정이 겹쳐서 예약을 취소했습니다.", level: "중급" },
      { word: "해내다", meaning: "어려운 일을 끝까지 완수하다 (To accomplish / pull off)", part_of_speech: "동사", example_sentence: "열심히 노력해서 과제를 훌륭히 해냈어요.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)려면 (의도 조건)",
        explanation: "'-려고 하면'의 준말로, 어떤 목적이나 의도를 이루기 위해 갖추어야 할 필요 조건이나 방법을 나타냅니다.",
        example_sentences: ["수강 신청을 하려면 로그인해야 해요.", "성공하려면 노력해야 합니다."],
        related_vocab: ["하다", "가다", "공부하다"]
      },
      {
        grammar_point: "-(으)ㄹ까 봐(서) (염려 및 우려 원인)",
        explanation: "어떤 바람직하지 않은 일이나 결과가 일어날까 염려되어 미리 대비하거나 고민함을 나타냅니다.",
        example_sentences: ["정원이 찰까 봐 걱정돼요.", "지각할까 봐 서둘렀어요."],
        related_vocab: ["차다", "지각하다", "넘어지다"]
      },
      {
        grammar_point: "-자마자 (즉시성)",
        explanation: "앞의 동작이 끝나자마자 바로 뒤이어 다음 동작이 연속하여 일어남을 나타냅니다.",
        example_sentences: ["10시가 되자마자 버튼을 눌렀어요.", "수업이 끝나자마자 도서관에 갔습니다."],
        related_vocab: ["되다", "누르다", "끝나다"]
      }
    ],
    quiz: [
      { quiz_id: "q23-1", type: "multiple_choice", question: "목적을 이루기 위한 전제 조건을 나타내는 연결어미는?", options: ["-(으)려면", "-(으)ㄹ수록", "-느라고", "-(으)ㄴ 탓에"], answer: "-(으)려면", explanation: "의도와 그에 필요한 조건을 제시할 때는 '-(으)려면'을 씁니다.", source_unit: 23 },
      { quiz_id: "q23-2", type: "multiple_choice", question: "바람직하지 않은 일이 일어날까 염려할 때 쓰는 어미는?", options: ["-(으)ㄹ까 봐", "-(으)ㄹ 텐데", "-(으)ㄹ 테니까", "-(으)ㄹ 겸"], answer: "-(으)ㄹ까 봐", explanation: "우려나 걱정의 원인을 나타낼 때는 '-(으)ㄹ까 봐(서)'를 사용합니다.", source_unit: 23 },
      { quiz_id: "q23-3", type: "multiple_choice", question: "어떤 동작이 끝나자마자 즉각 이어짐을 나타내는 어미는?", options: ["-자마자", "-다가", "-거나", "-도록"], answer: "-자마자", explanation: "즉시성을 나타내는 연결어미는 '-자마자'입니다.", source_unit: 23 },
      { quiz_id: "q23-4", type: "multiple_choice", question: "대학에서 전문적으로 배우는 핵심 전공과목을 뜻하는 단어는?", options: ["전공", "교양", "과외", "방학"], answer: "전공", explanation: "전문적으로 연구하고 공부하는 학문 분야는 '전공(專攻)'입니다.", source_unit: 23 },
      { quiz_id: "q23-5", type: "multiple_choice", question: "동사 '늦다'에 걱정·우려의 어미가 결합한 올바른 형태는?", options: ["늦을까 봐", "늦는 바람에", "늦으려고", "늦도록"], answer: "늦을까 봐", explanation: "'늦다'에 받침이 있으므로 '-을까 봐'가 결합하여 '늦을까 봐'가 됩니다.", source_unit: 23 },
      { quiz_id: "q23-6", type: "fill_in_the_blank", question: "한국어 실력을 높이___면 매일 연습해야 해요. (높이다 + 의도조건)", answer: "려", explanation: "'높이다'는 받침이 없으므로 '-려면'이 붙어 '높이려면'이 됩니다.", source_unit: 23 },
      { quiz_id: "q23-7", type: "fill_in_the_blank", question: "비가 올___ 봐 우산을 챙겨서 나왔어요. (우려)", answer: "까", explanation: "'올까 봐'의 '까'입니다.", source_unit: 23 },
      { quiz_id: "q23-8", type: "fill_in_the_blank", question: "집에 오___마자 손부터 깨끗이 씻었어요. (-자마자)", answer: "자", explanation: "'오다' 뒤에 즉시 어미 '-자마자'가 결합합니다.", source_unit: 23 },
      { quiz_id: "q23-9", type: "fill_in_the_blank", question: "수업을 듣기 위해 신청하는 절차를 ___강 신청이라고 합니다. (수)", answer: "수", explanation: "'수강(受講) 신청'의 '수'입니다.", source_unit: 23 },
      { quiz_id: "q23-10", type: "fill_in_the_blank", question: "정해진 인원의 한도를 ___원이라고 합니다. (정)", answer: "정", explanation: "'정원(定員)'은 규정된 인원수입니다.", source_unit: 23 },
      { quiz_id: "q23-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [로그인해야 / 하려면 / 수강 신청을 / 해요 / 미리]", answer: "수강 신청을 하려면 미리 로그인해야 해요", explanation: "의도조건절(수강 신청을 하려면) + 부사(미리) + 당위 서술어(로그인해야 해요) 순서입니다.", source_unit: 23 },
      { quiz_id: "q23-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [정원이 / 걱정돼요 / 찰까 / 봐]", answer: "정원이 찰까 봐 걱정돼요", explanation: "주어(정원이) + 우려절(찰까 봐) + 감정 서술어(걱정돼요) 순서입니다.", source_unit: 23 },
      { quiz_id: "q23-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [버튼을 / 되자마자 / 눌렀어요 / 10시가 / 신청]", answer: "10시가 되자마자 신청 버튼을 눌렀어요", explanation: "즉시조건절(10시가 되자마자) + 목적어(신청 버튼을) + 서술어(눌렀어요) 순서입니다.", source_unit: 23 }
    ]
  },

  // Unit 24: 중급a 4과 (외모 변화 반응 및 상태 변화 원인)
  {
    unit: 24,
    dialogues: [
      { unit: 24, dialogue_id: "d24-1", speaker: "현아", korean_text: "민지 씨, 헤어스타일 바꿨네요? 앞머리를 잘랐더니 훨씬 어려 보여요!", translation: "Minji, you changed your hairstyle! Cutting your bangs makes you look so much younger!", audio_hint: "깜짝 놀라며 진심으로 칭찬하는 밝은 어조" },
      { unit: 24, dialogue_id: "d24-2", speaker: "민지", korean_text: "정말요? 기분 전환하려고 잘랐더니 다들 어려 보인다고 하더라고요.", translation: "Really? I cut them for a change of pace, and everyone told me I look younger.", audio_hint: "쑥스러우면서도 기뻐하는 미소 띤 목소리" },
      { unit: 24, dialogue_id: "d24-3", speaker: "현아", korean_text: "그리고 지난번보다 얼굴도 아주 갸름해지고 슬림해졌어요.", translation: "And your face has become much slimmer and defined compared to last time.", audio_hint: "세밀하게 변화를 짚어 주는 톤" },
      { unit: 24, dialogue_id: "d24-4", speaker: "민지", korean_text: "매일 저녁에 헬스장에서 유산소 운동을 열심히 했더니 살이 좀 빠졌어요.", translation: "I exercised diligently doing cardio at the gym every evening, so I lost some weight.", audio_hint: "성취감을 담은 뿌듯한 어조" },
      { unit: 24, dialogue_id: "d24-5", speaker: "현아", korean_text: "꾸준히 자기 관리하는 모습이 정말 멋있고 본받을 만해요.", translation: "Your steady self-management is really admirable and worth emulating.", audio_hint: "감탄과 칭찬의 톤" },
      { unit: 24, dialogue_id: "d24-6", speaker: "민지", korean_text: "고마워요, 현아 씨! 앞으로도 건강을 위해 꾸준히 운동하려고요.", translation: "Thanks, Hyuna! I intend to keep exercising steadily for my health.", audio_hint: "밝은 다짐의 마무리 어조" }
    ],
    vocab: [
      { word: "헤어스타일", meaning: "머리를 다듬거나 손질한 모양 (Hairstyle)", part_of_speech: "명사", example_sentence: "계절이 바뀌어 새로운 헤어스타일로 변신했어요.", level: "중급" },
      { word: "기분 전환", meaning: "답답하거나 지루한 기분을 상쾌하게 바꿈 (Change of pace / refreshing)", part_of_speech: "명사", example_sentence: "주말 드라이브로 기분 전환을 했습니다.", level: "중급" },
      { word: "유산소 운동", meaning: "산소를 소비하여 체지방을 태우는 운동 (Cardio exercise)", part_of_speech: "명사", example_sentence: "러닝머신과 자전거로 유산소 운동을 했어요.", level: "중급" },
      { word: "체중", meaning: "사람이나 동물의 몸무게 (Body weight)", part_of_speech: "명사", example_sentence: "식단 조절을 통해 건강하게 체중을 감량했습니다.", level: "중급" },
      { word: "꾸준하다", meaning: "한결같이 부지런하고 끈기 있다 (To be steady / persistent)", part_of_speech: "형용사", example_sentence: "꾸준한 독서는 어휘력을 풍부하게 만듭니다.", level: "중급" },
      { word: "자기 관리", meaning: "자신의 건강과 역량을 주도적으로 관리함 (Self-management)", part_of_speech: "명사", example_sentence: "철저한 자기 관리는 성공의 비결이에요.", level: "중급" },
      { word: "본받다", meaning: "다른 사람의 좋은 점을 따라 배우다 (To emulate / model after)", part_of_speech: "동사", example_sentence: "선배의 성실한 태도를 본받고 싶어요.", level: "중급" },
      { word: "갸름하다", meaning: "모양이 둥글지 않고 약간 길쭉하고 곱다 (To be slender / oval-shaped)", part_of_speech: "형용사", example_sentence: "얼굴선이 한층 갸름해 보입니다.", level: "중급" },
      { word: "슬림하다", meaning: "몸매가 날씬하고 매끄럽다 (To be slim)", part_of_speech: "형용사", example_sentence: "운동 후 몸매가 아주 슬림해졌어요.", level: "중급" },
      { word: "변화", meaning: "모양이나 상태가 달라짐 (Change / transformation)", part_of_speech: "명사", example_sentence: "작은 습관이 긍정적인 삶의 변화를 만듭니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-았/었더니 (경험 후 발견 및 결과)",
        explanation: "화자가 과거에 어떤 행동을 하고 났더니 그 결과로 새로운 사실을 알게 되었거나 다른 상태가 나타났음을 표현합니다.",
        example_sentences: ["앞머리를 잘랐더니 어려 보여요.", "운동을 열심히 했더니 살이 빠졌어요."],
        related_vocab: ["자르다", "운동하다", "먹다"]
      },
      {
        grammar_point: "-아/어지다 (상태의 변화)",
        explanation: "형용사 어간 뒤에 붙어 시간의 흐름에 따라 어떤 상태로 점차 변화해 감을 나타냅니다.",
        example_sentences: ["날씨가 따뜻해졌어요.", "얼굴이 갸름해졌습니다."],
        related_vocab: ["따뜻하다", "갸름하다", "예쁘다"]
      },
      {
        grammar_point: "-어/아 보이다 (시각적 느낌 및 인상)",
        explanation: "형용사 뒤에 결합하여 겉모습이나 시각적 외양을 바탕으로 어떠한 느낌이나 인상을 준다고 표현할 때 씁니다.",
        example_sentences: ["훨씬 젊어 보여요.", "옷이 참 따뜻해 보입니다."],
        related_vocab: ["젊다", "어리다", "따뜻하다"]
      }
    ],
    quiz: [
      { quiz_id: "q24-1", type: "multiple_choice", question: "과거 자신의 행동 후 새로운 결과를 발견했을 때 쓰는 어미는?", options: ["-았/었더니", "-았/었으면", "-는 탓에", "-는 동안에"], answer: "-았/었더니", explanation: "화자의 행위 후 결과나 타인의 반응 발견에는 '-았/었더니'를 씁니다.", source_unit: 24 },
      { quiz_id: "q24-2", type: "multiple_choice", question: "형용사 '어리다'에 시각적 인상을 나타내는 표현이 결합한 올바른 형태는?", options: ["어려 보여요", "어리게 보여요", "어린 것 같아요", "어리도록 보여요"], answer: "어려 보여요", explanation: "'어리다'에 '-어 보이다'가 결합하여 '어려 보여요'가 됩니다.", source_unit: 24 },
      { quiz_id: "q24-3", type: "multiple_choice", question: "상태의 점진적 변화를 나타내는 올바른 표현은?", options: ["얼굴이 갸름해졌어요", "얼굴이 갸름할 뻔했어요", "얼굴이 갸름하는 중이에요", "얼굴이 갸름한 법이에요"], answer: "얼굴이 갸름해졌어요", explanation: "상태 변화는 '형용사 + -아/어지다'로 나타냅니다.", source_unit: 24 },
      { quiz_id: "q24-4", type: "multiple_choice", question: "답답한 기분을 상쾌하게 바꾸는 활동을 뜻하는 어휘는?", options: ["기분 전환", "수강 신청", "자기 관리", "업무 지시"], answer: "기분 전환", explanation: "기분을 새롭게 바꾸는 일은 '기분 전환'입니다.", source_unit: 24 },
      { quiz_id: "q24-5", type: "multiple_choice", question: "타인의 훌륭한 행동을 본보기로 삼아 따르는 행위는?", options: ["본받다", "돌보다", "부탁하다", "출력하다"], answer: "본받다", explanation: "다른 사람의 좋은 점을 배워 따르는 것은 '본받다'입니다.", source_unit: 24 },
      { quiz_id: "q24-6", type: "fill_in_the_blank", question: "안경을 벗___더니 인상이 훨씬 부드러워 보여요. (벗다 + -었더니)", answer: "었", explanation: "'벗다'에 과거 발견 어미 '-었더니'가 붙어 '벗었더니'가 됩니다.", source_unit: 24 },
      { quiz_id: "q24-7", type: "fill_in_the_blank", question: "날씨가 점점 따뜻___졌어요. (따뜻하다 + -어지다)", answer: "해", explanation: "'따뜻하다'의 '하-'에 '-여지다'가 합쳐져 '따뜻해졌다'가 됩니다.", source_unit: 24 },
      { quiz_id: "q24-8", type: "fill_in_the_blank", question: "밝은 옷을 입으니 아주 활기차 ___입니다. (보이다)", answer: "보", explanation: "'활기차 보입니다'의 '보'입니다.", source_unit: 24 },
      { quiz_id: "q24-9", type: "fill_in_the_blank", question: "체지방을 연소시키는 운동을 ___산소 운동이라고 합니다. (유)", answer: "유", explanation: "'유산소(有酸素) 운동'의 '유'입니다.", source_unit: 24 },
      { quiz_id: "q24-10", type: "fill_in_the_blank", question: "한결같이 부지런하고 끈기 있는 태도를 ___준하다고 합니다. (꾸)", answer: "꾸", explanation: "'꾸준하다'의 '꾸'입니다.", source_unit: 24 },
      { quiz_id: "q24-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [앞머리를 / 어려 보여요 / 잘랐더니 / 훨씬]", answer: "앞머리를 잘랐더니 훨씬 어려 보여요", explanation: "원인 경험절(앞머리를 잘랐더니) + 부사(훨씬) + 인상 서술어(어려 보여요) 순서입니다.", source_unit: 24 },
      { quiz_id: "q24-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [살이 / 운동을 / 열심히 / 빠졌어요 / 했더니]", answer: "운동을 열심히 했더니 살이 빠졌어요", explanation: "노력 행위절(운동을 열심히 했더니) + 주어(살이) + 서술어(빠졌어요) 순서입니다.", source_unit: 24 },
      { quiz_id: "q24-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [얼굴이 / 갸름해졌어요 / 예전보다 / 아주]", answer: "예전보다 얼굴이 아주 갸름해졌어요", explanation: "비교 부사구(예전보다) + 주어(얼굴이) + 부사(아주) + 상태변화 서술어(갸름해졌어요) 순서입니다.", source_unit: 24 }
    ]
  },

  // Unit 25: 중급a 5과 (학교 생활 및 학업 난이도)
  {
    unit: 25,
    dialogues: [
      { unit: 25, dialogue_id: "d25-1", speaker: "준석", korean_text: "민우야, 어제 과제 제출하느라고 밤을 꼬박 새웠어.", translation: "Minwoo, I stayed up all night doing the assignment submission yesterday.", audio_hint: "피곤하지만 과제를 마친 홀가분한 어조" },
      { unit: 25, dialogue_id: "d25-2", speaker: "민우", korean_text: "정말 고생 많았어. 이번 전공 과제가 워낙 까다롭기는 했지.", translation: "You really worked hard. This major assignment was indeed quite tricky.", audio_hint: "공감과 위로를 건네는 따뜻한 목소리" },
      { unit: 25, dialogue_id: "d25-3", speaker: "준석", korean_text: "응, 내가 평소에 책을 안 읽어서 그런지 국어 리포트 작성이 특히 어려웠어.", translation: "Yeah, perhaps because I don't usually read books, writing the Korean report was especially hard.", audio_hint: "자신의 부족한 점을 솔직하게 털어놓는 어조" },
      { unit: 25, dialogue_id: "d25-4", speaker: "민우", korean_text: "전문 용어가 많이 나오는 탓에 나도 도서관에서 논문을 몇 편이나 찾았어.", translation: "Because so many technical terms came up, I also searched several thesis papers in the library.", audio_hint: "자신의 경험을 덧붙이며 맞장구치는 톤" },
      { unit: 25, dialogue_id: "d25-5", speaker: "준석", korean_text: "그래도 마감 전에 무사히 제출해서 다행이야.", translation: "Still, I'm glad we submitted it safely before the deadline.", audio_hint: "안도의 한숨을 내쉬는 톤" },
      { unit: 25, dialogue_id: "d25-6", speaker: "민우", korean_text: "맞아. 오늘 수업 끝나면 맛있는 거 먹으러 가자!", translation: "Right. When class ends today, let's go eat something delicious!", audio_hint: "신나고 활기찬 제안으로 마무리" }
    ],
    vocab: [
      { word: "제출", meaning: "서류나 과제물을 담당자에게 냄 (Submission / turning in)", part_of_speech: "명사", example_sentence: "보고서 마감 시간 전에 제출을 마쳤어요.", level: "중급" },
      { word: "밤을 새우다", meaning: "잠을 자지 않고 밤을 보내다 (To stay up all night)", part_of_speech: "동사", example_sentence: "시험공부 때문에 밤을 하얗게 새웠습니다.", level: "중급" },
      { word: "까다롭다", meaning: "조건이나 성격이 복잡하고 맞추기 어렵다 (To be tricky / demanding)", part_of_speech: "형용사", example_sentence: "문제의 조건이 아주 까다로워요.", level: "중급" },
      { word: "리포트", meaning: "소논문 형태의 학생 보고서 (Report / paper)", part_of_speech: "명사", example_sentence: "교수님께서 리포트 주제를 공지하셨어요.", level: "중급" },
      { word: "전문 용어", meaning: "특정 학문이나 기술 분야에서 쓰이는 말 (Technical term)", part_of_speech: "명사", example_sentence: "의학 전문 용어는 사전을 찾아봐야 해요.", level: "중급" },
      { word: "논문", meaning: "학술적인 연구 결과를 서술한 글 (Thesis / academic paper)", part_of_speech: "명사", example_sentence: "졸업 논문을 학술지에 게재했습니다.", level: "중급" },
      { word: "마감", meaning: "일을 끝맺거나 마치는 기한 (Deadline)", part_of_speech: "명사", example_sentence: "과제 마감 시한이 오늘 밤 자정입니다.", level: "중급" },
      { word: "난이도", meaning: "문제나 일의 어렵고 쉬운 정도 (Level of difficulty)", part_of_speech: "명사", example_sentence: "이번 중간고사 시험 난이도가 적절했어요.", level: "중급" },
      { word: "학술", meaning: "학문과 기술 (Academics / scholarly)", part_of_speech: "명사", example_sentence: "학술 대회에서 연구 성과를 발표했습니다.", level: "중급" },
      { word: "공지하다", meaning: "어떤 사실을 널리 알리다 (To announce / notice)", part_of_speech: "동사", example_sentence: "휴강 일정을 게시판에 공지했습니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-느라고 (부정적 결과의 행위 원인)",
        explanation: "화자가 어떤 일이나 행동을 하는 데 시간과 노력을 쏟느라 뒤의 부정적이거나 피로한 결과를 낳게 되었음을 나타냅니다. 앞뒤 주어가 일치해야 합니다.",
        example_sentences: ["과제를 하느라고 밤을 샜어요.", "준비하느라고 밥을 못 먹었습니다."],
        related_vocab: ["하다", "준비하다", "찾다"]
      },
      {
        grammar_point: "-아/어서 그런지 (불확실한 이유 추측)",
        explanation: "확실하지는 않지만 앞의 상황이 뒤의 결과나 현상의 원인인 것 같다고 완곡하게 추측할 때 사용합니다.",
        example_sentences: ["책을 안 읽어서 그런지 글쓰기가 어려워요.", "비가 와서 그런지 길이 막히네요."],
        related_vocab: ["읽다", "오다", "피곤하다"]
      },
      {
        grammar_point: "-(으)ㄴ/는 탓에 (부정적 원인 탓)",
        explanation: "앞의 부정적인 요인이나 행위 때문에 뒤의 나쁜 결과가 초래되었음을 원망조나 책임 소재로 표현할 때 씁니다.",
        example_sentences: ["전문 용어가 많은 탓에 이해가 어려웠어요.", "늦잠을 잔 탓에 지각했습니다."],
        related_vocab: ["많다", "자다", "늦다"]
      }
    ],
    quiz: [
      { quiz_id: "q25-1", type: "multiple_choice", question: "자신의 행동에 집중하느라 다른 부정적 결과가 생겼음을 나타내는 어미는?", options: ["-느라고", "-자마자", "-는 길에", "-(으)시지요"], answer: "-느라고", explanation: "행위로 인한 시간 소모 및 피로·부정적 결과에는 '-느라고'를 씁니다.", source_unit: 25 },
      { quiz_id: "q25-2", type: "multiple_choice", question: "불확실한 원인을 완곡하게 추측하여 설명할 때 쓰는 표현은?", options: ["-아/어서 그런지", "-는 셈 치고", "-는 한편", "-는 척하고"], answer: "-아/어서 그런지", explanation: "이유의 조심스러운 추측에는 '-아/어서 그런지'를 씁니다.", source_unit: 25 },
      { quiz_id: "q25-3", type: "multiple_choice", question: "부정적인 결과의 책임을 앞의 원인에 돌릴 때 쓰는 표현은?", options: ["-(으)ㄴ/는 탓에", "-(으)ㄴ 덕분에", "-(으)ㄹ 정도로", "-기 마련이다"], answer: "-(으)ㄴ/는 탓에", explanation: "부정적인 원인이나 핑계를 나타낼 때는 '-(으)ㄴ/는 탓에'를 씁니다.", source_unit: 25 },
      { quiz_id: "q25-4", type: "multiple_choice", question: "잠을 자지 않고 하얗게 밤을 보내는 것을 뜻하는 관용구는?", options: ["밤을 새우다", "발을 뻗다", "귀를 기울이다", "손을 씻다"], answer: "밤을 새우다", explanation: "잠을 자지 않고 밤 시간을 보내는 표현은 '밤을 새우다'입니다.", source_unit: 25 },
      { quiz_id: "q25-5", type: "multiple_choice", question: "마감 시한 전에 보고서를 내는 행위는?", options: ["제출", "작성", "출력", "취소"], answer: "제출", explanation: "서류나 과제물을 내어 바치는 것을 '제출(提出)'이라고 합니다.", source_unit: 25 },
      { quiz_id: "q25-6", type: "fill_in_the_blank", question: "시험공부를 하___라고 잠을 거의 못 잤어요. (-느라고)", answer: "느", explanation: "'하다' 뒤에 목적 행동 원인 어미 '-느라고'가 붙어 '하느라고'가 됩니다.", source_unit: 25 },
      { quiz_id: "q25-7", type: "fill_in_the_blank", question: "날씨가 추워서 ___런지 거리에 사람이 없네요. (그런지)", answer: "그", explanation: "'추워서 그런지'의 '그'입니다.", source_unit: 25 },
      { quiz_id: "q25-8", type: "fill_in_the_blank", question: "눈이 많이 온 ___에 도로가 마비되었습니다. (탓에)", answer: "탓", explanation: "부정적 원인을 나타내는 명사 '탓에'입니다.", source_unit: 25 },
      { quiz_id: "q25-9", type: "fill_in_the_blank", question: "과제나 일의 마치는 기한을 ___감이라고 합니다. (마)", answer: "마", explanation: "'마감(截止/Deadline)'의 '마'입니다.", source_unit: 25 },
      { quiz_id: "q25-10", type: "fill_in_the_blank", question: "학술적인 연구 성과를 기록한 글을 ___문이라고 합니다. (논)", answer: "논", explanation: "'논문(論文)'은 연구를 적은 글입니다.", source_unit: 25 },
      { quiz_id: "q25-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [새웠어요 / 밤을 / 과제를 하느라고 / 꼬박]", answer: "과제를 하느라고 밤을 꼬박 새웠어요", explanation: "원인절(과제를 하느라고) + 목적어(밤을) + 부사(꼬박) + 서술어(새웠어요) 순서입니다.", source_unit: 25 },
      { quiz_id: "q25-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [책을 안 읽어서 / 리포트가 / 어려웠어요 / 그런지]", answer: "책을 안 읽어서 그런지 리포트가 어려웠어요", explanation: "추측 원인절(책을 안 읽어서 그런지) + 주어(리포트가) + 서술어(어려웠어요) 순서입니다.", source_unit: 25 },
      { quiz_id: "q25-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [이해가 / 전문 용어가 많은 / 안 됐어요 / 탓에]", answer: "전문 용어가 많은 탓에 이해가 안 됐어요", explanation: "부정 원인절(전문 용어가 많은 탓에) + 주어(이해가) + 부정 서술어(안 됐어요) 순서입니다.", source_unit: 25 }
    ]
  },

  // Unit 26: 중급a 6과 (반려동물 돌보기 및 방송 감상/회상)
  {
    unit: 26,
    dialogues: [
      { unit: 26, dialogue_id: "d26-1", speaker: "보람", korean_text: "민우 씨, 주말에 어디 다녀오셨어요? 연락이 안 되던데요.", translation: "Minwoo, where did you go on the weekend? I noticed I couldn't reach you.", audio_hint: "자연스럽게 과거 상황을 회상하며 묻는 어조" },
      { unit: 26, dialogue_id: "d26-2", speaker: "민우", korean_text: "우리 강아지 코코가 갑자기 아파서 동물병원에 다녀오느라고 바빴어요.", translation: "Our puppy Coco suddenly got sick, so I was busy taking him to the vet.", audio_hint: "걱정스러웠던 상황을 털어놓는 차분한 목소리" },
      { unit: 26, dialogue_id: "d26-3", speaker: "보람", korean_text: "아이고, 코코가 많이 아팠나 봐요. 지금은 좀 괜찮아졌어요?", translation: "Oh no, Coco must have been very sick. Is he feeling better now?", audio_hint: "진심 어린 걱정과 위로의 톤" },
      { unit: 26, dialogue_id: "d26-4", speaker: "민우", korean_text: "네, 의사 선생님께서 주사도 놔 주시고 약도 처방해 주셔서 많이 회복되었어요.", translation: "Yes, the doctor gave him an injection and prescribed medicine, so he recovered a lot.", audio_hint: "안도하며 감사해하는 어조" },
      { unit: 26, dialogue_id: "d26-5", speaker: "보람", korean_text: "정말 다행이에요! 참, 어제 TV 음악 프로그램 보니까 새로 나온 가수가 노래를 엄청 잘하던데요?", translation: "What a relief! By the way, watching the TV music show yesterday, that new singer sang amazingly well!", audio_hint: "자신이 직접 본 감상을 생생히 회상하는 활기찬 톤" },
      { unit: 26, dialogue_id: "d26-6", speaker: "민우", korean_text: "맞아요, 저도 봤는데 가창력이 정말 뛰어나더라고요.", translation: "Right, I saw it too, and their singing ability was truly outstanding.", audio_hint: "적극적으로 동의하며 감탄하는 마무리 어조" }
    ],
    vocab: [
      { word: "반려동물", meaning: "사람과 더불어 살아가는 동물 (Companion animal / pet)", part_of_speech: "명사", example_sentence: "반려동물은 소중한 가족 구성원이에요.", level: "중급" },
      { word: "동물병원", meaning: "동물의 질병을 진료하고 치료하는 병원 (Veterinary clinic / vet)", part_of_speech: "명사", example_sentence: "예방접종을 맞히러 동물병원에 갔습니다.", level: "중급" },
      { word: "회복하다", meaning: "원래의 좋은 상태나 건강으로 되돌아가다 (To recover)", part_of_speech: "동사", example_sentence: "치료를 받고 건강을 완전히 회복했습니다.", level: "중급" },
      { word: "가창력", meaning: "노래를 부르는 실력이나 능력 (Singing ability)", part_of_speech: "명사", example_sentence: "그 가수는 폭발적인 가창력으로 유명해요.", level: "중급" },
      { word: "뛰어나다", meaning: "남보다 훨씬 훌륭하고 돋보이다 (To be outstanding / excellent)", part_of_speech: "형용사", example_sentence: "연기력이 매우 뛰어난 배우입니다.", level: "중급" },
      { word: "주사", meaning: "약물을 주사기로 몸에 직접 주입함 (Injection / shot)", part_of_speech: "명사", example_sentence: "감기 기운이 심해서 주사를 맞았어요.", level: "중급" },
      { word: "처방", meaning: "병을 치료하기 위해 약을 지어 줌 (Prescription)", part_of_speech: "명사", example_sentence: "의사의 처방대로 약을 복용했습니다.", level: "중급" },
      { word: "감상", meaning: "예술 작품이나 대상을 보고 느끼는 생각 (Appreciation / impression)", part_of_speech: "명사", example_sentence: "영화 감상평을 블로그에 작성했어요.", level: "중급" },
      { word: "생생하다", meaning: "기억이나 느낌이 눈앞에 보듯 또렷하다 (To be vivid / lively)", part_of_speech: "형용사", example_sentence: "공연의 감동이 아직도 생생합니다.", level: "중급" },
      { word: "다행", meaning: "뜻밖에 일이 잘 풀려 안도함 (Good fortune / relief)", part_of_speech: "명사", example_sentence: "큰 사고가 나지 않아서 정말 다행이에요.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-아/어 주다 (타인을 위한 행위 제공 및 수혜)",
        explanation: "다른 사람을 위해 어떤 행동을 하거나, 다른 사람이 나를 위해 행동을 베풀어 줌을 나타냅니다.",
        example_sentences: ["선생님께서 약을 처방해 주셨어요.", "친구에게 책을 빌려주었습니다."],
        related_vocab: ["처방하다", "빌리다", "도와주다"]
      },
      {
        grammar_point: "-던데요 (과거 직접 경험 회상 감탄)",
        explanation: "화자가 과거에 직접 보거나 겪어서 알게 된 사실을 회상하여 청자에게 감탄하거나 알릴 때 씁니다.",
        example_sentences: ["노래를 참 잘하던데요.", "사람이 정말 많던데요."],
        related_vocab: ["잘하다", "많다", "예쁘다"]
      },
      {
        grammar_point: "-더라고요 (과거 직접 경험의 회상 전달)",
        explanation: "화자가 과거에 직접 경험하여 새롭게 알게 된 사실을 청자에게 회상하며 설명조로 전달할 때 씁니다.",
        example_sentences: ["가창력이 뛰어나더라고요.", "음식이 아주 맛있더라고요."],
        related_vocab: ["뛰어나다", "맛있다", "춥다"]
      }
    ],
    quiz: [
      { quiz_id: "q26-1", type: "multiple_choice", question: "과거에 직접 보거나 겪은 사실을 회상하며 감탄조로 말할 때 쓰는 어미는?", options: ["-던데요", "-더군요만", "-(으)려고요", "-자마자요"], answer: "-던데요", explanation: "직접 경험한 과거 사실의 회상 및 감탄에는 '-던데요'를 씁니다.", source_unit: 26 },
      { quiz_id: "q26-2", type: "multiple_choice", question: "직접 경험하여 새롭게 알게 된 사실을 청자에게 전달하는 어미는?", options: ["-더라고요", "-는 셈이에요", "-기 마련이에요", "-(으)ㄹ 뿐이에요"], answer: "-더라고요", explanation: "과거 직접 경험의 회상 전달 어미는 '-더라고요'입니다.", source_unit: 26 },
      { quiz_id: "q26-3", type: "multiple_choice", question: "다른 사람을 위해 행동을 베푸는 것을 나타내는 보조동사는?", options: ["-아/어 주다", "-아/어 버리다", "-아/어 놓다", "-아/어 두다"], answer: "-아/어 주다", explanation: "수혜 및 도움의 행동을 표현할 때는 '-아/어 주다'를 씁니다.", source_unit: 26 },
      { quiz_id: "q26-4", type: "multiple_choice", question: "노래를 부르는 뛰어난 음악적 능력을 뜻하는 단어는?", options: ["가창력", "연기력", "순발력", "체력"], answer: "가창력", explanation: "노래 부르는 실력을 '가창력(歌唱力)'이라고 합니다.", source_unit: 26 },
      { quiz_id: "q26-5", type: "multiple_choice", question: "사람과 정서적으로 교감하며 함께 사는 동물을 뜻하는 단어는?", options: ["반려동물", "야생동물", "가축", "희귀동물"], answer: "반려동물", explanation: "가족처럼 함께 사는 동물을 '반려동물'이라고 부릅니다.", source_unit: 26 },
      { quiz_id: "q26-6", type: "fill_in_the_blank", question: "어제 콘서트에 관객이 정말 많___데요! (-던데요)", answer: "던", explanation: "'많다' 뒤에 과거 회상 어미 '-던데요'가 결합합니다.", source_unit: 26 },
      { quiz_id: "q26-7", type: "fill_in_the_blank", question: "그 식당 음식이 참 맛있___더라고요. (회상전달)", answer: "더", explanation: "'맛있더라고요'의 '더'입니다.", source_unit: 26 },
      { quiz_id: "q26-8", type: "fill_in_the_blank", question: "의사 선생님께서 친절하게 치료해 ___셨어요. (주시다 과거형)", answer: "주", explanation: "'치료해 주셨어요'의 '주'입니다.", source_unit: 26 },
      { quiz_id: "q26-9", type: "fill_in_the_blank", question: "병을 앓고 난 뒤 몸이 원래대로 회복되는 것을 ___복이라고 합니다. (회)", answer: "회", explanation: "'회복(回復)'은 건강을 되찾는 일입니다.", source_unit: 26 },
      { quiz_id: "q26-10", type: "fill_in_the_blank", question: "남보다 훨씬 돋보이고 훌륭할 때 ___어나다고 합니다. (뛰)", answer: "뛰", explanation: "'뛰어나다'의 '뛰'입니다.", source_unit: 26 },
      { quiz_id: "q26-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [노래를 / 신인 가수가 / 잘하던데요 / 엄청]", answer: "신인 가수가 노래를 엄청 잘하던데요", explanation: "주어(신인 가수가) + 목적어(노래를) + 부사(엄청) + 회상 서술어(잘하던데요) 순서입니다.", source_unit: 26 },
      { quiz_id: "q26-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [뛰어나더라고요 / 가창력이 / 직접 / 보니까]", answer: "직접 보니까 가창력이 뛰어나더라고요", explanation: "조건/경험절(직접 보니까) + 주어(가창력이) + 회상전달 서술어(뛰어나더라고요) 순서입니다.", source_unit: 26 },
      { quiz_id: "q26-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [다녀왔어요 / 아파서 / 코코가 / 병원에]", answer: "코코가 아파서 병원에 다녀왔어요", explanation: "주어(코코가) + 원인(아파서) + 장소(병원에) + 서술어(다녀왔어요) 순서입니다.", source_unit: 26 }
    ]
  },

  // Unit 27: 중급a 7과 (우체국 국제소포 및 은행 업무)
  {
    unit: 27,
    dialogues: [
      { unit: 27, dialogue_id: "d27-1", speaker: "안나", korean_text: "안녕하세요. 미국에 있는 가족에게 국제 특급 소포를 보내려고 하는데요.", translation: "Hello. I'd like to send an international express parcel to my family in the US.", audio_hint: "업무 창구에서 목적을 밝히는 공손한 톤" },
      { unit: 27, dialogue_id: "d27-2", speaker: "직원", korean_text: "네, 저울 위에 상자를 올려놓으시지요. 안에 깨지는 물건이나 음식물은 없나요?", translation: "Yes, please place the box on the scale. Are there any fragile items or food inside?", audio_hint: "절차를 안내하는 친절하고 전문적인 어조" },
      { unit: 27, dialogue_id: "d27-3", speaker: "안나", korean_text: "옷하고 책만 들어 있어요. 미국까지 도착하는 데 얼마나 걸릴까요?", translation: "Only clothes and books are in it. How long will it take to arrive in the US?", audio_hint: "기간을 문의하는 명확한 어조" },
      { unit: 27, dialogue_id: "d27-4", speaker: "직원", korean_text: "항공편으로 발송되니까 아마 영업일 기준으로 5일에서 7일 정도 걸릴 거예요.", translation: "Since it is sent by airmail, it will probably take about 5 to 7 business days.", audio_hint: "예상 기간을 추측하여 설명하는 톤" },
      { unit: 27, dialogue_id: "d27-5", speaker: "안나", korean_text: "생각보다 빠르네요! 그리고 바로 옆 은행에서 통장도 개설하려고 하는데 신분증만 있으면 되나요?", translation: "That's faster than I thought! And I also want to open an account at the bank next door, do I only need my ID?", audio_hint: "안도하며 다음 업무를 묻는 톤" },
      { unit: 27, dialogue_id: "d27-6", speaker: "직원", korean_text: "네, 외국인등록증과 재직증명서나 재학증명서를 챙겨 가시면 됩니다.", translation: "Yes, you can take your Alien Registration Card and certificate of employment or enrollment.", audio_hint: "친절하게 서류를 안내해 주는 톤" }
    ],
    vocab: [
      { word: "국제소포", meaning: "외국으로 부치는 소화물 (International parcel)", part_of_speech: "명사", example_sentence: "우체국에서 고향으로 국제소포를 접수했습니다.", level: "중급" },
      { word: "특급", meaning: "특별히 빠르고 우수한 등급 (Express / priority)", part_of_speech: "명사", example_sentence: "특급 우편으로 서류를 신속하게 배송했어요.", level: "중급" },
      { word: "저울", meaning: "물건의 무게를 다는 기구 (Scale)", part_of_speech: "명사", example_sentence: "소포를 저울에 올려 무게를 측정했습니다.", level: "중급" },
      { word: "항공편", meaning: "비행기를 이용한 운송 수단 (Airmail / flight)", part_of_speech: "명사", example_sentence: "항공편을 이용하면 배편보다 훨씬 빠릅니다.", level: "중급" },
      { word: "영업일", meaning: "기업이나 관공서가 업무를 하는 날 (Business day / working day)", part_of_speech: "명사", example_sentence: "배송은 영업일 기준 3일 이내에 완료됩니다.", level: "중급" },
      { word: "개설하다", meaning: "계좌나 시설을 새로 열다 (To open - account / facility)", part_of_speech: "동사", example_sentence: "은행 창구에서 급여 통장을 개설했어요.", level: "중급" },
      { word: "신분증", meaning: "신원을 증명하는 공식 카드 (ID card / identification)", part_of_speech: "명사", example_sentence: "은행 업무를 볼 때는 신분증을 지참해야 합니다.", level: "중급" },
      { word: "외국인등록증", meaning: "외국인의 신분을 증명하는 공식 등록증 (Alien Registration Card)", part_of_speech: "명사", example_sentence: "한국에 체류하며 외국인등록증을 발급받았습니다.", level: "중급" },
      { word: "재학증명서", meaning: "학교에 재학 중임을 증명하는 서류 (Certificate of enrollment)", part_of_speech: "명사", example_sentence: "학생 할인을 위해 재학증명서를 제출했어요.", level: "중급" },
      { word: "발송하다", meaning: "우편물이나 짐을 보내다 (To send / dispatch)", part_of_speech: "동사", example_sentence: "주문하신 상품을 오늘 오후에 발송합니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)려고 하는데요 (의도 제시 및 도입)",
        explanation: "화자의 목적이나 하려는 행동을 밝히며 대화의 도입부에서 상대방의 안내나 도움을 요청할 때 씁니다.",
        example_sentences: ["소포를 보내려고 하는데요.", "통장을 개설하려고 합니다."],
        related_vocab: ["보내다", "개설하다", "신청하다"]
      },
      {
        grammar_point: "-(으)ㄹ 거예요 (추측 및 예상)",
        explanation: "화자가 알고 있는 정보나 상황을 바탕으로 미래나 미지의 사실을 합리적으로 추측하여 말할 때 씁니다.",
        example_sentences: ["5일 정도 걸릴 거예요.", "내일은 날씨가 맑을 거예요."],
        related_vocab: ["걸리다", "맑다", "도착하다"]
      },
      {
        grammar_point: "-는 데(에) (소요 및 조건)",
        explanation: "어떤 일을 하거나 목적을 달성하는 과정에서 소요되는 시간, 비용, 노력 등을 나타낼 때 씁니다.",
        example_sentences: ["도착하는 데 일주일이 걸려요.", "이해하는 데 시간이 필요합니다."],
        related_vocab: ["도착하다", "이해하다", "걸리다"]
      }
    ],
    quiz: [
      { quiz_id: "q27-1", type: "multiple_choice", question: "은행이나 우체국 창구에서 자신의 용건을 공손히 도입할 때 쓰는 어미는?", options: ["-(으)려고 하는데요", "-는 바람에요", "-는 셈이에요", "-자마자예요"], answer: "-(으)려고 하는데요", explanation: "자신의 목적을 밝히며 도움을 요청할 때는 '-(으)려고 하는데요'를 씁니다.", source_unit: 27 },
      { quiz_id: "q27-2", type: "multiple_choice", question: "예상되는 소요 기간을 추측하여 말할 때 올바른 표현은?", options: ["5일 정도 걸릴 거예요", "5일 정도 걸리는 법이에요", "5일 정도 걸린 탓이에요", "5일 정도 걸리도록 해요"], answer: "5일 정도 걸릴 거예요", explanation: "미래나 불확실한 사실의 추측에는 '-(으)ㄹ 거예요'를 씁니다.", source_unit: 27 },
      { quiz_id: "q27-3", type: "multiple_choice", question: "어떤 일을 완수하는 데 드는 시간을 표현할 때 알맞은 어미는?", options: ["-는 데(에)", "-는 길에", "-는 동안에", "-는 김에"], answer: "-는 데(에)", explanation: "시간이나 비용 등의 소요를 나타낼 때는 '-는 데(에)'를 씁니다.", source_unit: 27 },
      { quiz_id: "q27-4", type: "multiple_choice", question: "외국으로 보내는 물건이나 짐을 뜻하는 단어는?", options: ["국제소포", "국내우편", "등기", "모바일뱅킹"], answer: "국제소포", explanation: "해외로 부치는 소화물은 '국제소포(國際小包)'입니다.", source_unit: 27 },
      { quiz_id: "q27-5", type: "multiple_choice", question: "은행에서 새로운 통장이나 계좌를 만드는 행위는?", options: ["개설", "해지", "이체", "인출"], answer: "개설", explanation: "계좌나 통장을 새로 여는 행위는 '개설(開設)'입니다.", source_unit: 27 },
      { quiz_id: "q27-6", type: "fill_in_the_blank", question: "통장을 만___려고 하는데요. (만들다 + 의도도입)", answer: "들", explanation: "'만들다'의 'ㄹ' 받침 뒤에는 '-려고'가 결합하여 '만들려고'가 됩니다.", source_unit: 27 },
      { quiz_id: "q27-7", type: "fill_in_the_blank", question: "비행기로 보내니까 금방 도착___ 거예요. (추측)", answer: "할", explanation: "'도착하다'에 추측 어미 '-(으)ㄹ 거예요'가 결합하여 '도착할'이 됩니다.", source_unit: 27 },
      { quiz_id: "q27-8", type: "fill_in_the_blank", question: "서울에서 부산까지 가___ 데 KTX로 2시간 반이 걸려요. (소요)", answer: "는", explanation: "'가다' 뒤에 소요를 나타내는 의존명사 구문 '-는 데'가 옵니다.", source_unit: 27 },
      { quiz_id: "q27-9", type: "fill_in_the_blank", question: "물건의 무게를 재는 기구를 ___울이라고 합니다. (저)", answer: "저", explanation: "'저울'은 무게 측정 도구입니다.", source_unit: 27 },
      { quiz_id: "q27-10", type: "fill_in_the_blank", question: "자신의 신원을 공식 증명하는 카드를 ___분증이라고 합니다. (신)", answer: "신", explanation: "'신분증(身分證)'의 '신'입니다.", source_unit: 27 },
      { quiz_id: "q27-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [보내려고 하는데요 / 국제소포를 / 미국으로 / 제가]", answer: "제가 미국으로 국제소포를 보내려고 하는데요", explanation: "주어(제가) + 목적지(미국으로) + 목적어(국제소포를) + 의도도입 서술어(보내려고 하는데요) 순서입니다.", source_unit: 27 },
      { quiz_id: "q27-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [도착하는 데 / 일주일 정도 / 걸릴 거예요 / 아마]", answer: "아마 도착하는 데 일주일 정도 걸릴 거예요", explanation: "부사(아마) + 소요구(도착하는 데) + 기간(일주일 정도) + 추측 서술어(걸릴 거예요) 순서입니다.", source_unit: 27 },
      { quiz_id: "q27-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [신분증을 / 가져오시면 / 창구로 / 됩니다]", answer: "신분증을 창구로 가져오시면 됩니다", explanation: "목적어(신분증을) + 처소(창구로) + 조건 서술어(가져오시면 됩니다) 순서입니다.", source_unit: 27 }
    ]
  },

  // Unit 28: 중급a 8과 (취미 및 운동 능력의 경향, 기술 가능 여부)
  {
    unit: 28,
    dialogues: [
      { unit: 28, dialogue_id: "d28-1", speaker: "성훈", korean_text: "민지 씨, 이번 주말에 회사 동호회에서 테니스 치러 가는데 같이 갈래요?", translation: "Minji, we're going to play tennis with the company club this weekend, want to come along?", audio_hint: "활기차고 적극적인 동호회 초대 톤" },
      { unit: 28, dialogue_id: "d28-2", speaker: "민지", korean_text: "초대해 줘서 고마워요. 그런데 저는 테니스는 잘 못 쳐서 다른 사람들에게 방해될까 봐요.", translation: "Thanks for inviting me. But I can't play tennis well, so I'm worried I might get in other people's way.", audio_hint: "수줍어하며 자신의 운동 실력을 털어놓는 어조" },
      { unit: 28, dialogue_id: "d28-3", speaker: "성훈", korean_text: "초보자들을 가르쳐 주는 코치님이 계시니까 걱정하지 마세요.", translation: "There is a coach who teaches beginners, so don't worry.", audio_hint: "안심시키며 용기를 주는 톤" },
      { unit: 28, dialogue_id: "d28-4", speaker: "민지", korean_text: "다행이네요. 그럼 테니스 라켓을 쥘 줄 몰라도 참가할 수 있나요?", translation: "That's a relief. Then can I participate even if I don't know how to hold a tennis racket?", audio_hint: "궁금증을 해소하려는 질문 톤" },
      { unit: 28, dialogue_id: "d28-5", speaker: "성훈", korean_text: "그럼요! 저도 처음엔 아무것도 할 줄 몰랐는데 배우다 보니 운동을 즐기는 편이 되었어요.", translation: "Of course! I didn't know how to do anything at first either, but as I learned, I came to be someone who enjoys sports.", audio_hint: "자신의 경험을 공유하는 격려의 어조" },
      { unit: 28, dialogue_id: "d28-6", speaker: "민지", korean_text: "선배님 말씀 들으니 용기가 나네요. 저도 이번에 꼭 가 볼게요!", translation: "Hearing you say that gives me courage. I'll definitely go this time!", audio_hint: "기분 좋게 참가 결정을 내리는 마무리" }
    ],
    vocab: [
      { word: "동호회", meaning: "같은 취미나 흥미를 가진 사람들의 모임 (Club / hobby group)", part_of_speech: "명사", example_sentence: "사내 축구 동호회에 가입했어요.", level: "중급" },
      { word: "초보자", meaning: "어떤 일이나 기술을 배우기 시작한 사람 (Beginner / novice)", part_of_speech: "명사", example_sentence: "초보자를 위한 수영 강습을 신청했습니다.", level: "중급" },
      { word: "라켓", meaning: "테니스나 배드민턴에서 공을 치는 도구 (Racket)", part_of_speech: "명사", example_sentence: "새 테니스 라켓을 샀어요.", level: "중급" },
      { word: "가르치다", meaning: "지식이나 기술을 익히게 하다 (To teach)", part_of_speech: "동사", example_sentence: "후배들에게 프로그래밍을 가르쳐 주었어요.", level: "중급" },
      { word: "참가하다", meaning: "모임이나 대회에 함께 참여하다 (To participate / join)", part_of_speech: "동사", example_sentence: "마라톤 대회에 참가하여 완주했습니다.", level: "중급" },
      { word: "용기", meaning: "씩씩하고 굳센 기운 (Courage / bravery)", part_of_speech: "명사", example_sentence: "친구의 격려 덕분에 큰 용기를 얻었어요.", level: "중급" },
      { word: "경향", meaning: "현상이나 행동이 어떤 방향으로 기울어짐 (Tendency / trend)", part_of_speech: "명사", example_sentence: "요즘 사람들은 건강을 중시하는 경향이 있습니다.", level: "중급" },
      { word: "다루다", meaning: "도구나 기계를 조작하거나 다스리다 (To handle / manage)", part_of_speech: "동사", example_sentence: "여러 가지 그래픽 도구를 능숙하게 다룹니다.", level: "중급" },
      { word: "자신감", meaning: "스스로 해낼 수 있다고 믿는 마음 (Self-confidence)", part_of_speech: "명사", example_sentence: "발표 연습을 많이 해서 자신감이 생겼어요.", level: "중급" },
      { word: "선호하다", meaning: "여럿 가운데 특별히 더 좋아하다 (To prefer)", part_of_speech: "동사", example_sentence: "야외 운동보다 실내 운동을 선호합니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "잘 못 V vs 못 V (능력 부족 및 서툼의 정도)",
        explanation: "'못 V'는 능력이나 상황상 전혀 할 수 없음을 나타내고, '잘 못 V'는 할 수는 있으나 서툴거나 능숙하지 못함을 완곡하게 나타냅니다.",
        example_sentences: ["테니스는 잘 못 쳐요.", "매운 음식은 잘 못 먹습니다."],
        related_vocab: ["치다", "먹다", "부르다"]
      },
      {
        grammar_point: "-(으)ㄹ 줄 알다/모르다 (방법 및 능력의 유무)",
        explanation: "어떤 일이나 기술을 실행하는 방법이나 능력을 알고 있는지의 여부를 나타냅니다.",
        example_sentences: ["라켓을 쥘 줄 몰라요.", "운전할 줄 압니다."],
        related_vocab: ["쥐다", "운전하다", "치다"]
      },
      {
        grammar_point: "-(으)ㄴ/는 편이다 (일반적 경향 및 속성)",
        explanation: "100% 확실히 단정 짓지 않고, 대체로 어떠한 성향이나 범주에 속한다고 완곡하게 표현할 때 씁니다.",
        example_sentences: ["운동을 즐기는 편이에요.", "말수가 적은 편입니다."],
        related_vocab: ["즐기다", "적다", "크다"]
      }
    ],
    quiz: [
      { quiz_id: "q28-1", type: "multiple_choice", question: "어떤 일을 할 수는 있으나 능숙하지 못함을 나타내는 표현은?", options: ["잘 못 쳐요", "치지 못해요", "칠 줄 알아요", "치도록 해요"], answer: "잘 못 쳐요", explanation: "서툰 능력을 부드럽게 표현할 때는 부사 '잘 못'을 결합합니다.", source_unit: 28 },
      { quiz_id: "q28-2", type: "multiple_choice", question: "방법이나 기술을 전혀 알지 못함을 나타내는 어미는?", options: ["-(으)ㄹ 줄 모르다", "-(으)ㄹ 뻔하다", "-(으)ㄴ 셈 치다", "-기 십상이다"], answer: "-(으)ㄹ 줄 모르다", explanation: "방법이나 능력의 부재는 '-(으)ㄹ 줄 모르다'로 표현합니다.", source_unit: 28 },
      { quiz_id: "q28-3", type: "multiple_choice", question: "자신이 대체로 어떤 성향에 속함을 완곡하게 말할 때 쓰는 어미는?", options: ["-(으)ㄴ/는 편이다", "-(으)ㄹ 뿐이다", "-(으)ㄴ 척하다", "-기 마련이다"], answer: "-(으)ㄴ/는 편이다", explanation: "일반적 경향이나 성향의 범주화는 '-(으)ㄴ/는 편이다'를 씁니다.", source_unit: 28 },
      { quiz_id: "q28-4", type: "multiple_choice", question: "취미나 관심사가 같은 사람들의 사교 모임을 가리키는 말은?", options: ["동호회", "동창회", "학술대회", "기숙사"], answer: "동호회", explanation: "공통의 취미를 즐기는 사람들의 모임은 '동호회(同好會)'입니다.", source_unit: 28 },
      { quiz_id: "q28-5", type: "multiple_choice", question: "동사 '운전하다'에 방법 지식의 유무 표현이 올바르게 결합한 형태는?", options: ["운전할 줄 알아요", "운전하는 줄 알아요", "운전한 줄 알아요", "운전하도록 알아요"], answer: "운전할 줄 알아요", explanation: "'운전하다'에 받침이 없으므로 '-ㄹ 줄 알다'가 결합합니다.", source_unit: 28 },
      { quiz_id: "q28-6", type: "fill_in_the_blank", question: "수영을 전혀 할 줄 ___라요. (모르다)", answer: "몰", explanation: "'모르다'의 활용형 '몰라요'의 '몰'입니다.", source_unit: 28 },
      { quiz_id: "q28-7", type: "fill_in_the_blank", question: "저는 주말에 주로 집에서 쉬___ 편이에요. (쉬다 + 경향)", answer: "는", explanation: "'쉬다'의 현재 시제 경향 어미 '-는 편이다'의 '는'입니다.", source_unit: 28 },
      { quiz_id: "q28-8", type: "fill_in_the_blank", question: "한국 음식을 좋아하지만 매운 찌개는 ___ 못 먹어요. (잘)", answer: "잘", explanation: "서툰 정도를 나타내는 부사는 '잘'입니다.", source_unit: 28 },
      { quiz_id: "q28-9", type: "fill_in_the_blank", question: "어떤 일을 처음 시작하여 서툰 사람을 ___보자라고 합니다. (초)", answer: "초", explanation: "'초보자(初步者)'의 '초'입니다.", source_unit: 28 },
      { quiz_id: "q28-10", type: "fill_in_the_blank", question: "어려운 일에 당당히 맞서는 씩씩한 기운을 ___기라고 합니다. (용)", answer: "용", explanation: "'용기(勇氣)'는 두려움을 이겨내는 힘입니다.", source_unit: 28 },
      { quiz_id: "q28-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [테니스는 / 저는 / 못 쳐요 / 잘]", answer: "저는 테니스는 잘 못 쳐요", explanation: "주어(저는) + 목적 주제어(테니스는) + 부사어(잘) + 서술어(못 쳐요) 순서입니다.", source_unit: 28 },
      { quiz_id: "q28-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [줄 몰라도 / 라켓을 / 참가할 수 / 쥘 / 있나요]", answer: "라켓을 쥘 줄 몰라도 참가할 수 있나요", explanation: "목적어(라켓을) + 양보 능력절(쥘 줄 몰라도) + 가능 서술어(참가할 수 있나요) 순서입니다.", source_unit: 28 },
      { quiz_id: "q28-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [즐기는 / 운동을 / 편이에요 / 저는]", answer: "저는 운동을 즐기는 편이에요", explanation: "주어(저는) + 목적어(운동을) + 경향 서술어(즐기는 편이에요) 순서입니다.", source_unit: 28 }
    ]
  },

  // Unit 29: 중급a 9과 (간단 요리, 필요 재료 및 조리 순서)
  {
    unit: 29,
    dialogues: [
      { unit: 29, dialogue_id: "d29-1", speaker: "현우", korean_text: "지수야, 자취하면서 집에서 간단하게 만들어 먹을 수 있는 요리 없을까?", translation: "Jisu, living alone, is there any simple dish I can make and eat at home?", audio_hint: "요리 초보로서 가볍게 묻는 일상 대화 톤" },
      { unit: 29, dialogue_id: "d29-2", speaker: "지수", korean_text: "계란볶음밥이 제일 쉬워! 계란이랑 대파, 진간장만 있으면 됩니다.", translation: "Egg fried rice is the easiest! You only need eggs, green onions, and soy sauce.", audio_hint: "자신 있게 초간단 레시피를 소개하는 밝은 목소리" },
      { unit: 29, dialogue_id: "d29-3", speaker: "현우", korean_text: "오, 재료가 정말 간단하네! 조리 순서는 어떻게 돼?", translation: "Oh, the ingredients are so simple! What is the cooking order?", audio_hint: "흥미를 보이며 집중하는 어조" },
      { unit: 29, dialogue_id: "d29-4", speaker: "지수", korean_text: "팬에 기름을 두르고 파를 볶은 채로 계란을 풀어 넣고 섞어 주세요.", translation: "Coat the pan with oil, and with the green onions stir-fried, pour in beaten eggs and mix them.", audio_hint: "차근차근 조리법을 설명하는 친절한 톤" },
      { unit: 29, dialogue_id: "d29-5", speaker: "지수", korean_text: "그리고 밥을 넣고 간장을 살짝 두른 후 센 불에서 골고루 볶아 내면 끝이에요.", translation: "And after putting in rice and lightly drizzling soy sauce, stir-fry evenly on high heat, and you're done.", audio_hint: "마무리 조리 팁을 강조하는 어조" },
      { unit: 29, dialogue_id: "d29-6", speaker: "현우", korean_text: "듣기만 해도 정말 맛있겠다. 오늘 저녁에 바로 도전해 볼게!", translation: "Just hearing it sounds so delicious. I'll challenge it right away tonight!", audio_hint: "기대에 찬 활기찬 마무리" }
    ],
    vocab: [
      { word: "조리", meaning: "음식 재료를 가공하여 음식을 만듦 (Cooking / preparation)", part_of_speech: "명사", example_sentence: "위생적인 조리 환경이 건강을 지킵니다.", level: "중급" },
      { word: "재료", meaning: "물건이나 음식을 만드는 데 들어가는 물질 (Ingredient / material)", part_of_speech: "명사", example_sentence: "신선한 식재료를 마트에서 골랐어요.", level: "중급" },
      { word: "간장", meaning: "메주를 발효시켜 짠맛을 내는 전통 조미료 (Soy sauce)", part_of_speech: "명사", example_sentence: "볶음밥에 간장으로 간을 맞췄습니다.", level: "중급" },
      { word: "대파", meaning: "줄기가 굵은 파 (Green onion / scallion)", part_of_speech: "명사", example_sentence: "파기름을 내기 위해 대파를 잘게 썰었어요.", level: "중급" },
      { word: "볶다", meaning: "기름을 두르고 열을 가해 익히다 (To stir-fry)", part_of_speech: "동사", example_sentence: "채소와 고기를 팬에 함께 볶았습니다.", level: "중급" },
      { word: "두르다", meaning: "팬이나 표면에 액체를 둥글게 끼얹다 (To coat / drizzle)", part_of_speech: "동사", example_sentence: "달군 프라이팬에 식용유를 둘렀어요.", level: "중급" },
      { word: "풀다", meaning: "액체나 계란을 휘저어 섞다 (To beat - egg / loosen)", part_of_speech: "동사", example_sentence: "그릇에 달걀 두 개를 곱게 풀었습니다.", level: "중급" },
      { word: "골고루", meaning: "빼놓지 않고 고르게 (Evenly / thoroughly)", part_of_speech: "부사", example_sentence: "양념이 골고루 배도록 잘 섞어 주세요.", level: "중급" },
      { word: "레시피", meaning: "음식을 만드는 방법이나 조리법 (Recipe)", part_of_speech: "명사", example_sentence: "유튜브에서 인기 있는 떡볶이 레시피를 따라 했어요.", level: "중급" },
      { word: "도전하다", meaning: "어려운 일에 용기 있게 맞서다 (To challenge / try out)", part_of_speech: "동사", example_sentence: "새로운 요리 만들기에 도전했습니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "-(으)면 되다 (충족 조건 제시)",
        explanation: "어떤 일이나 목표를 이루기 위해 최소한 그 조건만 갖추어지면 충분함을 나타냅니다.",
        example_sentences: ["계란이랑 대파만 있으면 됩니다.", "이 버튼만 누르면 돼요."],
        related_vocab: ["있다", "누르다", "가다"]
      },
      {
        grammar_point: "-(으)ㄴ 채(로) (상태 유지 동작 지속)",
        explanation: "어떤 동작이나 상태가 완료된 그대로 유지되면서 뒤의 다른 행동을 계속함을 나타냅니다.",
        example_sentences: ["파를 볶은 채로 계란을 넣으세요.", "신발을 신은 채로 들어오면 안 됩니다."],
        related_vocab: ["볶다", "신다", "켜다"]
      },
      {
        grammar_point: "-도록 하다 (지시 및 유도 권유)",
        explanation: "상대방에게 어떤 동작을 하도록 완곡하게 지시하거나 권유할 때 사용합니다.",
        example_sentences: ["골고루 익도록 볶으세요.", "시간에 늦지 않도록 하세요."],
        related_vocab: ["익다", "늦다", "섞다"]
      }
    ],
    quiz: [
      { quiz_id: "q29-1", type: "multiple_choice", question: "조건만 갖추어지면 충분함을 나타내는 올바른 표현은?", options: ["있으면 됩니다", "있어야만 합니다", "있는 바람입니다", "있는 셈입니다"], answer: "있으면 됩니다", explanation: "충족 조건을 제시할 때는 '-(으)면 되다'를 씁니다.", source_unit: 29 },
      { quiz_id: "q29-2", type: "multiple_choice", question: "앞의 상태를 그대로 유지한 채 다른 행동을 함을 나타내는 어미는?", options: ["-(으)ㄴ 채(로)", "-는 길에", "-자마자", "-는 바람에"], answer: "-(으)ㄴ 채(로)", explanation: "상태의 지속 유지는 '-(으)ㄴ 채(로)'로 표현합니다.", source_unit: 29 },
      { quiz_id: "q29-3", type: "multiple_choice", question: "동사 '신다'에 상태 유지 어미가 결합한 올바른 형태는?", options: ["신은 채로", "신는 채로", "신을 채로", "신은 탓에"], answer: "신은 채로", explanation: "'신다'에 받침이 있으므로 '-은 채로'가 결합하여 '신은 채로'가 됩니다.", source_unit: 29 },
      { quiz_id: "q29-4", type: "multiple_choice", question: "기름을 두르고 열을 가해 음식을 익히는 조리 방법은?", options: ["볶다", "삶다", "찌다", "절이다"], answer: "볶다", explanation: "팬에 기름을 두르고 젓거나 익히는 행위는 '볶다'입니다.", source_unit: 29 },
      { quiz_id: "q29-5", type: "multiple_choice", question: "어느 한쪽으로 치우치지 않고 평등하게 퍼진 상태를 나타내는 부사는?", options: ["골고루", "간신히", "도무지", "차마"], answer: "골고루", explanation: "빠짐없이 고르게를 뜻하는 부사는 '골고루'입니다.", source_unit: 29 },
      { quiz_id: "q29-6", type: "fill_in_the_blank", question: "모르는 단어는 사전을 찾으___ 됩니다. (찾다 + -(으)면 되다)", answer: "면", explanation: "'찾다'에 받침이 있으므로 '-으면'이 결합하여 '찾으면'이 됩니다.", source_unit: 29 },
      { quiz_id: "q29-7", type: "fill_in_the_blank", question: "불을 켠 ___로 외출하면 위험해요. (켜다 + -(으)ㄴ 채로)", answer: "채", explanation: "'켠 채로'의 '채'입니다.", source_unit: 29 },
      { quiz_id: "q29-8", type: "fill_in_the_blank", question: "양념이 잘 배___록 숟가락으로 저어 주세요. (-도록)", answer: "도", explanation: "목적 유도 어미 '-도록'의 '도'입니다.", source_unit: 29 },
      { quiz_id: "q29-9", type: "fill_in_the_blank", question: "음식을 만드는 조리법이나 요리 안내서를 ___시피라고 합니다. (레)", answer: "레", explanation: "'레시피(Recipe)'의 '레'입니다.", source_unit: 29 },
      { quiz_id: "q29-10", type: "fill_in_the_blank", question: "음식을 만드는 데 쓰이는 각종 재료를 식___료라고 합니다. (재)", answer: "재", explanation: "'식재료(食材料)'의 '재'입니다.", source_unit: 29 },
      { quiz_id: "q29-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [계란이랑 / 대파만 / 됩니다 / 있으면]", answer: "계란이랑 대파만 있으면 됩니다", explanation: "주어(계란이랑 대파만) + 충족조건 서술어(있으면 됩니다) 순서입니다.", source_unit: 29 },
      { quiz_id: "q29-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [볶은 채로 / 파를 / 계란을 / 넣으세요]", answer: "파를 볶은 채로 계란을 넣으세요", explanation: "상태유지절(파를 볶은 채로) + 목적어(계란을) + 명령서술(넣으세요) 순서입니다.", source_unit: 29 },
      { quiz_id: "q29-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [골고루 / 저어 주세요 / 양념을 / 숟가락으로]", answer: "숟가락으로 양념을 골고루 저어 주세요", explanation: "도구 부사어(숟가락으로) + 목적어(양념을) + 부사(골고루) + 서술어(저어 주세요) 순서입니다.", source_unit: 29 }
    ]
  },

  // Unit 30: 중급a 10과 (집들이 초대 및 간접 전달)
  {
    unit: 30,
    dialogues: [
      { unit: 30, dialogue_id: "d30-1", speaker: "태양", korean_text: "수진아, 선영이가 이번 주 토요일에 집들이 한다고 같이 오래.", translation: "Sujin, Sunyoung said she's having a housewarming party this Saturday and invited us to come together.", audio_hint: "초대 소식을 즐겁게 전하는 친근한 톤" },
      { unit: 30, dialogue_id: "d30-2", speaker: "수진", korean_text: "정말? 선영이가 새 아파트로 이사했다고 들었는데 집들이하는구나!", translation: "Really? I heard Sunyoung moved to a new apartment, so she's having a housewarming!", audio_hint: "반가워하며 축하하는 어조" },
      { unit: 30, dialogue_id: "d30-3", speaker: "태양", korean_text: "응, 다른 친구들한테도 시간 되는지 물어봐 달라고 하더라고.", translation: "Yeah, she asked me to ask the other friends if they have time too.", audio_hint: "부탁받은 내용을 전달하는 어조" },
      { unit: 30, dialogue_id: "d30-4", speaker: "수진", korean_text: "그럼 단체 대화방에 공지할게. 집들이 선물로는 뭐가 좋을까?", translation: "Then I'll announce it in the group chat. What would be good for a housewarming gift?", audio_hint: "적극적으로 준비를 상의하는 톤" },
      { unit: 30, dialogue_id: "d30-5", speaker: "태양", korean_text: "한국에서는 보통 휴지나 세제를 선물한다고 하니까 우리 같이 사 가자.", translation: "People say in Korea they usually give toilet paper or detergent as gifts, so let's buy them together.", audio_hint: "한국의 전통 관습을 설명하며 제안하는 톤" },
      { unit: 30, dialogue_id: "d30-6", speaker: "수진", korean_text: "좋은 생각이야! 애들한테 동창회비 좀 모아 달라고도 전할게.", translation: "Great idea! I will also pass along the message asking everyone to collect the alumni fee.", audio_hint: "일정을 꼼꼼히 챙기는 밝은 마무리" }
    ],
    vocab: [
      { word: "집들이", meaning: "새집으로 이사한 후 친지를 초대하여 대접하는 일 (Housewarming party)", part_of_speech: "명사", example_sentence: "친구의 집들이에 초대받아 방문했습니다.", level: "중급" },
      { word: "동창회", meaning: "같은 학교를 졸업한 사람들의 모임 (Alumni association / reunion)", part_of_speech: "명사", example_sentence: "연말 동창회에서 오랜 친구들을 만났어요.", level: "중급" },
      { word: "휴지", meaning: "먼지나 물기를 닦는 종이 (Toilet paper / tissue)", part_of_speech: "명사", example_sentence: "집들이 선물로 두루마리 휴지를 샀어요.", level: "중급" },
      { word: "세제", meaning: "때를 씻어 내는 물질 (Detergent)", part_of_speech: "명사", example_sentence: "세탁기용 친환경 세제를 선물했습니다.", level: "중급" },
      { word: "전달하다", meaning: "말이나 물건을 전하여 넘겨주다 (To convey / deliver / pass on)", part_of_speech: "동사", example_sentence: "선생님의 공지 사항을 반 친구들에게 전달했어요.", level: "중급" },
      { word: "이사", meaning: "살던 곳을 떠나 다른 곳으로 옮김 (Moving house)", part_of_speech: "명사", example_sentence: "다음 주에 새 집으로 이사를 갑니다.", level: "중급" },
      { word: "초대하다", meaning: "어떤 자리에 오도록 청하다 (To invite)", part_of_speech: "동사", example_sentence: "생일 파티에 친한 동료들을 초대했어요.", level: "중급" },
      { word: "회비", meaning: "모임의 운영을 위해 구성원들이 내는 돈 (Membership fee / dues)", part_of_speech: "명사", example_sentence: "이번 달 모임 회비를 계좌로 송금했습니다.", level: "중급" },
      { word: "대접하다", meaning: "손님에게 정성껏 음식을 차려 주다 (To treat / entertain / serve)", part_of_speech: "동사", example_sentence: "집들이에 온 손님들에게 맛있는 음식을 대접했어요.", level: "중급" },
      { word: "공지", meaning: "어떤 사실을 많은 사람에게 널리 알림 (Announcement / notice)", part_of_speech: "명사", example_sentence: "모임 장소와 시간을 단톡방에 공지했습니다.", level: "중급" }
    ],
    grammar: [
      {
        grammar_point: "간접화법: 평서문 (-ㄴ/는다고 하다 / -(이)라고 하다)",
        explanation: "다른 사람의 말이나 들은 평서문 내용을 제3자에게 전달할 때 사용합니다. (동사: -(ㄴ/는)다고 하다, 형용사: -다고 하다, 명사: -(이)라고 하다)",
        example_sentences: ["선영이가 이사했다고 해요.", "휴지를 선물한다고 합니다."],
        related_vocab: ["이사하다", "선물하다", "가다"]
      },
      {
        grammar_point: "간접화법: 명령·청유문 (-으라고 하다 / -자고 하다 / -아/어 달라고 하다)",
        explanation: "다른 사람의 명령이나 부탁(-으라고 하다 / -아/어 달라고 하다), 또는 제안(-자고 하다)을 간접적으로 전달할 때 씁니다.",
        example_sentences: ["같이 오라고 해요.", "시간 되는지 물어봐 달라고 했어요.", "같이 가자고 합니다."],
        related_vocab: ["오다", "물어보다", "가다"]
      },
      {
        grammar_point: "-대요 / -재요 / -래요 (간접화법 구어 축약형)",
        explanation: "일상 구어 회화에서 '-다고 해요'를 '-대요', '-자고 해요'를 '-재요', '-라고 해요'를 '-래요'로 줄여 씁니다.",
        example_sentences: ["집들이 한다고 같이 오래요.", "주말에 만나재요."],
        related_vocab: ["오다", "만나다", "하다"]
      }
    ],
    quiz: [
      { quiz_id: "q30-1", type: "multiple_choice", question: "다른 사람의 말을 듣고 평서문 내용을 전달하는 간접화법은?", options: ["이사했다고 해요", "이사하라고 해요", "이사하자고 해요", "이사하냐고 해요"], answer: "이사했다고 해요", explanation: "평서문 과거 내용의 간접 전달은 '-았/었다고 하다'를 씁니다.", source_unit: 30 },
      { quiz_id: "q30-2", type: "multiple_choice", question: "다른 사람의 부탁('도와주세요')을 제3자에게 전달할 때 알맞은 형태는?", options: ["도와 달라고 했어요", "도와주라고 했어요", "도와주자고 했어요", "도와주냐고 했어요"], answer: "도와 달라고 했어요", explanation: "말하는 사람 자신을 도와달라는 부탁을 제3자에게 전할 때는 '-아/어 달라고 하다'를 씁니다.", source_unit: 30 },
      { quiz_id: "q30-3", type: "multiple_choice", question: "구어체에서 '오라고 해요'를 줄여 쓴 표현은?", options: ["오래요", "오대요", "오재요", "오냬요"], answer: "오래요", explanation: "명령 간접화법 '-으라고 해요'의 구어 축약형은 '-(으)래요'입니다.", source_unit: 30 },
      { quiz_id: "q30-4", type: "multiple_choice", question: "새집으로 이사한 후 손님을 초대해 대접하는 행사는?", options: ["집들이", "동창회", "돌잔치", "송년회"], answer: "집들이", explanation: "이사 후 손님을 맞이하는 파티는 '집들이'입니다.", source_unit: 30 },
      { quiz_id: "q30-5", type: "multiple_choice", question: "한국에서 집들이 선물로 번창과 순탄한 일을 기원하며 주는 물건은?", options: ["두루마리 휴지와 세제", "시계와 거울", "칼과 가위", "신발과 모자"], answer: "두루마리 휴지와 세제", explanation: "한국에서는 일이 술술 풀리라는 의미로 휴지와 세제를 선물합니다.", source_unit: 30 },
      { quiz_id: "q30-6", type: "fill_in_the_blank", question: "친구들이 오늘 저녁에 같이 밥을 먹___고 해요. (청유 전달 -자고)", answer: "자", explanation: "청유문의 간접화법은 '-자고 하다'입니다.", source_unit: 30 },
      { quiz_id: "q30-7", type: "fill_in_the_blank", question: "선생님께서 숙제를 내일까지 제출하___고 하셨습니다. (명령 전달 -라고)", answer: "라", explanation: "명령문의 간접화법은 '-(으)라고 하다'입니다.", source_unit: 30 },
      { quiz_id: "q30-8", type: "fill_in_the_blank", question: "민호가 지금 도서관에 있___요. (평서문 축약 -대요)", answer: "대", explanation: "'있다고 해요'의 축약형은 '있대요'입니다.", source_unit: 30 },
      { quiz_id: "q30-9", type: "fill_in_the_blank", question: "같은 학교를 졸업한 동문들의 모임을 ___창회라고 합니다. (동)", answer: "동", explanation: "'동창회(同窓會)'의 '동'입니다.", source_unit: 30 },
      { quiz_id: "q30-10", type: "fill_in_the_blank", question: "손님에게 정성껏 음식을 베푸는 것을 ___접한다고 합니다. (대)", answer: "대", explanation: "'대접(待接)'은 손님을 정성껏 맞는 행위입니다.", source_unit: 30 },
      { quiz_id: "q30-11", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [집들이 한다고 / 선영이가 / 오래요 / 같이]", answer: "선영이가 집들이 한다고 같이 오래요", explanation: "주어(선영이가) + 목적 인용(집들이 한다고) + 간접명령 서술어(같이 오래요) 순서입니다.", source_unit: 30 },
      { quiz_id: "q30-12", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [물어봐 달라고 / 다른 친구들한테도 / 하더라고요]", answer: "다른 친구들한테도 물어봐 달라고 하더라고요", explanation: "부사어(다른 친구들한테도) + 간접부탁 서술어(물어봐 달라고 하더라고요) 순서입니다.", source_unit: 30 },
      { quiz_id: "q30-13", type: "sentence_reordering", question: "단어를 올바른 순서로 배열하세요: [보통 / 휴지나 / 선물한다고 해요 / 세제를]", answer: "보통 휴지나 세제를 선물한다고 해요", explanation: "부사(보통) + 목적어(휴지나 세제를) + 간접전달 서술어(선물한다고 해요) 순서입니다.", source_unit: 30 }
    ]
  }
];
