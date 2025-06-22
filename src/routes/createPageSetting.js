// src/routes/createPageSetting.js
const { PageSetting } = require('../db/sequelize');
const verifyToken = require('../auth/verifyToken');

module.exports = (app) => {
  app.post('/api/pagesettings', verifyToken, async (req, res) => {
    try {
      const { key, value, type } = req.body;
      // Créer un nouveau PageSetting
      const pageSetting = await PageSetting.create({
        key,
        value,
        type
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
