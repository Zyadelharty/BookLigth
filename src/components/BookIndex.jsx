// src/components/BookIndex.jsx
// Full-screen table of contents / index panel.

export default function BookIndex({ pages, currentPage, onGoTo, onClose }) {
  return (
    <>
      {/* backdrop */}
      <div onClick={onClose} style={{
        position:"fixed", inset:0,
        background:"rgba(5,5,20,0.7)",
        zIndex:700, backdropFilter:"blur(6px)",
        animation:"fadeIn 0.2s ease",
      }}/>

      {/* panel */}
      <div style={{
        position:"fixed",
        top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:"min(680px,94vw)",
        maxHeight:"85vh",
        background:"linear-gradient(150deg,#0d0b2a 0%,#1a1648 60%,#0d0b2a 100%)",
        borderRadius:28,
        zIndex:710,
        boxShadow:"0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.3)",
        display:"flex", flexDirection:"column",
        overflow:"hidden",
        animation:"scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        fontFamily:"'Nunito',sans-serif",
      }}>
        {/* header */}
        <div style={{
          padding:"22px 28px 18px",
          background:"linear-gradient(135deg,rgba(124,58,237,0.5),rgba(6,182,212,0.3))",
          borderBottom:"1px solid rgba(255,255,255,0.08)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexShrink:0,
        }}>
          <div>
            <div style={{ color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              📚 Contents
            </div>
            <div style={{ color:"#e0e7ff", fontWeight:900, fontSize:"clamp(18px,3vw,26px)", marginTop:4, fontFamily:"'Bubblegum Sans',cursive" }}>
              Table of Contents
            </div>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)",
            color:"#a5b4fc", borderRadius:12, padding:"8px 16px",
            cursor:"pointer", fontWeight:800, fontSize:14,
            transition:"all 0.2s",
          }}>✕ Close</button>
        </div>

        {/* list */}
        <div style={{ overflowY:"auto", padding:"16px 20px 24px", display:"flex", flexDirection:"column", gap:10 }}>
          {pages.map((page, i) => {
            const isActive = i === currentPage;
            const isCover  = page.type === "cover";
            const isEnd    = page.type === "end";
            return (
              <button key={page.id} onClick={() => { onGoTo(i); onClose(); }} style={{
                display:"flex", alignItems:"center", gap:16,
                background: isActive
                  ? "linear-gradient(135deg,rgba(124,58,237,0.45),rgba(6,182,212,0.35))"
                  : "rgba(255,255,255,0.04)",
                border: isActive
                  ? "1px solid rgba(139,92,246,0.6)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius:16, padding:"14px 18px",
                cursor:"pointer", textAlign:"left",
                transition:"all 0.18s",
                width:"100%",
              }}>
                {/* page emoji swatch */}
                <div style={{
                  width:52, height:52, flexShrink:0,
                  background: page.bg || "#333",
                  borderRadius:12,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:26,
                  boxShadow: isActive ? "0 0 0 3px rgba(139,92,246,0.6)" : "0 2px 8px rgba(0,0,0,0.3)",
                  transition:"all 0.18s",
                }}>
                  {page.image || "📖"}
                </div>

                {/* info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                    <span style={{
                      background: isCover ? "rgba(249,168,37,0.25)" : isEnd ? "rgba(26,35,126,0.5)" : "rgba(255,255,255,0.1)",
                      color: isCover ? "#fde68a" : isEnd ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                      fontSize:10, fontWeight:800, letterSpacing:"0.1em",
                      textTransform:"uppercase", borderRadius:6, padding:"2px 7px",
                    }}>
                      {isCover ? "Cover" : isEnd ? "End" : `Page ${i + 1}`}
                    </span>
                    {isActive && (
                      <span style={{
                        background:"rgba(139,92,246,0.3)", color:"#c4b5fd",
                        fontSize:10, fontWeight:800, letterSpacing:"0.08em",
                        textTransform:"uppercase", borderRadius:6, padding:"2px 7px",
                      }}>
                        ▶ Current
                      </span>
                    )}
                  </div>
                  <div style={{
                    color: isActive ? "#e0e7ff" : "#c4b5fd",
                    fontWeight:800, fontSize:"clamp(13px,2vw,16px)",
                    marginTop:4, fontFamily:"'Bubblegum Sans',cursive",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  }}>
                    {page.title}
                  </div>
                  {page.reference?.title && (
                    <div style={{
                      color:"rgba(255,255,255,0.35)", fontSize:12, marginTop:2,
                      display:"flex", alignItems:"center", gap:4,
                    }}>
                      🔍 {page.reference.title}
                    </div>
                  )}
                </div>

                {/* arrow */}
                <div style={{
                  color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.2)",
                  fontSize:18, flexShrink:0,
                  transition:"transform 0.18s",
                }}>›</div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity:0; transform:translate(-50%,-50%) scale(0.92); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
      `}</style>
    </>
  );
}