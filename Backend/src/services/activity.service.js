import activityRepository from '../repositories/activity.repository.js';
import customerRepository from '../repositories/customer.repository.js';
import { AppError } from './customer.service.js';

/**
 * Activity Service
 * Handles business logic for Activities.
 */
export const activityService = {
  /**
   * Get all activities for a specific customer
   * Verifies customer exists before retrieving activities
   * @param {number|string} customerId 
   * @returns {Promise<Array>} List of activities
   */
  async getActivitiesByCustomerId(customerId) {
    const customer = await customerRepository.findById(customerId);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return await activityRepository.findByCustomerId(customerId);
  },

  /**
   * Get activity by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Activity record
   */
  async getActivityById(id) {
    const activity = await activityRepository.findById(id);
    if (!activity) {
      throw new AppError('Activity not found', 404);
    }
    return activity;
  },

  /**
   * Create a new activity for a customer
   * Verifies customer exists before creation
   * @param {Object} data - { customer_id, type, description }
   * @returns {Promise<Object>} Created activity
   */
  async createActivity(data) {
    const customer = await customerRepository.findById(data.customer_id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return await activityRepository.create(data);
  },

  /**
   * Delete an activity by ID
   * Verifies activity exists before deletion
   * @param {number|string} id 
   * @returns {Promise<Object>} Deleted activity
   */
  async deleteActivity(id) {
    const existing = await activityRepository.findById(id);
    if (!existing) {
      throw new AppError('Activity not found', 404);
    }

    return await activityRepository.deleteById(id);
  },
};

export default activityService;
