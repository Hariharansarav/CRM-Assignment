/**
 * MetricCard Component
 * Executive KPI card:
 * - Top: Category label + softly tinted icon container with accent border
 * - Center: High-impact metric number with tabular figures
 * - Interactive: card-hover elevation and subtle glowing border highlight
 */
export const MetricCard = ({
  label,
  value,
  icon,
  accent = 'emerald',
  isCurrency = false,
  className = '',
}) => {
  // Safe number/currency formatting
  const formattedValue = (() => {
    if (value === null || value === undefined) return '0';
    if (isCurrency) {
      const num = Number(value);
      if (isNaN(num)) return '$0';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(num);
    }
    const num = Number(value);
    if (!isNaN(num)) {
      return new Intl.NumberFormat('en-US').format(num);
    }
    return String(value);
  })();

  const ACCENT_STYLES = {
    emerald: {
      badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 group-hover:bg-emerald-500/15',
      glow: 'from-emerald-500/10 via-transparent to-transparent',
    },
    teal: {
      badge: 'bg-teal-500/10 text-teal-600 border-teal-500/20 group-hover:bg-teal-500/15',
      glow: 'from-teal-500/10 via-transparent to-transparent',
    },
    blue: {
      badge: 'bg-blue-500/10 text-blue-600 border-blue-500/20 group-hover:bg-blue-500/15',
      glow: 'from-blue-500/10 via-transparent to-transparent',
    },
    indigo: {
      badge: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 group-hover:bg-indigo-500/15',
      glow: 'from-indigo-500/10 via-transparent to-transparent',
    },
    amber: {
      badge: 'bg-amber-500/10 text-amber-700 border-amber-500/20 group-hover:bg-amber-500/15',
      glow: 'from-amber-500/10 via-transparent to-transparent',
    },
    rose: {
      badge: 'bg-rose-500/10 text-rose-600 border-rose-500/20 group-hover:bg-rose-500/15',
      glow: 'from-rose-500/10 via-transparent to-transparent',
    },
  };

  const currentAccent = ACCENT_STYLES[accent] || ACCENT_STYLES.emerald;

  return (
    <div
      className={`group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0 ${className}`}
    >
      {/* Top subtle ambient light */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${currentAccent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Top: Header with Label & Icon Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate"
          title={label}
        >
          {label}
        </span>
        {icon && (
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${currentAccent.badge}`}
            aria-hidden="true"
          >
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>

      {/* Center: High-impact Metric Value */}
      <div className="min-w-0">
        <div
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans truncate tabular-nums leading-tight group-hover:text-slate-950 transition-colors"
          title={formattedValue}
        >
          {formattedValue}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
