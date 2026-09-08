import activityService from '../services/activity.service.js';

/**
 * Activity Controller
 * Handles HTTP requests and responses for activity endpoints.
 */
export const activityController = {
  /**
   * GET /api/customers/:customerId/activities
   */
  async getCustomerActivities(req, res, next) {
    try {
      const { customerId } = req.params;
      const activities = await activityService.getActivitiesByCustomerId(customerId);

      return res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/activities/:id
   */
  async getActivityById(req, res, next) {
    try {
      const { id } = req.params;
      const activity = await activityService.getActivityById(id);

      return res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/customers/:customerId/activities
   */
  async createActivity(req, res, next) {
    try {
      const { customerId } = req.params;
      const newActivity = await activityService.createActivity({
        ...req.body,
        customer_id: Number(customerId),
      });

      return res.status(201).json({
        success: true,
        data: newActivity,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/activities/:id
   */
  async deleteActivity(req, res, next) {
    try {
      const { id } = req.params;
      await activityService.deleteActivity(id);

      return res.status(200).json({
        success: true,
        message: 'Activity deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default activityController;
