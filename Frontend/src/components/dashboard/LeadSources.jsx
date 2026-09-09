import { useMemo } from 'react';

/**
 * LeadSources Component
 * Reinterprets the Lead Source section from the reference image for Mini Sales CRM:
 * - Features lead channel/pipeline distribution with horizontal progress indicators
 * - Concentric multi-ring circular distribution chart matching the reference image visual
 * - Strictly uses real data from recentLeads or clear empty state (zero fake random numbers)
 */
export const LeadSources = ({ leads = [] }) => {
  // Aggregate real lead stages from recentLeads
  const leadDistribution = useMemo(() => {
    if (!Array.isArray(leads) || leads.length === 0) return [];
    
    const statusCounts = {};
    leads.forEach((lead) => {
      const st = lead.status || 'New';
      statusCounts[st] = (statusCounts[st] || 0) + 1;
    });

    const total = leads.length;
    const colors = [
      { stroke: '#10b981', bg: 'bg-emerald-500', name: 'Inbound / New' },
      { stroke: '#06b6d4', bg: 'bg-cyan-500', name: 'Contacted' },
      { stroke: '#6366f1', bg: 'bg-indigo-500', name: 'Qualified' },
      { stroke: '#f59e0b', bg: 'bg-amber-500', name: 'Partner / Referral' },
    ];

    return Object.entries(statusCounts).map(([status, count], idx) => {
      const color = colors[idx % colors.length];
      const percentage = Math.round((count / total) * 100);
      return {
        name: status,
        count,
        percentage,
        stroke: color.stroke,
        bg: color.bg,
      };
    });
  }, [leads]);

  const hasLeads = leadDistribution.length > 0;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between min-w-0 w-full h-full transition-all duration-200 hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5 min-w-0">
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
            Lead Sources
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Acquisition channels & pipeline entry
          </p>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
          Realtime
        </span>
      </div>

      {!hasLeads ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No lead source tracking data</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Channels will populate as leads are registered.</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-1">
          {/* Left: Lead Sources Breakdown with Progress Bars */}
          <div className="flex-1 w-full space-y-2 min-w-0">
            {leadDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.bg}`} />
                    <span className="font-semibold text-slate-700 truncate text-[11px]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="font-bold text-slate-900 text-xs">{item.count}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({item.percentage}%)</span>
                  </div>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.stroke,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Concentric Multi-Ring Circular Visualization */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
              {leadDistribution.map((item, idx) => {
                const radius = 40 - idx * 9;
                const circumference = 2 * Math.PI * radius;
                const strokeLength = (item.percentage / 100) * circumference;
                const strokeDashoffset = circumference - strokeLength;

                return (
                  <g key={idx}>
                    {/* Background Ring Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="5"
                    />
                    {/* Active Colored Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke={item.stroke}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${strokeLength} ${circumference}`}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-base font-bold text-slate-900 leading-none">
                {leads.length}
              </span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                Leads
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Channel Attribution</span>
        <span className="text-slate-600 font-medium">{leads.length} Tracked Prospects</span>
      </div>
    </div>
  );
};

export default LeadSources;
