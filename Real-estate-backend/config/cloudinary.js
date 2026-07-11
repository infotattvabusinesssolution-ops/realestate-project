import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dummy_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'dummy_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'dummy_api_secret',
});

/**
 * Uploads a file buffer or local path to Cloudinary.
 * Falls back to returning a mock URL if Cloudinary is not configured or fails.
 * @param {Buffer|string} fileSource - File buffer or file path
 * @param {string} folder - Target folder in Cloudinary
 * @returns {Promise<string>} - The URL of the uploaded asset
 */
export const uploadToCloudinary = async (fileSource, folder = 'estaty') => {
  // If not configured, fall back to mock URL
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME === 'dummy_cloud_name'
  ) {
    console.warn('Cloudinary not configured. Returning local/mock placeholder.');
    return typeof fileSource === 'string' && fileSource.startsWith('data:')
      ? fileSource // return base64 if passed as base64
      : `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    if (Buffer.isBuffer(fileSource)) {
      uploadStream.end(fileSource);
    } else if (typeof fileSource === 'string') {
      // If base64 or path
      cloudinary.uploader.upload(fileSource, { folder, resource_type: 'auto' })
        .then(result => resolve(result.secure_url))
        .catch(err => reject(err));
    } else {
      reject(new Error('Invalid file source for Cloudinary upload'));
    }
  });
};
