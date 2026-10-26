'use strict';
const translatePublic=text=>{const locale=window.PORTFOLIO_I18N;return typeof text==='string'&&locale?.lang==='en'?(locale.strings[text]??text):text;};

const data = JSON.parse(document.getElementById('portfolio-data').textContent);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const node = (tag, cls, text) => { const el=document.createElement(tag); if(cls) el.className=cls; if(text!==undefined) el.textContent=translatePublic(text); return el; };
// Shared reveal observer also tracks content mounted by React.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const revealMotion={
 prepare:section=>window.portfolioScrollReveal?.prepare(section),
 arrive:section=>window.portfolioScrollReveal?.arrive(section)
};
const navLinks=[...document.querySelectorAll('.glass-nav a')];
const glassNav=document.querySelector('.glass-nav');
const glassPill=glassNav?.querySelector('.glass-pill');
let previewLink=null,navDestination=null,navClickTimer,glassTimer,lastPillX=null,lastPillWidth=null;
function moveGlass(link){
 if(!glassPill || !link)return;
 const x=link.offsetLeft,w=link.offsetWidth;
 if(x===lastPillX && w===lastPillWidth)return;
 if(lastPillX!==null && !reduced){
  glassPill.classList.remove('glass-moving');void glassPill.offsetWidth;glassPill.classList.add('glass-moving');
  clearTimeout(glassTimer);glassTimer=setTimeout(()=>glassPill.classList.remove('glass-moving'),650);
 }
 glassPill.style.setProperty('--pill-x',`${x}px`);
 glassPill.style.width=`${w}px`;
 glassNav.classList.add('is-ready');lastPillX=x;lastPillWidth=w;
}
function activeGlass(){moveGlass(previewLink||navLinks.find(a=>a.classList.contains('active'))||navLinks[0]);}
navLinks.forEach(link=>{
 link.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){previewLink=link;moveGlass(link);}});
 link.addEventListener('focus',()=>{previewLink=link;moveGlass(link);});
 link.addEventListener('blur',()=>{previewLink=null;activeGlass();});
 link.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const target=document.getElementById(link.hash.slice(1));
  previewLink=null;navDestination=link.hash;clearTimeout(navClickTimer);
  navLinks.forEach(a=>{a.classList.toggle('active',a===link);if(a===link)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  moveGlass(link);
  if(target&&!motionPreference.matches&&document.getElementById('main')?.animate){
   event.preventDefault();navbarTransition.go(target,link.hash);
  }
  navClickTimer=setTimeout(()=>{navDestination=null;scrollUpdate();},1100);
 });
});
glassNav?.addEventListener('pointerleave',()=>{previewLink=null;activeGlass();});
if('ResizeObserver' in window && glassNav)new ResizeObserver(()=>requestAnimationFrame(activeGlass)).observe(glassNav);
addEventListener('resize',()=>requestAnimationFrame(activeGlass));
document.fonts?.ready.then(activeGlass);

