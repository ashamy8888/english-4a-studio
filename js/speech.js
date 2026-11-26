window.Speech4A = (function () {
  let activeRecognition = null;

  function pickEnglishVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    return (
      voices.find(v => v.lang === "en-GB" && /Samantha|Daniel|Google|Natural/i.test(v.name)) ||
      voices.find(v => v.lang === "en-US" && /Samantha|Google|Natural|Alex/i.test(v.name)) ||
      voices.find(v => v.lang && v.lang.startsWith("en-")) ||
      null
    );
  }

  function speak(text, rate = 0.92) {
    if (!("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = rate;
    utter.pitch = 1.02;
    const voice = pickEnglishVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
    return true;
  }

  function isRecognitionSupported() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function startListening({ onResult, onError, onEnd }) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      if (onError) onError("not-supported");
      return false;
    }
    stopListening();
    const rec = new SpeechRec();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      let transcript = "";
      let isFinal = false;
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }
      if (onResult) onResult(transcript.trim(), isFinal);
    };

    rec.onerror = (event) => {
      if (onError) onError(event.error || "error");
    };

    rec.onend = () => {
      activeRecognition = null;
      if (onEnd) onEnd();
    };

    activeRecognition = rec;
    try {
      rec.start();
      return true;
    } catch (e) {
      if (onError) onError("start-failed");
      return false;
    }
  }

  function stopListening() {
    if (activeRecognition) {
      try {
        activeRecognition.stop();
      } catch (e) {}
      activeRecognition = null;
    }
  }

  // 逐词比对算法：将目标句分词并标出哪些词被说准了
  function compareSentence(target, spoken) {
    const clean = (s) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9'\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);

    const targetTokens = target.split(/\s+/).filter(Boolean);
    const spokenWords = new Set(clean(spoken));

    let hitCount = 0;
    const details = targetTokens.map(raw => {
      const normalized = raw.toLowerCase().replace(/[^a-z0-9']/g, "");
      const hit = normalized.length > 0 && spokenWords.has(normalized);
      if (hit) hitCount++;
      return { raw, hit };
    });

    const score = targetTokens.length ? Math.round((hitCount / targetTokens.length) * 100) : 0;
    return { score, details, hitCount, total: targetTokens.length };
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
  }

  return {
    speak,
    isRecognitionSupported,
    startListening,
    stopListening,
    compareSentence
  };
})();
