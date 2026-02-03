export default function ErrorBanner({ error }) {
  if (!error) return null;

  return (
    <div style={{ marginTop: 12, padding: 10, borderRadius: 10, border: "1px solid #f2b8b5" }}>
      <strong style={{ display: "block", marginBottom: 4 }}>Error</strong>
      <div style={{ whiteSpace: "pre-wrap" }}>{error}</div>
    </div>
  );
}
