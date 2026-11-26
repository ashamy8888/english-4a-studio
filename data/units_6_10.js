window.ENGLISH_4A_UNITS_6_10 = [
  {
    id: 6,
    code: "Unit 6",
    title: "It's autumn!",
    cnTitle: "秋天来啦！",
    themeColor: "#EA580C",
    bgSoft: "#FFF7ED",
    icon: "🍁",
    bigTask: "Writing a poem for autumn",
    bigTaskCn: "为秋天写一首英文小诗",
    sound: {
      pattern: "y",
      example: "year",
      tip: "字母 y 在词首常发 /j/ 的音，如 year, yellow, yes, you。"
    },
    words: [
      { word: "autumn", syllables: ["au", "tumn"], cn: "秋天", pos: "n.", example: "It's autumn! How lovely autumn is!" },
      { word: "farm", syllables: ["farm"], cn: "农场", pos: "n.", example: "We pick sweet fruits on the farm." },
      { word: "fall", syllables: ["fall"], cn: "落下；秋天", pos: "v.", example: "Colourful leaves fall in autumn." },
      { word: "leaf", syllables: ["leaf"], cn: "叶子（复数 leaves）", pos: "n.", example: "A falling Wutong leaf tells us autumn is coming." },
      { word: "fruit", syllables: ["fruit"], cn: "水果", pos: "n.", example: "We pick nice and sweet fruits." },
      { word: "fly south", syllables: ["fly", "south"], cn: "往南飞", pos: "phr.", example: "I see birds flying south." },
      { word: "apple", syllables: ["ap", "ple"], cn: "苹果", pos: "n.", example: "Minmin enjoys picking apples." },
      { word: "golden", syllables: ["gold", "en"], cn: "金色的", pos: "adj.", example: "Minmin sees the colourful forest and golden fields." },
      { word: "worker", syllables: ["work", "er"], cn: "工作者", pos: "n.", example: "The workers in Saihanba are working hard." }
    ],
    grammar: {
      ruleTitle: "How 引导的感叹句：How + 形容词 + 主语 + is/are!",
      ruleTip: "想赞叹某样东西“多么……呀！”，记住公式：How + 形容词（blue/high/beautiful）+ the 东西 + is/are! 注意 How 后面紧跟形容词，不要加 a/an 哦！",
      examples: [
        "How blue the sky is!",
        "How high the kites are!",
        "How busy the farmer is!",
        "How beautiful the leaves are!"
      ],
      builders: [
        {
          prompt: "拼出感叹句：天空多蓝呀！",
          tokens: ["How", "blue", "the", "sky", "is!"],
          answer: "How blue the sky is!",
          explain: "How + 形容词 blue + the sky（单数）+ is!"
        },
        {
          prompt: "拼出感叹句：这些梧桐叶多美呀！",
          tokens: ["How", "beautiful", "these", "Wutong", "leaves", "are!"],
          answer: "How beautiful these Wutong leaves are!",
          explain: "leaves 是复数，所以句尾用 are!"
        },
        {
          prompt: "拼出感叹句：风筝飞得多高呀！",
          tokens: ["How", "high", "the", "kites", "are!"],
          answer: "How high the kites are!",
          explain: "How + 形容词 high + the kites + are!"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个感叹句！",
          parts: ["How", "beautiful", "the", "leaves", "is!"],
          errorIndex: 4,
          options: ["are!", "am!", "be!"],
          correct: "are!",
          explain: "the leaves（树叶）是复数，所以句尾 be 动词要用 are!"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["We", "dance", "with", "falling", "leafs."],
          errorIndex: 4,
          options: ["leaves.", "leaf.", "leafes."],
          correct: "leaves.",
          explain: "以 f 结尾的 leaf 变复数，要把 f 改为 ves，写作 leaves!"
        },
        {
          prompt: "语法小医生：治好这个感叹句！",
          parts: ["What", "blue", "the", "sky", "is!"],
          errorIndex: 0,
          options: ["How", "Where", "Who"],
          correct: "How",
          explain: "直接修饰形容词 blue 时，感叹句开头要用 How！"
        }
      ]
    },
    speaking: {
      scene: "An autumn outing（李老师带同学们秋游寻找上海的秋天）",
      npcName: "Xiaopu",
      npcAvatar: "👦🏻",
      lines: [
        {
          npc: "Look at the trees here! How beautiful these Wutong leaves are!",
          npcCn: "看这里的树！这些梧桐叶多美呀！",
          target: "Yes, they are! A falling Wutong leaf tells us autumn is coming.",
          keywords: ["falling", "Wutong", "leaf", "autumn"],
          hintCn: "赞同并说：一片飘落的梧桐叶告诉我们秋天来了。"
        },
        {
          npc: "Wow! Look up at the sky and the kites!",
          npcCn: "哇！抬头看天空和风筝！",
          target: "How blue the sky is! How high the kites are!",
          keywords: ["How blue", "sky", "How high", "kites"],
          hintCn: "用两个 How 感叹句赞叹蓝天和高飞的风筝。"
        },
        {
          npc: "What do you like doing in autumn?",
          npcCn: "你秋天喜欢做什么？",
          target: "I like picking fruits on the farm and looking for colourful leaves.",
          keywords: ["picking", "fruits", "farm", "leaves"],
          hintCn: "说你喜欢在农场摘水果、寻找彩色的树叶。"
        }
      ]
    },
    writing: {
      projectTitle: "A poem for autumn",
      projectCn: "我的秋日英文小诗卡",
      modelParts: [
        { role: "开篇点题", color: "blue", text: "It's autumn. I see birds flying south." },
        { role: "五感描绘", color: "green", text: "I smell nice fruits. I pick up colourful leaves. I feel the cool wind." },
        { role: "感叹结尾", color: "orange", text: "How lovely autumn is!" }
      ],
      prompts: [
        { label: "1. 秋天来了，你看到了什么？（I see ...）", placeholder: "It's autumn. I see ..." },
        { label: "2. 你闻到了什么？（I smell ...）", placeholder: "I smell ..." },
        { label: "3. 你在秋天做什么？（I pick up ... / I dance with ...）", placeholder: "I pick up ..." },
        { label: "4. 你感受到了什么？用一句 How 感叹句结尾！", placeholder: "I feel the cool wind. How lovely autumn is!" }
      ],
      targetWords: ["autumn", "leaves", "fly south", "fruit", "golden", "cool", "How"]
    }
  },
  {
    id: 7,
    code: "Unit 7",
    title: "My healthy breakfast",
    cnTitle: "我的健康早餐",
    themeColor: "#EAB308",
    bgSoft: "#FEFCE8",
    icon: "🥟",
    bigTask: "Doing a survey about a healthy breakfast",
    bigTaskCn: "小小营养师：健康早餐调查",
    sound: {
      pattern: "sh",
      example: "shout",
      tip: "字母组合 sh 发 /ʃ/ 的音（像嘘声），如 shout, shaomai, fish, share。"
    },
    words: [
      { word: "breakfast", syllables: ["break", "fast"], cn: "早餐", pos: "n.", example: "Baozi is my favourite breakfast." },
      { word: "menu", syllables: ["me", "nu"], cn: "菜单", pos: "n.", example: "Look at our healthy breakfast menu." },
      { word: "bread", syllables: ["bread"], cn: "面包", pos: "n.", example: "How often does James eat bread for breakfast?" },
      { word: "juice", syllables: ["juice"], cn: "果汁", pos: "n.", example: "I would like some orange juice." },
      { word: "milk", syllables: ["milk"], cn: "牛奶", pos: "n.", example: "Milk has a lot of protein." },
      { word: "soya milk", syllables: ["so", "ya", "milk"], cn: "豆浆", pos: "n.", example: "Soya milk has a lot of vegetable protein." },
      { word: "banana", syllables: ["ba", "na", "na"], cn: "香蕉", pos: "n.", example: "Bananas are sweet and healthy." },
      { word: "energy", syllables: ["en", "er", "gy"], cn: "能量", pos: "n.", example: "Baozi and shaomai give people energy." },
      { word: "protein", syllables: ["pro", "tein"], cn: "蛋白质", pos: "n.", example: "Eggs have a lot of protein and vitamin D." },
      { word: "vitamin", syllables: ["vi", "ta", "min"], cn: "维生素", pos: "n.", example: "Fruits have many kinds of vitamins." },
      { word: "week", syllables: ["week"], cn: "周；星期", pos: "n.", example: "I have sandwiches twice a week." },
      { word: "tomorrow", syllables: ["to", "mor", "row"], cn: "明天", pos: "n.", example: "I'll have baozi for breakfast tomorrow." }
    ],
    grammar: {
      ruleTitle: "How often ...? — Once / Twice / ... times a week.",
      ruleTip: "问“多久吃/做一次”用 How often！回答频率：1次是 once，2次是 twice，3次及以上用“数字 + times”（如 three times a week）。",
      examples: [
        "How often do you have sandwiches? — Twice or three times a week.",
        "How often does James eat bread for breakfast? — Once or twice a week."
      ],
      builders: [
        {
          prompt: "拼出问句：你多久吃一次三明治？",
          tokens: ["How", "often", "do", "you", "have", "sandwiches?"],
          answer: "How often do you have sandwiches?",
          explain: "How often + do you + 动词原形，用来询问频率。"
        },
        {
          prompt: "拼出回答：一周两到三次。",
          tokens: ["Twice", "or", "three", "times", "a", "week."],
          answer: "Twice or three times a week.",
          explain: "两次是 twice，三次是 three times！"
        },
        {
          prompt: "拼出营养知识：鸡蛋含有很多蛋白质。",
          tokens: ["An", "egg", "has", "a", "lot", "of", "protein."],
          answer: "An egg has a lot of protein.",
          explain: "egg 以元音音素开头，用 An egg；单数用 has。"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["I", "drink", "soya", "milk", "two", "times", "a", "week."],
          errorIndex: 4,
          options: ["twice (去掉times)", "once", "three"],
          correct: "twice (去掉times)",
          explain: "英语里“两次”习惯直接说 twice，不说 two times！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["How", "often", "do", "James", "eat", "bread", "for", "breakfast?"],
          errorIndex: 2,
          options: ["does", "is", "are"],
          correct: "does",
          explain: "主语 James 是第三人称单数，助动词要用 does！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Shaomai", "give", "people", "energy."],
          errorIndex: 1,
          options: ["gives", "giving", "to give"],
          correct: "gives",
          explain: "Shaomai（不可数食物名）作主语视为单数，动词加 s 变成 gives！"
        }
      ]
    },
    speaking: {
      scene: "James' favourite breakfast（周日早上申申和 James 视频聊中西早餐）",
      npcName: "James",
      npcAvatar: "👦🏼",
      lines: [
        {
          npc: "Hi! I'm making a sandwich. What do you eat for breakfast in China?",
          npcCn: "嗨！我正在做三明治。你们在中国早餐吃什么？",
          target: "In China, we eat baozi, jiaozi and many other foods for breakfast.",
          keywords: ["China", "baozi", "jiaozi", "breakfast"],
          hintCn: "介绍中国早餐有包子、饺子等很多美食。"
        },
        {
          npc: "How often do you drink milk or soya milk for breakfast?",
          npcCn: "你早餐多久喝一次牛奶或豆浆？",
          target: "I drink milk every day. It has a lot of protein.",
          keywords: ["milk", "every day", "protein"],
          hintCn: "回答每天喝牛奶，它富含蛋白质。"
        },
        {
          npc: "Which food is the best breakfast?",
          npcCn: "哪种食物是最好的早餐呀？",
          target: "All of them are the best! They give us energy, protein and vitamins.",
          keywords: ["All", "best", "energy", "vitamins"],
          hintCn: "说出故事结论：营养均衡，大家都是最好的！"
        }
      ]
    },
    writing: {
      projectTitle: "A healthy breakfast survey",
      projectCn: "小小营养师早餐报告卡",
      modelParts: [
        { role: "早餐选择", color: "blue", text: "I like eating baozi and eggs for my breakfast. I also drink soya milk." },
        { role: "食用频率", color: "green", text: "I have baozi twice a week and I drink soya milk every day." },
        { role: "健康原因", color: "orange", text: "Baozi gives me energy. Eggs and soya milk have a lot of protein. They are good for me!" }
      ],
      prompts: [
        { label: "1. 你早餐喜欢吃什么、喝什么？", placeholder: "I like eating ... and drinking ... for my breakfast." },
        { label: "2. 你多久吃一次？（every day / once or twice a week）", placeholder: "I have ... a week." },
        { label: "3. 为什么它们很健康？（energy / protein / vitamins）", placeholder: "... gives me energy. ... has a lot of protein." },
        { label: "4. 用一句总结（They are healthy and good for me!）：", placeholder: "They are healthy and good for me!" }
      ],
      targetWords: ["breakfast", "milk", "soya milk", "egg", "bread", "energy", "protein", "vitamin", "week"]
    }
  },
  {
    id: 8,
    code: "Unit 8",
    title: "Be honest",
    cnTitle: "做诚实的孩子",
    themeColor: "#8B5CF6",
    bgSoft: "#F5F3FF",
    icon: "🪴",
    bigTask: "Writing tips for being an honest child",
    bigTaskCn: "写下我的“诚实小贴士”",
    sound: {
      pattern: "i_e / ie / igh",
      example: "time / lie / right",
      tip: "这三组拼写 i_e (time)、ie (lie)、igh (right) 都发同一个双元音 /aɪ/！"
    },
    words: [
      { word: "honest", syllables: ["hon", "est"], cn: "诚实的；正直的", pos: "adj.", example: "The honest boy wins the empty pot test." },
      { word: "keep one's word", syllables: ["keep", "one's", "word"], cn: "遵守诺言", pos: "phr.", example: "She always keeps her word." },
      { word: "give ... back", syllables: ["give", "back"], cn: "归还……", pos: "phr.", example: "She gives things back on time." },
      { word: "tell the truth", syllables: ["tell", "the", "truth"], cn: "说真话", pos: "phr.", example: "We should always tell the truth." },
      { word: "never tell a lie", syllables: ["ne", "ver", "tell", "a", "lie"], cn: "从不撒谎", pos: "phr.", example: "An honest child never tells a lie." },
      { word: "on time", syllables: ["on", "time"], cn: "准时", pos: "phr.", example: "Give the book back on time." },
      { word: "doll", syllables: ["doll"], cn: "玩偶；玩具娃娃", pos: "n.", example: "Xiaopu broke Xiaojiang's favourite doll." },
      { word: "break", syllables: ["break"], cn: "打碎；打破", pos: "v.", example: "Say sorry when I break something." },
      { word: "empty", syllables: ["emp", "ty"], cn: "空的", pos: "adj.", example: "Only the boy's pot is empty." },
      { word: "pot", syllables: ["pot"], cn: "罐；壶；花盆", pos: "n.", example: "The boy plants the seed in his pot." },
      { word: "seed", syllables: ["seed"], cn: "种子", pos: "n.", example: "The king says the seeds are boiled." },
      { word: "month", syllables: ["month"], cn: "月份", pos: "n.", example: "Three months later, the children go to the king." }
    ],
    grammar: {
      ruleTitle: "情态动词 should：主语 + should + 动词原形",
      ruleTip: "should 表示“应该”。它超级省心：不管主语是 I、We 还是 Xiaopu，should 永远不变形，它后面的动词也永远用【原形】（如 should be / should tell）！",
      examples: [
        "I should tell her right now!",
        "Xiaopu should be honest.",
        "We should tell the truth."
      ],
      builders: [
        {
          prompt: "拼出句子：小浦应该诚实。",
          tokens: ["Xiaopu", "should", "be", "honest."],
          answer: "Xiaopu should be honest.",
          explain: "should 后面接形容词 honest 时，中间一定要有原形动词 be！"
        },
        {
          prompt: "拼出句子：我们应该说真话。",
          tokens: ["We", "should", "tell", "the", "truth."],
          answer: "We should tell the truth.",
          explain: "should + 动词原形 tell。"
        },
        {
          prompt: "拼出句子：我现在就应该告诉她！",
          tokens: ["I", "should", "tell", "her", "right", "now!"],
          answer: "I should tell her right now!",
          explain: "right now 表示“立刻、马上”。"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["Xiaopu", "should", "tells", "the", "truth."],
          errorIndex: 2,
          options: ["tell", "telling", "to tell"],
          correct: "tell",
          explain: "情态动词 should 后面永远跟动词原形 tell！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["We", "should", "are", "honest."],
          errorIndex: 2,
          options: ["be", "is", "am"],
          correct: "be",
          explain: "should 后面要用 be 动词的原形 be！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["An", "honest", "boy", "never", "tell", "a", "lie."],
          errorIndex: 4,
          options: ["tells", "telling", "to tell"],
          correct: "tells",
          explain: "没有 should 时，主语 An honest boy 是单数，一般现在时动词要加 s 变成 tells！"
        }
      ]
    },
    speaking: {
      scene: "The right time（小浦不小心弄坏了小江的娃娃，和妈妈谈心）",
      npcName: "Mum",
      npcAvatar: "👩🏻",
      lines: [
        {
          npc: "Are you all right, Xiaopu? What happened?",
          npcCn: "小浦，你还好吗？发生什么事了？",
          target: "No, I am not. I broke Xiaojiang's favourite doll.",
          keywords: ["broke", "Xiaojiang", "doll"],
          hintCn: "坦白说自己不小心弄坏了小江最喜欢的娃娃。"
        },
        {
          npc: "You should tell her about it. When is the right time?",
          npcCn: "你应该把这件事告诉她。什么时候是最好的时机？",
          target: "The right time is now. I should tell her right now!",
          keywords: ["right time", "now", "should", "tell"],
          hintCn: "回答最好的时机就是现在，我应该马上去告诉她！"
        },
        {
          npc: "Why did the boy with the empty pot win?",
          npcCn: "为什么捧着空花盆的小男孩赢了呢？",
          target: "Because the seeds are boiled. The honest boy tells the truth.",
          keywords: ["seeds", "boiled", "honest", "truth"],
          hintCn: "解释种子是煮熟的，诚实的男孩说了真话。"
        }
      ]
    },
    writing: {
      projectTitle: "Tips for being an honest child",
      projectCn: "我的诚实小卫士宣言卡",
      modelParts: [
        { role: "宣言开头", color: "blue", text: "To be an honest child, I should do many good things." },
        { role: "具体做法", color: "green", text: "I should give things back on time. I should say sorry when I break something. I should keep my word." },
        { role: "坚定结尾", color: "orange", text: "I should always tell the truth and never tell a lie!" }
      ],
      prompts: [
        { label: "1. 开头句（To be an honest child, I should ...）：", placeholder: "To be an honest child, I should ..." },
        { label: "2. 借东西或答应别人时应该怎么做？（give things back / keep my word）", placeholder: "I should give things back on time and keep my word." },
        { label: "3. 不小心弄坏东西时应该怎么做？", placeholder: "I should say sorry when I break something." },
        { label: "4. 关于说真话的承诺：", placeholder: "I should always tell the truth and never tell a lie." }
      ],
      targetWords: ["honest", "should", "on time", "keep", "word", "truth", "lie", "sorry"]
    }
  },
  {
    id: 9,
    code: "Unit 9",
    title: "What time is it?",
    cnTitle: "现在几点了？",
    themeColor: "#6366F1",
    bgSoft: "#EEF2FF",
    icon: "⏰",
    bigTask: "Playing a board game about time",
    bigTaskCn: "玩转时间与世界时差",
    sound: {
      pattern: "qu",
      example: "question",
      tip: "字母组合 qu 常发 /kw/ 的音，如 question, quick, quiet。"
    },
    words: [
      { word: "time", syllables: ["time"], cn: "时间", pos: "n.", example: "What time is it in the UK?" },
      { word: "hour hand", syllables: ["hour", "hand"], cn: "时针", pos: "n.", example: "Look at the hour hand." },
      { word: "minute hand", syllables: ["mi", "nute", "hand"], cn: "分针", pos: "n.", example: "The minute hand points to twelve." },
      { word: "seven o'clock", syllables: ["se", "ven", "o'clock"], cn: "七点钟", pos: "phr.", example: "It's seven o'clock. Time to get up." },
      { word: "half past eleven", syllables: ["half", "past", "e", "le", "ven"], cn: "十一点半", pos: "phr.", example: "It's half past eleven. Time to have lunch." },
      { word: "ten to four", syllables: ["ten", "to", "four"], cn: "三点五十分（差十分四点）", pos: "phr.", example: "It's ten to four. Time to go home." },
      { word: "evening", syllables: ["eve", "ning"], cn: "晚上；傍晚", pos: "n.", example: "It's seven o'clock in the evening in Shanghai." },
      { word: "the Earth", syllables: ["the", "Earth"], cn: "地球", pos: "n.", example: "Time is different on the Earth and on the moon." },
      { word: "the moon", syllables: ["the", "moon"], cn: "月球", pos: "n.", example: "We can see the moon at night." },
      { word: "night", syllables: ["night"], cn: "夜；夜晚", pos: "n.", example: "Time can be night for someone and day for others." }
    ],
    grammar: {
      ruleTitle: "What time is it? — It's ...（整点 o'clock / 半点 half past / 差几分 to）",
      ruleTip: "记牢三种时间读法：整点用 o'clock（seven o'clock）；半点用 half past + 小时（11:30 是 half past eleven）；超过半小时用“差几分 + to + 下一个小时”（3:50 是差10分到4点，即 ten to four）！",
      examples: [
        "What time is it in the UK? — It's twelve noon.",
        "What time is it? — It's half past one. (1:30)",
        "What time is it? — It's five to eight. (7:55)"
      ],
      builders: [
        {
          prompt: "拼出句子：现在十一点半，该吃午饭了。",
          tokens: ["It's", "half", "past", "eleven.", "Time", "to", "have", "lunch."],
          answer: "It's half past eleven. Time to have lunch.",
          explain: "half past eleven = 11:30；Time to + 动词原形表示“该做某事了”。"
        },
        {
          prompt: "拼出句子：现在三点五十分（差十分到四点）。",
          tokens: ["It's", "ten", "to", "four."],
          answer: "It's ten to four.",
          explain: "3:50 距离 4:00 差 10 分钟，所以是 ten to four！"
        },
        {
          prompt: "拼出问句：英国现在几点了？",
          tokens: ["What", "time", "is", "it", "in", "the", "UK?"],
          answer: "What time is it in the UK?",
          explain: "询问某地时间：What time is it in + 地点？"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：想表达 7:55（差五分八点），治好这个病句！",
          parts: ["It's", "five", "past", "eight."],
          errorIndex: 2,
          options: ["to", "at", "on"],
          correct: "to",
          explain: "7:55 是差 5 分到 8 点，要用 to（five to eight）；five past eight 是 8:05 哦！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["It's", "seven", "o'clock.", "Time", "for", "get", "up."],
          errorIndex: 4,
          options: ["to", "at", "in"],
          correct: "to",
          explain: "后面是动词短语 get up，要用 Time to + 动词原形！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["What", "time", "it", "is", "in", "Shanghai?"],
          errorIndex: 2,
          options: ["is it", "are it", "does it"],
          correct: "is it",
          explain: "疑问句要把 be 动词提前，固定问法是 What time is it?"
        }
      ]
    },
    speaking: {
      scene: "Happy New Year!（上海的申申和英国的 Lily 打电话聊新年时差）",
      npcName: "Lily",
      npcAvatar: "👧🏼",
      lines: [
        {
          npc: "Good morning, Shenshen! What time is it in Shanghai?",
          npcCn: "早上好，申申！上海现在几点了？",
          target: "It's seven o'clock in the evening in Shanghai. We are having a family dinner.",
          keywords: ["seven o'clock", "evening", "Shanghai", "dinner"],
          hintCn: "说上海现在是晚上七点，正在吃家庭晚餐。"
        },
        {
          npc: "It's eleven o'clock in the morning in the UK. Why is it different?",
          npcCn: "英国现在是上午十一点。为什么时间不一样呀？",
          target: "Oh, the time difference! New Year's Day comes earlier in China.",
          keywords: ["time difference", "earlier", "China"],
          hintCn: "解释是因为时差，新年在中国来得更早！"
        },
        {
          npc: "Happy New Year, Shenshen! What is time in your mind?",
          npcCn: "新年快乐，申申！在你心里，时间是什么？",
          target: "Happy New Year, Lily! Time is spring, summer, autumn and winter.",
          keywords: ["Happy New Year", "Time", "spring", "winter"],
          hintCn: "祝 Lily 新年快乐，并诗意地说出时间是春夏秋冬。"
        }
      ]
    },
    writing: {
      projectTitle: "My Day & What is time?",
      projectCn: "我的时间手账卡",
      modelParts: [
        { role: "早晨与上午", color: "blue", text: "It's seven o'clock. Time to get up. I go to school at half past seven." },
        { role: "中午与放学", color: "green", text: "It's half past eleven. Time to have lunch. At ten to four, I go home." },
        { role: "时间感悟", color: "orange", text: "Time is always with me. It is spring, summer, autumn and winter!" }
      ],
      prompts: [
        { label: "1. 你几点起床？用 o'clock 写一句：", placeholder: "It's seven o'clock. Time to get up." },
        { label: "2. 你几点吃午饭？用 half past 写一句：", placeholder: "It's half past eleven. Time to have lunch." },
        { label: "3. 你几点放学回家或吃晚饭？（试着用 ten to ... 或 evening）", placeholder: "It's ten to four. Time to go home." },
        { label: "4. 在你心中，时间是什么？（What is time in your mind?）", placeholder: "Time is always with me. It is ..." }
      ],
      targetWords: ["o'clock", "half past", "to", "Time to", "evening", "night", "Earth", "moon"]
    }
  },
  {
    id: 10,
    code: "Unit 10",
    title: "Weather",
    cnTitle: "天气与双城预报",
    themeColor: "#14B8A6",
    bgSoft: "#F0FDFA",
    icon: "🌤️",
    bigTask: "Giving a weather report",
    bigTaskCn: "当一名双城小小天气预报员",
    sound: {
      pattern: "Stress（重音）",
      example: "'weather / 'different / to'day / de'gree",
      tip: "注意双音节词重音位置：'weather、'different 重音在第一音节；to'day、de'gree 重音在第二音节！"
    },
    words: [
      { word: "weather", syllables: ["wea", "ther"], cn: "天气；气象", pos: "n.", example: "How's the weather in Shanghai today?" },
      { word: "weather report", syllables: ["wea", "ther", "re", "port"], cn: "气象报告", pos: "n.", example: "Here is my weather report for Shanghai." },
      { word: "sunny", syllables: ["sun", "ny"], cn: "阳光充足的", pos: "adj.", example: "It's warm and sunny in Auckland." },
      { word: "rainy", syllables: ["rain", "y"], cn: "多雨的", pos: "adj.", example: "It's cold and rainy today." },
      { word: "cloudy", syllables: ["cloud", "y"], cn: "阴天的；多云的", pos: "adj.", example: "Sister likes cloudy days." },
      { word: "windy", syllables: ["wind", "y"], cn: "多风的", pos: "adj.", example: "Brother flies kites on windy days." },
      { word: "snowy", syllables: ["snow", "y"], cn: "下雪多的", pos: "adj.", example: "I play in the snow on snowy days." },
      { word: "degree", syllables: ["de", "gree"], cn: "度（温度单位）", pos: "n.", example: "It's only 5 degrees in Shanghai." },
      { word: "lamb", syllables: ["lamb"], cn: "小羊", pos: "n.", example: "Little Lamb hurries home before the rain." },
      { word: "tortoise", syllables: ["tor", "toise"], cn: "陆龟", pos: "n.", example: "Tortoise has water on his back." },
      { word: "sign", syllables: ["sign"], cn: "迹象；征兆", pos: "n.", example: "There is no sign of rain." },
      { word: "heavy rain", syllables: ["hea", "vy", "rain"], cn: "大雨", pos: "n.", example: "Very soon, a heavy rain begins to fall." }
    ],
    grammar: {
      ruleTitle: "How's the weather ...? — It's ... + 天气构词法 (-y)",
      ruleTip: "问天气用 How's the weather in + 城市 + today? 回答用 It's + 天气形容词。构词法：rain→rainy, cloud→cloudy, snow→snowy, wind→windy，特别注意 sun 要双写 n 变 sunny！",
      examples: [
        "How's the weather in Auckland today? — It's warm and sunny. It's 23 degrees.",
        "How's the weather in Shanghai today? — It's cold and rainy. It's only 5 degrees."
      ],
      builders: [
        {
          prompt: "拼出问句：今天上海天气怎么样？",
          tokens: ["How's", "the", "weather", "in", "Shanghai", "today?"],
          answer: "How's the weather in Shanghai today?",
          explain: "How's the weather in + 城市 + today? 是询问天气的黄金句型。"
        },
        {
          prompt: "拼出回答：天气又冷又多雨，只有 5 度。",
          tokens: ["It's", "cold", "and", "rainy.", "It's", "only", "5", "degrees."],
          answer: "It's cold and rainy. It's only 5 degrees.",
          explain: "5 度超过 1 度，所以 degree 要加 s 变成 degrees!"
        },
        {
          prompt: "拼出建议：你最好带上一把雨伞。",
          tokens: ["You'd", "better", "take", "an", "umbrella", "with", "you."],
          answer: "You'd better take an umbrella with you.",
          explain: "had better ('d better) + 动词原形 take，表示“最好做某事”。"
        }
      ],
      doctors: [
        {
          prompt: "语法小医生：治好这个拼写错误！",
          parts: ["It's", "warm", "and", "suny", "in", "Auckland", "today."],
          errorIndex: 3,
          options: ["sunny", "sun", "suning"],
          correct: "sunny",
          explain: "sun 变形容词要双写 n 再加 y，写作 sunny！"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["What's", "the", "weather", "in", "Shanghai", "today?"],
          errorIndex: 0,
          options: ["How's", "Where's", "Who's"],
          correct: "How's",
          explain: "句尾没有 like 时，问天气要用 How's the weather...!"
        },
        {
          prompt: "语法小医生：治好这个病句！",
          parts: ["It's", "23", "degree", "today."],
          errorIndex: 2,
          options: ["degrees", "degreeing", "a degree"],
          correct: "degrees",
          explain: "23 是复数，温度单位 degree 要加 s 变成 degrees！"
        }
      ]
    },
    speaking: {
      scene: "The weather reports（申申和来自新西兰奥克兰的 James 互报双城天气）",
      npcName: "James",
      npcAvatar: "👦🏼",
      lines: [
        {
          npc: "Here is my weather report for Auckland. How's the weather in Shanghai today?",
          npcCn: "这是我做的奥克兰天气预报。今天上海天气怎么样？",
          target: "Today is Monday. It's cold and rainy in Shanghai. It's only 5 degrees.",
          keywords: ["Monday", "cold", "rainy", "5 degrees"],
          hintCn: "播报上海周一天气：又冷又下雨，只有 5 度。"
        },
        {
          npc: "It's warm and sunny in Auckland. It's 23 degrees!",
          npcCn: "奥克兰又暖和又晴朗，有 23 度呢！",
          target: "Wow. Is it summer there? How nice!",
          keywords: ["summer", "there"],
          hintCn: "惊讶地问：那里现在是夏天吗？真棒！"
        },
        {
          npc: "How do animals tell us the coming of rain?",
          npcCn: "小动物们是怎么预报要下雨的？",
          target: "Dragonflies are flying low and fishes are jumping out of the water.",
          keywords: ["Dragonflies", "low", "fishes", "water"],
          hintCn: "说蜻蜓低飞、鱼儿跳出水面。"
        }
      ]
    },
    writing: {
      projectTitle: "Weather reports for two cities",
      projectCn: "双城小小天气预报员手账卡",
      modelParts: [
        { role: "开场问候", color: "blue", text: "Hello, I'm Shenshen. This is the weather report for Shanghai today." },
        { role: "天气温度", color: "green", text: "It's Thursday. It's cold and sunny. It's only 4 degrees." },
        { role: "连线结尾", color: "orange", text: "How's the weather in London, Lily? Thanks for listening!" }
      ],
      prompts: [
        { label: "1. 开场自我介绍并播报你的城市：", placeholder: "Hello, I'm ... This is the weather report for Shanghai today." },
        { label: "2. 播报星期几和天气状况（sunny / rainy / cloudy / windy / snowy）：", placeholder: "It's Monday. It's ... and ..." },
        { label: "3. 播报气温（degrees）并给个小提醒：", placeholder: "It's ... degrees. You'd better ..." },
        { label: "4. 连线另一座城市并致谢结尾！", placeholder: "How's the weather in London? Thanks for listening!" }
      ],
      targetWords: ["weather report", "sunny", "rainy", "cloudy", "windy", "snowy", "degrees", "Shanghai", "Thanks for listening"]
    }
  }
];
