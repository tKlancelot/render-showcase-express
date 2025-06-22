const verifyToken = require('../auth/verifyToken');
const multer = require('multer');
const { User } = require('../db/sequelize');
const bcrypt = require('bcryptjs');
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Config multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars', // ou 'users' selon ta nomenclature
    allowed_formats: ['jpg', 'png', 'webp'],
    transformation: [{ width: 1200, crop: 'limit' }],
  },
});

const upload = multer({ storage });

module.exports = (app) => {
  app.put('/api/users/:id', verifyToken, upload.single('mainPicture'), async (req, res) => {
    const id = req.params.id;
    const { username, password, role } = req.body;

    try {
      let updatedFields = { username, role };

      if (password) {
        updatedFields.password = await bcrypt.hash(password, 10);
      }

      if (req.file && req.file.path) {
        // req.file.path contient l'URL Cloudinary de l'image uploadée
        updatedFields.mainPicture = req.file.path;
      }

      const [updatedRowsCount] = await User.update(updatedFields, { where: { id } });

      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: `L'utilisateur avec l'ID ${id} n'existe pas.` });
      }

      return res.status(200).json({ message: `L'utilisateur avec l'ID ${id} a été mis à jour avec succès.` });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l’utilisateur.' });
    }
  });
};
