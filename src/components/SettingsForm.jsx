export default function SettingsForm({
  form,
  onChange,
  onGenerateLesson,
  onReset,
  canGenerateLesson,
  loadingLesson,
  apiBase,
}) {
  return (
    <div>
      <h2 style={{ marginTop: 0, fontSize: 18 }}>Inputs</h2>

      <label style={{ display: "block", marginBottom: 10 }}>
        <div style={{ fontSize: 13, marginBottom: 6, opacity: 0.9 }}>
            Year group
        </div>

        <select
            value={form.year_group}
            onChange={(e) => onChange({ year_group: e.target.value })}
            style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14,
            }}
        >
            <option value="">Select year group</option>

            {Array.from({ length: 13 }, (_, i) => {
            const year = i + 1;
            return (
                <option key={year} value={String(year)}>
                {year}
                </option>
            );
            })}
        </select>
        </label>

      <label style={{ display: "block", marginBottom: 10 }}>
        <div style={{ fontSize: 13, marginBottom: 6, opacity: 0.9 }}>Subject</div>
        <input
          value={form.subject}
          onChange={(e) => onChange({ subject: e.target.value })}
          placeholder="e.g. Maths"
        />
      </label>

      <label style={{ display: "block", marginBottom: 10 }}>
        <div style={{ fontSize: 13, marginBottom: 6, opacity: 0.9 }}>Topic (optional)</div>
        <input
          value={form.topic_idea}
          onChange={(e) => onChange({ topic_idea: e.target.value })}
          placeholder="e.g. Linear equations"
        />
      </label>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button
          onClick={onGenerateLesson}
          disabled={!canGenerateLesson || loadingLesson}
        >
          {loadingLesson ? "Generating lesson..." : "Generate lesson"}
        </button>

        <button onClick={onReset}>Reset</button>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
      </div>
    </div>
  );
}
