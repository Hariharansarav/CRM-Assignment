import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import customerService from '../services/customerService';
import activityService from '../services/activityService';
import CustomerProfile from '../components/customer-details/CustomerProfile';
import CustomerSummary from '../components/customer-details/CustomerSummary';
import RelatedOpportunities from '../components/customer-details/RelatedOpportunities';
import ActivityTimeline from '../components/customer-details/ActivityTimeline';
import AddActivityModal from '../components/customer-details/AddActivityModal';
import CustomerToast from '../components/customers/CustomerToast';

/**
 * CustomerDetails Page (Phase 6)
 * Renders complete profile, associated pipeline opportunities, and chronological activity timeline
 * for a single customer identified by the :id route parameter.
 */
export const CustomerDetails = () => {
  const { id } = useParams();

  // Validate ID format upfront
  const isValidId = Boolean(id && Number.isInteger(Number(id)) && Number(id) > 0);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Add Activity modal state
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Refresh counter to re-fetch when user retries
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!isValidId) return;

    let isMounted = true;

    const loadCustomerData = async () => {
      try {
        const result = await customerService.getCustomerById(id);
        if (isMounted) {
          setData(result);
          setError(null);
          setNotFound(false);
        }
      } catch (err) {
        if (isMounted) {
          if (err.status === 404) {
            setNotFound(true);
          } else {
            setError(err.message || 'Unable to load customer details. Please try again.');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCustomerData();

    return () => {
      isMounted = false;
    };
  }, [id, isValidId, refreshCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    setRefreshCount((c) => c + 1);
  };

  // Add Activity submission handler
  const handleAddActivity = async (activityPayload) => {
    const newActivity = await activityService.createActivity(id, activityPayload);

    // Update activities list in local state immediately
    setData((prev) => {
      if (!prev) return prev;
      const currentActivities = prev.activities || [];
      return {
        ...prev,
        activities: [newActivity, ...currentActivities],
      };
    });

    setToast({ message: 'Activity added successfully.', type: 'success' });
  };

  // =========================================================================
  // 1. INVALID ID OR NOT FOUND (404) STATE
  // =========================================================================
  if (!isValidId || notFound) {
    return (
      <div className="w-full max-w-xl mx-auto py-12 px-4 text-center select-none">
        <div className="rounded-2xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Customer Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            The customer account you are looking for (ID #{id}) does not exist or may have been removed.
          </p>
          <Link
            to="/customers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1b2126] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>←</span>
            <span>Back to Customers</span>
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. SKELETON LOADING STATE
  // =========================================================================
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 animate-pulse min-w-0 select-none">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between gap-3 py-1">
          <div className="w-36 h-6 bg-slate-200 rounded-xl" />
          <div className="w-28 h-6 bg-slate-200 rounded-xl" />
        </div>

        {/* Profile Card Skeleton */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="w-40 h-5 bg-slate-200 rounded-lg" />
              <div className="w-24 h-3.5 bg-slate-100 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="h-14 bg-slate-50 rounded-xl border border-slate-100" />
            <div className="h-14 bg-slate-50 rounded-xl border border-slate-100" />
            <div className="h-14 bg-slate-50 rounded-xl border border-slate-100" />
          </div>
        </div>

        {/* Summary Metrics Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-20 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs" />
          <div className="h-20 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs" />
          <div className="h-20 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs" />
        </div>

        {/* Opportunities and Activities Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6 h-64 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs" />
          <div className="lg:col-span-6 h-64 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. SERVER ERROR STATE WITH RETRY
  // =========================================================================
  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto py-12 px-4 text-center select-none">
        <div className="rounded-2xl bg-white border border-rose-200 p-8 sm:p-10 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Unable to load customer details
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            {error}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/customers"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              Back to Customers
            </Link>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const customer = data?.customer;
  const opportunities = data?.opportunities || [];
  const activities = data?.activities || [];
  const totalOpportunityValue = data?.totalOpportunityValue ?? 0;

  // =========================================================================
  // 4. MAIN CUSTOMER DETAILS CONTENT
  // =========================================================================
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 min-w-0">
      {/* Navigation Header / Breadcrumbs */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/60 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
            <Link
              to="/customers"
              className="hover:text-emerald-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>←</span>
              <span>Back to Customers</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-mono font-semibold">ID #{id}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate">
            Customer Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
            View customer information, opportunities and activity history.
          </p>
        </div>

        {/* Back Action Button */}
        <Link
          to="/customers"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
        >
          <span>←</span>
          <span>Customers</span>
        </Link>
      </header>

      {/* 1. Prominent Customer Profile Card */}
      <CustomerProfile customer={customer} />

      {/* 2. Customer Summary Metric Cards */}
      <CustomerSummary
        opportunityCount={opportunities.length}
        totalOpportunityValue={totalOpportunityValue}
        activityCount={activities.length}
      />

      {/* 3. Lower 2-Column Section (Related Opportunities + Activity History) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-w-0">
        {/* Left Column: Related Opportunities (~50%) */}
        <div className="lg:col-span-6 min-w-0 flex flex-col">
          <RelatedOpportunities opportunities={opportunities} />
        </div>

        {/* Right Column: Activity Timeline (~50%) */}
        <div className="lg:col-span-6 min-w-0 flex flex-col">
          <ActivityTimeline
            activities={activities}
            onAddActivity={() => setIsAddActivityOpen(true)}
          />
        </div>
      </div>

      {/* Add Activity Modal */}
      <AddActivityModal
        key={`activity-modal-${isAddActivityOpen}`}
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onSubmit={handleAddActivity}
        customerName={customer?.name || 'Customer'}
      />

      {/* Toast Feedback */}
      <CustomerToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default CustomerDetails;
