import SettingsModal from "./SettingsModal";

export default function StatsModal({ open, onClose, loading, error, summary }) {
  return (
    <SettingsModal open={open} onClose={onClose} title="Your stats">
      {loading ? (
        <p style={{ opacity: 0.75 }}>Loading stats...</p>
      ) : error ? (
        <div style={{ padding: 10, border: "1px solid #f2c2c2", background: "#fff5f5", borderRadius: 10 }}>
          {error}
        </div>
      ) : !summary ? (
        <p style={{ opacity: 0.75 }}>No stats available yet. Complete a quiz to start tracking.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13, opacity: 0.9 }}>
            <div>
              Attempts: <strong>{summary.total_attempts}</strong>
            </div>
            <div>
              Average accuracy:{" "}
              <strong>{Math.round((summary.overall_avg_accuracy || 0) * 100)}%</strong>
            </div>
          </div>

          <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: 10, background: "#fafafa", fontSize: 13, fontWeight: 600 }}>
              By subject
            </div>

            {!summary.by_subject?.length ? (
              <div style={{ padding: 10, opacity: 0.75, fontSize: 13 }}>No subject breakdown yet.</div>
            ) : (
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: 10, borderTop: "1px solid #eee" }}>Subject</th>
                      <th style={{ textAlign: "right", padding: 10, borderTop: "1px solid #eee" }}>Attempts</th>
                      <th style={{ textAlign: "right", padding: 10, borderTop: "1px solid #eee" }}>Avg</th>
                      <th style={{ textAlign: "right", padding: 10, borderTop: "1px solid #eee" }}>Best</th>
                      <th style={{ textAlign: "right", padding: 10, borderTop: "1px solid #eee" }}>Worst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.by_subject.map((s) => (
                      <tr key={s.subject}>
                        <td style={{ padding: 10, borderTop: "1px solid #eee" }}>{s.subject}</td>
                        <td style={{ padding: 10, borderTop: "1px solid #eee", textAlign: "right" }}>{s.attempts}</td>
                        <td style={{ padding: 10, borderTop: "1px solid #eee", textAlign: "right" }}>
                          {Math.round((s.avg_accuracy || 0) * 100)}%
                        </td>
                        <td style={{ padding: 10, borderTop: "1px solid #eee", textAlign: "right" }}>
                          {Math.round((s.best_accuracy || 0) * 100)}%
                        </td>
                        <td style={{ padding: 10, borderTop: "1px solid #eee", textAlign: "right" }}>
                          {Math.round((s.worst_accuracy || 0) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </SettingsModal>
  );
}
