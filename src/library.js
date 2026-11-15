// ===== Review library: weak spots, missed questions, test history, school results, cumulative review =====
const HISTORY=__HISTORY__;
const SITE="https://mjredo.github.io/avi-math/";
let SCHOOL=[];
const LIB_LESSONS=Object.keys(LESSON_SKILLS).filter(l=>LESSON_SKILLS[l].some(k=>G[k])).sort((a,b)=>{const [x1,y1]=a.split("-").map(Number),[x2,y2]=b.split("-").map(Number);return x1-x2||y1-y2});
const CUR_TOPIC=3; // the topic she is on now (update each new topic)
// dynamic assessments: single-skill drills and weak-spot rounds
function dynAssess(id){if(!id)return undefined;let a;
  if(id.startsWith("DRILL-")){const k=id.slice(6);if(!G[k])return undefined;a={id,topic:null,kind:"drill",name:"Practice: "+SK[k],lessons:[LESSON[k]],skills:[k],n:10,min:15}}
  else if(id.startsWith("WEAK-")){const sp=(STORE[id]&&STORE[id].rounds&&STORE[id].rounds[0].specs)||null;const ks=sp?[...new Set(sp.map(x=>x.gen))]:weakList().slice(0,5);const sk=ks.length?ks:["a2_eval","a4_explicit"];a={id,topic:null,kind:"drill",name:"Weak-spot round ("+new Date(+id.slice(5)||Date.now()).toLocaleDateString(undefined,{month:"short",day:"numeric"})+")",lessons:[...new Set(sk.map(k=>LESSON[k]))],skills:sk,n:10,min:15}}
  else return undefined;
  ASSESS.push(a);return a}
function loadDynLocal(){try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||!k.startsWith("avlab2:"))continue;const id=k.slice(7);if((id.startsWith("DRILL-")||id.startsWith("WEAK-"))&&AM(id)&&!STORE[id]){const v=lsGet(k);if(v)STORE[id]=v}}}catch(e){}}

// ---------- every result she has, as one list of events ----------
function labEvents(){const out=[];
  for(const id in STORE){const st=STORE[id],a=AM(id);if(!st||!st.rounds||!a)continue;
    st.rounds.forEach((R,ri)=>{let its=[];try{its=itemsFor(st,id,ri)}catch(e){}const when=new Date(R.finishedAt||st.updatedAt||Date.now()).toISOString().slice(0,10);
      its.forEach(it=>{const s=R.items[it.id];if(!s||!(s.status==="first"||s.status==="guided"))return;
        out.push({d:when,src:a.name+" · "+typeName(R,st),skill:it.skill,res:s.status==="first"?"first":"helped",q:plain(it.q),given:(s.wrong||[]).join(" · "),correct:plain(it.opts[it.ans]),lab:1})})})}
  return out}
function allEvents(){return HISTORY.events.concat(labEvents()).sort((a,b)=>a.d.localeCompare(b.d))}
function schoolFlags(){const f={};for(const s of SCHOOL)for(const l of (s.lessons||[]))(f[l]=f[l]||[]).push(s);return f}
function skillStats(){const ev=allEvents(),S2={};
  for(const e of ev){const x=S2[e.skill]||(S2[e.skill]={n:0,first:0,seq:[],lastD:"",lastMissD:""});x.n++;if(e.res==="first")x.first++;else x.lastMissD=e.d;x.seq.push(e.res);x.lastD=e.d}
  const sf=schoolFlags();
  for(const k in G){const x=S2[k]||(S2[k]={n:0,first:0,seq:[],lastD:"",lastMissD:""});const sch=(sf[LESSON[k]]||[]);x.school=sch;
    const last=x.seq[x.seq.length-1],recent=x.seq.slice(-3);
    x.status=!x.n&&!sch.length?"new":last&&last!=="first"?"weak":(x.n>=3&&x.first/x.n<0.6)?"weak":(recent.some(r=>r!=="first")||sch.length)?"watch":"solid"}
  return S2}
