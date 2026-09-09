import Badge from '../ui/Badge';

/**
 * CustomerProfile Component
 * Renders the prominent customer hero card with contact info, status pill, and initials avatar.
 */
export const CustomerProfile = ({ customer }) => {
  if (!customer) return null;

  // Generate 2-character initials
  const initials = (customer.name || '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CU';

  // Format readable registration date
  const formattedDate = customer.created_at
    ? new Date(customer.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/80 shadow-2xs min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 min-w-0">
        {/* Left: Avatar + Name + Company */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className="w-12 h-12 rounded-2xl bg-[#1b2126] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm select-none"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-sans truncate" title={customer.name}>
                {customer.name}
              </h2>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                ID #{customer.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 truncate" title={customer.company}>
              {customer.company || 'Not available'}
            </p>
          </div>
        </div>

        {/* Right: Status Badge */}
        <div className="shrink-0 self-start sm:self-auto">
          <Badge status={customer.status}>
            {customer.status ? customer.status.charAt(0).toUpperCase() + customer.status.slice(1) : 'Active'} Account
          </Badge>
        </div>
      </div>

      {/* Contact & Meta Information Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
        {/* Email */}
        <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L1 7" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block leading-tight">
              Email
            </span>
            <span className="text-slate-800 font-medium truncate block mt-0.5" title={customer.email}>
              {customer.email || 'Not available'}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block leading-tight">
              Phone
            </span>
            <span className="text-slate-800 font-medium truncate font-mono block mt-0.5">
              {customer.phone || 'Not available'}
            </span>
          </div>
        </div>

        {/* Registration Date */}
        <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-100 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-500 shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block leading-tight">
              Customer Since
            </span>
            <span className="text-slate-800 font-medium truncate block mt-0.5">
              {formattedDate ? `Registered ${formattedDate}` : 'Not available'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
