import express from 'express';
import {
  getVendorStats,
  getVendorProperties,
  createVendorProperty,
  getVendorProjects,
  createVendorProject,
  getVendorLeads,
  getVendorAgents,
} from '../controllers/vendorController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('vendor'));

router.get('/stats', getVendorStats);
router.route('/properties')
  .get(getVendorProperties)
  .post(createVendorProperty);

router.route('/projects')
  .get(getVendorProjects)
  .post(createVendorProject);

router.get('/leads', getVendorLeads);
router.get('/agents', getVendorAgents);

export default router;
