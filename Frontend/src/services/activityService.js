import api from './api';

/**
 * Activity Service
 * Encapsulates all activity-related REST API operations.
 * Connects to Express backend at /api/customers/:customerId/activities and /api/activities.
 */
export const activityService = {
  /**
   * Fetches all activity records for a specific customer.
   * Endpoint: GET /api/customers/:customerId/activities
   * @param {number|string} customerId
   * @returns {Promise<Array>} List of activities
   */
  async getCustomerActivities(customerId) {
    try {
      const response = await api.get(`/customers/${customerId}/activities`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve activities');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load activity history.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },

  /**
   * Creates a new activity record for a customer.
   * Endpoint: POST /api/customers/:customerId/activities
   * @param {number|string} customerId
   * @param {Object} activityData - { type, description }
   * @returns {Promise<Object>} Created activity record
   */
  async createActivity(customerId, activityData) {
    try {
      const response = await api.post(`/customers/${customerId}/activities`, activityData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to create activity');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to add activity. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Deletes an activity by ID.
   * Endpoint: DELETE /api/activities/:id
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async deleteActivity(id) {
    try {
      const response = await api.delete(`/activities/${id}`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to delete activity');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to delete activity.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },
};

export default activityService;
