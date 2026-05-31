// src/components/NavBtn.jsx
export default function NavBtn({ onClick, label, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled
        ? "rgba(255,255,255,0.06)"
        : "linear-gradient(135deg,rgba(124,58,237,0.85),rgba(37,99,235,0.85))",
      border: disabled
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(167,139,250,0.35)",
      color: disabled ? "rgba(255,255,255,0.2)" : "#fff",
      borderRadius:"clamp(10px,2vw,14px)",
      padding:"clamp(8px,2vh,13px) clamp(16px,3vw,28px)",
      cursor: disabled ? "default" : "pointer",
      fontWeight:800,
      fontSize:"clamp(13px,2vw,15px)",
      fontFamily:"'Nunito',sans-serif",
      transition:"all 0.2s",
      boxShadow: disabled ? "none" : "0 4px 20px rgba(124,58,237,0.45)",
      whiteSpace:"nowrap",
    }}>{label}</button>
  );
}