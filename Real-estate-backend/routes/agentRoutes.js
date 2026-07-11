import express from 'express';
import {
  getAgentStats,
  getAgentProperties,
  getAgentLeads,
} from '../controllers/agentController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('agent'));

router.get('/stats', getAgentStats);
router.get('/properties', getAgentProperties);
router.get('/leads', getAgentLeads);

export default router;
