import { Link } from 'react-router-dom';

const STATS_DATA = [
  {
    label: 'Total Customers',
    value: '120',
    change: '+12% this month',
    isPositive: true,
    progress: '75%',
    progressColor: 'bg-emerald-500',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Total Leads',
    value: '45',
    change: '+8% this month',
    isPositive: true,
    progress: '60%',
    progressColor: 'bg-teal-500',
    icon: (
      <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: 'Open Opportunities',
    value: '18',
    change: '$184.5K pipeline',
    isPositive: true,
    progress: '50%',
    progressColor: 'bg-cyan-500',
    icon: (
      <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'Won Opportunities',
    value: '12',
    change: '+15% win rate',
    isPositive: true,
    progress: '68%',
    progressColor: 'bg-emerald-600',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: 'Total Revenue',
    value: '$184,500',
    change: '92% of target',
    isPositive: true,
    progress: '92%',
    progressColor: 'bg-indigo-500',
    icon: (
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const RECENT_LEADS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    company: 'Apex Cloud Systems',
    status: 'Qualified',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    source: 'Website',
    value: '$24,000',
    initials: 'SJ',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    company: 'Vanguard Retail Tech',
    status: 'Contacted',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    source: 'LinkedIn',
    value: '$18,500',
    initials: 'MC',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    company: 'Nordic Logistics Group',
    status: 'New',
    statusColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    source: 'Referral',
    value: '$32,000',
    initials: 'ER',
  },
  {
    id: 4,
    name: 'David Thorne',
    company: 'Horizon BioPharma',
    status: 'Qualified',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    source: 'Outbound',
    value: '$45,000',
    initials: 'DT',
  },
];

const RECENT_CUSTOMERS = [
  {
    id: '1',
    name: 'Acme Corporation',
    contact: 'John Doe',
    company: 'Enterprise SaaS',
    status: 'Active',
    dealValue: '$54,000',
    date: 'Sep 9, 2026',
    initials: 'AC',
  },
  {
    id: '25',
    name: 'Global Tech Innovations',
    contact: 'Rahul Kumar',
    company: 'Fintech Solutions',
    status: 'Active',
    dealValue: '$78,200',
    date: 'Sep 8, 2026',
    initials: 'GT',
  },
  {
    id: '3',
    name: 'Summit Media Group',
    contact: 'Sarah Smith',
    company: 'Digital Media',
    status: 'Active',
    dealValue: '$36,500',
    date: 'Sep 7, 2026',
    initials: 'SM',
  },
  {
    id: '4',
    name: 'Pinnacle Supply Chain',
    contact: 'Robert Taylor',
    company: 'Global Logistics',
    status: 'Active',
    dealValue: '$92,000',
    date: 'Sep 5, 2026',
    initials: 'PS',
  },
];

const PIPELINE_STAGES = [
  { name: 'Prospecting', count: 6, value: '$42,000', width: '25%', color: 'bg-indigo-500' },
  { name: 'Proposal', count: 5, value: '$68,500', width: '35%', color: 'bg-cyan-500' },
  { name: 'Negotiation', count: 4, value: '$46,000', width: '22%', color: 'bg-amber-500' },
  { name: 'Won', count: 3, value: '$28,000', width: '18%', color: 'bg-emerald-500' },
];

/**
 * Phase 3 Executive Sales Dashboard
 * Layout composition inspired by the attached visual reference:
 * - Top page header with title, subtitle, and date range filter pill
 * - 5 Key Metric Summary Cards
 * - Two-column mid section (Opportunities by Status chart + Recent Leads list)
 * - Full-width Recent Customers table
 * Follows 100% of the Phase 2 Login visual identity (colors, fonts, borders, shadows).
 */
const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Dashboard Header & Date Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider font-sans">
              Sales Performance Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Overview of your customers, leads and sales opportunities.
          </p>
        </div>

        {/* Visual Filter Pill (Placeholder) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-700 shadow-xs hover:border-slate-300 transition-colors cursor-pointer select-none">
            <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Last 30 days</span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>
      </div>

      {/* 2. Key Metric Statistic Cards (5-Card Responsive Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {STATS_DATA.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 truncate">
                {stat.label}
              </span>
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                {stat.icon}
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl xl:text-[26px] font-bold text-slate-900 tracking-tight font-sans">
                {stat.value}
              </span>
            </div>

            {/* Sparkline Progress Bar */}
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${stat.progressColor}`}
                style={{ width: stat.progress }}
              ></div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
              <svg className="w-3 h-3 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H6.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L6.414 6H11a1 1 0 011 1z" transform="rotate(90 10 10)" clipRule="evenodd" />
              </svg>
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Mid Section: Opportunities Chart (Left) + Recent Leads (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Opportunities by Status (Chart Card) */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                  Opportunities by Status
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pipeline distribution and conversion stages across active deals
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
                <span>18 Active Deals</span>
              </div>
            </div>

            {/* Visual Multi-Spline Pipeline Velocity Chart */}
            <div className="relative w-full h-[140px] mb-5 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeWidth="1" />

                {/* Spline Area 1 */}
                <path
                  d="M0,90 Q70,40 140,65 T280,30 T400,50 T500,20 L500,120 L0,120 Z"
                  fill="rgba(16, 185, 129, 0.08)"
                />
                {/* Spline 1 (Emerald - Won/Closed) */}
                <path
                  d="M0,90 Q70,40 140,65 T280,30 T400,50 T500,20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Spline 2 (Cyan - Open Proposals) */}
                <path
                  d="M0,105 Q70,75 140,85 T280,55 T400,35 T500,15"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Data Points */}
                <circle cx="280" cy="30" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="400" cy="50" r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Float Callout Label */}
              <div className="absolute top-2 right-4 bg-slate-900 text-white rounded-lg px-2.5 py-1 shadow-md text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                <span>Peak Win Velocity: <strong className="text-emerald-300">+$28K</strong></span>
              </div>
            </div>

            {/* Stage Progress Breakdown Bars */}
            <div className="space-y-3">
              {PIPELINE_STAGES.map((stage, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{stage.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{stage.count} deals</span>
                      <span className="font-semibold text-slate-900 font-mono">{stage.value}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color}`}
                      style={{ width: stage.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Pipeline health indicator: <strong className="text-emerald-700">Strong (84/100)</strong></span>
            <Link
              to="/opportunities"
              className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>View full pipeline</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right: Recent Leads List Card */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                  Recent Leads
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest inbound contacts
                </p>
              </div>
              <Link
                to="/leads"
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View all →
              </Link>
            </div>

            {/* Lead Rows */}
            <div className="space-y-3">
              {RECENT_LEADS.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {lead.initials}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {lead.company}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${lead.statusColor} mb-1`}>
                      {lead.status}
                    </span>
                    <div className="text-[11px] font-mono font-bold text-slate-800">
                      {lead.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-center">
            <Link
              to="/leads"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>+ Add New Lead</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Customers Table Card (Full Width) */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
              Recent Customers
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Active accounts and relationship records
            </p>
          </div>
          <Link
            to="/customers"
            className="text-xs font-semibold text-emerald-700 hover:underline self-start sm:self-auto"
          >
            Manage all customers →
          </Link>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="py-3 px-5 sm:px-6">Customer / Account</th>
                <th className="py-3 px-4">Primary Contact</th>
                <th className="py-3 px-4">Industry / Domain</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Value</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-5 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {RECENT_CUSTOMERS.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {cust.initials}
                      </div>
                      <span className="font-semibold text-slate-900">{cust.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{cust.contact}</td>
                  <td className="py-3.5 px-4 text-slate-500">{cust.company}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">{cust.dealValue}</td>
                  <td className="py-3.5 px-4 text-slate-500">{cust.date}</td>
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <Link
                      to={`/customers/${cust.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                    >
                      <span>Details</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
