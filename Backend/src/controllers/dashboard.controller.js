import dashboardService from '../services/dashboard.service.js';

/**
 * Dashboard Controller
 * Handles HTTP requests and responses for dashboard endpoints.
 */
export const dashboardController = {
  /**
   * GET /api/dashboard
   */
  async getDashboard(req, res, next) {
    try {
      const data = await dashboardService.getDashboardData();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default dashboardController;
