import express from 'express';
import {
  getOnlineGateway,
  updateOnlineGateway,
  getOfflineGateways,
  createOfflineGateway,
  updateOfflineGateway,
  deleteOfflineGateway,
} from '../controllers/gatewayController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.route('/online')
  .get(getOnlineGateway)
  .put(updateOnlineGateway);

router.route('/offline')
  .get(getOfflineGateways)
  .post(createOfflineGateway);

router.route('/offline/:id')
  .put(updateOfflineGateway)
  .delete(deleteOfflineGateway);

export default router;
