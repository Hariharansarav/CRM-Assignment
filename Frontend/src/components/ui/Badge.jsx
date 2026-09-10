/**
 * Reusable Status Badge Component
 * Handles Customer, Lead, and Opportunity statuses with subtle theme-consistent colors,
 * soft ambient glow, and crisp typography.
 */
const STATUS_STYLES = {
  // Positive / Won / Active
  active: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/90 shadow-2xs',
  won: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/90 shadow-2xs',
  qualified: 'bg-teal-50/90 text-teal-700 border-teal-200/90 shadow-2xs',

  // In Progress / Negotiation / Proposal
  proposal: 'bg-violet-50/90 text-violet-700 border-violet-200/90 shadow-2xs',
  negotiation: 'bg-amber-50/90 text-amber-800 border-amber-200/90 shadow-2xs',
  contacted: 'bg-blue-50/90 text-blue-700 border-blue-200/90 shadow-2xs',
  prospecting: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/90 shadow-2xs',
  new: 'bg-cyan-50/90 text-cyan-700 border-cyan-200/90 shadow-2xs',

  // Inactive / Lost
  inactive: 'bg-slate-100 text-slate-600 border-slate-200 shadow-2xs',
  lost: 'bg-rose-50/90 text-rose-700 border-rose-200/90 shadow-2xs',
};

const DOT_COLORS = {
  active: 'bg-emerald-500 ring-2 ring-emerald-500/25',
  won: 'bg-emerald-500 ring-2 ring-emerald-500/25',
  qualified: 'bg-teal-500 ring-2 ring-teal-500/25',
  proposal: 'bg-violet-500 ring-2 ring-violet-500/25',
  negotiation: 'bg-amber-500 ring-2 ring-amber-500/25',
  contacted: 'bg-blue-500 ring-2 ring-blue-500/25',
  prospecting: 'bg-indigo-500 ring-2 ring-indigo-500/25',
  new: 'bg-cyan-500 ring-2 ring-cyan-500/25',
  inactive: 'bg-slate-400 ring-2 ring-slate-400/20',
  lost: 'bg-rose-500 ring-2 ring-rose-500/25',
};

export const Badge = ({
  children,
  status,
  variant,
  showDot = true,
  className = '',
  ...props
}) => {
  const key = (status || variant || '').toLowerCase().trim();
  const style = STATUS_STYLES[key] || 'bg-slate-50 text-slate-700 border-slate-200';
  const dotColor = DOT_COLORS[key] || 'bg-slate-400 ring-2 ring-slate-400/20';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all duration-150 tracking-tight select-none ${style} ${className}`}
      {...props}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      )}
      <span>{children || status}</span>
    </span>
  );
};

export default Badge;
