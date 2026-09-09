/**
 * ActivityTimeline Component
 * Displays the chronological customer touchpoints with type icons and timestamps.
 */

const ACTIVITY_CONFIG = {
  Call: {
    label: 'Call',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
    iconBg: 'bg-blue-500 text-white',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  Email: {
    label: 'Email',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    iconBg: 'bg-emerald-500 text-white',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L1 7" />
      </svg>
    ),
  },
  Meeting: {
    label: 'Meeting',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    iconBg: 'bg-indigo-500 text-white',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  Note: {
    label: 'Note',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
    iconBg: 'bg-amber-500 text-white',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
};

export const ActivityTimeline = ({ activities = [], onAddActivity }) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs p-4 sm:p-5 min-w-0 flex flex-col">
      {/* Header with Title and Add Activity Button */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 mb-4 min-w-0">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
            Activity &amp; History
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Chronological log of customer touchpoints
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onAddActivity}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b2126] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        >
          <span className="text-sm leading-none font-bold">+</span>
          <span>Add Activity</span>
        </button>
      </div>

      {/* Timeline Content */}
      {activities.length === 0 ? (
        /* Empty State */
        <div className="py-8 text-center flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center mb-2.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No activity recorded yet</p>
          <p className="text-[11px] text-slate-400 mt-0.5 mb-3 max-w-xs">
            Start tracking meetings, calls, emails, and notes for this customer.
          </p>
          <button
            type="button"
            onClick={onAddActivity}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <span className="font-bold">+</span>
            <span>Record First Activity</span>
          </button>
        </div>
      ) : (
        /* Chronological Timeline List */
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
          {activities.map((activity) => {
            const config = ACTIVITY_CONFIG[activity.type] || ACTIVITY_CONFIG.Note;

            const formattedTimestamp = activity.created_at
              ? new Date(activity.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })
              : 'Recent';

            return (
              <div key={activity.id} className="relative group">
                {/* Timeline Icon Marker */}
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${config.iconBg} shadow-2xs`}
                  aria-hidden="true"
                >
                  <div className="scale-75">
                    {config.icon}
                  </div>
                </div>

                {/* Activity Card */}
                <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-3 sm:p-3.5 hover:bg-slate-50 hover:border-slate-200 transition-colors">
                  {/* Top: Type Badge + Timestamp */}
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${config.badgeClass}`}>
                      {config.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formattedTimestamp}
                    </span>
                  </div>

                  {/* Description with wrap containment */}
                  <p className="text-xs text-slate-700 leading-relaxed break-words whitespace-pre-line">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
