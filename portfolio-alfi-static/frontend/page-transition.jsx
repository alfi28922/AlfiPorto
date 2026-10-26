import { mountWelcome, BrandLogo } from './welcome.jsx';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

function Curtain() {
  return (
    <div className="route-curtain" aria-hidden="true">
      <span className="route-curtain-topbar" />
      <div className="route-curtain-minimal">
        <BrandLogo />
      </div>
    </div>
  );
}

function ScrollHud() {
  const [pct, setPct] = useState(0);
  const [secName, setSecName] = useState('HOME');
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0;
      setPct(p);
      const footerEl = document.getElementById('contact') || document.querySelector('.portfolio-footer');
      const footerVis = footerEl ? footerEl.getBoundingClientRect().top <= window.innerHeight - 40 : false;
      document.body.classList.toggle('footer-in-view', footerVis);
      document.querySelector('.glass-nav')?.classList.toggle('is-hidden-footer', footerVis);
      setShow(window.scrollY > 160 && !footerVis);
      const isAbout = /about(?:-en)?\.html$/.test(location.pathname);
      let current = isAbout ? 'ABOUT ME' : 'HOME';
      const nodes = [...document.querySelectorAll('main section[id], footer[id]')];
      for (const s of nodes) {
        const r = s.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.42) {
          current = (s.id || current).toUpperCase();
        }
      }
      setSecName(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      className={`react-scroll-hud ${show ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <span className="react-scroll-hud-ring" aria-hidden="true">
        <svg viewBox="0 0 36 36">
          <circle className="hud-bg" cx="18" cy="18" r="15.5" />
          <circle
            className="hud-fg"
            cx="18"
            cy="18"
            r="15.5"
            style={{ strokeDashoffset: `${97.4 - (97.4 * pct) / 100}` }}
          />
        </svg>
        <b>{pct}%</b>
      </span>
      <span className="react-scroll-hud-meta">
        <small>SCROLL</small>
        <strong>{secName}</strong>
      </span>
    </button>
  );
}

mountWelcome();
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const host = document.createElement('div');
host.id = 'portfolio-route-transition';
host.setAttribute('aria-hidden', 'true');
document.body.append(host);
const root = createRoot(host);

const hudHost = document.createElement('div');
hudHost.id = 'portfolio-react-hud';
document.body.append(hudHost);
createRoot(hudHost).render(<ScrollHud />);

let busy = false, controller = null, animation = null, fallback = 0;
const canonical = path => path.replace(/\/index(?:-en)?\.html$/, '/').replace(/about-en\.html$/, 'about.html');
function paint() {
  flushSync(() => root.render(<Curtain />));
  return host.firstElementChild;
}
function reset() {
  controller?.abort(); controller = null;
  animation?.cancel(); animation = null;
  clearTimeout(fallback); fallback = 0;
  document.documentElement.classList.remove('route-arriving', 'route-transitioning');
  flushSync(() => root.render(null));
  busy = false;
}
function focusTarget(target) {
  if (!target) return;
  const temporary = !target.hasAttribute('tabindex');
  if (temporary) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (temporary) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
}
async function fade(layer, entering, signal) {
  if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
  const keyframes = entering
    ? [{ opacity: 0 }, { opacity: 1 }]
    : [{ opacity: 1 }, { opacity: 0 }];
  animation = layer.animate(keyframes, {
    duration: entering ? 200 : 250, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards'
  });
  const current = animation;
  const cancel = () => current.cancel();
  signal.addEventListener('abort', cancel, { once: true });
  try { await current.finished; } finally { signal.removeEventListener('abort', cancel); }
}
function sectionTarget(url) {
  try { return url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : document.getElementById('home') || document.getElementById('about-main'); } catch { return null; }
}
function sectionSmoothScroll(target, url) {
  document.dispatchEvent(new CustomEvent('portfolio:section-before', { detail: { target } }));
  const offset = target.id === 'home' || target.id === 'about-main' ? 0 : 72;
  const top = Math.max(0, target.getBoundingClientRect().top + scrollY - offset);
  scrollTo({ top, behavior: 'smooth' });
  if (location.hash !== url.hash) history.pushState(null, '', url.hash || location.pathname + location.search);
  setTimeout(() => {
    focusTarget(target);
    document.dispatchEvent(new CustomEvent('portfolio:section-after', { detail: { target } }));
  }, 450);
}
async function leave(url) {
  if (busy) return;
  busy = true;
  const run = new AbortController(); controller = run;
  document.documentElement.classList.add('route-transitioning');
  const layer = paint();
  try {
    await fade(layer, true, run.signal);
    if (run.signal.aborted) return;
    try { sessionStorage.setItem('portfolio-route-arrival', JSON.stringify({ path: url.pathname + url.search, at: Date.now() })); } catch {}
    fallback = setTimeout(reset, 4000);
    location.assign(url.href);
  } catch (error) {
    if (error.name !== 'AbortError' && !run.signal.aborted) location.assign(url.href);
  }
}
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || preference.matches) return;
  const link = event.target.closest?.('a[href]');
  if (!link || link.hasAttribute('download') || link.dataset.language || link.classList.contains('skip-link') || link.relList.contains('external') || link.target && link.target !== '_self') return;
  const url = new URL(link.href, location.href);
  const base = new URL('.', location.href).pathname;
  if (url.origin !== location.origin || !/^https?:$/.test(url.protocol) || ![base, base + 'index.html', base + 'index-en.html', base + 'about.html', base + 'about-en.html'].includes(url.pathname)) return;
  const sameDocument = canonical(url.pathname) === canonical(location.pathname) && (url.search === location.search || !url.search);
  const target = sameDocument ? sectionTarget(url) : null;
  if (sameDocument) {
    if (!target || ['main', 'about-main'].includes(target.id) && link.hash) return;
    event.preventDefault();
    sectionSmoothScroll(target, url);
    return;
  }
  event.preventDefault();
  if (!busy) leave(url);
}, true);
function cancel() { if (busy) reset(); }
for (const type of ['wheel', 'touchstart', 'popstate', 'hashchange']) addEventListener(type, cancel, { passive: true });
addEventListener('keydown', event => { if (['Escape', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) cancel(); });
preference.addEventListener('change', cancel);
addEventListener('pageshow', event => { if (event.persisted) reset(); });
async function arrive() {
  const saved = window.portfolioRouteArrival;
  if (!saved || preference.matches) return;
  busy = true;
  const run = new AbortController(); controller = run;
  const layer = paint();
  layer.style.opacity = '1';
  document.documentElement.classList.add('route-transitioning');
  document.documentElement.classList.remove('route-arriving');
  clearTimeout(window.portfolioRouteFallback);
  try {
    await Promise.race([document.fonts?.ready || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 180))]);
    await fade(layer, false, run.signal);
  } catch (_) {} finally { if (controller === run) reset(); }
  delete window.portfolioRouteArrival;
}
arrive();
