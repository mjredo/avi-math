// ===== Topic 1 (Solving Equations and Inequalities) — native generators =====
const ineqS=(op,v,x="x")=>`${x} ${op} ${fmt(v)}`;
const FLIPOP={"<":">",">":"<","≤":"≥","≥":"≤"};
G.t1_multi=(r,o)=>{const v=o.v||pick(r,VARS.t1_multi);
  if(v==="special"){const a=nz(r,2,6),b=int(r,-9,9),k=nz(r,2,4),c=a*k;const same=r()<0.5;const d=same?b*k:b*k+nz(r,1,6);const op=pick(r,["<",">","≤","≥"]);
    // k(ax + b) op ... compare c x + kb op c x + d
    const lhs=`${k}(${a}x ${b<0?"−":"+"} ${Math.abs(b)})`,rhs=`${c}x ${d<0?"−":"+"} ${Math.abs(d)}`;const L=k*b,R0=d;
    const truth={"<":L<R0,">":L>R0,"≤":L<=R0,"≥":L>=R0}[op];const good=truth?"All real numbers":"No solution";
    return item("t1_multi","Challenge",`Solve ${lhs} ${op} ${rhs}.`,good,[[truth?"No solution":"All real numbers",`After the x-terms cancel you get ${fmt(L)} ${op} ${fmt(R0)}, which is ${truth?"true":"false"}.`],["x = 0","The x-terms cancel, so there's no single x-value."],[ineqS(op,0),"The x-terms cancel. Check whether what's left is always true or never true."]],
      [stp(r,{p:"First step?",good:`Distribute the ${k}`,bad:[[`Divide both sides by ${a}`,"Clear the parentheses first."],["Move all numbers to the left","Distribute first."]],a:`${k} × ${b<0?"("+fmt(b)+")":fmt(b)} = ?`,ans:L}),
       stp(r,{p:`Now ${c}x + ${fmt(L)} ${op} ${c}x + ${fmt(R0)}. Subtract ${c}x from both sides. What's left?`,good:`${fmt(L)} ${op} ${fmt(R0)}`,bad:[[`0 ${op} ${fmt(R0-L)}x`,"The x-terms cancel completely."],[`x ${op} ${fmt(R0-L)}`,"No x is left."]],t:"If what's left is always true, every x works. If it's always false, no x works."})],r)}
  // multi-step with x on both sides, negative coefficient after collecting
  let a,b,c,d,x0;do{a=int(r,-7,7);c=int(r,-7,7);b=int(r,-12,12);d=int(r,-12,12);x0=(d-b)/(a-c)}while(a===c||a===0||c===0||!Number.isInteger(x0)||Math.abs(x0)>10||x0===0||(a-c>0&&r()<0.6));
  const op=pick(r,["<",">","≤","≥"]),co=a-c,fl=co<0?FLIPOP[op]:op;
  const tx=k=>k===1?"x":k===-1?"−x":fmt(k)+"x";
  return item("t1_multi","Basic",`Solve ${tx(a)} ${b<0?"−":"+"} ${Math.abs(b)} ${op} ${tx(c)} ${d<0?"−":"+"} ${Math.abs(d)}.`,ineqS(fl,x0),
    [[ineqS(op,x0),co<0?`Dividing by ${fmt(co)} (a negative) flips the sign.`:"Keep the sign: you didn't divide by a negative."],[ineqS(fl,-x0),"Check the arithmetic when you move the numbers."],[ineqS(FLIPOP[fl],-x0),"Check both the sign flip and the arithmetic."]],
    [stp(r,{p:"Get the x-terms on one side. What do we do?",good:`Subtract ${c}x from both sides`,bad:[[`Add ${c}x to both sides`,`To remove ${c}x, do the opposite.`],["Divide by x","Never divide by the variable."]],a:`${a}x − (${fmt(c)}x) = ?x`,ans:co}),
     stp(r,{p:"Now move the constant.",good:`${b<0?"Add":"Subtract"} ${Math.abs(b)} on both sides`,bad:[[`${b<0?"Subtract":"Add"} ${Math.abs(b)} on both sides`,"Undo it with the opposite operation."],[`Divide by ${fmt(b)}`,"It's added, so subtract."]],a:`${fmt(co)}x ${op} ? (the right side)`,ans:d-b}),
     stp(r,{p:`Divide by ${fmt(co)}. What happens to ${op}?`,good:co<0?`It flips to ${fl}, because ${fmt(co)} is negative`:`It stays ${op}, because ${fmt(co)} is positive`,bad:[[co<0?`It stays ${op}`:`It flips to ${FLIPOP[op]}`,"Flip only when you multiply or divide by a negative."],["It becomes =","The answer is still an inequality."]],a:"x is compared to ?",ans:x0})],r)};
