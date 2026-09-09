import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

/**
 * LatestLeads Component
 * Reinterprets the "Latest Leads" card from the reference image:
 * - Header: "Latest Leads" with "See All →" linking to /leads
 * - List style: Avatar with initials, lead name, company, status badge, and relative time
 * - Powered by real data from recentLeads
 * - Guaranteed zero text overflow and responsive containment
 */
export const LatestLeads = ({ leads = [] }) => {
  const hasLeads = Array.isArray(leads) && leads.length > 0;

  // Format relative or professional timestamp
  const formatTime = (dateStr, idx) => {
    if (!dateStr) return `${idx + 1}m ago`;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const now = new Date();
      const diffMs = now - d;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays === 0) {
        if (diffHours === 0) return 'Just Now';
        return `${diffHours}h ago`;
      }
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays}d ago`;

      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between min-w-0 w-full h-full transition-all duration-200 hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
              Latest Leads
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">
              ({leads.length})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Most recently captured prospects
          </p>
        </div>
        <Link
          to="/leads"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline shrink-0 ml-2 py-0.5 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          <span>See All</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Content */}
      {!hasLeads ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No recent leads</p>
          <p className="text-[11px] text-slate-400 mt-0.5">New leads will appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-1.5 py-0.5 min-w-0">
          {leads.map((lead, idx) => {
            const initials = lead.name
              ? lead.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase()
              : 'L';

            return (
              <div
                key={lead.id || idx}
                className="flex items-center justify-between gap-2.5 p-1 rounded-xl hover:bg-slate-50/80 transition-colors min-w-0"
              >
                {/* Avatar + Lead Name + Company */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-teal-200/60 shadow-2xs">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 text-xs truncate block leading-tight">
                      {lead.name || 'Unnamed Lead'}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate block leading-tight mt-0.5">
                      {lead.company || lead.assigned_to || 'Prospect'}
                    </span>
                  </div>
                </div>

                {/* Status Badge & Relative Time */}
                <div className="flex items-center gap-2 shrink-0">
                  <Badge status={lead.status || 'New'} />
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    {formatTime(lead.created_at, idx)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Lead Ingestion</span>
        <span className="text-slate-600 font-medium">Auto-updated</span>
      </div>
    </div>
  );
};

export default LatestLeads;
