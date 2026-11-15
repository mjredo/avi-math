const fs=require('fs');const vm=require('vm');const D=__dirname+'/';
const code=['helpers.js','gen.js','t2adapter.js','gen1.js'].map(f=>fs.readFileSync(D+f,'utf8')).join('\n')+'\n;this.G=G;this.VARS=VARS;this.plain=plain;this.SK=SK;this.LESSON=LESSON;this.LS=LESSON_SKILLS;';
const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);const {G,VARS,plain}=ctx;let n=0,errs={};const add=(k,m)=>{errs[k]=errs[k]||[];if(errs[k].length<3)errs[k].push(m)};
const rng=s=>{let a=s>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const only=process.argv[2];
for(const g in G){if(only&&!g.startsWith(only))continue;for(const v of VARS[g])for(let s=1;s<=1500;s++){const key=g+'/'+v;let it;
 try{it=G[g](rng(s*7919+v.length),{v})}catch(e){add(key,'throw '+e.message);continue}n++;
 if(!it.opts||it.opts.length<3)add(key,'opts '+(it.opts||[]).length+' '+plain(it.q).slice(0,90)+' | '+it.opts.map(plain).join(' / '));
 const P=it.opts.map(plain);if(new Set(P).size!==P.length)add(key,'dup');if(!(it.ans>=0&&it.ans<it.opts.length))add(key,'ans');
 if(P.some(p=>/NaN|undefined|Infinity/.test(p))||/NaN|undefined|Infinity/.test(plain(it.q)))add(key,'nan '+plain(it.q).slice(0,100)+' | '+P.join(' / '));
 for(const st of it.steps){if(st.a&&st.kind!=="choice"&&!isFinite(st.ans))add(key,'step ans '+st.a);if(st.po.length===1)add(key,'plan opts');}
}}
console.log('items',n,'skills',Object.keys(G).length);console.log(JSON.stringify(errs,null,1));
