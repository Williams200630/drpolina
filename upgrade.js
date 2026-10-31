/* Событийное время: ни скорость игрока, ни реальное ожидание не заканчивают смену. */
LOCS.push('Архив невостребованных');
CL[1].splice(3,1); CL[2].splice(1,1); CL[4].splice(2,1);
CL[5]=[
 {n:'Валентина П.',p:'Петрова В. · 02.02.1970 · 55 лет.',s:'Код 2020. Терминал: 2020.',b:'4607123456781',bc:1,t:36.6,uv:'Печать «Вояж», блёсток нет.',st:'1 сут.',g:1},
 {n:'Почтальон без тени',u:1,p:'Иванов И. · 01.01.1900 · 25 лет.',s:'Код 0000. Терминал: 2020.',b:'4601234567894',bc:3,t:11,uv:'Печати нет.',st:'12 суток',r:'R1/R2/R3/R6/R7: чужие документы, неверные коды, холод.'},
 {n:'Девушка с жёлтым зонтом',p:'Соколова А. · 12.04.2003 · 22 года.',s:'Код 1820. Терминал: 1820.',b:'4607123456781',bc:1,t:36.6,uv:'Печать «Вояж». Блёсток нет.',st:'1 сут.',g:1}
];
const QUESTS={
 1:[{name:'Печати забытого письма',kind:'seq',labels:['Луна','Ключ','Птица','Глаз'],answer:[0,2,1],clue:'В конверте рисунок: сначала над почтой восходит ЛУНА. Затем прилетает ПТИЦА. В клюве она приносит КЛЮЧ. Глаз только наблюдает.',reward:'В письме адресованная тебе квитанция. На ней проступает половина печати.'},
 {name:'Разорванная квитанция',kind:'order',labels:['Получатель','Дата','Адрес','Печать'],answer:[1,2,0,3],clue:'На полях инструкция: «Сначала КОГДА. Потом КУДА. Затем КОМУ. Подтверждение всегда последнее». Расположи четыре фрагмента сверху вниз.',reward:'Квитанция восстановлена. Подпись Валентины: «Ты уже здесь была».'}],
 2:[{name:'Три замёрзших вентиля',kind:'rot',labels:['Левый','Средний','Правый'],answer:[1,2,3],clue:'На стекле процарапано: «Солнце встаёт справа →. Талая вода падает вниз ↓. Последняя труба смотрит в прошлое ←». Поверни три вентиля по этим направлениям.',reward:'Лёд в архивной витрине треснул. Внутри сухая бумажная бабочка.'},
 {name:'Крылья из инея',kind:'seq',labels:['Лёд','Капля','Пар','Огонь'],answer:[0,1,2,1],clue:'На крыльях бабочки четыре сцены: замёрзшее озеро; капля на ладони; пар над чайником; капля на стекле. Повтори превращения. Открытое пламя уничтожит письмо.',reward:'Бабочка расправила крылья. На обороте: «Холодный посетитель не дышит на стекло».'}],
 3:[{name:'Мотылёк и лампы',kind:'seq',labels:['Красная','Зелёная','Синяя','Белая'],answer:[3,2,0,3],clue:'На карточке след мотылька: БЕЛЫЙ потолок → СИНЕЕ окно → КРАСНЫЙ сигнал щитка → снова БЕЛЫЙ потолок. Зажги лампы по этому следу.',reward:'Мотылёк сел на катушку. Проектор можно разобрать.'},
 {name:'Плёнка пропавшей смены',kind:'order',labels:['Пустой стул','Свет вернулся','Вошла женщина','Лампа погасла'],answer:[0,2,3,1],clue:'Монтажная записка: «Пока никого нет, стул пуст. Затем она входит. Только после её прихода гаснет лампа. Последним возвращается свет». Восстанови кадры.',reward:'На последнем кадре оператор смотрит прямо в камеру. Это ты.'}],
 4:[{name:'Глаза на стене',kind:'rot',labels:['Первый глаз','Второй глаз','Третий глаз'],answer:[3,0,1],clue:'Три портрета должны увидеть выход. Под каждым подписано его направление: первый — ЗАПАД, второй — СЕВЕР, третий — ВОСТОК. Поверни зрачки.',reward:'За портретами открылся карман с четырьмя карточками.'},
 {name:'Посылка без отправителя',kind:'order',labels:['Пепел','Конверт','Письмо','Огонь'],answer:[2,1,3,0],clue:'Восстанови судьбу письма: сначала его НАПИСАЛИ. Потом УПАКОВАЛИ. Затем СОЖГЛИ. Осталось то, что нельзя прочесть.',reward:'В пепле проступило: «Не отправитель ищет получателя. Получатель ищет себя».'}],
 5:[{name:'Последняя колыбельная',kind:'seq',labels:['Низкая','Средняя','Высокая','Тишина'],answer:[0,2,1,0],clue:'На перфоленте четыре отверстия: внизу, наверху, посередине, внизу. Повтори их высоту на клавишах шкатулки. Тишина — пустая клавиша.',reward:'Из шкатулки вылетела бумажная птица с обрывком адреса.'},
 {name:'Адрес рассвета',kind:'order',labels:['Рассвет','Ночь','Дверь','Дорога'],answer:[1,3,2,0],clue:'На птице: «Сначала была НОЧЬ. Я вышла на ДОРОГУ. Нашла ДВЕРЬ. За ней ждал РАССВЕТ». Собери адрес в порядке пути.',reward:'Адрес собран. Теперь можно закрыть последнюю очередь и открыть ячейку №0.'}]
};
function qstate(){S.f.archive=S.f.archive||{};return S.f.archive}
function qdone(j){return !!qstate()[S.n+':'+j]}
function archiveDone(){return qdone(0)&&qdone(1)}
const oldTasks=tasksDone;
tasksDone=function(){return !!((S.n===5?S.f.ph&&S.f.assembled:oldTasks())&&archiveDone())};
function syncStory(){
 if(!S.n||S.f.fin)return;
 if(S.n===3&&S.ci>=1&&!S.f.darkDone){S.f.dark=1;S.f.darkDone=1;S.f.torchOk=0;flicker('лампа погасла',1)}
 S.clock=S.ci>=3&&tasksDone()?360:S.ci>=2?300:tasksDone()?240:S.ci>=1?120:0;
}
let endingNight=0,winTimer;
function checkDawn(){
 if(!G||S.f.fin||!S.n||S.n>=5||endingNight===S.n||!clientsDone()||!tasksDone()||$('#ov').classList.contains('show'))return;
 endingNight=S.n; save(); winTimer=setTimeout(()=>nightWin(),150);
}
const baseRender=render;
render=function(){syncStory();baseRender();if(G&&S.n&&!S.f.fin){
 const nav=document.querySelector('.nav');if(nav)nav.insertAdjacentHTML('beforeend','<span class="shift-progress">Посетители '+Math.min(3,S.ci)+'/3 · Архив '+Number(qdone(0)+qdone(1))+'/2</span>');
 }checkDawn();};
