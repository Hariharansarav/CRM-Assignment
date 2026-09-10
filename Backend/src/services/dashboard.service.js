import dashboardRepository from '../repositories/dashboard.repository.js';

/**
 * Dashboard Service
 * Business logic layer for assembling dashboard metrics and chart-ready data.
 */
export const dashboardService = {
  /**
   * Assembles complete dashboard payload from repository aggregations
   * @returns {Promise<Object>} Formatted dashboard data
   */
  async getDashboardData() {
    // Run independent database queries concurrently via Promise.all
    const [
      totalCustomers,
      totalLeads,
      totalRevenue,
      pipelineValue,
      recentCustomers,
      recentLeads,
      opportunitiesByStatus,
    ] = await Promise.all([
      dashboardRepository.getTotalCustomers(),
      dashboardRepository.getTotalLeads(),
      dashboardRepository.getTotalRevenue(),
      dashboardRepository.getPipelineValue(),
      dashboardRepository.getRecentCustomers(5),
      dashboardRepository.getRecentLeads(5),
      dashboardRepository.getOpportunitiesByStatus(),
    ]);

    // Derive open and won counts directly from the status breakdown (eliminates 2 redundant DB queries)
    const wonOpportunities = Number(opportunitiesByStatus.Won || 0);
    const openOpportunities =
      Number(opportunitiesByStatus.Prospecting || 0) +
      Number(opportunitiesByStatus.Proposal || 0) +
      Number(opportunitiesByStatus.Negotiation || 0);

    const chartLabels = ['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'];
    const chartValues = chartLabels.map((label) => opportunitiesByStatus[label] || 0);

    return {
      stats: {
        totalCustomers,
        totalLeads,
        openOpportunities,
        wonOpportunities,
        totalRevenue,
        pipelineValue,
      },
      recentCustomers,
      recentLeads,
      opportunitiesByStatus,
      chart: {
        labels: chartLabels,
        values: chartValues,
      },
    };
  },
};

export default dashboardService;
