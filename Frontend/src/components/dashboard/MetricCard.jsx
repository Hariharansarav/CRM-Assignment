/**
 * MetricCard Component
 * Compact KPI card:
 * - Top: Primary metric value (text-xl sm:text-2xl font-bold)
 * - Bottom: Small icon + label (text-[11px] font-semibold)
 * - Compact padding (p-3.5 sm:p-4), soft border, rounded-2xl, subtle hover transition
 * - Protected against text/number overflow across all screen sizes
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
      iconColor: 'text-emerald-600',
    },
    teal: {
      iconColor: 'text-teal-600',
    },
    blue: {
      iconColor: 'text-blue-600',
    },
    indigo: {
      iconColor: 'text-indigo-600',
    },
    amber: {
      iconColor: 'text-amber-600',
    },
    rose: {
      iconColor: 'text-rose-600',
    },
  };

  const currentAccent = ACCENT_STYLES[accent] || ACCENT_STYLES.emerald;

  return (
    <div
      className={`group rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-w-0 ${className}`}
    >
      {/* Top: Metric Value */}
      <div className="min-w-0 mb-2">
        <div
          className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate leading-tight"
          title={formattedValue}
        >
          {formattedValue}
        </div>
      </div>

      {/* Bottom: Small Icon + Label */}
      <div className="flex items-center gap-1.5 min-w-0 text-slate-600">
        {icon && (
          <div
            className={`w-3.5 h-3.5 shrink-0 flex items-center justify-center ${currentAccent.iconColor}`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <span
          className="text-[11px] font-semibold text-slate-600 truncate block leading-tight"
          title={label}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
