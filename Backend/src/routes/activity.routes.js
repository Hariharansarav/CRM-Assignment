import { Router } from 'express';
import activityController from '../controllers/activity.controller.js';
import {
  validateCustomerIdParam,
  validateActivityId,
  validateCreateActivity,
} from '../middleware/validate.activity.js';

const router = Router();

// Customer-specific activity routes: /api/customers/:customerId/activities
router.get('/customers/:customerId/activities', validateCustomerIdParam, activityController.getCustomerActivities);
router.post('/customers/:customerId/activities', validateCustomerIdParam, validateCreateActivity, activityController.createActivity);

// Activity-specific routes: /api/activities/:id
router.get('/activities/:id', validateActivityId, activityController.getActivityById);
router.delete('/activities/:id', validateActivityId, activityController.deleteActivity);

export default router;
