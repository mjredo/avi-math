// ===== Topic 2 (Linear Equations) + Topic 1 review generators, from the Topic 2 Test Series (Oct–Nov 2026) =====
const T2=(()=>{
// ===== Question generators: enVision Algebra 1 Topic 2 (+ Topic 1 review) =====
const MINUS = "−";
function mulberry(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function makeR(seed){const f=mulberry(seed);const R={
  f, int:(a,b)=>a+Math.floor(f()*(b-a+1)),
  nz:(a,b)=>{let v;do{v=R.int(a,b)}while(v===0);return v},
  pick:a=>a[Math.floor(f()*a.length)],
  sign:()=>f()<.5?-1:1,
  shuffle:a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(f()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
};return R}
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
function F(n,d=1){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return{n:n/g,d:d/g}}
const add=(a,b)=>F(a.n*b.d+b.n*a.d,a.d*b.d), neg=a=>F(-a.n,a.d), sub=(a,b)=>add(a,neg(b)),
  mul=(a,b)=>F(a.n*b.n,a.d*b.d), inv=a=>F(a.d,a.n), absF=a=>F(Math.abs(a.n),a.d), val=a=>a.n/a.d, eqF=(a,b)=>a.n===b.n&&a.d===b.d;
const N=x=>F(x,1);
function fs(a){return (a.n<0?MINUS:"")+(a.d===1?Math.abs(a.n):Math.abs(a.n)+"/"+a.d)}
function nm(x){ // plain number to text
  const s=Number.isInteger(x)?String(x):String(+x.toFixed(4));return s.replace("-",MINUS)}
const money=x=>"$"+x.toFixed(2);
function coefX(m){if(m.n===0)return"";if(m.d===1)return m.n===1?"x":m.n===-1?MINUS+"x":fs(m)+"x";return (m.n<0?MINUS:"")+"("+Math.abs(m.n)+"/"+m.d+")x"}
function line(m,b){let s="y = ";if(m.n!==0){s+=coefX(m);if(b.n!==0)s+=(b.n>0?" + ":" "+MINUS+" ")+fs(absF(b))}else s+=fs(b);return s}
const yPart=y=>y===0?"y":y>0?`y ${MINUS} ${y}`:`y + ${-y}`;
const xPart=x=>x===0?"x":x>0?`x ${MINUS} ${x}`:`x + ${-x}`;
function coefPS(m){if(m.d===1)return m.n===1?"":m.n===-1?MINUS:fs(m);return (m.n<0?MINUS:"")+"("+Math.abs(m.n)+"/"+m.d+")"}
const ps=(m,x1,y1)=>`${yPart(y1)} = ${coefPS(m)}(${xPart(x1)})`;
function std(A,B,C){const t=(c,v)=>(Math.abs(c)===1?"":Math.abs(c))+v;
  return (A<0?MINUS:"")+t(A,"x")+(B>0?" + ":" "+MINUS+" ")+t(B,"y")+" = "+nm(C)}
const pt=(x,y)=>`(${nm(x)}, ${nm(y)})`;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const M=s=>`<span class="m">${esc(s)}</span>`;
function mcOpts(correct,ds){const seen=new Set([correct]);const o=[{t:correct,ok:true}];
  for(const d of ds){if(d&&!seen.has(d.t)){seen.add(d.t);o.push({t:d.t,ok:false,tag:d.tag,note:d.note})}}return o}
const FR=[F(1,2),F(-1,2),F(2,3),F(-2,3),F(3,4),F(-3,4),F(3,2),F(-3,2),F(2,5),F(-2,5),F(5,2),F(-5,2),F(1,3),F(-1,3),F(4,3),F(-4,3)];
const INTS=[2,3,4,5,-2,-3,-4,-5].map(N);

const SKILLS={
 slope:"Finding slope",siPoint:"Slope-intercept from a point",siWord:"Slope-intercept word problems",
 psWrite:"Writing point-slope form",psConvert:"Point-slope to slope-intercept",psWord:"Point-slope word problems",
 stdInt:"Standard form intercepts",stdConvert:"Converting to standard form",stdSlope:"Slope from standard form",stdWord:"Standard form word problems",
 perpSlope:"Parallel and perpendicular slopes",perpLine:"Parallel/perpendicular line through a point",perpClassify:"Parallel, perpendicular, or neither",perpWord:"Perpendicular word problems",
 absEq:"Absolute value equations (Topic 1)",flip:"Inequalities with negatives (Topic 1)",absIneq:"Absolute value inequalities (Topic 1)"
};
const LESSON={slope:"2-1",siPoint:"2-1",siWord:"2-1",psWrite:"2-2",psConvert:"2-2",psWord:"2-2",stdInt:"2-3",stdConvert:"2-3",stdSlope:"2-3",stdWord:"2-3",perpSlope:"2-4",perpLine:"2-4",perpClassify:"2-4",perpWord:"2-4",absEq:"1-7",flip:"1-5",absIneq:"1-7"};
const WORD=new Set(["siWord","psWord","stdWord","perpWord"]);

const GEN={
slope(R,lvl){
  if(lvl==="hard"){
    const m=R.pick([2,3,4,-2,-3,-4]),x2=R.int(-5,5),y2=R.int(-6,6),dk=R.pick([1,2,3,-1,-2]),k=x2+dk,y1=y2+m*dk;
    return{type:"num",ans:k,ansText:nm(k),
      prompt:`The line through ${M(`(k, ${nm(y1)})`)} and ${M(pt(x2,y2))} has slope ${M(nm(m))}. What is k?`,
      steps:[{n:`Find the change in y between the points: ${nm(y1)} ${MINUS} (${nm(y2)}) = ?`,a:y1-y2,h:"Subtracting a negative is the same as adding."},
        {c:`The change in x is k ${MINUS} ${nm(x2)}. Which equation says the slope is ${nm(m)}?`,o:[`${nm(y1-y2)} ÷ (k ${MINUS} ${nm(x2)}) = ${nm(m)}`,`(k ${MINUS} ${nm(x2)}) ÷ ${nm(y1-y2)} = ${nm(m)}`,`${nm(y1-y2)} × (k ${MINUS} ${nm(x2)}) = ${nm(m)}`],h:"Slope = rise ÷ run. The rise goes on top."},
        {n:`Solve: what does k ${MINUS} ${nm(x2)} equal?`,a:dk,h:`Divide ${nm(y1-y2)} by ${nm(m)}.`},
        {n:"So what is k?",a:k}],
      ex:`Slope = (${nm(y1)} ${MINUS} ${nm(y2)}) ÷ (k ${MINUS} ${nm(x2)}) = ${nm(m)}, so k ${MINUS} ${nm(x2)} = ${nm(dk)} and k = ${nm(k)}.`};
  }
  const m=R.pick(FR.concat(INTS)),mult=R.pick([1,2]),dx=m.d*mult*R.sign(),x1=R.int(-6,6),y1=R.int(-8,8),x2=x1+dx,y2=y1+m.n*mult*Math.sign(dx);
  return{type:"num",ans:val(m),ansText:fs(m),prompt:`Find the slope of the line through ${M(pt(x1,y1))} and ${M(pt(x2,y2))}.`,
    steps:[{n:`Change in y: ${nm(y2)} ${MINUS} (${nm(y1)}) = ?`,a:y2-y1,h:"Second y minus first y. Watch double negatives."},
      {n:`Change in x: ${nm(x2)} ${MINUS} (${nm(x1)}) = ?`,a:x2-x1,h:"Second x minus first x, in the same order as the y's."},
      {n:"Slope = change in y ÷ change in x. Simplify (fraction or decimal).",a:val(m),s:fs(m)}],
    ex:`(${nm(y2)} ${MINUS} ${nm(y1)}) ÷ (${nm(x2)} ${MINUS} ${nm(x1)}) = ${nm(y2-y1)} ÷ ${nm(x2-x1)} = ${fs(m)}.`};
},
siPoint(R,lvl){
  const m=lvl==="hard"?R.pick(FR.filter(f=>f.d<=4)):R.pick(INTS),x1=m.d*R.nz(-3,3),y1=R.nz(-7,7),b=sub(N(y1),mul(m,N(x1))),mx=mul(m,N(x1));
  const opts=mcOpts(line(m,b),[{t:line(m,N(y1)),tag:"used-y-as-b",note:"The point's y-value is only the y-intercept when x = 0."},
    {t:line(m,add(N(y1),mx)),tag:"sign-solving-b",note:`Solve ${nm(y1)} = ${fs(mx)} + b by subtracting ${fs(mx)} from both sides.`},
    {t:line(inv(m),sub(N(y1),mul(inv(m),N(x1)))),tag:"reciprocal-slope",note:"The slope stays as given; don't flip it."},
    {t:line(neg(m),sub(N(y1),mul(neg(m),N(x1)))),tag:"slope-sign",note:"Keep the slope's sign."}]);
  return{type:"mc",opts,prompt:`Write the equation of the line with slope ${M(fs(m))} through ${M(pt(x1,y1))} in slope-intercept form.`,
    steps:[{c:"Start from y = mx + b. What do you substitute?",o:[`m = ${fs(m)}, x = ${nm(x1)}, y = ${nm(y1)}`,`m = ${fs(m)}, x = ${nm(y1)}, y = ${nm(x1)}`,`m = ${nm(x1)}, x = ${fs(m)}, y = ${nm(y1)}`],h:"A point is written (x, y): x comes first."},
      {n:`What is ${fs(m)} × ${nm(x1)}?`,a:val(mx),s:fs(mx)},
      {n:`Now ${nm(y1)} = ${fs(mx)} + b. What is b?`,a:val(b),s:fs(b),h:`Subtract ${fs(mx)} from both sides (subtracting a negative means adding).`}],
    ex:`${nm(y1)} = ${fs(m)}(${nm(x1)}) + b → ${nm(y1)} = ${fs(mx)} + b → b = ${fs(b)}. So ${line(m,b)}.`};
},
siWord(R,lvl){
  if(lvl!=="hard"){
    const c=R.pick([{w:"A plumber charges",f:"for a house call",u:"hour"},{w:"A bike shop charges",f:"to rent a bike",u:"hour"},{w:"A moving company charges",f:"per job",u:"hour"},{w:"A music app charges",f:"as a sign-up fee",u:"month"}]);
    const fee=R.int(3,18)*5,rate=R.int(4,12)*(c.u==="month"?1:5),n=R.int(3,9),T=fee+rate*n;
    return{type:"num",ans:n,ansText:nm(n),word:1,prompt:`${c.w} $${fee} ${c.f} plus $${rate} per ${c.u}. The total bill was $${T}. How many ${c.u}s were charged?`,
      steps:[{c:`Let n = number of ${c.u}s. Which equation fits?`,o:[`${T} = ${rate}n + ${fee}`,`${T} = ${fee}n + ${rate}`,`${T} = ${rate+fee}n`],h:"The one-time amount is the starting value b. The repeating amount is the rate m."},
        {n:`Subtract ${fee} from both sides. What does ${rate}n equal?`,a:T-fee},{n:"Divide. n = ?",a:n}],
      ex:`${T} = ${rate}n + ${fee} → ${rate}n = ${T-fee} → n = ${n}.`};
  }
  const c=R.pick([
    {lead:"A phone battery drains at a constant rate.",t:"hour",dir:-1,at:(t,v)=>`After ${t} it shows ${v}%.`,q:t=>`What will it show after ${t} (in %)?`},
    {lead:"A water tank drains at a constant rate.",t:"minute",dir:-1,at:(t,v)=>`After ${t} it holds ${v} gallons.`,q:t=>`How many gallons will it hold after ${t}?`},
    {lead:"A sunflower grows at a constant rate.",t:"week",dir:1,at:(t,v)=>`After ${t} it is ${v} cm tall.`,q:t=>`How tall will it be after ${t} (in cm)?`},
    {lead:"Maya adds the same amount to her savings every week.",t:"week",dir:1,at:(t,v)=>`After ${t} she has $${v}.`,q:t=>`How much will she have after ${t} (in dollars)?`}]);
  const r=c.dir*R.pick([3,4,5,6,8]),t1=R.int(1,3),t2=t1+R.int(2,4),t3=t2+R.pick([1.5,2,2.5,3,4]);
  const v1=c.dir<0?Math.abs(r)*(t3-t1)+R.int(2,8)*5:R.int(2,12)*5,v2=v1+r*(t2-t1),v3=v1+r*(t3-t1);
  const ts=t=>`${nm(t)} ${t===1?c.t:c.t+"s"}`;
  const prompt=`${c.lead} ${c.at(ts(t1),nm(v1))} ${c.at(ts(t2),nm(v2))} ${c.q(ts(t3))}`;
  return{type:"num",ans:v3,ansText:nm(v3),word:1,prompt,
    steps:[{n:`How many ${c.t}s pass from ${nm(t1)} to ${nm(t2)}?`,a:t2-t1},{n:`How much did it change in that time? (${nm(v2)} ${MINUS} ${nm(v1)})`,a:v2-v1,h:"If it went down, the change is negative."},
      {n:`Rate = change ÷ time. How much per ${c.t}?`,a:r},{n:`How many ${c.t}s from ${nm(t1)} to ${nm(t3)}?`,a:t3-t1},
      {n:`Start at ${nm(v1)} and add rate × time: ${nm(v1)} + (${nm(r)})(${nm(t3-t1)}) = ?`,a:v3,h:"Multiply first, then add (adding a negative means going down)."}],
    ex:`Rate = (${nm(v2)} ${MINUS} ${nm(v1)}) ÷ ${nm(t2-t1)} = ${nm(r)} per ${c.t}. From ${c.t} ${nm(t1)} to ${nm(t3)} is ${nm(t3-t1)} ${c.t}s, so ${nm(v1)} + (${nm(r)})(${nm(t3-t1)}) = ${nm(v3)}.`};
},
psWrite(R,lvl){
  let x1=R.nz(-6,6),y1=R.nz(-6,6);if(x1>0&&y1>0){if(R.f()<.5)x1=-x1;else y1=-y1}
  if(lvl==="hard"){
    const m=R.pick(INTS.concat(FR.filter(f=>Math.abs(f.n)<=3&&f.d<=3))),k=R.pick([1,2]),x2=x1+m.d*k,y2=y1+m.n*k;
    const opts=mcOpts(ps(m,x1,y1),[{t:ps(neg(m),x1,y1),tag:"slope-sign",note:"Check the sign of the slope: rise ÷ run with the signs kept."},
      {t:ps(m,-x1,y1),tag:"sign-x1",note:`x ${MINUS} x₁ with x₁ = ${nm(x1)} is ${xPart(x1)}.`},
      {t:ps(inv(m),x1,y1),tag:"run-over-rise",note:"Slope is rise ÷ run (change in y on top)."},
      {t:ps(m,x1,-y1),tag:"sign-y1",note:`y ${MINUS} y₁ with y₁ = ${nm(y1)} is ${yPart(y1)}.`}]);
    return{type:"mc",opts,prompt:`Which is an equation of the line through ${M(pt(x1,y1))} and ${M(pt(x2,y2))}?`,
      steps:[{n:`Find the slope: (${nm(y2)} ${MINUS} (${nm(y1)})) ÷ (${nm(x2)} ${MINUS} (${nm(x1)})) = ?`,a:val(m),s:fs(m),h:"Subtracting a negative means adding."},
        {c:`Using the point ${pt(x1,y1)}, what is y ${MINUS} y₁?`,o:[y1<0?`y ${MINUS} (${nm(y1)}), which is ${yPart(y1)}`:yPart(y1),yPart(-y1)]},
        {c:`What is x ${MINUS} x₁?`,o:[x1<0?`x ${MINUS} (${nm(x1)}), which is ${xPart(x1)}`:xPart(x1),xPart(-x1)],h:"Subtracting a negative turns into adding."}],
      ex:`Slope = ${nm(y2-y1)} ÷ ${nm(x2-x1)} = ${fs(m)}. Using ${pt(x1,y1)}: ${ps(m,x1,y1)}.`};
  }
  const m=R.pick(INTS.concat(FR.slice(0,8)));
  const opts=mcOpts(ps(m,x1,y1),[{t:ps(m,-x1,y1),tag:"sign-x1",note:`x ${MINUS} x₁ with x₁ = ${nm(x1)} is ${xPart(x1)}.`},{t:ps(m,x1,-y1),tag:"sign-y1",note:`y ${MINUS} y₁ with y₁ = ${nm(y1)} is ${yPart(y1)}.`},{t:ps(m,y1,x1),tag:"swap-xy",note:"x₁ goes with x and y₁ goes with y."},(val(m)*x1===y1?null:{t:ps(m,-x1,-y1),tag:"sign-both",note:"Both signs are flipped. Use y − y₁ and x − x₁ with the point's own signs."})]);
  return{type:"mc",opts,prompt:`Which is the point-slope equation of the line through ${M(pt(x1,y1))} with slope ${M(fs(m))}?`,
    steps:[{c:"Point-slope form is…",o:[`y ${MINUS} y₁ = m(x ${MINUS} x₁)`,"y = mx + b","Ax + By = C"]},
      {c:`y₁ = ${nm(y1)}. What is y ${MINUS} y₁?`,o:[y1<0?`y ${MINUS} (${nm(y1)}), which is ${yPart(y1)}`:yPart(y1),yPart(-y1)]},
      {c:`x₁ = ${nm(x1)}. What is x ${MINUS} x₁?`,o:[x1<0?`x ${MINUS} (${nm(x1)}), which is ${xPart(x1)}`:xPart(x1),xPart(-x1)],h:"Subtracting a negative turns into adding."}],
    ex:`y ${MINUS} y₁ = m(x ${MINUS} x₁) with ${pt(x1,y1)} and m = ${fs(m)}: ${ps(m,x1,y1)}.`};
},
psConvert(R,lvl){
  const m=lvl==="hard"?R.pick(FR):R.pick(INTS),x1=m.d*R.nz(-3,3),y1=R.nz(-8,8),c=neg(mul(m,N(x1))),b=add(c,N(y1));
  const opts=mcOpts(line(m,b),[{t:line(m,add(mul(m,N(x1)),N(y1))),tag:"distribute-sign",note:`${fs(m)} × (${xPart(x1).slice(2)}) — watch the sign when you distribute.`},
    {t:line(m,N(y1-x1)),tag:"distribute-skip",note:`Distribute ${fs(m)} to both terms in the parentheses.`},
    {t:line(m,sub(c,N(y1))),tag:"move-constant",note:`To undo ${yPart(y1).slice(2)}, do the opposite to both sides.`}]);
  return{type:"mc",opts,prompt:`Rewrite ${M(ps(m,x1,y1))} in slope-intercept form.`,
    steps:[{c:"What is the first step?",o:[`Distribute ${fs(m)} to both x and ${nm(-x1)}`,`Multiply only the x by ${fs(m)}`,"Move the y-term into the parentheses"],h:"The number in front multiplies everything inside the parentheses."},
      {n:`What is ${fs(m)} × (${nm(-x1)})?`,a:val(c),s:fs(c)},
      {n:`Now ${yPart(y1)} = ${coefX(m)} ${c.n<0?MINUS:"+"} ${fs(absF(c))}. Get y alone: what is the constant?`,a:val(b),s:fs(b),h:y1<0?`Subtract ${-y1} from both sides.`:`Add ${y1} to both sides.`}],
    ex:`Distribute: ${yPart(y1)} = ${coefX(m)} ${c.n<0?MINUS:"+"} ${fs(absF(c))}. Then ${y1<0?"subtract "+(-y1):"add "+y1}: ${line(m,b)}.`};
},
psWord(R,lvl){
  const c=R.pick(["candle","taxi","pool","hike"]);
  if(c==="taxi"){
    const r=R.pick([1.5,2,2.25,2.5,3]),base=R.pick([2.5,3,3.5,4]),x1=R.int(2,5),x2=x1+R.int(3,6),x3=x2+R.int(4,9),y=x=>base+r*x;
    return{type:"num",ans:y(x3),ansText:money(y(x3)),word:1,prompt:`A ${x1}-mile taxi ride costs ${money(y(x1))} and a ${x2}-mile ride costs ${money(y(x2))}. The cost is linear. What does a ${x3}-mile ride cost (in dollars)?`,
      steps:[{n:`Slope = (${y(x2).toFixed(2)} ${MINUS} ${y(x1).toFixed(2)}) ÷ (${x2} ${MINUS} ${x1}) = ? dollars per mile`,a:r},
        {n:`How many more miles is ${x3} than ${x1}?`,a:x3-x1},{n:`How much more does that cost? (rate × miles)`,a:r*(x3-x1)},
        {n:`Total: ${y(x1).toFixed(2)} + that = ?`,a:y(x3)}],
      ex:`Rate = ${money(y(x2)-y(x1))} ÷ ${x2-x1} = ${money(r)} per mile. y ${MINUS} ${y(x1).toFixed(2)} = ${r}(x ${MINUS} ${x1}); at x = ${x3}: ${y(x1).toFixed(2)} + ${r}(${x3-x1}) = ${money(y(x3))}.`};
  }
  const cfg={candle:{r:-R.pick([1,2,3]),u:"cm",t:"hour",lead:"A candle burns down at a constant rate.",a:(x,v)=>`After ${x} hours it is ${v} cm tall.`,q:"How tall was it before it was lit (in cm)?"},
    pool:{r:R.pick([15,20,25,30]),u:"gallons",t:"minute",lead:"A hose fills a pool at a constant rate. There was already some water in the pool.",a:(x,v)=>`After ${x} minutes the pool holds ${v} gallons.`,q:"How many gallons were in the pool before the hose was turned on?"},
    hike:{r:-R.pick([150,200,250,300]),u:"feet",t:"hour",lead:"A hiker walks down a mountain at a constant rate.",a:(x,v)=>`After ${x} hours she is at ${v} feet.`,q:"At what elevation did she start (in feet)?"}}[c];
  const x1=R.int(1,4),x2=x1+R.int(2,4),y0=cfg.r<0?(-cfg.r)*(x2+R.int(2,6))*(c==="hike"?1:1):R.int(4,20)*10,y1=y0+cfg.r*x1,y2=y0+cfg.r*x2;
  return{type:"num",ans:y0,ansText:nm(y0),word:1,prompt:`${cfg.lead} ${cfg.a(x1,y1)} ${cfg.a(x2,y2)} ${cfg.q}`,
    steps:[{n:`Slope = (${nm(y2)} ${MINUS} ${nm(y1)}) ÷ (${x2} ${MINUS} ${x1}) = ? ${cfg.u} per ${cfg.t}`,a:cfg.r,h:"If the amount goes down, the slope is negative."},
      {c:`"Before it started" means which x-value?`,o:["x = 0",`x = ${x1}`,`x = ${y1}`],h:`x counts ${cfg.t}s since it started.`},
      {n:`Going from x = ${x1} back to x = 0 is a change in x of 0 ${MINUS} ${x1} = ?`,a:-x1},
      {n:`Change in y = slope × change in x = (${nm(cfg.r)})(${nm(-x1)}) = ?`,a:-cfg.r*x1,h:"Negative × negative is positive."},
      {n:`So y at x = 0 is ${nm(y1)} + that = ?`,a:y0}],
    ex:`Slope = ${nm(y2-y1)} ÷ ${x2-x1} = ${nm(cfg.r)}. Point-slope: y ${MINUS} ${nm(y1)} = ${nm(cfg.r)}(x ${MINUS} ${x1}). At x = 0: y = ${nm(y1)} + (${nm(cfg.r)})(${nm(-x1)}) = ${nm(y0)}.`};
},
stdInt(R){
  const A=R.pick([2,3,4,5,6,-2,-3,-4]),B=R.pick([2,3,4,5,-2,-3,-5]),L=Math.abs(A*B)/gcd(A,B),C=L*R.nz(-3,3)*R.pick([1,2]),xi=C/A,yi=C/B;
  const S=(a,b)=>`x-intercept ${nm(a)}, y-intercept ${nm(b)}`;
  const opts=mcOpts(S(xi,yi),[{t:S(yi,xi),tag:"swap-intercepts",note:"For the x-intercept set y = 0 (not x = 0)."},{t:S(A,B),tag:"coefficients",note:"The coefficients aren't the intercepts; divide C by them."},{t:S(-xi,-yi),tag:"intercept-sign",note:"Keep the signs when you divide."},{t:S(C,C),tag:"no-divide",note:"Divide C by the coefficient."}]);
  return{type:"mc",opts,prompt:`What are the intercepts of ${M(std(A,B,C))}?`,
    steps:[{c:"To find the x-intercept, which variable do you set to 0?",o:["y","x"],h:"The x-intercept is on the x-axis, where y = 0."},{n:`With y = 0: ${nm(A)}x = ${nm(C)}. x = ?`,a:xi},{n:`With x = 0: ${nm(B)}y = ${nm(C)}. y = ?`,a:yi}],
    ex:`y = 0 → x = ${nm(C)} ÷ ${nm(A)} = ${nm(xi)}. x = 0 → y = ${nm(C)} ÷ ${nm(B)} = ${nm(yi)}.`};
},
stdConvert(R){
  const q=R.pick([2,3,4,5]);let p;do{p=R.nz(-5,5)}while(gcd(p,q)!==1);const b=R.nz(-7,7),m=F(p,q);
  let A=-p,B=q,C=q*b;if(A<0){A=-A;B=-B;C=-C}
  const opts=mcOpts(std(A,B,C),[{t:std(A,B,-C),tag:"constant-sign",note:"Check the sign of the constant after moving terms."},{t:std(A,-B,C),tag:"y-sign",note:"Check the sign of the y-term after moving the x-term."},{t:std(A,B,C/q),tag:"multiply-all",note:`Multiply every term by ${q}, including the constant.`},{t:std(A,-B,-C),tag:"sign-both",note:"Check signs when moving terms."}]);
  return{type:"mc",opts,prompt:`Write ${M(line(m,N(b)))} in standard form Ax + By = C, with integers and A > 0.`,
    steps:[{c:`How do you clear the fraction?`,o:[`Multiply every term by ${q}`,`Multiply only the x-term by ${q}`,`Divide every term by ${q}`],h:"Whatever you do to one term, do to every term."},
      {c:`After multiplying by ${q} you get…`,o:[`${q}y = ${nm(p)}x ${q*b<0?MINUS:"+"} ${Math.abs(q*b)}`,`${q}y = ${nm(p)}x ${b<0?MINUS:"+"} ${Math.abs(b)}`,`y = ${nm(p)}x ${q*b<0?MINUS:"+"} ${Math.abs(q*b)}`],h:`The constant ${nm(b)} gets multiplied by ${q} too.`},
      {c:`Move the x-term to the left side. Which is right?`,o:[std(-p,q,q*b),std(p,q,q*b),std(-p,q,-q*b)],h:"Subtract the x-term from both sides. The constant stays on the right."},
      {c:"Is A positive? If not, multiply every term by −1. Final answer:",o:[std(A,B,C),std(A,B,-C),std(-A,B,C)].filter((v,i,a)=>a.indexOf(v)===i)}],
    ex:`Multiply by ${q}: ${q}y = ${nm(p)}x ${q*b<0?MINUS:"+"} ${Math.abs(q*b)}. Move the x-term: ${std(-p,q,q*b)}.${p>0?" Multiply by −1 so A > 0: "+std(A,B,C)+".":""}`};
},
stdSlope(R){
  let A,B;do{A=R.nz(-6,6);B=R.nz(-6,6)}while(Math.abs(A)===Math.abs(B)||Math.abs(B)===1);
  const C=B*R.nz(-4,4),m=F(-A,B),b=F(C,B);
  return{type:"num",ans:val(m),ansText:fs(m),prompt:`What is the slope of ${M(std(A,B,C))}?`,
    steps:[{c:"Get y alone. First move the x-term:",o:[`${nm(B)}y = ${nm(-A)}x + ${nm(C)}`.replace("+ "+MINUS,MINUS+" "),`${nm(B)}y = ${nm(A)}x + ${nm(C)}`.replace("+ "+MINUS,MINUS+" "),`${nm(B)}y = ${nm(-A)}x ${MINUS} ${nm(C)}`]},
      {c:`Divide every term by ${nm(B)}:`,o:[line(m,b),line(neg(m),b),line(m,neg(b))].filter((v,i,a)=>a.indexOf(v)===i),h:"Dividing by a negative changes the sign of every term."},
      {n:"So the slope is…",a:val(m),s:fs(m)}],
    ex:`${std(A,B,C)} → ${nm(B)}y = ${nm(-A)}x + ${nm(C)} → ${line(m,b)}. Slope = ${fs(m)}. (Shortcut: slope = −A ÷ B.)`};
},
stdWord(R,lvl){
  const c=R.pick([{a:"adult tickets",b:"student tickets",who:"The drama club"},{a:"large pizzas",b:"small pizzas",who:"The pizza shop"},{a:"T-shirts",b:"hats",who:"The team store"},{a:"cases of water",b:"bags of ice",who:"The snack stand"}]);
  if(lvl!=="hard"){
    const pa=R.pick([8,9,10,12,14,15]),pb=R.pick([4,5,6,7]),x=R.int(12,40),y=R.int(10,40),T=pa*x+pb*y;
    return{type:"num",ans:y,ansText:nm(y),word:1,prompt:`${c.who} sells ${c.a} for $${pa} each and ${c.b} for $${pb} each. It made $${T}. If ${x} ${c.a} were sold, how many ${c.b} were sold?`,
      steps:[{c:`Let x = ${c.a} and y = ${c.b}. Which equation fits?`,o:[`${pa}x + ${pb}y = ${T}`,`${pb}x + ${pa}y = ${T}`,`${pa}x + ${pb}y = ${x}`],h:"(price × number) + (price × number) = total money."},
        {n:`Plug in x = ${x}. What is ${pa} × ${x}?`,a:pa*x},{n:`${pa*x} + ${pb}y = ${T}. What does ${pb}y equal?`,a:T-pa*x},{n:"So y = ?",a:y}],
      ex:`${pa}(${x}) + ${pb}y = ${T} → ${pb}y = ${T-pa*x} → y = ${y}.`};
  }
  let pa,pb,T;do{pa=R.pick([6,8,10,12,15]);pb=R.pick([3,4,5,6,8]);T=(pa*pb/gcd(pa,pb))*R.int(6,15)}while(pa===pb||T/pa===T/pb);
  const yi=T/pb,xi=T/pa,askY=R.f()<.5;
  const correct=askY?`(0, ${yi}) means: if no ${c.a} were sold, ${yi} ${c.b} were sold.`:`(${xi}, 0) means: if no ${c.b} were sold, ${xi} ${c.a} were sold.`;
  const ds=askY?[{t:`(0, ${xi}) means: if no ${c.a} were sold, ${xi} ${c.b} were sold.`,tag:"intercept-value",note:`Set x = 0: ${pb}y = ${T}, so y = ${yi}.`},{t:`(${yi}, 0) means: ${yi} ${c.a} were sold and no ${c.b}.`,tag:"intercept-swap",note:"In (x, y), x is the first number. On the y-intercept x = 0."},{t:`(0, ${yi}) means: ${yi} ${c.a} were sold.`,tag:"intercept-variable",note:`x stands for ${c.a}; in (0, ${yi}) x = 0.`}]
    :[{t:`(${yi}, 0) means: if no ${c.b} were sold, ${yi} ${c.a} were sold.`,tag:"intercept-value",note:`Set y = 0: ${pa}x = ${T}, so x = ${xi}.`},{t:`(0, ${xi}) means: ${xi} ${c.a} were sold and no ${c.b}.`,tag:"intercept-swap",note:"On the x-intercept y = 0, so it's written (x, 0)."},{t:`(${xi}, 0) means: ${xi} ${c.b} were sold.`,tag:"intercept-variable",note:`x stands for ${c.a}.`}];
  return{type:"mc",opts:mcOpts(correct,ds),word:1,prompt:`${c.who}'s sales are modeled by ${M(`${pa}x + ${pb}y = ${T}`)}, where x = ${c.a} and y = ${c.b}. Which statement is true?`,
    steps:[{c:`On the ${askY?"y":"x"}-intercept, which variable is 0?`,o:askY?["x","y"]:["y","x"],h:`The ${askY?"y":"x"}-intercept sits on the ${askY?"y":"x"}-axis.`},
      {c:`What does ${askY?"x":"y"} = 0 mean here?`,o:askY?[`No ${c.a} were sold`,`No ${c.b} were sold`]:[`No ${c.b} were sold`,`No ${c.a} were sold`]},
      {n:askY?`With x = 0: ${pb}y = ${T}. y = ?`:`With y = 0: ${pa}x = ${T}. x = ?`,a:askY?yi:xi},
      {c:"So the intercept point is…",o:askY?[`(0, ${yi})`,`(${yi}, 0)`]:[`(${xi}, 0)`,`(0, ${xi})`],h:"Points are (x, y)."}],
    ex:`x = 0 → y = ${T} ÷ ${pb} = ${yi}: (0, ${yi}) means only ${c.b}. y = 0 → x = ${T} ÷ ${pa} = ${xi}: (${xi}, 0) means only ${c.a}.`};
},
perpSlope(R,lvl){
  const m=R.pick(FR.concat([2,3,4,5,-2,-3,-4].map(N))),perp=R.f()<.8,want=perp?neg(inv(m)):m;
  let given;
  if(lvl==="hard"){let A=-m.n,B=m.d;if(A<0){A=-A;B=-B}given=std(A,B,B*R.nz(-4,4))}else given=line(m,N(R.nz(-6,6)));
  const opts=mcOpts(fs(want),perp?[{t:fs(m),tag:"same-slope",note:"Equal slopes make lines parallel, not perpendicular."},{t:fs(inv(m)),tag:"reciprocal-only",note:"Flip the fraction AND change the sign."},{t:fs(neg(m)),tag:"opposite-only",note:"Change the sign AND flip the fraction."}]
    :[{t:fs(neg(inv(m))),tag:"perp-for-parallel",note:"That's the perpendicular slope. Parallel lines have the same slope."},{t:fs(inv(m)),tag:"reciprocal-only",note:"Parallel slopes are equal; no flipping."},{t:fs(neg(m)),tag:"opposite-only",note:"Parallel slopes are equal; keep the sign."}]);
  const steps=[];
  if(lvl==="hard")steps.push({n:`First find the slope of ${given} (solve for y).`,a:val(m),s:fs(m),h:"Slope = −A ÷ B."});
  steps.push({c:`A ${perp?"perpendicular":"parallel"} line's slope is…`,o:perp?["the opposite reciprocal: flip the fraction AND change the sign","the same slope","just the reciprocal","just the opposite"]:["the same slope","the opposite reciprocal","just the reciprocal"]});
  if(perp)steps.push({n:`Flip ${fs(m)} upside down. What is its reciprocal?`,a:val(inv(m)),s:fs(inv(m))});
  return{type:"mc",opts,prompt:`What is the slope of a line ${perp?"perpendicular":"parallel"} to ${M(given)}?`,steps,
    ex:`The slope of ${given} is ${fs(m)}. ${perp?`Perpendicular → opposite reciprocal: ${fs(want)}. Check: ${fs(m)} × ${fs(want)} = −1.`:`Parallel → same slope: ${fs(want)}.`}`};
},
perpLine(R,lvl){
  const m=R.pick(FR.filter(f=>f.d<=3).concat([2,3,-2,-3,4].map(N))),perp=lvl==="hard"?R.f()<.75:R.f()<.5,s=perp?neg(inv(m)):m,o=perp?m:neg(inv(m));
  const x1=s.d*R.nz(-3,3),y1=R.nz(-6,6),b=sub(N(y1),mul(s,N(x1))),sx=mul(s,N(x1));
  let given;if(lvl==="hard"){let A=-m.n,B=m.d;if(A<0){A=-A;B=-B}given=std(A,B,B*R.nz(-4,4))}else given=line(m,N(R.nz(-6,6)));
  const opts=mcOpts(line(s,b),[{t:line(o,sub(N(y1),mul(o,N(x1)))),tag:perp?"same-slope":"perp-for-parallel",note:perp?"That line is parallel. Perpendicular needs the opposite reciprocal slope.":"That line is perpendicular. Parallel needs the same slope."},
    {t:line(s,add(N(y1),sx)),tag:"sign-solving-b",note:`Solve ${nm(y1)} = ${fs(sx)} + b carefully: subtract ${fs(sx)} from both sides.`},{t:line(s,N(y1)),tag:"used-y-as-b",note:"The point's y-value is not the y-intercept."},
    {t:line(neg(s),sub(N(y1),mul(neg(s),N(x1)))),tag:"slope-sign",note:"Check the sign of the new slope."}]);
  const steps=[];
  if(lvl==="hard")steps.push({n:`What is the slope of ${given}?`,a:val(m),s:fs(m),h:"Solve for y, or use slope = −A ÷ B."});
  steps.push({c:`The new line is ${perp?"perpendicular":"parallel"}. What slope does it need?`,o:[fs(s),fs(o),fs(neg(s))].filter((v,i,a)=>a.indexOf(v)===i),h:perp?"Opposite reciprocal: flip and change the sign.":"Parallel → same slope."},
    {n:`Substitute ${pt(x1,y1)} into y = ${coefX(s)} + b. What is ${fs(s)} × ${nm(x1)}?`,a:val(sx),s:fs(sx)},
    {n:`Now ${nm(y1)} = ${fs(sx)} + b. What is b?`,a:val(b),s:fs(b),h:`Subtract ${fs(sx)} from both sides.`});
  return{type:"mc",opts,prompt:`Which line is ${perp?"perpendicular":"parallel"} to ${M(given)} and passes through ${M(pt(x1,y1))}?`,steps,
    ex:`Slope of ${given}: ${fs(m)}. ${perp?"Perpendicular":"Parallel"} slope: ${fs(s)}. ${nm(y1)} = ${fs(s)}(${nm(x1)}) + b → b = ${fs(b)}. So ${line(s,b)}.`};
},
perpClassify(R){
  const m1=R.pick(FR.filter(f=>f.d<=3).concat([2,3,-2,-3].map(N))),kind=R.pick(["parallel","perpendicular","neither","neither"]);
  const m2=kind==="parallel"?m1:kind==="perpendicular"?neg(inv(m1)):R.pick([inv(m1),neg(m1)]);
  let A=-m1.n,B=m1.d;if(A<0){A=-A;B=-B}const k=R.nz(-4,4),C=B*k;let b2;do{b2=R.nz(-6,6)}while(b2===k);
  const ans={parallel:"Parallel",perpendicular:"Perpendicular",neither:"Neither"}[kind];
  const tagFor={Parallel:"called-parallel",Perpendicular:"called-perpendicular",Neither:"called-neither"};
  const opts=mcOpts(ans,["Parallel","Perpendicular","Neither"].filter(x=>x!==ans).map(x=>({t:x,tag:tagFor[x],note:x==="Perpendicular"?"Perpendicular needs the product of the slopes to be −1 (flip AND change sign).":x==="Parallel"?"Parallel needs equal slopes.":"Compare the slopes: equal → parallel; product −1 → perpendicular."})));
  return{type:"mc",opts,prompt:`Are ${M(std(A,B,C))} and ${M(line(m2,N(b2)))} parallel, perpendicular, or neither?`,
    steps:[{n:`Slope of ${std(A,B,C)}? (solve for y)`,a:val(m1),s:fs(m1),h:"Slope = −A ÷ B."},{n:`Slope of ${line(m2,N(b2))}?`,a:val(m2),s:fs(m2)},
      {c:"Are the two slopes equal?",o:eqF(m1,m2)?["Yes","No"]:["No","Yes"]},{n:"Multiply the two slopes. What do you get?",a:val(mul(m1,m2)),s:fs(mul(m1,m2)),h:"Multiply numerators and denominators."}],
    ex:`Slopes: ${fs(m1)} and ${fs(m2)}. ${kind==="parallel"?"Equal → parallel.":kind==="perpendicular"?`Product = ${fs(mul(m1,m2))} → perpendicular.`:`Not equal, and product = ${fs(mul(m1,m2))} (not −1) → neither.`}`};
},
perpWord(R){
  const [a,bb]=R.pick([[6,4],[4,2],[6,3],[4,8],[6,9],[2,4],[6,12],[9,6],[8,4],[10,5]]),sgn=R.sign(),a2=a,b2=bb*sgn;
  const road=F(b2,a2),s=neg(inv(road)),bi=sub(N(b2),mul(s,N(a2))),sx=mul(s,N(a2));
  const ctx=R.pick([["road","bike path"],["fence","garden path"],["pipe","drain line"]]);
  const opts=mcOpts(line(s,bi),[{t:line(road,N(0)),tag:"same-slope",note:`That's the ${ctx[0]} itself.`},{t:line(s,add(N(b2),sx)),tag:"sign-solving-b",note:"Solve for b carefully."},{t:line(inv(road),sub(N(b2),mul(inv(road),N(a2)))),tag:"reciprocal-only",note:"A right angle needs the opposite reciprocal (flip AND change sign)."},{t:line(neg(road),sub(N(b2),mul(neg(road),N(a2)))),tag:"opposite-only",note:"Flip the fraction too."}]);
  return{type:"mc",opts,word:1,prompt:`On a site map, a ${ctx[0]} runs through ${M("(0, 0)")} and ${M(pt(a2,b2))}. A ${ctx[1]} will meet it at a right angle at ${M(pt(a2,b2))}. Which equation describes the ${ctx[1]}?`,
    steps:[{n:`Slope of the ${ctx[0]}: ${nm(b2)} ÷ ${a2} = ?`,a:val(road),s:fs(road)},{c:`A right angle means perpendicular. The ${ctx[1]}'s slope is…`,o:[fs(s),fs(road),fs(inv(road))].filter((v,i,x)=>x.indexOf(v)===i)},
      {n:`Substitute ${pt(a2,b2)}: what is ${fs(s)} × ${a2}?`,a:val(sx),s:fs(sx)},{n:`${nm(b2)} = ${fs(sx)} + b. b = ?`,a:val(bi),s:fs(bi)}],
    ex:`${ctx[0]} slope = ${fs(road)}, so the perpendicular slope is ${fs(s)}. ${nm(b2)} = ${fs(s)}(${a2}) + b → b = ${fs(bi)}. ${line(s,bi)}.`};
},
absEq(R){
  const a=R.pick([-2,-3,-4,2,3,5]),k=R.int(2,7),h=R.nz(-5,5),c=R.nz(-9,9),d=a*k+c;
  const ab=`|${xPart(h)}|`,lhs=`${a===-1?MINUS:nm(a)}${ab} ${c<0?MINUS:"+"} ${Math.abs(c)}`;
  const S=(p,q)=>`x = ${nm(Math.max(p,q))} or x = ${nm(Math.min(p,q))}`;
  const opts=mcOpts(S(h+k,h-k),[{t:`x = ${nm(h+k)} only`,tag:"one-solution",note:"An absolute value equation with a positive right side has two solutions."},{t:"No solution",tag:"no-solution",note:`After dividing by ${nm(a)} the absolute value equals ${k}, which is positive.`},{t:S(h+(d-c),h-(d-c)),tag:"didnt-divide",note:`Divide by ${nm(a)} to get the absolute value alone.`},{t:S(-h+k,-h-k),tag:"sign-h",note:`${ab} = ${k} means ${xPart(h)} = ±${k}.`}]);
  return{type:"mc",opts,prompt:`Solve ${M(`${lhs} = ${nm(d)}`)}.`,
    steps:[{c:"Goal: get the absolute value alone. What first?",o:[c<0?`Add ${-c} to both sides`:`Subtract ${c} from both sides`,`Divide by ${nm(a)} first`,"Split into two equations right away"],h:"Undo the + or − first, then the multiplication. Split only when |…| is alone."},
      {n:`Then divide by ${nm(a)}. ${ab} = ?`,a:k,h:`(${nm(d)} ${c<0?"+ "+(-c):MINUS+" "+c}) ÷ ${nm(a)}`},
      {c:`${ab} = ${k} splits into…`,o:[`${xPart(h)} = ${k} or ${xPart(h)} = ${MINUS}${k}`,`${xPart(h)} = ${k} only`,`${xPart(h)} = ${MINUS}${k} only`]},
      {n:`Solve ${xPart(h)} = ${k}. x = ?`,a:h+k},{n:`Solve ${xPart(h)} = ${MINUS}${k}. x = ?`,a:h-k}],
    ex:`${a*k} = ${nm(a)}${ab} after moving ${nm(c)}; divide by ${nm(a)}: ${ab} = ${k}. So ${xPart(h)} = ±${k} → ${S(h+k,h-k)}.`};
},
flip(R){
  let p,q,s,t,v;do{p=R.pick([2,3,4,5]);q=R.nz(-9,9);s=R.pick([2,3,4]);t=R.nz(-5,5);v=F(-s*t-q,p)}while(v.n===0);
  const op=R.pick(["≥",">","≤","<"]),fl={"≥":"≤",">":"<","≤":"≥","<":">"}[op],v2=F(s*t-q,p);
  const opts=mcOpts(`x ${fl} ${fs(v)}`,[{t:`x ${op} ${fs(v)}`,tag:"no-flip",note:`Multiplying by ${MINUS}${s} flips the inequality sign.`},{t:`x ${op} ${fs(v2)}`,tag:"multiplied-positive",note:`Multiply by ${MINUS}${s}, not ${s}.`},{t:`x ${fl} ${fs(neg(v))}`,tag:"dropped-sign",note:"Keep the sign of the number when you divide."}]);
  return{type:"mc",opts,prompt:`Solve ${M(`(${p}x ${q<0?MINUS:"+"} ${Math.abs(q)}) ÷ (${MINUS}${s}) ${op} ${nm(t)}`)}.`,
    steps:[{c:`Multiply both sides by ${MINUS}${s}. What happens to ${op}?`,o:[`It flips to ${fl}`,`It stays ${op}`,"It becomes ="],h:"Multiplying or dividing by a negative flips the sign."},
      {n:`The right side becomes ${nm(t)} × (${MINUS}${s}) = ?`,a:-s*t},
      {n:`Now ${p}x ${q<0?MINUS:"+"} ${Math.abs(q)} ${fl} ${nm(-s*t)}. ${q<0?"Add "+(-q):"Subtract "+q} on both sides. ${p}x ${fl} ?`,a:-s*t-q},
      {c:`Divide by ${p}. Does the sign flip again?`,o:[`No, ${p} is positive`,"Yes, always flip when dividing"]}],
    ex:`× (${MINUS}${s}) and flip: ${p}x ${q<0?MINUS:"+"} ${Math.abs(q)} ${fl} ${nm(-s*t)} → ${p}x ${fl} ${nm(-s*t-q)} → x ${fl} ${fs(v)}.`};
},
absIneq(R){
  const a=R.pick([2,3]),g=a===3?R.pick([2,4,6]):R.int(2,6),r1=R.int(-6,2),r2=r1+g,c=a*g/2,b=-a*(r1+r2)/2,gt=R.f()<.6;
  const inner=`${a}x ${b<0?MINUS:"+"} ${Math.abs(b)}`.replace(" + 0","");
  const OR=`x < ${nm(r1)} or x > ${nm(r2)}`,AND=`${nm(r1)} < x < ${nm(r2)}`;
  const opts=mcOpts(gt?OR:AND,gt?[{t:AND,tag:"and-or",note:"Greater than → OR (outside), not between."},{t:`${nm(r1)} > x > ${nm(r2)}`,tag:"chained-or",note:"An OR can't be written as one chain."},{t:`x > ${nm(r2)} only`,tag:"one-side",note:`Also solve ${inner} < ${MINUS}${c}.`}]
    :[{t:OR,tag:"and-or",note:"Less than → AND (between), not outside."},{t:`x < ${nm(r2)}`,tag:"one-side",note:`Also solve ${inner} > ${MINUS}${c}.`},{t:`${nm(r2)} < x < ${nm(r1)}`,tag:"order",note:"Write the smaller number on the left."}]);
  return{type:"mc",opts,prompt:`Solve ${M(`|${inner}| ${gt?">":"<"} ${c}`)}.`,
    steps:[{c:`|${inner}| ${gt?">":"<"} ${c} means…`,o:gt?[`${inner} > ${c} OR ${inner} < ${MINUS}${c}`,`${MINUS}${c} < ${inner} < ${c}`,`${inner} > ${c} only`]:[`${MINUS}${c} < ${inner} < ${c}`,`${inner} > ${c} OR ${inner} < ${MINUS}${c}`,`${inner} < ${c} only`],h:"Greater than → OR (outside). Less than → AND (between)."},
      {n:`Solve ${inner} = ${c}. x = ?`,a:r2},{n:`Solve ${inner} = ${MINUS}${c}. x = ?`,a:r1},
      {c:"How do you write the answer?",o:gt?["Two pieces joined by \"or\"","One chain like a > x > b"]:["One chain: smaller < x < larger","Two pieces joined by \"or\""]}],
    ex:`${gt?`${inner} > ${c} → x > ${nm(r2)}, OR ${inner} < ${MINUS}${c} → x < ${nm(r1)}. Answer: ${OR}.`:`${MINUS}${c} < ${inner} < ${c} → ${AND}.`}`};
}
};
const LEVELS={slope:["medium","hard"],siPoint:["medium","hard"],siWord:["medium","hard"],psWrite:["medium","hard"],psConvert:["medium","hard"],psWord:["hard"],stdInt:["medium"],stdConvert:["hard"],stdSlope:["hard"],stdWord:["medium","hard"],perpSlope:["medium","hard"],perpLine:["medium","hard"],perpClassify:["hard"],perpWord:["hard"],absEq:["hard"],flip:["hard"],absIneq:["hard"]};
function makeQ(key,lvl,seed){const ls=LEVELS[key];if(!ls.includes(lvl))lvl=ls[ls.length-1];const R=makeR(seed);const q=GEN[key](R,lvl);q.steps=q.steps.map(st=>'c' in st?{...st,o:st.o.filter((v,i,a)=>a.indexOf(v)===i)}:st).filter(st=>!('c' in st)||st.o.length>=2);q.key=key;q.level=lvl;q.word=q.word||WORD.has(key)?1:0;q.seed=seed;return q}
// ===== Graph questions (added 11/1) =====
const GR=6;
function clipLine(it){ // returns [[x1,y1],[x2,y2]] inside [-GR,GR]^2
  const E=1e-9;
  if(it.v!=null)return [[it.v,-GR],[it.v,GR]];
  if(it.h!=null)return [[-GR,it.h],[GR,it.h]];
  const m=it.m,b=it.b,pts=[];
  for(const x of [-GR,GR]){const y=m*x+b;if(y>=-GR-E&&y<=GR+E)pts.push([x,y])}
  if(m!==0)for(const y of [-GR,GR]){const x=(y-b)/m;if(x>=-GR-E&&x<=GR+E)pts.push([x,y])}
  pts.sort((p,q)=>p[0]-q[0]||p[1]-q[1]);return pts.length>=2?[pts[0],pts[pts.length-1]]:null;
}
function svgGraph(items,opt={}){
  const R=GR,pad=0.9,vb=`${-R-pad} ${-R-pad} ${2*(R+pad)} ${2*(R+pad)}`;let s=`<svg class="graph" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
  for(let i=-R;i<=R;i++){s+=`<line class="gr" x1="${i}" y1="${-R}" x2="${i}" y2="${R}"/><line class="gr" x1="${-R}" y1="${i}" x2="${R}" y2="${i}"/>`}
  s+=`<line class="ax" x1="${-R-.5}" y1="0" x2="${R+.5}" y2="0"/><line class="ax" x1="0" y1="${-R-.5}" x2="0" y2="${R+.5}"/>`;
  s+=`<text class="axl" x="${R+.55}" y="-.25">x</text><text class="axl" x=".25" y="${-R-.35}">y</text>`;
  for(const t of [-4,-2,2,4]){s+=`<text class="tk" x="${t}" y=".85" text-anchor="middle">${t<0?"−"+(-t):t}</text><text class="tk" x="-.3" y="${-t+.25}" text-anchor="end">${t<0?"−"+(-t):t}</text>`}
  s+=`<text class="tk" x="-.3" y=".85" text-anchor="end">O</text>`;
  const placed=[];
  items.forEach((it,i)=>{const seg=clipLine(it);if(!seg)return;const [[a,b],[c,d]]=seg;
    s+=`<line class="pl p${it.cls||i%4}" x1="${a}" y1="${-b}" x2="${c}" y2="${-d}"/>`;
    if(it.label){
      let best=null;for(const f of [0.12,0.88,0.3,0.7,0.5,0.2,0.8,0.4,0.6,0.08,0.92]){const x=a+(c-a)*f,y=b+(d-b)*f;const ok=placed.every(p=>Math.hypot(p[0]-x,p[1]-y)>1.8)&&Math.abs(x)>1.2&&Math.abs(y)>1.2&&Math.abs(x)<5.3&&Math.abs(y)<5.3;if(ok){best=[x,y];break}}
      if(!best)best=[a+(c-a)*.5,b+(d-b)*.5];placed.push(best);
      // nudge label off the line, perpendicular
      const len=Math.hypot(c-a,d-b)||1,nx=-(d-b)/len,ny=(c-a)/len;const lx=best[0]+nx*.55,ly=best[1]+ny*.55;
      s+=`<text class="lbl p${it.cls||i%4}" x="${lx.toFixed(2)}" y="${(-ly+.28).toFixed(2)}" text-anchor="middle">${it.label}</text>`;
    }
  });
  return s+"</svg>";
}
const GSL=[F(1,2),F(-1,2),F(2,3),F(-2,3),F(3,2),F(-3,2),F(1,3),F(-1,3),F(3,4),F(-3,4),N(2),N(-2),N(3),N(-3),N(1),N(-1)];
const gOpt=(desc,items)=>({t:"graph: "+desc,g:svgGraph(items)});
function gmc(correct,ds){const seen=new Set([correct.t]);const o=[{...correct,ok:true}];for(const d of ds){if(d&&!seen.has(d.t)){seen.add(d.t);o.push({...d,ok:false})}}return o.slice(0,4)}
function stdFromMB(m,b){let A=-m.n,B=m.d,C=mul(b,N(m.d));if(C.d!==1)return null;let c=C.n;if(A<0||(A===0&&B<0)){A=-A;B=-B;c=-c}return [A,B,c]}
function stdFromInts(p,q){ // x-int p, y-int q: qx + py = pq
  let A=q,B=p,C=p*q;const g=gcd(gcd(A,B),C);A/=g;B/=g;C/=g;if(A<0){A=-A;B=-B;C=-C}return std(A,B,C)}

Object.assign(SKILLS,{graphToEq:"Equation from a graph",eqToGraph:"Graph from an equation",matchLine:"Matching lines to equations",horizVert:"Horizontal and vertical lines",stdTwoPoints:"Standard form through two points",psToStd:"Point-slope to standard form",interceptError:"Intercept error analysis"});
Object.assign(LESSON,{graphToEq:"2-1",eqToGraph:"2-1",matchLine:"2-3",horizVert:"2-3",stdTwoPoints:"2-3",psToStd:"2-3",interceptError:"2-3"});
Object.assign(LEVELS,{graphToEq:["medium","hard"],eqToGraph:["medium","hard"],matchLine:["hard"],horizVert:["medium","hard"],stdTwoPoints:["hard"],psToStd:["hard"],interceptError:["medium"]});

Object.assign(GEN,{
graphToEq(R,lvl){
  let m,b;do{m=R.pick(GSL);b=R.nz(-4,4)}while(lvl==="hard"&&!stdFromMB(m,N(b)));
  const fig=svgGraph([{m:val(m),b,cls:0}]);
  const L=(mm,bb)=>{if(lvl!=="hard")return line(mm,N(bb));const s=stdFromMB(mm,N(bb));return s?std(...s):line(mm,N(bb))};
  const opts=mcOpts(L(m,b),[{t:L(neg(m),b),tag:"slope-sign",note:"Check the direction: a line going down from left to right has a negative slope."},
    {t:L(inv(m),b),tag:"run-over-rise",note:"Slope is rise ÷ run: vertical change on top."},{t:L(m,-b),tag:"intercept-sign",note:"Read where the line crosses the y-axis, including the sign."},
    {t:L(neg(inv(m)),b),tag:"perp-slope",note:"That slope is perpendicular to the graphed line."}]);
  const steps=[{n:"Where does the line cross the y-axis? (the y-intercept)",a:b,h:"Find the point on the vertical axis where x = 0."},
    {c:"Does the line go up or down as you move left to right?",o:val(m)>0?["Up, so the slope is positive","Down, so the slope is negative"]:["Down, so the slope is negative","Up, so the slope is positive"]},
    {n:`From (0, ${nm(b)}) move to the next point where the line crosses grid corners. Slope = rise ÷ run = ?`,a:val(m),s:fs(m),h:"Count the squares up or down (rise), then right (run)."}];
  if(lvl==="hard")steps.push({c:"In slope-intercept form that's y = mx + b. Which standard form matches?",o:[L(m,b),L(m,-b),L(neg(m),b)].filter((v,i,a)=>a.indexOf(v)===i),h:"Move the x-term to the left and clear fractions."});
  return{type:"mc",opts,fig,prompt:"Which equation is shown in the graph?",steps,
    ex:`The line crosses the y-axis at ${nm(b)} and has slope ${fs(m)} (rise ${m.n}, run ${m.d}). So ${line(m,N(b))}${lvl==="hard"?`, which is ${L(m,b)} in standard form`:""}.`};
},
eqToGraph(R,lvl){
  const form=lvl==="hard"?R.pick(["std","ps"]):"si";
  if(form==="std"){
    let p,q;do{p=R.nz(-5,5);q=R.nz(-5,5)}while(Math.abs(p)===Math.abs(q)||Math.abs(p)===1&&Math.abs(q)===1);
    const G=(pp,qq)=>gOpt(`x-int ${pp}, y-int ${qq}`,[{m:-qq/pp,b:qq,cls:0}]);
    const opts=gmc(G(p,q),[{...G(-p,q),tag:"x-int-sign",note:"Check the sign of the x-intercept."},{...G(p,-q),tag:"y-int-sign",note:"Check the sign of the y-intercept."},{...G(q,p),tag:"swap-intercepts",note:"x-intercept: set y = 0. y-intercept: set x = 0."},{...G(-p,-q),tag:"sign-both",note:"Check both signs."}]);
    const eq=stdFromInts(p,q);
    return{type:"mc",opts,prompt:`Which graph shows ${M(eq)}?`,
      steps:[{n:`Find the x-intercept: set y = 0. x = ?`,a:p},{n:`Find the y-intercept: set x = 0. y = ?`,a:q},{c:"So the line passes through…",o:[`${pt(p,0)} and ${pt(0,q)}`,`${pt(q,0)} and ${pt(0,p)}`,`${pt(-p,0)} and ${pt(0,q)}`].filter((v,i,a)=>a.indexOf(v)===i)}],
      ex:`${eq}: y = 0 gives x = ${nm(p)}, and x = 0 gives y = ${nm(q)}. The graph goes through ${pt(p,0)} and ${pt(0,q)}.`};
  }
  const m=R.pick(GSL.filter(f=>Math.abs(val(f))!==1)),b=R.nz(-4,4);
  const G=(mm,bb)=>gOpt(`y = ${fs(mm)}x + ${bb}`,[{m:val(mm),b:bb,cls:0}]);
  const opts=gmc(G(m,b),[{...G(neg(m),b),tag:"slope-sign",note:"Positive slope rises left to right; negative slope falls."},{...G(m,-b),tag:"intercept-sign",note:"Check the sign of the y-intercept."},{...G(inv(m),b),tag:"run-over-rise",note:"Rise goes on top: slope = rise ÷ run."},{...G(neg(m),-b),tag:"sign-both",note:"Check both signs."}]);
  let eq,pre=[];
  if(form==="ps"){const x1=m.d*R.nz(-2,2),y1=val(m)*x1+b;eq=ps(m,x1,y1);pre=[{c:`The point in ${eq} is…`,o:[pt(x1,y1),pt(-x1,-y1),pt(y1,x1)].filter((v,i,a)=>a.indexOf(v)===i),h:"y − y₁ = m(x − x₁): flip the signs you see to get the point."}]}
  else eq=line(m,N(b));
  return{type:"mc",opts,prompt:`Which graph shows ${M(eq)}?`,
    steps:pre.concat([{n:"What is the slope?",a:val(m),s:fs(m)},{n:"What is the y-intercept? (where x = 0)",a:b,h:form==="ps"?"Rewrite in slope-intercept form, or start at the point and move back to x = 0.":undefined},
      {c:"So the graph…",o:[`crosses the y-axis at ${nm(b)} and goes ${val(m)>0?"up":"down"} ${Math.abs(m.n)} for every ${m.d} to the right`,`crosses the y-axis at ${nm(b)} and goes ${val(m)>0?"down":"up"} ${Math.abs(m.n)} for every ${m.d} to the right`,`crosses the y-axis at ${nm(b)} and goes ${val(m)>0?"up":"down"} ${m.d} for every ${Math.abs(m.n)} to the right`].filter((v,i,a)=>a.indexOf(v)===i)}]),
    ex:`${eq} has slope ${fs(m)} and y-intercept ${nm(b)}: start at (0, ${nm(b)}), then go ${val(m)>0?"up":"down"} ${Math.abs(m.n)} and right ${m.d}.`};
},
matchLine(R){
  let p,q;do{p=R.nz(-5,5);q=R.nz(-5,5)}while(Math.abs(p)===Math.abs(q));
  const cands=[[p,q],[-p,q],[p,-q],[q,p],[-q,-p],[-p,-q]];const four=[];const key=([a,b])=>a+","+b;
  for(const c of cands){if(four.length<4&&!four.some(f=>key(f)===key(c)))four.push(c)}
  const letters=R.shuffle(["A","B","C","D"]);const items=four.map((c,i)=>({m:-c[1]/c[0],b:c[1],label:letters[i],cls:i}));
  const fig=svgGraph(items);const tags=[null,"x-int-sign","y-int-sign","swap-intercepts"];
  const notes={"x-int-sign":"Check the sign of the x-intercept.","y-int-sign":"Check the sign of the y-intercept.","swap-intercepts":"x-intercept: set y = 0. y-intercept: set x = 0."};
  const opts=four.map((c,i)=>({t:"Line "+letters[i],ok:i===0,tag:tags[i]||"other",note:notes[tags[i]]||"Find both intercepts and check which line crosses there."}));
  const eq=stdFromInts(p,q);
  return{type:"mc",opts:[opts[0]].concat(opts.slice(1)),fig,prompt:`Which line in the graph is ${M(eq)}?`,
    steps:[{n:"Find the x-intercept: set y = 0. x = ?",a:p},{n:"Find the y-intercept: set x = 0. y = ?",a:q},{c:`Which line crosses the x-axis at ${nm(p)} and the y-axis at ${nm(q)}?`,o:["Line "+letters[0],...letters.slice(1).map(l=>"Line "+l)]}],
    ex:`${eq}: y = 0 gives x = ${nm(p)}; x = 0 gives y = ${nm(q)}. Line ${letters[0]} passes through ${pt(p,0)} and ${pt(0,q)}.`};
},
horizVert(R,lvl){
  const isX=R.f()<.5,c=R.pick([-4.5,-3.5,-3,-2.5,-2,-1.5,-1,-0.5,0.5,1,1.5,2,2.5,3,3.5,4.5]),k=Number.isInteger(c)?R.pick([2,3,-2,-3,4]):R.pick([2,4,-2,-4,6]);
  const eq=`${nm(k)}${isX?"x":"y"} = ${nm(k*c)}`,v=isX?"x":"y",o=isX?"y":"x";
  const pre=[{c:`An equation with only ${v} (no ${o}) graphs as…`,o:[`a ${isX?"vertical":"horizontal"} line`,`a ${isX?"horizontal":"vertical"} line`,"a slanted line through the origin"],h:isX?"Every point has the same x-value, so the line goes straight up and down.":"Every point has the same y-value, so the line goes straight across."},
    {n:`Solve for ${v}: ${v} = ?`,a:c,s:fs(F(c*2,2)),h:`Divide both sides by ${nm(k)}.`}];
  if(lvl!=="hard"){
    const G=(vert,val_)=>gOpt(`${vert?"x":"y"} = ${val_}`,[vert?{v:val_,cls:0}:{h:val_,cls:0}]);
    const opts=gmc(G(isX,c),[{...G(!isX,c),tag:"swap-hv",note:`${v} = constant is ${isX?"vertical":"horizontal"}.`},{...G(isX,-c),tag:"value-sign",note:"Check the sign when you divide."},{...G(isX,Math.abs(2*c)<=5.5?2*c:c/2),tag:"divide-error",note:`Divide both sides by ${nm(k)}.`}]);
    return{type:"mc",opts,prompt:`Which graph shows ${M(eq)}?`,steps:pre,ex:`${eq} → ${v} = ${fs(F(c*2,2))}, a ${isX?"vertical":"horizontal"} line through ${isX?pt(c,0):pt(0,c)}.`};
  }
  const fig=svgGraph([isX?{v:c,cls:0}:{h:c,cls:0}]);const S=x=>fs(F(x*2,2));
  const opts=mcOpts(`${v} = ${S(c)}`,[{t:`${o} = ${S(c)}`,tag:"swap-hv",note:`A ${isX?"vertical":"horizontal"} line is ${v} = a number.`},{t:`${v} = ${S(-c)}`,tag:"value-sign",note:"Check which side of the axis the line is on."},{t:`${o} = ${S(-c)}`,tag:"swap-hv",note:`A ${isX?"vertical":"horizontal"} line is ${v} = a number.`}]);
  return{type:"mc",opts,fig,prompt:"Which equation is shown in the graph?",
    steps:[{c:"Is the line horizontal or vertical?",o:[isX?"Vertical":"Horizontal",isX?"Horizontal":"Vertical"]},{c:`Every point on a ${isX?"vertical":"horizontal"} line has the same…`,o:[`${v}-value`,`${o}-value`]},{n:`Where does it cross the ${v}-axis? ${v} = ?`,a:c,s:S(c),h:"Halfway between grid lines is .5."}],
    ex:`The line is ${isX?"vertical":"horizontal"} through ${isX?pt(c,0):pt(0,c)}, so its equation is ${v} = ${S(c)}.`};
},
stdTwoPoints(R){
  let m,b,x1,x2;do{m=R.pick(GSL.filter(f=>Math.abs(val(f))!==1));b=R.nz(-6,6);x1=m.d*R.int(-2,2);x2=x1+m.d*R.pick([1,2,-1,3])}while(!stdFromMB(m,N(b)));
  const intercept=R.f()<.4&&Number.isInteger(-b/val(m));if(intercept){x1=0;x2=-b/val(m)}
  const y=x=>val(m)*x+b,y1=y(x1),y2=y(x2);const [A,B,C]=stdFromMB(m,N(b));
  const alt=(mm,bb)=>{const s=stdFromMB(mm,bb);return s?std(...s):null};
  const opts=mcOpts(std(A,B,C),[{t:std(A,B,-C),tag:"constant-sign",note:"Check the sign of the constant."},(()=>{const t=alt(neg(m),sub(N(y1),mul(neg(m),N(x1))));return t?{t,tag:"slope-sign",note:"Recheck the slope's sign: (y₂ − y₁) ÷ (x₂ − x₁)."}:null})(),
    (()=>{const im=inv(m);const t=alt(im,sub(N(y1),mul(im,N(x1))));return t?{t,tag:"run-over-rise",note:"Slope is rise ÷ run."}:null})(),{t:std(A,-B,C),tag:"y-sign",note:"Check the sign of the y-term."}]);
  return{type:"mc",opts,prompt:`Write an equation in standard form of the line through ${M(pt(x1,y1))} and ${M(pt(x2,y2))}.`,
    steps:[{n:`Slope = (${nm(y2)} ${MINUS} (${nm(y1)})) ÷ (${nm(x2)} ${MINUS} (${nm(x1)})) = ?`,a:val(m),s:fs(m)},
      {n:`Use y = mx + b with ${pt(x1,y1)}: what is b?`,a:b,h:x1===0?"The point with x = 0 IS the y-intercept.":`${nm(y1)} = ${fs(m)}(${nm(x1)}) + b`},
      {c:`So ${line(m,N(b))}. Move the x-term and clear fractions (A > 0):`,o:[std(A,B,C),std(A,B,-C),std(A,-B,C)],h:`Multiply every term by ${m.d}${m.d>1?"":""}, then move the x-term to the left.`}],
    ex:`Slope ${fs(m)}, y-intercept ${nm(b)}: ${line(m,N(b))} → ${std(A,B,C)}.`};
},
psToStd(R){
  const q=R.pick([2,3,4]);let p;do{p=R.nz(-5,5)}while(gcd(p,q)!==1);const x1=R.nz(-6,6),y1=R.nz(-6,6),m=F(p,q);
  let A=-p,B=q,C=q*y1-p*x1;if(A<0){A=-A;B=-B;C=-C}
  const opts=mcOpts(std(A,B,C),[{t:std(A,B,-C),tag:"constant-sign",note:"Check the sign of the constant after moving terms."},{t:std(A,B,(A>0&&-p>0?1:-1)*(q*y1+p*x1)),tag:"distribute-sign",note:`${fs(m)}(${xPart(x1)}): watch the sign of ${MINUS}(${fs(m)})(${nm(x1)}).`},{t:std(A,B,(B===q?1:-1)*(y1-p*x1)),tag:"multiply-all",note:`Multiply every term by ${q}, including y₁.`},{t:std(A,-B,C),tag:"y-sign",note:"Check the sign of the y-term."}]);
  return{type:"mc",opts,prompt:`Write ${M(ps(m,x1,y1))} in standard form Ax + By = C (integers, A > 0).`,
    steps:[{c:`First multiply both sides by ${q}:`,o:[`${q}(${yPart(y1)}) = ${nm(p)}(${xPart(x1)})`,`${q}(${yPart(y1)}) = ${nm(p*q)}(${xPart(x1)})`,`${yPart(y1)} = ${nm(p)}(${xPart(x1)})`],h:`${q} × (${p}/${q}) = ${p}.`},
      {c:"Distribute both sides:",o:[`${q}y ${-q*y1<0?MINUS:"+"} ${Math.abs(q*y1)} = ${nm(p)}x ${-p*x1<0?MINUS:"+"} ${Math.abs(p*x1)}`,`${q}y ${-q*y1<0?MINUS:"+"} ${Math.abs(q*y1)} = ${nm(p)}x ${-p*x1<0?"+":MINUS} ${Math.abs(p*x1)}`,`${q}y ${-y1<0?MINUS:"+"} ${Math.abs(y1)} = ${nm(p)}x ${-p*x1<0?MINUS:"+"} ${Math.abs(p*x1)}`].filter((v,i,a)=>a.indexOf(v)===i)},
      {c:"Move x to the left and numbers to the right (A > 0):",o:[std(A,B,C),std(A,B,-C),std(A,-B,C)]}],
    ex:`×${q}: ${q}y ${-q*y1<0?MINUS:"+"} ${Math.abs(q*y1)} = ${nm(p)}x ${-p*x1<0?MINUS:"+"} ${Math.abs(p*x1)} → ${std(A,B,C)}.`};
},
interceptError(R){
  const wrongY=R.f()<.5;let A=R.pick([2,3,4,5,6]),B=R.pick([2,3,4,5,6]);while(A===B)B=R.pick([2,3,4,5,6]);
  if(wrongY)B=-B;else A=-A;const L=Math.abs(A*B)/gcd(A,B),C=L*R.pick([1,2]);const xi=C/A,yi=C/B;
  const eq=std(A,B,C);const sx=wrongY?xi:Math.abs(xi),sy=wrongY?Math.abs(yi):yi;
  const work=`"x = 0: ${Math.abs(B)}y = ${C}, so the y-intercept is ${nm(sy)}. y = 0: ${Math.abs(A)}x = ${C}, so the x-intercept is ${nm(sx)}."`;
  const right=wrongY?`The y-intercept is ${nm(yi)}: ${nm(B)}y = ${C} gives y = ${nm(yi)}.`:`The x-intercept is ${nm(xi)}: ${nm(A)}x = ${C} gives x = ${nm(xi)}.`;
  const opts=mcOpts(right,[{t:wrongY?`The x-intercept is ${nm(-xi)}.`:`The y-intercept is ${nm(-yi)}.`,tag:"wrong-fix",note:"Check which coefficient is negative."},{t:"The intercepts are swapped.",tag:"swap-intercepts",note:"Setting x = 0 does give the y-intercept; the problem is a sign."},{t:"There is no error.",tag:"no-error",note:`Check: ${nm(wrongY?B:A)} is negative, so the intercept must be negative.`}]);
  return{type:"mc",opts,prompt:`A student found the intercepts of ${M(eq)} and wrote: ${work} What is the error?`,
    steps:[{n:`Set x = 0: ${nm(B)}y = ${C}. y = ?`,a:yi,h:"Keep the negative sign on the coefficient."},{n:`Set y = 0: ${nm(A)}x = ${C}. x = ?`,a:xi},{c:"Which intercept did the student get wrong?",o:wrongY?["The y-intercept (dropped the negative sign)","The x-intercept","Neither"]:["The x-intercept (dropped the negative sign)","The y-intercept","Neither"]}],
    ex:`x = 0: ${nm(B)}y = ${C} → y = ${nm(yi)}. y = 0: ${nm(A)}x = ${C} → x = ${nm(xi)}. The student dropped the negative sign on ${wrongY?"the y-term":"the x-term"}.`};
}
});
return{GEN,SKILLS,LESSON,LEVELS,makeQ,nm};})();
// adapt a Topic 2 question to the Math Lab item format (multiple choice + walkthrough steps)
function t2Item(key,r,o){const lv=T2.LEVELS[key];const lvl=o.v&&lv.includes(o.v)?o.v:pick(r,lv);const q=T2.makeQ(key,lvl,Math.floor(r()*2e9));
  const lab=key==="absEq"||key==="absIneq"||key==="flip"?"Basic":q.word?"Word":lvl==="hard"?"Challenge":"Basic";
  const prompt=q.prompt+(q.fig?`<div class="fig">${q.fig}</div>`:"");
  const optHtml=op=>op.g?op.g+`<span hidden>${esc_(op.t)}</span>`:op.t;
  let good,bad;
  if(q.type==="mc"){const c=q.opts.find(x=>x.ok);good=optHtml(c);bad=q.opts.filter(x=>!x.ok).map(x=>[optHtml(x),x.note||"Work through the steps to see why."])}
  else{const A=q.ans,isMoney=/^\$/.test(q.ansText),f=v=>isMoney?"$"+(+v).toFixed(2):(Number.isInteger(RD(v))?T2.nm(RD(v)):fmt(RD(v)));good=q.ansText;
    const cand=[];q.steps.forEach(st=>{if("n" in st&&isFinite(st.a)&&Math.abs(st.a-A)>1e-9)cand.push([st.s||f(st.a),"That's one of the in-between steps, not the final answer."])});
    [[-A,"Check the sign."],[A+1,"Check your arithmetic."],[A*2,"Check your arithmetic."],[A-1,"Check your arithmetic."]].forEach(([v,w])=>{if(Math.abs(v-A)>1e-9)cand.push([f(v),w])});
    bad=cand}
  const steps=q.steps.map(st=>{if("c" in st){const m=mc(r,st.o[0],st.o.slice(1).map(x=>[x,st.h||"Think about what the step needs."]));return{p:st.c,po:m.opts,pw:m.ww,pa:m.ans,t:"",a:null,kind:"num",h:st.h||""}}
    return{p:"",po:[],pw:[],pa:-1,t:"",a:st.n,kind:"num",ans:st.a,h:st.h||"Check your arithmetic, especially the signs."}});
  return item("t2_"+key,lab,prompt,good,bad,steps,r)}
const esc_=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
for(const k of Object.keys(T2.GEN)){const key="t2_"+k;G[key]=(r,o)=>t2Item(k,r,o||{});SK[key]=T2.SKILLS[k].replace(" (Topic 1)","");LESSON[key]=T2.LESSON[k];VARS[key]=T2.LEVELS[k].slice();
  (LESSON_SKILLS[T2.LESSON[k]]=LESSON_SKILLS[T2.LESSON[k]]||[]).push(key)}
