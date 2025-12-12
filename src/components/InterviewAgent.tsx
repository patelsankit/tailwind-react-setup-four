import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * UI Developer Interviewer Agent (HTML/CSS/JS/jQuery)
 * - Single-file React component
 * - TailwindCSS for styling
 * - No external UI deps; drop into any React/Vite/Next project
 *
 * Highlights
 * - Topic filters (HTML, CSS, JavaScript, jQuery)
 * - Difficulty filter (Beginner, Intermediate, Advanced)
 * - Timed mode (per-question timer)
 * - MCQ + Open-ended + Code questions
 * - Smart keyword/rubric-based grading
 * - Follow-up probes, hints, explanations
 * - Progress + score breakdown
 * - Export attempt as JSON
 */

// ---------- Types ----------
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;
const TOPICS = ["HTML", "CSS", "JavaScript", "jQuery"] as const;

/** @typedef {typeof DIFFICULTIES[number]} Difficulty */
/** @typedef {typeof TOPICS[number]} Topic */

// ---------- Question Bank ----------
/**
 * Each question:
 * - id: string
 * - topic: Topic
 * - type: 'mcq' | 'open' | 'code'
 * - difficulty: Difficulty
 * - prompt: string (markdown-lite)
 * - options?: string[] (for MCQ)
 * - answer?: string | number | string[] (correct answer or canonical)
 * - rubric?: { keywords: string[]; misconceptions?: string[]; minKeywords?: number }
 * - hint?: string
 * - explanation?: string
 * - followUp?: string
 */
