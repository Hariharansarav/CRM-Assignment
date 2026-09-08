import { Router } from 'express';
import customerController from '../controllers/customer.controller.js';
import {
  validateCustomerId,
  validateCreateCustomer,
  validateUpdateCustomer,
} from '../middleware/validate.customer.js';

const router = Router();

// Customer CRUD routes
router.get('/', customerController.getCustomers);
router.get('/:id', validateCustomerId, customerController.getCustomerById);
router.post('/', validateCreateCustomer, customerController.createCustomer);
router.put('/:id', validateCustomerId, validateUpdateCustomer, customerController.updateCustomer);
router.delete('/:id', validateCustomerId, customerController.deleteCustomer);

export default router;
