import express from 'express';
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getPackageSettings,
  updatePackageSettings,
} from '../controllers/packageController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

// Package Settings — MUST come before /:id routes
router.route('/settings')
  .get(getPackageSettings)
  .put(updatePackageSettings);

// Package CRUD
router.route('/')
  .get(getPackages)
  .post(createPackage);

router.route('/:id')
  .put(updatePackage)
  .delete(deletePackage);

export default router;
