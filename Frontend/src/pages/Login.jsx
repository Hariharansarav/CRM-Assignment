import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import CrmDashboardMockup from '../components/login/CrmDashboardMockup';
import auth from '../utils/auth';

const HERO_SLIDES = [
  {
    tag: 'INTELLIGENT WORKSPACE',
    headline: 'Grow your business with smarter sales',
    description:
      'Manage customers, track leads, and close more deals from a single intelligent sales workspace.',
  },
  {
    tag: 'PREDICTIVE PIPELINE',
    headline: 'Accelerate deal conversion with AI',
    description:
      'Predictive deal scoring, automated pipeline health indicators, and proactive revenue forecasting.',
  },
  {
    tag: 'REAL-TIME VISIBILITY',
    headline: 'Sync your entire sales team instantly',
    description:
      'Live customer activity stream, instant deal stage changes, and unified pipeline reporting.',
  },
];

/**
 * Login Page Component - Full-Page Fixed Layout for Mini Sales CRM
 * UX Higher Version Enhancements:
 * - Interactive value proposition carousel with indicator pills & hover pause
 * - Frictionless quick-fill demo credentials
 * - Caps Lock warning and shake error feedback
 * - True Remember Me persistence
 * - Preserves 100% of the Sentinel layout, lush emerald container, and 3D dashboard mockup.
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (auth.isAuthenticated()) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  // Auto-advance hero carousel every 5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-white font-sans select-none selection:bg-emerald-500/20">
      {/* LEFT COLUMN: Login Section with Geometric Background */}
      <div className="w-full lg:w-[48%] xl:w-[45%] h-full flex flex-col justify-between p-6 sm:p-8 xl:p-12 relative bg-white z-10 overflow-y-auto lg:overflow-hidden">
        {/* Subtle Geometric Faceted Low-Poly SVG Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" stroke="currentColor">
            <polygon points="0,0 200,100 100,300 0,200" strokeWidth="1" />
            <polygon points="200,100 450,50 350,250 100,300" strokeWidth="1" />
            <polygon points="450,50 700,120 550,320 350,250" strokeWidth="1" />
            <polygon points="700,120 800,0 800,300 550,320" strokeWidth="1" />
            <polygon points="0,200 100,300 50,550 0,500" strokeWidth="1" />
            <polygon points="100,300 350,250 250,500 50,550" strokeWidth="1" />
            <polygon points="350,250 550,320 450,550 250,500" strokeWidth="1" />
            <polygon points="550,320 800,300 700,550 450,550" strokeWidth="1" />
            <polygon points="0,500 50,550 0,800" strokeWidth="1" />
            <polygon points="50,550 250,500 200,750 0,800" strokeWidth="1" />
            <polygon points="250,500 450,550 400,800 200,750" strokeWidth="1" />
            <polygon points="450,550 700,550 650,800 400,800" strokeWidth="1" />
            <polygon points="700,550 800,300 800,800 650,800" strokeWidth="1" />
          </svg>
        </div>

        {/* Top-Left Branding: "Mini Sales CRM" */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-[22px] font-bold tracking-tight text-slate-900 font-sans">
              Mini Sales CRM
            </span>
          </div>
        </div>

        {/* Centered Login Form Container */}
        <div className="relative z-10 w-full max-w-[390px] mx-auto my-auto py-4 sm:py-6">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>

      {/* RIGHT COLUMN: Rich Green Container with CRM Dashboard Mockup */}
      <div className="hidden lg:flex flex-1 h-full p-3 sm:p-4 pl-0 overflow-hidden">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full h-full rounded-[28px] xl:rounded-[36px] bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#15803d] p-8 xl:p-12 relative overflow-hidden flex flex-col justify-between text-white shadow-inner transition-colors"
        >
          {/* Subtle Decorative Ambient Lighting Overlay */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

          {/* Top Headline & Carousel Controls */}
          <div className="relative z-10 max-w-lg">
            {/* Value Prop Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-emerald-100 mb-3 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              {currentSlide.tag}
            </div>

            <h2 className="text-2xl xl:text-3xl font-bold text-white tracking-tight leading-snug mb-2 min-h-[64px] sm:min-h-[72px] transition-all duration-300">
              {currentSlide.headline}
            </h2>
            <p className="text-xs xl:text-sm text-emerald-100/90 font-normal leading-relaxed mb-4 max-w-md min-h-[40px] transition-all duration-300">
              {currentSlide.description}
            </p>

            {/* Interactive Carousel Indicator Pills */}
            <div className="flex items-center gap-2 pt-1">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  title={`Slide ${idx + 1}`}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? 'w-7 bg-white shadow-sm'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Center / Bottom 3D Tilted CRM Dashboard Mockup */}
          <div className="relative z-10 flex-1 flex items-end justify-end mt-4">
            <CrmDashboardMockup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
