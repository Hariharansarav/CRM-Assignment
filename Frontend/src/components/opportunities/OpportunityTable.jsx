import OpportunityRow from './OpportunityRow';

/**
 * OpportunityTable Component
 * Responsive table displaying opportunities with internal horizontal scrolling.
 */
export const OpportunityTable = ({
  opportunities = [],
  loading = false,
  onEdit,
  onDelete,
  onStatusChange,
  totalCount = 0,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden min-w-0">
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <th scope="col" className="py-3 px-4 sm:px-5">Opportunity / Deal</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Customer Account</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Deal Value</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Expected Close</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Stage Status</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Date Added</th>
              <th scope="col" className="py-3 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="space-y-1.5">
                      <div className="w-32 h-3.5 bg-slate-200 rounded" />
                      <div className="w-16 h-2.5 bg-slate-100 rounded" />
                    </div>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4">
                    <div className="space-y-1">
                      <div className="w-24 h-3 bg-slate-200 rounded" />
                      <div className="w-16 h-2 bg-slate-100 rounded" />
                    </div>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4"><div className="w-16 h-4 bg-slate-200 rounded font-mono" /></td>
                  <td className="py-3.5 px-3 sm:px-4"><div className="w-20 h-3 bg-slate-100 rounded" /></td>
                  <td className="py-3.5 px-3 sm:px-4"><div className="w-20 h-5 bg-slate-200 rounded-full" /></td>
                  <td className="py-3.5 px-3 sm:px-4"><div className="w-16 h-3 bg-slate-100 rounded" /></td>
                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                      <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              opportunities.map((opp) => (
                <OpportunityRow
                  key={opp.id}
                  opportunity={opp}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && opportunities.length > 0 && (
        <div className="p-3 sm:p-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{opportunities.length}</strong> of{' '}
            <strong className="text-slate-800">{totalCount || opportunities.length}</strong> opportunities
          </span>
          <span className="text-[11px] text-slate-400">
            Real-time backend synchronization
          </span>
        </div>
      )}
    </div>
  );
};

export default OpportunityTable;
