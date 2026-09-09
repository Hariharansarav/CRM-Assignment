/**
 * UpcomingActivities Component
 * Reinterprets the "Upcoming Meetings" card from the reference image:
 * - Header: "Upcoming Activities" with calendar icon
 * - Follows compact list card design
 * - Since backend API does not currently return activities, displays a clean, professional empty state
 *   per prompt rules #30 & #55 (zero fake data generation).
 */
export const UpcomingActivities = ({ activities = [] }) => {
  const hasActivities = Array.isArray(activities) && activities.length > 0;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between min-w-0 w-full h-full transition-all duration-200 hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans truncate">
              Upcoming Activities
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">
              ({activities.length})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            Scheduled calls, emails & meetings
          </p>
        </div>

        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 shrink-0">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </div>

      {/* Content */}
      {!hasActivities ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
          <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-2.5">
            <svg
              className="w-5 h-5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-800">No upcoming activities</p>
          <p className="text-[11px] text-slate-400 mt-0.5 max-w-[220px]">
            New client calls, meetings, and follow-ups will appear here.
          </p>
        </div>
      ) : (
        /* Activity List if supported */
        <div className="divide-y divide-slate-100 space-y-2">
          {activities.map((act, idx) => (
            <div key={idx} className="pt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-800 truncate">{act.title}</span>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 ml-2">{act.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Calendar Sync</span>
        <span className="text-slate-600 font-medium">Synced with Admin</span>
      </div>
    </div>
  );
};

export default UpcomingActivities;
