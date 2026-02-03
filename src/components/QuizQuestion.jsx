export default function QuizQuestion({
  index,
  question,
  selected,
  onSelect,
  submitted,
}) {
  const isCorrect = submitted && selected && selected === question.correct_answer;
  const isWrong = submitted && selected && selected !== question.correct_answer;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
      <div style={{ fontWeight: 650, marginBottom: 10 }}>
        {index + 1}. {question.question}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {(question.options || []).map((opt) => (
          <label
            key={opt}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name={`q-${index}`}
              checked={selected === opt}
              onChange={() => onSelect(index, opt)}
              disabled={submitted}
            />
            <span style={{ fontSize: 14 }}>{opt}</span>
          </label>
        ))}
      </div>

      {submitted ? (
        <div style={{ marginTop: 12, fontSize: 13 }}>
          {isCorrect ? (
            <div>
              <strong>Correct.</strong>
            </div>
          ) : isWrong ? (
            <div>
              <strong>Not quite.</strong> Correct answer: <strong>{question.correct_answer}</strong>
            </div>
          ) : (
            <div style={{ opacity: 0.85 }}>
              No answer selected. Correct answer: <strong>{question.correct_answer}</strong>
            </div>
          )}

          {question.explanation ? (
            <div style={{ marginTop: 8, opacity: 0.9 }}>
              <strong>Explanation:</strong> {question.explanation}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
