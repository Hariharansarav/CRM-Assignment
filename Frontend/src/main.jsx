import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Intercept and suppress third-party browser extension errors (MetaMask, password managers, etc.)
// that inject content scripts and emit stream/channel warnings when navigation occurs.
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = typeof reason === 'string' ? reason : reason?.message || '';
    if (
      msg.includes('message channel closed before a response was received') ||
      msg.includes('Extension context invalidated') ||
      msg.includes('ObjectMultiplex') ||
      msg.includes('app-init-liveness') ||
      msg.includes('background-liveness')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  const originalWarn = console.warn;
  console.warn = (...args) => {
    const str = args.map((a) => (typeof a === 'string' ? a : a?.message || '')).join(' ');
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

