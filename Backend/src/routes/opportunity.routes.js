import { Router } from 'express';
import opportunityController from '../controllers/opportunity.controller.js';
import {
  validateOpportunityId,
  validateQueryOpportunities,
  validateCreateOpportunity,
  validateUpdateOpportunity,
} from '../middleware/validate.opportunity.js';

const router = Router();

// Opportunity CRUD routes
router.get('/', validateQueryOpportunities, opportunityController.getOpportunities);
router.get('/:id', validateOpportunityId, opportunityController.getOpportunityById);
router.post('/', validateCreateOpportunity, opportunityController.createOpportunity);
router.put('/:id', validateOpportunityId, validateUpdateOpportunity, opportunityController.updateOpportunity);
router.delete('/:id', validateOpportunityId, opportunityController.deleteOpportunity);

export default router;
