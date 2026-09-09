import { useState, useEffect } from 'react';

const ALLOWED_TYPES = ['Call', 'Email', 'Meeting', 'Note'];

/**
 * AddActivityModal Component
 * Dialog for creating a new activity (Call, Email, Meeting, Note) for a customer.
 */
export const AddActivityModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  customerName = 'Customer',
}) => {
  const [type, setType] = useState('Call');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const validate = () => {
    const newErrors = {};
    if (!type || !ALLOWED_TYPES.includes(type)) {
      newErrors.type = 'Activity type is required.';
    }
    if (!description || !description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (description.trim().length > 5000) {
      newErrors.description = 'Description cannot exceed 5,000 characters.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        type,
        description: description.trim(),
      });
      onClose();
    } catch (err) {
      setServerError(
        err.message || 'Unable to add activity. Please try again.'
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
      aria-labelledby="activity-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2
              id="activity-modal-title"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans"
            >
              Add Activity
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Record a new interaction for <strong className="text-slate-800">{customerName}</strong>.
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

        {/* Form Body */}
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

            {/* Activity Type Field */}
            <div>
              <label htmlFor="activity-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Activity Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="activity-type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  if (errors.type) setErrors((prev) => ({ ...prev, type: '' }));
                }}
                disabled={submitting}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:bg-white transition-all cursor-pointer"
              >
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
                <option value="Note">Note</option>
              </select>
              {errors.type && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.type}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="activity-description" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="activity-description"
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                }}
                placeholder="Details of the interaction, meeting notes, or follow-up tasks..."
                disabled={submitting}
                className={`w-full p-3 rounded-xl bg-slate-50/70 border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all resize-none ${
                  errors.description
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200/80 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
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
              <span>{submitting ? 'Adding...' : 'Add Activity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
