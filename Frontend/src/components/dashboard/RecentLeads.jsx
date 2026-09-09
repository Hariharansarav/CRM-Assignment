import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

/**
 * RecentLeads Component
 * Displays the recent leads list inside a responsive table container.
 * Features initials avatar badges, company affiliation, status indicators, and assigned reps.
 * Enforces internal horizontal scrolling with zero document-level page overflow.
 */
export const RecentLeads = ({ leads = [] }) => {
  const hasLeads = Array.isArray(leads) && leads.length > 0;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between min-w-0 w-full h-full transition-all duration-200 hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans truncate">
              Recent Leads
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">
              ({leads.length})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Prospects recently entered into pipeline
          </p>
        </div>
        <Link
          to="/leads"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline shrink-0 ml-2 py-1 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          <span>View all</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Content / Table */}
      {!hasLeads ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No recent leads</p>
          <p className="text-[11px] text-slate-400 mt-0.5">New leads from marketing campaigns will show here.</p>
        </div>
      ) : (
        /* Internal Scrolling Table Container */
        <div className="w-full overflow-x-auto -mx-1 px-1">
          <table className="w-full text-left border-collapse min-w-[340px] sm:min-w-[420px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 pr-3 font-medium">Lead</th>
                <th className="py-2.5 px-3 font-medium">Company</th>
                <th className="py-2.5 px-3 font-medium">Status</th>
                <th className="py-2.5 pl-3 text-right font-medium">Assigned Rep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {leads.map((lead) => {
                const initials = lead.name
                  ? lead.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()
                  : 'L';

                return (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Lead Name + Initials */}
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-teal-200/60 shadow-2xs group-hover:scale-105 transition-transform">
                          {initials}
                        </div>
                        <span className="font-semibold text-slate-900 truncate max-w-[120px] sm:max-w-[160px]">
                          {lead.name || 'Unnamed Lead'}
                        </span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-2.5 px-3 text-slate-600 truncate max-w-[110px] sm:max-w-[140px]">
                      {lead.company || '—'}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Badge status={lead.status || 'new'} />
                    </td>

                    {/* Assigned Rep */}
                    <td className="py-2.5 pl-3 text-right text-slate-600 whitespace-nowrap text-[11px] font-medium">
                      {lead.assigned_to || 'Unassigned'}
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

export default RecentLeads;

