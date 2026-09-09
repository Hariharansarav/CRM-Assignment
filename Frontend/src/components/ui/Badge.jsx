/**
 * Reusable Status Badge Component
 * Handles Customer, Lead, and Opportunity statuses with subtle theme-consistent colors
 */
const STATUS_STYLES = {
  // Positive / Won / Active
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald',
  won: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald',
  qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald',

  // In Progress / Negotiation / Proposal
  proposal: 'bg-cyan-50 text-cyan-700 border-cyan-200/80 dot-cyan',
  negotiation: 'bg-amber-50 text-amber-700 border-amber-200/80 dot-amber',
  contacted: 'bg-blue-50 text-blue-700 border-blue-200/80 dot-blue',
  prospecting: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dot-indigo',
  new: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dot-indigo',

  // Inactive / Lost
  inactive: 'bg-slate-100 text-slate-600 border-slate-200 dot-slate',
  lost: 'bg-red-50 text-red-700 border-red-200/80 dot-red',
};

const DOT_COLORS = {
  active: 'bg-emerald-500',
  won: 'bg-emerald-500',
  qualified: 'bg-emerald-500',
  proposal: 'bg-cyan-500',
  negotiation: 'bg-amber-500',
  contacted: 'bg-blue-500',
  prospecting: 'bg-indigo-500',
  new: 'bg-indigo-500',
  inactive: 'bg-slate-400',
  lost: 'bg-red-500',
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
  const dotColor = DOT_COLORS[key] || 'bg-slate-400';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-colors ${style} ${className}`}
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
