import opportunityRepository from '../repositories/opportunity.repository.js';
import customerRepository from '../repositories/customer.repository.js';
import { AppError } from './customer.service.js';

/**
 * Opportunity Service
 * Handles business logic for Opportunities.
 */
export const opportunityService = {
  /**
   * Get all opportunities with optional stage/customer filtering
   * @param {Object} query - { status, customerId }
   * @returns {Promise<Array>}
   */
  async getAllOpportunities({ status, customerId } = {}) {
    return await opportunityRepository.findAll({ status, customerId });
  },

  /**
   * Get opportunity by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Opportunity record
   */
  async getOpportunityById(id) {
    const opportunity = await opportunityRepository.findById(id);
    if (!opportunity) {
      throw new AppError('Opportunity not found', 404);
    }
    return opportunity;
  },

  /**
   * Create a new opportunity
   * Verifies customer existence before creation
   * @param {Object} data - { name, customer_id, value, expected_closing_date, status }
   * @returns {Promise<Object>} Created opportunity
   */
  async createOpportunity(data) {
    // Verify customer exists
    const customer = await customerRepository.findById(data.customer_id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return await opportunityRepository.create(data);
  },

  /**
   * Update an existing opportunity
   * @param {number|string} id 
   * @param {Object} data 
   * @returns {Promise<Object>} Updated opportunity
   */
  async updateOpportunity(id, data) {
    const existing = await opportunityRepository.findById(id);
    if (!existing) {
      throw new AppError('Opportunity not found', 404);
    }

    // If changing customer_id, verify new customer exists
    if (data.customer_id) {
      const customer = await customerRepository.findById(data.customer_id);
      if (!customer) {
        throw new AppError('Customer not found', 404);
      }
    }

    return await opportunityRepository.update(id, data);
  },

  /**
   * Delete an opportunity by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Deleted opportunity
   */
  async deleteOpportunity(id) {
    const existing = await opportunityRepository.findById(id);
    if (!existing) {
      throw new AppError('Opportunity not found', 404);
    }

    return await opportunityRepository.deleteById(id);
  },

  /**
   * Filter opportunities by status
   * @param {string} status 
   * @returns {Promise<Array>}
   */
  async filterByStatus(status) {
    return await opportunityRepository.findByStatus(status);
  },
};

export default opportunityService;
