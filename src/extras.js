// ===== Work record for Claude + moving progress between the Claude page and the website (same as Araaya's lab) =====
function workRecordText(){const S2=skillStats(),rows=testRows();const L=[`Aviaana's Math Lab work record (${new Date().toLocaleString()})`,"","Tests and rounds (newest first):"];
  rows.slice(0,60).forEach(t=>L.push(`- ${t.d} | ${t.name} | ${t.kind==="school"?(t.scoreText||"—"):t.score==null?"—":t.score+"/"+t.total} | missed: ${t.kind==="school"?(t.missedLessons.join(", ")||"—"):(t.missed||[]).map(k=>SK[k]||k).join(", ")||"—"}`));
  L.push("","Skills (lesson | skill | first try | last missed | status):");
  Object.keys(S2).filter(k=>G[k]&&S2[k].status!=="new").sort((a,b)=>LIB_LESSONS.indexOf(LESSON[a])-LIB_LESSONS.indexOf(LESSON[b])).forEach(k=>{const x=S2[k];L.push(`- ${LESSON[k]} | ${SK[k]} | ${x.first}/${x.n} | ${x.lastMissD||"—"} | ${STL[x.status][1]}${(x.school||[]).length?" | school: "+x.school.map(s=>s.title).join(", "):""}`)});
  if(FLAGS.length){L.push("","Flagged questions:");FLAGS.slice(0,30).forEach(f=>L.push(`- ${String(f.at).slice(0,10)} | ${f.name} Q${f.label} | ${f.skill} | ${f.question} | answer: ${f.answer} | note: ${f.note||"—"}`))}
  return L.join("\n")}
let recT=null;function pushRecord(){if(!db)return;clearTimeout(recT);recT=setTimeout(async()=>{try{await db.doc("results/record").set({text:workRecordText(),current:CUR,updatedAt:new Date().toISOString()})}catch(e){}},1500)}
async function pushState(id,st){if(!db)return;try{await db.doc("progress/"+storeKey(id)).set({id,json:JSON.stringify(st),updatedAt:st.updatedAt,streak:st.streak,rounds:st.rounds.length,proficient:st.proficient})}catch(e){}}
function exportAll(){const out={app:"avi-mathlab",at:Date.now(),store:{},school:SCHOOL};for(const id in STORE){if(!untouched(STORE[id]))out.store[id]=STORE[id]}return JSON.stringify(out)}
async function importAll(text){let o;try{o=JSON.parse(text.trim())}catch(e){return"That doesn't look like copied progress. Copy it again and paste the whole thing."}
  if(!o||o.app!=="avi-mathlab"||!o.store)return"That doesn't look like Aviaana's Math Lab progress.";let n=0,k=0;
  for(const id in o.store){const st=o.store[id];if(!AM(id)||!st||!st.rounds)continue;st.id=id;const loc=STORE[id];
    if(!loc||untouched(loc)||(st.updatedAt||0)>(loc.updatedAt||0)){STORE[id]=st;lsSet("avlab2:"+storeKey(id),st);await pushState(id,st);n++}else k++}
  let ns=0;for(const s of (o.school||[])){if(SCHOOL.some(x=>x.id===s.id))continue;SCHOOL.push(s);ns++;if(db)try{await db.doc("school/"+s.id).set(s)}catch(e){}}
  ITEMS={};S=STORE[CUR]||S;pushRecord();return`Loaded ${n} quiz/test record(s)${ns?` and ${ns} school result(s)`:""}${k?`; kept ${k} that were already newer here`:""}.`}
function copyOut(t,boxId,okMsg){const m=document.getElementById(boxId);const esc=t.replace(/&/g,"&amp;").replace(/</g,"&lt;");const fallback=()=>{if(m)m.innerHTML=`<p class="note">Your browser blocked copying. Select all the text below and copy it.</p><textarea class="in" style="width:100%;height:120px">${esc}</textarea>`};
  try{navigator.clipboard.writeText(t).then(()=>{if(m)m.innerHTML=`<div class="fb ok">${okMsg}</div>`},fallback)}catch(e){fallback()}}
