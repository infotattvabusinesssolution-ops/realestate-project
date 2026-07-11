import express from 'express';
import {
  getLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  makeDefaultLanguage,
  addKeyword,
} from '../controllers/languageController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getLanguages)
  .post(createLanguage);

router.post('/keywords', addKeyword);

router.route('/:id')
  .put(updateLanguage)
  .delete(deleteLanguage);

router.put('/:id/default', makeDefaultLanguage);

export default router;
