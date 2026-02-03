import { useMemo, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import { postScore } from "../api/learningAssistantApi";
export default function QuizPanel({
  quiz,
  answers,
  setAnswer,
  submitted,
  setSubmitted,
  subject,
  yearGroup,
  topic,
  isOpen,
  onToggleOpen,
}) {
  const questions = quiz?.questions || [];
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [savedScoreId, setSavedScoreId] = useState(null);
  
  const score = useMemo(() => {
    return questions.reduce((acc, q, i) => {
      return acc + (answers[i] && answers[i] === q.correct_answer ? 1 : 0);
    }, 0);
  }, [questions, answers]);

  const canSubmit = questions.length > 0 && !submitted;
  const hasRequiredMeta = Boolean(subject) && Boolean(yearGroup);

  async function handleSubmit() {
    setSaveError("");

    // mark as submitted first so UI shows score immediately
    setSubmitted(true);

    // guard: if missing metadata, skip save but keep submission behavior
    if (!hasRequiredMeta) {
      setSaveError("Score not saved: missing subject or year group.");
      return;
    }

    // guard: do not double-submit
    if (isSaving || savedScoreId) return;

    setIsSaving(true);
    try {
      const res = await postScore({
      subject,
      year_group: yearGroup,
      topic,
      score,
      total_questions: questions.length,
    });

    setSavedScoreId(res.id);
    } catch (err) {
      setSaveError("Could not save score. Please try again.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  if (!questions.length) {
    return (
      <div style={{ marginTop: 16, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Quiz</h2>
        <p style={{ opacity: 0.75 }}>Generate a quiz after creating a lesson.</p>
      </div>
    );
  }

  return (
    <details
      id="quiz-panel"
      open={isOpen}
      onToggle={(e) => onToggleOpen(e.currentTarget.open)}
      style={{ marginTop: 16, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
    >

      <summary style={{ cursor: "pointer", fontSize: 18, fontWeight: 600 }}>
        Quiz
      </summary>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontSize: 13, opacity: 0.9 }}>
            Questions: <strong>{questions.length}</strong>
          </div>

          {submitted ? (
            <div style={{ fontSize: 13, opacity: 0.9 }}>
              Score: <strong>{score}</strong> / {questions.length}
            </div>
          ) : null}

          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || isSaving}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc" }}
            >
              {isSaving ? "Saving..." : "Submit answers"}
            </button>
          </div>
        </div>

        {submitted && savedScoreId ? (
          <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
            Saved result (id: <strong>{savedScoreId}</strong>)
          </div>
        ) : null}

        {saveError ? (
          <div style={{ marginTop: 10, fontSize: 13, color: "crimson" }}>
            {saveError}
          </div>
        ) : null}

        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {questions.map((q, idx) => (
            <QuizQuestion
              key={idx}
              index={idx}
              question={q}
              selected={answers[idx] || ""}
              onSelect={setAnswer}
              submitted={submitted}
            />
          ))}
        </div>
    </details>
  );
}
