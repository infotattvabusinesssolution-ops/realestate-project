import express from 'express';
import { getMenus, syncMenus } from '../controllers/menuController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getMenus);

router.post('/sync', syncMenus);

export default router;
