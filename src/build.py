import re,sys,os
D=os.path.dirname(os.path.abspath(__file__));os.chdir(D)
A=open(os.path.join(D,'base','math-lab-base.html'),encoding='utf8').read().split('\n')
head='\n'.join(A[0:163])   # lines 1..163 (through <script>)
helpers=open('helpers.js').read()
gen=open('gen.js').read(); course=open('course.js').read()
eng='\n'.join(A[4336:])
i=eng.index('const AM=id=>');eng=eng[i:]
def rep(old,new,cnt=1):
    global eng
    n=eng.count(old)
    if n!=cnt: sys.exit(f'count {n} for: {old[:70]}')
    eng=eng.replace(old,new)
rep('let CUR="T2-Q2"','let CUR="T3-QZ"')
rep('Araaya\'s Math Lab results','Aviaana\'s Math Lab results')
eng=eng.replace('"mathlab2:','"avlab2:').replace('"mathlab3:','"avlab3:').replace('"mathlab:oct26"','"avlab:none"')
# boot: drop T2 migration
s=eng.index('    if(!hasT2){');e=eng.index('    ITEMS={};S=STORE[CUR];render()')
eng=eng[:s]+eng[e:]
rep('if(!lsGet("avlab3:t3chx-intro")){lsSet("avlab3:current",PREP_ID);lsSet("avlab3:t3chx-intro",1);lsSet("avlab3:t3mid-intro",1)}','')
rep('const PREP_ID="T3-CHX";','const PREP_ID="T3-QZ";')
# prep panel without a fixed date
rep('if((i.ready||todayISO()>a.date)&&CUR!==PREP_ID){el.hidden=true;return}','if(i.ready&&CUR!==PREP_ID){el.hidden=true;return}')
rep('const dl=new Date(a.date+"T12:00:00").toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"});','const dl=a.date?new Date(a.date+"T12:00:00").toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"}):"this week";')
rep('Lessons ${a.span} · test ${dl}','Lessons ${a.span} · quiz ${dl}')
rep('`Second 100% practice test in a row = ready for the ${a.card.replace(" prep","").toLowerCase()}`','`Second 100% practice test in a row = ready for the quiz`')
# new renderCourse
s=eng.index('function renderCourse(){');e=eng.index('// ---------- Test prep panel')
eng=eng[:s]+r'''function renderCourse(){
  let h=`<div class="rtitle">All quizzes &amp; tests</div><p class="note">enVision Algebra 1, class “7th Algebra Yellow”. Each quiz runs the same way: an assessment test on every skill, then 10-question rounds on what she missed, then full practice tests until she gets 100% twice in a row.</p>`;
  for(const T of COURSE){const as=ASSESS.filter(a=>a.topic===T.t);
    h+=`<section class="topic"><div class="thead"><span class="tnum">Topic ${T.t}</span><span class="tname">${T.name}</span>${T.done?'<span class="pill">Done</span>':""}</div>
    <details${as.length?" open":""}><summary>${T.lessons.length} lessons</summary><ul class="lessons">${T.lessons.map(l=>`<li><b>${l[0]}</b> ${l[1]}</li>`).join("")}</ul></details>
    ${T.link?`<p class="note">Earlier practice: <a href="${T.link}" target="_blank" rel="noopener">${T.linkName}</a></p>`:""}
    <div class="arow">${as.map(a=>{const s=statusOf(a.id);return`<button class="acard ${a.id===CUR?"cur":""}" data-open="${a.id}"><span class="aname">${a.name}</span><span class="ales">${a.span||a.lessons.join(", ")}</span><span class="st ${s.cls}">${s.txt}</span></button>`}).join("")}</div>
    ${!as.length&&!T.done?'<p class="note">Coming when the class gets here.</p>':""}</section>`}
  document.getElementById("course").innerHTML=h}

'''+eng[e:]
extra_css='''<style>
.opt svg{display:block;max-width:150px;height:auto;margin:0}
.opts .opt:has(svg){padding:6px}
.q table{font-size:17px}
.q svg{max-width:100%}
.q sub,.opt sub{font-size:.7em}
</style>'''
head=head.replace("<title>Araaya's Math Lab</title>","<title>Aviaana's Math Lab</title>").replace("<h1>Araaya's Math Lab</h1>","<h1>Aviaana's Math Lab</h1>")
head=head.replace('<div class="wrap">',extra_css+'\n<div class="wrap">',1)
b0=eng.index('(async()=>{try{db=await window.claude?.use?.("db")}');b1=eng.index('</script>',b0)
eng=eng[:b0]+open('sync.js').read()+'\n'+eng[b1:]
pn='<p class="note">${db?"Progress is saved to this page, so it carries across devices and Claude can read it to plan next week.":"Progress shown is from this device only."}'
assert pn in eng
eng=eng.replace(pn,open('note.txt').read().rstrip('\n'))
import json as _j
lib=open('library.js').read().replace('__HISTORY__',_j.dumps(_j.load(open('history.json')),ensure_ascii=False))
t2a=open('t2adapter.js').read();g1=open('gen1.js').read()
def rp(old,new):
    global eng
    if eng.count(old)!=1: sys.exit('engine patch count '+str(eng.count(old))+': '+old[:60])
    eng=eng.replace(old,new)
