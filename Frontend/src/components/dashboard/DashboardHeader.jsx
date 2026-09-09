/**
 * Dashboard Header Component
 * Displays the page title, concise overview description,
 * live connection status indicator, and manual refresh trigger.
 */
export const DashboardHeader = ({ onRefresh, isRefreshing = false, lastUpdated }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 select-none">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE METRICS
          </span>
          {lastUpdated && (
            <span className="text-[11px] text-slate-400 hidden md:inline">
              &bull; Updated {lastUpdated}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-xl truncate">
          Overview of your customers, leads and opportunities.
        </p>
      </div>

      {onRefresh && (
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh dashboard data"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
