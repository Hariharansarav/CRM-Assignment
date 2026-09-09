/**
 * Reusable MetricCard Component
 * Inspired by the reference dashboard's compact top metrics:
 * - Standard light card: white background, subtle border, large number, trend badge, and mini wave/bar.
 * - Dark hero card variant: deep slate-900 background, high contrast, and glowing wave sparkline.
 */
export const MetricCard = ({
  label,
  value,
  change,
  isPositive = true,
  icon,
  isHero = false,
  className = '',
}) => {
  if (isHero) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#181f25] text-white p-5 shadow-lg border border-slate-800 flex flex-col justify-between ${className}`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">{label}</span>
            {icon && (
              <div className="w-8 h-8 rounded-xl bg-slate-800/80 text-emerald-400 flex items-center justify-center border border-slate-700/50">
                {icon}
              </div>
            )}
          </div>
          <div className="text-3xl font-bold tracking-tight text-white font-sans mb-1">
            {value}
          </div>
        </div>

        {/* Wave Sparkline for Hero Card */}
        <div className="relative w-full h-12 mt-2">
          <svg className="w-full h-full" viewBox="0 0 160 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroCardGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 Q25,15 50,30 T100,20 T135,10 T160,5 L160,50 L0,50 Z"
              fill="url(#heroCardGlow)"
            />
            <path
              d="M0,40 Q25,15 50,30 T100,20 T135,10 T160,5"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
            />
            <circle cx="100" cy="20" r="3.5" fill="#22c55e" stroke="#181f25" strokeWidth="2" />
          </svg>
          {change && (
            <div className="absolute top-0 right-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              {change}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 truncate">{label}</span>
          {icon && (
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
              {icon}
            </div>
          )}
        </div>

        <div className="text-2xl xl:text-[26px] font-bold text-slate-900 tracking-tight font-sans mb-2">
          {value}
        </div>
      </div>

      {/* Mini Spline Wave Trend */}
      <div className="flex items-center justify-between pt-1">
        <div className="w-20 h-6">
          <svg className="w-full h-full" viewBox="0 0 80 25" preserveAspectRatio="none">
            <path
              d={
                isPositive
                  ? 'M0,20 Q20,5 40,15 T80,5'
                  : 'M0,5 Q20,18 40,10 T80,20'
              }
              fill="none"
              stroke={isPositive ? '#10b981' : '#f43f5e'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {change && (
          <div
            className={`flex items-center gap-1 text-[11px] font-semibold ${
              isPositive ? 'text-emerald-700' : 'text-rose-600'
            }`}
          >
            <span>{isPositive ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
