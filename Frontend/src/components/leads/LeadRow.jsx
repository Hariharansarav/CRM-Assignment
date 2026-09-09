/**
 * LeadRow Component
 * Renders a single lead row with initials avatar, source, quick status selector, and Edit/Delete actions.
 */
export const LeadRow = ({ lead, onEdit, onDelete, onStatusChange }) => {
  // Initials for avatar
  const initials = (lead.name || '')
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'LD';

  // Format creation date
  const formattedDate = lead.created_at
    ? new Date(lead.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <tr className="hover:bg-slate-50/70 transition-colors group">
      {/* 1. Lead Name + Initials Avatar */}
      <td className="py-3 px-4 sm:px-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 select-none group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200/70 transition-colors"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <span
              className="font-semibold text-slate-900 text-xs sm:text-sm block truncate"
              title={lead.name}
            >
              {lead.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 block leading-tight">
              ID #{lead.id}
            </span>
          </div>
        </div>
      </td>

      {/* 2. Company */}
      <td className="py-3 px-3 sm:px-4 max-w-[170px]">
        <div className="text-slate-800 text-xs sm:text-sm font-medium truncate" title={lead.company}>
          {lead.company}
        </div>
      </td>

      {/* 3. Email */}
      <td className="py-3 px-3 sm:px-4 max-w-[190px]">
        <div className="text-slate-600 text-xs truncate" title={lead.email}>
          {lead.email}
        </div>
      </td>

      {/* 4. Phone */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
        <span className="text-slate-600 text-xs font-mono">
          {lead.phone || '—'}
        </span>
      </td>

      {/* 5. Source */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
        <span className="inline-flex items-center text-[11px] font-medium text-slate-700 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/70">
          {lead.source || 'Other'}
        </span>
      </td>

      {/* 6. Status with Quick Inline Change */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
        <div className="relative inline-block">
          <select
            value={lead.status || 'New'}
            onChange={(e) => onStatusChange(lead.id, e.target.value)}
            aria-label={`Change status for ${lead.name}`}
            className="text-[11px] font-semibold py-0.5 pl-2 pr-6 rounded-full border bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 appearance-none transition-colors"
            style={{
              borderColor:
                lead.status === 'Qualified'
                  ? '#a7f3d0'
                  : lead.status === 'Contacted'
                  ? '#bfdbfe'
                  : lead.status === 'Lost'
                  ? '#fecaca'
                  : '#c7d2fe',
            }}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
          <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </td>

      {/* 7. Assigned To */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap text-slate-700 text-xs">
        {lead.assigned_to || 'Unassigned'}
      </td>

      {/* 8. Created Date */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap text-slate-500 text-xs">
        {formattedDate}
      </td>

      {/* 9. Actions: Edit, Delete */}
      <td className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          {/* Edit Action */}
          <button
            type="button"
            onClick={() => onEdit(lead)}
            title="Edit lead"
            aria-label={`Edit ${lead.name}`}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={() => onDelete(lead)}
            title="Delete lead"
            aria-label={`Delete ${lead.name}`}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LeadRow;
