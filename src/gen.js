// ===== Aviaana · enVision Algebra 1 · Topic 3 Linear Functions (3-1, 3-2, 3-4, 3-5, 3-6) =====
// ----- number + text helpers -----
function frc(n,d=1){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return[n/g,d/g]}
function fs(n,d=1){[n,d]=frc(n,d);return(n<0?"−":"")+(d===1?Math.abs(n):Math.abs(n)+"/"+d)}
const fv=(m)=>m[0]/m[1];
// coefficient on x: m = [n,d]
function cx(m,v="x"){const [n,d]=frc(m[0],m[1]);if(n===0)return"";if(d===1)return n===1?v:n===-1?"−"+v:fmt(n)+v;return(n<0?"−":"")+`(${Math.abs(n)}/${d})${v}`}
// "f(x) = 2x − 3" style. m,b are [n,d] or numbers
const R2=v=>Array.isArray(v)?v:[v,1];
function lin(m,b,lhs="y",v="x"){m=R2(m);b=R2(b);const [bn,bd]=frc(b[0],b[1]);let s=lhs+" = ";const t=cx(m,v);
  if(t){s+=t;if(bn!==0)s+=(bn>0?" + ":" − ")+fs(Math.abs(bn),bd)}else s+=fs(bn,bd);return s}
// decimal version: y = 3.2x + 14
function linD(m,b,lhs="y",v="x"){let s=lhs+" = ";s+=(m===1?"":m===-1?"−":fmt(m))+v;if(b!==0)s+=(b>0?" + ":" − ")+fmt(Math.abs(b));return s}
const P=(x,y)=>`(${fmt(x)}, ${fmt(y)})`;
const setS=a=>`{${a.join(", ")}}`;
const pairsS=ps=>`{${ps.map(p=>P(p[0],p[1])).join(", ")}}`;
const sub=s=>`<sub>${s}</sub>`;
const an=k=>`a${sub(k)}`;
// explicit formula text: a_n = a1 + d(n − 1)
const expl=(a1,d)=>`${an("n")} = ${fmt(a1)} ${d<0?"−":"+"} ${fmt(Math.abs(d))}(n − 1)`;
const recu=(a1,d)=>`${an(1)} = ${fmt(a1)}; ${an("n")} = ${an("n−1")} ${d<0?"−":"+"} ${fmt(Math.abs(d))}`;
const seqS=(a1,d,k=4)=>Array.from({length:k},(_,i)=>fmt(RD(a1+i*d))).join(", ")+", …";
const nz=(r,a,b)=>{let v;do{v=int(r,a,b)}while(v===0);return v};
const sgn=r=>r()<0.5?-1:1;
const $$=x=>"$"+(Number.isInteger(RD(x))?fmt(x):RD(x).toFixed(2));

// ----- SVG helpers (currentColor so they follow the page theme) -----
const SVGS=(w,h,label)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" style="max-width:100%;display:block;margin:6px auto" role="img" aria-label="${label}">`;
function clip(m,b,R){const pts=[];for(const x of [-R,R]){const y=m*x+b;if(y>=-R-1e-9&&y<=R+1e-9)pts.push([x,y])}
  if(m!==0)for(const y of [-R,R]){const x=(y-b)/m;if(x>=-R-1e-9&&x<=R+1e-9)pts.push([x,y])}
  pts.sort((p,q)=>p[0]-q[0]||p[1]-q[1]);return pts.length>=2?[pts[0],pts[pts.length-1]]:null}
