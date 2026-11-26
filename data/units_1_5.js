window.ENGLISH_4A_UNITS_1_5 = [
  {
    id: 1,
    code: "Unit 1",
    title: "My school",
    cnTitle: "我的学校",
    themeColor: "#3B82F6",
    bgSoft: "#EFF6FF",
    icon: "🏫",
    bigTask: "Talking about my favourite place in the school",
    bigTaskCn: "介绍我最喜欢的校园角落",
    sound: {
      pattern: "w",
      example: "wall",
      tip: "字母 w 通常发 /w/ 的音，嘴巴噘圆再迅速张开，如 wall, we, window。"
    },
    words: [
      { word: "classroom", syllables: ["class", "room"], cn: "教室", pos: "n.", example: "In the classroom I study. We always keep it tidy." },
      { word: "sports field", syllables: ["sports", "field"], cn: "运动场", pos: "n.", example: "On the sports field I play football with Xiaopu." },
      { word: "hall", syllables: ["hall"], cn: "礼堂", pos: "n.", example: "In the hall I sing for all." },
      { word: "library", syllables: ["li", "bra", "ry"], cn: "图书馆", pos: "n.", example: "I like the library in my school best." },
      { word: "computer room", syllables: ["com", "pu", "ter", "room"], cn: "计算机机房", pos: "n.", example: "How about meeting in the computer room?" },
      { word: "school building", syllables: ["school", "build", "ing"], cn: "教学楼", pos: "n.", example: "All its school buildings are made of bamboo." },
      { word: "art room", syllables: ["art", "room"], cn: "美术教室", pos: "n.", example: "Students draw pictures in the art room." },
      { word: "bamboo", syllables: ["bam", "boo"], cn: "竹子", pos: "n.", example: "These bamboo buildings have no walls." },
      { word: "begin", syllables: ["be", "gin"], cn: "开始", pos: "v.", example: "Shenshen, shall we begin with our project?" },
      { word: "project", syllables: ["pro", "ject"], cn: "学校的课题", pos: "n.", example: "Miss Li asked us to work on a project." },
      { word: "student", syllables: ["stu", "dent"], cn: "学生", pos: "n.", example: "Every student loves the green school." },
      { word: "tall", syllables: ["tall"], cn: "高大的", pos: "adj.", example: "Our school building is tall and clean." }
    ],
    grammar: {
      ruleTitle: "have no = don't have any / has no = doesn't have any",
      ruleTip: "表达“没有……”有两种帅气写法：用 no 直接放名词前（have no / has no）；用 don't/doesn't have 时，记得后面要加 any！单数主语（如 The classroom）用 has 或 doesn't have。",
      examples: [
        "The classroom has no computers. = The classroom doesn't have any computers.",
        "These bamboo buildings have no walls. = These bamboo buildings don't have any walls."
      ],
      builders: [
        {
          prompt: "把句子拼完整：这间教室没有电脑。",
          tokens: ["The", "classroom", "has", "no", "computers."],
          answer: "The classroom has no computers.",
          explain: "The classroom 是单数，所以用 has no + 复数名词。"
        },
        {
          prompt: "用 doesn't have any 表达：这间教室没有电脑。",
          tokens: ["The", "classroom", "doesn't", "have", "any", "computers."],
          answer: "The classroom doesn't have any computers.",
          explain: "doesn't 后面动词要变回原形 have，否定句里用 any！"
        },
        {
          prompt: "把句子拼完整：这些竹子建筑没有墙。",
          tokens: ["These", "bamboo", "buildings", "have", "no", "walls."],
          answer: "These bamboo buildings have no walls.",
          explain: "buildings 是复数，所以用 have no walls。"
        }
      ],
      doctors: [
        {
          prompt: "找出病句里的错误并治好它：",
          parts: ["The", "classroom", "don't", "have", "any", "computers."],
          errorIndex: 2,
          options: ["doesn't", "aren't", "haven't"],
          correct: "doesn't",
          explain: "主语 The classroom 是第三人称单数，否定助动词要用 doesn't！"
        },
        {
          prompt: "找出病句里的错误并治好它：",
          parts: ["These", "bamboo", "buildings", "doesn't", "have", "any", "walls."],
          errorIndex: 3,
          options: ["don't", "has", "isn't"],
          correct: "don't",
          explain: "buildings 是复数，否定助动词要用 don't！"
        },
        {
          prompt: "找出病句里的错误并治好它：",
          parts: ["The", "room", "does", "not", "has", "any", "chairs."],
          errorIndex: 4,
          options: ["have", "having", "had"],
          correct: "have",
          explain: "前面已经有了助动词 does not，后面的动词要恢复原形 have！"
        }
      ]
    },
    speaking: {
      scene: "Let's meet there（申申和旻旻商量课题小组在哪里碰头）",
      npcName: "Minmin",
      npcAvatar: "👦🏻",
      lines: [
        {
          npc: "Shenshen, shall we begin with our project?",
          npcCn: "申申，我们可以开始做课题了吗？",
          target: "Sure. Where are James and Xiaopu?",
          keywords: ["Sure", "Where", "James", "Xiaopu"],
          hintCn: "回答“当然可以”，并问 James 和小浦在哪里。"
        },
        {
          npc: "James is in the library. Xiaopu is on the sports field. Shall we meet in the classroom?",
          npcCn: "James在图书馆，小浦在运动场。我们在教室碰头吗？",
          target: "The classroom has no computers. How about the computer room?",
          keywords: ["classroom", "no", "computers", "computer room"],
          hintCn: "说教室没有电脑，提议去计算机机房。"
        },
        {
          npc: "Which one? The one on the ground floor?",
          npcCn: "哪一间？底楼（一楼）那一间吗？",
          target: "Sure. Let's meet there then. See you soon.",
          keywords: ["Sure", "meet", "there", "soon"],
          hintCn: "答应下来，说一会儿见。"
        }
      ]
    },
    writing: {
      projectTitle: "My favourite place in the school",
      projectCn: "我的校园最爱角落手账卡",
      modelParts: [
        { role: "开头引入", color: "blue", text: "I like the library in my school best. It is on the ground floor." },
        { role: "细节特色", color: "green", text: "It is very special. It looks like a boat. The room does not have any chairs or desks." },
        { role: "我的活动", color: "orange", text: "In the library, I read many interesting books." }
      ],
      prompts: [
        { label: "1. 你最喜欢学校哪个地方？它在几楼？", placeholder: "I like the ... in my school best. It is on the ground floor." },
        { label: "2. 它有什么特别之处？它像什么？", placeholder: "It is big and clean. It looks like ..." },
        { label: "3. 它有什么（或没有什么）设施？", placeholder: "It has many ... / It has no ..." },
        { label: "4. 你在那里做什么？", placeholder: "In the ..., I often ..." }
      ],
      targetWords: ["school", "library", "classroom", "sports field", "hall", "computer room", "art room", "floor", "have", "has", "like"]
    }
  },
  {
    id: 2,
    code: "Unit 2",
    title: "My classmates",
    cnTitle: "我的同学",
    themeColor: "#F59E0B",
    bgSoft: "#FFFBEB",
    icon: "🤝",
    bigTask: "Playing a guessing game",
    bigTaskCn: "玩“猜猜他是谁”同学游戏",
    sound: {
      pattern: "x",
      example: "excited",
      tip: "字母 x 常发 /ks/ 的音，比如 excited, box, six。"
    },
    words: [
      { word: "lovely", syllables: ["love", "ly"], cn: "令人愉快的；可爱的", pos: "adj.", example: "Here are my lovely classmates." },
      { word: "different", syllables: ["dif", "fe", "rent"], cn: "不同的", pos: "adj.", example: "They are different but all great." },
      { word: "great", syllables: ["great"], cn: "好极的；很棒的", pos: "adj.", example: "My classmates are all great!" },
      { word: "interesting", syllables: ["in", "te", "rest", "ing"], cn: "有趣的", pos: "adj.", example: "He often tells interesting stories." },
      { word: "helpful", syllables: ["help", "ful"], cn: "愿意帮忙的", pos: "adj.", example: "James is helpful. He helps others learn English." },
      { word: "often", syllables: ["of", "ten"], cn: "时常；经常", pos: "adv.", example: "She often helps James with his Chinese." },
      { word: "always", syllables: ["al", "ways"], cn: "总是", pos: "adv.", example: "Xiaopu always helps teachers clean the blackboard." },
      { word: "English", syllables: ["Eng", "lish"], cn: "英语", pos: "n.", example: "Wenwen is good at English." },
      { word: "duck", syllables: ["duck"], cn: "躲闪；躲避", pos: "v.", example: "He sees the rope coming and he ducks." }
    ],
    grammar: {
      ruleTitle: "... help ... (do) ...（帮助某人做某事）",
      ruleTip: "help 后面接人，再接动作时，后面的动作直接用【动词原形】！注意：如果主语是 He/She/单个人名，前面的 help 要加 s 变成 helps，但后面那个动作永远保持原形！",
      examples: [
        "Xiaopu always helps teachers clean the blackboard.",
        "James often helps other students learn English.",
        "Wenwen always helps his little brother clean the room."
      ],
      builders: [
        {
          prompt: "拼出句子：小浦总是帮老师擦黑板。",
          tokens: ["Xiaopu", "always", "helps", "teachers", "clean", "the", "blackboard."],
          answer: "Xiaopu always helps teachers clean the blackboard.",
          explain: "主语 Xiaopu 是单数，所以用 helps；后面的 clean 保持动词原形！"
        },
        {
          prompt: "拼出句子：James 经常帮其他同学学英语。",
          tokens: ["James", "often", "helps", "other", "students", "learn", "English."],
          answer: "James often helps other students learn English.",
          explain: "helps + 某人 + 动词原形 learn！"
        },
        {
          prompt: "拼出句子：她擅长画画，想成为画家。",
          tokens: ["She", "is", "good", "at", "painting", "pictures."],
          answer: "She is good at painting pictures.",
          explain: "be good at 后面接动词的 -ing 形式（painting）！"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["James", "often", "helps", "students", "learns", "English."],
          errorIndex: 4,
          options: ["learn", "learning", "learned"],
          correct: "learn",
          explain: "help 某人 + 动词原形，这里要把 learns 改成原形 learn！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Xiaopu", "always", "help", "teachers", "clean", "the", "blackboard."],
          errorIndex: 2,
          options: ["helps", "helping", "helped"],
          correct: "helps",
          explain: "Xiaopu 是第三人称单数，前面的动词 help 要戴上 s 小帽子变成 helps！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Minmin", "is", "good", "in", "football."],
          errorIndex: 3,
          options: ["at", "on", "to"],
          correct: "at",
          explain: "“擅长……”是固定搭配 be good at！"
        }
      ]
    },
    speaking: {
      scene: "Who is he?（申申和同学们玩猜同学游戏）",
      npcName: "Shenshen",
      npcAvatar: "👧🏻",
      lines: [
        {
          npc: "He has a lovely smile. He often tells interesting stories. Who is he?",
          npcCn: "他有可爱的笑容，经常讲有趣的故事。他是谁？",
          target: "Let me try. Is he Minmin?",
          keywords: ["Let me try", "Is he", "Minmin"],
          hintCn: "说“让我试试”，并猜是不是旻旻。"
        },
        {
          npc: "No. He is helpful. He always helps teachers clean the blackboard.",
          npcCn: "不是哦。他很乐于助人，总是帮老师擦黑板。",
          target: "Is he Xiaopu?",
          keywords: ["Is he", "Xiaopu"],
          hintCn: "猜猜是不是小浦。"
        },
        {
          npc: "And he often helps other students learn English. It's you, James!",
          npcCn: "而且他还经常帮同学学英语。就是你，James！",
          target: "Me? Haha, thank you! You are helpful too.",
          keywords: ["Me", "thank you", "helpful"],
          hintCn: "开心回应“是我吗？谢谢你！你也很乐于助人。”"
        }
      ]
    },
    writing: {
      projectTitle: "A guessing game about classmates",
      projectCn: "猜猜我的好同学谜语卡",
      modelParts: [
        { role: "性格特点", color: "blue", text: "She is friendly and helpful." },
        { role: "助人与特长", color: "green", text: "She often helps me draw. She is good at painting pictures." },
        { role: "梦想与提问", color: "orange", text: "She wants to be a painter. Who is she?" }
      ],
      prompts: [
        { label: "1. 你的同学是什么性格？（lovely / friendly / helpful / interesting）", placeholder: "I have a classmate. He/She is ..." },
        { label: "2. 他/她经常帮大家做什么？（用 helps ... do ...）", placeholder: "He/She often helps ..." },
        { label: "3. 他/她擅长什么？（用 is good at ...）", placeholder: "He/She is good at ..." },
        { label: "4. 他/她长大想成为什么？最后反问大家猜猜看！", placeholder: "He/She wants to be a ... Who is he/she?" }
      ],
      targetWords: ["classmate", "helpful", "lovely", "interesting", "often", "always", "helps", "good at", "wants to be"]
    }
  },
  {
    id: 3,
    code: "Unit 3",
    title: "Animals and their homes",
    cnTitle: "动物和它们的家",
    themeColor: "#10B981",
    bgSoft: "#ECFDF5",
    icon: "🐘",
    bigTask: "Making an animal card",
    bigTaskCn: "制作野生动物保护档案卡",
    sound: {
      pattern: "v",
      example: "very",
      tip: "字母 v 发 /v/ 的音，上排牙齿轻轻咬住下嘴唇并震动声带，如 very, river, live。"
    },
    words: [
      { word: "panda", syllables: ["pan", "da"], cn: "大熊猫", pos: "n.", example: "Pandas are from Sichuan. Sichuan is their hometown." },
      { word: "hometown", syllables: ["home", "town"], cn: "家乡", pos: "n.", example: "Yunnan is the elephants' hometown." },
      { word: "monkey", syllables: ["mon", "key"], cn: "猴子", pos: "n.", example: "The monkeys are playing in the trees." },
      { word: "elephant", syllables: ["el", "e", "phant"], cn: "象", pos: "n.", example: "Elephants like living in places with trees and water." },
      { word: "baby elephant", syllables: ["ba", "by", "el", "e", "phant"], cn: "小象", pos: "n.", example: "The baby elephant is swimming in the river." },
      { word: "polar bear", syllables: ["po", "lar", "bear"], cn: "北极熊", pos: "n.", example: "Polar bears live near the North Pole." },
      { word: "trunk", syllables: ["trunk"], cn: "象鼻", pos: "n.", example: "Elephants shower with their trunks." },
      { word: "tail", syllables: ["tail"], cn: "尾巴", pos: "n.", example: "The mother elephant is pulling her baby back by the tail." },
      { word: "the North Pole", syllables: ["the", "North", "Pole"], cn: "北极", pos: "n.", example: "It is very cold near the North Pole." },
      { word: "India", syllables: ["In", "di", "a"], cn: "印度", pos: "n.", example: "We can see elephants in India and Africa too." },
      { word: "Africa", syllables: ["Af", "ri", "ca"], cn: "非洲", pos: "n.", example: "Many wild animals live in Africa." },
      { word: "kind", syllables: ["kind"], cn: "友好的", pos: "adj.", example: "Farmers are very kind to the elephants." }
    ],
    grammar: {
      ruleTitle: "现在进行时：be (am/is/are) + 动词-ing",
      ruleTip: "描述“此刻正在做什么”，需要两位搭档手拉手：前面的 be 动词（单数 is / 复数 are）+ 后面的动词 -ing！注意 swim 要双写 m 变成 swimming！",
      examples: [
        "The elephant family are playing in the river.",
        "The baby elephant is swimming in the river.",
        "The monkeys are playing in the trees."
      ],
      builders: [
        {
          prompt: "拼出句子：小象正在河里游泳。",
          tokens: ["The", "baby", "elephant", "is", "swimming", "in", "the", "river."],
          answer: "The baby elephant is swimming in the river.",
          explain: "一只小象是单数，用 is + swimming（双写 m 加 ing）。"
        },
        {
          prompt: "拼出句子：猴子们正在树上玩耍。",
          tokens: ["The", "monkeys", "are", "playing", "in", "the", "trees."],
          answer: "The monkeys are playing in the trees.",
          explain: "monkeys 是复数，所以用 are playing。"
        },
        {
          prompt: "拼出句子：大象一家正在河里玩。",
          tokens: ["The", "elephant", "family", "are", "playing", "in", "the", "river."],
          answer: "The elephant family are playing in the river.",
          explain: "这里 family 指大象一家成员们，课本中用复数 are playing。"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["The", "baby", "elephant", "are", "swimming", "in", "the", "river."],
          errorIndex: 3,
          options: ["is", "am", "be"],
          correct: "is",
          explain: "The baby elephant 是单数，be 动词要用 is！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Look!", "The", "monkeys", "are", "play", "in", "the", "trees."],
          errorIndex: 4,
          options: ["playing", "plays", "played"],
          correct: "playing",
          explain: "看到 Look! 和前面的 are，表示正在玩耍，动词要加 ing 变成 playing！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["The", "baby", "elephant", "is", "swiming", "in", "the", "river."],
          errorIndex: 4,
          options: ["swimming", "swim", "swims"],
          correct: "swimming",
          explain: "swim 变现在分词要双写末尾辅音 m，写作 swimming！"
        }
      ]
    },
    speaking: {
      scene: "Elephants in Yunnan（申申和妈妈看电视聊云南野生亚洲象）",
      npcName: "Mum",
      npcAvatar: "👩🏻",
      lines: [
        {
          npc: "Look, the elephant family are playing in the river. Where are they from?",
          npcCn: "看，大象一家正在河里玩呢。它们来自哪里？",
          target: "They are from Yunnan. Yunnan is their hometown.",
          keywords: ["Yunnan", "hometown"],
          hintCn: "回答它们来自云南，云南是它们的家乡。"
        },
        {
          npc: "Look at that baby elephant! What is it doing?",
          npcCn: "看那只小象！它正在干什么？",
          target: "It is swimming in the river. How cute!",
          keywords: ["swimming", "river", "cute"],
          hintCn: "用现在进行时说它正在河里游泳，好可爱！"
        },
        {
          npc: "Where do polar bears live and what do they eat?",
          npcCn: "北极熊住在哪里？它们吃什么？",
          target: "Polar bears live near the North Pole. They catch seals and fish for food.",
          keywords: ["North Pole", "seals", "fish"],
          hintCn: "回答北极熊住在北极附近，抓海豹和鱼吃。"
        }
      ]
    },
    writing: {
      projectTitle: "An animal card",
      projectCn: "我的动物档案卡",
      modelParts: [
        { role: "动物与家乡", color: "blue", text: "These monkeys are from Guizhou. They live in the mountains and trees." },
        { role: "外貌与食物", color: "green", text: "They have a long tail and long arms. They eat fruit and leaves." },
        { role: "本领与画面", color: "orange", text: "They can climb trees and swing on branches. In the picture, they are playing." }
      ],
      prompts: [
        { label: "1. 你最喜欢什么动物？它们来自哪里？（hometown）", placeholder: "These ... are from ... They live in ..." },
        { label: "2. 它们长什么样子？（颜色、耳朵、鼻子、尾巴、皮毛）", placeholder: "They are ... They have ..." },
        { label: "3. 它们吃什么？它们会做什么？", placeholder: "They eat ... They can ..." },
        { label: "4. 想象一张照片：它们正在做什么？（be + doing）", placeholder: "In the picture, they are ..." }
      ],
      targetWords: ["panda", "monkey", "elephant", "polar bear", "hometown", "live", "eat", "playing", "swimming"]
    }
  },
  {
    id: 4,
    code: "Unit 4",
    title: "Our birthday",
    cnTitle: "我们的十岁生日",
    themeColor: "#EC4899",
    bgSoft: "#FDF2F8",
    icon: "🎂",
    bigTask: "Making a plan for our group birthday party",
    bigTaskCn: "策划十岁集体生日派对",
    sound: {
      pattern: "e",
      example: "she",
      tip: "开音节里的字母 e 常发长元音 /iː/，如 she, he, we, me。"
    },
    words: [
      { word: "invitation", syllables: ["in", "vi", "ta", "tion"], cn: "邀请；邀请函", pos: "n.", example: "It's our birthday party invitation." },
      { word: "party", syllables: ["par", "ty"], cn: "聚会；联欢会", pos: "n.", example: "Welcome to our group birthday party." },
      { word: "activity", syllables: ["ac", "ti", "vi", "ty"], cn: "活动", pos: "n.", example: "We have fun activities at the party." },
      { word: "share a cake", syllables: ["share", "a", "cake"], cn: "分享蛋糕", pos: "phr.", example: "We watch a play and share a big cake." },
      { word: "letter", syllables: ["let", "ter"], cn: "信；函", pos: "n.", example: "It's a tradition to read parents' letters." },
      { word: "tradition", syllables: ["tra", "di", "tion"], cn: "传统", pos: "n.", example: "It's a tradition to eat birthday noodles." },
      { word: "bowl", syllables: ["bowl"], cn: "碗", pos: "n.", example: "Mum cooks a bowl of noodles for Minmin." },
      { word: "egg", syllables: ["egg"], cn: "鸡蛋", pos: "n.", example: "There are two eggs in this bowl." },
      { word: "bring", syllables: ["bring"], cn: "带来", pos: "v.", example: "Please bring a letter to your child." },
      { word: "child", syllables: ["child"], cn: "儿童（复数 children）", pos: "n.", example: "Parents wish their child good health." },
      { word: "wish", syllables: ["wish"], cn: "祝愿", pos: "v.", example: "Parents wish us a long and happy life." },
      { word: "soup", syllables: ["soup"], cn: "汤；羹", pos: "n.", example: "Grandma had soup noodles at ten." }
    ],
    grammar: {
      ruleTitle: "It's a tradition to (do) ...（做……是一个传统）",
      ruleTip: "记牢黄金结构：It's a tradition to + 动词原形！千万别漏掉 to，也别在 to 后面把动词加 s 或 ing 哦。",
      examples: [
        "It's a tradition to read parents' letters at our group birthday party.",
        "It's a tradition to eat a bowl of noodles on your birthday.",
        "It's a tradition to take a family photo on your birthday."
      ],
      builders: [
        {
          prompt: "拼出句子：生日吃一碗面条是一个传统。",
          tokens: ["It's", "a", "tradition", "to", "eat", "a", "bowl", "of", "noodles."],
          answer: "It's a tradition to eat a bowl of noodles.",
          explain: "It's a tradition to + 动词原形 eat，a bowl of noodles 表示“一碗面条”。"
        },
        {
          prompt: "拼出句子：在生日那天拍全家福是一个传统。",
          tokens: ["It's", "a", "tradition", "to", "take", "a", "family", "photo."],
          answer: "It's a tradition to take a family photo.",
          explain: "It's a tradition to + take（动词原形）。"
        },
        {
          prompt: "拼出句子：请带一封信给你的孩子。",
          tokens: ["Please", "bring", "a", "letter", "to", "your", "child."],
          answer: "Please bring a letter to your child.",
          explain: "bring ... to ... 表示“把……带给……”。"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["It's", "a", "tradition", "to", "eating", "noodles", "on", "your", "birthday."],
          errorIndex: 4,
          options: ["eat", "eats", "ate"],
          correct: "eat",
          explain: "to 后面要接动词原形 eat！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["In", "this", "bowl,", "there", "is", "two", "eggs."],
          errorIndex: 4,
          options: ["are", "am", "be"],
          correct: "are",
          explain: "two eggs 是复数，所以要用 there are！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Please", "bring", "letters", "to", "your", "childs."],
          errorIndex: 5,
          options: ["children", "childes", "child"],
          correct: "children",
          explain: "child 是不规则复数名词，复数是 children！"
        }
      ]
    },
    speaking: {
      scene: "Letters of love（十岁成长礼上，李老师带领大家读父母的信）",
      npcName: "Miss Li",
      npcAvatar: "👩🏻‍🏫",
      lines: [
        {
          npc: "It's a tradition to read parents' letters at our group birthday party. What does your dad write?",
          npcCn: "在十岁集体生日读父母的信是个传统。你爸爸写了什么？",
          target: "My dad writes: Work hard and your dreams will come true.",
          keywords: ["dad", "Work hard", "dreams", "come true"],
          hintCn: "读出爸爸的寄语：努力学习，梦想就会成真。"
        },
        {
          npc: "What's the tradition on your birthday at home?",
          npcCn: "你们家过生日有什么传统呢？",
          target: "It's a tradition to eat a bowl of birthday noodles.",
          keywords: ["tradition", "eat", "bowl", "noodles"],
          hintCn: "用 It's a tradition to ... 说吃一碗长寿面。"
        },
        {
          npc: "How lovely these letters are! Let's say thank you to your parents.",
          npcCn: "这些信多有爱呀！让我们向爸爸妈妈说声谢谢吧。",
          target: "Thank you, Mum and Dad! I love you!",
          keywords: ["Thank you", "Mum", "Dad", "love"],
          hintCn: "大声向爸爸妈妈表达感谢和爱！"
        }
      ]
    },
    writing: {
      projectTitle: "A birthday plan & Thank-you card",
      projectCn: "我的十岁生日派对计划与感恩卡",
      modelParts: [
        { role: "邀请与时间", color: "blue", text: "This is my plan for our group birthday party. It is on 28 October." },
        { role: "活动与物品", color: "green", text: "We can share a big cake and watch a show. We need balloons and gifts." },
        { role: "传统与感恩", color: "orange", text: "It's a tradition to read parents' letters. Thank you, Mum and Dad! I love you!" }
      ],
      prompts: [
        { label: "1. 介绍你的十岁生日派对计划及日期/时间：", placeholder: "This is my plan for our group birthday party. It is on ..." },
        { label: "2. 派对上我们可以做哪些活动？（share a cake / watch a show / play games）", placeholder: "We can ... at the party." },
        { label: "3. 我们需要准备哪些物品？（balloons / gifts / letters / a cake）", placeholder: "We need ..." },
        { label: "4. 写一句我们的生日传统，并向父母道谢！", placeholder: "It's a tradition to ... Thank you, Mum and Dad!" }
      ],
      targetWords: ["party", "invitation", "tradition", "share a cake", "letter", "noodles", "Thank you", "love"]
    }
  },
  {
    id: 5,
    code: "Unit 5",
    title: "Visiting places",
    cnTitle: "游览好去处",
    themeColor: "#0EA5E9",
    bgSoft: "#F0F9FF",
    icon: "🚤",
    bigTask: "Showing a photo of my favourite place",
    bigTaskCn: "晒出我最爱地点的照片",
    sound: {
      pattern: "z",
      example: "amazing",
      tip: "字母 z 发浊辅音 /z/，像小蜜蜂嗡嗡声，声带要震动，如 amazing, zoo, zebra。"
    },
    words: [
      { word: "neighbourhood", syllables: ["neigh", "bour", "hood"], cn: "街区；社区", pos: "n.", example: "Welcome to my lovely neighbourhood!" },
      { word: "park", syllables: ["park"], cn: "公园", pos: "n.", example: "There's a nice park in my neighbourhood." },
      { word: "museum", syllables: ["mu", "se", "um"], cn: "博物馆", pos: "n.", example: "Is there a museum here? Yes, there is." },
      { word: "cinema", syllables: ["ci", "ne", "ma"], cn: "电影院", pos: "n.", example: "There's a new cinema near my home." },
      { word: "supermarket", syllables: ["su", "per", "mar", "ket"], cn: "超市", pos: "n.", example: "We buy fruit in the supermarket." },
      { word: "bridge", syllables: ["bridge"], cn: "桥", pos: "n.", example: "There are a lot of colourful bridges in Venice." },
      { word: "boat", syllables: ["boat"], cn: "小船", pos: "n.", example: "People in Venice go around the city by boat." },
      { word: "photo", syllables: ["pho", "to"], cn: "照片", pos: "n.", example: "Let's go and take some photos." },
      { word: "amazing", syllables: ["a", "ma", "zing"], cn: "令人惊奇的", pos: "adj.", example: "Two bridges are over 400 years old. That's amazing!" },
      { word: "restaurant", syllables: ["res", "tau", "rant"], cn: "餐馆", pos: "n.", example: "There are many restaurants by the water." },
      { word: "shop", syllables: ["shop"], cn: "商店", pos: "n.", example: "I like the old houses and shops." },
      { word: "go around", syllables: ["go", "a", "round"], cn: "参观（附近某处）", pos: "phr.", example: "It is nice to go around my neighbourhood." }
    ],
    grammar: {
      ruleTitle: "Is/Are there ...? — Yes, there is/are. / No, there isn't/aren't.",
      ruleTip: "问某个地方“有没有……”，单数用 Is there a ...? 复数用 Are there any ...?（注意：疑问句里 some 要变成 any 哦！）",
      examples: [
        "Is there a museum here? — Yes, there is. / No, there isn't.",
        "Are there any nice old bridges around? — Yes, there are. / No, there aren't."
      ],
      builders: [
        {
          prompt: "拼出问句：这附近有漂亮的古桥吗？",
          tokens: ["Are", "there", "any", "nice", "old", "bridges", "around?"],
          answer: "Are there any nice old bridges around?",
          explain: "bridges 是复数，疑问句用 Are there any ...?"
        },
        {
          prompt: "拼出问句：这里有博物馆吗？",
          tokens: ["Is", "there", "a", "museum", "here?"],
          answer: "Is there a museum here?",
          explain: "a museum 是单数，疑问句用 Is there ...?"
        },
        {
          prompt: "拼出句子：威尼斯人乘船游览城市。",
          tokens: ["People", "in", "Venice", "go", "around", "the", "city", "by", "boat."],
          answer: "People in Venice go around the city by boat.",
          explain: "乘船用固定搭配 by boat！"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Are", "there", "some", "old", "bridges", "around?"],
          errorIndex: 2,
          options: ["any", "a", "an"],
          correct: "any",
          explain: "在疑问句里，some 通常要变成 any！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Is", "there", "any", "buses", "in", "the", "water", "town?"],
          errorIndex: 0,
          options: ["Are", "Do", "Does"],
          correct: "Are",
          explain: "buses 是复数，所以开头要用 Are there!"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["People", "in", "Venice", "go", "around", "in", "boat."],
          errorIndex: 5,
          options: ["by", "on", "at"],
          correct: "by",
          explain: "乘坐交通工具（不加冠词时）用介词 by，即 by boat！"
        }
      ]
    },
    speaking: {
      scene: "Visiting an old water town（申申、妈妈和瑶瑶游览江南水乡古镇）",
      npcName: "Yaoyao",
      npcAvatar: "👧🏻",
      lines: [
        {
          npc: "Look, there's a beautiful river! What can we do?",
          npcCn: "看，有一条漂亮的河！我们可以干什么？",
          target: "Let's go on a boat trip.",
          keywords: ["Let's", "boat", "trip"],
          hintCn: "提议一起去乘船游览（boat trip）。"
        },
        {
          npc: "Two bridges near here are over 400 years old!",
          npcCn: "这附近有两座桥都有 400 多年历史了！",
          target: "That's amazing! I want to take a photo.",
          keywords: ["amazing", "take", "photo"],
          hintCn: "感叹太神奇了，并说你想拍张照。"
        },
        {
          npc: "Is there a museum in your neighbourhood?",
          npcCn: "你们社区里有博物馆吗？",
          target: "Yes, there is. There is a nice park too.",
          keywords: ["there is", "park"],
          hintCn: "用 Yes, there is. 回答，并补充还有一个漂亮的公园。"
        }
      ]
    },
    writing: {
      projectTitle: "A photo of my favourite place",
      projectCn: "我最爱地点的旅行明信片",
      modelParts: [
        { role: "地点介绍", color: "blue", text: "Look, this is a nice place to visit. It is a big park in my neighbourhood." },
        { role: "景色细节", color: "green", text: "It is nice and clean. There are many tall old trees and a big playground." },
        { role: "推荐理由", color: "orange", text: "I go there with my mum every week. Welcome to visit it!" }
      ],
      prompts: [
        { label: "1. 介绍你最喜欢游览的地方（家乡社区公园/水乡古镇/威尼斯）：", placeholder: "Look, this is a nice place to visit. It is ..." },
        { label: "2. 那里看起来怎么样？有什么特色？（There is/are ...）", placeholder: "It is ... There are many ..." },
        { label: "3. 人们可以怎样去那里或参观？（by boat / on foot）", placeholder: "People can go around by ... / I go there with ..." },
        { label: "4. 写一句欢迎语或你喜欢它的理由！", placeholder: "I like it because ... Welcome to ..." }
      ],
      targetWords: ["neighbourhood", "park", "museum", "bridge", "boat", "amazing", "There is", "There are", "visit"]
    }
  }
];
