import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Phase 1 Temporary Backend Connection Test Component
 * Verifies frontend-to-backend communication via GET /api/health
 * Styled using Tailwind CSS v4
 */
const ApiHealthTest = () => {
  const [status, setStatus] = useState('loading'); // 'idle' | 'loading' | 'success' | 'error'
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchHealth = () => {
    setStatus('loading');
    setErrorMessage('');
    api
      .get('/health')
      .then((response) => {
        setData(response.data);
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        setErrorMessage(
          err.response?.data?.message ||
          err.message ||
          'Unable to connect to backend server'
        );
      });
  };

  useEffect(() => {
    let isMounted = true;
    api
      .get('/health')
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (isMounted) {
          setStatus('error');
          setErrorMessage(
            err.response?.data?.message ||
            err.message ||
            'Unable to connect to backend server'
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Backend Connection Test
          </h3>
          <p className="text-xs text-slate-500">
            Phase 1 Diagnostic Endpoint Verification
          </p>
        </div>

        <button
          type="button"
          onClick={fetchHealth}
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs active:scale-[0.98]"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Connecting...
            </span>
          ) : (
            'Recheck Connection'
          )}
        </button>
      </div>

      <div className="text-xs text-slate-600">
        <span className="font-medium text-slate-500">Target Endpoint:</span>{' '}
        <code className="bg-slate-100 border border-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono">
          {import.meta.env.VITE_API_BASE_URL}/health
        </code>
      </div>

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium py-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Testing connection to Express API...
        </div>
      )}

      {status === 'success' && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Backend Connected Successfully
          </div>
          <pre className="text-xs font-mono bg-white/80 border border-emerald-100 rounded-md p-3 text-emerald-950 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-800">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Connection Failed
          </div>
          <div className="text-xs text-red-700">
            <strong>Error:</strong> {errorMessage}
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Ensure the Express backend is running on <code>http://localhost:5000</code>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiHealthTest;
