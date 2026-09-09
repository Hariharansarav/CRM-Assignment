const OPPORTUNITIES_DATA = [
  {
    id: 'OPP-301',
    title: 'Enterprise Cloud License Expansion',
    customer: 'Acme Corporation',
    customerId: '1',
    stage: 'Proposal',
    stageColor: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    dotColor: 'bg-cyan-500',
    amount: '$54,000',
    probability: '65%',
    closeDate: 'Oct 15, 2026',
    owner: 'Sarah Jenkins',
  },
  {
    id: 'OPP-302',
    title: 'Fintech API Security Suite',
    customer: 'Global Tech Innovations',
    customerId: '25',
    stage: 'Negotiation',
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dotColor: 'bg-amber-500',
    amount: '$78,200',
    probability: '80%',
    closeDate: 'Oct 30, 2026',
    owner: 'Marcus Chen',
  },
  {
    id: 'OPP-303',
    title: 'Automated Pipeline Migration',
    customer: 'Summit Media Group',
    customerId: '3',
    stage: 'Won',
    stageColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dotColor: 'bg-emerald-500',
    amount: '$36,500',
    probability: '100%',
    closeDate: 'Sep 7, 2026',
    owner: 'Elena Rostova',
  },
  {
    id: 'OPP-304',
    title: 'Global Supply Chain Telemetry',
    customer: 'Pinnacle Supply Chain',
    customerId: '4',
    stage: 'Proposal',
    stageColor: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    dotColor: 'bg-cyan-500',
    amount: '$92,000',
    probability: '60%',
    closeDate: 'Nov 12, 2026',
    owner: 'Sarah Jenkins',
  },
  {
    id: 'OPP-305',
    title: 'Industrial Edge Sensor Analytics',
    customer: 'Vortex Dynamics',
    customerId: '5',
    stage: 'Prospecting',
    stageColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    dotColor: 'bg-indigo-500',
    amount: '$18,000',
    probability: '35%',
    closeDate: 'Dec 05, 2026',
    owner: 'David Thorne',
  },
];

/**
 * Phase 3 Opportunities Page Layout
 * Features:
 * - Header with title and descriptive subtext
 * - Visual action toolbar: Stage filter, Expected Close date filter, "+ Add Opportunity" primary button
 * - Clean pipeline table with deal names, customer accounts, probability tags, and stage pills
 * - Strictly matches Login page theme (white card surfaces, subtle borders, emerald accents)
 */
const Opportunities = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track and manage your active sales pipeline, deal stages, and revenue forecasts.
          </p>
        </div>

        {/* Primary Action Button (Login page button style) */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#1b2126] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-[0.99] transition-all cursor-pointer self-start sm:self-auto focus:outline-none"
        >
          <span className="text-base leading-none">+</span>
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* 2. Pipeline Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500">Pipeline Total</div>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">$278,700</div>
          <div className="text-[10px] text-slate-400 mt-0.5">18 Active Deals</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500">Weighted Forecast</div>
          <div className="text-xl font-bold text-emerald-700 font-mono mt-1">$184,500</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">+14% vs Q2</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500">Avg Deal Size</div>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">$55,740</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Enterprise Segment</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500">Win Rate</div>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">68.4%</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">High Conversion</div>
        </div>
      </div>

      {/* 3. Stage & Filter Bar */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search opportunities by deal title or customer..."
            readOnly
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-all cursor-default"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5">
          <div className="h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors">
            <span>Stage: <strong>All Stages</strong></span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>

          <div className="h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors">
            <span>Close Date: <strong>This Quarter</strong></span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {/* 4. Opportunities Pipeline Table Card */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="py-3.5 px-5 sm:px-6">Opportunity / Deal</th>
                <th className="py-3.5 px-4">Customer Account</th>
                <th className="py-3.5 px-4">Deal Stage</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Win Probability</th>
                <th className="py-3.5 px-4">Expected Close</th>
                <th className="py-3.5 px-4">Deal Owner</th>
                <th className="py-3.5 px-5 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {OPPORTUNITIES_DATA.map((opp) => (
                <tr key={opp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 sm:px-6">
                    <div className="font-semibold text-slate-900 text-sm">{opp.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{opp.id}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">{opp.customer}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${opp.stageColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${opp.dotColor}`}></span>
                      {opp.stage}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm">
                    {opp.amount}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: opp.probability }}
                        ></div>
                      </div>
                      <span className="font-mono text-slate-600 font-semibold">{opp.probability}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{opp.closeDate}</td>
                  <td className="py-4 px-4 text-slate-600">{opp.owner}</td>
                  <td className="py-4 px-5 sm:px-6 text-right">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 font-semibold transition-all cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>5</strong> of <strong>18</strong> active opportunities</span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">Previous</button>
            <button type="button" className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-medium cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
