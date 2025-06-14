// src/routes/updatePageSetting.js
const { PageSetting } = require('../db/sequelize');
const upload = require('../middleware/upload');  // Utilisation de multer pour le téléchargement de fichiers
const verifyToken = require('../auth/verifyToken');

module.exports = (app) => {
  app.put('/api/pagesettings/:id', upload.single('image'), verifyToken, async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      // Mettre à jour la page_setting avec les nouveaux paramètres
      const pageSetting = await PageSetting.findByPk(id);
      if (!pageSetting) {
        return res.status(404).json({ message: 'Page setting non trouvé.' });
      }

      // Mettre à jour les valeurs
      pageSetting.value = value || pageSetting.value;
      if (image) {
        pageSetting.image = image;
      }

      await pageSetting.save();
      res.status(200).json({ message: 'Page setting mise à jour avec succès.', data: pageSetting });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres de la page:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour des paramètres de la page.' });
    }
  });
};
