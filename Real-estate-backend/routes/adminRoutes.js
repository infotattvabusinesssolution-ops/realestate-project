import express from 'express';
import {
  getAdminStats,
  getAdminProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  approveProperty,
  rejectProperty,
  togglePropertyStatus,
  togglePropertyFeatured,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getTickets,
  replyTicket,
  updateTicketStatus,
  getAdminMessages,
  deleteAdminMessage,
  getAdminSettings,
  updateAdminSettings,
} from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

// Dashboard stats
router.get('/stats', getAdminStats);

// Property management
router.route('/properties')
  .get(getAdminProperties)
  .post(createProperty);

router.route('/properties/:id')
  .put(updateProperty)
  .delete(deleteProperty);

router.put('/properties/:id/approve', approveProperty);
router.put('/properties/:id/reject', rejectProperty);
router.put('/properties/:id/toggle-status', togglePropertyStatus);
router.put('/properties/:id/toggle-featured', togglePropertyFeatured);

// User management
router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

router.put('/users/:id/status', toggleUserStatus);

// Ticket management
router.route('/tickets')
  .get(getTickets);
router.post('/tickets/:id/reply', replyTicket);
router.put('/tickets/:id/status', updateTicketStatus);

// Property messages / inquiries
router.get('/messages', getAdminMessages);
router.delete('/messages/:id', deleteAdminMessage);

// Admin settings
router.route('/settings')
  .get(getAdminSettings)
  .put(updateAdminSettings);

export default router;
