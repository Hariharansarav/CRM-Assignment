import { useMemo, useState } from 'react';

const STATUS_CONFIG = [
  { key: 'Prospecting', label: 'Prospecting', color: '#6366f1', bg: 'bg-indigo-500', text: 'text-indigo-700', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/50' },
  { key: 'Proposal', label: 'Proposal', color: '#06b6d4', bg: 'bg-cyan-500', text: 'text-cyan-700', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200/50' },
  { key: 'Negotiation', label: 'Negotiation', color: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200/50' },
  { key: 'Won', label: 'Won', color: '#10b981', bg: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/50' },
  { key: 'Lost', label: 'Lost', color: '#ef4444', bg: 'bg-rose-500', text: 'text-rose-700', badge: 'bg-rose-50 text-rose-700 border-rose-200/50' },
];

/**
 * OpportunityStatus Component
 * Compact pipeline distribution card:
 * - Reduced length/height with streamlined SVG Donut chart
 * - Compact legend with deal counts & percentage pills
 * - Interactive stage highlighting on hover
 */
export const OpportunityStatus = ({ opportunitiesByStatus }) => {
  const [hoveredKey, setHoveredKey] = useState(null);

  // Calculate total deals
  const total = useMemo(() => {
    const data = opportunitiesByStatus || {};
    return STATUS_CONFIG.reduce((acc, curr) => acc + (Number(data[curr.key]) || 0), 0);
  }, [opportunitiesByStatus]);

  // Donut chart arc calculations
  const donutSegments = useMemo(() => {
    if (total === 0) return [];
    const data = opportunitiesByStatus || {};
    let cumulative = 0;
    const radius = 38;
    const circumference = 2 * Math.PI * radius;

    return STATUS_CONFIG.map((status) => {
      const val = Number(data[status.key]) || 0;
      const percentage = (val / total) * 100;
      const strokeLength = (val / total) * circumference;
      const strokeOffset = circumference - (cumulative / total) * circumference;
      cumulative += val;

      return {
        ...status,
        value: val,
        percentage: Math.round(percentage),
        strokeDasharray: `${strokeLength} ${circumference - strokeLength}`,
        strokeDashoffset: strokeOffset,
      };
    });
  }, [opportunitiesByStatus, total]);

  const isEmpty = total === 0;

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between min-w-0 w-full transition-all duration-200 hover:shadow-sm">
      {/* Compact Card Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3 min-w-0">
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
            Opportunities by Status
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Stage distribution across active & closed pipeline
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
          {opportunitiesByStatus?.Won || 0} Won / {total} Deals
        </span>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-700">No opportunity data available</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Add opportunities to view pipeline distribution.</p>
        </div>
      ) : (
        /* Compact Visualization + Horizontal/Wrap Legend */
        <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-1">
          {/* Streamlined SVG Donut Chart */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="10"
              />
              {/* Colored Segments */}
              {donutSegments.map((segment) => {
                const isHovered = hoveredKey === segment.key;
                return (
                  <circle
                    key={segment.key}
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={isHovered ? '13' : '10'}
                    strokeDasharray={segment.strokeDasharray}
                    strokeDashoffset={segment.strokeDashoffset}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredKey(segment.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  />
                );
              })}
            </svg>

            {/* Center Label: Total Count or Hovered Count */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                {hoveredKey
                  ? donutSegments.find((s) => s.key === hoveredKey)?.value ?? total
                  : total}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                {hoveredKey ? hoveredKey.substring(0, 7) : 'Deals'}
              </span>
            </div>
          </div>

          {/* Compact Legend Breakdown (Wrap / Grid) */}
          <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 min-w-0">
            {donutSegments.map((status) => {
              const isHovered = hoveredKey === status.key;
              return (
                <div
                  key={status.key}
                  onMouseEnter={() => setHoveredKey(status.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isHovered
                      ? 'bg-slate-50 border-slate-300 shadow-2xs'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${status.bg}`}
                      aria-hidden="true"
                    />
                    <span className="text-slate-600 text-xs font-medium truncate">{status.label}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-sm">{status.value}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {status.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>5 Pipeline Stages</span>
        <span className="text-slate-500 font-medium">Auto-aggregated from backend</span>
      </div>
    </div>
  );
};

export default OpportunityStatus;
