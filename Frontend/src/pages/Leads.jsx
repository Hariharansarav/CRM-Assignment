import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import leadService from '../services/leadService';
import LeadFilters from '../components/leads/LeadFilters';
import LeadTable from '../components/leads/LeadTable';
import LeadEmptyState from '../components/leads/LeadEmptyState';
import LeadForm from '../components/leads/LeadForm';
import DeleteLeadDialog from '../components/leads/DeleteLeadDialog';
import Toast from '../components/ui/Toast';


export const Leads = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [leads, setLeads] = useState([]);
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

  // Overall lead statistics summary
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, lost: 0 });

  // Refresh counter to trigger refetches after CRUD
  const [refreshCount, setRefreshCount] = useState(0);

  // Modal dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null); // null = Add mode, object = Edit mode
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  // Helper to compute stats from a full lead list
  const computeStats = (allData) => {
    const all = allData || [];
    const total = all.length;
    const newCount = all.filter((l) => l.status === 'New').length;
    const contacted = all.filter((l) => l.status === 'Contacted').length;
    const qualified = all.filter((l) => l.status === 'Qualified').length;
    const lost = all.filter((l) => l.status === 'Lost').length;
    return { total, new: newCount, contacted, qualified, lost };
  };

  // Main data-loading effect (synchronized with search, status, and refreshCount)
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await leadService.getLeads({ search, status });
        if (isMounted) {
          const list = data || [];
          setLeads(list);
          setError(null);
          // If no filters are applied, compute stats directly from the full response (eliminates duplicate request)
          if (!search && status === 'all') {
            setStats(computeStats(list));
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leads. Please try again.');
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

  // Overall stats summary loader - only fetches separately if filters are active
  useEffect(() => {
    // If no filters are active, loadData already calculated stats from the full list
    if (!search && status === 'all') return;

    let isMounted = true;
    leadService.getLeads().then((allData) => {
      if (isMounted) {
        setStats(computeStats(allData));
      }
    }).catch(() => { });

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
    setSelectedLead(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteOpen(true);
  };

  // Inline status quick-change handler
  const handleInlineStatusChange = async (leadId, newStatus) => {
    try {
      await leadService.updateLead(leadId, { status: newStatus });
      setToast({ message: `Lead status updated to ${newStatus}.`, type: 'success' });
      setRefreshCount((c) => c + 1);
    } catch (err) {
      setToast({
        message: err.message || 'Failed to update lead status.',
        type: 'error',
      });
    }
  };

  // Form submission handler (Create or Update)
  const handleFormSubmit = async (formData) => {
    if (selectedLead && selectedLead.id) {
      // Edit mode
      await leadService.updateLead(selectedLead.id, formData);
      setToast({ message: 'Lead updated successfully.', type: 'success' });
    } else {
      // Create mode
      await leadService.createLead(formData);
      setToast({ message: 'Lead created successfully.', type: 'success' });
    }
    setRefreshCount((c) => c + 1);
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async (leadId) => {
    await leadService.deleteLead(leadId);
    setToast({ message: 'Lead deleted successfully.', type: 'success' });
    setRefreshCount((c) => c + 1);
  };

  const isFiltered = Boolean(search || status !== 'all');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12 min-w-0">
      {/* 1. Page Header & Primary Action */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans truncate">
            Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
            Track and convert prospective sales opportunities.
          </p>
        </div>

        {/* Primary "+ Add Lead" Button */}
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-[#1b2126] hover:bg-black active:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        >
          <span className="text-base leading-none font-bold">+</span>
          <span>Add Lead</span>
        </button>
      </header>

      {/* 2. Lead Summary Statistics (Compact KPI Cards) */}
      <section
        aria-label="Lead Summary Statistics"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5"
      >
        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
            Total Leads
          </span>
          <div className="text-lg sm:text-xl font-bold text-slate-900 font-sans mt-0.5">
            {stats.total}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block truncate">
            Qualified
          </span>
          <div className="text-lg sm:text-xl font-bold text-emerald-700 font-sans mt-0.5">
            {stats.qualified}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 uppercase tracking-wider block truncate">
            In Contact / New
          </span>
          <div className="text-lg sm:text-xl font-bold text-blue-700 font-sans mt-0.5">
            {stats.new + stats.contacted}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
            Lost
          </span>
          <div className="text-lg sm:text-xl font-bold text-slate-600 font-sans mt-0.5">
            {stats.lost}
          </div>
        </div>
      </section>

      {/* 3. Search & Filter Bar */}
      <section aria-label="Lead Filters" className="min-w-0">
        <LeadFilters
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onClearFilters={handleClearFilters}
          totalCount={leads.length}
        />
      </section>

      {/* 4. Main Leads Content Area */}
      <main aria-label="Lead Listing" className="min-w-0">
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
              Unable to load leads
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
        ) : !loading && leads.length === 0 ? (
          /* Empty State */
          <LeadEmptyState
            isFiltered={isFiltered}
            onClearFilters={handleClearFilters}
            onAddLead={handleOpenAddModal}
          />
        ) : (
          /* Leads Table / Loading Skeleton */
          <LeadTable
            leads={leads}
            loading={loading}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteDialog}
            onStatusChange={handleInlineStatusChange}
            totalCount={stats.total}
          />
        )}
      </main>

      {/* 5. Add / Edit Lead Modal */}
      <LeadForm
        key={selectedLead ? `edit-${selectedLead.id}` : `create-${isFormOpen}`}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedLead}
      />

      {/* 6. Delete Confirmation Dialog */}
      <DeleteLeadDialog
        key={leadToDelete ? `del-${leadToDelete.id}` : 'del-closed'}
        isOpen={isDeleteOpen}
        lead={leadToDelete}
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

export default Leads;
