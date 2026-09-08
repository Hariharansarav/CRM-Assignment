import leadService from '../services/lead.service.js';

/**
 * Lead Controller
 * Handles HTTP requests and responses for lead endpoints.
 */
export const leadController = {
  /**
   * GET /api/leads
   * Supports ?search= and ?status= query params
   */
  async getLeads(req, res, next) {
    try {
      const { search, status } = req.query;
      const leads = await leadService.getAllLeads({ search, status });

      return res.status(200).json({
        success: true,
        data: leads,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/leads/:id
   */
  async getLeadById(req, res, next) {
    try {
      const { id } = req.params;
      const lead = await leadService.getLeadById(id);

      return res.status(200).json({
        success: true,
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/leads
   */
  async createLead(req, res, next) {
    try {
      const newLead = await leadService.createLead(req.body);

      return res.status(201).json({
        success: true,
        data: newLead,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PUT /api/leads/:id
   * Also supports updating lead status
   */
  async updateLead(req, res, next) {
    try {
      const { id } = req.params;
      const updatedLead = await leadService.updateLead(id, req.body);

      return res.status(200).json({
        success: true,
        data: updatedLead,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/leads/:id
   */
  async deleteLead(req, res, next) {
    try {
      const { id } = req.params;
      await leadService.deleteLead(id);

      return res.status(200).json({
        success: true,
        message: 'Lead deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default leadController;
