import { Link } from 'react-router-dom';

const CUSTOMERS_LIST = [
  {
    id: '1',
    name: 'Acme Corporation',
    contact: 'John Doe',
    email: 'john.doe@acmecorp.com',
    company: 'Enterprise SaaS & Cloud',
    status: 'Active',
    dealValue: '$54,000',
    assignedRep: 'Sarah Jenkins',
    date: 'Sep 9, 2026',
    initials: 'AC',
  },
  {
    id: '25',
    name: 'Global Tech Innovations',
    contact: 'Rahul Kumar',
    email: 'rahul.k@globaltech.io',
    company: 'Fintech Solutions',
    status: 'Active',
    dealValue: '$78,200',
    assignedRep: 'Marcus Chen',
    date: 'Sep 8, 2026',
    initials: 'GT',
  },
  {
    id: '3',
    name: 'Summit Media Group',
    contact: 'Sarah Smith',
    email: 'sarah@summitmedia.com',
    company: 'Digital Advertising',
    status: 'Active',
    dealValue: '$36,500',
    assignedRep: 'Elena Rostova',
    date: 'Sep 7, 2026',
    initials: 'SM',
  },
  {
    id: '4',
    name: 'Pinnacle Supply Chain',
    contact: 'Robert Taylor',
    email: 'rtaylor@pinnaclelog.com',
    company: 'Freight & Distribution',
    status: 'Active',
    dealValue: '$92,000',
    assignedRep: 'Sarah Jenkins',
    date: 'Sep 5, 2026',
    initials: 'PS',
  },
  {
    id: '5',
    name: 'Vortex Dynamics',
    contact: 'Alicia Chen',
    email: 'a.chen@vortexdyn.org',
    company: 'Industrial Automation',
    status: 'Inactive',
    dealValue: '$18,000',
    assignedRep: 'David Thorne',
    date: 'Aug 28, 2026',
    initials: 'VD',
  },
];

/**
 * Phase 3 Customers Page Layout
 * Features:
 * - Header with title and descriptive subtext
 * - Visual action toolbar: Search input, Status filter, "+ Add Customer" button
 * - Clean customer table with status pills and direct links to /customers/:id
 * - Maintains 100% theme consistency with Login page (white card surfaces, subtle borders, emerald accents)
 */
const Customers = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            Customers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your customer relationships and accounts.
          </p>
        </div>

        {/* Primary Action Button (Login page button style) */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#1b2126] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-[0.99] transition-all cursor-pointer self-start sm:self-auto focus:outline-none"
        >
          <span className="text-base leading-none">+</span>
          <span>Add Customer</span>
        </button>
      </div>

      {/* 2. Search & Filter Bar (Matching Login page input styling) */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search customers by name, company, or contact..."
            readOnly
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all cursor-default"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5">
          <div className="h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors">
            <span>Status: <strong>All Statuses</strong></span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>

          <div className="h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors">
            <span>Sort: <strong>Newest First</strong></span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {/* 3. Customer Table Card */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="py-3.5 px-5 sm:px-6">Customer / Account</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Company Domain</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Total Value</th>
                <th className="py-3.5 px-4">Account Owner</th>
                <th className="py-3.5 px-5 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {CUSTOMERS_LIST.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {cust.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{cust.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">ID #{cust.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-800 font-medium">{cust.contact}</div>
                    <div className="text-[11px] text-slate-400">{cust.email}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{cust.company}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        cust.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          cust.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      ></span>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm">
                    {cust.dealValue}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{cust.assignedRep}</td>
                  <td className="py-4 px-5 sm:px-6 text-right">
                    <Link
                      to={`/customers/${cust.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 font-semibold transition-all cursor-pointer"
                    >
                      <span>View</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination UI */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>5</strong> of <strong>120</strong> customers</span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">Previous</button>
            <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-medium cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
