import { Router } from 'express';
import dashboardController from '../controllers/dashboard.controller.js';

const router = Router();

// Dashboard endpoint: GET /api/dashboard
router.get('/', dashboardController.getDashboard);

export default router;
