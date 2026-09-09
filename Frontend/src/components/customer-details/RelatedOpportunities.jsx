import Badge from '../ui/Badge';

/**
 * RelatedOpportunities Component
 * Displays all sales opportunities associated with the customer.
 */
export const RelatedOpportunities = ({ opportunities = [] }) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden min-w-0 flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-5 pb-3 sm:pb-3.5 border-b border-slate-100 flex items-center justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
            Related Opportunities
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Active and closed pipeline deals
          </p>
        </div>
        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full shrink-0 border border-slate-200">
          {opportunities.length} {opportunities.length === 1 ? 'deal' : 'deals'}
        </span>
      </div>

      {/* Opportunities Content */}
      {opportunities.length === 0 ? (
        /* Empty State */
        <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center mb-2.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No opportunities found</p>
          <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
            No pipeline deals are currently linked to this customer account.
          </p>
        </div>
      ) : (
        /* Table with internal scroll containment */
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50/70 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th scope="col" className="py-2.5 px-4 sm:px-5">Opportunity</th>
                <th scope="col" className="py-2.5 px-3">Value</th>
                <th scope="col" className="py-2.5 px-3">Expected Close</th>
                <th scope="col" className="py-2.5 px-4 sm:px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {opportunities.map((opp) => {
                const formattedValue = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(Number(opp.value) || 0);

                const formattedDate = opp.expected_closing_date
                  ? new Date(opp.expected_closing_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '—';

                return (
                  <tr key={opp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 sm:px-5 max-w-[200px]">
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm truncate" title={opp.name}>
                        {opp.name}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block leading-tight">
                        ID #{opp.id}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono font-bold text-slate-900 text-xs sm:text-sm">
                      {formattedValue}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-500 text-xs">
                      {formattedDate}
                    </td>
                    <td className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">
                      <Badge status={opp.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RelatedOpportunities;
