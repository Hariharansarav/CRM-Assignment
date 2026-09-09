import { useState } from 'react';
import PasswordInput from './PasswordInput';
import auth from '../../utils/auth';

/**
 * LoginForm Component
 * Reproduces the minimal, centered login form layout from the reference design.
 * Handles validation, static demo credentials (admin / admin@123), and error handling.
 */
const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setShowForgotNotice(false);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await auth.login(username, password);

      if (result.success) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setAuthError(result.message || 'Invalid username or password');
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotNotice(true);
  };

  return (
    <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto text-center">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight mb-7">
        Log in to your account
      </h2>

      {/* Auth Error Banner */}
      {authError && (
        <div
          role="alert"
          className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs text-red-700 text-left font-medium flex items-center gap-2"
        >
          <svg className="h-4 w-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{authError}</span>
        </div>
      )}

      {/* Forgot Password Demo Notice */}
      {showForgotNotice && (
        <div
          role="status"
          className="mb-4 rounded-lg bg-blue-50 border border-blue-200 px-3.5 py-2.5 text-xs text-blue-700 text-left font-medium flex items-center justify-between gap-2"
        >
          <span>Password recovery is not available in this demo.</span>
          <button
            type="button"
            onClick={() => setShowForgotNotice(false)}
            className="text-blue-500 hover:text-blue-800 font-bold ml-2"
            aria-label="Close notice"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-left">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <div className="relative flex items-center">
            {/* User Icon */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (fieldErrors.username) {
                  setFieldErrors((prev) => ({ ...prev, username: '' }));
                }
              }}
              placeholder="Username"
              disabled={isLoading}
              autoComplete="username"
              className={`w-full rounded-md bg-[#eef2f6] py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50 transition-all ${
                fieldErrors.username
                  ? 'border border-red-300 ring-1 ring-red-400'
                  : 'border border-transparent'
              }`}
            />
          </div>
          {fieldErrors.username && (
            <p className="mt-1 text-xs text-red-600 font-medium pl-1">
              {fieldErrors.username}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: '' }));
              }
            }}
            placeholder="Password"
            disabled={isLoading}
            hasError={Boolean(fieldErrors.password)}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium pl-1">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-center pt-0.5">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs text-[#3b82f6] hover:text-[#2563eb] hover:underline font-normal transition-colors focus:outline-none"
          >
            Forgot your password?
          </button>
        </div>

        {/* Submit Button - Pill Shaped Black Button matching reference design */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-black py-2.5 px-6 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-xs active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isLoading ? (
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
                <span>Logging in...</span>
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