const QB = [
  // HTML
  {
    id: "html1",
    topic: "HTML",
    type: "open",
    difficulty: "Beginner",
    prompt: "What is the semantic difference between <section>, <article>, and <div>?",
    rubric: {
      keywords: [
        "semantic",
        "self-contained",
        "independent",
        "thematic grouping",
        "generic",
        "non-semantic",
        "document outline",
      ],
      misconceptions: [
        "purely for styling",
        "no difference",
        "SEO only",
      ],
      minKeywords: 3,
    },
    hint: "Think: independent piece vs thematic grouping vs generic container.",
    explanation:
      "<article> is a self-contained, independently distributable unit (e.g., blog post). <section> groups related content under a theme or heading. <div> is a generic non-semantic container with no meaning.",
    followUp:
      "When would you nest a <section> inside an <article> and why?",
  },
  {
    id: "html2",
    topic: "HTML",
    type: "mcq",
    difficulty: "Beginner",
    prompt: "Which attribute improves accessibility by explicitly labeling a form control?",
    options: ["name", "id", "for", "aria-labelledby"],
    answer: 3, // zero-indexed => "aria-labelledby"
    hint: "Works even if the label is not a <label> element.",
    explanation:
      "aria-labelledby associates a control with one or more labeling elements by ID, improving accessibility beyond simple <label for>.",
    followUp:
      "Contrast aria-label vs aria-labelledby and when to use each.",
  },
  {
    id: "html3",
    topic: "HTML",
    type: "code",
    difficulty: "Intermediate",
    prompt:
      "Write minimal HTML to embed a responsive video that preserves aspect ratio and is accessible with a title and captions file (VTT).",
    rubric: {
      keywords: ["<video", "controls", "<track", "kind=\"captions\"", "srclang", "label", "title", "aspect-ratio", "width:100%"],
      minKeywords: 4,
    },
    hint: "<video> with <track kind=\"captions\"> and a wrapper with CSS aspect-ratio.",
    explanation:
      "Use a wrapper with CSS aspect-ratio to preserve dimensions and a <track> for captions. Include a descriptive title for screen readers.",
    followUp:
      "How would you provide multiple caption languages and default one?",
  },

  // CSS
  {
    id: "css1",
    topic: "CSS",
    type: "open",
    difficulty: "Beginner",
    prompt:
      "Explain the CSS Box Model and how box-sizing affects element dimensions.",
    rubric: {
      keywords: [
        "content",
        "padding",
        "border",
        "margin",
        "box-sizing",
        "content-box",
        "border-box",
      ],
      minKeywords: 4,
    },
    hint: "Think layers around content and which parts count toward width/height.",
    explanation:
      "content-box measures width/height excluding padding & border; border-box includes them.",
    followUp: "Why do design systems often prefer border-box?",
  },
  {
    id: "css2",
    topic: "CSS",
    type: "mcq",
    difficulty: "Intermediate",
    prompt: "Which creates a stacking context?",
    options: ["position: static", "opacity: 0.9", "z-index: auto", "border-radius: 8px"],
    answer: 1,
    hint: "Opacity values less than 1 have special behavior.",
    explanation: "opacity < 1 creates a new stacking context.",
    followUp: "Name two other properties that create stacking contexts.",
  },
  {
    id: "css3",
    topic: "CSS",
    type: "open",
    difficulty: "Advanced",
    prompt:
      "How do CSS containment (contain) and content-visibility improve performance? Give practical examples.",
    rubric: {
      keywords: [
        "paint",
        "layout",
        "style",
        "size",
        "contain: layout paint",
        "content-visibility: auto",
        "contain-intrinsic-size",
        "skip rendering",
        "off-screen",
      ],
      minKeywords: 4,
    },
    hint: "Think: isolate rendering work and skip off-screen work.",
    explanation:
      "contain isolates subtrees for layout/paint/style; content-visibility lets the UA skip rendering off-screen content while reserving space via contain-intrinsic-size.",
    followUp: "When might content-visibility harm LCP?",
  },

  // JavaScript
  {
    id: "js1",
    topic: "JavaScript",
    type: "mcq",
    difficulty: "Beginner",
    prompt:
      "What does '===' check in JavaScript?",
    options: [
      "Value only",
      "Type only",
      "Value and type without coercion",
      "Value with coercion",
    ],
    answer: 2,
    hint: "Strict equality.",
    explanation: "'===' checks both value and type without coercion.",
    followUp: "Give two cases where '==' differs from '==='.",
  },
  {
    id: "js2",
    topic: "JavaScript",
    type: "open",
    difficulty: "Intermediate",
    prompt:
      "Explain event delegation and why it improves performance in dynamic lists.",
    rubric: {
      keywords: [
        "single listener",
        "bubbles",
        "ancestor",
        "matches",
        "dynamic elements",
        "performance",
      ],
      misconceptions: ["capture only"],
      minKeywords: 3,
    },
    hint: "Attach one handler to a common ancestor and use event.target.matches().",
    explanation:
      "Delegate by listening on a static ancestor, leveraging bubbling and selector matching to handle many dynamic children.",
    followUp: "How do you stop delegation for a nested button within a card?",
  },
  {
    id: "js3",
    topic: "JavaScript",
    type: "code",
    difficulty: "Advanced",
    prompt:
      "Write a debounced function debounce(fn, delay) that preserves 'this' and arguments. Include a TypeScript-friendly signature comment.",
    rubric: {
      keywords: ["let timer", "clearTimeout", "setTimeout", "apply", "return function", "this", "args"],
      minKeywords: 4,
    },
    hint: "Use a closure with a timer and apply/call or spread.",
    explanation:
      "The wrapper clears the previous timer and schedules fn with preserved context and args after delay.",
    followUp: "Turn it into throttle; what's different?",
  },

  // jQuery
  {
    id: "jq1",
    topic: "jQuery",
    type: "open",
    difficulty: "Beginner",
    prompt:
      "How would you safely run code after the DOM is ready in jQuery and vanilla JS?",
    rubric: {
      keywords: ["$(document).ready", "$(() =>)", "DOMContentLoaded", "addEventListener"],
      minKeywords: 2,
    },
    hint: "Think: $(...) shortcut and DOMContentLoaded.",
    explanation:
      "Use $(fn) or $(document).ready(fn) in jQuery; in vanilla JS, document.addEventListener('DOMContentLoaded', fn).",
    followUp: "Why is defer often preferable today?",
  },
  {
    id: "jq2",
    topic: "jQuery",
    type: "mcq",
    difficulty: "Intermediate",
    prompt: "Which is most efficient for bulk DOM updates in jQuery?",
    options: [
      "Append each item in a loop",
      "Build an HTML string and append once",
      "Trigger layout before each append",
      "Use .live() for events",
    ],
    answer: 1,
    hint: "Minimize reflows.",
    explanation: "Batch DOM operations and append once to reduce reflows/repaints.",
    followUp: "How would you do this with DocumentFragment in vanilla JS?",
  },
  {
    id: "jq3",
    topic: "jQuery",
    type: "code",
    difficulty: "Intermediate",
    prompt:
      "Using jQuery, delegate a click handler from #list to .item > button that toggles an .active class on the parent .item only.",
    rubric: {
      keywords: ["$('#list').on('click'", "button", ".closest", ".toggleClass('active')"],
      minKeywords: 3,
    },
    hint: "Use .on with a selector and .closest().",
    explanation:
      "Event delegation to #list captures clicks from descendant buttons; use .closest('.item') to toggle.",
    followUp: "Prevent toggling when the button has data-disabled=\"true\".",
  },
] as const;

