'use strict';
(() => {
 const html=document.documentElement,preference=matchMedia('(prefers-reduced-motion: reduce)');
 const selector='.reveal,.ae-reveal,[data-scroll-reveal],.skill-card,.ae-skill-row,.ae-experience-row,.ae-polaroid';
 const items=new Map(),active=new Set();
 let observer,frame=0,queued=false,lastScrollY=window.scrollY;
 const enabled=()=>!preference.matches&&'IntersectionObserver' in window;
 function easeOutCubic(x){return 1-Math.pow(1-x,3);}
 function paint(el,item,rawP){
  const p=Math.max(0,Math.min(1,rawP));
  const eased=easeOutCubic(p);
  const sign=item.direction==='up'?-1:1;
  const y=(1-eased)*38*sign;
  const scale=0.968+eased*0.032;
  const blur=Math.max(0,(1-Math.min(1,p*1.45))*5.5);
  el.dataset.revealState=p>=.995?'visible':p<=.001?'pending':'revealing';
  el.style.setProperty('--sr-opacity',String(Math.min(1,p*6.2)));
  el.style.setProperty('--sr-y',`${y.toFixed(2)}px`);
  el.style.setProperty('--sr-scale',scale.toFixed(4));
  el.style.setProperty('--sr-blur',`${blur.toFixed(2)}px`);
  el.style.setProperty('--sr-mask',String(Math.max(0,1-Math.max(0,(p-.16)/.84))));
  if(p>=0.3)el.classList.add('visible','ae-visible');
  item.y=y;item.progress=p;
 }
 function show(el){const item=items.get(el);if(item){item.complete=true;paint(el,item,1);}}
 function update(){
  frame=0;
  const currentScrollY=window.scrollY;
  const scrollDir=currentScrollY<lastScrollY?'up':'down';
  lastScrollY=currentScrollY;
  html.dataset.scrollDirection=scrollDir;
  for(const[el,item]of items){
   if(!item.complete||el.contains(document.activeElement)||el.closest('[hidden]'))continue;
   const r=el.getBoundingClientRect();
   if(r.top>innerHeight+180||r.bottom< -180){item.complete=false;item.direction=r.bottom<0?'up':'down';paint(el,item,0);}
  }
  for(const el of active){
   const item=items.get(el);if(!item||!el.isConnected||el.closest('[hidden]'))continue;
   const rect=el.getBoundingClientRect();
   const translated=getComputedStyle(el).translate.split(' ');
   const renderedY=translated.length>1?(parseFloat(translated[1])||0):0;
   const top=rect.top-renderedY,bottom=rect.bottom-renderedY;
   if(el.contains(document.activeElement)||!enabled()){show(el);continue;}
   if(top>innerHeight+140||bottom< -140){item.complete=false;item.direction=bottom<0?'up':'down';paint(el,item,0);continue;}
   if(item.complete){paint(el,item,1);continue;}
   let p=item.direction==='up'?(bottom-innerHeight*.08)/(innerHeight*.52):(innerHeight*.92-top)/(innerHeight*.52);
   const remaining=Math.max(0,html.scrollHeight-innerHeight-scrollY);
   p=Math.max(p,1-remaining/(innerHeight*.32));
   const target=Math.max(0,Math.min(1,p));
   const next=item.progress+(target-item.progress)*0.32;
   if(Math.abs(target-next)<0.006&&target>=0.995){
    item.complete=true;paint(el,item,1);
   }else{
    paint(el,item,next);
    if(Math.abs(target-next)>=0.006)schedule();
   }
  }
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 function register(el,idx=0){
  if(items.has(el))return;
  const r=el.getBoundingClientRect();
  const item={y:0,progress:0,complete:false,direction:r.bottom<0?'up':'down'};items.set(el,item);
  if(getComputedStyle(el).position==='static')el.style.position='relative';
  el.style.setProperty('--sr-stagger',`${(idx%4)*45}ms`);
  if(!enabled()||el.contains(document.activeElement)||r.top<innerHeight*.76&&r.bottom>0){show(el);}else paint(el,item,0);
  observer?.observe(el);
 }
 function refresh(){
  queued=false;
  for(const[el]of items)if(!el.isConnected){observer?.unobserve(el);active.delete(el);items.delete(el);}
  document.querySelectorAll(selector).forEach((el,i)=>register(el,i));schedule();
 }
 function refreshSoon(){if(!queued){queued=true;queueMicrotask(refresh);}}
 function setup(){
  observer?.disconnect();active.clear();
  if(!enabled()){html.classList.remove('scroll-reveal-ready');items.forEach((_,el)=>show(el));return;}
  html.classList.add('scroll-reveal-ready');
  observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    const el=entry.target,item=items.get(el);if(!item)continue;
    if(entry.isIntersecting){active.add(el);}else{
     active.delete(el);
     if(!el.contains(document.activeElement)&&!el.closest('[hidden]')){item.complete=false;item.direction=entry.boundingClientRect.bottom<0?'up':'down';paint(el,item,0);}
    }
   }schedule();
  },{rootMargin:'180px 0px 180px 0px',threshold:0});
  refresh();items.forEach((_,el)=>observer.observe(el));
 }
 function prepare(section){refresh();}
 function arrive(section){refresh();for(const[el]of items)if(section===el||section.contains(el)){const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)show(el);}}
 document.addEventListener('focusin',event=>{for(let el=event.target;el&&el!==document.body;el=el.parentElement)if(el.matches?.(selector)){register(el);show(el);}});
 document.addEventListener('portfolio:content-ready',refreshSoon);
 document.addEventListener('portfolio:section-before',event=>prepare(event.detail.target));
 document.addEventListener('portfolio:section-after',event=>arrive(event.detail.target));
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 addEventListener('pageshow',event=>{refresh();if(event.persisted)arrive(document.body);});
 preference.addEventListener('change',setup);
 setup();new MutationObserver(refreshSoon).observe(document.body,{childList:true,subtree:true});
 window.portfolioScrollReveal={refresh,prepare,arrive};
 clearTimeout(window.portfolioRevealFallback);
})();
