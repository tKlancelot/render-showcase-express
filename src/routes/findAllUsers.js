// route findAllUsers 

const verifyToken = require('../auth/verifyToken');
const { User } = require('../db/sequelize');


module.exports = (app) => {
  app.get('/api/users', async (req, res) => {
    try {
      // On récupère tous les utilisateurs
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    }
  });
};