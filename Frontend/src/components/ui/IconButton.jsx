/**
 * Reusable IconButton Component
 * Accessible icon button supporting active states, tooltips, and badges
 */
export const IconButton = ({
  children,
  onClick,
  label,
  tooltip,
  active = false,
  badge = false,
  className = '',
  ...props
}) => {
  return (
    <div className="relative group inline-flex items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer ${
          active ? 'bg-slate-100 text-slate-900' : ''
        } ${className}`}
        {...props}
      >
        {children}
        {badge && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        )}
      </button>

      {tooltip && (
        <div className="absolute top-full mt-2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium shadow-lg whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-800">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default IconButton;
