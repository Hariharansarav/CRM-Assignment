import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

/**
 * RecentCustomers Component
 * Displays recent customer accounts with initials avatars, company, status badge,
 * and registration date. Links to full customer directory and individual profiles.
 * Enforces internal horizontal scrolling with zero document-level page overflow.
 */
export const RecentCustomers = ({ customers = [] }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const hasCustomers = Array.isArray(customers) && customers.length > 0;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between min-w-0 w-full h-full transition-all duration-200 hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
              Recent Customers
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">
              ({customers.length})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Latest accounts added to the CRM
          </p>
        </div>
        <Link
          to="/customers"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline shrink-0 ml-2 py-0.5 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          <span>View all</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Content / Table */}
      {!hasCustomers ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No recent customers</p>
          <p className="text-[11px] text-slate-400 mt-0.5">New customers will appear here once registered.</p>
        </div>
      ) : (
        /* Internal Scrolling Table Container */
        <div className="w-full overflow-x-auto -mx-1 px-1">
          <table className="w-full text-left border-collapse min-w-[320px]">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2 pr-2 font-medium">Customer</th>
                <th className="py-2 px-2 font-medium">Company</th>
                <th className="py-2 px-2 font-medium">Status</th>
                <th className="py-2 pl-2 text-right font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {customers.map((cust) => {
                const initials = cust.name
                  ? cust.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()
                  : 'C';

                return (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Name + Initials avatar + Profile link */}
                    <td className="py-1.5 pr-2">
                      <Link
                        to={`/customers/${cust.id}`}
                        className="flex items-center gap-2 min-w-0"
                      >
                        <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[9px] flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-2xs group-hover:scale-105 transition-transform">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors truncate block max-w-[120px] sm:max-w-[160px] text-xs">
                            {cust.name || 'Unnamed Customer'}
                          </span>
                        </div>
                      </Link>
                    </td>

                    {/* Company */}
                    <td className="py-1.5 px-2 text-slate-600 truncate max-w-[100px] sm:max-w-[130px] text-[11px]">
                      {cust.company || '—'}
                    </td>

                    {/* Status Badge */}
                    <td className="py-1.5 px-2 whitespace-nowrap">
                      <Badge status={cust.status || 'active'} />
                    </td>

                    {/* Created Date */}
                    <td className="py-1.5 pl-2 text-right text-slate-400 whitespace-nowrap font-mono text-[10px]">
                      {formatDate(cust.created_at)}
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

export default RecentCustomers;

