import express from 'express';
import {
  getVendorStats,
  getVendorProperties,
  createVendorProperty,
  updateVendorProperty,
  getVendorProjects,
  createVendorProject,
  updateVendorProject,
  getVendorLeads,
  deleteVendorLead,
  replyVendorLead,
  getVendorAgents,
  createVendorAgent,
  updateVendorAgent,
  deleteVendorAgent,
  getVendorChartData,
  getVendorTickets,
  createVendorTicket,
  getVendorTicketDetail,
  replyVendorTicket,
  getVendorPaymentLogs,
  deleteVendorProperty,
  deleteVendorProject,
  purchasePackage,
  createCheckoutSession,
  verifyCheckoutSession,
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

router.put('/properties/:id', updateVendorProperty);
router.delete('/properties/:id', deleteVendorProperty);

router.route('/projects')
  .get(getVendorProjects)
  .post(createVendorProject);

router.put('/projects/:id', updateVendorProject);
router.delete('/projects/:id', deleteVendorProject);

router.get('/leads', getVendorLeads);
router.delete('/leads/:id', deleteVendorLead);
router.post('/leads/:id/reply', replyVendorLead);

router.route('/agents')
  .get(getVendorAgents)
  .post(createVendorAgent);

router.route('/agents/:id')
  .put(updateVendorAgent)
  .delete(deleteVendorAgent);

router.route('/tickets')
  .get(getVendorTickets)
  .post(createVendorTicket);

router.get('/tickets/:id', getVendorTicketDetail);
router.post('/tickets/:id/reply', replyVendorTicket);

router.get('/payment-logs', getVendorPaymentLogs);
router.post('/purchase-package', purchasePackage);
router.post('/create-checkout-session', createCheckoutSession);
router.post('/verify-checkout-session', verifyCheckoutSession);

export default router;