function weakList(){const S2=skillStats(),rank={weak:0,watch:1};return Object.keys(S2).filter(k=>G[k]&&(S2[k].status==="weak"||S2[k].status==="watch")).sort((a,b)=>rank[S2[a].status]-rank[S2[b].status]||(S2[b].lastMissD||"").localeCompare(S2[a].lastMissD||""))}

// ---------- test history ----------
function testRows(){const rows=HISTORY.tests.map(t=>({...t,kind:"past"}));
  for(const id in STORE){const st=STORE[id],a=AM(id);if(!st||!st.rounds||!a)continue;st.rounds.forEach((R,i)=>{if(!R.finishedAt)return;const x=roundStats(i,st,id);rows.push({d:new Date(R.finishedAt).toISOString().slice(0,10),name:a.name+" · "+typeName(R,st),score:x.first,total:x.n,missed:x.missed,kind:"lab",open:id})})}
  for(const s of SCHOOL)rows.push({d:s.date,name:`School ${s.type.toLowerCase()}: ${s.title}`,scoreText:s.score||"",missedLessons:s.lessons||[],kind:"school"});
  return rows.sort((a,b)=>b.d.localeCompare(a.d))}

// ---------- rendering ----------
const STL={weak:["working","Needs work"],watch:["guided","Watch"],solid:["first","Solid"],new:["new","Not practiced yet"]};
const fd=d=>{if(!d)return"—";const x=new Date(d+"T12:00:00");return x.toLocaleDateString(undefined,{month:"short",day:"numeric"})};
const escH=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
let REV_FILTER="weak";
function renderReview(){const S2=skillStats(),wl=weakList(),el=document.getElementById("review");
  const dyn=ASSESS.filter(a=>a.kind==="drill"&&STORE[a.id]).sort((a,b)=>(STORE[b.id].updatedAt||0)-(STORE[a.id].updatedAt||0)).slice(0,6);
  let h=`<div class="rtitle">Review library</div><p class="note">Everything she has done so far: the practice tests from Topics 1–3, the lab rounds, and her school results. It all goes into one weak-spot list, so a review targets the right skills.</p>`;
  // start a review
  h+=`<section class="topic"><div class="thead"><span class="tnum">Start a review</span></div><div class="arow">
    <button class="acard" data-weak="1"><span class="aname">Weak-spot round</span><span class="ales">10 questions on her ${Math.min(5,wl.length)||"top"} weakest skills</span><span class="st guided">${wl.length?wl.slice(0,5).map(k=>SK[k]).join(" · "):"No weak spots yet"}</span></button>
    <button class="acard" data-open="CUM-1-${CUR_TOPIC}"><span class="aname">Cumulative review: Topics 1–${CUR_TOPIC}</span><span class="ales">30 questions across every lesson so far, plus re-tests on weak spots</span><span class="st ${statusOf("CUM-1-"+CUR_TOPIC).cls}">${statusOf("CUM-1-"+CUR_TOPIC).txt}</span></button>
    <button class="acard" data-open="CUM-1-5"><span class="aname">Semester 1 review</span><span class="ales">Topics 1–5</span><span class="st ${statusOf("CUM-1-5").cls}">${statusOf("CUM-1-5").txt}</span></button>
    <button class="acard" data-open="CUM-1-11"><span class="aname">Year-end review</span><span class="ales">Topics 1–11, every lesson</span><span class="st ${statusOf("CUM-1-11").cls}">${statusOf("CUM-1-11").txt}</span></button>
    <div class="acard"><span class="aname">Other cumulative</span><span class="ales"><select id="cumThrough" class="in">${COURSE.filter(T=>T.t>=2).map(T=>`<option value="${T.t}"${T.t===CUR_TOPIC?" selected":""}>Topics 1–${T.t}</option>`).join("")}</select></span><button class="btn sm" data-cumgo="1">Open</button></div>
    ${dyn.map(a=>{const s=statusOf(a.id);return`<button class="acard" data-open="${a.id}"><span class="aname">${escH(a.name)}</span><span class="ales">${a.skills.map(k=>SK[k]).join(" · ")}</span><span class="st ${s.cls}">${s.txt}</span></button>`}).join("")}</div></section>`;
  // weak spots
  const keys=Object.keys(S2).filter(k=>G[k]&&(REV_FILTER==="all"||(REV_FILTER==="weak"?S2[k].status==="weak"||S2[k].status==="watch":true))).sort((a,b)=>LIB_LESSONS.indexOf(LESSON[a])-LIB_LESSONS.indexOf(LESSON[b])||SK[a].localeCompare(SK[b]));
  h+=`<section class="topic"><div class="thead"><span class="tnum">Skills</span><span class="tname">${wl.filter(k=>S2[k].status==="weak").length} need work · ${wl.filter(k=>S2[k].status==="watch").length} to watch</span></div>
    <div class="actions"><button class="btn ghost sm${REV_FILTER==="weak"?" on":""}" data-revf="weak">Weak and watch</button><button class="btn ghost sm${REV_FILTER==="all"?" on":""}" data-revf="all">All ${Object.keys(G).length} skills</button></div>
    <div class="tbl"><table><thead><tr><th>Lesson</th><th>Skill</th><th>First try</th><th>Last missed</th><th>School</th><th>Status</th><th></th></tr></thead><tbody>${keys.map(k=>{const x=S2[k],st=STL[x.status];
      return`<tr><td>${LESSON[k]}</td><td>${SK[k]}</td><td>${x.n?x.first+"/"+x.n:"—"}</td><td>${fd(x.lastMissD)}</td><td>${(x.school||[]).length?"⚠ "+x.school.map(s=>escH(s.title)).join(", "):"—"}</td><td class="st ${st[0]}">${st[1]}</td><td><button class="linkbtn" data-drill="${k}">Practice</button></td></tr>`}).join("")||`<tr><td colspan="7">No weak spots right now.</td></tr>`}</tbody></table></div></section>`;
  // school results
  h+=renderSchool();
  // missed questions
  const miss=allEvents().filter(e=>e.res!=="first"&&(e.q||e.given)).reverse().slice(0,40);
  h+=`<section class="topic"><div class="thead"><span class="tnum">Missed questions</span><span class="tname">The ${miss.length} most recent</span></div><p class="note">Questions she didn't get on the first try. “Fixed with steps” means she got there with the walkthrough.</p>
    <div class="tbl"><table><thead><tr><th>Date</th><th>Skill</th><th>Question</th><th>Her answer</th><th>Correct</th><th>Result</th></tr></thead><tbody>${miss.map(e=>`<tr><td>${fd(e.d)}</td><td>${SK[e.skill]||e.skill}<br><span class="note">${escH(e.src)}</span></td><td>${escH(e.q||"")}</td><td>${escH(e.given||"")}</td><td>${escH(e.correct||"")}</td><td class="st ${e.res==="helped"?"guided":"working"}">${e.res==="helped"?"Fixed with steps":"Missed"}</td></tr>`).join("")||`<tr><td colspan="6">Nothing missed yet.</td></tr>`}</tbody></table></div></section>`;
  // test history
  const rows=testRows();
  h+=`<section class="topic"><div class="thead"><span class="tnum">Test history</span><span class="tname">${rows.length} tests and rounds</span></div>
    <div class="tbl"><table><thead><tr><th>Date</th><th>Test</th><th>Score</th><th>Missed</th><th></th></tr></thead><tbody>${rows.map(t=>`<tr><td>${fd(t.d)}</td><td>${escH(t.name)}${t.note?`<br><span class="note">${escH(t.note)}</span>`:""}</td><td>${t.kind==="school"?escH(t.scoreText||"—"):t.score==null?"—":t.score+"/"+t.total}</td><td>${t.kind==="school"?(t.missedLessons.length?"Lessons "+t.missedLessons.join(", "):"—"):(t.missed||[]).map(k=>SK[k]||k).join(", ")||"—"}</td><td>${t.kind==="past"?`<a href="${SITE+t.link}" target="_blank" rel="noopener">Open</a> · <a href="${t.orig}" target="_blank" rel="noopener">Claude copy</a>`:t.kind==="lab"?`<button class="linkbtn" data-open="${t.open}">Open</button>`:""}</td></tr>`).join("")}</tbody></table></div></section>`;
  el.innerHTML=h}