// ---------- Utilities ----------
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9#+.-]+/g, " ").trim();

function scoreByRubric(answerText: string, rubric?: { keywords?: string[]; misconceptions?: string[]; minKeywords?: number }) {
  if (!rubric) return { score: 0.5, matched: [], missed: [], flags: [] };
  const tokens = normalize(answerText);
  const matched: string[] = [];
  const missed: string[] = [];
  const flags: string[] = [];
  (rubric.keywords || []).forEach((k) => (tokens.includes(normalize(k)) ? matched.push(k) : missed.push(k)));
  (rubric.misconceptions || []).forEach((m) => tokens.includes(normalize(m)) && flags.push(m));
  const need = rubric.minKeywords ?? Math.ceil((rubric.keywords?.length || 0) * 0.5);
  const base = matched.length / Math.max(need, 1);
  const penalty = flags.length > 0 ? 0.2 : 0;
  const score = clamp(base - penalty, 0, 1);
  return { score, matched, missed, flags };
}

// ---------- Component ----------
export default function UIDevInterviewer() {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([...TOPICS]);
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number] | "All">("All");
  const [timed, setTimed] = useState(false);
  const [timePerQ, setTimePerQ] = useState(90); // seconds

  const filteredQB = useMemo(() => {
    return (QB as any[]).filter((q) => selectedTopics.includes(q.topic) && (difficulty === "All" || q.difficulty === difficulty));
  }, [selectedTopics, difficulty]);

  // Shuffle once when topics/difficulty change
  const [shuffledIds, setShuffledIds] = useState<string[]>([]);
  useEffect(() => {
    const ids = filteredQB.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffledIds(ids);
    setCurrentIndex(0);
    setHistory([]);
    setRemaining(timePerQ);
  }, [filteredQB]);

  const questionMap = useMemo(() => Object.fromEntries((QB as any[]).map((q) => [q.id, q])), []);
  const questions = useMemo(() => shuffledIds.map((id) => questionMap[id]), [shuffledIds, questionMap]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<string | number | null>(null);
  const [remaining, setRemaining] = useState(timePerQ);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const current = questions[currentIndex];
  const total = questions.length;

  // Timer
  useEffect(() => {
    if (!timed || !current) return;
    setRemaining(timePerQ);
  }, [timed, timePerQ, currentIndex]);

  useEffect(() => {
    if (!timed || !current) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          handleSubmit(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timed, currentIndex, current]);

  function resetSession() {
    setShuffledIds((prev) => {
      const ids = [...prev];
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      return ids;
    });
    setCurrentIndex(0);
    setHistory([]);
    setAnswer(null);
    setShowHint(false);
    setShowSolution(false);
    setRemaining(timePerQ);
  }

  function evaluate(q: any, ans: any) {
    if (!q) return { score: 0, detail: null };
    if (q.type === "mcq") {
      const correct = Number(q.answer) === Number(ans);
      return { score: correct ? 1 : 0, detail: { correct } };
    }
    if (q.type === "open" || q.type === "code") {
      const { score, matched, missed, flags } = scoreByRubric(String(ans || ""), q.rubric);
      return { score, detail: { matched, missed, flags } };
    }
    return { score: 0, detail: null };
  }

  function handleSubmit(auto = false) {
    if (!current) return;
    const result = evaluate(current, answer);
    const record = {
      id: current.id,
      topic: current.topic,
      difficulty: current.difficulty,
      type: current.type,
      prompt: current.prompt,
      userAnswer: answer,
      autoSubmitted: auto,
      score: result.score,
      detail: result.detail,
      timestamp: new Date().toISOString(),
    };
    setHistory((h) => [...h, record]);
    setShowHint(false);
    setShowSolution(false);
    setAnswer(null);
    // advance
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify({ settings: { selectedTopics, difficulty, timed, timePerQ }, history }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ui-dev-interview-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalScore = history.reduce((s, r) => s + (r.score || 0), 0);
  const maxScore = Math.max(history.length, 1);
  const pct = Math.round((totalScore / maxScore) * 100);

  // UI helpers
  function TopicToggle({ t }: { t: Topic }) {
    const active = selectedTopics.includes(t);
    return (
      <button
        onClick={() =>
          setSelectedTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
        }
        className={`px-3 py-1 rounded-full text-sm border transition ${
          active ? "bg-black text-white border-black" : "bg-white hover:bg-gray-50 border-gray-300"
        }`}
      >
        {t}
      </button>
    );
  }

  function DifficultySelect() {
    return (
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as any)}
        className="border rounded-lg px-3 py-2 w-full"
      >
        <option value="All">All difficulties</option>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    );
  }

  function CurrentQuestion() {
    if (!current) return <div className="text-gray-500">No questions match the filters.</div>;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide px-2 py-1 rounded bg-gray-100 border">
            {current.topic}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-gray-50 border">{current.difficulty}</span>
          <span className="text-xs px-2 py-1 rounded bg-gray-50 border">{current.type.toUpperCase()}</span>
          {timed && (
            <span className={`ml-auto text-sm font-medium ${remaining <= 10 ? "text-red-600" : "text-gray-700"}`}>
              ⏱ {remaining}s
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold leading-snug">{current.prompt}</h2>
        {current.type === "mcq" ? (
          <div className="grid grid-cols-1 gap-2">
            {current.options.map((opt: string, idx: number) => (
              <label key={idx} className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${Number(answer) === idx ? "ring-2 ring-black" : "hover:bg-gray-50"}`}>
                <input
                  type="radio"
                  name={`q-${current.id}`}
                  className="hidden"
                  checked={Number(answer) === idx}
                  onChange={() => setAnswer(idx)}
                />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        ) : (
          <div>
            <textarea
              className="w-full min-h-[140px] border rounded-lg p-3 font-mono text-sm"
              placeholder={current.type === "code" ? "Write code or pseudo-code here…" : "Type your answer…"}
              value={(answer as string) || ""}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => handleSubmit(false)} className="px-4 py-2 rounded-xl bg-black text-white font-medium">
            Submit
          </button>
          <button onClick={() => setShowHint((s) => !s)} className="px-3 py-2 rounded-xl border">
            {showHint ? "Hide hint" : "Hint"}
          </button>
          <button onClick={() => setShowSolution((s) => !s)} className="px-3 py-2 rounded-xl border">
            {showSolution ? "Hide" : "Show solution"}
          </button>
          <button
            onClick={() => {
              // record skip with 0 score
              setHistory((h) => [
                ...h,
                {
                  id: current.id,
                  topic: current.topic,
                  difficulty: current.difficulty,
                  type: current.type,
                  prompt: current.prompt,
                  userAnswer: null,
                  autoSubmitted: false,
                  score: 0,
                  detail: { skipped: true },
                  timestamp: new Date().toISOString(),
                },
              ]);
              setShowHint(false);
              setShowSolution(false);
              setAnswer(null);
              if (currentIndex < total - 1) setCurrentIndex((i) => i + 1);
            }}
            className="px-3 py-2 rounded-xl border"
          >
            Skip
          </button>
        </div>

        {showHint && current.hint && (
          <div className="p-3 border rounded-lg bg-yellow-50 text-yellow-900">💡 {current.hint}</div>
        )}
        {showSolution && current.explanation && (
          <div className="p-3 border rounded-lg bg-green-50">✅ {current.explanation}</div>
        )}
        {current.followUp && (
          <div className="p-3 border rounded-lg bg-blue-50">🔎 Follow-up: {current.followUp}</div>
        )}
      </div>
    );
  }

  function HistoryList() {
    return (
      <div className="space-y-3">
        {history.map((h, i) => (
          <details key={i} className="border rounded-lg p-3 bg-white open:shadow-sm">
            <summary className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-gray-500">Q{i + 1}</span>
              <span className="text-sm font-medium">{h.prompt.slice(0, 70)}{h.prompt.length > 70 ? "…" : ""}</span>
              <span className="ml-auto text-sm">Score: {(h.score * 100).toFixed(0)}%</span>
            </summary>
            <div className="mt-3 text-sm space-y-2">
              <div><span className="font-medium">Your answer:</span> <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded-lg">{String(h.userAnswer ?? "(skipped)")}</pre></div>
              {h.detail?.matched && (
                <div>
                  <span className="font-medium">Matched keywords:</span> {h.detail.matched.join(", ") || "—"}
                </div>
              )}
              {h.detail?.missed && h.detail.missed.length > 0 && (
                <div>
                  <span className="font-medium">Missed keywords:</span> {h.detail.missed.join(", ")}
                </div>
              )}
              {h.detail?.flags && h.detail.flags.length > 0 && (
                <div className="text-red-700">
                  <span className="font-medium">Red flags:</span> {h.detail.flags.join(", ")}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">UI Developer Interviewer Agent</h1>
          <div className="md:ml-auto flex items-center gap-2">
            <button onClick={resetSession} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">Restart</button>
            <button onClick={exportJSON} className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50">Export JSON</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="p-4 border rounded-2xl bg-white shadow-sm">
              <h2 className="font-semibold mb-3">Filters</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {TOPICS.map((t) => (
                  <TopicToggle t={t} key={t} />
                ))}
              </div>
              <div className="mb-3">
                <label className="text-sm text-gray-600">Difficulty</label>
                <DifficultySelect />
              </div>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
                  <span className="text-sm">Timed mode</span>
                </label>
                <input
                  type="number"
                  min={15}
                  max={600}
                  value={timePerQ}
                  onChange={(e) => setTimePerQ(clamp(Number(e.target.value || 0), 15, 600))}
                  className="border rounded-lg px-2 py-1 w-24 text-sm"
                  disabled={!timed}
                />
                <span className="text-sm text-gray-600">sec / question</span>
              </div>
            </div>

            <div className="p-4 border rounded-2xl bg-white shadow-sm">
              <h2 className="font-semibold mb-3">Progress</h2>
              <div className="text-sm text-gray-600 mb-2">Question {Math.min(currentIndex + 1, total)} / {total}</div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-black" style={{ width: `${(history.length / Math.max(total, 1)) * 100}%` }} />
              </div>
              <div className="mt-3 text-sm">Score: <span className="font-semibold">{pct}%</span></div>
            </div>

            <div className="p-4 border rounded-2xl bg-white shadow-sm">
              <h2 className="font-semibold mb-3">History</h2>
              {history.length === 0 ? <div className="text-sm text-gray-500">No answers yet.</div> : <HistoryList />}
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-2 p-4 border rounded-2xl bg-white shadow-sm">
            <CurrentQuestion />
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-500">
          Pro tip: Use this like a real interview — say your approach out loud, then type a concise answer. The rubric highlights missed points and red flags.
        </footer>
      </div>
    </div>
  );
}
