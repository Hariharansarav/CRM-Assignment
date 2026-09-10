import { useState, useEffect, useRef } from 'react';
import PasswordInput from './PasswordInput';
import auth from '../../utils/auth';
import crmLogo from '../../assets/CRM.png';

const REMEMBER_ME_STORAGE_KEY = 'crm_remembered_username';

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem(REMEMBER_ME_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return Boolean(localStorage.getItem(REMEMBER_ME_STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Focus appropriate input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (rememberMe) {
        passwordInputRef.current?.focus();
      } else {
        usernameInputRef.current?.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [rememberMe]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 450);
  };

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin@123');
    setFieldErrors({});
    setAuthError('');
    setShowForgotNotice(false);
    // Focus password field or ready state
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 50);
  };

  const handleClearUsername = () => {
    setUsername('');
    setFieldErrors((prev) => ({ ...prev, username: '' }));
    setAuthError('');
    usernameInputRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setShowForgotNotice(false);

    if (!validate()) {
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      const result = await auth.login(username, password);

      if (result.success) {
        localStorage.setItem('isAuthenticated', 'true');
        // Save or remove remembered username based on checkbox
        try {
          if (rememberMe) {
            localStorage.setItem(REMEMBER_ME_STORAGE_KEY, username.trim());
          } else {
            localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
          }
        } catch (storageErr) {
          console.error('Failed to update remembered username in storage', storageErr);
        }

        setIsSuccess(true);
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 400);
      } else {
        setAuthError(result.message || 'Invalid username or password');
        triggerShake();
        setIsLoading(false);
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
      triggerShake();
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotNotice((prev) => !prev);
    setAuthError('');
  };

  return (
    <div className={`w-full text-left transition-all ${isShaking ? 'animate-shake' : ''}`}>
      {/* Top Green Squircle CRM Brand Icon */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 p-2 flex items-center justify-center shadow-lg shadow-emerald-600/20 mx-auto mb-5">
        <img
          src={crmLogo}
          alt="CRM Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight text-center leading-tight mb-1.5 font-sans">
        Sign in to your account
      </h1>

      {/* Subtext */}
      <p className="text-xs sm:text-[13px] text-slate-500 font-normal text-center leading-relaxed mb-4">
        Enter your credentials to access Mini Sales CRM.
      </p>

      {/* UX Assist: 1-Click Demo Credentials Quick-Fill Pill */}
      <div className="flex items-center justify-between px-3 py-2 mb-4 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded">
            DEMO
          </span>
          <span className="text-[11px] text-slate-600 font-mono truncate">
            admin / admin@123
          </span>
        </div>
        <button
          type="button"
          onClick={handleQuickFill}
          disabled={isLoading || isSuccess}
          title="Auto-fill demo credentials"
          className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 active:text-emerald-800 underline decoration-emerald-300 hover:decoration-emerald-500 underline-offset-2 transition-all cursor-pointer focus:outline-none shrink-0 ml-2"
        >
          Quick fill
        </button>
      </div>

      {/* Authentication Failure Error Banner */}
      {authError && (
        <div
          role="alert"
          className="mb-4 rounded-xl bg-red-50 border border-red-200/80 px-3.5 py-2.5 text-xs text-red-600 font-medium flex items-center justify-between gap-2 animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 shrink-0 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{authError}</span>
          </div>
          <button
            type="button"
            onClick={() => setAuthError('')}
            className="text-red-400 hover:text-red-700 font-bold ml-1 cursor-pointer focus:outline-none"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Actionable Forgot Password Assistant */}
      {showForgotNotice && (
        <div
          role="status"
          className="mb-4 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 animate-in fade-in duration-200"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Demo Account Credentials</span>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotNotice(false)}
              className="text-slate-400 hover:text-slate-700 font-bold ml-2 cursor-pointer focus:outline-none"
              aria-label="Close notice"
            >
              ×
            </button>
          </div>
          <p className="mt-1 text-slate-500 text-[11px] leading-relaxed">
            In this demo, access is pre-configured. Use username <span className="font-mono font-medium text-slate-800">admin</span> and password <span className="font-mono font-medium text-slate-800">admin@123</span>.
          </p>
          <div className="mt-2.5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                handleQuickFill();
                setShowForgotNotice(false);
              }}
              className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              Fill &amp; Continue →
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email or Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Username
          </label>
          <div className="relative flex items-center">
            <input
              ref={usernameInputRef}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (fieldErrors.username) {
                  setFieldErrors((prev) => ({ ...prev, username: '' }));
                }
                if (authError) {
                  setAuthError('');
                }
              }}
              placeholder="admin"
              disabled={isLoading || isSuccess}
              autoComplete="username"
              className={`w-full h-[46px] rounded-xl bg-white border px-4 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all ${
                fieldErrors.username
                  ? 'border-red-400 ring-1 ring-red-400/40'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            {/* Quick Clear Button */}
            {username.length > 0 && !isLoading && !isSuccess && (
              <button
                type="button"
                onClick={handleClearUsername}
                title="Clear username"
                aria-label="Clear username"
                tabIndex={-1}
                className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          {fieldErrors.username && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {fieldErrors.username}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Password
          </label>
          <PasswordInput
            ref={passwordInputRef}
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: '' }));
              }
              if (authError) {
                setAuthError('');
              }
            }}
            placeholder="admin@123"
            disabled={isLoading || isSuccess}
            hasError={Boolean(fieldErrors.password)}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading || isSuccess}
              className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer accent-slate-900"
            />
            <span className="text-xs text-slate-600 font-medium">Remember me</span>
          </label>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading || isSuccess}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors focus:outline-none cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Primary Button: State-Driven (Normal / Loading / Success) */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full h-[46px] rounded-full text-sm font-semibold text-white transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
              isSuccess
                ? 'bg-emerald-600 shadow-emerald-600/30'
                : 'bg-[#1b2126] hover:bg-black active:bg-slate-900 disabled:opacity-65 disabled:cursor-not-allowed'
            }`}
          >
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 animate-in fade-in duration-200">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Signed in! Redirecting...</span>
              </div>
            ) : isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Log in</span>
                <span className="text-base leading-none">&rarr;</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
