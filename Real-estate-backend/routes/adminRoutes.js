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
  getTicketDetail,
  replyTicket,
  updateTicketStatus,
  getAdminMessages,
  deleteAdminMessage,
  getAdminSettings,
  updateAdminSettings,
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogPosts,
  createBlogPost,
  deleteBlogPost,
  getFAQs,
  createFAQ,
  deleteFAQ,
  getAdvertisements,
  createAdvertisement,
  deleteAdvertisement,
  getAnnouncementPopups,
  createAnnouncementPopup,
  deleteAnnouncementPopup,
  getAdminRoles,
  createAdminRole,
  deleteAdminRole,
  getAdmins,
  createAdmin,
  deleteAdmin,
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
router.get('/tickets/:id', getTicketDetail);
router.post('/tickets/:id/reply', replyTicket);
router.put('/tickets/:id/status', updateTicketStatus);

// Property messages / inquiries
router.get('/messages', getAdminMessages);
router.delete('/messages/:id', deleteAdminMessage);

// Admin settings
router.route('/settings')
  .get(getAdminSettings)
  .put(updateAdminSettings);

// Blog Categories
router.route('/blog/categories')
  .get(getBlogCategories)
  .post(createBlogCategory);

router.delete('/blog/categories/:id', deleteBlogCategory);

// Blog Posts
router.route('/blog/posts')
  .get(getBlogPosts)
  .post(createBlogPost);

router.delete('/blog/posts/:id', deleteBlogPost);

// FAQs
router.route('/faqs')
  .get(getFAQs)
  .post(createFAQ);

router.delete('/faqs/:id', deleteFAQ);

// Advertisements
router.route('/advertisements')
  .get(getAdvertisements)
  .post(createAdvertisement);

router.delete('/advertisements/:id', deleteAdvertisement);

// Announcement Popups
router.route('/announcement-popups')
  .get(getAnnouncementPopups)
  .post(createAnnouncementPopup);

router.delete('/announcement-popups/:id', deleteAnnouncementPopup);

// Admin Roles & Admins Management
router.route('/roles')
  .get(getAdminRoles)
  .post(createAdminRole);
router.delete('/roles/:id', deleteAdminRole);

router.route('/admins')
  .get(getAdmins)
  .post(createAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;
