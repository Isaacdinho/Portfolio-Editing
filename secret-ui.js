export const avatar='assets/images/isaac-pixel.png';
export function el(tag,cls='',text){const n=document.createElement(tag);n.className=cls;if(text!==undefined)n.textContent=text;return n;}
export function button(text,fn,cls=''){const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
export function shell(title,onClose){
 const focus=document.activeElement,y=scrollY,root=document.documentElement,overflow=root.style.overflow;let closed=false;const cleanup=[];
 const d=el('dialog','secret-shell');d.setAttribute('aria-label',title);const header=el('header','secret-header');header.append(el('span','secret-wordmark','ICB / AFTER HOURS'),button('Return to Portfolio ↗',close));const body=el('div','secret-body');d.append(header,body);document.body.append(d);root.style.overflow='hidden';d.showModal();
 const videos=[...document.querySelectorAll('video')].filter(v=>!v.paused);videos.forEach(v=>v.pause());
 function close(){if(closed)return;closed=true;cleanup.forEach(fn=>fn());d.close();d.remove();root.style.overflow=overflow;window.scrollTo({top:y,behavior:'instant'});focus?.focus({preventScroll:true});videos.forEach(v=>v.play().catch(()=>{}));onClose?.();}
 d.addEventListener('cancel',e=>{e.preventDefault();close();});return {d,body,close,cleanup};
}
