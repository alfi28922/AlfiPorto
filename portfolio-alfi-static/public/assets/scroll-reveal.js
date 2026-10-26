'use strict';
(() => {
 const html=document.documentElement, preference=matchMedia('(prefers-reduced-motion: reduce)');
 const selector='.reveal,.ae-reveal,[data-scroll-reveal],.skill-card,.ae-skill-row,.ae-experience-row,.ae-polaroids';
 const tracked=new Set();let observer=null,queued=false;
 function show(el){el.dataset.revealState='visible';el.classList.add('visible','ae-visible');observer?.unobserve(el);}
 function register(el){
  if(tracked.has(el))return;tracked.add(el);
  el.dataset.revealState='pending';
  if(preference.matches||!observer||el.contains(document.activeElement)){show(el);return;}
  observer.observe(el);
 }
 function refresh(){queued=false;for(const el of tracked)if(!el.isConnected){observer?.unobserve(el);tracked.delete(el);}document.querySelectorAll(selector).forEach(register);}
 function refreshSoon(){if(!queued){queued=true;queueMicrotask(refresh);}}
 function arrive(section){if(!section)return;refresh();for(const el of tracked){if(section!==el&&!section.contains(el))continue;const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)show(el);}}
 function setup(){
  observer?.disconnect();observer=null;
  if(!preference.matches&&'IntersectionObserver' in window){
   observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)show(e.target);},{rootMargin:'0px 0px -6% 0px',threshold:0});
  }
  html.classList.add('scroll-reveal-ready');
  for(const el of tracked){if(preference.matches)show(el);else if(el.dataset.revealState!=='visible')observer?.observe(el);}
  refresh();
 }
 document.addEventListener('focusin',e=>{for(let el=e.target;el&&el!==document.body;el=el.parentElement)if(el.matches?.(selector)){register(el);show(el);}});
 document.addEventListener('portfolio:content-ready',refreshSoon);
 document.addEventListener('portfolio:section-before',refreshSoon);
 document.addEventListener('portfolio:section-after',e=>arrive(e.detail.target));
 addEventListener('pageshow',e=>{refresh();if(e.persisted)arrive(document.body);});
 preference.addEventListener('change',setup);
 setup();new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1)))refreshSoon();}).observe(document.body,{childList:true,subtree:true});
 window.portfolioScrollReveal={refresh,prepare:refresh,arrive};
 clearTimeout(window.portfolioRevealFallback);
})();
