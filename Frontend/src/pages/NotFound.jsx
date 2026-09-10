import { useNavigate, useLocation, Link } from 'react-router-dom';
import crmLogo from '../assets/CRM.png';

/**
 * NotFound (404) Page Component for Mini Sales CRM
 * Matching the design system:
 * - Sleek emerald & slate color palette
 * - Modern squircle icons and card elevations
 * - Contextual primary action (Dashboard vs Login based on session)
 * - Quick jump navigation cards to common CRM routes
 * - Works both inside MainLayout and standalone
 */
export const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const quickLinks = [
    {
      title: 'Dashboard',
      desc: 'Real-time sales metrics, analytics, and executive pipeline summary.',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      title: 'Customers',
      desc: 'Browse client accounts, contacts, and deal histories.',
      path: '/customers',
      icon: (
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Leads',
      desc: 'Track and qualify inbound prospects across acquisition channels.',
      path: '/leads',
      icon: (
        <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Opportunities',
      desc: 'Manage deal pipelines, estimated values, and winning probabilities.',
      path: '/opportunities',
      icon: (
        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`w-full ${isAuthenticated ? 'py-4 sm:py-6' : 'min-h-screen flex flex-col justify-between bg-slate-50 p-4 sm:p-8 font-sans'} select-none`}>
      {/* Top Branding (only shown if not in authenticated MainLayout) */}
      {!isAuthenticated && (
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 p-1.5 flex items-center justify-center shadow-md shadow-emerald-600/20">
              <img src={crmLogo} alt="CRM Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Mini Sales CRM
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Main 404 Hero Card */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm overflow-hidden text-center">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>404 • Page Not Found</span>
          </div>

          {/* Stylized 404 Large Numbers */}
          <div className="relative mb-4 flex items-center justify-center">
            <span className="text-7xl sm:text-8xl font-black tracking-tight text-slate-900 font-sans select-none">
              4
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-emerald-600 to-teal-500">
                0
              </span>
              4
            </span>
          </div>

          {/* Headline & Description */}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 font-sans">
            Oops! This page wandered off the pipeline.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-4">
            We couldn't locate the requested page at{' '}
            <code className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] sm:text-xs font-medium border border-slate-200">
              {location.pathname}
            </code>
            . It may have been moved, renamed, or does not exist.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 mb-8">
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/25 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>{isAuthenticated ? 'Back to Dashboard' : 'Go to Login'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/90 shadow-2xs transition-colors cursor-pointer focus:outline-none"
            >
              <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Jump Suggestions (for authenticated sessions) */}
          {isAuthenticated && (
            <div className="pt-6 border-t border-slate-100 text-left">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Navigation Links
                </span>
                <span className="text-[11px] text-slate-400">
                  Select a section below
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/50 border border-slate-200/70 hover:border-emerald-200 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 group-hover:border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                          {item.title}
                        </h4>
                        <span className="text-slate-300 group-hover:text-emerald-600 transition-colors text-xs">
                          &rarr;
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer (if standalone) */}
      {!isAuthenticated && (
        <div className="w-full text-center text-xs text-slate-400 py-4">
          Mini Sales CRM &copy; {new Date().getFullYear()} &bull; All rights reserved.
        </div>
      )}
    </div>
  );
};

export default NotFound;
