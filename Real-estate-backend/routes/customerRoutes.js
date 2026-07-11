import express from 'express';
import {
  getCustomerStats,
  getPublicProperties,
  getPropertyDetail,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCustomerTickets,
  createCustomerTicket,
  getCustomerTicketDetail,
  replyCustomerTicket,
  createInquiry,
} from '../controllers/customerController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/properties', getPublicProperties);
router.get('/properties/:id', getPropertyDetail);

// Protected routes (Customer only)
router.use(protect);
router.use(restrictTo('customer'));

router.get('/stats', getCustomerStats);

router.route('/wishlist')
  .get(getWishlist);
router.route('/wishlist/:id')
  .post(addToWishlist)
  .delete(removeFromWishlist);

router.route('/tickets')
  .get(getCustomerTickets)
  .post(createCustomerTicket);
router.route('/tickets/:id')
  .get(getCustomerTicketDetail);
router.post('/tickets/:id/reply', replyCustomerTicket);

router.post('/inquire', createInquiry);

export default router;
