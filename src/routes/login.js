const { User } = require('../db/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key'); 

module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    // Recherche de l'utilisateur par son nom d'utilisateur
    User.findOne({ where: { username: req.body.username } }).then(user => {
      if (!user) {
        const message = `L'utilisateur ${req.body.username} n'existe pas !`;
        res.status(404).json({ message });
        return;
      }

      // Vérification du mot de passe
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if (!isPasswordValid) {
          const message = `Le mot de passe est incorrect !`;
          res.status(401).json({ message });
          return;
        }

        // Génération du token JWT
        const token = jwt.sign(
          { userId: user.id }, 
          privateKey, 
          { expiresIn: '24h' }  // Le token expire après 24 heures
        );

        const message = `L'utilisateur ${req.body.username} a bien été connecté !`;
        res.status(200).json({ message, data: user, token });
      });
    }).catch(error => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques secondes !`;
      res.status(500).json({ message, data: error });
    });
  });
};
