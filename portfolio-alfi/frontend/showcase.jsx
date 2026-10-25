import { t } from "./i18n.jsx";
import React, { useEffect, useRef, useState } from 'react';
function readProjects() {
  return [...document.querySelectorAll('#projects .project-grid .project-card')].map(card => ({
    id: card.dataset.project,
    card,
    title: card.querySelector('h3')?.textContent || '',
    image: card.querySelector('img')?.getAttribute('src') || '',
    category: card.dataset.category || '',
    period: card.querySelector('.eyebrow')?.textContent || '',
    description: card.querySelector('.project-copy>p')?.textContent || '',
    tags: [...card.querySelectorAll('.tags span')].map(e => e.textContent)
  }));
}
export default function Showcase({
  brand = 'Portfolio'
}) {
  const source = useRef(null);
  if (!source.current) source.current = readProjects();
  const [items, setItems] = useState(source.current),
    [index, setIndex] = useState(0),
    [reduce, setReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing,setPlaying]=useState(true),[inView,setInView]=useState(false);
  const stage = useRef(null),
    gesture = useRef(null),
    timer = useRef(null),
    suppressUntil = useRef(0);
  const current = items[index];
  const active = useRef(0),
    requested = useRef(0),
    running = useRef(false),
    revision = useRef(0),
    itemsRef = useRef(items),
    reduceRef = useRef(reduce),
    decoded = useRef(new Map());
  itemsRef.current = items;
  reduceRef.current = reduce;
  useEffect(()=>{
    if(!stage.current){setInView(false);return;}
    const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.25});
    observer.observe(stage.current);return()=>observer.disconnect();
  },[Boolean(current)]);
  useEffect(()=>{
    if(!playing||reduce||!inView||items.length<2)return;
    const interval=setInterval(()=>{
      if(!document.hidden&&!document.querySelector('dialog[open]')&&(!stage.current?.hasAttribute('data-reveal-state')||stage.current.dataset.revealState==='visible'))select(requested.current+1,false);
    },4000);
    return()=>clearInterval(interval);
  },[playing,reduce,inView,items.length,index]);

  function prepare(src) {
    if (!decoded.current.has(src)) {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      decoded.current.set(src, (image.decode ? image.decode() : new Promise(resolve => {
        image.onload = resolve;
        image.onerror = resolve;
      })).catch(() => {}));
    }
    return decoded.current.get(src);
  }
  function cancel() {
    revision.current++;
    clearTimeout(timer.current);
    running.current = false;
  }
  useEffect(() => {
    const section = document.getElementById('projects'),
      filter = () => {
        setPlaying(false);
        cancel();
        active.current = requested.current = 0;
        setIndex(0);
        setItems(source.current.filter(item => !item.card.hidden));
      };
    section.addEventListener('portfolio:filter', filter);
    const media = matchMedia('(prefers-reduced-motion: reduce)'),
      change = () => {
        cancel();
        requested.current = active.current;
        setReduce(media.matches);
        if(media.matches)setPlaying(false);
      };
    media.addEventListener('change', change);
    return () => {
      revision.current++;
      section.removeEventListener('portfolio:filter', filter);
      media.removeEventListener('change', change);
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!items.length) return;
    prepare(items[(index + 1) % items.length].image);
    prepare(items[(index + items.length - 1) % items.length].image);
    const rail = stage.current?.querySelector('.work-thumbnails'),
      button = rail?.querySelector('.is-active');
    if (!rail || !button) return;
    const left = button.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft - (rail.clientWidth - button.clientWidth) / 2;
    rail.scrollTo({
      left,
      behavior: reduce ? 'instant' : 'smooth'
    });
  }, [index, items.length, reduce]);
  async function advance() {
    if (running.current || !itemsRef.current.length || requested.current === active.current) return;
    running.current = true;
    const ticket = revision.current;
    let destination = requested.current;
    await prepare(itemsRef.current[destination].image);
    if (ticket !== revision.current) return;
    if (destination !== requested.current) {
      running.current = false;
      advance();
      return;
    }
    active.current = destination;
    setIndex(destination);
    timer.current = setTimeout(() => {
      if (ticket !== revision.current) return;
      running.current = false;
      advance();
    }, reduceRef.current ? 0 : 560);
  }
  function select(next,manual=true) {
    if(manual)setPlaying(false);
    const list = itemsRef.current;
    if (list.length < 2) return;
    requested.current = (next % list.length + list.length) % list.length;
    advance();
  }
  function step(delta) {
    select(requested.current + delta);
  }
  function reset() {
    gesture.current = null;
    stage.current?.style.setProperty('--work-drag', '0px');
  }
  function pointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    gesture.current = {
      x: event.clientX,
      y: event.clientY
    };
  }
  function pointerMove(event) {
    if (!gesture.current || !stage.current) return;
    const dx = event.clientX - gesture.current.x;
    if (Math.abs(dx) > 8 && !event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
    if (!reduce) stage.current.style.setProperty('--work-drag', `${Math.max(-35, Math.min(35, dx * .18))}px`);
  }
  function pointerUp(event) {
    if (gesture.current) {
      const dx = event.clientX - gesture.current.x,
        dy = event.clientY - gesture.current.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        suppressUntil.current = performance.now() + 350;
        step(dx < 0 ? 1 : -1);
      }
    }
    reset();
  }
  function keyboard(event) {
    const keys = {
      ArrowRight: requested.current + 1,
      ArrowLeft: requested.current - 1,
      Home: 0,
      End: items.length - 1
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key]);
    }
  }
  function open() {
    setPlaying(false);
    current?.card.click();
  }
  if (!current) return <div data-scroll-reveal className="work-empty" role="status">{t("Belum ada proyek dalam kategori ini.")}</div>;
  return <div data-scroll-reveal className={`work-showcase fan-showcase coverflow-showcase ${reduce ? 'is-reduced' : ''}`} ref={stage} role="region" aria-roledescription="carousel" aria-label={t("Koleksi proyek pilihan")}>
 <div className="fan-masthead"><span><i /> {brand.toUpperCase()} / SELECTED WORK</span><span>{String(items.length).padStart(2, '0')} PROJECTS</span></div>
 <div className="fan-intro"><h2>My Project</h2></div>
 <div className="work-artboard fan-artboard" tabIndex="0" onKeyDown={keyboard} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={reset} onLostPointerCapture={reset} aria-label={t("Geser atau gunakan tombol panah untuk memilih proyek.")}>

 <div className="fan-deck">{items.map((item, i) => {
          let offset = (i - index + items.length) % items.length;
          if (offset > Math.floor(items.length / 2)) offset -= items.length;
          const visible = Math.abs(offset) <= 2;
          return <button type="button" key={item.id + '-' + i} className={`fan-card ${offset === 0 ? 'is-active' : ''}`} style={{
            '--fan-offset': offset,
            '--fan-distance': Math.abs(offset),
            '--fan-accent': ['#b9d9f1', '#c5dbed', '#abcfe9', '#cee3f4', '#bdd9ed', '#a9cde9'][i % 6],
            zIndex: 10 - Math.abs(offset),
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? 'auto' : 'none'
          }} aria-hidden={!visible} tabIndex={visible ? 0 : -1} aria-pressed={offset === 0} aria-label={offset === 0 ? `${t('Buka detail')} ${item.title}` : `${t('Pilih')} ${item.title}`} onClick={() => {
            if (performance.now() < suppressUntil.current) return;
            if (i === index) open();else select(i);
          }}><span className={`cf-art ${item.category.toUpperCase().includes('MOBILE')?'cf-art-contain':''}`}><img src={item.image} alt="" draggable="false" loading={visible ? 'eager' : 'lazy'} /><span className="cf-index">{String(i+1).padStart(2,'0')}</span></span><span className="cf-caption"><strong>{item.title}</strong><small>{item.category}</small></span></button>;
        })}</div></div>

 <div className="cf-player" role="group" aria-label={t('Kontrol carousel proyek')}>
   <button type="button" className="cf-current" onClick={open} aria-label={`${t('Buka detail')} ${current.title}`}><img src={current.image} alt=""/><span><strong>{current.title}</strong><small>{current.category}</small></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M10 4H4v16h16v-6"/></svg></button>
   <span className="cf-count" aria-label={`${index+1} / ${items.length}`}>{String(index+1).padStart(2,'0')}<i>/</i>{String(items.length).padStart(2,'0')}</span>
   <div className="cf-progress" aria-hidden="true"><span style={{width:`${(index+1)/items.length*100}%`}}/></div>
 </div>
 </div>;
}
