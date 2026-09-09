import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

/**
 * Phase 3 CRM Application Shell Layout
 * Conceptually:
 * MainLayout
 *   ├── Sidebar (Desktop fixed / Mobile off-canvas drawer)
 *   └── Application Area
 *         ├── Header (with dynamic title & mobile trigger)
 *         └── <Outlet /> (in independently scrollable viewport)
 */
const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const [prevPathname, setPrevPathname] = useState(location.pathname);

  // Close mobile drawer whenever route changes without cascading render effect
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-slate-50 font-sans text-slate-900">
      {/* DESKTOP SIDEBAR (Permanent compact icon-first column on lg screens) */}
      <div className="hidden lg:flex w-[72px] xl:w-20 h-full border-r border-slate-200/80 bg-white shrink-0 z-20">
        <Sidebar />
      </div>

      {/* MOBILE DRAWER SIDEBAR (Off-canvas on mobile/tablet screens) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Off-canvas drawer panel */}
          <div className="relative w-72 max-w-[85vw] h-full bg-white shadow-2xl z-50 flex flex-col">
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} isMobile />
          </div>
        </div>
      )}

      {/* APPLICATION AREA (Header + Content Outlet) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Independently scrollable main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
