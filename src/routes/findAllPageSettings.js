// src/routes/findAllPageSettings.js
const { PageSetting } = require('../db/sequelize');

module.exports = (app) => {
  app.get('/api/pagesettings', async (req, res) => {
    try {
      // On récupère toutes les settings de la page
      const pageSettings = await PageSetting.findAll();
      res.status(200).json(pageSettings);
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres de la page:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des paramètres de la page' });
    }
  });
};
