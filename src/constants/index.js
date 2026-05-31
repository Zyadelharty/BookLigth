// src/constants/index.js

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "book123";

export const BG_PRESETS = [
  "#f9a825","#e8f5e9","#e3f2fd","#fce4ec","#fff8e1",
  "#ede7f6","#1a237e","#ff6f00","#004d40","#880e4f",
  "#ffffff","#f5f5f5","#212121","#37474f","#bf360c",
];

export const TEXT_PRESETS = [
  "#ffffff","#212121","#2e7d32","#1565c0","#880e4f",
  "#e65100","#4527a0","#f57f17","#006064","#b71c1c",
];

export const adminStyles = {
  inp: {
    background:"rgba(255,255,255,0.07)",
    border:"1px solid rgba(255,255,255,0.12)",
    borderRadius:8, color:"#e0e7ff",
    padding:"8px 12px", fontSize:14,
    width:"100%", boxSizing:"border-box",
    fontFamily:"'Nunito',sans-serif", outline:"none",
  },
  sel: {
    background:"rgba(255,255,255,0.07)",
    border:"1px solid rgba(255,255,255,0.12)",
    borderRadius:8, color:"#e0e7ff",
    padding:"8px 12px", fontSize:14,
    boxSizing:"border-box", fontFamily:"'Nunito',sans-serif",
    outline:"none", width:"auto", cursor:"pointer",
  },
  btnSm: {
    background:"rgba(255,255,255,0.08)",
    border:"1px solid rgba(255,255,255,0.12)",
    color:"#c4b5fd", borderRadius:6,
    padding:"3px 8px", cursor:"pointer",
    fontSize:12, fontWeight:700,
  },
};