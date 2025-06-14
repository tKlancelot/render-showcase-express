const jwt = require('jsonwebtoken');
const privateKey = require('./private_key');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization; // Récupère l'entête HTTP

  if (!authorizationHeader) {
    const message = `L'utilisateur n'a pas fourni son jeton d'authentification`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(' ')[1]; // Extrait le jeton de l'entête

  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource`;
      return res.status(401).json({ message });
    }

    // Stocke l'ID de l'utilisateur dans req.userId
    req.userId = decodedToken.userId;
    
    next();
  });
};
