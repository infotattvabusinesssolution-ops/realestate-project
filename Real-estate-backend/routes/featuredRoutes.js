import express from 'express';
import {
  getFeaturedPricing,
  createFeaturedPricing,
  updateFeaturedPricing,
  deleteFeaturedPricing,
  getFeaturedRequests,
  updateFeaturedRequest,
  deleteFeaturedRequest,
} from '../controllers/featuredController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

// Pricing CRUD
router.route('/pricing')
  .get(getFeaturedPricing)
  .post(createFeaturedPricing);

router.route('/pricing/:id')
  .put(updateFeaturedPricing)
  .delete(deleteFeaturedPricing);

// Requests CRUD
router.route('/requests')
  .get(getFeaturedRequests);

router.route('/requests/:id')
  .put(updateFeaturedRequest)
  .delete(deleteFeaturedRequest);

export default router;
