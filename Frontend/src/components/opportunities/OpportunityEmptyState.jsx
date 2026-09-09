/**
 * OpportunityEmptyState Component
 * Displays helpful messaging when opportunity list is empty or when search/filter returns no records.
 */
export const OpportunityEmptyState = ({
  isFiltered = false,
  onClearFilters,
  onAddOpportunity,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-8 sm:p-12 text-center shadow-2xs">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-3.5">
        {isFiltered ? (
          <svg className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-1">
        {isFiltered ? 'No opportunities match your search or stage filter' : 'No opportunities found'}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-5">
        {isFiltered
          ? 'Try adjusting your search query or reset the stage filter to see active opportunities.'
          : 'Start forecasting revenue by adding your first deal to the sales pipeline.'}
      </p>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Reset Filters</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onAddOpportunity}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b2126] hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <span className="text-base leading-none">+</span>
          <span>Add First Opportunity</span>
        </button>
      )}
    </div>
  );
};

export default OpportunityEmptyState;
