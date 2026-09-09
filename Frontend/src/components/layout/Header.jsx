import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

/**
 * Header Component (Matching Reference Image 2 & Prompt Spec)
 * - Clean, minimal white surface (h-16)
 * - Left side:
 *   - Desktop: Wide rounded pill search bar with magnifying glass & "Search ..." placeholder
 *   - Mobile: Hamburger drawer toggle + stylized CRM logo
 * - Right side:
 *   - Message / Chat icon with orange notification dot
 *   - Notification Bell icon with orange notification dot
 *   - User Profile: Circular avatar, Admin username, dropdown chevron with full session details & logout
 */
const Header = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const messagesRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle outside clicks and Escape key to dismiss open popovers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(e.target)) {
        setIsMessagesOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
        setIsMessagesOpen(false);
      }
      // Keyboard shortcut ⌘K or Ctrl+K to focus search input
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 select-none relative z-30">
      {/* 1. Left Side: Search Bar (Desktop) or Mobile Menu Toggle + Logo */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Mobile Hamburger Toggle Button (Hidden on md+ screens) */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
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

        {/* Mobile Brand Identity with Login Emerald Accent (Hidden on md+) */}
        <div className="flex md:hidden items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="header-mobile-logo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="60%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <circle cx="15" cy="15" r="9" stroke="url(#header-mobile-logo)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M21.5 21.5L26 26" stroke="url(#header-mobile-logo)" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight font-sans">
            Mini Sales CRM
          </span>
        </div>

        {/* Desktop Search Bar (Matching Reference Image 2 & 3: Rounded pill input, placeholder: "Search ...") */}
        <div className="hidden md:flex items-center w-full max-w-sm lg:max-w-md">
          <div className="relative w-full group">
            {/* Search Icon */}
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-emerald-600"
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

            {/* Input with exact placeholder "Search ..." */}
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ..."
              aria-label="Search"
              className="w-full h-10 pl-10 pr-14 rounded-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />

            {/* Clear button if typed, or ⌘ K indicator */}
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer focus:outline-none"
                aria-label="Clear search"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-400 pointer-events-none shadow-2xs font-medium">
                ⌘ K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* 2. Right Side: Message / Chat, Notifications, User Profile (Matching Reference Image 2 & 3) */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        {/* Message / Chat Icon with Orange Notification Dot */}
        <div className="relative" ref={messagesRef}>
          <button
            type="button"
            onClick={() => {
              setIsMessagesOpen((prev) => !prev);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            aria-label="Messages"
            title="Messages"
            className={`relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none ${
              isMessagesOpen ? 'bg-slate-100 text-slate-900' : ''
            }`}
          >
            {/* Speech bubble icon with 3 dots matching Image 2 */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <circle cx="9" cy="12" r="0.75" fill="currentColor" />
              <circle cx="12" cy="12" r="0.75" fill="currentColor" />
              <circle cx="15" cy="12" r="0.75" fill="currentColor" />
            </svg>

            {/* Exact Orange / Coral Notification Dot matching Reference Image 2 */}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff6b4a] ring-2 ring-white" />
          </button>

          {/* Messages Dropdown Panel (UI only) */}
          {isMessagesOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Messages</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  2 Unread
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">Sarah Jenkins</span>
                    <span className="text-[10px] text-slate-400">5m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    Sent the contract proposal to Acme Corp. Waiting on signatures.
                  </p>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">Marcus Chen</span>
                    <span className="text-[10px] text-slate-400">42m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    Updated the deal stage for Global Tech Innovations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell Icon with Orange Notification Dot */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsMessagesOpen(false);
              setIsProfileOpen(false);
            }}
            aria-label="Notifications"
            title="Notifications"
            className={`relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none ${
              isNotificationsOpen ? 'bg-slate-100 text-slate-900' : ''
            }`}
          >
            {/* Bell icon matching Image 2 */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>

            {/* Exact Orange / Coral Notification Dot matching Reference Image 2 */}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ff6b4a] ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown Panel (UI only) */}
          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  3 New
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">New Deal Won</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 ml-4">Acme Corp signed contract ($54,000).</p>
                  <span className="text-[10px] text-slate-400 ml-4 block mt-1">10 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">Lead Assigned</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 ml-4">Elena Rostova added 4 new prospects.</p>
                  <span className="text-[10px] text-slate-400 ml-4 block mt-1">1 hour ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">Pipeline Synchronized</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 ml-4">CRM database updated successfully.</p>
                  <span className="text-[10px] text-slate-400 ml-4 block mt-1">3 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Section: Circular Avatar + Dropdown Arrow (Matching Reference Image 2 & 3) */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotificationsOpen(false);
              setIsMessagesOpen(false);
            }}
            className={`flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none border ${
              isProfileOpen ? 'border-emerald-400 bg-emerald-50/40 ring-2 ring-emerald-500/10' : 'border-transparent'
            }`}
            title="User Profile (Admin)"
            aria-label="User profile menu"
            aria-expanded={isProfileOpen}
          >
            {/* Circular Avatar matching Reference Image 2 portrait */}
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200/80 shadow-2xs shrink-0 flex items-center justify-center bg-slate-100">
              <svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#e2e8f0" />
                {/* Torso / patterned shirt */}
                <path d="M6 36c0-6 5.37-11 12-11s12 5 12 11" fill="#475569" />
                <path d="M12 25l6 6 6-6" fill="#10b981" />
                {/* Neck & Head */}
                <rect x="15" y="19" width="6" height="7" rx="2" fill="#fcd34d" />
                <circle cx="18" cy="15" r="7.5" fill="#fde68a" />
                {/* Hair */}
                <path d="M11 14c0-4 3.13-7 7-7s7 3 7 7c0 1-.5 2-1 2s-1.5-1-2-1c-1.5 0-2.5 1-4 1s-2.5-1-4-1c-.5 0-1.5 1-2 1s-1-1-1-2z" fill="#78350f" />
                {/* Beard */}
                <path d="M13 16c0 3.5 2.2 6.5 5 6.5s5-3 5-6.5h-1c-.5 2-1.8 3.5-4 3.5s-3.5-1.5-4-3.5h-1z" fill="#78350f" />
                {/* Glasses */}
                <rect x="13" y="12.5" width="4" height="3" rx="1" stroke="#1e293b" strokeWidth="0.8" fill="none" />
                <rect x="19" y="12.5" width="4" height="3" rx="1" stroke="#1e293b" strokeWidth="0.8" fill="none" />
                <line x1="17" y1="14" x2="19" y2="14" stroke="#1e293b" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Dropdown Chevron matching Reference Image 2 */}
            <svg
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                isProfileOpen ? 'rotate-180 text-emerald-600' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* User Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in duration-150">
              {/* User Identity Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="18" fill="#e2e8f0" />
                    <path d="M6 36c0-6 5.37-11 12-11s12 5 12 11" fill="#475569" />
                    <path d="M12 25l6 6 6-6" fill="#10b981" />
                    <rect x="15" y="19" width="6" height="7" rx="2" fill="#fcd34d" />
                    <circle cx="18" cy="15" r="7.5" fill="#fde68a" />
                    <path d="M11 14c0-4 3.13-7 7-7s7 3 7 7c0 1-.5 2-1 2s-1.5-1-2-1c-1.5 0-2.5 1-4 1s-2.5-1-4-1c-.5 0-1.5 1-2 1s-1-1-1-2z" fill="#78350f" />
                    <path d="M13 16c0 3.5 2.2 6.5 5 6.5s5-3 5-6.5h-1c-.5 2-1.8 3.5-4 3.5s-3.5-1.5-4-3.5h-1z" fill="#78350f" />
                    <rect x="13" y="12.5" width="4" height="3" rx="1" stroke="#1e293b" strokeWidth="0.8" fill="none" />
                    <rect x="19" y="12.5" width="4" height="3" rx="1" stroke="#1e293b" strokeWidth="0.8" fill="none" />
                    <line x1="17" y1="14" x2="19" y2="14" stroke="#1e293b" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    Admin
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    admin@crm.local
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Administrator</span>
                  </div>
                </div>
              </div>

              {/* Workspace Details */}
              <div className="py-2.5 text-[11px] text-slate-600 space-y-1.5 border-b border-slate-100">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Workspace</span>
                  <span className="font-semibold text-slate-800">Mini Sales CRM</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Session</span>
                  <span className="font-semibold text-emerald-700">Active</span>
                </div>
              </div>

              {/* Log Out Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
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
                    <span>Sign Out</span>
                  </div>
                  <span className="text-[11px] text-red-400">&rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
