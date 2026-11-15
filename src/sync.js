// ---------- progress sync on any browser (Cloudflare Worker; used when the page isn't running inside Claude) ----------
const SYNC_URL_DEFAULT="https://avi-math-sync.mrnarang.workers.dev";// set after the Worker is deployed, e.g. "https://avi-math-sync.<name>.workers.dev"
function syncUrl(){try{return(localStorage.getItem("avlab:syncurl")||SYNC_URL_DEFAULT).replace(/\/+$/,"")}catch(e){return SYNC_URL_DEFAULT}}
let SYNC={mode:"local",last:null,err:null};
function remoteDb(base){
  const req=async(method,path,body)=>{const r=await fetch(base+path,{method,headers:body?{"Content-Type":"application/json"}:{},body:body?JSON.stringify(body):undefined,cache:"no-store"});
    if(r.status===409)return r.json();if(!r.ok)throw new Error("sync "+r.status);SYNC.last=Date.now();SYNC.err=null;return r.json()};
  return{collection:name=>({get:async()=>{const rows=await req("GET","/c/"+name);return{docs:rows.map(x=>({id:x.id,data:()=>x.data}))}}}),
    doc:path=>({set:async obj=>{const [c,id]=path.split("/");try{return await req("PUT","/d/"+c+"/"+encodeURIComponent(id),obj)}catch(e){SYNC.err=String(e.message||e);throw e}}})}}
// a state she hasn't touched yet (fresh browser) never replaces saved progress
function untouched(st){return!st||!st.rounds||(st.rounds.length===1&&!Object.values(st.rounds[0].items||{}).some(x=>x&&x.tries))}
async function pullProgress(){if(!db)return false;let changed=false;
  const snap=await db.collection("progress").get();const seen=new Set();
  snap.docs.forEach(d=>{const v=d.data();if(!v||!v.json)return;let st;try{st=JSON.parse(v.json)}catch(e){return}const id=v.id||d.id;if(!AM(id))return;st.id=id;seen.add(id);
    const loc=STORE[id];if(!loc||untouched(loc)&&!untouched(st)||(v.updatedAt||0)>(loc.updatedAt||0)){STORE[id]=st;lsSet("avlab2:"+storeKey(id),st);changed=true}});
  // push anything this browser has that's newer than what's saved
  for(const id in STORE){const st=STORE[id];if(untouched(st))continue;const rv=snap.docs.find(d=>(d.data()||{}).id===id||d.id===storeKey(id));const ru=rv?(rv.data().updatedAt||0):-1;
    if((st.updatedAt||0)>ru){try{await db.doc("progress/"+storeKey(id)).set({id,json:JSON.stringify(st),updatedAt:st.updatedAt,streak:st.streak,rounds:st.rounds.length,proficient:st.proficient})}catch(e){}}}
  return changed}
(async()=>{let cdb=null;try{cdb=await window.claude?.use?.("db")}catch(e){cdb=null}
  if(cdb){db=cdb;SYNC.mode="claude"}else if(syncUrl()){db=remoteDb(syncUrl());SYNC.mode="web"}else return;
  try{if(await pullProgress()){ITEMS={};S=STORE[CUR];render()}}catch(e){SYNC.err=String(e.message||e)}
  if(SYNC.mode==="web")document.addEventListener("visibilitychange",async()=>{if(document.visibilityState!=="visible")return;try{if(await pullProgress()){ITEMS={};S=STORE[CUR];flash={};render()}}catch(e){}});
})();
