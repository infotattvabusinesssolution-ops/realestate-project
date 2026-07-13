import express from 'express';
import { singleUpload } from '../middleware/upload.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Upload a single file to Cloudinary
// @route   POST /api/upload
// @access  Private
router.post('/', protect, singleUpload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Upload to Cloudinary using file buffer
    const secureUrl = await uploadToCloudinary(req.file.buffer, 'estaty_uploads');

    res.status(200).json({
      message: 'File uploaded successfully',
      url: secureUrl,
    });
  } catch (error) {
    console.error('Upload endpoint error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
