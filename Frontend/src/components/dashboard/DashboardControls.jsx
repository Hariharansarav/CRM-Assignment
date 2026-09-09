import { useState } from 'react';

/**
 * DashboardControls Component
 * Renders the top filter and action row from the reference image:
 * - Date timeframe pills: Today, Yesterday, Weekly, Monthly, Select Date
 * - Assignee filter: All, Admin
 * - Page Setup action button
 * Uses CSS flex-wrap and responsive styling to guarantee zero collision/overflow across screen sizes.
 */
export const DashboardControls = ({ onDateFilterChange }) => {
  const [activeDateFilter, setActiveDateFilter] = useState('Monthly');
  const [activeAssignee, setActiveAssignee] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const DATE_FILTERS = ['Today', 'Yesterday', 'Weekly', 'Monthly'];

  const handleFilterClick = (filter) => {
    setActiveDateFilter(filter);
    if (onDateFilterChange) {
      onDateFilterChange(filter);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 py-1 select-none">
      {/* Left: Date Filter Pills Container */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <div className="inline-flex items-center p-1 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs">
          {DATE_FILTERS.map((filter) => {
            const isActive = activeDateFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterClick(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {filter}
              </button>
            );
          })}

          {/* Select Date button with Calendar Icon */}
          <button
            type="button"
            onClick={() => handleFilterClick('Select Date')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              activeDateFilter === 'Select Date'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
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
            <span>Select Date</span>
          </button>
        </div>
      </div>

      {/* Right: User / Assignee Filter and Page Setup */}
      <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
        {/* Assignee Filter Container */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs relative">
          <button
            type="button"
            onClick={() => setActiveAssignee('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              activeAssignee === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            All
          </button>

          {/* Admin with Avatar & Dropdown Chevron */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setActiveAssignee('Admin');
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeAssignee === 'Admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                A
              </div>
              <span>Admin</span>
              <svg
                className={`w-3 h-3 text-slate-400 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Subtle Dropdown */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveAssignee('Admin');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Admin (Current)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveAssignee('All');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 font-medium"
                >
                  All Assignees
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page Setup Action Button */}
        <button
          type="button"
          aria-label="Dashboard Page Setup"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white active:bg-slate-100 border border-slate-200/80 shadow-2xs hover:shadow-xs text-xs font-semibold text-slate-700 transition-all cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Page Setup</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardControls;
