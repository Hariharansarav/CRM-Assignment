import api from './api';

/**
 * Customer Service
 * Centralizes all customer-related REST API operations.
 * Connects to Express backend at /api/customers.
 */
export const customerService = {
  /**
   * Fetches all customers with optional search and status filters.
   * Endpoint: GET /api/customers?search=...&status=...
   * @param {Object} options - { search, status }
   * @returns {Promise<Array>} List of customers
   */
  async getCustomers({ search, status } = {}) {
    try {
      const params = {};
      if (search && search.trim()) {
        params.search = search.trim();
      }
      if (status && status !== 'all') {
        params.status = status.toLowerCase().trim();
      }

      const response = await api.get('/customers', { params });
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve customers');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load customers. Please check your connection.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Fetches a single customer by ID with related opportunities and activities.
   * Endpoint: GET /api/customers/:id
   * @param {number|string} id
   * @returns {Promise<Object>} Customer details
   */
  async getCustomerById(id) {
    try {
      const response = await api.get(`/customers/${id}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve customer details');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to load customer details.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },

  /**
   * Creates a new customer record.
   * Endpoint: POST /api/customers
   * @param {Object} customerData - { name, company, email, phone, status }
   * @returns {Promise<Object>} Created customer
   */
  async createCustomer(customerData) {
    try {
      const response = await api.post('/customers', customerData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to create customer');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to create customer. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Updates an existing customer record.
   * Endpoint: PUT /api/customers/:id
   * @param {number|string} id
   * @param {Object} customerData - Updated fields
   * @returns {Promise<Object>} Updated customer
   */
  async updateCustomer(id, customerData) {
    try {
      const response = await api.put(`/customers/${id}`, customerData);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to update customer');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to update customer. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      customError.errors = error.response?.data?.errors;
      throw customError;
    }
  },

  /**
   * Deletes a customer by ID.
   * Endpoint: DELETE /api/customers/:id
   * @param {number|string} id
   * @returns {Promise<boolean>}
   */
  async deleteCustomer(id) {
    try {
      const response = await api.delete(`/customers/${id}`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to delete customer');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Unable to delete customer. Please try again.';
      const customError = new Error(message);
      customError.status = error.response?.status;
      throw customError;
    }
  },
};

export default customerService;