function extraParentHTML(){return`<div class="card"><h3 class="rtitle" style="font-size:17px">Work record for Claude</h3><p class="note">Every test, round and school result, plus how she's doing on each skill. ${SYNC.mode==="web"?"It's also saved online automatically, so Claude can read it without copying.":"Copy it and paste it into Claude."} The <b>Review library</b> tab shows the same information.</p><div class="actions"><button class="btn ghost" data-copyrec="1">Copy work record</button></div><div id="rmsg"></div></div>
  <div class="card"><h3 class="rtitle" style="font-size:17px">Move progress between the Claude page and the website</h3><p class="note">The Claude page and the website (mjredo.github.io/avi-math) keep separate records. To bring everything into one place: on the page that has the work, click <b>Copy all progress</b>. On the other page, paste it below and click <b>Load progress</b>. Newer work always wins, so nothing she's done gets overwritten by an older copy.</p>
  <div class="actions"><button class="btn ghost" data-exportall="1">Copy all progress</button></div><div id="xmsg"></div>
  <textarea class="in" id="imptext" style="width:100%;height:90px;margin-top:8px" placeholder="Paste copied progress here"></textarea><div class="actions"><button class="btn ghost" data-importall="1">Load progress</button></div><div id="imsg"></div></div>`}
document.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;const d=t.dataset;
  if(d.exportall){copyOut(exportAll(),"xmsg","Copied. Open the other page, go to Parent view, paste it in the box and click Load progress.");return}
  if(d.importall){const v=(document.getElementById("imptext")||{}).value||"";importAll(v).then(msg=>{renderParent();const m=document.getElementById("imsg");if(m)m.innerHTML=`<div class="fb ${/^Loaded/.test(msg)?"ok":"no"}">${msg}</div>`});return}
  if(d.copyrec){copyOut(workRecordText(),"rmsg","Copied. Paste it into Claude.");return}});
// ===== "Flag this question": she reports a confusing or wrong question; Claude reads these from results/flag-* =====
let FLAGS=[];
async function loadFlags(){try{if(!db)return;const snap=await db.collection("results").get();FLAGS=snap.docs.filter(d=>String(d.id).startsWith("flag-")).map(d=>d.data()).filter(Boolean).sort((a,b)=>String(b.at).localeCompare(String(a.at)))}catch(e){}}
function flagBox(){const it=items()[S.cur.q];if(!it)return;const box=document.getElementById("flagbox");if(!box)return;
  box.innerHTML=`<div class="fb tip"><b>Flag this question.</b> What's wrong or confusing? (For example: “two answers look right”, “the steps don't match”, “I don't understand the words”.)<textarea class="in" id="flagnote" rows="2" style="width:100%;margin-top:6px"></textarea><div class="actions"><button class="btn sm" data-flagsend="1">Send flag</button><button class="btn ghost sm" data-flagcancel="1">Cancel</button></div></div>`}
async function sendFlag(){const it=items()[S.cur.q],R=round();const note=((document.getElementById("flagnote")||{}).value||"").trim();
  const spec=(R.specs||[]).find(x=>x.id===it.id)||null;const at=new Date().toISOString();
  const rec={at,assessment:CUR,name:A().name,round:S.cur.r,roundName:typeName(R),qid:it.id,label:it.label,skill:it.skill,skillName:SK[it.skill],lesson:LESSON[it.skill],spec,question:plain(it.q),options:it.opts.map(plain),answer:plain(it.opts[it.ans]),picked:(ist(it.id).wrong||[]),note};
  FLAGS.unshift(rec);try{lsSet("avlab:flags",FLAGS.slice(0,100))}catch(e){}
  const box=document.getElementById("flagbox");try{if(db)await db.doc("results/flag-"+Date.now()).set(rec);if(box)box.innerHTML=`<div class="fb ok">Thanks! The question was flagged${db?" and sent":""}. It will be checked and fixed.</div>`}catch(e){if(box)box.innerHTML=`<div class="fb no">Couldn't send it right now. It's saved on this browser.</div>`}
  pushRecord()}
function flagsHTML(){if(!FLAGS.length)return"";return`<div class="card"><h3 class="rtitle" style="font-size:17px">Flagged questions (${FLAGS.length})</h3><div class="tbl"><table><thead><tr><th>Date</th><th>Quiz / test</th><th>Skill</th><th>Question</th><th>Her note</th></tr></thead><tbody>${FLAGS.slice(0,20).map(f=>`<tr><td>${String(f.at).slice(0,10)}</td><td>${escH(f.name)} · Q${escH(f.label)}</td><td>${escH(f.skillName||f.skill)}</td><td>${escH(f.question)}</td><td>${escH(f.note||"—")}</td></tr>`).join("")}</tbody></table></div></div>`}
document.addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;const d=t.dataset;
  if(d.flag){flagBox();return}
  if(d.flagsend){sendFlag();return}
  if(d.flagcancel){const b=document.getElementById("flagbox");if(b)b.innerHTML="";return}});
try{const lf=lsGet("avlab:flags");if(Array.isArray(lf))FLAGS=lf}catch(e){}
