/* Isolated Easter egg. Remove this file and retro.css to remove the feature. */
(() => {
 'use strict';
 const root = document.documentElement;
 const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
 const storageKey = 'icb-retro-session';
 let keys = [], busy = false, active = false;
 const status = document.createElement('button');
 status.type = 'button'; status.className = 'retro-status';
 status.textContent = '198X / RETRO MODE: ON ×';
 status.setAttribute('aria-label', 'Exit Retro Mode');
 const projectDialog = document.querySelector('#project-dialog');
 const placeStatus = () => {
  if(active) (projectDialog?.open ? projectDialog : document.body).append(status);
 };
 const setTheme = enabled => {
  active = enabled;
  if(enabled) { root.setAttribute('data-theme','retro'); placeStatus(); }
  else { root.removeAttribute('data-theme'); status.remove(); }
  try { if(enabled) sessionStorage.setItem(storageKey,'on'); else sessionStorage.removeItem(storageKey); } catch {}
 };
 try { if(sessionStorage.getItem(storageKey)==='on') setTheme(true); } catch {}
 if(projectDialog) new MutationObserver(placeStatus).observe(projectDialog,{attributes:true,attributeFilter:['open']});
 const wait = ms => new Promise(resolve => setTimeout(resolve,ms));
 async function toggle() {
  if(busy) return;
  busy = true; keys = [];
  const enabling = !active;
  const returnFocus = document.activeElement === status;
  const position = {x:scrollX,y:scrollY,dialog:projectDialog?.scrollTop || 0};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.createElement('div');
  overlay.className = 'retro-transmission';
  overlay.setAttribute('role','status'); overlay.setAttribute('aria-live','polite');
  overlay.dataset.phase = 'freeze';
  const panel = document.createElement('div'); panel.className = 'retro-system';
  const message = document.createElement('span'); panel.append(message); overlay.append(panel);
  const oldScrollBehavior = root.style.scrollBehavior;
  const stopScroll = event => event.preventDefault();
  const stopNavigation = event => {
   if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Tab'].includes(event.key)) event.preventDefault();
  };
  const change = () => {
   setTheme(enabling);
   root.style.scrollBehavior = 'auto';
   window.scrollTo(position.x,position.y);
   if(projectDialog?.open) projectDialog.scrollTop = position.dialog;
  };
  let transition, displayAnimation;
  const animateDisplay = async opening => {
   const screen = projectDialog?.open ? projectDialog : document.body;
   const rect = screen.getBoundingClientRect();
   const origin = `${innerWidth/2-rect.left}px ${innerHeight/2-rect.top}px`;
   const frames = opening ? [
    {transform:'scale(.003,.003)',filter:'brightness(8)',opacity:0,offset:0},
    {transform:'scale(.8,.004)',filter:'brightness(5)',opacity:1,offset:.12},
    {transform:'scale(1,.007)',filter:'brightness(3)',offset:.26},
    {transform:'scale(1)',filter:'brightness(1.12)',offset:.75},
    {transform:'none',filter:'none',opacity:1,offset:1}
   ] : [
    {transform:'none',filter:'none',opacity:1,offset:0},
    {transform:'none',filter:'none',offset:.25},
    {transform:'translateX(1px)',filter:'drop-shadow(2px 0 #ef71a9) drop-shadow(-2px 0 #67e9ef)',offset:.29},
    {transform:'none',filter:'none',offset:.34},
    {transform:'scale(1,.006)',filter:'brightness(4)',offset:.7},
    {transform:'scale(.98,.003)',filter:'brightness(8)',opacity:1,offset:.8},
    {transform:'scale(.003,.003)',filter:'brightness(12)',opacity:1,offset:.96},
    {transform:'scale(0)',opacity:0,offset:1}
   ];
   displayAnimation = screen.animate(frames.map(frame=>({...frame,transformOrigin:origin})),{duration:opening?350:enabling?450:380,fill:'forwards'});
   await displayAnimation.finished;
  };
  try {
   // A single browser-composited viewport snapshot: no section transforms or media copies.
   root.dataset.retroTransition = reduced ? 'fade' : enabling ? 'boot' : 'exit';
   document.addEventListener('wheel',stopScroll,{passive:false,capture:true});
   document.addEventListener('touchmove',stopScroll,{passive:false,capture:true});
   document.addEventListener('keydown',stopNavigation,true);
   const mountOverlay = () => {
    (projectDialog?.open ? projectDialog : document.body).append(overlay);
    if(typeof overlay.showPopover === 'function') { overlay.setAttribute('popover','manual'); overlay.showPopover(); }
   };
   if(reduced) {
    if(document.startViewTransition) {
     transition = document.startViewTransition(change);
     await transition.finished;
    } else {
     mountOverlay(); overlay.dataset.phase = 'fade';
     overlay.style.background = '#000';
     await overlay.animate([{opacity:0},{opacity:1}],{duration:140,fill:'forwards'}).finished;
     change();
     await overlay.animate([{opacity:1},{opacity:0}],{duration:140,fill:'forwards'}).finished;
    }
   } else {
    if(document.startViewTransition) {
     transition = document.startViewTransition(() => { root.dataset.crtBlank = ''; });
     await transition.finished;
    } else {
     await animateDisplay(false);
     root.dataset.crtBlank = ''; displayAnimation.cancel();
    }
    mountOverlay(); overlay.dataset.phase = 'black';
    change();
    if(enabling) {
     message.textContent = 'KONAMI_SYS v1.986';
     await wait(120); message.textContent += '\nCODE ACCEPTED';
     await wait(120); message.textContent += '\nLOADING RETRO INTERFACE... ▌';
     await wait(310);
     overlay.dataset.phase = 'signal'; message.textContent = '198X MODE // ONLINE';
     await wait(200);
    } else await wait(170);
    overlay.remove();
    root.dataset.retroTransition = 'reveal';
    if(document.startViewTransition) {
     transition = document.startViewTransition(() => { delete root.dataset.crtBlank; });
     await transition.finished;
    } else {
     delete root.dataset.crtBlank;
     await animateDisplay(true); displayAnimation.cancel();
    }
   }
  } catch {
   transition?.skipTransition(); change();
  } finally {
   displayAnimation?.cancel();
   overlay.remove(); delete root.dataset.crtBlank; delete root.dataset.retroTransition;
   root.style.scrollBehavior = 'auto';
   window.scrollTo(position.x,position.y);
   if(projectDialog?.open) projectDialog.scrollTop = position.dialog;
   root.style.scrollBehavior = oldScrollBehavior;
   document.removeEventListener('wheel',stopScroll,true);
   document.removeEventListener('touchmove',stopScroll,true);
   document.removeEventListener('keydown',stopNavigation,true);
   busy = false;
   if(returnFocus) (projectDialog?.open ? projectDialog.querySelector('.close') : document.querySelector('.identity'))?.focus({preventScroll:true});
  }
 }
 status.addEventListener('click',toggle);
 document.addEventListener('keydown',event => {
  if(document.querySelector('.secret-shell[open],.editor-shell[open]')) { keys=[]; return; }
  const editable = event.composedPath().some(el => el instanceof Element && (el.matches('input,textarea,select,[role="textbox"]') || el.isContentEditable));
  if(editable || event.isComposing || event.ctrlKey || event.metaKey || event.altKey) { keys=[]; return; }
  if(busy || event.repeat) return;
  const key = event.key.length===1 ? event.key.toLowerCase() : event.key;
  keys.push(key);
  // Keep the longest suffix that is also a valid prefix (including repeated Up).
  while(keys.length && !keys.every((value,i)=>value===sequence[i])) keys.shift();
  if(keys.length===sequence.length) { event.preventDefault(); void toggle(); }
 },true);
})();
