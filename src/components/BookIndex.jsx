// src/components/BookIndex.jsx
// Only renders pages that have meaningful content.
// Calls onGoTo with the item's index in the received `pages` array —
// App.jsx maps that back to the real book page position.

export default function BookIndex({ pages, currentPage, onGoTo, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a3e 0%, #2d1b69 100%)",
          borderRadius: "24px",
          padding: "32px",
          maxWidth: "520px",
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
          fontFamily: "'Nunito', sans-serif",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            color: "#fff",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
         
        >
          ✕
        </button>

        <h2
          style={{
            fontFamily: "'Bubblegum Sans', cursive",
            color: "#FFD700",
            fontSize: 28,
            margin: "0 0 24px",
            textAlign: "center",
          }}
        >
          📑 Book Index
        </h2>

        {pages.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
            No pages to display.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pages.map((page, idx) => {
              const isActive = idx === currentPage;
              return (
                <button
                  key={page.id ?? idx}
                  onClick={() => onGoTo(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 18px",
                    background: isActive
                      ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                      : "rgba(255,255,255,0.07)",
                    border: isActive
                      ? "2px solid rgba(255,255,255,0.3)"
                      : "2px solid transparent",
                    borderRadius: 14,
                    cursor: "pointer",
                    color: "#fff",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 15,
                    fontWeight: isActive ? 800 : 600,
                    textAlign: "left",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>
                    {page.emoji || "📄"}
                  </span>
                  <span style={{ flex: 1 }}>
                    {page.title || `Page ${idx + 1}`}
                  </span>
                  {isActive && (
                    <span style={{ fontSize: 12, opacity: 0.75, flexShrink: 0 }}>
                      current
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}