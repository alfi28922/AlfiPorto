<!-- Google Fonts: Plus Jakarta Sans, Syne, Space Grotesk, Instrument Serif, JetBrains Mono -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">

<script>
// Carry the curtain across a full PHP page navigation; fail open if JS fails.
try {
 const saved=JSON.parse(sessionStorage.getItem('portfolio-route-arrival')||'null');
 sessionStorage.removeItem('portfolio-route-arrival');
 if(saved && Date.now()-saved.at<12000 && Date.now()>=saved.at && saved.path===location.pathname+location.search && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  window.portfolioRouteArrival=saved;
  document.documentElement.classList.add('route-arriving');
  window.portfolioRouteFallback=setTimeout(()=>document.documentElement.classList.remove('route-arriving'),4500);
 }
} catch (_) {}
</script>

<script>
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('scroll-reveal-ready');
 window.portfolioRevealFallback=setTimeout(()=>document.documentElement.classList.remove('scroll-reveal-ready'),4500);
}
</script>

<script>
// Only a real language-button reload skips the opening; ?lang on its own does not.
try {
 const saved=JSON.parse(sessionStorage.getItem('portfolio-language-scroll')||'null');
 window.portfolioLanguageReload=!!(saved&&saved.path===location.pathname&&Date.now()-saved.at<12000&&Date.now()>=saved.at);
} catch(_) {}
if(!window.portfolioRouteArrival&&!window.portfolioLanguageReload&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 document.documentElement.classList.add('intro-pending');
 window.entryFallback=setTimeout(()=>{
  document.documentElement.classList.remove('intro-pending');
  document.querySelectorAll('[data-entry-inert]').forEach(el=>{el.inert=false;el.removeAttribute('data-entry-inert');});
 },5000);
}
</script>
