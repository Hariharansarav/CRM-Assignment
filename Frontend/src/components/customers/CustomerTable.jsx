import CustomerRow from './CustomerRow';

/**
 * CustomerTable Component
 * Renders the responsive customer data table or skeleton loader.
 * Enforces internal horizontal scrolling container so document.body never overflows.
 */
export const CustomerTable = ({
  customers = [],
  loading = false,
  onEdit,
  onDelete,
  totalCount = 0,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden min-w-0">
      {/* Scrollable Container (Enforces contained horizontal scroll on mobile) */}
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <th scope="col" className="py-3 px-4 sm:px-5">Customer</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Company</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Email</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Phone</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Status</th>
              <th scope="col" className="py-3 px-3 sm:px-4">Created Date</th>
              <th scope="col" className="py-3 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              /* Skeleton Rows */
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-3 px-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0" />
                      <div className="space-y-1">
                        <div className="w-24 h-3 bg-slate-200 rounded" />
                        <div className="w-12 h-2.5 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="w-28 h-3 bg-slate-200 rounded" />
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="w-36 h-3 bg-slate-100 rounded" />
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="w-20 h-3 bg-slate-100 rounded" />
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="w-14 h-5 bg-slate-200 rounded-full" />
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="w-18 h-3 bg-slate-100 rounded" />
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                      <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {!loading && customers.length > 0 && (
        <div className="p-3 sm:p-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{customers.length}</strong> of{' '}
            <strong className="text-slate-800">{totalCount || customers.length}</strong> customers
          </span>
          <span className="text-[11px] text-slate-400">
            Real-time backend synchronization
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
