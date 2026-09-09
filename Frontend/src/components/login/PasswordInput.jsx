import { useState, forwardRef } from 'react';

/**
 * Controlled Password Input Component with visibility toggle & UX enhancements.
 * Features:
 * - Clean rounded-xl styling matching the design.
 * - Caps Lock detection and subtle warning indicator to prevent user login mistakes.
 * - Accessible show/hide toggle button with title/aria-label.
 * - Supports forwarded ref for smart auto-focusing.
 */
const PasswordInput = forwardRef(function PasswordInput(
  {
    id = 'password',
    name = 'password',
    value,
    onChange,
    placeholder = '•••••••••••••••••••••',
    disabled = false,
    hasError = false,
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyEvent = (e) => {
    if (e.getModifierState) {
      setIsCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  const handleBlur = (e) => {
    setIsCapsLockOn(false);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Caps Lock Detection Badge */}
      {isCapsLockOn && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-7 right-0 flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shadow-xs animate-in fade-in duration-150 z-20"
        >
          <svg
            className="w-3 h-3 text-amber-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v12M8 7l4-4 4 4M5 21h14" />
          </svg>
          <span>Caps Lock is on</span>
        </div>
      )}

      {/* Input Field */}
      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyEvent}
        onKeyUp={handleKeyEvent}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="current-password"
        className={`w-full h-[46px] rounded-xl bg-white border px-4 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all ${
          hasError
            ? 'border-red-400 ring-1 ring-red-400/40'
            : 'border-slate-200 hover:border-slate-300'
        }`}
        {...rest}
      />

      {/* Show/Hide Password Toggle Button */}
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={disabled}
        title={showPassword ? 'Hide password' : 'Show password'}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
      >
        {showPassword ? (
          /* Eye-slash Icon (Hide Password) */
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
              clipRule="evenodd"
            />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        ) : (
          /* Eye Icon (Show Password) */
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
});

export default PasswordInput;