rp('const AM=id=>ASSESS.find(a=>a.id===id);','const AM=id=>ASSESS.find(a=>a.id===id)||dynAssess(id);')
rp('function firstSpecs(){const a=A(),mine=skillsOf(a.lessons);','function firstSpecs(){const a=A(),mine=skillsOf(a.lessons);if(a.kind==="drill")return strengthenSpecs(a.skills,0);')
rp('const re=weakSkills(mine).slice(0,a.retests??5);','const re=(a.kind==="cumulative"?weakList():weakSkills(mine)).slice(0,a.retests??5);')
rp('function weakSkills(excludeSkills){const ev=[];','function weakSkills(excludeSkills){return weakList().filter(k=>!excludeSkills.includes(k))}\nfunction weakSkillsOld(excludeSkills){const ev=[];')
rp('planned=!!s.sp[i]||done;','planned=!stp.po.length||!!s.sp[i]||done;')
rp('else{h+=`<p class="decided">✓ ${stp.po[stp.pa]}</p>`;','else{if(stp.po.length)h+=`<p class="decided">✓ ${stp.po[stp.pa]}</p>`;')
rp('(AM(st.id||CUR)||{}).kind==="mid"?"Assessment test":"First test"','(AM(st.id||CUR)||{}).kind==="mid"?"Assessment test":(AM(st.id||CUR)||{}).kind==="drill"?"Practice round":"First test"')
rp('if(t.id==="tabPractice"||t.id==="tabParent"||t.id==="tabCourse"){showTab(t.id);return}','if(t.id==="tabPractice"||t.id==="tabParent"||t.id==="tabCourse"||t.id==="tabReview"){showTab(t.id);return}')
rp('const map={tabPractice:"practice",tabCourse:"course",tabParent:"parent"};','const map={tabPractice:"practice",tabCourse:"course",tabReview:"review",tabParent:"parent"};')
rp('if(id==="tabCourse")renderCourse()}','if(id==="tabCourse")renderCourse();if(id==="tabReview")renderReview()}')
rp('${COURSE.find(t=>t.t===A.topic).name}`}','${(COURSE.find(t=>t.t===A.topic)||{name:"Review"}).name}`}')
rp(' For an exponent, tap <b>x<sup>□</sup></b> and type it (tap again to go back). Example: 1 0 x<sup>□</sup> 4 gives 10<sup>4</sup>.','')
rp('<button type="button" class="kb" data-sup="${id}" aria-pressed="false" title="Type an exponent">x<sup>□</sup></button>','')
rp('For each step, first choose what we should do next. Then do it.','Work through each step. Where there are choices, first pick what to do next, then do it.')
rp('loadLocal();open(CUR);render();','loadLocal();loadDynLocal();open(CUR);render();')
rp('  try{if(await pullProgress()){ITEMS={};S=STORE[CUR];render()}}catch(e){SYNC.err=String(e.message||e)}','  try{if(await pullProgress()){ITEMS={};S=STORE[CUR];render()}}catch(e){SYNC.err=String(e.message||e)}\n  await loadSchool();if(!document.getElementById("review").hidden)renderReview();')
head2=head.replace('<button class="tab" id="tabParent" aria-pressed="false">Parent view</button>','<button class="tab" id="tabReview" aria-pressed="false">Review library</button>\n      <button class="tab" id="tabParent" aria-pressed="false">Parent view</button>')
head2=head2.replace('<div id="parent" class="card parent" hidden></div>','<div id="review" class="card" hidden></div>\n  <div id="parent" class="card parent" hidden></div>')
head2=head2.replace('</style>\n<div class="wrap">',open('extra.css').read()+'</style>\n<div class="wrap">',1)
assert head2.count('tabReview')==1 and head2.count('id="review"')==1
out=head2+'\n'+helpers+'\n'+gen+'\n'+t2a+'\n'+g1+'\n'+course+'\n'+lib+'\n'+eng
assert 'Araaya' not in out, [m.start() for m in re.finditer('Araaya',out)]
open(os.path.join(D,'..','index.html'),'w',encoding='utf8').write(out)
print(len(out))
