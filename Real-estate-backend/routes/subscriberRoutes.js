import express from 'express';
import {
  getSubscribers,
  createSubscriber,
  deleteSubscriber,
} from '../controllers/subscriberController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Allow public to subscribe (POST), but protect listing/deleting for admin
router.post('/', createSubscriber);

router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getSubscribers);
router.delete('/:id', deleteSubscriber);

export default router;