const baseClose=closeM;
closeM=function(){baseClose();syncStory();checkDawn()};
const baseObjective=objective;
function roomHint(room,action){
 if(S.loc===room)return action;
 const right=(room-S.loc+4)%4,left=(S.loc-room+4)%4;
 const direction=left<=right?'левую':'правую',count=Math.min(left,right);
 return 'Перейди в «'+LOCS[room]+'»: нажми '+direction+' стрелку '+(count===1?'один раз':'два раза')+'.';
}
objective=function(){
 if(!S.n)return 'Нажми «Принять», чтобы начать.';
 if(S.f.fin)return 'Открой конверт после того, как задуешь свечи.';
 if(S.f.dark&&!S.f.torchOk)return roomHint(0,S.inv.includes('torch')?'Нажми на фонарик в инвентаре и заряди его кнопкой «Крутить».':'Нажми на ящик под прилавком — там динамо-фонарик.');
 if(S.ci===0)return roomHint(0,'Нажми на посетителя в окне выдачи.');
 if(!archiveDone()){
  const j=qdone(0)?1:0;
  return roomHint(3,j===0?'Нажми на левый механизм на столе: три круглые ручки. Он называется «'+QUESTS[S.n][0].name+'».':'Нажми на правую шкатулку на столе — «'+QUESTS[S.n][1].name+'».');
 }
 if(tasksDone())return clientsDone()?(S.n===5?roomHint(0,'Нажми на ячейку №0 справа под прилавком.'):'Смена закончена. Нажми «Дальше» в окне рассвета.'):roomHint(0,'Теперь у окна ждёт посетитель. Нажми на него.');
 if(S.n===5)return !S.f.ph?roomHint(0,'Нажми на телефон слева на прилавке.'):'Соедини в инвентаре детали I и II, затем III и IV, затем обе половины ключа.';
 // Исходная цель нужна только для незаконченных дел пункта. Она больше не склеивается с архивом.
 const text=baseObjective();
 const room=text.startsWith('Подсобка:')?1:text.startsWith('Комната отдыха:')?2:text.startsWith('Окно выдачи:')?0:null;
 return room===null?text:roomHint(room,text.replace(/^(Подсобка|Комната отдыха|Окно выдачи):\s*/,''));
};
const statusBar=top2;
top2=function(){
 statusBar();
 $('#obj').textContent=S.n?'Ночь '+S.n+'/5 · '+tm()+' · Страйки: '+'●'.repeat(S.st)+'○'.repeat(3-S.st):'Вояж · Ночная смена';
 if(S.n&&!S.f.fin)$('#bar').insertAdjacentHTML('beforeend','<button id="help-step" onclick="showNextStep()" aria-expanded="false" aria-controls="next-step">Застряла?</button><div id="next-step" role="status" hidden></div>');
};
function showNextStep(){
 const e=$('#next-step'),b=$('#help-step');if(!e||!b)return;
 const opening=e.hidden;e.hidden=!opening;b.setAttribute('aria-expanded',String(opening));b.textContent=opening?'Скрыть подсказку':'Застряла?';
 if(opening){e.textContent=objective();S.f.helpSteps=(S.f.helpSteps||0)+1;save()}
}
const baseAct=act;
act=function(id){if(id==='archive0'||id==='archive1')return quest(Number(id.at(-1)));if(id==='lampfx'){flicker('трещит люминесцентная лампа',1);return}if(id==='cell0'&&(!clientsDone()||!tasksDone())){say('Ячейка откроется на рассвете: закончи дела и обслужи трёх посетителей.');return}if(id==='cust'&&S.n===5){if(S.ci>=3)return say('Очередь закончилась. Уже светает.');if(S.ci>=1&&!tasksDone())return say('Сначала закончи дела смены и архива.');return clientM()}return baseAct(id)};
const baseOpenP=openP;
openP=function(id){if(id==='f'&&(!clientsDone()||!tasksDone()))return say('Ячейка ещё закрыта. Сначала три посетителя и дела смены.');baseOpenP(id)};
const baseStart=startGame;
startGame=function(){endingNight=0;baseStart()};
function quest(j){
 if(S.ci<1)return modal('<h3>Архив закрыт</h3><p>Сначала обслужи первого посетителя. Его квитанция откроет архивные механизмы.</p><button onclick="closeM()">Вернуться</button>');
 if(j===1&&!qdone(0))return modal('<h3>Механизм без сердцевины</h3><p>Сначала восстанови первый механизм этой ночи. Внутри найдётся недостающий фрагмент.</p><button onclick="closeM()">Вернуться</button>');
 const q=QUESTS[S.n][j];if(qdone(j))return modal('<h3>'+q.name+'</h3><p>'+q.reward+'</p><button onclick="closeM()">Вернуться</button>');
 const key=S.n+':'+j;S.f.qwork=S.f.qwork||{};const w=S.f.qwork[key]=S.f.qwork[key]||{read:false,seq:[],order:q.labels.map((_,i)=>i),angles:[0,0,0]};
 let html='<div class="eyebrow">Архив · ночь '+S.n+' · механизм '+(j+1)+'/2</div><h3>'+q.name+'</h3><button onclick="readQuest('+j+')">Прочитать найденную записку</button>';
 if(w.read){html+='<div class="paper-clue">'+q.clue+'</div>';
 if(q.kind==='seq')html+='<div class="puzzle-controls">'+q.labels.map((l,i)=>'<button onclick="questTap('+j+','+i+')">'+l+'</button>').join('')+'</div><p>След: '+(w.seq.map(i=>q.labels[i]).join(' → ')||'пусто')+'</p>';
 if(q.kind==='rot')html+='<div class="puzzle-controls">'+q.labels.map((l,i)=>'<button onclick="questTap('+j+','+i+')">'+l+'<strong class="dial">'+['↑','→','↓','←'][w.angles[i]]+'</strong></button>').join('')+'</div>';
 if(q.kind==='order')html+='<p class="tiny">Поднимай карточки стрелкой ↑. Верхняя будет первой.</p>'+w.order.map((v,i)=>'<div class="card-fragment"><span>'+(i+1)+'. '+q.labels[v]+'</span><button aria-label="Поднять '+q.labels[v]+'" onclick="questTap('+j+','+i+')">↑</button></div>').join('');
 html+='<div class="row"><button onclick="verifyQuest('+j+')">Проверить механизм</button><button onclick="resetQuest('+j+')">Сбросить</button></div>';
 }html+='<p class="quest-feedback" role="status">'+(w.msg||'')+'</p><button onclick="closeM()">Отойти</button>';modal(html);save();
}
function readQuest(j){S.f.qwork[S.n+':'+j].read=true;quest(j)}
function questTap(j,i){const q=QUESTS[S.n][j],w=S.f.qwork[S.n+':'+j];if(!w.read||qdone(j))return;if(q.kind==='seq'){if(w.seq.length>=q.answer.length)w.seq=[];w.seq.push(i);snd('click','щелчок механизма')}if(q.kind==='rot'){w.angles[i]=(w.angles[i]+1)%4;snd('click','поворот вентиля')}if(q.kind==='order'&&i>0)[w.order[i-1],w.order[i]]=[w.order[i],w.order[i-1]];w.msg='';quest(j)}
function resetQuest(j){delete S.f.qwork[S.n+':'+j];quest(j)}
function verifyQuest(j){const q=QUESTS[S.n][j],w=S.f.qwork[S.n+':'+j];if(!w?.read)return;const a=q.kind==='seq'?w.seq:q.kind==='rot'?w.angles:w.order;if(a.join(',')!==q.answer.join(',')){w.msg='Механизм не поддался. Сверь порядок с запиской; ничего не потеряно.';if(q.kind==='seq')w.seq=[];return quest(j)}qstate()[S.n+':'+j]=true;snd('click','механизм открылся');save();closeM();say(q.reward);render()}
/* Детализированные портреты; аномалии не превращают всех посетителей в одинаковых монстров. */
faceG=function(c,sm){
 const bad=c.u&&['Эдвард Калин','Эдвард Калин (снова)','Женщина в плаще','Сергей Козак','Почтальон без тени'].includes(c.n),seed=[...c.n].reduce((a,v)=>a+v.charCodeAt(0),0),female=/Марина|Женщина|Ольга|Дарья|Валентина|Девушка/.test(c.n),pale=bad?'#9fa998':['#c4ab8d','#b99a7c','#d1b696'][seed%3];
 let h='<path d="M17 100Q19 79 35 76L65 76Q82 79 84 100" fill="'+(bad?'#272c29':'#435052')+'" stroke="#111c1a" stroke-width="2"/><path d="M40 74v14l10 8 10-8V73" fill="'+pale+'"/><path d="M19 45Q15 12 48 9Q83 10 82 47L75 81H24Z" fill="'+(seed%2?'#302723':'#494438')+'"/><path d="M25 32Q49 14 75 32L73 61Q70 82 50 86Q29 80 26 61Z" fill="'+pale+'" stroke="#393830" stroke-width="1.2"/><path d="M26 36Q29 17 49 17Q65 16 77 34Q54 29 48 23Q42 34 26 36" fill="#302a26"/><path d="M26 48Q29 71 43 78L37 57Z" fill="#4c5344" opacity=".2"/><path d="M31 40q8-5 15-1M55 39q9-4 15 1" stroke="#453d32" stroke-width="2.3" fill="none"/>';
 [38,62].forEach(x=>{h+='<path d="M'+(x-8)+' 48Q'+x+' '+(bad?37:40)+' '+(x+8)+' 48Q'+x+' 53 '+(x-8)+' 48" fill="'+(bad?'#d6d5b9':'#d7d7c4')+'" stroke="#4b493e" stroke-width="1"/>';h+=bad?'<ellipse cx="'+x+'" cy="47" rx="1.1" ry="5" fill="#111713"/>':'<circle cx="'+x+'" cy="47" r="3.3" fill="'+(seed%2?'#6b7867':'#726448')+'"/><circle cx="'+x+'" cy="47" r="1.5" fill="#17201b"/><circle cx="'+(x+1)+'" cy="46" r=".7" fill="#eee"/>';h+='<path d="M'+(x-7)+' 55q7 3 13-1" stroke="#625f4d" opacity=".5" fill="none"/>'});
 h+='<path d="M49 47l-4 15 7 1M43 66q6 2 12 0" stroke="#746953" stroke-width="1.2" fill="none"/>';
 if(sm&&bad){h+='<path d="M27 62Q50 77 74 59Q69 88 50 82Q31 82 27 62Z" fill="#150e0d" stroke="#645348"/><path d="M28 62l5 8 4-5 4 9 4-6 5 10 4-10 5 7 4-9 4 4 6-10M33 76l4-4 4 7 4-6 5 8 5-7 5 4 4-7" fill="#d7d1ac" stroke="#a49c7f" stroke-width=".5"/><path d="M24 61l4 7M74 59l3-6" stroke="#3c3028" fill="none"/>'}
 else if(sm)h+='<path d="M36 69Q50 80 64 68Q50 73 36 69" fill="#704d43"/><path d="M39 70q11 4 22-1" stroke="#dfd6bc" stroke-width="3"/><path d="M44 70v3m5-3v4m5-4v3" stroke="#a69e8a" stroke-width=".6"/>';
 else h+='<path d="M39 71q11 '+(bad?'-4':'3')+' 22-1" stroke="#695047" fill="none" stroke-width="1.7"/>';
 if(female)h+='<path d="M22 28Q12 62 23 91L30 72L27 38M73 25Q89 60 78 92L70 73L74 39" fill="#332b27"/>';
 return h;
};
const baseScene=scene;
function roomFinish(svg){
 const defs='<defs><filter id="grain"><feTurbulence baseFrequency=".72" numOctaves="3" seed="8"/><feColorMatrix type="saturate" values="0"/></filter><radialGradient id="vignette"><stop offset="45%" stop-color="#020706" stop-opacity="0"/><stop offset="100%" stop-color="#020706" stop-opacity=".45"/></radialGradient><linearGradient id="wallwash" x2="0" y2="1"><stop stop-color="#70785f" stop-opacity=".1"/><stop offset="1" stop-color="#121b18" stop-opacity="0"/></linearGradient></defs>';
 const trim='<g pointer-events="none"><path d="M0 390H960M0 398H960M0 506H960" stroke="#85917a" opacity=".15"/><path d="M30 0v390M930 0v390" stroke="#111e19" stroke-width="4"/>'+[150,290,650,880].map((x,i)=>'<path d="M'+x+' 0l-3 '+(40+i*13)+' 7 13-4 27" stroke="#0b1411" opacity=".65" fill="none"/>').join('')+'<path d="M0 520L340 400M960 520L620 400M480 400v120M0 460h960" stroke="#526254" opacity=".19"/><rect width="960" height="520" fill="url(#wallwash)"/><rect width="960" height="520" filter="url(#grain)" opacity=".045"/><rect width="960" height="520" fill="url(#vignette)"/></g>';
 return svg.replace('>', '>'+defs).replace('</svg>',trim+'</svg>');
}
scene=function(){if(S.loc!==3){let v=baseScene();if(S.n===5&&!clientsDone()&&(S.ci===0||tasksDone())&&S.loc===0)v=v.replace(/<g fill="#050807">[\s\S]*?<\/g>/,'<g transform="translate(415 98) scale(1.3)">'+faceG(CL[5][S.ci],0)+'</g>');return roomFinish(v)}
 const q=QUESTS[S.n]||QUESTS[1];let a='<svg viewBox="0 0 960 520" role="group" aria-label="Архив невостребованных"><rect width="960" height="520" fill="#26312a"/><path d="M0 400h960v120H0z" fill="#18211c"/><path d="M90 62h780v335H90z" fill="#141e19" stroke="#695f49" stroke-width="12"/>';
 for(let x=110;x<860;x+=92)for(let y=85;y<380;y+=73)a+='<rect x="'+x+'" y="'+y+'" width="76" height="57" fill="#3f4335" stroke="#151e18" stroke-width="3"/><rect x="'+(x+22)+'" y="'+(y+12)+'" width="32" height="12" fill="#a79b76" opacity=".7"/><path d="M'+(x+30)+' '+(y+38)+'h16" stroke="#141c16" stroke-width="4"/>';
 a+='<path d="M80 420H880v26H80zM105 446v74M855 446v74" fill="#554c38" stroke="#152019" stroke-width="3"/>';
 a+=OB('archive0',q[0].name,285,476,'<path d="M190 419v-95l24-30h144l24 30v95Z" fill="#484d3c" stroke="#b3a17a" stroke-width="3"/><rect x="211" y="314" width="149" height="77" rx="32" fill="#18261e" stroke="#8a8563"/>'+[245,285,325].map((x,i)=>'<circle cx="'+x+'" cy="351" r="15" fill="'+(qdone(0)?'#b1a060':'#584b37')+'" stroke="#bfad7e"/><path d="M'+x+' 340v22m-11-11h22" stroke="#1c291f"/>').join(''));
 a+=OB('archive1',q[1].name,674,476,'<path d="M576 420v-100h192v100Z" fill="#61543d" stroke="#b2a17a" stroke-width="3"/><rect x="592" y="334" width="160" height="65" fill="#222c23"/>'+[0,1,2,3].map(i=>'<rect x="'+(604+i*35)+'" y="344" width="26" height="44" fill="'+(qdone(1)?'#b7a16a':'#99947a')+'" stroke="#3f4936"/><circle cx="'+(617+i*35)+'" cy="366" r="5" fill="#374c3b"/>').join(''));
 a+=OB('lampfx','Лампа архива',480,89,'<path d="M480 0v28m-62 0h124l-18 23h-88Z" fill="#4a5140" stroke="#8a8c6b"/><ellipse cx="480" cy="52" rx="44" ry="6" fill="#cfbd78"/><path d="M440 56L300 420h360L520 56" fill="#dbc881" opacity=".065"/>');
 return roomFinish(a+'</svg>')};
