'use strict';
(()=>{
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(pointer: fine)');
 const root=document.documentElement,cover=document.querySelector('[data-cover-hero]');
 const progress=document.querySelector('.scroll-progress')||Object.assign(document.createElement('div'),{className:'motion-progress'});
 if(!progress.isConnected){progress.setAttribute('aria-hidden','true');document.body.append(progress);}
 const halo=document.createElement('div');halo.className='motion-halo';halo.setAttribute('aria-hidden','true');document.body.append(halo);
 let frame=0,pointerFrame=0,mouseX=0,mouseY=0,currentX=0,currentY=0;
 function scrollFrame(){
  frame=0;const max=root.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;
  if(cover){const rect=cover.getBoundingClientRect();const amount=preference.matches?0:Math.max(0,Math.min(1,-rect.top/rect.height));cover.style.setProperty('--cover-progress',String(amount));}
 }
 function drawPointer(){
  pointerFrame=0;if(preference.matches||!fine.matches)return;
  currentX+=(mouseX-currentX)*.18;currentY+=(mouseY-currentY)*.18;
  halo.style.transform=`translate3d(${currentX-130}px,${currentY-130}px,0)`;
  if(Math.abs(mouseX-currentX)+Math.abs(mouseY-currentY)>.6)pointerFrame=requestAnimationFrame(drawPointer);
 }
 addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||preference.matches||!fine.matches)return;
  mouseX=event.clientX;mouseY=event.clientY;halo.classList.add('is-active');
  if(!pointerFrame)pointerFrame=requestAnimationFrame(drawPointer);
 },{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>halo.classList.remove('is-active'));
 document.querySelectorAll('.project-card,.skill-card').forEach(card=>{
  card.setAttribute('data-motion-tilt','');let queued=0,rx=0,ry=0;
  const paint=()=>{queued=0;card.style.setProperty('--motion-rx',`${rx}deg`);card.style.setProperty('--motion-ry',`${ry}deg`);};
  card.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||preference.matches)return;const rect=card.getBoundingClientRect();rx=-(event.clientY-rect.top-rect.height/2)/rect.height*3;ry=(event.clientX-rect.left-rect.width/2)/rect.width*4;if(!queued)queued=requestAnimationFrame(paint);});
  card.addEventListener('pointerleave',()=>{rx=ry=0;if(!queued)queued=requestAnimationFrame(paint);});
  preference.addEventListener('change',()=>{rx=ry=0;paint();});
 });
 document.querySelectorAll('.button,.pf-orbit-contact,.ph-discover').forEach(button=>{
  button.classList.add('motion-magnetic');
  button.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||preference.matches)return;const rect=button.getBoundingClientRect();button.style.setProperty('--magnetic-x',`${(event.clientX-rect.left-rect.width/2)*.08}px`);button.style.setProperty('--magnetic-y',`${(event.clientY-rect.top-rect.height/2)*.1}px`);});
  const reset=()=>{button.style.setProperty('--magnetic-x','0px');button.style.setProperty('--magnetic-y','0px');};button.addEventListener('pointerleave',reset);button.addEventListener('blur',reset);preference.addEventListener('change',reset);
 });
 if(cover){
  cover.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||preference.matches)return;const rect=cover.getBoundingClientRect();cover.style.setProperty('--pointer-x',`${(event.clientX-rect.width/2)*.008}px`);cover.style.setProperty('--pointer-y',`${(event.clientY-rect.top-rect.height/2)*.008}px`);},{passive:true});
  cover.addEventListener('pointerleave',()=>{cover.style.setProperty('--pointer-x','0px');cover.style.setProperty('--pointer-y','0px');});
 }
 addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(scrollFrame);},{passive:true});addEventListener('resize',scrollFrame);
 preference.addEventListener('change',()=>{halo.classList.remove('is-active');if(pointerFrame)cancelAnimationFrame(pointerFrame);pointerFrame=0;scrollFrame();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(pointerFrame)cancelAnimationFrame(pointerFrame);pointerFrame=0;halo.classList.remove('is-active');}});
 root.classList.add('motion-ready');scrollFrame();
})();
