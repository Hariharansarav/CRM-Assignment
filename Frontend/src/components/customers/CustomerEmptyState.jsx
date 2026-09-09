/**
 * CustomerEmptyState Component
 * Displays helpful messaging when customer list is empty or when search/filter returns no records.
 */
export const CustomerEmptyState = ({
  isFiltered = false,
  onClearFilters,
  onAddCustomer,
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-1">
        {isFiltered ? 'No customers match your search or filter' : 'No customers found'}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-5">
        {isFiltered
          ? 'Try adjusting your search query or reset the status filter to see available customers.'
          : 'Get started by creating your first customer account in the CRM.'}
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
          onClick={onAddCustomer}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b2126] hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <span className="text-base leading-none">+</span>
          <span>Add First Customer</span>
        </button>
      )}
    </div>
  );
};

export default CustomerEmptyState;
