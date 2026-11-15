function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
const pick=(r,a)=>a[Math.floor(r()*a.length)];
const int=(r,lo,hi)=>lo+Math.floor(r()*(hi-lo+1));
function shuffle(r,a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const RD=x=>Math.round(x*1e9)/1e9;
function fmt(x){x=RD(x);const ax=Math.abs(x);let s=Number.isInteger(ax)&&ax>=1000?ax.toLocaleString("en-US"):String(ax);if(/e/i.test(s))s=ax.toFixed(14).replace(/0+$/,"");return(x<0?"−":"")+s}
const fE=e=>typeof e==="number"?(e<0?"−"+(-e):String(e)):e;
const fP=n=>n<0?`(${fmt(n)})`:fmt(n);
const pw=(b,e)=>`${typeof b==="number"?fmt(b):b}<sup>${fE(e)}</sup>`;
const sn=(c,e)=>`${fmt(c)} × 10<sup>${fE(e)}</sup>`;
const plain=h=>String(h).replace(/<sup>/g,"^").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
function mc(r,good,bad){const seen=new Set([plain(good)]);const items=[[good,null]];
  for(const [t,w] of bad){const k=plain(t);if(seen.has(k))continue;seen.add(k);items.push([t,w]);if(items.length===4)break}
  const sh=shuffle(r,items);return{opts:sh.map(x=>x[0]),ww:sh.map(x=>x[1]),ans:sh.findIndex(x=>x[1]===null)}}
function stp(r,o){const m=mc(r,o.good,o.bad);return{p:o.p,po:m.opts,pw:m.ww,pa:m.ans,t:o.t||"",a:o.a||null,kind:o.kind||"num",ans:o.ans,opts:o.opts,h:o.h||"Check your arithmetic, especially the signs.",tol:o.tol}}
function item(skill,lvl,q,good,bad,steps,r){const m=mc(r,good,bad);return{skill,lvl,q,opts:m.opts,ww:m.ww,ans:m.ans,steps}}
const ord=n=>n+(n%10===1&&n!==11?"st":n%10===2&&n!==12?"nd":n%10===3&&n!==13?"rd":"th");
function bigDigits(ds,e){return Number(ds.padEnd(e+1,"0")).toLocaleString("en-US")}
function smallDigits(ds,e){return "0."+"0".repeat(-e-1)+ds}
const cDigits=c=>String(c).replace(".","").replace(/^0+/,"");
