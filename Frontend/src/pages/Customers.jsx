import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import customerService from '../services/customerService';
import CustomerFilters from '../components/customers/CustomerFilters';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerEmptyState from '../components/customers/CustomerEmptyState';
import CustomerForm from '../components/customers/CustomerForm';
import DeleteCustomerDialog from '../components/customers/DeleteCustomerDialog';
import CustomerToast from '../components/customers/CustomerToast';

/**
 * Customers Page (Phase 5)
 * Coordinates customer data fetching, backend search & filtering,
 * modal dialogs for CRUD operations, and responsive status feedback.
 */
export const Customers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const [search, setSearch] = useState(urlSearch);
  const [status, setStatus] = useState('all');

  // Sync external search params during render
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearch(urlSearch);
  }

  // Overall account statistics summary
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  // Refresh counter to trigger refetches after CRUD
  const [refreshCount, setRefreshCount] = useState(0);

  // Modal dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // null = Add mode, object = Edit mode
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  // Helper to compute stats from a full customer list
  const computeStats = (allData) => {
    const total = (allData || []).length;
    const active = (allData || []).filter((c) => c.status?.toLowerCase() === 'active').length;
    const inactive = total - active;
    return { total, active, inactive };
  };

  // Unified data & stats loader
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (!search && status === 'all') {
          // Single call loads both table data and customer summary stats
          const data = await customerService.getCustomers();
          if (isMounted) {
            const list = data || [];
            setCustomers(list);
            setStats(computeStats(list));
            setError(null);
          }
        } else {
          // Fetch filtered table list and complete customer stats in parallel
          const [filteredData, allData] = await Promise.all([
            customerService.getCustomers({ search, status }),
            customerService.getCustomers(),
          ]);
          if (isMounted) {
            setCustomers(filteredData || []);
            setStats(computeStats(allData || []));
            setError(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load customers. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [search, status, refreshCount]);

  // Handlers for search and filtering
  const handleSearchChange = (newSearch) => {
    setLoading(true);
    setSearch(newSearch);
    if (newSearch) {
      setSearchParams({ search: newSearch }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleStatusChange = (newStatus) => {
    setLoading(true);
    setStatus(newStatus);
  };

  const handleClearFilters = () => {
    setLoading(true);
    setSearch('');
    setStatus('all');
    setSearchParams({}, { replace: true });
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRefreshCount((c) => c + 1);
  };

  // CRUD modal triggers
  const handleOpenAddModal = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteOpen(true);
  };

  // Form submission handler (Create or Update)
  const handleFormSubmit = async (formData) => {
    if (selectedCustomer && selectedCustomer.id) {
      // Edit mode
      await customerService.updateCustomer(selectedCustomer.id, formData);
      setToast({ message: 'Customer updated successfully.', type: 'success' });
    } else {
      // Create mode
      await customerService.createCustomer(formData);
      setToast({ message: 'Customer created successfully.', type: 'success' });
    }
    // Increment refresh trigger to reload list while preserving active search & status
    setRefreshCount((c) => c + 1);
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async (customerId) => {
    await customerService.deleteCustomer(customerId);
    setToast({ message: 'Customer deleted successfully.', type: 'success' });
    // Increment refresh trigger to reload list while preserving active search & status
    setRefreshCount((c) => c + 1);
  };

  const isFiltered = Boolean(search || status !== 'all');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 min-w-0">
      {/* 1. Page Header & Primary Action */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate">
              Customers
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Client Accounts
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
            Manage, nurture, and track long-term customer relationships.
          </p>
        </div>

        {/* Primary "+ Add Customer" Button */}
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/25 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Customer</span>
        </button>
      </header>

      {/* 2. Customer Summary Statistics (Executive KPI Cards) */}
      <section
        aria-label="Customer Summary Statistics"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
      >
        {/* Total Accounts */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
              Total Accounts
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tabular-nums leading-tight">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            Active customer portfolio
          </div>
        </div>

        {/* Active Accounts */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase truncate">
              Active Accounts
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-sans tabular-nums leading-tight">
            {stats.active}
          </div>
          <div className="text-[11px] text-emerald-600/80 font-medium mt-1 truncate">
            In good standing & engaged
          </div>
        </div>

        {/* Inactive */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
              Inactive
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-400 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-600 font-sans tabular-nums leading-tight">
            {stats.inactive}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            Dormant or archived
          </div>
        </div>
      </section>

      {/* 3. Search & Filter Bar */}
      <section aria-label="Customer Filters" className="min-w-0">
        <CustomerFilters
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onClearFilters={handleClearFilters}
          totalCount={customers.length}
        />
      </section>

      {/* 4. Main Customer Content Area */}
      <main aria-label="Customer Listing" className="min-w-0">
        {error && !loading ? (
          /* Error State with Retry */
          <div className="rounded-2xl bg-white border border-rose-200 p-6 sm:p-8 text-center shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Unable to load customers
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
              {error}
            </p>
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
        ) : !loading && customers.length === 0 ? (
          /* Empty State */
          <CustomerEmptyState
            isFiltered={isFiltered}
            onClearFilters={handleClearFilters}
            onAddCustomer={handleOpenAddModal}
          />
        ) : (
          /* Customer Table / Loading Skeleton */
          <CustomerTable
            customers={customers}
            loading={loading}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteDialog}
            totalCount={stats.total}
          />
        )}
      </main>

      {/* 5. Add / Edit Customer Modal (Keyed to reset state on new/edit selection) */}
      <CustomerForm
        key={selectedCustomer ? `edit-${selectedCustomer.id}` : `create-${isFormOpen}`}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedCustomer}
      />

      {/* 6. Delete Confirmation Dialog (Keyed to reset state on open/close) */}
      <DeleteCustomerDialog
        key={customerToDelete ? `del-${customerToDelete.id}` : 'del-closed'}
        isOpen={isDeleteOpen}
        customer={customerToDelete}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* 7. Action Toast Feedback */}
      <CustomerToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default Customers;
