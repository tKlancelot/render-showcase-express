const bcrypt = require('bcryptjs');
const { User } = require('../db/sequelize');
const getCloudinaryUploader = require('../middleware/cloudinaryMulter');

const upload = getCloudinaryUploader('avatars').single('mainPicture');

module.exports = (app) => {
  app.post('/api/users', upload, async (req, res) => {
    const { username, password, role } = req.body;
    const mainPicture = req.file ? req.file.path : null; // l’URL Cloudinary est dans file.path

    try {
      if (!password) {
        return res.status(400).json({ message: 'Le mot de passe est requis' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword,
        role,
        mainPicture, // c’est maintenant une URL Cloudinary
      });

      res.status(201).json({ data: user });
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue.' });
    }
  });
};
