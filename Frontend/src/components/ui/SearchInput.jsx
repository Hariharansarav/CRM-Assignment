/**
 * Reusable SearchInput Component
 * Matches Phase 2 Login page input styling with search icon and shortcut badge
 */
export const SearchInput = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  shortcut = '⌘ K',
  className = '',
  readOnly = false,
  ...props
}) => {
  return (
    <div className={`relative w-full ${className}`}>
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full h-10 pl-10 pr-14 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all cursor-default"
        {...props}
      />
      {shortcut && (
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-400 pointer-events-none shadow-2xs">
          {shortcut}
        </kbd>
      )}
    </div>
  );
};

export default SearchInput;
