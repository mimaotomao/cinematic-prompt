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
.notranslate{translate:no}
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
.enhancing-bar{position:fixed;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--acc),var(--acc2),var(--acc));background-size:200% 100%;animation:enhbar 1.5s linear infinite;z-index:500;pointer-events:none}
@keyframes enhbar{0%{background-position:200% 0}100%{background-position:-200% 0}}
.enhancing-badge{position:fixed;top:16px;left:50%;transform:translateX(-50%);background:rgba(6,6,6,.92);border:1px solid var(--acc);color:var(--acc);font-size:11px;font-weight:700;letter-spacing:2px;padding:8px 20px;border-radius:20px;z-index:499;pointer-events:none;display:flex;align-items:center;gap:8px;backdrop-filter:blur(10px);text-transform:uppercase;animation:fadein .2s ease}
@keyframes fadein{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.enhancing-bottom{position:fixed;bottom:0;left:0;right:0;z-index:500;pointer-events:none;animation:slideup .25s ease}
@keyframes slideup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.enhancing-bottom-inner{display:flex;align-items:center;justify-content:center;gap:16px;padding:18px 32px;background:linear-gradient(135deg,rgba(10,10,10,.97),rgba(20,14,0,.97));border-top:2px solid var(--acc);color:var(--acc);font-size:16px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;backdrop-filter:blur(16px);box-shadow:0 -4px 40px rgba(255,160,0,.15)}
.enhancing-spinner{display:inline-block;animation:spin 1.2s linear infinite;font-size:20px}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
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
.tab-p{font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:7px 16px;border-radius:var(--r);border:1px solid var(--bd);background:transparent;color:var(--t);cursor:pointer;transition:all .15s;position:relative}
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
.quick-btn{font-size:11px;padding:8px 16px;border-radius:var(--r);border:1px solid var(--bd);background:var(--s1);color:var(--t);cursor:pointer;transition:all .15s}
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
.genwith-note{font-size:12px;color:var(--acc);margin-left:4px;font-weight:600}
.genwith-btn{display:flex;align-items:center;gap:7px;padding:10px 20px;border-radius:var(--r);border:1px solid var(--bd);background:var(--s2);color:var(--t);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;text-decoration:none;white-space:nowrap}
.genwith-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acdim);transform:translateY(-1px)}
.sprite-grid{display:flex;flex-wrap:wrap;gap:8px}
.scard{cursor:pointer;border-radius:8px;overflow:hidden;border:2px solid var(--bd);transition:all .15s;background:var(--s1)}
.scard:hover{border-color:var(--bdh);transform:translateY(-1px)}
.scard.sel{border-color:#e8780a;box-shadow:0 0 14px rgba(232,120,10,.4)}
.simg{background-repeat:no-repeat;flex-shrink:0}
.slabel{padding:5px 4px 6px;text-align:center;font-size:11px;font-weight:600;color:var(--t)}
.scard.sel .slabel{color:#e8780a}
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
  const lockInstructions=ENHANCE_LOCK+(instructions||"");
  const resp=await fetch("/api/enhance",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt,instructions:lockInstructions,idToken})
  });
  let data;
  try{data=await resp.json();}
  catch{throw new Error("Server error ("+resp.status+") — API not deployed or unreachable");}
  if(resp.status===401){const e=new Error(data.error||"Unauthorized");e.status=401;throw e;}
  if(!resp.ok)throw new Error(data.error||"API error "+resp.status);
  return data.result||"";
}

const AuthCtx=React.createContext({user:null,ready:false,signOut:()=>{}});

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({onClose}){
  const{user}=React.useContext(AuthCtx);
  useEffect(()=>{if(user)onClose();},[user]);
  return(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-title">✦ <b>Enhance</b></div>
        <div className="modal-sub">
          The app works fully without an account — all prompt builders, selectors, and copy functions are free and open.<br/><br/>
          <span style={{color:"var(--acc)",fontWeight:600}}>✦ AI Prompt Enhance</span> uses Google AI (Gemini) to cinematically rewrite your prompt. Sign in once with Google to unlock it — free, no credit card, no data stored.
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <GoogleSignInBtn/>
        </div>
        <div className="modal-skip" onClick={onClose}>✕ Cancel</div>
      </div>
    </div>
  );
}

function EnhancingIndicator(){
  const[dot,setDot]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setDot(d=>(d+1)%4),400);return()=>clearInterval(t);},[]);
  const dots=".".repeat(dot+1).padEnd(3,"\u00a0");
  return(
    <>
      <div className="enhancing-bar"/>
      <div className="enhancing-badge">
        <span style={{fontSize:14}}>✦</span>
        AI enhancing prompt{dots}
      </div>
      <div className="enhancing-bottom">
        <div className="enhancing-bottom-inner">
          <span className="enhancing-spinner">✦</span>
          <span>AI is enhancing your prompt{dots}</span>
          <span style={{opacity:.6,fontSize:12}}>powered by Gemini</span>
        </div>
      </div>
    </>
  );
}
// ─── EXPERT JSON ENGINE — ASTRONOMEROZGE1 ARCHITECTURE ──────────────────────
// Onion layers: L5 Meta → L4 Layout → L3 Optics → L2 Identity → L1 Emotion → L0 Negatives
// Anchor-Variation-Lock: identity never changes, expressions vary, constraints absorb errors
// Semantic density: concrete → technical → abstract (never reversed)
// 0.99 rule: identity lock leaves 1% for lighting adaptation

const EXPERT_NEG={
  anatomy:["extra fingers","missing fingers","deformed hands","broken wrists","warped face","asymmetrical eyes","melted features","disconnected limbs","unnatural spine","bad anatomy","duplicate limbs"],
  technical:["low resolution","blur","noise","compression artifacts","oversaturated","plastic skin","uncanny valley","beauty retouch plastic skin"],
  content:["text","watermark","logo","signature","brand names","frame border","duplicate people"],
  style:["cartoon","anime","illustration","painting","3d render","cg look"]
};

// ── Shared quality suffix for ALL text prompt builders ──────────────────────
const QUALITY_BLOCK=[
  "=== QUALITY & ANATOMY REQUIREMENTS ===",
  "Realistic skin texture with visible pores and subsurface scattering. No beauty filter, no plastic skin effect, no airbrushed look.",
  "Hands: exactly 5 fingers per hand, no exceptions. Correct finger length proportions, natural joint bending, no fused or extra digits.",
  "Facial structure: natural facial symmetry (not mathematically perfect), correct eye alignment, no warped or melted features.",
  "Physically plausible lighting with correct directionality, intensity falloff, and color temperature. Subsurface scattering on skin and organic materials.",
  "=== MUST NOT GENERATE ===",
  "No extra fingers, no missing fingers, no deformed hands, no broken wrists, no warped face, no asymmetrical eyes, no melted features, no disconnected limbs, no duplicate limbs, no unnatural spine.",
  "No plastic skin, no uncanny valley effect, no beauty retouch artifacts.",
  "No text, watermarks, logos, signatures, captions, labels, UI elements, branding, or frame borders.",
].join("\n");

// ── Lock instructions prepended to AI Enhance calls ────────────────────────
const ENHANCE_LOCK="IMPORTANT RULES FOR REWRITING:\n"+
  "1. DO NOT change any lens/focal length values (e.g. 85mm, 50mm, 24mm). Keep them exactly as written.\n"+
  "2. DO NOT change any lighting type names (e.g. golden hour, neon night, studio key). Keep the exact lighting setup.\n"+
  "3. DO NOT change any film stock names (e.g. Kodak Vision3, Cinestill 800T, Ilford B&W). Keep them verbatim.\n"+
  "4. DO NOT change any color grade names (e.g. Teal & Orange, Bleach Bypass). Keep them verbatim.\n"+
  "5. DO NOT change aspect ratios, grid layouts, panel counts, or output format specifications.\n"+
  "6. DO NOT change character identity details: race, gender, age, body type, clothing, accessories, species, breed.\n"+
  "7. DO NOT remove or weaken the quality requirements, anatomy rules, or negative prompt sections.\n"+
  "8. DO NOT add new characters, animals, or objects not mentioned in the original.\n"+
  "9. You MAY enrich scene descriptions, add atmospheric details, enhance mood language, and make the prose more cinematic and evocative.\n"+
  "10. You MAY add sensory details (sounds, textures, temperature, smells) that support the existing mood.\n"+
  "Rewrite the prompt below following these rules:\n\n";

function buildExpertJSON(cfg){
  try{
  // cfg: {taskType, inputMode, originalPrompt, subject, scene, lighting, environment, lens, filmStock,
  //       colorGrade, aspectRatio, grid, expressions, custom, style, mood, composition, extra}
  const L=cfg.lighting?LIGHTING.find(x=>x.id===cfg.lighting):null;
  const E=cfg.environment?BACKGROUNDS.find(x=>x.id===cfg.environment):null;
  const Le=cfg.lens?LENSES.find(x=>x.mm===cfg.lens):null;
  const F=cfg.filmStock?FILM_STOCKS.find(x=>x.id===cfg.filmStock):null;
  const C=cfg.colorGrade?COLOR_GRADES.find(x=>x.id===cfg.colorGrade):null;
  const isImg=cfg.inputMode==="image_to_image";
  const hasGrid=!!(cfg.grid);
  const styleStr=cfg.style?(typeof cfg.style==="string"?cfg.style:(cfg.style.name||cfg.style.id||"photorealistic")):"photorealistic";

  // ── L5: Meta-Context ──
  const meta={
    tool:"NanoBanana Pro",
    task_type:cfg.taskType||"cinematic_generation",
    language:"en",
    priority:"highest",
    version:`v1.0_${(cfg.taskType||"SCENE").toUpperCase().replace(/\s+/g,"_")}`
  };

  // ── Input (Anchor zone) — identity lock 0.99 for ALL grids, not just img2img ──
  const input={
    mode:cfg.inputMode||"text_to_image",
    ...(isImg?{
      reference_image:"UPLOAD_REFERENCE (REQUIRED)",
      reference_image_usage:"very_high",
      preserve_identity:true,
      preserve_facial_features:true,
      preserve_hairstyle:true,
      identity_lock_strength:0.99,
      notes:"Use reference as primary anchor. Strict identity preservation across all panels. Natural skin texture, no beauty filters."
    }:{
      ...(hasGrid?{
        preserve_identity:true,
        identity_lock_strength:0.99,
        notes:"Generate from text description. Strict identity consistency across all grid panels — same face, same body, same wardrobe."
      }:{
        notes:"Generate from text description with maximum detail fidelity."
      })
    })
  };

  // ── Creative direction — FULL original prompt as markdown ──
  const creativeContent=cfg.originalPrompt||"[no prompt generated yet]";

  // ── Scene (enriched — not just "contextual") ──
  const scene={
    environment:E?E.p:(cfg.extra?.scene_config?.environment||"contextual to subject and creative direction"),
    ...(L?{lighting:{style:L.name,description:L.p,quality:"physically plausible, consistent directionality"}}:
      (cfg.extra?.scene_config?.lighting?{lighting:{style:"studio",description:cfg.extra.scene_config.lighting}}:{})),
    mood:cfg.mood?(typeof cfg.mood==="string"?cfg.mood:(cfg.mood.tone||undefined)):undefined
  };

  // ── Subject/Identity (Anchor zone) ──
  const subject={
    description:cfg.subject||"as described in creative direction",
    ...(hasGrid?{consistency_rules:{
      same_subject_all_panels:true,
      wardrobe_continuity:true,
      lighting_consistency:true,
      identity_lock:isImg?"strict":"strict_generated",
      identity_lock_strength:0.99
    }}:{}),
    anatomy_rules:"correct facial proportions, no warped eyes/mouth, realistic hand structure, strict 5 fingers per hand"
  };

  // ── Photography/Optics ──
  const defaultLens=hasGrid?"50mm standard":"85mm portrait";
  const photography={
    camera:{
      lens:Le?`${Le.mm} — ${Le.name}`:(cfg.lens||defaultLens),
      framing:hasGrid?"mixed framing per panel as described in creative direction":"medium shot",
      angle:"as specified in creative direction",
      focus:"sharp on subject, eyes critical in every panel",
      depth_of_field:hasGrid?"clean studio clarity":"natural shallow separation"
    },
    lighting:{
      setup:L?L.p:(cfg.extra?.scene_config?.lighting||"soft natural lighting"),
      quality:"realistic, physically plausible light physics",
      skin_rendering:"realistic skin texture, visible pores, subsurface scattering, no plastic effect",
      shadow_quality:"soft gradations, consistent directionality across all panels"
    },
    ...(F?{film_stock:{name:F.name,description:F.p}}:{}),
    ...(C?{color_grade:{name:C.name,description:C.p}}:{})
  };

  // ── Output/Layout ──
  const output={
    aspect_ratio:cfg.aspectRatio||"16:9",
    resolution_target:"ultra_high_res",
    num_images:1,
    render_style:styleStr.includes("anime")?"anime_illustration":styleStr.includes("pixel")?"pixel_art":styleStr.includes("oil")?"classical_oil":"photorealistic_editorial",
    sharpness:"editorial_crisp",
    grain:"subtle_film",
    dynamic_range:"rich_natural",
    ...(C?{color_grade:C.name}:{}),
    ...(hasGrid?{layout:{
      type:"grid",
      rows:cfg.grid.rows,
      cols:cfg.grid.cols,
      gutter:"thin",
      outer_border:"none",
      panel_consistency:"very_high"
    }}:{})
  };

  // ── Expression/Panel plan (Variation zone) ──
  const expressions=cfg.expressions||null;

  // ── must_have — critical requirements array ──
  const mustHave=["photoreal quality","perfect anatomy","realistic hands","physically accurate posture"];
  if(hasGrid){
    mustHave.push(`${cfg.grid.rows}x${cfg.grid.cols} grid layout`);
    mustHave.push("one subject across all panels with strong identity consistency");
    mustHave.push("different poses/angles per panel");
    mustHave.push("lighting continuity across all panels");
  }
  if(L)mustHave.push(L.name+" lighting");
  if(E)mustHave.push(E.name+" environment");
  if(F)mustHave.push(F.name+" film look");

  // ── Quality control ──
  const quality={
    identity_preservation:{
      facial_features:isImg?"strict_lock":"strict_generated",
      hair_consistency:"exact_match_across_panels",
      body_proportions:"maintain",
      identity_lock_strength:hasGrid||isImg?0.99:undefined
    },
    hands_priority:"high",
    anatomy_safeguards:{
      hand_structure:"strict_5_per_hand",
      finger_count:"exactly 5 per hand, no exceptions",
      facial_symmetry:"natural_not_perfect",
      skin_texture:"realistic_pores_visible",
      no_warping:true
    },
    avoid:[...EXPERT_NEG.anatomy,...EXPERT_NEG.technical.slice(0,5)]
  };

  const styleNeg=EXPERT_NEG.style.filter(s=>{
    if(styleStr.includes("anime")&&(s==="anime"||s==="illustration"))return false;
    if(styleStr.includes("oil")&&s==="painting")return false;
    if((styleStr.includes("3d")||styleStr.includes("pixel"))&&(s==="3d render"||s==="cg look"||s==="illustration"))return false;
    if(styleStr.includes("pixel")&&s==="cartoon")return false;
    return true;
  });

  // ── Negative constraints — CATEGORIZED (Astronomerozge1 pattern) ──
  const negativeConstraints={
    anatomy:EXPERT_NEG.anatomy,
    technical:EXPERT_NEG.technical,
    content:EXPERT_NEG.content,
    style_violations:styleNeg
  };

  // ── Flat negative_prompt array (for compatibility) ──
  const negativesFlat=[...EXPERT_NEG.anatomy,...EXPERT_NEG.technical,...EXPERT_NEG.content,...styleNeg];

  // ── Assemble (onion: L5 meta → input → creative → scene → subject → photography → output → expressions → must_have → quality → negatives) ──
  const json={generation_request:{
    meta_data:meta,
    input:input,
    creative_direction:{format:"markdown_enhanced",content:creativeContent},
    scene:scene,
    subject:subject,
    photography:photography,
    output_settings:output,
    ...(expressions?{expression_set:expressions}:{}),
    must_have:mustHave,
    quality_control:quality,
    ...(cfg.extra||{}),
    negative_constraints:negativeConstraints,
    negative_prompt:negativesFlat
  }};

  return JSON.parse(JSON.stringify(json));
  }catch(e){console.error("buildExpertJSON error:",e);return null;}
}

// ─── REUSABLE PROMPT OUTPUT PANEL ────────────────────────────────────────────
// Three tabs: Original (green) / Expert JSON (purple) / AI Enhanced (orange)
// Props: prompt, custom, hasAny, extraButtons, onToast, expertJSON (object|null)
function PromptOutputPanel({prompt,custom="",hasAny=true,extraButtons=null,onToast,expertJSON=null}){
  const[enhanced,setEnhanced]=useState("");
  const[enhancing,setEnhancing]=useState(false);
  const[view,setView]=useState("base");
  const[pending,setPending]=useState(false);
  const[showAuth,setShowAuth]=useState(false);
  const{user}=React.useContext(AuthCtx);
  const toast=m=>{if(onToast)onToast(m);};

  useEffect(()=>{
    if(user&&pending){
      setPending(false);
      setEnhancing(true);setEnhanced("");setView("enhanced");
      callEnhance(prompt,custom,user.idToken)
        .then(r=>{setEnhanced(r);toast("ENHANCED BY GEMINI");})
        .catch(e=>{if(e.status===401)setShowAuth(true);else toast("ERROR: "+e.message);})
        .finally(()=>setEnhancing(false));
    }
  },[user,pending]);

  useEffect(()=>{setEnhanced("");if(view==="enhanced")setView("base");},[prompt]);

  const doEnhance=()=>{
    if(!user){setPending(true);setShowAuth(true);return;}
    setEnhancing(true);setEnhanced("");setView("enhanced");
    callEnhance(prompt,custom,user.idToken)
      .then(r=>{setEnhanced(r);toast("ENHANCED BY GEMINI");})
      .catch(e=>{if(e.status===401)setShowAuth(true);else toast("ERROR: "+e.message);})
      .finally(()=>setEnhancing(false));
  };

  const jsonStr=expertJSON?JSON.stringify(expertJSON,null,2):"";
  const isExpert=view==="expert"&&expertJSON;
  const shown=isExpert?jsonStr:(enhanced&&view==="enhanced")?enhanced:prompt;

  return(
    <>
      <div style={{borderRadius:"var(--r2)",border:"1px solid "+(isExpert?"rgba(168,85,247,.35)":enhanced&&view==="enhanced"?"var(--bd2)":"var(--bd)"),overflow:"hidden",background:"var(--s2)",transition:"border-color .2s"}}>
        {/* Tab strip */}
        <div style={{display:"flex",borderBottom:"1px solid var(--bd)",background:"var(--s1)",flexWrap:"wrap"}}>
          <button onClick={()=>setView("base")}
            style={{padding:"9px 18px",cursor:"pointer",fontSize:11,fontWeight:700,border:"none",borderRight:"1px solid var(--bd)",
              background:view==="base"?"rgba(34,197,94,.12)":"transparent",
              color:view==="base"?"#4ade80":"rgba(74,222,128,.5)",
              transition:"all .15s",letterSpacing:.5,whiteSpace:"nowrap"}}>
            Original Prompt
          </button>
          {expertJSON&&(
            <button onClick={()=>setView("expert")}
              style={{padding:"9px 18px",cursor:"pointer",fontSize:11,fontWeight:700,border:"none",borderRight:"1px solid var(--bd)",
                background:isExpert?"rgba(168,85,247,.15)":"transparent",
                color:isExpert?"#c4b5fd":"rgba(168,85,247,.35)",
                transition:"all .15s",letterSpacing:.5,whiteSpace:"nowrap"}}>
              Expert JSON
            </button>
          )}
          <button onClick={()=>{if(enhanced)setView("enhanced");}}
            style={{padding:"9px 18px",cursor:enhanced?"pointer":"default",fontSize:11,fontWeight:700,border:"none",
              background:enhanced&&view==="enhanced"?"var(--acdim)":"transparent",
              color:enhanced?(view==="enhanced"?"var(--acc)":"rgba(255,255,255,.38)"):"rgba(255,255,255,.18)",
              transition:"all .15s",letterSpacing:.5,whiteSpace:"nowrap"}}>
            {"\u2726"} AI Enhanced
          </button>
          {enhanced&&(
            <button onClick={()=>{setEnhanced("");setView("base");}}
              style={{marginLeft:"auto",padding:"9px 14px",cursor:"pointer",fontSize:10,fontWeight:600,
                border:"none",borderLeft:"1px solid var(--bd)",background:"transparent",color:"rgba(255,255,255,.22)"}}>
              {"\u2715"} discard
            </button>
          )}
        </div>
        {/* Content */}
        <div style={{fontFamily:"var(--mono)",fontSize:isExpert?11:12,lineHeight:isExpert?1.5:1.9,
          color:isExpert?"#c4b5fd":"var(--t)",padding:"14px 16px",
          whiteSpace:"pre-wrap",wordBreak:"break-word",userSelect:"text",cursor:"text",
          minHeight:120,maxHeight:isExpert?480:"none",overflowY:isExpert?"auto":"visible"}}>
          {hasAny?shown:<span style={{color:"var(--t4)",fontStyle:"italic",fontSize:13,fontFamily:"var(--font)"}}>Fill fields above to generate your prompt in real time.</span>}
        </div>
        {isExpert&&(
          <div style={{padding:"6px 16px",borderTop:"1px solid rgba(168,85,247,.15)",background:"rgba(168,85,247,.05)",
            fontSize:10,color:"rgba(168,85,247,.6)",letterSpacing:1,fontWeight:600,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span>NANOBANANA PRO — ASTRONOMEROZGE1 HYBRID JSON/MARKDOWN</span>
            <span style={{opacity:.5}}>Anchor-Variation-Lock · identity 0.99 · semantic density</span>
          </div>
        )}
      </div>

      {isExpert&&(
        <div style={{marginTop:8,fontSize:11,color:"var(--acc)",lineHeight:1.5}}>
          <span style={{marginRight:5}}>⚠</span>JSON Format Note: some free generators (Gemini, Bing Create, Craiyon) may not parse JSON directly — use <b>Original Prompt</b> or <b>AI Enhanced</b> for broader compatibility.
        </div>
      )}

      {/* Button row — all copy buttons side by side */}
      <div className="pbar" translate="no" style={{flexWrap:"wrap",gap:8,alignItems:"center"}}>
        {extraButtons}

        <button className={`btn${hasAny&&view==="base"?" pri":""}`} disabled={!hasAny}
          onClick={async()=>{const ok=await copyText(prompt);toast(ok?"ORIGINAL PROMPT COPIED":"COPY FAILED");if(view!=="base")setView("base");}}>
          Copy Orig. Prompt
        </button>

        {expertJSON&&(
          <button className={`btn${isExpert?" pri":""}`} disabled={!hasAny}
            style={isExpert?{background:"#a855f7",borderColor:"#a855f7",color:"#000",boxShadow:"0 0 24px rgba(168,85,247,.25)"}
              :{borderColor:"rgba(168,85,247,.4)",color:"rgba(168,85,247,.55)"}}
            onClick={async()=>{const ok=await copyText(jsonStr);toast(ok?"EXPERT JSON COPIED":"COPY FAILED");if(view!=="expert")setView("expert");}}>
            Copy Expert JSON
          </button>
        )}

        {!enhanced?(
          <button className="btn" disabled={!hasAny||enhancing}
            onClick={doEnhance}
            style={{borderColor:enhancing?"var(--bd)":"var(--acc)",color:enhancing?"rgba(255,255,255,.4)":"var(--acc)",background:"var(--acdim)",flexShrink:0}}>
            {enhancing?"ENHANCING\u2026":"\u2192 AI Prompt Enhance"}
          </button>
        ):(
          <button className="btn pri"
            onClick={async()=>{const ok=await copyText(enhanced);toast(ok?"ENHANCED PROMPT COPIED":"COPY FAILED");if(view!=="enhanced")setView("enhanced");}}>
            {"\u2726"} Copy Enhanced Prompt
          </button>
        )}
      </div>

      {!enhanced&&<div style={{marginTop:8,fontSize:11,color:"var(--acc)",lineHeight:1.5}}>
        <span style={{marginRight:5}}>▸</span>AI Enhance generates artistic, narrative version. <b>Requires Google sign-in.</b>
      </div>}

      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)}/>}
      {enhancing&&<EnhancingIndicator/>}
    </>
  );
}

const GEN_TARGETS=[
  {label:"Arena.ai",url:"https://arena.ai/?mode=direct&chat-modality=image",icon:"⊕",hi:true},
  {label:"Grok Imagine",url:"https://grok.com/imagine",icon:"✦"},
  {label:"ChatGPT Images",url:"https://chatgpt.com/images",icon:"◈"},
  {label:"Gemini",url:"https://gemini.google.com",icon:"◇",warn:"May truncate long prompts — best for single-shot"},
  {label:"Meta AI",url:"https://www.meta.ai/",icon:"◉"},
  {label:"FreeGen",url:"https://freegen.app/",icon:"▸",note:"100% free, no signup"},
  {label:"DiGen",url:"https://digen.ai/image",icon:"◆"},
  {label:"Playground",url:"https://playground.com/design/new",icon:"▢"},
  {label:"FLUX.1-dev",url:"https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev",icon:"⚡",note:"Open-source on HuggingFace"},
  {label:"Qwen Image",url:"https://huggingface.co/spaces/Qwen/Qwen-Image-2512",icon:"◐",note:"Qwen 20B — free on HuggingFace"},
  {label:"Bing Create",url:"https://www.bing.com/images/create",icon:"▣"},
  {label:"Craiyon",url:"https://www.craiyon.com/en",icon:"✏"},
  {label:"ImgsOAI",url:"https://www.imgsoai.com/",icon:"◫"},
  {label:"JoyFun",url:"https://joyfun.ai/ai-image-generator/",icon:"☺"},
  {label:"Leonardo.ai",url:"https://app.leonardo.ai/image-generation",icon:"▲",note:"Free tier available"},
  {label:"Mage.space",url:"https://www.mage.space/creations",icon:"✦"},
  {label:"HF Spaces",url:"https://huggingface.co/spaces?category=image-generation",icon:"🤗",note:"Browse all HuggingFace image generators"},
  {label:"Heartsync",url:"https://huggingface.co/spaces/Heartsync/Adult?not-for-all-audiences=true",icon:"♡",note:"Test the best — not for all audiences"},
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
        <button key={t.label} className="genwith-btn" onClick={()=>handle(t.url)}
          title={t.note||t.warn||""}
          style={t.hi?{borderColor:"var(--acc)",background:"var(--acdim)",color:"var(--acc)",fontWeight:700}:{}}>
          <span>{t.icon}</span>{t.label} ↗
        </button>
      ))}
      <span className="genwith-note">prompt copied to clipboard — just paste</span>
    </div>
  );
}

