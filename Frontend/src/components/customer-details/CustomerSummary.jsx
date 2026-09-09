/**
 * CustomerSummary Component
 * 3 compact metric cards: Total Opportunities, Total Opportunity Value, Activities Count.
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
    <section aria-label="Customer Highlights" className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 min-w-0">
      {/* 1. Total Opportunities */}
      <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs min-w-0 flex flex-col justify-between">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 block truncate">
          Total Opportunities
        </span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans mt-1">
          {opportunityCount}
        </div>
        <span className="text-[11px] text-slate-400 mt-1">
          Associated deals
        </span>
      </div>

      {/* 2. Total Opportunity Value */}
      <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs min-w-0 flex flex-col justify-between">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-600 block truncate">
          Total Value
        </span>
        <div className="text-xl sm:text-2xl font-bold text-emerald-700 tracking-tight font-mono mt-1" title={formattedValue}>
          {formattedValue}
        </div>
        <span className="text-[11px] text-slate-400 mt-1">
          Cumulative pipeline value
        </span>
      </div>

      {/* 3. Total Activities */}
      <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs min-w-0 flex flex-col justify-between">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-indigo-600 block truncate">
          Activities Recorded
        </span>
        <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans mt-1">
          {activityCount}
        </div>
        <span className="text-[11px] text-slate-400 mt-1">
          Touchpoints & notes
        </span>
      </div>
    </section>
  );
};

export default CustomerSummary;
