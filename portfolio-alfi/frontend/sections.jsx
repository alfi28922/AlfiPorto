import { t } from "./i18n.jsx";
import Overview from './overview.jsx';
import Experience from './experience.jsx';
import Showcase from './showcase.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal, flushSync } from 'react-dom';
const chapters = [['overview'], ['projects'], ['experience'], ['skills']];
function useMotion() {
  const [reduce, setReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const m = matchMedia('(prefers-reduced-motion: reduce)'),
      fn = () => setReduce(m.matches);
    m.addEventListener('change', fn);
    return () => m.removeEventListener('change', fn);
  }, []);
  return reduce;
}
function Toolkit() {
  const cards = useRef([...document.querySelectorAll('#skills .skill-card')]);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('ALL');
  const categories = useRef([
    'ALL',
    ...new Set(
      cards.current
        .map(c => c.querySelector('.skill-badge')?.textContent?.trim())
        .filter(Boolean)
    )
  ]);
  const match = card => {
    const qMatch = card.textContent.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id'));
    if (cat === 'ALL') return qMatch;
    const badge = card.querySelector('.skill-badge')?.textContent?.trim() || '';
    return qMatch && badge === cat;
  };
  const count = cards.current.filter(match).length;
  useEffect(() => {
    cards.current.forEach((card, i) => {
      card.style.setProperty('--skill-index', String(i % 4));
      const ok = match(card);
      card.hidden = !ok;
      if (ok) {
        card.classList.remove('skill-filter-enter');
        void card.offsetWidth;
        card.classList.add('visible', 'skill-filter-enter');
      }
    });
    return () => {
      cards.current.forEach(card => card.hidden = false);
    };
  }, [query, cat]);
  return (
    <div className="scene-toolkit" data-scroll-reveal>
      <div className="scene-toolkit-top">
        <label className="scene-search">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg>
          <span className="sr-only">{t("Cari skill atau tools")}</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Cari skill atau tools…")} />
        </label>
        <span className="scene-toolkit-count">{count} / {cards.current.length} SKILLS</span>
      </div>
      {categories.current.length > 1 && (
        <div className="scene-toolkit-filters" role="group" aria-label={t("Kategori skill")}>
          {categories.current.map(item => (
            <button
              key={item}
              type="button"
              aria-pressed={cat === item}
              onClick={() => setCat(item)}
            >
              {item === 'ALL' ? t('Semua') : item}
            </button>
          ))}
        </div>
      )}
      {!count && <p className="scene-empty" role="status">{t("Belum ada skill yang cocok. Coba kata lain.")}</p>}
    </div>
  );
}
function Sections({
  profile,
  hosts
}) {
  const reduce = useMotion();
  useEffect(() => {
    const visible = new Set();
    let frame = 0;
    const paint = () => {
      frame = 0;
      for (const el of visible) {
        const rect = el.getBoundingClientRect(),
          amount = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
        el.style.setProperty('--scene-progress', String(reduce ? 1 : amount));
        const sec = el.closest('section');
        if (sec) sec.style.setProperty('--scene-progress', String(reduce ? 1 : amount));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const el = entry.target,
          section = el.closest('section');
        if (entry.isIntersecting) {
          visible.add(el);
          section.classList.add('scene-in-view');
          schedule();
        } else {
          visible.delete(el);
          if (entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top > innerHeight) section.classList.remove('scene-in-view');
        }
      }
    }, {
      threshold: 0,
      rootMargin: '-8% 0px -5% 0px'
    });
    for (const [id] of chapters) {
      const section = document.getElementById(id);
      if (!section) continue;
      section.classList.add('scene-enhanced');
      observer.observe(id === 'projects' ? section.querySelector('.project-stage') : section);
    }
    addEventListener('scroll', schedule, {
      passive: true
    });
    addEventListener('resize', schedule);
    return () => {
      observer.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
      for (const [id] of chapters) document.getElementById(id)?.classList.remove('scene-enhanced', 'scene-in-view');
    };
  }, [reduce]);
  useEffect(() => { document.dispatchEvent(new Event('portfolio:content-ready')); }, []);
  return (
    <>
      {createPortal(<Overview profile={profile} />, hosts.profile)}
      {createPortal(<Showcase brand={profile.brand} />, hosts.projectsControls)}
      {createPortal(<Toolkit />, hosts.toolkit)}
      {createPortal(<Experience />, hosts.experience)}
    </>
  );
}
export function mountSections(profile) {
  if (!['#overview .overview-copy', '#projects .project-stage', '#projects .project-grid', '#experience .experience-carousel', '#experience .experience-track', '#skills .skills-grid'].every(selector => document.querySelector(selector))) return;
  const hosts = {};
  function host(key, parent, before, cls = 'scene-widget-host') {
    const el = document.createElement('div');
    el.className = cls;
    if (before) parent.insertBefore(el, before);else parent.append(el);
    hosts[key] = el;
  }
  host('profile', document.getElementById('overview'), document.querySelector('.overview-copy'));
  host('experience', document.getElementById('experience'), document.querySelector('.experience-carousel'));
  host('projectsControls', document.querySelector('.project-stage'), document.querySelector('.project-grid'));
  host('toolkit', document.getElementById('skills'), document.querySelector('.skills-grid'));
  const root = document.createElement('div');
  root.id = 'sections-react-root';
  document.getElementById('main').append(root);
  flushSync(() => createRoot(root).render(<Sections profile={profile} hosts={hosts} />));
  document.querySelector('.overview-copy').hidden = true;
  document.querySelector('.overview-bento').hidden = true;
  document.getElementById('overview').classList.add('overview-studio');
  document.querySelector('.experience-carousel').hidden = true;
  document.getElementById('experience').classList.add('experience-react-ready');
  document.querySelector('#projects .project-grid').hidden = true;
  document.getElementById('projects').classList.add('showcase-ready');
}
