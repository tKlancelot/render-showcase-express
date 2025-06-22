const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

/**
 * Crée un parser multer configuré pour uploader sur Cloudinary
 * @param {string} folder - Le nom du dossier Cloudinary (ex: 'carousel', 'avatars', etc.)
 */
const getCloudinaryUploader = (folder = 'general') => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 1200, crop: 'limit' }],
    },
  });

  return multer({ storage });
};

module.exports = getCloudinaryUploader;
