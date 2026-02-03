export default function SettingsModal({
  open,
  title = "Lesson settings",
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 640,
          borderRadius: 12,
          border: "1px solid #ddd",
          background: "white",
          padding: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #ccc",
              cursor: "pointer",
              opacity: 0.9,
            }}
          >
            Close
          </button>
        </div>

        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
    </div>
  );
}
