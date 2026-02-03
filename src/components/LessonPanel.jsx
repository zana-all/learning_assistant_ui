export default function LessonPanel({
  title,
  subject,
  yearGroup,
  lessonText,
  imageBase64,
  imageStatus, // "idle" | "loading" | "success" | "failed"
  onGenerateQuiz,
  canGenerateQuiz,
  loadingQuiz,
  isOpen,
  onToggleOpen,
}) {
  const subtitle = [subject?.trim(), yearGroup?.toString().trim() ? `Year ${yearGroup}` : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <details
      open={isOpen}
      onToggle={(e) => onToggleOpen(e.currentTarget.open)}
      style={{ border: "1px solid #ddd", borderRadius: 12, marginTop: 16, padding: 12 }}
    >
      <summary style={{ cursor: "pointer", fontSize: 18, fontWeight: 600 }}>
        {title?.trim() ? title : "Lesson"}
        {subtitle ? (
          <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.75, marginTop: 4 }}>
            {subtitle}
          </div>
        ) : null}
      </summary>

      {lessonText ? (
        <>
          <div style={{ marginTop: 12, whiteSpace: "pre-wrap", lineHeight: 1.5, fontSize: 14 }}>
            {lessonText}
          </div>

          <div style={{ marginTop: 16 }}>
            {imageBase64 ? (
              <img
                src={`data:image/png;base64,${imageBase64}`}
                alt="Lesson visual aid"
                style={{ width: "100%", maxWidth: 720, borderRadius: 12, border: "1px solid #ddd" }}
              />
            ) : imageStatus === "loading" ? (
              <div
                style={{
                  width: "100%",
                  maxWidth: 720,
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  padding: 14,
                  opacity: 0.8,
                  fontSize: 13,
                }}
              >
                Generating visual aid...
              </div>
            ) : imageStatus === "failed" ? (
              <div
                style={{
                  width: "100%",
                  maxWidth: 720,
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  padding: 14,
                  fontSize: 13,
                }}
              >
                Visual aid could not be generated right now.
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  maxWidth: 720,
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  padding: 14,
                  opacity: 0.75,
                  fontSize: 13,
                }}
              >
                Visual aid will appear here.
              </div>
            )}
          </div>

          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={onGenerateQuiz}
              disabled={!canGenerateQuiz || loadingQuiz}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ccc",
                cursor: !canGenerateQuiz || loadingQuiz ? "not-allowed" : "pointer",
                opacity: !canGenerateQuiz || loadingQuiz ? 0.6 : 1,
              }}
            >
              {loadingQuiz ? "Generating quiz..." : "Test your knowledge"}
            </button>
          </div>
        </>
      ) : (
        <p style={{ opacity: 0.75, marginTop: 12 }}>Generate a lesson to see it here.</p>
      )}
    </details>
  );
}
