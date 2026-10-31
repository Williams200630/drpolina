const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8'),main=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements=new Map();function element(){const classes=new Set();return {innerHTML:'',textContent:'',value:'',style:{},classList:{contains:x=>classes.has(x),add:x=>classes.add(x),remove:x=>classes.delete(x)},insertAdjacentHTML(){},querySelectorAll:()=>[],append(){},focus(){}}}
const sandbox={console,localStorage:{getItem:()=>null,setItem(){}},document:{querySelector:s=>{if(!elements.has(s))elements.set(s,element());return elements.get(s)},addEventListener(){},hidden:false,createElement:element,body:element()},matchMedia:()=>({matches:false}),window:{},navigator:{},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},Date,Math,atob:s=>Buffer.from(s,'base64').toString('binary')};sandbox.window=sandbox;const c=vm.createContext(sandbox);vm.runInContext(main,c);vm.runInContext(fs.readFileSync(__dirname+'/upgrade.js','utf8'),c);const run=s=>vm.runInContext(s,c);
sandbox.addEventListener=()=>{};
vm.runInContext(fs.readFileSync(__dirname+'/finale.js','utf8'),c);
let checks=0;function ok(expr){assert.ok(run(expr),expr);checks++}
for(let n=1;n<=5;n++){
 run(`S=fresh();S.n=${n};S.ci=0;S.f={box:1,m1:1,lampok:1,lk2:1,log:1,sort:1,m3a:1,m3b:1,m4a:1,m4b:1,ph:1,assembled:1,darkDone:1};`);
 ok(`CL[${n}].length===3`);ok('!tasksDone()');run('syncStory()');ok('S.clock===0');
 run('S.ci=1;syncStory()');ok('S.clock===120');
 for(let j=0;j<2;j++){
  run(`quest(${j})`);run(`readQuest(${j})`);
  // Wrong arrangements cannot complete or consume progress.
  run(`verifyQuest(${j})`);ok(`!qdone(${j})`);
  const answer=run(`JSON.stringify(QUESTS[S.n][${j}].answer)`);
  run(`{const q=QUESTS[S.n][${j}],w=S.f.qwork[S.n+':${j}'];if(q.kind==='seq')w.seq=${answer};else if(q.kind==='rot')w.angles=${answer};else w.order=${answer};verifyQuest(${j});}`);
  ok(`qdone(${j})`);
 }
 ok('tasksDone()');run('syncStory()');ok('S.clock===240');
 run('S.ci=2;syncStory()');ok('S.clock===300&&!clientsDone()');
 run('S.ci=3;syncStory()');ok('S.clock===360&&clientsDone()&&!clientsLeft()');
 run('S.loc=3');ok('scene().includes("Архив невостребованных")');
}
run('S=fresh();S.n=3;S.ci=1;syncStory()');ok('S.f.dark&&S.f.darkDone&&!S.f.torchOk');
run('S=fresh();S.n=1;S.ci=3;syncStory()');ok('S.clock!==360');
run('S=fresh();S.n=5;S.ci=0;act("cell0")');ok('!S.f.fin');
run('S=fresh();S.n=1;S.ci=0;quest(0)');ok('!S.f.qwork');
ok('faceG(CL[1][0],true)!==faceG(CL[1][2],true)');
run('S=fresh();S.n=2;S.ci=1;S.f={lk2:1,log:1,sort:1};S.loc=0');
ok('!objective().includes("посетител")&&objective().includes("левую стрелку один раз")');
run('S.loc=3');ok('objective().includes("левый механизм на столе")&&!objective().includes("Затем")');
run('top2()');ok('!document.querySelector("#obj").textContent.includes("механизм")');
run('qstate()["2:0"]=true');ok('objective().includes("правую шкатулку")');
run('qstate()["2:1"]=true');ok('objective().includes("Окно выдачи")');
run('S=fresh();S.n=4;migrateCards()');ok('collectedCards().join(",")==="1,2,3"');
run('migrateCards()');ok('collectedCards().length===3');ok('S.inv.includes("postcard3")');
run('S.f.fin=1;migrateCards()');ok('collectedCards().length===5');
ok('(birthdayCake().match(/class="cake-candle"/g)||[]).length===20');
run('S.f.candlesOut=1;S.f.cardOrder=[];[1,3,2,4,5].forEach(placeBirthdayCard)');ok('!S.f.letterBuilt&&S.f.cardOrder.length===0');
run('[1,2,3,4,5].forEach(placeBirthdayCard)');ok('S.f.letterBuilt===1');
run('give("wish");openBirthdayLetter()');ok('document.querySelector("#birthday-letter").innerHTML.includes("Пожелание с золотой карточки")');
run('S.f.candlesOut=0;S.f.cardOrder=[];S.f.letterBuilt=0;placeBirthdayCard(1)');ok('S.f.cardOrder.length===0');
sandbox.document.querySelectorAll=()=>[];
ok('{const d={quiet:[],charge:0};let s;for(let i=0;i<3;i++)s=birthdayBreathSample(d,.05);s.blown&&s.progress===1}');
ok('{const d={quiet:[],charge:0};let s;for(const v of [.05,0,.05,0,.05])s=birthdayBreathSample(d,v);s.blown}');
ok('{const d={quiet:[],charge:0};let s;for(let i=0;i<100;i++)s=birthdayBreathSample(d,.003);!s.blown&&s.progress===0}');
ok('{const d={quiet:[],charge:0};let s;for(let i=0;i<6;i++)s=birthdayBreathSample(d,.02);s.blown}');
let micTick,trackStopped=false,amplitude=.001;
sandbox.setInterval=fn=>{micTick=fn;return 1};
sandbox.navigator.mediaDevices={getUserMedia:async()=>({getTracks:()=>[{stop(){trackStopped=true}}]})};
sandbox.testAudio={resume:async()=>{},createMediaStreamSource:()=>({connect(){},disconnect(){}}),createAnalyser:()=>({fftSize:1024,getFloatTimeDomainData(data){data.fill(amplitude)}})};
run('S.f.candlesLit=20;S.f.candlesOut=0;AC=testAudio');
(async()=>{await run('startBirthdayMic()');for(let i=0;i<16;i++)micTick();ok('!S.f.candlesOut');amplitude=.2;for(let i=0;i<7;i++)micTick();ok('S.f.candlesOut===1');assert.ok(trackStopped,'microphone track must stop after blowing');checks++;console.log(`${checks} checks passed: nights, postcards, letter assembly and synthetic microphone input.`)})().catch(e=>{console.error(e);process.exitCode=1});
