import express from 'express';
import {
  getVendorStats,
  getVendorProperties,
  createVendorProperty,
  getVendorProjects,
  createVendorProject,
  getVendorLeads,
  getVendorAgents,
  getVendorChartData,
  getVendorTickets,
  createVendorTicket,
  getVendorTicketDetail,
  replyVendorTicket,
  getVendorPaymentLogs,
  createVendorAgent,
  deleteVendorProperty,
  deleteVendorProject,
} from '../controllers/vendorController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('vendor'));

router.get('/stats', getVendorStats);
router.get('/chart-data', getVendorChartData);

router.route('/properties')
  .get(getVendorProperties)
  .post(createVendorProperty);

router.delete('/properties/:id', deleteVendorProperty);

router.route('/projects')
  .get(getVendorProjects)
  .post(createVendorProject);

router.delete('/projects/:id', deleteVendorProject);

router.get('/leads', getVendorLeads);

router.route('/agents')
  .get(getVendorAgents)
  .post(createVendorAgent);

router.route('/tickets')
  .get(getVendorTickets)
  .post(createVendorTicket);

router.get('/tickets/:id', getVendorTicketDetail);
router.post('/tickets/:id/reply', replyVendorTicket);

router.get('/payment-logs', getVendorPaymentLogs);

export default router;
