import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import auth from '../utils/auth';

/**
 * Login Page Component
 * Faithfully reproduces the aesthetic and minimalist layout of the reference design.
 * Features a soft ethereal violet-to-peach gradient blending into white, centered login form,
 * and clean CRM branding.
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (auth.isAuthenticated()) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col justify-between overflow-hidden selection:bg-purple-100 selection:text-purple-900">
      {/* Soft Ethereal Gradient Overlays matching reference design */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 10% 8%, rgba(216, 180, 254, 0.55), rgba(232, 121, 249, 0.28) 40%, transparent 75%),
            radial-gradient(ellipse 60% 50% at 92% 10%, rgba(254, 215, 170, 0.6), rgba(253, 186, 116, 0.3) 38%, transparent 72%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Header / Branding */}
      <header className="relative z-10 w-full pt-10 px-8 sm:px-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-normal tracking-tight text-slate-900 font-sans">
            Mini Sales CRM
          </span>
        </div>
      </header>

      {/* Main Content Area - Visually Centered */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:px-6">
        <LoginForm onSuccess={handleLoginSuccess} />
      </main>

      {/* Subtle Footer Spacing */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Mini Sales CRM. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
