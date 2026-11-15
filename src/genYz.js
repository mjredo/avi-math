// retry wrapper for every generator registered after gen1.js
for(const k of Object.keys(G)){if(G[k]._w)continue;const f=G[k];G[k]=(r,o)=>{let it;for(let i=0;i<40;i++){it=f(r,o);if(it.opts.length>=4)return it}return it};G[k]._w=1}
