import leadRepository from '../repositories/lead.repository.js';
import { AppError } from './customer.service.js';

/**
 * Lead Service
 * Handles business logic for Leads.
 */
export const leadService = {
  /**
   * Get all leads with optional search and status filtering
   * @param {Object} query - { search, status }
   * @returns {Promise<Array>}
   */
  async getAllLeads({ search, status } = {}) {
    return await leadRepository.findAll({ search, status });
  },

  /**
   * Get lead by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Lead record
   */
  async getLeadById(id) {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new AppError('Lead not found', 404);
    }
    return lead;
  },

  /**
   * Create a new lead
   * @param {Object} data - { name, company, email, phone, source, status, assigned_to }
   * @returns {Promise<Object>} Created lead
   */
  async createLead(data) {
    return await leadRepository.create(data);
  },

  /**
   * Update an existing lead
   * @param {number|string} id 
   * @param {Object} data 
   * @returns {Promise<Object>} Updated lead
   */
  async updateLead(id, data) {
    const existing = await leadRepository.findById(id);
    if (!existing) {
      throw new AppError('Lead not found', 404);
    }

    return await leadRepository.update(id, data);
  },

  /**
   * Delete a lead by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Deleted lead
   */
  async deleteLead(id) {
    const existing = await leadRepository.findById(id);
    if (!existing) {
      throw new AppError('Lead not found', 404);
    }

    return await leadRepository.deleteById(id);
  },
};

export default leadService;
