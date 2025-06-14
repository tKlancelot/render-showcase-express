// find page setting by pk 
// src/routes/findPageSetting.js
const { PageSetting } = require('../db/sequelize'); 

module.exports = (app) => {
  app.get('/api/pagesettings/:id', async (req, res) => {
    try {
      // On récupère l'id du paramètre passé dans l'URL
      const { id } = req.params;

      // Recherche de la page setting par son id (findByPk permet de chercher par clé primaire)
      const pageSetting = await PageSetting.findByPk(id);

      // Si l'entrée n'existe pas
      if (!pageSetting) {
        return res.status(404).json({
          message: `Aucun paramètre trouvé pour l'id ${id}`,
        });
      }

      // Si l'entrée existe, on renvoie les données
      res.status(200).json(pageSetting);
    } catch (error) {
      console.error('Erreur lors de la récupération du paramètre de la page:', error);
      res.status(500).json({
        message: 'Une erreur est survenue lors de la récupération du paramètre de la page',
      });
    }
  });
};
