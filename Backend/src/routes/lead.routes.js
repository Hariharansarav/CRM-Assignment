import { Router } from 'express';
import leadController from '../controllers/lead.controller.js';
import {
  validateLeadId,
  validateQueryLeads,
  validateCreateLead,
  validateUpdateLead,
} from '../middleware/validate.lead.js';

const router = Router();

// Lead CRUD routes
router.get('/', validateQueryLeads, leadController.getLeads);
router.get('/:id', validateLeadId, leadController.getLeadById);
router.post('/', validateCreateLead, leadController.createLead);
router.put('/:id', validateLeadId, validateUpdateLead, leadController.updateLead);
router.delete('/:id', validateLeadId, leadController.deleteLead);

export default router;
