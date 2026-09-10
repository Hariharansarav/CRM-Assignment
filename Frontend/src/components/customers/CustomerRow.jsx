import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { getAvatarColor, getInitials } from '../../utils/avatarHelper';

/**
 * CustomerRow Component
 * Renders a single customer row inside CustomerTable.
 */
export const CustomerRow = ({ customer, onEdit, onDelete }) => {
  const initials = getInitials(customer.name || 'CU');
  const avatarStyle = getAvatarColor(customer.name);

  // Format creation date (e.g., "Jun 10, 2026")
  const formattedDate = customer.created_at
    ? new Date(customer.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      {/* 1. Customer Name + Initials Avatar */}
      <td className="py-3 px-4 sm:px-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border shadow-2xs select-none transition-transform group-hover:scale-105 ${avatarStyle}`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <Link
              to={`/customers/${customer.id}`}
              className="font-semibold text-slate-900 text-xs sm:text-sm hover:text-emerald-700 transition-colors block truncate"
              title={customer.name}
            >
              {customer.name}
            </Link>
            <span className="text-[10px] font-mono text-slate-400 block leading-tight">
              ID #{customer.id}
            </span>
          </div>
        </div>
      </td>

      {/* 2. Company */}
      <td className="py-3 px-3 sm:px-4 max-w-[180px]">
        <div
          className="text-slate-800 text-xs sm:text-sm font-medium truncate"
          title={customer.company}
        >
          {customer.company}
        </div>
      </td>

      {/* 3. Email */}
      <td className="py-3 px-3 sm:px-4 max-w-[200px]">
        <div
          className="text-slate-600 text-xs truncate"
          title={customer.email}
        >
          {customer.email}
        </div>
      </td>

      {/* 4. Phone */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
        <span className="text-slate-600 text-xs font-mono">
          {customer.phone || '—'}
        </span>
      </td>

      {/* 5. Status Badge */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
        <Badge status={customer.status}>
          {customer.status ? customer.status.charAt(0).toUpperCase() + customer.status.slice(1) : 'Active'}
        </Badge>
      </td>

      {/* 6. Created Date */}
      <td className="py-3 px-3 sm:px-4 whitespace-nowrap text-slate-500 text-xs">
        {formattedDate}
      </td>

      {/* 7. Actions: View, Edit, Delete */}
      <td className="py-3 px-4 sm:px-5 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          {/* View Action */}
          <Link
            to={`/customers/${customer.id}`}
            title="View customer details"
            aria-label={`View details for ${customer.name}`}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-600 hover:bg-sky-50 border border-transparent hover:border-sky-200/60 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>

          {/* Edit Action */}
          <button
            type="button"
            onClick={() => onEdit(customer)}
            title="Edit customer"
            aria-label={`Edit ${customer.name}`}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200/60 transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={() => onDelete(customer)}
            title="Delete customer"
            aria-label={`Delete ${customer.name}`}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200/60 transition-all cursor-pointer"
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

export default CustomerRow;
