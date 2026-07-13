import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// @desc    Get all active packages (public, no auth required)
// @route   GET /api/packages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
