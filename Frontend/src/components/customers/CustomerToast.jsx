import { useEffect } from 'react';

/**
 * CustomerToast Component
 * Displays temporary success or feedback messages in the bottom right corner.
 */
export const CustomerToast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-3 duration-200"
      role="status"
      aria-live="polite"
    >
      <div
        className={`rounded-2xl p-3.5 sm:p-4 shadow-xl border flex items-center justify-between gap-3 ${
          isError
            ? 'bg-rose-900 text-white border-rose-800'
            : 'bg-[#1b2126] text-white border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {isError ? (
            <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
          <p className="text-xs sm:text-sm font-medium leading-tight truncate">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message"
          className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomerToast;
