(function () {
  const ALL_UNITS = [
    ...(window.ENGLISH_4A_UNITS_1_5 || []),
    ...(window.ENGLISH_4A_UNITS_6_10 || [])
  ];
  const TOTAL_WORDS = ALL_UNITS.reduce((sum, u) => sum + u.words.length, 0);

  const AppState = {
    view: "map", // map | unit | mistakes | gallery | parent
    unitId: 1,
    moduleTab: "words", // words | grammar | speaking | writing
    // 单词模块状态
    wordMode: "card", // card | puzzle | dictation
    wordIndex: 0,
    puzzleBlanks: [],
    puzzleFilled: [],
    puzzleBank: [],
    wordFeedback: null,
    unitWordCorrectCount: 0,
    // 语法模块状态
    grammarMode: "builder", // builder | doctor
    grammarIndex: 0,
    builderPool: [],
    builderPlaced: [],
    doctorSelectedIdx: null,
    doctorHealed: false,
    grammarFeedback: null,
    unitGrammarCorrectCount: 0,
    // 口语模块状态
    speakingIndex: 0,
    speakingLevel: 1, // 1: 跟读, 2: 关键词, 3: 情景应答
    isRecording: false,
    spokenText: "",
    speakingCompare: null,
    speakingPassedSet: new Set(),
    // 写作模块状态
    writingAnswers: ["", "", "", ""],
    activePromptIdx: 0,
    writingReport: null,
    // 错题消灭站状态
    mistakeTab: "words",
    mistakeWordIdx: 0,
    mistakeFeedback: null
  };

  const mainEl = document.getElementById("mainContent");
  const toastEl = document.getElementById("toast");

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getCurrentUnit() {
    return ALL_UNITS.find(u => u.id === AppState.unitId) || ALL_UNITS[0];
  }

  function updateTopBadges() {
    const s = window.Store4A.getState();
    const mistakeCount = s.wordMistakes.length + s.grammarMistakes.length;
    const mBadge = document.getElementById("mistakeBadge");
    if (mistakeCount > 0) {
      mBadge.style.display = "inline-block";
      mBadge.textContent = mistakeCount;
    } else {
      mBadge.style.display = "none";
    }
    document.getElementById("galleryBadge").textContent = s.works.length;

    document.querySelectorAll(".nav-pill").forEach(btn => {
      const target = btn.dataset.view;
      btn.classList.toggle("active", AppState.view === target);
    });
  }

  function navigate(view, unitId) {
    window.Speech4A.stopListening();
    AppState.isRecording = false;
    AppState.view = view;
    if (unitId !== undefined) {
      AppState.unitId = unitId;
      AppState.moduleTab = "words";
      resetUnitLocalState();
    }
    updateTopBadges();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetUnitLocalState() {
    AppState.wordMode = "card";
    AppState.wordIndex = 0;
    AppState.wordFeedback = null;
    AppState.unitWordCorrectCount = 0;
    AppState.grammarMode = "builder";
    AppState.grammarIndex = 0;
    AppState.grammarFeedback = null;
    AppState.unitGrammarCorrectCount = 0;
    AppState.speakingIndex = 0;
    AppState.speakingLevel = 1;
    AppState.spokenText = "";
    AppState.speakingCompare = null;
    AppState.speakingPassedSet = new Set();
    AppState.writingAnswers = ["", "", "", ""];
    AppState.activePromptIdx = 0;
    AppState.writingReport = null;
    setupPuzzleForCurrentWord();
    setupGrammarQuestion();
  }

  // ==================== 拼图题初始化 ====================
  function setupPuzzleForCurrentWord() {
    const unit = getCurrentUnit();
    const wObj = unit.words[AppState.wordIndex % unit.words.length];
    const chars = wObj.word.split("");
    const letterIndices = [];
    chars.forEach((ch, idx) => {
      if (/[a-zA-Z]/.test(ch)) letterIndices.push(idx);
    });
    const blankCount = Math.min(3, Math.max(1, Math.floor(letterIndices.length / 3)));
    // 选取均匀分布的挖空位置
    const blanks = [];
    const step = Math.max(1, Math.floor(letterIndices.length / (blankCount + 1)));
    for (let i = 1; i <= blankCount; i++) {
      const pos = letterIndices[Math.min(letterIndices.length - 1, i * step)];
      if (!blanks.includes(pos)) blanks.push(pos);
    }
    AppState.puzzleBlanks = blanks.sort((a, b) => a - b);
    AppState.puzzleFilled = AppState.puzzleBlanks.map(() => "");

    const needed = AppState.puzzleBlanks.map(i => chars[i]);
    const distractors = "aeiournstlcmpd".split("").filter(c => !needed.includes(c));
    const bank = [...needed];
    while (bank.length < needed.length + 3 && distractors.length) {
      const pick = distractors.splice(Math.floor(Math.random() * distractors.length), 1)[0];
      bank.push(pick);
    }
    // 洗牌
    for (let i = bank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bank[i], bank[j]] = [bank[j], bank[i]];
    }
    AppState.puzzleBank = bank;
    AppState.wordFeedback = null;
  }

  // ==================== 语法题初始化 ====================
  function setupGrammarQuestion() {
    const unit = getCurrentUnit();
    AppState.grammarFeedback = null;
    AppState.doctorSelectedIdx = null;
    AppState.doctorHealed = false;
    if (AppState.grammarMode === "builder") {
      const q = unit.grammar.builders[AppState.grammarIndex % unit.grammar.builders.length];
      const indexed = q.tokens.map((text, idx) => ({ id: idx, text }));
      for (let i = indexed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
      }
      AppState.builderPool = indexed;
      AppState.builderPlaced = [];
    }
  }

  // ==================== 渲染入口 ====================
  function render() {
    updateTopBadges();
    if (AppState.view === "map") {
      renderMap();
    } else if (AppState.view === "unit") {
      renderUnitWorkspace();
    } else if (AppState.view === "mistakes") {
      renderMistakesView();
    } else if (AppState.view === "gallery") {
      renderGalleryView();
    } else if (AppState.view === "parent") {
      renderParentReport();
    }
  }

  // ==================== 1. 首页成长地图 ====================
  function renderMap() {
    const s = window.Store4A.getState();
    let totalStars = 0;
    ALL_UNITS.forEach(u => {
      const st = window.Store4A.getUnitStars(u.id);
      if (st.words) totalStars++;
      if (st.grammar) totalStars++;
      if (st.speaking) totalStars++;
      if (st.writing) totalStars++;
    });

    const cardsHtml = ALL_UNITS.map(u => {
      const st = window.Store4A.getUnitStars(u.id);
      return `
        <div class="unit-card" data-open-unit="${u.id}">
          <div>
            <div class="unit-top">
              <div>
                <div class="unit-code" style="color:${u.themeColor}">${u.code}</div>
                <div class="unit-title">${escapeHtml(u.title)}</div>
                <div class="unit-cn">${escapeHtml(u.cnTitle)}</div>
              </div>
              <div class="unit-icon" style="background:${u.bgSoft}">${u.icon}</div>
            </div>
            <div class="unit-task">🎯 ${escapeHtml(u.bigTaskCn)}</div>
          </div>
          <div class="stars-row">
            <span class="star-pill ${st.words ? "done" : ""}">${st.words ? "⭐" : "☆"} 词</span>
            <span class="star-pill ${st.grammar ? "done" : ""}">${st.grammar ? "⭐" : "☆"} 语</span>
            <span class="star-pill ${st.speaking ? "done" : ""}">${st.speaking ? "⭐" : "☆"} 说</span>
            <span class="star-pill ${st.writing ? "done" : ""}">${st.writing ? "⭐" : "☆"} 写</span>
          </div>
        </div>
      `;
    }).join("");

    mainEl.innerHTML = `
      <section class="hero-card">
        <div class="hero-left">
          <h2>Hi! 欢迎来到申申和伙伴们的英语成长屋 👋</h2>
          <p>100% 同步上海五·四学制四年级上册（4A）全册 10 个单元。每天只需 10 分钟，点亮「记单词 · 学语法 · 开口说 · 练写作」四颗能力星！</p>
        </div>
        <div class="hero-stats">
          <div class="stat-chip">
            <div class="stat-num">⭐ ${totalStars}<span style="font-size:13px;color:#6B7280">/40</span></div>
            <div class="stat-label">已点亮能力星</div>
          </div>
          <div class="stat-chip">
            <div class="stat-num" style="color:#10B981">${s.masteredWords.length}<span style="font-size:13px;color:#6B7280">/${TOTAL_WORDS}</span></div>
            <div class="stat-label">掌握原版词</div>
          </div>
          <div class="stat-chip">
            <div class="stat-num" style="color:#F59E0B">${s.works.length}</div>
            <div class="stat-label">手账作品</div>
          </div>
        </div>
      </section>

      <div class="section-heading">
        <h3>🗺️ 全册 10 单元闯关地图（点击任意单元开始学习）</h3>
        ${
          s.wordMistakes.length > 0
            ? `<button class="btn btn-warning btn-sm" id="quickMistakeBtn">👾 有 ${s.wordMistakes.length} 个错词小怪兽等你消灭！</button>`
            : `<span style="font-size:13px;color:#10B981;font-weight:700">✨ 当前没有积压错词，状态超棒！</span>`
        }
      </div>

      <div class="units-grid">${cardsHtml}</div>
    `;

    mainEl.querySelectorAll("[data-open-unit]").forEach(el => {
      el.addEventListener("click", () => navigate("unit", Number(el.dataset.openUnit)));
    });
    const quickBtn = document.getElementById("quickMistakeBtn");
    if (quickBtn) quickBtn.addEventListener("click", () => navigate("mistakes"));
  }

  // ==================== 2. 单元学习工作台 ====================
  function renderUnitWorkspace() {
    const unit = getCurrentUnit();
    const st = window.Store4A.getUnitStars(unit.id);

    mainEl.innerHTML = `
      <div class="ws-header">
        <div class="ws-top-row">
          <div class="ws-title-group">
            <button class="btn btn-soft btn-sm" id="backToMapBtn">← 返回地图</button>
            <div class="unit-icon" style="background:${unit.bgSoft};width:44px;height:44px;font-size:24px">${unit.icon}</div>
            <div>
              <div style="font-size:12px;font-weight:800;color:${unit.themeColor}">${unit.code} · ${escapeHtml(unit.cnTitle)}</div>
              <div style="font-size:19px;font-weight:800">${escapeHtml(unit.title)}</div>
            </div>
          </div>
          <div style="font-size:13px;color:#4B5563">🎯 Big task: <strong>${escapeHtml(unit.bigTask)}</strong></div>
        </div>

        <div class="module-tabs">
          <div class="mod-tab ${AppState.moduleTab === "words" ? "active" : ""}" data-mod="words">
            <div class="mod-tab-title">${st.words ? "⭐" : "🔤"} 记单词</div>
            <div class="mod-tab-sub">音节 · 拼图 · 真听写</div>
          </div>
          <div class="mod-tab ${AppState.moduleTab === "grammar" ? "active" : ""}" data-mod="grammar">
            <div class="mod-tab-title">${st.grammar ? "⭐" : "🧩"} 学语法</div>
            <div class="mod-tab-sub">积木造句 · 小医生找茬</div>
          </div>
          <div class="mod-tab ${AppState.moduleTab === "speaking" ? "active" : ""}" data-mod="speaking">
            <div class="mod-tab-title">${st.speaking ? "⭐" : "🎤"} 开口说</div>
            <div class="mod-tab-sub">3档扶手 · 逐词高亮</div>
          </div>
          <div class="mod-tab ${AppState.moduleTab === "writing" ? "active" : ""}" data-mod="writing">
            <div class="mod-tab-title">${st.writing ? "⭐" : "✍️"} 练写作</div>
            <div class="mod-tab-sub">小侦探体检 · 手账卡</div>
          </div>
        </div>
      </div>

      <div class="panel" id="modulePanel"></div>
    `;

    document.getElementById("backToMapBtn").addEventListener("click", () => navigate("map"));
    mainEl.querySelectorAll("[data-mod]").forEach(tab => {
      tab.addEventListener("click", () => {
        window.Speech4A.stopListening();
        AppState.isRecording = false;
        AppState.moduleTab = tab.dataset.mod;
        if (AppState.moduleTab === "words") setupPuzzleForCurrentWord();
        if (AppState.moduleTab === "grammar") setupGrammarQuestion();
        renderUnitWorkspace();
      });
    });

    const panel = document.getElementById("modulePanel");
    if (AppState.moduleTab === "words") renderWordsModule(panel, unit);
    else if (AppState.moduleTab === "grammar") renderGrammarModule(panel, unit);
    else if (AppState.moduleTab === "speaking") renderSpeakingModule(panel, unit);
    else if (AppState.moduleTab === "writing") renderWritingModule(panel, unit);
  }

  // -------------------- 模块 1：记单词 --------------------
  function renderWordsModule(panel, unit) {
    const total = unit.words.length;
    const idx = AppState.wordIndex % total;
    const w = unit.words[idx];
    const masteredSet = new Set(window.Store4A.getState().masteredWords);
    const isMastered = masteredSet.has(w.word);

    let bodyHtml = "";

    if (AppState.wordMode === "card") {
      const pInfo = (window.ENGLISH_4A_PHONICS && window.ENGLISH_4A_PHONICS[w.word]) || null;
      const sylHtml = w.syllables
        .map((syl, i) => `<button type="button" class="syl-chip syl-${i % 5}" data-speak-syl="${escapeHtml(syl)}" title="点击点读该音节">${escapeHtml(syl)}</button>`)
        .join(`<span style="color:#94A3B8;font-weight:700">·</span>`);

      bodyHtml = `
        <div class="word-stage">
          <div class="flashcard">
            <div style="font-size:13px;color:#64748B;margin-bottom:10px">
              第 ${idx + 1} / ${total} 词 ${isMastered ? `<span style="color:#10B981;font-weight:800">· ✅ 已掌握</span>` : ""} · <span style="color:#3B82F6">点音节块可单独听读</span>
            </div>
            <div class="syllable-row">${sylHtml}</div>
            ${pInfo && pInfo.ipa ? `<div class="ipa-row" id="btnSpeakIpa" title="点击听标准发音"><span>${escapeHtml(pInfo.ipa)}</span><span style="font-size:14px">🔊</span></div>` : ""}
            <div class="word-cn-row"><span class="word-pos">${escapeHtml(w.pos)}</span>${escapeHtml(w.cn)}</div>
            ${pInfo && pInfo.phonics ? `<div class="phonics-box"><span class="phonics-tag">自然拼读</span><span>${escapeHtml(pInfo.phonics)}</span></div>` : ""}
            <div class="audio-controls">
              <button class="btn btn-primary" id="btnSpeakNormal">🔊 标准朗读</button>
              <button class="btn btn-soft" id="btnSpeakSlow">🐢 慢速跟读 (0.75x)</button>
              <button class="btn btn-success" id="btnMarkKnown">✅ 我记住啦</button>
            </div>
            <div class="word-example" id="btnSpeakExample" title="点击朗读课本例句">
              <span>📖 课本语境：${escapeHtml(w.example)}</span>
              <span>🔊</span>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <button class="btn btn-soft" id="prevWordBtn">← 上一个</button>
            <span style="font-size:13px;color:#64748B">提示：看懂音标与自然拼读后，切换到「拼图补全」或「真听写」检验！</span>
            <button class="btn btn-primary" id="nextWordBtn">下一个 →</button>
          </div>
        </div>
      `;
    } else if (AppState.wordMode === "puzzle") {
      const chars = w.word.split("");
      const slotsHtml = chars
        .map((ch, pos) => {
          if (ch === " ") return `<div class="letter-slot space-slot"></div>`;
          const bIdx = AppState.puzzleBlanks.indexOf(pos);
          if (bIdx === -1) return `<div class="letter-slot">${escapeHtml(ch)}</div>`;
          const val = AppState.puzzleFilled[bIdx];
          return `<div class="letter-slot blank" data-clear-blank="${bIdx}" title="点击清除">${escapeHtml(val || "?")}</div>`;
        })
        .join("");

      const bankHtml = AppState.puzzleBank
        .map((ch, i) => `<button class="letter-tile" data-pick-letter="${escapeHtml(ch)}" data-bank-idx="${i}">${escapeHtml(ch)}</button>`)
        .join("");

      bodyHtml = `
        <div class="word-stage">
          <div class="flashcard">
            <div style="font-size:13px;color:#64748B;margin-bottom:8px">拼图补全 · 第 ${idx + 1} / ${total} 词</div>
            <div class="word-cn-row"><span class="word-pos">${escapeHtml(w.pos)}</span>${escapeHtml(w.cn)}</div>
            <button class="btn btn-soft btn-sm" id="btnSpeakPuzzle">🔊 听发音提示</button>
            <div class="puzzle-slots">${slotsHtml}</div>
            <div class="letter-bank">${bankHtml}</div>
            <div style="margin-top:12px;display:flex;justify-content:center;gap:10px">
              <button class="btn btn-soft" id="btnResetPuzzle">↺ 清空重填</button>
              <button class="btn btn-primary" id="btnCheckPuzzle">✓ 检查拼写</button>
            </div>
            ${renderFeedbackHtml(AppState.wordFeedback)}
          </div>
          <div style="display:flex;justify-content:space-between">
            <button class="btn btn-soft" id="prevWordBtn">← 上一个</button>
            <button class="btn btn-primary" id="nextWordBtn">下一词 →</button>
          </div>
        </div>
      `;
    } else {
      // 真听写模式
      bodyHtml = `
        <div class="word-stage">
          <div class="flashcard">
            <div style="font-size:13px;color:#64748B;margin-bottom:8px">🎧 模拟学校真听写 · 第 ${idx + 1} / ${total} 词（本轮已拼对 ${AppState.unitWordCorrectCount} 个）</div>
            <div class="word-cn-row"><span class="word-pos">${escapeHtml(w.pos)}</span>${escapeHtml(w.cn)}</div>
            <div class="audio-controls" style="margin-bottom:14px">
              <button class="btn btn-primary" id="btnDictNormal">🔊 播放听写发音</button>
              <button class="btn btn-soft" id="btnDictSlow">🐢 慢速播放</button>
            </div>
            <input type="text" class="dictation-input" id="dictationInput" placeholder="请在这里输入英文拼写..." autocomplete="off" spellcheck="false" />
            <div style="display:flex;justify-content:center;gap:10px">
              <button class="btn btn-primary" id="btnCheckDict">✓ 提交听写（回车）</button>
              <button class="btn btn-soft" id="btnShowHintDict">👀 偷看音节提示</button>
            </div>
            ${renderFeedbackHtml(AppState.wordFeedback)}
          </div>
          <div style="display:flex;justify-content:space-between">
            <button class="btn btn-soft" id="prevWordBtn">← 上一个</button>
            <button class="btn btn-primary" id="nextWordBtn">下一词 →</button>
          </div>
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="sub-mode-bar">
        <div class="seg-group">
          <button class="seg-btn ${AppState.wordMode === "card" ? "active" : ""}" data-wmode="card">📖 音节学习卡</button>
          <button class="seg-btn ${AppState.wordMode === "puzzle" ? "active" : ""}" data-wmode="puzzle">🧱 拼图补全</button>
          <button class="seg-btn ${AppState.wordMode === "dictation" ? "active" : ""}" data-wmode="dictation">🎧 真听写模式</button>
        </div>
        <div style="font-size:13px;color:#64748B">本单元拼对满 3 词自动点亮 ⭐ 词星</div>
      </div>

      <div class="sound-banner">
        <div>
          <span class="sound-badge">Sound 语音规律</span>
          <strong>${escapeHtml(unit.sound.pattern)}</strong>（例词：<em>${escapeHtml(unit.sound.example)}</em>）— ${escapeHtml(unit.sound.tip)}
        </div>
        <button class="btn btn-warning btn-sm" id="btnSpeakSound">🔊 听例词</button>
      </div>

      ${bodyHtml}
    `;

    // 绑定事件
    panel.querySelectorAll("[data-wmode]").forEach(btn => {
      btn.addEventListener("click", () => {
        AppState.wordMode = btn.dataset.wmode;
        AppState.wordFeedback = null;
        if (AppState.wordMode === "puzzle") setupPuzzleForCurrentWord();
        renderWordsModule(panel, unit);
      });
    });

    document.getElementById("btnSpeakSound").addEventListener("click", () => {
      window.Speech4A.speak(unit.sound.example.replace(/[/'"]/g, " "), 0.85);
    });

    document.getElementById("prevWordBtn").addEventListener("click", () => {
      AppState.wordIndex = (idx - 1 + total) % total;
      setupPuzzleForCurrentWord();
      renderWordsModule(panel, unit);
    });

    document.getElementById("nextWordBtn").addEventListener("click", () => {
      AppState.wordIndex = (idx + 1) % total;
      setupPuzzleForCurrentWord();
      renderWordsModule(panel, unit);
    });

    if (AppState.wordMode === "card") {
      panel.querySelectorAll("[data-speak-syl]").forEach(btn => {
        btn.addEventListener("click", () => window.Speech4A.speak(btn.dataset.speakSyl, 0.78));
      });
      const ipaBtn = document.getElementById("btnSpeakIpa");
      if (ipaBtn) ipaBtn.addEventListener("click", () => window.Speech4A.speak(w.word, 0.85));
      document.getElementById("btnSpeakNormal").addEventListener("click", () => window.Speech4A.speak(w.word, 0.92));
      document.getElementById("btnSpeakSlow").addEventListener("click", () => window.Speech4A.speak(w.word, 0.72));
      document.getElementById("btnSpeakExample").addEventListener("click", () => window.Speech4A.speak(w.example, 0.9));
      document.getElementById("btnMarkKnown").addEventListener("click", () => {
        window.Store4A.markWordMastered(w.word);
        showToast(`太棒了！已记录掌握 "${w.word}"`);
        AppState.wordIndex = (idx + 1) % total;
        renderWordsModule(panel, unit);
        updateTopBadges();
      });
    } else if (AppState.wordMode === "puzzle") {
      document.getElementById("btnSpeakPuzzle").addEventListener("click", () => window.Speech4A.speak(w.word, 0.85));
      panel.querySelectorAll("[data-pick-letter]").forEach(btn => {
        btn.addEventListener("click", () => {
          const emptyIdx = AppState.puzzleFilled.indexOf("");
          if (emptyIdx !== -1) {
            AppState.puzzleFilled[emptyIdx] = btn.dataset.pickLetter;
            renderWordsModule(panel, unit);
          }
        });
      });
      panel.querySelectorAll("[data-clear-blank]").forEach(slot => {
        slot.addEventListener("click", () => {
          AppState.puzzleFilled[Number(slot.dataset.clearBlank)] = "";
          renderWordsModule(panel, unit);
        });
      });
      document.getElementById("btnResetPuzzle").addEventListener("click", () => {
        AppState.puzzleFilled = AppState.puzzleBlanks.map(() => "");
        AppState.wordFeedback = null;
        renderWordsModule(panel, unit);
      });
      document.getElementById("btnCheckPuzzle").addEventListener("click", () => {
        const chars = w.word.split("");
        AppState.puzzleBlanks.forEach((pos, bIdx) => {
          chars[pos] = AppState.puzzleFilled[bIdx] || "_";
        });
        const attempt = chars.join("");
        if (attempt.toLowerCase() === w.word.toLowerCase()) {
          window.Speech4A.speak(w.word, 0.92);
          window.Store4A.markWordMastered(w.word);
          AppState.unitWordCorrectCount++;
          if (AppState.unitWordCorrectCount >= 3) {
            window.Store4A.earnStar(unit.id, "words");
            showToast("🎉 恭喜点亮本单元 ⭐ 记单词星！");
          }
          AppState.wordFeedback = { ok: true, msg: `🎉 拼写完全正确！${w.word}（${w.cn}）` };
        } else {
          window.Store4A.addWordMistake(unit.id, w);
          AppState.wordFeedback = {
            ok: false,
            msg: `再仔细看看哦！正确拼写是：${w.word}（已自动加入「错词小怪兽」方便复习）`
          };
        }
        renderWordsModule(panel, unit);
        updateTopBadges();
      });
    } else {
      const inputEl = document.getElementById("dictationInput");
      inputEl.focus();
      document.getElementById("btnDictNormal").addEventListener("click", () => window.Speech4A.speak(w.word, 0.9));
      document.getElementById("btnDictSlow").addEventListener("click", () => window.Speech4A.speak(w.word, 0.72));
      document.getElementById("btnShowHintDict").addEventListener("click", () => {
        const pInfo = (window.ENGLISH_4A_PHONICS && window.ENGLISH_4A_PHONICS[w.word]) || null;
        AppState.wordFeedback = {
          ok: true,
          msg: `💡 音节提示：${w.syllables.map(s => s[0] + "_".repeat(Math.max(0, s.length - 1))).join(" · ")}${pInfo ? ` ｜ ${pInfo.ipa} ｜ ${pInfo.phonics}` : ""}`
        };
        renderWordsModule(panel, unit);
      });
      const submitDict = () => {
        const val = inputEl.value.trim();
        if (!val) return showToast("请先输入单词拼写哦！");
        if (val.toLowerCase() === w.word.toLowerCase()) {
          window.Speech4A.speak(w.word, 0.92);
          window.Store4A.markWordMastered(w.word);
          AppState.unitWordCorrectCount++;
          if (AppState.unitWordCorrectCount >= 3) {
            window.Store4A.earnStar(unit.id, "words");
            showToast("🎉 太厉害了！已点亮本单元 ⭐ 记单词星！");
          }
          AppState.wordFeedback = { ok: true, msg: `🌟 听写全对！${w.word} — ${w.cn}` };
        } else {
          window.Store4A.addWordMistake(unit.id, w);
          AppState.wordFeedback = {
            ok: false,
            msg: `你写了 "${val}"，正确拼写是：${w.word}（已收入「错词小怪兽」，连对 2 次即可驯服！）`
          };
        }
        renderWordsModule(panel, unit);
        updateTopBadges();
      };
      document.getElementById("btnCheckDict").addEventListener("click", submitDict);
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitDict();
      });
    }
  }

  // -------------------- 模块 2：学语法 --------------------
  function renderGrammarModule(panel, unit) {
    const g = unit.grammar;
    let bodyHtml = "";

    if (AppState.grammarMode === "builder") {
      const qList = g.builders;
      const qIdx = AppState.grammarIndex % qList.length;
      const q = qList[qIdx];

      const placedHtml = AppState.builderPlaced.length
        ? AppState.builderPlaced
            .map((item, i) => `<button class="word-brick placed" data-remove-brick="${i}">${escapeHtml(item.text)}</button>`)
            .join("")
        : `<span style="color:#94A3B8;font-size:14px">点击下方词块，按正确语序拼出句子...</span>`;

      const poolHtml = AppState.builderPool
        .map((item, i) => `<button class="word-brick" data-add-brick="${i}">${escapeHtml(item.text)}</button>`)
        .join("");

      bodyHtml = `
        <div>
          <div style="font-size:13px;color:#64748B;margin-bottom:6px">句子积木工坊 · 第 ${qIdx + 1} / ${qList.length} 题</div>
          <h4 style="font-size:17px;margin-bottom:10px">🧱 ${escapeHtml(q.prompt)}</h4>
          <div class="builder-dropzone">${placedHtml}</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin:14px 0">${poolHtml}</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
            <button class="btn btn-primary" id="btnCheckBuilder">✓ 检查语序</button>
            <button class="btn btn-soft" id="btnResetBuilder">↺ 重置词块</button>
            <button class="btn btn-soft" id="btnNextGrammar">下一题 →</button>
          </div>
          ${renderFeedbackHtml(AppState.grammarFeedback)}
        </div>
      `;
    } else {
      const qList = g.doctors;
      const qIdx = AppState.grammarIndex % qList.length;
      const q = qList[qIdx];

      const sentenceHtml = q.parts
        .map((part, i) => {
          let cls = "doc-word";
          let display = part;
          if (AppState.doctorHealed && i === q.errorIndex) {
            cls += " healed";
            display = q.correct;
          } else if (AppState.doctorSelectedIdx === i) {
            cls += " selected";
          }
          return `<button class="${cls}" data-doc-idx="${i}">${escapeHtml(display)}</button>`;
        })
        .join("");

      let rxHtml = "";
      if (AppState.doctorSelectedIdx !== null && !AppState.doctorHealed) {
        if (AppState.doctorSelectedIdx === q.errorIndex) {
          rxHtml = `
            <div style="margin-top:14px;padding:14px;background:#EFF6FF;border-radius:14px">
              <div style="font-weight:700;color:#1E40AF;margin-bottom:10px">🩺 找准病灶了！请选择正确的“处方”替换 <u>${escapeHtml(q.parts[q.errorIndex])}</u>：</div>
              <div style="display:flex;gap:10px;flex-wrap:wrap">
                ${q.options.map(opt => `<button class="btn btn-primary btn-sm" data-rx="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`).join("")}
              </div>
            </div>
          `;
        } else {
          rxHtml = `<div class="feedback-box feedback-err">这个词很健康哦，再找找句子里真正生病的词吧！</div>`;
        }
      }

      bodyHtml = `
        <div>
          <div style="font-size:13px;color:#64748B;margin-bottom:6px">语法小医生 · 第 ${qIdx + 1} / ${qList.length} 题</div>
          <h4 style="font-size:17px;margin-bottom:8px">🩺 ${escapeHtml(q.prompt)}（先点击句子里出错的词）</h4>
          <div class="doctor-sentence">${sentenceHtml}</div>
          ${rxHtml}
          ${renderFeedbackHtml(AppState.grammarFeedback)}
          <div style="margin-top:16px">
            <button class="btn btn-soft" id="btnNextGrammar">下一题 →</button>
          </div>
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="rule-card">
        <h4>💡 Find the rule：${escapeHtml(g.ruleTitle)}</h4>
        <p>${escapeHtml(g.ruleTip)}</p>
        <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">
          ${g.examples.map(ex => `<div class="word-example" style="margin:0;padding:7px 12px;font-size:14px" data-speak-ex="${escapeHtml(ex)}">🔊 ${escapeHtml(ex)}</div>`).join("")}
        </div>
      </div>

      <div class="sub-mode-bar">
        <div class="seg-group">
          <button class="seg-btn ${AppState.grammarMode === "builder" ? "active" : ""}" data-gmode="builder">🧱 句子积木工坊</button>
          <button class="seg-btn ${AppState.grammarMode === "doctor" ? "active" : ""}" data-gmode="doctor">🩺 语法小医生找茬</button>
        </div>
        <div style="font-size:13px;color:#64748B">答对 3 题自动点亮 ⭐ 语法星（当前已答对 ${AppState.unitGrammarCorrectCount} 题）</div>
      </div>

      ${bodyHtml}
    `;

    panel.querySelectorAll("[data-speak-ex]").forEach(el => {
      el.addEventListener("click", () => window.Speech4A.speak(el.dataset.speakEx, 0.9));
    });

    panel.querySelectorAll("[data-gmode]").forEach(btn => {
      btn.addEventListener("click", () => {
        AppState.grammarMode = btn.dataset.gmode;
        AppState.grammarIndex = 0;
        setupGrammarQuestion();
        renderGrammarModule(panel, unit);
      });
    });

    document.getElementById("btnNextGrammar").addEventListener("click", () => {
      AppState.grammarIndex++;
      setupGrammarQuestion();
      renderGrammarModule(panel, unit);
    });

    if (AppState.grammarMode === "builder") {
      const q = g.builders[AppState.grammarIndex % g.builders.length];
      panel.querySelectorAll("[data-add-brick]").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = Number(btn.dataset.addBrick);
          const [picked] = AppState.builderPool.splice(i, 1);
          AppState.builderPlaced.push(picked);
          renderGrammarModule(panel, unit);
        });
      });
      panel.querySelectorAll("[data-remove-brick]").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = Number(btn.dataset.removeBrick);
          const [removed] = AppState.builderPlaced.splice(i, 1);
          AppState.builderPool.push(removed);
          renderGrammarModule(panel, unit);
        });
      });
      document.getElementById("btnResetBuilder").addEventListener("click", () => {
        setupGrammarQuestion();
        renderGrammarModule(panel, unit);
      });
      document.getElementById("btnCheckBuilder").addEventListener("click", () => {
        const built = AppState.builderPlaced.map(x => x.text).join(" ");
        if (built === q.answer) {
          window.Speech4A.speak(q.answer, 0.92);
          window.Store4A.recordGrammarSolved();
          AppState.unitGrammarCorrectCount++;
          if (AppState.unitGrammarCorrectCount >= 3) {
            window.Store4A.earnStar(unit.id, "grammar");
            showToast("🎉 太棒了！已点亮本单元 ⭐ 语法星！");
          }
          AppState.grammarFeedback = { ok: true, msg: `🎉 拼句完美！${q.explain}` };
        } else {
          window.Store4A.addGrammarMistake(unit.id, `u${unit.id}_b_${AppState.grammarIndex % g.builders.length}`, q.prompt, q.answer, q.explain);
          AppState.grammarFeedback = { ok: false, msg: `语序还差一点点哦！参考答案：${q.answer}（${q.explain}）` };
        }
        renderGrammarModule(panel, unit);
        updateTopBadges();
      });
    } else {
      const q = g.doctors[AppState.grammarIndex % g.doctors.length];
      panel.querySelectorAll("[data-doc-idx]").forEach(btn => {
        btn.addEventListener("click", () => {
          if (AppState.doctorHealed) return;
          AppState.doctorSelectedIdx = Number(btn.dataset.docIdx);
          AppState.grammarFeedback = null;
          renderGrammarModule(panel, unit);
        });
      });
      panel.querySelectorAll("[data-rx]").forEach(btn => {
        btn.addEventListener("click", () => {
          const pick = btn.dataset.rx;
          const healedSentence = q.parts.map((p, i) => (i === q.errorIndex ? q.correct : p)).join(" ");
          if (pick === q.correct) {
            AppState.doctorHealed = true;
            window.Store4A.recordGrammarSolved();
            AppState.unitGrammarCorrectCount++;
            if (AppState.unitGrammarCorrectCount >= 3) {
              window.Store4A.earnStar(unit.id, "grammar");
              showToast("🎉 语法小神医！已点亮本单元 ⭐ 语法星！");
            }
            AppState.grammarFeedback = { ok: true, msg: `🩺 治愈成功！${q.explain}` };
            window.Speech4A.speak(healedSentence.replace(/\(.*?\)/g, ""), 0.9);
          } else {
            window.Store4A.addGrammarMistake(unit.id, `u${unit.id}_d_${AppState.grammarIndex % g.doctors.length}`, q.parts.join(" "), healedSentence, q.explain);
            AppState.grammarFeedback = { ok: false, msg: `这个药方不太对哦，再想想：${q.explain}` };
          }
          renderGrammarModule(panel, unit);
          updateTopBadges();
        });
      });
    }
  }

  // -------------------- 模块 3：开口说 --------------------
  function renderSpeakingModule(panel, unit) {
    const sp = unit.speaking;
    const total = sp.lines.length;
    const idx = AppState.speakingIndex % total;
    const line = sp.lines[idx];
    const recSupported = window.Speech4A.isRecognitionSupported();

    let scaffoldHtml = "";
    if (AppState.speakingLevel === 1) {
      if (AppState.speakingCompare) {
        scaffoldHtml = `
          <div style="font-size:13px;color:#1D4ED8;font-weight:700;margin-bottom:4px">Lv.1 跟读模仿（绿色=已准确识别）：</div>
          <div class="word-match-row">
            ${AppState.speakingCompare.details.map(d => `<span class="wm-token ${d.hit ? "hit" : ""}">${escapeHtml(d.raw)}</span>`).join("")}
          </div>
        `;
      } else {
        scaffoldHtml = `
          <div style="font-size:13px;color:#1D4ED8;font-weight:700;margin-bottom:6px">Lv.1 跟读模仿（请大声读出下面这句话）：</div>
          <div style="font-size:20px;font-weight:800;color:#0F172A;margin-bottom:6px">${escapeHtml(line.target)}</div>
        `;
      }
    } else if (AppState.speakingLevel === 2) {
      scaffoldHtml = `
        <div style="font-size:13px;color:#1D4ED8;font-weight:700;margin-bottom:8px">Lv.2 关键词提示（试着用这些关键词自己连成句子说出来）：</div>
        <div style="margin-bottom:8px">
          ${line.keywords.map(k => `<span class="word-helper-chip" style="font-size:15px">${escapeHtml(k)}</span>`).join("")}
        </div>
        <div style="font-size:13.5px;color:#475569">中文意思：${escapeHtml(line.hintCn)}</div>
      `;
    } else {
      scaffoldHtml = `
        <div style="font-size:13px;color:#1D4ED8;font-weight:700;margin-bottom:6px">Lv.3 情景自由应答（不看英文提示，直接回答伙伴）：</div>
        <div style="font-size:15.5px;color:#1E293B;font-weight:600">💡 任务提示：${escapeHtml(line.hintCn)}</div>
      `;
    }

    let resultHtml = "";
    if (AppState.spokenText) {
      const score = AppState.speakingCompare ? AppState.speakingCompare.score : 0;
      const ok = score >= 55;
      resultHtml = `
        <div class="feedback-box ${ok ? "feedback-ok" : "feedback-err"}">
          <div>🎙️ 识别到你说：<em>"${escapeHtml(AppState.spokenText)}"</em></div>
          <div style="margin-top:4px">${ok ? `🌟 太棒了！关键词命中度 ${score}%，表达很清晰！` : `💪 识别度 ${score}%，再放慢一点大声读一遍试试看！`}</div>
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="sub-mode-bar">
        <div class="seg-group">
          <button class="seg-btn ${AppState.speakingLevel === 1 ? "active" : ""}" data-slevel="1">Lv.1 跟读模仿</button>
          <button class="seg-btn ${AppState.speakingLevel === 2 ? "active" : ""}" data-slevel="2">Lv.2 关键词提示</button>
          <button class="seg-btn ${AppState.speakingLevel === 3 ? "active" : ""}" data-slevel="3">Lv.3 情景应答</button>
        </div>
        <div style="font-size:13px;color:#64748B">第 ${idx + 1} / ${total} 轮对话 · 已完成 ${AppState.speakingPassedSet.size}/${total}</div>
      </div>

      <div class="chat-stage">
        <div style="font-size:14px;font-weight:700;color:#475569;margin-bottom:12px">🎬 课本情景：${escapeHtml(sp.scene)}</div>

        <div class="npc-bubble">
          <div class="npc-avatar">${sp.npcAvatar}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:800;color:#3B82F6;margin-bottom:4px">${escapeHtml(sp.npcName)} 说：</div>
            <div style="font-size:17.5px;font-weight:700;color:#0F172A">${escapeHtml(line.npc)}</div>
            <div style="font-size:13.5px;color:#64748B;margin-top:4px">${escapeHtml(line.npcCn)}</div>
            <button class="btn btn-soft btn-sm" style="margin-top:10px" id="btnPlayNpc">🔊 听伙伴说</button>
          </div>
        </div>

        <div class="user-speak-box">
          ${scaffoldHtml}
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px">
            <button class="mic-btn ${AppState.isRecording ? "recording" : ""}" id="btnMic">
              ${AppState.isRecording ? "⏹️ 正在听你说...（点击停止）" : "🎤 点击开始开口说"}
            </button>
            <button class="btn btn-soft" id="btnPlayTarget">🔊 听示范读音</button>
            <button class="btn btn-success btn-sm" id="btnSelfCheck">✅ 我已大声读完，打卡本轮</button>
          </div>
          ${!recSupported ? `<div style="font-size:12.5px;color:#92400E;margin-top:8px">提示：当前浏览器暂不支持麦克风语音识别（建议使用 Chrome / Edge 浏览器体验逐词识别），你依然可以听示范读音并用“打卡本轮”完成练习！</div>` : ""}
          ${resultHtml}
        </div>

        <div style="display:flex;justify-content:space-between">
          <button class="btn btn-soft" id="prevSpeakBtn">← 上一轮</button>
          <button class="btn btn-primary" id="nextSpeakBtn">下一轮对话 →</button>
        </div>
      </div>
    `;

    panel.querySelectorAll("[data-slevel]").forEach(btn => {
      btn.addEventListener("click", () => {
        AppState.speakingLevel = Number(btn.dataset.slevel);
        renderSpeakingModule(panel, unit);
      });
    });

    document.getElementById("btnPlayNpc").addEventListener("click", () => window.Speech4A.speak(line.npc, 0.9));
    document.getElementById("btnPlayTarget").addEventListener("click", () => window.Speech4A.speak(line.target, 0.88));

    const markLinePassed = () => {
      AppState.speakingPassedSet.add(idx);
      window.Store4A.recordSpeakingDone();
      if (AppState.speakingPassedSet.size >= total) {
        window.Store4A.earnStar(unit.id, "speaking");
        showToast("🎉 口语小达人！已点亮本单元 ⭐ 开口说星！");
      } else {
        showToast("👏 本轮口语打卡成功！");
      }
      updateTopBadges();
    };

    document.getElementById("btnSelfCheck").addEventListener("click", () => {
      markLinePassed();
      renderSpeakingModule(panel, unit);
    });

    document.getElementById("btnMic").addEventListener("click", () => {
      if (AppState.isRecording) {
        window.Speech4A.stopListening();
        AppState.isRecording = false;
        renderSpeakingModule(panel, unit);
        return;
      }
      AppState.isRecording = true;
      AppState.spokenText = "";
      AppState.speakingCompare = null;
      renderSpeakingModule(panel, unit);

      window.Speech4A.startListening({
        onResult: (transcript, isFinal) => {
          AppState.spokenText = transcript;
          AppState.speakingCompare = window.Speech4A.compareSentence(line.target, transcript);
          if (isFinal && AppState.speakingCompare.score >= 55) {
            markLinePassed();
          }
          renderSpeakingModule(panel, unit);
        },
        onError: (err) => {
          AppState.isRecording = false;
          if (err === "not-supported") {
            showToast("当前浏览器不支持语音识别，请使用 Chrome/Edge 或直接点击打卡按钮。");
          } else {
            showToast("麦克风未获取到声音，请检查麦克风权限后重试。");
          }
          renderSpeakingModule(panel, unit);
        },
        onEnd: () => {
          AppState.isRecording = false;
          renderSpeakingModule(panel, unit);
        }
      });
    });

    document.getElementById("prevSpeakBtn").addEventListener("click", () => {
      AppState.speakingIndex = (idx - 1 + total) % total;
      AppState.spokenText = "";
      AppState.speakingCompare = null;
      renderSpeakingModule(panel, unit);
    });
    document.getElementById("nextSpeakBtn").addEventListener("click", () => {
      AppState.speakingIndex = (idx + 1) % total;
      AppState.spokenText = "";
      AppState.speakingCompare = null;
      renderSpeakingModule(panel, unit);
    });
  }

  // -------------------- 模块 4：练写作 --------------------
  function inspectWriting(lines, unit) {
    const nonEmpty = lines.map(s => s.trim()).filter(Boolean);
    const fullText = nonEmpty.join(" ");
    const issues = [];
    const praises = [];

    if (nonEmpty.length < 3) {
      issues.push("目前写的句子还不够 3 句，试着把 4 个引导问题都写完整吧！");
    } else {
      praises.push(`一共完成了 ${nonEmpty.length} 句连贯表达，篇幅很棒！`);
    }

    // 检查首字母大写和句末标点
    let capErr = 0;
    let puncErr = 0;
    nonEmpty.forEach((sent, i) => {
      if (/^[a-z]/.test(sent)) capErr++;
      if (!/[.!?]$/.test(sent)) puncErr++;
    });
    if (capErr > 0) issues.push(`有 ${capErr} 句话的【句首字母】忘了大写哦！`);
    else if (nonEmpty.length > 0) praises.push("每句话首字母都规范大写了！");

    if (puncErr > 0) issues.push(`有 ${puncErr} 句话结尾忘了加标点（. / ! / ?）哦！`);
    else if (nonEmpty.length > 0) praises.push("句末标点符号非常完整！");

    if (/\bi\b/.test(fullText)) {
      issues.push("发现单独的“我”写成了小写 i，英语里“我”永远要大写成 I 哦！");
    }

    // 常见四年级语法雷区扫描
    if (/\bI is\b/i.test(fullText)) issues.push("注意搭配：I 后面要用 am，不能用 is！");
    if (/\b(he|she|it)\s+have\b/i.test(fullText)) issues.push("三单提醒：he / she / it 后面表示“有”要用 has，不用 have！");
    if (/\bshould\s+[a-z]+s\b/i.test(fullText)) issues.push("情态动词提醒：should 后面要用动词原形，不要加 s！");
    if (/\bdoesn't\s+has\b/i.test(fullText)) issues.push("助动词提醒：doesn't 后面要恢复原形 have！");

    // 命中本单元核心词检查
    const lower = fullText.toLowerCase();
    const hitWords = unit.writing.targetWords.filter(tw => lower.includes(tw.toLowerCase()));
    if (hitWords.length >= 2) {
      praises.push(`成功运用了本单元核心表达：${hitWords.slice(0, 5).join(", ")}！`);
    } else {
      issues.push("试着多用 2 个右侧的本单元核心词，让作文更地道！");
    }

    return { issues, praises, passed: nonEmpty.length >= 3 && issues.length === 0, fullText };
  }

  function renderWritingModule(panel, unit) {
    const wr = unit.writing;
    const modelHtml = wr.modelParts
      .map(p => `<span class="model-seg seg-${p.color}" title="${escapeHtml(p.role)}">${escapeHtml(p.text)}</span>`)
      .join(" ");

    const promptsHtml = wr.prompts
      .map(
        (p, i) => `
        <div class="prompt-field">
          <label>${escapeHtml(p.label)}</label>
          <input type="text" data-winput="${i}" value="${escapeHtml(AppState.writingAnswers[i] || "")}" placeholder="${escapeHtml(p.placeholder)}" />
        </div>
      `
      )
      .join("");

    const previewText = AppState.writingAnswers.map(s => s.trim()).filter(Boolean).join(" ");

    let reportHtml = "";
    if (AppState.writingReport) {
      const r = AppState.writingReport;
      reportHtml = `
        <div class="feedback-box ${r.issues.length === 0 ? "feedback-ok" : "feedback-err"}" style="margin-bottom:14px">
          <div style="font-weight:800;margin-bottom:6px">🔍 写作小侦探体检报告：</div>
          ${r.praises.map(p => `<div style="color:#065F46">✅ ${escapeHtml(p)}</div>`).join("")}
          ${r.issues.map(iss => `<div style="color:#B91C1C">🔧 ${escapeHtml(iss)}</div>`).join("")}
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="writing-layout">
        <div>
          <div class="model-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px">
              <strong style="font-size:14.5px">📖 课本范文结构拆解（<span class="model-seg seg-blue">开头</span> <span class="model-seg seg-green">细节</span> <span class="model-seg seg-orange">结尾</span>）</strong>
              <button class="btn btn-soft btn-sm" id="btnSpeakModel">🔊 听范文</button>
            </div>
            <div style="font-size:15px">${modelHtml}</div>
          </div>

          <h4 style="font-size:16px;margin-bottom:12px">✍️ 分步写出你的「${escapeHtml(wr.projectCn)}」</h4>
          ${promptsHtml}

          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
            <button class="btn btn-warning" id="btnInspectWriting">🔍 写作小侦探体检</button>
            <button class="btn btn-success" id="btnSaveWork">✨ 保存到我的作品墙</button>
            <button class="btn btn-primary" id="btnExportPng">🖼️ 导出手账图片</button>
          </div>
          ${reportHtml}
        </div>

        <div>
          <div style="background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:16px;padding:14px;margin-bottom:16px">
            <div style="font-size:13.5px;font-weight:800;margin-bottom:8px">🎒 本单元百宝词袋（点击即可插入）</div>
            <div>
              ${wr.targetWords.map(w => `<span class="word-helper-chip" data-insert-word="${escapeHtml(w)}">+ ${escapeHtml(w)}</span>`).join("")}
            </div>
          </div>

          <div class="journal-preview">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-weight:800;color:${unit.themeColor}">${unit.icon} ${escapeHtml(wr.projectTitle)}</span>
              <button class="btn btn-soft btn-sm" id="btnSpeakMyWork">🔊 朗读我的作文</button>
            </div>
            <div style="min-height:110px;font-size:15.5px;line-height:1.8;color:#1E293B;white-space:pre-wrap">${
              previewText ? escapeHtml(previewText) : `<span style="color:#94A3B8">在左侧一步步写下句子，这里会实时生成你的专属英文手账卡...</span>`
            }</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("btnSpeakModel").addEventListener("click", () => {
      window.Speech4A.speak(wr.modelParts.map(p => p.text).join(" "), 0.88);
    });

    panel.querySelectorAll("[data-winput]").forEach(inp => {
      inp.addEventListener("focus", () => {
        AppState.activePromptIdx = Number(inp.dataset.winput);
      });
      inp.addEventListener("input", () => {
        AppState.writingAnswers[Number(inp.dataset.winput)] = inp.value;
        // 实时更新右侧预览文字，不重绘焦点
        const previewDiv = panel.querySelector(".journal-preview > div:nth-child(2)");
        const txt = AppState.writingAnswers.map(s => s.trim()).filter(Boolean).join(" ");
        previewDiv.textContent = txt || "在左侧一步步写下句子，这里会实时生成你的专属英文手账卡...";
      });
    });

    panel.querySelectorAll("[data-insert-word]").forEach(chip => {
      chip.addEventListener("click", () => {
        const idx = AppState.activePromptIdx || 0;
        const cur = AppState.writingAnswers[idx] || "";
        const word = chip.dataset.insertWord;
        AppState.writingAnswers[idx] = cur ? cur + (cur.endsWith(" ") ? "" : " ") + word : word;
        renderWritingModule(panel, unit);
        const inp = panel.querySelector(`[data-winput="${idx}"]`);
        if (inp) inp.focus();
      });
    });

    document.getElementById("btnSpeakMyWork").addEventListener("click", () => {
      const txt = AppState.writingAnswers.map(s => s.trim()).filter(Boolean).join(" ");
      if (!txt) return showToast("先写几句话再朗读吧！");
      window.Speech4A.speak(txt, 0.88);
    });

    document.getElementById("btnInspectWriting").addEventListener("click", () => {
      AppState.writingReport = inspectWriting(AppState.writingAnswers, unit);
      renderWritingModule(panel, unit);
    });

    document.getElementById("btnSaveWork").addEventListener("click", () => {
      const lines = AppState.writingAnswers.map(s => s.trim()).filter(Boolean);
      if (lines.length < 2) return showToast("至少写 2 句话再保存手账卡哦！");
      const work = window.Store4A.saveWork({
        unitId: unit.id,
        unitCode: unit.code,
        title: wr.projectTitle,
        icon: unit.icon,
        themeColor: unit.themeColor,
        lines,
        text: lines.join(" ")
      });
      showToast("🎉 作品已保存到「我的作品墙」，并点亮 ⭐ 写作星！");
      updateTopBadges();
      renderUnitWorkspace();
    });

    document.getElementById("btnExportPng").addEventListener("click", () => {
      const lines = AppState.writingAnswers.map(s => s.trim()).filter(Boolean);
      if (lines.length === 0) return showToast("先写几句话再导出手账图片哦！");
      exportJournalCardPNG({
        unitCode: unit.code,
        title: wr.projectTitle,
        icon: unit.icon,
        themeColor: unit.themeColor,
        text: lines.join(" "),
        date: new Date().toLocaleDateString("zh-CN")
      });
    });
  }

  // ==================== Canvas 手账卡高清 PNG 导出 ====================
  function exportJournalCardPNG(work) {
    const canvas = document.getElementById("cardCanvas");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // 米白纸背景
    ctx.fillStyle = "#FFFDF7";
    ctx.fillRect(0, 0, W, H);

    // 彩色边框
    ctx.strokeStyle = work.themeColor || "#3B82F6";
    ctx.lineWidth = 14;
    ctx.strokeRect(24, 24, W - 48, H - 48);

    // 顶部横幅
    ctx.fillStyle = work.themeColor || "#3B82F6";
    ctx.fillRect(24, 24, W - 48, 150);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(`${work.unitCode} · Shanghai 4A English Journal`, 64, 86);
    ctx.font = "bold 42px sans-serif";
    ctx.fillText(`${work.icon || "✨"} ${work.title}`, 64, 144);

    // 稿纸横线
    ctx.strokeStyle = "#EFE7D6";
    ctx.lineWidth = 2;
    for (let y = 260; y < H - 140; y += 64) {
      ctx.beginPath();
      ctx.moveTo(64, y);
      ctx.lineTo(W - 64, y);
      ctx.stroke();
    }

    // 自动换行绘制英文正文
    ctx.fillStyle = "#1E293B";
    ctx.font = "600 32px Georgia, serif";
    const maxW = W - 136;
    const words = work.text.split(" ");
    let line = "";
    let y = 248;
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, 68, y);
        line = words[i];
        y += 64;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 68, y);

    // 底部日期与印章
    ctx.fillStyle = "#64748B";
    ctx.font = "24px sans-serif";
    ctx.fillText(`Date: ${work.date}  |  沪教四上英语成长屋`, 64, H - 64);

    const a = document.createElement("a");
    a.download = `${work.unitCode}_${work.title.replace(/\s+/g, "_")}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    showToast("🖼️ 精美手账卡图片已下载！");
  }

  // ==================== 3. 错题消灭站 ====================
  function renderMistakesView() {
    const s = window.Store4A.getState();

    let contentHtml = "";
    if (AppState.mistakeTab === "words") {
      if (s.wordMistakes.length === 0) {
        contentHtml = `<div style="text-align:center;padding:48px 20px">
          <div style="font-size:48px;margin-bottom:10px">🎉</div>
          <h3>太棒了！错词小怪兽已经全部被消灭啦！</h3>
          <p style="color:#64748B;margin-top:6px">继续去各单元挑战「真听写模式」，巩固更多新词吧。</p>
        </div>`;
      } else {
        const idx = AppState.mistakeWordIdx % s.wordMistakes.length;
        const m = s.wordMistakes[idx];
        contentHtml = `
          <div class="word-stage">
            <div class="flashcard">
              <div style="font-size:13px;color:#DC2626;font-weight:700;margin-bottom:8px">
                👾 错词小怪兽 ${idx + 1} / ${s.wordMistakes.length} · 驯服进度：${m.streak || 0} / 2（连对 2 次移出）
              </div>
              <div class="word-cn-row">${escapeHtml(m.cn)}</div>
              <div class="audio-controls" style="margin-bottom:12px">
                <button class="btn btn-primary" id="btnMistakeSpeak">🔊 听发音</button>
                <button class="btn btn-soft" id="btnMistakeSlow">🐢 慢速</button>
              </div>
              <input type="text" class="dictation-input" id="mistakeInput" placeholder="输入正确英文拼写消灭它..." autocomplete="off" spellcheck="false" />
              <button class="btn btn-success" id="btnCheckMistake">⚔️ 发起攻击（回车）</button>
              ${renderFeedbackHtml(AppState.mistakeFeedback)}
            </div>
          </div>
        `;
      }
    } else {
      if (s.grammarMistakes.length === 0) {
        contentHtml = `<div style="text-align:center;padding:48px 20px">
          <div style="font-size:48px;margin-bottom:10px">🩺</div>
          <h3>语法错题本空空如也，语法功底很扎实！</h3>
        </div>`;
      } else {
        contentHtml = s.grammarMistakes
          .map(
            gm => `
            <div class="report-card" style="margin-bottom:12px">
              <div style="font-size:12px;font-weight:800;color:#3B82F6">Unit ${gm.unitId}</div>
              <div style="font-weight:700;margin:4px 0">原题：${escapeHtml(gm.prompt)}</div>
              <div style="color:#065F46;font-weight:700">✅ 正确表达：${escapeHtml(gm.answer)}</div>
              <div style="font-size:13.5px;color:#475569;margin:6px 0 10px">💡 解析：${escapeHtml(gm.explain)}</div>
              <button class="btn btn-success btn-sm" data-resolve-gm="${escapeHtml(gm.key)}">✓ 我彻底懂了，移出错题本</button>
            </div>
          `
          )
          .join("");
      }
    }

    mainEl.innerHTML = `
      <div class="panel">
        <div class="sub-mode-bar">
          <div>
            <h2 style="font-size:21px">👾 错题消灭站</h2>
            <p style="font-size:13.5px;color:#64748B">把错过的词和语法彻底攻克，才是真正提分的秘密武器！</p>
          </div>
          <div class="seg-group">
            <button class="seg-btn ${AppState.mistakeTab === "words" ? "active" : ""}" data-mtab="words">错词小怪兽 (${s.wordMistakes.length})</button>
            <button class="seg-btn ${AppState.mistakeTab === "grammar" ? "active" : ""}" data-mtab="grammar">语法错题本 (${s.grammarMistakes.length})</button>
          </div>
        </div>
        ${contentHtml}
      </div>
    `;

    mainEl.querySelectorAll("[data-mtab]").forEach(b => {
      b.addEventListener("click", () => {
        AppState.mistakeTab = b.dataset.mtab;
        AppState.mistakeFeedback = null;
        renderMistakesView();
      });
    });

    if (AppState.mistakeTab === "words" && s.wordMistakes.length > 0) {
      const m = s.wordMistakes[AppState.mistakeWordIdx % s.wordMistakes.length];
      const inp = document.getElementById("mistakeInput");
      inp.focus();
      document.getElementById("btnMistakeSpeak").addEventListener("click", () => window.Speech4A.speak(m.word, 0.9));
      document.getElementById("btnMistakeSlow").addEventListener("click", () => window.Speech4A.speak(m.word, 0.72));
      const check = () => {
        const val = inp.value.trim();
        if (!val) return;
        if (val.toLowerCase() === m.word.toLowerCase()) {
          const prevStreak = m.streak || 0;
          window.Store4A.markWordMastered(m.word);
          window.Speech4A.speak(m.word, 0.92);
          if (prevStreak + 1 >= 2) {
            AppState.mistakeFeedback = { ok: true, msg: `🎉 连续拼对 2 次！成功驯服并移除 "${m.word}"！` };
          } else {
            AppState.mistakeFeedback = { ok: true, msg: `⚔️ 命中！已连对 1/2 次，再对 1 次就彻底消灭它！` };
            AppState.mistakeWordIdx++;
          }
        } else {
          window.Store4A.addWordMistake(m.unitId, m);
          AppState.mistakeFeedback = { ok: false, msg: `还差一点，正确拼写是：${m.word}（连胜已重置，加油！）` };
        }
        renderMistakesView();
        updateTopBadges();
      };
      document.getElementById("btnCheckMistake").addEventListener("click", check);
      inp.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
    }

    mainEl.querySelectorAll("[data-resolve-gm]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.Store4A.resolveGrammarMistake(btn.dataset.resolveGm);
        showToast("✅ 已移出语法错题本！");
        renderMistakesView();
        updateTopBadges();
      });
    });
  }

  // ==================== 4. 我的作品墙 ====================
  function renderGalleryView() {
    const works = window.Store4A.getState().works;
    const body = works.length
      ? `<div class="gallery-grid">
          ${works
            .map(
              w => `
              <div class="journal-preview">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <strong style="color:${w.themeColor}">${w.icon} ${escapeHtml(w.unitCode)} · ${escapeHtml(w.title)}</strong>
                  <span style="font-size:12px;color:#64748B">${escapeHtml(w.date)}</span>
                </div>
                <div style="font-size:15px;line-height:1.75;color:#1E293B;margin-bottom:14px">${escapeHtml(w.text)}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <button class="btn btn-soft btn-sm" data-read-work="${w.id}">🔊 朗读</button>
                  <button class="btn btn-primary btn-sm" data-png-work="${w.id}">🖼️ 导出图片</button>
                  <button class="btn btn-danger-soft btn-sm" data-del-work="${w.id}">删除</button>
                </div>
              </div>
            `
            )
            .join("")}
        </div>`
      : `<div style="text-align:center;padding:48px 20px">
          <div style="font-size:48px;margin-bottom:10px">🎨</div>
          <h3>作品墙还空着呢！</h3>
          <p style="color:#64748B;margin-top:6px">去任意单元的「✍️ 练写作」模块完成一张英文手账卡，就会展示在这里！</p>
        </div>`;

    mainEl.innerHTML = `
      <div class="panel">
        <h2 style="font-size:21px;margin-bottom:4px">🎨 我的英语作品墙</h2>
        <p style="font-size:13.5px;color:#64748B;margin-bottom:20px">每一张手账卡都是你进步的见证，可以随时朗读回听或下载保存图片。</p>
        ${body}
      </div>
    `;

    mainEl.querySelectorAll("[data-read-work]").forEach(btn => {
      btn.addEventListener("click", () => {
        const w = works.find(x => x.id === btn.dataset.readWork);
        if (w) window.Speech4A.speak(w.text, 0.88);
      });
    });
    mainEl.querySelectorAll("[data-png-work]").forEach(btn => {
      btn.addEventListener("click", () => {
        const w = works.find(x => x.id === btn.dataset.pngWork);
        if (w) exportJournalCardPNG(w);
      });
    });
    mainEl.querySelectorAll("[data-del-work]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.Store4A.deleteWork(btn.dataset.delWork);
        showToast("已删除该作品");
        renderGalleryView();
        updateTopBadges();
      });
    });
  }

  // ==================== 5. 家长小报告 ====================
  function renderParentReport() {
    const s = window.Store4A.getState();
    const wordPct = Math.round((s.masteredWords.length / TOTAL_WORDS) * 100);
    let stars = { words: 0, grammar: 0, speaking: 0, writing: 0 };
    ALL_UNITS.forEach(u => {
      const st = window.Store4A.getUnitStars(u.id);
      if (st.words) stars.words++;
      if (st.grammar) stars.grammar++;
      if (st.speaking) stars.speaking++;
      if (st.writing) stars.writing++;
    });

    mainEl.innerHTML = `
      <div class="panel">
        <h2 style="font-size:21px;margin-bottom:4px">📊 家长学习小报告</h2>
        <p style="font-size:13.5px;color:#64748B;margin-bottom:20px">数据保存在本地浏览器中，帮助家长一眼掌握孩子的薄弱项与成长轨迹。</p>

        <div class="report-grid">
          <div class="report-card">
            <div style="font-size:13px;color:#64748B">原版核心词掌握度</div>
            <div style="font-size:26px;font-weight:800;color:#1D4ED8">${s.masteredWords.length} / ${TOTAL_WORDS} (${wordPct}%)</div>
            <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${wordPct}%"></div></div>
          </div>
          <div class="report-card">
            <div style="font-size:13px;color:#64748B">语法闯关答对次数</div>
            <div style="font-size:26px;font-weight:800;color:#10B981">${s.stats.grammarSolved} 次</div>
            <div style="font-size:12.5px;color:#64748B;margin-top:6px">已点亮 ${stars.grammar}/10 个单元语法星</div>
          </div>
          <div class="report-card">
            <div style="font-size:13px;color:#64748B">口语情景练习轮数</div>
            <div style="font-size:26px;font-weight:800;color:#F59E0B">${s.stats.speakingCompleted} 轮</div>
            <div style="font-size:12.5px;color:#64748B;margin-top:6px">已点亮 ${stars.speaking}/10 个单元口语星</div>
          </div>
          <div class="report-card">
            <div style="font-size:13px;color:#64748B">手账写作作品数</div>
            <div style="font-size:26px;font-weight:800;color:#8B5CF6">${s.works.length} 篇</div>
            <div style="font-size:12.5px;color:#64748B;margin-top:6px">已点亮 ${stars.writing}/10 个单元写作星</div>
          </div>
        </div>

        <div class="report-card" style="margin-bottom:18px">
          <h4 style="margin-bottom:8px">🎯 近期最需要帮孩子巩固的薄弱点</h4>
          ${
            s.wordMistakes.length === 0 && s.grammarMistakes.length === 0
              ? `<p style="color:#10B981;font-weight:600">目前没有积压错题，建议引导孩子每天体验 1 个单元的「真听写」和「开口说」！</p>`
              : `
                ${s.wordMistakes.length ? `<div style="margin-bottom:8px"><strong>高频易错词：</strong>${s.wordMistakes.map(m => `<span class="word-helper-chip" style="background:#FEE2E2;color:#B91C1C;border-color:#FCA5A5">${escapeHtml(m.word)} (${escapeHtml(m.cn)})</span>`).join("")}</div>` : ""}
                ${s.grammarMistakes.length ? `<div><strong>待巩固语法题：</strong>共 ${s.grammarMistakes.length} 题（可在「错题消灭站」一键复习）。</div>` : ""}
              `
          }
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <button class="btn btn-primary btn-sm" id="btnExportBackup">💾 导出学习进度备份</button>
          <label class="btn btn-soft btn-sm" style="cursor:pointer">
            📂 导入进度备份
            <input type="file" id="importBackupFile" accept=".json" style="display:none" />
          </label>
          <button class="btn btn-danger-soft btn-sm" id="btnResetProgress">🗑️ 清空进度重新开始</button>
        </div>
      </div>
    `;

    document.getElementById("btnExportBackup").addEventListener("click", () => {
      const blob = new Blob([window.Store4A.exportJSON()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `4A_English_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      showToast("💾 进度备份已导出！");
    });

    document.getElementById("importBackupFile").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          window.Store4A.importJSON(reader.result);
          showToast("✅ 进度备份导入成功！");
          renderParentReport();
          updateTopBadges();
        } catch (err) {
          showToast("❌ 文件格式不正确，导入失败");
        }
      };
      reader.readAsText(file);
    });

    document.getElementById("btnResetProgress").addEventListener("click", () => {
      if (confirm("确定要清空所有学习星星、错题本和作品墙吗？此操作无法撤销。")) {
        window.Store4A.resetAll();
        showToast("已清空学习进度");
        renderParentReport();
        updateTopBadges();
      }
    });
  }

  function renderFeedbackHtml(fb) {
    if (!fb) return "";
    return `<div class="feedback-box ${fb.ok ? "feedback-ok" : "feedback-err"}">${escapeHtml(fb.msg)}</div>`;
  }

  // ==================== 绑定顶部导航 ====================
  document.getElementById("btnHome").addEventListener("click", () => navigate("map"));
  document.querySelectorAll(".nav-pill").forEach(btn => {
    btn.addEventListener("click", () => navigate(btn.dataset.view));
  });

  // 启动首屏
  render();
})();
