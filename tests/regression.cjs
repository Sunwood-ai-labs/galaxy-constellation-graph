const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const GraphData=require('../graph-data.js');
async function run(data,ok=true){
 const els=new Map(),handlers={};
 const el=s=>{if(!els.has(s))els.set(s,{hidden:true,textContent:'',value:'',innerHTML:'',dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(k,v){this[k]=v},focus(){},querySelectorAll(){return []}});return els.get(s)};
 const document={querySelector:el,querySelectorAll:()=>[],activeElement:{focus(){}},body:{classList:{add(){},remove(){}}},addEventListener:(k,v)=>handlers[k]=v};
 await vm.runInNewContext(fs.readFileSync('app.js','utf8'),{GraphData,document,fetch:async()=>({ok,status:404,json:async()=>data}),innerWidth:390,innerHeight:844,addEventListener(){},console:{error(){}}});
 return {el,handlers};
}
(async()=>{
 const large={nodes:Array.from({length:40},(_,i)=>({id:'n'+i,title:'Node '+i,group:'Custom'})),edges:[['n0','n39']]};
 let r=await run(large);assert.equal((r.el('#world').innerHTML.match(/class="topic /g)||[]).length,40);assert(!/NaN|Infinity/.test(r.el('#world').transform));
 r=await run({nodes:[],edges:[]});assert(r.el('#status').textContent.includes('ノードがありません'));
 r=await run({},false);assert(r.el('#status').textContent.includes('読み込めません'));
 r=await run({nodes:[{id:1,links:['javascript:alert(1)']}],edges:[]});assert(r.el('#status').textContent.includes('読み込めません'));
 r=await run({nodes:[{id:1,title:'<img onerror=bad>',group:'__proto__',date:'<b>date</b>'}],edges:[],scope:'<img onerror=bad>'});
 assert(!r.el('#world').innerHTML.includes('<img'));r.el('#scope').onclick();assert(!r.el('#detail').innerHTML.includes('<img'));
 console.log('PASS: 40-node render / empty graph / HTTP error / unsafe URL rejection / HTML escaping / custom category');
})().catch(e=>{console.error(e);process.exitCode=1});
