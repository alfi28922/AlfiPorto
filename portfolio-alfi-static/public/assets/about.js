'use strict';
(()=>{
 const translatePublic=text=>window.PORTFOLIO_I18N?.lang==='en'?(window.PORTFOLIO_I18N.strings[text]??text):text;
 const button=document.querySelector('.ae-menu-toggle'),menu=document.getElementById('ae-menu');
 let opener=null;
 function setMenu(open){
  menu.hidden=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',translatePublic(open?'Tutup menu':'Buka menu'));document.body.classList.toggle('ae-menu-open',open);
  if(open){opener=document.activeElement;menu.querySelector('a')?.focus();}else opener?.focus();
 }
 button.addEventListener('click',()=>setMenu(button.getAttribute('aria-expanded')!=='true'));
 document.addEventListener('keydown',event=>{
  if(menu.hidden)return;
  if(event.key==='Escape'){setMenu(false);return;}
  if(event.key==='Tab'){
   const controls=[button,...menu.querySelectorAll('a')];const first=controls[0],last=controls.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
 });
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 reduced.addEventListener('change',()=>update());
 // Specialty emphasis follows text hover / keyboard focus in CSS; no sticky selection.
 const gallery=document.querySelector('.ae-polaroids');
 const hero=document.querySelector('.personal-hero');
 const skillRows=[...document.querySelectorAll('.ae-skill-row')];
 const tilt=document.querySelector('[data-portrait-tilt]');
 let frame=0;
 function update(){
  frame=0;
  if(gallery&&innerWidth>720){const rect=gallery.getBoundingClientRect();const progress=reduced.matches?1:Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.85)));gallery.style.setProperty('--gallery-progress',String(progress));}
  if(hero&&innerWidth>720){const rect=hero.getBoundingClientRect();const progress=reduced.matches?0:Math.max(0,Math.min(1,-rect.top/rect.height));hero.style.setProperty('--hero-progress',String(progress));}
  let current=skillRows[0];skillRows.forEach(row=>{if(row.getBoundingClientRect().top<innerHeight*.55)current=row;});skillRows.forEach(row=>row.classList.toggle('is-current',row===current));
 }
 let tiltFrame=0,tiltX=0,tiltY=0;
 function paintTilt(){tiltFrame=0;tilt?.style.setProperty('--tilt-x',`${tiltX}px`);tilt?.style.setProperty('--tilt-y',`${tiltY}px`);}
 tilt?.addEventListener('pointermove',event=>{
  if(reduced.matches||event.pointerType!=='mouse')return;
  const rect=tilt.getBoundingClientRect();tiltX=(event.clientX-rect.left-rect.width/2)*.025;tiltY=(event.clientY-rect.top-rect.height/2)*.025;
  if(!tiltFrame)tiltFrame=requestAnimationFrame(paintTilt);
 });
 tilt?.addEventListener('pointerleave',()=>{tiltX=tiltY=0;if(!tiltFrame)tiltFrame=requestAnimationFrame(paintTilt);});
 reduced.addEventListener('change',()=>{tiltX=tiltY=0;paintTilt();});
 addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true});addEventListener('resize',update);update();
})();
