const LEADS_DATA = [
  {
    id: '101',
    name: 'Sarah Jenkins',
    company: 'Apex Cloud Systems',
    email: 'sarah.j@apexcloud.io',
    source: 'Website Form',
    status: 'Qualified',
    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotClass: 'bg-emerald-500',
    estValue: '$24,000',
    assignedTo: 'Sarah Jenkins',
    created: 'Sep 9, 2026',
    initials: 'SJ',
  },
  {
    id: '102',
    name: 'Marcus Chen',
    company: 'Vanguard Retail Tech',
    email: 'm.chen@vanguardtech.com',
    source: 'LinkedIn Inbound',
    status: 'Contacted',
    statusClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
    dotClass: 'bg-blue-500',
    estValue: '$18,500',
    assignedTo: 'Marcus Chen',
    created: 'Sep 8, 2026',
    initials: 'MC',
  },
  {
    id: '103',
    name: 'Elena Rostova',
    company: 'Nordic Logistics Group',
    email: 'elena@nordiclogistics.eu',
    source: 'Partner Referral',
    status: 'New',
    statusClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    dotClass: 'bg-indigo-500',
    estValue: '$32,000',
    assignedTo: 'Elena Rostova',
    created: 'Sep 8, 2026',
    initials: 'ER',
  },
  {
    id: '104',
    name: 'David Thorne',
    company: 'Horizon BioPharma',
    email: 'd.thorne@horizonbio.com',
    source: 'Outbound Cold Email',
    status: 'Qualified',
    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotClass: 'bg-emerald-500',
    estValue: '$45,000',
    assignedTo: 'David Thorne',
    created: 'Sep 6, 2026',
    initials: 'DT',
  },
  {
    id: '105',
    name: 'Jessica Morales',
    company: 'Crestview Capital Partners',
    email: 'j.morales@crestviewcap.com',
    source: 'Trade Conference',
    status: 'Lost',
    statusClass: 'bg-red-50 text-red-700 border-red-200/80',
    dotClass: 'bg-red-500',
    estValue: '$15,000',
    assignedTo: 'Sarah Jenkins',
    created: 'Sep 3, 2026',
    initials: 'JM',
  },
];

/**
 * Phase 3 Leads Page Layout
 * Features:
 * - Header with title and descriptive subtext
 * - Visual action toolbar: Search input, Status filter, "+ Add Lead" primary button
 * - Clean leads table with source tags, values, and status pills
 * - Strictly matches Login page theme (white card surfaces, subtle borders, emerald accents)
 */
const Leads = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage and track your sales leads from first contact to qualification.
          </p>
        </div>

        {/* Primary Action Button (Login page button style) */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#1b2126] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-[0.99] transition-all cursor-pointer self-start sm:self-auto focus:outline-none"
        >
          <span className="text-base leading-none">+</span>
          <span>Add Lead</span>
        </button>
      </div>

      {/* 2. Search & Status Filter Bar */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search leads by name, company, or email..."
            readOnly
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all cursor-default"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5">
          <div className="h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors">
            <span>Status: <strong>All Leads</strong></span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>

          <div className="h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors">
            <span>Source: <strong>All Channels</strong></span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {/* 3. Leads Table Card */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="py-3.5 px-5 sm:px-6">Lead / Contact</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Source Channel</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Est. Deal Value</th>
                <th className="py-3.5 px-4">Assigned Rep</th>
                <th className="py-3.5 px-4">Date Added</th>
                <th className="py-3.5 px-5 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {LEADS_DATA.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {lead.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{lead.name}</div>
                        <div className="text-[11px] text-slate-400">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">{lead.company}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium text-[11px]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${lead.statusClass}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lead.dotClass}`}></span>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm">
                    {lead.estValue}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{lead.assignedTo}</td>
                  <td className="py-4 px-4 text-slate-500">{lead.created}</td>
                  <td className="py-4 px-5 sm:px-6 text-right">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 font-semibold transition-all cursor-pointer"
                    >
                      Convert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>5</strong> of <strong>45</strong> leads</span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">Previous</button>
            <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-medium cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
