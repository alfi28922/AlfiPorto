document.querySelectorAll('form[data-confirm]').forEach(form=>form.addEventListener('submit',event=>{if(!confirm(form.dataset.confirm))event.preventDefault();}));
document.querySelectorAll('[data-media-field]').forEach(editor=>{
 const input=editor.querySelector('[data-media-upload]'),pending=editor.querySelector('[data-pending-previews]'),clear=editor.querySelector('[data-clear-upload]'),saved=editor.querySelector('[data-saved-preview]'),remove=editor.querySelector('[data-remove-image]'),status=editor.querySelector('[data-media-status]');
 let files=[],urls=[];
 const revoke=()=>{urls.forEach(url=>URL.revokeObjectURL(url));urls=[];};
 const updateStatus=()=>{
  const deleting=Boolean(remove?.checked)||[...editor.querySelectorAll('[data-gallery-card] input:checked')].length>0;
  if(saved)saved.hidden=Boolean(files.length)||Boolean(remove?.checked)||!saved.getAttribute('src');
  editor.querySelectorAll('[data-gallery-card]').forEach(card=>card.classList.toggle('is-removing',card.querySelector('input').checked));
  status.textContent=deleting?'Foto yang ditandai akan dihapus setelah Simpan perubahan.':files.length?'Pilihan foto baru belum disimpan. Klik Simpan perubahan.':'Penghapusan berlaku setelah klik Simpan perubahan.';
 };
 const render=()=>{
  revoke();pending.replaceChildren();clear.hidden=files.length===0;
  files.forEach((file,index)=>{
   const card=document.createElement('div');card.className='media-gallery-card';
   const img=document.createElement('img');const url=URL.createObjectURL(file);urls.push(url);img.src=url;img.alt='Preview '+file.name;
   const button=document.createElement('button');button.type='button';button.className='delete-button';button.textContent='Hapus pilihan';button.setAttribute('aria-label','Hapus pilihan '+file.name);
   button.addEventListener('click',()=>{
    try{const transfer=new DataTransfer();files.filter((_,i)=>i!==index).forEach(f=>transfer.items.add(f));input.files=transfer.files;files=[...input.files];}
    catch{input.value='';files=[];}
    render();
   });
   card.append(img,button);pending.append(card);
  });updateStatus();
 };
 input.addEventListener('change',()=>{files=[...input.files];if(files.length&&remove)remove.checked=false;render();});
 clear.addEventListener('click',()=>{input.value='';files=[];render();});
 remove?.addEventListener('change',()=>{if(remove.checked){input.value='';files=[];render();}else updateStatus();});
 editor.querySelectorAll('[data-gallery-card] input').forEach(el=>el.addEventListener('change',updateStatus));
 window.addEventListener('pagehide',revoke);updateStatus();
});
// Responsive navigation stays usable without JavaScript.
(()=>{const toggle=document.querySelector('[data-admin-menu-toggle]'),menu=document.getElementById('admin-navigation');if(!toggle||!menu)return;const media=matchMedia('(max-width:900px)');const reset=()=>{menu.hidden=media.matches;toggle.setAttribute('aria-expanded',String(!menu.hidden));};toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));});media.addEventListener('change',reset);reset();})();
const search=document.querySelector('[data-admin-search]');search?.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase('id');let count=0;document.querySelectorAll('[data-admin-row]').forEach(row=>{row.hidden=!row.textContent.toLocaleLowerCase('id').includes(q);if(!row.hidden)count++;});const number=document.querySelector('[data-result-count]');if(number)number.textContent=String(count);const empty=document.querySelector('[data-no-results]');if(empty)empty.hidden=count!==0;});
document.querySelectorAll('input[type=password]').forEach(input=>{const wrapper=document.createElement('div');wrapper.className='password-field';input.before(wrapper);wrapper.append(input);const toggle=document.createElement('button');toggle.type='button';toggle.textContent='Lihat';toggle.setAttribute('aria-label','Tampilkan password');toggle.addEventListener('click',()=>{const show=input.type==='password';input.type=show?'text':'password';toggle.textContent=show?'Sembunyikan':'Lihat';toggle.setAttribute('aria-label',show?'Sembunyikan password':'Tampilkan password');});wrapper.append(toggle);});
document.querySelectorAll('[data-document-editor]').forEach(editor=>{const input=editor.querySelector('[data-document-upload]'),remove=editor.querySelector('[data-remove-document]'),clear=editor.querySelector('[data-clear-document]'),status=editor.querySelector('[data-document-selection]');const update=()=>{clear.hidden=!input.files.length;status.textContent=input.files.length?'Dipilih: '+input.files[0].name:remove?.checked?'Dokumen akan dilepas setelah disimpan.':'';};input.addEventListener('change',()=>{if(input.files.length&&remove)remove.checked=false;update();});remove?.addEventListener('change',()=>{if(remove.checked)input.value='';update();});clear.addEventListener('click',()=>{input.value='';update();});});
