function buildItem(spec){const r=rng(hash(spec.seed));const it=G[spec.gen](r,spec.o||{});it.id=spec.id;it.label=spec.label;return it}
function mainSpecs(){return[]}

// ===== enVision Algebra 1 (2018) · class "7th Algebra Yellow" =====
const COURSE=[
 {t:1,name:"Solving Equations and Inequalities",done:true,link:"https://claude.ai/artifact/CiusYKYHg9dJgzkdqCCDFQ",linkName:"Inequality Check (1-5 to 1-7)",
  lessons:[["1-1","Operations on Real Numbers"],["1-2","Solving Linear Equations"],["1-3","Solving Equations With a Variable on Both Sides"],["1-4","Literal Equations and Formulas"],["1-5","Solving Inequalities in One Variable"],["1-6","Compound Inequalities"],["1-7","Absolute Value Equations and Inequalities"]]},
 {t:2,name:"Linear Equations",done:true,link:"https://claude.ai/artifact/DCj1iGBPPWgYazBVaDgdPT",linkName:"Topic 2 Test Series",
  lessons:[["2-1","Slope-Intercept Form"],["2-2","Point-Slope Form"],["2-3","Standard Form"],["2-4","Parallel and Perpendicular Lines"]]},
 {t:3,name:"Linear Functions",
  lessons:[["3-1","Relations and Functions"],["3-2","Linear Functions"],["3-3","Transforming Linear Functions"],["3-4","Arithmetic Sequences"],["3-5","Scatter Plots and Lines of Fit"],["3-6","Analyzing Lines of Fit"]]},
 {t:4,name:"Systems of Linear Equations and Inequalities",lessons:[["4-1","Solving Systems of Equations by Graphing"],["4-2","Solving Systems of Equations by Substitution"],["4-3","Solving Systems of Equations by Elimination"],["4-4","Linear Inequalities in Two Variables"],["4-5","Systems of Linear Inequalities"]]},
 {t:5,name:"Piecewise Functions",lessons:[["5-1","The Absolute Value Function"],["5-2","Piecewise-Defined Functions"],["5-3","Step Functions"],["5-4","Transformations of Piecewise-Defined Functions"]]},
 {t:6,name:"Exponents and Exponential Functions",lessons:[["6-1","Rational Exponents and Properties of Exponents"],["6-2","Exponential Functions"],["6-3","Exponential Growth and Decay"],["6-4","Geometric Sequences"],["6-5","Transformations of Exponential Functions"]]},
 {t:7,name:"Polynomials and Factoring",lessons:[["7-1","Adding and Subtracting Polynomials"],["7-2","Multiplying Polynomials"],["7-3","Multiplying Special Cases"],["7-4","Factoring Polynomials"],["7-5","Factoring x² + bx + c"],["7-6","Factoring ax² + bx + c"],["7-7","Factoring Special Cases"]]},
 {t:8,name:"Quadratic Functions",lessons:[["8-1","Key Features of a Quadratic Function"],["8-2","Quadratic Functions in Vertex Form"],["8-3","Quadratic Functions in Standard Form"],["8-4","Modeling With Quadratic Functions"],["8-5","Linear, Exponential, and Quadratic Models"]]},
 {t:9,name:"Solving Quadratic Equations",lessons:[["9-1","Solving Quadratic Equations Using Graphs and Tables"],["9-2","Solving Quadratic Equations by Factoring"],["9-3","Rewriting Radical Expressions"],["9-4","Solving Quadratic Equations Using Square Roots"],["9-5","Completing the Square"],["9-6","The Quadratic Formula and the Discriminant"],["9-7","Solving Systems of Linear and Quadratic Equations"]]},
 {t:10,name:"Working With Functions",lessons:[["10-1","The Square Root Function"],["10-2","The Cube Root Function"],["10-3","Analyzing Functions Graphically"],["10-4","Translations of Functions"],["10-5","Compressions and Stretches of Functions"],["10-6","Operations With Functions"],["10-7","Inverse Functions"]]},
 {t:11,name:"Statistics",lessons:[["11-1","Analyzing Data Displays"],["11-2","Comparing Data Sets"],["11-3","Interpreting the Shapes of Data Displays"],["11-4","Standard Deviation"],["11-5","Two-Way Frequency Tables"]]}
];

// ---------- Topic 3 quiz (3-1, 3-2, 3-4, 3-5, 3-6; no 3-3), week of Nov 16 2026 ----------
// Assessment test: every skill, most variants.
const T3Q_FIRST=[["a1_func","pairs"],["a1_func","table"],["a1_func","graph"],["a1_domran","pairs"],["a1_domran","graph"],["a1_domran","context"],["a1_dc","kind"],
 ["a2_eval","eval"],["a2_eval","solve"],["a2_write","points"],["a2_write","table"],["a2_write","graph"],["a2_word","model"],["a2_word","interpret"],
 ["a4_seq","diff"],["a4_explicit","formula"],["a4_explicit","term"],["a4_recursive","write"],["a4_recursive","toexplicit"],["a4_word","two"],
 ["a5_corr","plot"],["a5_fit","eq"],["a5_fit","predict"],["a5_fit","interpret"],
 ["a6_resid","one"],["a6_rplot","judge"],["a6_r","meaning"],["a6_inter","cause"]];
// Practice test: laid out like a unit quiz, in book order (new numbers every time).
const T3Q_TEST=[["1","a1_func","notpairs"],["2","a1_func","graph"],["3","a1_func","map"],["4","a1_domran","range"],["5","a1_domran","graph"],["6","a1_domran","context"],["7","a1_dc","graph"],
 ["8","a2_eval","eval"],["9","a2_eval","two"],["10","a2_write","points"],["11","a2_write","graph"],["12","a2_word","use"],["13","a2_word","domain"],
 ["14","a4_seq","isarith"],["15","a4_explicit","formula"],["16","a4_explicit","which"],["17","a4_recursive","torecursive"],["18","a4_word","nth"],
 ["19","a5_corr","strength"],["20","a5_fit","eq"],["21","a5_fit","when"],
 ["22","a6_resid","most"],["23","a6_rplot","pick"],["24","a6_r","value"],["25","a6_inter","which"]];
function midFirstSpecs(id){const L=(AM(id)||{}).firstL;return L.map(([g,v],i)=>({id:`r0-${i+1}`,label:String(i+1),gen:g,o:{v},seed:`${id}-first-${i}-${Date.now()%100000}`}))}
function midTestSpecs(id,no){const L=(AM(id)||{}).testL;return L.map(([lab,g,v])=>({id:`r${no}-${lab}`,label:lab,gen:g,o:{v},seed:`${id}-r${no}-t-${lab}`}))}

// ===== app =====
const NEED_STREAK=2,LEGACY={};
const ASSESS=[];
ASSESS.push({id:"T3-QZ",topic:3,kind:"mid",card:"Quiz prep",name:"Topic 3 Quiz",lessons:["3-1","3-2","3-4","3-5","3-6"],span:"3-1 to 3-6 (not 3-3)",teacher:"the Topic 3 quiz (3-1, 3-2, 3-4, 3-5, 3-6)",firstL:T3Q_FIRST,testL:T3Q_TEST,n:T3Q_TEST.length,first:T3Q_FIRST.length,min:40,need:2,strNeed:2,retests:0,timeRef:true,date:null});
