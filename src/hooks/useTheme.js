// hooks/useTheme.js
// --------------------------------------------------
// Light/dark theme toggle. Sets data-theme on <body>, which every
// component's CSS reads via the variables defined in index.css.
// Components never need to know which theme is active — they just
// reference var(--bg-surface) etc. Only this hook (and whatever
// renders the toggle button) needs to care about the actual state.

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'vectorshift-theme';

const getInitialTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable (privacy mode, etc.) — fall through.
  }
  return 'dark';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage write failures — theme still works for the session.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
};