/* Ограниченные по уровню эффекты: шум дросселя и синтезированный голосовой крик. */
let lampNodes=[],lampContext;
function stopLamp(){lampNodes.forEach(n=>{try{n.stop()}catch(e){}});lampNodes=[]}
function lampAmbience(){const enabled=G&&!S.mute&&S.mode!=='off'&&!S.f.fin&&!document.hidden;if(!enabled){stopLamp();return}const c=ctx();if(!c||lampNodes.length)return;lampContext=c;const gain=c.createGain();gain.gain.value=S.mode==='soft'?.006:.013;gain.connect(c.destination);[50,100,150].forEach((f,i)=>{const o=c.createOscillator();o.type=i?'sine':'triangle';o.frequency.value=f;o.connect(gain);o.start();lampNodes.push(o)})}
snd=function(kind,t){if(S.mute||S.mode==='off')return;sub(t);const c=ctx();if(!c)return;c.resume();const now=c.currentTime,d=kind==='scream'?(S.mode==='soft'?.65:1.25):.32,out=c.createGain(),cap=c.createDynamicsCompressor();cap.threshold.value=-18;cap.ratio.value=8;out.connect(cap).connect(c.destination);out.gain.setValueAtTime(0,now);out.gain.linearRampToValueAtTime(S.mode==='soft'?.045:kind==='scream'?.16:.07,now+.025);out.gain.exponentialRampToValueAtTime(.001,now+d);
 if(kind==='scream'){const voice=c.createOscillator();voice.type='sawtooth';voice.frequency.setValueAtTime(190,now);voice.frequency.exponentialRampToValueAtTime(730,now+.16);voice.frequency.exponentialRampToValueAtTime(310,now+d);const formant=c.createBiquadFilter();formant.type='bandpass';formant.frequency.value=1600;formant.Q.value=1.1;voice.connect(formant).connect(out);voice.start();voice.stop(now+d);const buffer=c.createBuffer(1,Math.floor(c.sampleRate*d),c.sampleRate),v=buffer.getChannelData(0);for(let i=0;i<v.length;i++)v[i]=(Math.random()*2-1)*.35;const noise=c.createBufferSource();noise.buffer=buffer;const filter=c.createBiquadFilter();filter.type='highpass';filter.frequency.value=800;noise.connect(filter).connect(out);noise.start();noise.stop(now+d)}else{const o=c.createOscillator();o.type=kind==='click'?'triangle':'sawtooth';o.frequency.value=kind==='click'?420:100;o.connect(out);o.start();o.stop(now+d)} };
const paintedRender=render;render=function(){paintedRender();lampAmbience();if(MU){MU.volume=.28;if(S.mute||document.hidden||!gram||S.f.fin)MU.pause();else if(MU.paused)MU.play().catch(()=>{})}};
document.addEventListener('visibilitychange',()=>{lampAmbience();if(MU){if(document.hidden||S.mute||S.f.fin)MU.pause();else if(gram)MU.play().catch(()=>{})}});
document.addEventListener('pointerdown',()=>{if(G){ctx()?.resume();lampAmbience()}},{passive:true});
const baseStop=stop;stop=function(){baseStop();stopLamp()};
const baseMenu=openMenu;openMenu=function(msg){baseMenu(msg);$('#box').insertAdjacentHTML('beforeend','<p class="tiny">Проверка звуков: гул лампы и голосовой крик. Громкость крика снижена в мягком режиме.</p><div class="row"><button onclick="snd(\'low\',\'трещит лампа\')">Звук лампы</button><button onclick="snd(\'scream\',\'крик скримера\')">Звук крика</button></div>')};
// Старые сохранения продолжают работать; прогресс архива хранится отдельно для каждой ночи.
S.ci=Math.min(3,S.ci||0);S.loc=Math.min(3,S.loc||0);syncStory();save();
