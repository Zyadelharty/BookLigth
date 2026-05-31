// src/components/ReferencePanel.jsx

export default function ReferencePanel({ reference, onClose }) {
  if (!reference) return null;
  return (
    <>
      <div onClick={onClose} style={{
        position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
        zIndex:800, backdropFilter:"blur(4px)", animation:"fadeIn 0.2s ease",
      }}/>
      <div style={{
        position:"fixed", bottom:0, left:"50%",
        transform:"translateX(-50%)",
        width:"min(560px,98vw)",
        background:"linear-gradient(160deg,#0f172a 0%,#1e1b4b 100%)",
        borderRadius:"24px 24px 0 0",
        zIndex:810, padding:"0 0 max(28px,env(safe-area-inset-bottom,28px))",
        boxShadow:"0 -16px 60px rgba(0,0,0,0.75)",
        border:"1px solid rgba(139,92,246,0.35)",
        animation:"slideUp 0.32s cubic-bezier(0.16,1,0.3,1)",
        fontFamily:"'Nunito',sans-serif",
        maxHeight:"72vh", overflowY:"auto",
      }}>
        {/* handle */}
        <div style={{ width:44,height:5,background:"rgba(255,255,255,0.2)",borderRadius:3,margin:"12px auto 0" }}/>

        {/* header */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"16px 24px 12px",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          position:"sticky", top:0,
          background:"linear-gradient(160deg,#0f172a,#1e1b4b)",
          zIndex:1,
        }}>
          <div>
            <div style={{ color:"rgba(255,255,255,0.4)",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>🔍 Topic Reference</div>
            <div style={{ color:"#c4b5fd",fontWeight:800,fontSize:"clamp(16px,3vw,22px)",marginTop:4 }}>{reference.title}</div>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.1)", border:"none", color:"#a5b4fc",
            borderRadius:10, padding:"8px 15px", cursor:"pointer", fontWeight:700, fontSize:14,
          }}>✕</button>
        </div>

        {/* facts */}
        <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:10 }}>
          {reference.facts.map((fact,i)=>(
            <div key={i} style={{
              display:"flex", gap:12, alignItems:"flex-start",
              background:"rgba(255,255,255,0.04)", borderRadius:14,
              padding:"13px 15px", border:"1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{
                width:28,height:28,borderRadius:"50%",flexShrink:0,
                background:"linear-gradient(135deg,#7c3aed,#06b6d4)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:12,fontWeight:900,color:"#fff",
              }}>{i+1}</div>
              <div style={{ color:"#e2e8f0",fontSize:"clamp(13px,2vw,15px)",lineHeight:1.65 }}>{fact}</div>
            </div>
          ))}
        </div>

        {/* learn more */}
        {reference.learnMore && (
          <div style={{ padding:"0 20px" }}>
            <a href={reference.learnMore} target="_blank" rel="noopener noreferrer" style={{
              display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              background:"linear-gradient(135deg,rgba(124,58,237,0.45),rgba(6,182,212,0.45))",
              border:"1px solid rgba(139,92,246,0.4)",
              color:"#c4b5fd",borderRadius:14,padding:"13px",
              textDecoration:"none",fontWeight:700,fontSize:14,transition:"all 0.2s",
            }}>🌐 Explore more →</a>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideUp { from{transform:translateX(-50%) translateY(100%)} to{transform:translateX(-50%) translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      `}</style>
    </>
  );
}