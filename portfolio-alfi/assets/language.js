'use strict';
// Keep the current reading position when a language link reloads this page.
const languageScrollKey='portfolio-language-scroll';
document.addEventListener('click',event=>{const link=event.target.closest('a[data-language]');if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;try{sessionStorage.setItem(languageScrollKey,JSON.stringify({path:location.pathname,y:scrollY,at:Date.now()}));}catch{}});
addEventListener('load',()=>{try{const saved=JSON.parse(sessionStorage.getItem(languageScrollKey)||'null');sessionStorage.removeItem(languageScrollKey);if(saved?.path===location.pathname&&new URLSearchParams(location.search).has('lang'))requestAnimationFrame(()=>scrollTo({top:saved.y,behavior:'instant'}));}catch{}},{once:true});
