/* One registry for discoveries. Game code is fetched only when opened. */
(() => {
 const loaders=new Map(), found=new Set(), saved=new Set(), key='icb-discoveries-v1';let busy=false;
 try{JSON.parse(localStorage.getItem(key)||'[]').filter(id=>typeof id==='string').forEach(id=>saved.add(id));}catch{}
 const counter=document.createElement('button');counter.type='button';counter.className='secret-counter';counter.setAttribute('aria-live','polite');document.querySelector('footer').append(counter);
 const update=()=>{counter.textContent=`SECRETS FOUND: ${found.size}/${loaders.size}`;counter.title=found.size===loaders.size?'All secrets discovered. Nice eye.':'There is more here than meets the eye.';};update();
 const discover=id=>{if(!loaders.has(id)||found.has(id))return;found.add(id);try{localStorage.setItem(key,JSON.stringify([...found]));}catch{}update();};
 window.secrets={register:(id,loader)=>{loaders.set(id,loader);if(saved.has(id))found.add(id);update();},discover,async open(id){if(busy||!loaders.has(id)||document.querySelector('dialog[open]')||document.documentElement.hasAttribute('data-retro-transition'))return;busy=true;try{const module=await loaders.get(id)();await module.open(()=>{busy=false;});discover(id);}catch(e){busy=false;console.error('Secret unavailable',e);}}};
 window.secrets.register('editor',async()=>{const m=await import('./editor-workspace.js?v=6');return {open:m.openEditor};});
 window.secrets.register('chess',async()=>{const m=await import('./chess-game.js?v=5');const pixel=document.createElement('img');pixel.src='assets/images/isaac-pixel.png';pixel.alt='';pixel.className='portrait-pixel';await pixel.decode().catch(()=>{});portrait.append(pixel);await new Promise(r=>setTimeout(r,matchMedia('(prefers-reduced-motion:reduce)').matches?100:450));pixel.remove();return m;});
 window.secrets.register('quiz',()=>import('./quiz.js?v=6'));
 window.secrets.register('runner',()=>import('./runner.js?v=1'));
 window.secrets.register('map',()=>import('./secret-map.js?v=2'));
 window.secrets.register('penalty',()=>import('./penalty.js?v=1'));
 const penaltyTrigger=document.querySelector('#penalty-secret');let penaltyTap=null;
 penaltyTrigger.addEventListener('click',()=>{const now=performance.now();if(penaltyTap!==null&&now-penaltyTap<650){penaltyTap=null;window.secrets.open('penalty');}else penaltyTap=now;});
 counter.addEventListener('click',()=>window.secrets.open('runner'));
 const toolsHeading=document.querySelector('#tools-secret');
 toolsHeading.tabIndex=0;toolsHeading.setAttribute('role','button');toolsHeading.setAttribute('aria-label','Tools');toolsHeading.classList.add('tools-secret');
 let toolsTap=0;
 const openMap=()=>{const now=performance.now();if(toolsTap&&now-toolsTap<650){toolsTap=0;window.secrets.open('map');}else toolsTap=now;};
 toolsHeading.addEventListener('click',openMap);
 toolsHeading.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!e.repeat)openMap();}});
 const portrait=document.querySelector('#portrait');portrait.tabIndex=0;portrait.setAttribute('role','button');portrait.setAttribute('aria-label','Portrait of Isaac. Look a little closer.');
 let clicks=[];function tap(){const now=performance.now();clicks=clicks.filter(t=>now-t<1000);clicks.push(now);if(clicks.length===3){clicks=[];window.secrets.open('chess');}}
 portrait.addEventListener('click',tap);portrait.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap();}});
 let tx=0,ty=0,x=0,y=0,frame=0;
 function tick(){x+=(tx-x)*.12;y+=(ty-y)*.12;portrait.style.setProperty('--orbit-x',x+'deg');portrait.style.setProperty('--orbit-y',y+'deg');frame=Math.abs(x-tx)+Math.abs(y-ty)>.02?requestAnimationFrame(tick):0;}
 const canTilt=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
 portrait.addEventListener('pointermove',e=>{if(!canTilt.matches)return;const r=portrait.getBoundingClientRect();tx=-(e.clientY-r.top-r.height/2)/r.height*12;ty=(e.clientX-r.left-r.width/2)/r.width*12;if(!frame)frame=requestAnimationFrame(tick);});
 portrait.addEventListener('pointerleave',()=>{tx=ty=0;if(!frame)frame=requestAnimationFrame(tick);});
 const trigger=document.createElement('button');trigger.type='button';trigger.className='quiz-secret';trigger.textContent='©';trigger.setAttribute('aria-label','A little more about Isaac');trigger.title='A little more about Isaac';trigger.addEventListener('click',()=>window.secrets.open('quiz'));
 const copyright=document.querySelector('footer > span');copyright.firstChild.textContent=copyright.firstChild.textContent.replace('©','');copyright.prepend(trigger);
})();
