import api from './api';

/**
 * Opportunity Service
 * Centralizes all opportunity-related REST API operations.
 * Connects to Express backend at /api/opportunities.
 */
export const opportunityService = {
  /**
   * Fetches all opportunities with optional status and customerId filters.
   * Endpoint: GET /api/opportunities?status=...&customerId=...
   * @param {Object} options - { status, customerId }
   * @returns {Promise<Array>} List of opportunities
   */
  async getOpportunities({ status, customerId } = {}) {
    try {
      const params = {};
      if (status && status !== 'all') {
        params.status = status.trim();
      }
      if (customerId) {
        params.customerId = customerId;
      }

      const response = await api.get('/opportunities', { params });
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve opportunities');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load opportunities. Please check your connection.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Fetches a single opportunity by ID.
   * Endpoint: GET /api/opportunities/:id
   * @param {number|string} id
   * @returns {Promise<Object>} Opportunity record
   */
  async getOpportunityById(id) {
    try {
      const response = await api.get(`/opportunities/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve opportunity details');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load opportunity details.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },

  /**
   * Creates a new opportunity record.
   * Endpoint: POST /api/opportunities
   * @param {Object} opportunityData - { name, customer_id, value, expected_closing_date, status }
   * @returns {Promise<Object>} Created opportunity
   */
  async createOpportunity(opportunityData) {
    try {
      const response = await api.post('/opportunities', opportunityData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to create opportunity');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to create opportunity. Please check the fields and try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Updates an existing opportunity record.
   * Endpoint: PUT /api/opportunities/:id
   * @param {number|string} id
   * @param {Object} opportunityData - Updated fields
   * @returns {Promise<Object>} Updated opportunity
   */
  async updateOpportunity(id, opportunityData) {
    try {
      const response = await api.put(`/opportunities/${id}`, opportunityData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to update opportunity');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to update opportunity. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Deletes an opportunity by ID.
   * Endpoint: DELETE /api/opportunities/:id
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async deleteOpportunity(id) {
    try {
      const response = await api.delete(`/opportunities/${id}`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to delete opportunity');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to delete opportunity. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },
};

export default opportunityService;
