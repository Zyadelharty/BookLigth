// src/components/AdminPanel.jsx — responsive admin panel

import { useState } from "react";
import BookPage from "./BookPage.jsx";
import { BG_PRESETS, TEXT_PRESETS, adminStyles } from "../constants/index.js";

const { inp, sel, btnSm } = adminStyles;

function Row({ label, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ color:"rgba(255,255,255,0.6)", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>
        {label}
      </label>
      <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:6 }}>{children}</div>
    </div>
  );
}

export default function AdminPanel({ pages, setPages, onClose }) {
  const [selected,   setSelected]   = useState(null);
  const [form,       setForm]       = useState({});
  const [confirmDel, setConfirmDel] = useState(null);

  const selectPage = (p) => { setSelected(p.id); setForm({ ...p }); };

  const newPage = () => {
    const np = {
      id:Date.now(), type:"content", title:"New Page",
      text:"Write your story here...", bg:"#e3f2fd", textColor:"#1565c0",
      fontSize:18, titleSize:24, image:"📖",
      reference:{ title:"New Topic", facts:["Add a fact here."], learnMore:"" },
    };
    setPages(prev=>[...prev,np]);
    selectPage(np);
  };

  const savePage = () => {
    setPages(prev=>prev.map(p=>p.id===selected?{...form}:p));
    setSelected(null);
  };

  const deletePage = (id) => {
    setPages(prev=>prev.filter(p=>p.id!==id));
    if (selected===id) setSelected(null);
    setConfirmDel(null);
  };

  const movePage = (id, dir) => {
    setPages(prev=>{
      const arr=[...prev], i=arr.findIndex(p=>p.id===id), j=i+dir;
      if(j<0||j>=arr.length) return arr;
      [arr[i],arr[j]]=[arr[j],arr[i]]; return arr;
    });
  };

  const setRef     = (key,val) => setForm(f=>({...f, reference:{...(f.reference||{}), [key]:val}}));
  const setRefFact = (i,val)   => setForm(f=>{
    const facts=[...(f.reference?.facts||[])]; facts[i]=val;
    return {...f, reference:{...(f.reference||{}), facts}};
  });
  const addFact    = () => setForm(f=>({...f, reference:{...(f.reference||{}), facts:[...(f.reference?.facts||[]),""]}}));
  const removeFact = (i) => setForm(f=>{
    const facts=(f.reference?.facts||[]).filter((_,idx)=>idx!==i);
    return {...f, reference:{...(f.reference||{}), facts}};
  });

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(10,10,30,0.88)",
      zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'Nunito',sans-serif", backdropFilter:"blur(6px)",
      padding:"clamp(8px,2vw,16px)",
    }}>
      <div style={{
        background:"#1e1b4b", borderRadius:24,
        width:"min(940px,100%)", height:"min(650px,95vh)",
        display:"flex", flexDirection:"column",
        boxShadow:"0 20px 60px rgba(0,0,0,0.65)",
        overflow:"hidden", border:"2px solid rgba(167,139,250,0.3)",
      }}>
        {/* header */}
        <div style={{
          background:"linear-gradient(135deg,#7c3aed,#2563eb)",
          padding:"14px 20px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexShrink:0,
        }}>
          <div style={{ color:"#fff", fontWeight:800, fontSize:"clamp(15px,2.5vw,20px)" }}>📚 Book Admin Panel</div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.2)", border:"none", color:"#fff",
            borderRadius:10, padding:"6px 14px", cursor:"pointer", fontWeight:700, fontSize:14,
          }}>✕ Close</button>
        </div>

        <div style={{ display:"flex", flex:1, overflow:"hidden", minHeight:0 }}>
          {/* PAGE LIST */}
          <div style={{
            width:"clamp(160px,22vw,220px)", background:"rgba(255,255,255,0.04)",
            borderRight:"1px solid rgba(255,255,255,0.08)",
            overflowY:"auto", padding:"10px 8px",
            display:"flex", flexDirection:"column", gap:6, flexShrink:0,
          }}>
            <button onClick={newPage} style={{
              background:"linear-gradient(135deg,#10b981,#059669)",
              border:"none", color:"#fff", borderRadius:12,
              padding:"9px 6px", cursor:"pointer", fontWeight:800,
              fontSize:"clamp(11px,1.5vw,13px)", marginBottom:4,
            }}>+ Add New Page</button>

            {pages.map((p,i)=>(
              <div key={p.id} style={{
                background: selected===p.id
                  ? "linear-gradient(135deg,rgba(124,58,237,0.5),rgba(37,99,235,0.5))"
                  : "rgba(255,255,255,0.05)",
                borderRadius:10, padding:"8px 10px", cursor:"pointer",
                border: selected===p.id ? "1px solid rgba(167,139,250,0.6)" : "1px solid transparent",
                transition:"all 0.2s",
              }} onClick={()=>selectPage(p)}>
                <div style={{ color:"#e0e7ff", fontWeight:700, fontSize:"clamp(11px,1.4vw,13px)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {p.image} {p.title?.slice(0,18)}
                </div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11, marginTop:2 }}>
                  Page {i+1} · {p.type}
                </div>
                <div style={{ display:"flex", gap:4, marginTop:6 }}>
                  <button onClick={e=>{e.stopPropagation();movePage(p.id,-1)}} style={btnSm}>↑</button>
                  <button onClick={e=>{e.stopPropagation();movePage(p.id,1)}}  style={btnSm}>↓</button>
                  <button onClick={e=>{e.stopPropagation();setConfirmDel(p.id)}} style={{...btnSm,background:"rgba(239,68,68,0.25)",color:"#fca5a5"}}>🗑</button>
                </div>
              </div>
            ))}
          </div>

          {/* EDIT FORM */}
          <div style={{ flex:1, overflowY:"auto", padding:"18px 20px", minWidth:0 }}>
            {selected && form.id ? (
              <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                <div style={{ color:"#c4b5fd", fontWeight:800, fontSize:"clamp(14px,2vw,17px)" }}>✏️ Editing: {form.title}</div>

                <Row label="Page Type">
                  <select value={form.type||"content"} onChange={e=>setForm(f=>({...f,type:e.target.value}))} style={sel}>
                    <option value="cover">Cover</option>
                    <option value="content">Content</option>
                    <option value="end">End</option>
                  </select>
                </Row>
                <Row label="Title"><input value={form.title||""} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inp}/></Row>
                {(form.type==="cover"||form.type==="end")&&(
                  <Row label="Subtitle"><input value={form.subtitle||""} onChange={e=>setForm(f=>({...f,subtitle:e.target.value}))} style={inp}/></Row>
                )}
                <Row label="Body Text"><textarea value={form.text||""} onChange={e=>setForm(f=>({...f,text:e.target.value}))} style={{...inp,height:80,resize:"vertical"}}/></Row>
                <Row label="Emoji / Icon">
                  <input value={form.image||""} onChange={e=>setForm(f=>({...f,image:e.target.value}))} style={{...inp,width:70}} placeholder="🌟"/>
                </Row>
                <Row label="Accent Emoji">
                  <input value={form.emoji||""} onChange={e=>setForm(f=>({...f,emoji:e.target.value}))} style={{...inp,width:70}} placeholder="✨"/>
                </Row>
                <Row label="Font Size">
                  <input type="range" min={12} max={32} value={form.fontSize||18} onChange={e=>setForm(f=>({...f,fontSize:+e.target.value}))} style={{width:100}}/>
                  <span style={{color:"#a5b4fc",marginLeft:8,fontWeight:700}}>{form.fontSize||18}px</span>
                </Row>
                <Row label="Title Size">
                  <input type="range" min={16} max={48} value={form.titleSize||24} onChange={e=>setForm(f=>({...f,titleSize:+e.target.value}))} style={{width:100}}/>
                  <span style={{color:"#a5b4fc",marginLeft:8,fontWeight:700}}>{form.titleSize||24}px</span>
                </Row>
                <Row label="Background Color">
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {BG_PRESETS.map(c=>(
                      <div key={c} onClick={()=>setForm(f=>({...f,bg:c}))} style={{width:26,height:26,background:c,borderRadius:7,cursor:"pointer",border:form.bg===c?"3px solid #7c3aed":"2px solid rgba(255,255,255,0.2)"}}/>
                    ))}
                    <input type="color" value={form.bg||"#ffffff"} onChange={e=>setForm(f=>({...f,bg:e.target.value}))} style={{width:26,height:26,border:"none",background:"none",cursor:"pointer",padding:0}}/>
                  </div>
                </Row>
                <Row label="Text Color">
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {TEXT_PRESETS.map(c=>(
                      <div key={c} onClick={()=>setForm(f=>({...f,textColor:c}))} style={{width:26,height:26,background:c,borderRadius:7,cursor:"pointer",border:form.textColor===c?"3px solid #7c3aed":"2px solid rgba(255,255,255,0.2)"}}/>
                    ))}
                    <input type="color" value={form.textColor||"#000000"} onChange={e=>setForm(f=>({...f,textColor:e.target.value}))} style={{width:26,height:26,border:"none",background:"none",cursor:"pointer",padding:0}}/>
                  </div>
                </Row>

                {/* reference section */}
                <div style={{ background:"rgba(139,92,246,0.1)", borderRadius:12, padding:14, border:"1px solid rgba(139,92,246,0.25)" }}>
                  <div style={{ color:"#a5b4fc", fontWeight:800, fontSize:13, marginBottom:10 }}>🔍 Reference / Learn Section</div>
                  <div style={{display:"flex",flexDirection:"column",gap:9}}>
                    <Row label="Reference Title"><input value={form.reference?.title||""} onChange={e=>setRef("title",e.target.value)} style={inp}/></Row>
                    <Row label="Learn More URL"><input value={form.reference?.learnMore||""} onChange={e=>setRef("learnMore",e.target.value)} style={inp} placeholder="https://..."/></Row>
                    <div>
                      <label style={{ color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em" }}>Facts</label>
                      <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:6}}>
                        {(form.reference?.facts||[]).map((fact,i)=>(
                          <div key={i} style={{display:"flex",gap:5}}>
                            <input value={fact} onChange={e=>setRefFact(i,e.target.value)} style={{...inp,flex:1}} placeholder={`Fact ${i+1}`}/>
                            <button onClick={()=>removeFact(i)} style={{...btnSm,background:"rgba(239,68,68,0.2)",color:"#fca5a5",padding:"0 9px"}}>✕</button>
                          </div>
                        ))}
                        <button onClick={addFact} style={{ background:"rgba(16,185,129,0.15)", border:"1px dashed rgba(16,185,129,0.4)", color:"#6ee7b7", borderRadius:8, padding:"6px", cursor:"pointer", fontWeight:700, fontSize:12 }}>+ Add Fact</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* preview */}
                <div style={{ marginTop:6 }}>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginBottom:5 }}>Live Preview</div>
                  <div style={{ width:160, height:200, borderRadius:14, overflow:"hidden", boxShadow:"0 8px 24px rgba(0,0,0,0.4)", margin:"0 auto" }}>
                    <BookPage page={form} pageNum={1} total={pages.length} pageW={160} pageH={200}/>
                  </div>
                </div>

                <button onClick={savePage} style={{
                  background:"linear-gradient(135deg,#7c3aed,#2563eb)",
                  border:"none", color:"#fff", borderRadius:12,
                  padding:"12px 0", cursor:"pointer", fontWeight:800, fontSize:15, marginTop:4,
                }}>💾 Save Changes</button>
              </div>
            ) : (
              <div style={{ color:"rgba(255,255,255,0.3)", textAlign:"center", marginTop:60, fontSize:15 }}>
                👈 Select a page to edit, or add a new one
              </div>
            )}
          </div>
        </div>
      </div>

      {/* delete confirm */}
      {confirmDel && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"#1e1b4b",borderRadius:20,padding:"28px 32px",textAlign:"center",border:"1px solid rgba(239,68,68,0.4)",boxShadow:"0 12px 40px rgba(0,0,0,0.5)" }}>
            <div style={{fontSize:38,marginBottom:10}}>🗑️</div>
            <div style={{color:"#fca5a5",fontWeight:800,fontSize:16,marginBottom:6}}>Delete this page?</div>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:13,marginBottom:18}}>This cannot be undone.</div>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <button onClick={()=>deletePage(confirmDel)} style={{background:"#dc2626",border:"none",color:"#fff",borderRadius:10,padding:"8px 20px",cursor:"pointer",fontWeight:700}}>Yes, Delete</button>
              <button onClick={()=>setConfirmDel(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",borderRadius:10,padding:"8px 20px",cursor:"pointer",fontWeight:700}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}