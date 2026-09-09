import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

/**
 * Derives user-friendly header title based on current route
 */
const getRouteTitle = (pathname) => {
  if (pathname.startsWith('/customers/')) {
    return 'Customer Details';
  }
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';
    case '/customers':
      return 'Customers';
    case '/leads':
      return 'Leads';
    case '/opportunities':
      return 'Opportunities';
    default:
      return 'CRM Workspace';
  }
};

/**
 * Phase 3 CRM Header Component
 * Features:
 * - Left: Mobile hamburger menu toggle & current dynamic page title
 * - Center: Prominent wide command search bar ("Search or type command..." + Ctrl/Cmd K shortcut indicator)
 * - Right: Emerald gradient action button (+ Quick Add), notification bell with badge, Live Sync indicator, circular Admin avatar, and logout
 * - Strictly maintains Phase 2 Login page styling, typography, and palette
 */
const Header = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.getUser();
  const title = getRouteTitle(location.pathname);

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6 shrink-0 select-none">
      {/* 1. Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? (
            /* Close X icon */
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            /* Hamburger bars icon */
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Dynamic Page Title */}
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight font-sans">
            {title}
          </h1>
        </div>
      </div>

      {/* 2. Center: Prominent Wide Command Search Bar (Inspired by Header Reference) */}
      <div className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-2">
        <div className="relative w-full">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search or type command..."
            readOnly
            className="w-full h-10 pl-10 pr-14 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all cursor-default"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-400 pointer-events-none shadow-2xs">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* 3. Right: Action Button, Notifications & User Section */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Emerald Gradient Action Button (Matching Reference action button with Login theme) */}
        <button
          type="button"
          title="Quick Add Action"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-semibold shadow-xs hover:shadow-md active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
        >
          <span className="text-sm leading-none font-bold">+</span>
          <span>Quick Add</span>
        </button>

        {/* Notification Bell Icon */}
        <button
          type="button"
          aria-label="Notifications"
          title="View notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {/* Notification unread indicator dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </button>

        {/* Live Sync Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Sync</span>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Section with Circular Avatar */}
        <div className="flex items-center gap-2 pl-0.5">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {user?.name || 'Admin'}
            </div>
            <div className="text-[10px] text-slate-500 leading-none">
              {user?.role || 'Administrator'}
            </div>
          </div>

          {/* Circular Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-default ring-2 ring-white"
            title={`Signed in as ${user?.name || 'Admin'}`}
          >
            A
          </div>

          {/* Quick Header Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            aria-label="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-0.5 focus:outline-none cursor-pointer"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