G.t1_compound=(r,o)=>{const v=o.v||pick(r,VARS.t1_compound);let lo,hi;do{lo=int(r,-8,3);hi=lo+int(r,2,9)}while(lo===0&&hi===0);
  if(v==="and"){const a=pick(r,[2,3,-2,-3]),b=int(r,-6,6);const L=a*lo+b,H=a*hi+b;const A=Math.min(L,H),B=Math.max(L,H);
    return item("t1_compound","Basic",`Solve ${fmt(A)} < ${a}x ${b<0?"−":"+"} ${Math.abs(b)} < ${fmt(B)}.`,`${fmt(lo)} < x < ${fmt(hi)}`,
      [[`${fmt(hi)} < x < ${fmt(lo)}`,a<0?"After flipping, write the smaller number on the left.":"Write the smaller number on the left."],[`x < ${fmt(lo)} or x > ${fmt(hi)}`,"A chain with < is an AND: x is between the two numbers."],[`${fmt((A-b)/1)} < x < ${fmt((B-b))}`,`Divide all three parts by ${fmt(a)} too.`]],
      [stp(r,{p:"How do we solve a three-part inequality?",good:"Do the same step to all three parts",bad:[["Solve only the middle","Every step must be done to all three parts."],["Split into two equations","Keep it as an inequality."]],a:`${b<0?"Add":"Subtract"} ${Math.abs(b)} on all parts. The left part becomes ?`,ans:A-b}),
       stp(r,{p:`Now divide every part by ${fmt(a)}. Does anything flip?`,good:a<0?"Yes. Both signs flip, then rewrite with the smaller number first":"No, the divisor is positive",bad:[[a<0?"No":"Yes, always flip","Flip only for a negative divisor."],["Only the left sign flips","Both signs flip together."]],a:"The smaller end of the answer is x > ?",ans:lo})],r)}
  const flipB=r()<0.5;
  return item("t1_compound","Challenge",`Solve 2x ${"+"} ${3} < ${fmt(2*lo+3)} or ${flipB?"−3x":"3x"} ${flipB?">":">"} ${fmt(flipB?-3*hi:3*hi)}.`.replace("+ 3","+ 3"),`x < ${fmt(lo)} or x ${flipB?"<":">"} ${fmt(hi)}`,
    [[`${fmt(lo)} < x < ${fmt(hi)}`,"OR means either piece works. Don't combine into a chain."],[`x < ${fmt(lo)} or x ${flipB?">":"<"} ${fmt(hi)}`,flipB?"Dividing by −3 flips the sign.":"Dividing by 3 keeps the sign."],[`${fmt(lo)} > x > ${fmt(hi)}`,"An OR answer can't be written as one chain."]],
    [stp(r,{p:"How do we solve an OR inequality?",good:"Solve each part on its own, then join with OR",bad:[["Combine into one chain","Chains are for AND."],["Solve only the first part","Both parts count."]],a:`First part: 2x < ${fmt(2*lo)}, so x < ?`,ans:lo}),
     stp(r,{p:`Second part: divide by ${flipB?"−3":"3"}. What happens to the sign?`,good:flipB?"It flips":"It stays the same",bad:[[flipB?"It stays the same":"It flips","Flip only when dividing by a negative."],["It becomes =","Still an inequality."]],a:`x is compared to ?`,ans:hi})],r)};
G.t1_word=(r,o)=>{const c=pick(r,[["Maya has","$","to spend at the fair. Entry is","and each ride costs","rides"],["A phone plan allows","$","per month. The base fee is","and each extra GB costs","GB"]]);
  const fee=pick(r,[8,10,12,15]),rate=pick(r,[2,3,4,5]),n=int(r,5,12),total=fee+rate*n+int(r,0,rate-1);const ans=Math.floor((total-fee)/rate);
  return item("t1_word","Word",`${c[0]} ${c[1]}${total} ${c[2]} ${c[1]}${fee} ${c[3]} ${c[1]}${rate}. What is the greatest number of ${c[4]} she can buy?`,fmt(ans),
    [[fmt(ans+1),`That costs ${c[1]}${fee+rate*(ans+1)}, which is over the limit.`],[fmt(Math.floor(total/rate)),"Take out the entry/base fee first."],[fmt(RD((total-fee)/rate)),"You can only buy whole ones, so round down."],[fmt(ans-1),`Check: ${ans} costs ${c[1]}${fee+rate*ans}, which still fits.`]],
    [stp(r,{p:"Which inequality fits?",good:`${fee} + ${rate}x ≤ ${total}`,bad:[[`${fee} + ${rate}x ≥ ${total}`,"She can spend at most the amount she has."],[`${rate} + ${fee}x ≤ ${total}`,"The fee is paid once; the rate is per item."]],a:`${rate}x ≤ ${total} − ${fee} = ?`,ans:total-fee}),
     stp(r,{p:`Divide by ${rate}. ${total-fee} ÷ ${rate} = ${fmt(RD((total-fee)/rate))}. What's the answer?`,good:"Round down to a whole number",bad:[["Round up","Rounding up would go over the budget."],["Keep the decimal","She can't buy part of one."]],a:"Greatest whole number = ?",ans})],r)};
Object.assign(SK,{t1_multi:"Multi-step inequalities and special cases",t1_compound:"Compound inequalities (and / or)",t1_word:"Inequality word problems"});
Object.assign(LESSON,{t1_multi:"1-5",t1_compound:"1-6",t1_word:"1-5"});
Object.assign(VARS,{t1_multi:["solve","special"],t1_compound:["and","or"],t1_word:["a"]});
(LESSON_SKILLS["1-5"]=LESSON_SKILLS["1-5"]||[]).push("t1_multi","t1_word");(LESSON_SKILLS["1-6"]=LESSON_SKILLS["1-6"]||[]).push("t1_compound");
// retry wrapper for every generator added after gen.js
for(const k of Object.keys(G)){if(G[k]._w)continue;const f=G[k];G[k]=(r,o)=>{let it;for(let i=0;i<40;i++){it=f(r,o);if(it.opts.length>=4)return it}return it};G[k]._w=1}
