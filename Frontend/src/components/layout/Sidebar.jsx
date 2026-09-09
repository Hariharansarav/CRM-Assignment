import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';
import crmGreenLogo from '../../assets/CRM-green.png';

/**
 * Navigation items strictly based on project pages:
 * 1. Dashboard (/dashboard)
 * 2. Leads (/leads)
 * 3. Customers (/customers)
 * 4. Opportunities (/opportunities)
 * (No extra elements like Settings or Support per requirements)
 */
const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    // 4-square / 2x2 grid icon matching reference Image 1
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.75" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.75" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.75" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.75" />
      </svg>
    ),
  },
  {
    to: '/leads',
    label: 'Leads',
    // Paper airplane / send icon matching reference Image 1
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
      </svg>
    ),
  },
  {
    to: '/customers',
    label: 'Customers',
    // Wallet / purse icon matching reference Image 1
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/opportunities',
    label: 'Opportunities',
    // Line chart with baseline and dots matching reference Image 1
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18" />
        <path d="M4 16l6-6 4 4 6-8" />
        <circle cx="4" cy="16" r="1.5" fill="currentColor" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
        <circle cx="20" cy="6" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const Sidebar = ({ onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    auth.logout();
    if (onClose) onClose();
    navigate('/login', { replace: true });
  };

  // Active check helper that also accounts for nested routes like /customers/:id
  const isItemActive = (to) => {
    if (to === '/dashboard') return location.pathname === '/dashboard';
    if (to === '/customers') return location.pathname.startsWith('/customers');
    return location.pathname === to;
  };

  // =========================================================================
  // MOBILE OFF-CANVAS DRAWER VIEW (<768px)
  // =========================================================================
  if (isMobile) {
    return (
      <aside className="h-full flex flex-col justify-between bg-[#11161b] text-white select-none">
        <div>
          {/* Mobile Header: Logo & Title */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 p-1">
                <img
                  src={crmGreenLogo}
                  alt="Mini Sales CRM"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-white text-sm tracking-tight block leading-tight font-sans">
                  Mini Sales CRM
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  Sales Workspace
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none cursor-pointer"
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

          {/* Navigation Items (Project Pages Only) */}
          <div className="p-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Navigation
            </div>

            <nav className="space-y-1.5" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-white text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          active
                            ? 'text-slate-950'
                            : 'text-slate-400 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    {active && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Bottom: Logout */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer focus:outline-none"
            aria-label="Logout"
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

  // =========================================================================
  // DESKTOP DOCK VIEW (Matching Reference Image 1 & Prompt Spec)
  // - Dark neutral charcoal dock (#11161b)
  // - Top: Stylized App Logo with emerald theme accent
  // - Navigation: Project pages only (Dashboard, Leads, Customers, Opportunities)
  // - Active Item: Curved white tab that bulges into the sidebar and seamlessly
  //   merges with the main white content area via inverse vector curves
  // - Subtle horizontal divider
  // - Bottom: Logout icon only
  // =========================================================================
  return (
    <aside
      className="w-full h-full flex flex-col justify-between items-center py-6 bg-[#11161b] select-none relative z-30"
      aria-label="Sidebar Navigation"
    >
      {/* TOP SECTION: Logo + Navigation Items */}
      <div className="flex flex-col items-center w-full">
        {/* App Logo (Top) */}
        <div className="relative group flex items-center justify-center mb-7">
          <Link
            to="/dashboard"
            aria-label="Mini Sales CRM Dashboard"
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40 p-1"
          >
            {/* Green CRM Logo */}
            <img
              src={crmGreenLogo}
              alt="Mini Sales CRM"
              className="w-8 h-8 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            />
          </Link>

          {/* Logo Tooltip */}
          <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left flex items-center gap-2 border border-slate-800">
            <span>Mini Sales CRM</span>
            <span className="text-[10px] text-emerald-400 font-medium px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
              Workspace
            </span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
          </div>
        </div>

        {/* Navigation Items Group */}
        <nav className="flex flex-col items-center w-full space-y-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.to);

            return (
              <div key={item.to} className="relative group w-full flex items-center">
                <NavLink
                  to={item.to}
                  aria-label={item.label}
                  className={`relative w-full h-12 flex items-center justify-center transition-colors duration-150 cursor-pointer focus:outline-none ${
                    active
                      ? 'text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Active Background Curved Tab */}
                  {active && (
                    <div
                      className="absolute top-0 right-0 h-full w-[60px] bg-white rounded-l-[24px] z-0 shadow-[-4px_0_12px_rgba(0,0,0,0.06)]"
                      aria-hidden="true"
                    >
                      {/* Top Inverted Corner: Smooth concave transition from dark sidebar to white tab */}
                      <svg
                        className="absolute -top-5 right-0 w-5 h-5 pointer-events-none text-white fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M20 0 V20 H0 C11.0457 20 20 11.0457 20 0 Z" />
                      </svg>

                      {/* Bottom Inverted Corner: Smooth concave transition from white tab back to dark sidebar */}
                      <svg
                        className="absolute -bottom-5 right-0 w-5 h-5 pointer-events-none text-white fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M20 20 V0 H0 C11.0457 0 20 8.9543 20 20 Z" />
                      </svg>
                    </div>
                  )}

                  {/* Icon (Vertically & horizontally aligned down the sidebar axis) */}
                  <span className={`relative z-10 transition-transform duration-150 ${active ? 'scale-105' : 'group-hover:scale-110'}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                </NavLink>

                {/* Floating Tooltip (Desktop) */}
                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left flex items-center border border-slate-800">
                  <span>{item.label}</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                </div>
              </div>
            );
          })}

          {/* Subtle Divider (Matching Reference Image 1 & Prompt Spec) */}
          <div className="pt-2 pb-1 w-full flex justify-center">
            <div className="w-6 h-[1.5px] bg-slate-800/90 rounded-full" />
          </div>
        </nav>
      </div>

      {/* BOTTOM SECTION: Logout Action */}
      <div className="w-full flex flex-col items-center">
        <div className="relative group w-full flex items-center justify-center">
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors focus:outline-none cursor-pointer"
          >
            {/* Logout Exit Icon matching Reference Image 1 */}
            <svg
              className="w-5 h-5 transition-transform duration-150 group-hover:scale-110"
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
          <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none origin-left border border-slate-800">
            <span className="text-rose-400 font-medium">Log Out</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
