const fs=require('fs');const vm=require('vm');const D=__dirname+'/';
const files=['helpers.js','gen.js','t2adapter.js','gen1.js',...fs.readdirSync(D).filter(f=>/^genY\d+\.js$/.test(f)).sort(),'genYz.js'];
const ctx={};vm.createContext(ctx);vm.runInContext(files.map(f=>fs.readFileSync(D+f,'utf8')).join('\n')+';this.G=G;this.VARS=VARS;this.plain=plain;',ctx);
const {G,VARS,plain}=ctx;const rng=s=>{let a=s>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const pre=process.argv[2];let s=Number(process.argv[3]||7);
for(const k in G){if(!k.startsWith(pre))continue;for(const v of VARS[k]){const it=G[k](rng(s++*101),{v});console.log(`[${k}/${v}] ${plain(it.q).replace(/\s+/g," ").slice(0,170)}\n   ✓ ${plain(it.opts[it.ans])}   ✗ ${it.opts.filter((_,i)=>i!==it.ans).map(plain).join(" | ")}`)}}
