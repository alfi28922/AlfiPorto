import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

export function BrandLogo() {
  return (
    <svg className="ma-geometric-logo" viewBox="0 0 156 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path className="ma-letter-m" d="M8 86L22 14H41L53 52L65 14H84L70 86H53L60 44L47 80H35L28 44L21 86H8Z" fill="currentColor" />
      <path className="ma-letter-a" fillRule="evenodd" clipRule="evenodd" d="M108 14H129L148 86H130L126 70H102L96 86H78L108 14ZM116 34L107 56H122L116 34Z" fill="#3c8edb" />
    </svg>
  );
}

function Welcome() {
  return (
    <div className="welcome-monogram" aria-hidden="true">
      <span className="monogram-type">
        <BrandLogo />
      </span>
    </div>
  );
}

export function mountWelcome() {
  const mount = document.querySelector('.entry-screen');
  if (!mount || !document.documentElement.classList.contains('intro-pending')) return;
  const root = createRoot(mount);
  flushSync(() => root.render(<Welcome />));
  const observer = new MutationObserver(() => {
    if (!mount.isConnected) {
      root.unmount();
      observer.disconnect();
    }
  });
  observer.observe(document.body, {
    childList: true
  });
}
