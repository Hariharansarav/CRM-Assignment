import { useParams, Link } from 'react-router-dom';

/**
 * Phase 3 Customer Details Placeholder Page
 * Features:
 * - Dynamic route handling with useParams() to display the current customer ID
 * - Profile summary card with name, company, status pill, and assigned rep
 * - Multi-card layout: Customer Overview, Associated Deals, and Activity Timeline
 * - Back to Customers navigation
 * - Strictly matches Login page theme (white cards, subtle borders, emerald accents)
 */
const CustomerDetails = () => {
  const { id } = useParams();

  // Mock customer info for layout visualization
  const customerName = id === '25' ? 'Global Tech Innovations' : 'Acme Corporation';
  const customerCompany = id === '25' ? 'Fintech & Blockchain' : 'Enterprise SaaS & Cloud';
  const contactName = id === '25' ? 'Rahul Kumar' : 'John Doe';
  const contactEmail = id === '25' ? 'rahul.k@globaltech.io' : 'john.doe@acmecorp.com';
  const lifetimeValue = id === '25' ? '$78,200' : '$54,000';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Header with Breadcrumb & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/customers" className="hover:text-emerald-700 transition-colors">
              Customers
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold font-mono">ID #{id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            Customer Details
          </h1>
        </div>

        <Link
          to="/customers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <span>←</span>
          <span>Back to Customers</span>
        </Link>
      </div>

      {/* 2. Customer Profile Hero Card */}
      <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-emerald-600/15 shrink-0">
              {customerName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  {customerName}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active Account
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {customerCompany} • Registered since Jan 2026
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 self-start md:self-auto">
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400">Total Value</div>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{lifetimeValue}</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400">Customer ID</div>
              <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5">#{id}</div>
            </div>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Primary Contact
            </span>
            <div className="font-semibold text-slate-800">{contactName}</div>
            <div className="text-slate-500 text-[11px]">{contactEmail}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Assigned Account Rep
            </span>
            <div className="font-semibold text-slate-800">Sarah Jenkins</div>
            <div className="text-slate-500 text-[11px]">Senior Account Executive</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Next Milestone
            </span>
            <div className="font-semibold text-slate-800">Q3 Renewal Review</div>
            <div className="text-slate-500 text-[11px]">Scheduled Oct 15, 2026</div>
          </div>
        </div>
      </div>

      {/* 3. Associated Opportunities & Timeline Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Deals for this Customer */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-sans border-b border-slate-100 pb-3">
            Open Sales Opportunities
          </h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-900">Enterprise Cloud License Expansion</div>
                <div className="text-[11px] text-slate-500">Stage: Proposal • Closes Oct 2026</div>
              </div>
              <span className="font-mono font-bold text-slate-900 text-xs">$34,000</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-900">Custom API &amp; Webhook Integration</div>
                <div className="text-[11px] text-slate-500">Stage: Negotiation • Closes Nov 2026</div>
              </div>
              <span className="font-mono font-bold text-slate-900 text-xs">$20,000</span>
            </div>
          </div>
        </div>

        {/* Recent Account Activity */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-sans border-b border-slate-100 pb-3">
            Recent Activity Log
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <div>
                <div className="font-semibold text-slate-800">Proposal Sent to Decision Maker</div>
                <div className="text-slate-400 text-[11px]">Today at 11:30 AM by Sarah Jenkins</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
              <div>
                <div className="font-semibold text-slate-800">Technical Demo Call Completed</div>
                <div className="text-slate-400 text-[11px]">Yesterday at 3:00 PM • 45 mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
