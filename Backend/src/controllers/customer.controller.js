import customerService from '../services/customer.service.js';

/**
 * Customer Controller
 * Handles HTTP requests and responses for customer endpoints.
 */
export const customerController = {
  /**
   * GET /api/customers
   * Supports ?search= and ?status= query params
   */
  async getCustomers(req, res, next) {
    try {
      const { search, status } = req.query;
      const customers = await customerService.getAllCustomers({ search, status });

      return res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/customers/:id
   * Returns customer details with related opportunities and activities
   */
  async getCustomerById(req, res, next) {
    try {
      const { id } = req.params;
      const customerDetails = await customerService.getCustomerDetails(id);

      return res.status(200).json({
        success: true,
        data: customerDetails,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/customers
   */
  async createCustomer(req, res, next) {
    try {
      const newCustomer = await customerService.createCustomer(req.body);

      return res.status(201).json({
        success: true,
        data: newCustomer,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PUT /api/customers/:id
   */
  async updateCustomer(req, res, next) {
    try {
      const { id } = req.params;
      const updatedCustomer = await customerService.updateCustomer(id, req.body);

      return res.status(200).json({
        success: true,
        data: updatedCustomer,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/customers/:id
   */
  async deleteCustomer(req, res, next) {
    try {
      const { id } = req.params;
      await customerService.deleteCustomer(id);

      return res.status(200).json({
        success: true,
        message: 'Customer deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default customerController;
