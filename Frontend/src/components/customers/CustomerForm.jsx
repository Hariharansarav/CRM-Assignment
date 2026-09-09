import { useState, useEffect } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * CustomerForm Component
 * Shared modal dialog for Creating and Editing customer accounts.
 * Provides immediate field-level validation and safe error feedback.
 */
export const CustomerForm = ({
  isOpen = false,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    status: initialData?.status ? initialData.status.toLowerCase() : 'active',
  }));

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Handle escape key to close modal
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
        if (!value || !value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'company':
        if (!value || !value.trim()) return 'Company is required.';
        return '';
      case 'email':
        if (!value || !value.trim()) return 'Email is required.';
        if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      case 'phone':
        if (value && value.trim()) {
          const trimmed = value.trim();
          if (trimmed.length < 7 || trimmed.length > 30) {
            return 'Phone number must be between 7 and 30 characters.';
          }
        }
        return '';
      case 'status':
        if (!['active', 'inactive'].includes(value)) {
          return 'Status must be Active or Inactive.';
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

    // Comprehensive client-side validation
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone ? formData.phone.trim() : null,
        status: formData.status,
      });
      onClose();
    } catch (err) {
      setServerError(
        err.message ||
          (isEditMode
            ? 'Unable to update customer. Please check the fields and try again.'
            : 'Unable to create customer. Please check the fields and try again.')
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
      aria-labelledby="customer-modal-title"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2
              id="customer-modal-title"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans"
            >
              {isEditMode ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode
                ? 'Update account and contact information.'
                : 'Fill in the customer details below to create a record.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body & Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-4">
            {/* Server Error Alert */}
            {serverError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Customer Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="customer-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Alex Rivera"
                disabled={submitting}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.name
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200/80 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="customer-company" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Company <span className="text-rose-500">*</span>
              </label>
              <input
                id="customer-company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Acme Corporation"
                disabled={submitting}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.company
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200/80 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                }`}
              />
              {errors.company && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.company}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="customer-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="customer-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. alex.rivera@acmecorp.com"
                disabled={submitting}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.email
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200/80 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                id="customer-phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. +1-555-0101"
                disabled={submitting}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.phone
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200/80 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.phone}</p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label htmlFor="customer-status" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Account Status <span className="text-rose-500">*</span>
              </label>
              <select
                id="customer-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={submitting}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:bg-white transition-all cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5 shrink-0">
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
              className="px-4 py-2 rounded-xl bg-[#1b2126] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
            >
              {submitting && (
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              <span>
                {submitting
                  ? isEditMode
                    ? 'Saving...'
                    : 'Creating...'
                  : isEditMode
                  ? 'Save Changes'
                  : 'Create Customer'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
