// src/routes/createPageSetting.js
const { PageSetting } = require('../db/sequelize');
const upload = require('../middleware/upload');  // Utiliser le middleware multer pour l'upload d'images
const verifyToken = require('../auth/verifyToken');

module.exports = (app) => {
  app.post('/api/pagesettings', verifyToken, upload.single('image'), async (req, res) => {
    try {
      const { key, value, type } = req.body;
      let imageUrl = null;

      // Si une image est envoyée, on récupère son nom
      if (req.file) {
        imageUrl = `${req.file.filename}`;  // L'URL de l'image après l'upload
      }

      // Créer un nouveau PageSetting
      const pageSetting = await PageSetting.create({
        key,
        value,
        type,
        image: imageUrl,  // Ajouter l'URL de l'image ici
      });

      res.status(201).json({
        message: 'Le paramètre de page a été créé avec succès.',
        data: pageSetting,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du paramètre de page.' });
    }
  });
};