// coordinate plane −R..R. items: {pts}, {line:[m,b]}, {vline:x}, {seg:[[x1,y1],[x2,y2]],open:[bool,bool]}, {path:[[x,y],...]}
function plane(items,o={}){const R=o.R||6,w=o.w||230,S=w/(2*R+1.4),C=w/2,X=x=>RD(C+x*S),Y=y=>RD(C-y*S);
  let s=SVGS(w,w,o.label||"graph on a coordinate plane")+`<g stroke="currentColor" stroke-width="1" opacity=".16">`;
  for(let i=-R;i<=R;i++)s+=`<path d="M${X(i)} ${Y(-R)}V${Y(R)}M${X(-R)} ${Y(i)}H${X(R)}"/>`;
  s+=`</g><g stroke="currentColor" stroke-width="1.4" opacity=".75"><path d="M${X(-R-.5)} ${Y(0)}H${X(R+.5)}M${X(0)} ${Y(-R-.5)}V${Y(R+.5)}"/></g>`;
  s+=`<g fill="currentColor" font-size="${o.fs||9}" opacity=".8">`;for(const t of (o.ticks||[-4,-2,2,4]))s+=`<text x="${X(t)}" y="${Y(0)+11}" text-anchor="middle">${fmt(t)}</text><text x="${X(0)-4}" y="${Y(t)+3}" text-anchor="end">${fmt(t)}</text>`;
  s+=`<text x="${X(R+.15)}" y="${Y(0)-5}" font-style="italic" text-anchor="middle">x</text><text x="${X(0)+4}" y="${Y(R+.3)}" font-style="italic">y</text></g>`;
  for(const it of items){
    if(it.line){const c=clip(it.line[0],it.line[1],R);if(c)s+=`<path d="M${X(c[0][0])} ${Y(c[0][1])}L${X(c[1][0])} ${Y(c[1][1])}" stroke="currentColor" stroke-width="2.4"/>`}
    if(it.vline!=null)s+=`<path d="M${X(it.vline)} ${Y(-R)}V${Y(R)}" stroke="currentColor" stroke-width="2.4"/>`;
    if(it.path)s+=`<path d="M${it.path.map(p=>X(p[0])+" "+Y(p[1])).join("L")}" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`;
    if(it.seg){const [[a,b],[c,d]]=it.seg,op=it.open||[0,0];s+=`<path d="M${X(a)} ${Y(b)}L${X(c)} ${Y(d)}" stroke="currentColor" stroke-width="2.4"/>`;
      [[a,b,op[0]],[c,d,op[1]]].forEach(([x,y,o2])=>s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" stroke="currentColor" stroke-width="2" fill="${o2?"var(--card,#fff)":"currentColor"}"/>`)}
    if(it.pts)for(const [x,y] of it.pts)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="currentColor"/>`;
    if(it.lab)for(const [x,y,t] of it.lab)s+=`<text x="${X(x)+6}" y="${Y(y)-6}" font-size="10" fill="currentColor">${t}</text>`;
  }
  return s+`</svg>`}
function niceStep(max){for(const s of [1,2,5,10,20,25,50,100,200,250,500,1000])if(max/s<=6)return s;return 2000}
// first-quadrant scatter plot. o: {xmax,ymax,xl,yl,line:[m,b],mark:[[x,y]],w,h,dots}
function scat(pts,o){const w=o.w||290,h=o.h||220,L=40,B=h-34,T=12,Rr=w-12,xs=niceStep(o.xmax),ys=niceStep(o.ymax),xm=Math.ceil(o.xmax/xs)*xs,ym=Math.ceil(o.ymax/ys)*ys;
  const X=x=>RD(L+x/xm*(Rr-L)),Y=y=>RD(B-y/ym*(B-T));
  let s=SVGS(w,h,o.label||"scatter plot")+`<g stroke="currentColor" opacity=".15">`;
  for(let x=xs;x<=xm;x+=xs)s+=`<path d="M${X(x)} ${T}V${B}"/>`;for(let y=ys;y<=ym;y+=ys)s+=`<path d="M${L} ${Y(y)}H${Rr}"/>`;
  s+=`</g><path d="M${L} ${T}V${B}H${Rr}" stroke="currentColor" stroke-width="1.4" fill="none" opacity=".8"/><g fill="currentColor" font-size="10" opacity=".85">`;
  for(let x=0;x<=xm;x+=xs)s+=`<text x="${X(x)}" y="${B+13}" text-anchor="middle">${fmt(x)}</text>`;for(let y=0;y<=ym;y+=ys)s+=`<text x="${L-5}" y="${Y(y)+3}" text-anchor="end">${fmt(y)}</text>`;
  s+=`<text x="${(L+Rr)/2}" y="${h-4}" text-anchor="middle" font-size="11">${o.xl||"x"}</text><text x="11" y="${(T+B)/2}" text-anchor="middle" font-size="11" transform="rotate(-90 11 ${(T+B)/2})">${o.yl||"y"}</text></g>`;
  if(o.line){const [m,b]=o.line;let x1=0,y1=b,x2=xm,y2=m*xm+b;if(y1<0){x1=-b/m;y1=0}if(y1>ym){x1=(ym-b)/m;y1=ym}if(y2>ym){x2=(ym-b)/m;y2=ym}if(y2<0){x2=-b/m;y2=0}
    s+=`<path d="M${X(x1)} ${Y(y1)}L${X(x2)} ${Y(y2)}" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>`}
  for(const [x,y] of pts)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="${o.r||3.6}" fill="currentColor" opacity=".85"/>`;
  if(o.mark)for(const [x,y] of o.mark)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="${X(x)+8}" y="${Y(y)-8}" font-size="10" fill="currentColor">${P(x,y)}</text>`;
  return s+`</svg>`}
// residual plot: pts [[x,e]]
function rplot(pts,o={}){const w=o.w||230,h=o.h||150,L=26,Rr=w-8,T=10,B=h-22,xm=o.xmax||10,E=o.E||Math.max(1,...pts.map(p=>Math.abs(p[1])))*1.2,X=x=>RD(L+x/xm*(Rr-L)),Y=e=>RD((T+B)/2-e/E*(B-T)/2);
  let s=SVGS(w,h,"residual plot")+`<path d="M${L} ${T}V${B}" stroke="currentColor" opacity=".8" fill="none"/><path d="M${L} ${Y(0)}H${Rr}" stroke="currentColor" stroke-dasharray="5 4" opacity=".8"/>`;
  s+=`<g fill="currentColor" font-size="9" opacity=".85"><text x="${L-4}" y="${Y(0)+3}" text-anchor="end">0</text><text x="${(L+Rr)/2}" y="${h-5}" text-anchor="middle">x</text><text x="${L-4}" y="${T+8}" text-anchor="end">+</text><text x="${L-4}" y="${B}" text-anchor="end">−</text></g>`;
  for(const [x,e] of pts)s+=`<circle cx="${X(x)}" cy="${Y(e)}" r="3.4" fill="currentColor"/>`;return s+`</svg>`}
// mapping diagram
function mapping(pairs){const dom=[...new Set(pairs.map(p=>p[0]))].sort((a,b)=>a-b),ran=[...new Set(pairs.map(p=>p[1]))].sort((a,b)=>a-b);const n=Math.max(dom.length,ran.length),h=40+n*30,w=240;
  const Yd=i=>RD(32+(i+.5)*(h-44)/dom.length),Yr=i=>RD(32+(i+.5)*(h-44)/ran.length);
  let s=SVGS(w,h,"mapping diagram")+`<g fill="none" stroke="currentColor" stroke-width="1.4"><ellipse cx="50" cy="${(h+20)/2}" rx="32" ry="${(h-30)/2}"/><ellipse cx="190" cy="${(h+20)/2}" rx="32" ry="${(h-30)/2}"/></g>`;
  s+=`<g fill="currentColor" font-size="12" text-anchor="middle"><text x="50" y="14">Input (x)</text><text x="190" y="14">Output (y)</text>`;
  dom.forEach((v,i)=>s+=`<text x="50" y="${Yd(i)+4}">${fmt(v)}</text>`);ran.forEach((v,i)=>s+=`<text x="190" y="${Yr(i)+4}">${fmt(v)}</text>`);s+=`</g><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
  for(const [x,y] of pairs)s+=`<path d="M66 ${Yd(dom.indexOf(x))}L172 ${Yr(ran.indexOf(y))}" stroke="currentColor" stroke-width="1.3" marker-end="url(#ah)"/>`;return s+`</svg>`}
function tbl(xl,yl,xs,ys){const c='style="border:1px solid currentColor;padding:3px 10px;text-align:center"';const cell=v=>`<td ${c}>${v==null?"?":typeof v==="number"?fmt(v):v}</td>`;
  return `<table style="border-collapse:collapse;margin:8px 0"><tr><th ${c}>${xl}</th>${xs.map(cell).join("")}</tr><tr><th ${c}>${yl}</th>${ys.map(cell).join("")}</tr></table>`}
// correlation of points
function corr(pts){const n=pts.length,mx=pts.reduce((a,p)=>a+p[0],0)/n,my=pts.reduce((a,p)=>a+p[1],0)/n;let sxy=0,sxx=0,syy=0;for(const [x,y] of pts){sxy+=(x-mx)*(y-my);sxx+=(x-mx)**2;syy+=(y-my)**2}return sxy/Math.sqrt(sxx*syy||1)}
// scatter data with a target |r| band. kind: "pos","neg","none"; strength: "strong","weak"
function makeScatter(r,kind,strength){for(let t=0;t<400;t++){const n=int(r,12,16),pts=[];const slope=kind==="none"?0:(kind==="pos"?1:-1)*(3+r()*3),base=kind==="neg"?60+r()*20:10+r()*15;
    const noise=kind==="none"?14:strength==="strong"?3:11;
    for(let i=0;i<n;i++){const x=RD(Math.round((0.5+r()*9.5)*2)/2);const y=RD(Math.round(base+slope*x+(r()*2-1)*noise*1.6));pts.push([x,Math.max(1,y)])}
    const c=corr(pts),a=Math.abs(c);const ok=kind==="none"?a<0.18:strength==="strong"?a>0.92&&Math.sign(c)===(kind==="pos"?1:-1):a>0.45&&a<0.72&&Math.sign(c)===(kind==="pos"?1:-1);
    if(ok)return{pts,c}}return null}

const G={},SK={},LESSON={},LESSON_SKILLS={},VARS={};
Object.assign(SK,{
 a1_func:"Is it a function?",a1_domran:"Domain and range",a1_dc:"Discrete or continuous",
 a2_eval:"Function notation: evaluate and solve",a2_write:"Writing a linear function",a2_word:"Linear functions in context",
 a4_seq:"Arithmetic sequences: common difference",a4_explicit:"Explicit formulas",a4_recursive:"Recursive formulas",a4_word:"Arithmetic sequence word problems",
 a5_corr:"Scatter plots: type of correlation",a5_fit:"Lines of fit: write, predict, interpret",
 a6_resid:"Residuals",a6_rplot:"Residual plots: is the line a good fit?",a6_r:"Correlation coefficient r",a6_inter:"Interpolation, extrapolation, causation"});
Object.assign(LESSON,{a1_func:"3-1",a1_domran:"3-1",a1_dc:"3-1",a2_eval:"3-2",a2_write:"3-2",a2_word:"3-2",a4_seq:"3-4",a4_explicit:"3-4",a4_recursive:"3-4",a4_word:"3-4",a5_corr:"3-5",a5_fit:"3-5",a6_resid:"3-6",a6_rplot:"3-6",a6_r:"3-6",a6_inter:"3-6"});
Object.assign(LESSON_SKILLS,{"3-1":["a1_func","a1_domran","a1_dc"],"3-2":["a2_eval","a2_write","a2_word"],"3-4":["a4_seq","a4_explicit","a4_recursive","a4_word"],"3-5":["a5_corr","a5_fit"],"3-6":["a6_resid","a6_rplot","a6_r","a6_inter"]});
Object.assign(VARS,{a1_func:["pairs","graph","table","map","notpairs"],a1_domran:["pairs","range","graph","context"],a1_dc:["kind","graph"],
 a2_eval:["eval","solve","two"],a2_write:["points","table","graph"],a2_word:["model","use","interpret","domain"],
 a4_seq:["diff","isarith","next"],a4_explicit:["formula","term","which"],a4_recursive:["write","toexplicit","torecursive"],a4_word:["nth","two","when"],
 a5_corr:["plot","context","strength"],a5_fit:["eq","predict","interpret","when"],
 a6_resid:["one","sign","most"],a6_rplot:["pick","judge"],a6_r:["value","meaning","strongest"],a6_inter:["which","cause"]});

// shared step: what makes a function
const funcPlan=r=>stp(r,{p:"What makes a relation a function?",good:"Each input (x-value) has exactly one output (y-value)",
  bad:[["Each output (y-value) is used only once","Outputs are allowed to repeat. Two different x-values can share a y-value."],["The x-values are listed in order","Order doesn't matter. Only whether an x-value is paired with two different y-values."],["All the numbers are different","Repeated y-values are fine. Only a repeated x-value with different y-values breaks a function."]],
  t:"Look for an x-value that shows up twice with two different y-values. If there is one, it's not a function."});

// ---------- 3-1 ----------
function funcSet(r,isF){for(;;){const xs=shuffle(r,[-5,-4,-3,-2,-1,0,1,2,3,4,5,6]).slice(0,4);const pts=xs.map(x=>[x,int(r,-6,8)]);
  if(isF){pts[int(r,1,3)][1]=pts[0][1];if(new Set(pts.map(p=>p[1])).size<4)return{pts:shuffle(r,pts)}}
  else{const k=int(r,1,3);pts[k][0]=pts[0][0];if(pts[k][1]!==pts[0][1])return{pts:shuffle(r,pts),rep:pts[0][0]}}}}
G.a1_func=(r,o)=>{const v=o.v||pick(r,VARS.a1_func);
  if(v==="pairs"||v==="notpairs"){const not=v==="notpairs";
    const good=funcSet(r,!not),bads=[0,1,2].map(()=>funcSet(r,not));
    const why=s=>not?`This one is a function: every x-value has just one y-value${new Set(s.pts.map(p=>p[1])).size<4?" (a repeated y-value is fine)":""}.`:`x = ${fmt(s.rep)} is paired with two different y-values, so it's not a function.`;
    return item("a1_func",not?"Challenge":"Basic",`Which relation is ${not?"<b>not</b> ":""}a function?`,pairsS(good.pts),bads.map(s=>[pairsS(s.pts),why(s)]),
      [funcPlan(r),stp(r,{p:"How do we check a list of ordered pairs quickly?",good:"Look at the first number (x) in every pair and see if any x repeats",bad:[["Look at the second number (y) in every pair","Repeated y-values don't matter."],["Add up the x-values","The total doesn't tell us anything about functions."]],
        t:not?`In ${pairsS(good.pts)}, one x-value repeats.`:`In ${pairsS(bads[0].pts)}, one x-value repeats with different y-values.`,a:not?`Which x-value repeats in ${pairsS(good.pts)}?`:`Which x-value repeats in ${pairsS(bads[0].pts)}?`,ans:not?good.rep:bads[0].rep})],r)}
  if(v==="table"||v==="map"){const isF=r()<0.5;const s=funcSet(r,isF);const pts=s.pts.slice();if(!isF)pts.sort((a,b)=>a[0]-b[0]);
    const repY=(()=>{const c={};for(const p of pts)c[p[1]]=(c[p[1]]||0)+1;const k=Object.keys(c).find(k=>c[k]>1);return k==null?null:+k})();
    const fig=v==="table"?tbl("x","y",pts.map(p=>p[0]),pts.map(p=>p[1])):mapping(pts);
    const goodT=isF?"Yes. Each x-value has exactly one y-value":`No. x = ${fmt(s.rep)} has two different y-values`;
    const bad=isF?[[repY!=null?`No. y = ${fmt(repY)} appears twice`:`No. The y-values are not in order`,repY!=null?"A repeated y-value is allowed. Check the x-values instead.":"Order doesn't matter for a function."],[`No. Some x-values are negative`,"Negative inputs are fine."],["Yes. Each y-value has exactly one x-value","That's checking backwards. A function needs each x to have one y."]]
      :[["Yes. Each y-value has exactly one x-value","That's checking backwards. A function needs each x to have one y."],["Yes. Every x-value has a y-value",`True, but x = ${fmt(s.rep)} has two of them.`],["No. The y-values repeat","Look at the x-values: one input goes to two outputs."]];
    return item("a1_func","Basic",`Is the relation ${v==="table"?"in the table":"in the mapping diagram"} a function?${fig}`,goodT,bad,
      [funcPlan(r),stp(r,{p:v==="map"?"In a mapping diagram, what shows that it's not a function?":"In a table, what shows that it's not a function?",good:v==="map"?"One input has two arrows going out of it":"The same x-value appears twice with different y-values",bad:[[v==="map"?"Two arrows point to the same output":"The same y-value appears twice","Sharing an output is fine."],["The numbers are out of order","Order doesn't matter."]],
        a:"How many different y-values does each x have at most here?",ans:isF?1:2,t:isF?"Every x-value shows up only once.":`x = ${fmt(s.rep)} shows up twice.`})],r)}
  // graph: vertical line test
  const not=r()<0.4;const m=pick(r,[2,-2,1,-1,3,-3]),b=int(r,-3,3);
  const tg=(k,svg)=>svg+`<span hidden>graph: ${k}</span>`;
  const fs_=[{t:tg("line",plane([{line:[m,b]}],{w:150})),k:"line"},{t:tg("curve",plane([{path:[[-4,4],[-2,0],[0,-2+0],[2,0],[4,4]].map(p=>[p[0],p[1]])}],{w:150})),k:"curve"},
    {t:tg("dots",plane([{pts:[[-4,1],[-2,3],[0,-1],[1,2],[3,-3],[5,0]]}],{w:150})),k:"dots"},{t:tg("zig",plane([{path:[[-5,-4],[-3,2],[0,3],[3,-1],[5,4]]}],{w:150})),k:"zig"}];
  const circ=[];for(let i=0;i<=36;i++){const a=i/36*2*Math.PI;circ.push([RD(3.5*Math.cos(a)),RD(3.5*Math.sin(a))])}
  const sp=[];for(let y=-4;y<=4;y+=0.5)sp.push([RD(y*y/3-3),y]);
  const nf=[{t:tg("vline",plane([{vline:int(r,-4,4)}],{w:150})),k:"vline"},{t:tg("circle",plane([{path:circ}],{w:150})),k:"circle"},{t:tg("side",plane([{path:sp}],{w:150})),k:"side"},{t:tg("dotsrep",plane([{pts:[[-4,2],[-1,4],[-1,-2],[2,1],[4,-3]]}],{w:150})),k:"dotsrep"}];
  const W={vline:"A vertical line hits this graph at infinitely many points.",circle:"A vertical line through the middle hits the circle twice.",side:"A vertical line to the right of the turn hits this graph twice.",dotsrep:"Two dots are stacked at x = −1, so a vertical line hits both.",
    line:"Every vertical line hits this line only once, so it is a function.",curve:"Every vertical line hits this curve only once, so it is a function.",dots:"No two dots share an x-value, so it is a function.",zig:"Every vertical line hits this graph only once, so it is a function."};
  const goodG=not?pick(r,nf):pick(r,fs_),badG=shuffle(r,not?fs_:nf).slice(0,3);
  return item("a1_func",not?"Challenge":"Basic",`Which graph ${not?"is <b>not</b>":"shows"} a function?`,goodG.t,badG.map(g=>[g.t,W[g.k]]),
    [stp(r,{p:"What test do we use on a graph?",good:"The vertical line test",bad:[["The horizontal line test","Horizontal lines check outputs. A function is about each input (x) having one output."],["Check if the graph goes through the origin","Many functions don't pass through (0, 0)."]],t:"Imagine sliding a vertical line across the graph. If it ever touches the graph in two or more places, one x-value has two y-values."}),
     stp(r,{p:"A vertical line touches a graph at 2 points. What does that mean?",good:"One x-value has two y-values, so it is not a function",bad:[["It is a function with two outputs","A function can only have one output per input."],["It crosses the x-axis twice","The vertical line test isn't about the x-axis."]],
       t:not?"Find the graph where some vertical line hits it twice (or more).":"Find the graph that no vertical line can hit twice.",a:"At most how many points may any vertical line touch a function's graph?",ans:1})],r)};

G.a1_domran=(r,o)=>{const v=o.v||pick(r,VARS.a1_domran);
  if(v==="pairs"||v==="range"){const rng_=v==="range";let pts;do{pts=shuffle(r,[-4,-3,-2,-1,0,1,2,3,5,6]).slice(0,4).map(x=>[x,int(r,-5,9)])}while(new Set(pts.map(p=>p[1])).size<3);
    if(r()<0.6)pts[3][1]=pts[1][1];
    const D=[...new Set(pts.map(p=>p[0]))].sort((a,b)=>a-b).map(fmt),Rg=[...new Set(pts.map(p=>p[1]))].sort((a,b)=>a-b).map(fmt);
    const all=[...new Set(pts.flat())].sort((a,b)=>a-b).map(fmt);
    const good=setS(rng_?Rg:D),other=setS(rng_?D:Rg);
    const bad=[[other,rng_?"That's the domain (the x-values). The range is the y-values.":"That's the range (the y-values). The domain is the x-values."],[setS(all),"That mixes x- and y-values. Use only one coordinate."]];
    const lst=pts.map(p=>fmt(rng_?p[1]:p[0]));if(new Set(lst).size<lst.length)bad.push([setS(lst),"List each value only once in a set."]);
    bad.push([setS((rng_?D:Rg).map((x,i)=>x)).replace(/^\{/,"{0, "),"Only use the numbers that appear in the pairs."]);
    return item("a1_domran","Basic",`What is the ${rng_?"range":"domain"} of the relation ${pairsS(pts)}?`,good,bad,
      [stp(r,{p:`What is the ${rng_?"range":"domain"}?`,good:rng_?"The set of all outputs (y-values)":"The set of all inputs (x-values)",bad:[[rng_?"The set of all inputs (x-values)":"The set of all outputs (y-values)",rng_?"Inputs are the domain.":"Outputs are the range."],["Every number in the pairs","Use only one coordinate."]],t:`Take the ${rng_?"second":"first"} number of each pair, list each value once, from least to greatest.`,a:`How many different ${rng_?"y":"x"}-values are there?`,ans:(rng_?Rg:D).length})],r)}
  if(v==="graph"){let x1,x2,y1,y2;do{x1=int(r,-5,0);x2=int(r,1,5);y1=int(r,-5,5);y2=int(r,-5,5)}while(y1===y2||x2-x1<3);
    const open=r()<0.5?[0,0]:[0,1];const askR=r()<0.4;const lo=Math.min(y1,y2),hi=Math.max(y1,y2);
    const sym=o2=>o2?"<":"≤";
    let good,bad;
    if(!askR){good=`${fmt(x1)} ${sym(open[0])} x ${sym(open[1])} ${fmt(x2)}`;bad=[[`${fmt(lo)} ≤ x ≤ ${fmt(hi)}`,"Those are the y-values of the endpoints. The domain reads across the x-axis."],[`${fmt(x1)} ${sym(!open[0])} x ${sym(!open[1])} ${fmt(x2)}`,"A closed (filled) dot includes the endpoint (≤). An open dot does not (<)."],[`${fmt(lo)} ≤ y ≤ ${fmt(hi)}`,"That's the range, the y-values."]]}
    else{const yo=y1<y2?[open[0],open[1]]:[open[1],open[0]];good=`${fmt(lo)} ${sym(yo[0])} y ${sym(yo[1])} ${fmt(hi)}`;bad=[[`${fmt(x1)} ${sym(open[0])} x ${sym(open[1])} ${fmt(x2)}`,"That's the domain, the x-values. The range reads up the y-axis."],[`${fmt(lo)} ${sym(!yo[0])} y ${sym(!yo[1])} ${fmt(hi)}`,"A closed (filled) dot includes the endpoint (≤). An open dot does not (<)."],[`${fmt(Math.min(y1,y2)-1)} ≤ y ≤ ${fmt(hi)}`,"Read the lowest point of the graph exactly."]]}
    return item("a1_domran",open[1]?"Challenge":"Basic",`What is the ${askR?"range":"domain"} of the function graphed below?${plane([{seg:[[x1,y1],[x2,y2]],open}],{label:"line segment graph"})}`,good,bad,
      [stp(r,{p:`How do we read the ${askR?"range":"domain"} from a graph?`,good:askR?"Look at how low and how high the graph goes (y-values)":"Look at how far left and right the graph goes (x-values)",bad:[[askR?"Look at how far left and right it goes":"Look at how low and how high it goes",askR?"Left to right is the domain.":"Up and down is the range."],["Find where it crosses the axes","Intercepts don't give the whole set of values."]],
        a:askR?"What is the lowest y-value of the graph?":"What is the x-value of the left endpoint?",ans:askR?lo:x1}),
       stp(r,{p:"The dot at an end is open (hollow). What does that mean?",good:"That endpoint is not included, so use < instead of ≤",bad:[["That endpoint is included, so use ≤","A filled dot is included. A hollow dot is left out."],["The graph keeps going forever","An arrow means it keeps going. A dot means it stops."]],t:open[1]?"The right end of this graph has an open dot.":"Both dots here are filled, so both endpoints are included (≤)."})],r)}
  // context: reasonable domain
  if(r()<0.5){const c=pick(r,[["movie tickets",8,"t","c(t) = 8t","tickets"],["bracelets",6,"b","c(b) = 6b","bracelets"],["notebooks",3,"n","c(n) = 3n","notebooks"],["songs",2,"s","c(s) = 2s","songs"]]);
    const k=int(r,4,6),M=c[1]*k;const D=setS(Array.from({length:k+1},(_,i)=>i));
    return item("a1_domran","Word",`Each of the ${c[0]} costs $${c[1]}. Ava has $${M} to spend. The function ${c[3]} gives the cost of ${c[2]} ${c[4]}. What is a reasonable domain?`,D,
      [[`0 ≤ ${c[2]} ≤ ${k}`,`She can't buy part of one, so the domain is only whole numbers.`],[setS(Array.from({length:k+1},(_,i)=>i*c[1])),"Those are the costs. That's the range."],[`0 ≤ ${c[2]} ≤ ${M}`,`${M} is the most she can spend (an output), not how many she can buy.`],["All real numbers","She can't buy a negative number or a fraction of one."]],
      [stp(r,{p:`What can ${c[2]} (the number of ${c[4]}) be?`,good:"Only whole numbers, from 0 up to what she can afford",bad:[["Any number, including fractions","You can't buy half of one."],["Any amount from 0 to the money she has","That mixes up the money (output) with how many (input)."]],t:"Counting items makes a discrete domain: a list of whole numbers.",a:`How many can she buy with $${M}?`,ans:k})],r)}
  const c=pick(r,[["A pool is being filled at","gallons per minute","holds",g=>g,"t","minutes"],["A tank is filled with water at","liters per minute","holds",g=>g,"t","minutes"]]);
  const rate=pick(r,[10,12,15,20,25]),T=int(r,20,45),cap=rate*T;
  return item("a1_domran","Word",`${c[0]} ${rate} ${c[1]} and ${c[2]} ${cap} ${c[1].split(" ")[0]} when full. The function w(t) = ${rate}t gives the amount of water after t minutes, until it is full. What is a reasonable domain?`,`0 ≤ t ≤ ${T}`,
    [[`{0, 1, 2, …, ${T}}`,"Time keeps flowing between whole minutes, so the domain is continuous (an interval)."],[`0 ≤ t ≤ ${cap}`,`${cap} is the amount of water, the range. Find how many minutes it takes.`],["t ≥ 0","The filling stops when the pool is full."],[`0 ≤ w ≤ ${cap}`,"That's the range of w, not the domain."]],
    [stp(r,{p:"The domain is the possible values of which variable?",good:"t, the time in minutes",bad:[["w, the water","w is the output. Its values are the range."],[`${rate}, the rate`,"The rate is a constant, not a variable."]],t:"Time can be any value, including parts of a minute, from the start until it is full.",a:`How many minutes until it is full? ${cap} ÷ ${rate} = ?`,ans:T})],r)};

G.a1_dc=(r,o)=>{const v=o.v||pick(r,VARS.a1_dc);
  const C=[["the number of cars washed and the money earned",0],["the number of tickets sold and the total sales",0],["the number of students and the number of buses needed",0],["the number of pizzas ordered and the cost",0],
    ["the time a candle burns and its height",1],["the distance driven and the gas used",1],["the time since a bath started draining and the water left",1],["the weight of apples bought and their cost",1]];
  if(v==="graph"){const dots=r()<0.5;const m=pick(r,[1,2,-1]),b=dots?(m<0?5:0):int(r,-2,2);const pts=[];for(let x=0;x<=5;x++){const y=m*x+b;if(y>=-6&&y<=6)pts.push([x,y])}
    const fig=dots?plane([{pts}]):plane([{seg:[[0,b],[5,m*5+b]],open:[0,0]}]);
    const good=dots?"Discrete. The graph is separate points":"Continuous. The graph is an unbroken line segment";
    return item("a1_dc","Basic",`Is the function graphed below discrete or continuous?${fig}`,good,
      [[dots?"Continuous. The points line up":"Discrete. The graph has two endpoints",dots?"Points that line up are still separate, so it's discrete.":"Endpoints don't make it discrete. It's one unbroken piece."],[dots?"Continuous. It has a constant rate of change":"Discrete. It doesn't go on forever","The rate of change doesn't decide it. Look at whether the graph has gaps."],["Neither. It isn't a function","It passes the vertical line test, so it's a function."]],
      [stp(r,{p:"What is the difference between discrete and continuous?",good:"Discrete is separate points. Continuous is an unbroken line or curve",bad:[["Discrete is a straight line. Continuous is curved","Both kinds can be straight."],["Discrete goes up. Continuous goes down","Direction doesn't matter."]],a:"Does the graph have gaps between its points? (1 = yes, 0 = no)",ans:dots?1:0})],r)}
  const [txt,cont]=pick(r,C);
  return item("a1_dc","Word",`A function relates ${txt}. Is it discrete or continuous?`,cont?"Continuous. The input can be any value in an interval":"Discrete. The input can only be whole numbers",
    [[cont?"Discrete. The input can only be whole numbers":"Continuous. The input can be any value in an interval",cont?"Time, distance and weight can be measured in parts (like 2.5), so they're continuous.":"You can't have part of one, so the inputs are separate whole numbers."],[cont?"Discrete. It has a starting value":"Continuous. The money can be any amount","Look at the input (the first quantity), not the output."],["It is not a function","Each input gives one output, so it is a function."]],
    [stp(r,{p:"Which quantity is the input?",good:"The first one named: "+txt.split(" and ")[0],bad:[["The second one named: "+txt.split(" and ")[1],"The first quantity is what we choose. The second depends on it."],["Whichever number is bigger","Input and output depend on meaning, not size."]],t:"Ask: can the input be a fraction, like 2.5? If yes, it's continuous. If you can only count it, it's discrete."})],r)};

// ---------- 3-2 ----------
function pickMB(r,frac){const m=frac?pick(r,[[1,2],[-1,2],[3,2],[-3,2],[2,3],[-2,3],[3,4],[-3,4]]):[nz(r,-6,6),1];const b=[int(r,-9,9),1];return{m,b}}
G.a2_eval=(r,o)=>{const v=o.v||pick(r,VARS.a2_eval);const fn=pick(r,["f","g","h"]);
  if(v==="eval"){const frac=r()<0.35,{m,b}=pickMB(r,frac);const a=frac?m[1]*nz(r,-3,3):nz(r,-6,6);const mv=fv(m),ans=RD(mv*a+b[0]);
    const bad=[[fmt(RD(mv*-a+b[0])),`Plug in ${fmt(a)} carefully: ${fmt(a)} is ${a<0?"negative":"positive"}.`],[fmt(RD(mv*a-b[0])),`Keep the sign of ${fmt(b[0])}: it's added as ${fmt(b[0])}.`],[fmt(RD(mv+a+b[0])),"m times x means multiply, not add."],[fmt(RD((a-b[0])/mv)),`That solves ${fn}(x) = ${fmt(a)}. ${fn}(${fmt(a)}) means x = ${fmt(a)}.`]];
    return item("a2_eval","Basic",`${lin(m,b,fn+"(x)")}. What is ${fn}(${fmt(a)})?`,fmt(ans),bad,
      [stp(r,{p:`What does ${fn}(${fmt(a)}) mean?`,good:`Replace x with ${fmt(a)} and work out the output`,bad:[[`Multiply ${fn} by ${fmt(a)}`,`${fn}(x) is the name of the function, not ${fn} times x.`],[`Set the function equal to ${fmt(a)} and solve for x`,`That finds the input that gives ${fmt(a)}. Here ${fmt(a)} is the input.`]],a:`${cx(m).replace("x","")||"1"} × (${fmt(a)}) = ?`.replace(/^−\(/,"(−").replace(/^\(/,"(").replace(/^× /,"1 × "),ans:RD(mv*a)}),
       stp(r,{p:"Now finish it. What's left?",good:`Add ${fmt(b[0])} to that product`,bad:[["Divide by the slope","There's nothing to undo. We're just working out the output."],["Stop. The product is the answer",`Don't forget the ${fmt(b[0])}.`]],a:`${fmt(RD(mv*a))} + ${b[0]<0?"("+fmt(b[0])+")":fmt(b[0])} = ?`,ans})],r)}
  if(v==="solve"){const m=[nz(r,-6,6),1],b=[int(r,-9,9),1],x=nz(r,-7,7),k=m[0]*x+b[0];
    const bad=[[fmt(m[0]*k+b[0]),`That's ${fn}(${fmt(k)}). Here ${fmt(k)} is the output, so solve for x.`],[fmt(RD((k+b[0])/m[0])),`To undo + ${fmt(b[0])}, subtract it. Watch the sign.`],[fmt(RD(k/m[0]-b[0])),"Undo the adding first, then divide."],[fmt(-x),"Check the sign when you divide."]];
    return item("a2_eval","Basic",`${lin(m,b,fn+"(x)")}. For what value of x is ${fn}(x) = ${fmt(k)}?`,fmt(x),bad,
      [stp(r,{p:`${fn}(x) = ${fmt(k)} means…`,good:`The output is ${fmt(k)}. Set ${lin(m,b,"").slice(3)} equal to ${fmt(k)} and solve`,bad:[[`Replace x with ${fmt(k)}`,`That would find ${fn}(${fmt(k)}). Here ${fmt(k)} is the output.`],[`x is ${fmt(k)}`,`${fmt(k)} is the y-value, not x.`]],a:`Undo the ${fmt(b[0])}: ${fmt(m[0])}x = ${fmt(k)} − (${fmt(b[0])}) = ?`,ans:k-b[0]}),
       stp(r,{p:"Now get x by itself. How?",good:`Divide both sides by ${fmt(m[0])}`,bad:[[`Subtract ${fmt(m[0])} from both sides`,`${fmt(m[0])}x means ${fmt(m[0])} times x, so divide.`],[`Multiply both sides by ${fmt(m[0])}`,"Multiplying makes it worse. Undo times with divide."]],a:`x = ${fmt(k-b[0])} ÷ ${m[0]<0?"("+fmt(m[0])+")":fmt(m[0])} = ?`,ans:x})],r)}
  // two: f(a) − g(a) or f(a)+f(b)
  const f1={m:[nz(r,-5,5),1],b:[int(r,-8,8),1]},g1={m:[nz(r,-5,5),1],b:[int(r,-8,8),1]};const a=nz(r,-4,4);const fa=f1.m[0]*a+f1.b[0],ga=g1.m[0]*a+g1.b[0];const ans=fa-ga;
  return item("a2_eval","Challenge",`${lin(f1.m,f1.b,"f(x)")} and ${lin(g1.m,g1.b,"g(x)")}. What is f(${fmt(a)}) − g(${fmt(a)})?`,fmt(ans),
    [[fmt(fa+ga),"The minus sign means subtract g's output."],[fmt(fa-(g1.m[0]*a-g1.b[0])),"Find g's output first, then subtract the whole thing."],[fmt(fa),"Don't forget to find g(" + fmt(a) + ") too."],[fmt(ga-fa),"Order matters: f's output minus g's output."]],
    [stp(r,{p:"What's the plan?",good:`Find f(${fmt(a)}) and g(${fmt(a)}) separately, then subtract`,bad:[["Subtract the two rules first and guess","It's safer to find each output first."],["Multiply the outputs","The question says subtract."]],a:`f(${fmt(a)}) = ?`,ans:fa}),
     stp(r,{p:"Now g. Plug in the same input?",good:`Yes. Replace x with ${fmt(a)} in g`,bad:[["No. Use the output of f as the input","That would be g(f(x)), a different question."],["No. g uses x = 0","Both functions use the same input here."]],a:`g(${fmt(a)}) = ?`,ans:ga}),
     stp(r,{p:"Last step?",good:`f(${fmt(a)}) − g(${fmt(a)})`,bad:[[`g(${fmt(a)}) − f(${fmt(a)})`,"Keep the order from the question."],["Add them","The question says minus."]],a:`${fmt(fa)} − (${fmt(ga)}) = ?`,ans})],r)};

function slopeSteps(r,x1,y1,x2,y2,m,fn="f"){return[
  stp(r,{p:"First we need the rate of change (slope). How do we find it?",good:"Change in output ÷ change in input",bad:[["Change in input ÷ change in output","Output (y) goes on top: rise over run."],["Output ÷ input for one point","Slope compares two points."]],a:`(${fmt(y2)} − ${y1<0?"("+fmt(y1)+")":fmt(y1)}) ÷ (${fmt(x2)} − ${x1<0?"("+fmt(x1)+")":fmt(x1)}) = ?`,ans:fv(m),tol:1e-6}),
  stp(r,{p:"Now the y-intercept b. How do we find it?",good:`Put one point and the slope into y = mx + b and solve for b`,bad:[[`Use the first output, ${fmt(y1)}, as b`,`b is the output when x = 0, and this point has x = ${fmt(x1)}.`],["b is always the bigger output","b is where the line crosses the y-axis (x = 0)."]],a:`${fmt(y1)} = ${fs(m[0],m[1])}(${fmt(x1)}) + b, so b = ?`,ans:RD(y1-fv(m)*x1)})]}
G.a2_write=(r,o)=>{const v=o.v||pick(r,VARS.a2_write);
  if(v==="graph"){let m,b;do{m=pick(r,[[1,1],[2,1],[3,1],[-1,1],[-2,1],[-3,1],[1,2],[-1,2],[2,3],[-2,3],[3,2],[-3,2]]);b=int(r,-4,4)}while(b===0);
    const pts=[];for(let x=-6;x<=6;x++){const y=fv(m)*x+b;if(Number.isInteger(RD(y))&&Math.abs(y)<=5)pts.push([x,RD(y)])}
    const xi=RD(-b/fv(m));const bad=[[lin([-m[0],m[1]],b,"f(x)"),"The line goes "+(m[0]>0?"up":"down")+" from left to right, so the slope is "+(m[0]>0?"positive":"negative")+"."],[lin([m[1]*Math.sign(m[0]),Math.abs(m[0])],b,"f(x)"),"Slope is rise ÷ run, not run ÷ rise."],[lin(m,-b,"f(x)"),`The line crosses the y-axis at ${fmt(b)}.`]];
    if(Number.isInteger(xi)&&xi!==b)bad.push([lin(m,xi,"f(x)"),`${fmt(xi)} is where it crosses the x-axis. b is the y-intercept.`]);
    return item("a2_write","Basic",`Which function is graphed?${plane([{line:[fv(m),b]},{pts:pts.slice(0,3)}])}`,lin(m,b,"f(x)"),bad,
      [stp(r,{p:"Where do we read b, the y-intercept?",good:"Where the line crosses the y-axis",bad:[["Where the line crosses the x-axis","That's the x-intercept."],["The highest point shown","Lines keep going. b is at x = 0."]],a:"b = ?",ans:b}),
       stp(r,{p:"Is the slope positive or negative?",good:m[0]>0?"Positive: the line rises from left to right":"Negative: the line falls from left to right",bad:[[m[0]>0?"Negative: the line falls from left to right":"Positive: the line rises from left to right","Read it left to right, the way you read a book."],["Zero","A zero slope is a flat line."]],t:"Pick two points where the line crosses grid corners, then count rise and run.",a:"slope = rise ÷ run = ?",ans:fv(m)})],r)}
  let m,x1,y1,x2,y2;
  if(v==="table"){const step=pick(r,[1,2,2,3]);m=pick(r,[[nz(r,-5,5),1],[1,2],[-1,2],[3,2],[-3,2]]);if(m[1]===2&&step%2)m=[m[0]*2,2];
    const xs0=pick(r,[0,1,2,-2,-4,3]),b=int(r,-6,8);const xs=[0,1,2,3].map(i=>xs0+i*step),ys=xs.map(x=>RD(fv(m)*x+b));
    const dy=RD(fv(m)*step);const bad=[[lin(frc(Math.round(dy*2),2),b,"f(x)"),`The x-values go up by ${step}, so divide the change in y by ${step}.`],[lin(m,ys[0],"f(x)"),`${fmt(ys[0])} is the output when x = ${fmt(xs[0])}, not x = 0.`],[lin([-m[0],m[1]],b,"f(x)"),"Check the direction: do the outputs go up or down?"],[lin(m,-b,"f(x)"),"Work out b carefully, then check one table point."]];
    if(step===1)bad.shift();
    return item("a2_write",step>1||xs0!==0?"Challenge":"Basic",`Which linear function matches the table?${tbl("x","f(x)",xs,ys)}`,lin(m,b,"f(x)"),bad,
      [stp(r,{p:"How do we find the rate of change from a table?",good:"Change in f(x) ÷ change in x, between two columns",bad:[["Just the change in f(x) from one column to the next",`Only if x goes up by 1. Here x goes up by ${step}.`],["f(x) ÷ x in the first column","Slope compares two points."]],a:`(${fmt(ys[1])} − ${ys[0]<0?"("+fmt(ys[0])+")":fmt(ys[0])}) ÷ ${step} = ?`,ans:fv(m)}),
       stp(r,{p:"How do we find b?",good:xs.includes(0)?"Read f(0) from the table":"Work backward to x = 0 using the slope",bad:[["Use the first output in the table",xs0===0?"That works only because x = 0 here.":`The first output is at x = ${fmt(xs0)}, not 0.`],["b equals the slope","They are different numbers."]],a:"b = f(0) = ?",ans:b})],r)}
  // points
  do{m=pick(r,[[nz(r,-5,5),1],[1,2],[-1,2],[3,2],[-3,2],[2,3],[-2,3]]);x1=m[1]*nz(r,-3,3);x2=x1+m[1]*nz(r,1,3)*sgn(r);y1=int(r,-8,8)}while(x1===x2||x1===0);y2=RD(y1+fv(m)*(x2-x1));const b=RD(y1-fv(m)*x1);
  if(!Number.isInteger(b))return G.a2_write(r,{v:"points"});
  const bad=[[lin(m,RD(y1+fv(m)*x1),"f(x)"),`Solve ${fmt(y1)} = ${fs(m[0],m[1])}(${fmt(x1)}) + b carefully: subtract ${fmt(RD(fv(m)*x1))} from both sides.`],[lin(frc(m[1],m[0]),RD(y1-m[1]/m[0]*x1),"f(x)"),"Slope is change in output over change in input. The outputs go on top."],[lin(m,y1,"f(x)"),`${fmt(y1)} is the output at x = ${fmt(x1)}, not at x = 0.`],[lin([-m[0],m[1]],RD(y1+fv(m)*x1),"f(x)"),"Check the sign of the slope."]];
  return item("a2_write","Challenge",`A linear function has f(${fmt(x1)}) = ${fmt(y1)} and f(${fmt(x2)}) = ${fmt(y2)}. Which is the function?`,lin(m,b,"f(x)"),bad,
    [stp(r,{p:`What does f(${fmt(x1)}) = ${fmt(y1)} tell us?`,good:`The point ${P(x1,y1)} is on the graph`,bad:[[`The point ${P(y1,x1)} is on the graph`,"Input first, then output: (x, f(x))."],[`The slope is ${fs(y1,x1)}`,"One point doesn't give the slope."]],t:`So we have two points: ${P(x1,y1)} and ${P(x2,y2)}.`}),...slopeSteps(r,x1,y1,x2,y2,m)],r)};

G.a2_word=(r,o)=>{const v=o.v||pick(r,VARS.a2_word);
  if(v==="model"){const c=pick(r,[["A gym charges","to join plus","per month","months","c"],["A phone plan charges","to start plus","per gigabyte","gigabytes","c"],["A bowling alley charges","for shoes plus","per game","games","c"],["A plumber charges","for a visit plus","per hour","hours","c"]]);
    const b=pick(r,[25,30,35,40,45,50,60,75]),m=pick(r,[5,8,12,15,18,20,22,35].filter(x=>x!==b));
    return item("a2_word","Word",`${c[0]} $${b} ${c[1]} $${m} ${c[2]}. Which function gives the total cost c(x) for x ${c[3]}?`,`c(x) = ${m}x + ${b}`,
      [[`c(x) = ${b}x + ${m}`,`The $${b} is paid once, so it's the starting value. The $${m} repeats, so it's the rate.`],[`c(x) = ${m+b}x`,`The $${b} is only paid once, not every time.`],[`c(x) = ${m}x − ${b}`,`The $${b} is added to the cost, not taken away.`]],
      [stp(r,{p:"Which amount is the rate of change (the number multiplied by x)?",good:`$${m}, because it's paid for each one`,bad:[[`$${b}, because it's bigger`,"The rate is the amount that repeats, whatever its size."],[`$${m+b}, both together`,`The $${b} is paid only once.`]],t:`The one-time amount is the starting value b. Check: c(1) should be ${b} + ${m}.`,a:`c(2) = ${m} × 2 + ${b} = ?`,ans:2*m+b})],r)}
  if(v==="use"){const c=pick(r,[["A candle is","cm tall and burns","cm per hour","h(t)","hours","cm tall"],["A phone battery is at","% and drops","% per hour","b(t)","hours","%"],["A water tank holds","gallons and drains","gallons per minute","w(t)","minutes","gallons"]]);
    const rate=pick(r,[1.5,2,2.5,3,4,5,6]),T=int(r,4,12),target=pick(r,[0,5,10,12,20]);const start=RD(target+rate*T);
    const q=`${c[0]} ${fmt(start)} ${c[1]} ${fmt(rate)} ${c[2]}. The function ${c[3]} = ${fmt(start)} − ${fmt(rate)}t models it. After how many ${c[4]} will it be at ${fmt(target)}${c[5]==="%"?"%":" "+c[5].split(" ")[0]}?`;
    return item("a2_word","Word",q,fmt(T),[[fmt(RD(start/rate)),target?`That's when it reaches 0. Set ${c[3]} equal to ${fmt(target)}.`:"Check your subtraction."],[fmt(RD(start-rate*target)),"That plugs the target in for t. The target is the output."],[fmt(RD((start+target)/rate)),`Subtract ${fmt(target)} from ${fmt(start)}, don't add.`],[fmt(T+1),"Check by plugging your answer back in."]].filter(x=>x[0]!==fmt(T)),
      [stp(r,{p:"What equation do we solve?",good:`${fmt(start)} − ${fmt(rate)}t = ${fmt(target)}`,bad:[[`${c[3]} = ${fmt(start)} − ${fmt(rate)}(${fmt(target)})`,`${fmt(target)} is the output, not the time.`],[`${fmt(rate)}t = ${fmt(start)}`,target?`That's when it's empty. We want ${fmt(target)}.`:"Keep the subtraction form."]],a:`${fmt(start)} − ${fmt(target)} = ${fmt(rate)}t. What is ${fmt(start)} − ${fmt(target)}?`,ans:RD(start-target)}),
       stp(r,{p:"Now get t alone. How?",good:`Divide by ${fmt(rate)}`,bad:[[`Subtract ${fmt(rate)}`,`${fmt(rate)}t means ${fmt(rate)} times t.`],[`Multiply by ${fmt(rate)}`,"Undo multiplying with dividing."]],a:`t = ${fmt(RD(start-target))} ÷ ${fmt(rate)} = ?`,ans:T})],r)}
  if(v==="interpret"){const c=pick(r,[["s(x)","the money in Jamal's savings account after x weeks","dollars"],["d(x)","the distance a hiker is from the trailhead after x hours","miles"],["p(x)","the number of pages Mia has read after x days","pages"]]);
    const m=c[2]==="miles"?pick(r,[2.5,3,3.5]):c[2]==="pages"?pick(r,[25,30,35,40]):pick(r,[15,20,25,40]),b=c[2]==="miles"?pick(r,[1,2,4]):c[2]==="pages"?pick(r,[12,20,45]):pick(r,[60,80,120,150]);const askM=r()<0.6;
    const unit=c[0]==="d(x)"?"hour":c[0]==="p(x)"?"day":"week";
    const sM=`${fmt(m)} ${c[2]} added each ${unit}`,sB=`${fmt(b)} ${c[2]} at the start (when x = 0)`;
    return item("a2_word","Word",`The function ${c[0]} = ${fmt(m)}x + ${fmt(b)} gives ${c[1]}. What does ${fmt(askM?m:b)} represent?`,askM?`The rate: ${sM}`:`The starting amount: ${sB}`,
      [[askM?`The starting amount: ${fmt(m)} ${c[2]} at the start`:`The rate: ${fmt(b)} ${c[2]} added each ${unit}`,askM?"The starting amount is the constant term, the value when x = 0.":"The rate is the number multiplied by x."],[`The total after 1 ${unit}`,`After 1 ${unit} the total is ${fmt(m+b)}.`],[`The number of ${unit}s`,`x is the number of ${unit}s.`]],
      [stp(r,{p:"In f(x) = mx + b, what do m and b mean in a story?",good:"m is the rate of change (per one of x). b is the starting value (when x = 0)",bad:[["m is the starting value. b is the rate","Swap them: m multiplies x, so it changes with x."],["m and b are both totals","Only f(x) is a total."]],a:`What is ${c[0].replace("x","0")}?`,ans:b})],r)}
  // domain in context
  const c=pick(r,[["A phone battery starts at 100% and drops","% per hour until it is empty","b(t) = 100 − ","t"],["A 120-gallon tank starts full and drains","gallons per minute until it is empty","w(t) = 120 − ","t"]]);
  const start=c[0].includes("100%")?100:120,rate=pick(r,start===100?[4,5,8,10,20]:[4,5,6,8,10,12]),T=RD(start/rate);
  return item("a2_word","Challenge",`${c[0]} ${rate}${c[1]}. It is modeled by ${c[2]}${rate}${c[3]}. What is a reasonable domain?`,`0 ≤ t ≤ ${fmt(T)}`,
    [[`0 ≤ t ≤ ${start}`,`${start} is the starting output. Find the time when it reaches 0.`],["t ≥ 0","It stops once it is empty, so time has an end point."],[`{0, 1, 2, …, ${Math.floor(T)}}`,"Time is continuous, so the domain is an interval, not a list."],[`0 ≤ ${c[2][0]} ≤ ${start}`,"That's the range (outputs)."]],
    [stp(r,{p:"Where does the domain end?",good:"When the amount reaches 0",bad:[[`When t reaches ${start}`,`${start} is an amount, not a time.`],["It never ends","Once it's empty the model stops."]],a:`Solve ${start} − ${rate}t = 0. t = ?`,ans:T})],r)};

// ---------- 3-4 ----------
function seqPlan(r){return stp(r,{p:"What is an arithmetic sequence?",good:"A list where you add the same number (the common difference) each time",bad:[["A list where you multiply by the same number each time","Multiplying by the same number makes a geometric sequence."],["Any list of numbers that goes up","It can go down too, but the change must be the same every time."]],t:"The common difference d = any term minus the term before it. It can be negative."})}
G.a4_seq=(r,o)=>{const v=o.v||pick(r,VARS.a4_seq);
  if(v==="diff"){const a1=int(r,-10,25),d=nz(r,-9,9);
    return item("a4_seq","Basic",`What is the common difference of the arithmetic sequence ${seqS(a1,d)}?`,fmt(d),[[fmt(-d),"Subtract in order: a later term minus the term before it."],[fmt(a1),"That's the first term."],[fmt(2*d),"Compare terms that are next to each other."],[fmt(a1+d),"That's the second term."]],
      [seqPlan(r),stp(r,{p:"Which subtraction gives d?",good:"Second term − first term",bad:[["First term − second term","That gives the opposite sign."],["Last term − first term","That spans several steps."]],a:`${fmt(a1+d)} − ${a1<0?"("+fmt(a1)+")":fmt(a1)} = ?`,ans:d})],r)}
  if(v==="next"){const a1=pick(r,[1.5,2.5,0.75,-3.5,4.25,10.5]),d=pick(r,[1.25,-0.5,0.75,-1.5,2.5,0.25]);const t5=RD(a1+4*d);
    return item("a4_seq","Challenge",`What is the next term of the arithmetic sequence ${seqS(a1,d)}?`,fmt(t5),[[fmt(RD(t5+d)),"That skips a term. The next term comes right after the 4th."],[fmt(RD(a1+4*-d)),"Check the direction: are the terms going up or down?"],[fmt(RD(a1+3*d+1)),"Add the common difference, not 1."],[fmt(RD(t5-2*d)),"Add d to the last term shown."]],
      [seqPlan(r),stp(r,{p:"How do we find the next term?",good:"Add the common difference to the last term",bad:[["Add the first term to the last term","Only d is added each time."],["Double the last term","That's multiplying."]],a:`d = ${fmt(RD(a1+d))} − ${a1<0?"("+fmt(a1)+")":fmt(a1)} = ?`,ans:d}),
       stp(r,{p:"Now?",good:`${fmt(RD(a1+3*d))} + (${fmt(d)})`,bad:[[`${fmt(RD(a1+3*d))} − (${fmt(d)})`,"Add d, don't subtract it."],[`${fmt(a1)} + (${fmt(d)})`,"Start from the last term shown."]],a:"next term = ?",ans:t5})],r)}
  // isarith
  const not=r()<0.4;const a1=int(r,-8,12),d=nz(r,-7,7);const ar=seqS(a1,d);const g0=pick(r,[1,2,3]),q=pick(r,[2,3]);
  const nonA=[[`${g0}, ${g0*q}, ${g0*q*q}, ${g0*q*q*q}, …`,`This multiplies by ${q} each time, so the differences change.`],[`${fmt(a1)}, ${fmt(a1+2)}, ${fmt(a1+5)}, ${fmt(a1+9)}, …`,"The differences are 2, 3, 4. They aren't the same."],[`1, 4, 9, 16, …`,"These are square numbers. The differences are 3, 5, 7."],[`${fmt(a1)}, ${fmt(a1+d)}, ${fmt(a1)}, ${fmt(a1+d)}, …`,`The differences switch between ${fmt(d)} and ${fmt(-d)}.`]];
  const ars=[[seqS(int(r,-5,5),nz(r,-6,-1)),"This subtracts the same number each time, so it is arithmetic."],[seqS(int(r,10,30),nz(r,2,8)),"This adds the same number each time, so it is arithmetic."],[seqS(pick(r,[0.5,1.5,2.5]),0.5),"This adds 0.5 each time, so it is arithmetic."]];
  if(!not)return item("a4_seq","Basic","Which sequence is arithmetic?",ar,shuffle(r,nonA).slice(0,3),
    [seqPlan(r),stp(r,{p:`Test ${ar.replace(", …","")}. What are the differences between neighbors?`,good:`All ${fmt(d)}`,bad:[[`They change each time`,"Subtract each term from the next one and compare."],[`All ${fmt(-d)}`,"Later term minus earlier term. Watch the sign."]],a:"common difference = ?",ans:d})],r);
  const goodN=pick(r,nonA);
  return item("a4_seq","Challenge","Which sequence is <b>not</b> arithmetic?",goodN[0],ars,
    [seqPlan(r),stp(r,{p:"How do we test a sequence?",good:"Find the difference between each pair of neighbors and see if they are all the same",bad:[["Check that it goes up","Arithmetic sequences can go down."],["Check that every term is a whole number","Decimals and fractions are fine."]],t:goodN[1]})],r)};

G.a4_explicit=(r,o)=>{const v=o.v||pick(r,VARS.a4_explicit);const a1=nz(r,-12,20),d=nz(r,-9,9);
  if(v==="formula"){const bad=[[expl(d,a1),"Swapped. The first term goes first, and d multiplies (n − 1)."],[`${an("n")} = ${fmt(a1)} ${d<0?"−":"+"} ${fmt(Math.abs(d))}n`,`Use (n − 1). Check n = 1: it should give ${fmt(a1)}.`],[expl(a1,-d),"Check the sign of d. Are the terms going up or down?"],[`${an("n")} = ${fmt(a1)}n ${d<0?"−":"+"} ${fmt(Math.abs(d))}`,"The common difference multiplies (n − 1), not the first term."]];
    return item("a4_explicit","Basic",`Which is an explicit formula for ${seqS(a1,d)}?`,expl(a1,d),bad,
      [seqPlan(r),stp(r,{p:"What is the explicit formula pattern?",good:`${an("n")} = ${an(1)} + d(n − 1)`,bad:[[`${an("n")} = ${an(1)} + dn`,"That would add d one extra time."],[`${an("n")} = d + ${an(1)}(n − 1)`,"The first term is not multiplied."]],a:`${an(1)} = ?`,ans:a1}),
       stp(r,{p:"And d?",good:"Second term minus first term",bad:[["First term minus second term","That flips the sign."],["The second term","d is a difference."]],a:"d = ?",ans:d})],r)}
  if(v==="which"){const a1p=int(r,-5,15),dp=nz(r,2,9)*(r()<0.7?1:-1),n=int(r,15,60),val=a1p+(n-1)*dp;
    return item("a4_explicit","Challenge",`In the arithmetic sequence ${seqS(a1p,dp)}, which term is ${fmt(val)}? (What is n?)`,fmt(n),[[fmt(n-1),"Don't forget the +1 at the end: n − 1 = …, so n = … + 1."],[fmt(n+1),"Check: put your n back into the formula."],[fmt(RD(Math.round(val/dp*100)/100)),"Divide the change from the first term, not the whole value."]].filter(x=>x[0]!==fmt(n)),
      [seqPlan(r),stp(r,{p:"Set up the equation:",good:`${fmt(val)} = ${fmt(a1p)} + ${dp<0?"("+fmt(dp)+")":fmt(dp)}(n − 1)`,bad:[[`n = ${fmt(a1p)} + ${fmt(dp)}(${fmt(val)} − 1)`,`${fmt(val)} is the value of the term, not n.`],[`${fmt(val)} = ${fmt(a1p)}n + ${fmt(dp)}`,"Use the pattern a₁ + d(n − 1)."]],a:`${fmt(val)} − ${a1p<0?"("+fmt(a1p)+")":fmt(a1p)} = ?`,ans:val-a1p}),
       stp(r,{p:"Now?",good:`Divide by ${fmt(dp)} to get n − 1, then add 1`,bad:[[`Divide by ${fmt(dp)} and stop`,"That gives n − 1, not n."],[`Subtract ${fmt(dp)}`,"d multiplies (n − 1), so divide."]],a:`n − 1 = ${fmt(val-a1p)} ÷ ${dp<0?"("+fmt(dp)+")":fmt(dp)} = ?`,ans:n-1})],r)}
  const n=int(r,18,60),ans=a1+(n-1)*d;
  return item("a4_explicit","Basic",`What is the ${n}th term of the arithmetic sequence ${seqS(a1,d)}?`,fmt(ans),[[fmt(a1+n*d),`That adds d ${n} times. From the 1st term to the ${n}th there are only ${n-1} steps.`],[fmt(n*d),"Start from the first term."],[fmt(a1-(n-1)*d),"Check the sign of d."],[fmt(a1*(n-1)+d),"d multiplies (n − 1), not the first term."]],
    [seqPlan(r),stp(r,{p:`How many times do we add d to get from the 1st term to the ${n}th?`,good:`${n} − 1 times`,bad:[[`${n} times`,"The first term already counts as term 1."],[`${n} + 1 times`,"Count the gaps between terms."]],a:`d = ?`,ans:d}),
     stp(r,{p:"Use the formula:",good:`${an(n)} = ${fmt(a1)} + ${d<0?"("+fmt(d)+")":fmt(d)}(${n} − 1)`,bad:[[`${an(n)} = ${fmt(a1)} + ${fmt(d)}(${n})`,"Use n − 1."],[`${an(n)} = ${fmt(d)} + ${fmt(a1)}(${n} − 1)`,"The first term isn't multiplied."]],a:`${fmt(d)} × ${n-1} = ?`,ans:d*(n-1)})],r)};

G.a4_recursive=(r,o)=>{const v=o.v||pick(r,VARS.a4_recursive);const a1=nz(r,-10,24),d=nz(r,-9,9);
  if(v==="write"){return item("a4_recursive","Basic",`Which recursive formula describes ${seqS(a1,d)}?`,recu(a1,d),
    [[recu(a1,-d),"Check the sign: are the terms going up or down?"],[recu(d,a1),"Swapped. a₁ is the first term, and the common difference is added each time."],[`${an(1)} = ${fmt(a1)}; ${an("n")} = ${fmt(d)}·${an("n−1")}`,"Arithmetic sequences add the same number, they don't multiply."],[`${an(1)} = ${fmt(a1+d)}; ${an("n")} = ${an("n−1")} ${d<0?"−":"+"} ${fmt(Math.abs(d))}`,`${fmt(a1+d)} is the second term.`]],
    [seqPlan(r),stp(r,{p:"A recursive formula needs two parts. What are they?",good:"The first term, and a rule to get each term from the one before",bad:[["The first term and the last term","Sequences can go on forever."],["A rule using n only","That's an explicit formula."]],a:`${an(1)} = ?  And d = second term − first term. What is d?`,ans:d,t:`${an(1)} = ${fmt(a1)}.`})],r)}
  if(v==="toexplicit")return item("a4_recursive","Basic",`A sequence is defined by ${recu(a1,d)}. Which explicit formula describes it?`,expl(a1,d),
    [[expl(d,a1),"Swapped. The first term stands alone, and d multiplies (n − 1)."],[`${an("n")} = ${fmt(a1)} ${d<0?"−":"+"} ${fmt(Math.abs(d))}n`,"Use (n − 1). Check n = 1."],[expl(a1,-d),"Keep the same sign as in the recursive rule."]],
    [stp(r,{p:"What does the recursive rule tell us?",good:`The first term is ${fmt(a1)} and we add ${fmt(d)} each time`,bad:[[`The first term is ${fmt(d)} and we add ${fmt(a1)}`,`${an(1)} is given first: ${fmt(a1)}.`],[`We multiply by ${fmt(d)} each time`,"The rule adds, not multiplies."]],a:`Use it: ${an(2)} = ?`,ans:a1+d}),
     stp(r,{p:"Now write it explicitly:",good:`${an("n")} = ${an(1)} + d(n − 1)`,bad:[[`${an("n")} = ${an("n−1")} + d`,"That's still recursive."],[`${an("n")} = d + ${an(1)}n`,"The pattern is a₁ + d(n − 1)."]],a:"Check with n = 2: what does your formula give?",ans:a1+d})],r);
  // torecursive from simplified explicit a_n = dn + c
  const c=a1-d;const ex=`${an("n")} = ${fmt(d)}n ${c<0?"−":"+"} ${fmt(Math.abs(c))}`;
  if(c===0)return G.a4_recursive(r,{v:"write"});
  return item("a4_recursive","Challenge",`A sequence has explicit formula ${ex}. Which recursive formula describes it?`,recu(a1,d),
    [[recu(c,d),`${fmt(c)} is the "0th" term. Plug in n = 1 to find a₁.`],[recu(a1,c),`The common difference is ${fmt(d)}, the number multiplied by n.`],[recu(d,c),"Find a₁ by plugging in n = 1, and d from the coefficient of n."]],
    [stp(r,{p:"How do we find the first term?",good:"Plug n = 1 into the explicit formula",bad:[["Read the constant term",`The constant ${fmt(c)} is the value at n = 0, not n = 1.`],["Plug n = 0 into the formula","Sequences start at n = 1."]],a:`${an(1)} = ${fmt(d)}(1) ${c<0?"−":"+"} ${fmt(Math.abs(c))} = ?`,ans:a1}),
     stp(r,{p:"What's the common difference?",good:`The number multiplied by n, ${fmt(d)}`,bad:[[`The constant, ${fmt(c)}`,"The constant doesn't change from term to term."],["a₂ + a₁","d is a difference: a₂ − a₁."]],a:`Check: ${an(2)} − ${an(1)} = ?`,ans:d})],r)};

G.a4_word=(r,o)=>{const v=o.v||pick(r,VARS.a4_word);
  if(v==="two"){const a1=int(r,-8,15),d=nz(r,2,9)*(r()<0.75?1:-1),p=int(r,2,6),q=p+int(r,3,8);const ap=a1+(p-1)*d,aq=a1+(q-1)*d;
    return item("a4_word","Challenge",`In an arithmetic sequence, ${an(p)} = ${fmt(ap)} and ${an(q)} = ${fmt(aq)}. What is ${an(1)}?`,fmt(a1),
      [[fmt(ap-p*d),`From term 1 to term ${p} there are ${p-1} steps, not ${p}.`],[fmt(d),"That's the common difference. Use it to go back to the first term."],[fmt(ap+(p-1)*d),"Going back toward term 1 means subtracting d."],[fmt(aq-q*d),`From term 1 to term ${q} there are ${q-1} steps.`]],
      [stp(r,{p:`How many steps (common differences) are there from ${an(p)} to ${an(q)}?`,good:`${q} − ${p} = ${q-p}`,bad:[[`${q} + ${p}`,"Count the gaps between the term numbers."],[`${q}`,`Start counting at term ${p}.`]],a:`d = (${fmt(aq)} − ${ap<0?"("+fmt(ap)+")":fmt(ap)}) ÷ ${q-p} = ?`,ans:d}),
       stp(r,{p:`Now go back from ${an(p)} to ${an(1)}. How?`,good:`Subtract d, ${p-1} times`,bad:[[`Subtract d, ${p} times`,`From term 1 to term ${p} is ${p-1} steps.`],[`Add d, ${p-1} times`,"Going back toward term 1 means subtracting."]],a:`${an(1)} = ${fmt(ap)} − ${p-1}(${fmt(d)}) = ?`,ans:a1})],r)}
  if(v==="when"){const s=pick(r,[20,25,35,40,50]),d=pick(r,[8,10,12,15]),n=int(r,9,24),T=s+(n-1)*d;
    return item("a4_word","Word",`Jada puts $${s} in her savings in week 1. Each week after that she adds $${d} more than the week before's total, so her savings are ${seqS(s,d,3)} In which week will her savings reach $${T}?`,`Week ${n}`,
      [[`Week ${n-1}`,`Solve n − 1 = ${n-1}, then add 1.`],[`Week ${n+1}`,"Check by plugging your week back into the formula."],[`Week ${Math.round(T/d)}`,`Subtract the starting $${s} first.`]],
      [stp(r,{p:"Write the explicit formula:",good:expl(s,d),bad:[[`${an("n")} = ${s} + ${d}n`,"Week 1 should give $"+s+"."],[expl(d,s),"Swapped."]],a:`Solve ${T} = ${s} + ${d}(n − 1). What is n − 1?`,ans:n-1})],r)}
  const c=pick(r,[["A theater has","seats in the first row, and each row has","more seats than the row before. How many seats are in row","seats"],["A stack of cups is","cm tall with 1 cup, and each extra cup adds","cm. How tall (in cm) is a stack of","cups"]]);
  const s=c[3]==="seats"?int(r,12,24):pick(r,[9,10,12]),d=c[3]==="seats"?int(r,2,4):pick(r,[1.5,2,2.5]),n=int(r,12,30),ans=RD(s+(n-1)*d);
  const q=c[3]==="seats"?`${c[0]} ${s} ${c[1]} ${fmt(d)} ${c[2]} ${n}?`:`${c[0]} ${s} ${c[1]} ${fmt(d)} ${c[2]} ${n} cups?`;
  return item("a4_word","Word",q,fmt(ans),[[fmt(RD(s+n*d)),`Row/cup 1 already has ${s}. Add d only ${n-1} times.`],[fmt(RD(n*d)),"Start from the first term."],[fmt(RD(s*n)),"Each step adds d. It doesn't repeat the first amount."]],
    [stp(r,{p:"What are a₁ and d?",good:`${an(1)} = ${fmt(s)}, d = ${fmt(d)}`,bad:[[`${an(1)} = ${fmt(d)}, d = ${fmt(s)}`,"The first amount is a₁. The amount added each time is d."],[`${an(1)} = 0, d = ${fmt(d)}`,`The first one already has ${fmt(s)}.`]],a:`${an(n)} = ${fmt(s)} + ${fmt(d)}(${n} − 1) = ?`,ans})],r)};

// ---------- 3-5 ----------
const CTX_CORR=[["the hours students study and their test scores","pos"],["a person's height and their arm span","pos"],["the outside temperature and the number of hot cocoas sold","neg"],["the number of absences and a student's grade","neg"],["a car's age and its value","neg"],["shoe size and favorite number","none"],["the number of pets a family has and the month they were born","none"],["the temperature and the number of ice cream cones sold","pos"],["the hours spent playing video games and the hours of sleep","neg"],["a person's birthday (day of the month) and their height","none"]];
const CN={pos:"Positive correlation",neg:"Negative correlation",none:"No correlation"};
const CW={pos:"As one goes up, the other tends to go up: positive.",neg:"As one goes up, the other tends to go down: negative.",none:"There's no trend, so there's no correlation."};
G.a5_corr=(r,o)=>{const v=o.v||pick(r,VARS.a5_corr);
  if(v==="context"){const [t,k]=pick(r,CTX_CORR);
    return item("a5_corr","Word",`What kind of correlation would you expect between ${t}?`,CN[k],["pos","neg","none"].filter(x=>x!==k).map(x=>[CN[x],CW[k]]),
      [stp(r,{p:"How do we decide?",good:"Ask: when the first goes up, does the second tend to go up, go down, or neither?",bad:[["Ask if one causes the other","Correlation is about the trend, not the cause."],["Ask which number is bigger","Size doesn't matter, only the trend."]],t:CW[k]})],r)}
  const k=pick(r,["pos","neg","none"]),st=v==="strength"&&k!=="none"?pick(r,["strong","weak"]):"strong";const d=makeScatter(r,k,st)||makeScatter(r,k,st);
  const ymax=Math.max(...d.pts.map(p=>p[1]));const fig=scat(d.pts,{xmax:10,ymax,xl:"x",yl:"y"});
  if(v==="strength"){const name=k==="none"?"No correlation":`${st==="strong"?"Strong":"Weak"} ${k==="pos"?"positive":"negative"} correlation`;
    const all=["Strong positive correlation","Weak positive correlation","Strong negative correlation","Weak negative correlation","No correlation"].filter(x=>x!==name);
    const why=x=>x==="No correlation"?"The points do follow a trend.":x.includes("positive")!==(k==="pos")?"Check the direction: read the trend from left to right.":"Check how tightly the points hug a line: close together is strong, spread out is weak.";
    return item("a5_corr","Challenge",`Describe the correlation shown in the scatter plot.${fig}`,name,shuffle(r,all).map(x=>[x,k==="none"?"The points don't follow an up or down trend.":why(x)]),
      [stp(r,{p:"Read the trend from left to right. Which way do the points go?",good:k==="pos"?"Up":k==="neg"?"Down":"Neither, they're scattered",bad:[[k==="pos"?"Down":"Up","Look from left to right."],[k==="none"?"Down":"Neither, they're scattered","Squint at the whole cloud of points."]],t:"Then: points packed close to a line = strong. Points spread out but still trending = weak."})],r)}
  return item("a5_corr","Basic",`What type of correlation does the scatter plot show?${fig}`,CN[k],["pos","neg","none"].filter(x=>x!==k).map(x=>[CN[x],CW[k]]),
    [stp(r,{p:"How do we read a scatter plot's trend?",good:"Look from left to right: do the points tend to rise, fall, or neither?",bad:[["Look at the highest point","One point doesn't show the trend."],["Count the points","The number of points doesn't decide the direction."]],t:CW[k]})],r)};

G.a5_fit=(r,o)=>{const v=o.v||pick(r,VARS.a5_fit);
  const C=pick(r,[["hours practiced","score"],["minutes of exercise","calories burned"],["years since 2015","price ($)"],["temperature (°F)","drinks sold"]]);
  if(v==="eq"){let x1,x2,m,b;do{x1=int(r,1,3);x2=int(r,7,10);m=pick(r,[2,3,4,5,6,2.5,1.5,-2,-3]);b=m>0?int(r,2,20):int(r,35,55)}while(m*x2+b<=2);const y1=RD(m*x1+b),y2=RD(m*x2+b);
    const pts=[];for(let i=0;i<10;i++){const x=RD(1+i*0.95);pts.push([x,Math.max(1,RD(Math.round(m*x+b+(r()*2-1)*Math.max(2,Math.abs(m))*1.3)))])}
    const fig=scat(pts,{xmax:10,ymax:Math.max(y1,y2,...pts.map(p=>p[1])),xl:C[0],yl:C[1],line:[m,b],mark:[[x1,y1],[x2,y2]]});
    return item("a5_fit","Challenge",`A line of fit for the data passes through ${P(x1,y1)} and ${P(x2,y2)}. What is its equation?${fig}`,linD(m,b),
      [[linD(RD(1/m),RD(y1-x1/m)),"Slope is change in y ÷ change in x."],[linD(m,RD(y1+m*x1)),`Solve ${fmt(y1)} = ${fmt(m)}(${fmt(x1)}) + b by subtracting ${fmt(RD(m*x1))}.`],[linD(-m,RD(y1+m*x1)),"Check the direction of the line."],[linD(m,y1),`${fmt(y1)} is y when x = ${fmt(x1)}, not x = 0.`]],
      [stp(r,{p:"What's the first step?",good:"Find the slope from the two points",bad:[["Use the first y-value as b",`That point has x = ${fmt(x1)}, not 0.`],["Average all the y-values","A line of fit through two points uses those two points."]],a:`m = (${fmt(y2)} − ${fmt(y1)}) ÷ (${fmt(x2)} − ${fmt(x1)}) = ?`,ans:m}),
       stp(r,{p:"Now b?",good:"Plug one point into y = mx + b",bad:[["b = the slope","Different numbers."],["b = 0 always","Only if the line goes through the origin."]],a:`${fmt(y1)} = ${fmt(m)}(${fmt(x1)}) + b, so b = ?`,ans:b})],r)}
  const m=pick(r,[1.5,2.4,3.2,4.5,0.8,-1.5,-2.5]),b=m>0?pick(r,[12,15,18,22,35]):pick(r,[60,72,80,95]),x=pick(r,[6,8,9,12,15]);const L=linD(m,b);
  if(v==="predict"){const y=RD(m*x+b);
    return item("a5_fit","Word",`The line of fit ${L} models the data, where x = ${C[0]} and y = ${C[1]}. Predict y when x = ${x}.`,fmt(y),[[fmt(RD(m*x)),`Don't forget to add the y-intercept, ${fmt(b)}.`],[fmt(RD((x-b)/m)),`That solves for x. Here x = ${x} is given.`],[fmt(RD(m+b*x)),"m multiplies x, and b is added."],[fmt(RD(m*x-b)),"b is added, not subtracted."]],
      [stp(r,{p:"How do we predict with a line of fit?",good:`Substitute x = ${x} into the equation`,bad:[["Read the closest data point","The line gives a smoother estimate."],[`Set y = ${x} and solve`,`${x} is the x-value.`]],a:`${fmt(m)} × ${x} = ?`,ans:RD(m*x)}),stp(r,{p:"Then?",good:`Add ${fmt(b)}`,bad:[["Stop there","The equation also has + b."],[`Multiply by ${fmt(b)}`,"b is added."]],a:`${fmt(RD(m*x))} + ${fmt(b)} = ?`,ans:y})],r)}
  if(v==="when"){const y=RD(m*x+b);
    return item("a5_fit","Word",`The line of fit ${L} models the data, where x = ${C[0]} and y = ${C[1]}. Estimate the value of x when y = ${fmt(y)}.`,fmt(x),[[fmt(RD(m*y+b)),`That plugs in ${fmt(y)} for x. Here y = ${fmt(y)}.`],[fmt(RD(y/m)),`Subtract ${fmt(b)} before dividing.`],[fmt(RD((y+b)/m)),`To undo + ${fmt(b)}, subtract it.`]],
      [stp(r,{p:"What equation do we solve?",good:`${fmt(y)} = ${fmt(m)}x + ${fmt(b)}`,bad:[[`y = ${fmt(m)}(${fmt(y)}) + ${fmt(b)}`,`${fmt(y)} is the y-value.`],[`${fmt(y)} = ${fmt(b)}x + ${fmt(m)}`,"Keep the equation as given."]],a:`${fmt(y)} − ${fmt(b)} = ?`,ans:RD(y-b)}),stp(r,{p:"Then?",good:`Divide by ${fmt(m)}`,bad:[[`Multiply by ${fmt(m)}`,"Undo times with divide."],[`Subtract ${fmt(m)}`,`${fmt(m)}x is a product.`]],a:`x = ${fmt(RD(y-b))} ÷ ${fmt(m)} = ?`,ans:x})],r)}
  // interpret
  const askM=r()<0.6;const dir=m>0?"increases":"decreases";
  const good=askM?`For each 1 more ${C[0].replace(/s \(.*|s$/,"").replace(/ \(.*/,"")}, the ${C[1].replace(/ \(.*/,"")} ${dir} by about ${fmt(Math.abs(m))}`:`When ${C[0]} is 0, the ${C[1].replace(/ \(.*/,"")} is about ${fmt(b)}`;
  return item("a5_fit","Word",`The line of fit ${L} models the data, where x = ${C[0]} and y = ${C[1]}. What does ${fmt(askM?m:b)} mean?`,good,
    [[askM?`When ${C[0]} is 0, the ${C[1].replace(/ \(.*/,"")} is about ${fmt(m)}`:`For each 1 more, the ${C[1].replace(/ \(.*/,"")} changes by about ${fmt(b)}`,askM?"The value at x = 0 is the y-intercept, b.":"The rate of change is the slope, the number next to x."],
     [askM?`For each 1 more ${C[0].replace(/ \(.*/,"")}, the ${C[1].replace(/ \(.*/,"")} ${m>0?"decreases":"increases"} by about ${fmt(Math.abs(m))}`:`The ${C[1].replace(/ \(.*/,"")} is always ${fmt(b)}`,askM?"Check the sign of the slope.":"y changes as x changes. It's only "+fmt(b)+" at the start."],["It is the correlation coefficient","r is a different number that measures how well the line fits."]],
    [stp(r,{p:"In y = mx + b, which part is the rate of change?",good:"m, the number multiplied by x",bad:[["b, the number added","b is the value when x = 0."],["y","y is the output."]],t:m>0?"A positive slope means y goes up as x goes up.":"A negative slope means y goes down as x goes up."})],r)};

// ---------- 3-6 ----------
G.a6_resid=(r,o)=>{const v=o.v||pick(r,VARS.a6_resid);
  if(v==="sign"){const above=r()<0.5;
    return item("a6_resid","Basic",`A data point lies ${above?"above":"below"} the line of fit. What do you know about its residual?`,above?"It is positive":"It is negative",
      [[above?"It is negative":"It is positive","Residual = actual − predicted. "+(above?"Above the line means the actual is bigger.":"Below the line means the actual is smaller.")],["It is zero","Zero means the point is exactly on the line."],["It is the slope of the line","A residual is a distance from the line for one point."]],
      [stp(r,{p:"What is a residual?",good:"Actual y − predicted y",bad:[["Predicted y − actual y","Always actual minus predicted."],["The y-intercept","The y-intercept is part of the line, not a point's error."]],t:above?"Above the line: actual > predicted, so actual − predicted is positive.":"Below the line: actual < predicted, so actual − predicted is negative."})],r)}
  const m=pick(r,[1.5,2,2.5,3,-2,-1.5]),b=m>0?pick(r,[4,6,10,12]):pick(r,[40,45,50]);const xs=[1,2,3,4,5,6].map(i=>i*pick(r,[1,2])).slice(0,5);
  const res=xs.map(()=>RD(Math.round((r()*2-1)*35)/10));if(res.every(x=>x>=0))res[1]=-Math.abs(res[1])-0.5;
  const ys=xs.map((x,i)=>RD(m*x+b+res[i]));const L=linD(m,b);
  if(v==="most"){const ab=res.map(Math.abs);let k=ab.indexOf(Math.max(...ab));if(ab.filter(a=>a===ab[k]).length>1){res[k]=RD(res[k]+(res[k]<0?-0.4:0.4));ys[k]=RD(m*xs[k]+b+res[k]);}
    k=res.map(Math.abs).indexOf(Math.max(...res.map(Math.abs)));const big=res.indexOf(Math.max(...res));
    const bad=xs.map((x,i)=>[`x = ${fmt(x)}`,`Its residual is ${fmt(res[i])}. Find the one farthest from 0.`]).filter((_,i)=>i!==k);
    if(big!==k)bad.unshift([`x = ${fmt(xs[big])}`,`${fmt(res[big])} is the biggest residual, but ${fmt(res[k])} is farther from 0. Distance from the line ignores the sign.`]);
    return item("a6_resid","Challenge",`The line of fit is ${L}. Which data point is farthest from the line?${tbl("x","y",xs,ys)}`,`x = ${fmt(xs[k])}`,bad,
      [stp(r,{p:"How do we measure how far a point is from the line?",good:"Find its residual (actual − predicted) and look at its size",bad:[["Look for the biggest y-value","A big y-value can still be right on the line."],["Look for the biggest x-value","Distance from the line is about y, not x."]],a:`Residual at x = ${fmt(xs[k])}: ${fmt(ys[k])} − ${fmt(RD(m*xs[k]+b))} = ?`,ans:res[k]})],r)}
  const i=int(r,0,4),x=xs[i],pred=RD(m*x+b),e=res[i];
  return item("a6_resid","Basic",`The line of fit for the data is ${L}. What is the residual for x = ${fmt(x)}?${tbl("x","y",xs,ys)}`,fmt(e),
    [[fmt(-e),"Residual = actual − predicted, in that order."],[fmt(pred),"That's the predicted value. Subtract it from the actual value."],[fmt(ys[i]),"That's the actual value. Subtract the predicted value from it."],[fmt(RD(ys[i]-m*x)),`The predicted value includes + ${fmt(b)}.`]].filter(z=>z[0]!==fmt(e)),
    [stp(r,{p:"What is a residual?",good:"Actual y − predicted y",bad:[["Predicted y − actual y","Always actual minus predicted."],["The predicted y","That's only one part."]],a:`Predicted y = ${fmt(m)}(${fmt(x)}) + ${fmt(b)} = ?`,ans:pred}),
     stp(r,{p:"Now?",good:`Actual ${fmt(ys[i])} − predicted ${fmt(pred)}`,bad:[[`Predicted ${fmt(pred)} − actual ${fmt(ys[i])}`,"Actual comes first."],[`Actual + predicted`,"A residual is a difference."]],a:"residual = ?",ans:e})],r)};

function residPts(r,kind){const pts=[];for(let i=0;i<10;i++){const x=RD(0.6+i*0.95);let e;
  if(kind==="good")e=RD((r()*2-1)*2.2);else if(kind==="u")e=RD(0.35*(x-5)*(x-5)-2.5+(r()*2-1)*0.4);else if(kind==="up")e=RD(0.6*(x-5)+(r()*2-1)*0.35);else e=RD(1.2+r()*1.8);pts.push([x,e])}
  if(kind==="good"){const pos=pts.filter(p=>p[1]>0).length;if(pos<3||pos>7)return residPts(r,kind)}return pts}
const RW={u:"The residuals make a U shape, so a curve fits better than a line.",up:"The residuals trend upward, so the line misses a pattern.",above:"All the residuals are above 0, so the line is too low.",good:"The residuals are scattered randomly above and below 0, so the line is a good fit."};
G.a6_rplot=(r,o)=>{const v=o.v||pick(r,VARS.a6_rplot);
  if(v==="judge"){const k=pick(r,["good","u","up","above"]);const good=k==="good"?"Yes. The residuals are scattered randomly around 0":`No. ${RW[k].split(", so")[0]}`;
    const bad=k==="good"?[["No. Some residuals are negative","A good fit has residuals both above and below 0."],["No. The residuals aren't all 0","Real data is never exactly on the line. Random scatter is what we want."],["Yes. All the residuals are positive","Look again: they're on both sides."]]
      :[["Yes. The residuals are close to 0","Small isn't enough. Look for a pattern."],["Yes. There are points on both sides of 0",k==="above"?"Look again: all of them are above 0.":"There's still a clear pattern."],[`No. ${pick(r,Object.keys(RW).filter(x=>x!=="good"&&x!==k).map(x=>RW[x].split(", so")[0]))}`,"Look at the shape again."]];
    return item("a6_rplot","Basic",`The residual plot for a line of fit is shown. Is the line a good fit for the data?${rplot(residPts(r,k))}`,good,bad,
      [stp(r,{p:"What does a residual plot look like when the line is a good fit?",good:"Points scattered randomly above and below 0, with no pattern",bad:[["All points above 0","That means the line is too low."],["Points making a U shape or a curve","A pattern means a line isn't the best model."]],t:RW[k]})],r)}
  const NM={good:"random scatter",u:"U shape",up:"upward trend",above:"all above 0"};const opts={};for(const k of ["good","u","up","above"])opts[k]=rplot(residPts(r,k),{w:150,h:110})+`<span hidden>residual plot: ${NM[k]}</span>`;
  return item("a6_rplot","Basic","Which residual plot shows that the line of fit is a good fit?",opts.good,["u","up","above"].map(k=>[opts[k],RW[k]]),
    [stp(r,{p:"What should the residuals of a good fit look like?",good:"Scattered randomly above and below 0, with no pattern",bad:[["Lined up in a straight row","A trend in the residuals means the line misses something."],["All on one side of 0","Then the line is too high or too low."]],t:"Find the plot with no shape: some points above the 0 line, some below, mixed up."})],r)};

const RDESC=r0=>{const a=Math.abs(r0),dir=r0>0?"positive":"negative";return a>=0.8?`Strong ${dir} correlation`:a>=0.4?`Weak ${dir} correlation`:"Little or no correlation"};
G.a6_r=(r,o)=>{const v=o.v||pick(r,VARS.a6_r);
  if(v==="meaning"){const r0=pick(r,[0.94,0.88,-0.91,-0.86,0.47,-0.52,0.08,-0.05]);const g=RDESC(r0);
    const all=["Strong positive correlation","Weak positive correlation","Strong negative correlation","Weak negative correlation","Little or no correlation"].filter(x=>x!==g);
    return item("a6_r","Basic",`A line of fit has correlation coefficient r = ${fmt(r0)}. What does this tell you?`,g,shuffle(r,all).map(x=>[x,x.includes(r0>0?"negative":"positive")&&Math.abs(r0)>0.2?"The sign of r gives the direction.":"The closer r is to 1 or −1, the stronger. Close to 0 means weak or none."]),
      [stp(r,{p:"What does the sign of r tell you?",good:"The direction: positive or negative",bad:[["How strong it is","Strength comes from how close r is to 1 or −1."],["The slope's exact value","r isn't the slope."]],t:"The size tells strength: near ±1 is strong, near 0 is weak.",a:`How far is r from 0? |${fmt(r0)}| = ?`,ans:Math.abs(r0)})],r)}
  if(v==="strongest"){const vals=shuffle(r,[pick(r,[-0.93,-0.89,-0.96]),pick(r,[0.81,0.76,0.84]),pick(r,[0.42,-0.38]),pick(r,[0.11,-0.07])]);const best=vals.reduce((a,b)=>Math.abs(b)>Math.abs(a)?b:a);
    return item("a6_r","Challenge","Which correlation coefficient shows the strongest linear relationship?",`r = ${fmt(best)}`,vals.filter(x=>x!==best).map(x=>[`r = ${fmt(x)}`,x>0&&best<0?`Strength is about the size, not the sign. ${fmt(best)} is closer to −1 than ${fmt(x)} is to 1.`:"Pick the value farthest from 0."]),
      [stp(r,{p:"How do we compare strength?",good:"Compare how far each r is from 0, ignoring the sign",bad:[["Pick the biggest number","A negative r can be the strongest."],["Pick the one closest to 0","Close to 0 is the weakest."]],a:`|${fmt(best)}| = ?`,ans:Math.abs(best)})],r)}
  const k=pick(r,["pos","neg"]),st=pick(r,["strong","weak"]);const d=makeScatter(r,k,st)||makeScatter(r,k,st);const fig=scat(d.pts,{xmax:10,ymax:Math.max(...d.pts.map(p=>p[1]))});
  const sg=k==="pos"?1:-1,good=st==="strong"?sg*0.95:sg*0.55,choices=[sg*0.95,sg*0.55,-sg*0.95,0.02].filter(x=>x!==good);
  return item("a6_r","Challenge",`Which value of r best fits the scatter plot?${fig}`,`r = ${fmt(good)}`,choices.map(x=>[`r = ${fmt(x)}`,Math.sign(x)!==sg&&x!==0.02?"The sign of r matches the direction of the trend.":x===0.02?"r near 0 means no trend, but this plot has one.":"Look at how tightly the points hug a line."]),
    [stp(r,{p:"Which way do the points trend from left to right?",good:k==="pos"?"Up, so r is positive":"Down, so r is negative",bad:[[k==="pos"?"Down, so r is negative":"Up, so r is positive","Read from left to right."],["No trend, so r is near 0","There is a trend here."]],t:st==="strong"?"The points are tight around a line, so r is close to ±1.":"The points are spread out, so r is farther from ±1."})],r)};

G.a6_inter=(r,o)=>{const v=o.v||pick(r,VARS.a6_inter);
  if(v==="cause"){const c=pick(r,[["ice cream sales","sunburns","hot, sunny weather"],["the number of firefighters at a fire","the damage done","the size of the fire"],["hot chocolate sales","the number of people wearing gloves","cold weather"],["the number of umbrellas sold","the number of car accidents","rainy weather"]]);
    return item("a6_inter","Word",`Data show a strong positive correlation between ${c[0]} and ${c[1]}. Which statement is best?`,`They are correlated, but one doesn't cause the other. ${c[2][0].toUpperCase()+c[2].slice(1)} likely affects both`,
      [[`${c[0][0].toUpperCase()+c[0].slice(1)} cause ${c[1]}`.replace("the number of","more"),"Correlation alone doesn't prove one causes the other."],[`${c[1][0].toUpperCase()+c[1].slice(1)} cause ${c[0]}`,"Correlation doesn't tell us which causes which, or if either does."],["There is no relationship between them","A strong correlation is a relationship, just not proof of cause."]],
      [stp(r,{p:"Does a strong correlation prove that one thing causes the other?",good:"No. Correlation is not causation",bad:[["Yes, if the correlation is strong","Even a strong correlation can come from a third cause."],["Yes, the first one always causes the second","Order in the sentence doesn't mean cause."]],t:`A third thing, ${c[2]}, makes both go up together.`})],r)}
  const lo=pick(r,[0,1,2,5]),hi=lo+pick(r,[8,10,12]),out=r()<0.5,x=out?(r()<0.7?hi+int(r,4,12):Math.max(0,lo-int(r,1,lo||1))):int(r,lo+1,hi-1);
  if(out&&x>=lo&&x<=hi)return G.a6_inter(r,{v:"which"});
  return item("a6_inter","Basic",`A line of fit was made from data with x-values from ${lo} to ${hi}. Using it to predict y at x = ${x} is an example of…`,out?"Extrapolation":"Interpolation",
    [[out?"Interpolation":"Extrapolation",out?`${x} is outside ${lo} to ${hi}. Predicting outside the data is extrapolation.`:`${x} is inside ${lo} to ${hi}. Predicting inside the data is interpolation.`],["A residual","A residual is actual − predicted for a data point."],["Causation","Causation means one thing makes another happen."]],
    [stp(r,{p:"What's the difference?",good:"Interpolation predicts inside the data's x-range. Extrapolation predicts outside it",bad:[["Interpolation is for big numbers, extrapolation for small ones","It's about inside vs. outside the data."],["They mean the same thing","Inside the data is inter-, outside is extra-."]],a:`Is ${x} between ${lo} and ${hi}? (1 = yes, 0 = no)`,ans:out?0:1})],r)};

// retry until there are 4 distinct choices
for(const k of Object.keys(G)){const f=G[k];G[k]=(r,o)=>{let it;for(let i=0;i<40;i++){it=f(r,o);if(it.opts.length>=4)return it}return it}}