// ---------- school results ----------
function schoolMode(){return SYNC.mode==="web"?"web":SYNC.mode==="claude"?"claude":"local"}
function renderSchool(){const mode=schoolMode();const today=todayISO();
  const lessonBoxes=COURSE.filter(T=>T.t<=4).map(T=>`<fieldset class="lset"><legend>Topic ${T.t}</legend>${T.lessons.map(l=>`<label class="lchk"><input type="checkbox" name="sl" value="${l[0]}">${l[0]}</label>`).join("")}</fieldset>`).join("");
  let h=`<section class="topic" id="schoolSec"><div class="thead"><span class="tnum">School results</span><span class="tname">${SCHOOL.length} uploaded</span></div>
    <p class="note">Add her graded quizzes and tests from school: take a photo or upload the PDF, and tick the lessons she missed questions on. Those lessons get extra practice in the weak-spot rounds and the cumulative review.${mode==="claude"?" <b>Photos and PDFs can only be uploaded on the website</b> (<a href=\"https://mjredo.github.io/avi-math/\" target=\"_blank\" rel=\"noopener\">mjredo.github.io/avi-math</a>). Here you can still save the score and lessons.":mode==="local"?" Online sync isn't working right now, so uploads are turned off.":""}</p>
    <details class="addschool"><summary class="btn ghost sm">+ Add a school result</summary><form id="schoolForm" class="sform">
      <label>Date <input class="in" type="date" name="date" value="${today}" required></label>
      <label>Type <select class="in" name="type"><option>Quiz</option><option>Test</option><option>Unit test</option><option>Classwork</option><option>Homework</option></select></label>
      <label class="wide">Title <input class="in" name="title" placeholder="e.g. Topic 3 Quiz (3-1 to 3-6)" required></label>
      <label>Score <input class="in" name="score" placeholder="e.g. 18/20 or 90%"></label>
      <div class="wide"><span class="flab">Lessons she missed questions on</span><div class="lsets">${lessonBoxes}</div></div>
      <label class="wide">Notes: which questions, and what went wrong <textarea class="in" name="notes" rows="3" placeholder="e.g. #7 and #12: domain of a graph, used ≤ instead of <"></textarea></label>
      ${mode!=="claude"?`<label class="wide">Photos or PDF of the graded paper <input type="file" name="files" accept="image/*,application/pdf" multiple ${mode==="local"?"disabled":""}></label>`:""}
      <div class="wide actions"><button class="btn" type="submit" ${mode==="local"?"disabled":""}>Save result</button><span id="smsg" class="note"></span></div></form></details>`;
  const list=SCHOOL.slice().sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  h+=`<div class="slist">${list.map(s=>`<div class="scard"><div class="shead"><b>${escH(s.title)}</b><span class="pill">${escH(s.type)}</span><span>${fd(s.date)}</span>${s.score?`<span class="sscore">${escH(s.score)}</span>`:""}</div>
    ${(s.lessons||[]).length?`<div class="note">Missed questions in: ${s.lessons.map(l=>`<b>${l}</b> ${escH(lessonTitle(l))}`).join(" · ")}</div>`:""}${s.notes?`<p class="snotes">${escH(s.notes)}</p>`:""}
    <div class="sfiles">${(s.files||[]).map(f=>{const u=syncUrl()+"/f/"+encodeURIComponent(f.fid);return f.type&&f.type.startsWith("image/")?`<a href="${u}" target="_blank" rel="noopener"><img src="${u}" alt="${escH(f.name)}" loading="lazy"></a>`:`<a class="fpdf" href="${u}" target="_blank" rel="noopener">📄 ${escH(f.name)}</a>`}).join("")}</div>
    <div class="actions"><button class="linkbtn" data-sdel="${escH(s.id)}">Remove</button></div></div>`).join("")}</div></section>`;
  return h}
