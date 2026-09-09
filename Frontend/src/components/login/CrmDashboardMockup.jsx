
const CrmDashboardMockup = () => {
  return (
    <div className="w-full flex justify-end items-end relative pointer-events-none select-none">
      {/* 3D Tilted Perspective Floating Dashboard Card */}
      <div className="w-[520px] xl:w-[580px] bg-white rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-slate-100/90 p-5 sm:p-6 text-slate-800 transform -rotate-[7deg] translate-x-6 xl:translate-x-10 translate-y-6 transition-transform duration-500 ease-out hover:rotate-0 hover:translate-x-0 pointer-events-auto">
        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">
              M
            </div>
            <span className="text-xs font-bold text-slate-900 tracking-tight">Mini Sales CRM</span>
            <span className="text-slate-300 mx-1">/</span>
            <span className="text-xs text-slate-400">Sales center</span>
            <span className="text-slate-300 mx-0.5">&gt;</span>
            <span className="text-xs font-semibold text-slate-700">Overview</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-[11px] font-medium text-slate-500">Live Sync</span>
          </div>
        </div>

        {/* Top 3 Metric Summary Cards */}
        <div className="grid grid-cols-3 gap-3 my-4">
          {/* Metric 1 */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
            <div className="text-[10px] font-medium text-slate-500 mb-1">Active leads</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-slate-900">142</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +12.4%
              </span>
            </div>
            {/* Sparkline */}
            <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
            <div className="text-[10px] font-medium text-slate-500 mb-1">Deals pipeline</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-slate-900">18</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +3.1%
              </span>
            </div>
            <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="w-1/2 h-full bg-cyan-500 rounded-full"></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
            <div className="text-[10px] font-medium text-slate-500 mb-1">Revenue target</div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-slate-900">$184.5K</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +8.6%
              </span>
            </div>
            <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="w-4/5 h-full bg-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Sales & Revenue Trends Chart Section with Floating Tooltip */}
        <div className="bg-white rounded-xl border border-slate-100 p-3.5 relative mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900">Sales &amp; pipeline trends</span>
            <span className="text-[10px] text-slate-400 font-medium">Last 24 hours</span>
          </div>

          {/* SVG Multi-Spline Chart */}
          <div className="relative w-full h-[110px]">
            <svg className="w-full h-full" viewBox="0 0 400 110" preserveAspectRatio="none">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="55" x2="400" y2="55" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="85" x2="400" y2="85" stroke="#f1f5f9" strokeWidth="1" />

              {/* Spline Line 1 (Purple / Inbound Leads) */}
              <path
                d="M0,80 Q50,40 100,65 T200,30 T300,50 T400,20"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2.5"
              />

              {/* Spline Line 2 (Teal / Deals Converted) */}
              <path
                d="M0,95 Q50,70 100,80 T200,55 T300,35 T400,10"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Data points */}
              <circle cx="285" cy="42" r="3.5" fill="#818cf8" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="285" cy="48" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            </svg>

            {/* Floating Tooltip matching Sentinel reference */}
            <div className="absolute top-1 right-[18%] bg-slate-900 text-white rounded-lg p-2 shadow-xl text-[10px] border border-slate-700/60 z-10">
              <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1 mb-1">
                September 2, 2026
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-300 py-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Inbound leads:
                </span>
                <span className="font-bold text-white">158 <span className="text-emerald-400 text-[9px]">+2.8%</span></span>
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-300 py-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Deals closed:
                </span>
                <span className="font-bold text-white">138 <span className="text-emerald-400 text-[9px]">+4.8%</span></span>
              </div>
            </div>
          </div>

          {/* Time Axis Labels */}
          <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-50">
            <span>5 AM</span>
            <span>7 AM</span>
            <span>9 AM</span>
            <span>11 AM</span>
            <span>1 PM</span>
            <span>3 PM</span>
          </div>
        </div>

        {/* Bottom Dual Card Row: Insights + AI Assistant */}
        <div className="grid grid-cols-2 gap-3">
          {/* Top Sales Insights */}
          <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-900">Top sales insights</span>
              <span className="text-[10px] text-green-700 font-semibold cursor-pointer hover:underline">
                View all &gt;
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-start gap-1.5 text-[10px] text-slate-600">
                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="leading-tight">Enterprise lead pipeline velocity +14%</span>
              </div>
              <div className="flex items-start gap-1.5 text-[10px] text-slate-600">
                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="leading-tight">3 proposals awaiting signature</span>
              </div>
            </div>
          </div>

          {/* AI Sales Assistant */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-xl p-3 border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-900 mb-1">
                <span>✦</span> AI Sales Assistant
              </div>
              <p className="text-[10px] text-emerald-800/80 leading-snug">
                Predictive deal scoring and automated pipeline workflows ready.
              </p>
            </div>
            <div className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 mt-2">
              <span>Ask assistant</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmDashboardMockup;
