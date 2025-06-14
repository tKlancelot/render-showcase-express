const verifyToken = require('../auth/verifyToken');
const { User } = require('../db/sequelize');

module.exports = (app) => {
  app.get('/api/users/:id', verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
      // Trouver un utilisateur par son ID
      const user = await User.findByPk(id);

      if (!user) {
        const message = `L'utilisateur avec l'ID ${id} n'existe pas.`;
        return res.status(404).json({ message });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l’utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l’utilisateur.' });
    }
  });
};