async function shrinkImage(file){try{const bmp=await createImageBitmap(file);const m=1800,sc=Math.min(1,m/Math.max(bmp.width,bmp.height));const c=document.createElement("canvas");c.width=Math.round(bmp.width*sc);c.height=Math.round(bmp.height*sc);c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
  return await new Promise(res=>c.toBlob(b=>res(b),"image/jpeg",0.82))}catch(e){return file}}
async function loadSchool(){try{if(!db)return;const snap=await db.collection("school").get();SCHOOL=snap.docs.map(d=>d.data()).filter(x=>x&&!x.deleted)}catch(e){}}
async function saveSchool(form){const msg=document.getElementById("smsg");const fdta=new FormData(form);const id="s"+Date.now();
  const meta={id,date:fdta.get("date"),type:fdta.get("type"),title:String(fdta.get("title")||"").trim(),score:String(fdta.get("score")||"").trim(),lessons:fdta.getAll("sl"),notes:String(fdta.get("notes")||"").trim(),files:[],addedAt:new Date().toISOString()};
  if(!meta.title){msg.textContent="Add a title first.";return}
  const files=[...(form.querySelector('input[type=file]')?.files||[])];
  try{if(schoolMode()==="web"){let i=0;for(const f of files){i++;msg.textContent=`Uploading file ${i} of ${files.length}…`;
      let blob=f;if(f.type.startsWith("image/")&&f.size>600000)blob=await shrinkImage(f);if(blob.size>9_500_000){msg.textContent=`${f.name} is too big (over 9.5 MB). Try a photo instead.`;return}
      const fid=`${id}-${i}`;const r=await fetch(syncUrl()+"/f/"+fid,{method:"PUT",headers:{"Content-Type":blob.type||f.type||"application/octet-stream","X-Name":encodeURIComponent(f.name)},body:blob});if(!r.ok)throw new Error("upload "+r.status);
      meta.files.push({fid,name:f.name,type:blob.type||f.type,size:blob.size})}}
    msg.textContent="Saving…";await db.doc("school/"+id).set(meta);SCHOOL.push(meta);renderReview();
    const m2=document.getElementById("smsg");if(m2)m2.textContent="";document.getElementById("schoolSec")?.scrollIntoView({behavior:"smooth"})}
  catch(e){msg.textContent="Couldn't save: "+(e.message||e)+". Check the connection and try again."}}
