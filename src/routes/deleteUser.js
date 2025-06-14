const verifyToken = require('../auth/verifyToken');
const { User } = require('../db/sequelize');

module.exports = (app) => {
  app.delete('/api/users/:id', verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
      // Supprimer l'utilisateur
      const result = await User.destroy({ where: { id } });

      if (!result) {
        const message = `L'utilisateur avec l'ID ${id} n'existe pas.`;
        return res.status(404).json({ message });
      }

      const message = `L'utilisateur avec l'ID ${id} a été supprimé avec succès.`;
      res.status(200).json({ message });
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l’utilisateur.' });
    }
  });
};
