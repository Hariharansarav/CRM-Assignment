import customerRepository from '../repositories/customer.repository.js';
import opportunityRepository from '../repositories/opportunity.repository.js';
import activityRepository from '../repositories/activity.repository.js';

import { AppError } from '../middleware/error.middleware.js';

export { AppError };

/**
 * Customer Service
 * Handles business logic for Customers.
 */
export const customerService = {
  /**
   * Get all customers with optional search and status filtering
   * @param {Object} query - { search, status }
   * @returns {Promise<Array>}
   */
  async getAllCustomers({ search, status } = {}) {
    return await customerRepository.findAll({ search, status });
  },

  /**
   * Get complete customer details by ID including related opportunities and activities
   * @param {number|string} id 
   * @returns {Promise<Object>} Object containing customer, opportunities, totalOpportunityValue, activities
   */
  async getCustomerDetails(id) {
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    // Retrieve related data concurrently via Promise.all
    const [opportunities, activities, totalOpportunityValue] = await Promise.all([
      opportunityRepository.findByCustomerId(id),
      activityRepository.findByCustomerId(id),
      customerRepository.getTotalOpportunityValue(id),
    ]);

    return {
      customer,
      opportunities,
      totalOpportunityValue,
      activities,
    };
  },

  /**
   * Alias for getCustomerDetails
   */
  async getCustomerById(id) {
    return await this.getCustomerDetails(id);
  },

  /**
   * Create a new customer
   * @param {Object} data - { name, company, email, phone, status }
   * @returns {Promise<Object>} Created customer
   */
  async createCustomer(data) {
    return await customerRepository.create(data);
  },

  /**
   * Update an existing customer
   * @param {number|string} id 
   * @param {Object} data 
   * @returns {Promise<Object>} Updated customer
   */
  async updateCustomer(id, data) {
    const existing = await customerRepository.findById(id);
    if (!existing) {
      throw new AppError('Customer not found', 404);
    }

    return await customerRepository.update(id, data);
  },

  /**
   * Delete a customer by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Deleted customer
   */
  async deleteCustomer(id) {
    const existing = await customerRepository.findById(id);
    if (!existing) {
      throw new AppError('Customer not found', 404);
    }

    return await customerRepository.deleteById(id);
  },
};

export default customerService;