async function deleteSchool(id){const s=SCHOOL.find(x=>x.id===id);if(!s)return;
  const code=window.__pcode||"";if(hash(code.trim().toUpperCase())!==PCODE){const box=document.createElement("div");box.className="fb tip";box.innerHTML=`Removing needs the parent code. <input class="in" id="sdcode" type="password" placeholder="Parent code" style="width:10rem"> <button class="btn sm" data-sdelok="${escH(id)}">Remove</button>`;
    const btn=document.querySelector(`[data-sdel="${CSS.escape(id)}"]`);btn?.closest(".actions")?.after(box);return}
  try{if(schoolMode()==="web"){for(const f of (s.files||[]))await fetch(syncUrl()+"/f/"+f.fid,{method:"DELETE"});await fetch(syncUrl()+"/d/school/"+id,{method:"DELETE"})}else await db.doc("school/"+id).set({...s,deleted:true})}catch(e){}
  SCHOOL=SCHOOL.filter(x=>x.id!==id);renderReview()}
document.addEventListener("submit",e=>{if(e.target.id==="schoolForm"){e.preventDefault();saveSchool(e.target)}});
document.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;const d=t.dataset;
  if(d.revf){REV_FILTER=d.revf;renderReview();return}
  if(d.drill){const id="DRILL-"+d.drill;AM(id);open(id);showTab("tabPractice");render();window.scrollTo({top:0});return}
  if(d.weak){const id="WEAK-"+Date.now();AM(id);open(id);showTab("tabPractice");render();window.scrollTo({top:0});return}
  if(d.cumgo){const n=(document.getElementById("cumThrough")||{}).value||CUR_TOPIC;open("CUM-1-"+n);showTab("tabPractice");render();window.scrollTo({top:0});return}
  if(d.sdel){deleteSchool(d.sdel);return}
  if(d.sdelok){window.__pcode=(document.getElementById("sdcode")||{}).value||"";deleteSchool(d.sdelok);window.__pcode="";return}
});
