import { useState, useEffect } from 'react';
import customerService from '../../services/customerService';

const ALLOWED_STATUSES = ['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'];

const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  } catch {
    return '';
  }
};

/**
 * OpportunityForm Component
 * Modal dialog for Creating and Editing sales opportunities,
 * dynamically fetching customer accounts for assignment.
 */
export const OpportunityForm = ({
  isOpen = false,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    customer_id: initialData?.customer_id ? String(initialData.customer_id) : '',
    value: initialData?.value !== undefined && initialData?.value !== null ? String(initialData.value) : '',
    expected_closing_date: formatDateForInput(initialData?.expected_closing_date),
    status: initialData?.status || 'Prospecting',
  }));

  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [customerLoadError, setCustomerLoadError] = useState('');

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch active customers for the dropdown
  useEffect(() => {
    let isMounted = true;
    const fetchCustomers = async () => {
      try {
        setLoadingCustomers(true);
        const data = await customerService.getCustomers();
        if (isMounted) {
          setCustomers(data || []);
          setCustomerLoadError('');
        }
      } catch {
        if (isMounted) {
          setCustomerLoadError('Could not load customers for selection.');
        }
      } finally {
        if (isMounted) {
          setLoadingCustomers(false);
        }
      }
    };

    if (isOpen) {
      fetchCustomers();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !submitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) return 'Deal name is required.';
        if (value.trim().length < 2) return 'Deal name must be at least 2 characters.';
        return '';
      case 'customer_id':
        if (!value) return 'Please select a customer account.';
        return '';
      case 'value':
        if (value === '' || value === null || value === undefined) return 'Deal value is required.';
        if (isNaN(Number(value)) || Number(value) < 0) return 'Value must be a positive number or zero.';
        return '';
      case 'expected_closing_date':
        if (!value || !value.trim()) return 'Expected closing date is required.';
        return '';
      case 'status':
        if (!ALLOWED_STATUSES.includes(value)) {
          return `Status must be one of: ${ALLOWED_STATUSES.join(', ')}`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        customer_id: parseInt(formData.customer_id, 10),
        value: parseFloat(formData.value),
        expected_closing_date: formData.expected_closing_date,
        status: formData.status,
      };

      await onSubmit(payload);
      onClose();
    } catch (err) {
      setServerError(
        err.message || 'Failed to save opportunity. Please verify input and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="opportunity-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden p-5 sm:p-6 text-left max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div>
            <h2
              id="opportunity-modal-title"
              className="text-lg font-bold text-slate-900 tracking-tight font-sans"
            >
              {isEditMode ? 'Edit Opportunity' : 'New Opportunity'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode
                ? `Update details for "${initialData?.name}"`
                : 'Create and track a new deal in the sales pipeline'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Global Server Error Alert */}
        {serverError && (
          <div className="mt-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 shrink-0">
            <svg className="w-4 h-4 text-rose-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="overflow-y-auto pt-4 space-y-4 flex-1 pr-1">
          {/* 1. Opportunity Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deal Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Enterprise Cloud Migration"
              className={`w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                errors.name
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                  : 'border-slate-200/80 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30'
              }`}
            />
            {errors.name && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* 2. Customer Account Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Customer Account <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loadingCustomers}
                className={`w-full h-10 pl-3.5 pr-8 rounded-xl bg-slate-50/80 border text-xs sm:text-sm text-slate-900 appearance-none focus:outline-none focus:bg-white transition-all disabled:opacity-50 ${
                  errors.customer_id
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                    : 'border-slate-200/80 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30'
                }`}
              >
                <option value="">
                  {loadingCustomers ? 'Loading customer accounts...' : '-- Select Customer --'}
                </option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.company ? `(${c.company})` : ''}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            {customerLoadError && (
              <p className="text-[11px] text-amber-600 mt-1">{customerLoadError}</p>
            )}
            {errors.customer_id && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.customer_id}</p>
            )}
          </div>

          {/* 3. Deal Value & Stage Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Value ($ USD) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  name="value"
                  step="any"
                  min="0"
                  value={formData.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="50000"
                  className={`w-full h-10 pl-8 pr-3.5 rounded-xl bg-slate-50/80 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white font-mono transition-all ${
                    errors.value
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                      : 'border-slate-200/80 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30'
                  }`}
                />
              </div>
              {errors.value && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.value}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stage Status <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 pl-3.5 pr-8 rounded-xl bg-slate-50/80 border text-xs sm:text-sm text-slate-900 appearance-none focus:outline-none focus:bg-white transition-all ${
                    errors.status
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                      : 'border-slate-200/80 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30'
                  }`}
                >
                  <option value="Prospecting">Prospecting</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Closed Won</option>
                  <option value="Lost">Closed Lost</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              {errors.status && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.status}</p>
              )}
            </div>
          </div>

          {/* 4. Expected Closing Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expected Closing Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="expected_closing_date"
              value={formData.expected_closing_date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                errors.expected_closing_date
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                  : 'border-slate-200/80 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30'
              }`}
            />
            {errors.expected_closing_date && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.expected_closing_date}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-[#1b2126] hover:bg-black active:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && (
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              <span>{isEditMode ? 'Save Changes' : 'Create Opportunity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityForm;
