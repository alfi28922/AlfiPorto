"use strict";
const languageScrollKey='portfolio-language-scroll';
const langPage=p=>p.replace(/-en(?=\.html$)/,'').replace(/index\.html$/,'');
document.addEventListener('click',e=>{const a=e.target.closest('a[data-language]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;try{sessionStorage.setItem(languageScrollKey,JSON.stringify({path:langPage(location.pathname),y:scrollY,at:Date.now()}));}catch{}});
addEventListener('load',()=>{try{const s=JSON.parse(sessionStorage.getItem(languageScrollKey)||'null');sessionStorage.removeItem(languageScrollKey);if(s&&Date.now()-s.at<30000&&s.path===langPage(location.pathname))requestAnimationFrame(()=>scrollTo({top:s.y,behavior:'instant'}));}catch{}},{once:true});