let scrollPending=false;
function scrollUpdate(){ const max=document.documentElement.scrollHeight-innerHeight; document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?scrollY/max:0})`;document.body.classList.toggle('scrolled',scrollY>20);const footerEl=document.getElementById('contact')||document.querySelector('.portfolio-footer');if(footerEl){const fRect=footerEl.getBoundingClientRect();const footerVisible=fRect.top<=innerHeight-40;document.body.classList.toggle('footer-in-view',footerVisible);glassNav?.classList.toggle('is-hidden-footer',footerVisible);}let active='#home';for(const link of navLinks){const sec=document.querySelector(link.hash);if(sec&&sec.getBoundingClientRect().top<=180) active=link.hash;}if(navDestination)active=navDestination;navLinks.forEach(a=>{a.classList.toggle('active',a.hash===active);if(a.hash===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});activeGlass();scrollPending=false;}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(scrollUpdate);}},{passive:true});scrollUpdate();
// This transition is triggered exclusively by the four floating navbar links.
const navbarTransition=(()=>{
 const main=document.getElementById('main');
 let run=0,animations=[];
 function clear(){animations.forEach(animation=>animation.cancel());animations=[];}
 function cancel(){run++;clear();navDestination=null;clearTimeout(navClickTimer);scrollUpdate();}
 async function go(target,hash){
  const ticket=++run;clear();
  const origin=document.activeElement;
  try{
   animations=[main.animate([{opacity:1},{opacity:0}],{duration:140,easing:'ease-out',fill:'forwards'})];
   await animations[0].finished;if(ticket!==run)return;
   revealMotion.prepare(target);
   window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-(target.id==='home'?0:88)),behavior:'instant'});
   if(location.hash!==hash)history.pushState(null,'',hash);
   scrollUpdate();revealMotion.arrive(target);clear();
   animations=[main.animate([{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'})];
   await animations[0].finished;if(ticket!==run)return;
   if(document.activeElement===origin){
    const hadTabindex=target.hasAttribute('tabindex');
    if(!hadTabindex)target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
    if(!hadTabindex)target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
   }
  }catch(error){
   // Cancelling a Web Animation rejects finished; leave the page interactive.
   if(ticket===run&&error.name!=='AbortError')window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-88),behavior:'auto'});
  }finally{if(ticket===run){clear();navDestination=null;clearTimeout(navClickTimer);scrollUpdate();}}
 }
 for(const type of ['wheel','touchstart','popstate','hashchange','pageshow'])addEventListener(type,cancel,{passive:true});
 addEventListener('keydown',event=>{if(['Escape','ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))cancel();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
 motionPreference.addEventListener('change',cancel);
 return{go};
})();

document.querySelectorAll('[data-filter-group]').forEach(group=>{const section=document.getElementById(group.dataset.filterGroup);const buttons=[...group.querySelectorAll('button')];buttons.forEach(button=>{button.setAttribute('aria-pressed',button.classList.contains('active'));button.addEventListener('click',()=>{buttons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button);});section.querySelectorAll('[data-category]').forEach(card=>{const isEnterpriseWeb=section.id==='projects' && button.dataset.filter.trim().toUpperCase()==='WEB DEVELOPMENT' && card.dataset.category.trim().toUpperCase()==='ENTERPRISE SYSTEM';card.hidden=button.dataset.filter!=='all' && card.dataset.category!==button.dataset.filter && !isEnterpriseWeb; if(!card.hidden){card.classList.add('visible');card.classList.remove('filter-enter');void card.offsetWidth;card.classList.add('filter-enter');}});section.dispatchEvent(new CustomEvent('portfolio:filter'));});});});
if(!reduced && matchMedia('(pointer: fine)').matches){document.querySelectorAll('.spotlight').forEach(card=>{let queued=false;card.addEventListener('pointermove',event=>{if(queued)return;queued=true;requestAnimationFrame(()=>{const r=card.getBoundingClientRect();card.style.setProperty('--x',`${event.clientX-r.left}px`);card.style.setProperty('--y',`${event.clientY-r.top}px`);queued=false;});});});}
const roles=data.roles.filter(Boolean);let role=0,pos=0,backward=false;
if(!reduced && roles.length && !document.getElementById('role-text')?.hasAttribute('data-react-role')){const text=document.getElementById('role-text');text.textContent='';function type(){const word=roles[role];if(document.hidden){setTimeout(type,1000);return;}pos+=backward?-1:1;text.textContent=word.slice(0,pos);let delay=backward?24:55;if(pos>=word.length){backward=true;delay=2200;}else if(pos<=0){backward=false;role=(role+1)%roles.length;delay=350;}setTimeout(type,delay);}setTimeout(type,document.documentElement.classList.contains('intro-pending')?1300:500);}
const dialog=document.getElementById('detail-dialog'),content=document.getElementById('detail-content');let opener=null,closeTimer,certificateRailCleanup;
function openDialog(source){clearTimeout(closeTimer);opener=source.closest('[hidden]')?document.activeElement:source;dialog.showModal();document.body.style.overflow='hidden';requestAnimationFrame(()=>dialog.classList.add('visible'));dialog.querySelector('.dialog-close').focus();}
function closeDialog(){dialog.classList.remove('visible');closeTimer=setTimeout(()=>{dialog.close();document.body.style.overflow='';opener?.focus();},reduced?0:220);}
dialog.addEventListener('close',()=>{certificateRailCleanup?.();certificateRailCleanup=null;});
dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog && (event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))closeDialog();});
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{certificateRailCleanup?.();certificateRailCleanup=null;dialog.classList.remove('certificates-dialog');const project=data.projects.find(p=>String(p.id)===button.dataset.project);if(!project)return;content.replaceChildren();content.append(node('span','eyebrow',`${project.category} / ${project.period}`));const title=node('h2','detail-title',project.title);title.id='detail-title';content.append(title);const image=node('img','detail-image');image.src=project.image;image.alt=project.title;content.append(image);const gallery=node('div','gallery');let pictures=[];try{pictures=JSON.parse(project.gallery);}catch{}pictures=[...new Set([project.image,...pictures].filter(Boolean))];pictures.forEach((src,index)=>{const thumb=node('button',index===0?'active':'');thumb.setAttribute('aria-label',`${translatePublic('Lihat gambar')} ${index+1}`);const img=node('img');img.src=src;img.alt=`${project.title} — ${index+1}`;thumb.append(img);thumb.addEventListener('click',()=>{image.src=src;gallery.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===thumb));});gallery.append(thumb);});if(pictures.length>1)content.append(gallery);content.append(node('p','detail-description',project.description));const tags=node('div','tags');let tagList=[];try{tagList=JSON.parse(project.tags);}catch{}tagList.forEach(tag=>tags.append(node('span','',tag)));content.append(tags);if(project.url){const link=node('a','button','Buka proyek');link.href=project.url;link.target='_blank';link.rel='noopener noreferrer';link.style.marginTop='24px';content.append(link);}openDialog(button);}));
document.querySelector('[data-open-cert]').addEventListener('click',event=>{certificateRailCleanup?.();certificateRailCleanup=null;dialog.classList.add('certificates-dialog');content.replaceChildren();content.append(node('p','eyebrow','PENCAPAIAN / KEEP LEARNING'));const title=node('h2','detail-title','Sertifikat & Pelatihan');title.id='detail-title';content.append(title);const grid=node('div','cert-grid');data.certificates.forEach(cert=>{const card=node('article','cert-card panel');card.append(node('span','eyebrow',`${cert.category} ${cert.period?' / '+cert.period:''}`),node('h3','',cert.title));if(cert.issuer)card.append(node('p','',cert.issuer));if(cert.image){
      const preview=node('div','cert-preview');
      const image=node('img','cert-preview-image');
      image.id=`cert-preview-${grid.children.length}`;
      image.src=cert.image;image.alt=cert.title;image.loading='lazy';image.decoding='async';
      const toggle=node('button','cert-preview-toggle','Buka preview');
      toggle.type='button';toggle.setAttribute('aria-controls',image.id);
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label',`Buka preview: ${cert.title}`);
      toggle.addEventListener('click',()=>{
        const revealed=preview.classList.toggle('is-revealed');
        toggle.setAttribute('aria-expanded',String(revealed));
        toggle.textContent=revealed?'Tutup preview':'Buka preview';
        toggle.setAttribute('aria-label',`${revealed?'Tutup':'Buka'} preview: ${cert.title}`);
      });
      preview.append(image,toggle);card.append(preview);
    }if(!cert.image)card.append(node('p','','Dokumen sertifikat belum dilampirkan.'));grid.append(card);});if(!data.certificates.length)grid.append(node('p','','Belum ada sertifikat.'));const swipeHint=node('p','cert-swipe-hint','Geser ke samping untuk melihat sertifikat lainnya.');content.append(swipeHint,grid);openDialog(event.currentTarget);certificateRailCleanup=setupCertificateRail(grid);});

// The horizontal mobile rail follows the active card's height, not the tallest card.
function setupCertificateRail(rail){
 const cards=[...rail.querySelectorAll('.cert-card')];
 if(!cards.length)return ()=>{};
 const media=matchMedia('(max-width:720px)');
 const controls=node('div','cert-rail-controls'),previous=node('button','cert-rail-prev','‹'),next=node('button','cert-rail-next','›'),position=node('span','cert-rail-position');
 previous.type=next.type='button';previous.setAttribute('aria-label',translatePublic('Sertifikat sebelumnya'));next.setAttribute('aria-label',translatePublic('Sertifikat berikutnya'));
 position.setAttribute('role','status');position.setAttribute('aria-live','polite');
 controls.append(previous,position,next);rail.after(controls);
 rail.setAttribute('tabindex','0');rail.setAttribute('role','region');rail.setAttribute('aria-label',translatePublic('Daftar sertifikat'));
 let active=0,frame=0;
 const step=()=>cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:rail.clientWidth;
 function paint(){
  frame=0;if(!dialog.open)return;
  if(media.matches){
   active=Math.max(0,Math.min(cards.length-1,Math.round(rail.scrollLeft/Math.max(1,step()))));
   rail.style.setProperty('--cert-rail-height',`${Math.ceil(cards[active].getBoundingClientRect().height)+18}px`);
  }else rail.style.removeProperty('--cert-rail-height');
  previous.disabled=active===0;next.disabled=active===cards.length-1;
  position.textContent=`${active+1} / ${cards.length}`;
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
 function move(direction){
  if(!media.matches)return;
  const target=Math.max(0,Math.min(cards.length-1,active+direction));
  rail.scrollTo({left:target*step(),behavior:reduced?'instant':'smooth'});
 }
 const keydown=event=>{if(!media.matches||event.target!==rail||!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();move(event.key==='ArrowLeft'?-1:1);};
 previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 rail.addEventListener('scroll',schedule,{passive:true});rail.addEventListener('keydown',keydown);media.addEventListener('change',schedule);
 const observer=new ResizeObserver(schedule);cards.forEach(card=>observer.observe(card));observer.observe(rail);
 schedule();
 return ()=>{cancelAnimationFrame(frame);observer.disconnect();rail.removeEventListener('scroll',schedule);rail.removeEventListener('keydown',keydown);media.removeEventListener('change',schedule);};
}

// Scroll-driven project gallery on desktop, native swipe on phones.
(()=>{
 const rail=document.querySelector('.project-grid');
 const section=document.getElementById('projects');
 const stage=section?.querySelector('.project-stage');
 if(!rail||!stage)return;
 rail.setAttribute('tabindex','0');rail.setAttribute('role','region');
 rail.setAttribute('aria-label','Daftar proyek. Scroll untuk menggeser proyek, atau gunakan tombol panah keyboard.');
 const desktop=matchMedia('(min-width: 900px) and (pointer: fine)');
 let pinned=false,startY=0,distance=0,target=rail.scrollLeft,frame=0,lastTime=0;
 let dragging=false,startX=0,startLeft=0,moved=false;
 const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
 const maxLeft=()=>Math.max(0,rail.scrollWidth-rail.clientWidth);
 function pageTo(left){
  // Native vertical scroll drives the horizontal position over this interval.
  window.scrollTo({top:startY+clamp(left,0,distance),behavior:'instant'});
 }
 function animate(now){
  frame=0;
  const dt=lastTime?Math.min(50,now-lastTime):16.7;lastTime=now;
  const error=target-rail.scrollLeft;
  if(motionPreference.matches||Math.abs(error)<.5){rail.scrollLeft=target;lastTime=0;rail.classList.remove('is-wheel-scrolling');return;}
  // Time-based easing keeps the same feel on 60 Hz and 120 Hz displays.
  // Some browsers round scrollLeft to whole pixels; keep the final steps moving.
  const step=Math.abs(error)*(1-Math.exp(-dt/70));
  rail.scrollLeft+=Math.sign(error)*Math.min(Math.abs(error),Math.max(1,step));
  frame=requestAnimationFrame(animate);
 }
 function move(left){
  target=clamp(left,0,maxLeft());rail.classList.add('is-wheel-scrolling');
  if(!frame)frame=requestAnimationFrame(animate);
 }
 function sync(){if(pinned&&!dragging)move(clamp(scrollY-startY,0,distance));}
 function layout(){
  section.classList.remove('projects-scroll-driven');section.style.removeProperty('min-height');
  distance=maxLeft();
  pinned=desktop.matches&&!motionPreference.matches&&distance>1;
  if(pinned){
   section.classList.add('projects-scroll-driven');
   const style=getComputedStyle(section);
   const top=parseFloat(style.paddingTop)||0,bottom=parseFloat(style.paddingBottom)||0;
   const stageHeight=stage.getBoundingClientRect().height;
   if(stageHeight>innerHeight-100){pinned=false;section.classList.remove('projects-scroll-driven');}
   else{
    section.style.minHeight=`${stageHeight+distance+top+bottom}px`;
    startY=section.getBoundingClientRect().top+scrollY+top-84;
   }
  }
  target=clamp(rail.scrollLeft,0,distance);
  if(pinned)sync();
 }
 rail.addEventListener('wheel',event=>{
  if(event.ctrlKey)return; // Preserve browser pinch-to-zoom.
  const delta=(Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY)
   *(event.deltaMode===1?16:event.deltaMode===2?rail.clientWidth:1);
  if(!delta)return;
  if(pinned){
   const inInterval=scrollY>=startY-2&&scrollY<=startY+distance+2;
   if(!inInterval)return;
   const position=clamp(scrollY-startY,0,distance);
   if((delta<0&&position<=1)||(delta>0&&position>=distance-1))return;
   event.preventDefault();pageTo(position+delta);sync();return;
  }
  // Handle both touchpad axes explicitly; do not rely on browser axis mapping.
  const max=maxLeft();
  if(max<=1||(delta<0&&target<=1)||(delta>0&&target>=max-1))return;
  event.preventDefault();move(target+delta);
 },{passive:false});
 rail.addEventListener('keydown',event=>{
  if(event.target!==rail||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  // Navigate between actual card edges, including the clamped final position.
  const padding=parseFloat(getComputedStyle(rail).paddingLeft)||0;
  const left=rail.getBoundingClientRect().left;
  const anchors=[0,...[...rail.querySelectorAll('.project-card')].filter(card=>!card.hidden).map(card=>clamp(card.getBoundingClientRect().left-left+rail.scrollLeft-padding,0,maxLeft())),maxLeft()];
  const stops=[...new Set(anchors.map(value=>Math.round(value)))].sort((a,b)=>a-b);
  const current=stops.reduce((best,value,index)=>Math.abs(value-target)<Math.abs(stops[best]-target)?index:best,0);
  const next=event.key==='Home'?0:event.key==='End'?maxLeft():stops[clamp(current+(event.key==='ArrowRight'?1:-1),0,stops.length-1)];
  if(pinned)pageTo(next);move(next);
 });
 rail.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0)return;
  dragging=true;moved=false;startX=event.clientX;startLeft=rail.scrollLeft;
  if(frame){cancelAnimationFrame(frame);frame=0;}target=rail.scrollLeft;
 });
 rail.addEventListener('pointermove',event=>{
  if(!dragging)return;const delta=event.clientX-startX;
  if(Math.abs(delta)>7){
   moved=true;rail.classList.add('is-dragging');rail.setPointerCapture(event.pointerId);event.preventDefault();
   target=clamp(startLeft-delta,0,maxLeft());rail.scrollLeft=target;
   if(pinned)pageTo(target);
  }
 });
 function stop(){dragging=false;rail.classList.remove('is-dragging');}
 rail.addEventListener('pointerup',stop);rail.addEventListener('pointercancel',()=>{stop();moved=false;});rail.addEventListener('lostpointercapture',stop);
 rail.addEventListener('pointerleave',()=>{if(!moved)stop();});
 rail.addEventListener('click',event=>{if(moved){event.preventDefault();event.stopPropagation();moved=false;}},true);
 rail.querySelectorAll('img').forEach(image=>image.draggable=false);
 rail.addEventListener('touchstart',()=>{if(frame){cancelAnimationFrame(frame);frame=0;}},{passive:true});
 rail.addEventListener('scroll',()=>{if(!frame&&!pinned&&!dragging)target=rail.scrollLeft;},{passive:true});
 section.addEventListener('portfolio:filter',()=>{
  const wasPinned=pinned,wasInside=scrollY>=startY&&scrollY<=startY+distance;
  if(frame){cancelAnimationFrame(frame);frame=0;}
  rail.scrollLeft=target=0;layout();
  if(wasPinned&&wasInside){window.scrollTo({top:pinned?startY:section.getBoundingClientRect().top+scrollY-84,behavior:'instant'});target=0;rail.scrollLeft=0;}
 });
 addEventListener('scroll',sync,{passive:true});
 addEventListener('resize',layout);desktop.addEventListener('change',layout);motionPreference.addEventListener('change',layout);
 document.fonts?.ready.then(layout);
 rail.querySelectorAll('img').forEach(image=>{if(!image.complete)image.addEventListener('load',layout,{once:true});});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;lastTime=0;}else sync();});
 layout();
})();

// Native scroll-snap carousel: touch scroll, mouse drag, keyboard and autoplay.
const carousel=document.querySelector('.experience-carousel');
if(carousel&&!document.getElementById('experience').classList.contains('experience-react-ready')){
 const track=carousel.querySelector('.experience-track');
 const allSlides=[...track.querySelectorAll('.experience-card')];
 let slides=[],activeIndex=0,userPaused=reduced,hovered=false,focused=false,dragging=false,inView=false,timer=null,scrollFrame=0,dragStart=0,dragScroll=0,dragMoved=false;
 const motion=()=>reduced?'auto':'smooth';
 function canPlay(){return slides.length>1&&!userPaused&&!hovered&&!focused&&!dragging&&inView&&!document.hidden;}
 function stop(){clearTimeout(timer);timer=null;}
 function schedule(){stop();if(canPlay())timer=setTimeout(()=>{go(activeIndex+1);},4500);}
 function updateActive(index){
  activeIndex=Math.max(0,Math.min(index,slides.length-1));
  allSlides.forEach(slide=>slide.classList.toggle('is-current',slide===slides[activeIndex]));
 }
 function go(index,behavior=motion()){
  if(!slides.length)return;
  const target=((index%slides.length)+slides.length)%slides.length;
  const slide=slides[target];
  updateActive(target);
  track.scrollTo({left:slide.offsetLeft-(track.clientWidth-slide.offsetWidth)/2,behavior});
  schedule();
 }
 function layout(){
  if(!slides.length)return;
  const gutter=Math.max(12,(track.clientWidth-slides[0].offsetWidth)/2);
  track.style.paddingLeft=`${gutter}px`;track.style.paddingRight=`${gutter}px`;
  go(activeIndex,'auto');
 }
 function rebuild(initial=true){
  stop();slides=allSlides.filter(slide=>!slide.hidden);
  activeIndex=initial?Math.min(2,Math.max(0,slides.length-1)):Math.floor(slides.length/2);
  updateActive(activeIndex);requestAnimationFrame(layout);
 }
 function syncPause(){
  track.setAttribute('data-autoplay',userPaused?'paused':'playing');
  schedule();
 }
 carousel.classList.add('carousel-ready');rebuild();syncPause();
 track.addEventListener('scroll',()=>{
  if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{
   scrollFrame=0;if(!slides.length)return;
   const center=track.scrollLeft+track.clientWidth/2;
   let nearest=0,distance=Infinity;
   slides.forEach((slide,i)=>{const d=Math.abs(slide.offsetLeft+slide.offsetWidth/2-center);if(d<distance){nearest=i;distance=d;}});
   updateActive(nearest);schedule();
  });
 },{passive:true});
 track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(activeIndex+(event.key==='ArrowRight'?1:-1));}else if(event.key===' '){event.preventDefault();userPaused=!userPaused;syncPause();}else if(event.key==='Escape'){userPaused=true;syncPause();}});
 track.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0)return;
  dragging=true;dragMoved=false;dragStart=event.clientX;dragScroll=track.scrollLeft;track.setPointerCapture(event.pointerId);stop();
 });
 track.addEventListener('pointermove',event=>{
  if(!dragging)return;const delta=event.clientX-dragStart;
  if(Math.abs(delta)>6){dragMoved=true;track.classList.add('is-dragging');event.preventDefault();track.scrollLeft=dragScroll-delta;}
 });
 function endDrag(){if(!dragging)return;dragging=false;track.classList.remove('is-dragging');if(dragMoved){requestAnimationFrame(()=>go(activeIndex));}else schedule();}
 track.addEventListener('pointerup',endDrag);track.addEventListener('pointercancel',endDrag);track.addEventListener('lostpointercapture',endDrag);
 track.addEventListener('click',event=>{if(dragMoved){dragMoved=false;event.preventDefault();return;}const slide=event.target.closest('.experience-card');const i=slides.indexOf(slide);if(i>=0&&i!==activeIndex)go(i);});
 carousel.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;stop();}});
 carousel.addEventListener('pointerleave',()=>{hovered=false;schedule();});
 carousel.addEventListener('focusin',()=>{focused=true;stop();});
 carousel.addEventListener('focusout',()=>{setTimeout(()=>{focused=carousel.contains(document.activeElement);schedule();},0);});
 track.addEventListener('touchstart',()=>{dragging=true;stop();},{passive:true});
 const endTouch=()=>{dragging=false;schedule();};track.addEventListener('touchend',endTouch,{passive:true});track.addEventListener('touchcancel',endTouch,{passive:true});
 document.getElementById('experience').addEventListener('portfolio:filter',()=>rebuild(false));
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(carousel);else{inView=true;schedule();}
 document.addEventListener('visibilitychange',schedule);
 if('ResizeObserver' in window)new ResizeObserver(()=>requestAnimationFrame(layout)).observe(track);else addEventListener('resize',layout);
}


const lfjBadge=document.querySelector('.lfj-badge');
if(lfjBadge && !lfjBadge.hasAttribute('data-react-managed')){
 let pinned=false;
 const expand=value=>lfjBadge.setAttribute('aria-expanded',String(value));
 lfjBadge.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')expand(true);});
 lfjBadge.addEventListener('pointerleave',()=>{if(!pinned)expand(false);});
 lfjBadge.addEventListener('focus',()=>expand(true));
 lfjBadge.addEventListener('blur',()=>{pinned=false;expand(false);});
 lfjBadge.addEventListener('click',()=>{pinned=!pinned;expand(pinned);});
 lfjBadge.addEventListener('keydown',event=>{if(event.key==='Escape'){pinned=false;expand(false);}});
 document.addEventListener('pointerdown',event=>{if(!lfjBadge.contains(event.target)){pinned=false;expand(false);}});
}
