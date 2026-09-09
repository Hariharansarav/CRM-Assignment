import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';


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
    <div className="h-screen w-screen overflow-hidden flex bg-[#11161b] font-sans text-slate-900">
      {/* DESKTOP/TABLET SIDEBAR (Compact dark 76px icon dock on md+ screens) */}
      <div className="hidden md:flex w-[76px] h-full bg-[#11161b] shrink-0 z-20 relative">
        <Sidebar />
      </div>

      {/* MOBILE DRAWER SIDEBAR (Off-canvas on mobile screens <768px) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Off-canvas drawer panel */}
          <div className="relative w-72 max-w-[85vw] h-full bg-[#11161b] shadow-2xl z-50 flex flex-col">
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} isMobile />
          </div>
        </div>
      )}

      {/* APPLICATION AREA (Header + Content Outlet) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white relative">
        <Header
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Independently scrollable main content area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6 lg:p-8 focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
