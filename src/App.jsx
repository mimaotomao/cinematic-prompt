import React, { useState, useRef, useEffect, useCallback, createContext } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060606;--s1:#0a0a0a;--s2:#111111;--s3:#181818;--s4:#1f1f1f;
  --bd:#252525;--bdh:#353535;--bd2:#404040;
  --t:#ffffff;--t2:#ffffff;--t3:#aaaaaa;--t4:#666666;
  --acc:#e8780a;--acc2:#ff9f43;--acg:rgba(232,120,10,.15);--acglow:rgba(232,120,10,.4);--acdim:rgba(232,120,10,.08);
  --font:'DM Sans',sans-serif;--mono:'DM Mono',monospace;--disp:'Bebas Neue',sans-serif;--tech:'Space Grotesk',sans-serif;
  --r:8px;--r2:12px;
  --ease-out:cubic-bezier(0.16,1,0.3,1);
  --ease-spring:cubic-bezier(0.34,1.56,0.64,1);
}
html,body{height:100%;background:var(--bg);color:var(--t);font-family:var(--font);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--s1)}::-webkit-scrollbar-thumb{background:var(--bd);border-radius:2px}::-webkit-scrollbar-thumb:hover{background:var(--bdh)}
input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer;width:100%}
input[type=range]::-webkit-slider-track{background:var(--s3);height:3px;border-radius:2px}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;margin-top:-6.5px;box-shadow:0 2px 8px rgba(0,0,0,.4)}
input[type=range]::-webkit-slider-thumb:hover{background:var(--acc)}
textarea{font-family:var(--mono);font-size:13px;line-height:1.7;background:var(--s2);border:1px solid var(--bd);border-radius:var(--r);color:var(--t);padding:14px 16px;resize:vertical;width:100%;outline:none;transition:all .2s;min-height:80px}
textarea:focus{border-color:var(--acc);box-shadow:0 0 0 3px var(--acdim)}
textarea::placeholder{color:var(--t4)}
.shell{min-height:100vh;padding-bottom:100px}
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:56px;border-bottom:1px solid var(--bd);position:sticky;top:0;z-index:100;background:rgba(6,6,6,.95);backdrop-filter:blur(20px);transition:all .3s}
.nav.scrolled{border-bottom-color:var(--s2);background:rgba(6,6,6,.98)}
.logo{font-family:var(--font);font-size:52px;font-weight:800;letter-spacing:0px;color:var(--t);line-height:1.1;white-space:nowrap}
.logo span{color:var(--acc);font-weight:300;font-size:44px}
.ntabs{display:flex;gap:4px;position:absolute;left:50%;transform:translateX(-50%)}
.nt{font-size:12px;font-weight:600;letter-spacing:1px;padding:7px 18px;border-radius:var(--r);border:none;background:transparent;color:var(--t);cursor:pointer;transition:all .2s var(--ease-out)}
.nt:hover{color:var(--t);background:var(--s2)}
.nt.on{background:var(--acc);color:#000;font-weight:700;box-shadow:0 4px 20px var(--acglow)}
.page{max-width:1200px;margin:0 auto;padding:40px 24px 120px}
.ph{text-align:center;margin-bottom:44px;position:relative}
.ph::before{content:'';position:absolute;top:-20px;left:50%;transform:translateX(-50%);width:60px;height:3px;background:var(--acc);border-radius:2px;opacity:.6}
.pt{font-family:var(--disp);font-size:42px;letter-spacing:5px;margin-bottom:10px;line-height:1.1}
.pt b{color:var(--acc)}
.ps{font-size:14px;color:var(--t);font-weight:400;line-height:1.6;max-width:600px;margin:0 auto}
.pc{margin-top:12px;font-size:13px;font-weight:600;color:var(--t);display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;background:var(--s2);border:1px solid var(--bd);transition:all .3s}
.pc.full{color:var(--acc);border-color:var(--acc);background:var(--acdim)}
.sec{margin-bottom:36px}
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--bd)}
.st{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--t)}
.sb{font-size:10px;font-weight:700;letter-spacing:2px;padding:4px 10px;border-radius:4px;background:var(--acc);color:#000;text-transform:uppercase}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
@media(max-width:900px){.grid3{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.grid3{grid-template-columns:1fr}}
.ac{display:flex;align-items:center;border-radius:var(--r);border:1px solid var(--bd);background:var(--s1);cursor:pointer;transition:all .15s;position:relative;user-select:none;overflow:hidden;min-height:44px}
.ac:hover{border-color:var(--bdh);background:var(--s2)}
.ac.sel{border-color:var(--acc);background:linear-gradient(135deg,var(--s2) 0%,var(--acdim) 100%);box-shadow:0 0 20px var(--acdim)}
.ac.dim{opacity:.15;pointer-events:none}
.abar{width:3px;min-height:44px;flex-shrink:0;background:transparent;transition:background .2s}
.ac.sel .abar{background:var(--acc)}
.an{font-size:12px;font-weight:400;padding:10px 14px;line-height:1.4;color:var(--t);flex:1}
.ac.sel .an{color:var(--t);font-weight:600}
.anum{position:absolute;top:6px;right:6px;width:20px;height:20px;border-radius:50%;background:var(--acc);color:#000;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;font-family:var(--mono)}
.rowpills{display:flex;flex-wrap:wrap;gap:8px}
.pill{font-size:12px;font-weight:500;padding:8px 16px;border-radius:var(--r);border:1px solid var(--bd);background:var(--s1);color:var(--t);cursor:pointer;transition:all .15s;user-select:none;line-height:1}
.pill:hover{border-color:var(--bdh);background:var(--s2)}
.pill.sel{border-color:var(--acc);background:var(--acg);color:var(--acc);font-weight:600}
.lens-row{display:flex;flex-wrap:wrap;gap:8px}
.lc{display:flex;align-items:baseline;gap:8px;padding:10px 20px;border-radius:30px;border:1px solid var(--bd);background:var(--s1);cursor:pointer;transition:all .15s;user-select:none}
.lc:hover{border-color:var(--bdh);background:var(--s2)}
.lc.sel{border-color:var(--acc);background:var(--acg)}
.lmm{font-family:var(--disp);font-size:18px;letter-spacing:1px;color:var(--t)}
.lc.sel .lmm{color:var(--acc)}
.llb{font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:1px}
.pbox{background:var(--s1);border:1px solid var(--bd);border-radius:var(--r2);padding:20px 22px;font-size:12px;line-height:1.9;color:var(--t);font-family:var(--mono);min-height:120px;white-space:pre-wrap;word-break:break-word;transition:all .2s;user-select:text;cursor:text}
.pbox.live{border-color:var(--bd2);color:var(--t);background:var(--s2)}
.pbox-empty{color:var(--t4);font-style:italic;font-size:13px;font-family:var(--font)}
.bbar{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(to top,var(--bg) 0%,rgba(6,6,6,.95) 100%);border-top:1px solid var(--bd);padding:14px 28px;display:flex;align-items:center;justify-content:center;gap:12px;backdrop-filter:blur(20px);z-index:90}
.pbar{display:flex;align-items:center;gap:10px;margin-top:14px;flex-wrap:wrap}
.btn{font-size:12px;font-weight:600;letter-spacing:1.5px;padding:11px 24px;border-radius:var(--r);border:1px solid var(--bd);background:var(--s2);color:var(--t);cursor:pointer;transition:all .15s;user-select:none;text-transform:uppercase}
.btn:hover{border-color:var(--bdh);color:var(--t);background:var(--s3)}
.btn:active{transform:translateY(0)}
.btn.pri{background:var(--acc);border-color:var(--acc);color:#000;box-shadow:0 0 30px var(--acglow)}
.btn.pri:hover{background:var(--acc2);box-shadow:0 0 40px var(--acglow)}
.btn:disabled{opacity:.3;pointer-events:none}
.toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--acc);color:#000;font-size:11px;font-weight:800;letter-spacing:3px;padding:10px 24px;border-radius:6px;z-index:200;pointer-events:none;animation:ft 2.5s forwards;text-transform:uppercase}
@keyframes ft{0%{opacity:0;transform:translateX(-50%) translateY(20px) scale(.9)}15%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}85%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-10px)}}
.divider{border:none;border-top:1px solid var(--bd);margin:32px 0}
.scene-field{background:var(--s2);border:1px solid var(--bd);border-radius:var(--r2);padding:22px 24px;margin-bottom:28px;transition:all .2s}
.scene-field:focus-within{border-color:var(--bd2)}
.scene-hint{font-size:11px;color:var(--t);margin-top:10px;line-height:1.6}
.ctrl3d{background:var(--s1);border:1px solid var(--bd);border-radius:var(--r2);overflow:hidden}
.ctrl3d-body{display:grid;grid-template-columns:1fr 320px}
@media(max-width:900px){.ctrl3d-body{grid-template-columns:1fr}}
.ctrl3d-canvas-wrap{position:relative;height:320px;min-height:320px;max-height:320px;background:#040404;cursor:grab;overflow:hidden}
.ctrl3d-canvas-wrap:active{cursor:grabbing}
.ctrl3d-drag-hint{position:absolute;top:14px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--t4);pointer-events:none;white-space:nowrap;background:rgba(0,0,0,.6);padding:6px 14px;border-radius:20px;border:1px solid var(--bd)}
.ctrl3d-panel{padding:22px 24px;border-left:1px solid var(--bd);display:flex;flex-direction:column;gap:20px;background:var(--s1)}
@media(max-width:900px){.ctrl3d-panel{border-left:none;border-top:1px solid var(--bd)}}
.sliders{display:flex;flex-direction:column;gap:16px}
.slider-row{display:flex;flex-direction:column;gap:8px}
.slider-hdr{display:flex;justify-content:space-between;align-items:center}
.slider-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--t)}
.slider-val{font-family:var(--mono);font-size:13px;color:var(--acc);font-weight:600;min-width:50px;text-align:right}
.presets{display:flex;flex-direction:column;gap:8px}
.preset-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--t)}
.preset-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.preset-btn{font-size:11px;font-weight:600;padding:7px 0;border-radius:6px;border:1px solid var(--bd);background:var(--s2);color:var(--t);cursor:pointer;transition:all .15s;text-align:center;text-transform:uppercase;letter-spacing:.5px}
.preset-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acdim)}
.angle-desc{font-size:11px;color:var(--t);line-height:1.6;padding:14px 16px;background:var(--s2);border-radius:8px;border:1px solid var(--bd);font-family:var(--font)}
.av-sec{background:var(--s1);border:1px solid var(--bd);border-radius:var(--r2);padding:22px 24px;margin-bottom:14px;transition:all .2s}
.av-sec:hover{border-color:var(--bdh)}
.tab-strip{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px}
.tab-p{font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:7px 16px;border-radius:30px;border:1px solid var(--bd);background:transparent;color:var(--t);cursor:pointer;transition:all .15s;position:relative}
.tab-p:hover{color:var(--t);border-color:var(--bdh);background:var(--s2)}
.tab-p.on{background:var(--acc);border-color:var(--acc);color:#000}
.tab-dot{position:absolute;top:-2px;right:-2px;width:8px;height:8px;border-radius:50%;background:var(--acc);border:2px solid var(--s1)}
.optbtns{display:flex;gap:8px;flex-wrap:wrap}
.ob{font-size:12px;font-weight:500;padding:9px 18px;border-radius:var(--r);border:1px solid var(--bd);background:var(--s2);color:var(--t);cursor:pointer;transition:all .15s;position:relative;overflow:hidden}
.ob:hover{border-color:var(--bdh);color:var(--t);background:var(--s3)}
.ob.sel{border-color:var(--acc);background:var(--acg);color:var(--acc);font-weight:600}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;background:var(--s1);border:1px solid var(--bd);border-radius:var(--r2);margin-bottom:14px;cursor:pointer;transition:all .2s}
.toggle-row:hover{border-color:var(--bdh);background:var(--s2)}
.toggle-knob{width:44px;height:24px;border-radius:12px;position:relative;transition:all .2s;flex-shrink:0}
.toggle-dot{position:absolute;top:4px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.quick-actions{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap}
.quick-btn{font-size:11px;padding:8px 16px;border-radius:20px;border:1px solid var(--bd);background:var(--s1);color:var(--t);cursor:pointer;transition:all .15s}
.quick-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acdim)}
.quick-btn.active{border-color:var(--acc);background:var(--acc);color:#000}
.batch-size{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:16px 20px;background:var(--s1);border-radius:var(--r);border:1px solid var(--bd)}
.batch-label{font-size:12px;font-weight:600;color:var(--t)}
.batch-options{display:flex;gap:6px}
.batch-opt{width:32px;height:32px;border-radius:50%;border:1px solid var(--bd);background:var(--s2);color:var(--t);font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center}
.batch-opt:hover{border-color:var(--bdh);color:var(--t)}
.batch-opt.sel{border-color:var(--acc);background:var(--acc);color:#000}
.history-panel{position:fixed;right:24px;top:80px;width:280px;background:var(--s1);border:1px solid var(--bd);border-radius:var(--r2);padding:20px;z-index:50;max-height:calc(100vh - 120px);overflow-y:auto;transform:translateX(320px);transition:transform .3s var(--ease-out);box-shadow:0 10px 40px rgba(0,0,0,.4)}
.history-panel.open{transform:translateX(0)}
.history-title{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
.history-item{padding:12px;border-radius:6px;background:var(--s2);border:1px solid var(--bd);margin-bottom:8px;cursor:pointer;transition:all .15s;font-size:11px;color:var(--t);line-height:1.4;max-height:80px;overflow:hidden;position:relative}
.history-item:hover{border-color:var(--acc);background:var(--acdim)}
.history-item::after{content:'';position:absolute;bottom:0;left:0;right:0;height:20px;background:linear-gradient(transparent,var(--s2))}
.history-time{font-size:10px;color:var(--t4);margin-bottom:4px;font-family:var(--mono)}
.floating-btn{position:fixed;right:24px;bottom:100px;width:48px;height:48px;border-radius:50%;background:var(--s1);border:1px solid var(--bd);color:var(--t);cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;z-index:80;font-size:11px;font-weight:700;letter-spacing:1px}
.floating-btn:hover{background:var(--acc);border-color:var(--acc);color:#000}
.floating-btn.active{background:var(--acc);color:#000;border-color:var(--acc)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);z-index:300;display:flex;align-items:center;justify-content:center;padding:24px}
.modal{background:var(--s1);border:1px solid var(--bd);border-radius:16px;padding:36px 32px;max-width:400px;width:100%;display:flex;flex-direction:column;gap:20px;box-shadow:0 24px 80px rgba(0,0,0,.6)}
.modal-title{font-family:var(--disp);font-size:28px;letter-spacing:4px;text-align:center}
.modal-title b{color:var(--acc)}
.modal-sub{font-size:13px;color:var(--t3);text-align:center;line-height:1.6}
.gbtn{display:flex;align-items:center;justify-content:center;gap:12px;padding:13px 20px;border-radius:var(--r);border:1px solid var(--bd);background:#fff;color:#222;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;width:100%}
.gbtn:hover{box-shadow:0 4px 20px rgba(255,255,255,.15);transform:translateY(-1px)}
.modal-divider{display:flex;align-items:center;gap:12px;color:var(--t4);font-size:11px;font-weight:600;letter-spacing:2px}
.modal-divider::before,.modal-divider::after{content:'';flex:1;height:1px;background:var(--bd)}
.modal-skip{font-size:12px;color:var(--t4);text-align:center;cursor:pointer;padding:4px;transition:color .2s}
.modal-skip:hover{color:var(--t)}
.user-chip{display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:20px;background:var(--s2);border:1px solid var(--bd);font-size:11px;color:var(--t);cursor:pointer;transition:all .2s}
.user-chip:hover{border-color:var(--bdh);color:var(--t)}
.user-chip img{width:20px;height:20px;border-radius:50%}
.genwith{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:24px;padding-top:20px;border-top:1px solid var(--bdh)}
.genwith-label{font-size:14px;font-weight:800;letter-spacing:1.5px;color:var(--t);text-transform:uppercase;white-space:nowrap}
.genwith-note{font-size:12px;color:var(--t);margin-left:4px;font-weight:500}
.genwith-btn{display:flex;align-items:center;gap:7px;padding:10px 20px;border-radius:var(--r);border:1px solid var(--bd);background:var(--s2);color:var(--t);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;text-decoration:none;white-space:nowrap}
.genwith-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acdim);transform:translateY(-1px)}
`;

// ─── GOOGLE AUTH ──────────────────────────────────────────────────────────────
const CLIENT_ID="730553596086-s59f1v381pocjk3gr992m8u18s3724k2.apps.googleusercontent.com";
const AUTH_KEY="pmstudio_user";

function useGoogleAuth(){
  const[user,setUser]=useState(()=>{
    try{const s=localStorage.getItem(AUTH_KEY);return s?JSON.parse(s):null;}catch{return null;}
  });
  const[ready,setReady]=useState(false);

  const saveUser=(u)=>{setUser(u);try{if(u)localStorage.setItem(AUTH_KEY,JSON.stringify(u));else localStorage.removeItem(AUTH_KEY);}catch{}};

  useEffect(()=>{
    const script=document.createElement("script");
    script.src="https://accounts.google.com/gsi/client";
    script.async=true;
    script.defer=true;
    script.onload=()=>{
      window.google.accounts.id.initialize({
        client_id:CLIENT_ID,
        callback:(resp)=>{
          const payload=JSON.parse(atob(resp.credential.split(".")[1]));
          saveUser({name:payload.name,email:payload.email,picture:payload.picture,idToken:resp.credential,exp:payload.exp});
        },
        auto_select:false,
        context:"signin",
      });
      setReady(true);
    };
    document.head.appendChild(script);
    return()=>{try{document.head.removeChild(script);}catch{}}
  },[]);

  // check token expiry on mount
  useEffect(()=>{
    if(user&&user.exp&&user.exp<Date.now()/1000){saveUser(null);}
  },[]);

  const signOut=()=>{if(window.google)window.google.accounts.id.disableAutoSelect();saveUser(null);};
  return{user,ready,signOut};
}

// ─── GOOGLE SIGN-IN BUTTON ─────────────────────────────────────────────────────
function GoogleSignInBtn({compact}){
  const divRef=useRef(null);
  const{ready,user}=React.useContext(AuthCtx);
  useEffect(()=>{
    if(ready&&!user&&divRef.current&&window.google){
      divRef.current.innerHTML="";
      window.google.accounts.id.renderButton(divRef.current,{
        type:"standard",
        theme:"filled_black",
        size:compact?"small":"medium",
        text:"signin_with",
        shape:"pill",
        logo_alignment:"left",
      });
    }
  },[ready,user]);
  if(user)return null;
  return <div ref={divRef} style={{display:"flex",alignItems:"center"}}/>;
}

// ─── ENHANCE API CALL ─────────────────────────────────────────────────────────
async function callEnhance(prompt, instructions, idToken){
  const resp=await fetch("/api/enhance",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt,instructions,idToken})
  });
  const data=await resp.json();
  if(resp.status===401){const e=new Error(data.error||"Unauthorized");e.status=401;throw e;}
  if(!resp.ok)throw new Error(data.error||"API error");
  return data.result||"";
}

const AuthCtx=React.createContext({user:null,ready:false,signOut:()=>{}});

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({onClose}){
  return(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-title">✦ <b>Enhance</b></div>
        <div className="modal-sub">Sign in with Google to use AI-powered prompt enhancement — free, no credit card required.</div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <GoogleSignInBtn/>
        </div>
        <div className="modal-skip" onClick={onClose}>✕ Cancel</div>
      </div>
    </div>
  );
}

// ─── GENERATE WITH LINKS ─────────────────────────────────────────────────────
const GEN_TARGETS=[
  {label:"Grok Imagine",url:"https://grok.com/imagine",icon:"✦"},
  {label:"Gemini",url:"https://gemini.google.com",icon:"◈"},
  {label:"Arena.ai",url:"https://arena.ai/?mode=direct&chat-modality=image",icon:"⊕"},
];
function GenWithLinks({getPrompt,onCopy,targets}){
  const list=targets||GEN_TARGETS;
  const handle=async(url)=>{
    await copyText(getPrompt());
    onCopy&&onCopy();
    window.open(url,"_blank","noopener,noreferrer");
  };
  return(
    <div className="genwith">
      <span className="genwith-label">Generate with</span>
      {list.map(t=>(
        <button key={t.label} className="genwith-btn" onClick={()=>handle(t.url)}>
          <span>{t.icon}</span>{t.label} ↗
        </button>
      ))}
      <span className="genwith-note">— clicking copies prompt to clipboard</span>
    </div>
  );
}

const ANGLES = [
  {name:"Wide establishing shot",
   desc:"ultra-wide frame, subjects occupy no more than 1/5 of frame height, environment fills remaining space. Place horizon line on upper third. Subjects centered or slightly off-axis. Full location readable in single frame. No cropping of environment edges."},
  {name:"Medium eye-level shot",
   desc:"camera at subject's eye height, frame subjects from waist up. 1–2 subjects fill center two-thirds of frame. Natural head-room above, equal side margins. Neutral conversational distance, no lens distortion."},
  {name:"Low-angle hero shot",
   desc:"camera at knee height or below, tilted upward. Subject's feet near bottom frame edge, head near top third. Sky or ceiling dominates upper half. Foreshortened legs, subject appears taller and more powerful. No ground visible below feet."},
  {name:"Over-the-shoulder shot",
   desc:"foreground character's shoulder and back-of-head occupy left or right third of frame, out of focus. Subject facing them fills opposite two-thirds, eyes on upper third line. Foreground shoulder anchors composition. Clear eyeline between characters."},
  {name:"Close-up",
   desc:"frame tightly on face: top of head just above frame, chin near bottom third. Eyes sit exactly on upper third line. Background fully blurred. No shoulders or neck below lower third. Subject fills frame edge to edge horizontally."},
  {name:"High-angle shot",
   desc:"camera elevated 45–60 degrees above scene looking down. Subjects appear smaller, ground plane visible around them. Horizon line pushed to upper quarter or off-frame entirely. Strong overhead perspective, subjects diminished within environment."},
  {name:"Profile side shot",
   desc:"camera 90 degrees to subject's side, subject facing frame edge not camera. Full silhouette visible, no facial features readable. Subject positioned on center vertical axis. Equal negative space in front of and behind subject. Clean background separation."},
  {name:"Dutch tilt shot",
   desc:"camera rotated 15–30 degrees on lens axis, horizon diagonal across frame. Vertical elements — walls, doors, figures — lean at angle. Subject placed on tilted rule-of-thirds intersection. Disorienting psychological unease. No horizon line is horizontal."},
  {name:"Extreme wide master shot",
   desc:"maximum field of view, subjects no larger than 1/8 of frame height. Full geography of location visible: foreground, midground, background all readable. Subjects integrated naturally into environment. Cinematic scale and proportion throughout."},
  {name:"Bird's-eye vertical shot",
   desc:"camera directly overhead, lens axis perpendicular to ground. Subjects seen as flat shapes from above. No vertical elements visible. Ground plane fills entire frame. Subjects centered or placed on grid intersection. Abstract overhead geometry."},
  {name:"Ground-level worm's-eye shot",
   desc:"camera at ground level, lens tilted sharply upward 60–80 degrees. Ground visible in bottom sliver only. Subjects' feet near bottom edge, heads near frame center. Sky or ceiling fills upper half. Extreme upward perspective, subjects tower over viewer."},
  {name:"Three-quarter front angle",
   desc:"camera 45 degrees off subject's front axis. Subject's nearer shoulder closer to camera, face at three-quarter turn. Depth visible between near and far shoulder. Subject placed on rule-of-thirds vertical line, looking toward frame center."},
  {name:"Three-quarter rear angle",
   desc:"camera 45 degrees off subject's rear axis, slightly behind and to one side. Back of head and near shoulder prominent. Destination or scene ahead of subject visible in front two-thirds of frame. Subject placed on rear third, scene opens ahead of them."},
  {name:"Locked-off static frame",
   desc:"completely static composition, no camera movement implied. Subjects move freely within fixed frame. Theatrical staging: full bodies visible, generous headroom. Frame holds before and after subjects enter or exit. Deliberate stillness, everything composed for the static hold."},
  {name:"Long-lens compression shot",
   desc:"200–400mm equivalent lens. Camera placed far from subject, background appears compressed and close. Depth of field razor-thin, background layers merge. Subject isolated against compressed background. Minimal perspective distortion, flattest possible spatial rendering."},
  {name:"Foreground-obstructed shot",
   desc:"partially obscuring foreground element — foliage, column, glass — occupies 20–30% of frame. Subject visible in gap or beyond obstruction. Foreground element out of focus, subject sharp. Layered depth: foreground blur, midground subject, background context."},
  {name:"Reflected perspective shot",
   desc:"subjects visible only via mirror, wet surface, window, or reflective object. Reflection fills most of frame. Actual subjects may or may not be partially visible at frame edge. Lighting in reflection matches scene logic. Optical realism maintained throughout."},
  {name:"Silhouette backlit shot",
   desc:"strong backlight source — sun, window, lamp — directly behind subjects. Subjects rendered as dark silhouettes with zero facial or costume detail visible. Background 2–3 stops brighter than subjects. Clean rim of light around silhouette edge. Pure form and contour composition."},
  {name:"Center-punched symmetrical shot",
   desc:"strict bilateral symmetry on vertical center axis. Single subject centered exactly or two subjects equidistant from center. Architecture or environment mirrors left-right. Horizon line precisely horizontal on center or lower third. Formal, graphic, static composition."},
  {name:"Asymmetrical rule-of-thirds shot",
   desc:"subject placed precisely on left or right vertical third line. Eyes or focal point on horizontal third intersection. Opposite two-thirds is negative space — sky, wall, environment. No centering of subject. Dynamic tension between subject and empty space."},
  {name:"Hand-level perspective shot",
   desc:"camera at 70–90cm from ground, approximately hand or table height. Low enough to see under furniture or see ground plane at angle. Objects at ground level prominent in foreground. Subjects' lower bodies visible, faces in upper portion of frame. Unusual grounded intimacy."},
  {name:"Chest-height tracking angle",
   desc:"camera at 120–140cm height, roughly chest level. Slightly below eye level, slight upward tilt. Natural following perspective for a walking observer. Subject fills center of frame. Intimate proximity, movement feels present and physical."},
  {name:"Environmental frame-within-frame shot",
   desc:"architectural element — doorway, arch, window, tunnel — forms visible inner frame within the camera frame. Subject positioned within this inner frame, surrounded by framing element. Two clear layers: outer frame edge and inner architectural frame. Subject never touches inner frame edges."},
  {name:"Extreme close environment shot",
   desc:"environmental texture or detail fills extreme foreground: bark, stone, water, grass — in sharp or soft focus. Subject visible in midground or background, contextualized but not dominant. Strong depth separation between foreground detail and background subject."},
  {name:"Rear profile silhouette shot",
   desc:"camera positioned at subject's rear quarter — 135 degrees behind, slightly to one side. Back of head and one shoulder prominent, face not visible. Subject's destination or scene ahead occupies front two-thirds of frame. Clean contour lighting separates subject from background."},
  {name:"Shallow-focus foreground lead shot",
   desc:"foreground element — hand, object, surface — in sharp focus occupies lower or side portion of frame. Subject visible beyond, slightly soft or equally sharp. Eye travels from foreground element toward subject. Controlled focus gradient guides visual path through frame."},
  {name:"Deep-focus wide shot",
   desc:"maximum depth of field, everything sharp from foreground to background. At least three distinct depth planes all in focus. Wide or standard lens. Subject in midground, foreground and background equally readable. No bokeh. Clinical spatial clarity throughout."},
  {name:"Oblique corner angle shot",
   desc:"camera placed at corner of room or space, looking diagonally across the scene. Two walls or two environmental planes visible in frame. Full diagonal of space readable from corner to far corner. Subjects integrated into diagonal geometry. No frontal or profile view."},
  {name:"Eye-line match perspective shot",
   desc:"camera placed at exact height and position of character's eyes, looking in the direction of their gaze. Viewer sees precisely what character sees. Subject's POV horizon matches their standing eye level. No tilt, no angle deviation from their actual sightline. Pure optical alignment."},
  {name:"Environmental negative-space shot",
   desc:"subjects occupy bottom quarter or single corner of frame. Sky, wall, or empty space fills remaining 60–75% of frame. Subjects appear isolated, small, overwhelmed by environment. No centering. Horizon placed high or low depending on emotional intent."},
];
const LIGHTING = [
  {id:"golden",name:"Golden Hour",p:"golden hour lighting, warm raking side light, long soft shadows, rich amber and copper tones, magical atmospheric quality"},
  {id:"midday",name:"Midday Sun",p:"harsh midday sun, strong overhead light, sharp hard shadows, high contrast, bleached highlights"},
  {id:"bluehour",name:"Blue Hour",p:"blue hour twilight, cool indigo ambient light, balanced exposure, melancholic cinematic atmosphere"},
  {id:"night",name:"Night",p:"nighttime scene, deep shadow, minimal ambient light, high-contrast pools of artificial light, dramatic chiaroscuro"},
  {id:"overcast",name:"Overcast",p:"overcast flat lighting, soft diffused shadowless illumination, even exposure, naturalistic mood"},
  {id:"sunrise",name:"Sunrise",p:"sunrise light, hazy pink and peach horizon glow, long warm diagonal shadows, morning mist"},
  {id:"interior",name:"Interior Light",p:"interior practical lighting, tungsten warmth, motivated light spill from windows and practical lamps"},
  {id:"storm",name:"Storm Light",p:"storm light, dark ominous sky, dramatic underlighting, greenish pre-storm cast, electric tension"},
  {id:"fog",name:"Fog / Mist",p:"heavy atmospheric fog, diffused volumetric light, low visibility, soft ethereal depth haze"},
  {id:"neon",name:"Neon Night",p:"neon-lit night scene, vibrant colored light spill, deep blacks, high-contrast cyberpunk illumination"},
  {id:"fire",name:"Firelight",p:"warm firelight, flickering orange-amber glow, strong directional heat-source lighting, dancing shadows"},
  {id:"moonlit",name:"Moonlit",p:"moonlit scene, cool silver-blue ambient light, long faint shadows, serene nocturnal atmosphere"},
  {id:"studiokey",name:"Studio Key",p:"professional studio key lighting, softbox main with fill and rim, controlled three-point setup, polished commercial look"},
  {id:"magic",name:"Magic Hour",p:"magic hour with lens flare, anamorphic light streaks, dreamlike halation, cinematic perfection"},
];

const BACKGROUNDS = [
  {id:"scifi",name:"Sci-Fi Megacity",p:"futuristic sci-fi megacity, towering skyscrapers, neon signs, flying vehicles, advanced urban infrastructure"},
  {id:"ancient",name:"Ancient Ruins",p:"ancient ruins, crumbling stone columns, overgrown with vines and moss, lost civilization architecture"},
  {id:"retrofuture",name:"Retrofuturistic",p:"retrofuturistic environment, 1950s atomic-age aesthetics meets space-age technology, chrome and pastel surfaces"},
  {id:"forest",name:"Dark Forest",p:"dense dark forest, twisted ancient trees, dappled light through canopy, mysterious primordial atmosphere"},
  {id:"desert",name:"Desert Wasteland",p:"vast desert wasteland, endless dunes, bleached sky, heat haze distortion, desolate beauty"},
  {id:"underwater",name:"Underwater Deep",p:"deep underwater environment, bioluminescent coral, shafts of filtered sunlight, ocean abyss"},
  {id:"space",name:"Outer Space",p:"outer space background, distant nebulae, star fields, orbital space station or planetary surface"},
  {id:"cyberpunk",name:"Cyberpunk Alley",p:"cyberpunk alley, rain-slicked streets reflecting neon, holographic advertisements, dense urban visual noise"},
  {id:"medieval",name:"Medieval Castle",p:"medieval castle, stone fortress walls, torchlit corridors, feudal landscape at dusk"},
  {id:"industrial",name:"Industrial Zone",p:"brutalist industrial environment, raw concrete and rusted metal, massive machinery, utilitarian architecture"},
  {id:"arctic",name:"Arctic Tundra",p:"arctic tundra, frozen barren landscape, blizzard, glacial ice formations, desolate"},
  {id:"jungle",name:"Jungle Temple",p:"jungle temple ruins, dense tropical foliage, ancient mossy stone, humid mist"},
  {id:"studio",name:"White Studio",p:"plain neutral white studio background, professional photography environment, infinite white"},
  {id:"tokyo",name:"Tokyo Streets",p:"dense Tokyo streets at night, neon signage, crowds, layered urban complexity, wet pavement reflections"},
  {id:"cave",name:"Crystal Cave",p:"crystal cave, glowing bioluminescent crystal formations, underground otherworldly light, stalactites"},
  {id:"western",name:"Wild West",p:"Wild West frontier town, dusty main street, wooden storefronts, arid canyon, golden dust in air"},
  {id:"abstract",name:"Abstract Void",p:"abstract void space, floating geometric shapes, gradient backgrounds, surreal minimalist environment"},
];

const LENSES = [
  {mm:"8mm",name:"8mm",p:"8mm fisheye lens, extreme spherical barrel distortion, hemispherical 180-degree field of view"},
  {mm:"12mm",name:"12mm",p:"12mm ultra-wide lens, extreme wide field of view, strong perspective distortion"},
  {mm:"16mm",name:"16mm",p:"16mm wide-angle lens, very wide field of view, expanded environmental context"},
  {mm:"20mm",name:"20mm",p:"20mm wide lens, expansive framing, strong spatial depth"},
  {mm:"24mm",name:"24mm",p:"24mm wide-angle lens, cinematic wide framing, natural perspective, strong sense of space"},
  {mm:"28mm",name:"28mm",p:"28mm lens, slightly wide, versatile documentary feel"},
  {mm:"35mm",name:"35mm",p:"35mm lens, classic cinematic perspective, balanced natural framing"},
  {mm:"50mm",name:"50mm",p:"50mm standard lens, perspective closest to human vision, neutral optical character"},
  {mm:"70mm",name:"70mm",p:"70mm short telephoto, slightly compressed perspective, versatile portrait lens"},
  {mm:"85mm",name:"85mm",p:"85mm portrait lens, slight subject compression, flattering rendering, shallow depth of field"},
  {mm:"100mm",name:"100mm",p:"100mm macro telephoto, close-up capability, smooth background separation"},
  {mm:"135mm",name:"135mm",p:"135mm telephoto lens, noticeable background compression, strong subject isolation, smooth bokeh"},
  {mm:"200mm",name:"200mm",p:"200mm telephoto lens, heavy background compression, extreme subject separation"},
  {mm:"300mm",name:"300mm",p:"300mm telephoto lens, significant compression, sports and wildlife framing"},
  {mm:"400mm",name:"400mm",p:"400mm super-telephoto lens, maximum compression, razor-thin focal plane"},
  {mm:"600mm",name:"600mm",p:"600mm extreme telephoto, ultra-compressed perspective, subject extracted from background"},
];

const FILM_STOCKS = [
  {id:"kodak",name:"Kodak Vision3",p:"shot on Kodak Vision3 500T film, rich color saturation, fine grain structure, cinematic film emulsion"},
  {id:"fuji",name:"Fuji Eterna",p:"Fuji Eterna 500T film stock, distinctive green shadow cast, creamy highlights, vintage Fuji look"},
  {id:"ilford",name:"Ilford B&W",p:"Ilford HP5 Plus black and white film, high contrast monochrome, rich tonal range, documentary aesthetic"},
  {id:"cinestill",name:"Cinestill 800T",p:"Cinestill 800T tungsten balanced film, halation highlights, red light sensitivity, night photography specialist"},
  {id:"polaroid",name:"Polaroid",p:"Polaroid instant film aesthetic, soft focus, color drift, white frame border, nostalgic imperfection"},
  {id:"digital",name:"Digital Clean",p:"high-end digital cinema camera, clean noise-free image, sharp detail, modern clinical precision"},
  {id:"vintage",name:"Vintage 16mm",p:"16mm film grain, heavy organic texture, gate weave, light leaks, vintage documentary feel"},
  {id:"anamorphic",name:"Anamorphic",p:"anamorphic lens characteristics, horizontal lens flares, oval bokeh, 2.39:1 widescreen aspect ratio"},
];

const COLOR_GRADES = [
  {id:"teal",name:"Teal & Orange",p:"teal and orange color grading, complementary color scheme, cinematic blockbuster look, warm skin tones against cool shadows"},
  {id:"matrix",name:"Matrix Green",p:"tinted green color grade, digital matrix aesthetic, sickly green shadows, cyberpunk computer world"},
  {id:"noir",name:"Film Noir",p:"high contrast black and white, crushed blacks, blown highlights, dramatic noir lighting, classic Hollywood"},
  {id:"sepia",name:"Sepia",p:"warm sepia tone grade, nostalgic antique look, brownish monochrome, historical photograph"},
  {id:"cyber",name:"Cyberpunk Neon",p:"neon color grading, magenta and cyan split, saturated highlights, deep purple shadows"},
  {id:"natural",name:"Naturalistic",p:"natural color science, accurate skin tones, subtle contrast, documentary realism"},
  {id:"bleach",name:"Bleach Bypass",p:"bleach bypass film process, high contrast, desaturated colors, silver retention, gritty metallic look"},
  {id:"warm",name:"Warm Vintage",p:"warm vintage color grade, lifted blacks, soft contrast, orange shadows, nostalgic film emulation"},
];

const ASPECT_RATIOS = [
  {id:"16:9",name:"16:9 HD"},
  {id:"2.39:1",name:"2.39:1 Cinemascope"},
  {id:"4:3",name:"4:3 Academy"},
  {id:"1:1",name:"1:1 Square"},
  {id:"9:16",name:"9:16 Vertical"},
];

// ─── 3D MATH — rotating cube, fixed camera ─────────────────────────────────
// Camera is fixed at [0,0,dist]. The CUBE rotates via azimuth (Y) + elevation (X).
// FRONT face always "owns" the reference image.

const VERTS=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
const EDGES=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
// Front verts 4,5,6,7 — in order: BL,BR,TR,TL (counter-clockwise from outside)
const FACES=[
  {name:"Front", fi:0, normal:[0,0,1],  verts:[4,5,6,7]},
  {name:"Back",  fi:1, normal:[0,0,-1], verts:[1,0,3,2]},
  {name:"Right", fi:2, normal:[1,0,0],  verts:[5,1,2,6]},
  {name:"Left",  fi:3, normal:[-1,0,0], verts:[0,4,7,3]},
  {name:"Top",   fi:4, normal:[0,1,0],  verts:[3,7,6,2]},
  {name:"Bottom",fi:5, normal:[0,-1,0], verts:[4,0,1,5]},
];

// Rotation helpers
const ry3=(v,a)=>{const[x,y,z]=v,c=Math.cos(a),s=Math.sin(a);return[x*c+z*s,y,-x*s+z*c]};
const rx3=(v,a)=>{const[x,y,z]=v,c=Math.cos(a),s=Math.sin(a);return[x,y*c-z*s,y*s+z*c]};

// Simple perspective projection — camera at [0,0,D] looking toward -Z
function proj(v,cx,cy,fl,scale){
  const[x,y,z]=v;
  const dz=fl/(fl-z);  // z is negative in front of camera after rotation
  return[cx+x*dz*scale, cy-y*dz*scale];
}

// Rotate cube vertex by azimuth (Y) then elevation (X)
function rotVert(v,azDeg,elDeg){
  const az=azDeg*Math.PI/180, el=elDeg*Math.PI/180;
  return rx3(ry3(v,az),el);
}

// Face color palette
const FACE_COLORS=[
  {fill:"rgba(232,120,10,0.22)", edge:"rgba(232,120,10,0.7)", label:"FRONT", lc:"#f0922b", hatchAngle:Math.PI/4},
  {fill:"rgba(80,140,230,0.16)", edge:"rgba(80,140,230,0.7)", label:"BACK",  lc:"#74b0ff", hatchAngle:-Math.PI/4},
  {fill:"rgba(60,200,100,0.14)", edge:"rgba(60,200,100,0.7)", label:"RIGHT", lc:"#6ee09a", hatchAngle:Math.PI/3},
  {fill:"rgba(210,70,70,0.14)",  edge:"rgba(210,70,70,0.7)",  label:"LEFT",  lc:"#f4827c", hatchAngle:-Math.PI/3},
  {fill:"rgba(200,170,255,0.14)",edge:"rgba(200,170,255,0.7)",label:"TOP",   lc:"#c9b0ff", hatchAngle:Math.PI/2},
  {fill:"rgba(255,220,80,0.12)", edge:"rgba(255,220,80,0.7)", label:"BOTTOM",lc:"#ffe680", hatchAngle:0},
];

function faceLabelAt(ctx, pts, text) {
  // Compute projected face centroid
  const cx = pts.reduce((s,p)=>s+p[0],0)/pts.length;
  const cy = pts.reduce((s,p)=>s+p[1],0)/pts.length;
  ctx.save();
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const tw = ctx.measureText(text).width;
  const pw = tw+10, ph=16;
  // Solid black bg
  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(cx-pw/2, cy-ph/2, pw, ph);
  // White border
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 1;
  ctx.strokeRect(cx-pw/2, cy-ph/2, pw, ph);
  // Pure white text — always
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

function clipPoly(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  pts.slice(1).forEach(p => ctx.lineTo(...p));
  ctx.closePath();
}

// Affine texture-map a triangle from image-space to screen-space
// d0,d1,d2 = screen dest pts; s0,s1,s2 = source image [u,v] pts
function drawTriTex(ctx, img, IW, IH, d0, d1, d2, s0, s1, s2) {
  const [x0,y0]=d0,[x1,y1]=d1,[x2,y2]=d2;
  const [u0,v0]=s0,[u1,v1]=s1,[u2,v2]=s2;
  const D=(u1-u0)*(v2-v0)-(u2-u0)*(v1-v0);
  if(Math.abs(D)<0.001)return;
  const a=((x1-x0)*(v2-v0)-(x2-x0)*(v1-v0))/D;
  const b=((y1-y0)*(v2-v0)-(y2-y0)*(v1-v0))/D;
  const c=((x2-x0)*(u1-u0)-(x1-x0)*(u2-u0))/D;
  const d=((y2-y0)*(u1-u0)-(y1-y0)*(u2-u0))/D;
  const e=x0-a*u0-c*v0;
  const f=y0-b*u0-d*v0;
  ctx.save();
  ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.lineTo(x2,y2);ctx.closePath();ctx.clip();
  ctx.transform(a,b,c,d,e,f);
  ctx.drawImage(img,0,0,IW,IH);
  ctx.restore();
}

// Map image onto quad p0=BL,p1=BR,p2=TR,p3=TL using two affine triangles
function drawImageOnFace(ctx, img, pts) {
  const [p0,p1,p2,p3]=pts; // BL BR TR TL (screen coords)
  const IW=img.naturalWidth, IH=img.naturalHeight;
  drawTriTex(ctx,img,IW,IH, p0,p1,p2, [0,IH],[IW,IH],[IW,0]);
  drawTriTex(ctx,img,IW,IH, p0,p2,p3, [0,IH],[IW,0],[0,0]);
}

function draw3D(canvas,az,el,zoom){
  const ctx=canvas.getContext("2d");
  const DPR=window.devicePixelRatio||1;
  const W=canvas.width/DPR,H=canvas.height/DPR;
  ctx.save();ctx.scale(DPR,DPR);
  ctx.clearRect(0,0,W,H);

  // Background
  ctx.fillStyle="#0a0a0a";ctx.fillRect(0,0,W,H);
  const bgr=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.85);
  bgr.addColorStop(0,"#151515");bgr.addColorStop(1,"#060606");
  ctx.fillStyle=bgr;ctx.fillRect(0,0,W,H);

  const cx=W/2, cy=H/2+8;
  const fl=300, sc=160/(1+zoom*0.07);

  // Rotate verts — cube spins, camera fixed at +Z
  const rv=VERTS.map(v=>rotVert(v,az,el));
  const sv=rv.map(v=>proj(v,cx,cy,fl,sc));

  // Subtle floor grid (screen-space vanishing lines, not rotating)
  ctx.save();
  const yf=cy+sc*1.05;
  for(let i=-6;i<=6;i++){
    const a=0.03-Math.abs(i)*0.003;
    if(a<=0)continue;
    ctx.strokeStyle=`rgba(255,255,255,${a})`;ctx.lineWidth=0.5;
    ctx.beginPath();ctx.moveTo(cx+(i/6)*(W*0.5),yf);ctx.lineTo(cx+(i/6)*(W*1.1),H);ctx.stroke();
  }
  for(let j=0;j<6;j++){
    const t=j/5, yy=yf+t*(H-yf);
    ctx.strokeStyle=`rgba(255,255,255,${0.02+t*0.025})`;ctx.lineWidth=0.5;
    ctx.beginPath();ctx.moveTo(cx-W*0.6,yy);ctx.lineTo(cx+W*0.6,yy);ctx.stroke();
  }
  ctx.restore();

  // Sort faces back-to-front (painter's algorithm)
  const faces=FACES.map((f,i)=>{
    const n=rotVert(f.normal,az,el);
    const visible=n[2]>0.0;
    const avgZ=f.verts.reduce((s,vi)=>s+rv[vi][2],0)/4;
    const pts=f.verts.map(vi=>sv[vi]);
    return{...f,fi:i,n,visible,avgZ,pts};
  }).sort((a,b)=>a.avgZ-b.avgZ);

  // Per-face colors (fill + edge)
  const PALETTE=[
    {fill:"rgba(220,95,15,0.32)",  edge:"#e8780a", name:"FRONT"},
    {fill:"rgba(40,110,210,0.26)", edge:"#4488dd", name:"BACK"},
    {fill:"rgba(35,170,70,0.23)",  edge:"#33bb55", name:"RIGHT"},
    {fill:"rgba(190,40,50,0.23)",  edge:"#dd3344", name:"LEFT"},
    {fill:"rgba(140,85,225,0.23)", edge:"#9966ee", name:"TOP"},
    {fill:"rgba(215,185,20,0.20)", edge:"#ccaa11", name:"BOTTOM"},
  ];

  faces.forEach(({fi,pts,visible,n})=>{
    const pal=PALETTE[fi];
    if(visible){
      // 1 — Colored fill
      ctx.save();clipPoly(ctx,pts);ctx.fillStyle=pal.fill;ctx.fill();ctx.restore();

      // 3 — Edge outline
      ctx.save();clipPoly(ctx,pts);
      ctx.strokeStyle=pal.edge;ctx.lineWidth=2;ctx.stroke();
      ctx.restore();

      // 4 — WHITE label always stuck to face center, any visible angle
      faceLabelAt(ctx,pts,pal.name);

    } else {
      // Hidden face — dashed dim outline only, no label
      ctx.save();clipPoly(ctx,pts);
      ctx.strokeStyle="rgba(255,255,255,0.05)";ctx.lineWidth=0.5;
      ctx.setLineDash([2,5]);ctx.stroke();ctx.setLineDash([]);
      ctx.restore();
    }
  });

  ctx.restore();
}


function Viewport3D({azimuth,elevation,zoom,onChange,active}){
  const canvasRef=useRef(null);
  const wrapRef=useRef(null);
  const drag=useRef(false);
  const last=useRef({x:0,y:0});
  const raf=useRef(null);

  useEffect(()=>{
    if(!active)return;
    const canvas=canvasRef.current,wrap=wrapRef.current;
    if(!canvas||!wrap)return;
    const DPR=window.devicePixelRatio||1;
    const W=wrap.clientWidth||580,H=320;
    canvas.width=W*DPR;canvas.height=H*DPR;
    canvas.style.width=W+"px";canvas.style.height=H+"px";
    draw3D(canvas,azimuth,elevation,zoom);
  },[azimuth,elevation,zoom,active]);

  const start=useCallback(e=>{
    if(!active)return;
    drag.current=true;
    const cl=e.touches?e.touches[0]:e;
    last.current={x:cl.clientX,y:cl.clientY};
    e.preventDefault();
  },[active]);
  const move=useCallback(e=>{
    if(!drag.current)return;
    const cl=e.touches?e.touches[0]:e;
    const dx=cl.clientX-last.current.x,dy=cl.clientY-last.current.y;
    if(raf.current)cancelAnimationFrame(raf.current);
    raf.current=requestAnimationFrame(()=>{
      onChange(p=>({...p,
        azimuth:((p.azimuth-dx*0.55)%360+360)%360,
        elevation:Math.max(-89,Math.min(89,p.elevation+dy*0.35)),
      }));
    });
    last.current={x:cl.clientX,y:cl.clientY};
  },[onChange]);
  const end=useCallback(()=>{drag.current=false;},[]);
  const wheel=useCallback(e=>{
    e.preventDefault();
    onChange(p=>({...p,zoom:Math.max(1,Math.min(20,p.zoom+e.deltaY*0.012))}));
  },[onChange]);

  useEffect(()=>{
    const el=wrapRef.current;
    if(!el||!active)return;
    el.addEventListener('wheel',wheel,{passive:false});
    return()=>el.removeEventListener('wheel',wheel);
  },[wheel,active]);

  if(!active)return(
    <div style={{minHeight:320,background:'var(--s2)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,borderRadius:'var(--r)'}}>
      <span style={{color:'var(--t)',fontSize:13}}>3D disabled</span>
      <span style={{color:'var(--t)',fontSize:11}}>Enable toggle to activate viewport</span>
    </div>
  );

  return(
    <div ref={wrapRef} className="ctrl3d-canvas-wrap"
      onClick={e=>e.stopPropagation()}
      onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
      onTouchStart={start} onTouchMove={move} onTouchEnd={end}>
      <canvas ref={canvasRef} style={{display:"block"}}/>
      <div className="ctrl3d-drag-hint">Drag to rotate · Scroll to zoom</div>
    </div>
  );
}


function describe3D(az,el,zoom){
  const a=((az%360)+360)%360;
  const side=a<22.5||a>337.5?"directly in front of the subject":
    a<67.5?"45 degrees to the right of the original viewpoint, orbiting horizontally around the main subject":
    a<112.5?"90 degrees to the right (right profile), orbiting horizontally around the main subject":
    a<157.5?"135 degrees to the right (rear-right), orbiting horizontally around the main subject":
    a<202.5?"directly behind the subject, orbiting horizontally":
    a<247.5?"135 degrees to the left (rear-left), orbiting horizontally around the main subject":
    a<292.5?"90 degrees to the left (left profile), orbiting horizontally around the main subject":
    "45 degrees to the left of the original viewpoint, orbiting horizontally around the main subject";
  const vert=el>60?"elevated 60+ degrees above the subject, looking steeply downward in a vertical arc":
    el>30?"elevated "+Math.round(el)+" degrees above the subject, looking downward in a vertical arc":
    el>5?"elevated "+Math.round(el)+" degrees above the subject, slight downward angle":
    el>-5?"at eye level with the subject":
    el>-30?"lowered "+Math.round(Math.abs(el))+" degrees below the subject, looking upward in a vertical arc":
    "lowered "+Math.round(Math.abs(el))+" degrees below eye level, steep upward angle";
  const dist=zoom<3?"moved 1-2 meters closer to the subject":
    zoom<6?"moved 3-4 meters closer to the subject":
    zoom<10?"positioned at medium distance, 5-6 meters from the subject":
    zoom<16?"positioned at long distance, 8-10 meters from the subject":
    "positioned at extreme distance, 15+ meters from the subject";
  return "The camera is positioned "+side+".\nThe camera is "+vert+".\nThe camera is "+dist+".";
}

// ─── PROMPT BUILDER ───────────────────────────────────────────────────────────
function buildPrompt({scene,selectedAngles,lighting,bg,lens,cam,use3D,custom,filmStock,colorGrade,aspectRatio,batchSize,mode}){

  const gridDims=(n)=>{
    if(n===2)return[2,1];if(n===3)return[3,1];if(n===4)return[2,2];
    if(n===5)return[3,2];if(n===6)return[3,2];if(n===7)return[4,2];
    if(n===8)return[4,2];if(n===9)return[3,3];
    return[Math.ceil(Math.sqrt(n)),Math.ceil(n/Math.ceil(Math.sqrt(n)))];
  };
  const n=selectedAngles.length;

  const techParts=[];
  if(bg)techParts.push(BACKGROUNDS.find(b=>b.id===bg)?.p);
  if(lighting)techParts.push(LIGHTING.find(l=>l.id===lighting)?.p);
  if(lens)techParts.push(LENSES.find(l=>l.mm===lens)?.p);
  if(filmStock)techParts.push(FILM_STOCKS.find(f=>f.id===filmStock)?.p);
  if(colorGrade)techParts.push(COLOR_GRADES.find(c=>c.id===colorGrade)?.p);
  if(use3D&&n<=1)techParts.push(describe3D(cam.azimuth,cam.elevation,cam.zoom));
  const techBlock=techParts.filter(Boolean).join(". ")+(techParts.length?".":"");

  // ── NO ANGLES selected ───────────────────────────────────────────────────────
  const modePrefix=mode==="photo"
    ?"Use the attached reference photo as your only visual source. Maintain the exact same subject, environment, lighting, and mood. Generate a new rendering based on the settings below."
    :"Generate a completely original scene from scratch based on the description and settings below.";
  if(n===0){
    const parts=[];
    parts.push(modePrefix);
    if(scene.trim())parts.push(scene.trim());
    if(techBlock)parts.push(techBlock);
    if(custom.trim())parts.push(custom.trim());
    return parts.join("\n\n");
  }

  // ── SINGLE ANGLE: re-render ──────────────────────────────────────────────────
  if(n===1){
    const parts=[];
    const angleObj=ANGLES[selectedAngles[0]];
    parts.push(modePrefix);
    if(scene.trim())parts.push(scene.trim());
    if(techBlock)parts.push(techBlock);
    const camDesc=use3D?describe3D(cam.azimuth,cam.elevation,cam.zoom):"";
    const camBlock=use3D
      ?(camDesc+"\nEnsure realistic depth-based parallax: foreground shifts more than background. Do not rotate the subject or background layers. Do not apply 2D tilting or flat image warping.")
      :("Camera angle: "+angleObj.name+" — "+angleObj.desc+".");
    parts.push(camBlock);
    parts.push("Output as a single cinematic image with sharp detail, physically plausible lighting, and no added characters.");
    if(custom.trim())parts.push(custom.trim());
    return parts.join("\n\n");
  }

  // ── MULTI ANGLE: grid ────────────────────────────────────────────────────────
  const[cols,rows]=gridDims(n);
  const gridLayout=n===2?"2-panel split":(cols+"x"+rows+" grid");

  // ORDER: Goal → Scene → Settings → Angles → Rules → Output
  const parts=[];

  // 1. GOAL — must be first so AI knows immediately what it's doing
  const gridGoal=mode==="photo"
    ?"Use the attached reference photo as the only visual source and generate a single composite output arranged as a clean "+gridLayout+". "
    :"Generate a single composite output from scratch arranged as a clean "+gridLayout+". ";
  parts.push(
    gridGoal+
    "Each cell must depict the exact same moment with identical characters, wardrobe, facial structure, lighting logic, and environment. "+
    "Preserve strict character consistency and cinematic realism. "+
    "Do not introduce any new people, creatures, or background characters in any frame. "+
    "Do not alter identity, age, gender, body proportions, costume details, or character poses. "+
    "Poses, gestures, head orientation, limb positions, and physical interactions must remain unchanged across all panels. "+
    "Maintain continuity of props, time of day, color palette, and scene mood."
  );

  // 2. Scene description (user text)
  if(scene.trim())parts.push(scene.trim());

  // 3. Visual settings
  if(techBlock)parts.push(techBlock);

  // 4. Camera angles with full descriptions
  parts.push(
    "Create "+n+" clearly distinct camera angles from the same scene:\n"+
    selectedAngles.map((i,idx)=>(idx+1)+". "+ANGLES[i].name+" — "+ANGLES[i].desc).join("\n")
  );

  // 5. Aspect ratio rules
  parts.push(
    "Aspect ratio rules: every panel must use the exact same aspect ratio"+(aspectRatio?" ("+aspectRatio+")":"")+". "+
    "Identical framing proportions and consistent crop logic. "+
    "No panel may be taller, wider, zoomed differently, or padded differently than the others. "+
    "Maintain uniform composition boundaries across the entire grid. "+
    "The final composite grid image must also retain the same aspect ratio as the original reference image."
  );

  // 6. Labeling rules
  parts.push(
    "Labeling rules: each panel must include a clear, unobtrusive numeric label in the top-left corner: "+
    selectedAngles.map((_,i)=>'"'+(i+1)+'"').join(", ")+". "+
    "Use a clean, minimal sans-serif font, small size, white or neutral color with subtle contrast for legibility. "+
    "Labels must not overlap faces, key actions, or important visual elements."
  );

  // 7. Film coverage consistency
  parts.push(
    "All "+n+" angles must feel like coverage from the same film production: "+
    "coherent lens language, realistic camera physics, consistent shadows, reflections, and exposure. "+
    "Avoid stylization drift. Avoid duplicating compositions. "+
    "Avoid mirrored or slightly rotated versions of the same shot. "+
    "Each angle must be compositionally and perspectively unique."
  );

  // 8. Output spec
  parts.push(
    "Output as a single "+gridLayout+" image with "+n+" panels, identical aspect ratios, "+
    "cinematic color grading, sharp detail, physically plausible lighting, and no added characters."
  );

  // 9. Custom additions (always last)
  if(custom.trim())parts.push(custom.trim());

  return parts.join("\n\n");
}

async function copyText(text){
  // Try modern clipboard API first
  if(navigator.clipboard&&window.isSecureContext){
    try{await navigator.clipboard.writeText(text);return true;}catch(_){}
  }
  // Fallback: create visible-but-offscreen textarea, select all, execCommand
  const ta=document.createElement("textarea");
  ta.value=text;
  ta.style.cssText="position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent;";
  document.body.appendChild(ta);
  ta.focus();ta.select();
  ta.setSelectionRange(0,99999);
  let ok=false;
  try{ok=document.execCommand("copy");}catch(_){}
  document.body.removeChild(ta);
  return ok;
}

// ─── ANGLES PAGE ──────────────────────────────────────────────────────────────
function AnglesPage(){
  const[scene,setScene]=useState("");
  const[sel,setSel]=useState([]);
  const[light,setLight]=useState(null);
  const[bg,setBg]=useState(null);
  const[lens,setLens]=useState(null);
  const[filmStock,setFilmStock]=useState(null);
  const[colorGrade,setColorGrade]=useState(null);
  const[aspectRatio,setAspectRatio]=useState("16:9");
  const[batchSize,setBatchSize]=useState(1);
  const[use3D,setUse3D]=useState(false);
  const[mode1,setMode1]=useState("photo"); // "photo" | "scratch"
  const[cam,setCam]=useState({azimuth:0,elevation:0,zoom:5});

  const[custom,setCustom]=useState("");
  const[toast,setToast]=useState("");
  const[history,setHistory]=useState([]);
  const[showHistory,setShowHistory]=useState(false);
  const[enhancing,setEnhancing]=useState(false);
  const[enhanced,setEnhanced]=useState("");
  const[showAuthModal,setShowAuthModal]=useState(false);
  const{user}=React.useContext(AuthCtx);
  const MAX=9;

  const tog=(i)=>setSel(p=>p.includes(i)?p.filter(x=>x!==i):p.length>=MAX?p:[...p,i]);
  const tog1=(setter,id)=>setter(p=>p===id?null:id);
  const prompt=buildPrompt({scene,selectedAngles:sel,lighting:light,bg,lens,cam,use3D,custom,filmStock,colorGrade,aspectRatio,batchSize,mode:mode1});
  const hasAny=!!(scene.trim()||sel.length||light||bg||lens||filmStock||colorGrade||use3D||custom.trim());

  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2500)};
  const copy=async()=>{
    if(!hasAny)return;
    const ok=await copyText(enhanced||prompt);
    setHistory(p=>[{prompt:enhanced||prompt,date:new Date().toLocaleTimeString()},...p].slice(0,20));
    doToast(ok?"COPIED TO CLIPBOARD":"COPY FAILED — SELECT MANUALLY");
  };
  const enhance=async()=>{
    if(!hasAny)return;
    if(!user){setShowAuthModal(true);return;}
    setEnhancing(true);setEnhanced("");
    try{
      const result=await callEnhance(prompt,custom,user.idToken,null);
      setEnhanced(result);
      doToast("✦ ENHANCED BY GEMINI");
    }catch(e){
      if(e.status===401){setShowAuthModal(true);}
      else doToast("ERROR: "+e.message);
    }
    setEnhancing(false);
  };
  const reset=()=>{
    setScene("");setSel([]);setLight(null);setBg(null);setLens(null);
    setFilmStock(null);setColorGrade(null);setAspectRatio("16:9");setBatchSize(1);
    setUse3D(false);setCam({azimuth:0,elevation:0,zoom:5});setCustom("");
    doToast("RESET COMPLETE");
  };
  const random=()=>{
    const count=Math.floor(Math.random()*4)+2;
    setSel([...Array(ANGLES.length).keys()].sort(()=>Math.random()-.5).slice(0,count));
    setLight(LIGHTING[~~(Math.random()*LIGHTING.length)].id);
    setBg(BACKGROUNDS[~~(Math.random()*BACKGROUNDS.length)].id);
    setLens(LENSES[~~(Math.random()*LENSES.length)].mm);
    setFilmStock(FILM_STOCKS[~~(Math.random()*FILM_STOCKS.length)].id);
    setColorGrade(COLOR_GRADES[~~(Math.random()*COLOR_GRADES.length)].id);
    doToast("RANDOM CONFIGURATION");
  };
  const quickSet=(type)=>{
    if(type==='portrait'){setSel([4,6,5]);setLens("85mm");setLight("studiokey");setAspectRatio("4:3")}
    else if(type==='landscape'){setSel([0,8,11]);setLens("24mm");setLight("golden");setAspectRatio("16:9")}
    else if(type==='action'){setSel([2,21,14]);setLens("35mm");setLight("midday");setFilmStock("kodak")}
    else if(type==='noir'){setSel([17,18,24]);setLens("50mm");setLight("night");setColorGrade("noir");setFilmStock("ilford")}
    doToast(`LOADED ${type.toUpperCase()} PRESET`);
  };

  const PRESETS=[
    {label:"Front",az:0,el:0},{label:"Right",az:90,el:0},{label:"Back",az:180,el:0},{label:"Left",az:270,el:0},
    {label:"Top",az:0,el:85},{label:"Low",az:0,el:-45},{label:"Dutch",az:45,el:15},{label:"Bird",az:0,el:70},
  ];

  return(
    <div className="page">
      <div className="ph">
        <div className="pt">Multi-<b>Shot</b></div>
        <div className="ps">Multi-Shot Prompt Builder — Design cinematic angle sets (up to 9 views) with perfect subject &amp; lighting consistency. Real-time 3D camera orbit &amp; zoom.</div>
        <div className={`pc${sel.length===MAX?" full":""}`}>
          <span>{sel.length} / {MAX} angles</span>
          {batchSize>1&&<span>· {batchSize}x batch</span>}
          <span>· {aspectRatio}</span>
        </div>
      </div>

      <div style={{display:"flex",gap:0,marginBottom:20,borderRadius:10,overflow:"hidden",border:"1px solid var(--bd)",width:"fit-content"}}>
        <button onClick={()=>setMode1("photo")} style={{padding:"10px 24px",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",border:"none",background:mode1==="photo"?"#e8780a":"var(--s1)",color:mode1==="photo"?"#000":"var(--t)",transition:"all .2s"}}>
          ⊕ From reference photo
        </button>
        <button onClick={()=>setMode1("scratch")} style={{padding:"10px 24px",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",border:"none",borderLeft:"1px solid var(--bd)",background:mode1==="scratch"?"#e8780a":"var(--s1)",color:mode1==="scratch"?"#000":"var(--t)",transition:"all .2s"}}>
          ✦ Create from scratch
        </button>
      </div>
      {mode1==="photo"&&(
        <div style={{background:"var(--acdim)",border:"1px solid var(--acc)",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:11,color:"var(--acc)",lineHeight:1.5}}>
          <span style={{fontWeight:700}}>↑ Attach your reference photo</span> when pasting this prompt. The AI will use it as the visual base and apply your selected angles, lighting, and settings to it.
        </div>
      )}
      <div className="quick-actions">
        {[["portrait","Portrait Set"],["landscape","Landscape Set"],["action","Action Set"],["noir","Noir Set"]].map(([type,label])=>(
          <button key={type} className="quick-btn" onClick={()=>quickSet(type)}>{label}</button>
        ))}
      </div>

      <div className="scene-field">
        <div className="sh"><span className="st">Scene Description</span><span className="sb">PROMPT INTRO</span></div>
        <textarea rows={4} value={scene} onChange={e=>setScene(e.target.value)} placeholder="Describe your scene or subject. This appears first in the generated prompt — use it to set context, paste a reference prompt, or describe the character and environment. The more specific, the better."/>
        <div className="scene-hint">This is the foundation of your prompt. Include character details, actions, environment mood, and key visual elements you want preserved across all frames.</div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Camera Angles</span>{sel.length>0&&<span className="sb">{sel.length} SELECTED</span>}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {ANGLES.map((angle,i)=>{
            const ord=sel.indexOf(i);const isSel=ord!==-1;
            const col=i%6, row=Math.floor(i/6);
            return(
              <div key={i}
                onClick={()=>tog(i)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",position:"relative",
                  border:"2px solid "+(isSel?"#e8780a":"var(--bd)"),
                  boxShadow:isSel?"0 0 14px rgba(232,120,10,.4)":"none",
                  opacity:!isSel&&sel.length>=MAX?0.4:1,
                  transition:"all .15s",width:178,flexShrink:0}}>
                <div style={{width:178,height:100,
                  backgroundImage:"url(/angles.png)",
                  backgroundSize:"1190px 500px",
                  backgroundPosition:(-col*200)+"px "+(-row*100)+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:10,fontWeight:600,
                  color:isSel?"#e8780a":"var(--t)",lineHeight:1.2}}>{angle.name}</div>
                {isSel&&<div className="anum">{ord+1}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="divider"/>

      <div className="batch-size">
        <span className="batch-label">Batch Variations:</span>
        <div className="batch-options">
          {[1,2,3,4].map(n=>(
            <button key={n} className={`batch-opt${batchSize===n?" sel":""}`} onClick={()=>setBatchSize(n)}>{n}</button>
          ))}
        </div>
        <span style={{fontSize:11,color:'var(--t)',marginLeft:8}}>Generate multiple prompt variations</span>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Lighting & Atmosphere</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LIGHT_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>tog1(setLight,r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(light===r.id?"#e8780a":"var(--bd)"),
                boxShadow:light===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:150}}>
              <div style={{width:150,height:105,
                backgroundImage:"url(/lighting.png)",
                backgroundSize:"750px 315px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:light===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"/>

      <div className="sec">
        <div className="sh"><span className="st">Environment / Background</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {ENV_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>tog1(setBg,r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(bg===r.id?"#e8780a":"var(--bd)"),
                boxShadow:bg===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:133}}>
              <div style={{width:133,height:112,
                backgroundImage:"url(/environment.png)",
                backgroundSize:"798px 336px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:bg===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"/>

      <div className="sec">
        <div className="sh"><span className="st">Lens / Focal Length</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LENS_SPRITES.map(r=>(
            <div key={r.mm} onClick={()=>tog1(setLens,r.mm)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(lens===r.mm?"#e8780a":"var(--bd)"),
                boxShadow:lens===r.mm?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:150}}>
              <div style={{width:150,height:83,
                backgroundImage:"url(/lens.png)",
                backgroundSize:"600px 332px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:lens===r.mm?"#e8780a":"var(--t)"}}>{r.mm}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"/>

      <div className="sec">
        <div className="sh"><span className="st">Film Stock & Color Grade</span></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--t)',marginBottom:10}}>Film Stock</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {FILM_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>tog1(setFilmStock,r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(filmStock===r.id?"#e8780a":"var(--bd)"),
                boxShadow:filmStock===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:150}}>
              <div style={{width:150,height:167,
                backgroundImage:"url(/film.png)",
                backgroundSize:"600px 334px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:filmStock===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--t)',marginBottom:10}}>Color Grade</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {COLOR_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>tog1(setColorGrade,r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(colorGrade===r.id?"#e8780a":"var(--bd)"),
                boxShadow:colorGrade===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:150}}>
              <div style={{width:150,height:167,
                backgroundImage:"url(/color.png)",
                backgroundSize:"600px 334px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:colorGrade===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>

      <div className="divider"/>

      <div className="sec">
        <div className="sh"><span className="st">Aspect Ratio</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {FORMAT_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>setAspectRatio(r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(aspectRatio===r.id?"#e8780a":"var(--bd)"),
                boxShadow:aspectRatio===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:r.fw,
                display:"flex",flexDirection:"column",alignItems:"center",
                padding:"10px 8px",background:"var(--s1)",gap:6}}>
              <div style={{width:80,height:80,flexShrink:0,
                backgroundImage:"url(/format.png)",
                backgroundSize:"400px 80px",
                backgroundPosition:r.sx+"px 0px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:aspectRatio===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"/>

      <div className="sec" onClick={()=>setUse3D(v=>!v)} style={{cursor:"pointer"}}>
        <div className="sh">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span className="st">3D Camera Control</span>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:1.5,padding:"2px 7px",borderRadius:3,border:"1px solid var(--bd)",color:"var(--t)"}}>BETA</span>
          </div>
          <div onClick={e=>{e.stopPropagation();setUse3D(v=>!v);}} style={{display:"flex",alignItems:"center",gap:10,marginLeft:"auto",cursor:"pointer",userSelect:"none"}}>
            <span style={{fontSize:11,color:use3D?"var(--acc)":"var(--t)",marginLeft:"auto"}}>{use3D?"Active — added to prompt":"Disabled"}</span>
            <div style={{width:44,height:24,borderRadius:12,position:"relative",background:use3D?"#e8780a":"var(--s3)",border:"1px solid "+(use3D?"#e8780a":"var(--bd)"),transition:"all .2s",flexShrink:0}}>
              <div style={{position:"absolute",top:4,left:use3D?24:4,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
            </div>
          </div>
        </div>

        <div className="ctrl3d">
          <div className="ctrl3d-body">
            <Viewport3D azimuth={cam.azimuth} elevation={cam.elevation} zoom={cam.zoom} onChange={setCam} active={use3D}/>
            <div className="ctrl3d-panel">
              <div className="presets">
                <div className="preset-label">Quick Presets</div>
                <div className="preset-grid">
                  {PRESETS.map(pr=>(
                    <button key={pr.label} className="preset-btn" onClick={()=>setCam(p=>({...p,azimuth:pr.az,elevation:pr.el}))}>
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sliders">
                {[
                  {label:"Rotation",key:"azimuth",min:-180,max:180,unit:"°",get:p=>Math.round(((p.azimuth+180)%360)-180)},
                  {label:"Tilt",key:"elevation",min:-90,max:90,unit:"°",get:p=>Math.round(p.elevation)},
                  {label:"Distance",key:"zoom",min:1,max:25,unit:"m",get:p=>Math.round(p.zoom)},
                ].map(sl=>(
                  <div key={sl.key} className="slider-row">
                    <div className="slider-hdr">
                      <span className="slider-label">{sl.label}</span>
                      <span className="slider-val">{sl.get(cam)>0&&sl.key!=="zoom"?"+":""}{sl.get(cam)}{sl.unit}</span>
                    </div>
                    <input type="range" min={sl.min} max={sl.max} step={1}
                      value={sl.get(cam)}
                      onChange={e=>{const v=Number(e.target.value);setCam(p=>({...p,[sl.key]:sl.key==="azimuth"?((v+360)%360):v}));}}/>
                  </div>
                ))}
              </div>
              {use3D&&<div className="angle-desc">{describe3D(cam.azimuth,cam.elevation,cam.zoom)}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="divider"/>

      <div className="scene-field">
        <div className="sh"><span className="st">Custom Additions</span><span className="sb">APPENDED</span></div>
        <textarea rows={3} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Add extra instructions, negative prompts, style notes, or specific technical requirements. This is appended after the auto-generated content."/>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Generated Prompt</span>{hasAny&&<span className="sb">LIVE</span>}</div>
        <div className={`pbox${hasAny?" live":""}`}>
          {hasAny?(enhanced||prompt):<span className="pbox-empty">Fill fields above to generate your prompt in real time.</span>}
        </div>
        {enhanced&&(
          <div style={{marginTop:8,fontSize:11,color:"var(--acc)",fontWeight:600,letterSpacing:1}}>
            ✦ Enhanced by Gemini — <button onClick={()=>setEnhanced("")} style={{background:"none",border:"none",color:"var(--t4)",fontSize:11,cursor:"pointer",textDecoration:"underline"}}>revert to original</button>
          </div>
        )}
        <div className="pbar">
          <button className="btn" onClick={reset}>Reset</button>
          <button className="btn" onClick={random}>Random</button>
          <button className="btn" onClick={enhance} disabled={!hasAny||enhancing}
            style={{borderColor:enhancing?"var(--bd)":"var(--acc)",color:enhancing?"var(--t4)":"var(--acc)",background:"var(--acdim)"}}>
            {enhancing?"ENHANCING…":"✦ Enhance"}
          </button>
          <button className={`btn${hasAny?" pri":""}`} onClick={copy} disabled={!hasAny}>Copy Prompt</button>
        </div>
        {hasAny&&<GenWithLinks getPrompt={()=>enhanced||prompt} onCopy={()=>doToast("PROMPT COPIED — PASTE IN TARGET APP")}/>}
      </div>

      {showAuthModal&&<AuthModal onClose={()=>setShowAuthModal(false)} />}
      {toast&&<div className="toast">{toast}</div>}

      <button className={`floating-btn${showHistory?" active":""}`} onClick={()=>setShowHistory(v=>!v)}>
        {showHistory?"×":"HST"}
      </button>

      <div className={`history-panel${showHistory?" open":""}`}>
        <div className="history-title">
          <span>History</span>
          <button onClick={()=>setHistory([])} style={{fontSize:10,background:'transparent',border:'none',color:'var(--t4)',cursor:'pointer'}}>Clear</button>
        </div>
        {history.length===0&&<div style={{color:'var(--t4)',fontSize:11,textAlign:'center',padding:20}}>No history yet. Copy a prompt to save it.</div>}
        {history.map((h,i)=>(
          <div key={i} className="history-item" onClick={()=>{copyText(h.prompt);setToast("RESTORED");setTimeout(()=>setToast(""),2500);}}>
            <div className="history-time">{h.date}</div>
            <div>{h.prompt.substring(0,120)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AVATAR DATA ──────────────────────────────────────────────────────────────








const LIGHT_SPRITES=[
  {id:"golden",name:"Golden Hour",sx:0,sy:0},
  {id:"midday",name:"Midday Sun",sx:-150,sy:0},
  {id:"bluehour",name:"Blue Hour",sx:-300,sy:0},
  {id:"night",name:"Night",sx:-450,sy:0},
  {id:"overcast",name:"Overcast",sx:-600,sy:0},
  {id:"sunrise",name:"Sunrise",sx:0,sy:-105},
  {id:"interior",name:"Interior Light",sx:-150,sy:-105},
  {id:"storm",name:"Storm Light",sx:-300,sy:-105},
  {id:"fog",name:"Fog / Mist",sx:-450,sy:-105},
  {id:"neon",name:"Neon Night",sx:-600,sy:-105},
  {id:"fire",name:"Firelight",sx:0,sy:-210},
  {id:"moonlit",name:"Moonlit",sx:-150,sy:-210},
  {id:"studiokey",name:"Studio Key",sx:-300,sy:-210},
  {id:"magic",name:"Magic Hour",sx:-450,sy:-210},
];
const ENV_SPRITES=[
  {id:"scifi",name:"Sci-Fi Megacity",sx:0,sy:0},
  {id:"ancient",name:"Ancient Ruins",sx:-133,sy:0},
  {id:"retrofuture",name:"Retrofuturistic",sx:-266,sy:0},
  {id:"forest",name:"Dark Forest",sx:-399,sy:0},
  {id:"desert",name:"Desert Wasteland",sx:-532,sy:0},
  {id:"underwater",name:"Underwater Deep",sx:-665,sy:0},
  {id:"space",name:"Outer Space",sx:0,sy:-112},
  {id:"cyberpunk",name:"Cyberpunk Alley",sx:-133,sy:-112},
  {id:"medieval",name:"Medieval Castle",sx:-266,sy:-112},
  {id:"industrial",name:"Industrial Zone",sx:-399,sy:-112},
  {id:"arctic",name:"Arctic Tundra",sx:-532,sy:-112},
  {id:"jungle",name:"Jungle Temple",sx:-665,sy:-112},
  {id:"studio",name:"White Studio",sx:0,sy:-224},
  {id:"tokyo",name:"Tokyo Streets",sx:-133,sy:-224},
  {id:"cave",name:"Crystal Cave",sx:-266,sy:-224},
  {id:"western",name:"Wild West",sx:-399,sy:-224},
  {id:"abstract",name:"Abstract Void",sx:-532,sy:-224},
  {id:"black",name:"Black Studio",sx:-665,sy:-224},
];
const LENS_SPRITES=[
  {mm:"8mm",name:"Fisheye",sx:0,sy:0},
  {mm:"12mm",name:"Ultra-Wide",sx:-150,sy:0},
  {mm:"16mm",name:"Wide-Angle",sx:-300,sy:0},
  {mm:"20mm",name:"Super Wide",sx:-450,sy:0},
  {mm:"24mm",name:"Wide",sx:0,sy:-84},
  {mm:"28mm",name:"Moderate Wide",sx:-150,sy:-84},
  {mm:"35mm",name:"Standard Wide",sx:-300,sy:-84},
  {mm:"50mm",name:"Normal",sx:-450,sy:-84},
  {mm:"70mm",name:"Short Tele",sx:0,sy:-166},
  {mm:"85mm",name:"Portrait",sx:-150,sy:-166},
  {mm:"100mm",name:"Macro Tele",sx:-300,sy:-166},
  {mm:"135mm",name:"Medium Tele",sx:-450,sy:-166},
  {mm:"200mm",name:"Telephoto",sx:0,sy:-252},
  {mm:"300mm",name:"Super Tele",sx:-150,sy:-252},
  {mm:"400mm",name:"Long Tele",sx:-300,sy:-252},
  {mm:"600mm",name:"Extreme Tele",sx:-450,sy:-252},
];
const FILM_SPRITES=[
  {id:"kodak",name:"Kodak Vision3",sx:0,sy:0},
  {id:"fuji",name:"Fuji Eterna",sx:-150,sy:0},
  {id:"ilford",name:"Ilford B&W",sx:-300,sy:0},
  {id:"cinestill",name:"Cinestill 800T",sx:-450,sy:0},
  {id:"polaroid",name:"Polaroid",sx:0,sy:-167},
  {id:"digital",name:"Digital Clean",sx:-150,sy:-167},
  {id:"vintage",name:"Vintage 16mm",sx:-300,sy:-167},
  {id:"anamorphic",name:"Anamorphic",sx:-450,sy:-167},
];
const COLOR_SPRITES=[
  {id:"teal",name:"Teal & Orange",sx:0,sy:0},
  {id:"matrix",name:"Matrix Green",sx:-150,sy:0},
  {id:"noir",name:"Film Noir",sx:-300,sy:0},
  {id:"sepia",name:"Sepia",sx:-450,sy:0},
  {id:"cyber",name:"Cyberpunk Neon",sx:0,sy:-167},
  {id:"natural",name:"Naturalistic",sx:-150,sy:-167},
  {id:"bleach",name:"Bleach Bypass",sx:-300,sy:-167},
  {id:"warm",name:"Warm Vintage",sx:-450,sy:-167},
];
const FORMAT_SPRITES=[
  {id:"16:9",name:"16:9",fw:130,sx:0},
  {id:"9:16",name:"9:16",fw:55,sx:-80},
  {id:"2.39:1",name:"2.39:1",fw:170,sx:-160},
  {id:"4:3",name:"4:3",fw:110,sx:-240},
  {id:"1:1",name:"1:1",fw:90,sx:-320},
];
const UNIVERSE_SPRITES=[
  {id:"realism",name:"Photorealism",sx:0,sy:0},
  {id:"anime",name:"Anime",sx:-100,sy:0},
  {id:"3d",name:"3D Render",sx:-200,sy:0},
  {id:"2d",name:"Vector Art",sx:-300,sy:0},
  {id:"pixel",name:"Pixel Art",sx:-400,sy:0},
  {id:"oil",name:"Oil Painting",sx:-500,sy:0},
];
const ANGLE_SPRITES=[
  {name:"Wide establishing shot",sx:-10,sy:0},
  {name:"Medium eye-level shot",sx:-208,sy:0},
  {name:"Low-angle hero shot",sx:-406,sy:0},
  {name:"Over-the-shoulder shot",sx:-604,sy:0},
  {name:"Close-up",sx:-802,sy:0},
  {name:"High-angle shot",sx:-1000,sy:0},
  {name:"Profile side shot",sx:-10,sy:-100},
  {name:"Dutch tilt shot",sx:-208,sy:-100},
  {name:"Extreme wide master shot",sx:-406,sy:-100},
  {name:"Bird's-eye vertical shot",sx:-604,sy:-100},
  {name:"Ground-level worm's-eye shot",sx:-802,sy:-100},
  {name:"Three-quarter front angle",sx:-1000,sy:-100},
  {name:"Three-quarter rear angle",sx:-10,sy:-200},
  {name:"Locked-off static frame",sx:-208,sy:-200},
  {name:"Long-lens compression shot",sx:-406,sy:-200},
  {name:"Foreground-obstructed shot",sx:-604,sy:-200},
  {name:"Reflected perspective shot",sx:-802,sy:-200},
  {name:"Silhouette backlit shot",sx:-1000,sy:-200},
  {name:"Center-punched symmetrical shot",sx:-10,sy:-300},
  {name:"Asymmetrical rule-of-thirds shot",sx:-208,sy:-300},
  {name:"Hand-level perspective shot",sx:-406,sy:-300},
  {name:"Chest-height tracking angle",sx:-604,sy:-300},
  {name:"Environmental frame-within-frame shot",sx:-802,sy:-300},
  {name:"Extreme close environment shot",sx:-1000,sy:-300},
  {name:"Rear profile silhouette shot",sx:-10,sy:-400},
  {name:"Shallow-focus foreground lead shot",sx:-208,sy:-400},
  {name:"Deep-focus wide shot",sx:-406,sy:-400},
  {name:"Oblique corner angle shot",sx:-604,sy:-400},
  {name:"Eye-line match perspective shot",sx:-802,sy:-400},
  {name:"Environmental negative-space shot",sx:-1000,sy:-400},
];
const CLOTHING_SPRITES=[
  {id:"Neutral (studio reference)",name:"Neutral",sx:0,sy:0},
  {id:"Modern Casual",name:"Modern Casual",sx:-120,sy:0},
  {id:"Formal / Business",name:"Formal / Business",sx:-240,sy:0},
  {id:"Fantasy Armor",name:"Fantasy Armor",sx:-360,sy:0},
  {id:"Sci-Fi Suit",name:"Sci-Fi Suit",sx:-480,sy:0},
  {id:"Traditional / Cultural",name:"Traditional",sx:0,sy:-167},
  {id:"Streetwear",name:"Streetwear",sx:-120,sy:-167},
  {id:"Robes / Wizard",name:"Robes / Wizard",sx:-240,sy:-167},
  {id:"Military / Tactical",name:"Military",sx:-360,sy:-167},
  {id:"None",name:"None",sx:-480,sy:-167},
];
const LARM_SPRITES=[
  {name:"Natural",sx:0,sy:0},
  {name:"Steampunk Prosthetic",sx:-200,sy:0},
  {name:"Cybernetic Prosthetic",sx:-400,sy:0},
  {name:"Extra Arms",sx:0,sy:-100},
  {name:"Tentacles",sx:-200,sy:-100},
  {name:"Furry Animal",sx:-400,sy:-100},
  {name:"Scaly",sx:0,sy:-200},
  {name:"Ghostly",sx:-200,sy:-200},
  {name:"Mechanical Claws",sx:-400,sy:-200},
  {name:"Bird Claws",sx:0,sy:-300},
];
const RARM_SPRITES=[
  {name:"Natural",sx:-100,sy:0},
  {name:"Steampunk Prosthetic",sx:-300,sy:0},
  {name:"Cybernetic Prosthetic",sx:-500,sy:0},
  {name:"Extra Arms",sx:-100,sy:-100},
  {name:"Tentacles",sx:-300,sy:-100},
  {name:"Furry Animal",sx:-500,sy:-100},
  {name:"Scaly",sx:-100,sy:-200},
  {name:"Ghostly",sx:-300,sy:-200},
  {name:"Mechanical Claws",sx:-500,sy:-200},
  {name:"Bird Claws",sx:-100,sy:-300},
];
const LLEG_SPRITES=[
  {name:"Natural",sx:0,sy:0},
  {name:"Prosthetic Blade",sx:-170,sy:0},
  {name:"Furry Paws",sx:-340,sy:0},
  {name:"Natural Alt",sx:0,sy:-128},
  {name:"Snake Tail",sx:-170,sy:-128},
  {name:"Mermaid Tail",sx:-340,sy:-128},
  {name:"Bird Claws",sx:0,sy:-256},
  {name:"Mechanical",sx:-170,sy:-256},
  {name:"Fur Hooves",sx:-340,sy:-256},
];
const RLEG_SPRITES=[
  {name:"Natural",sx:-85,sy:0},
  {name:"Prosthetic Blade",sx:-255,sy:0},
  {name:"Furry Paws",sx:-425,sy:0},
  {name:"Natural Alt",sx:-85,sy:-128},
  {name:"Snake Tail",sx:-255,sy:-128},
  {name:"Mermaid Tail",sx:-425,sy:-128},
  {name:"Bird Claws",sx:-85,sy:-256},
  {name:"Mechanical",sx:-255,sy:-256},
  {name:"Fur Hooves",sx:-425,sy:-256},
];
const WINGS_SPRITES=[
  {name:"None", sx:0, sy:0},
  {name:"Angel", sx:-100, sy:0},
  {name:"Dark Angel", sx:-200, sy:0},
  {name:"Dragon", sx:-300, sy:0},
  {name:"Bat", sx:-400, sy:0},
  {name:"Fairy", sx:-500, sy:0},
  {name:"Butterfly", sx:-600, sy:0},
  {name:"Eagle", sx:0, sy:-100},
  {name:"Fire", sx:-100, sy:-100},
  {name:"Ice", sx:-200, sy:-100},
  {name:"Shadow", sx:-300, sy:-100},
  {name:"Mechanical", sx:-400, sy:-100},
  {name:"Peacock", sx:-500, sy:-100},
];
const TAIL_SPRITES=[
  {name:"None", sx:0, sy:0},
  {name:"Cat", sx:-100, sy:0},
  {name:"Fox", sx:-200, sy:0},
  {name:"Wolf", sx:-300, sy:0},
  {name:"Dragon", sx:-400, sy:0},
  {name:"Demon", sx:-500, sy:0},
  {name:"Mermaid", sx:-600, sy:0},
  {name:"Scorpion", sx:0, sy:-100},
  {name:"Feathered", sx:-100, sy:-100},
  {name:"Tentacle", sx:-200, sy:-100},
  {name:"Bone", sx:-300, sy:-100},
  {name:"Crystal", sx:-400, sy:-100},
  {name:"Fire", sx:-500, sy:-100},
];
const REGION_SPRITES=[
  {name:"N.European", sx:0, sy:0},{name:"Mediterranean", sx:-100, sy:0},
  {name:"East Asian", sx:-200, sy:0},{name:"S.Asian", sx:-300, sy:0},
  {name:"African", sx:-400, sy:0},{name:"N.African", sx:-500, sy:0},
  {name:"Middle Eastern", sx:-600, sy:0},{name:"Latin American", sx:0, sy:-100},
  {name:"Indigenous", sx:-100, sy:-100},{name:"Polynesian", sx:-200, sy:-100},
  {name:"Slavic", sx:-300, sy:-100},{name:"Nordic", sx:-400, sy:-100},
  {name:"Celtic", sx:-500, sy:-100},{name:"Mixed", sx:-600, sy:-100},
];
const EXPRESSION_SPRITES=[
  {name:"Neutral",sx:0,sy:0},{name:"Subtle Smile",sx:-100,sy:0},
  {name:"Focused",sx:-200,sy:0},{name:"Composed",sx:-300,sy:0},{name:"Wry Smirk",sx:-400,sy:0},
  {name:"Happy",sx:0,sy:-100},{name:"Calm",sx:-100,sy:-100},
  {name:"Skeptical",sx:-200,sy:-100},{name:"Stern",sx:-300,sy:-100},{name:"Grimace",sx:-400,sy:-100},
  {name:"Shocked",sx:0,sy:-200},{name:"Worried",sx:-100,sy:-200},
  {name:"Surprised",sx:-200,sy:-200},{name:"Tense",sx:-300,sy:-200},{name:"Playful",sx:-400,sy:-200},
  {name:"Winking",sx:0,sy:-300},{name:"Sad",sx:-100,sy:-300},
  {name:"Amazed",sx:-200,sy:-300},{name:"Joyful",sx:-300,sy:-300},{name:"Pensive",sx:-400,sy:-300},
  {name:"Smirking",sx:0,sy:-400},{name:"Startled",sx:-100,sy:-400},
  {name:"Horrified",sx:-200,sy:-400},{name:"Intense",sx:-300,sy:-400},{name:"Serene",sx:-400,sy:-400},
];
const LAYOUT_SPRITES=[
  {name:"Style Sheet",sx:0,sy:0,p:"Generate a single composite character reference sheet arranged as a clean 1x3 grid with three panels. Panel layout:\n1. Front-facing close-up portrait — head and shoulders only, face centered, camera at eye level, even studio lighting.\n2. Side profile close-up — pure 90-degree lateral view, head and shoulders, full silhouette readable.\n3. Full body reference shot — complete head-to-toe figure, arms slightly away from body, relaxed natural stance, full anatomy and costume visible."},
  {name:"Headshot",sx:-105,sy:0,p:"Generate a single headshot portrait — head and shoulders only, face centered, camera at eye level, professional studio framing. Clean single-panel output."},
  {name:"Half Body",sx:0,sy:-150,p:"Generate a single half-body shot — framed from the waist up, arms visible, clean studio framing. Single panel output."},
  {name:"Full Body Front",sx:-105,sy:-150,p:"Generate a single full-body front view — complete head-to-toe figure, arms slightly away from body, relaxed natural stance, camera at eye level. Single panel output."},
  {name:"Bust",sx:0,sy:-300,p:"Generate a single bust portrait — framed from the chest up, close and intimate, face and upper chest visible. Single panel output."},
  {name:"Full Body Walking",sx:-105,sy:-300,p:"Generate a single full-body dynamic walking pose — mid-stride, natural gait, full head-to-toe visible, slight forward motion implied. Single panel output."},
  {name:"Action Stance",sx:0,sy:-450,p:"Generate a single full-body action stance — wide combat-ready pose, knees slightly bent, arms engaged, dynamic energy. Single panel output."},
  {name:"Side Seated",sx:-105,sy:-450,p:"Generate a single side-profile seated pose — 90-degree lateral view, character seated, full silhouette readable, composed posture. Single panel output."},
  {name:"Back View",sx:0,sy:-600,p:"Generate a single full-body rear view — character facing away from camera, complete back silhouette visible from head to toe, natural stance. Single panel output."},
  {name:"Face Close-up",sx:-105,sy:-600,p:"Generate a single extreme face close-up — tight framing on the face only, from chin to top of forehead, no shoulders visible, maximum facial detail. Single panel output."},
];
const EYETYPE_SPRITES=[
  {name:"Human",sx:0,sy:0},{name:"Almond",sx:-100,sy:0},{name:"Wide",sx:-200,sy:0},
  {name:"Hooded",sx:-300,sy:0},{name:"Cat",sx:-400,sy:0},{name:"Dragon",sx:-500,sy:0},{name:"Compound",sx:-600,sy:0},
];
const LIPS_SPRITES=[
  {name:"Thin",sx:0,sy:0},{name:"Medium",sx:-100,sy:0},{name:"Full",sx:-200,sy:0},
  {name:"Wide",sx:-300,sy:0},{name:"Bow",sx:-400,sy:0},{name:"Downturned",sx:-500,sy:0},{name:"Scarred",sx:-600,sy:0},
];
const MARKINGS_SPRITES=[
  {name:"None",sx:0,sy:0},{name:"Tribal",sx:-100,sy:0},{name:"War Paint",sx:-200,sy:0},
  {name:"Runes",sx:-300,sy:0},{name:"Circuit",sx:-400,sy:0},{name:"Henna",sx:-500,sy:0},{name:"Skull",sx:-600,sy:0},
  {name:"Third Eye",sx:0,sy:-100},{name:"Elemental",sx:-100,sy:-100},{name:"Dragon Scale",sx:-200,sy:-100},
  {name:"Celestial",sx:-300,sy:-100},{name:"Clan Tattoo",sx:-400,sy:-100},{name:"Bioluminescent",sx:-500,sy:-100},
];
const HORNS_SPRITES=[
  {name:"None",sx:0,sy:0},{name:"Nubs",sx:-100,sy:0},{name:"Ram",sx:-200,sy:0},
  {name:"Bull",sx:-300,sy:0},{name:"Demon",sx:-400,sy:0},{name:"Antlers",sx:-500,sy:0},{name:"Unicorn",sx:-600,sy:0},
  {name:"Ibex",sx:0,sy:-100},{name:"Dragon",sx:-100,sy:-100},{name:"Crystal",sx:-200,sy:-100},
  {name:"Twisted",sx:-300,sy:-100},{name:"Crown",sx:-400,sy:-100},{name:"Bone Spikes",sx:-500,sy:-100},
];
const EARS_SPRITES=[
  {name:"Human",sx:0,sy:0},{name:"Elf",sx:-100,sy:0},{name:"Cat",sx:-200,sy:0},
  {name:"Wolf",sx:-300,sy:0},{name:"Bunny",sx:-400,sy:0},{name:"Demon",sx:-500,sy:0},{name:"None",sx:-600,sy:0},
];
const SKINTRAIT_SPRITES=[
  {name:"None",label:"None",sx:0,sy:0},
  {name:"Freckles",label:"Freckles",sx:-100,sy:0},
  {name:"Vitiligo",label:"Vitiligo",sx:-200,sy:0},
  {name:"Scars",label:"Scars",sx:-300,sy:0},
  {name:"Tattoos",label:"Tattoos",sx:-400,sy:0},
  {name:"Branding",label:"Branding",sx:-500,sy:0},
  {name:"Piercings",label:"Piercings",sx:-600,sy:0},
  {name:"Bioluminescence",label:"Bioluminescent",sx:0,sy:-98},
  {name:"Fur",label:"Fur",sx:-100,sy:-98},
  {name:"Scales",label:"Scales",sx:-200,sy:-98},
  {name:"Feathers",label:"Feathers",sx:-300,sy:-98},
  {name:"Cracked Stone",label:"Cracked Stone",sx:-400,sy:-98},
  {name:"Metallic",label:"Metallic",sx:-500,sy:-98},
];
const SKIN_SPRITES=[
  {name:"Porcelain",label:"Porcelain",sx:0,sy:0},
  {name:"Fair",label:"Fair",sx:-100,sy:0},
  {name:"Light",label:"Light",sx:-200,sy:0},
  {name:"Olive",label:"Olive",sx:-300,sy:0},
  {name:"Tan",label:"Tan",sx:-400,sy:0},
  {name:"Brown",label:"Brown",sx:-500,sy:0},
  {name:"Dark",label:"Dark",sx:-600,sy:0},
  {name:"Ebony",label:"Ebony",sx:0,sy:-98},
  {name:"Grey",label:"Grey",sx:-100,sy:-98},
  {name:"Blue",label:"Blue",sx:-200,sy:-98},
  {name:"Green",label:"Green",sx:-300,sy:-98},
  {name:"Gold",label:"Gold",sx:-400,sy:-98},
  {name:"Silver",label:"Silver",sx:-500,sy:-98},
];
const EYE_SPRITES=[
  {name:"Black",         sx:0,    sy:0},
  {name:"Blue",          sx:-100, sy:0},
  {name:"Brown",         sx:-200, sy:0},
  {name:"Green",         sx:-300, sy:0},
  {name:"Grey",          sx:-400, sy:0},
  {name:"Hazel",         sx:-500, sy:0},
  {name:"Violet",        sx:-600, sy:0},
  {name:"Red",           sx:0,    sy:-100},
  {name:"Amber",         sx:-100, sy:-100},
  {name:"White",         sx:-200, sy:-100},
  {name:"Heterochromia", sx:-300, sy:-100},
  {name:"Glowing",       sx:-400, sy:-100},
  {name:"Blind",         sx:-500, sy:-100},
];
const GENDER_SPRITES=[
  {name:"Female",     sx:0,    sy:0},
  {name:"Male",       sx:-100, sy:0},
  {name:"Non-binary", sx:-200, sy:0},
  {name:"Androgynous",sx:-300, sy:0},
  {name:"Trans Woman",sx:-400, sy:0},
  {name:"Trans Man",  sx:-500, sy:0},
];
const AGE_SPRITES=[
  {name:"Toddler",  sx:0,    sy:0},
  {name:"Teenager", sx:-100, sy:0},
  {name:"Adult",    sx:-200, sy:0},
  {name:"Mature",   sx:-300, sy:0},
  {name:"Senior",   sx:-400, sy:0},
];
const BODY_SPRITES=[
  {name:"Slim",      sx:0,    sy:0},
  {name:"Athletic",  sx:-100, sy:0},
  {name:"Soft",      sx:-200, sy:0},
  {name:"Muscular",  sx:-300, sy:0},
  {name:"Curvy",     sx:-400, sy:0},
  {name:"Skinny",    sx:0,    sy:-100},
  {name:"Stocky",    sx:-100, sy:-100},
  {name:"Tall",      sx:-200, sy:-100},
  {name:"Short",     sx:-300, sy:-100},
  {name:"Proportioned",sx:-400,sy:-100},
];
const HAIR_SPRITES=[
  {name:"Bald",        sx:0,    sy:0},
  {name:"Buzzcut",     sx:-100, sy:0},
  {name:"Short",       sx:-200, sy:0},
  {name:"Long",        sx:-300, sy:0},
  {name:"Afro",        sx:0,    sy:-100},
  {name:"Dreadlocks",  sx:-100, sy:-100},
  {name:"Cornrows",    sx:-200, sy:-100},
  {name:"Ponytail",    sx:-300, sy:-100},
  {name:"Mohawk",      sx:0,    sy:-200},
  {name:"Snakes",      sx:-100, sy:-200},
  {name:"Tentacles",   sx:-200, sy:-200},
  {name:"Fiber Optic", sx:-300, sy:-200},
];
const AV_FIELDS={
  universe:[
    {id:"realism",l:"Photorealism",desc:"Ultra-detailed photography",color:"#1a2332"},
    {id:"anime",l:"Anime",desc:"Japanese animation style",color:"#2d1b4e"},
    {id:"3d",l:"3D Render",desc:"CGI stylized",color:"#1a2f1a"},
    {id:"2d",l:"Vector Art",desc:"Flat illustration",color:"#3d2818"},
    {id:"pixel",l:"Pixel Art",desc:"Retro 8/16-bit",color:"#2d1b2d"},
    {id:"oil",l:"Oil Painting",desc:"Classical fine art",color:"#2d2518"},
  ],
  race:[
    {name:"Human",     sx:0,    sy:0},
    {name:"Elf",       sx:-100, sy:0},
    {name:"Dwarf",     sx:-200, sy:0},
    {name:"Orc",       sx:-300, sy:0},
    {name:"Fairy",     sx:-400, sy:0},
    {name:"Demon",     sx:-500, sy:0},
    {name:"Angel",     sx:-600, sy:0},
    {name:"Robot",     sx:-700, sy:0},
    {name:"Alien",     sx:0,    sy:-99},
    {name:"Beastkin",  sx:-100, sy:-99},
    {name:"Vampire",   sx:-200, sy:-99},
    {name:"Merfolk",   sx:-300, sy:-99},
    {name:"Dragonkin", sx:-400, sy:-99},
    {name:"Cyborg",    sx:-500, sy:-99},
    {name:"Ghost",     sx:-600, sy:-99},
    {name:"Elemental", sx:-700, sy:-99},
  ],
  gender:["Female","Male","Non-binary","Androgynous","Gender-fluid","Masculine","Feminine"],
  region:["Northern European","Mediterranean","East Asian","South Asian","Sub-Saharan African","North African","Middle Eastern","Latin American","Indigenous American","Polynesian","Slavic","Nordic","Celtic","Mixed Heritage"],
  eyeColor:["Amber","Blue","Brown","Green","Grey","Hazel","Violet","Red","Black","White","Heterochromia","Glowing","Blind/Clouded"],
  age:["Infant","Child","Teen","Young Adult","Adult","Middle Aged","Elder","Ancient","Ageless"],
  skinColor:["Porcelain","Fair","Light","Olive","Tan","Brown","Dark","Ebony","Grey","Blue","Green","Gold","Silver","Transparent"],
  skinTraits:["None","Freckles","Vitiligo","Scars","Tattoos","Branding","Piercings","Bioluminescence","Fur","Scales","Feathers","Cracked Stone","Metallic"],
  hair:["Bald","Buzz Cut","Short","Medium","Long","Very Long","Afro","Dreadlocks","Braided","Ponytail","Bun","Mohawk","Spiky","Wavy","Curly","Coily","Undercut","Pompadour","Mullet"], // sprite
  eyeType:["Human","Almond","Round","Hooded","Monolid","Deep-set","Cat-like","Snake-like","Insect compound","One-eyed","Third eye","Glowing","Blindfolded"],
  lips:["Thin","Medium","Full","Heart-shaped","Wide","Cleft lip","No lips"],
  markings:["None","Freckles","Beauty marks","Birthmarks","Scars","Tribal tattoos","Geometric tattoos","Floral tattoos","Piercings","Scarification","Cybernetic implants","Magic runes"],
  horns:["None","Small nubs","Medium curved","Large curled","Ram horns","Antlers","Unicorn","Multiple","Broken","Decorated","Glowing"],
  bodyType:["Slim","Athletic","Soft","Muscular","Curvy","Skinny","Stocky","Tall","Short","Proportioned"], // sprite
  arm:["Natural","Prosthetic (steampunk)","Prosthetic (cybernetic)","No arm","Extra arms","Tentacles","Animal (furry)","Animal (scaly)","Ghostly","Mechanical claws"],
  leg:["Natural","Prosthetic","Digitigrade (animal)","No legs (floating)","Snake tail","Mermaid tail","Extra legs","Wheels","Mechanical","Hooves"],
  wings:["None","Feathered (bird)","Leathery (bat)","Butterfly","Dragonfly","Energy/Abstract","Mechanical","Small (decorative)","Multiple pairs","Broken/tattered"],
  tail:["None","Cat","Wolf","Reptile","Demon (spade)","Fish","Fox (fluffy)","Dragon","Scorpion","Feathered","Energy","Mechanical"],
  ears:["Human","Pointed (elf)","Cat","Dog","Rabbit","Long (elf)","Broad (orc)","Fin (merfolk)","Multiple","Cyborg","Decorated"],
  expression:["Neutral","Subtle Smile","Focused","Composed","Wry Smirk","Happy","Calm","Skeptical","Stern","Grimace","Shocked","Worried","Surprised","Tense","Playful","Winking","Sad","Amazed","Joyful","Pensive","Smirking","Startled","Horrified","Intense","Serene"],
  clothing:[
    "Neutral (studio reference)",
    "Modern Casual",
    "Formal / Business",
    "Fantasy Armor",
    "Sci-Fi Suit",
    "Traditional / Cultural",
    "Streetwear",
    "Robes / Wizard",
    "Military / Tactical",
    "None",
  ],
};
const UNI_STYLE={
  realism:"Photorealistic professional studio photography, ultra high resolution, realistic skin texture with pore detail, accurate light physics and subsurface scattering",
  anime:"High quality anime illustration, clean sharp line art with variable weight, cel shading with soft gradients, vibrant color palette, detailed eyes with multiple highlights",
  "3d":"Stylized 3D animated film character render, subsurface skin scattering, global illumination, physically based rendering, smooth subdivision surfaces",
  "2d":"Flat 2D vector illustration, bold thick outlines, simplified geometric shapes, limited color palette, graphic design aesthetic",
  pixel:"Detailed pixel art, dithering techniques, limited but expressive color palette, 16-bit era inspired, anti-aliased edges",
  oil:"Classical oil painting technique, visible brushstrokes, impasto texture, chiaroscuro lighting, Dutch Golden Age composition"
};
const REGION_FULL={"N.European":"Northern European","Mediterranean":"Mediterranean","East Asian":"East Asian","S.Asian":"South Asian","African":"Sub-Saharan African","N.African":"North African","Middle Eastern":"Middle Eastern","Latin American":"Latin American","Indigenous":"Indigenous American","Polynesian":"Polynesian","Slavic":"Slavic","Nordic":"Nordic","Celtic":"Celtic","Mixed":"Mixed Heritage"};
const AV_DEF={
  universe:"realism",race:"Human",gender:"Female",region:"N.European",eyeColor:"Blue",age:"Adult",
  skinColor:"Fair",skinTraits:"None",hair:"Long",eyeType:"Human",lips:"Medium",markings:"None",expression:"Neutral",
  horns:"None",bodyType:"Athletic",lArm:"Natural",rArm:"Natural",lLeg:"Natural",rLeg:"Natural",
  wings:"None",tail:"None",ears:"Human",clothing:"Neutral (studio reference)",details:"",
  avLight:"",avEnv:"",avLens:"",avAspect:"16:9",avLayout:"Style Sheet"
};

// ─── AVATAR PAGE ──────────────────────────────────────────────────────────────
const Sec=({title,children,badge})=>(
  <div className="av-sec">
    <div className="sh" style={{marginBottom:14}}>
      <span className="st">{title}</span>
      {badge&&<span className="sb">{badge}</span>}
    </div>
    {children}
  </div>
);

const Opts=({opts,stateKey,val,onSet})=>(
  <div className="optbtns">
    {opts.map(o=>(
      <button key={o} className={`ob${val===o?" sel":""}`} onClick={()=>onSet(stateKey,o)}>{o}</button>
    ))}
  </div>
);

function AvatarsPage(){
  const[c,setC]=useState(AV_DEF);
    const[iTab,setITab]=useState("universe");
  const[fTab,setFTab]=useState("hair");
  const[bTab,setBTab]=useState("bodyType");
  const[toast,setToast]=useState("");
  const[mode,setMode]=useState("scratch"); // "scratch" | "photo"
  const set=(k,v)=>setC(p=>({...p,[k]:v}));
  const[enhancing,setEnhancing]=useState(false);
  const[enhanced,setEnhanced]=useState("");
  const[showAuthModal,setShowAuthModal]=useState(false);
  
  const{user}=React.useContext(AuthCtx);

  const buildAvPrompt=()=>{
    const style=UNI_STYLE[c.universe]||UNI_STYLE.realism;
    const faceAdv=` Eye type: ${c.eyeType.toLowerCase()}. Lips: ${c.lips.toLowerCase()}. Face markings: ${c.markings.toLowerCase()}. Horns: ${c.horns.toLowerCase()}.`;
    const traits=c.skinTraits!=="None"?` Surface traits: ${c.skinTraits.toLowerCase()}.`:"";
    const clothesParts=c.clothing;
    const clothesPrompt=c.clothing==="Neutral (studio reference)"?"Wearing a minimal neutral black fitted top and black shorts, studio reference attire, no branding. Barefoot.":c.clothing==="None"?"Wearing a minimal swimsuit, tasteful studio reference pose, professional photography.":"Wearing "+c.clothing.toLowerCase()+" attire appropriate to the character's anatomy, age, body type, race, and universe style.";
    const parts=[];
    const isMultiPanel=c.avLayout==="Style Sheet";

    // 1. GOAL — what AI must produce, format first
    const goalPrefix=mode==="photo"
      ?"Use the attached reference photo as the identity base for this character. Extract and preserve the exact face structure, skin tone, and distinctive facial features from the photo. Apply the selected traits below as modifications or additions on top of this reference identity. Do not change the face — only apply the style, body, and trait modifications."
      :"Generate a completely original character from scratch based only on the selections below.";
    const layoutObj=LAYOUT_SPRITES.find(l=>l.name===c.avLayout)||LAYOUT_SPRITES[0];
    const consistencyText=isMultiPanel
      ?" All panels must depict the exact same character with identical anatomy, skin color, surface traits, facial structure, wardrobe, and physical proportions. Do not alter identity, age, gender, body type, costume details, or non-human features between panels. Maintain strict character consistency across all frames."
      :"";
    parts.push(goalPrefix+"\n\n"+layoutObj.p+consistencyText);

    // 3. Universe / art style
    parts.push(style+".");

    // 4. Character identity
    parts.push(
      "Character: "+c.race.toLowerCase()+", "+c.gender.toLowerCase()+", "+(REGION_FULL[c.region]||c.region).toLowerCase()+" heritage, "+c.age.toLowerCase()+". "+
      "Facial expression: "+c.expression.toLowerCase()+"."
    );

    // 5. Body structure
    parts.push(
      "Body structure: Body type: "+c.bodyType.toLowerCase()+". "+
      "Left arm: "+c.lArm.toLowerCase()+". Right arm: "+c.rArm.toLowerCase()+". "+
      "Left leg: "+c.lLeg.toLowerCase()+". Right leg: "+c.rLeg.toLowerCase()+". "+
      "Wings: "+c.wings.toLowerCase()+". Tail: "+c.tail.toLowerCase()+". Ears: "+c.ears.toLowerCase()+"."
    );

    // 6. Skin and surface
    parts.push("Skin and surface: "+c.skinColor.toLowerCase()+" skin."+traits);

    // 7. Facial features
    parts.push("Facial features: "+c.hair.toLowerCase()+" hair. "+c.eyeColor.toLowerCase()+" eyes."+faceAdv);

    // 8. Clothing
    parts.push(clothesPrompt);

    // 9. Additional details
    if(c.details)parts.push("Additional details: "+c.details);

    // 10. Technical output spec
    const avLightStr=c.avLight?"Lighting: "+c.avLight+".":"Lighting: soft even professional studio lighting"+(isMultiPanel?", consistent across all panels.":".");
    const avEnvStr=c.avEnv?"Background/Environment: "+c.avEnv+".":"Background: plain neutral grey studio background"+(isMultiPanel?" across all three panels.":".");
    const avLensStr=c.avLens?"Lens: "+c.avLens+".":"";
    const avAspectStr=c.avAspect&&c.avAspect!=="16:9"?"Aspect ratio: "+c.avAspect+".":"";
    const layoutSpec=isMultiPanel?"single 1x3 grid image":"single image";
    parts.push(
      [avEnvStr,avLightStr,avLensStr,avAspectStr].filter(Boolean).join(" ")+"\n"+
      "Output as a "+layoutSpec+". Ultra high resolution, sharp focus, physically accurate anatomy. "+
      "No text, captions, labels, UI elements, branding, or watermarks."
    );

    return parts.join("\n\n");
  };

  const prompt=buildAvPrompt();
  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2200)};
  const copy=async()=>{const ok=await copyText(enhanced||prompt);doToast(ok?"COPIED TO CLIPBOARD":"COPY FAILED — SELECT MANUALLY")};
  const enhance=async()=>{
    if(!user){setShowAuthModal(true);return;}
    setEnhancing(true);setEnhanced("");
    try{
      const result=await callEnhance(prompt,c.details,user.idToken,null);
      setEnhanced(result);
      doToast("✦ ENHANCED BY GEMINI");
    }catch(e){
      if(e.status===401){setShowAuthModal(true);}
      else doToast("ERROR: "+e.message);
    }
    setEnhancing(false);
  };
  const surprise=()=>{
    try{
    const pick=a=>a[~~(Math.random()*a.length)];
    setC({
      universe:pick(AV_FIELDS.universe).id,
      race:pick(AV_FIELDS.race).name,
      gender:pick(GENDER_SPRITES).name,
      region:pick(REGION_SPRITES).name,
      eyeColor:pick(EYE_SPRITES).name,
      age:pick(AGE_SPRITES).name,
      skinColor:pick(SKIN_SPRITES).name,
      skinTraits:pick(SKINTRAIT_SPRITES).name,
      hair:pick(HAIR_SPRITES).name,
      eyeType:pick(EYETYPE_SPRITES).name,
      lips:pick(LIPS_SPRITES).name,
      markings:pick(MARKINGS_SPRITES).name,
      horns:pick(HORNS_SPRITES).name,
      bodyType:pick(BODY_SPRITES).name,
      lArm:pick(LARM_SPRITES).name,
      rArm:pick(RARM_SPRITES).name,
      lLeg:pick(LLEG_SPRITES).name,
      rLeg:pick(RLEG_SPRITES).name,
      wings:pick(WINGS_SPRITES).name,
      tail:pick(TAIL_SPRITES).name,
      ears:pick(EARS_SPRITES).name,
      expression:pick(EXPRESSION_SPRITES).name,
      clothing:pick(CLOTHING_SPRITES).id,
      details:"",avLight:"",avEnv:"",avLens:"",avAspect:"16:9",avLayout:"Style Sheet"
    });
    doToast("SURPRISE CHARACTER GENERATED");
    }catch(err){doToast("ERROR: "+err.message);}
  };

  const isDirty=k=>{
    const nd={skinTraits:"None",markings:"None",horns:"None",wings:"None",tail:"None",eyeType:"Human",ears:"Human"};
    const def=nd[k]!==undefined?nd[k]:AV_DEF[k];
    return c[k]&&c[k]!==def;
  };

  // ── FIXED: using children instead of ch prop ──


  return(
    <div className="page">
      <div className="ph">
        <div className="pt">Character <b>Sheet</b></div>
        <div className="ps">Character reference sheet prompt builder with detailed anatomy and style controls</div>
      </div>

      <div style={{display:"flex",gap:0,marginBottom:28,borderRadius:10,overflow:"hidden",border:"1px solid var(--bd)",width:"fit-content"}}>
        <button onClick={()=>setMode("scratch")} style={{padding:"10px 24px",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",border:"none",background:mode==="scratch"?"#e8780a":"var(--s1)",color:mode==="scratch"?"#000":"var(--t)",transition:"all .2s"}}>
          ✦ Create from scratch
        </button>
        <button onClick={()=>setMode("photo")} style={{padding:"10px 24px",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",border:"none",borderLeft:"1px solid var(--bd)",background:mode==="photo"?"#e8780a":"var(--s1)",color:mode==="photo"?"#000":"var(--t)",transition:"all .2s"}}>
          ⊕ From reference photo
        </button>
      </div>
      {mode==="photo"&&(
        <div style={{background:"var(--s1)",border:"1px solid var(--bd)",borderRadius:10,padding:"16px 20px",marginBottom:28,fontSize:13,color:"var(--t)",lineHeight:1.7}}>
          <span style={{color:"#e8780a",fontWeight:700}}>↑ Attach your reference photo</span> to the message when pasting this prompt into your AI image generator. The prompt will instruct the AI to use it as the identity base and apply your selected traits as modifications.
        </div>
      )}

      <Sec title="Identity">
        <div className="tab-strip">
          {[["universe","Universe"],["race","Race"],["gender","Gender"],["region","Region"],["eyeColor","Eye Color"],["age","Age"],["skinColor","Skin Color"],["skinTraits","Skin Traits"],["expression","Expression"]].map(([k,l])=>(
            <button key={k} className={`tab-p${iTab===k?" on":""}`} onClick={()=>setITab(k)}>
              {l}{isDirty(k)&&<span className="tab-dot"/>}
            </button>
          ))}
        </div>
        {iTab==="universe"?(
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {UNIVERSE_SPRITES.map(r=>(
              <div key={r.id} onClick={()=>set("universe",r.id)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.universe===r.id?"#e8780a":"var(--bd)"),
                  boxShadow:c.universe===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:98,
                  backgroundImage:"url(/universe.png)",
                  backgroundSize:"600px 98px",
                  backgroundPosition:r.sx+"px 0px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.universe===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        ):iTab==="race"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {AV_FIELDS.race.map(r=>(
              <div key={r.name} onClick={()=>set("race",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.race===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.race===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{
                  width:100,height:99,
                  backgroundImage:"url(/race.png)",
                  backgroundSize:"800px 198px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.race===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :iTab==="gender"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {GENDER_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("gender",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.gender===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.gender===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/gender.png)",
                  backgroundSize:"601px 98px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.gender===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :iTab==="region"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {REGION_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("region",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.region===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.region===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/region.png)",
                  backgroundSize:"701px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.region===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :iTab==="eyeColor"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {EYE_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("eyeColor",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.eyeColor===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.eyeColor===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/eyes.png)",
                  backgroundSize:"701px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.eyeColor===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :iTab==="age"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {AGE_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("age",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.age===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.age===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/age.png)",
                  backgroundSize:"500px 100px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.age===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :iTab==="skinColor"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {SKIN_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("skinColor",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.skinColor===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.skinColor===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:98,
                  backgroundImage:"url(/skin.png)",
                  backgroundSize:"700px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.skinColor===r.name?"#e8780a":"var(--t)"}}>{r.label}</div>
              </div>
            ))}
          </div>
        )
        :iTab==="expression"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {EXPRESSION_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("expression",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.expression===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.expression===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/expression.png)",
                  backgroundSize:"500px 500px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.expression===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :(<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {SKINTRAIT_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("skinTraits",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.skinTraits===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.skinTraits===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:98,
                  backgroundImage:"url(/skintraits.png)",
                  backgroundSize:"700px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.skinTraits===r.name?"#e8780a":"var(--t)"}}>{r.label}</div>
              </div>
            ))}
          </div>
        )}
      </Sec>


        <Sec title="Face Details">
          <div className="tab-strip">
            {[["hair","Hair"],["eyeType","Eye Type"],["lips","Lips"],["markings","Markings"],["horns","Horns"]].map(([k,l])=>(
              <button key={k} className={`tab-p${fTab===k?" on":""}`} onClick={()=>setFTab(k)}>
                {l}{isDirty(k)&&<span className="tab-dot"/>}
              </button>
            ))}
          </div>
          {fTab==="hair"?(
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {HAIR_SPRITES.map(r=>(
                <div key={r.name} onClick={()=>set("hair",r.name)}
                  style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                    border:"2px solid "+(c.hair===r.name?"#e8780a":"var(--bd)"),
                    boxShadow:c.hair===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                    transition:"all .15s",width:100}}>
                  <div style={{width:100,height:100,
                    backgroundImage:"url(/hair.png)",
                    backgroundSize:"400px 301px",
                    backgroundPosition:r.sx+"px "+r.sy+"px",
                    backgroundRepeat:"no-repeat"}}/>
                  <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                    color:c.hair===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
                </div>
              ))}
            </div>
          )
          :fTab==="eyeType"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {EYETYPE_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("eyeType",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.eyeType===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.eyeType===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/eyetype.png)",
                  backgroundSize:"702px 100px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.eyeType===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
          :fTab==="lips"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {LIPS_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("lips",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.lips===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.lips===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/lips.png)",
                  backgroundSize:"702px 100px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.lips===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
          :fTab==="markings"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {MARKINGS_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("markings",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.markings===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.markings===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/markings.png)",
                  backgroundSize:"701px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.markings===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
          :(<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {HORNS_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("horns",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.horns===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.horns===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/horns.png)",
                  backgroundSize:"701px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.horns===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )}
        </Sec>

      <Sec title="Body Structure">
        <div className="tab-strip">
          {[["bodyType","Body Type"],["lArm","L Arm"],["rArm","R Arm"],["lLeg","L Leg"],["rLeg","R Leg"],["wings","Wings"],["tail","Tail"],["ears","Ears"]].map(([k,l])=>(
            <button key={k} className={`tab-p${bTab===k?" on":""}`} onClick={()=>setBTab(k)}>
              {l}{isDirty(k)&&<span className="tab-dot"/>}
            </button>
          ))}
        </div>
        {bTab==="bodyType"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {BODY_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("bodyType",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.bodyType===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.bodyType===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/body.png)",
                  backgroundSize:"501px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.bodyType===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :bTab==="lArm"?<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LARM_SPRITES.map(r=>(
            <div key={r.name} onClick={()=>set("lArm",r.name)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(c.lArm===r.name?"#e8780a":"var(--bd)"),
                boxShadow:c.lArm===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:100}}>
              <div style={{width:100,height:100,
                backgroundImage:"url(/arms.png)",
                backgroundSize:"600px 600px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>  
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:10,fontWeight:600,
                color:c.lArm===r.name?"#e8780a":"var(--t)",lineHeight:1.2}}>{r.name}</div>
            </div>
          ))}
        </div>
        :bTab==="rArm"?<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {RARM_SPRITES.map(r=>(
            <div key={r.name} onClick={()=>set("rArm",r.name)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(c.rArm===r.name?"#e8780a":"var(--bd)"),
                boxShadow:c.rArm===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:100}}>
              <div style={{width:100,height:100,
                backgroundImage:"url(/arms.png)",
                backgroundSize:"600px 600px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>  









              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:10,fontWeight:600,
                color:c.rArm===r.name?"#e8780a":"var(--t)",lineHeight:1.2}}>{r.name}</div>
            </div>
          ))}
        </div>
        :bTab==="lLeg"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {LLEG_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("lLeg",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.lLeg===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.lLeg===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:85}}>
                <div style={{width:85,height:128,
                  backgroundImage:"url(/legs.png)",
                  backgroundSize:"512px 512px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,
                  color:c.lLeg===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        ):bTab==="rLeg"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {RLEG_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("rLeg",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.rLeg===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.rLeg===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:85}}>
                <div style={{width:85,height:128,
                  backgroundImage:"url(/legs.png)",
                  backgroundSize:"512px 512px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,
                  color:c.rLeg===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :bTab==="wings"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {WINGS_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("wings",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.wings===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.wings===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/wings.png)",
                  backgroundSize:"701px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.wings===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :bTab==="tail"?(
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {TAIL_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("tail",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.tail===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.tail===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/tail.png)",
                  backgroundSize:"701px 200px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.tail===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )
        :(<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {EARS_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("ears",r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.ears===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.ears===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:100}}>
                <div style={{width:100,height:100,
                  backgroundImage:"url(/ears.png)",
                  backgroundSize:"702px 100px",
                  backgroundPosition:r.sx+"px "+r.sy+"px",
                  backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                  color:c.ears===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        )}
      </Sec>

      <Sec title="Clothing">
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {CLOTHING_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>set("clothing",r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(c.clothing===r.id?"#e8780a":"var(--bd)"),
                boxShadow:c.clothing===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:120}}>
              <div style={{width:120,height:167,
                backgroundImage:"url(/clothing.png)",
                backgroundSize:"600px 335px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,
                color:c.clothing===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Output Layout">
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LAYOUT_SPRITES.map(r=>(
            <div key={r.name} onClick={()=>set("avLayout",r.name)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(c.avLayout===r.name?"#e8780a":"var(--bd)"),
                boxShadow:c.avLayout===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:105}}>
              <div style={{width:105,height:150,
                backgroundImage:"url(/layout.png)",
                backgroundSize:"211px 750px",
                backgroundPosition:r.sx+"px "+r.sy+"px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:10,fontWeight:600,
                color:c.avLayout===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Background &amp; Lighting" badge="OPTIONAL">
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:"var(--t)",marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Lighting</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {LIGHT_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("avLight",c.avLight===r.name?"":r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.avLight===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.avLight===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:150}}>
                <div style={{width:150,height:105,backgroundImage:"url(/lighting.png)",backgroundSize:"750px 315px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:c.avLight===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:"var(--t)",marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Environment / Background</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {ENV_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("avEnv",c.avEnv===r.name?"":r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.avEnv===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.avEnv===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:133}}>
                <div style={{width:133,height:112,backgroundImage:"url(/environment.png)",backgroundSize:"798px 336px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:c.avEnv===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:"var(--t)",marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Lens / Focal Length</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {LENS_SPRITES.map(r=>(
              <div key={r.name} onClick={()=>set("avLens",c.avLens===r.name?"":r.name)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.avLens===r.name?"#e8780a":"var(--bd)"),
                  boxShadow:c.avLens===r.name?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:150}}>
                <div style={{width:150,height:83,backgroundImage:"url(/lens.png)",backgroundSize:"600px 332px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:c.avLens===r.name?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:11,color:"var(--t)",marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Aspect Ratio</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            {FORMAT_SPRITES.map(r=>(
              <div key={r.id} onClick={()=>set("avAspect",r.id)}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                  border:"2px solid "+(c.avAspect===r.id?"#e8780a":"var(--bd)"),
                  boxShadow:c.avAspect===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"all .15s",width:r.fw,
                  display:"flex",flexDirection:"column",alignItems:"center",
                  padding:"10px 8px",background:"var(--s1)",gap:6}}>
                <div style={{width:80,height:80,flexShrink:0,backgroundImage:"url(/format.png)",backgroundSize:"400px 80px",backgroundPosition:r.sx+"px 0px",backgroundRepeat:"no-repeat"}}/>
                <div style={{fontSize:11,fontWeight:600,color:c.avAspect===r.id?"#e8780a":"var(--t)"}}>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      <Sec title="Additional Details" badge="OPTIONAL">
        <textarea rows={3} value={c.details} onChange={e=>{set("details",e.target.value);setEnhanced("");}} placeholder="Enhancement hints for Gemini AI — e.g. 'more dramatic lighting', 'add forest background', 'make it dark fantasy'. Also appended to base prompt as-is."/>
      </Sec>

      <div className="sec">
        <div className="sh"><span className="st">Generated Prompt</span><span className="sb">LIVE</span></div>
        <div className="pbox live" style={{fontSize:11}}>{enhanced||prompt}</div>
        {enhanced&&(
          <div style={{marginTop:8,fontSize:11,color:"var(--acc)",fontWeight:600,letterSpacing:1}}>
            ✦ Enhanced by Gemini — <button onClick={()=>setEnhanced("")} style={{background:"none",border:"none",color:"var(--t4)",fontSize:11,cursor:"pointer",textDecoration:"underline"}}>revert to original</button>
          </div>
        )}
        <div className="pbar">
          <button className="btn" onClick={()=>{setC(AV_DEF);setEnhanced("");setITab("universe");setFTab("hair");setBTab("bodyType");doToast("RESET");}}>Reset</button>
          <button className="btn" onClick={surprise}>Surprise Me</button>
          <button className="btn" onClick={enhance} disabled={enhancing}
            style={{borderColor:enhancing?"var(--bd)":"var(--acc)",color:enhancing?"var(--t4)":"var(--acc)",background:"var(--acdim)"}}>
            {enhancing?"ENHANCING…":"✦ Enhance"}
          </button>
          <button className="btn pri" onClick={copy}>Copy Prompt</button>
        </div>
        <GenWithLinks getPrompt={()=>enhanced||prompt} onCopy={()=>doToast("PROMPT COPIED — PASTE IN TARGET APP")}/>
      </div>

      {showAuthModal&&<AuthModal onClose={()=>setShowAuthModal(false)} />}
      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

// ─── VIDEO PROMPT PAGE ────────────────────────────────────────────────────────
const VP_CAM_MOVES=["Static","Slow Push In","Pull Out","Pan Left","Pan Right","Tilt Up","Tilt Down","Orbit Subject","Crane Up","Handheld Drift","Drone Flyover","Dutch Tilt"];
const VP_PACING_OPTS=["Slow & Deliberate","Normal Flow","Fast Cuts","Rhythmic Match","Montage","Single Take"];
const VP_DURATION=["3s","5s","8s","10s","15s","30s"];
const VP_SOUND=["Silent","Ambient Sound","Music Driven","Dialogue","Natural Sound","Score"];
const VP_STYLE_OPTS=["Cinematic","Documentary","Commercial","Music Video","Horror","Action","Romantic","Sci-Fi","Fantasy","Noir","Nature","Animation Style"];
const VID_GEN_TARGETS=[
  {label:"Sora",url:"https://sora.com",icon:"◉"},
  {label:"Runway",url:"https://runwayml.com",icon:"▶"},
  {label:"Kling",url:"https://klingai.com",icon:"◆"},
  {label:"Pika",url:"https://pika.art",icon:"⚡"},
];
const FRAME_GEN_TARGETS=[
  {label:"Grok Imagine",url:"https://grok.com/imagine",icon:"✦"},
  {label:"Gemini",url:"https://gemini.google.com",icon:"◈"},
  {label:"Arena.ai",url:"https://arena.ai/?mode=direct&chat-modality=image",icon:"⊕"},
];

function buildVideoPrompt({scene,firstFrame,lastFrame,camMove,pacing,duration,sound,lighting,colorGrade,lens,filmStock,style,custom}){
  if(!scene.trim()&&!firstFrame.trim()&&!lastFrame.trim())return"";
  const parts=[];
  if(scene.trim())parts.push(scene.trim()+".");
  if(firstFrame.trim())parts.push(`Opens on: ${firstFrame.trim()}.`);
  if(lastFrame.trim())parts.push(`Ends with: ${lastFrame.trim()}.`);
  const cam=[];
  if(camMove&&camMove!=="Static")cam.push(camMove.toLowerCase()+" camera movement");
  if(lens){const l=LENSES.find(x=>x.mm===lens);if(l)cam.push(l.mm+" lens");}
  if(cam.length)parts.push("Camera: "+cam.join(", ")+".");
  const vis=[];
  if(lighting){const l=LIGHTING.find(x=>x.id===lighting);if(l)vis.push(l.name.toLowerCase()+" lighting");}
  if(colorGrade){const c=COLOR_GRADES.find(x=>x.id===colorGrade);if(c)vis.push(c.name.toLowerCase()+" color grade");}
  if(filmStock){const f=FILM_STOCKS.find(x=>x.id===filmStock);if(f)vis.push(f.name.toLowerCase()+" film stock");}
  if(vis.length)parts.push("Visual: "+vis.join(", ")+".");
  const rhythm=[];
  if(pacing)rhythm.push(pacing.toLowerCase()+" pacing");
  if(duration)rhythm.push(duration+" duration");
  if(sound&&sound!=="Silent")rhythm.push(sound.toLowerCase());
  if(rhythm.length)parts.push("Rhythm: "+rhythm.join(", ")+".");
  if(style)parts.push("Style: "+style.toLowerCase()+".");
  if(custom.trim())parts.push(custom.trim());
  return parts.join(" ");
}

function buildFramePrompt(frameDesc,{lighting,colorGrade,lens,filmStock,style}){
  if(!frameDesc.trim())return"";
  const vis=[];
  if(lighting){const l=LIGHTING.find(x=>x.id===lighting);if(l)vis.push(l.name.toLowerCase()+" lighting");}
  if(colorGrade){const c=COLOR_GRADES.find(x=>x.id===colorGrade);if(c)vis.push(c.name.toLowerCase()+" color");}
  if(filmStock){const f=FILM_STOCKS.find(x=>x.id===filmStock);if(f)vis.push(f.name.toLowerCase()+" film look");}
  if(lens)vis.push(lens+" lens");
  if(style)vis.push(style.toLowerCase()+" style");
  return frameDesc.trim()+(vis.length?". "+vis.join(", ")+".":"");
}

function VideoPromptPage(){
  const[scene,setScene]=useState("");
  const[firstFrame,setFirstFrame]=useState("");
  const[lastFrame,setLastFrame]=useState("");
  const[camMove,setCamMove]=useState("Static");
  const[pacing,setPacing]=useState("Normal Flow");
  const[duration,setDuration]=useState("8s");
  const[sound,setSound]=useState("Ambient Sound");
  const[style,setStyle]=useState("Cinematic");
  const[lighting,setLighting]=useState(null);
  const[colorGrade,setColorGrade]=useState(null);
  const[lens,setLens]=useState(null);
  const[filmStock,setFilmStock]=useState(null);
  const[custom,setCustom]=useState("");
  const[toast,setToast]=useState("");
  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2500)};

  const vparams={scene,firstFrame,lastFrame,camMove,pacing,duration,sound,lighting,colorGrade,lens,filmStock,style,custom};
  const prompt=buildVideoPrompt(vparams);
  const hasAny=!!(scene.trim()||firstFrame.trim()||lastFrame.trim());

  const copy=async()=>{const ok=await copyText(prompt);doToast(ok?"COPIED":"COPY FAILED");};
  const reset=()=>{setScene("");setFirstFrame("");setLastFrame("");setCamMove("Static");setPacing("Normal Flow");setDuration("8s");setSound("Ambient Sound");setStyle("Cinematic");setLighting(null);setColorGrade(null);setLens(null);setFilmStock(null);setCustom("");doToast("RESET");};
  const tog1=(setter,id)=>setter(p=>p===id?null:id);

  const ORow=({label,stateKey,val,onSet,opts})=>(
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t)"}}>{label}</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {opts.map(o=>(
          <button key={o} className={`ob${val===o?" sel":""}`} onClick={()=>onSet(stateKey,o)}>{o}</button>
        ))}
      </div>
    </div>
  );

  const setField=(key,val)=>{
    if(key==="camMove")setCamMove(val);
    else if(key==="pacing")setPacing(val);
    else if(key==="duration")setDuration(val);
    else if(key==="sound")setSound(val);
    else if(key==="style")setStyle(val);
  };

  return(
    <div className="page">
      <div className="ph">
        <div className="pt">🚧 Under <b>Construction</b></div>
        <div className="ps">Build cinematic video prompts for Sora, Runway, Kling and Pika. Define your scene, set first and last frames, pick visual style — generate separately.</div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Scene</span><span className="sb">CORE</span></div>
        <textarea rows={3} value={scene} onChange={e=>setScene(e.target.value)}
          placeholder="What happens in the video? e.g. A lone figure walks through a rain-soaked city street at night, neon reflections on the pavement..."/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,padding:"0 0 4px"}}>
        <div className="sec" style={{margin:0}}>
          <div className="sh"><span className="st">First Frame</span><span className="sb">OPENING</span></div>
          <textarea rows={3} value={firstFrame} onChange={e=>setFirstFrame(e.target.value)}
            placeholder="Opening shot description — used as image prompt for frame generation"/>
        </div>
        <div className="sec" style={{margin:0}}>
          <div className="sh"><span className="st">Last Frame</span><span className="sb">CLOSING</span></div>
          <textarea rows={3} value={lastFrame} onChange={e=>setLastFrame(e.target.value)}
            placeholder="Closing shot description — used as image prompt for frame generation"/>
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Camera & Motion</span></div>
        <ORow label="Camera Movement" stateKey="camMove" val={camMove} onSet={setField} opts={VP_CAM_MOVES}/>
        <div style={{marginTop:14}}>
          <ORow label="Duration" stateKey="duration" val={duration} onSet={setField} opts={VP_DURATION}/>
        </div>
        <div style={{marginTop:14}}>
          <ORow label="Pacing" stateKey="pacing" val={pacing} onSet={setField} opts={VP_PACING_OPTS}/>
        </div>
        <div style={{marginTop:14}}>
          <ORow label="Sound" stateKey="sound" val={sound} onSet={setField} opts={VP_SOUND}/>
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Visual Style</span></div>
        <ORow label="Style" stateKey="style" val={style} onSet={setField} opts={VP_STYLE_OPTS}/>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Lighting</span></div>
        <div className="sprite-grid">
          {LIGHTING.map(l=>(
            <div key={l.id} className={`scard${lighting===l.id?" sel":""}`} onClick={()=>tog1(setLighting,l.id)}>
              <div className="simg" style={{width:150,height:105,backgroundImage:`url(${l.src})`,backgroundSize:"750px 315px",backgroundPosition:`-${l.sx}px -${l.sy}px`}}/>
              <div className="slabel">{l.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Color Grade</span></div>
        <div className="sprite-grid">
          {COLOR_GRADES.map(c=>(
            <div key={c.id} className={`scard${colorGrade===c.id?" sel":""}`} onClick={()=>tog1(setColorGrade,c.id)}>
              <div className="simg" style={{width:150,height:167,backgroundImage:`url(${c.src})`,backgroundSize:"600px 334px",backgroundPosition:`-${c.sx}px -${c.sy}px`}}/>
              <div className="slabel">{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Lens</span></div>
        <div className="sprite-grid">
          {LENSES.map(l=>(
            <div key={l.mm} className={`scard${lens===l.mm?" sel":""}`} onClick={()=>tog1(setLens,l.mm)}>
              <div className="simg" style={{width:150,height:83,backgroundImage:`url(${l.src})`,backgroundSize:"600px 332px",backgroundPosition:`-${l.sx}px -${l.sy}px`}}/>
              <div className="slabel">{l.mm}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Film Stock</span></div>
        <div className="sprite-grid">
          {FILM_STOCKS.map(f=>(
            <div key={f.id} className={`scard${filmStock===f.id?" sel":""}`} onClick={()=>tog1(setFilmStock,f.id)}>
              <div className="simg" style={{width:150,height:167,backgroundImage:`url(${f.src})`,backgroundSize:"600px 334px",backgroundPosition:`-${f.sx}px -${f.sy}px`}}/>
              <div className="slabel">{f.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Custom Additions</span><span className="sb">OPTIONAL</span></div>
        <textarea rows={2} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Additional notes, props, atmosphere, negative elements..."/>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Video Prompt</span>{hasAny&&<span className="sb">LIVE</span>}</div>
        <div className={`pbox${hasAny?" live":""}`}>
          {hasAny?prompt:<span className="pbox-empty">Fill scene above to generate your video prompt.</span>}
        </div>
        <div className="pbar">
          <button className="btn" onClick={reset}>Reset</button>
          <button className={`btn${hasAny?" pri":""}`} onClick={copy} disabled={!hasAny}>Copy Prompt</button>
        </div>
        {hasAny&&<GenWithLinks getPrompt={()=>prompt} onCopy={()=>doToast("VIDEO PROMPT COPIED")} targets={VID_GEN_TARGETS}/>}
      </div>

      {(firstFrame.trim()||lastFrame.trim())&&(
        <div className="sec">
          <div className="sh"><span className="st">Frame Generation</span><span className="sb">IMAGE PROMPTS</span></div>
          <div style={{fontSize:11,color:"var(--t)",marginBottom:12,lineHeight:1.6}}>
            Generate key frames as images first — use as reference for your video generation tool.
          </div>
          {firstFrame.trim()&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--t)",marginBottom:6}}>FIRST FRAME PROMPT</div>
              <div className="pbox" style={{fontSize:11,marginBottom:8}}>{buildFramePrompt(firstFrame,vparams)}</div>
              <GenWithLinks getPrompt={()=>buildFramePrompt(firstFrame,vparams)} onCopy={()=>doToast("FIRST FRAME PROMPT COPIED")} targets={FRAME_GEN_TARGETS}/>
            </div>
          )}
          {lastFrame.trim()&&(
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--t)",marginBottom:6}}>LAST FRAME PROMPT</div>
              <div className="pbox" style={{fontSize:11,marginBottom:8}}>{buildFramePrompt(lastFrame,vparams)}</div>
              <GenWithLinks getPrompt={()=>buildFramePrompt(lastFrame,vparams)} onCopy={()=>doToast("LAST FRAME PROMPT COPIED")} targets={FRAME_GEN_TARGETS}/>
            </div>
          )}
        </div>
      )}

      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[page,setPage]=useState("angles");
  const[scrolled,setScrolled]=useState(false);
  const auth=useGoogleAuth();
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>50);
    window.addEventListener('scroll',onScroll);
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);
  return(
    <AuthCtx.Provider value={auth}>
      <style>{G}</style>
      <div className="shell">
        <nav className={`nav${scrolled?" scrolled":""}`} style={{flexDirection:"column",height:"auto",padding:"12px 28px 0",gap:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",paddingBottom:10}}>
            <div className="logo">PrompTo <span>miniStudio</span></div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              {auth.user?(
                <button className="user-chip" onClick={auth.signOut} title="Sign out">
                  <img src={auth.user.picture} alt=""/>
                  <span>{auth.user.name.split(" ")[0]}</span>
                  <span style={{color:"var(--t)"}}>✕</span>
                </button>
              ):(
                <GoogleSignInBtn compact/>
              )}
            </div>
          </div>
          <div className="ntabs" style={{position:"static",transform:"none",borderTop:"1px solid var(--bd)",paddingTop:2,paddingBottom:2,width:"100%",justifyContent:"center"}}>
            <button className={`nt${page==="angles"?" on":""}`} onClick={()=>setPage("angles")}>Multi-Shot</button>
            <button className={`nt${page==="avatars"?" on":""}`} onClick={()=>setPage("avatars")}>Character Sheet</button>
            <button className={`nt${page==="video"?" on":""}`} onClick={()=>setPage("video")}>🚧 Under Construction</button>
            <a href="https://github.com/mimaotomao/prompto_ministudio" target="_blank" rel="noopener noreferrer" className="nt" style={{textDecoration:"none"}}>GitHub ↗</a>
          </div>
        </nav>
        {page==="angles"?<AnglesPage/>:page==="avatars"?<AvatarsPage/>:<VideoPromptPage/>}
      </div>
    </AuthCtx.Provider>
  );
}
