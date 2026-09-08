import opportunityService from '../services/opportunity.service.js';

/**
 * Opportunity Controller
 * Handles HTTP requests and responses for opportunity endpoints.
 */
export const opportunityController = {
  /**
   * GET /api/opportunities
   * Supports ?status= query parameter
   */
  async getOpportunities(req, res, next) {
    try {
      const { status } = req.query;
      const opportunities = await opportunityService.getAllOpportunities({ status });

      return res.status(200).json({
        success: true,
        data: opportunities,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/opportunities/:id
   */
  async getOpportunityById(req, res, next) {
    try {
      const { id } = req.params;
      const opportunity = await opportunityService.getOpportunityById(id);

      return res.status(200).json({
        success: true,
        data: opportunity,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/opportunities
   */
  async createOpportunity(req, res, next) {
    try {
      const newOpportunity = await opportunityService.createOpportunity(req.body);

      return res.status(201).json({
        success: true,
        data: newOpportunity,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PUT /api/opportunities/:id
   * Supports field updates and stage/status changes
   */
  async updateOpportunity(req, res, next) {
    try {
      const { id } = req.params;
      const updatedOpportunity = await opportunityService.updateOpportunity(id, req.body);

      return res.status(200).json({
        success: true,
        data: updatedOpportunity,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/opportunities/:id
   */
  async deleteOpportunity(req, res, next) {
    try {
      const { id } = req.params;
      await opportunityService.deleteOpportunity(id);

      return res.status(200).json({
        success: true,
        message: 'Opportunity deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default opportunityController;
