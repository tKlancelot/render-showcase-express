const jwt = require('jsonwebtoken');
const privateKey = require('./private_key');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: `Aucun token fourni.` });
  }

  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      console.error('Erreur de vérification du token :', error);
      return res.status(401).json({
        message: `Le token est invalide ou expiré.`,
        error: error.name
      });
    }

    req.userId = decodedToken.userId;
    next();
  });
};
