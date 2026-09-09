import { useState, useEffect } from 'react';

/**
 * LeadFilters Component
 * Search input (debounced by 300ms) and status dropdown (New, Contacted, Qualified, Lost).
 */
export const LeadFilters = ({
  search = '',
  status = 'all',
  onSearchChange,
  onStatusChange,
  onClearFilters,
  totalCount = 0,
}) => {
  const [prevSearch, setPrevSearch] = useState(search);
  const [searchTerm, setSearchTerm] = useState(search);

  // Sync state during render when prop changes externally (e.g. Reset button)
  if (search !== prevSearch) {
    setPrevSearch(search);
    setSearchTerm(search);
  }

  // Debounce search input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== search) {
        onSearchChange(searchTerm);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, search, onSearchChange]);

  const handleClear = () => {
    setSearchTerm('');
    onSearchChange('');
  };

  const hasActiveFilters = Boolean(search || status !== 'all');

  return (
    <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 min-w-0">
      {/* Search Input with Debounce & Clear Button */}
      <div className="relative flex-1 min-w-0 max-w-md">
        <svg
          className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search leads by name or company..."
          className="w-full h-9.5 sm:h-10 pl-10 pr-9 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:bg-white transition-all min-w-0"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            title="Clear search"
            aria-label="Clear search text"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Right Controls: Status Filter & Optional Clear All */}
      <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto min-w-0">
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter leads by status"
            className="h-9.5 sm:h-10 pl-3 pr-8 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:bg-white appearance-none cursor-pointer transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="h-9.5 sm:h-10 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            Reset
          </button>
        )}

        <span className="text-[11px] font-medium text-slate-400 hidden md:inline-block ml-1">
          {totalCount} {totalCount === 1 ? 'lead' : 'leads'}
        </span>
      </div>
    </div>
  );
};

export default LeadFilters;
