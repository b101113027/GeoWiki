import type { UsState } from "./us-states";

export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\u3000/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

export function acceptedAnswers(state: UsState): string[] {
  const values = [state.name, state.chineseName, state.code, ...state.aliases];
  if (state.chineseName.endsWith("州") && state.chineseName.length > 1) {
    values.push(state.chineseName.slice(0, -1));
  }

  return [...new Set(values.map(normalizeAnswer).filter(Boolean))];
}

export function isCorrectAnswer(input: string, state: UsState): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  return acceptedAnswers(state).includes(normalized);
}

export function pickNextState(
  states: readonly UsState[],
  completed: ReadonlySet<string>,
  random: () => number = Math.random,
): UsState | null {
  const remaining = states.filter((state) => !completed.has(state.code));
  if (remaining.length === 0) return null;
  const index = Math.min(
    remaining.length - 1,
    Math.floor(random() * remaining.length),
  );
  return remaining[index] ?? null;
}

export function promptText(state: UsState): string {
  return `${state.chineseName} ${state.name} ${state.code}`;
}

export function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function accuracyPercent(correct: number, wrong: number): number | null {
  const attempts = correct + wrong;
  if (attempts === 0) return null;
  return Math.round((correct / attempts) * 100);
}

export function startStateQuiz(states: readonly UsState[]): void {
  const root = document.querySelector<HTMLElement>("[data-quiz]");
  const prompt = document.querySelector<HTMLElement>("#quiz-prompt");
  const promptZh = document.querySelector<HTMLElement>("#quiz-prompt-zh");
  const promptEn = document.querySelector<HTMLElement>("#quiz-prompt-en");
  const promptCode = document.querySelector<HTMLElement>("#quiz-prompt-code");
  const feedback = document.querySelector<HTMLElement>("#quiz-feedback");
  const count = document.querySelector<HTMLElement>("#quiz-count");
  const remaining = document.querySelector<HTMLElement>("#quiz-remaining");
  const percent = document.querySelector<HTMLElement>("#quiz-percent");
  const bar = document.querySelector<HTMLElement>("#quiz-bar");
  const barFill = document.querySelector<HTMLElement>("#quiz-bar-fill");
  const correctEl = document.querySelector<HTMLElement>("#quiz-correct");
  const wrongEl = document.querySelector<HTMLElement>("#quiz-wrong");
  const accuracyEl = document.querySelector<HTMLElement>("#quiz-accuracy");
  const timeEl = document.querySelector<HTMLElement>("#quiz-time");
  const restart = document.querySelector<HTMLButtonElement>("#quiz-restart");
  const play = document.querySelector<HTMLElement>("#quiz-play");
  const done = document.querySelector<HTMLElement>("#quiz-done");
  const doneSummary = document.querySelector<HTMLElement>("#quiz-done-summary");
  const map = document.querySelector<SVGSVGElement>(".us-map");

  if (!root || root.dataset.quizBound === "true") return;

  if (
    !prompt ||
    !promptZh ||
    !promptEn ||
    !promptCode ||
    !feedback ||
    !count ||
    !remaining ||
    !percent ||
    !bar ||
    !barFill ||
    !correctEl ||
    !wrongEl ||
    !accuracyEl ||
    !timeEl ||
    !restart ||
    !play ||
    !done ||
    !doneSummary ||
    !map
  ) {
    return;
  }

  root.dataset.quizBound = "true";

  const byCode = new Map(states.map((state) => [state.code, state]));
  const shapes = map.querySelectorAll<SVGPathElement>(".state-shape");
  const completed = new Set<string>();
  let current: UsState | null = null;
  let correctCount = 0;
  let wrongCount = 0;
  let startedAt = Date.now();
  let timer = 0;

  const stateForShape = (shape: SVGPathElement): UsState | undefined => {
    const code = shape.dataset.code;
    return code ? byCode.get(code) : undefined;
  };

  const paint = () => {
    for (const shape of shapes) {
      const code = shape.dataset.code ?? "";
      const finished = completed.has(code);
      shape.classList.toggle("is-complete", finished);
      shape.setAttribute("aria-pressed", finished ? "true" : "false");
    }
  };

  const renderStats = () => {
    const total = states.length;
    const doneCount = completed.size;
    const percentValue = Math.round((doneCount / total) * 100);
    const accuracy = accuracyPercent(correctCount, wrongCount);
    count.textContent = `${doneCount} / ${total}`;
    remaining.textContent = String(total - doneCount);
    percent.textContent = `${percentValue}%`;
    barFill.style.width = `${percentValue}%`;
    bar.setAttribute("aria-valuenow", String(doneCount));
    bar.setAttribute("aria-valuemax", String(total));
    correctEl.textContent = String(correctCount);
    wrongEl.textContent = String(wrongCount);
    accuracyEl.textContent = accuracy === null ? "—" : `${accuracy}%`;
    timeEl.textContent = formatDuration(Date.now() - startedAt);
  };

  const setFeedback = (message: string, kind: "correct" | "wrong" | "neutral") => {
    feedback.textContent = message;
    feedback.classList.toggle("is-correct", kind === "correct");
    feedback.classList.toggle("is-wrong", kind === "wrong");
  };

  const showQuestion = () => {
    current = pickNextState(states, completed);
    if (!current) {
      finish();
      return;
    }

    promptZh.textContent = current.chineseName;
    promptEn.textContent = current.name;
    promptCode.textContent = current.code;
  };

  const finish = () => {
    current = null;
    window.clearInterval(timer);
    renderStats();
    play.hidden = true;
    done.hidden = false;
    const accuracy = accuracyPercent(correctCount, wrongCount);
    doneSummary.textContent = `你完成了全部 ${states.length} 州，用時 ${timeEl.textContent}，答對 ${correctCount} 次、答錯 ${wrongCount} 次，正確率 ${accuracy ?? 0}%。`;
  };

  const markMiss = (shape: SVGPathElement) => {
    shape.classList.add("is-miss");
    window.setTimeout(() => shape.classList.remove("is-miss"), 450);
  };

  const guess = (state: UsState, shape: SVGPathElement) => {
    if (!current) return;

    if (state.code === current.code) {
      const solved = current;
      completed.add(solved.code);
      correctCount += 1;
      paint();
      renderStats();
      setFeedback(`答對了：${solved.chineseName}（${solved.name}）。`, "correct");
      showQuestion();
      return;
    }

    wrongCount += 1;
    renderStats();
    markMiss(shape);
    setFeedback("還沒點到。請繼續在地圖上找這一州，點錯越多，正確率越低。", "wrong");
  };

  const begin = () => {
    completed.clear();
    correctCount = 0;
    wrongCount = 0;
    startedAt = Date.now();
    play.hidden = false;
    done.hidden = true;
    setFeedback("", "neutral");
    paint();
    renderStats();
    showQuestion();
    window.clearInterval(timer);
    timer = window.setInterval(renderStats, 1000);
  };

  restart.addEventListener("click", begin);

  const shapeFromEvent = (event: Event): SVGPathElement | null => {
    const shape = (event.target as Element | null)?.closest(".state-shape");
    return shape instanceof SVGPathElement ? shape : null;
  };

  map.addEventListener("click", (event) => {
    const shape = shapeFromEvent(event);
    if (!shape) return;
    const state = stateForShape(shape);
    if (!state) return;
    guess(state, shape);
  });

  map.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const shape = shapeFromEvent(event);
    if (!shape) return;
    event.preventDefault();
    const state = stateForShape(shape);
    if (!state) return;
    guess(state, shape);
  });

  begin();
}
