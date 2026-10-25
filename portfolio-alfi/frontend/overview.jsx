import {t} from './i18n.jsx';
import React from 'react';

function Certificate(){return <button className="ov-edit-cert" type="button" onClick={()=>document.querySelector('[data-open-cert]')?.click()}><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 4h20v24H6zM11 10h10M11 14h7"/><circle cx="17" cy="21" r="3"/><path d="m15 24-1 4 3-2 3 2-1-4"/></svg><span><strong>{t('Sertifikat & pelatihan')}</strong><small>{t('Lihat hal yang sudah saya pelajari.')}</small></span><b aria-hidden="true">+</b></button>}
function Facts({profile}){return <dl className="ov-edit-facts">{profile.location&&<div><dt>{t('Lokasi')}</dt><dd>{profile.location}</dd></div>}{profile.gpa&&<div><dt>{t('IPK')}</dt><dd>{profile.gpa}</dd></div>}</dl>}

export default function Overview({profile}){
 const roles=Array.isArray(profile.roles)?profile.roles:[];
 return <div className="ov-edit ov-edit-a">
  <div className="ov-a-top" data-scroll-reveal><span className="ov-edit-label">{t('TENTANG SAYA')}</span><span className="ov-a-note">{profile.name}</span></div>
  <div className="ov-a-grid">
   <div className="ov-a-intro" data-scroll-reveal><p>{profile.bio}</p><div className="ov-bio-actions"><a className="ov-edit-link" href="about.php">{t('Kenal lebih dekat')}<span aria-hidden="true">+</span></a>{profile.cvAvailable&&<a className="portfolio-cv-link" href="preview-cv.php" rel="external" data-cv-preview aria-haspopup="dialog" aria-controls="cv-image-dialog">{t('Preview CV')}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M8 3H4v17h16V10M13 3h8v8M10 14 21 3"/></svg></a>}</div></div>
   <div className="ov-a-work" data-scroll-reveal><span className="ov-edit-label">{t('Yang saya kerjakan')}</span><div className="ov-a-roles">{roles.map((role,i)=><a key={role} href="#projects"><span className="ov-a-role-dot" aria-hidden="true"/><h3>{role}</h3><span className="ov-a-role-hint" aria-hidden="true">↗</span></a>)}</div><p className="ov-a-detail">{profile.expertise_detail}</p></div>
  </div>
  <div data-scroll-reveal><Facts profile={profile}/></div>
  <div data-scroll-reveal><Certificate/></div>
 </div>
}
