import { useState, useEffect, useCallback } from 'react';
import dashboardService from '../services/dashboardService';
import MetricCard from '../components/dashboard/MetricCard';
import SalesOverview from '../components/dashboard/SalesOverview';
import LeadSources from '../components/dashboard/LeadSources';
import OpportunityStatus from '../components/dashboard/OpportunityStatus';
import LatestLeads from '../components/dashboard/LatestLeads';
import RecentCustomers from '../components/dashboard/RecentCustomers';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await dashboardService.getDashboard();
        if (isMounted) {
          setDashboardData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message || 'Unable to load dashboard data. Please try again.'
          );
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
  }, []);

  const handleRetry = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(
        err.message || 'Unable to load dashboard data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================================================
  // 1. SKELETON LOADING STATE (Compact, zero layout shift)
  // =========================================================================
  if (loading && !dashboardData) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-4 animate-pulse select-none pb-12">
        {/* 5 Compact KPI Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-4 h-20 flex flex-col justify-between shadow-2xs"
            >
              <div className="w-16 h-5 bg-slate-200 rounded-lg" />
              <div className="w-20 h-3 bg-slate-100 rounded-md" />
            </div>
          ))}
        </div>

        {/* Main Analytics Row Skeleton (Sales Overview + Lead Sources) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200/80 p-5 h-76 shadow-2xs" />
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200/80 p-5 h-76 shadow-2xs" />
        </div>

        {/* Opportunity Status Donut Skeleton */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 h-44 shadow-2xs" />

        {/* Lower Section Skeleton (2 cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 h-64 shadow-2xs" />
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 h-64 shadow-2xs" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ERROR & RETRY STATE
  // =========================================================================
  if (error && !dashboardData) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 px-4 select-none">
        <div className="rounded-2xl bg-white border border-rose-200 p-6 sm:p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Unable to load dashboard data
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
            {error}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentCustomers = dashboardData?.recentCustomers || [];
  const recentLeads = dashboardData?.recentLeads || [];
  const opportunitiesByStatus = dashboardData?.opportunitiesByStatus || {};
  const chart = dashboardData?.chart || { labels: [], values: [] };

  // =========================================================================
  // 3. FINAL COMPACT DASHBOARD MAIN VIEW
  // =========================================================================
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-12">
      {/* 1. Five Compact KPI Cards */}
      <section
        aria-label="Overview Statistics"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5"
      >
        {/* Card 1: Total Leads */}
        <MetricCard
          label="Total Leads"
          value={stats.totalLeads}
          accent="teal"
          icon={
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="22" y1="12" x2="18" y2="12" />
              <line x1="6" y1="12" x2="2" y2="12" />
              <line x1="12" y1="6" x2="12" y2="2" />
              <line x1="12" y1="22" x2="12" y2="18" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
        />

        {/* Card 2: Total Customers */}
        <MetricCard
          label="Total Customers"
          value={stats.totalCustomers}
          accent="emerald"
          icon={
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        {/* Card 3: Open Opportunities */}
        <MetricCard
          label="Open Opportunities"
          value={stats.openOpportunities}
          accent="blue"
          icon={
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          }
        />

        {/* Card 4: Won Opportunities */}
        <MetricCard
          label="Won Opportunities"
          value={stats.wonOpportunities}
          accent="indigo"
          icon={
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />

        {/* Card 5: Total Revenue */}
        <MetricCard
          label="Total Revenue"
          value={stats.totalRevenue}
          isCurrency
          accent="amber"
          icon={
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
      </section>

      {/* 3. Main Analytics Section (Sales Overview ~65% + Lead Sources ~35%) */}
      <section
        aria-label="Sales Analytics"
        className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      >
        <div className="lg:col-span-8 min-w-0 flex flex-col">
          <SalesOverview chartData={chart} stats={stats} />
        </div>
        <div className="lg:col-span-4 min-w-0 flex flex-col">
          <LeadSources leads={recentLeads} />
        </div>
      </section>

      {/* 4. Secondary Analytics Section (Compact Opportunities by Status) */}
      <section aria-label="Opportunities by Status" className="w-full min-w-0">
        <OpportunityStatus opportunitiesByStatus={opportunitiesByStatus} />
      </section>

      {/* 5. Lower Section (Latest Leads + Recent Customers — 2 Balanced Columns) */}
      <section
        aria-label="CRM Activity and Recent Records"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
      >
        <div className="min-w-0 flex flex-col">
          <LatestLeads leads={recentLeads} />
        </div>
        <div className="min-w-0 flex flex-col">
          <RecentCustomers customers={recentCustomers} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
