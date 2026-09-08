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
    const [
      totalCustomers,
      totalLeads,
      openOpportunities,
      wonOpportunities,
      totalRevenue,
      recentCustomers,
      recentLeads,
      opportunitiesByStatus,
    ] = await Promise.all([
      dashboardRepository.getTotalCustomers(),
      dashboardRepository.getTotalLeads(),
      dashboardRepository.getOpenOpportunities(),
      dashboardRepository.getWonOpportunities(),
      dashboardRepository.getTotalRevenue(),
      dashboardRepository.getRecentCustomers(5),
      dashboardRepository.getRecentLeads(5),
      dashboardRepository.getOpportunitiesByStatus(),
    ]);

    const chartLabels = ['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'];
    const chartValues = chartLabels.map((label) => opportunitiesByStatus[label] || 0);

    return {
      stats: {
        totalCustomers,
        totalLeads,
        openOpportunities,
        wonOpportunities,
        totalRevenue,
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
