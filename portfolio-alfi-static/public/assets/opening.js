'use strict';
(() => {
 const root=document.documentElement;
 if(!root.classList.contains('intro-pending'))return;
 const started=performance.now();
 const targets=[...document.querySelectorAll('main,footer,.site-header,.glass-nav,.ae-menu-toggle,#ae-menu')];
 targets.forEach(el=>{el.inert=true;el.setAttribute('data-entry-inert','');});
 let finished=false;
 function finish(){
  if(finished)return;finished=true;clearTimeout(window.entryFallback);
  root.classList.remove('intro-pending');root.classList.add('entry-complete');
  setTimeout(()=>{document.querySelector('.entry-screen')?.remove();targets.forEach(el=>{el.inert=false;el.removeAttribute('data-entry-inert');});},800);
 }
 function ready(){setTimeout(finish,Math.max(0,1500-(performance.now()-started)));}
 if(document.readyState==='complete')ready();else addEventListener('load',ready,{once:true});
 setTimeout(finish,2600);
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{if(event.matches)finish();});
})();
