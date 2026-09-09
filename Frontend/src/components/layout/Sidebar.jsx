import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';
import crmLogo from '../../assets/CRM.png';

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/customers',
    label: 'Customers',
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: '/leads',
    label: 'Leads',
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    to: '/opportunities',
    label: 'Opportunities',
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

/**
 * Phase 3 Slim Icon Sidebar Component
 * Features:
 * - Desktop: Compact 72px–80px icon-first vertical navigation with floating hover tooltips
 * - Mobile: Expands into full off-canvas drawer with Icon + Label
 * - Active state: Emerald highlight indicator matching Login page visual identity
 * - Admin profile avatar & client-side Logout flow
 */
const Sidebar = ({ onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const user = auth.getUser();

  const handleLogout = () => {
    auth.logout();
    if (onClose) onClose();
    navigate('/login', { replace: true });
  };

  // MOBILE DRAWER VIEW (Icon + Label)
  if (isMobile) {
    return (
      <aside className="h-full flex flex-col justify-between bg-white select-none">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 p-1.5 flex items-center justify-center shadow-md shadow-emerald-600/15 shrink-0">
                <img
                  src={crmLogo}
                  alt="Mini Sales CRM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base tracking-tight block leading-tight font-sans">
                  Mini Sales CRM
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider block">
                  Sales Workspace
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close navigation menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Navigation
            </div>

            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-5 h-5 shrink-0 transition-colors ${
                              isActive
                                ? 'text-emerald-600'
                                : 'text-slate-400 group-hover:text-slate-600'
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom User Card & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/70">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                A
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {user?.name || 'Admin'}
                </div>
                <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0"></span>
                  <span>{user?.role || 'Administrator'}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200/60 transition-all cursor-pointer focus:outline-none"
            aria-label="Log out"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    );
  }

  // DESKTOP SLIM ICON-FIRST VIEW (64px–80px with animated tooltips)
  return (
    <aside className="w-full h-full flex flex-col justify-between items-center py-4 bg-white select-none relative z-30">
      {/* Top: Mini Sales CRM Logo & Navigation Icons */}
      <div className="flex flex-col items-center w-full space-y-6">
        {/* Brand Logo with Tooltip */}
        <div className="relative group flex items-center justify-center">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 p-2 flex items-center justify-center shadow-md shadow-emerald-600/20 cursor-pointer transition-transform duration-200 group-hover:scale-105">
            <img
              src={crmLogo}
              alt="Mini Sales CRM Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Logo Tooltip */}
          <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left flex items-center gap-1.5 border border-slate-800">
            <span>Mini Sales CRM</span>
            <span className="text-[10px] text-emerald-400 font-normal">v3.0</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-slate-100" />

        {/* Navigation Icon Group */}
        <nav className="flex flex-col items-center space-y-3 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.to} className="relative group flex items-center justify-center w-full">
                <NavLink
                  to={item.to}
                  aria-label={item.label}
                  className={({ isActive }) =>
                    `w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 relative ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-100'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
                      {/* Active Indicator Pip */}
                      {isActive && (
                        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-600 rounded-r-full"></span>
                      )}
                    </>
                  )}
                </NavLink>

                {/* Floating Hover Tooltip */}
                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left flex items-center gap-2 border border-slate-800">
                  <span>{item.label}</span>
                  <span className="text-emerald-400 text-xs">→</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Admin User Avatar & Logout Button */}
      <div className="flex flex-col items-center space-y-3 w-full px-2 pt-4 border-t border-slate-100">
        {/* Admin Avatar with Tooltip */}
        <div className="relative group flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-default ring-2 ring-white hover:ring-emerald-200 transition-all"
            title="Admin User"
          >
            A
          </div>

          {/* Admin Tooltip */}
          <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left border border-slate-800">
            <div className="font-semibold text-white">{user?.name || 'Admin'}</div>
            <div className="text-[10px] text-emerald-400">{user?.role || 'Administrator'}</div>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
          </div>
        </div>

        {/* Logout Icon Button with Tooltip */}
        <div className="relative group flex items-center justify-center">
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>

          {/* Logout Tooltip */}
          <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left border border-slate-800">
            <span className="text-red-400">Log Out</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
