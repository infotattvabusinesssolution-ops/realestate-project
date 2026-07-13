import express from 'express';
import {
  getAgentStats,
  getAgentProperties,
  getAgentLeads,
  getAgentChartData,
  createAgentProperty,
  updateAgentProperty,
  deleteAgentProperty,
  deleteAgentLead,
  replyAgentLead,
  getAgentProjects,
  createAgentProject,
  updateAgentProject,
  deleteAgentProject,
} from '../controllers/agentController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('agent'));

router.get('/stats', getAgentStats);
router.get('/chart-data', getAgentChartData);

router.route('/properties')
  .get(getAgentProperties)
  .post(createAgentProperty);

router.route('/properties/:id')
  .put(updateAgentProperty)
  .delete(deleteAgentProperty);

router.route('/projects')
  .get(getAgentProjects)
  .post(createAgentProject);

router.route('/projects/:id')
  .put(updateAgentProject)
  .delete(deleteAgentProject);

router.get('/leads', getAgentLeads);
router.delete('/leads/:id', deleteAgentLead);
router.post('/leads/:id/reply', replyAgentLead);

export default router;
