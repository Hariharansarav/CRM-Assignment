import api from './api';

/**
 * Lead Service
 * Centralizes all lead-related REST API operations.
 * Connects to Express backend at /api/leads.
 */
export const leadService = {
  /**
   * Fetches all leads with optional search and status filters.
   * Endpoint: GET /api/leads?search=...&status=...
   * @param {Object} options - { search, status }
   * @returns {Promise<Array>} List of leads
   */
  async getLeads({ search, status } = {}) {
    try {
      const params = {};
      if (search && search.trim()) {
        params.search = search.trim();
      }
      if (status && status !== 'all') {
        params.status = status.trim();
      }

      const response = await api.get('/leads', { params });
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve leads');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load leads. Please check your connection.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Fetches a single lead by ID.
   * Endpoint: GET /api/leads/:id
   * @param {number|string} id
   * @returns {Promise<Object>} Lead record
   */
  async getLeadById(id) {
    try {
      const response = await api.get(`/leads/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve lead details');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load lead details.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },

  /**
   * Creates a new lead record.
   * Endpoint: POST /api/leads
   * @param {Object} leadData - { name, company, email, phone, source, status, assigned_to }
   * @returns {Promise<Object>} Created lead
   */
  async createLead(leadData) {
    try {
      const response = await api.post('/leads', leadData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to create lead');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to create lead. Please check the fields and try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Updates an existing lead record.
   * Endpoint: PUT /api/leads/:id
   * @param {number|string} id
   * @param {Object} leadData - Updated fields
   * @returns {Promise<Object>} Updated lead
   */
  async updateLead(id, leadData) {
    try {
      const response = await api.put(`/leads/${id}`, leadData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to update lead');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to update lead. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Deletes a lead by ID.
   * Endpoint: DELETE /api/leads/:id
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async deleteLead(id) {
    try {
      const response = await api.delete(`/leads/${id}`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to delete lead');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to delete lead. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },
};

export default leadService;
