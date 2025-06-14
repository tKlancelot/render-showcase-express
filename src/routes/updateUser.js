const verifyToken = require('../auth/verifyToken');
const multer = require('multer');
const path = require('path');
const { User } = require('../db/sequelize');
const bcrypt = require('bcryptjs');

// Configuration de multer pour gérer les fichiers (images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // dossier de destination
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // nom unique
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

module.exports = (app) => {
  app.put('/api/users/:id', verifyToken, upload.single('mainPicture'), async (req, res) => {
    const id = req.params.id;
    const { username, password, role } = req.body;
    const mainPicture = req.file ? req.file.filename : null;

    try {
      let updatedFields = { username, role };

      if (password) {
        updatedFields.password = await bcrypt.hash(password, 10);
      }

      if (mainPicture) {
        updatedFields.mainPicture = mainPicture;
      }

      const [updatedRowsCount] = await User.update(updatedFields, { where: { id } });

      if (updatedRowsCount === 0) {
        const message = `L'utilisateur avec l'ID ${id} n'existe pas.`;
        return res.status(404).json({ message });
      }

      const message = `L'utilisateur avec l'ID ${id} a été mis à jour avec succès.`;
      res.status(200).json({ message });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l’utilisateur.' });
    }
  });
};
