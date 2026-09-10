import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import opportunityService from '../services/opportunityService';
import OpportunityFilters from '../components/opportunities/OpportunityFilters';
import OpportunityTable from '../components/opportunities/OpportunityTable';
import OpportunityEmptyState from '../components/opportunities/OpportunityEmptyState';
import OpportunityForm from '../components/opportunities/OpportunityForm';
import DeleteOpportunityDialog from '../components/opportunities/DeleteOpportunityDialog';
import Toast from '../components/ui/Toast';

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(Number(val))) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(val));
};

/**
 * Opportunities Page (Phase 8)
 * Complete sales opportunity & pipeline management with real backend API integration,
 * status filtering, search, inline and modal CRUD operations, and responsive design.
 */
export const Opportunities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [opportunities, setOpportunities] = useState([]);
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

  // Overall pipeline statistics summary
  const [stats, setStats] = useState({
    totalCount: 0,
    totalValue: 0,
    wonValue: 0,
    wonCount: 0,
    inProgressCount: 0,
  });

  // Refresh counter to trigger refetches after CRUD
  const [refreshCount, setRefreshCount] = useState(0);

  // Modal dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null); // null = Add mode, object = Edit mode
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [oppToDelete, setOppToDelete] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  // Helper to compute pipeline statistics from a full opportunity list
  const computeStats = (allData) => {
    const all = allData || [];
    const totalCount = all.length;
    let totalValue = 0;
    let wonValue = 0;
    let wonCount = 0;
    let inProgressCount = 0;

    all.forEach((item) => {
      const val = parseFloat(item.value) || 0;
      totalValue += val;
      if (item.status === 'Won') {
        wonValue += val;
        wonCount += 1;
      } else if (item.status !== 'Lost') {
        inProgressCount += 1;
      }
    });

    return {
      totalCount,
      totalValue,
      wonValue,
      wonCount,
      inProgressCount,
    };
  };

  // Unified data & pipeline stats loader
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (status === 'all') {
          // Single call loads both table data and pipeline summary stats
          const data = await opportunityService.getOpportunities();
          if (isMounted) {
            const list = data || [];
            setOpportunities(list);
            setStats(computeStats(list));
            setError(null);
          }
        } else {
          // Fetch filtered table list and complete pipeline stats in parallel
          const [filteredData, allData] = await Promise.all([
            opportunityService.getOpportunities({ status }),
            opportunityService.getOpportunities(),
          ]);
          if (isMounted) {
            setOpportunities(filteredData || []);
            setStats(computeStats(allData || []));
            setError(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load opportunities. Please try again.');
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
  }, [status, refreshCount]);

  // Client-side search filtering across deal name, customer name, and customer company
  const filteredOpportunities = useMemo(() => {
    if (!search.trim()) return opportunities;
    const query = search.trim().toLowerCase();
    return opportunities.filter((opp) => {
      const name = (opp.name || '').toLowerCase();
      const customer = (opp.customer_name || '').toLowerCase();
      const company = (opp.customer_company || '').toLowerCase();
      return name.includes(query) || customer.includes(query) || company.includes(query);
    });
  }, [opportunities, search]);

  // Handlers for search and filtering
  const handleSearchChange = (newSearch) => {
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
    setSelectedOpportunity(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (opp) => {
    setSelectedOpportunity(opp);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (opp) => {
    setOppToDelete(opp);
    setIsDeleteOpen(true);
  };

  // Inline stage status quick-change handler
  const handleInlineStatusChange = async (oppId, newStatus) => {
    try {
      await opportunityService.updateOpportunity(oppId, { status: newStatus });
      setToast({ message: `Opportunity stage updated to ${newStatus}.`, type: 'success' });
      setRefreshCount((c) => c + 1);
      window.dispatchEvent(new CustomEvent('crm:data-updated'));
    } catch (err) {
      setToast({
        message: err.message || 'Failed to update opportunity stage.',
        type: 'error',
      });
    }
  };

  // Form submission handler (Create or Update)
  const handleFormSubmit = async (formData) => {
    if (selectedOpportunity && selectedOpportunity.id) {
      // Edit mode
      await opportunityService.updateOpportunity(selectedOpportunity.id, formData);
      setToast({ message: 'Opportunity updated successfully.', type: 'success' });
    } else {
      // Create mode
      await opportunityService.createOpportunity(formData);
      setToast({ message: 'Opportunity created successfully.', type: 'success' });
    }
    setRefreshCount((c) => c + 1);
    window.dispatchEvent(new CustomEvent('crm:data-updated'));
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async (oppId) => {
    await opportunityService.deleteOpportunity(oppId);
    setToast({ message: 'Opportunity deleted successfully.', type: 'success' });
    setRefreshCount((c) => c + 1);
    window.dispatchEvent(new CustomEvent('crm:data-updated'));
  };

  const isFiltered = Boolean(search || status !== 'all');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 min-w-0">
      {/* 1. Page Header & Primary Action */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate">
              Opportunities
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Revenue Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
            Track, stage-manage, and forecast your active sales deals.
          </p>
        </div>

        {/* Primary "+ Add Opportunity" Button */}
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/25 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Opportunity</span>
        </button>
      </header>

      {/* 2. Pipeline Summary Statistics (Executive KPI Cards) */}
      <section
        aria-label="Pipeline Summary Statistics"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {/* Pipeline Value */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
              Pipeline Value
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums leading-tight">
            {formatCurrency(stats.totalValue)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            {stats.totalCount} active pipeline deals
          </div>
        </div>

        {/* Closed Won Value */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase truncate">
              Closed Won Value
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tracking-tight tabular-nums leading-tight">
            {formatCurrency(stats.wonValue)}
          </div>
          <div className="text-[11px] text-emerald-600/80 font-medium mt-1 truncate">
            {stats.wonCount} won contracts
          </div>
        </div>

        {/* Active Deals */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-blue-700 uppercase truncate">
              Active Deals
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="6" y1="20" x2="6" y2="15" />
                <line x1="2" y1="20" x2="22" y2="20" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-sans tabular-nums leading-tight">
            {stats.inProgressCount}
          </div>
          <div className="text-[11px] text-blue-600/80 font-medium mt-1 truncate">
            Prospecting / In Progress
          </div>
        </div>

        {/* Win Rate */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-teal-700 uppercase truncate">
              Win Rate
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4-4 4" />
                <path d="M12 16V8" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-sans tabular-nums leading-tight">
            {stats.totalCount > 0
              ? `${Math.round((stats.wonCount / stats.totalCount) * 100)}%`
              : '0%'}
          </div>
          <div className="text-[11px] text-teal-600/80 font-medium mt-1 truncate">
            Pipeline conversion ratio
          </div>
        </div>
      </section>

      {/* 3. Search & Filter Bar */}
      <section aria-label="Opportunity Filters" className="min-w-0">
        <OpportunityFilters
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onClearFilters={handleClearFilters}
          totalCount={filteredOpportunities.length}
        />
      </section>

      {/* 4. Main Opportunities Content Area */}
      <main aria-label="Opportunity Listing" className="min-w-0">
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
              Unable to load opportunities
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
        ) : !loading && filteredOpportunities.length === 0 ? (
          /* Empty State */
          <OpportunityEmptyState
            isFiltered={isFiltered}
            onClearFilters={handleClearFilters}
            onAddOpportunity={handleOpenAddModal}
          />
        ) : (
          /* Opportunity Table / Loading Skeleton */
          <OpportunityTable
            opportunities={filteredOpportunities}
            loading={loading}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteDialog}
            onStatusChange={handleInlineStatusChange}
            totalCount={stats.totalCount}
          />
        )}
      </main>

      {/* 5. Add / Edit Opportunity Modal */}
      <OpportunityForm
        key={selectedOpportunity ? `edit-${selectedOpportunity.id}` : `create-${isFormOpen}`}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedOpportunity}
      />

      {/* 6. Delete Confirmation Dialog */}
      <DeleteOpportunityDialog
        key={oppToDelete ? `del-${oppToDelete.id}` : 'del-closed'}
        isOpen={isDeleteOpen}
        opportunity={oppToDelete}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* 7. Action Toast Feedback */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
};

export default Opportunities;
