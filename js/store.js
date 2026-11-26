window.Store4A = (function () {
  const STORAGE_KEY = "shanghai_4a_english_studio_v1";

  const defaultState = {
    // 每个单元 4 颗星：{ "1": { words: false, grammar: false, speaking: false, writing: false } }
    unitStars: {},
    // 已掌握的单词列表 ["classroom", ...]
    masteredWords: [],
    // 错词小怪兽队列：[{ unitId, word, cn, syllables, streak: 0 }] 连续拼对 2 次即驯服移除
    wordMistakes: [],
    // 语法错题本：[{ unitId, key, prompt, answer, explain }]
    grammarMistakes: [],
    // 作品墙手账卡：[{ id, unitId, unitCode, title, icon, themeColor, lines, text, date }]
    works: [],
    // 累计互动统计
    stats: {
      dictationCorrect: 0,
      grammarSolved: 0,
      speakingCompleted: 0,
      writingCreated: 0
    }
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultState));
      const parsed = JSON.parse(raw);
      return {
        ...JSON.parse(JSON.stringify(defaultState)),
        ...parsed,
        stats: { ...defaultState.stats, ...(parsed.stats || {}) }
      };
    } catch (e) {
      return JSON.parse(JSON.stringify(defaultState));
    }
  }

  let state = load();

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Save failed", e);
    }
  }

  function getUnitStars(unitId) {
    const key = String(unitId);
    if (!state.unitStars[key]) {
      state.unitStars[key] = { words: false, grammar: false, speaking: false, writing: false };
    }
    return state.unitStars[key];
  }

  function earnStar(unitId, moduleName) {
    const stars = getUnitStars(unitId);
    stars[moduleName] = true;
    save();
  }

  function markWordMastered(word) {
    if (!state.masteredWords.includes(word)) {
      state.masteredWords.push(word);
    }
    state.stats.dictationCorrect += 1;
    // 如果在错词本里，连胜 +1，达到 2 次即驯服移出
    const idx = state.wordMistakes.findIndex(m => m.word.toLowerCase() === word.toLowerCase());
    if (idx !== -1) {
      state.wordMistakes[idx].streak = (state.wordMistakes[idx].streak || 0) + 1;
      if (state.wordMistakes[idx].streak >= 2) {
        state.wordMistakes.splice(idx, 1);
      }
    }
    save();
  }

  function addWordMistake(unitId, wordObj) {
    const existing = state.wordMistakes.find(m => m.word.toLowerCase() === wordObj.word.toLowerCase());
    if (existing) {
      existing.streak = 0;
    } else {
      state.wordMistakes.push({
        unitId,
        word: wordObj.word,
        cn: wordObj.cn,
        syllables: wordObj.syllables,
        example: wordObj.example,
        streak: 0
      });
    }
    save();
  }

  function addGrammarMistake(unitId, key, prompt, answer, explain) {
    if (!state.grammarMistakes.some(g => g.key === key)) {
      state.grammarMistakes.push({ unitId, key, prompt, answer, explain });
      save();
    }
  }

  function resolveGrammarMistake(key) {
    state.grammarMistakes = state.grammarMistakes.filter(g => g.key !== key);
    state.stats.grammarSolved += 1;
    save();
  }

  function recordGrammarSolved() {
    state.stats.grammarSolved += 1;
    save();
  }

  function recordSpeakingDone() {
    state.stats.speakingCompleted += 1;
    save();
  }

  function saveWork(work) {
    const item = {
      id: "work_" + Date.now(),
      date: new Date().toLocaleDateString("zh-CN"),
      ...work
    };
    state.works.unshift(item);
    state.stats.writingCreated += 1;
    earnStar(work.unitId, "writing");
    save();
    return item;
  }

  function deleteWork(id) {
    state.works = state.works.filter(w => w.id !== id);
    save();
  }

  function getState() {
    return state;
  }

  function exportJSON() {
    return JSON.stringify(state, null, 2);
  }

  function importJSON(str) {
    const parsed = JSON.parse(str);
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      ...parsed,
      stats: { ...defaultState.stats, ...(parsed.stats || {}) }
    };
    save();
  }

  function resetAll() {
    state = JSON.parse(JSON.stringify(defaultState));
    save();
  }

  return {
    getState,
    getUnitStars,
    earnStar,
    markWordMastered,
    addWordMistake,
    addGrammarMistake,
    resolveGrammarMistake,
    recordGrammarSolved,
    recordSpeakingDone,
    saveWork,
    deleteWork,
    exportJSON,
    importJSON,
    resetAll
  };
})();
