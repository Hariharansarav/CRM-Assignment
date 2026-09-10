/**
 * CustomerSummary Component
 * 3 executive KPI cards: Total Opportunities, Total Opportunity Value, Activities Count.
 */
export const CustomerSummary = ({
  opportunityCount = 0,
  totalOpportunityValue = 0,
  activityCount = 0,
}) => {
  // Safe currency formatting
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(totalOpportunityValue) || 0);

  return (
    <section aria-label="Customer Highlights" className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-w-0">
      {/* 1. Total Opportunities */}
      <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block truncate">
            Total Opportunities
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="6" y1="20" x2="6" y2="15" />
              <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans tabular-nums leading-tight">
          {opportunityCount}
        </div>
        <span className="text-[11px] text-slate-400 mt-1 truncate">
          Active & closed deals
        </span>
      </div>

      {/* 2. Total Opportunity Value */}
      <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block truncate">
            Total Value
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight font-mono tabular-nums leading-tight" title={formattedValue}>
          {formattedValue}
        </div>
        <span className="text-[11px] text-emerald-600/80 font-medium mt-1 truncate">
          Cumulative pipeline value
        </span>
      </div>

      {/* 3. Total Activities */}
      <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block truncate">
            Activities Recorded
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans tabular-nums leading-tight">
          {activityCount}
        </div>
        <span className="text-[11px] text-slate-400 mt-1 truncate">
          Touchpoints & logged interactions
        </span>
      </div>
    </section>
  );
};

export default CustomerSummary;