// ─── WORKFLOW PANEL (replaces GenWithLinks + RefPhotoHint + ExpandToFullShot) ──
function WorkflowPanel({getPrompt, onCopy, sel, scene, lighting, bg, lens, filmStock, colorGrade, aspectRatio, mode, onToast, isPhoto}){
  const[expanded, setExpanded] = useState(false);
  const[showPhotoTip, setShowPhotoTip] = useState(false);
  const hasGrid = sel && sel.length >= 2;

  const handleGenerate = async(url)=>{
    await copyText(getPrompt());
    onCopy && onCopy();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleGenerateClick = (url)=>{
    if(isPhoto){ setShowPhotoTip(url); } else { handleGenerate(url); }
  };

  const handleExpand = async(panelNum, angleIdx, url)=>{
    const p = buildExpandPrompt(panelNum, sel.length, {scene, lighting, bg, lens, filmStock, colorGrade, aspectRatio, mode, angleIdx});
    await copyText(p);
    onToast(`PANEL ${panelNum} PROMPT COPIED — ATTACH YOUR GRID IMAGE`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return(
    <div style={{marginTop:8}}>

      {/* PHOTO REMINDER MODAL */}
      {showPhotoTip&&(
        <div className="modal-overlay" onClick={()=>setShowPhotoTip(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:380}}>
            <div style={{fontSize:28,marginBottom:12,textAlign:"center"}}>📎</div>
            <div className="modal-title" style={{fontSize:16}}>Attach your reference photo</div>
            <div className="modal-sub" style={{lineHeight:1.7}}>
              Before generating, <strong>attach your character reference photo</strong> to the message in the AI generator.<br/><br/>
              The prompt will use it as the identity base — without it, the AI generates a random character.
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:20,flexWrap:"wrap"}}>
              <button onClick={()=>{handleGenerate(showPhotoTip);setShowPhotoTip(false);}}
                style={{padding:"10px 20px",borderRadius:8,border:"1px solid var(--acc)",background:"var(--acdim)",color:"var(--acc)",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                Got it — open generator ↗
              </button>
              <button onClick={()=>setShowPhotoTip(false)}
                style={{padding:"10px 20px",borderRadius:8,border:"1px solid var(--bdh)",background:"transparent",color:"var(--t)",fontSize:13,cursor:"pointer"}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — Generate */}
      {isPhoto&&(
        <div style={{marginBottom:8,padding:"8px 12px",borderRadius:6,border:"1px solid rgba(232,120,10,.3)",background:"rgba(232,120,10,.06)",fontSize:11,color:"var(--acc)",lineHeight:1.5}}>
          📎 <b>Attach your reference photo</b> before generating — the AI uses it as identity base.
        </div>
      )}
      <div className="genwith" translate="no">
        <span className="genwith-label">Generate with</span>
        {GEN_TARGETS.map(t=>(
          <div key={t.label} style={{position:"relative",display:"inline-flex",alignItems:"center",gap:4}}>
            <button className="genwith-btn" onClick={()=>handleGenerateClick(t.url)}
              title={t.note||t.warn||""}
              style={t.hi?{borderColor:"var(--acc)",background:"var(--acdim)",color:"var(--acc)",fontWeight:700}:{}}>
              <span>{t.icon}</span>{t.label} ↗
            </button>
            {t.warn&&<span title={t.warn} style={{cursor:"help",fontSize:13,opacity:.7}}>⚠️</span>}
          </div>
        ))}
        <span className="genwith-note">prompt copied to clipboard — just paste</span>
      </div>

      {/* STEP 4 — Expand panel (only when grid) */}
      {hasGrid&&(
        <div style={{marginTop:12,borderRadius:8,border:"1px solid var(--bdh)",background:"var(--s2)",overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",cursor:"pointer",userSelect:"none",borderBottom:expanded?"1px solid var(--bd)":"none"}}
            onClick={()=>setExpanded(v=>!v)}>
            <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(120,180,255,.2)",border:"1.5px solid rgba(120,180,255,.6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"rgba(120,180,255,.9)",flexShrink:0}}>4</div>
            <div style={{flexGrow:1}}>
              <div style={{fontSize:12,fontWeight:800,color:"var(--t)",letterSpacing:.5}}>Expand a panel to full resolution</div>
              <div style={{fontSize:11,color:"var(--t)",opacity:.6,marginTop:1}}>Got your grid? Attach it and expand any panel to a single full-quality image</div>
            </div>
            <span style={{fontSize:14,color:"var(--t)",opacity:.5}}>{expanded?"▲":"▼"}</span>
          </div>
          {expanded&&(
            <div style={{padding:"8px 16px 14px"}}>
              <div style={{fontSize:11,color:"var(--t)",opacity:.55,marginBottom:10}}>
                Attach the grid image you just generated, then click a panel:
              </div>
              {sel.map((angleIdx,idx)=>{
                const panelNum=idx+1;
                const angle=ANGLES[angleIdx];
                return(
                  <div key={angleIdx} style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",padding:"6px 0",borderTop:idx>0?"1px solid var(--bd)":"none"}}>
                    <div style={{width:24,height:24,borderRadius:5,background:"rgba(255,255,255,.07)",border:"1px solid var(--bdh)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"var(--t)",flexShrink:0}}>{panelNum}</div>
                    <div style={{fontSize:11,color:"var(--t)",opacity:.75,flexGrow:1,minWidth:100}}>{angle.name}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {GEN_TARGETS.map(t=>(
                        <button key={t.label} onClick={()=>handleExpand(panelNum,angleIdx,t.url)}
                          className="genwith-btn" style={{fontSize:11,padding:"5px 10px"}}>
                          {t.icon} {t.label} ↗
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
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
  {id:"studiokey",name:"Studio Key",p:"professional studio portrait lighting, soft main light from upper-left, gentle fill from opposite side, subtle edge separation light on shoulders, controlled polished commercial look, no harsh shadows"},
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
  {id:"black",name:"Black Studio",p:"pure black studio background, deep void, subject isolated against absolute darkness, dramatic separation"},
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
    parts.push(QUALITY_BLOCK);
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
    parts.push(QUALITY_BLOCK);
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
    (use3D?"3D Camera Control is active and applies to panel 1 only. All other panels use the standard angle descriptions below.\n":"")+
    selectedAngles.map((i,idx)=>{
      if(idx===0&&use3D)return "1. "+describe3D(cam.azimuth,cam.elevation,cam.zoom)+" [3D Camera Control — first panel only]";
      return (idx+1)+". "+ANGLES[i].name+" — "+ANGLES[i].desc;
    }).join("\n")
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

  // 9. Quality & anatomy
  parts.push(QUALITY_BLOCK);

  // 10. Custom additions (always last)
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

// ─── EXPAND PANEL TO FULL SHOT ────────────────────────────────────────────────
function buildExpandPrompt(panelNum, totalPanels, {scene, lighting, bg, lens, filmStock, colorGrade, aspectRatio, mode, angleIdx}){
  const angleObj = angleIdx!=null ? ANGLES[angleIdx] : null;
  const techParts=[];
  if(bg)techParts.push(BACKGROUNDS.find(b=>b.id===bg)?.p);
  if(lighting)techParts.push(LIGHTING.find(l=>l.id===lighting)?.p);
  if(lens)techParts.push(LENSES.find(l=>l.mm===lens)?.p);
  if(filmStock)techParts.push(FILM_STOCKS.find(f=>f.id===filmStock)?.p);
  if(colorGrade)techParts.push(COLOR_GRADES.find(c=>c.id===colorGrade)?.p);
  const techBlock=techParts.filter(Boolean).join(". ")+(techParts.length?".":"");

  const parts=[];
  parts.push(
    `You will receive a composite grid image containing ${totalPanels} numbered panels. `+
    `Focus exclusively on panel number ${panelNum}. `+
    `Ignore all other panels completely.`
  );
  parts.push(
    `Recreate the exact content of panel ${panelNum} as a single, full-resolution standalone image. `+
    `Preserve every visual detail from that panel with absolute fidelity: `+
    `character identity, face, age, gender, body proportions, wardrobe, pose, gesture, expression, `+
    `lighting direction, color palette, atmosphere, environment, and scene mood. `+
    `Do not merge elements from other panels. Do not add new characters or objects.`
  );
  if(scene.trim())parts.push(scene.trim());
  if(techBlock)parts.push(techBlock);
  if(angleObj)parts.push(`Camera angle for this panel: ${angleObj.name} — ${angleObj.desc}`);
  parts.push(
    `Output as a single cinematic full-quality image in ${aspectRatio||"16:9"} aspect ratio. `+
    `Maximum sharpness, full detail, physically plausible lighting. Not a grid — one image only.`
  );
  return parts.join("\n\n");
}

function ExpandToFullShot({sel, totalPanels, scene, lighting, bg, lens, filmStock, colorGrade, aspectRatio, mode, onToast}){
  if(!sel || sel.length < 2) return null;
  const targets = GEN_TARGETS.slice(0,3);
  const handle = async(panelNum, angleIdx, url)=>{
    const p = buildExpandPrompt(panelNum, totalPanels, {scene, lighting, bg, lens, filmStock, colorGrade, aspectRatio, mode, angleIdx});
    await copyText(p);
    onToast(`PANEL ${panelNum} PROMPT COPIED — ATTACH YOUR GRID IMAGE`);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return(
    <div style={{marginTop:20,padding:"16px 18px",borderRadius:8,border:"1px solid rgba(120,180,255,.2)",background:"rgba(60,100,180,.06)"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:16}}>🔍</span>
        <span style={{fontSize:12,fontWeight:800,letterSpacing:2,color:"var(--t)",textTransform:"uppercase"}}>Expand Panel to Full Shot</span>
      </div>
      <div style={{fontSize:11,color:"var(--t)",opacity:.6,marginBottom:14,lineHeight:1.5}}>
        Attach your grid image to the generator, then click a panel below — copies a prompt that expands that exact panel into a single full-quality image.
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {sel.map((angleIdx, idx)=>{
          const panelNum = idx+1;
          const angle = ANGLES[angleIdx];
          return(
            <div key={angleIdx} style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <div style={{
                minWidth:28,height:28,borderRadius:6,background:"rgba(255,255,255,.08)",
                border:"1px solid var(--bdh)",display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:13,fontWeight:800,color:"var(--t)",flexShrink:0
              }}>{panelNum}</div>
              <div style={{fontSize:11,color:"var(--t)",opacity:.7,flexGrow:1,minWidth:120}}>
                {angle.name}
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {targets.map(t=>(
                  <button key={t.label}
                    onClick={()=>handle(panelNum, angleIdx, t.url)}
                    style={{
                      padding:"5px 12px",borderRadius:8,border:"1px solid var(--bd)",
                      background:"var(--s2)",color:"var(--t)",fontSize:11,fontWeight:600,
                      cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap"
                    }}
                    onMouseOver={e=>{e.currentTarget.style.borderColor="var(--acc)";e.currentTarget.style.color="var(--acc)"}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor="var(--bd)";e.currentTarget.style.color="var(--t)"}}
                  >
                    {t.icon} {t.label} ↗
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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
  const{user}=React.useContext(AuthCtx);
  const MAX=9;

  const tog=(i)=>setSel(p=>p.includes(i)?p.filter(x=>x!==i):p.length>=MAX?p:[...p,i]);
  const tog1=(setter,id)=>setter(p=>p===id?null:id);
  const prompt=buildPrompt({scene,selectedAngles:sel,lighting:light,bg,lens,cam,use3D,custom,filmStock,colorGrade,aspectRatio,batchSize,mode:mode1});
  const hasAny=!!(scene.trim()||sel.length||light||bg||lens||filmStock||colorGrade||use3D||custom.trim());
  const n=sel.length;
  const anglesEJ=hasAny?buildExpertJSON({
    taskType:n>1?`multi_shot_${n}panel_grid`:"cinematic_single_shot",
    inputMode:mode1==="photo"?"image_to_image":"text_to_image",
    originalPrompt:prompt,
    subject:scene.trim()||"subject from attached reference photo",
    lighting:light,environment:bg,lens,filmStock,colorGrade,aspectRatio,
    custom:custom.trim()||null,
    grid:n>1?{rows:n<=3?1:n<=4?2:n<=6?2:3,cols:n<=1?1:n<=2?2:3}:null,
    expressions:n>1?Object.fromEntries(sel.map((ai,i)=>[`panel_${String(i+1).padStart(2,"0")}`,{camera_angle:ANGLES[ai]?.name,description:ANGLES[ai]?.desc}])):null,
    extra:{scene_config:{mode:mode1,use_3d_camera:use3D,batch_variants:batchSize}}
  }):null;

  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2500)};
  const copy=async()=>{
    if(!hasAny)return;
    const ok=await copyText(enhanced||prompt);
    setHistory(p=>[{prompt:enhanced||prompt,date:new Date().toLocaleTimeString()},...p].slice(0,20));
    doToast(ok?"COPIED TO CLIPBOARD":"COPY FAILED — SELECT MANUALLY");
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
      <PipelineStrip active={2}/>
      <div className="ph">
        <div className="ps">Multi-Shot Prompt Builder — Design cinematic angle sets (up to 9 views) with perfect subject &amp; lighting consistency. Real-time 3D camera orbit &amp; zoom.</div>
        <div style={{marginTop:8,textAlign:"center"}}><HowLink section="pipeline"/></div>
        <div className={`pc${sel.length===MAX?" full":""}`}>
          <span>{sel.length} / {MAX} angles</span>
          {batchSize>1&&<span>· {batchSize}x batch</span>}
          <span>· {aspectRatio}</span>
        </div>
      </div>

      <div style={{display:"flex",gap:0,marginBottom:20,borderRadius:8,overflow:"hidden",border:"1px solid var(--bd)",width:"fit-content"}}>
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
        <div className="sh"><span className="st">Scene Description</span><span className="sb" translate="no">PROMPT INTRO</span></div>
        <textarea rows={4} value={scene} onChange={e=>setScene(e.target.value)} placeholder="Describe your scene or subject. This appears first in the generated prompt — use it to set context, paste a reference prompt, or describe the character and environment. The more specific, the better."/>
        <div className="scene-hint">This is the foundation of your prompt. Include character details, actions, environment mood, and key visual elements you want preserved across all frames.</div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Camera Angles</span>{sel.length>0&&<span className="sb" translate="no">{sel.length} SELECTED</span>}</div>
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
                  color:isSel?"#e8780a":"var(--t)",lineHeight:1.2}}><span translate="no">{angle.name}</span></div>
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
                color:light===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                color:bg===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                color:lens===r.mm?"#e8780a":"var(--t)"}}><span translate="no">{r.mm}</span></div>
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
                color:filmStock===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                color:colorGrade===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                paddingTop:10,background:"var(--s1)",gap:6}}>
              <div style={{width:80,height:80,flexShrink:0,
                backgroundImage:"url(/format.png)",
                backgroundSize:"400px 80px",
                backgroundPosition:r.sx+"px 0px",
                backgroundRepeat:"no-repeat"}}/>
              <div style={{paddingBottom:6,textAlign:"center",fontSize:11,fontWeight:600,
                color:aspectRatio===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
        <div className="sh"><span className="st">Custom Additions</span><span className="sb" translate="no">APPENDED</span></div>
        <textarea rows={3} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Add extra instructions, negative prompts, style notes, or specific technical requirements. This is appended after the auto-generated content."/>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Generated Prompt</span>{hasAny&&<span className="sb" translate="no">LIVE</span>}</div>
        <PromptOutputPanel
          prompt={prompt}
          custom={custom}
          hasAny={hasAny}
          onToast={doToast}
          expertJSON={anglesEJ}
          extraButtons={
            <>
              <button className="btn" onClick={reset}>Reset</button>
              <button className="btn" onClick={random}>Random</button>
            </>
          }
        />
        {hasAny&&<WorkflowPanel
          getPrompt={()=>prompt}
          onCopy={()=>doToast("PROMPT COPIED — PASTE IN TARGET APP")}
          sel={sel} scene={scene} lighting={light} bg={bg} lens={lens}
          filmStock={filmStock} colorGrade={colorGrade} aspectRatio={aspectRatio}
          mode={mode1} onToast={doToast} isPhoto={mode1==="photo"}
        />}
      </div>

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
  {id:"16:9",  name:"16:9",   fw:130, sx:0},
  {id:"9:16",  name:"9:16",   fw:90,  sx:-80},
  {id:"2.39:1",name:"2.39:1", fw:170, sx:-160},
  {id:"4:3",   name:"4:3",    fw:115, sx:-240},
  {id:"1:1",   name:"1:1",    fw:115, sx:-320},
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
  {name:"Side Seated",sx:-105,sy:-450,p:"Generate a single side-profile seated pose — 90-degree lateral view, full figure visible, relaxed natural posture, clean studio background. Single panel output."},
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
      {badge&&<span className="sb" translate="no">{badge}</span>}
    </div>
    {children}
  </div>
);

const Opts=({opts,stateKey,val,onSet})=>(
  <div className="optbtns">
    {opts.map(o=>(
      <button key={o} className={`ob${val===o?" sel":""}`} onClick={()=>onSet(stateKey,o)} translate="no">{o}</button>
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
  const{user}=React.useContext(AuthCtx);

  const buildAvPrompt=()=>{
    const style=UNI_STYLE[c.universe]||UNI_STYLE.realism;
    const faceAdv=` Eye type: ${c.eyeType.toLowerCase()}. Lips: ${c.lips.toLowerCase()}. Face markings: ${c.markings.toLowerCase()}. Horns: ${c.horns.toLowerCase()}.`;
    const traits=c.skinTraits!=="None"?` Surface traits: ${c.skinTraits.toLowerCase()}.`:"";
    const clothesParts=c.clothing;
    const isMinor=["child","teenager","teen","kid"].some(a=>c.age.toLowerCase().includes(a));
    const clothesPrompt=c.clothing==="Neutral (studio reference)"
      ?"Wearing a minimal neutral black fitted top and black shorts, studio reference attire, no branding. Barefoot."
      :c.clothing==="None"
        ?(isMinor
          ?"Wearing age-appropriate casual clothes — simple t-shirt and shorts or similar comfortable attire."
          :"Wearing a minimal form-fitting bodysuit, tasteful studio reference pose, professional photography.")
        :"Wearing "+c.clothing.toLowerCase()+" attire appropriate to the character's anatomy, age, body type, race, and universe style.";
    const parts=[];
    const isMultiPanel=c.avLayout==="Style Sheet";

    // 1. GOAL — what AI must produce, format first
    const goalPrefix=mode==="photo"
      ?"Use the attached reference photo as the identity base for this character. Extract and preserve the exact face structure, skin tone, and distinctive facial features from the photo. Apply the selected traits below as modifications or additions on top of this reference identity. Do not change the face — only apply the style, body, and trait modifications."
      :"Generate a character defined entirely by the parameters below.";
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
      "Output as a "+layoutSpec+". Ultra high resolution, sharp focus, physically accurate anatomy."
    );

    parts.push(QUALITY_BLOCK);

    return parts.join("\n\n");
  };

  const prompt=buildAvPrompt();
  const avatarEJ=buildExpertJSON({
    taskType:c.avLayout==="Style Sheet"?"character_sheet_3panel":"character_"+c.avLayout.toLowerCase().replace(/\s+/g,"_"),
    inputMode:mode==="photo"?"image_to_image":"text_to_image",
    originalPrompt:prompt,
    subject:`${c.race} ${c.gender}, ${c.age}, ${c.region} heritage. Body: ${c.bodyType}. Expression: ${c.expression}. Hair: ${c.hair}, ${c.eyeColor} eyes. Clothing: ${c.clothing}.`,
    lighting:null,environment:null,lens:c.avLens||null,filmStock:null,colorGrade:null,
    aspectRatio:c.avAspect||"16:9",custom:c.details||null,
    style:c.universe,mood:null,composition:null,
    grid:c.avLayout==="Style Sheet"?{rows:1,cols:3}:null,
    extra:{character_traits:{
      race:c.race,gender:c.gender,age:c.age,region:c.region,skin:{color:c.skinColor,traits:c.skinTraits},
      face:{eyeColor:c.eyeColor,eyeType:c.eyeType,lips:c.lips,markings:c.markings,horns:c.horns},
      body:{type:c.bodyType,lArm:c.lArm,rArm:c.rArm,lLeg:c.lLeg,rLeg:c.rLeg,wings:c.wings,tail:c.tail,ears:c.ears}
    },scene_config:{lighting:c.avLight||"soft even professional studio lighting",environment:c.avEnv||"plain neutral grey studio background",layout:c.avLayout}}
  });
  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2200)};
  const surprise=()=>{
    try{
    const pick=a=>a[~~(Math.random()*a.length)];
    // natural-only limb pools
    const naturalArms=["Natural"];
    const naturalLegs=["Natural","Natural Alt"];
    // organic non-human options (no robotics/prosthetics)
    const organicArms=LARM_SPRITES.filter(x=>!["Steampunk Prosthetic","Cybernetic Prosthetic","Mechanical Claws","Extra Arms"].includes(x.name));
    const organicLegs=LLEG_SPRITES.filter(x=>!["Prosthetic Blade","Mechanical"].includes(x.name));
    // 80% chance natural limbs, 20% organic fantasy
    const rndArm=()=>Math.random()<.8?"Natural":pick(organicArms).name;
    const rndLeg=()=>Math.random()<.8?"Natural":pick(organicLegs).name;
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
      horns:"None",
      bodyType:pick(BODY_SPRITES).name,
      lArm:rndArm(),
      rArm:rndArm(),
      lLeg:rndLeg(),
      rLeg:rndLeg(),
      wings:"None",
      tail:Math.random()<.3?pick(TAIL_SPRITES.filter(x=>x.name!=="None")).name:"None",
      ears:Math.random()<.4?pick(EARS_SPRITES.filter(x=>x.name!=="Human")).name:"Human",
      expression:pick(EXPRESSION_SPRITES).name,
      clothing:pick(CLOTHING_SPRITES).id,
      details:"",avLight:pick(LIGHTING).id,avEnv:"",avLens:pick(LENSES).mm,avAspect:"16:9",avLayout:pick(LAYOUT_SPRITES).name
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
      <PipelineStrip active={1}/>
      <div className="ph">
        <div className="pt">Character <b>Sheet</b></div>
        <div className="ps">Character reference sheet prompt builder with detailed anatomy and style controls</div>
        <div style={{marginTop:8,textAlign:"center"}}><HowLink section="pipeline"/></div>
      </div>

      <div style={{display:"flex",gap:0,marginBottom:28,borderRadius:8,overflow:"hidden",border:"1px solid var(--bd)",width:"fit-content"}}>
        <button onClick={()=>setMode("scratch")} style={{padding:"10px 24px",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",border:"none",background:mode==="scratch"?"#e8780a":"var(--s1)",color:mode==="scratch"?"#000":"var(--t)",transition:"all .2s"}}>
          ✦ Create from scratch
        </button>
        <button onClick={()=>setMode("photo")} style={{padding:"10px 24px",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",border:"none",borderLeft:"1px solid var(--bd)",background:mode==="photo"?"#e8780a":"var(--s1)",color:mode==="photo"?"#000":"var(--t)",transition:"all .2s"}}>
          ⊕ From reference photo
        </button>
      </div>
      {mode==="photo"&&(
        <div style={{background:"var(--s1)",border:"1px solid var(--bd)",borderRadius:8,padding:"16px 20px",marginBottom:28,fontSize:13,color:"var(--t)",lineHeight:1.7}}>
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
                  color:c.universe===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.race===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.gender===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.region===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.eyeColor===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.age===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.skinColor===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.label}</span></div>
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
                  color:c.expression===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.skinTraits===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.label}</span></div>
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
                    color:c.hair===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.eyeType===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.lips===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.markings===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.horns===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.bodyType===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                color:c.lArm===r.name?"#e8780a":"var(--t)",lineHeight:1.2}}><span translate="no">{r.name}</span></div>
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
                color:c.rArm===r.name?"#e8780a":"var(--t)",lineHeight:1.2}}><span translate="no">{r.name}</span></div>
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
                  color:c.lLeg===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.rLeg===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.wings===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.tail===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                  color:c.ears===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                color:c.clothing===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                color:c.avLayout===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:c.avLight===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:c.avEnv===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:c.avLens===r.name?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
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
                <div style={{fontSize:11,fontWeight:600,color:c.avAspect===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      <Sec title="Additional Details" badge="OPTIONAL">
        <textarea rows={3} value={c.details} onChange={e=>{set("details",e.target.value);setEnhanced("");}} placeholder="Enhancement hints for Gemini AI — e.g. 'more dramatic lighting', 'add forest background', 'make it dark fantasy'. Also appended to base prompt as-is."/>
      </Sec>

      <div className="sec">
        <div className="sh"><span className="st">Generated Prompt</span><span className="sb" translate="no">LIVE</span></div>
        <PromptOutputPanel
          prompt={prompt}
          custom={c.details}
          hasAny={true}
          onToast={doToast}
          expertJSON={avatarEJ}
          extraButtons={
            <>
              <button className="btn" onClick={()=>{setC(AV_DEF);setITab("universe");setFTab("hair");setBTab("bodyType");doToast("RESET");}}>Reset</button>
              <button className="btn" onClick={surprise}>Random</button>
            </>
          }
        />
        <WorkflowPanel
          getPrompt={()=>prompt}
          onCopy={()=>doToast("PROMPT COPIED — PASTE IN TARGET APP")}
          sel={[]} scene={""} onToast={doToast} isPhoto={mode==="photo"}
        />
        <div style={{marginTop:14,padding:"14px 16px",borderRadius:8,border:"1px solid var(--bd)",background:"var(--s1)"}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,.65)"}}>💡 Next step:</span>
            <button onClick={()=>setPage("angles")} style={{padding:"7px 14px",borderRadius:6,border:"1px solid var(--acc)",background:"var(--acdim)",color:"var(--acc)",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              🎬 Multi-Shot
            </button>
            <button onClick={()=>setPage("video")} style={{padding:"7px 14px",borderRadius:6,border:"1px solid var(--bd)",background:"var(--s2)",color:"var(--t)",fontSize:11,fontWeight:600,cursor:"pointer"}}>
              🎥 Video
            </button>
          </div>
        </div>
      </div>

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
  {label:"Arena.ai",url:"https://arena.ai/?mode=direct&chat-modality=image",icon:"⊕",hi:true},
  {label:"Grok Imagine",url:"https://grok.com/imagine",icon:"✦"},
  {label:"Gemini",url:"https://gemini.google.com",icon:"◇"},
];

function buildVideoPrompt({scene,firstFrame,lastFrame,camMove,pacing,duration,sound,lighting,colorGrade,lens,filmStock,style,custom,videoMode}){
  if(!scene.trim()&&!firstFrame.trim()&&!lastFrame.trim())return"";

  const getLighting=()=>{const l=LIGHTING.find(x=>x.id===lighting);return l?l.p:null;};
  const getColor=()=>{const c=COLOR_GRADES.find(x=>x.id===colorGrade);return c?c.p:null;};
  const getFilm=()=>{const f=FILM_STOCKS.find(x=>x.id===filmStock);return f?f.p:null;};
  const getLens=()=>lens?lens+" focal length lens":null;

  const styleMap={
    "Cinematic":"cinematic film quality",
    "Documentary":"documentary realism, handheld feel",
    "Commercial":"polished commercial production",
    "Music Video":"music video aesthetic, stylized",
    "Short Film":"short film narrative quality",
    "Animation":"animated film style",
  };

  const camMoveMap={
    "Static":"static locked-off camera",
    "Slow Push In":"slow push-in toward subject",
    "Pull Back":"slow pull-back reveal",
    "Pan Left":"smooth pan left",
    "Pan Right":"smooth pan right",
    "Tilt Up":"slow tilt up",
    "Tilt Down":"slow tilt down",
    "Orbit":"orbital camera movement around subject",
    "Crane Up":"crane shot rising upward",
    "Handheld":"natural handheld camera",
    "Tracking":"tracking shot following subject",
    "Drone":"aerial drone camera",
  };

  const parts=[];

  // Opening sentence — what to make
  const styleLabel=(styleMap[style]||"cinematic").split(",")[0];
  const durLabel=duration||"";
  if(videoMode==="img2vid"){
    parts.push(`Create a ${durLabel} ${styleLabel} video animating the provided reference image.`);
  } else if(videoMode==="frames"){
    parts.push(`Create a ${durLabel} ${styleLabel} video transitioning between the provided first and last frame images.`);
  } else if(scene.trim()){
    parts.push(`Create a ${durLabel} ${styleLabel} video of: ${scene.trim()+(scene.trim().endsWith(".")?"":", ")}`)
  }

  // Camera
  const camParts=[];
  if(camMove&&camMove!=="Static"&&camMoveMap[camMove])camParts.push(camMoveMap[camMove]);
  if(lens)camParts.push(getLens());
  if(camParts.length)parts.push("Camera: "+camParts.join(", ")+".");

  // Visual atmosphere
  const visParts=[getLighting(),getColor(),getFilm()].filter(Boolean);
  if(visParts.length)parts.push(visParts.join(". ")+".");

  // Timing
  const timeParts=[];
  if(duration)timeParts.push(duration+" duration");
  if(pacing&&pacing!=="Normal Flow"){
    const pacingMap={"Slow Motion":"slow motion","Fast Cut":"fast-cut editing","Time Lapse":"time-lapse","Match Cut":"match-cut transitions"};
    if(pacingMap[pacing])timeParts.push(pacingMap[pacing]);
  }
  if(sound&&sound!=="Silent"&&sound!=="Ambient Sound"){
    const soundMap={"Dialogue":"with dialogue","Music Score":"with music score","Sound Effects":"with sound effects","No Sound":"no audio"};
    if(soundMap[sound])timeParts.push(soundMap[sound]);
  }
  if(timeParts.length)parts.push(timeParts.join(", ")+".");

  // Frames
  if(firstFrame.trim())parts.push("Opening frame: "+firstFrame.trim()+".");
  if(lastFrame.trim())parts.push("Closing frame: "+lastFrame.trim()+".");

  // Custom
  if(custom.trim())parts.push(custom.trim());

  // Output spec + quality
  parts.push("Ultra high resolution, smooth motion, physically plausible lighting with consistent directionality. Realistic skin texture if people visible — no plastic effect. Correct anatomy and proportions throughout all frames. No flickering, no morphing artifacts, no temporal inconsistencies. No text, watermarks, logos, or UI elements.");

  return parts.join(" ");
}

function buildFramePrompt(frameDesc,{lighting,colorGrade,lens,filmStock,style}){
  if(!frameDesc.trim())return"";
  const getLighting=()=>{const l=LIGHTING.find(x=>x.id===lighting);return l?l.p:null;};
  const getColor=()=>{const c=COLOR_GRADES.find(x=>x.id===colorGrade);return c?c.p:null;};
  const getFilm=()=>{const f=FILM_STOCKS.find(x=>x.id===filmStock);return f?f.p:null;};
  const parts=[frameDesc.trim()];
  const vis=[getLighting(),getColor(),getFilm()].filter(Boolean);
  if(vis.length)parts.push(vis.join(". ")+".");
  if(lens)parts.push(lens+" focal length lens.");
  const styleMap={"Cinematic":"cinematic film quality, professional cinematography","Documentary":"documentary realism","Commercial":"polished commercial photography","Music Video":"stylized music video aesthetic"};
  parts.push((styleMap[style]||"cinematic quality")+", ultra high resolution, sharp focus. Realistic skin texture with visible pores if people present, exactly 5 fingers per hand. No text, watermarks, logos, no extra fingers, no deformed hands, no plastic skin.");
  return parts.join(" ");
}

function VideoPromptPage(){
  const[videoMode,setVideoMode]=useState("txt2vid"); // "txt2vid" | "img2vid" | "frames"
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

  const vparams={scene,firstFrame,lastFrame,camMove,pacing,duration,sound,lighting,colorGrade,lens,filmStock,style,custom,videoMode};
  const prompt=buildVideoPrompt(vparams);
  const hasAny=!!(scene.trim()||firstFrame.trim()||lastFrame.trim());
  const videoEJ=hasAny?buildExpertJSON({
    taskType:`video_${videoMode}`,
    inputMode:videoMode==="img2vid"?"image_to_image":"text_to_image",
    originalPrompt:prompt,
    subject:scene.trim()||"as described in frame directions",
    lighting,environment:null,lens,filmStock,colorGrade:null,aspectRatio:"16:9",
    style:style,mood:null,composition:null,custom:custom.trim()||null,
    extra:{video_config:{mode:videoMode,camera_movement:camMove,pacing,duration,sound_design:sound,
      first_frame:firstFrame.trim()||null,last_frame:lastFrame.trim()||null}}
  }):null;

  const copy=async()=>{const ok=await copyText(prompt);doToast(ok?"COPIED":"COPY FAILED");};
  const reset=()=>{setScene("");setFirstFrame("");setLastFrame("");setCamMove("Static");setPacing("Normal Flow");setDuration("8s");setSound("Ambient Sound");setStyle("Cinematic");setLighting(null);setColorGrade(null);setLens(null);setFilmStock(null);setCustom("");doToast("RESET");};
  const videoRandom=()=>{
    const scenes=["A lone wanderer crossing a neon-soaked cyberpunk bridge at midnight","Golden hour over ancient ruins, dust motes drifting in warm amber light","A spacecraft departing a space station, Earth visible below","Deep underwater, bioluminescent creatures drifting through dark coral","A mountaintop monastery in heavy snowfall, lanterns glowing orange"];
    setScene(scenes[~~(Math.random()*scenes.length)]);
    setCamMove(VP_CAM_MOVES[~~(Math.random()*VP_CAM_MOVES.length)]);
    setPacing(VP_PACING_OPTS[~~(Math.random()*VP_PACING_OPTS.length)]);
    setDuration(VP_DURATION[~~(Math.random()*VP_DURATION.length)]);
    setSound(VP_SOUND[~~(Math.random()*VP_SOUND.length)]);
    setStyle(VP_STYLE_OPTS[~~(Math.random()*VP_STYLE_OPTS.length)]);
    setLighting(LIGHT_SPRITES[~~(Math.random()*LIGHT_SPRITES.length)].id);
    setColorGrade(COLOR_SPRITES[~~(Math.random()*COLOR_SPRITES.length)].id);
    setLens(LENS_SPRITES[~~(Math.random()*LENS_SPRITES.length)].mm);
    doToast("RANDOM CONFIGURATION");
  };
  const tog1=(setter,id)=>setter(p=>p===id?null:id);

  const ORow=({label,stateKey,val,onSet,opts})=>(
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t)"}}>{label}</div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {opts.map(o=>(
          <button key={o} className={`ob${val===o?" sel":""}`} onClick={()=>onSet(stateKey,o)} translate="no">{o}</button>
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

  const modeBtn=(id,icon,title,sub)=>(
    <button onClick={()=>setVideoMode(id)} style={{
      flex:1,padding:"14px 16px",borderRadius:8,cursor:"pointer",textAlign:"left",
      border:`2px solid ${videoMode===id?"var(--acc)":"var(--bdh)"}`,
      background:videoMode===id?"var(--acdim)":"var(--s2)",
      transition:"all .2s"
    }}>
      <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
      <div style={{fontSize:13,fontWeight:800,color:videoMode===id?"var(--acc)":"var(--t)"}}>{title}</div>
      <div style={{fontSize:11,color:"var(--t)",opacity:.6,marginTop:3,lineHeight:1.4}}>{sub}</div>
    </button>
  );

  return(
    <div className="page">
      <PipelineStrip active={2}/>
      <div style={{margin:"0 0 20px",padding:"10px 16px",borderRadius:8,border:"1px solid rgba(255,180,0,.3)",background:"rgba(255,180,0,.07)",fontSize:12,color:"var(--t)",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:16}}>🚧</span>
        <span><strong style={{color:"rgba(255,200,80,.9)"}}>Under Construction</strong> — Video prompt builder is work in progress. Prompt generation works but may need tuning.</span>
      </div>
      <div className="ph">
        <div className="pt">🎬 Video <b>Prompt</b></div>
        <div className="ps">Build cinematic video prompts for Sora, Runway, Kling and Pika.</div>
        <div style={{marginTop:8,textAlign:"center"}}><HowLink section="standalone tools"/></div>
      </div>

      {/* MODE SELECTOR */}
      <div className="sec">
        <div className="sh"><span className="st">What are you making?</span></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {modeBtn("txt2vid","✍️","Text to Video","No reference image — describe a new scene from scratch and generate video directly.")}
          {modeBtn("img2vid","📸","Image to Video","Animate an existing image. Attach your photo/render as reference — AI continues or transforms it.")}
          {modeBtn("frames","🎞","First + Last Frame","Define opening and closing frames from your Multi-Shot grid, AI fills the motion between them.")}
        </div>
      </div>

      {/* MODE HINTS */}
      {videoMode==="img2vid"&&(
        <div style={{margin:"-16px 0 24px",padding:"10px 14px",borderRadius:8,border:"1px solid rgba(255,180,0,.25)",background:"rgba(255,180,0,.06)",fontSize:12,color:"var(--t)",lineHeight:1.6}}>
          📎 <strong style={{color:"rgba(255,200,80,.9)"}}>Attach your reference image</strong> in the AI generator — the prompt instructs it to animate from that image.
        </div>
      )}
      {videoMode==="frames"&&(
        <div style={{margin:"-16px 0 24px",padding:"10px 14px",borderRadius:8,border:"1px solid rgba(120,180,255,.25)",background:"rgba(120,180,255,.06)",fontSize:12,color:"var(--t)",lineHeight:1.6}}>
          💡 Use <strong style={{color:"var(--acc)"}}>Character Sheet</strong> or <strong style={{color:"var(--acc)"}}>Multi-Shot</strong> to generate your character/scene grid first, then use panel prompts here as first &amp; last frames.
        </div>
      )}

      <div className="sec">
        <div className="sh"><span className="st">Scene</span><span className="sb" translate="no">CORE</span></div>
        <textarea rows={3} value={scene} onChange={e=>setScene(e.target.value)}
          placeholder="What happens in the video? e.g. A lone figure walks through a rain-soaked city street at night, neon reflections on the pavement..."/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,padding:"0 0 4px"}}>
        <div className="sec" style={{margin:0}}>
          <div className="sh"><span className="st">First Frame</span><span className="sb" translate="no">OPENING</span></div>
          <textarea rows={3} value={firstFrame} onChange={e=>setFirstFrame(e.target.value)}
            placeholder="Opening shot description — used as image prompt for frame generation"/>
        </div>
        <div className="sec" style={{margin:0}}>
          <div className="sh"><span className="st">Last Frame</span><span className="sb" translate="no">CLOSING</span></div>
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
          {LIGHT_SPRITES.map(l=>(
            <div key={l.id} className={`scard${lighting===l.id?" sel":""}`} onClick={()=>tog1(setLighting,l.id)}>
              <div className="simg" style={{width:150,height:105,backgroundImage:"url(/lighting.png)",backgroundSize:"750px 315px",backgroundPosition:`${l.sx}px ${l.sy}px`}}/>
              <div className="slabel" translate="no">{l.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Color Grade</span></div>
        <div className="sprite-grid">
          {COLOR_SPRITES.map(c=>(
            <div key={c.id} className={`scard${colorGrade===c.id?" sel":""}`} onClick={()=>tog1(setColorGrade,c.id)}>
              <div className="simg" style={{width:150,height:167,backgroundImage:"url(/color.png)",backgroundSize:"600px 334px",backgroundPosition:`${c.sx}px ${c.sy}px`}}/>
              <div className="slabel" translate="no">{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Lens</span></div>
        <div className="sprite-grid">
          {LENS_SPRITES.map(l=>(
            <div key={l.mm} className={`scard${lens===l.mm?" sel":""}`} onClick={()=>tog1(setLens,l.mm)}>
              <div className="simg" style={{width:150,height:83,backgroundImage:"url(/lens.png)",backgroundSize:"600px 332px",backgroundPosition:`${l.sx}px ${l.sy}px`}}/>
              <div className="slabel" translate="no">{l.mm}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Film Stock</span></div>
        <div className="sprite-grid">
          {FILM_SPRITES.map(f=>(
            <div key={f.id} className={`scard${filmStock===f.id?" sel":""}`} onClick={()=>tog1(setFilmStock,f.id)}>
              <div className="simg" style={{width:150,height:167,backgroundImage:"url(/film.png)",backgroundSize:"600px 334px",backgroundPosition:`${f.sx}px ${f.sy}px`}}/>
              <div className="slabel" translate="no">{f.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Custom Additions</span><span className="sb" translate="no">OPTIONAL</span></div>
        <textarea rows={2} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Additional notes, props, atmosphere, negative elements..."/>
      </div>

      <div className="sec">
        <div className="sh"><span className="st">Video Prompt</span>{hasAny&&<span className="sb" translate="no">LIVE</span>}</div>
        <PromptOutputPanel
          prompt={prompt}
          custom={custom}
          hasAny={hasAny}
          onToast={doToast}
          expertJSON={videoEJ}
          extraButtons={
            <>
              <button className="btn" onClick={reset}>Reset</button>
              <button className="btn" onClick={videoRandom}>Random</button>
            </>
          }
        />
        {hasAny&&<GenWithLinks getPrompt={()=>prompt} onCopy={()=>doToast("VIDEO PROMPT COPIED")} targets={VID_GEN_TARGETS}/>}
      </div>

      {(firstFrame.trim()||lastFrame.trim())&&(
        <div className="sec">
          <div className="sh"><span className="st">Frame Generation</span><span className="sb" translate="no">IMAGE PROMPTS</span></div>
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

// ─── PIPELINE STRIP ───────────────────────────────────────────────────────────
function PipelineStrip({active}){
  const setPage=React.useContext(PageCtx);
  const steps=[
    {n:1,label:"Character",page:"avatars",icon:"🧬"},
    {n:2,label:"Multi-Shot",page:"angles",icon:"🎬"},
    {n:3,label:"Generate",page:null,icon:"✦"},
    {n:4,label:"Expand",page:"how",icon:"🔍"},
  ];
  const colors=["#e8780a","#4fa3e0","#a78bfa","#34d399"];
  return(
    <div style={{display:"flex",alignItems:"center",gap:2,marginBottom:20,padding:"8px 12px",borderRadius:8,background:"var(--s2)",border:"1px solid var(--bdh)",overflowX:"auto",flexWrap:"nowrap"}}>
      {steps.map((s,i)=>{
        const isActive=s.n===active;
        const isDone=s.n<active;
        const color=colors[i];
        return(
          <React.Fragment key={s.n}>
            <button
              onClick={s.page?()=>setPage(s.page):undefined}
              title={s.page?"Go to "+s.label:null}
              style={{
                display:"flex",alignItems:"center",gap:6,padding:"5px 10px",borderRadius:6,
                border:isActive?`1px solid ${color}55`:"1px solid transparent",
                background:isActive?`${color}18`:"transparent",
                cursor:s.page?"pointer":"default",flexShrink:0,
                opacity:isDone?.7:isActive?1:.4,transition:"all .15s"
              }}
            >
              <span style={{fontSize:13}}>{s.icon}</span>
              <span style={{fontSize:11,fontWeight:isActive?800:600,color:isActive?color:"var(--t)",whiteSpace:"nowrap",letterSpacing:.3}}>
                {s.n}. {s.label}
              </span>
              {isDone&&<span style={{fontSize:10,color:color}}>✓</span>}
            </button>
            {i<3&&<span style={{color:"var(--bd)",fontSize:12,flexShrink:0,padding:"0 2px"}}>→</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── HOW IT WORKS PAGE ────────────────────────────────────────────────────────
// ─── EXPANDABLE "MORE" BLOCK ─────────────────────────────────────────────────
function ExMoreBlock({children}){
  const[open,setOpen]=useState(false);
  const items=Array.isArray(children)?children:[];
  return(
    <div>
      <button onClick={()=>setOpen(v=>!v)} style={{fontSize:11,fontWeight:700,color:"var(--t4)",cursor:"pointer",background:"none",border:"none",padding:0,letterSpacing:1}}>
        {open?"▾ Less":"▸ More details..."}
      </button>
      {open&&(
        <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>
          {items.map((item,i)=>(
            <div key={i} style={{fontSize:12,color:"var(--t)",opacity:.65,lineHeight:1.7,paddingLeft:12,borderLeft:"2px solid var(--bd)"}}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HowLink({section}){
  const setPage=React.useContext(PageCtx);
  return(
    <span onClick={()=>setPage("how")} style={{fontSize:11,color:"var(--t4)",cursor:"pointer",marginLeft:8,fontWeight:500,opacity:.7,transition:"all .15s"}}
      onMouseOver={e=>{e.currentTarget.style.color="var(--acc)";e.currentTarget.style.opacity=1;}}
      onMouseOut={e=>{e.currentTarget.style.color="var(--t4)";e.currentTarget.style.opacity=.7;}}>
      How it works{section?` — ${section}`:""} →
    </span>
  );
}

function HowItWorksPage(){
  const setPage = React.useContext(PageCtx);
  const acc = ["#e8780a","#4fa3e0","#a78bfa","#34d399"];

  return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"40px 24px 80px"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <div style={{fontSize:28,fontWeight:800,color:"var(--t)",letterSpacing:-0.5}}>
          How PrompTo <span style={{color:"var(--acc)"}}>miniStudio</span> works
        </div>
        <div style={{fontSize:14,color:"var(--t)",opacity:.6,marginTop:8,maxWidth:560,margin:"10px auto 0"}}>
          Six tools, one connected pipeline. Build characters, compose shots, animate video — or skip straight to a free-form scene.
        </div>
      </div>

      {/* ═══ MAIN PIPELINE ═══ */}
      <div style={{fontSize:11,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:"var(--t4)",marginBottom:16}}>MAIN PIPELINE</div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {[0,1,2,3].map(i=>{
          const color = acc[i];
          const num = i+1;
          const isLast = i===3;
          const configs = [
            {icon:"🧬", title:"Character Sheet", sub:"Build your character or pet", page:"avatars",
             body:"Design a human character or choose your pet, breed, coat, and accessories. Use Random to explore — or skip straight to Pet Studio if you already know what you want.",
             note:null, links:null, cta:"Open Character Sheet →"},
            {icon:"🎬", title:"Multi-Shot", sub:"Compose cinematic camera angles", page:"angles",
             body:"Pick camera angles, lighting, environment, lens and film stock. The tool builds a structured prompt that tells the AI to produce multiple numbered shots of the same subject in one composite grid.",
             note:null, links:null, cta:"Open Multi-Shot →"},
            {icon:"✦", title:"Generate in your AI of choice", sub:"Arena.ai · Grok · Gemini · ChatGPT",
             body:"Copy the prompt, paste it into an image generator, and attach your reference photo if you have one. The AI returns a numbered composite grid — one image, multiple cinematic shots.",
             note:"📎 Attach your reference photo every time for consistent character identity.",
             links:[
               {label:"Arena.ai ↗", url:"https://arena.ai/?mode=direct&chat-modality=image"},
               {label:"Grok Imagine ↗", url:"https://grok.com/imagine"},
               {label:"Gemini ↗", url:"https://gemini.google.com"},
               {label:"ChatGPT Images ↗", url:"https://chatgpt.com/images"},
             ], cta:null},
            {icon:"🔍", title:"Expand any panel to full resolution", sub:"Back in Multi-Shot", page:"angles",
             body:"Attach your generated grid back to the AI. In Multi-Shot → Expand Panel to Full Shot, each numbered panel has its own expansion prompt. Click the panel number, attach the grid, get a single full-quality image.",
             note:"💡 The grid is your consistency anchor — always attach it when expanding.",
             links:null, cta:"Open Multi-Shot →"},
          ];
          const c = configs[i];
          return(
            <div key={i} style={{display:"flex",gap:0}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:56,flexShrink:0}}>
                <div style={{width:44,height:44,borderRadius:"50%",background:`${color}22`,border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:color,flexShrink:0,zIndex:1}}>{num}</div>
                {!isLast&&<div style={{width:2,flexGrow:1,background:`linear-gradient(${color}88,${acc[i+1]}44)`,minHeight:32,margin:"4px 0"}}/>}
              </div>
              <div style={{flexGrow:1,marginBottom:isLast?0:16,marginLeft:16,padding:"18px 20px",borderRadius:8,border:`1px solid ${color}33`,background:`${color}08`}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <span style={{fontSize:20}}>{c.icon}</span>
                  <div>
                    <div style={{fontSize:15,fontWeight:800,color:"var(--t)"}}>{c.title}</div>
                    <div style={{fontSize:11,color:color,fontWeight:600,letterSpacing:.5,marginTop:1}}>{c.sub}</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:"var(--t)",opacity:.8,lineHeight:1.65,marginBottom:c.note||c.links||c.cta?12:0}}>{c.body}</div>
                {c.note&&<div style={{fontSize:11,color:"var(--t)",opacity:.6,background:"rgba(255,255,255,.04)",borderRadius:6,padding:"7px 10px",marginBottom:10,lineHeight:1.5}}>{c.note}</div>}
                {c.links&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {c.links.map(l=>(
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                        style={{padding:"6px 14px",borderRadius:6,border:`1px solid ${color}55`,background:`${color}11`,color:color,fontSize:12,fontWeight:700,textDecoration:"none",transition:"all .2s"}}
                        onMouseOver={e=>{e.currentTarget.style.background=`${color}28`}}
                        onMouseOut={e=>{e.currentTarget.style.background=`${color}11`}}
                      >{l.label}</a>
                    ))}
                  </div>
                )}
                {c.cta&&(
                  <button onClick={()=>setPage(c.page)}
                    style={{marginTop:4,padding:"7px 16px",borderRadius:6,border:`1px solid ${color}`,background:"transparent",color:color,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .2s"}}
                    onMouseOver={e=>{e.currentTarget.style.background=`${color}22`}}
                    onMouseOut={e=>{e.currentTarget.style.background="transparent"}}
                  >{c.cta}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ STANDALONE TOOLS ═══ */}
      <div style={{marginTop:56}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:"var(--t4)",marginBottom:16}}>STANDALONE TOOLS</div>
        <div style={{fontSize:13,color:"var(--t)",opacity:.5,marginBottom:24,lineHeight:1.6}}>Each tool works independently — own prompt builder, visual selectors, AI Enhance. No pipeline steps needed.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:16}}>
          {[
            {icon:"🐾",title:"Pet Studio",page:"pet",color:"#34d399",
             desc:"9 real species with breed selectors, 7 fantasy creatures, 110+ extended species. Coat, accessories, companions, product placement. Full cinematic controls shared with Multi-Shot."},
            {icon:"✦",title:"Scene Universe",page:"universe",color:"#facc15",
             desc:"Free-form scene generator. Describe any idea — pick art style, mood, composition, then dial in lighting, lens, film stock, environment with thumbnail sprite selectors. No character needed."},
            {icon:"🎥",title:"Video",page:"video",color:"#a78bfa",
             desc:"Text-to-video, image-to-video, or first+last frame mode. Camera moves, pacing, duration, sound design. Generates prompts for Sora, Runway, Kling, and Pika."},
          ].map(t=>(
            <div key={t.title} onClick={()=>setPage(t.page)}
              style={{padding:"20px 22px",borderRadius:10,border:`1px solid ${t.color}33`,background:`${t.color}08`,cursor:"pointer",transition:"all .2s"}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=t.color+"88";e.currentTarget.style.background=t.color+"15";}}
              onMouseOut={e=>{e.currentTarget.style.borderColor=t.color+"33";e.currentTarget.style.background=t.color+"08";}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{fontSize:22}}>{t.icon}</span>
                <div style={{fontSize:15,fontWeight:800,color:"var(--t)"}}>{t.title}</div>
              </div>
              <div style={{fontSize:12,color:"var(--t)",opacity:.7,lineHeight:1.65,marginBottom:12}}>{t.desc}</div>
              <div style={{fontSize:11,fontWeight:700,color:t.color}}>Open {t.title} →</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ EXAMPLE SCENARIOS ═══ */}
      <div style={{marginTop:56}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:"var(--t4)",marginBottom:16}}>EXAMPLE WORKFLOWS</div>
        <div style={{fontSize:13,color:"var(--t)",opacity:.5,marginBottom:24,lineHeight:1.6}}>Real-world scenarios showing how the tools connect. Each step links to the relevant tool — click to jump there.</div>

        {/* Scenario 1: Pet Product Shoot */}
        <div style={{padding:"22px 24px",borderRadius:10,border:"1px solid #34d39944",background:"rgba(52,211,153,.04)",marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:800,color:"var(--t)",marginBottom:4}}>
            Scenario 1 — <span style={{color:"#34d399"}}>Pet Product Marketing Shoot</span>
          </div>
          <div style={{fontSize:12,color:"var(--t)",opacity:.6,marginBottom:16,lineHeight:1.5,fontStyle:"italic"}}>
            "I designed a premium leather dog harness. I need 4 cinematic marketing shots — a Golden Retriever wearing it at golden hour, shot from multiple angles, and a 5-second hero video clip for Instagram."
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {step:"1",tool:"Pet Studio",page:"pet",color:"#34d399",text:"Open Pet Studio. Pick Dog → Golden Retriever (the breed selector shows you an actual sprite preview — you see the broad head and warm coat before you commit). Switch 'I have a product' on and describe your harness: 'premium Italian leather harness, burnished brass buckles, quilted padding, chestnut brown.' The tool now knows this product is the commercial hero of the shot."},
              {step:"2",tool:"Pet Studio",page:"pet",color:"#34d399",text:"In Accessories, check 'Harness (fitted)' — the prompt builder assigns it to the mid-ground depth plane so the harness reads clearly against the dog's fur. Set environment to Dark Forest (the warm leather pops against green), lighting to Golden Hour (side-light rakes across the buckle texture), and 85mm lens (classic product-portrait compression). Mood: playful — the dog should look happy wearing it."},
              {step:"3",tool:"Pet Studio",page:"pet",color:"#34d399",text:"Choose output: Product Showcase layout. This gives you 4 panels — front hero shot, side profile showing the full harness line, close-up on the brass hardware, and a 3/4 action shot of the dog mid-trot. The prompt auto-structures everything: character consistency rules, depth-plane product placement, photorealism requirements. Hit Copy."},
              {step:"4",tool:"Generate → Grok / Gemini",page:null,color:"#e8780a",text:"Paste the prompt into Grok Imagine (or Gemini if you prefer). Attach your actual product photo — the AI uses it as the visual reference for the harness. You get back a single 2×2 composite grid: four cinematic shots, same dog, same harness, same golden hour light, four different compositions. The numbered panels make it easy to reference later."},
              {step:"5",tool:"Multi-Shot → Expand",page:"angles",color:"#4fa3e0",text:"Happy with panel 3 (the close-up on the brass buckle)? Jump to Multi-Shot → Expand Panel to Full Shot. Select panel 3, attach your grid image as reference, copy the expansion prompt. Generate — the AI extracts that single panel and renders it at full resolution with all the detail preserved. Do the same for panel 1 (the hero shot). Now you have two high-res marketing images."},
              {step:"6",tool:"Video",page:"video",color:"#a78bfa",text:"Take the hero shot into Video. Set img2vid mode. Describe the motion: 'Golden Retriever trots happily toward camera on a forest path, golden hour side-light catches the leather harness texture, buckle gleams, shallow depth of field, leaves drift in foreground.' Set Slow Motion pacing, 5s duration, Ambient Sound. Copy for Sora — you get a cinematic product clip ready for social media."},
            ].map(s=>(
              <div key={s.step} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:`${s.color}22`,border:`1.5px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:s.color,flexShrink:0,marginTop:1}}>{s.step}</div>
                <div>
                  <span style={{fontSize:11,fontWeight:700,color:s.color,letterSpacing:.5,cursor:s.page?"pointer":"default"}} onClick={s.page?()=>setPage(s.page):undefined}>{s.tool}{s.page?" ↗":""}</span>
                  <div style={{fontSize:12,color:"var(--t)",opacity:.75,lineHeight:1.7,marginTop:3}}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scenario 2: Concept Art Pipeline */}
        <div style={{padding:"22px 24px",borderRadius:10,border:"1px solid #facc1544",background:"rgba(250,204,21,.03)"}}>
          <div style={{fontSize:15,fontWeight:800,color:"var(--t)",marginBottom:4}}>
            Scenario 2 — <span style={{color:"#facc15"}}>Sci-Fi Concept Art for a Pitch Deck</span>
          </div>
          <div style={{fontSize:12,color:"var(--t)",opacity:.6,marginBottom:16,lineHeight:1.5,fontStyle:"italic"}}>
            "I'm pitching a sci-fi animated series. I need a hero character — a cyberpunk detective with a prosthetic arm — shown in 5 different cinematic angles, plus a short mood video. No reference photo yet — starting from zero."
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {step:"1",tool:"Scene Universe",page:"universe",color:"#facc15",text:"Start here because you don't have a character sheet yet — you have a vibe. Type: 'a world-weary cyberpunk detective in a long dark trenchcoat, left arm replaced with a glowing prosthetic, stubble, tired eyes, standing in a rain-soaked alley.' Pick Photorealism style, Dramatic mood, Portrait composition. For environment: Cyberpunk Alley. Lighting: Neon Night — those colored light spills sell the genre instantly. Lens: 85mm portrait. Film: Cinestill 800T (that halation glow around neon lights is pure cyberpunk). Color grade: Teal & Orange."},
              {step:"2",tool:"Generate",page:null,color:"#e8780a",text:"Copy the Scene Universe prompt. Open Grok Imagine. No reference photo yet — that's fine, this is txt2img. Generate. You get back a single cinematic hero shot: your detective, rain-soaked, neon reflections on wet pavement, prosthetic arm glowing through trenchcoat sleeve. This is your anchor image — save it. It becomes the reference for everything that follows."},
              {step:"3",tool:"Character Sheet",page:"avatars",color:"#e8780a",text:"Now lock down the identity. Open Character Sheet, build the same detective: male, mid-40s, weathered complexion, short dark hair with grey streaks, cybernetic left arm (use the Asymmetric limbs section — L arm: cybernetic / R arm: organic). Trenchcoat from Wardrobe. Switch to 'From Reference Photo' mode and attach the hero shot from step 2. The prompt now contains both the visual reference AND the explicit trait description — this is how you get identity consistency across all future generations."},
              {step:"4",tool:"Multi-Shot",page:"angles",color:"#4fa3e0",text:"Paste the Character Sheet prompt into Multi-Shot's scene field. Now pick your 5 angles for the pitch deck: wide establishing shot (detective small in the vast alley), low-angle hero shot (looking up at him, powerful), over-the-shoulder (something he's looking at — mystery), profile silhouette (backlit by neon, iconic), extreme close-up (cybernetic eye detail). Set the same Neon Night + Cinestill 800T + 85mm. Attach the hero image as reference. Generate a 3×2 grid."},
              {step:"5",tool:"Multi-Shot → Expand",page:"angles",color:"#4fa3e0",text:"The grid comes back with 5 numbered panels plus one empty slot. Each panel is the same detective, same alley, same rain — but from wildly different angles. The silhouette shot (panel 4) looks incredible for a title card. Expand it: click panel 4, copy the expansion prompt, attach the grid, generate in Grok. Full-resolution cinematic silhouette — this goes on slide 1 of your deck. Repeat for the close-up (panel 5) — that cybernetic eye detail goes on the character page."},
              {step:"6",tool:"Video",page:"video",color:"#a78bfa",text:"For the pitch deck's opening, you want movement. Take the wide establishing shot (expanded panel 1) into Video. Set img2vid mode. Scene: 'Camera slowly pushes forward through rain-soaked alley, neon signs flicker, puddles reflect colored light, detective stands motionless at far end, smoke drifts, trenchcoat ripples slightly.' Pacing: Slow Cinematic. Duration: 8s. Camera: Slow Dolly Forward. Sound: Rain Ambience. Export for Runway or Sora. Embed the clip as the first thing your investors see."},
            ].map(s=>(
              <div key={s.step} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:`${s.color}22`,border:`1.5px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:s.color,flexShrink:0,marginTop:1}}>{s.step}</div>
                <div>
                  <span style={{fontSize:11,fontWeight:700,color:s.color,letterSpacing:.5,cursor:s.page?"pointer":"default"}} onClick={s.page?()=>setPage(s.page):undefined}>{s.tool}{s.page?" ↗":""}</span>
                  <div style={{fontSize:12,color:"var(--t)",opacity:.75,lineHeight:1.7,marginTop:3}}>{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ GENERATORS ═══ */}
      <div style={{marginTop:56}} id="generators">
        <div style={{fontSize:11,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:"var(--t4)",marginBottom:16}}>FREE IMAGE GENERATORS</div>
        <div style={{fontSize:13,color:"var(--t)",opacity:.7,marginBottom:8,lineHeight:1.7}}>
          Every tool in PrompTo miniStudio outputs a prompt you copy and paste into an external AI image generator. These generators are free (with limits) and open in a new tab when you click them. <span style={{color:"var(--acc)",fontWeight:600}}>Arena.ai</span> is highlighted as default — it accepts long prompts well and runs multiple models side by side.
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginBottom:20,lineHeight:1.6,padding:"10px 14px",borderRadius:8,border:"1px solid var(--bd)",background:"var(--s2)"}}>
          ⚠ These are third-party services — free tiers have daily/weekly limits, some require signup, and availability may change without notice. PrompTo miniStudio is not affiliated with any of them.
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {GEN_TARGETS.map(t=>(
            <a key={t.label} href={t.url} target="_blank" rel="noopener noreferrer"
              title={t.note||t.warn||""}
              style={{padding:"7px 14px",borderRadius:6,fontSize:12,fontWeight:t.hi?700:500,textDecoration:"none",transition:"all .15s",
                border:t.hi?"1px solid var(--acc)":"1px solid var(--bd)",
                background:t.hi?"var(--acdim)":"var(--s2)",
                color:t.hi?"var(--acc)":"var(--t)"}}>
              {t.icon} {t.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* ═══ OUTPUT FORMATS ═══ */}
      <div style={{marginTop:48}} id="output-formats">
        <div style={{fontSize:11,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:"var(--t4)",marginBottom:16}}>OUTPUT FORMATS — WHAT YOU GET</div>
        <div style={{fontSize:13,color:"var(--t)",opacity:.7,marginBottom:20,lineHeight:1.7}}>
          Every page in the studio generates your prompt in three formats. Switch between them using the tabs above the prompt preview.
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Original Prompt */}
          <div style={{padding:"16px 20px",borderRadius:10,border:"1px solid rgba(74,222,128,.25)",background:"rgba(34,197,94,.04)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:11,fontWeight:700,color:"#4ade80",letterSpacing:1,padding:"3px 10px",borderRadius:4,background:"rgba(34,197,94,.12)"}}>ORIGINAL PROMPT</span>
            </div>
            <div style={{fontSize:13,color:"var(--t)",opacity:.8,lineHeight:1.7}}>
              Plain text — works everywhere. Copy and paste into any generator from the list above. This is what most people use. The prompt describes your scene, character, or pet in natural language with all the technical parameters (lighting, lens, film stock) embedded as descriptive sentences.
            </div>
          </div>
          {/* Expert JSON */}
          <div style={{padding:"16px 20px",borderRadius:10,border:"1px solid rgba(168,85,247,.25)",background:"rgba(168,85,247,.04)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:11,fontWeight:700,color:"#c4b5fd",letterSpacing:1,padding:"3px 10px",borderRadius:4,background:"rgba(168,85,247,.12)"}}>EXPERT JSON</span>
              <span style={{fontSize:10,color:"var(--acc)",fontWeight:600}}>advanced</span>
            </div>
            <div style={{fontSize:13,color:"var(--t)",opacity:.8,lineHeight:1.7,marginBottom:10}}>
              Structured JSON with embedded markdown — the same data, but organized into layers: identity anchoring (0.99 lock strength), scene description, camera rig, lighting setup, quality controls, and negative prompts as categorized arrays. Based on the Astronomerozge1 architecture used in NanoBanana Pro prompts.
            </div>
            <ExMoreBlock>{[
              "Expert JSON follows the Anchor-Variation-Lock pattern: identity never changes between panels, expressions/poses vary, and constraint arrays catch common AI errors (extra fingers, plastic skin, text artifacts).",
              "The creative_direction field contains markdown inside JSON — a hybrid approach. Concrete details first (subject, environment), then technical (lighting, lens), then abstract mood. This 'semantic density gradient' prevents style hallucinations.",
              "Identity lock is set to 0.99, not 1.0 — leaving 1% adaptation room for lighting prevents the 'wax figure effect' where faces look unnaturally rigid across panels.",
              "Negative prompts are split into 4 structured arrays: anatomy (11 items), technical (8), content (7), style (6) — not a single string. This gives the AI model clearer constraint boundaries.",
              "Not all generators support JSON. Best results: paste into ChatGPT, Gemini, or Grok which understand structured prompts. Arena.ai and most HuggingFace models work with the Original Prompt format.",
            ]}</ExMoreBlock>
          </div>
          {/* AI Enhanced */}
          <div style={{padding:"16px 20px",borderRadius:10,border:"1px solid rgba(232,120,10,.25)",background:"rgba(232,120,10,.04)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:11,fontWeight:700,color:"var(--acc)",letterSpacing:1,padding:"3px 10px",borderRadius:4,background:"var(--acdim)"}}>✦ AI ENHANCED</span>
              <span style={{fontSize:10,color:"var(--acc)",fontWeight:600}}>requires Google sign-in</span>
            </div>
            <div style={{fontSize:13,color:"var(--t)",opacity:.8,lineHeight:1.7}}>
              Gemini rewrites your Original Prompt as a richer, more narrative version — adding atmospheric details, cinematic language, and artistic flair. The meaning stays the same but the prose becomes more evocative. Some technical parameters (lens, lighting) may be rephrased. Free, no credit card — just a one-time Google sign-in.
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM CTA ═══ */}
      <div style={{marginTop:48,padding:"24px 28px",borderRadius:12,border:"1px solid var(--bdh)",background:"var(--s2)",textAlign:"center"}}>
        <div style={{fontSize:13,color:"var(--t)",opacity:.7,marginBottom:16}}>Ready to start?</div>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setPage("avatars")} style={{padding:"10px 24px",borderRadius:8,border:"1px solid var(--bdh)",background:"var(--s3)",color:"var(--t)",fontSize:13,fontWeight:700,cursor:"pointer"}}>🧬 Character Sheet</button>
          <button onClick={()=>setPage("angles")} style={{padding:"10px 24px",borderRadius:8,border:"1px solid var(--acc)",background:"var(--acdim)",color:"var(--acc)",fontSize:13,fontWeight:700,cursor:"pointer"}}>🎬 Multi-Shot</button>
          <button onClick={()=>setPage("pet")} style={{padding:"10px 24px",borderRadius:8,border:"1px solid var(--bdh)",background:"var(--s3)",color:"var(--t)",fontSize:13,fontWeight:700,cursor:"pointer"}}>🐾 Pet Studio</button>
          <button onClick={()=>setPage("universe")} style={{padding:"10px 24px",borderRadius:8,border:"1px solid #facc1566",background:"rgba(250,204,21,.08)",color:"#facc15",fontSize:13,fontWeight:700,cursor:"pointer"}}>✦ Scene Universe</button>
          <button onClick={()=>setPage("video")} style={{padding:"10px 24px",borderRadius:8,border:"1px solid var(--bdh)",background:"var(--s3)",color:"var(--t)",fontSize:13,fontWeight:700,cursor:"pointer"}}>🎥 Video</button>
        </div>
      </div>
    </div>
  );
}

// ─── PET STUDIO ───────────────────────────────────────────────────────────────

// ── PET SPRITE DATA ──────────────────────────────────────────────────────────
// pet-inputs.png: 2000×528, 3 cells 666.7×528 → display 160×126
const PET_INPUT_SPRITES=[
  {key:"product",label:"I have a product",   sub:"photo / description / concept",  sx:0},
  {key:"pet",    label:"I have a pet photo",  sub:"real animal — used as reference", sx:-160},
  {key:"human",  label:"I have a person photo",sub:"replaced by virtual figure",    sx:-320},
];
// ── EXTENDED SPECIES LIST — only animals NOT in the sprite grid ──────────────
const PET_EXTENDED_SPECIES=[
  {group:"🐹 Rodents",items:[
    {id:"guinea_pig_smooth",    name:"Guinea Pig — Shorthair",   desc:"smooth coat, round body, expressive eyes"},
    {id:"guinea_pig_abyssinian",name:"Guinea Pig — Abyssinian",  desc:"rosette swirls, rough wiry coat"},
    {id:"guinea_pig_peruvian",  name:"Guinea Pig — Peruvian",    desc:"very long silky floor-length coat"},
    {id:"guinea_pig_teddy",     name:"Guinea Pig — Teddy",       desc:"short dense curly coat, upturned nose"},
    {id:"guinea_pig_skinny",    name:"Guinea Pig — Skinny (Hairless)",desc:"nearly hairless, just face and feet fur"},
    {id:"rat_fancy",            name:"Fancy Rat",                desc:"intelligent, varied coat colors and markings, long tail"},
    {id:"mouse_fancy",          name:"Fancy Mouse",              desc:"small, varied coat patterns, lively"},
    {id:"chinchilla",           name:"Chinchilla",               desc:"extremely soft dense gray fur, large round ears"},
    {id:"gerbil",               name:"Mongolian Gerbil",         desc:"sandy brown, long tufted tail, upright alert stance"},
    {id:"degus",                name:"Degu",                     desc:"brown like squirrel, tufted dark tail, social"},
    {id:"hamster_roborovski",   name:"Roborovski Hamster",       desc:"tiny, sandy with white eyebrows, no dorsal stripe, very fast"},
    {id:"hamster_dwarf_russian",name:"Dwarf Russian Hamster",    desc:"small, gray-brown, dark dorsal stripe, social"},
  ]},
  {group:"🦜 Parrots — specific species",items:[
    {id:"budgie",               name:"Budgerigar / Parakeet",    desc:"small, green-yellow or blue-white, long pointed tail"},
    {id:"cockatiel",            name:"Cockatiel",                desc:"gray with yellow face and cheek patches, prominent movable crest"},
    {id:"lovebird",             name:"Lovebird",                 desc:"small, vivid green with red-orange face, round body"},
    {id:"conure_sun",           name:"Sun Conure",               desc:"brilliant yellow-orange, long tail, loud"},
    {id:"conure_green_cheeked", name:"Green-cheeked Conure",     desc:"dark green, maroon chest, playful, quieter"},
    {id:"caique",               name:"Caique",                   desc:"stocky, black cap, orange-yellow sides, very playful"},
    {id:"african_grey",         name:"African Grey",             desc:"medium gray, bright red tail, highly intelligent talker"},
    {id:"amazon_yellow_nape",   name:"Yellow-naped Amazon",      desc:"green with yellow nape patch, talkative, bold"},
    {id:"macaw_blue_gold",      name:"Blue and Gold Macaw",      desc:"blue back, yellow chest, bare white face patch, long tail"},
    {id:"macaw_scarlet",        name:"Scarlet Macaw",            desc:"vivid red with yellow and blue wings, very large"},
    {id:"macaw_hyacinth",       name:"Hyacinth Macaw",           desc:"cobalt blue all over, yellow eye ring, largest parrot"},
    {id:"cockatoo_sulphur",     name:"Sulphur-crested Cockatoo", desc:"white with yellow crest that fans dramatically"},
    {id:"cockatoo_galah",       name:"Galah Cockatoo",           desc:"pink breast and face, gray back, rounded crest"},
    {id:"eclectus",             name:"Eclectus Parrot",          desc:"male vivid green, female red and blue, extreme sexual dimorphism"},
  ]},
  {group:"🐦 Other Birds",items:[
    {id:"canary",               name:"Canary",                   desc:"small, yellow or orange, melodious singer"},
    {id:"zebra_finch",          name:"Zebra Finch",              desc:"tiny, orange cheeks, black-white striped chest"},
    {id:"society_finch",        name:"Society Finch",            desc:"brown-white, calm, very social with other finches"},
    {id:"dove_diamond",         name:"Diamond Dove",             desc:"tiny gray dove, red eye ring, gentle"},
    {id:"quail_coturnix",       name:"Coturnix Quail",           desc:"plump, mottled brown, ground-dwelling"},
    {id:"quail_button",         name:"Button Quail",             desc:"tiny, colorful, very small ground bird"},
  ]},
  {group:"🦎 Lizards",items:[
    {id:"gecko_leopard",        name:"Leopard Gecko",            desc:"yellow with dark spots, fat tail, eyelids, nocturnal"},
    {id:"gecko_crested",        name:"Crested Gecko",            desc:"eyelash-like crests over eyes, prehensile tail, varied patterns"},
    {id:"gecko_tokay",          name:"Tokay Gecko",              desc:"blue-gray with orange-red spots, large, loud call"},
    {id:"gecko_day",            name:"Giant Day Gecko",          desc:"vivid green with red markings, flat sticky toes, diurnal"},
    {id:"bearded_dragon",       name:"Bearded Dragon",           desc:"spiky throat beard, flat body, arm-waving behavior, calm"},
    {id:"iguana_green",         name:"Green Iguana",             desc:"large, green, prominent dorsal spines, dewlap, long tail"},
    {id:"chameleon_veiled",     name:"Veiled Chameleon",         desc:"tall casque on head, banded colors, slow deliberate movement"},
    {id:"chameleon_panther",    name:"Panther Chameleon",        desc:"vivid red-blue-green, spectacular color change, Madagascar"},
    {id:"skink_blue_tongue",    name:"Blue-tongued Skink",       desc:"thick heavy body, bright blue tongue, short stubby legs"},
    {id:"monitor_savannah",     name:"Savannah Monitor",         desc:"stocky, gray-brown, forked tongue, intelligent"},
    {id:"tegu_black_white",     name:"Argentine B&W Tegu",       desc:"large, black-white banded scales, dog-like intelligence"},
    {id:"frilled_lizard",       name:"Frilled-neck Lizard",      desc:"large neck frill fans open dramatically when threatened"},
    {id:"basilisk_green",       name:"Green Basilisk",           desc:"crested head and back, famous for running on water"},
  ]},
  {group:"🐍 Snakes",items:[
    {id:"snake_corn",           name:"Corn Snake",               desc:"orange-red saddle blotches on brown-tan, slender, very docile"},
    {id:"snake_ball_python",    name:"Ball Python",              desc:"dark chocolate-brown with gold-tan pattern, stout, curls into tight ball"},
    {id:"snake_boa_constrictor",name:"Boa Constrictor",          desc:"large, brown saddle pattern, tail reddening toward tip"},
    {id:"snake_milk",           name:"Milk Snake",               desc:"red-black-white banded rings, slender, mimics coral snake"},
    {id:"snake_rainbow_boa",    name:"Rainbow Boa",              desc:"brown base with full iridescent rainbow sheen in light"},
    {id:"snake_hognose",        name:"Hognose Snake",            desc:"upturned pig-like snout, dramatic death-feigning bluffer"},
    {id:"snake_green_tree_python",name:"Green Tree Python",      desc:"vivid green coiled on branch perch, white spots on back"},
    {id:"snake_carpet_python",  name:"Carpet Python",            desc:"patterned brown-gold, variable markings, large"},
  ]},
  {group:"🐸 Amphibians",items:[
    {id:"frog_pacman",          name:"Pacman Frog",              desc:"almost perfectly round, enormous mouth, brown-green with spots"},
    {id:"frog_red_eye_tree",    name:"Red-eyed Tree Frog",       desc:"vivid green body, red eyes, orange toes, iconic"},
    {id:"frog_dart_blue",       name:"Blue Poison Dart Frog",    desc:"brilliant cobalt blue with black spots, tiny"},
    {id:"frog_dart_strawberry", name:"Strawberry Dart Frog",     desc:"bright red body with blue legs, small"},
    {id:"frog_dart_yellow",     name:"Yellow Dart Frog",         desc:"yellow with black spots, bold and active"},
    {id:"frog_tomato",          name:"Tomato Frog",              desc:"large, bright tomato red, round and inflates when threatened"},
    {id:"frog_gray_tree",       name:"Gray Tree Frog",           desc:"gray bark-like camouflage, hidden orange thighs, calls at night"},
    {id:"axolotl_leucistic",    name:"Axolotl — Leucistic Pink", desc:"pink-white body, red feathery external gills, dark eyes"},
    {id:"axolotl_wild",         name:"Axolotl — Wild-type",      desc:"dark green-brown with gold iridescent spots, red gills"},
    {id:"axolotl_golden",       name:"Axolotl — Golden Albino",  desc:"yellow-gold body, red gills, pale pink eyes"},
    {id:"axolotl_black",        name:"Axolotl — Melanoid",       desc:"solid black all over, no iridescence, red gills"},
    {id:"salamander_fire",      name:"Fire Salamander",          desc:"glossy black with bright yellow spots or stripes, stocky"},
    {id:"newt_firebelly",       name:"Fire-bellied Newt",        desc:"dark brown-black back, bright orange-red spotted belly"},
  ]},
  {group:"🐠 Freshwater Fish",items:[
    {id:"betta_veiltail",       name:"Betta — Veiltail",         desc:"long single drooping tail, vivid red or blue solid color"},
    {id:"betta_halfmoon",       name:"Betta — Halfmoon",         desc:"180-degree tail fan spread, metallic multicolor"},
    {id:"betta_crowntail",      name:"Betta — Crowntail",        desc:"spiky spiked fin ray extensions, dramatic silhouette"},
    {id:"goldfish_fantail",     name:"Goldfish — Fantail",        desc:"egg-shaped body, double tail, classic orange"},
    {id:"goldfish_oranda",      name:"Goldfish — Oranda",         desc:"prominent raspberry wen hood on head, red-white"},
    {id:"goldfish_telescope",   name:"Goldfish — Telescope Eye",  desc:"protruding bulging eyes, long flowing fins"},
    {id:"goldfish_bubble_eye",  name:"Goldfish — Bubble Eye",     desc:"large fluid-filled sacs under upward-pointing eyes"},
    {id:"discus_fish",          name:"Discus",                   desc:"flat round disc-shaped body, highly patterned and vivid"},
    {id:"oscar_cichlid",        name:"Oscar Cichlid",            desc:"large, orange-red irregular splotches on dark, dog-like personality"},
    {id:"arowana_silver",       name:"Silver Arowana",           desc:"elongated silver body, large scales, surface-skimming swimmer"},
    {id:"koi",                  name:"Koi",                      desc:"large, white-orange-black patches, dignified pond fish"},
  ]},
  {group:"🐡 Saltwater Fish",items:[
    {id:"tang_blue",            name:"Blue Tang",                desc:"royal blue oval body, yellow tail fin"},
    {id:"tang_yellow",          name:"Yellow Tang",              desc:"vivid solid yellow, oval disc body"},
    {id:"mandarin_dragonet",    name:"Mandarin Dragonet",        desc:"psychedelic swirling blue-orange-green-red patterns"},
    {id:"lionfish_red",         name:"Red Lionfish",             desc:"red-white banded, venomous feather-like pectoral spines"},
    {id:"seahorse_dwarf",       name:"Dwarf Seahorse",           desc:"tiny, upright posture, curled tail, bony armor plates"},
    {id:"angelfish_emperor",    name:"Emperor Angelfish",        desc:"adult: blue-yellow horizontal stripes, juvenile: completely different"},
    {id:"puffer_dog_face",      name:"Dog-face Puffer",          desc:"large round face, inflates when threatened, brown with white spots"},
  ]},
  {group:"🐾 Other Pets",items:[
    {id:"ferret",               name:"Ferret",                   desc:"elongated sinuous body, masked face, sable or albino or silver"},
    {id:"sugar_glider",         name:"Sugar Glider",             desc:"tiny marsupial, gliding membrane between wrists and ankles, big dark eyes"},
    {id:"capybara",             name:"Capybara",                 desc:"world's largest rodent, barrel-shaped, semi-aquatic, gentle"},
    {id:"skunk_pet",            name:"Skunk (domestic)",         desc:"black with white stripe, fluffy tail, descented, curious"},
    {id:"raccoon",              name:"Raccoon",                  desc:"black eye mask, ringed tail, dexterous washing paws"},
    {id:"fennec_fox",           name:"Fennec Fox",               desc:"tiny fox, enormous bat-like ears for heat loss, sandy color"},
    {id:"red_fox",              name:"Red Fox",                  desc:"orange-red fur, white chest and tail tip, black legs and ears"},
    {id:"opossum",              name:"Virginia Opossum",         desc:"gray-white fur, pointed pink face, prehensile tail, plays dead"},
    {id:"wallaby",              name:"Wallaby",                  desc:"small kangaroo, gray-brown, joey in pouch, hops"},
  ]},
];

const PET_REAL_SPRITES=[
  {id:"dog",      name:"Dog",      sx:0},
  {id:"cat",      name:"Cat",      sx:-100},
  {id:"rabbit",   name:"Rabbit",   sx:-200},
  {id:"horse",    name:"Horse",    sx:-300},
  {id:"hamster",  name:"Hamster",  sx:-400},
  {id:"parrot",   name:"Parrot",   sx:-500},
  {id:"turtle",   name:"Turtle",   sx:-600},
  {id:"fish",     name:"Fish",     sx:-700},
  {id:"hedgehog", name:"Hedgehog", sx:-800},
];
// pet-species-fantasy.png: 2000×280, 7 cells 285.7×280 → display 100×98 (bgSize 700×98)
const PET_FANTASY_SPRITES=[
  {id:"dragon",   name:"Dragon",         sx:0},
  {id:"unicorn",  name:"Unicorn",        sx:-100},
  {id:"griffin",  name:"Griffin",        sx:-200},
  {id:"phoenix",  name:"Phoenix",        sx:-300},
  {id:"fluffy",   name:"Fluffy Creature",sx:-400},
  {id:"hellhound",name:"Hellhound",      sx:-500},
  {id:"imp",      name:"Imp",            sx:-600},
];
// pet-breeds-dog.png: 2000×400, row0: 10 uniform cols 200px, row1: 9 non-uniform cols (10th+11th are extra poodles)
// Display: 158×158, scale=0.79, bgSize 1580×316. Row0: px=-(col×158). Row1: cpx = round(79 - centerX×0.79)
const PET_DOG_BREED_SPRITES=[
  {id:"Golden Retriever",  row:0,col:0, desc:"broad head, friendly expression, floppy ears, long luxurious golden coat"},
  {id:"German Shepherd",   row:0,col:1, desc:"pointed erect ears, wolf-like profile, tan with black saddle pattern"},
  {id:"French Bulldog",    row:0,col:2, desc:"bat ears wide at base, flat face, wrinkled skin, brindle color"},
  {id:"Labrador",          row:0,col:3, desc:"broad head, kind expression, floppy ears, short dense coat, chocolate brown"},
  {id:"Beagle",            row:0,col:4, desc:"long floppy ears set low, domed head, tricolor black white brown"},
  {id:"Dachshund",         row:0,col:5, desc:"long narrow snout, long droopy ears, elongated head, red solid color"},
  {id:"Husky",             row:0,col:6, desc:"erect triangular ears, masked face, blue almond-shaped eyes, gray and white"},
  {id:"Boxer",             row:0,col:7, desc:"wrinkled forehead, strong square jaw, black mask, fawn with white chest"},
  {id:"Poodle",            row:0,col:8, desc:"long elegant muzzle, curly dense coat, drop ears covered in curls, apricot"},
  {id:"Mixed breed",       row:0,col:9, desc:"medium-sized mixed breed, black with white markings"},
  {id:"Pomeranian",        row:1,cpx:5,    desc:"foxy face, abundant fluffy mane, small pointed ears, orange-red"},
  {id:"Shih Tzu",          row:1,cpx:-140, desc:"flat face, huge dark eyes, long flowing coat, white and gold"},
  {id:"Maltese",           row:1,cpx:-284, desc:"silky pure white coat, black button eyes and nose, small drop ears"},
  {id:"Cavalier",          row:1,cpx:-432, desc:"large round eyes, long feathered ears, soft wavy coat, Blenheim chestnut and white"},
  {id:"Havanese",          row:1,cpx:-606, desc:"silky wavy coat, dark button eyes, plumed tail over back, cream color"},
  {id:"Boston Terrier",    row:1,cpx:-765, desc:"bat ears, large round eyes, short square face, black and white tuxedo markings"},
  {id:"Yorkshire Terrier", row:1,cpx:-896, desc:"small erect ears, long straight silky coat, steel blue and tan color"},
  {id:"Pug",               row:1,cpx:-1031,desc:"flat wrinkled face, large prominent eyes, fawn with black mask"},
  {id:"Mini Schnauzer",    row:1,cpx:-1162,desc:"bushy beard and eyebrows, wiry coat, rectangular head, salt and pepper"},
];
// pet-breeds-cat.png: 2000×437, 9 cols × 2 rows, each cell 222×218
// Display: 158×154 → scale=0.712 → bgSize 1422×311 → row0 posY=0, row1 posY=-154, colX=-(col×158)
const PET_CAT_BREED_SPRITES=[
  {id:"European Shorthair",   row:0,col:0, desc:"tabby pattern with M marking on forehead, medium upright ears, green eyes, short dense coat"},
  {id:"Maine Coon",           row:0,col:1, desc:"large tufted ears with lynx tips, square muzzle, heavy mane and ruff, long shaggy brown tabby coat"},
  {id:"Persian",              row:0,col:2, desc:"completely flat brachycephalic face, tiny rounded ears set low, extremely long flowing white coat, large round copper eyes"},
  {id:"Siamese",              row:0,col:3, desc:"extreme wedge-shaped triangular head, large triangular ears, deep vivid blue eyes, dark brown points on cream body"},
  {id:"British Shorthair",    row:0,col:4, desc:"round massive head with prominent chubby cheeks, round copper eyes, dense plush teddy-bear coat, solid blue-gray"},
  {id:"Ragdoll",              row:0,col:5, desc:"large oval brilliant blue eyes, semi-long silky coat, colorpoint with distinctive pure white mittens on paws"},
  {id:"Sphynx",               row:0,col:6, desc:"completely hairless wrinkled skin, enormous bat-like ears, lemon-shaped eyes, black skin visible"},
  {id:"Scottish Fold",        row:0,col:7, desc:"tiny ears folded forward and downward, round owl-like face, huge round copper eyes, short dense blue-gray coat"},
  {id:"Bengal",               row:0,col:8, desc:"dramatic leopard-like spotted and rosette pattern, small wild head, pronounced whisker pads, glittered gold coat"},
  {id:"Abyssinian",           row:1,col:0, desc:"ticked coat each hair banded multiple colors ruddy brown with black tipping, large alert ears, elegant wedge head"},
  {id:"Exotic Shorthair",     row:1,col:1, desc:"flat face like Persian but short plush coat, large round copper eyes, silver tabby pattern on silver background"},
  {id:"Burmese",              row:1,col:2, desc:"glossy satin-like coat, rich sable brown solid color, rounded head with full cheeks, large round gold eyes"},
  {id:"Russian Blue",         row:1,col:3, desc:"silver-tipped blue coat that shimmers, triangular head with flat plane, vivid green eyes, large ears wide at base"},
  {id:"Devon Rex",            row:1,col:4, desc:"pixie-like elfin head, huge low-set bat ears, wavy and curly short black coat, high prominent cheekbones"},
  {id:"Turkish Angora",       row:1,col:5, desc:"long fine silky white coat, elegant wedge head, large pointed ears, brilliant blue eyes"},
  {id:"Norwegian Forest Cat", row:1,col:6, desc:"triangular head with long nose, large tufted ears with lynx tips, heavy neck ruff, long water-resistant black and silver tabby coat"},
  {id:"Birman",               row:1,col:7, desc:"semi-long silky coat, colorpoint pattern with pure white gloves on all four paws, deep blue eyes, round head with full cheeks"},
  {id:"Oriental Shorthair",   row:1,col:8, desc:"extreme wedge-shaped triangular head, hugely exaggerated ears, long slender muzzle, solid black short coat, vivid green eyes"},
];
// pet-breeds-horse.png: 2000×327, 6 cols × 1 row, each cell 333×327
// Display: 190×185 → scale=0.570 → bgSize 1140×186 → row0 posY=0, colX=-(col×190)
const PET_HORSE_BREED_SPRITES=[
  {id:"Arabian",       row:0,col:0, desc:"chestnut color, refined dished profile, large nostrils, arched neck, high tail carriage"},
  {id:"Thoroughbred",  row:0,col:1, desc:"bay color, long elegant neck, lean athletic build, deep chest"},
  {id:"Quarter Horse", row:0,col:2, desc:"palomino color, broad forehead, short refined head, muscular compact build"},
  {id:"Friesian",      row:0,col:3, desc:"jet black color, thick flowing mane, feathered lower legs, arched powerful neck"},
  {id:"Appaloosa",     row:0,col:4, desc:"spotted coat pattern brown spots on light background, strong sturdy build"},
  {id:"Andalusian",    row:0,col:5, desc:"grey dappled color, slightly convex profile, thick wavy mane, compact powerful body"},
];

const PET_SPECIES_REAL=[
  {id:"dog",      name:"Dog",      emoji:"🐕", hasBreeds:true,  hasCoat:true,  hasTail:true,  hasEars:true,  hasLimbs:true,  limbsName:"paws",  breedSprites:PET_DOG_BREED_SPRITES},
  {id:"cat",      name:"Cat",      emoji:"🐈", hasBreeds:true,  hasCoat:true,  hasTail:true,  hasEars:true,  hasLimbs:true,  limbsName:"paws",  breedSprites:PET_CAT_BREED_SPRITES},
  {id:"rabbit",   name:"Rabbit",   emoji:"🐇", hasBreeds:false, hasCoat:true,  hasTail:true,  hasEars:true,  hasLimbs:true,  limbsName:"paws",  earOptions:["upright","floppy","half-upright"]},
  {id:"horse",    name:"Horse",    emoji:"🐎", hasBreeds:true,  hasCoat:true,  hasTail:true,  hasEars:true,  hasLimbs:true,  limbsName:"legs",  breedSprites:PET_HORSE_BREED_SPRITES},
  {id:"hamster",  name:"Hamster",  emoji:"🐹", hasBreeds:false, hasCoat:true,  hasTail:true,  hasEars:true,  hasLimbs:true,  limbsName:"paws"},
  {id:"parrot",   name:"Parrot",   emoji:"🦜", hasBreeds:false, hasCoat:false, hasTail:true,  hasEars:false, hasLimbs:true,  limbsName:"feet",  hasWings:true, hasBeak:true, beakOptions:["short hooked","long curved","parrot-style"]},
  {id:"turtle",   name:"Turtle",   emoji:"🐢", hasBreeds:false, hasCoat:false, hasTail:true,  hasEars:false, hasLimbs:true,  limbsName:"legs",  hasShell:true},
  {id:"fish",     name:"Fish",     emoji:"🐠", hasBreeds:false, hasCoat:false, hasTail:true,  hasEars:false, hasLimbs:false, hasFins:true},
  {id:"hedgehog", name:"Hedgehog", emoji:"🦔", hasBreeds:false, hasCoat:false, hasTail:true,  hasEars:true,  hasLimbs:true,  limbsName:"paws",  hasSpines:true},
];
const PET_SPECIES_FANTASY=[
  {id:"dragon",   name:"Dragon",         emoji:"🐉", hasWings:true,  hasTail:true, hasHorns:true, hasFire:true,  sizeOptions:["tiny (dog-sized)","medium (horse-sized)","large (elephant-sized)","gigantic"]},
  {id:"unicorn",  name:"Unicorn",        emoji:"🦄", hasWings:false, hasTail:true, hasHorn:true,  hasMane:true},
  {id:"griffin",  name:"Griffin",        emoji:"🦅", hasWings:true,  hasTail:true, hybrid:"eagle front / lion rear"},
  {id:"phoenix",  name:"Phoenix",        emoji:"🔥", hasWings:true,  hasTail:true, hasFire:true,  isBird:true},
  {id:"fluffy",   name:"Fluffy Creature",emoji:"👾", customizable:true, sizeOptions:["tiny (dog-sized)","medium (horse-sized)","large (elephant-sized)","gigantic"]},
  {id:"hellhound",name:"Hellhound",      emoji:"🔥", hasTail:true,  hasFire:true, glowingEyes:true},
  {id:"imp",      name:"Imp",            emoji:"👹", hasTail:true,  hasHorns:true,isSmall:true},
];
const EMPATHY_STYLES=[
  {id:"cute",     label:"Cute",     emoji:"🥰", visual:"fluffy cute friendly large eyes pastel colors"},
  {id:"playful",  label:"Playful",  emoji:"😄", visual:"playful bright cheerful expressive"},
  {id:"neutral",  label:"Neutral",  emoji:"😐", visual:"realistic natural proportions wild"},
  {id:"serious",  label:"Serious",  emoji:"😤", visual:"serious intense dark tones powerful gaze"},
  {id:"menacing", label:"Menacing", emoji:"😈", visual:"menacing dangerous glowing eyes sharp teeth dark"},
];
const PET_COAT_TYPES=["short","medium","long","curly","wavy","wiry","smooth"];
const PET_COAT_PATTERNS=["solid","patchy","striped","spotted","saddle","pointed","marbled"];
const PET_TAIL_TYPES=["short","long","curled","bushy","sickle","plumed","scaled","finned"];
const PET_EAR_TYPES=["upright","floppy","semi-erect","folded","rounded"];
const PET_POSES={
  dog:["standing","sitting","lying down","running","jumping","on leash","sniffing","playing"],
  cat:["sitting","stretched out","curled up","jumping","grooming","hunting pose","perched"],
  parrot:["perched","in flight","on hand","resting","grooming"],
  fish:["swimming","floating"],
  default:["standing","sitting","lying down","in motion","jumping","curled up"],
};
const PET_ACCESSORIES={
  dog:[
    // collar
    {id:"collar_leather",     name:"Leather collar",         cat:"collar",    variants:["plain","studded","engraved"]},
    {id:"collar_chain",       name:"Chain collar",           cat:"collar"},
    {id:"collar_fabric",      name:"Fabric collar",          cat:"collar",    variants:["solid","patterned","reflective"]},
    {id:"collar_martingale",  name:"Martingale collar",      cat:"collar"},
    {id:"collar_elizabethan", name:"Elizabethan collar (cone)",cat:"collar"},
    // harness
    {id:"harness_vest",       name:"Vest harness",           cat:"harness",   variants:["step-in","overhead","clip-front"]},
    {id:"harness_sport",      name:"Sport harness",          cat:"harness"},
    {id:"harness_no_pull",    name:"No-pull harness",        cat:"harness"},
    {id:"harness_service",    name:"Service dog harness",    cat:"harness"},
    // leash
    {id:"leash_leather",      name:"Leather leash",          cat:"leash"},
    {id:"leash_nylon",        name:"Nylon leash",            cat:"leash",     variants:["solid","braided","reflective"]},
    {id:"leash_retract",      name:"Retractable leash",      cat:"leash"},
    {id:"leash_rope",         name:"Rope leash",             cat:"leash"},
    {id:"leash_chain",        name:"Chain leash",            cat:"leash"},
    {id:"leash_bungee",       name:"Bungee leash",           cat:"leash"},
    // muzzle
    {id:"muzzle_basket",      name:"Basket muzzle",          cat:"muzzle",    variants:["metal","plastic","wire"]},
    {id:"muzzle_fabric",      name:"Fabric muzzle",          cat:"muzzle"},
    {id:"muzzle_leather",     name:"Leather muzzle",         cat:"muzzle"},
    // clothing
    {id:"coat_rain",          name:"Rain coat",              cat:"clothing"},
    {id:"coat_winter",        name:"Winter coat",            cat:"clothing"},
    {id:"sweater",            name:"Sweater",                cat:"clothing"},
    {id:"boots",              name:"Boots / paw protectors", cat:"clothing"},
    {id:"life_jacket",        name:"Life jacket",            cat:"clothing"},
    {id:"bandana",            name:"Bandana",                cat:"clothing"},
    // bed
    {id:"bed_round",          name:"Round plush bed",        cat:"bed"},
    {id:"bed_ortho",          name:"Orthopedic bed",         cat:"bed"},
    {id:"bed_donut",          name:"Donut cuddler bed",      cat:"bed"},
    {id:"crate",              name:"Dog crate",              cat:"bed"},
    // toys
    {id:"toy_ball",           name:"Ball",                   cat:"toy",       variants:["rubber","tennis","squeaky","fetch"]},
    {id:"toy_rope",           name:"Rope toy",               cat:"toy"},
    {id:"toy_chew",           name:"Chew toy",               cat:"toy"},
    {id:"toy_squeaky",        name:"Squeaky toy",            cat:"toy"},
    {id:"toy_tug",            name:"Tug toy",                cat:"toy"},
    {id:"frisbee",            name:"Frisbee",                cat:"toy"},
    {id:"kong",               name:"Kong / treat dispenser", cat:"toy"},
    // feeding
    {id:"bowl_metal",         name:"Metal bowl",             cat:"bowl"},
    {id:"bowl_elevated",      name:"Elevated bowl stand",    cat:"bowl"},
    {id:"bowl_slow",          name:"Slow feeder bowl",       cat:"bowl"},
    {id:"water_fountain",     name:"Water fountain",         cat:"bowl"},
    // carrier & transport
    {id:"carrier_backpack",   name:"Carrier backpack",       cat:"carrier"},
    {id:"carrier_sling",      name:"Dog sling",              cat:"carrier"},
    {id:"carrier_bag",        name:"Carrier bag",            cat:"carrier"},
    {id:"stroller",           name:"Pet stroller",           cat:"carrier"},
  ],
  cat:[
    {id:"collar_bell",        name:"Bell collar",            cat:"collar"},
    {id:"collar_breakaway",   name:"Breakaway safety collar",cat:"collar"},
    {id:"collar_bow",         name:"Bow tie collar",         cat:"collar"},
    {id:"harness_cat",        name:"Cat harness",            cat:"harness",   variants:["H-style","vest","escape-proof"]},
    {id:"leash_cat",          name:"Cat leash",              cat:"leash"},
    {id:"scratcher_v",        name:"Vertical scratcher",     cat:"scratcher"},
    {id:"scratcher_horiz",    name:"Horizontal scratcher",   cat:"scratcher"},
    {id:"scratcher_wall",     name:"Wall-mounted scratcher", cat:"scratcher"},
    {id:"cat_tree",           name:"Cat tree",               cat:"furniture"},
    {id:"cat_shelf",          name:"Wall shelf",             cat:"furniture"},
    {id:"cat_tunnel",         name:"Cat tunnel",             cat:"furniture"},
    {id:"bed_cave",           name:"Cave bed",               cat:"bed"},
    {id:"bed_hammock",        name:"Hammock bed",            cat:"bed"},
    {id:"bed_heated",         name:"Heated bed",             cat:"bed"},
    {id:"toy_mouse",          name:"Mouse toy",              cat:"toy"},
    {id:"toy_wand",           name:"Feather wand",           cat:"toy"},
    {id:"toy_laser",          name:"Laser pointer",          cat:"toy"},
    {id:"toy_ball_cat",       name:"Ball with bell",         cat:"toy"},
    {id:"carrier_hard",       name:"Hard carrier",           cat:"carrier"},
    {id:"carrier_soft",       name:"Soft carrier bag",       cat:"carrier"},
    {id:"carrier_backpack_cat",name:"Bubble backpack",       cat:"carrier"},
    {id:"bow_tie",            name:"Bow tie",                cat:"clothing"},
    {id:"hat_cat",            name:"Hat",                    cat:"clothing"},
  ],
  horse:[
    {id:"saddle_english",     name:"English saddle",         cat:"saddle"},
    {id:"saddle_western",     name:"Western saddle",         cat:"saddle"},
    {id:"saddle_dressage",    name:"Dressage saddle",        cat:"saddle"},
    {id:"saddle_pad",         name:"Saddle pad / numnah",    cat:"saddle"},
    {id:"bridle",             name:"Bridle",                 cat:"bridle"},
    {id:"bridle_bitless",     name:"Bitless bridle",         cat:"bridle"},
    {id:"halter",             name:"Halter",                 cat:"halter",   variants:["rope","leather","nylon"]},
    {id:"lead_rope",          name:"Lead rope",              cat:"halter"},
    {id:"blanket_turnout",    name:"Turnout rug",            cat:"blanket"},
    {id:"blanket_stable",     name:"Stable blanket",         cat:"blanket"},
    {id:"blanket_fleece",     name:"Fleece cooler",          cat:"blanket"},
    {id:"leg_wraps",          name:"Leg wraps / bandages",   cat:"protection"},
    {id:"boots_splint",       name:"Splint boots",           cat:"protection"},
    {id:"boots_hoof",         name:"Hoof boots",             cat:"protection"},
    {id:"fly_mask",           name:"Fly mask",               cat:"protection"},
    {id:"martingale",         name:"Martingale",             cat:"bridle"},
    {id:"breastplate",        name:"Breastplate",            cat:"saddle"},
  ],
  rabbit:[
    {id:"harness_rabbit",     name:"Rabbit harness",         cat:"harness"},
    {id:"leash_rabbit",       name:"Leash",                  cat:"leash"},
    {id:"run_playpen",        name:"Exercise pen",           cat:"enclosure"},
    {id:"hutch",              name:"Hutch",                  cat:"enclosure"},
    {id:"tunnel_rabbit",      name:"Tunnel",                 cat:"toy"},
    {id:"toy_chew_rabbit",    name:"Chew toy",               cat:"toy"},
    {id:"bowl_rabbit",        name:"Food bowl",              cat:"bowl"},
    {id:"hay_rack",           name:"Hay rack",               cat:"bowl"},
    {id:"water_bottle",       name:"Water bottle",           cat:"bowl"},
  ],
  hamster:[
    {id:"wheel",              name:"Exercise wheel",         cat:"enrichment"},
    {id:"ball_hamster",       name:"Exercise ball",          cat:"enrichment"},
    {id:"hideout",            name:"Hideout / house",        cat:"enrichment"},
    {id:"chew_wooden",        name:"Wooden chew toy",        cat:"enrichment"},
    {id:"bowl_hamster",       name:"Food bowl",              cat:"bowl"},
    {id:"bottle_hamster",     name:"Water bottle",           cat:"bowl"},
  ],
  parrot:[
    {id:"cage_large",         name:"Large cage",             cat:"cage"},
    {id:"travel_cage",        name:"Travel cage",            cat:"cage"},
    {id:"play_stand",         name:"Play stand / gym",       cat:"stand"},
    {id:"perch_wood",         name:"Wooden perch",           cat:"perch"},
    {id:"perch_rope",         name:"Rope perch",             cat:"perch"},
    {id:"perch_mineral",      name:"Mineral perch",          cat:"perch"},
    {id:"toy_foraging",       name:"Foraging toy",           cat:"toy"},
    {id:"toy_bell_parrot",    name:"Bell toy",               cat:"toy"},
    {id:"toy_shredding",      name:"Shredding toy",          cat:"toy"},
    {id:"toy_foot",           name:"Foot toy",               cat:"toy"},
    {id:"harness_parrot",     name:"Parrot harness",         cat:"harness"},
  ],
  turtle:[
    {id:"basking_platform",   name:"Basking platform",       cat:"habitat"},
    {id:"filter",             name:"Filter",                 cat:"habitat"},
    {id:"basking_lamp",       name:"Basking lamp",           cat:"habitat"},
    {id:"uvb_bulb",           name:"UVB bulb",               cat:"habitat"},
    {id:"hide_turtle",        name:"Hide / cave",            cat:"habitat"},
    {id:"food_dish",          name:"Food dish",              cat:"bowl"},
  ],
  fish:[
    {id:"aquarium_sm",        name:"Small aquarium",         cat:"aquarium"},
    {id:"aquarium_lg",        name:"Large aquarium",         cat:"aquarium"},
    {id:"aquarium_nano",      name:"Nano aquarium",          cat:"aquarium"},
    {id:"castle_deco",        name:"Castle decoration",      cat:"decor"},
    {id:"plants_live",        name:"Live plants",            cat:"decor"},
    {id:"plants_silk",        name:"Silk plants",            cat:"decor"},
    {id:"rock_deco",          name:"Rock formation",         cat:"decor"},
    {id:"shipwreck_deco",     name:"Shipwreck ornament",     cat:"decor"},
  ],
  hedgehog:[
    {id:"wheel_hedgehog",     name:"Silent wheel",           cat:"enrichment"},
    {id:"hideout_hedgehog",   name:"Hideout",                cat:"enrichment"},
    {id:"bath_hedgehog",      name:"Bath tub",               cat:"enrichment"},
    {id:"bowl_hedgehog",      name:"Food bowl",              cat:"bowl"},
    {id:"water_bottle_hedgehog",name:"Water bottle",         cat:"bowl"},
  ],
  default:[
    {id:"generic_collar",     name:"Collar",                 cat:"collar"},
    {id:"generic_harness",    name:"Harness",                cat:"harness"},
    {id:"generic_bed",        name:"Bed",                    cat:"bed"},
    {id:"generic_toy",        name:"Toy",                    cat:"toy"},
    {id:"generic_bowl",       name:"Bowl",                   cat:"bowl"},
  ],
};
const PET_OUTPUT_LAYOUTS=[
  {id:"single",           name:"Single shot",     icon:"🖼️", desc:"One composition, maximum quality"},
  {id:"grid_1x3",         name:"1×3 Grid",        icon:"🎬", desc:"Portrait · Profile · Full body"},
  {id:"grid_2x2",         name:"2×2 Grid",        icon:"⬜", desc:"Four angles, same scene"},
  {id:"product_showcase", name:"Product Showcase", icon:"🛍️", desc:"Product hero · animal as context"},
];
const PET_HOW_IT_WORKS=[
  {icon:"📸", title:"Bring your photos",    body:"Upload product, pet, or person photos — or leave empty to generate virtually. Attach them separately in your AI generator when pasting the prompt."},
  {icon:"🐾", title:"Configure the scene",  body:"Choose species, accessories, and composition. In Product Placement mode the accessory is the hero — the animal is secondary context."},
  {icon:"🎨", title:"Set scene parameters", body:"Apply lighting, environment, lens, film stock, and color grade. People from reference photos are replaced by virtual figures matching the scene."},
  {icon:"📋", title:"Copy & generate",      body:"Copy the prompt, open your AI generator, attach photos, paste. Use Multi-Shot to explore angles, or Video to animate the scene."},
];

function PetPage(){
  // ── SCENE DESC ──
  const[sceneDesc,setSceneDesc]=useState("");
  // ── SOURCE — 3 independent checkboxes ──
  const[useScratch,setUseScratch]=useState(true);   // build virtual pet
  const[usePetPhoto,setUsePetPhoto]=useState(false); // have pet photo
  const[useMyPhoto,setUseMyPhoto]=useState(false);   // in scene with pet
  const[useProduct,setUseProduct]=useState(false);   // have/want product
  // ── ACCESSORIES PANEL ──
  const[accOpen,setAccOpen]=useState(false);
  // ── HOW IT WORKS ──
  const[pHowOpen,setPHowOpen]=useState(false);
  // ── INPUTS (legacy, kept for buildPetPrompt) ──
  const[hasProduct,setHasProduct]=useState(false);
  const[hasPetPhoto,setHasPetPhoto]=useState(false);
  const[hasHumanPhoto,setHasHumanPhoto]=useState(false);
  const[productType,setProductType]=useState("photo");
  const[productDesc,setProductDesc]=useState("");
  const[productMaterial,setProductMaterial]=useState("");
  const[productCondition,setProductCondition]=useState("new");
  const[productFocus,setProductFocus]=useState("hero");
  const[petPhotoDesc,setPetPhotoDesc]=useState("");
  const[petPhotoQuality,setPetPhotoQuality]=useState("average");
  const[petEnhancements,setPetEnhancements]=useState([]);
  const[humanPhotoDesc,setHumanPhotoDesc]=useState("");
  // ── TAB ──
  const[pTab,setPTab]=useState("species");
  // ── VIRTUAL PET ──
  const[vpIsFantasy,setVpIsFantasy]=useState(false);
  const[vpSpecies,setVpSpecies]=useState("dog");
  const[vpBreed,setVpBreed]=useState("Golden Retriever");
  const[vpFantasySize,setVpFantasySize]=useState("");
  const[vpEmpathy,setVpEmpathy]=useState("");
  const[vpCoatType,setVpCoatType]=useState("long");
  const[vpCoatPattern,setVpCoatPattern]=useState("solid");
  const[vpCoatColors,setVpCoatColors]=useState("golden");
  const[vpTail,setVpTail]=useState("long");
  const[vpEars,setVpEars]=useState("floppy");
  const[vpBeak,setVpBeak]=useState("parrot-style");
  const[vpPose,setVpPose]=useState("sitting");
  const[vpGaze,setVpGaze]=useState("toward viewer");
  const[vpOtherSpecies,setVpOtherSpecies]=useState(""); // for extended dropdown
  const[otherExpandedGrp,setOtherExpandedGrp]=useState(null);
  // ── ACCESSORIES ──
  const[accMode,setAccMode]=useState("product");
  const[accSelected,setAccSelected]=useState([]);
  const[accVariants,setAccVariants]=useState({}); // id -> chosen variant
  const[accPrimary,setAccPrimary]=useState("");
  const[accProductMode,setAccProductMode]=useState("existing");
  const[accProductDesc,setAccProductDesc]=useState("");
  const[accCreativeDesc,setAccCreativeDesc]=useState("");
  const[accDepthHandler,setAccDepthHandler]=useState("virtual_hand");
  // ── COMPANION ──
  const[companionMode,setCompanionMode]=useState("alone");
  const[companionSpecies,setCompanionSpecies]=useState("cat");
  const[companionInteraction,setCompanionInteraction]=useState("playing together");
  // ── VIRTUAL HUMAN LITE ──
  const[vhVisibility,setVhVisibility]=useState("hands_only");
  const[vhAction,setVhAction]=useState("extended_hand");
  const[vhStyle,setVhStyle]=useState("casual");
  // ── SCENE ──
  const[light,setLight]=useState(null);
  const[bg,setBg]=useState(null);
  const[lens,setLens]=useState(null);
  const[filmStock,setFilmStock]=useState(null);
  const[colorGrade,setColorGrade]=useState(null);
  const[aspectRatio,setAspectRatio]=useState("16:9");
  // ── OUTPUT ──
  const[outputLayout,setOutputLayout]=useState("single");
  const[use3D,setUse3D]=useState(false);
  const[cam,setCam]=useState({azimuth:0,elevation:0,zoom:5});
  const[sel,setSel]=useState([]);
  // ── MISC ──
  const[custom,setCustom]=useState("");
  const[enhanced,setEnhanced]=useState(""); // kept for legacy reset btn ref — unused by panel
  const[enhancing,setEnhancing]=useState(false);
  const[petPromptView,setPetPromptView]=useState("base");
  const[showAuthModal,setShowAuthModal]=useState(false);
  const[pendingEnhance,setPendingEnhance]=useState(false);
  const[toast,setToast]=useState("");
  const{user}=React.useContext(AuthCtx);
  const setPage=React.useContext(PageCtx);
  const MAX_A=9;

  // auto-start enhance after login if pending
  useEffect(()=>{
    if(user&&pendingEnhance){
      setPendingEnhance(false);
      setEnhancing(true);setEnhanced("");setPetPromptView("enhanced");
      callEnhance(buildPetPrompt(),custom,user.idToken)
        .then(r=>{setEnhanced(r);setToast("ENHANCED BY GEMINI");setTimeout(()=>setToast(""),2500);})
        .catch(e=>{if(e.status===401)setShowAuthModal(true);else{setToast("ERROR: "+e.message);setTimeout(()=>setToast(""),2500);}})
        .finally(()=>setEnhancing(false));
    }
  },[user,pendingEnhance]);

  // auto-fix companion species when it conflicts with main species
  useEffect(()=>{
    if(companionSpecies===vpSpecies){
      // pick first available species that's not the main one
      const fallback=PET_REAL_SPRITES.find(s=>s.id!==vpSpecies);
      if(fallback)setCompanionSpecies(fallback.id);
    }
  },[vpSpecies]);

  const tog1=(setter,id)=>setter(p=>p===id?null:id);
  const togAngle=(i)=>setSel(p=>p.includes(i)?p.filter(x=>x!==i):p.length>=MAX_A?p:[...p,i]);
  const toggleEnh=(e)=>setPetEnhancements(p=>p.includes(e)?p.filter(x=>x!==e):[...p,e]);
  const toggleAccSel=(id)=>setAccSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2500);};
  const petRandom=()=>{
    const useF=Math.random()>.5;
    setVpIsFantasy(useF);
    if(useF){
      const sp=PET_SPECIES_FANTASY[Math.floor(Math.random()*PET_SPECIES_FANTASY.length)];
      setVpSpecies(sp.id);
      setVpEmpathy(EMPATHY_STYLES[Math.floor(Math.random()*EMPATHY_STYLES.length)].id);
      setVpFantasySize(["tiny (dog-sized)","medium (horse-sized)","large (elephant-sized)","gigantic"][Math.floor(Math.random()*4)]);
    }else{
      const sp=PET_SPECIES_REAL[Math.floor(Math.random()*PET_SPECIES_REAL.length)];
      setVpSpecies(sp.id);
      if(sp.breedSprites)setVpBreed(sp.breedSprites[Math.floor(Math.random()*sp.breedSprites.length)].id);
      setVpCoatType(PET_COAT_TYPES[Math.floor(Math.random()*PET_COAT_TYPES.length)]);
      setVpCoatPattern(PET_COAT_PATTERNS[Math.floor(Math.random()*PET_COAT_PATTERNS.length)]);
    }
    setVpPose((PET_POSES[vpSpecies]||PET_POSES.default)[Math.floor(Math.random()*((PET_POSES[vpSpecies]||PET_POSES.default).length))]);
    setVpGaze(["toward viewer","toward owner / hand","into distance","at product"][Math.floor(Math.random()*4)]);
    setLight(LIGHT_SPRITES[Math.floor(Math.random()*LIGHT_SPRITES.length)].id);
    setBg(ENV_SPRITES[Math.floor(Math.random()*ENV_SPRITES.length)].id);
    setOutputLayout(PET_OUTPUT_LAYOUTS[Math.floor(Math.random()*PET_OUTPUT_LAYOUTS.length)].id);
    doToast("RANDOM CONFIGURATION");
  };
  // source drives photo logic
  const showVirtualPet=!usePetPhoto;  // generate virtual if no pet photo
  const hasPetPhotoVal=usePetPhoto;
  const hasHumanPhotoVal=useMyPhoto;
  const showVirtualHuman=!hasHumanPhotoVal&&accMode==="product"&&accDepthHandler==="virtual_hand";
  const spData=(vpIsFantasy?PET_SPECIES_FANTASY:PET_SPECIES_REAL).find(s=>s.id===vpSpecies)||PET_SPECIES_REAL[0];
  const accList=PET_ACCESSORIES[vpSpecies]||(vpIsFantasy?PET_ACCESSORIES.dog:PET_ACCESSORIES.default);
  const poses=PET_POSES[vpSpecies]||PET_POSES.default;

  // ── CONFLICT RESOLUTION — priority rules, no errors shown ──
  // 1. Breed → Coat (breed has priority, coat is redundant when breed desc exists)
  const breedDesc_current=(()=>{if(vpIsFantasy||vpOtherSpecies)return null;const bData=spData?.breedSprites?.find(b=>b.id===vpBreed);return bData?.desc||null;})();
  const conflictCoat = !vpIsFantasy && !!breedDesc_current;

  // 2. Lens 8mm / Anamorphic filmstock → Aspect Ratio (optical characteristics override)
  const conflictAR_fisheye  = lens === "8mm";
  const conflictAR_anamorphic = filmStock === "anamorphic";
  const conflictAspectRatio = conflictAR_fisheye || conflictAR_anamorphic;
  // fisheye beats anamorphic (more physically constrained)
  const effectiveAspectRatio = conflictAR_fisheye ? "1:1" : conflictAR_anamorphic ? "2.39:1" : aspectRatio;

  // 3. Ilford B&W → Color Grade (monochrome film eliminates color grading)
  const conflictColorGrade = filmStock === "ilford";

  // 4. Background → Lighting incompatible pairs (bg is environment = higher priority)
  const BG_LIGHT_CONFLICTS = {
    underwater: ["fire","golden","sunrise","magic"],
    space:      ["golden","sunrise","magic","fire","storm"],
    studio:     ["storm","fog","fire"],
    arctic:     ["fire","golden"],
  };
  const disabledLightIds = new Set(BG_LIGHT_CONFLICTS[bg] || []);

  // ── HUMAN CONFLICTS ──
  // H1: implied visibility → all actions require visible body parts
  const conflictH1_impliedAction = vhVisibility==="implied" && vhAction!=="";
  // H2: hands_only → kneeling/standing need legs/full body
  const disabledActions_handsOnly = vhVisibility==="hands_only" ? ["kneeling","standing"] : [];
  const conflictH2_handsAction = vhVisibility==="hands_only" && ["kneeling","standing"].includes(vhAction);
  // H3: useMyPhoto + companionMode human → two conflicting human sources
  const conflictH3_photoHuman = useMyPhoto && companionMode==="human";
  // H4: product virtual_hand + companion human → two human entities in prompt
  const hasActiveProduct=!!(accProductDesc||accCreativeDesc);
  const conflictH4_productHuman = hasActiveProduct && accDepthHandler==="virtual_hand" && companionMode==="human";
  // H5: product virtual_hand + full/upper_body visibility → depth stack says hands only
  const conflictH5_visDepth = hasActiveProduct && accDepthHandler==="virtual_hand"
    && (vhVisibility==="full"||vhVisibility==="upper_body");

  // auto-fixes on state change
  useEffect(()=>{
    if(conflictH2_handsAction) setVhAction("extended_hand");
  },[vhVisibility]);
  useEffect(()=>{
    if(conflictH5_visDepth) setVhVisibility("hands_only");
  },[accDepthHandler,accProductDesc,accCreativeDesc]);
  // auto-clear light when bg change makes it incompatible
  useEffect(()=>{
    if(light && disabledLightIds.has(light)) setLight(null);
  },[bg]);
  // auto-clear colorGrade when ilford selected
  useEffect(()=>{
    if(conflictColorGrade && colorGrade) setColorGrade(null);
  },[filmStock]);
  // ── END CONFLICT RESOLUTION ──

  const reset=()=>{
    setHasProduct(false);setHasPetPhoto(false);setHasHumanPhoto(false);
    setProductType("photo");setProductDesc("");setProductMaterial("");setProductCondition("new");setProductFocus("hero");
    setPetPhotoDesc("");setPetPhotoQuality("average");setPetEnhancements([]);setHumanPhotoDesc("");
    setPTab("species");
    setVpIsFantasy(false);setVpSpecies("dog");setVpBreed("Golden Retriever");setVpFantasySize("");
    setVpEmpathy("");setVpCoatType("long");setVpCoatPattern("solid");setVpCoatColors("golden");
    setVpTail("long");setVpEars("floppy");setVpPose("sitting");setVpGaze("toward viewer");
    setAccMode("product");setAccSelected([]);setAccPrimary("");setAccProductMode("existing");
    setAccProductDesc("");setAccCreativeDesc("");setAccDepthHandler("virtual_hand");
    setCompanionMode("alone");setCompanionSpecies("cat");setCompanionInteraction("playing together");
    setVhVisibility("hands_only");setVhAction("extended_hand");setVhStyle("casual");
    setLight(null);setBg(null);setLens(null);setFilmStock(null);setColorGrade(null);setAspectRatio("16:9");
    setOutputLayout("single");setUse3D(false);setCam({azimuth:0,elevation:0,zoom:5});setSel([]);
    setCustom("");setEnhanced("");
    doToast("RESET COMPLETE");
  };

  const buildPetPrompt=()=>{
    const L=[];

    // ── SOURCES ──
    const srcs=[];
    let n=0;
    if(hasPetPhotoVal){
      n++;
      const enhStr=petEnhancements.length?" Enhance: "+petEnhancements.join(", ")+".":"";
      srcs.push(n+". [YOUR PET PHOTO]: attach when pasting this prompt in your AI generator");
      srcs.push("   USAGE: Use as the sole identity reference. Preserve exact breed, coat texture, color, and all distinctive markings with absolute fidelity."+enhStr);
    }
    if(hasHumanPhotoVal){
      n++;
      srcs.push(n+". [YOUR PHOTO]: attach when pasting this prompt in your AI generator");
      srcs.push("   USAGE: Extract only the environment, props, and spatial context. Replace all people with a virtual figure matching the scene composition and lighting.");
    }
    if(accProductDesc||accCreativeDesc){
      n++;
      if(accCreativeDesc){
        srcs.push(n+". [DESIGN NEW PRODUCT CONCEPT]: "+accCreativeDesc);
        srcs.push("   Visualize as a commercially viable, manufacturable product with realistic materials, proportions, and finish quality.");
      }else if(accProductDesc){
        srcs.push(n+". [PRODUCT PHOTO / REFERENCE]: attach when pasting this prompt");
        srcs.push("   DESCRIPTION: "+accProductDesc);
        const cond={new:"Preserve exactly as shown — every detail, texture, and finish intact.",upgrade:"Restore to pristine showroom condition, correcting wear while preserving design integrity.",pristine:"Idealize to perfection — flawless surfaces, perfect construction, showroom-ready."}[productCondition]||"Preserve as shown.";
        srcs.push("   USAGE: "+cond+" Position as the "+productFocus+" compositional element. Reproduce every material detail, stitching, hardware, and surface quality.");
      }
    }
    if(sceneDesc.trim()){L.push("SCENE BRIEF: "+sceneDesc.trim());L.push("");}
    if(srcs.length){
      L.push("Generate a photorealistic image using the following reference photos and specifications:");L.push("");
      L.push("=== ATTACH THESE PHOTOS BEFORE GENERATING ===");L.push("");
      srcs.forEach(s=>L.push(s));L.push("");
    }else{
      L.push("Generate a photorealistic image entirely from scratch, based on the following specifications:");L.push("");
    }

    // ── VIRTUAL PET ──
    if(showVirtualPet){
      L.push("=== GENERATE ===");L.push("");
      if(vpIsFantasy){
        const sp=PET_SPECIES_FANTASY.find(s=>s.id===vpSpecies)||PET_SPECIES_FANTASY[0];
        let vLine="VIRTUAL CREATURE: "+sp.name;
        if(vpFantasySize)vLine+=", size category: "+vpFantasySize;
        L.push(vLine);
        if(vpEmpathy){const emp=EMPATHY_STYLES.find(e=>e.id===vpEmpathy);if(emp)L.push("Temperament & visual mood: "+emp.label+" — "+emp.visual);}
        if(sp.hasFire)L.push("Fire / flames: actively present, physically plausible light interaction with surroundings.");
        if(sp.hasWings&&vpEars)L.push("Wings: "+vpEars+" — anatomically detailed, feather or membrane texture rendered with care.");
        else if(sp.hasWings)L.push("Wings: present and detailed.");
        if(sp.hasHorns&&vpTail)L.push("Horns: "+vpTail+" — rendered with natural material texture (bone, keratin, crystal, or magical element as appropriate).");
        else if(sp.hasHorns)L.push("Horns: present.");
        if(sp.hybrid)L.push("Hybrid anatomy: "+sp.hybrid+" — transition between forms rendered seamlessly.");
        if(vpCoatColors)L.push("Color & surface: "+vpCoatColors);
      }else{
        const sp=PET_SPECIES_REAL.find(s=>s.id===vpSpecies)||PET_SPECIES_REAL[0];
        let otherData=null;
        if(vpOtherSpecies){
          for(const g of PET_EXTENDED_SPECIES){
            const found=g.items.find(it=>it.id===vpOtherSpecies);
            if(found){otherData={...found,group:g.group};break;}
          }
        }
        let breedDesc="";
        if(!vpOtherSpecies&&sp.breedSprites){const bData=sp.breedSprites.find(b=>b.id===vpBreed);if(bData&&bData.desc)breedDesc=bData.desc;}
        const breedStr=(!vpOtherSpecies&&sp.hasBreeds&&vpBreed)?" ("+vpBreed+")":"";
        const petName=otherData?otherData.name:sp.name+breedStr;
        L.push("SUBJECT: "+petName+" — rendered with full photorealistic fidelity.");
        if(otherData&&otherData.desc)L.push("Visual characteristics: "+otherData.desc+".");
        if(breedDesc)L.push("Breed-specific traits to reproduce precisely: "+breedDesc+".");
        if(!breedDesc&&sp.hasCoat&&(vpCoatType||vpCoatPattern||vpCoatColors)){
          const cParts=[];
          if(vpCoatType)cParts.push(vpCoatType+" coat texture");
          if(vpCoatPattern)cParts.push(vpCoatPattern+" pattern");
          if(vpCoatColors)cParts.push("coloration: "+vpCoatColors);
          L.push("Coat: "+cParts.join(", ")+". Render individual hair strands, natural light interaction, and subsurface texture.");
        }
        if(sp.hasTail&&vpTail)L.push("Tail: "+vpTail+" — anatomically correct, naturally positioned.");
        if(sp.hasEars&&vpEars)L.push("Ears: "+vpEars+" — true to breed anatomy, soft tissue detail.");
        if(sp.hasBeak&&vpBeak)L.push("Beak: "+vpBeak+" — keratin texture and correct shape.");
        if(sp.hasWings)L.push("Wings: "+(vpPose==="in flight"?"fully spread mid-flight":"folded naturally at rest")+" — individual feather detail.");
        if(sp.hasSpines)L.push("Spines/quills: erect, individual spine detail, natural color banding.");
        if(sp.hasShell)L.push("Shell: prominent — scute pattern, surface texture, and natural weathering.");
        if(sp.hasFins)L.push("Fins: extended naturally — semi-transparent membranes with visible vasculature.");
        // empathy/mood + size for real animals too
        if(vpEmpathy){const emp=EMPATHY_STYLES.find(e=>e.id===vpEmpathy);if(emp)L.push("Visual mood & temperament: "+emp.label+" — "+emp.visual+".");}
        if(vpFantasySize)L.push("Size scale: "+vpFantasySize+" — render all anatomy and proportions accordingly.");
      }
      const poseParts=[];
      if(vpPose)poseParts.push("Pose: "+vpPose);
      if(vpGaze)poseParts.push("Gaze: "+vpGaze+" — eyes sharp, catchlights present");
      if(poseParts.length)L.push(poseParts.join(". ")+".");
      L.push("");
    }

    // ── COMPANION ──
    if(companionMode!=="alone"){
      L.push("=== COMPANION ===");
      if(companionMode==="animal"){
        const csp=PET_SPECIES_REAL.find(s=>s.id===companionSpecies)||PET_SPECIES_REAL[1];
        L.push("Second animal: "+csp.name+" — same photorealistic standard as primary subject.");
        L.push("Interaction: "+companionInteraction+" — natural, unposed, emotionally authentic.");
      }else if(companionMode==="human"&&!conflictH3_photoHuman&&!conflictH4_productHuman){
        const visMap={full:"full body, head to toe",upper_body:"upper body and torso, from waist up",hands_only:"hands and forearms only — presence implied, face not shown",implied:"presence suggested through shadow, touch point, or partial element only"};
        const actMap={extended_hand:"extending hand with open palm toward the animal — gesture warm and inviting",holding_leash:"holding leash with relaxed, natural grip",kneeling:"kneeling at animal eye level — connection and equality",standing:"standing nearby in relaxed posture — calm guardian presence"};
        const styleMap={casual:"casual attire — soft fabrics, relaxed fit, subtly textured (e.g. chambray, brushed cotton) with slightly rolled sleeves suggesting ease",outdoorsy:"outdoor/active attire — practical, weathered, functional layers",smart_casual:"smart casual — clean lines, quality fabric, polished but relaxed"};
        const safeVis=(conflictH1_impliedAction||conflictH2_handsAction)?"hands_only":vhVisibility;
        const safeAct=(conflictH1_impliedAction||conflictH2_handsAction)?"extended_hand":vhAction;
        L.push("Human figure: "+visMap[safeVis]+". "+actMap[safeAct]+".");
        L.push("Style: "+(styleMap[vhStyle]||vhStyle)+". Gender and age: neutral, AI discretion — emphasize warmth and authenticity. Natural skin texture, no perfect model appearance.");
        L.push("Interaction: "+companionInteraction+".");
      }
      L.push("");
    }

    // ── PRODUCT / ACCESSORIES ──
    if(accProductDesc||accCreativeDesc){
      const acc=accList.find(a=>a.id===accPrimary);
      L.push("=== PRODUCT PLACEMENT — DEPTH COMPOSITION ===");
      if(accCreativeDesc){
        L.push("PRODUCT TO DESIGN: "+accCreativeDesc);
        L.push("Generate as a fully realized, commercially viable product with photorealistic materials, precise construction, and consistent branding.");
      }else{
        L.push("PRODUCT: "+(accProductDesc||acc?.name||"product")+(acc?" [category: "+acc.cat+"]":""));
      }
      L.push("");
      L.push("DEPTH STACK:");
      if(accDepthHandler==="virtual_hand"){
        L.push("  PLANE 1 — FOREGROUND (tack sharp, hero): The product occupies min 40% of frame. Every material detail — stitching, hardware, texture, surface sheen — rendered in full resolution. Hero lighting with specular highlights on key surfaces.");
        L.push("  PLANE 2 — MIDGROUND: Hand(s) and forearms presenting or offering the product. Natural skin tone, authentic texture — not overly manicured. Slight movement implied in composition.");
        L.push("  PLANE 3 — BACKGROUND (soft bokeh): The animal — present as emotional context and scale reference. Gentle focus falloff.");
      }else if(accDepthHandler==="pet_wearing"){
        L.push("  PLANE 1 — HERO: Product worn or in use on the animal. Both product and animal face in co-focus. Material integrity fully preserved.");
        L.push("  PLANE 2 — ENVIRONMENT: Lifestyle context, gently defocused.");
      }else if(accDepthHandler==="attaching"){
        L.push("  PLANE 1 — ACTION: Hands attaching or adjusting the product on the animal — authentic, intimate trust moment.");
        L.push("  PLANE 2 — ANIMAL FACE: Patient, trusting expression — emotionally resonant.");
        L.push("  PLANE 3 — BACKGROUND: Environmental context, soft.");
      }
      L.push("Product photography lighting standard: primary light source highlights material and construction. Fill to reveal shadow detail. No blown highlights on product surfaces.");
      L.push("");
    }else if(accSelected.length){
      const names=accSelected.map(id=>{const a=accList.find(x=>x.id===id);const v=accVariants[id];return(a?.name||id)+(v?" — "+v+" variant":"");}).join(", ");
      L.push("=== ACCESSORIES IN SCENE ===");
      L.push(names+".");
      L.push("Accessories integrated naturally. Animal is primary subject. Items positioned as authentic lifestyle elements, not artificially posed.");
      L.push("");
    }

    // ── VIRTUAL PERSON (standalone) ──
    if(showVirtualHuman&&companionMode==="alone"&&accDepthHandler==="virtual_hand"){
      L.push("=== VIRTUAL PERSON ===");
      const visMap={full:"full body",upper_body:"upper body",hands_only:"hands and forearms only",implied:"implied presence"};
      const styleMap={casual:"casual",outdoorsy:"outdoorsy",smart_casual:"smart casual"};
      const safeVis=conflictH5_visDepth?"hands_only":vhVisibility;
      L.push("Visibility: "+(visMap[safeVis]||safeVis)+". Style: "+(styleMap[vhStyle]||vhStyle)+". Gender and age: neutral, AI discretion.");
      L.push("");
    }

    // ── SCENE PARAMETERS ──
    const techParts=[];
    if(bg){const b=BACKGROUNDS.find(x=>x.id===bg);if(b)techParts.push(b.p);}
    if(light&&!disabledLightIds.has(light)){const l=LIGHTING.find(x=>x.id===light);if(l)techParts.push(l.p);}
    if(lens){const l=LENSES.find(x=>x.mm===lens);if(l)techParts.push(l.p);}
    if(filmStock){const f=FILM_STOCKS.find(x=>x.id===filmStock);if(f)techParts.push(f.p);}
    if(colorGrade&&!conflictColorGrade){const c=COLOR_GRADES.find(x=>x.id===colorGrade);if(c)techParts.push(c.p);}
    if(techParts.length){
      L.push("=== SCENE PARAMETERS ===");
      if(hasPetPhotoVal||hasHumanPhotoVal)L.push("Note: People from reference photos are replaced by virtual figures. Environment and props preserved.");
      L.push(techParts.join(". ")+".");
      L.push("Aspect ratio: "+effectiveAspectRatio+". All subjects and environment share identical lighting direction, consistent color temperature, and matching perspective.");
      L.push("");
    } else {
      L.push("=== SCENE PARAMETERS ===");
      L.push("Aspect ratio: "+effectiveAspectRatio+". Natural, unobtrusive studio or lifestyle environment.");
      L.push("");
    }

    // ── OUTPUT FORMAT ──
    if(outputLayout==="grid_1x3"){
      L.push("=== OUTPUT FORMAT ===");
      L.push("Single composite 1×3 grid. Panel 1: tight portrait close-up — face and expression. Panel 2: side profile — full silhouette. Panel 3: full body — complete anatomy and posture. Perfect character consistency across all three panels.");
      L.push("");
    }else if(outputLayout==="grid_2x2"){
      L.push("=== OUTPUT FORMAT ===");
      L.push("Single composite 2×2 grid. Four distinct camera angles of the same animal in the same scene. Strict identity, lighting, and environment consistency across all four panels.");
      L.push("");
    }else if(outputLayout==="product_showcase"){
      L.push("=== OUTPUT FORMAT ===");
      L.push("Product showcase composite. Multiple product angles and detail shots with the animal. Product holds primary visual real estate in every panel. Commercial photography standard.");
      L.push("");
    }else if(outputLayout==="multi_custom"&&sel.length>0){
      L.push("=== CAMERA ANGLES — "+sel.length+"-PANEL COMPOSITE ===");
      if(use3D)L.push("3D Camera Control active — applies to panel 1 only.");
      L.push(sel.map((i,idx)=>{
        if(idx===0&&use3D)return "1. "+describe3D(cam.azimuth,cam.elevation,cam.zoom)+" [3D Camera — panel 1]";
        return (idx+1)+". "+ANGLES[i].name+" — "+ANGLES[i].desc;
      }).join("\n"));
      L.push("");
    }

    // ── ADDITIONAL ──
    if(custom.trim()){L.push("=== ADDITIONAL DIRECTION ===");L.push(custom.trim());L.push("");}

    // ── CRITICAL ──
    L.push("=== CRITICAL QUALITY REQUIREMENTS ===");
    L.push("Absolute photorealism — every element must hold up to close inspection. Physically plausible lighting with correct directionality, intensity falloff, and color temperature across all surfaces. Subsurface scattering on skin, fur, and organic materials. Specular highlights consistent with material type. Accurate depth of field — focus plane matches compositional intent.");
    L.push("Realistic skin texture with visible pores and subsurface scattering. No beauty filter, no plastic skin effect, no airbrushed look.");
    L.push("Hands (if human present): exactly 5 fingers per hand, no exceptions. Correct finger length proportions, natural joint bending, no fused or extra digits.");
    L.push("Animal anatomy: correct limb count and joint structure for species. Realistic fur/feather/scale texture at macro level. Eyes with proper reflections and species-accurate iris shape.");
    L.push("Seamless integration — no compositing artifacts, no edge haloing, no mismatched perspective between subjects and environment. All scale relationships physically credible.");
    L.push("=== MUST NOT GENERATE ===");
    L.push("No extra fingers, no missing fingers, no deformed hands, no broken wrists, no warped face, no asymmetrical eyes, no melted features, no disconnected limbs, no duplicate limbs, no unnatural spine.");
    L.push("No plastic skin, no uncanny valley effect, no beauty retouch artifacts.");
    L.push("No text, watermarks, logos, signatures, captions, labels, UI elements, branding, or frame borders. No additional humans, animals, or objects beyond what is specified.");
    return L.join("\n");
  };

  const prompt=buildPetPrompt();
  const petEJ=buildExpertJSON({
    taskType:`pet_studio_${vpIsFantasy?"fantasy":"real"}_${outputLayout}`,
    inputMode:usePetPhoto?"image_to_image":"text_to_image",
    originalPrompt:prompt,
    subject:`${vpIsFantasy?"Fantasy creature":vpSpecies}${vpBreed?", breed: "+vpBreed:""}${vpEmpathy?". Mood: "+vpEmpathy:""}${vpFantasySize?". Size: "+vpFantasySize:""}`,
    lighting:light,environment:bg,lens,filmStock,
    colorGrade:filmStock==="ilford"?null:colorGrade,
    aspectRatio:effectiveAspectRatio,
    style:"photorealism",mood:vpEmpathy||null,composition:null,
    custom:custom.trim()||null,
    grid:outputLayout==="grid_1x3"?{rows:1,cols:3}:outputLayout==="grid_2x2"?{rows:2,cols:2}:outputLayout==="multi_custom"&&sel.length>1?{rows:sel.length<=3?1:2,cols:sel.length<=2?2:3}:null,
    expressions:outputLayout==="multi_custom"&&sel.length>1?Object.fromEntries(sel.map((ai,i)=>[`panel_${String(i+1).padStart(2,"0")}`,{camera_angle:ANGLES[ai]?.name,description:ANGLES[ai]?.desc}])):null,
    extra:{pet_config:{
      species:vpSpecies,breed:vpBreed||null,is_fantasy:vpIsFantasy,
      empathy:vpEmpathy||null,fantasy_size:vpFantasySize||null,
      accessories:accSelected.length?accSelected:null,
      companion:{mode:companionMode,species:companionSpecies||null},
      input_sources:{pet_photo:usePetPhoto,human_photo:useMyPhoto,product:useProduct},
      output_layout:outputLayout
    }}
  });
  const hasContent=true; // prompt always shown

  const copy=async()=>{
    const ok=await copyText(enhanced||prompt);
    doToast(ok?"COPIED — ATTACH YOUR PHOTOS IN TARGET AI":"COPY FAILED");
  };
  const enhance=async()=>{
    if(!user){setShowAuthModal(true);return;}
    setEnhancing(true);setEnhanced("");
    try{
      const result=await callEnhance(prompt,custom,user.idToken);
      setEnhanced(result);doToast("✦ ENHANCED BY GEMINI");
    }catch(e){
      if(e.status===401)setShowAuthModal(true);
      else doToast("ERROR: "+e.message);
    }
    setEnhancing(false);
  };
  const PRESETS_3D=[
    {label:"Front",az:0,el:0},{label:"Right",az:90,el:0},{label:"Back",az:180,el:0},{label:"Left",az:270,el:0},
    {label:"Top",az:0,el:85},{label:"Low",az:0,el:-45},{label:"Dutch",az:45,el:15},{label:"Bird",az:0,el:70},
  ];

  // ── PILL BUTTON HELPER ──
  const Pill=({active,onClick,children,style={}})=>(
    <button onClick={onClick} style={{padding:"7px 13px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,transition:"all .15s",
      border:"1px solid "+(active?"var(--acc)":"rgba(255,255,255,.22)"),
      background:active?"var(--acdim)":"rgba(255,255,255,.05)",
      color:active?"var(--acc)":"#fff",...style}}>
      {children}
    </button>
  );

  // ── SECTION LABEL ──
  const SL=({children,badge=null})=>(
    <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
      {children}
      {badge&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:3,background:"var(--acc)",color:"#000"}}>{badge}</span>}
    </div>
  );

  return(
    <div className="page">
      <PipelineStrip active={1}/>

      {/* HEADER */}
      <div className="ph">
        <div className="pt">Pet <b>Studio</b></div>
        <div className="ps">Compose pets, products and people into perfect reference images for AI generators</div>
        <div style={{marginTop:8,textAlign:"center"}}><HowLink section="standalone tools"/></div>
      </div>

      {/* HOW IT WORKS — collapsible */}
      <div style={{marginBottom:28,borderRadius:8,border:"1px solid var(--bd)",overflow:"hidden"}}>
        <div onClick={()=>setPHowOpen(v=>!v)}
          style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",cursor:"pointer",background:"var(--s1)",userSelect:"none"}}>
          <span style={{fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>How Pet Studio works</span>
          <span style={{fontSize:13,color:"rgba(255,255,255,.5)",transition:"transform .2s",display:"inline-block",transform:pHowOpen?"rotate(180deg)":"none"}}>▼</span>
        </div>
        {pHowOpen&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:0,borderTop:"1px solid var(--bd)"}}>
            {PET_HOW_IT_WORKS.map((h,i)=>(
              <div key={i} style={{padding:"14px 16px",borderRight:i<3?"1px solid var(--bd)":"none"}}>
                <div style={{fontSize:18,marginBottom:6}}>{h.icon}</div>
                <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>{h.title}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>{h.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 1. SCENE DESCRIPTION */}
      <div className="sec">
        <div className="sh"><span className="st">What do you want to create?</span><span className="sb">OPTIONAL</span></div>
        <textarea rows={2} value={sceneDesc} onChange={e=>{setSceneDesc(e.target.value);setEnhanced("");}}
          placeholder="Describe the scene — e.g. my dog sitting in a park wearing a new harness, golden hour lighting — or skip and configure below"/>
      </div>

      {/* 2. STARTING POINT — 4 boxes */}
      <div className="sec">
        <div className="sh"><span className="st">Starting point</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            {key:"scratch", icon:"🐾", title:"Generate from scratch", sub:"fully virtual — no photos needed",
             active:useScratch&&!usePetPhoto, onClick:()=>{setUseScratch(true);setUsePetPhoto(false);setEnhanced("");}},
            {key:"petphoto",icon:"📸", title:"I have a pet photo",    sub:"attach when generating",
             active:usePetPhoto, onClick:()=>{setUseScratch(false);setUsePetPhoto(true);setEnhanced("");}},
            {key:"me",      icon:"🧑", title:"I'm in the scene",      sub:"my photo — attach when generating",
             checkbox:true, active:useMyPhoto, onClick:()=>{setUseMyPhoto(v=>!v);setEnhanced("");}},
            {key:"product", icon:"🛍", title:"I have a product",      sub:"collar, harness, toy…",
             checkbox:true, active:useProduct, onClick:()=>{setUseProduct(v=>!v);if(!useProduct)setAccOpen(true);setEnhanced("");}},
          ].map(b=>(
            <div key={b.key} onClick={b.onClick}
              style={{flex:"1 1 180px",cursor:"pointer",borderRadius:8,padding:"14px 16px",
                border:"2px solid "+(b.active?"var(--acc)":"rgba(255,255,255,.18)"),
                background:b.active?"var(--acdim)":"var(--s1)",transition:"all .15s",
                display:"flex",alignItems:"flex-start",gap:10}}>
              {b.checkbox&&(
                <div style={{width:17,height:17,borderRadius:3,flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",
                  border:"2px solid "+(b.active?"var(--acc)":"rgba(255,255,255,.35)"),background:b.active?"var(--acc)":"transparent"}}>
                  {b.active&&<span style={{color:"#000",fontSize:10,fontWeight:900}}>✓</span>}
                </div>
              )}
              {!b.checkbox&&(
                <span style={{fontSize:22,flexShrink:0,lineHeight:1,marginTop:1}}>{b.icon}</span>
              )}
              <div>
                <div style={{fontSize:13,fontWeight:700,color:b.active?"var(--acc)":"#fff"}}>{b.title}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.6)",marginTop:2}}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PET CONFIGURATION TABS */}
      <div className="sec">
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:20,borderBottom:"1px solid var(--bd)",paddingBottom:12}}>
            {[
              {id:"species", label:"🐾 Species"},
              {id:"look",    label:"✨ Look"},
            ].map(t=>(
              <button key={t.id} onClick={()=>setPTab(t.id)}
                style={{padding:"8px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .15s",
                  border:"none",background:pTab===t.id?"var(--acc)":"transparent",
                  color:pTab===t.id?"#000":"rgba(255,255,255,.7)"}}>
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB: SPECIES */}
          {pTab==="species"&&(
            <div>
              {/* Real / Fantasy + Random */}
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                <button onClick={()=>{setVpIsFantasy(false);setVpSpecies("dog");setEnhanced("");}}
                  style={{flex:1,padding:"10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,
                    border:"2px solid "+(!vpIsFantasy?"var(--acc)":"rgba(255,255,255,.2)"),
                    background:!vpIsFantasy?"var(--acdim)":"transparent",color:!vpIsFantasy?"var(--acc)":"#fff"}}>
                  Real animal
                </button>
                <button onClick={()=>{setVpIsFantasy(true);setVpSpecies("dragon");setEnhanced("");}}
                  style={{flex:1,padding:"10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,
                    border:"2px solid "+(vpIsFantasy?"var(--acc)":"rgba(255,255,255,.2)"),
                    background:vpIsFantasy?"var(--acdim)":"transparent",color:vpIsFantasy?"var(--acc)":"#fff"}}>
                  Fantasy creature
                </button>
                <button onClick={petRandom}
                  style={{padding:"10px 16px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,
                    border:"2px solid rgba(255,255,255,.2)",background:"transparent",color:"rgba(255,255,255,.8)"}}>
                  🎲 Random
                </button>
              </div>

              {/* Real species — sprites + Other tile */}
              {!vpIsFantasy&&(
                <>
                  <SL>Species</SL>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                    {PET_REAL_SPRITES.map(sp=>(
                      <div key={sp.id} onClick={()=>{setVpSpecies(sp.id);setVpBreed("");setVpOtherSpecies("");setEnhanced("");}}
                        style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                          border:"2px solid "+(!vpOtherSpecies&&vpSpecies===sp.id?"var(--acc)":"rgba(255,255,255,.2)"),
                          boxShadow:!vpOtherSpecies&&vpSpecies===sp.id?"0 0 14px rgba(232,120,10,.4)":"none",
                          background:"var(--s1)",transition:"all .15s"}}>
                        <div style={{width:100,height:120,overflow:"hidden",
                          backgroundImage:"url(/pet-species-real.png)",
                          backgroundSize:"900px 491px",backgroundPosition:sp.sx+"px -170px",backgroundRepeat:"no-repeat"}}/>
                        <div style={{padding:"4px 4px 6px",textAlign:"center",fontSize:11,fontWeight:700,
                          color:!vpOtherSpecies&&vpSpecies===sp.id?"var(--acc)":"#fff"}}>{sp.name}</div>
                      </div>
                    ))}
                    {/* OTHER tile — same size as sprites */}
                    <div onClick={()=>{setVpOtherSpecies(vpOtherSpecies?"":"-open-");setVpSpecies("");setVpBreed("");setEnhanced("");}}
                      style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                        border:"2px solid "+(vpOtherSpecies?"var(--acc)":"rgba(255,255,255,.2)"),
                        boxShadow:vpOtherSpecies?"0 0 14px rgba(232,120,10,.4)":"none",
                        background:"var(--s1)",transition:"all .15s",width:100}}>
                      <div style={{width:100,height:120,display:"flex",alignItems:"center",justifyContent:"center",
                        background:"rgba(255,255,255,.03)",fontSize:32}}>…</div>
                      <div style={{padding:"4px 4px 6px",textAlign:"center",fontSize:11,fontWeight:700,
                        color:vpOtherSpecies?"var(--acc)":"#fff"}}>Other</div>
                    </div>
                  </div>

                  {/* Other panel — only when Other tile active, all groups collapsed by default */}
                  {vpOtherSpecies&&(
                    <div style={{marginBottom:16,border:"1px solid var(--acc)",borderRadius:8,overflow:"hidden"}}>
                      {/* Selected item bar */}
                      {vpOtherSpecies!=="-open-"&&(()=>{
                        const sel=PET_EXTENDED_SPECIES.flatMap(g=>g.items).find(it=>it.id===vpOtherSpecies);
                        return sel?(
                          <div style={{padding:"8px 14px",background:"var(--acdim)",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid var(--bd)"}}>
                            <span style={{fontSize:12,fontWeight:700,color:"var(--acc)",flex:1}}>{sel.name}</span>
                            <button onClick={()=>{setVpOtherSpecies("-open-");setEnhanced("");}}
                              style={{padding:"3px 8px",borderRadius:4,border:"1px solid rgba(255,255,255,.2)",
                                background:"transparent",color:"rgba(255,255,255,.5)",fontSize:11,cursor:"pointer"}}>✕</button>
                          </div>
                        ):null;
                      })()}
                      {/* Collapsible group list */}
                      <div style={{maxHeight:340,overflowY:"auto",background:"var(--s2)"}}>
                        {PET_EXTENDED_SPECIES.map(g=>{
                          const isExp=otherExpandedGrp===g.group;
                          return(
                            <div key={g.group} style={{borderBottom:"1px solid var(--bd)"}}>
                              <div onClick={()=>setOtherExpandedGrp(isExp?null:g.group)}
                                style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                                  padding:"10px 14px",cursor:"pointer",userSelect:"none",
                                  background:isExp?"rgba(255,255,255,.06)":"transparent"}}>
                                <span style={{fontSize:12,fontWeight:800,color:"#fff"}}>{g.group}</span>
                                <span style={{fontSize:11,color:"rgba(255,255,255,.5)",
                                  transition:"transform .15s",display:"inline-block",
                                  transform:isExp?"rotate(90deg)":"none"}}>▶</span>
                              </div>
                              {isExp&&g.items.map(it=>(
                                <div key={it.id}
                                  onClick={()=>{setVpOtherSpecies(it.id);setVpSpecies("");setVpBreed("");setEnhanced("");}}
                                  style={{padding:"7px 14px 7px 24px",cursor:"pointer",
                                    background:vpOtherSpecies===it.id?"var(--acdim)":"var(--s1)",
                                    borderTop:"1px solid rgba(255,255,255,.04)",display:"flex",alignItems:"baseline",gap:8}}>
                                  <span style={{fontSize:12,fontWeight:vpOtherSpecies===it.id?700:500,
                                    color:vpOtherSpecies===it.id?"var(--acc)":"#fff",flexShrink:0}}>{it.name}</span>
                                  <span style={{fontSize:10,color:"rgba(255,255,255,.45)",lineHeight:1.4}}>{it.desc}</span>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Fantasy species */}
              {vpIsFantasy&&(
                <>
                  <SL>Creature</SL>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
                    {PET_FANTASY_SPRITES.map(sp=>(
                      <div key={sp.id} onClick={()=>{setVpSpecies(sp.id);setEnhanced("");}}
                        style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                          border:"2px solid "+(vpSpecies===sp.id?"var(--acc)":"rgba(255,255,255,.2)"),
                          boxShadow:vpSpecies===sp.id?"0 0 14px rgba(232,120,10,.4)":"none",
                          background:"var(--s1)",transition:"all .15s"}}>
                        <div style={{width:100,height:98,overflow:"hidden",
                          backgroundImage:"url(/pet-species-fantasy.png)",
                          backgroundSize:"700px 98px",backgroundPosition:sp.sx+"px 0px",backgroundRepeat:"no-repeat"}}/>
                        <div style={{padding:"4px 4px 6px",textAlign:"center",fontSize:11,fontWeight:700,
                          color:vpSpecies===sp.id?"var(--acc)":"#fff"}}>{sp.name}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Breed — explicit row/col per sprite line */}
              {!vpIsFantasy&&!vpOtherSpecies&&spData.breedSprites&&(
                <div style={{marginBottom:24}}>
                  <SL>Breed</SL>
                  {(()=>{
                    let dW,dH,bgW,bgH;
                    if(vpSpecies==="dog")     {dW=158;dH=158;bgW=1580;bgH=316;}
                    else if(vpSpecies==="cat"){dW=158;dH=154;bgW=1422;bgH=311;}
                    else                      {dW=190;dH=185;bgW=1140;bgH=186;}
                    const perRow=vpSpecies==="horse"?5:6;
                    const rows=[];
                    for(let i=0;i<spData.breedSprites.length;i+=perRow)rows.push(spData.breedSprites.slice(i,i+perRow));
                    return rows.map((row,ri)=>(
                      <div key={ri} style={{display:"flex",gap:8,marginBottom:8}}>
                        {row.map(b=>{
                          const px=b.cpx!==undefined?b.cpx:-(b.col*dW);
                          const py=-(b.row*dH);
                          return(
                            <div key={b.id} onClick={()=>{setVpBreed(vpBreed===b.id?"":b.id);setEnhanced("");}}
                              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                                flexShrink:0,width:dW,
                                border:"none",
                                outline:"2px solid "+(vpBreed===b.id?"var(--acc)":"rgba(255,255,255,.2)"),
                                outlineOffset:"-2px",
                                boxShadow:vpBreed===b.id?"0 0 12px rgba(232,120,10,.4)":"none",
                                background:"var(--s1)",transition:"all .15s",
                                opacity:vpBreed&&vpBreed!==b.id?.55:1}}>
                              <div style={{width:dW,height:dH,
                                backgroundImage:"url(/pet-breeds-"+vpSpecies+".png)",
                                backgroundSize:bgW+"px "+bgH+"px",
                                backgroundPosition:px+"px "+py+"px",
                                backgroundRepeat:"no-repeat"}}/>
                              <div style={{padding:"5px 6px 7px",textAlign:"center",fontSize:10,fontWeight:600,lineHeight:1.2,
                                color:vpBreed===b.id?"var(--acc)":"#fff"}}>{b.id}</div>
                            </div>
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
              )}

              {/* Fantasy empathy + size */}
              {vpIsFantasy&&(
                <>
                  <SL>Mood / Empathy</SL>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                    <button onClick={()=>{setVpEmpathy("");setEnhanced("");}}
                      style={{padding:"12px 14px",borderRadius:8,cursor:"pointer",
                        border:"2px solid "+(vpEmpathy===""?"var(--acc)":"rgba(255,255,255,.2)"),
                        background:vpEmpathy===""?"var(--acdim)":"transparent",
                        display:"flex",flexDirection:"column",alignItems:"center",gap:5,minWidth:70}}>
                      <span style={{fontSize:24}}>—</span>
                      <span style={{fontSize:11,fontWeight:700,color:vpEmpathy===""?"var(--acc)":"#fff"}}>Default</span>
                    </button>
                    {EMPATHY_STYLES.map(e=>(
                      <button key={e.id} onClick={()=>{setVpEmpathy(e.id);setEnhanced("");}}
                        style={{padding:"12px 14px",borderRadius:8,cursor:"pointer",
                          border:"2px solid "+(vpEmpathy===e.id?"var(--acc)":"rgba(255,255,255,.2)"),
                          background:vpEmpathy===e.id?"var(--acdim)":"transparent",
                          display:"flex",flexDirection:"column",alignItems:"center",gap:5,minWidth:70}}>
                        <span style={{fontSize:24}}>{e.emoji}</span>
                        <span style={{fontSize:11,fontWeight:700,color:vpEmpathy===e.id?"var(--acc)":"#fff"}}>{e.label}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{marginBottom:24}}>
                    <SL>Size</SL>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <Pill active={vpFantasySize===""} onClick={()=>{setVpFantasySize("");setEnhanced("");}}>— default</Pill>
                      {["tiny (dog-sized)","medium (horse-sized)","large (elephant-sized)","gigantic"].map(s=>(
                        <Pill key={s} active={vpFantasySize===s} onClick={()=>{setVpFantasySize(s);setEnhanced("");}}>{s}</Pill>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Mood / Empathy + Size — real animals */}
              {!vpIsFantasy&&(
                <>
                  <SL>Mood / Empathy</SL>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
                    <button onClick={()=>{setVpEmpathy("");setEnhanced("");}}
                      style={{padding:"10px 12px",borderRadius:9,cursor:"pointer",
                        border:"2px solid "+(vpEmpathy===""?"var(--acc)":"rgba(255,255,255,.2)"),
                        background:vpEmpathy===""?"var(--acdim)":"transparent",
                        display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:64}}>
                      <span style={{fontSize:20}}>—</span>
                      <span style={{fontSize:10,fontWeight:700,color:vpEmpathy===""?"var(--acc)":"#fff"}}>Default</span>
                    </button>
                    {EMPATHY_STYLES.map(e=>(
                      <button key={e.id} onClick={()=>{setVpEmpathy(e.id);setEnhanced("");}}
                        style={{padding:"10px 12px",borderRadius:9,cursor:"pointer",
                          border:"2px solid "+(vpEmpathy===e.id?"var(--acc)":"rgba(255,255,255,.2)"),
                          background:vpEmpathy===e.id?"var(--acdim)":"transparent",
                          display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:64}}>
                        <span style={{fontSize:20}}>{e.emoji}</span>
                        <span style={{fontSize:10,fontWeight:700,color:vpEmpathy===e.id?"var(--acc)":"#fff"}}>{e.label}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{marginBottom:20}}>
                    <SL>Size</SL>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      <Pill active={vpFantasySize===""} onClick={()=>{setVpFantasySize("");setEnhanced("");}}>— default</Pill>
                      {["tiny (dog-sized)","medium (horse-sized)","large (elephant-sized)","gigantic"].map(s=>(
                        <Pill key={s} active={vpFantasySize===s} onClick={()=>{setVpFantasySize(s);setEnhanced("");}}>{s}</Pill>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* COMPANION — always shown at bottom of Species tab */}
              <div style={{borderTop:"1px solid var(--bd)",paddingTop:20,marginTop:8}}>
                <SL>Who is in the scene?</SL>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                {[{id:"alone",label:"🐾 Alone",sub:"Just the animal"},{id:"animal",label:"🐕🐈 With animal",sub:"Second pet"},{id:"human",label:"🤝 With human",sub:"Virtual person"}].map(m=>{
                    const humanBlocked=m.id==="human"&&(conflictH3_photoHuman||conflictH4_productHuman);
                    return(
                    <button key={m.id} onClick={()=>{if(!humanBlocked){setCompanionMode(m.id);setEnhanced("");}}}
                      style={{flex:"1 1 120px",padding:"12px 14px",borderRadius:8,cursor:humanBlocked?"not-allowed":"pointer",textAlign:"center",
                        opacity:humanBlocked?.25:1,
                        border:"2px solid "+(companionMode===m.id?"var(--acc)":"rgba(255,255,255,.2)"),
                        background:companionMode===m.id?"var(--acdim)":"transparent",transition:"opacity .2s"}}>
                      <div style={{fontSize:16,marginBottom:4}}>{m.label.split(" ")[0]}</div>
                      <div style={{fontSize:12,fontWeight:700,color:companionMode===m.id?"var(--acc)":"#fff"}}>{m.label.split(" ").slice(1).join(" ")}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.6)",marginTop:2}}>{m.sub}</div>
                    </button>
                    );
                  })}
                </div>
                {companionMode==="animal"&&(
                  <>
                    <SL>Second animal</SL>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
                      {PET_REAL_SPRITES.filter(s=>s.id!==vpSpecies).map(sp=>(
                        <div key={sp.id} onClick={()=>{setCompanionSpecies(sp.id);setEnhanced("");}}
                          style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                            border:"2px solid "+(companionSpecies===sp.id?"var(--acc)":"rgba(255,255,255,.2)"),
                            boxShadow:companionSpecies===sp.id?"0 0 14px rgba(232,120,10,.4)":"none",
                            background:"var(--s1)",transition:"all .15s"}}>
                          <div style={{width:100,height:120,overflow:"hidden",
                            backgroundImage:"url(/pet-species-real.png)",
                            backgroundSize:"900px 491px",backgroundPosition:sp.sx+"px -170px",backgroundRepeat:"no-repeat"}}/>
                          <div style={{padding:"4px 4px 6px",textAlign:"center",fontSize:11,fontWeight:700,
                            color:companionSpecies===sp.id?"var(--acc)":"#fff"}}>{sp.name}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {companionMode==="human"&&(
                  <div style={{padding:"12px 14px",borderRadius:8,border:"1px solid rgba(232,120,10,.3)",background:"rgba(232,120,10,.04)",marginBottom:16}}>
                    <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--acc)",marginBottom:10}}>Virtual person</div>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                      <div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginBottom:5}}>VISIBILITY</div>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                          {[{v:"full",l:"Full body"},{v:"upper_body",l:"Upper body"},{v:"hands_only",l:"Hands only"},{v:"implied",l:"Implied"}].map(o=>{
                            const blocked=conflictH5_visDepth&&(o.v==="full"||o.v==="upper_body");
                            return(
                            <Pill key={o.v} active={vhVisibility===o.v&&!blocked}
                              onClick={()=>{if(!blocked){setVhVisibility(o.v);setEnhanced("");}}}
                              style={{opacity:blocked?.22:1,cursor:blocked?"not-allowed":"pointer"}}>
                              {o.l}
                            </Pill>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginBottom:5}}>ACTION</div>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                          {[{v:"extended_hand",l:"Extending hand"},{v:"holding_leash",l:"Holding leash"},{v:"kneeling",l:"Kneeling"},{v:"standing",l:"Standing"}].map(o=>{
                            const isImplied=vhVisibility==="implied";
                            const isHandsOnly=vhVisibility==="hands_only"&&["kneeling","standing"].includes(o.v);
                            const blocked=isImplied||isHandsOnly;
                            return(
                            <Pill key={o.v} active={vhAction===o.v&&!blocked}
                              onClick={()=>{if(!blocked){setVhAction(o.v);setEnhanced("");}}}
                              style={{opacity:blocked?.22:1,cursor:blocked?"not-allowed":"pointer"}}>
                              {o.l}
                            </Pill>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginBottom:5}}>STYLE</div>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                          {[{v:"casual",l:"Casual"},{v:"outdoorsy",l:"Outdoorsy"},{v:"smart_casual",l:"Smart casual"}].map(o=>(
                            <Pill key={o.v} active={vhStyle===o.v} onClick={()=>setVhStyle(o.v)}>{o.l}</Pill>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {companionMode!=="alone"&&(
                  <div>
                    <SL>Interaction</SL>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {(companionMode==="animal"
                        ?["playing together","lying side by side","sniffing each other","chasing","sleeping together","looking at each other"]
                        :["petting","holding leash","giving treat","playing","hugging","kneeling with","lifting up"]
                      ).map(i=>(
                        <Pill key={i} active={companionInteraction===i} onClick={()=>{setCompanionInteraction(i);setEnhanced("");}}>{i}</Pill>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: LOOK */}
          {pTab==="look"&&(
            <div style={{border:"1px solid var(--bd)",borderRadius:8,padding:"16px 18px",background:"var(--s1)"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)",marginBottom:14}}>
                Coat · Tail · Ears · Pose · Gaze
              </div>
              {!vpIsFantasy&&spData.hasCoat&&(
                <div style={{marginBottom:16,position:"relative"}}>
                  {conflictCoat&&(
                    <div style={{position:"absolute",inset:0,zIndex:10,borderRadius:8,background:"rgba(6,6,6,.65)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(1px)"}}>
                      <span style={{fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.45)"}}>Defined by breed</span>
                    </div>
                  )}
                  <SL>Coat</SL>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                    <div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Type</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <Pill active={vpCoatType===""} onClick={()=>{setVpCoatType("");setEnhanced("");}}>— default</Pill>
                        {PET_COAT_TYPES.map(t=><Pill key={t} active={vpCoatType===t} onClick={()=>{setVpCoatType(t);setEnhanced("");}}>{t}</Pill>)}
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Pattern</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <Pill active={vpCoatPattern===""} onClick={()=>{setVpCoatPattern("");setEnhanced("");}}>— default</Pill>
                        {PET_COAT_PATTERNS.map(t=><Pill key={t} active={vpCoatPattern===t} onClick={()=>{setVpCoatPattern(t);setEnhanced("");}}>{t}</Pill>)}
                      </div>
                    </div>
                  </div>
                  <input placeholder="Colors (e.g. golden, white chest)" value={vpCoatColors}
                    onChange={e=>{setVpCoatColors(e.target.value);setEnhanced("");}}
                    style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid var(--bd)",background:"var(--s2)",color:"#fff",fontSize:12,outline:"none",fontFamily:"inherit"}}/>
                </div>
              )}
              {spData.hasTail&&(
                <div style={{marginBottom:16}}>
                  <SL>Tail</SL>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    <Pill active={vpTail===""} onClick={()=>{setVpTail("");setEnhanced("");}}>— default</Pill>
                    {PET_TAIL_TYPES.map(t=><Pill key={t} active={vpTail===t} onClick={()=>{setVpTail(t);setEnhanced("");}}>{t}</Pill>)}
                  </div>
                </div>
              )}
              {spData.hasEars&&(
                <div style={{marginBottom:16}}>
                  <SL>Ears</SL>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    <Pill active={vpEars===""} onClick={()=>{setVpEars("");setEnhanced("");}}>— default</Pill>
                    {(spData.earOptions||PET_EAR_TYPES).map(t=><Pill key={t} active={vpEars===t} onClick={()=>{setVpEars(t);setEnhanced("");}}>{t}</Pill>)}
                  </div>
                </div>
              )}
              {spData.hasBeak&&(
                <div style={{marginBottom:16}}>
                  <SL>Beak</SL>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {spData.beakOptions.map(t=><Pill key={t} active={vpBeak===t} onClick={()=>{setVpBeak(t);setEnhanced("");}}>{t}</Pill>)}
                  </div>
                </div>
              )}
              {vpIsFantasy&&(
                <>
                  {spData.hasWings&&(
                    <div style={{marginBottom:16}}>
                      <SL>Wings</SL>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {["folded","spread","in flight","tattered","glowing"].map(t=>(
                          <Pill key={t} active={vpEars===t} onClick={()=>{setVpEars(t);setEnhanced("");}}>{t}</Pill>
                        ))}
                      </div>
                    </div>
                  )}
                  {spData.hasHorns&&(
                    <div style={{marginBottom:16}}>
                      <SL>Horns</SL>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        {["small","curved","spiral","massive","jagged","glowing"].map(t=>(
                          <Pill key={t} active={vpTail===t} onClick={()=>{setVpTail(t);setEnhanced("");}}>{t}</Pill>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{marginBottom:16}}>
                    <SL>Color / fur / scales</SL>
                    <input placeholder="e.g. purple fur with orange horns, iridescent scales"
                      value={vpCoatColors} onChange={e=>{setVpCoatColors(e.target.value);setEnhanced("");}}
                      style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid var(--bd)",background:"var(--s2)",color:"#fff",fontSize:12,outline:"none",fontFamily:"inherit"}}/>
                  </div>
                </>
              )}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div>
                  <SL>Pose</SL>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    <Pill active={vpPose===""} onClick={()=>{setVpPose("");setEnhanced("");}}>— default</Pill>
                    {poses.map(p=><Pill key={p} active={vpPose===p} onClick={()=>{setVpPose(p);setEnhanced("");}}>{p}</Pill>)}
                  </div>
                </div>
                <div>
                  <SL>Gaze</SL>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    <Pill active={vpGaze===""} onClick={()=>{setVpGaze("");setEnhanced("");}}>— default</Pill>
                    {["toward viewer","toward owner / hand","into distance","at product"].map(g=>(
                      <Pill key={g} active={vpGaze===g} onClick={()=>{setVpGaze(g);setEnhanced("");}}>{g}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

      </div>

      {/* 4. ACCESSORIES */}
      <div className="sec" style={{borderRadius:8,border:"1px solid "+(useProduct?"var(--acc)":accOpen?"var(--bdh)":"var(--bd)"),overflow:"hidden",marginBottom:28,transition:"border-color .2s"}}
        onMouseEnter={e=>{if(!accOpen&&!useProduct)e.currentTarget.style.borderColor="var(--bdh)";}}
        onMouseLeave={e=>{if(!accOpen&&!useProduct)e.currentTarget.style.borderColor="var(--bd)";}}>
        <div onClick={()=>setAccOpen(v=>!v)}
          style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",cursor:"pointer",background:"var(--s1)",userSelect:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {/* Toggle switch */}
            <div style={{width:34,height:20,borderRadius:10,flexShrink:0,position:"relative",cursor:"pointer",
              background:accOpen||accProductDesc||accCreativeDesc||accSelected.length?"var(--acc)":"rgba(255,255,255,.15)",
              transition:"background .2s"}}>
              <div style={{position:"absolute",top:3,left:accOpen||accProductDesc||accCreativeDesc||accSelected.length?17:3,
                width:14,height:14,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:useProduct?"var(--acc)":"#fff"}}>
                {useProduct?"Product & Accessories":"Accessories"}
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:1}}>
                {useProduct?"Define your product — describe or design it":"Add collar, harness, toy or other items to the scene"}
              </div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {(accProductDesc||accCreativeDesc||accSelected.length>0)&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:4,background:"var(--acc)",color:"#000",fontWeight:700}}>ACTIVE</span>}
            <span style={{fontSize:13,color:"rgba(255,255,255,.5)",transition:"transform .2s",display:"inline-block",transform:accOpen?"rotate(180deg)":"none"}}>▼</span>
          </div>
        </div>
        {accOpen&&(
          <div style={{padding:"16px 18px",borderTop:"1px solid var(--bd)"}}>

            {/* Product description — shown when useProduct or user opens manually */}
            <div style={{marginBottom:16}}>
              <SL>Product</SL>
              <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                <Pill active={accProductMode==="existing"} onClick={()=>{setAccProductMode("existing");setEnhanced("");}}>Existing product</Pill>
                <Pill active={accProductMode==="creative"} onClick={()=>{setAccProductMode("creative");setEnhanced("");}}>Creative concept 🚀</Pill>
                <Pill active={accProductMode==="none"} onClick={()=>{setAccProductMode("none");setEnhanced("");}}>No product</Pill>
              </div>
              {accProductMode==="existing"&&(
                <textarea rows={2} value={accProductDesc} onChange={e=>{setAccProductDesc(e.target.value);setEnhanced("");}}
                  placeholder="Describe: e.g. brown leather collar, silver D-ring, slightly worn — or hemp rope leash, natural beige"/>
              )}
              {accProductMode==="creative"&&(
                <textarea rows={2} value={accCreativeDesc} onChange={e=>{setAccCreativeDesc(e.target.value);setEnhanced("");}}
                  placeholder="Describe concept: e.g. GPS collar with LED strip, matte black, cyberpunk style — AI designs it as a real product"/>
              )}
            </div>

            {/* How prominent / presented */}
            {accProductMode!=="none"&&(accProductDesc||accCreativeDesc)&&(
              <div style={{marginBottom:16}}>
                <SL>How prominent?</SL>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[
                    {id:"hero",       label:"Hero",       sub:"product is main subject, pet is context"},
                    {id:"co_star",    label:"Co-star",    sub:"pet and product equally important"},
                    {id:"background", label:"Background", sub:"product visible but pet is hero"},
                  ].map(p=>(
                    <button key={p.id} onClick={()=>{setProductFocus(p.id);setEnhanced("");}}
                      style={{flex:"1 1 140px",padding:"10px 12px",borderRadius:8,cursor:"pointer",textAlign:"left",
                        border:"2px solid "+(productFocus===p.id?"var(--acc)":"rgba(255,255,255,.2)"),
                        background:productFocus===p.id?"var(--acdim)":"transparent"}}>
                      <div style={{fontSize:12,fontWeight:700,color:productFocus===p.id?"var(--acc)":"#fff"}}>{p.label}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.6)",marginTop:2,lineHeight:1.4}}>{p.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Presentation style — only for hero */}
            {productFocus==="hero"&&accProductMode!=="none"&&(accProductDesc||accCreativeDesc)&&(
              <div style={{marginBottom:16}}>
                <SL>Presentation</SL>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[
                    {id:"virtual_hand",label:"🤲 Hand presenting", sub:"hand extends product toward pet"},
                    {id:"pet_wearing",  label:"🐾 Pet wearing it",  sub:"product worn/in use, sharp focus"},
                    {id:"attaching",    label:"🔗 Being attached",  sub:"hands attaching to pet"},
                  ].map(d=>(
                    <button key={d.id} onClick={()=>{setAccDepthHandler(d.id);setEnhanced("");}}
                      style={{flex:"1 1 140px",padding:"10px 12px",borderRadius:8,cursor:"pointer",textAlign:"left",
                        border:"2px solid "+(accDepthHandler===d.id?"var(--acc)":"rgba(255,255,255,.2)"),
                        background:accDepthHandler===d.id?"var(--acdim)":"transparent"}}>
                      <div style={{fontSize:12,fontWeight:700,color:accDepthHandler===d.id?"var(--acc)":"#fff"}}>{d.label}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.65)",marginTop:3,lineHeight:1.4}}>{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extra accessories multi-select */}
            <div>
              <SL>Accessories <span style={{fontWeight:400,opacity:.6,fontSize:9}}>(multi-select)</span></SL>
              {[...new Set(accList.map(a=>a.cat))].map(cat=>(
                <div key={cat} style={{marginBottom:12}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.55)",textTransform:"uppercase",letterSpacing:1.5,fontWeight:700,marginBottom:6}}>{cat}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                    {accList.filter(a=>a.cat===cat).map(a=>{
                      const sel=accSelected.includes(a.id);
                      return(
                        <div key={a.id} style={{display:"flex",alignItems:"center",gap:0}}>
                          <Pill active={sel} onClick={()=>{toggleAccSel(a.id);setEnhanced("");}}>
                            {sel?"✓ ":""}{a.name}
                          </Pill>
                          {sel&&a.variants&&(
                            <select value={accVariants[a.id]||""} onChange={e=>setAccVariants(v=>({...v,[a.id]:e.target.value}))}
                              style={{marginLeft:4,padding:"5px 8px",borderRadius:6,border:"1px solid var(--acc)",
                                background:"var(--s2)",color:"var(--acc)",fontSize:11,outline:"none",cursor:"pointer",fontWeight:600}}>
                              <option value="">— variant</option>
                              {a.variants.map(vr=><option key={vr} value={vr}>{vr}</option>)}
                            </select>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. SCENE PARAMETERS */}
      <div className="sec">
        <div className="sh"><span className="st">Scene parameters</span></div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.7)",marginBottom:16,padding:"8px 12px",borderRadius:6,background:"rgba(255,255,255,.03)",border:"1px solid var(--bd)",lineHeight:1.6}}>
          ⚙ Applied to the generated scene. People from reference photos are replaced by virtual figures.
        </div>
        <div style={{marginBottom:22}}>
          <SL>Lighting</SL>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {LIGHT_SPRITES.map(r=>{
              const isConflict=disabledLightIds.has(r.id);
              return(
              <div key={r.id} onClick={()=>{if(!isConflict){tog1(setLight,r.id);setEnhanced("");}}}
                style={{cursor:isConflict?"not-allowed":"pointer",borderRadius:8,overflow:"hidden",width:150,
                  opacity:isConflict?.22:1,
                  border:"2px solid "+(light===r.id?"var(--acc)":"rgba(255,255,255,.2)"),
                  boxShadow:light===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                  transition:"opacity .2s"}}>
                <div style={{width:150,height:105,backgroundImage:"url(/lighting.png)",backgroundSize:"750px 315px",backgroundPosition:r.sx+"px "+r.sy+"px"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:light===r.id?"var(--acc)":"#fff"}} translate="no">{r.name}</div>
              </div>
              );
            })}
          </div>
        </div>
        <div style={{marginBottom:22}}>
          <SL>Environment</SL>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {ENV_SPRITES.map(r=>(
              <div key={r.id} onClick={()=>{tog1(setBg,r.id);setEnhanced("");}}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",width:133,
                  border:"2px solid "+(bg===r.id?"var(--acc)":"rgba(255,255,255,.2)"),
                  boxShadow:bg===r.id?"0 0 14px rgba(232,120,10,.4)":"none"}}>
                <div style={{width:133,height:112,backgroundImage:"url(/environment.png)",backgroundSize:"798px 336px",backgroundPosition:r.sx+"px "+r.sy+"px"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:bg===r.id?"var(--acc)":"#fff"}} translate="no">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:22}}>
          <SL>Lens</SL>
          <div className="lens-row">
            {LENS_SPRITES.map(r=>(
              <div key={r.mm} onClick={()=>{tog1(setLens,r.mm);setEnhanced("");}}
                style={{cursor:"pointer",borderRadius:8,overflow:"hidden",width:150,
                  border:"2px solid "+(lens===r.mm?"var(--acc)":"rgba(255,255,255,.2)"),
                  boxShadow:lens===r.mm?"0 0 14px rgba(232,120,10,.4)":"none"}}>
                <div style={{width:150,height:83,backgroundImage:"url(/lens.png)",backgroundSize:"600px 332px",backgroundPosition:r.sx+"px "+r.sy+"px"}}/>
                <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:lens===r.mm?"var(--acc)":"#fff"}} translate="no">{r.mm}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:22}}>
          <div style={{flex:"1 1 280px"}}>
            <SL>Film Stock</SL>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {FILM_SPRITES.map(r=>(
                <div key={r.id} onClick={()=>{tog1(setFilmStock,r.id);setEnhanced("");}}
                  style={{cursor:"pointer",borderRadius:8,overflow:"hidden",width:150,
                    border:"2px solid "+(filmStock===r.id?"var(--acc)":"rgba(255,255,255,.2)"),
                    boxShadow:filmStock===r.id?"0 0 14px rgba(232,120,10,.4)":"none"}}>
                  <div style={{width:150,height:167,backgroundImage:"url(/film.png)",backgroundSize:"600px 334px",backgroundPosition:r.sx+"px "+r.sy+"px"}}/>
                  <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:filmStock===r.id?"var(--acc)":"#fff"}} translate="no">{r.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{flex:"1 1 280px"}}>
            <SL>Color Grade</SL>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,position:"relative"}}>
              {conflictColorGrade&&(
                <div style={{position:"absolute",inset:0,zIndex:10,borderRadius:8,background:"rgba(6,6,6,.65)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(1px)"}}>
                  <span style={{fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.45)"}}>B&W film active</span>
                </div>
              )}
              {COLOR_SPRITES.map(r=>(
                <div key={r.id} onClick={()=>{if(!conflictColorGrade){tog1(setColorGrade,r.id);setEnhanced("");}}}
                  style={{cursor:conflictColorGrade?"not-allowed":"pointer",borderRadius:8,overflow:"hidden",width:150,
                    border:"2px solid "+(colorGrade===r.id?"var(--acc)":"rgba(255,255,255,.2)"),
                    boxShadow:colorGrade===r.id?"0 0 14px rgba(232,120,10,.4)":"none"}}>
                  <div style={{width:150,height:167,backgroundImage:"url(/color.png)",backgroundSize:"600px 334px",backgroundPosition:r.sx+"px "+r.sy+"px"}}/>
                  <div style={{padding:"4px 4px 5px",textAlign:"center",fontSize:10,fontWeight:600,color:colorGrade===r.id?"var(--acc)":"#fff"}} translate="no">{r.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <SL>Aspect Ratio</SL>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",position:"relative"}}>
            {conflictAspectRatio&&(
              <div style={{position:"absolute",inset:0,zIndex:10,borderRadius:8,background:"rgba(6,6,6,.65)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(1px)"}}>
                <span style={{fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,.45)"}}>
                  {conflictAR_fisheye?"Fisheye forces 1:1":"Anamorphic forces 2.39:1"}
                </span>
              </div>
            )}
            {FORMAT_SPRITES.map(r=>(
              <div key={r.id} onClick={()=>{if(!conflictAspectRatio){setAspectRatio(r.id);setEnhanced("");}}}
                style={{cursor:conflictAspectRatio?"not-allowed":"pointer",borderRadius:8,overflow:"hidden",width:r.fw,
                  border:"2px solid "+((conflictAspectRatio?effectiveAspectRatio:aspectRatio)===r.id?"var(--acc)":"rgba(255,255,255,.2)"),
                  boxShadow:(conflictAspectRatio?effectiveAspectRatio:aspectRatio)===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                  display:"flex",flexDirection:"column",alignItems:"center",paddingTop:10,background:"var(--s1)",gap:6}}>
                <div style={{width:80,height:80,backgroundImage:"url(/format.png)",backgroundSize:"400px 80px",backgroundPosition:r.sx+"px 0px"}}/>
                <div style={{paddingBottom:6,textAlign:"center",fontSize:10,fontWeight:600,color:(conflictAspectRatio?effectiveAspectRatio:aspectRatio)===r.id?"var(--acc)":"#fff"}} translate="no">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. OUTPUT */}
      <div className="sec">
        <div className="sh"><span className="st">Output</span></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:outputLayout==="multi_custom"?20:0}}>
          {[...PET_OUTPUT_LAYOUTS,{id:"multi_custom",name:"Custom Multi-Shot",icon:"🎬",desc:"Pick angles + 3D camera"}].map(l=>(
            <button key={l.id} onClick={()=>{setOutputLayout(l.id);setEnhanced("");}}
              style={{flex:"1 1 130px",padding:"12px 14px",borderRadius:8,cursor:"pointer",textAlign:"left",
                border:"2px solid "+(outputLayout===l.id?"var(--acc)":"rgba(255,255,255,.2)"),
                background:outputLayout===l.id?"var(--acdim)":"transparent"}}>
              <div style={{fontSize:18,marginBottom:5}}>{l.icon}</div>
              <div style={{fontSize:12,fontWeight:800,color:outputLayout===l.id?"var(--acc)":"#fff"}}>{l.name}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.65)",marginTop:3,lineHeight:1.4}}>{l.desc}</div>
            </button>
          ))}
        </div>
        {outputLayout==="multi_custom"&&(
          <>
            <SL>Camera angles ({sel.length}/{MAX_A})</SL>
            <div className="grid3" style={{marginBottom:20}}>
              {ANGLES.map((a,i)=>(
                <div key={i} className={`ac${sel.includes(i)?" sel":""}`} onClick={()=>togAngle(i)}>
                  <div className="abar"/>
                  <div className="an">{a.name}</div>
                  {sel.includes(i)&&<div className="anum">{sel.indexOf(i)+1}</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 7. ADDITIONAL */}
      <div className="sec">
        <div className="sh"><span className="st">Additional details</span><span className="sb" translate="no">OPTIONAL</span></div>
        <textarea rows={3} value={custom} onChange={e=>{setCustom(e.target.value);setEnhanced("");}}
          placeholder="Extra requests: e.g. more dramatic shadows, add autumn leaves, collar should have visible name tag"/>
      </div>

      {/* 8. PROMPT OUTPUT */}
      <div className="sec">
        <div className="sh"><span className="st">Generated Prompt</span><span className="sb" translate="no">LIVE</span></div>
        <PromptOutputPanel
          prompt={prompt}
          custom={custom}
          hasAny={true}
          onToast={doToast}
          expertJSON={petEJ}
          extraButtons={
            <>
              <button className="btn" onClick={()=>{setUseScratch(true);setUsePetPhoto(false);setUseMyPhoto(false);setUseProduct(false);setSceneDesc("");setVpIsFantasy(false);setVpSpecies("dog");setVpBreed("Golden Retriever");setVpEmpathy("");setVpFantasySize("");setVpCoatType("long");setVpCoatPattern("solid");setVpCoatColors("golden");setVpTail("long");setVpEars("floppy");setVpPose("sitting");setVpGaze("toward viewer");setLight(null);setBg(null);setLens(null);setFilmStock(null);setColorGrade(null);setAspectRatio("16:9");setOutputLayout("single");setSel([]);setAccMode("product");setAccSelected([]);setAccPrimary("");setAccProductMode("existing");setProductFocus("hero");setAccProductDesc("");setAccCreativeDesc("");setAccDepthHandler("virtual_hand");setCompanionMode("alone");setCustom("");setPetEnhancements([]);setAccOpen(false);doToast("RESET COMPLETE");}}>Reset</button>
              <button className="btn" onClick={petRandom}>Random</button>
            </>
          }
        />
        <GenWithLinks getPrompt={()=>prompt} onCopy={()=>doToast("PROMPT COPIED — ATTACH YOUR PHOTOS")}/>
        <div style={{marginTop:14,padding:"14px 16px",borderRadius:8,border:"1px solid var(--bd)",background:"var(--s1)"}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,.65)"}}>💡 Next step:</span>
            <button onClick={()=>setPage("angles")} style={{padding:"7px 14px",borderRadius:6,border:"1px solid var(--bd)",background:"var(--s2)",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>
              🎬 Multi-Shot
            </button>
            <button onClick={()=>setPage("video")} style={{padding:"7px 14px",borderRadius:6,border:"1px solid var(--bd)",background:"var(--s2)",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>
              🎥 Video
            </button>
          </div>
        </div>
      </div>

      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

// ─── APP MAP ──────────────────────────────────────────────────────────────────

const MAP_DATA={
  id:"root",label:"PrompTo miniStudio",color:"#ffffff",
  children:[
    {id:"char",label:"Character Sheet",color:"#e8780a",page:"avatars",children:[
      {id:"ci",label:"Identity",color:"#e8780a",children:[
        {id:"ci1",label:"16 universes — Realism, Anime, Pixel Art, Oil Painting…"},
        {id:"ci2",label:"16 races with sprite previews (Human, Elf, Orc, Cyborg…)"},
        {id:"ci3",label:"Gender · Region · Age · Eye color · Skin color · Skin traits"},
        {id:"ci4",label:"25 expressions with sprite previews"},
      ]},
      {id:"cf",label:"Face",color:"#e8780a",children:[
        {id:"cf1",label:"12 hair styles"},
        {id:"cf2",label:"7 eye types · 7 lip shapes · Facial markings"},
        {id:"cf3",label:"Horns — 7×2 sprite sheet, 10+ variants"},
      ]},
      {id:"cb",label:"Body",color:"#e8780a",children:[
        {id:"cb1",label:"Asymmetric arms L/R — natural, steampunk, cybernetic, tentacles, claws…"},
        {id:"cb2",label:"Asymmetric legs L/R — prosthetic, digitigrade, snake tail, hooves…"},
        {id:"cb3",label:"Wings · Tail · Ears — 7+ variants each"},
      ]},
      {id:"cw",label:"Wardrobe & Output",color:"#e8780a",children:[
        {id:"cw1",label:"10 clothing categories — studio neutral to fantasy armor"},
        {id:"cw2",label:"10 layout templates — Style Sheet, Headshot, Full Body, Action Pose…"},
        {id:"cw3",label:"Lighting · Environment · Lens per character"},
        {id:"cw4",label:"From scratch or from reference photo · Random configuration"},
      ]},
    ]},
    {id:"multi",label:"Multi-Shot",color:"#4fa3e0",page:"angles",children:[
      {id:"ma",label:"Camera Angles",color:"#4fa3e0",children:[
        {id:"ma1",label:"30+ predefined angles — wide establishing to extreme close-up"},
        {id:"ma2",label:"3D Camera Control (BETA) — azimuth, elevation, distance"},
        {id:"ma3",label:"Up to 9 panels per composite grid"},
        {id:"ma4",label:"Batch variants — 1–4 simultaneous prompt variations"},
      ]},
      {id:"ms",label:"Visual Settings",color:"#4fa3e0",children:[
        {id:"ms1",label:"14 lighting scenarios — Golden Hour, Neon Night, Studio Key…"},
        {id:"ms2",label:"17 environments — Sci-Fi Megacity, Cyberpunk Alley, Crystal Cave…"},
        {id:"ms3",label:"16 focal lengths — 8mm fisheye to 600mm extreme telephoto"},
        {id:"ms4",label:"8 film stocks · 8 color grades · 5 aspect ratios"},
        {id:"ms5",label:"Conflict resolution — fisheye locks 1:1, Ilford B&W disables color grades, B/L incompatible pairs dimmed"},
      ]},
      {id:"mw",label:"Workflow",color:"#4fa3e0",children:[
        {id:"mw1",label:"Step 1: generate multi-panel grid — copy prompt, attach photo"},
        {id:"mw2",label:"Step 2: expand any panel to full-resolution single shot"},
        {id:"mw3",label:"From scratch (txt2img) or from reference photo (img2img)"},
      ]},
    ]},
    {id:"video",label:"Video",color:"#a78bfa",page:"video",children:[
      {id:"v1",label:"txt2vid — Text to Video (describe from zero)"},
      {id:"v2",label:"img2vid — Image to Video (attach reference)"},
      {id:"v3",label:"Frames — First + Last Frame from Multi-Shot grid"},
      {id:"v4",label:"Random — instant full configuration with scene"},
      {id:"v5",label:"Generators: Sora · Runway · Kling · Pika"},
      {id:"v6",label:"Frame generators: Grok Imagine · Gemini · Arena.ai"},
    ]},
    {id:"pet",label:"Pet Studio",color:"#34d399",page:"pet",children:[
      {id:"pi",label:"Inputs",color:"#34d399",children:[
        {id:"pi1",label:"Product — photo / description / creative concept"},
        {id:"pi2",label:"Pet reference photo — quality enhancement, identity preservation"},
        {id:"pi3",label:"Person photo — environment preserved, people replaced by virtual figure"},
      ]},
      {id:"pv",label:"Virtual Pet",color:"#34d399",children:[
        {id:"pv1",label:"9 real species — Dog (19 breeds), Cat (18 breeds), Horse (6 breeds), Rabbit, Hamster, Parrot, Turtle, Fish, Hedgehog"},
        {id:"pv2",label:"110+ extended species via Other panel — rodents, parrots, lizards, snakes, amphibians, fish"},
        {id:"pv3",label:"7 fantasy creatures — Dragon, Unicorn, Griffin, Phoenix, Fluffy, Hellhound, Imp"},
        {id:"pv4",label:"Look tab (framed) — coat type/pattern/color · tail · ears · wings · horns · pose · gaze"},
        {id:"pv5",label:"6 empathy/mood levels · 4 size options · conflict resolution (breed overrides coat)"},
      ]},
      {id:"pa",label:"Accessories",color:"#34d399",children:[
        {id:"pa1",label:"Toggle switch header — hover previews, click locks open permanently"},
        {id:"pa2",label:"Product Placement — 3 depth handlers: Hand presenting · Pet wearing · Being attached"},
        {id:"pa3",label:"Standard multi-select — grouped by category per species, variants inline"},
        {id:"pa4",label:"Human conflict resolution — implied/hands-only locks incompatible actions"},
      ]},
      {id:"pc",label:"Scene & Output",color:"#34d399",children:[
        {id:"pc1",label:"Companion: alone / with second animal / with human (virtual person lite)"},
        {id:"pc2",label:"14 lighting · 17 environments · 16 lenses · 8 film stocks · 8 color grades"},
        {id:"pc3",label:"Optical conflict resolution — fisheye/anamorphic lock aspect ratio, B&W disables grades"},
        {id:"pc4",label:"Output: Single · 1×3 Grid · 2×2 Grid · Product Showcase · Custom Multi-Shot + 3D camera"},
        {id:"pc5",label:"Random — one click full configuration"},
      ]},
    ]},
    {id:"common",label:"Common Features",color:"#f472b6",children:[
      {id:"cm1",label:"✦ AI Prompt Enhance — Gemini rewrites prompt as artistic/narrative version"},
      {id:"cm2",label:"Three output tabs — Original (green) / Expert JSON (purple) / AI Enhanced (orange)"},
      {id:"cm3",label:"Expert JSON — Astronomerozge1 architecture: identity lock 0.99, semantic density gradient, structured negative arrays"},
      {id:"cm4",label:"Copy Orig. Prompt · Copy Expert JSON · Copy Enhanced Prompt — each switches to its tab"},
      {id:"cm5",label:"Auto-enhance after Google Sign-In — no second click needed"},
      {id:"cm6",label:"🌐 EN toggle — force English UI, disable Chrome auto-translate"},
      {id:"cm7",label:"Visual sprite selectors — all options shown as thumbnail previews"},
      {id:"cm8",label:"Live prompt preview — updates in real time as you configure"},
      {id:"cm9",label:"App Map — interactive feature overview with navigation"},
    ]},
    {id:"gens",label:"Free Generators (18)",color:"#f472b6",children:[
      {id:"g1",label:"⊕ Arena.ai (default) · ✦ Grok Imagine · ◈ ChatGPT Images · ◇ Gemini · ◉ Meta AI"},
      {id:"g2",label:"▸ FreeGen · ◆ DiGen · ▢ Playground · ⚡ FLUX.1-dev · ◐ Qwen Image"},
      {id:"g3",label:"▣ Bing Create · ✏ Craiyon · ◫ ImgsOAI · ☺ JoyFun · ▲ Leonardo.ai"},
      {id:"g4",label:"✦ Mage.space · 🤗 HF Spaces · ♡ Heartsync"},
      {id:"g5",label:"All free (with limits) · Third-party · No guarantee of availability"},
    ]},
    {id:"univ",label:"Scene Universe",color:"#facc15",page:"universe",children:[
      {id:"uvi",label:"Scene Idea Input",color:"#facc15",children:[
        {id:"uvi1",label:"Free-text idea — describe any subject, scene, or concept"},
        {id:"uvi2",label:"Quick Ideas Gallery — 23 preset scenes as inline pill buttons (SF, fantasy, racing, nature, anime, cyberpunk, retrofuture, cosmic battle…)"},
        {id:"uvi3",label:"Click any idea → loads text + style + mood + composition"},
      ]},
      {id:"uvs",label:"Visual Controls",color:"#facc15",children:[
        {id:"uvs1",label:"6 art styles via Universe sprites — Photorealism, Anime, 3D, Vector, Pixel, Oil"},
        {id:"uvs2",label:"6 moods — Serene, Mysterious, Dramatic, Energetic, Ominous, Joyful"},
        {id:"uvs3",label:"5 compositions — Emergence, Portrait, Action, Panoramic, Close-Up"},
      ]},
      {id:"uvt",label:"Cinematic Settings (shared sprites)",color:"#facc15",children:[
        {id:"uvt1",label:"14 lighting · 18 environments · 16 lenses — thumbnail sprite selectors"},
        {id:"uvt2",label:"8 film stocks · 8 color grades · 5 aspect ratios — thumbnail sprite selectors"},
        {id:"uvt3",label:"Conflict resolution — B&W disables grades, fisheye→1:1, anamorphic→2.39:1"},
      ]},
      {id:"uvo",label:"Output",color:"#facc15",children:[
        {id:"uvo1",label:"Live prompt preview — Original / Expert JSON / AI Enhanced tabs"},
        {id:"uvo2",label:"18 free generators — Arena.ai default, copies prompt on click"},
        {id:"uvo3",label:"Random — one click full configuration · Reset"},
      ]},
    ]},
  ]
};

// ─── UNIVERSE — FREE-FORM SCENE GENERATOR ──────────────────────────────────
const UNI_STYLE_PROMPTS={
  realism:"A photorealistic digital painting",
  anime:"A high quality anime illustration",
  "3d":"A professional 3D render (Unreal Engine 5)",
  "2d":"A clean vector art illustration",
  pixel:"A detailed pixel art scene",
  oil:"An oil painting in the style of classical masters depicting",
};
const UNI_MOODS={
  serene:{tone:"peaceful and contemplative",color:"soft pastel tones, gentle gradients"},
  mysterious:{tone:"enigmatic and intriguing",color:"deep purples and blues, hidden details"},
  dramatic:{tone:"tense and awe-inspiring",color:"high contrast, intense shadows and highlights"},
  energetic:{tone:"explosive and powerful",color:"vivid saturated hues, dynamic color splashes"},
  ominous:{tone:"foreboding and dark",color:"desaturated palette with cold red accents"},
  joyful:{tone:"uplifting and bright",color:"warm golden tones, vibrant pops of color"},
};
const UNI_COMPOSITIONS={
  emergence:{label:"Emergence",desc:"Subject emerges from or breaks through a boundary — digital interface, portal, mirror, screen. Partial dissolution into particles, fragments, or energy. Dramatic scale contrast."},
  portrait:{label:"Portrait",desc:"Subject as focal point, direct or near-direct gaze, shallow depth of field. Inner luminescence, ethereal energy wisps. Background softly blurred, intimate framing."},
  action:{label:"Action",desc:"Subject captured mid-motion — leaping, breaking through, releasing energy. Shards, sparks, halos of light exploding outward. Emergency lighting, dynamic composition."},
  panoramic:{label:"Panoramic",desc:"Wide establishing shot. Subject small in a vast environment. Emphasis on scale, atmosphere, and world-building. Deep focus, layered depth planes."},
  closeup:{label:"Close-Up",desc:"Extreme detail focus — textures, materials, surface imperfections. Macro-level intimacy. Background fully dissolved into bokeh. Every pore, fiber, scale visible."},
};
const UNI_GALLERY=[
  {title:"Furry Frog Meadow",idea:"a tiny bright-green tree frog covered in soft white fur, sitting on a pink clover flower in a dreamy meadow full of floating dandelion seeds, morning dew drops on every petal",style:"realism",mood:"joyful",comp:"closeup"},
  {title:"Le Mans Midnight",idea:"a 1966 Ford GT40 in Gulf livery blasting through a rain-soaked Le Mans straight at midnight, headlights cutting fog, tyre spray catching neon pit-lane glow, rival Ferraris visible in mirrors",style:"realism",mood:"energetic",comp:"action"},
  {title:"Space Cathedral",idea:"a colossal derelict cathedral drifting through a nebula, stained-glass windows still glowing from unknown internal light, asteroid debris orbiting slowly around flying buttresses",style:"realism",mood:"mysterious",comp:"panoramic"},
  {title:"Dragon vs. Mech",idea:"a scarred mountain dragon locked in combat with a humanoid battle mech, both mid-air above a burning medieval city, molten breath meeting plasma shield",style:"anime",mood:"energetic",comp:"action"},
  {title:"Concorde Sunrise",idea:"a Concorde supersonic jet climbing through the stratosphere at Mach 2, shock diamonds visible behind engines, curvature of Earth below, thin blue atmosphere line, sun rising behind the delta wing",style:"realism",mood:"dramatic",comp:"panoramic"},
  {title:"Samurai Tea Garden",idea:"an old samurai in worn armor kneeling for tea ceremony in a moonlit zen garden, cherry blossoms falling, katana resting on a stone, steam rising from a ceramic cup",style:"oil",mood:"serene",comp:"portrait"},
  {title:"Cyberpunk Market",idea:"a crowded underground night market in a cyberpunk mega-city, stacked neon food stalls three levels high, holographic fish swimming above vendor carts, rain dripping through grated ceiling",style:"realism",mood:"energetic",comp:"panoramic"},
  {title:"Steampunk Airship",idea:"a massive Victorian steampunk airship emerging from storm clouds above London, brass propellers spinning, lightning arcing between copper antenna arrays, tiny crew visible on observation deck",style:"realism",mood:"dramatic",comp:"emergence"},
  {title:"Arctic Fox Kit",idea:"a fluffy white arctic fox kit peeking out from a snow den, aurora borealis reflecting in its dark eyes, snowflakes caught mid-fall, breath visible in freezing air",style:"realism",mood:"serene",comp:"portrait"},
  {title:"F1 Monaco Chaos",idea:"a Formula 1 car drifting sideways through the Monaco tunnel exit into blinding daylight, sparks showering from titanium skid plate, yacht-filled harbor visible ahead, helicopter shadow on tarmac",style:"realism",mood:"energetic",comp:"action"},
  {title:"Wizard's Study",idea:"an ancient wizard asleep at a desk piled with scrolls, a sentient quill still writing by itself, potion bottles bubbling, an owl perched on a floating astrolabe, moonlight through a circular window",style:"oil",mood:"mysterious",comp:"portrait"},
  {title:"Pixel Dungeon",idea:"a retro 16-bit dungeon crawler scene, a knight facing a treasure chest in a torch-lit stone chamber, slimes in the shadows, health bar and inventory UI at screen edges",style:"pixel",mood:"mysterious",comp:"panoramic"},
  {title:"Retrofuture Samurai Duel",idea:"two young women warriors locked in a tense sword combat stance, blonde in iridescent silver liquid-metal samurai armor, brunette in mirrored chrome tactical suit, both wielding gleaming katanas under neon holographic cherry blossoms, 1960s retrofuturistic Japanese bunker with glowing circuit-board walls, electric arcs between their blades",style:"anime",mood:"dramatic",comp:"action"},
  {title:"Cosmic Fleet Battle",idea:"three enormous alien warships locked in brutal combat above a burning planet, plasma cannons unleashing torrents of energy, capital ships disintegrating into expanding debris clouds, smaller fighters weaving through explosions like fireflies, cosmic dust and radiation halos illuminating the chaos, Earth-like world glowing in background inferno",style:"realism",mood:"dramatic",comp:"panoramic"},
  {title:"Fruit Consumption Moment",idea:"a striking woman in haute couture captured mid-bite of an enormous, impossibly juicy oversized tropical fruit dripping with golden nectar, pleasure and intensity in her expression, exotic fruit flesh glistening with juice spray suspended mid-air, opulent marble gallery setting with dramatic spotlight illumination, sensory intensity and luxury condensed into single moment",style:"realism",mood:"energetic",comp:"closeup"},
  {title:"Ogre Unicorn Rider",idea:"a massive green ogre with scarred tusks gripping the mane of a shimmering iridescent unicorn, both charging through a crystalline enchanted forest, the unicorn's horn blazing with arcane light, flowers exploding into sparks as they gallop, ogre wielding a club carved from ancient bone, magic swirling around hooves and crown",style:"3d",mood:"energetic",comp:"action"},
  {title:"Bioluminescent Deep Sea",idea:"a fearless diver in futuristic pressure suit descending into the abyss surrounded by colossal translucent jellyfish the size of buildings, their tentacles glowing with alien bioluminescence, deep-sea creatures with impossible anatomies drifting past, pressure-resistant submersible visible above with searchlight beaming down, darkness punctuated by floating organisms",style:"realism",mood:"mysterious",comp:"panoramic"},
  {title:"Volcanic Fortress Siege",idea:"an apocalyptic battle raging at the gates of a massive obsidian fortress built inside an active volcano, lava flows cascading down black cliffs, siege weapons launching incendiary projectiles, armies clashing in slow-motion silhouettes against magma glow, fortress gates glowing red-hot from within, ash storms and fire tornadoes framing the carnage",style:"realism",mood:"ominous",comp:"panoramic"},
  {title:"Ethereal Library Collapse",idea:"an infinite library of floating crystalline books mid-collapse, shelves disintegrating into pure light, ancient knowledge cascading through reality like luminous waterfalls, a hooded figure suspended in center of the chaos reaching toward vanishing tomes, reality fracturing into geometric shards, archival magic exploding outward in all directions",style:"3d",mood:"mysterious",comp:"emergence"},
  {title:"Desert Dune Racer Crash",idea:"a sleek cyberpunk sand-skiff launching off an impossibly high dune at sunset, pilot visible in cockpit mid-stunt, desert floor far below spinning with crystalline sand particles catching golden light, vehicle trailing neon wake through thin atmosphere, mountains glowing like embers on horizon, adrenaline and danger frozen in frame",style:"realism",mood:"energetic",comp:"action"},
  {title:"Void Creature Emergence",idea:"a massive incomprehensible entity materializing through a dimensional tear in space, its form shifting between states of matter, tentacles of dark matter writhing, eyes of distant nebulae studying Earth, reality warping visibly around its presence, military observers in hazmat suits frozen in terror, fabric of spacetime tearing open",style:"anime",mood:"ominous",comp:"emergence"},
  {title:"Aurora Duelist Clash",idea:"two master swordsmen locked in explosive combat beneath the northern lights, blades creating waves of frozen energy with each clash, aurora reflecting off ice-armor, duelists performing impossible acrobatic moves against star-filled sky, frozen landscape of icebergs and glaciers framing mortal combat, magic-infused strikes leaving trails of green and purple light",style:"anime",mood:"dramatic",comp:"action"},
  {title:"Interdimensional Rift",idea:"a massive swirling vortex tearing through a city street, pulling buildings and vehicles into alternate reality, silhouettes of impossible geometries visible within the portal, bystanders caught in the pull, energy arcs and gravitational distortion visible, multiple versions of the same location flickering in and out of existence simultaneously",style:"realism",mood:"ominous",comp:"emergence"},
];

function buildUniversePrompt({idea,uStyle,uMood,uComp,light,bg,lens,filmStock,colorGrade,aspectRatio}){
  const parts=[];
  const prefix=UNI_STYLE_PROMPTS[uStyle]||UNI_STYLE_PROMPTS.realism;
  const mood=UNI_MOODS[uMood]||UNI_MOODS.mysterious;
  const comp=UNI_COMPOSITIONS[uComp]||UNI_COMPOSITIONS.emergence;
  const subj=idea.trim()||"a mysterious figure in an unknown world";
  parts.push(`${prefix} of ${subj}.`);
  parts.push(`Composition style: ${comp.desc}`);
  parts.push(`Mood: ${mood.tone}. Color palette: ${mood.color}.`);
  const tech=[];
  if(bg){const b=BACKGROUNDS.find(x=>x.id===bg);if(b)tech.push(b.p);}
  if(light){const l=LIGHTING.find(x=>x.id===light);if(l)tech.push(l.p);}
  if(lens){const l=LENSES.find(x=>x.mm===lens);if(l)tech.push(l.p);}
  if(filmStock){const f=FILM_STOCKS.find(x=>x.id===filmStock);if(f)tech.push(f.p);}
  if(colorGrade){const c=COLOR_GRADES.find(x=>x.id===colorGrade);if(c)tech.push(c.p);}
  if(tech.length)parts.push(tech.join(". ")+".");
  if(aspectRatio)parts.push(`Output aspect ratio: ${aspectRatio}.`);
  const suffixes={realism:"hyper-detailed, 8k resolution, ray tracing, subsurface scattering",anime:"clean line art, vivid colors, professional anime production quality","3d":"octane render, global illumination, PBR materials, cinematic depth of field","2d":"clean shapes, professional vector quality, balanced composition",pixel:"clean pixel grid, limited palette, retro aesthetic, detailed sprite work",oil:"visible brushwork, impasto technique, museum quality, rich pigments"};
  parts.push(suffixes[uStyle]||suffixes.realism);
  parts.push(QUALITY_BLOCK);
  return parts.join("\n\n");
}

function UniversePage(){
  const[idea,setIdea]=useState("");
  const[uStyle,setUStyle]=useState("realism");
  const[uMood,setUMood]=useState("mysterious");
  const[uComp,setUComp]=useState("emergence");
  const[light,setLight]=useState(null);
  const[bg,setBg]=useState(null);
  const[lens,setLens]=useState(null);
  const[filmStock,setFilmStock]=useState(null);
  const[colorGrade,setColorGrade]=useState(null);
  const[aspectRatio,setAspectRatio]=useState("16:9");
  const[custom,setCustom]=useState("");
  const[toast,setToast]=useState("");
  const doToast=m=>{setToast(m);setTimeout(()=>setToast(""),2500)};
  const tog1=(setter,id)=>setter(p=>p===id?null:id);
  const conflictAR_fisheye=lens==="8mm";
  const conflictAR_anamorphic=filmStock==="anamorphic";
  const conflictAspectRatio=conflictAR_fisheye||conflictAR_anamorphic;
  const effectiveAR=conflictAR_fisheye?"1:1":conflictAR_anamorphic?"2.39:1":aspectRatio;
  const conflictColorGrade=filmStock==="ilford";
  const prompt=idea.trim()?buildUniversePrompt({idea,uStyle,uMood,uComp,light,bg,lens,filmStock,colorGrade:conflictColorGrade?null:colorGrade,aspectRatio:effectiveAR}):"";
  const hasAny=!!prompt;
  const uniEJ=hasAny?buildExpertJSON({
    taskType:`scene_universe_${uStyle}_${uComp}`,
    inputMode:"text_to_image",
    originalPrompt:prompt+(custom.trim()?"\n\n"+custom.trim():""),
    subject:idea.trim(),
    lighting:light,environment:bg,lens,filmStock,
    colorGrade:conflictColorGrade?null:colorGrade,
    aspectRatio:effectiveAR,
    style:{id:uStyle,name:UNIVERSE_SPRITES.find(s=>s.id===uStyle)?.name||uStyle},
    mood:UNI_MOODS[uMood]||null,
    composition:UNI_COMPOSITIONS[uComp]||null,
    custom:custom.trim()||null
  }):null;
  const RAND_STYLES=["realism","anime","3d","pixel","oil"];
  const loadGallery=(g)=>{setIdea(g.idea);setUStyle(RAND_STYLES[~~(Math.random()*RAND_STYLES.length)]);setUMood(Object.keys(UNI_MOODS)[~~(Math.random()*6)]);setUComp(Object.keys(UNI_COMPOSITIONS)[~~(Math.random()*5)]);window.scrollTo({top:0,behavior:"smooth"});};
  const randomize=()=>{
    setUStyle(["realism","anime","3d","2d","pixel","oil"][~~(Math.random()*6)]);
    setUMood(Object.keys(UNI_MOODS)[~~(Math.random()*6)]);
    setUComp(Object.keys(UNI_COMPOSITIONS)[~~(Math.random()*5)]);
    setLight(LIGHT_SPRITES[~~(Math.random()*LIGHT_SPRITES.length)].id);
    setBg(ENV_SPRITES[~~(Math.random()*ENV_SPRITES.length)].id);
    setLens(LENS_SPRITES[~~(Math.random()*LENS_SPRITES.length)].mm);
    setFilmStock(FILM_SPRITES[~~(Math.random()*FILM_SPRITES.length)].id);
    setColorGrade(COLOR_SPRITES[~~(Math.random()*COLOR_SPRITES.length)].id);
    setAspectRatio(["16:9","2.39:1","4:3","1:1","9:16"][~~(Math.random()*5)]);
    if(!idea.trim()){const g=UNI_GALLERY[~~(Math.random()*UNI_GALLERY.length)];setIdea(g.idea);}
    doToast("RANDOM CONFIGURATION");
  };
  const reset=()=>{setIdea("");setUStyle("realism");setUMood("mysterious");setUComp("emergence");setLight(null);setBg(null);setLens(null);setFilmStock(null);setColorGrade(null);setAspectRatio("16:9");setCustom("");doToast("RESET");};

  return(
    <div className="page">
      <div className="ph">
        <div className="pt">Scene <b>Universe</b></div>
        <div className="ps">Free-form scene generator with full cinematic control. Describe any idea — the app adds lighting, lens, film stock, environment, and composition automatically.</div>
        <div style={{marginTop:8,textAlign:"center"}}><HowLink section="standalone tools"/></div>
      </div>

      {/* ── Idea input ── */}
      <div className="scene-field" style={{marginBottom:24}}>
        <div className="sh"><span className="st">Your Scene Idea</span><span className="sb">REQUIRED</span></div>
        <textarea rows={3} value={idea} onChange={e=>setIdea(e.target.value)} placeholder="e.g. 'A mystical wolf emerging from a smartphone screen' or 'A cyberpunk samurai overlooking Tokyo at night'" style={{fontSize:14}}/>
        <div className="scene-hint">Describe a subject and action. Everything else — lighting, lens, atmosphere — is configured below with visual selectors.</div>
        {/* Inline scene ideas */}
        <div style={{marginTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
          {UNI_GALLERY.map((g,i)=>(
            <button key={i} onClick={()=>loadGallery(g)}
              style={{fontSize:11,fontWeight:600,padding:"6px 14px",borderRadius:20,
                border:"1px solid var(--bd)",background:"var(--s1)",color:"var(--t)",
                cursor:"pointer",transition:"all .15s",display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>
              <span style={{color:"var(--acc)"}}>✦</span>{g.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Art Style (UNIVERSE_SPRITES) ── */}
      <div className="sec">
        <div className="sh"><span className="st">Art Style / Universe</span></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {UNIVERSE_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>setUStyle(r.id)}
              style={{cursor:"pointer",borderRadius:8,overflow:"hidden",
                border:"2px solid "+(uStyle===r.id?"#e8780a":"var(--bd)"),
                boxShadow:uStyle===r.id?"0 0 14px rgba(232,120,10,.4)":"none",
                transition:"all .15s",width:100}}>
              <div style={{width:100,height:98,backgroundImage:"url(/universe.png)",backgroundSize:"600px 98px",backgroundPosition:r.sx+"px 0px",backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,color:uStyle===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mood + Composition ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        <div className="av-sec">
          <div className="sh" style={{marginBottom:12}}><span className="st">Mood</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {Object.entries(UNI_MOODS).map(([k])=><button key={k} className={`ob${uMood===k?" sel":""}`} onClick={()=>setUMood(k)} style={{textTransform:"capitalize"}}>{k}</button>)}
          </div>
        </div>
        <div className="av-sec">
          <div className="sh" style={{marginBottom:12}}><span className="st">Composition</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {Object.entries(UNI_COMPOSITIONS).map(([k,v])=><button key={k} className={`ob${uComp===k?" sel":""}`} onClick={()=>setUComp(k)} title={v.desc}>{v.label}</button>)}
          </div>
        </div>
      </div>

      {/* ── Lighting ── */}
      <div className="sec">
        <div className="sh"><span className="st">Lighting & Atmosphere</span>{light&&<span className="sb">ACTIVE</span>}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LIGHT_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>tog1(setLight,r.id)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:"2px solid "+(light===r.id?"#e8780a":"var(--bd)"),boxShadow:light===r.id?"0 0 14px rgba(232,120,10,.4)":"none",transition:"all .15s",width:150}}>
              <div style={{width:150,height:105,backgroundImage:"url(/lighting.png)",backgroundSize:"750px 315px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,color:light===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"/>

      {/* ── Environment ── */}
      <div className="sec">
        <div className="sh"><span className="st">Environment / Background</span>{bg&&<span className="sb">ACTIVE</span>}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {ENV_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>tog1(setBg,r.id)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:"2px solid "+(bg===r.id?"#e8780a":"var(--bd)"),boxShadow:bg===r.id?"0 0 14px rgba(232,120,10,.4)":"none",transition:"all .15s",width:133}}>
              <div style={{width:133,height:112,backgroundImage:"url(/environment.png)",backgroundSize:"798px 336px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,color:bg===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"/>

      {/* ── Lens ── */}
      <div className="sec">
        <div className="sh"><span className="st">Lens / Focal Length</span>{lens&&<span className="sb">ACTIVE</span>}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {LENS_SPRITES.map(r=>(
            <div key={r.mm} onClick={()=>tog1(setLens,r.mm)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:"2px solid "+(lens===r.mm?"#e8780a":"var(--bd)"),boxShadow:lens===r.mm?"0 0 14px rgba(232,120,10,.4)":"none",transition:"all .15s",width:150}}>
              <div style={{width:150,height:83,backgroundImage:"url(/lens.png)",backgroundSize:"600px 332px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
              <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,color:lens===r.mm?"#e8780a":"var(--t)"}}><span translate="no">{r.mm}</span></div>
            </div>
          ))}
        </div>
        {conflictAR_fisheye&&<div style={{marginTop:10,fontSize:11,color:"var(--acc)",lineHeight:1.6}}>⚠ Fisheye lens forces 1:1 aspect ratio — circular projection</div>}
      </div>
      <div className="divider"/>

      {/* ── Film Stock & Color Grade ── */}
      <div className="sec">
        <div className="sh"><span className="st">Film Stock & Color Grade</span></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--t)",marginBottom:10}}>Film Stock</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {FILM_SPRITES.map(r=>(
                <div key={r.id} onClick={()=>tog1(setFilmStock,r.id)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:"2px solid "+(filmStock===r.id?"#e8780a":"var(--bd)"),boxShadow:filmStock===r.id?"0 0 14px rgba(232,120,10,.4)":"none",transition:"all .15s",width:150}}>
                  <div style={{width:150,height:167,backgroundImage:"url(/film.png)",backgroundSize:"600px 334px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
                  <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,color:filmStock===r.id?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
                </div>
              ))}
            </div>
            {conflictAR_anamorphic&&<div style={{marginTop:10,fontSize:11,color:"var(--acc)",lineHeight:1.6}}>⚠ Anamorphic forces 2.39:1 widescreen aspect ratio</div>}
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:conflictColorGrade?"var(--t4)":"var(--t)",marginBottom:10}}>Color Grade{conflictColorGrade?" — disabled by B&W film":""}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",opacity:conflictColorGrade?.25:1,pointerEvents:conflictColorGrade?"none":"auto"}}>
              {COLOR_SPRITES.map(r=>(
                <div key={r.id} onClick={()=>tog1(setColorGrade,r.id)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:"2px solid "+(colorGrade===r.id&&!conflictColorGrade?"#e8780a":"var(--bd)"),boxShadow:colorGrade===r.id&&!conflictColorGrade?"0 0 14px rgba(232,120,10,.4)":"none",transition:"all .15s",width:150}}>
                  <div style={{width:150,height:167,backgroundImage:"url(/color.png)",backgroundSize:"600px 334px",backgroundPosition:r.sx+"px "+r.sy+"px",backgroundRepeat:"no-repeat"}}/>
                  <div style={{padding:"5px 4px 6px",textAlign:"center",fontSize:11,fontWeight:600,color:colorGrade===r.id&&!conflictColorGrade?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="divider"/>

      {/* ── Aspect Ratio ── */}
      <div className="sec">
        <div className="sh"><span className="st">Aspect Ratio</span>{conflictAspectRatio&&<span className="sb">LOCKED BY LENS/FILM</span>}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",opacity:conflictAspectRatio?.4:1,pointerEvents:conflictAspectRatio?"none":"auto"}}>
          {FORMAT_SPRITES.map(r=>(
            <div key={r.id} onClick={()=>setAspectRatio(r.id)} style={{cursor:"pointer",borderRadius:8,overflow:"hidden",border:"2px solid "+((conflictAspectRatio?effectiveAR===r.id:aspectRatio===r.id)?"#e8780a":"var(--bd)"),boxShadow:(conflictAspectRatio?effectiveAR===r.id:aspectRatio===r.id)?"0 0 14px rgba(232,120,10,.4)":"none",transition:"all .15s",width:r.fw,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:10,background:"var(--s1)",gap:6}}>
              <div style={{width:80,height:80,flexShrink:0,backgroundImage:"url(/format.png)",backgroundSize:"400px 80px",backgroundPosition:r.sx+"px 0px",backgroundRepeat:"no-repeat"}}/>
              <div style={{paddingBottom:6,textAlign:"center",fontSize:11,fontWeight:600,color:(conflictAspectRatio?effectiveAR===r.id:aspectRatio===r.id)?"#e8780a":"var(--t)"}}><span translate="no">{r.name}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"/>

      {/* ── Custom additions ── */}
      <div className="scene-field">
        <div className="sh"><span className="st">Custom Additions</span><span className="sb" translate="no">OPTIONAL</span></div>
        <textarea rows={2} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Additional notes, negative prompts, extra atmosphere details..."/>
      </div>

      {/* ── Output ── */}
      <div className="sec">
        <div className="sh"><span className="st">Scene Prompt</span>{hasAny&&<span className="sb" translate="no">LIVE</span>}</div>
        <PromptOutputPanel prompt={hasAny?(prompt+(custom.trim()?"\n\n"+custom.trim():"")):prompt} custom={custom} hasAny={hasAny} onToast={doToast}
          expertJSON={uniEJ}
          extraButtons={<><button className="btn" onClick={reset}>Reset</button><button className="btn" onClick={randomize}>Random</button></>}/>
        {hasAny&&<GenWithLinks getPrompt={()=>prompt+(custom.trim()?"\n\n"+custom.trim():"")} onCopy={()=>doToast("SCENE PROMPT COPIED")}/>}
      </div>

      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

function MapPage(){
  const setPage=React.useContext(PageCtx);
  const[hovered,setHovered]=useState(null);
  const[expanded,setExpanded]=useState(new Set(["root","char","multi","video","pet","univ","common","gens"]));

  function countLeaves(node){
    if(!node.children||!node.children.length)return 1;
    return node.children.filter(c=>expanded.has(c.id)).reduce((s,c)=>s+countLeaves(c),0)||1;
  }
  function assignPos(node,depth,yStart,xBase){
    const xGap=[220,190,180,170];
    node._x=xBase+(xGap[depth]||160);
    node._depth=depth;
    const isExp=expanded.has(node.id);
    if(!node.children||!node.children.length||!isExp){
      node._y=yStart+24;
      node._h=48;
      return yStart+48;
    }
    let y=yStart+8;
    node.children.forEach(child=>{y=assignPos(child,depth+1,y,node._x);});
    node._y=(node.children[0]._y+node.children[node.children.length-1]._y)/2;
    node._h=y-yStart;
    return y+8;
  }
  function flatten(node,out=[]){
    out.push(node);
    if(node.children&&expanded.has(node.id))node.children.forEach(c=>flatten(c,out));
    return out;
  }
  function getEdges(node,out=[]){
    if(node.children&&expanded.has(node.id)){
      node.children.forEach(c=>{out.push({from:node,to:c,color:node.color||"rgba(255,255,255,.3)"});getEdges(c,out);});
    }
    return out;
  }
  const toggle=(id)=>setExpanded(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});

  const dataClone=JSON.parse(JSON.stringify(MAP_DATA));
  const totalH=assignPos(dataClone,0,20,0)+40;
  const nodes=flatten(dataClone);
  const edgeList=getEdges(dataClone);
  const maxX=Math.max(...nodes.map(n=>n._x))+280;

  return(
    <div className="page">
      <div className="ph">
        <div className="pt">App <b>Map</b></div>
        <div className="ps">PrompTo miniStudio — full feature overview · click nodes to navigate · click branches to expand/collapse</div>
      </div>
      <div style={{overflowX:"auto",overflowY:"auto",borderRadius:12,border:"1px solid var(--bd)",background:"var(--s1)",padding:"20px 0"}}>
        <svg width={maxX} height={totalH} style={{fontFamily:"var(--font)",display:"block"}}>
          {edgeList.map((e,i)=>{
            const mx=(e.from._x+e.to._x)/2;
            return(
              <path key={i}
                d={`M${e.from._x+4},${e.from._y} C${mx},${e.from._y} ${mx},${e.to._y} ${e.to._x-4},${e.to._y}`}
                fill="none" stroke={e.color} strokeWidth={e.from._depth===0?2:e.from._depth===1?1.5:1}
                strokeOpacity={e.from._depth===0?.8:e.from._depth===1?.6:.4}
              />
            );
          })}
          {nodes.map((n,i)=>{
            const isRoot=n._depth===0;
            const isL1=n._depth===1;
            const isL2=n._depth===2;
            const isLeaf=!n.children||n.children.length===0;
            const hasChildren=n.children&&n.children.length>0;
            const isExp=expanded.has(n.id);
            const col=n.color||(isLeaf?"rgba(255,255,255,.75)":"rgba(255,255,255,.9)");
            const isHov=hovered===n.id;
            const r=isRoot?7:isL1?5:isL2?4:3;
            const fs=isRoot?14:isL1?13:isL2?12:11;
            const fw=isRoot?"800":isL1?"700":isL2?"600":"400";
            return(
              <g key={i}
                style={{cursor:hasChildren||n.page?"pointer":"default"}}
                onMouseEnter={()=>setHovered(n.id)}
                onMouseLeave={()=>setHovered(null)}
                onClick={()=>hasChildren?toggle(n.id):n.page&&setPage(n.page)}
              >
                <circle cx={n._x} cy={n._y} r={isHov?r+2:r} fill={col} opacity={isLeaf?.6:1}/>
                {isRoot&&<circle cx={n._x} cy={n._y} r={12} fill="none" stroke={col} strokeWidth={1.5} strokeOpacity={.4}/>}
                {!isLeaf&&<text x={n._x+r+6} y={n._y+4} fontSize={fs} fontWeight={fw} fill={col} style={{userSelect:"none"}}>
                  {n.label}{hasChildren?<tspan style={{opacity:.5}}> {isExp?"▾":"▸"}</tspan>:null}
                </text>}
                {isLeaf&&<text x={n._x+r+6} y={n._y+4} fontSize={fs} fontWeight={fw} fill={col} style={{userSelect:"none"}}>
                  {n.label}
                </text>}
                {n.page&&isL1&&(
                  <text x={n._x+r+6} y={n._y+17} fontSize={9} fill={col} opacity={.5} style={{userSelect:"none"}}>tap to open →</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
const PageCtx = React.createContext(()=>{});

function useTranslation(){
  const[forceEN,setForceEN]=useState(()=>localStorage.getItem("pmstudio_lang")==="en");
  useEffect(()=>{
    const html=document.documentElement;
    if(forceEN){
      html.setAttribute("translate","no");
      html.classList.add("notranslate");
      localStorage.setItem("pmstudio_lang","en");
    } else {
      html.removeAttribute("translate");
      html.classList.remove("notranslate");
      localStorage.removeItem("pmstudio_lang");
    }
  },[forceEN]);
  return{forceEN,toggleEN:()=>setForceEN(v=>!v)};
}

export default function App(){
  const[page,setPage]=useState("avatars");
  const[scrolled,setScrolled]=useState(false);
  const auth=useGoogleAuth();
  const{forceEN,toggleEN}=useTranslation();
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>50);
    window.addEventListener('scroll',onScroll);
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);
  return(
    <AuthCtx.Provider value={auth}>
      <PageCtx.Provider value={setPage}>
      <style>{G}</style>
      <div className="shell">
        <nav className={`nav${scrolled?" scrolled":""}`} style={{flexDirection:"column",height:"auto",padding:"12px 28px 0",gap:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",paddingBottom:10}}>
            <div className="logo" style={{cursor:"pointer"}} onClick={()=>setPage("how")}>PrompTo <span>miniStudio</span></div>
            <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"flex-end"}}>
              {auth.user?(
                <button className="user-chip" onClick={auth.signOut} title="Sign out">
                  <img src={auth.user.picture} alt=""/>
                  <span>{auth.user.name.split(" ")[0]}</span>
                  <span style={{color:"var(--t)"}}>✕</span>
                </button>
              ):(
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:11,color:"var(--t)",opacity:.7,whiteSpace:"nowrap"}}>
                    Sign in to unlock <span style={{color:"var(--acc)",fontWeight:700}}>✦ AI Prompt Enhance</span>
                  </span>
                  <GoogleSignInBtn compact/>
                </div>
              )}
            </div>
          </div>
          <div className="ntabs" style={{position:"static",transform:"none",borderTop:"1px solid var(--bd)",paddingTop:2,paddingBottom:2,width:"100%",justifyContent:"center"}}>
            <button className={`nt${page==="how"?" on":""}`} onClick={()=>setPage("how")}>How it works</button>
            <button className={`nt${page==="avatars"?" on":""}`} onClick={()=>setPage("avatars")}>Character Sheet</button>
            <button className={`nt${page==="angles"?" on":""}`} onClick={()=>setPage("angles")} translate="no">Multi-Shot</button>
            <button className={`nt${page==="video"?" on":""}`} onClick={()=>setPage("video")}>Video</button>
            <button className={`nt${page==="pet"?" on":""}`} onClick={()=>setPage("pet")}>Pet Studio</button>
            <button className={`nt${page==="universe"?" on":""}`} onClick={()=>setPage("universe")}>Universe</button>
            <button className={`nt${page==="map"?" on":""}`} onClick={()=>setPage("map")}>Map</button>
            <button
              className="nt"
              onClick={toggleEN}
              title={forceEN?"Allow browser translation":"Force English — disable browser translation"}
              style={{
                display:"flex",alignItems:"center",gap:4,
                borderLeft:"1px solid var(--bd)",
                color:forceEN?"var(--acc)":"var(--t)",
                fontWeight:forceEN?700:500,
                opacity:forceEN?1:.6
              }}
            >
              🌐 {forceEN?"EN ✓":"EN"}
            </button>
          </div>
        </nav>
        {page==="how"?<HowItWorksPage/>:page==="angles"?<AnglesPage/>:page==="avatars"?<AvatarsPage/>:page==="pet"?<PetPage/>:page==="universe"?<UniversePage/>:page==="map"?<MapPage/>:<VideoPromptPage/>}
      </div>
      </PageCtx.Provider>
    </AuthCtx.Provider>
  );
}
