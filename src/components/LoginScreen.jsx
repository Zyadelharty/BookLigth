// src/components/LoginScreen.jsx
import { useState } from "react";
import { ADMIN_USER, ADMIN_PASS, adminStyles } from "../constants/index.js";
const { inp } = adminStyles;

export default function LoginScreen({ onLogin, onClose }) {
  const [user, setUser]   = useState("");
  const [pass, setPass]   = useState("");
  const [err,  setErr]    = useState("");
  const [shake,setShake]  = useState(false);

  const submit = () => {
    if (user===ADMIN_USER && pass===ADMIN_PASS) { onLogin(); }
    else {
      setErr("Wrong username or password!");
      setShake(true); setTimeout(()=>setShake(false),500);
    }
  };

  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(10,10,30,0.9)",zIndex:900,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontFamily:"'Nunito',sans-serif",backdropFilter:"blur(8px)",
      padding:"16px",
    }}>
      <div style={{
        background:"linear-gradient(135deg,#1e1b4b,#0f172a)",
        borderRadius:24,padding:"clamp(24px,4vw,40px)",
        width:"min(340px,100%)",
        border:"1px solid rgba(124,58,237,0.4)",
        boxShadow:"0 20px 60px rgba(0,0,0,0.65)",
        transform:shake?"translateX(-8px)":"translateX(0)",
        transition:"transform 0.1s",
      }}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:"clamp(36px,8vw,52px)"}}>🔐</div>
          <div style={{color:"#c4b5fd",fontWeight:800,fontSize:"clamp(16px,3vw,20px)",marginTop:8}}>Admin Login</div>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:"clamp(11px,1.5vw,13px)",marginTop:4}}>
            username: <b style={{color:"#a5b4fc"}}>admin</b> · password: <b style={{color:"#a5b4fc"}}>book123</b>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <input placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} style={inp} autoFocus/>
          <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} style={inp} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          {err&&<div style={{color:"#f87171",fontSize:13,textAlign:"center"}}>{err}</div>}
          <button onClick={submit} style={{background:"linear-gradient(135deg,#7c3aed,#2563eb)",border:"none",color:"#fff",borderRadius:12,padding:"12px",cursor:"pointer",fontWeight:800,fontSize:15,marginTop:4}}>Enter Admin Panel</button>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",borderRadius:12,padding:"10px",cursor:"pointer",fontSize:13,fontWeight:600}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}