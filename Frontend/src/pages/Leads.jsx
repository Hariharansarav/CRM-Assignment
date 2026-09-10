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

  // Unified data & stats loader
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        if (!search && status === 'all') {
          // Single call loads both table data and lead summary stats
          const data = await leadService.getLeads();
          if (isMounted) {
            const list = data || [];
            setLeads(list);
            setStats(computeStats(list));
            setError(null);
          }
        } else {
          // Fetch filtered table list and complete lead stats in parallel
          const [filteredData, allData] = await Promise.all([
            leadService.getLeads({ search, status }),
            leadService.getLeads(),
          ]);
          if (isMounted) {
            setLeads(filteredData || []);
            setStats(computeStats(allData || []));
            setError(null);
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
      window.dispatchEvent(new CustomEvent('crm:data-updated'));
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
    window.dispatchEvent(new CustomEvent('crm:data-updated'));
  };

  // Delete confirmation handler
  const handleDeleteConfirm = async (leadId) => {
    await leadService.deleteLead(leadId);
    setToast({ message: 'Lead deleted successfully.', type: 'success' });
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
              Leads
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Pipeline Entry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
            Track, qualify, and convert prospective sales opportunities.
          </p>
        </div>

        {/* Primary "+ Add Lead" Button */}
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/25 hover:shadow-md hover:shadow-emerald-600/30 transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Lead</span>
        </button>
      </header>

      {/* 2. Lead Summary Statistics (Executive KPI Cards) */}
      <section
        aria-label="Lead Summary Statistics"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {/* Total Leads */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
              Total Leads
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
            All registered prospects
          </div>
        </div>

        {/* Qualified */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase truncate">
              Qualified
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-sans tabular-nums leading-tight">
            {stats.qualified}
          </div>
          <div className="text-[11px] text-emerald-600/80 font-medium mt-1 truncate">
            Conversion ready
          </div>
        </div>

        {/* In Contact / New */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-blue-700 uppercase truncate">
              In Contact / New
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-sans tabular-nums leading-tight">
            {stats.new + stats.contacted}
          </div>
          <div className="text-[11px] text-blue-600/80 font-medium mt-1 truncate">
            Active outreach
          </div>
        </div>

        {/* Lost */}
        <div className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs card-hover flex flex-col justify-between overflow-hidden min-w-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
              Lost
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-400 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-600 font-sans tabular-nums leading-tight">
            {stats.lost}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            Disqualified / inactive
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
