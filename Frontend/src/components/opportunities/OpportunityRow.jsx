import { Link } from 'react-router-dom';

const STATUS_CONFIGS = {
  Prospecting: {
    bg: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/90 shadow-2xs',
    dot: 'bg-indigo-500 ring-2 ring-indigo-500/25',
  },
  Proposal: {
    bg: 'bg-violet-50/90 text-violet-700 border-violet-200/90 shadow-2xs',
    dot: 'bg-violet-500 ring-2 ring-violet-500/25',
  },
  Negotiation: {
    bg: 'bg-amber-50/90 text-amber-800 border-amber-200/90 shadow-2xs',
    dot: 'bg-amber-500 ring-2 ring-amber-500/25',
  },
  Won: {
    bg: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/90 shadow-2xs',
    dot: 'bg-emerald-500 ring-2 ring-emerald-500/25',
  },
  Lost: {
    bg: 'bg-rose-50/90 text-rose-700 border-rose-200/90 shadow-2xs',
    dot: 'bg-rose-500 ring-2 ring-rose-500/25',
  },
};

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(Number(val))) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(val));
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

/**
 * OpportunityRow Component
 * Renders an opportunity record with inline stage changing, customer link, formatted value, and CRUD actions.
 */
export const OpportunityRow = ({
  opportunity,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const statusConfig = STATUS_CONFIGS[opportunity.status] || STATUS_CONFIGS.Prospecting;

  return (
    <tr className="hover:bg-slate-50/70 transition-colors group">
      {/* 1. Opportunity Name */}
      <td className="py-3.5 px-4 sm:px-5">
        <div className="font-semibold text-slate-900 text-sm">
          {opportunity.name}
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          ID: #{opportunity.id}
        </div>
      </td>

      {/* 2. Customer Account */}
      <td className="py-3.5 px-3 sm:px-4">
        {opportunity.customer_id ? (
          <Link
            to={`/customers/${opportunity.customer_id}`}
            className="text-xs font-semibold text-slate-800 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
            title={`View ${opportunity.customer_name || 'Customer'}`}
          >
            <span>{opportunity.customer_name || `Customer #${opportunity.customer_id}`}</span>
            <svg className="w-3 h-3 text-slate-400 group-hover:text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        ) : (
          <span className="text-xs text-slate-400 italic">Unassigned</span>
        )}
        {opportunity.customer_company && (
          <div className="text-[11px] text-slate-500">
            {opportunity.customer_company}
          </div>
        )}
      </td>

      {/* 3. Deal Value */}
      <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-slate-900 text-sm">
        {formatCurrency(opportunity.value)}
      </td>

      {/* 4. Expected Close Date */}
      <td className="py-3.5 px-3 sm:px-4 text-slate-600 text-xs">
        {formatDate(opportunity.expected_closing_date)}
      </td>

      {/* 5. Stage Status with Quick Inline Selector */}
      <td className="py-3.5 px-3 sm:px-4">
        <div className="relative inline-block">
          <select
            value={opportunity.status || 'Prospecting'}
            onChange={(e) => onStatusChange && onStatusChange(opportunity.id, e.target.value)}
            aria-label={`Change stage for ${opportunity.name}`}
            className={`text-[11px] font-semibold pl-2 pr-6 py-0.5 rounded-full border ${statusConfig.bg} appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all`}
          >
            <option value="Prospecting">Prospecting</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Closed Won</option>
            <option value="Lost">Closed Lost</option>
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-current opacity-70">
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </td>

      {/* 6. Date Created */}
      <td className="py-3.5 px-3 sm:px-4 text-slate-500 text-[11px]">
        {formatDate(opportunity.created_at)}
      </td>

      {/* 7. Row Actions (Edit, Delete) */}
      <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(opportunity)}
            aria-label={`Edit ${opportunity.name}`}
            title="Edit Opportunity"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200/60 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onDelete(opportunity)}
            aria-label={`Delete ${opportunity.name}`}
            title="Delete Opportunity"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200/60 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OpportunityRow;
