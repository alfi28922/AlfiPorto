import { t } from "./i18n.jsx";
import { LanguageSwitch } from './i18n.jsx';
import LiveClock from './clock.jsx';
import { mountSections } from './sections.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
function Icon({
  name
}) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10H3Z" /><path d="M9 20v-7h6v7" /></>,
    projects: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    experience: <><rect x="3" y="7" width="18" height="14" rx="3" /><path d="M8 7V4h8v3M3 13h18M10 13v3h4v-3" /></>,
    skills: <><path d="m8 6-5 6 5 6M16 6l5 6-5 6M14 3l-4 18" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" /></>,
    mail: <><rect x="2.5" y="5" width="19" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    expand: <><path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" /></>,
    down: <><path d="M12 3v17m-6-6 6 6 6-6" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.projects}</svg>;
}
function useReduced() {
  const [value, setValue] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const m = matchMedia('(prefers-reduced-motion: reduce)'),
      onChange = () => setValue(m.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);
  return value;
}
function Hero({
  data
}) {
  const reduce = useReduced(),
    root = useRef(null),
    badge = useRef(null),
    [active, setActive] = useState(true),
    [ready, setReady] = useState(!document.documentElement.classList.contains('intro-pending')),
    [role, setRole] = useState(0),
    [hover, setHover] = useState(false),
    [focus, setFocus] = useState(false),
    [pinned, setPinned] = useState(false);
  const roles = data.roles.filter(text => typeof text === 'string' && text.trim()),
    expanded = hover || focus || pinned;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > .2), {
      threshold: [0, .2]
    });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.classList.toggle('hero-dark-active', active);
    document.body.classList.toggle('hero-concept-active', active);
    return () => {
      document.body.classList.remove('hero-dark-active', 'hero-concept-active');
    };
  }, [active]);
  useEffect(() => {
    if (ready) return;
    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains('intro-pending')) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, [ready]);
  useEffect(() => {
    if (reduce || !active || !ready || roles.length < 2) return;
    const timer = setInterval(() => {
      if (!document.hidden) setRole(i => (i + 1) % roles.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [reduce, active, ready, roles.length]);
  useEffect(() => {
    const close = e => {
      if (!badge.current?.contains(e.target)) {
        setPinned(false);
        setFocus(false);
      }
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (root.current) {
        const rect = root.current.getBoundingClientRect();
        root.current.style.setProperty('--cv-scroll', String(reduce ? 0 : Math.min(1, Math.max(0, -rect.top / rect.height))));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    addEventListener('scroll', onScroll, {
      passive: true
    });
    paint();
    return () => {
      removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);
  function pointer(e) {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    root.current.style.setProperty('--cv-x', `${((e.clientX - rect.left) / rect.width - .5) * 12}px`);
    root.current.style.setProperty('--cv-y', `${((e.clientY - rect.top) / rect.height - .5) * 8}px`);
  }
  function reset() {
    root.current?.style.setProperty('--cv-x', '0px');
    root.current?.style.setProperty('--cv-y', '0px');
  }
  function navigate(event, id) {
    if (event.defaultPrevented) return;
    const link = document.querySelector(`.glass-nav a[href="#${id}"]`);
    if (link) {
      event.preventDefault();
      link.click();
    }
  }
  const items = [['home', 'Home'], ['projects', 'Projects'], ['experience', 'Experience'], ['skills', 'Skills']];
  return <div ref={root} className={`cv-root ${ready ? 'is-ready' : ''} ${active ? 'is-active' : ''} ${reduce ? 'is-reduced' : ''}`} onPointerMove={pointer} onPointerLeave={reset}>
 <div className="cv-shell"><aside className="cv-rail" aria-label={t("Navigasi hero")}><div className="cv-identity-island"><div className="cv-nav-island"><a className="cv-mark" href="#home" aria-label={data.brand || data.name} onClick={e => navigate(e, 'home')}><svg className="ma-geometric-logo" viewBox="0 0 156 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">      <path className="ma-letter-m" d="M8 86L22 14H41L53 52L65 14H84L70 86H53L60 44L47 80H35L28 44L21 86H8Z" fill="currentColor" />      <path className="ma-letter-a" fillRule="evenodd" clipRule="evenodd" d="M108 14H129L148 86H130L126 70H102L96 86H78L108 14ZM116 34L107 56H122L116 34Z" fill="#3c8edb" />    </svg></a><nav aria-label={t("Menu portofolio")}>{items.map(([id, label]) => <a key={id} href={`#${id}`} aria-label={label} title={label} aria-current={id === 'home' ? 'page' : undefined} onClick={e => navigate(e, id)}><Icon name={id} /><span>{label}</span></a>)}</nav></div><a className="cv-profile-island" href={window.PORTFOLIO_I18N?.lang==='en'?'about-en.html':'about.html'} aria-label="About Me"><img src={data.photo} alt="" /><span>ABOUT ME</span></a></div><div className="cv-social-island"><nav aria-label={t("Media sosial")}>{data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><b>in</b></a>}{data.instagram && <a href={data.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>}{data.email && <a href={`mailto:${data.email}`} aria-label="Email"><Icon name="mail" /></a>}</nav><span>{data.year}</span></div></aside>
 <div className="cv-panel"><div className="cv-panel-skin" aria-hidden="true"><span>{data.lastName}</span></div><nav className="cv-topnav" aria-label={t("Pintasan konten")}><a href="#projects" onClick={e => navigate(e, 'projects')}>PROJECTS</a><a href="#experience" onClick={e => navigate(e, 'experience')}>EXPERIENCE</a><a href="#skills" onClick={e => navigate(e, 'skills')}>SKILLS</a></nav>
 <LanguageSwitch /><div className="cv-identity"><span className="cv-greeting">PERSONAL PORTFOLIO</span><h1><span>{data.firstName}</span>{' '}<strong>{data.lastName}<i>.</i></strong></h1><div className="cv-role-window"><span key={role} id="role-text" data-react-role="true">{roles[role] || ''}</span></div><div className="cv-role-dots" aria-label={t("Pilih bidang keahlian")}>{roles.map((text, i) => <button key={text + i} type="button" aria-label={text} aria-pressed={role === i} className={role === i ? 'is-current' : ''} onClick={() => setRole(i)} />)}</div></div>
 <LiveClock />
 <div className="cv-bio"><p>{data.bio}</p><span>{data.location}</span></div>
 <a className="cv-scroll" href="#overview" aria-label={t("Jelajahi portofolio")}><Icon name="down" /></a><span className="cv-scroll-label">EXPLORE</span>
 {data.featured ? <button className="cv-featured" type="button" data-project={data.featured.id} aria-label={`${t('Buka detail')} ${data.featured.title}`}><img src={data.featured.image} alt="" /><span className="cv-featured-shade" /><span className="cv-featured-expand"><Icon name="expand" /></span><span className="cv-featured-copy"><small>FEATURED PROJECT</small><strong>{data.featured.title}</strong></span></button> : <a className="cv-featured cv-featured-empty" href="#projects" onClick={e => navigate(e, 'projects')}>{t("Jelajahi proyek")}</a>}
 <button ref={badge} className="lfj-badge cv-status" data-react-managed="true" aria-expanded={expanded} aria-controls="lfj-detail" aria-label={`LFJ — ${data.status}`} onPointerEnter={e => {
          if (e.pointerType === 'mouse') setHover(true);
        }} onPointerLeave={() => setHover(false)} onFocus={() => setFocus(true)} onBlur={() => {
          setFocus(false);
          setPinned(false);
        }} onClick={() => {
          setFocus(false);
          setPinned(v => !v);
        }} onKeyDown={e => {
          if (e.key === 'Escape') {
            setPinned(false);
            setFocus(false);
            setHover(false);
          }
        }}><span className="status-dot" aria-hidden="true" /><span>LFJ</span><span className="lfj-detail" id="lfj-detail"><span>{data.status}</span></span></button>
 </div></div></div>;
}
const mount = document.getElementById('home'),
  source = document.getElementById('hero-react-data');
if (mount && source) {
  try {
    const data = JSON.parse(source.textContent);
    mount.classList.remove('identity-hero');
    mount.classList.add('react-hero');
    flushSync(() => createRoot(mount).render(<Hero data={data} />));
    mount.dataset.reactVersion = React.version;
    mountSections(data);
  } catch (error) {
    console.error('Hero React could not initialize', error);
  }
}
