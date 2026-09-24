const data=window.portfolio;
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const recognitionBadges=p=>p.recognition?.length?`<div class="recognition-badges">${p.recognition.map(label=>`<span class="recognition-badge"><span aria-hidden="true">✦</span> ${escapeHTML(label)}</span>`).join('')}</div>`:'';
const portrait=document.querySelector('#portrait');
if(data.portrait?.src){
 const image=document.createElement('img');image.src=data.portrait.src;image.alt=data.portrait.alt;image.loading='lazy';image.decoding='async';
 portrait.querySelector('.portrait-placeholder').replaceWith(image);
}
const projects=document.querySelector('#projects');
projects.innerHTML=data.projects.map((p,i)=>`<article class="project"><div class="project-card"><button class="project-button" data-project="${escapeHTML(p.id)}" aria-label="View ${escapeHTML(p.title)}"><div class="project-media placeholder"><span class="placeholder-title">${escapeHTML(p.title)}</span>${p.thumbnail?`<img src="${escapeHTML(p.thumbnail)}" alt="${escapeHTML(p.alt||p.title)}" loading="lazy" decoding="async">`:''}<span class="project-number">${String(i+1).padStart(2,'0')}</span>${p.thumbnail?'':`<span class="media-label">${p.video?.type==='channel'?'Explore channel':p.video?'Watch project / Thumbnail coming soon':'Film coming soon'}</span>`}<span class="project-open" aria-hidden="true">↗</span></div><div class="project-caption"><div><h3>${escapeHTML(p.title)}</h3>${recognitionBadges(p)}<p>${escapeHTML(p.role)}</p></div><span>${escapeHTML(p.type)}</span></div></button>${p.channel?`<a class="project-channel" href="${escapeHTML(p.channel)}" target="_blank" rel="noopener noreferrer" aria-label="Visit DJ AG’s YouTube channel" title="DJ AG’s YouTube channel"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 6 3-6 3z" fill="#101827"/></svg></a>`:''}</div></article>`).join('');
document.querySelector('#clients').innerHTML=data.clients.map(c=>`<div class="client">${c.logo?`<img src="${escapeHTML(c.logo)}" alt="${escapeHTML(c.name)}" loading="lazy">`:escapeHTML(c.name)}</div>`).join('');
if(data.clients.every(c=>c.logo))document.querySelector('.client-heading span').hidden=true;
const experience=[{title:'THE BRAND POWER COMPANY',date:'2025–Present',role:'Video Editor',description:'Current · Informative advertising for medicine and everyday consumer products.'},...data.projects.map(p=>({...p,description:({ 'dj-ag':'Music and performance content across social platforms.','aff-productions':'Multi-award-winning short film.','complete-fertility':'Promotional content, from production to final edit.','red-bull':'Facilities, atmosphere and event content.','ab-studios':'Professionally produced short film.','hillary':'Short film editing.','hsdc-tournament':'Online gaming tournament production.'})[p.id]||p.description}))];
document.querySelector('#experience-list').innerHTML=experience.map(p=>`<div class="experience-row"><div><h3>${escapeHTML(p.title)}</h3>${recognitionBadges(p)}${p.date?`<span class="experience-date">${escapeHTML(p.date)}</span>`:''}</div><p>${escapeHTML(p.role)}</p><p>${escapeHTML(p.description)}</p></div>`).join('');
const dialog=document.querySelector('#project-dialog');let previousFocus;let scrollPosition=0;
function createPlayer(container,video,title){
 if(!video){container.innerHTML='<p>Project video coming soon</p><span class="eyebrow">Short film · Video Editor</span>';return;}
 if(video.type==='channel'){const heading=document.createElement('p');heading.textContent='DJ AG on YouTube';const note=document.createElement('p');note.className='channel-note muted';note.textContent='Explore the channel. Isaac contributed selected edits; the channel includes work by other contributors.';const link=document.createElement('a');link.href=video.src;link.target='_blank';link.rel='noopener noreferrer';link.className='text-link';link.textContent='Visit DJ AG’s channel ↗';container.append(heading,note,link);return;}
 if(video.type==='youtube'&&video.embed===false){const note=document.createElement('p');note.textContent='Watch this film on YouTube';const link=document.createElement('a');link.href=video.src;link.target='_blank';link.rel='noopener noreferrer';link.className='text-link';link.textContent='Watch on YouTube ↗';container.append(note,link);return;}
 if(video.type==='mp4'){const player=document.createElement('video');player.controls=true;player.playsInline=true;player.preload='metadata';player.src=video.src;if(video.poster)player.poster=video.poster;player.setAttribute('aria-label',title);container.append(player);return;}
 let embed;try{const url=new URL(video.src);if(video.type==='youtube'&&['youtube.com','www.youtube.com','youtu.be','www.youtube-nocookie.com'].includes(url.hostname)){const id=url.hostname==='youtu.be'?url.pathname.slice(1):url.searchParams.get('v')||url.pathname.split('/').pop();if(/^[\w-]{11}$/.test(id)){const time=url.searchParams.get('start')||url.searchParams.get('t')||'';const parts=time.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);const seconds=/^\d+$/.test(time)?Number(time):parts?Number(parts[1]||0)*3600+Number(parts[2]||0)*60+Number(parts[3]||0):0;embed=`https://www.youtube-nocookie.com/embed/${id}${seconds?'?start='+Math.floor(seconds):''}`;}}if(video.type==='vimeo'&&['vimeo.com','www.vimeo.com','player.vimeo.com'].includes(url.hostname)){const id=url.pathname.split('/').filter(Boolean).find(x=>/^\d+$/.test(x));if(id){const hash=url.searchParams.get('h')||url.pathname.split('/').filter(Boolean).find(x=>x!==id&&x!=='video');embed=`https://player.vimeo.com/video/${id}${hash?'?h='+encodeURIComponent(hash):''}`;}}}catch{}
 if(!embed){container.textContent='This video link needs updating. Please contact Isaac to view the project.';return;}
 const iframe=document.createElement('iframe');iframe.src=embed;iframe.title=title;iframe.allow='fullscreen; picture-in-picture; encrypted-media';iframe.allowFullscreen=true;container.append(iframe);
}
function openProject(p){previousFocus=document.activeElement;document.querySelector('#project-detail').innerHTML=`<p class="eyebrow">${escapeHTML(p.type)}</p><h2 id="project-title" class="detail-title">${escapeHTML(p.title)}</h2>${recognitionBadges(p)}<div class="detail-media"></div>${p.channel?`<a class="channel-cta" href="${escapeHTML(p.channel)}" target="_blank" rel="noopener noreferrer">Visit DJ AG’s YouTube channel <span aria-hidden="true">↗</span></a>`:''}${!p.channel&&p.video?.type==='youtube'?`<p><a class="text-link" href="${escapeHTML(p.video.src)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></p>`:''}<div class="detail-meta">${p.client?`<div><h3>${p.type.toLowerCase().includes('short film')?'Studio':'Client / Company'}</h3><p>${escapeHTML(p.client)}</p></div>`:''}<div><h3>Role</h3><p>${escapeHTML(p.role)}</p></div><div><h3>About the project</h3><p>${escapeHTML(p.description)}</p></div></div>`;if(p.channel&&p.thumbnail){dialog.querySelector('.detail-media').innerHTML=`<img class="detail-cover" src="${escapeHTML(p.thumbnail)}" alt="${escapeHTML(p.alt||p.title)}">`;}else{createPlayer(dialog.querySelector('.detail-media'),p.video,p.title);}scrollPosition=window.scrollY;document.body.style.position='fixed';document.body.style.top=`-${scrollPosition}px`;document.body.style.width='100%';dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.close').focus();}
projects.addEventListener('click',e=>{const button=e.target.closest('[data-project]');if(button)openProject(data.projects.find(p=>p.id===button.dataset.project));});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.querySelector('#project-detail').replaceChildren();document.body.style.position='';document.body.style.top='';document.body.style.width='';const root=document.documentElement;root.style.scrollBehavior='auto';window.scrollTo(0,scrollPosition);root.style.scrollBehavior='';previousFocus?.focus({preventScroll:true});});
if(data.showreel){
 const slot=document.querySelector('#showreel');
 slot.innerHTML='<video class="showreel-preview" muted loop playsinline preload="metadata" poster="assets/images/showreel-poster.jpg" aria-hidden="true"></video><button class="showreel-open" type="button" aria-label="Play full showreel"><span class="showreel-play">▶</span><span>Play showreel <small>Sound on · Full film</small></span></button><button class="preview-toggle" type="button" aria-label="Play background preview">Play preview</button>';
 const preview=slot.querySelector('video'),toggle=slot.querySelector('.preview-toggle');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,userPaused=false;
 preview.muted=true;
 const sync=()=>{if(visible&&!document.hidden&&!dialog.open&&!motion.matches&&!userPaused){if(!preview.getAttribute('src'))preview.src='assets/videos/showreel-preview.mp4';preview.play().catch(()=>{});}else preview.pause();};
 preview.addEventListener('play',()=>{toggle.textContent='Pause preview';toggle.setAttribute('aria-label','Pause background preview');});
 preview.addEventListener('pause',()=>{toggle.textContent='Play preview';toggle.setAttribute('aria-label','Play background preview');});
 toggle.addEventListener('click',()=>{if(preview.paused){userPaused=false;if(!preview.getAttribute('src'))preview.src='assets/videos/showreel-preview.mp4';preview.play().catch(()=>{});}else{userPaused=true;preview.pause();}});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.1}).observe(slot);
 document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);dialog.addEventListener('close',sync);
 slot.querySelector('.showreel-open').addEventListener('click',()=>{preview.pause();openProject({title:'Showreel',client:'Isaac Callender-Barlow',role:'Video Editor',type:'Showreel',description:'Selected editing work across film, music and promotional content.',video:data.showreel});});
}
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const fields=new FormData(e.target);const body=`Name: ${fields.get('name')}\nEmail: ${fields.get('email')}\nCompany: ${fields.get('company')||'—'}\n\n${fields.get('message')}`;location.href=`mailto:Isaaccb@gmx.com?subject=${encodeURIComponent('Portfolio enquiry from '+fields.get('name'))}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Your email draft is ready to open. If no email app opens, contact Isaaccb@gmx.com directly. Your message has not been sent by this website.';});
document.querySelector('#year').textContent=new Date().getFullYear();
fetch('assets/documents/isaac-callender-barlow-cv.pdf',{method:'HEAD'}).then(r=>{if(r.ok&&r.headers.get('content-type')?.includes('pdf')){document.querySelector('#cv').hidden=false;document.querySelector('#cv-pending').hidden=true;}}).catch(()=>{});

// Independent entrances create a sequence without moving entire sections at once.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
 }),{threshold:.12});
 document.querySelectorAll('.project:not(:first-child),.section-heading,.portrait-column,.current h2,.current-copy,.client,.about h2,.large-copy,.about-copy,.skills>div,.experience-row,.credentials>div,.contact>.eyebrow,.contact>h2,.contact-columns>div,.contact form').forEach(el=>{
  if(el.matches('.client')) el.style.setProperty('--delay',`${Array.from(el.parentElement.children).indexOf(el)%3*75}ms`);
  el.classList.add('reveal');observer.observe(el);
 });
 // Reveal focused content immediately for keyboard navigation.
 document.addEventListener('focusin',e=>{e.target.closest('.reveal')?.classList.add('visible');});
}
const ambientLight=document.querySelector('.ambient-light');
const reel=document.querySelector('.reel');
const reelSequence=document.querySelector('.reel-sequence');
const portraitFrame=document.querySelector('.portrait');
const featuredProject=document.querySelector('.project');
const clamp=value=>Math.max(0,Math.min(1,value));
const ease=value=>value*value*(3-2*value);
const mediaFrames=[...document.querySelectorAll('.project-media')];
const navigationSections=[...document.querySelectorAll('#work,#about,#experience,#contact')];
let motionFrame=0;
function updateScrollMotion(){
 motionFrame=0;
 if(dialog.open)return;
 const height=innerHeight;
 if(!reducedMotion.matches){
  const desktop=innerWidth>760;
  // A bounded, slow drift: no continuous animation or enormous offscreen layers.
  const distance=scrollY/Math.max(height,1);
  const amplitude=desktop?190:80;
  ambientLight.style.setProperty('--bloom-x',`${Math.sin(distance*.5)*amplitude}px`);
  ambientLight.style.setProperty('--bloom-y',`${Math.sin(distance*.65)*amplitude*.8}px`);
  ambientLight.style.setProperty('--bloom-second-x',`${Math.sin(distance*.4)*-amplitude*.7}px`);
  ambientLight.style.setProperty('--bloom-second-y',`${Math.sin(distance*.55)*-amplitude}px`);
  const sequence=reelSequence.getBoundingClientRect();
  const progress=ease(clamp((height*.4-sequence.top)/(desktop?height*.85:height*.65)));
  reel.style.setProperty('--reel-inset',`${(1-progress)*(desktop?12:5)}%`);
  reel.style.setProperty('--reel-title-shift',`${(1-progress)*45}px`);
  reel.style.setProperty('--reel-title-scale',String(.8+progress*.2));
  const featured=featuredProject.getBoundingClientRect();
  const featureProgress=ease(clamp((height*.65-featured.top)/(height*.65)));
  featuredProject.style.setProperty('--feature-inset',`${(1-featureProgress)*8}%`);
  featuredProject.style.setProperty('--feature-title-shift',`${(1-featureProgress)*70}px`);
  mediaFrames.forEach(el=>{
   const r=el.getBoundingClientRect();
   if(r.top<height&&r.bottom>0){
    const progress=clamp((height-r.top)/(height+r.height));
    el.style.setProperty('--media-drift',`${((.5-progress)*(desktop?70:24)).toFixed(2)}px`);
    el.style.setProperty('--type-drift',`${((.5-progress)*(desktop?100:35)).toFixed(2)}px`);
   }
  });
  const portraitBox=portraitFrame.getBoundingClientRect();
  const portraitProgress=clamp((height-portraitBox.top)/(height+portraitBox.height));
  portraitFrame.style.setProperty('--portrait-shift',`${((.5-portraitProgress)*(desktop?60:20)).toFixed(2)}px`);

 }
 let active='';navigationSections.forEach(el=>{if(el.getBoundingClientRect().top<=height*.4)active=el.id;});
 nav.querySelectorAll('a').forEach(link=>{if(link.hash===`#${active}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
}
function queueScrollMotion(){if(!motionFrame)motionFrame=requestAnimationFrame(updateScrollMotion);}
addEventListener('scroll',queueScrollMotion,{passive:true});
addEventListener('resize',queueScrollMotion);
reducedMotion.addEventListener('change',queueScrollMotion);
queueScrollMotion();

document.querySelectorAll('[data-open-project]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const project=data.projects.find(p=>p.id===link.dataset.openProject);if(project)openProject(project);}));
