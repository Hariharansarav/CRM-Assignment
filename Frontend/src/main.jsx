import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Intercept and suppress third-party browser extension errors and Chrome DevTools internal instrumentation bugs
if (typeof window !== 'undefined') {
  const shouldSuppress = (msg, stack = '') => {
    const str = `${msg || ''} ${stack || ''}`;
    return (
      str.includes('message channel closed before a response was received') ||
      str.includes("Cannot read properties of undefined (reading 'startTime')") ||
      str.includes("reading 'startTime'") ||
      str.includes('reportAllChanges') ||
      str.includes('Extension context invalidated') ||
      str.includes('ObjectMultiplex') ||
      str.includes('app-init-liveness') ||
      str.includes('background-liveness')
    );
  };

  window.addEventListener(
    'error',
    (event) => {
      const msg = event.message || event.error?.message || '';
      const stack = event.error?.stack || '';
      if (shouldSuppress(msg, stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event.reason;
      const msg = typeof reason === 'string' ? reason : reason?.message || '';
      const stack = reason?.stack || '';
      if (shouldSuppress(msg, stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  const originalError = console.error;
  console.error = (...args) => {
    const str = args
      .map((a) => (typeof a === 'string' ? a : a?.message || a?.stack || ''))
      .join(' ');
    if (shouldSuppress(str)) {
      return;
    }
    originalError.apply(console, args);
  };

  const originalWarn = console.warn;
  console.warn = (...args) => {
    const str = args
      .map((a) => (typeof a === 'string' ? a : a?.message || a?.stack || ''))
      .join(' ');
    if (
      str.includes('MaxListenersExceededWarning') ||
      str.includes('ObjectMultiplex') ||
      str.includes('app-init-liveness') ||
      str.includes('background-liveness') ||
      str.includes('contentscript.js')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

