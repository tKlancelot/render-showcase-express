// src/routes/deletePageSetting.js
const { PageSetting } = require('../db/sequelize');

module.exports = (app) => {
  app.delete('/api/pagesettings/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const pageSetting = await PageSetting.findByPk(id);

      if (!pageSetting) {
        return res.status(404).json({ message: 'Paramètre de la page non trouvé' });
      }

      await pageSetting.destroy();

      res.status(200).json({ message: 'Paramètre de la page supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du paramètre de la page:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du paramètre de la page' });
    }
  });
};
