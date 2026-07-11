import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getCategories,
  createCategory,
  updateCategoryStatus,
  deleteCategory,
  getAmenities,
  createAmenity,
  updateAmenityStatus,
  deleteAmenity,
  getCountries,
  createCountry,
  updateCountryStatus,
  deleteCountry,
  getStates,
  createState,
  updateStateStatus,
  deleteState,
  getCities,
  createCity,
  updateCityStatus,
  deleteCity,
} from '../controllers/specController.js';

const router = express.Router();

// Public routes for selectors
router.get('/categories', getCategories);
router.get('/amenities', getAmenities);
router.get('/countries', getCountries);
router.get('/states', getStates);
router.get('/cities', getCities);

// Protected Admin routes
router.use(protect);
router.use(restrictTo('admin'));

router.post('/categories', createCategory);
router.put('/categories/:id/status', updateCategoryStatus);
router.delete('/categories/:id', deleteCategory);

router.post('/amenities', createAmenity);
router.put('/amenities/:id/status', updateAmenityStatus);
router.delete('/amenities/:id', deleteAmenity);

router.post('/countries', createCountry);
router.put('/countries/:id/status', updateCountryStatus);
router.delete('/countries/:id', deleteCountry);

router.post('/states', createState);
router.put('/states/:id/status', updateStateStatus);
router.delete('/states/:id', deleteState);

router.post('/cities', createCity);
router.put('/cities/:id/status', updateCityStatus);
router.delete('/cities/:id', deleteCity);

export default router;
