'use strict';
(()=>{
 const dialog=document.getElementById('cv-image-dialog');if(!dialog)return;
 const stage=dialog.querySelector('.cv-preview-stage'),image=dialog.querySelector('.cv-preview-page'),status=dialog.querySelector('.cv-preview-status'),counter=dialog.querySelector('[data-cv-page]'),prev=dialog.querySelector('[data-cv-prev]'),next=dialog.querySelector('[data-cv-next]'),retry=dialog.querySelector('.cv-preview-retry');
 const script=document.currentScript,assetBase=new URL('vendor/pdfjs/',script.src);
 const t=text=>window.PORTFOLIO_I18N?.lang==='en'?(window.PORTFOLIO_I18N.strings[text]??text):text;
 let library,documentTask,pdf,renderTask,opener,pageNumber=1,generation=0,oldOverflow='';
 const controls=busy=>{prev.disabled=busy||!pdf||pageNumber<=1;next.disabled=busy||!pdf||pageNumber>=pdf.numPages;};
 async function paint(token){
  controls(true);image.hidden=true;status.hidden=false;status.textContent=t('Memuat preview CV…');stage.setAttribute('aria-busy','true');
  try{
   const page=await pdf.getPage(pageNumber);if(token!==generation||!dialog.open)return;
   const natural=page.getViewport({scale:1});const scale=Math.min(2,Math.max(1,(Math.min(innerWidth-68,680)*Math.min(devicePixelRatio||1,2))/natural.width));
   const viewport=page.getViewport({scale}),canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
   renderTask=page.render({canvasContext:canvas.getContext('2d'),viewport,background:'#ffffff'});await renderTask.promise;
   if(token!==generation||!dialog.open)return;
   image.src=canvas.toDataURL('image/jpeg',.94);image.alt=`${t('Halaman CV')} ${pageNumber}`;image.hidden=false;status.hidden=true;counter.textContent=`${t('Halaman')} ${pageNumber} / ${pdf.numPages}`;page.cleanup();controls(false);
  }catch(error){if(token===generation&&dialog.open&&error?.name!=='RenderingCancelledException')fail();}
  finally{if(token===generation)stage.setAttribute('aria-busy','false');}
 }
 function fail(){image.hidden=true;status.hidden=false;status.textContent=t('Preview CV belum dapat ditampilkan. Silakan coba lagi.');retry.hidden=false;counter.textContent='';controls(true);stage.setAttribute('aria-busy','false');}
 async function load(){
  const token=++generation;pageNumber=1;retry.hidden=true;image.hidden=true;status.hidden=false;status.textContent=t('Memuat preview CV…');counter.textContent='';controls(true);stage.setAttribute('aria-busy','true');
  try{
   library??=import(new URL('pdf.js',assetBase).href);const pdfjs=await library;if(token!==generation||!dialog.open)return;
   pdfjs.GlobalWorkerOptions.workerSrc=new URL('pdf.worker.js',assetBase).href;
   documentTask=pdfjs.getDocument({url:new URL('preview-cv.php',document.baseURI).href,cMapUrl:new URL('cmaps/',assetBase).href,cMapPacked:true,standardFontDataUrl:new URL('standard_fonts/',assetBase).href,wasmUrl:new URL('wasm/',assetBase).href,isEvalSupported:false});
   const loaded=await documentTask.promise;if(token!==generation||!dialog.open){await loaded.destroy();return;}pdf=loaded;await paint(token);
  }catch{if(token===generation&&dialog.open)fail();}
 }
 document.addEventListener('click',event=>{
  const link=event.target.closest?.('[data-cv-preview]');if(!link)return;event.preventDefault();if(dialog.open)return;
  opener=link;oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('.cv-preview-close').focus();load();
 });
 dialog.querySelector('.cv-preview-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{++generation;renderTask?.cancel();documentTask?.destroy().catch(()=>{});pdf=null;documentTask=null;renderTask=null;image.removeAttribute('src');image.hidden=true;document.body.style.overflow=oldOverflow;opener?.focus({preventScroll:true});});
 prev.addEventListener('click',()=>{if(pdf&&pageNumber>1){pageNumber--;paint(generation);}});
 next.addEventListener('click',()=>{if(pdf&&pageNumber<pdf.numPages){pageNumber++;paint(generation);}});
 retry.addEventListener('click',()=>{documentTask?.destroy().catch(()=>{});pdf=null;load();});
 controls(true);
})();
