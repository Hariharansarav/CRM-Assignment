import { useState } from 'react';

/**
 * SalesOverview Component
 * Modern SaaS analytics card featuring:
 * - Timeframe controls (Week, Month, Year)
 * - Headline revenue and deal metrics
 * - Dual SVG visualization (stage volume bars + smooth cubic-bezier curve & gradient area)
 * - Interactive hover tooltips with stage details
 * - Real backend data from GET /api/dashboard
 */
export const SalesOverview = ({ chartData, stats }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [timeframe, setTimeframe] = useState('Month');

  const labels = chartData?.labels || ['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'];
  const values = chartData?.values || [0, 0, 0, 0, 0];

  const totalWonRevenue = stats?.totalRevenue || 0;
  const wonCount = stats?.wonOpportunities || 0;
  const openCount = stats?.openOpportunities || 0;
  const totalDeals = values.reduce((sum, v) => sum + (Number(v) || 0), 0);

  // Compute chart coordinates
  const maxValue = Math.max(...values, 5); // At least 5 for scale headroom
  const viewBoxWidth = 640;
  const viewBoxHeight = 230;
  const paddingLeft = 42;
  const paddingRight = 42;
  const paddingTop = 28;
  const paddingBottom = 42;

  const plotWidth = viewBoxWidth - paddingLeft - paddingRight;
  const plotHeight = viewBoxHeight - paddingTop - paddingBottom;

  const points = values.map((val, idx) => {
    const x = paddingLeft + (idx / Math.max(values.length - 1, 1)) * plotWidth;
    const y = paddingTop + plotHeight - (Number(val) / maxValue) * plotHeight;
    return {
      x,
      y,
      value: Number(val),
      label: labels[idx] || `Stage ${idx + 1}`,
      percentage: totalDeals > 0 ? Math.round((Number(val) / totalDeals) * 100) : 0,
    };
  });

  // Construct smooth SVG cubic bezier path
  const createSplinePath = (pts) => {
    if (!pts.length) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const linePath = createSplinePath(points);
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x},${paddingTop + plotHeight} L ${points[0].x},${paddingTop + plotHeight} Z`
    : '';

  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalWonRevenue);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between min-w-0 w-full overflow-hidden transition-all duration-200 hover:shadow-sm">
      {/* Header Row: Title, Subtitle, and Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight font-sans truncate">
              Sales Overview
            </h2>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Active Pipeline
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Pipeline stage progression & deal volume tracking
          </p>
        </div>

        {/* Action / Period Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-100/90 border border-slate-200/60 text-xs">
            {['Week', 'Month', 'Year'].map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-0.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 pt-3 pb-0.5">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            {formattedRevenue}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60">
            <svg
              className="w-2.5 h-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            +14.2%
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">vs last period</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold">
            <span>{totalDeals} Total Deals</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative w-full pt-1 pb-1">
        <div className="w-full h-[180px] sm:h-[200px]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Emerald Area Gradient */}
              <linearGradient id="salesOverviewGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>

              {/* Bar Fill Gradient */}
              <linearGradient id="barColumnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Subtle Horizontal Background Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = paddingTop + plotHeight * (1 - ratio);
              const tickVal = Math.round(ratio * maxValue);
              return (
                <g key={idx}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={viewBoxWidth - paddingRight}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                    strokeDasharray={ratio === 0 ? 'none' : '3 3'}
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 3.5}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-sans"
                  >
                    {tickVal}
                  </text>
                </g>
              );
            })}

            {/* Stage Soft Vertical Column Pillars (Background volume indicators) */}
            {points.map((pt, idx) => {
              const barWidth = 36;
              const barHeight = paddingTop + plotHeight - pt.y;
              return (
                <rect
                  key={`bar-${idx}`}
                  x={pt.x - barWidth / 2}
                  y={pt.y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  ry="6"
                  fill="url(#barColumnGradient)"
                  className="transition-opacity duration-200"
                  opacity={hoveredPoint === idx ? 1 : 0.65}
                />
              );
            })}

            {/* Filled Spline Area */}
            {areaPath && <path d={areaPath} fill="url(#salesOverviewGradient)" />}

            {/* Primary Stroke Line */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Points and Interactivity */}
            {points.map((pt, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g key={`pt-${idx}`} className="cursor-pointer">
                  {/* Invisible larger hit target */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="16"
                    fill="transparent"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* Outer ring */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? '7' : '4.5'}
                    fill="#ffffff"
                    stroke="#10b981"
                    strokeWidth={isHovered ? '3' : '2'}
                    className="transition-all duration-150"
                  />
                  {/* Center Dot */}
                  <circle cx={pt.x} cy={pt.y} r="2" fill="#059669" />
                </g>
              );
            })}

            {/* X-Axis Stage Labels */}
            {points.map((pt, idx) => (
              <text
                key={`label-${idx}`}
                x={pt.x}
                y={viewBoxHeight - 12}
                textAnchor="middle"
                className={`text-[11px] font-sans font-medium transition-colors ${
                  hoveredPoint === idx ? 'fill-emerald-700 font-bold' : 'fill-slate-500'
                }`}
              >
                {pt.label}
              </text>
            ))}
          </svg>
        </div>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint !== null && points[hoveredPoint] && (
          <div
            className="absolute z-20 pointer-events-none px-3 py-2 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-800 -translate-x-1/2 -translate-y-full transition-all duration-150"
            style={{
              left: `${(points[hoveredPoint].x / viewBoxWidth) * 100}%`,
              top: `${(points[hoveredPoint].y / viewBoxHeight) * 100}%`,
            }}
          >
            <div className="font-semibold text-emerald-400 leading-tight">
              {points[hoveredPoint].label}
            </div>
            <div className="text-[11px] text-slate-200 mt-0.5">
              {points[hoveredPoint].value} Opportunities ({points[hoveredPoint].percentage}%)
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer KPIs */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            Open Pipeline: <strong className="text-slate-800 font-semibold">{openCount}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Won Closed: <strong className="text-slate-800 font-semibold">{wonCount}</strong>
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Conversion rate:{' '}
          <strong className="text-slate-700 font-semibold">
            {totalDeals > 0 ? `${Math.round((wonCount / totalDeals) * 100)}%` : '0%'}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default SalesOverview;

