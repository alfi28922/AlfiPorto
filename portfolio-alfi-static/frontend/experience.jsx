import { t } from "./i18n.jsx";
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
function read() {
  return [...document.querySelectorAll('.experience-card')].map((card, i) => ({
    id: i,
    card,
    category: card.dataset.category,
    title: card.querySelector('h3')?.textContent || '',
    org: card.querySelector('.org-name')?.textContent || '',
    period: card.querySelector('.eyebrow')?.textContent || '',
    description: card.querySelector('.experience-body>p:not(.org-name)')?.textContent || '',
    highlights: [...card.querySelectorAll('.highlights>div')].map(e => ({
      title: e.querySelector('h4')?.textContent || '',
      text: e.querySelector('p')?.textContent || ''
    }))
  }));
}
function ExperienceContent({
  entry,
  titleId
}) {
  return <article className="ej-detail-content"><div className="ej-detail-top"><span>{entry.category === 'work' ? t("PENGALAMAN KERJA") : t("ORGANISASI")}</span><small>{entry.period}</small></div><h3 id={titleId}>{entry.title}</h3><p className="ej-org">{entry.org}</p>{entry.description && <p className="ej-description">{entry.description}</p>}<div className="eo-contribution-label">{t("YANG SAYA KERJAKAN")}</div><div className="ej-highlights">{entry.highlights.map((h, i) => <div key={h.title + i}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h4>{h.title}</h4><p>{h.text}</p></div></div>)}</div>{!entry.highlights.length && <p className="ej-description">{t("Detail kontribusi belum ditambahkan.")}</p>}</article>;
}
function OrbitIcon({
  variant
}) {
  const paths = [<><rect x="4" y="7" width="24" height="20" rx="4" /><path d="M11 7V4h10v3M4 15c7 4 17 4 24 0M14 17h4" /></>, <><circle cx="12" cy="11" r="4" /><circle cx="23" cy="13" r="3" /><path d="M3 27v-4a9 9 0 0 1 18 0v4M22 20c5 0 7 3 7 7" /></>, <><path d="m11 8-8 8 8 8m10-16 8 8-8 8m-3-21-4 26" /></>, <><ellipse cx="16" cy="7" rx="11" ry="4" /><path d="M5 7v18c0 6 22 6 22 0V7M5 16c0 6 22 6 22 0" /></>, <><path d="m16 3 4 8 9 1-6 7 2 10-9-5-9 5 2-10-6-7 9-1Z" /></>, <><circle cx="16" cy="16" r="13" /><ellipse cx="16" cy="16" rx="6" ry="13" /><path d="M3 16h26M6 8h20M6 24h20" /></>];
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[variant % paths.length]}</svg>;
}
const TAU = Math.PI * 2;
const nearest = (angle, count) => (Math.round(-angle / (TAU / count)) % count + count) % count;
export default function Experience() {
  const source = useRef(null);
  if (!source.current) source.current = read();
  const [items, setItems] = useState(source.current),
    [index, setIndex] = useState(Math.min(2, Math.max(0, source.current.length - 1))),
    [paused, setPaused] = useState(false),
    [detail, setDetail] = useState(null),
    [isDesktop, setIsDesktop] = useState(() => matchMedia('(min-width: 721px)').matches),
    [dragging, setDragging] = useState(false),
    [focused, setFocused] = useState(false),
    [visible, setVisible] = useState(false),
    [hidden, setHidden] = useState(document.hidden),
    [reduce, setReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const dialog = useRef(null),
    opener = useRef(null),
    root = useRef(null),
    orbit = useRef(null),
    gesture = useRef(null),
    motion = useRef({
      angle: -Math.min(2, Math.max(0, source.current.length - 1)) * TAU / Math.max(1, source.current.length),
      target: null
    }),
    run = useRef(false),
    suppressClick = useRef(false);
  const item = items[index],
    playing = !detail && !paused && !dragging && !focused && visible && !hidden && !reduce && items.length > 1;
  run.current = playing;
  function select(i) {
    if (!items.length) return;
    const step = TAU / items.length,
      desired = -i * step,
      current = motion.current.angle;
    motion.current.target = current + Math.atan2(Math.sin(desired - current), Math.cos(desired - current));
    setIndex(i);
  }
  function showDetail(i, button) {
    select(i);
    if (isDesktop) return;
    opener.current = button;
    setDetail(items[i]);
  }
  function closeDetail() {
    dialog.current?.close();
  }
  function dialogKey(event) {
    if (event.key !== 'Tab') return;
    const nodes = [...dialog.current.querySelectorAll('button:not([disabled]),a[href],[tabindex="0"]')],
      first = nodes[0],
      last = nodes[nodes.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  useEffect(() => {
    if (detail && !isDesktop && !dialog.current.open) dialog.current.showModal();
  }, [detail, isDesktop]);
  useEffect(() => {
    const media = matchMedia('(min-width: 721px)'),
      change = () => {
        setIsDesktop(media.matches);
        if (media.matches && dialog.current?.open) dialog.current.close();
      };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  function start(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      last: event.clientX,
      id: event.pointerId,
      active: false
    };
    suppressClick.current = false;
  }
  function move(event) {
    const g = gesture.current;
    if (!g || !items.length) return;
    const dx = event.clientX - g.x,
      dy = event.clientY - g.y;
    if (!g.active) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 9) {
        gesture.current = null;
        return;
      }
      if (Math.abs(dx) < 8) return;
      g.active = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      motion.current.target = null;
    }
    motion.current.angle += (event.clientX - g.last) * .012;
    g.last = event.clientX;
    suppressClick.current = true;
    setIndex(nearest(motion.current.angle, items.length));
  }
  function end() {
    const g = gesture.current;
    gesture.current = null;
    setDragging(false);
    if (g?.active && items.length) {
      select(nearest(motion.current.angle, items.length));
      setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }
  }
  useEffect(() => {
    const section = document.getElementById('experience'),
      filter = () => {
        setItems(source.current.filter(item => !item.card.hidden));
        setIndex(0);
        motion.current = {
          angle: 0,
          target: null
        };
      };
    section.addEventListener('portfolio:filter', filter);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: .15
    });
    io.observe(root.current);
    const media = matchMedia('(prefers-reduced-motion: reduce)'),
      change = () => setReduce(media.matches),
      visibility = () => setHidden(document.hidden);
    media.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      section.removeEventListener('portfolio:filter', filter);
      io.disconnect();
      media.removeEventListener('change', change);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  useEffect(() => {
    const layer = orbit.current;
    if (!layer) return;
    const buttons = [...layer.querySelectorAll('.eo-orbit')];
    let frame = 0,
      last = 0,
      width = 0,
      height = 0,
      paintedAngle,
      paintedWidth,
      paintedHeight,
      selected = nearest(motion.current.angle, Math.max(1, items.length));
    const scene = layer.parentElement;
    const resize = new ResizeObserver(([e]) => {
      width = e.contentRect.width;
      height = e.contentRect.height;
    });
    resize.observe(scene);
    const paint = time => {
      const dt = Math.min(40, last ? time - last : 16);
      last = time;
      const m = motion.current;
      if (m.target !== null) {
        const d = m.target - m.angle;
        m.angle = reduce ? m.target : m.angle + d * (1 - Math.exp(-dt / 150));
        if (Math.abs(d) < .001 || reduce) {
          m.angle = m.target;
          m.target = null;
        }
      } else if (run.current && items.length > 1) {
        m.angle -= dt * TAU / (6500 * items.length);
        const next = nearest(m.angle, items.length);
        if (next !== selected) {
          selected = next;
          setIndex(next);
        }
      }
      if (m.angle === paintedAngle && width === paintedWidth && height === paintedHeight) {
        frame = requestAnimationFrame(paint);
        return;
      }
      paintedAngle = m.angle;
      paintedWidth = width;
      paintedHeight = height;
      buttons.forEach((button, i) => {
        const a = m.angle + i * TAU / Math.max(1, items.length),
          depth = (Math.cos(a) + 1) / 2,
          x = width * (.5 + Math.sin(a) * .34),
          y = height * (.52 + Math.cos(a) * .205),
          scale = .68 + depth * .37;
        button.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${scale})`;
        button.style.zIndex = depth > .48 ? '3' : '0';
        button.style.opacity = String(.55 + depth * .45);
        button.style.setProperty('--orbit-turn', `${Math.sin(a) * -17}deg`);
        button.dataset.depth = depth > .48 ? 'front' : 'back';
      });
      frame = requestAnimationFrame(paint);
    };
    frame = requestAnimationFrame(paint);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [items, reduce]);
  function key(event) {
    if (event.target.closest('.experience-dialog,.ej-highlights')) return;
    if (!items.length) return;
    if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      select((index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : items.length - 1)) % items.length);
    } else if (event.key === ' ' && !event.target.closest('.eo-orbit')) {
      event.preventDefault();
      setPaused(v => !v);
    }
  }
  return <div data-scroll-reveal className={`ej-studio experience-orbit ${playing ? 'is-playing' : ''} ${dragging ? 'is-dragging' : ''}`} ref={root} onFocusCapture={e => {
    if (e.target.matches(':focus-visible')) setFocused(true);
  }} onBlurCapture={() => {
    requestAnimationFrame(() => setFocused(root.current?.contains(document.activeElement)));
  }} onKeyDown={key}>
<div className="eo-visual-column"><div className="eo-scene" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}>

<div className="eo-scene-copy"><span>WORK & COMMUNITY</span></div><img className="eo-device" src="assets/images/experience-workstation.svg" alt="" width="440" height="340" draggable="false" decoding="async" />
<div className="eo-orbits" ref={orbit} role="group" aria-label={t("Carousel pengalaman berputar. Geser untuk memutar.")}>{items.map((entry, i) => <button type="button" key={entry.id} className={`eo-orbit eo-tone-${i % 3} ${index === i ? 'is-active' : ''}`} onClick={event => {
            if (!suppressClick.current) showDetail(i, event.currentTarget);
          }} aria-label={entry.title + ' — ' + entry.org} aria-pressed={index === i} aria-controls={isDesktop ? 'experience-detail' : 'experience-dialog'} aria-haspopup={isDesktop ? undefined : 'dialog'}><span className="eo-tile"><OrbitIcon variant={entry.id} /></span><span className="eo-icon-label">{entry.org.split('(')[0].trim().length > 24 ? entry.org.split('(')[0].trim().slice(0, 23) + '…' : entry.org.split('(')[0].trim()}</span></button>)}</div>

</div></div>
{isDesktop && item && <div className="ej-detail experience-inline" id="experience-detail"><ExperienceContent key={item.id} entry={item} titleId="experience-inline-title" /></div>}
{createPortal(<dialog ref={dialog} id="experience-dialog" className="experience-dialog" onKeyDown={dialogKey} aria-labelledby="experience-dialog-title" onClose={() => {
      setDetail(null);
      requestAnimationFrame(() => {
        if (opener.current?.isConnected) opener.current.focus({
          preventScroll: true
        });
      });
    }} onClick={event => {
      if (event.target === event.currentTarget) {
        const r = event.currentTarget.getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDetail();
      }
    }}>
<button type="button" className="experience-dialog-close" aria-label={t("Tutup detail pengalaman")} onClick={closeDetail} autoFocus><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
{detail && <ExperienceContent entry={detail} titleId="experience-dialog-title" />}
</dialog>, document.body)}</div>;
}
