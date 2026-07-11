import multer from 'multer';

// Use memory storage to store file buffers before uploading to Cloudinary
const storage = multer.memoryStorage();

// File filter to allow images and documents
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and standard documents are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Configure upload fields for Project Management
export const projectUpload = upload.fields([
  { name: 'image', maxCount: 1 },         // Feature image
  { name: 'gallery', maxCount: 10 },       // Project gallery images
  { name: 'floorPlans', maxCount: 10 },    // Floor plans
  { name: 'documents', maxCount: 5 }       // PDFs/Word brochures
]);
