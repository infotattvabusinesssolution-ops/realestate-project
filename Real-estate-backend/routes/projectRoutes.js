import express from 'express';
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectApproval,
  toggleProjectFeatured,
  toggleProjectStatus,
  getProjectTypes,
  createProjectType,
  updateProjectType,
  deleteProjectType,
  getProjectSettings,
  updateProjectSettings,
} from '../controllers/projectController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { projectUpload } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

// Project Types CRUD — MUST come before /:id routes
router.route('/types')
  .get(getProjectTypes)
  .post(createProjectType);

router.route('/types/:id')
  .put(updateProjectType)
  .delete(deleteProjectType);

// Project Settings — MUST come before /:id routes
router.route('/settings')
  .get(getProjectSettings)
  .put(updateProjectSettings);

// Project CRUD
router.route('/')
  .get(getAdminProjects)
  .post(projectUpload, createProject);

router.route('/:id')
  .put(projectUpload, updateProject)
  .delete(deleteProject);

router.put('/:id/approval', toggleProjectApproval);
router.put('/:id/toggle-featured', toggleProjectFeatured);
router.put('/:id/toggle-status', toggleProjectStatus);

export default router;
