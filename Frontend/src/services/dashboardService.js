import api from './api';

/**
 * Dashboard Service
 * Encapsulates all API communication for CRM Dashboard statistics,
 * activity streams, and opportunity pipeline aggregations.
 */
export const dashboardService = {
  /**
   * Fetches the complete aggregated dashboard payload.
   * Endpoint: GET /api/dashboard
   * @returns {Promise<Object>} Aggregated dashboard data object { stats, recentCustomers, recentLeads, opportunitiesByStatus, chart }
   */
  async getDashboard() {
    try {
      const response = await api.get('/dashboard');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve dashboard data');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load dashboard data. Please check your connection and try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },
};

export default dashboardService;
