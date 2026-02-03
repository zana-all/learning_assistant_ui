export function normaliseQuiz(raw) {
  if (!raw) return null;

  // Your backend uses quiz_questions
  const questionsRaw =
    raw.questions ||
    raw.items ||
    raw.quiz ||
    raw.quiz_questions;

  if (!Array.isArray(questionsRaw)) return null;

  const toIndex = (key) => {
    const k = String(key || "").trim().toUpperCase();
    const map = { A: 0, B: 1, C: 2, D: 3 };
    return map[k];
  };

  const questions = questionsRaw.map((q) => {
    const options = Array.isArray(q.options) ? q.options : [];
    const idx = toIndex(q.correct_key);

    return {
      question: q.question ?? "",
      options,
      // UI expects correct_answer to be one of the options
      correct_answer: typeof idx === "number" ? options[idx] : "",
      explanation: q.explanation ?? "",
    };
  });

  return { questions };
}
