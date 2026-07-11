import express from 'express';
import { getPaymentLogs, updatePaymentLogStatus } from '../controllers/paymentController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getPaymentLogs);

router.route('/:id')
  .put(updatePaymentLogStatus);

export default router;
