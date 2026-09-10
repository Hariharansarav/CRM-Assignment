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

  // Main data-loading effect (synchronized with status and refreshCount)
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await opportunityService.getOpportunities({
          status: status !== 'all' ? status : undefined,
        });
        if (isMounted) {
          const list = data || [];
          setOpportunities(list);
          setError(null);
          // If all statuses are loaded, compute stats directly from response (eliminates duplicate request)
          if (status === 'all') {
            setStats(computeStats(list));
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

  // Overall stats summary loader - only fetches separately if a specific status filter is active during refresh
  useEffect(() => {
    if (status === 'all') return;

    let isMounted = true;
    opportunityService.getOpportunities().then((allData) => {
      if (isMounted) {
        setStats(computeStats(allData));
      }
    }).catch(() => {});

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
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async (oppId) => {
    await opportunityService.deleteOpportunity(oppId);
    setToast({ message: 'Opportunity deleted successfully.', type: 'success' });
    setRefreshCount((c) => c + 1);
  };

  const isFiltered = Boolean(search || status !== 'all');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 min-w-0">
      {/* 1. Page Header & Primary Action */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate">
            Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
            Track and forecast your active sales deals and revenue stages.
          </p>
        </div>

        {/* Primary "+ Add Opportunity" Button */}
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-[#1b2126] hover:bg-black active:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        >
          <span className="text-base leading-none font-bold">+</span>
          <span>Add Opportunity</span>
        </button>
      </header>

      {/* 2. Pipeline Summary Statistics (Compact KPI Cards) */}
      <section
        aria-label="Pipeline Summary Statistics"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5"
      >
        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
            Pipeline Value
          </span>
          <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono mt-0.5 truncate">
            {formatCurrency(stats.totalValue)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {stats.totalCount} total deals
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block truncate">
            Closed Won Value
          </span>
          <div className="text-lg sm:text-xl font-bold text-emerald-700 font-mono mt-0.5 truncate">
            {formatCurrency(stats.wonValue)}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
            {stats.wonCount} won deals
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 uppercase tracking-wider block truncate">
            Active Deals
          </span>
          <div className="text-lg sm:text-xl font-bold text-blue-700 font-sans mt-0.5">
            {stats.inProgressCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Prospecting / In Progress
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
            Win Rate
          </span>
          <div className="text-lg sm:text-xl font-bold text-slate-900 font-sans mt-0.5">
            {stats.totalCount > 0
              ? `${Math.round((stats.wonCount / stats.totalCount) * 100)}%`
              : '0%'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Conversion ratio
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
