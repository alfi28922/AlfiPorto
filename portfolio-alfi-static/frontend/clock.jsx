import React, { useEffect, useState } from 'react';
export default function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  const locale = window.PORTFOLIO_I18N?.lang === 'en' ? 'en-GB' : 'id-ID';
  const zone = { timeZone: 'Asia/Jakarta' };
  useEffect(() => {
    const refresh = () => setNow(new Date());
    const timer = setInterval(refresh, 1000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', { ...zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(now);
  const date = new Intl.DateTimeFormat(locale, { ...zone, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(now);
  return <div className="cv-work-counter cv-live-clock" role="timer" aria-live="off" aria-label={locale === 'en-GB' ? 'Current Jakarta time, WIB' : 'Waktu Jakarta saat ini, WIB'}>
    <span>WIB · JAKARTA</span>
    <strong><time dateTime={now.toISOString()}>{time}</time></strong>
    <small>{date}</small>
  </div>;
}
