import React, { useEffect, useState } from 'react';

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = (document.documentElement.dataset.theme as 'light' | 'dark') || 'light';
    setTheme(t);
  }, []);

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '0.375rem',
        border: '1px solid rgb(var(--border))',
        color: 'rgb(var(--muted))',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'color 0.15s ease, border-color 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'rgb(var(--accent))';
        e.currentTarget.style.borderColor = 'rgb(var(--accent))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgb(var(--muted))';
        e.currentTarget.style.borderColor = 'rgb(var(--border))';
      }}
    >
      {mounted && theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
